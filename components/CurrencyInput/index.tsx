'use client'
import React, { useState } from 'react'
import CurrencyWrapper, { CurrencyLabelWrapper } from './wrapper'
import { Flex, Icon, Image, Input, Text, useDisclosure, useToken } from '@chakra-ui/react'
import Selector from '../Selector'
import { transparentize } from 'polished'
import { FaChevronDown } from 'react-icons/fa6'
import Button from '../Button'
import CurrencySearch from '../CurrencySearch'
import TokenInterface from '@/interface/token'
import { formatUnits } from 'viem'
import { Field } from '@/state/swap/actions'

export default function CurrencyInput(props: {
    balance: bigint,
    typedValue: string | undefined,
    field: Field,
    showMaxButton: boolean,
    onUserInput: (value: string) => void,
    onSelectToken: (data: TokenInterface) => void,
    onMaxInput?: () => void
}) {
    const [text, border] = useToken('colors', ['text', 'border'])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [token, setToken] = useState<TokenInterface | undefined>()
    const label = props.field === Field.INPUT ? "You're Selling" : "You're buying"

    const onSelectToken = (data: TokenInterface) => {
        setToken(data)
        props.onSelectToken(data)
        onClose()
    }

    return (
        <>
            <CurrencyWrapper>
                <CurrencyLabelWrapper>
                    <Text fontSize={'12px'}>{label}</Text>
                    <Text fontSize={'12px'}>Balance: {formatUnits(props?.balance, token?.decimals ?? 18).substring(0, 7)} {token?.symbol}</Text>
                </CurrencyLabelWrapper>
                <Flex
                    flexDirection={'row-reverse'}
                    gap={2}
                >
                    <Selector onClick={onOpen}>
                        {
                            token ? (
                                <Image
                                    src={token.logoURI}
                                    alt={token.symbol}
                                    width={'24px'}
                                    height={'24px'}
                                    borderRadius={'full'}
                                />
                            ) : null
                        }
                        <Text
                            color={transparentize(0.3, text)}
                            fontWeight={'semibold'}
                            fontSize={'12px'}
                        >
                            {token ? token.symbol : 'Select Token'}
                        </Text>

                        <Icon as={FaChevronDown} width={'10px'} height={'10px'} />
                    </Selector>
                    {
                        props.showMaxButton ? (
                            <Button flex={1} backgroundColor={'bg1'} onClick={props.onMaxInput}>
                                <Text fontSize={'12px'}>Max</Text>
                            </Button>
                        ) : null
                    }
                    <Input
                        placeholder='0.00'
                        textAlign={'left'}
                        borderWidth={1}
                        color={text}
                        flex={3}
                        borderColor={transparentize(0.9, border)}
                        value={props.typedValue}
                        onChange={(event) => props.onUserInput(event.target.value)}
                        _hover={{
                            borderColor: transparentize(0.8, border)
                        }}

                        _focusVisible={{
                            borderColor: transparentize(0.8, border)
                        }}
                    />
                </Flex>
            </CurrencyWrapper>

            <CurrencySearch
                key={`currency-search-${label.trim()}`}
                isOpen={isOpen}
                onClose={onClose}
                onSelect={onSelectToken}
            />
        </>
    )
}
