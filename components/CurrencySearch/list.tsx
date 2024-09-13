import { Flex, useToken } from '@chakra-ui/react'
import { transparentize } from 'polished'
import React, { ReactNode } from 'react'

export default function CurrencySearchList(props: {
  children: ReactNode,
  scroll: boolean
}) {
  const [border] = useToken('colors', ['border'])

  return (
    <Flex
      flexDirection={'column'}
      maxHeight={props.scroll ? '300px' : 'auto'}
      overflowY={props.scroll ? 'scroll' : 'visible'}
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: transparentize(0.8, border),
        },
        '&::-webkit-scrollbar-thumb': {
          background: transparentize(0.5, border),
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: transparentize(0.4, border),
        },
      }}
    >
      {props.children}
    </Flex>
  )
}
