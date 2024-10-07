'use client'
import React, { useEffect, useState } from 'react'
import CurrencyWrapper, { CurrencyLabelWrapper } from './wrapper'
import { Divider, Flex, Icon, Image, Input, Text, useDisclosure, useToken } from '@chakra-ui/react'
import Selector from '../Selector'
import { transparentize } from 'polished'
import { FaChevronDown } from 'react-icons/fa6'
import CurrencySearch from '../CurrencySearch'
import TokenInterface from '@/interface/token'
import { formatUnits } from 'viem'
import { Field } from '@/state/swap/actions'
import { Field as MintField } from '@/state/mint/actions'
import { usePathname } from 'next/navigation'
import { NATIVE_TOKEN } from '@/constants'

export default function CurrencyInput(props: {
    balance: bigint,
    typedValue: string | undefined,
    field: Field | MintField,
    showMaxButton: boolean,
    onUserInput: (value: string) => void,
    onSelectToken: (data: TokenInterface) => void,
    onMaxInput?: () => void,
    token?: TokenInterface,
    inputReadonly?: boolean
}) {
    const pathname = usePathname()
    const isSelectorDisabled = pathname == '/wrap'

    const [text, border] = useToken('colors', ['text', 'border'])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [token, setToken] = useState<TokenInterface | undefined>(
        pathname == '/wrap' ? NATIVE_TOKEN : undefined
    )

    const label = props.field === Field.INPUT
        ? (pathname === '/swap' ? "You pay" : pathname === '/wrap' ? "You wrap" : pathname === "/pool/new" ? "Input" : "You pay")
        : (pathname === '/swap' ? "You receive" : pathname === '/wrap' ? "You receive" : pathname === "/pool/new" ? "Input" : "YOu receive")


    useEffect(() => {
        setToken(props.token)
    }, [props.token])

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
                    <Flex gap={2}>
                        <Text fontSize={'12px'}>Balance: {formatUnits(props?.balance, token?.decimals ?? 18).substring(0, 7)} {token?.symbol}</Text>
                        {
                            props.showMaxButton ? (
                                <>
                                    <Divider orientation={'vertical'} />
                                    <Text
                                        fontSize={'12px'}
                                        fontWeight={'bold'}
                                        color={'primary1'}
                                        _hover={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={props.onMaxInput}
                                    >
                                        MAX
                                    </Text>
                                </>
                            ) : null
                        }
                    </Flex>
                </CurrencyLabelWrapper>
                <Flex
                    flexDirection={'row-reverse'}
                    gap={2}
                >
                    <Selector onClick={!isSelectorDisabled ? onOpen : undefined}>
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
                    <Input
                        placeholder='0.00'
                        textAlign={'left'}
                        borderWidth={1}
                        color={text}
                        flex={3}
                        isReadOnly={props.inputReadonly}
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
                key={`currency-search`}
                isOpen={isOpen}
                onClose={onClose}
                onSelect={onSelectToken}
            />
        </>
    )
}
