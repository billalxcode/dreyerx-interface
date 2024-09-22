import { config } from "@/config/wagmi";
import TokenInterface from "@/interface/token";
import { erc20Abi } from "viem";
import { writeContract } from "wagmi/actions";

export async function writeApproval(
    token: TokenInterface,
    spender: string,
    amount: bigint 
) {
    const contractResult = await writeContract(config, {
        address: token.address as `0x${string}`,
        abi: erc20Abi,
        functionName: 'approve',
        args: [spender as `0x${string}`, amount]
    })
    return contractResult
}