import React, { ReactNode } from 'react'
import { ModalWrapper } from '../Modal/wrapper'

function CurrencySearchModal(props: {
    children: ReactNode,
    isOpen: boolean,
    onClose: () => void
}) {
    return (
        <ModalWrapper
            isOpen={props.isOpen}
            onClose={props.onClose}
            title='Select a token'
        >
            { props.children }
        </ModalWrapper>
    )
}

export { CurrencySearchModal }