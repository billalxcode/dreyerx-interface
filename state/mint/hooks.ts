import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Field, typeInput } from "./actions";
import TokenInterface from "@/interface/token";
import { useAccount } from "wagmi";
import { PairState, usePair } from "@/hooks/usePairs";
import { useTotalSupply } from "@/hooks/useTotalSupply";
import { CurrencyAmount, JSBI } from "@dreyerxswap/v2-sdk";
import { useAccountBalance } from "@/hooks/useBalance";
import { tryParseAmount } from "../swap/hooks";
import { tokenCurrency, wrappedCurrency, wrappedCurrencyAmount } from "@/utils/wrappedCurrency";
import { NATIVE_TOKEN } from "@/constants";

export enum MintState {
    VALID = 'valid',
    ERROR = 'error',
    UNKNOWN = 'unknown'
}

export function useMintState(): RootState['mint'] {
    return useSelector<RootState, RootState['mint']>(state => state.mint)
}

export function useMintDeliveredInfo(
    token0: TokenInterface | null,
    token1: TokenInterface | null
) {
    const { address } = useAccount()
    const { field, typedValue, otherTypedValue } = useMintState()
    const [state, setState] = useState<MintState>(MintState.UNKNOWN)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const otherField = field == Field.TOKEN0 ? Field.TOKEN1 : Field.TOKEN0
    const {
        state: pairState,
        pair
    } = usePair(token0, token1)

    const tokens = useMemo(() => {
        return {
            [Field.TOKEN0]: token0 ?? undefined,
            [Field.TOKEN1]: token1 ?? undefined
        }
    }, [token0, token1]) as { [key in Field]: TokenInterface }

    const totalSupply = useTotalSupply(pair?.liquidityToken.address)
    const noLiquidity: boolean =
        pairState === PairState.NOT_EXISTS || Boolean(totalSupply && JSBI.equal(JSBI.BigInt(totalSupply.toString()), JSBI.BigInt(0)))

    const balanceToken0 = useAccountBalance(address, tokens[Field.TOKEN0] ?? undefined)
    const balanceToken1 = useAccountBalance(address, tokens[Field.TOKEN1] ?? undefined)

    const token0Amount = tryParseAmount(typedValue, tokens[field] ?? undefined)
    const token1Amount = useMemo(() => {
        if (noLiquidity) {
            if (otherTypedValue && tokens[otherField]) {
                return tryParseAmount(otherTypedValue, tokens[otherField])
            }
            return undefined
        } else if (token0Amount && token0 && token1) {
            const wrappedToken0Amount = wrappedCurrencyAmount(tokens[field], token0Amount.raw)
            const [tokenA, tokenB] = [
                wrappedCurrency(token0),
                wrappedCurrency(token1)
            ]

            if (tokenA && tokenB && wrappedToken0Amount && pair) {
                const tokenBCurrency = otherField === Field.TOKEN1 ? token1 : token0

                const tokenBAmount =
                    otherField === Field.TOKEN1
                        ? pair.priceOf(tokenCurrency(tokenA)).quote(wrappedToken0Amount)
                        : pair.priceOf(tokenCurrency(tokenB)).quote(wrappedToken0Amount)

                return tokenBCurrency === NATIVE_TOKEN ? CurrencyAmount.ether(tokenBAmount.raw) : tokenBAmount
            } else {
                return undefined
            }
        } else {
            return undefined
        }
    }, [
        noLiquidity,
        otherTypedValue,
        otherField,
        token1,
        pair,
        token0,
        token0Amount,
        field,
        tokens
    ])

    const parsedAmounts = useMemo(() => {
        return {
            [Field.TOKEN0]: field === Field.TOKEN0 ? token0Amount : token1Amount,
            [Field.TOKEN1]: field === Field.TOKEN0 ? token1Amount : token0Amount
        }
    }, [field, token0Amount, token1Amount])

    useEffect(() => {
        if (token0Amount && JSBI.greaterThan(token0Amount.raw, JSBI.BigInt(balanceToken0.balance.toString()))) {
            setErrorMessage(`Insufficient balance for ${token0?.symbol}`);
            setState(MintState.ERROR);
        } else if (token1Amount && JSBI.greaterThan(token1Amount.raw, JSBI.BigInt(balanceToken1.balance.toString()))) {
            setErrorMessage(`Insufficient balance for ${token1?.symbol}`);
            setState(MintState.ERROR);
        } else {
            setErrorMessage(null);
            setState(MintState.VALID);
        }
    }, [
        token0,
        token1,
        token0Amount,
        token1Amount,
        balanceToken0,
        balanceToken1,
        setErrorMessage,
        setState
    ]);

    return {
        pair,
        noLiquidity,
        balanceToken0,
        balanceToken1,
        parsedAmounts,
        state,
        errorMessage
    }
}

export function useMintActionHandlers(
    noLiquidity: boolean | undefined
): {
    onTokenAInput: (typed: string) => void,
    onTokenBInput: (typedValue: string) => void
} {
    const dispatch = useDispatch<AppDispatch>()

    const onTokenAInput = useCallback((typedValue: string) => {
        dispatch(typeInput({ field: Field.TOKEN0, typedValue, noLiquidity: noLiquidity === true }))
    }, [dispatch, noLiquidity])

    const onTokenBInput = useCallback((typedValue: string) => {
        dispatch(typeInput({ field: Field.TOKEN1, typedValue, noLiquidity: noLiquidity === true }))
    }, [dispatch, noLiquidity])

    return {
        onTokenAInput,
        onTokenBInput
    }
}