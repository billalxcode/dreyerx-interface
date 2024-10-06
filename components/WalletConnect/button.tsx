import React from 'react'
import Button from '../Button'
import { Text } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'

export default function WalletConnectButton() {
    const { open } = useAppKit()
    const { isConnecting } = useAccount()

    return (
        <Button
            isLoading={isConnecting}
            backgroundColor={'primary1'}
            width={'full'}
            onClick={() => open()}
        >
            <Text>Connect Wallet</Text>
        </Button>
    )
}