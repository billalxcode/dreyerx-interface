'use client'
import AppWalletProvider from '@/components/WalletProvider'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false
    },
    colors: {
        bg1: '#21242980',
        bg2: '#1b1b1b',

        text: '#f8f8f8',
        
        primary1: '#7a22c9',

        border: '#ffffff'
    },
    styles: {
        global: {
            body: {
                bg: 'bg1'
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
                {props.children}
            </AppWalletProvider>
        </ChakraProvider>
    )
}
