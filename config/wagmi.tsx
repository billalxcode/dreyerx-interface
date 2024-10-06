import type { CaipNetwork } from '@reown/appkit-common'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { cookieStorage, createStorage } from 'wagmi'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const mainnet: CaipNetwork = {
    id: 'eip155:23451',
    chainId: 23451,
    name: 'DreyerX Mainnet',
    currency: 'DRX',
    explorerUrl: 'https://scan.dreyerx.com',
    rpcUrl: 'https://rpc.dreyerx.com',
    chainNamespace: 'eip155'
}

export const networks = [mainnet]

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks
})

export const config = wagmiAdapter.wagmiConfig