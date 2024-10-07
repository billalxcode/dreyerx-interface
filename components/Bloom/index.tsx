import { Box } from '@chakra-ui/react'
import React from 'react'

export default function Bloom() {
  return (
    <Box
        backgroundColor={'primary1'}
        width={'400px'}
        height={'400px'}
        position={'absolute'}
        zIndex={-1000000}
        opacity={.3}
        filter={'blur(55px)'}
        top={'-200px'}
        left={'-200px'}
        rounded={1000}
    />
  )
}
