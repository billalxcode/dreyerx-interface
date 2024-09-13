import { Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

export default function Wrapper(props: {
    children: ReactNode
}) {
  return (
    <Flex
        width={'full'}
        flexDirection={'column'}
        gap={3}
        paddingBottom={3}
    >
        { props.children }
    </Flex>
  )
}
