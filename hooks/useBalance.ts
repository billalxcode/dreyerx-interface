import TokenInterface from "@/interface/token";
import { useEffect, useState } from "react";
import { zeroAddress } from "viem";
import { useBalance } from "wagmi";

export function useAccountBalance(
    account?: string,
    token?: TokenInterface
) {
    const [balance, setBalance] = useState<bigint | number>(0)
    const { data: balance_result } = useBalance({
        address: account as `0x${string}`,
        token: token?.address !== zeroAddress ? token?.address as `0x${string}` : undefined
    })

    useEffect(() => {
        if (balance_result?.value !== balance) {
            setBalance(balance_result?.value ?? 0)
        }
    }, [balance_result, balance, token])

    return {
        balance
    }
}