'use client'
import { ChainId, JSBI, Pair, Token, TokenAmount, Trade } from '@dreyerxswap/v2-sdk'
import { useCallback, useEffect, useState } from 'react'
import { readContract } from 'wagmi/actions'
import { tryParseAmount, useSwapState } from '@/state/swap/hooks'
import { config } from '@/config/wagmi'
import { abi as uniswapV2PairABI } from '@uniswap/v2-core/build/UniswapV2Pair.json'

async function createPair(tokenA: Token, tokenB: Token): Promise<Pair> {
    const pairAddress = Pair.getAddress(tokenA, tokenB);

    // Membaca reserve dari pasangan Uniswap V2
    const reserves = await readContract(config, {
        address: pairAddress as `0x${string}`,
        abi: uniswapV2PairABI,
        functionName: 'getReserves'
    });

    // Pastikan reserves berisi data yang valid
    if (!reserves || !Array.isArray(reserves)) {
        throw new Error('Gagal mengambil data reserves dari kontrak');
    }

    const [reserve0, reserve1] = reserves;

    // Sorting tokens
    const tokens = [tokenA, tokenB];
    const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]];

    // Membuat pasangan dengan nilai reserve
    const pair = new Pair(
        new TokenAmount(token0, reserve0),
        new TokenAmount(token1, reserve1)
    );
    return pair;
}

export function useTrade(
    chainId: ChainId = ChainId.MAINNET
) {
    const { inputToken, outputToken, typedValue } = useSwapState()

    const [pair, setPair] = useState<Pair | null>(null)
    const [trade, setTrade] = useState<Trade | null>(null)

    const fetchPairAndPrice = useCallback(async () => {
        try {
            const tokenA = new Token(
                chainId,
                inputToken?.address as string,
                inputToken?.decimals as number,
                inputToken?.symbol as string,
                inputToken?.name as string
            )
            const tokenB = new Token(
                chainId,
                outputToken?.address as string,
                outputToken?.decimals as number,
                outputToken?.symbol as string,
                outputToken?.name as string
            )

            const pairData = await createPair(tokenA, tokenB)
            setPair(pairData)

            const parsedAmount = tryParseAmount(
                typedValue ?? '0',
                inputToken
            )
            const amountIn = BigInt(
                JSBI.BigInt(
                    parsedAmount?.raw.toString() ?? '0'
                ).toString()
            )

            const tradeAmountIn = new TokenAmount(
                tokenA,
                amountIn
            )

            const trades = Trade.bestTradeExactIn(
                [
                    pair as Pair
                ],
                tradeAmountIn,
                tokenB
            )

            setTrade(trades[0])
        } catch (error) {
            console.log(`Can't fetch pair and price,`, error)
        }
    }, [chainId, inputToken, outputToken, typedValue, pair])

    useEffect(() => {
        if (inputToken && outputToken) {
            fetchPairAndPrice()
        }
    }, [inputToken, outputToken, fetchPairAndPrice])

    return {
        pair,
        fetchPairAndPrice,
        trade
    }
}