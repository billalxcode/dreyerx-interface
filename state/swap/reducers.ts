import TokenInterface from "@/interface/token";
import { createReducer } from "@reduxjs/toolkit";
import { Field, selectToken, setRecipient, typeInput } from "./actions";

export interface SwapState {
    field: Field,
    typedValue: string | undefined,
    inputToken: TokenInterface | undefined,
    outputToken: TokenInterface | undefined,
    recipient: string | null
}

const initialState: SwapState = {
    field: Field.INPUT,
    typedValue: '',
    inputToken: undefined,
    outputToken: undefined,
    recipient: ''
}

const swapReducer = createReducer(initialState, builder => {
    builder.addCase(selectToken, (state, action) => {
        const { field, token } = action.payload

        if (field === Field.INPUT) {
            state.inputToken = token
        }
        if (field === Field.OUTPUT) {
            state.outputToken = token
        }
    })
    .addCase(typeInput, (state, action) => {
        const { field, typedValue } = action.payload
        
        return {
            ...state,
            field,
            typedValue
        }
    })
    .addCase(setRecipient, (state, action) => {
        state.recipient = action.payload.recipient
    })
})

export default swapReducer