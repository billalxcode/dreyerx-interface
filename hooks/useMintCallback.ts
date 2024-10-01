import { useMintDeliveredInfo } from "@/state/mint/hooks";
import { usePool } from "./usePool";
import { Field } from "@/state/mint/actions";
import { useCallback, useState } from "react";
import { calculateSlippageAmount } from "@/utils";

export enum MintState {
    UNKNOWN = 'unknown',
    INVALID = 'invalid',
    ERROR = 'error',
    VALID = 'valid'
}

export function useMintCallback() {
    const { state, setState } = useState<MintState>(MintState.UNKNOWN)

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

    const callback = useCallback(() => {
        if (parsedAmount0 && parsedAmount1 && token0 && token1) {
            const amountsMin = {
                [Field.TOKEN0]: calculateSlippageAmount(parsedAmount0, noLiquidity ? 0 : 100),
                [Field.TOKEN1]: calculateSlippageAmount(parsedAmount1, noLiquidity ? 0 : 100)
            }

            console.log(amountsMin)
        }
    }, [
        parsedAmount0,
        parsedAmount1,
        token0,
        token1,
        noLiquidity
    ])

    return {
        state,
        callback
    }
}