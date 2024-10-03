import React from "react"
import { ModalWrapper } from "../Modal/wrapper"
import { Text } from "@chakra-ui/react"
import { PoolButtonState } from "./button"

// export 
// export function ModalStateRender(props: {
//     state: PoolButtonState
// }) {
    
// }
export function ModalState(props: {
    isOpen: boolean,
    onClose: () => void,
    state: PoolButtonState
}) {
    const title = props.state === PoolButtonState.LOADING
        ? "Please wait"
        : props.state === PoolButtonState.SUBMITTED
            ? "Successfully"
            : props.state === PoolButtonState.ERROR
                ? "Error"
                : "Mint"
    
    return (
        <ModalWrapper
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={title}
        >
            <Text>
                Hello World
            </Text>
        </ModalWrapper>
    )
}