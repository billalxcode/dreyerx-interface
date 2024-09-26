import TokenInterface, { TokenType } from "@/interface/token";
import { getAllowance } from "@/utils/allowance";
import { useCallback, useEffect, useState } from "react";
import { writeApproval } from "@/utils/approve";
import { maxInt256 } from "viem";

export enum ApprovalState {
    UNKNOWN,
    NOT_APPROVED,
    PENDING,
    APPROVED
}

export function useApproval(
    token: TokenInterface | undefined,
    owner: string | undefined,
    spender: string
) {
    const [approvalState, setApprovalState] = useState<ApprovalState>(
        ApprovalState.UNKNOWN
    )
    const [pending, setPending] = useState<boolean>(false)
    const [allowance, setAllowance] = useState<bigint | null>(null)
    
    const fetchAllowance = useCallback(async () => {
        try {
            if (typeof token === 'undefined') return
            if (typeof owner === 'undefined') return
            const result = await getAllowance(token, owner, spender)
            setAllowance(result)
        } catch (error) {
            console.error("Error fetching allowance", error)
            setAllowance(null)
        }
    }, [token, owner, spender])

    useEffect(() => {
        if (token && owner && spender && token.type !== TokenType.NATIVE) {
            fetchAllowance()
        }
    }), [token, owner, spender]

    useEffect(() => {
        if (!allowance) {
            setApprovalState(ApprovalState.UNKNOWN)
        } else if (allowance === BigInt(0)) {
            setApprovalState(ApprovalState.NOT_APPROVED)
        } else if (allowance > BigInt(0)) {
            setApprovalState(ApprovalState.APPROVED)
        }
    }, [allowance])

    const callback = useCallback(async () => {
        if (typeof token === 'undefined') return null
        if (approvalState !== ApprovalState.NOT_APPROVED) {
            console.error("Approval not required");
            return;
        }

        try {
            setPending(true)
            
            await writeApproval(token, spender, maxInt256)

            await fetchAllowance()
            setApprovalState(ApprovalState.APPROVED)
        } catch (error) {
            console.error("Error approving token", error)
        }
    }, [token, spender, approvalState, fetchAllowance])

    return {
        approvalState,
        callback,
        pending,
        allowance
    }
}