'use client'
import React from 'react'
import CurrencyWrapper, { CurrencyLabelWrapper } from './wrapper'
import { Flex, Icon, Input, Text, useToken } from '@chakra-ui/react'
import Selector from '../Selector'
import { transparentize } from 'polished'
import { FaChevronDown } from 'react-icons/fa6'
import Button from '../Button'

export default function CurrencyInput(props: {
    label: string
}) {
    const [text, border] = useToken('colors', ['text', 'border'])

    return (
        <CurrencyWrapper>
            <CurrencyLabelWrapper>
                <Text fontSize={'12px'}>{props.label}</Text>
            </CurrencyLabelWrapper>
            <Flex
                flexDirection={'row-reverse'}
                gap={2}
            >
                <Selector>
                    {/* <Image
                        width={'24px'}
                        height={'24px'}
                        src='https://github.com/dreyerx-swap/assets/blob/main/tokenlist/0xB926cB065726433791b4242F1aca8326808A9491/logo.png?raw=true'
                    /> */}
                    <Text
                        color={transparentize(0.3, text)}
                        fontWeight={'semibold'}
                        fontSize={'12px'}
                    >
                        Select Token
                    </Text>

                    <Icon as={FaChevronDown} width={'10px'} height={'10px'} />
                </Selector>
                <Button flex={1}>
                    <Text fontSize={'12px'}>Max</Text>
                </Button>
                <Input
                    placeholder='0.00'
                    textAlign={'left'}
                    borderWidth={1}
                    color={text}
                    flex={3}
                    borderColor={transparentize(0.9, border)}

                    _hover={{
                        borderColor: transparentize(0.8, border)
                    }}

                    _focusVisible={{
                        borderColor: transparentize(0.8, border)
                    }}
                />
            </Flex>
        </CurrencyWrapper>
    )
}
