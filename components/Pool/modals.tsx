import React, { useEffect, useState } from "react"
import { ModalWrapper } from "../Modal/wrapper"
import { Flex, Link, Spinner, Text, useToken } from "@chakra-ui/react"
import { PoolButtonState } from "./button"
import { FaCircleCheck } from "react-icons/fa6"
import { DREYERX_EXPLORER_URL } from "@/constants"
import { transparentize } from "polished"
import { useMintCallback } from "@/hooks/useMintCallback"
import { Field } from "@/state/mint/actions"

export function ModalTransactionSubmitted(props: {
    tx: string | null
}) {
    const [text, bgSuccess] = useToken('colors', ['text', 'alert.success.background'])
    return (
        <Flex
            flexDirection={'column'}
            gap={3}
            justify={'center'}
            align={'center'}
            marginY={10}
        >
            <FaCircleCheck size={80} color={bgSuccess} />

            <Flex
                marginTop={10}
                flexDirection={'column'}
                align={'center'}
                gap={1}
            >
                <Text
                    fontWeight={'semibold'}
                    fontSize={'14px'}
                >
                    Transaction Submitted
                </Text>

                <Link
                    href={`${DREYERX_EXPLORER_URL}/tx/${props.tx}`}
                    fontSize={'10px'}
                    target={'_blank'}
                    color={transparentize(0.5, text)}
                >
                    View on Explorer
                </Link>
            </Flex>
        </Flex>
    )
}

export function ModalTransactionLoading() {
    const [label, setLabel] = useState<string>('')

    const {
        state: mintState,
        parsedAmounts
    } = useMintCallback()

    const {
        [Field.TOKEN0]: parsedAmount0,
        [Field.TOKEN1]: parsedAmount1
    } = parsedAmounts

    const [text] = useToken('colors', ['text'])

    useEffect(() => {
        const inputValue = parsedAmount0 ? parsedAmount0.toSignificant(6) : '0'
        const inputSymbol = parsedAmount0 ? parsedAmount0.currency.symbol : 'UNKNOWN'
        const outputValue = parsedAmount1 ? parsedAmount1.toSignificant(6) : ''
        const outputSymbol = parsedAmount1 ? parsedAmount1.currency.symbol : 'UNKNOWN'


        setLabel(`Minting ${inputValue} ${inputSymbol}/${outputValue} ${outputSymbol}`)
    }, [mintState, parsedAmount0, parsedAmount1])

    return (
        <Flex
            flexDirection={'column'}
            gap={3}
            justify={'center'}
            align={'center'}
            marginY={10}
        >
            <Spinner width={'80px'} height={'80px'} color='primary1' />

            <Flex
                marginTop={10}
                flexDirection={'column'}
                align={'center'}
                gap={1}
            >
                <Text
                    fontWeight={'semibold'}
                    fontSize={'14px'}
                >
                    Waiting for Confirmation
                </Text>

                <Text
                    fontSize={'12px'}
                >
                    {label}
                </Text>

                <Text
                    fontSize={'10px'}
                    color={transparentize(0.5, text)}
                >
                    Confirm this transaction in your wallet
                </Text>
            </Flex>
        </Flex>
    )
}

export function ModalStateRender(props: {
    state: PoolButtonState,
    data: string | null
}) {
    if (props.state == PoolButtonState.LOADING) {
        return <ModalTransactionLoading />
    } else if (props.state == PoolButtonState.SUBMITTED) {
        return <ModalTransactionSubmitted tx={props.data} />
    }
}
export function ModalState(props: {
    isOpen: boolean,
    onClose: () => void,
    state: PoolButtonState,
    data: string | null
}) {
    const title = props.state === PoolButtonState.LOADING
        ? "Please wait"
        : props.state === PoolButtonState.SUBMITTED
            ? "Successfully"
            : props.state === PoolButtonState.ERROR
                ? "Error"
                : "Mint"

    return (
        <ModalWrapper
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={title}
        >
            <ModalStateRender state={props.state} data={props.data} />
        </ModalWrapper>
    )
}