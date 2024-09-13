'use client'
import React from 'react'
import Wrapper from './wrapper'
import TabItem from './tab'
import { usePathname } from 'next/navigation'

export default function SwapPoolTabs() {
  const pathname = usePathname()

  return (
    <Wrapper>
      <TabItem href='/swap' text='Swap' active={pathname == '/swap'} />
      <TabItem href='/wrap' text='Wrap' active={pathname == '/wrap'} />
      <TabItem href='/pool' text='Pool' active={pathname == '/pool'} />
    </Wrapper>
  )
}
