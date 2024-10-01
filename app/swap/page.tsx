'use client'
import React, { useCallback } from 'react'
import Button from '@/components/Button';
import Card from '@/components/Card';
import CurrencyInput from '@/components/CurrencyInput';
import Header from '@/components/Header';
import Wrapper from '@/components/Swap/wrapper';
import SwapPoolTabs from '@/components/SwapPoolTabs';
import { Alert, AlertDescription, AlertIcon, Divider, Flex, Icon } from '@chakra-ui/react';
import { FaArrowDown } from 'react-icons/fa6';
import SwapButton from '@/components/Swap/button';
import { useAccount } from 'wagmi';
import { Field } from '@/state/swap/actions';
import { useSwapActionHandlers, useSwapState } from '@/state/swap/hooks';
import { formatUnits } from 'viem';
import { useTrade } from '@/hooks/useTrade';
import { TradePrice } from '@/components/Swap/trade';
import SwapInfo from '@/components/Swap/info';
import { useApproval } from '@/hooks/useApproval';
import { ROUTER_ADDRESS } from '@/constants';
import { useAccountBalance } from '@/hooks/useBalance';
import { useWrapCallback, WrapType } from '@/hooks/useWrapCallback';
import { maxAmountSpend } from '@/utils/maxAmountSpend';

export default function Swap() {
    const {
        onTokenSelection,
        onUserInput
    } = useSwapActionHandlers()
    const { address } = useAccount()
    const { inputToken, outputToken, typedValue } = useSwapState()

    const { trade } = useTrade()

    const {
        wrapType
    } = useWrapCallback()

    const isWrapToken = wrapType !== WrapType.NOT_APPLICABLE

    const {
        approvalState
    } = useApproval(inputToken, address?.toString() ?? undefined, ROUTER_ADDRESS)
    
    const { balance: balanceA } = useAccountBalance(address, inputToken)
    const { balance: balanceB } = useAccountBalance(address, outputToken)
    
    const maxAmountInput = maxAmountSpend(inputToken, balanceA.toString())

    const formattedAmounts =
        isWrapToken ? {
            [Field.INPUT]: typedValue,
            [Field.OUTPUT]: typedValue
        } : {
            [Field.INPUT]: typedValue,
            [Field.OUTPUT]: trade?.outputAmount.toSignificant(6)
        }

    const handleMaxInput = useCallback(() => {
        onUserInput(Field.INPUT, formatUnits(BigInt(maxAmountInput), inputToken?.decimals ?? 18))
    }, [maxAmountInput, onUserInput, inputToken])

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

                    <Alert status={'info'} bgColor={'transparent'} as={Card} width={['full', 0, '450px']}>
                        <AlertIcon color={'white'} />

                        <AlertDescription fontSize={'14px'}>This app is in development stage, some features may not work or have errors</AlertDescription>
                    </Alert>

                    <Card direction='column' width={['full', 'full', '450px']} gap={3}>
                        <CurrencyInput
                            field={Field.INPUT}
                            typedValue={formattedAmounts[Field.INPUT] ?? '0'}
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
                            field={Field.OUTPUT}
                            typedValue={formattedAmounts[Field.OUTPUT] ?? '0'}
                            showMaxButton={false}
                            balance={outputToken ? BigInt(balanceB) : BigInt(0)}
                            onUserInput={(value) => onUserInput(Field.OUTPUT, value)}
                            onSelectToken={(data) => onTokenSelection(Field.OUTPUT, data)}
                        />

                        {
                            trade !== null && typeof trade !== 'undefined' ? (
                                <TradePrice trade={trade} />
                            ) : null
                        }
                        <SwapButton
                            trade={trade}
                            approvalState={approvalState}
                        />
                    </Card>

                    {
                        trade !== null && typeof trade !== 'undefined' ? (
                            <SwapInfo trade={trade} />
                        ) : null
                    }
                </Flex>
            </Wrapper>
        </Flex>
    );
}
