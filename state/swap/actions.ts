import TokenInterface from "@/interface/token";
import { createAction } from "@reduxjs/toolkit";

export enum Field {
    INPUT = 1,
    OUTPUT = 2
}

export const selectToken = createAction<{ field: Field, token: TokenInterface }>('swap/selectToken')
export const typeInput = createAction<{ field: Field, typedValue: string | undefined }>('swap/typeInput')
export const setRecipient = createAction<{ recipient: string }>('swap/setRecipient')