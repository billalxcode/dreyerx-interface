import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { Field, selectToken, typeInput } from "./actions";
import { useCallback } from "react";
import TokenInterface from "@/interface/token";

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