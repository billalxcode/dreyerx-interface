import { config } from "@/config/wagmi";
import { ChainId, FACTORY_ADDRESS, Pair, Token, TokenAmount } from "@dreyerxswap/v2-sdk";
import { useCallback, useEffect, useMemo, useState } from "react";
import { multicall, readContract } from "wagmi/actions";
import UniswapV2FactoryABI from '@/constants/abis/factory.json'
import { MULTICALL_ADDRESS } from "@/constants";
import TokenInterface from "@/interface/token";
import UniswapV2PairAbi from "@/constants/abis/pair";
import { wrappedCurrency } from "@/utils/wrappedCurrency";

export enum PairState {
    LOADING = 'loading',
    READY = 'ready',
    ERROR = 'error',
    EXISTS = 'exists',
    NOT_EXISTS = 'not_exists'
}

export async function fetchPairAddresses(): Promise<string[]> {
    try {
        const totalPairs = await readContract(config, {
            address: FACTORY_ADDRESS as `0x${string}`,
            abi: UniswapV2FactoryABI,
            functionName: 'allPairsLength'
        }) as bigint


        const calls = Array.from({ length: Number(totalPairs) }, (_, i) => ({
            address: FACTORY_ADDRESS as `0x${string}`,
            abi: UniswapV2FactoryABI,
            functionName: 'allPairs',
            args: [i]
        }))

        const results = await multicall(config, {
            multicallAddress: MULTICALL_ADDRESS,
            contracts: calls
        })

        const pairAddresses = results.map((result) => result.result as string)
        return pairAddresses as string[]
    } catch (error) {
        console.error("Failed to fetch pair address: ", error)
        return []
    }
}

export async function fetchPairDetails(addresses: string[]) {
    try {
        const calls = addresses.map(address => [
            {
                address: address as `0x${string}`,
                abi: UniswapV2PairAbi,
                functionName: 'token0'
            },
            {
                address: address as `0x${string}`,
                abi: UniswapV2PairAbi,
                functionName: 'token1'
            }
        ]).flat()

        const results = await multicall(config, {
            multicallAddress: MULTICALL_ADDRESS,
            contracts: calls
        })

        console.log("Multicall results")
        console.log(results)
    } catch (error) {

    }
}

export async function fetchPairReserves(pairs: string[]) {
    const calls = pairs.map((value) => {
        const address = value as `0x${string}`

        return {
            address,
            abi: UniswapV2PairAbi,
            functionName: 'getReserves'
        }
    })

    const results = await multicall(config, {
        multicallAddress: MULTICALL_ADDRESS,
        contracts: calls
    })
    const reserves = results.map((v) => {
        return v.result as [bigint, bigint, number]
    })
    return reserves
}

export function useTrackedPairs() {
    const [pairs, setPairs] = useState<Pair[]>([])

    const [state, setState] = useState<PairState>(PairState.LOADING)

    const fetchPairs = async () => {
        setState(PairState.LOADING)

        try {
            const pairAddresses = await fetchPairAddresses()
            await fetchPairDetails(pairAddresses)
            setPairs(pairAddresses as unknown as Pair[])
            setState(PairState.READY)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPairs()
    }, [])

    return {
        pairs,
        state
    }
}

export function usePair(
    tokenA: TokenInterface | null,
    tokenB: TokenInterface | null
) {
    const [state, setState] = useState<PairState>(PairState.LOADING)
    const [pair, setPair] = useState<Pair | undefined>(undefined)

    const tokens = useMemo(() => {
        const t0 = wrappedCurrency(tokenA ?? undefined)
        const t1 = wrappedCurrency(tokenB ?? undefined)

        return [t0, t1]
    }, [tokenA, tokenB])

    const [token0, token1] = useMemo(() => {
        if (!tokens[0]?.address) return []
        if (!tokens[1]?.address) return []
        if (tokens[0].address === tokens[1].address) return []
        const t0 = new Token(
            ChainId.MAINNET,
            tokens[0]?.address,
            tokens[0]?.decimals,
            tokens[0]?.symbol,
            tokens[0]?.name
        );
        const t1 = new Token(
            ChainId.MAINNET,
            tokens[1]?.address,
            tokens[1]?.decimals,
            tokens[1]?.symbol,
            tokens[1]?.name
        );

        return t0.sortsBefore(t1) ? [t0, t1] : [t1, t0];
    }, [tokens]);

    const pairAddressess = useMemo(() => {
        if (!token0) return null
        if (!token1) return null

        return Pair.getAddress(token0, token1)
    }, [token0, token1])

    const fetchPairAndReserves = useCallback(async () => {
        if (pairAddressess && token0 && token1) {
            const reserves = await fetchPairReserves([pairAddressess])
            const pairObject = new Pair(
                new TokenAmount(
                    token0,
                    reserves[0][0]
                ),
                new TokenAmount(
                    token1,
                    reserves[0][1]
                )
            )
            setPair(pairObject)
            setState(PairState.READY)
        } else {
            setState(PairState.NOT_EXISTS)
        }
    }, [pairAddressess, token0, token1])

    useEffect(() => {
        fetchPairAndReserves()
    }, [fetchPairAndReserves])

    return {
        state,
        pair
    }
}