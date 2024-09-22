import { config } from "@/config/wagmi";
import TokenInterface from "@/interface/token";
import { readContract } from "wagmi/actions";
import { erc20Abi } from "viem";

export async function getAllowance(
    token: TokenInterface,
    owner: string,
    spender: string
) {
    const contractResult = await readContract(config, {
        address: token.address as `0x${string}`,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [owner as `0x${string}`, spender as `0x${string}`]
    })
    return contractResult
}