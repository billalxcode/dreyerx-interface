import React from 'react'
import Button from '../Button'
import { Text } from '@chakra-ui/react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

export default function WalletConnectButton() {
    const { open } = useWeb3Modal()
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