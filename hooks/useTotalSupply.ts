import { erc20Abi } from "viem";
import { useReadContract } from "wagmi";

export function useTotalSupply(address?: string) {
    const { data } = useReadContract({
        address: address as `0x${string}`,
        abi: erc20Abi,
        functionName: "totalSupply"
    })
    return data
}