import React from 'react'
import { CurrencySearchModal } from './modals'
import { Input, useToken } from '@chakra-ui/react'
import Wrapper from './wrapper'
import { transparentize } from 'polished'
import CurrencySearchList from './list'
import CurrencySearchItem from './item'
import SwapTokenList from '@dreyerxswap/default-token-list'
import TokenInterface from '@/interface/token'

export default function CurrencySearch(props: {
  isOpen: boolean,
  onClose: () => void,
  onSelect: (data: TokenInterface) => void
}) {
  const [text, border] = useToken('colors', ['text', 'border'])

  return (
    <CurrencySearchModal
      isOpen={props.isOpen}
      onClose={props.onClose}>
      <Wrapper>
        <Input
          placeholder='Search name or paste address'
          textAlign={'left'}
          borderWidth={1}
          color={text}
          flex={3}
          padding={3}
          borderColor={transparentize(0.9, border)}

          _hover={{
            borderColor: transparentize(0.8, border)
          }}

          _focusVisible={{
            borderColor: transparentize(0.8, border)
          }}
        />
        <CurrencySearchList scroll={SwapTokenList.tokens.length > 10}>
          {
            SwapTokenList.tokens.map((tokenlist, index) => {
              return (
                <>
                  <CurrencySearchItem
                    key={`tokenlist-${index}`}
                    text={tokenlist.name}
                    symbol={tokenlist.symbol}
                    image={tokenlist.logoURI}
                    address={tokenlist.address}
                    decimals={tokenlist.decimals}
                    onSelect={() => props.onSelect(tokenlist)}
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
