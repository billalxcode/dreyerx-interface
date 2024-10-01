import { createReducer } from "@reduxjs/toolkit";
import { Field, resetMintState, typeInput } from "./actions";

export interface MintState {
    readonly field: Field;
    readonly typedValue: string;
    readonly otherTypedValue: string;
}

const initialState: MintState = {
    field: Field.TOKEN0,
    typedValue: '',
    otherTypedValue: ''
};

const mintReducer = createReducer<MintState>(initialState, builder => {
    builder
        .addCase(resetMintState, () => initialState)
        .addCase(typeInput, (state, action) => {
            const { field, typedValue, noLiquidity } = action.payload;
            
            if (noLiquidity) {
                if (field == state.field) {
                    return {
                        ...state,
                        field,
                        typedValue
                    }
                } else {
                    return {
                        ...state,
                        field,
                        typedValue,
                        otherTypedValue: state.typedValue
                    }
                }
            } else {
                return {
                    ...state,
                    field,
                    typedValue,
                    otherTypedValue: ''
                }
            }
        });
});

export default mintReducer;
