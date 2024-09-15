'use client'
import StoreProvider from '@/components/Provider/StoreProvider'
import AppWalletProvider from '@/components/Provider/WalletProvider'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { transparentize } from 'polished'
import React, { ReactNode } from 'react'

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false
    },
    colors: {
        bg1: '#212429',
        bg2: '#1b1b1b',

        text: '#f8f8f8',

        primary1: '#7a22c9',

        border: '#ffffff'
    },
    styles: {
        global: {
            body: {
                bg: transparentize(0.5, '#212429')
            }
        }
    }
})

export default function AppProvider(props: {
    children: ReactNode
}) {
    return (
        <ChakraProvider theme={theme}>
            <AppWalletProvider>
                <StoreProvider>
                    {props.children}
                </StoreProvider>
            </AppWalletProvider>
        </ChakraProvider>
    )
}
