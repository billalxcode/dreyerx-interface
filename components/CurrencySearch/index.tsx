import React, { useEffect, useState } from 'react'
import { CurrencySearchModal } from './modals'
import { Alert, AlertDescription, AlertIcon, Input, useToken } from '@chakra-ui/react'
import Wrapper from './wrapper'
import { transparentize } from 'polished'
import CurrencySearchList from './list'
import CurrencySearchItem from './item'
import SwapTokenList from '@dreyerxswap/default-token-list'
import TokenInterface, { TokenType } from '@/interface/token'
import { NATIVE_TOKEN } from '@/constants'
import { useAccount } from 'wagmi'
import Card from '../Card'

export default function CurrencySearch(props: {
  isOpen: boolean,
  key: string,
  onClose: () => void,
  onSelect: (data: TokenInterface) => void
}) {
  const { isConnected } = useAccount()
  const [ query, setQuery ] = useState<string>('')
  const [ tokenlist, setTokenlist ] = useState<TokenInterface[]>()

  const isNativeTokenPresent = SwapTokenList.tokens.find(token => token.address === NATIVE_TOKEN.address)
  if (!isNativeTokenPresent) {
    SwapTokenList.tokens.unshift(NATIVE_TOKEN)
  }

  const [text, border] = useToken('colors', ['text', 'border'])

  useEffect(() => {
    const tokenlistFilter = SwapTokenList.tokens.filter((v) => v.name.includes(query) || v.address.includes(query))
    console.log(tokenlistFilter)

    setTokenlist(tokenlistFilter)
  }, [query])
  return (
    <CurrencySearchModal
      isOpen={props.isOpen}
      onClose={props.onClose}>
      <Wrapper>
        {
          !isConnected ? (
            <Alert status={'error'} bgColor={'transparent'} as={Card} width={'full'}>
              <AlertIcon color={'white'} />

              <AlertDescription fontSize={'14px'}>
                Please connect wallet
              </AlertDescription>
            </Alert>
          ) : null
        }
        <Input
          placeholder='Search name or paste address'
          textAlign={'left'}
          borderWidth={1}
          color={text}
          flex={3}
          padding={3}
          borderColor={transparentize(0.9, border)}
          onChange={(e) => setQuery(e.target.value)}
          value={query}

          _hover={{
            borderColor: transparentize(0.8, border)
          }}

          _focusVisible={{
            borderColor: transparentize(0.8, border)
          }}
        />
        <CurrencySearchList scroll={SwapTokenList.tokens.length > 10} key={`currency-search-list-1`}>
          {
            tokenlist?.map((tknlist, index) => {
              return (
                <>
                  <CurrencySearchItem
                    key={`tknlist-${index}`}
                    text={tknlist.name}
                    symbol={tknlist.symbol}
                    image={tknlist.logoURI}
                    address={tknlist.address}
                    decimals={tknlist.decimals}
                    type={tknlist?.type ?? TokenType.ERC20}
                    onSelect={() => props.onSelect(tknlist)}
                  />
                </>

              )
            })
          }
        </CurrencySearchList>
      </Wrapper>
    </CurrencySearchModal>
  )
}
