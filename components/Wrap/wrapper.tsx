import { Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

export default function Wrapper(props: {
    children: ReactNode
}) {
  return (
    <Flex
        width={'full'}
        flexDirection={'column'}
        align={'center'}
        marginTop={10}
        marginBottom={10}
    >
        { props.children }
    </Flex>
  )
}
