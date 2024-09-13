'use client'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button';
import Card from '@/components/Card';
import CurrencyInput from '@/components/CurrencyInput';
import Header from '@/components/Header';
import Wrapper from '@/components/Swap/wrapper';
import SwapPoolTabs from '@/components/SwapPoolTabs';
import { Box, Divider, Flex, Icon } from '@chakra-ui/react';
import { FaArrowDown } from 'react-icons/fa6';
import SwapButton from '@/components/Swap/button';
import TokenInterface from '@/interface/token';
import { useAccount, useBalance } from 'wagmi';

export default function Swap() {
    const { address } = useAccount()
    const [tokenA, setTokenA] = useState<TokenInterface>()
    const [tokenB, setTokenB] = useState<TokenInterface>()
    const [balanceA, setBalanceA] = useState<bigint | number>(0)
    const [balanceB, setBalanceB] = useState<bigint | number>(0)

    const { data: balanceDataA } = useBalance({
        address,
        token: tokenA ? tokenA.address as `0x${string}` : undefined,
        enabled: false
    })

    const { data: balanceDataB } = useBalance({
        address,
        token: tokenB ? tokenB.address as `0x${string}` : undefined,
        enabled: false
    })

    useEffect(() => {
        if (balanceDataA) {
            setBalanceA(balanceDataA.value)
        }
        if (balanceDataB) {
            setBalanceB(balanceDataB.value)
        }
    }, [balanceDataA, balanceDataB])
    return (
        <Flex
            flexDirection={'column'}
        >
            <Header />

            <Wrapper>
                <Flex
                    flexDirection={'column'}
                    gap={5}
                >
                    <SwapPoolTabs />

                    <Card direction='column' width={'450px'} gap={3}>
                        <CurrencyInput
                            label="You're Selling"
                            balance={tokenA ? balanceA : 0}
                            onSelectToken={setTokenA}
                        />

                        <Flex alignItems={'center'} px={3} width={'full'}>
                            <Divider flex={1} />
                            <Button transparent>
                                <Icon as={FaArrowDown} />
                            </Button>
                            <Divider flex={1} />
                        </Flex>
                        <CurrencyInput
                            label="You're Buying"
                            balance={tokenB ? balanceB : 0}
                            onSelectToken={setTokenB}
                        />

                        <Box px={3} w={'full'}>
                            <SwapButton />
                        </Box>
                    </Card>
                </Flex>
            </Wrapper>
        </Flex>
    );
}
