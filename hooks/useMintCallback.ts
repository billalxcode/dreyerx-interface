import { useMintDeliveredInfo } from "@/state/mint/hooks";
import { usePool } from "./usePool";
import { Field } from "@/state/mint/actions";
import { useCallback, useState } from "react";
import { calculateSlippageAmount } from "@/utils";
import { DEFAULT_DEADLINE_FROM_NOW, ROUTER_ADDRESS } from "@/constants";
import { TokenType } from "@/interface/token";
import { wrappedCurrency } from "@/utils/wrappedCurrency";
import { useAccount } from "wagmi";
import { writeContract } from "wagmi/actions";
import { config } from "@/config/wagmi";
import UniswapV2Router02 from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'

export enum MintState {
    UNKNOWN = 'unknown',
    INVALID = 'invalid',
    ERROR = 'error',
    VALID = 'valid'
}

export function useMintCallback() {
    const { address } = useAccount()
    const [state, setState] = useState<MintState>(MintState.UNKNOWN)

    const {
        token0,
        token1
    } = usePool()

    const {
        noLiquidity,
        parsedAmounts
    } = useMintDeliveredInfo(token0, token1)
    const {
        [Field.TOKEN0]: parsedAmount0,
        [Field.TOKEN1]: parsedAmount1
    } = parsedAmounts

    const callback = useCallback(async () => {
        if (parsedAmount0 && parsedAmount1 && token0 && token1) {
            const amountsMin = {
                [Field.TOKEN0]: calculateSlippageAmount(parsedAmount0, noLiquidity ? 0 : 100)[0],
                [Field.TOKEN1]: calculateSlippageAmount(parsedAmount1, noLiquidity ? 0 : 100)[0]
            }
            const deadlineFromNow = Math.ceil(Date.now() / 1000) + DEFAULT_DEADLINE_FROM_NOW
            console.log(token0)
            let method, args, value
            if (token0.type === TokenType.NATIVE || token1.type === TokenType.NATIVE) {
                const token1IsNative = token1.type === TokenType.NATIVE
                method = 'addLiquidityETH'
                args = [
                    wrappedCurrency(token1IsNative ? token0 : token1)?.address ?? '',
                    (token1IsNative ? parsedAmount0 : parsedAmount1).raw.toString(),
                    amountsMin[token1IsNative ? Field.TOKEN0 : Field.TOKEN1].toString(),
                    amountsMin[token1IsNative ? Field.TOKEN1 : Field.TOKEN0].toString(),
                    address,
                    deadlineFromNow
                ]
                value = BigInt((token1IsNative ? parsedAmount1 : parsedAmount0).raw.toString())
            } else {
                method = 'addLiquidity'
                args = [
                    wrappedCurrency(token0)?.address ?? '',
                    wrappedCurrency(token1)?.address ?? '',
                    parsedAmount0.raw.toString(),
                    parsedAmount1.raw.toString(),
                    amountsMin[Field.TOKEN0].toString(),
                    amountsMin[Field.TOKEN1].toString(),
                    address,
                    deadlineFromNow
                ]
                value = BigInt(0)
            }
            console.log(args)
            const txHash = await writeContract(config, {
                address: ROUTER_ADDRESS,
                abi: UniswapV2Router02.abi,
                functionName: method,
                args: args,
                value: value
            })
            console.log(txHash)
        }
    }, [
        parsedAmount0,
        parsedAmount1,
        token0,
        token1,
        noLiquidity,
        address
    ])

    return {
        state,
        callback
    }
}