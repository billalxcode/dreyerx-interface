import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Flex,
    Text
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import Card from '../Card'
import { Trade } from '@dreyerxswap/v2-sdk'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from '@/utils/prices'

function TradeInfoItem(props: {
    label: string,
    value: string
}) {
    return (
        <Flex
            align={'center'}
            justify={'space-between'}
        >
            <Text fontSize={'12px'}>{props.label}</Text>
            <Text fontSize={'12px'}>
                {props.value}
            </Text>
        </Flex>
    )
}

function SwapInfoWrapper(props: {
    children: ReactNode,
    trade: Trade
}) {
    const inputPriceLabel = props.trade ? (
        `${props.trade.inputAmount.toSignificant(4)} ${props.trade.inputAmount.currency.symbol}`
    ) : '-'
    const outputPriceLabel = props.trade ? (
        `${props.trade.outputAmount.toSignificant(4)} ${props.trade.outputAmount.currency.symbol}`
    ) : '-'

    return (
        <Accordion
            allowMultiple
            width={'450px'}
        >
            <AccordionItem border={'none'}>
                <AccordionButton>
                    <Flex
                        width={'full'}
                        justify={'space-between'}
                    >
                        <Text fontSize={'12px'}>
                            {inputPriceLabel} ≈ {outputPriceLabel}

                        </Text>
                    </Flex>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    {props.children}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default function SwapInfo(props: {
    trade: Trade
}) {

    const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(props.trade)

    const priceImpact = priceImpactWithoutFee ? `${priceImpactWithoutFee.toFixed(2)}%` : '-'
    const liquidityFee = realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${props.trade.inputAmount.currency.symbol}` : '-'
    const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(props.trade, 100)

    return (
        <Card
            width={'450px'}
        >
            <SwapInfoWrapper trade={props.trade}>
                <Flex
                    flexDirection={'column'}
                    width={'full'}
                    gap={1}
                >
                    <TradeInfoItem label='Slippage Tolerance' value='1%' />
                    <TradeInfoItem label='Minimum Received' value={`${slippageAdjustedAmounts[2]?.toSignificant(4)} ${props.trade.outputAmount.currency.symbol}`} />
                    <TradeInfoItem label='Price impact' value={priceImpact} />
                    <TradeInfoItem label='Liquidity Fee' value={liquidityFee} />
                </Flex>
            </SwapInfoWrapper>
        </Card>
    )
}
