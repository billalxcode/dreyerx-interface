import React from 'react'
import { useAccount } from 'wagmi'
import Button from '../Button'
import { Text } from '@chakra-ui/react'
import { useAppKit } from '@reown/appkit/react'

export default function HeaderWallet() {
    // return <w3m-button />
    const { isConnected, isConnecting } = useAccount()
    const { open: openWeb3Modal } = useAppKit()

    if (!isConnected) {
        return (
            <Button
                size={'sm'}
                isLoading={isConnecting}
                backgroundColor={'primary1'}
                width={'full'}
                onClick={() => openWeb3Modal()}
            >
                <Text>Connect Wallet</Text>
            </Button>
        )
    } else {
        return (
            <w3m-account-button />
        )
    }
}
