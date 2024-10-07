import { Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

export default function Wrapper(props: {
    children: ReactNode
}) {
  return (
    <Flex
        width={'full'}
        // height={'100vh'}
        flexDirection={'column'}
        align={'center'}
        marginTop={10}
        marginBottom={10}
        paddingLeft={[2, 0, 0]}
        paddingRight={[2, 0, 0]}
    >
        {
            props.children
        }
    </Flex>
  )
}
