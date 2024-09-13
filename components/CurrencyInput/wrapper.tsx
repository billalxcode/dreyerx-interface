'use client'
import { Flex, useToken } from '@chakra-ui/react'
import { transparentize } from 'polished'
import React, { ReactNode } from 'react'

export function CurrencyLabelWrapper(props: {
  children: ReactNode
}) {
  return (
    <Flex
      width={'full'}
      justify={'space-between'}
    >
      { props.children }
    </Flex>
  )
}

export default function CurrencyWrapper(props: {
  children: ReactNode
}) {
  const [bg1] = useToken('colors', ['bg1'])
  
  return (
    <Flex
      width={'full'}
      flexDirection={'column'}
      padding={3}
      gap={3}
      backgroundColor={transparentize(0.5, bg1)}
    >
      {props.children}
    </Flex>
  )
}
