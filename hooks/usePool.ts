'use client'
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { useTokenInfo } from "./useTokenInfo"
import { zeroAddress } from "viem"
import { ChainId, WETH } from "@dreyerxswap/v2-sdk"

export enum PoolState {
    UNKNOWN,
    VALID,
    INVALID
}

export function usePool() {
    const [state, setState] = useState<PoolState>(PoolState.UNKNOWN)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const searchParams = useSearchParams()

    const tokens = useMemo(() => {
        const token0Address = searchParams.get('token0') as `0x${string}`
        const token1Address = searchParams.get('token1') as `0x${string}`
        
        if (token0Address !== null && token1Address !== null && token0Address === token1Address) {
            setState(PoolState.INVALID)
            setErrorMessage("Token A cannot be the same as Token B. Please select different tokens.")
        } else if (
            (token0Address == zeroAddress && token1Address == WETH[ChainId.MAINNET].address)
            ||
            (token0Address == WETH[ChainId.MAINNET].address && token1Address === zeroAddress)
        ) {
            setState(PoolState.INVALID)
            setErrorMessage("Unable to pair native token with its wrapped version. Please select a different token combination.")
        } else {
            setState(PoolState.VALID)
        }
        return [token0Address, token1Address]
    }, [searchParams])

    const token0 = useTokenInfo(tokens[0]).token
    const token1 = useTokenInfo(tokens[1]).token

    return {
        token0,
        token1,
        state,
        errorMessage
    }
}