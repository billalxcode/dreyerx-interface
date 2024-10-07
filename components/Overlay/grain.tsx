import { Box } from '@chakra-ui/react'
import React from 'react'

export default function GrainOverlay() {
    return (
        <Box
            width={'full'}
            height={'full'}
            zIndex={9999}
            mixBlendMode={'overlay'}
            pointerEvents={'none'}
            backgroundPosition={'0 0'}
            backgroundAttachment={'fixed'}
            position={'absolute'}
            backgroundImage={"url('https://assets-global.website-files.com/65bea1fc9df2017448558c56/65bea1fc9df2017448558c8e_grain-65a31468a0bce.webp')"}
            backgroundSize={'300px'}
            top={0}
            bottom={0}
            left={0}
            right={0}
        />
    )
}
