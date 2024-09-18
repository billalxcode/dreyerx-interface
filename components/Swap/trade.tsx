import { Flex, Text } from '@chakra-ui/react'
import { Trade } from '@dreyerxswap/v2-sdk'
import React from 'react'

export function TradePrice(props: {
    trade: Trade
}) {
    if (props.trade?.executionPrice) {
        const quoteCurrency = props.trade.executionPrice.quoteCurrency
        const baseCurrency = props.trade.executionPrice.baseCurrency

        const label = `${quoteCurrency?.symbol} per ${baseCurrency?.symbol}`

        return (
            <Flex
                width={'full'}
                fontSize={'12px'}
                paddingX={2}
                justifyContent={'space-between'}
            >
                <Text>Price</Text>
                <Text
                >
                    {props.trade.executionPrice.toSignificant(6)} {label}
                </Text>
            </Flex>
        )
    }
}
