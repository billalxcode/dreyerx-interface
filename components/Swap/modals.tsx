import React  from 'react'
import { ModalWrapper } from '../Modal/wrapper'
import { Flex, Link, Spinner, Text, useToken } from '@chakra-ui/react'
import { SwapButtonState } from './button'
import { Trade } from '@dreyerxswap/v2-sdk'
import { transparentize } from 'polished'
import { FaCircleCheck } from 'react-icons/fa6'
import { DREYERX_EXPLORER_URL } from '@/constants'

export function ModalTransactionSubmitted(props: {
    tx: string | null
}) {
    const [text, bgSuccess] = useToken('colors', ['text', 'alert.success.background'])

    return (
        <Flex
            flexDirection={'column'}
            gap={3}
            justify={'center'}
            align={'center'}
            marginY={10}
        >
            
            <FaCircleCheck size={80} color={bgSuccess} />

            <Flex
                marginTop={10}
                flexDirection={'column'}
                align={'center'}
                gap={1}
            >
                <Text
                    fontWeight={'semibold'}
                    fontSize={'14px'}
                >
                    Transaction Submitted
                </Text>

                <Link
                href={`${DREYERX_EXPLORER_URL}/tx/${props.tx}`}
                    fontSize={'10px'}
                    color={transparentize(0.5, text)}
                >
                    View on Explorer
                </Link>
            </Flex>
        </Flex>
    )
}


export function ModalTransactionLoading(props: {
    trade: Trade | null
}) {
    const inputValue = props.trade ? props.trade.inputAmount.toSignificant(6) : '0'
    const inputSymbol = props.trade ? props.trade.inputAmount.currency.symbol : 'UNKNOWN'
    const outputValue = props.trade ? props.trade.outputAmount.toSignificant(6) : '0'
    const outputSymbol = props.trade ? props.trade.outputAmount.currency.symbol : 'UNKNOWN'

    const label = `Swapping ${inputValue} ${inputSymbol} for ${outputValue} ${outputSymbol}`

    const [text] = useToken('colors', ['text'])

    return (
        <Flex
            flexDirection={'column'}
            gap={3}
            justify={'center'}
            align={'center'}
            marginY={10}
        >
            <Spinner width={'80px'} height={'80px'} color='primary1' />

            <Flex
                marginTop={10}
                flexDirection={'column'}
                align={'center'}
                gap={1}
            >
                <Text
                    fontWeight={'semibold'}
                    fontSize={'14px'}
                >
                    Waiting for Confirmation
                </Text>

                <Text
                    fontSize={'12px'}
                >
                    {label}
                </Text>

                <Text
                    fontSize={'10px'}
                    color={transparentize(0.5, text)}
                >
                    Confirm this transaction in your wallet
                </Text>
            </Flex>
        </Flex>
    )
}

export function ModalStateRender(props: {
    state: SwapButtonState,
    trade: Trade | null,
    data: string | null
}) {
    if (props.state === SwapButtonState.LOADING) {
        return <ModalTransactionLoading trade={props.trade} />
    } else if (props.state === SwapButtonState.SUBMITTED) {
        return <ModalTransactionSubmitted tx={props.data} />
    }
}

export function ModalState(props: {
    isOpen: boolean,
    onClose: () => void,
    state: SwapButtonState,
    trade: Trade | null,
    data: string | null
}) {
    const title = props.state === SwapButtonState.LOADING
        ? "Please wait"
        : props.state === SwapButtonState.SUBMITTED
            ? "Successfully"
            : props.state === SwapButtonState.ERROR
                ? "Error"
                : "Swap";
    return (
        <ModalWrapper
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={title}
        >
            <ModalStateRender state={props.state} trade={props.trade} data={props.data} />
        </ModalWrapper>
    )
}