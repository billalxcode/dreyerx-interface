import { WRAPPED_TOKEN } from "@/constants";
import TokenInterface from "@/interface/token";
import { ChainId, JSBI, Token, TokenAmount } from "@dreyerxswap/v2-sdk";
import { zeroAddress } from "viem";

export function tokenCurrency(token?: TokenInterface) {
    return typeof token !== 'undefined' ? new Token(
        ChainId.MAINNET,
        token.address,
        token.decimals,
        token.symbol,
        token.name
    ) : undefined
}

export function wrappedCurrency(token?: TokenInterface) {
    return token?.address == zeroAddress ? WRAPPED_TOKEN : token
}

export function wrappedCurrencyAmount(
    token?: TokenInterface,
    amount?: JSBI
) {
    const wrapped = wrappedCurrency(token)
    if (!wrapped) return undefined

    const currency = tokenCurrency(wrapped)
    return wrapped && amount && currency ?
        new TokenAmount(currency, amount)
        : undefined
}