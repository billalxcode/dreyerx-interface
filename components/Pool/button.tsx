import React, { useCallback } from 'react'
import Button from '../Button'
import { Text, useToken } from '@chakra-ui/react'
import { PoolState } from '@/hooks/usePool'
import { transparentize } from 'polished'
import { useAccount } from 'wagmi'
import WalletConnectButton from '../WalletConnect/button'
import { useMintCallback } from '@/hooks/useMintCallback'

export enum PoolButtonState {

}

export default function PoolButton(props: {
  poolState: PoolState
}) {
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
    mintCallback()
  }, [mintCallback])

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
    <Button
        width={'full'}
        backgroundColor={'primary1'}
        onClick={handleSupply}
    >
        <Text>Supply</Text>
    </Button>
  )
}
