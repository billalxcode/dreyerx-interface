import { createAction } from "@reduxjs/toolkit";

export enum Field {
    TOKEN0 = 'token0',
    TOKEN1 = 'token1'
}

export const typeInput = createAction<{ field: Field, typedValue: string, noLiquidity: boolean }>('mint/typeInput')
export const resetMintState = createAction<void>('mint/resetMintState')