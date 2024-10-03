import React, { useCallback, useEffect, useState } from 'react'
import Button from '../Button'
import { Text, useDisclosure, useToken } from '@chakra-ui/react'
import { PoolState, usePool } from '@/hooks/usePool'
import { transparentize } from 'polished'
import { useAccount } from 'wagmi'
import WalletConnectButton from '../WalletConnect/button'
import { MintState, useMintCallback } from '@/hooks/useMintCallback'
import { ModalState } from './modals'
import { useMintState } from '@/state/mint/hooks'

export enum PoolButtonState {
  UNKNOWN = 'unknown',
  LOADING = 'loading',
  MINT = 'mint',
  SUBMITTED = 'submitted',
  ERROR = 'error'
}

export default function PoolButton(props: {
  poolState: PoolState,
  errorMessage: string | null
}) {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [state, setState] = useState<PoolButtonState>(PoolButtonState.UNKNOWN)
  const { typedValue, } = useMintState()
  const { token0, token1 } = usePool()

  const [
    alertErrorBackground,
    alertErrorText
  ] = useToken('colors', [
    'alert.error.background',
    'alert.error.text'
  ])

  const {
    callback: mintCallback,
    state: mintState,
    tx: mintTx
  } = useMintCallback()

  const { isConnected, isConnecting } = useAccount()

  useEffect(() => {
    if (state !== PoolButtonState.UNKNOWN && !isModalOpen) {
      onModalOpen()
    }
  }, [state, onModalOpen, isModalOpen])

  useEffect(() => {
    if (state === PoolButtonState.LOADING) {
      if (mintState === MintState.VALID) {
        setState(PoolButtonState.SUBMITTED)
      }
    }
  }, [
    mintState,
    state
  ])

  const handleSupply = useCallback(async () => {
    setState(PoolButtonState.LOADING)
    await mintCallback()

  }, [mintCallback])

  const handleOnModalClose = useCallback(() => {
    onModalClose()
    setState(PoolButtonState.UNKNOWN)
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

  if (props.errorMessage) {
    return (
      <Button
        disabled
        backgroundColor={alertErrorBackground}
        width={'full'}
      >
        <Text
          color={transparentize(0.2, alertErrorText)}>{props.errorMessage}</Text>
      </Button>
    )
  }

  if (props.poolState === PoolState.INVALID) {
    return (
      <Button
        disabled
        backgroundColor={alertErrorBackground}
        width={'full'}
      >
        <Text
          color={transparentize(0.2, alertErrorText)}>Invalid Pair</Text>
      </Button>
    )
  }

  if (!token0 || !token1) {
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

  return (
    <>
      <Button
        width={'full'}
        backgroundColor={'primary1'}
        onClick={handleSupply}
      >
        <Text>Supply</Text>
      </Button>

      <ModalState
        isOpen={isModalOpen}
        onClose={handleOnModalClose}
        state={state}
        data={mintTx || ''}
      />
    </>
  )
}
