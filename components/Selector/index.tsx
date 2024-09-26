'use client'
import { Flex, useToken } from '@chakra-ui/react'
import { transparentize } from 'polished'
import React, { ReactNode } from 'react'

export default function Selector(props: {
  children: ReactNode,
  onClick?: () => void
}) {
  const [border] = useToken('colors', ['border'])

  return (
    <Flex
      flexDirection={'row'}
      padding={2}
      paddingX={5}
      flex={2}
      justifyContent={'center'}
      alignItems={'center'}
      borderWidth={1}
      borderColor={transparentize(0.9, border)}
      borderRadius={10}
      gap={3}
      transition={'all .2s ease-in-out'}
      onClick={props.onClick}
      
      _hover={{
        cursor: 'pointer',
        borderColor: transparentize(0.8, border)
      }}
    >
      { props.children }
    </Flex>
  )
}
