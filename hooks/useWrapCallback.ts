import { TokenType } from "@/interface/token";
import { tryParseAmount, useSwapState } from "@/state/swap/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccountBalance } from "./useBalance";
import { useAccount } from "wagmi";
import { writeContract } from "wagmi/actions";
import { config } from "@/config/wagmi";
import { WETH } from "@dreyerxswap/v2-sdk";
import WETH_ABI from '@/constants/abis/weth.json'

export enum WrapType {
    NOT_APPLICABLE,
    WRAP,
    UNWRAP
}

export enum WrapCallbackState {
    INVALID,
    LOADING,
    SUBMITTED
}

export function useWrapCallback(
) {
    const { address } = useAccount()
    const [tx, setTx] = useState<string | null>(null)
    const [state, setState] = useState<WrapCallbackState>(WrapCallbackState.INVALID)

    const [wrapType, setWrapType] = useState<WrapType>(WrapType.NOT_APPLICABLE)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const { inputToken, outputToken, typedValue } = useSwapState()

    const { balance } = useAccountBalance(address, inputToken)

    const inputAmount = useMemo(() => tryParseAmount(typedValue, inputToken), [typedValue, inputToken])
    const sufficientBalance = inputAmount && balance
    
    const depositCallback = useCallback(async () => {
        if (sufficientBalance && inputAmount && balance) {
            try {
                const txHash = await writeContract(config, {
                    address: WETH[23451].address as `0x${string}`,
                    abi: WETH_ABI,
                    functionName: 'deposit',
                    value: BigInt(inputAmount.raw.toString())
                })
                console.log(txHash)
                setTx(txHash)
                setState(WrapCallbackState.SUBMITTED)
            } catch (error) {
                setState(WrapCallbackState.INVALID)
                console.log("Could not deposit")
            }
        } else {
            setState(WrapCallbackState.INVALID)
            setErrorMessage("Insufficient DRX Balance")
        }
    }, [inputAmount, balance, sufficientBalance])

    const withdrawCallback = useCallback(async () => {
        if (sufficientBalance && inputAmount && balance) {
            try {
                const txHash = await writeContract(config, {
                    address: WETH[23451].address as `0x${string}`,
                    abi: WETH_ABI,
                    functionName: 'withdraw',
                    args: [BigInt(inputAmount.raw.toString())]
                })
                console.log(txHash)
                setTx(txHash)
                setState(WrapCallbackState.SUBMITTED)
            } catch (error) {
                console.log("Could not withdraw", error)
                setState(WrapCallbackState.INVALID)
                
            }
        } else {
            setErrorMessage("Insufficient WDRX Balance")
            setState(WrapCallbackState.INVALID)
        }
    }, [inputAmount, balance, sufficientBalance])

    useEffect(() => {
        if (inputToken?.type === TokenType.NATIVE && outputToken?.address === WETH[23451].address) {
            setWrapType(WrapType.WRAP)
        } else if (inputToken?.address === WETH[23451].address && outputToken?.type === TokenType.NATIVE) {
            setWrapType(WrapType.UNWRAP)
        } else {
            setWrapType(WrapType.NOT_APPLICABLE)
        }
    }, [inputToken, outputToken])


    return {
        wrapType,
        callback: wrapType === WrapType.WRAP ? depositCallback : withdrawCallback,
        errorMessage,
        tx,
        state
    }
}