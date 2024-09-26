import { MIN_ETH } from "@/constants";
import TokenInterface, { TokenType } from "@/interface/token";
import { JSBI } from "@dreyerxswap/v2-sdk";

export function maxAmountSpend(token: TokenInterface | undefined, amount: string | undefined) {
    if (!token) return JSBI.BigInt(0).toString()
    if (!amount) return JSBI.BigInt(0).toString()
    if (token.type == TokenType.NATIVE) {
        if (JSBI.greaterThan(JSBI.BigInt(amount), MIN_ETH)) {
            return JSBI.subtract(JSBI.BigInt(amount), MIN_ETH).toString()
        } else {
            return JSBI.BigInt(0).toString()
        }
    }
    return amount
}