import React, { useCallback, useState } from 'react'
import Button from '../Button'
import { Text, useDisclosure, useToken } from '@chakra-ui/react'
import { PoolState } from '@/hooks/usePool'
import { transparentize } from 'polished'
import { useAccount } from 'wagmi'
import WalletConnectButton from '../WalletConnect/button'
import { useMintCallback } from '@/hooks/useMintCallback'
import { ModalState } from './modals'

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

  const [
    alertErrorBackground,
    alertErrorText
  ] = useToken('colors', [
    'alert.error.background',
    'alert.error.text'
  ])

  const {
    callback: mintCallback
  } = useMintCallback()

  const { isConnected, isConnecting } = useAccount()

  const handleSupply = useCallback(() => {
    // mintCallback()
    onModalOpen()
  }, [mintCallback, onModalOpen])

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
        onClose={onModalClose}
        state={state}
      />
    </>
  )
}
