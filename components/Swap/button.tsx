import React from 'react'
import Button from '../Button'
import { Text } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import WalletConnectButton from '../WalletConnect/button'

export default function SwapButton() {
    const { isConnected, isConnecting } = useAccount()
    if (!isConnected) {
        return (
            <WalletConnectButton />
        )
    } else if (isConnecting) {
        return (
            <Button
                isLoading
                backgroundColor={'primary1'}
                width={'full'}
            >
                <Text>Connecting...</Text>
            </Button>
        )
    } else {
        return (
            <Button
                backgroundColor={'primary1'}
                width={'full'}
            >
                <Text>Swap</Text>
            </Button>
        )
    }
}
