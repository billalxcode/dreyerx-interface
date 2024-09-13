'use client'
import React from 'react'
import Button from '@/components/Button';
import Card from '@/components/Card';
import CurrencyInput from '@/components/CurrencyInput';
import Header from '@/components/Header';
import Wrapper from '@/components/Swap/wrapper';
import SwapPoolTabs from '@/components/SwapPoolTabs';
import { Box, Divider, Flex, Icon } from '@chakra-ui/react';
import { FaArrowDown } from 'react-icons/fa6';
import SwapButton from '@/components/Swap/button';

export default function Swap() {
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

                    <Card direction='column' width={'450px'}>
                        <CurrencyInput label="You're Selling" />

                        <Flex alignItems={'center'} px={3} width={'full'}>
                            <Divider flex={1} />
                            <Button transparent>
                                <Icon as={FaArrowDown} />
                            </Button>
                            <Divider flex={1} />
                        </Flex>
                        <CurrencyInput label="You're Buying" />

                        <Box px={3} w={'full'}>
                            <SwapButton />
                        </Box>
                    </Card>
                </Flex>
            </Wrapper>
        </Flex>
    );
}
