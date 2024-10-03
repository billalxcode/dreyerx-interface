'use client'
import { Flex, Image, LinkBox, LinkOverlay, Text, useToken } from '@chakra-ui/react'
import React from 'react'
import HeaderWallet from './wallet'
import { transparentize } from 'polished'

export default function Header() {
    const [border] = useToken('colors', ['border'])

    return (
        <Flex
            flexDirection={'row'}
            justifyContent={'space-evenly'}
            padding={5}
            borderRadius={5}
            borderBottomWidth={1}
            width={'full'}
            borderColor={transparentize(0.9, border)}
        >
            <LinkBox
                display={'flex'}
                alignItems={'center'}
            >
                <LinkOverlay
                    href='/'
                    display={'flex'}
                    alignItems={'center'}
                    gap={2}
                >
                    <Image
                        src='/svgs/logo.svg'
                        w={'32px'}
                        h={'32px'}
                        alt='Logo'
                    />
                    <Text
                        fontWeight={'bold'}
                    >
                        DreyerX Swap
                    </Text>
                </LinkOverlay>
            </LinkBox>
            <Flex>
                <HeaderWallet />
            </Flex>
        </Flex>
    )
}
