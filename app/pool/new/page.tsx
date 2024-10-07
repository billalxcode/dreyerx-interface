'use client'
import React, { useEffect } from 'react'
import Button from '@/components/Button'
import Card from '@/components/Card'
import CurrencyInput from '@/components/CurrencyInput'
import Header from '@/components/Header'
import PoolButton from '@/components/Pool/button'
import PoolHeader from '@/components/Pool/header'
import Wrapper from '@/components/Pool/wrapper'
import { PoolState, usePool } from '@/hooks/usePool'
import TokenInterface from '@/interface/token'
import { Field } from '@/state/mint/actions'
import { useMintActionHandlers, useMintDeliveredInfo, useMintState } from '@/state/mint/hooks'
import { maxAmountSpend } from '@/utils/maxAmountSpend'
import { Alert, AlertDescription, AlertIcon, Divider, Flex, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FaArrowDown } from 'react-icons/fa6'
import { formatUnits } from 'viem'
import Footer from '@/components/Footer'

export default function NewPool() {
  const router = useRouter()

  const {
    token0,
    token1,
    state: poolState,
    errorMessage: poolErrorMessage
  } = usePool()
  const { typedValue, otherTypedValue } = useMintState()
  const {
    noLiquidity,
    balanceToken0,
    balanceToken1,
    parsedAmounts,
    state,
    errorMessage
  } = useMintDeliveredInfo(token0, token1)
  const { onTokenAInput, onTokenBInput } = useMintActionHandlers(noLiquidity)

  const formattedAmounts = {
    [Field.TOKEN0]: typedValue ?? '',
    [Field.TOKEN1]: noLiquidity
      ? otherTypedValue
      : parsedAmounts[Field.TOKEN1]?.toSignificant(),
  };

  const maxAmounts = {
    [Field.TOKEN0]: token0 ? maxAmountSpend(token0, balanceToken0.balance.toString()) : '0',
    [Field.TOKEN1]: token1 ? maxAmountSpend(token1, balanceToken1.balance.toString()) : '0'
  }

  useEffect(() => {
    console.log('Mint state', state)
    console.log('Error message', errorMessage)
  }, [state, errorMessage])

  const onTokenSelection = (token: TokenInterface, field: Field) => {
    let tokenA = token0?.address ?? ''
    let tokenB = token1?.address ?? ''

    if (field === Field.TOKEN0) {
      tokenA = token.address
    } else if (field === Field.TOKEN1) {
      tokenB = token.address
    }
    router.push(`/pool/new?token0=${tokenA}&token1=${tokenB}`,)
  }

  const onMaxInput = (field: Field) => {
    if (field === Field.TOKEN0) {
      onTokenAInput(
        formatUnits(BigInt(maxAmounts[field]), token0?.decimals ?? 18)
      )
    } else if (field === Field.TOKEN1) {
      onTokenBInput(
        formatUnits(BigInt(maxAmounts[field]), token1?.decimals ?? 18)
      )
    }
  }

  return (
    <Flex
      flexDirection={'column'}
      height={'100vh'}
    >
      <Header />

      <Wrapper>
        <Flex
          flexDirection={'column'}
          gap={5}
        >
          <PoolHeader />

          {
            (
              poolState === PoolState.INVALID
            ) ? (
              <Alert status={'error'} bgColor={'alert.error.background'} as={Card} width={['full', 0, '450px']}>
                <AlertIcon color={'white'} />
                <AlertDescription fontSize={'14px'}>
                  {
                    poolErrorMessage
                  }
                </AlertDescription>
              </Alert>
            ) : null
          }

          <Alert status={'info'} bgColor={'transparent'} as={Card} width={['full', 'full', '450px']}>
            <AlertIcon color={'white'} />

            <AlertDescription fontSize={'14px'}>This app is in development stage, some features may not work or have errors</AlertDescription>
          </Alert>

          <Card direction={'column'} width={['full', 'full', '450px']} gap={3}>
            <CurrencyInput
              field={Field.TOKEN0}
              typedValue={formattedAmounts[Field.TOKEN0]}
              onUserInput={(value) => onTokenAInput(value)}
              onSelectToken={(data) => onTokenSelection(data, Field.TOKEN0)}
              balance={BigInt(balanceToken0.balance.toString())}
              token={token0 ?? undefined}
              onMaxInput={() => onMaxInput(Field.TOKEN0)}
              showMaxButton
            />

            <Flex alignItems={'center'} px={3} width={'full'}>
              <Divider flex={1} />
              <Button transparent>
                <Icon as={FaArrowDown} />
              </Button>
              <Divider flex={1} />
            </Flex>

            <CurrencyInput
              field={Field.TOKEN1}
              typedValue={formattedAmounts[Field.TOKEN1]}
              balance={BigInt(balanceToken1.balance.toString())}
              onUserInput={(value) => onTokenBInput(value)}
              onSelectToken={(data) => onTokenSelection(data, Field.TOKEN1)}
              onMaxInput={() => onMaxInput(Field.TOKEN1)}
              token={token1 ?? undefined}
              showMaxButton
              inputReadonly
            />

            <PoolButton poolState={poolState} errorMessage={errorMessage} />

          </Card>
          <Footer />
        </Flex>
      </Wrapper>
    </Flex>
  )
}
