import { BIPS_BASE, DEFAULT_DEADLINE_FROM_NOW, ROUTER_ADDRESS } from "@/constants";
import { JSBI, Percent, Router, Trade } from "@dreyerxswap/v2-sdk";
import { useCallback, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { abi as UniswapV2Router02Abi } from "@uniswap/v2-periphery/build/UniswapV2Router02.json"

export enum SwapCallbackState {
    INVALID,
    LOADING,
    VALID,
    SUBMITTED
}

export function useSwapCallback(
    trade: Trade | null,
    deadline: number = DEFAULT_DEADLINE_FROM_NOW
) {
    const { address } = useAccount()
    const [state, setState] = useState<SwapCallbackState>(SwapCallbackState.INVALID)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [tx, setTx] = useState<string | null>(null)
    
    const routerParams = trade ? Router.swapCallParameters(
        trade,
        {
           feeOnTransfer: false,
           allowedSlippage: new Percent(
            JSBI.BigInt(100), BIPS_BASE
           ),
           recipient: address?.toString() ?? '',
           ttl: deadline
        }
    ) : null

    const { data, writeContractAsync, isPending } = useWriteContract()

    const callback = useCallback(async () => {
        if (!address || !trade) {
            setState(SwapCallbackState.INVALID)
            setErrorMessage("Invalid trade or recipient address")
        }

        setState(SwapCallbackState.LOADING)

        try {
            const result = await writeContractAsync({
                address: ROUTER_ADDRESS,
                abi: UniswapV2Router02Abi,
                functionName: routerParams?.methodName ?? 'swapTokensForExactTokens',
                args: routerParams?.args,
                value: routerParams?.value ? BigInt(routerParams?.value) : undefined
            })
            setTx(result)
            setState(SwapCallbackState.SUBMITTED)
        } catch (error: unknown) {
            setErrorMessage(`Error executing swap: ${error}`)
            setState(SwapCallbackState.INVALID)
        }
    }, [
        address,
        trade,
        routerParams,
        writeContractAsync
    ])

    return {
        routerParams,
        callback,
        state,
        errorMessage,
        isPending,
        data,
        tx
    }
}