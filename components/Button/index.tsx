'use client'
import React, { ReactNode } from 'react'
import { Button as ChakraButton, ButtonProps as ChakraButtonProps, useToken } from '@chakra-ui/react'
import { darken, transparentize } from 'polished'

interface ButtonProps extends ChakraButtonProps {
    children: ReactNode,
    transparent?: boolean
}

export default function Button(props: ButtonProps) {
    const [border, bg2] = useToken('colors', ['border', 'bg2'])
    const [bg] = useToken('colors', [props.backgroundColor as string])
    const backgroundColor = bg ?? bg2
    console.log(darken(0.9, backgroundColor))

    return (
        <ChakraButton
            width={props.width}
            backgroundColor={props.transparent ? 'transparent' : backgroundColor}
            borderWidth={props.transparent ? 0 : 1}
            borderColor={transparentize(0.9, border)}
            transition={'all .2s ease-in-out'}
            isLoading={props.isLoading}

            _hover={{
                cursor: 'pointer',
                backgroundColor: darken(0.1, backgroundColor),
                borderColor: transparentize(0.9, border)
            }}
            _focusVisible={{
                cursor: 'pointer',
                backgroundColor: darken(0.1, backgroundColor),
                borderColor: transparentize(0.9, border)
            }}

            onClick={props.onClick}
        >
            {props.children}
        </ChakraButton>
    )
}
