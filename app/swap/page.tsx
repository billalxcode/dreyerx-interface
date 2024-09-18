'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Button from '@/components/Button';
import Card from '@/components/Card';
import CurrencyInput from '@/components/CurrencyInput';
import Header from '@/components/Header';
import Wrapper from '@/components/Swap/wrapper';
import SwapPoolTabs from '@/components/SwapPoolTabs';
import { Divider, Flex, Icon } from '@chakra-ui/react';
import { FaArrowDown } from 'react-icons/fa6';
import SwapButton from '@/components/Swap/button';
import { useAccount, useBalance } from 'wagmi';
import { Field } from '@/state/swap/actions';
import { useSwapActionHandlers, useSwapState } from '@/state/swap/hooks';
import { formatUnits } from 'viem';
import { useTrade } from '@/hooks/useTrade';
import { TradePrice } from '@/components/Swap/trade';

export default function Swap() {
    const {
        onTokenSelection,
        onUserInput
    } = useSwapActionHandlers()
    const { address } = useAccount()
    const { field, inputToken, outputToken, typedValue } = useSwapState()

    const { trade } = useTrade()

    const [balanceA, setBalanceA] = useState<bigint | number>(0)
    const [balanceB, setBalanceB] = useState<bigint | number>(0)

    const { data: balanceInput } = useBalance({
        address,
        token: inputToken ? inputToken.address as `0x${string}` : undefined
    })

    const { data: balanceOutput } = useBalance({
        address,
        token: outputToken ? outputToken.address as `0x${string}` : undefined
    })

    const formattedAmounts = {
        [field]: typedValue
    }

    useEffect(() => {
        if (balanceInput) {
            setBalanceA(balanceInput.value)
        }
        if (balanceOutput) {
            setBalanceB(balanceOutput.value)
        }
    }, [balanceInput, balanceOutput])

    const handleMaxInput = useCallback(() => {
        onUserInput(Field.INPUT, formatUnits(BigInt(balanceA), inputToken?.decimals ?? 18))
    }, [balanceA, onUserInput, inputToken])

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
                            typedValue={formattedAmounts[Field.INPUT]}
                            showMaxButton={true}
                            balance={inputToken ? BigInt(balanceA) : BigInt(0)}
                            onUserInput={(value) => onUserInput(Field.INPUT, value)}
                            onSelectToken={(data) => onTokenSelection(Field.INPUT, data)}
                            onMaxInput={handleMaxInput}
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
                            typedValue={formattedAmounts[Field.OUTPUT]}
                            showMaxButton={false}
                            balance={outputToken ? BigInt(balanceB) : BigInt(0)}
                            onUserInput={(value) => onUserInput(Field.OUTPUT, value)}
                            onSelectToken={(data) => onTokenSelection(Field.OUTPUT, data)}
                        />

                        {
                            trade !== null ? (
                                <TradePrice trade={trade} />
                            ) : null
                        }
                        <SwapButton />
                    </Card>
                </Flex>
            </Wrapper>
        </Flex>
    );
}
