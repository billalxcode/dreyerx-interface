'use client'
import { Flex, Image, Spinner, Text, useToken } from '@chakra-ui/react'
import { transparentize } from 'polished'
import React, { useEffect, useState } from 'react'
import { formatUnits } from 'viem'
import { useAccount, useBalance } from 'wagmi'

export default function CurrencySearchItem(props: {
    image: string,
    text: string,
    symbol: string,
    decimals: number,
    address: string,
    onSelect: () => void
}) {
    const [border] = useToken('colors', ['border'])

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [balance, setBalance] = useState<bigint>(0)

    const { address } = useAccount()
    const { data: tokenBalance } = useBalance({
        address,
        token: props.address as `0x${string}`
    })

    const [bg2, text] = useToken('colors', ['bg2', 'text'])

    useEffect(() => {
        if (tokenBalance) {
            setBalance(tokenBalance.value)
            setIsLoading(false)
        }
    }, [tokenBalance])
    return (
        <Flex
            flexDirection={'row'}
            padding={3}
            justify={'space-between'}
            align={'center'}
            borderRadius={10}

            _hover={{
                cursor: 'pointer',
                backgroundColor: transparentize(.5, bg2)
            }}

            onClick={props.onSelect}
        >
            <Flex gap={2}>
                <Image
                    width={'32px'}
                    height={'32px'}
                    src={props.image}
                    alt={props.text}
                />
                <Flex
                    flexDirection={'column'}
                >
                    <Text fontSize={'12px'} fontWeight={'semibold'}>
                        {props.symbol}
                    </Text>
                    <Text fontSize={'10px'} color={transparentize(0.2, text)}>
                        {props.text}
                    </Text>
                </Flex>
            </Flex>
            {
                isLoading ? (
                    <Spinner size={'sm'} speed='1s' color={transparentize(0.5, border)} />
                ) : (
                    <Text fontSize={'12px'}>
                        {formatUnits(balance, props.decimals).substring(0, 7)} {props.symbol}
                    </Text>
                )
            }
        </Flex>
    )
}
