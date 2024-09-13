import { Box } from '@chakra-ui/react'
import React from 'react'

export default function Bloom() {
  return (
    <Box
        backgroundColor={'primary1'}
        width={'20px'}
        height={'20px'}
        position={'absolute'}
        zIndex={-999999999}
        opacity={.3}
        filter={'blur(20px)'}
        rounded={1000}
    />
  )
}
