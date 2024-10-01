import { config } from "@/config/wagmi";
import { MULTICALL_ADDRESS } from "@/constants";
import TokenInterface, { TokenType } from "@/interface/token";
import { ChainId } from "@dreyerxswap/v2-sdk";
import { useCallback, useEffect, useMemo, useState } from "react";
import { erc20Abi } from "viem";
import { multicall } from "wagmi/actions";
import SwapTokenList from '@dreyerxswap/default-token-list'

export interface TokenInfo extends TokenInterface {
    totalSupply: bigint
}

export function useTokenInfo(address: `0x${string}` | null) {
    const [token, setToken] = useState<TokenInterface | null>(null)

    const calls = useMemo(() => {
        if (!address) return []
        return [
            {
                address,
                abi: erc20Abi,
                functionName: 'name'
            },
            {
                address,
                abi: erc20Abi,
                functionName: 'symbol'
            },
            {
                address,
                abi: erc20Abi,
                functionName: 'decimals'
            },
            {
                address,
                abi: erc20Abi,
                functionName: 'totalSupply'
            }
        ]
    }, [address])

    const fetchTokenInfo = useCallback(async () => {
        const defaultToken = SwapTokenList.tokens.find(
            (token) => token.address.toLowerCase() === address?.toLowerCase()
        )
        if (address) {
            if (defaultToken) {
                setToken(defaultToken)
            } else {
                const results = await multicall(config, {
                    multicallAddress: MULTICALL_ADDRESS,
                    contracts: calls
                })
                setToken({
                    address: address ?? '',
                    name: results[0]?.result as string ?? '',
                    symbol: results[1]?.result as string ?? '',
                    decimals: results[2]?.result as number ?? '',
                    chainId: ChainId.MAINNET,
                    type: TokenType.ERC20,
                    logoURI: ''
                })
            }
        }
    }, [calls, address])

    useEffect(() => {
        fetchTokenInfo()
    }, [fetchTokenInfo, token])

    return {
        token
    }
}