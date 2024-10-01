import { configureStore } from "@reduxjs/toolkit";
import swapReducer from "./swap/reducers";
import mintReducer from "./mint/reducers";

const store = configureStore({
    reducer: {
        swap: swapReducer,
        mint: mintReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store