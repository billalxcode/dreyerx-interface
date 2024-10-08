import React, { useCallback, useEffect, useState } from 'react'
import Button from '../Button'
import { Text, useDisclosure, useToken } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import WalletConnectButton from '../WalletConnect/button'
import { ApprovalState, useApproval } from '@/hooks/useApproval'
import { Trade } from '@dreyerxswap/v2-sdk'
import { computeTradePriceBreakdown, warningSeverity } from '@/utils/prices'
import { transparentize } from 'polished'
import { useSwapState } from '@/state/swap/hooks'
import { SwapCallbackState, useSwapCallback } from '@/hooks/useSwapCallback'
import { ModalState } from './modals'
import { useWrapCallback, WrapCallbackState, WrapType } from '@/hooks/useWrapCallback'
import { ROUTER_ADDRESS } from '@/constants'
import { ContractFunctionExecutionError } from 'viem'

export enum SwapButtonState {
    UNKNOWN = 'unknown',
    LOADING = 'loading',
    SUBMITTED = 'submitted',
    ERROR = 'error'
}

export enum SwapActionState {
    UNKNOWN = 'unknown',
    SWAP = 'swap',
    APPROVE = 'approve',
    WRAP = 'wrap'
}

export default function SwapButton(props: {
    approvalState: ApprovalState,
    trade: Trade | null
}) {
    const { address } = useAccount()
    const { inputToken, outputToken, typedValue } = useSwapState()
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
    const [state, setState] = useState<SwapButtonState>(SwapButtonState.UNKNOWN)
    const [actionState, setActionState] = useState<SwapActionState>(SwapActionState.UNKNOWN)
    const [modalError, setModalError] = useState<string | null>(null)
    
    const {
        callback: swapCallback,
        state: swapState,
        errorMessage: swapErrorMessage,
        isPending: isSwapPending,
        tx: swapTx
    } = useSwapCallback(
        props.trade
    )

    const {
        state: wrapState,
        callback: wrapCallback,
        errorMessage: wrapErrorMessage,
        wrapType,
        tx: wrapTx
    } = useWrapCallback()

    const {
        callback: approveCallback
    } = useApproval(inputToken, address?.toString() ?? undefined, ROUTER_ADDRESS)

    const isWrapToken = wrapType !== WrapType.NOT_APPLICABLE

    const [
        alertErrorBackground,
        alertErrorText
    ] = useToken('colors', [
        'alert.error.background',
        'alert.error.text'
    ])
    const [priceImpactSeverity, setPriceImpactSeverity] = useState<0 | 1 | 2 | 3 | 4 | null>(null)
    const { isConnected, isConnecting } = useAccount()

    useEffect(() => {
        if (props.trade !== null && typeof props.trade !== 'undefined') {
            const { priceImpactWithoutFee } = computeTradePriceBreakdown(props.trade)
            setPriceImpactSeverity(warningSeverity(priceImpactWithoutFee))
        } else {
            setPriceImpactSeverity(null)
        }
    }, [props.trade])

    useEffect(() => {
        if (state !== SwapButtonState.UNKNOWN && !isModalOpen) {
            onModalOpen()
        }
    }, [state, onModalOpen, isModalOpen])

    useEffect(() => {
        if (state === SwapButtonState.LOADING) {
            if (!isSwapPending && swapState === SwapCallbackState.SUBMITTED && swapTx) {
                setState(SwapButtonState.SUBMITTED)
            } else if (wrapState === WrapCallbackState.SUBMITTED) [
                setState(SwapButtonState.SUBMITTED)
            ]
        }
    }, [state, swapState, isSwapPending, swapTx, wrapState])

    const handleSwap = useCallback(async () => {
        setState(SwapButtonState.LOADING)
        setActionState(SwapActionState.SWAP)

        try {
            await swapCallback()
        } catch (error) {
            if (error instanceof ContractFunctionExecutionError) {
                setModalError(error.shortMessage)
                setState(SwapButtonState.ERROR)
            }
        }
    }, [swapCallback])

    const handleWrap = useCallback(async () => {
        setState(SwapButtonState.LOADING)
        setActionState(SwapActionState.WRAP)
        
        try {
            await wrapCallback()
        } catch (error) {
            if (error instanceof ContractFunctionExecutionError) {
                setModalError(error.shortMessage)
                setState(SwapButtonState.ERROR)
            }
        }
    }, [wrapCallback])

    const handleApprove = useCallback(async () => {
        setState(SwapButtonState.LOADING)
        setActionState(SwapActionState.APPROVE)

        await approveCallback()
    }, [approveCallback])

    const handleOnModalClose = useCallback(() => {
        onModalClose()
        setState(SwapButtonState.UNKNOWN)
        setActionState(SwapActionState.UNKNOWN)
    }, [onModalClose])

    if (!isConnected) {
        return (
            <WalletConnectButton />
        )
    } else if (isConnecting) {
        return (
            <Button
                backgroundColor={'primary1'}
                width={'full'}
            >
                <Text>Connecting...</Text>
            </Button>
        )
    }

    if (swapErrorMessage || wrapErrorMessage) {
        return (
            <Button
                disabled
                backgroundColor={alertErrorBackground}
                width={'full'}
            >
                <Text
                    color={transparentize(0.2, alertErrorText)}>{swapErrorMessage ?? wrapErrorMessage}</Text>
            </Button>
        )
    }

    if (!inputToken || !outputToken) {
        return (
            <Button
                isDisabled
                backgroundColor={'bg1'}
                borderWidth={0}
                paddingY={3}
                width={'full'}
                disabled
            >
                <Text>Select a token</Text>
            </Button>
        )
    }

    if (!typedValue) {
        return (
            <Button
                isDisabled
                backgroundColor={'bg1'}
                borderWidth={0}
                paddingY={3}
                width={'full'}
            >
                <Text>Enter an amount</Text>
            </Button>
        )
    }

    if (props.approvalState == ApprovalState.UNKNOWN && !isWrapToken) {
        return (
            <>
                <Button
                    backgroundColor={'primary1'}
                    width={'full'}
                    onClick={() => handleApprove()}
                >
                    <Text>Approve</Text>
                </Button>
                
                <ModalState
                    trade={props.trade}
                    isOpen={isModalOpen}
                    onClose={handleOnModalClose}
                    actionState={actionState}
                    reason={modalError}
                    state={state}
                    data={isWrapToken ? wrapTx : swapTx}
                />
            </>
        )
    } else if (priceImpactSeverity !== null && priceImpactSeverity > 3) {
        return (
            <Button
                disabled
                backgroundColor={alertErrorBackground}
                width={'full'}
            >
                <Text
                    color={transparentize(0.2, alertErrorText)}>Price Impact Too High</Text>
            </Button>
        )
    } else {
        return (
            <>
                {
                    !isWrapToken ? (
                        <Button
                            isLoading={state == SwapButtonState.LOADING}
                            backgroundColor={'primary1'}
                            width={'full'}
                            onClick={() => handleSwap()}
                        >
                            <Text>Swap</Text>
                        </Button>
                    ) : (
                        <Button
                            isLoading={state == SwapButtonState.LOADING}
                            backgroundColor={'primary1'}
                            width={'full'}
                            onClick={() => handleWrap()}
                        >
                            <Text>{wrapType === WrapType.WRAP ? 'Wrap' : 'Unwrap'}</Text>
                        </Button>
                    )
                }

                <ModalState
                    trade={props.trade}
                    isOpen={isModalOpen}
                    onClose={handleOnModalClose}
                    actionState={actionState}
                    state={state}
                    reason={modalError}
                    data={isWrapToken ? wrapTx : swapTx}
                />
            </>
        )
    }
}
