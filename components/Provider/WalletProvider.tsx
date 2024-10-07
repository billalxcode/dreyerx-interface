'use client'

import { mainnet, networks, projectId, wagmiAdapter } from "@/config/wagmi"
import { createAppKit, Metadata } from "@reown/appkit/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { Config, cookieToInitialState, WagmiProvider } from "wagmi"

const queryClient = new QueryClient()

if (!projectId) {
    throw new Error('Project ID is not defined')
}

const metadata: Metadata = {
    name: 'dreyerx-swap',
    description: 'DreyerX Swap App',
    url: 'https://swap.dreyerx.com',
    icons: ['https://storage.dreyerx.com/logo/logo-without-bg.png']
}

const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks,
    defaultNetwork: mainnet,
    metadata,
    features: {
        analytics: false,
        swaps: false
    }
})

export default function AppWalletProvider(props: {
    children: ReactNode
}) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config)
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                { props.children }
            </QueryClientProvider>
        </WagmiProvider>
    )
}