'use client'
import React from 'react'
import Wrapper from './wrapper'
import TabItem from './tab'

export default function SwapPoolTabs() {
  return (
    <Wrapper>
      <TabItem href='/swap' text='Swap' />
      <TabItem href='/wrap' text='Wrap' />
      <TabItem href='/pool' text='Pool' />
    </Wrapper>
  )
}
