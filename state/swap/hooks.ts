import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { Field, selectToken, typeInput } from "./actions";
import { useCallback } from "react";
import TokenInterface from "@/interface/token";
import { ChainId, CurrencyAmount, JSBI, Token, TokenAmount } from "@dreyerxswap/v2-sdk";
import { parseUnits } from "viem";

export function useSwapState(): RootState['swap'] {
    return useSelector<RootState, RootState['swap']>(state => state.swap)
}

export function useSwapActionHandlers(): {
    onTokenSelection: (field: Field, token: TokenInterface) => void,
    onUserInput: (field: Field, typedValue: string) => void
} {
    const dispatch = useDispatch<AppDispatch>()

    const onTokenSelection = useCallback((field: Field, token: TokenInterface) => {
        dispatch(selectToken({ field, token }))
    }, [dispatch])

    const onUserInput = useCallback((field: Field, typedValue: string) => {
        dispatch(typeInput({ field, typedValue }))
    }, [dispatch])

    return {
        onTokenSelection,
        onUserInput
    }
}

export function useSwapInfo() {
    // new Router([], )
}

export function tryParseAmount(
    value?: string,
    token?: TokenInterface
): CurrencyAmount | undefined {
    if (!value || !token) {
        return undefined
    }

    try {
        const tokenObject = new Token(
            ChainId.MAINNET,
            token.address,
            token.decimals,
            token.symbol,
            token.name
        )
        const typedValueParsed = parseUnits(value, token.decimals).toString()
        if (typedValueParsed !== '0') {
            return new TokenAmount(tokenObject, JSBI.BigInt(typedValueParsed))
        }
    } catch (error) {
        console.debug(`Failed to parse input amount: ${value}`, error)
    }

    return undefined
}