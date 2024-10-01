'use client'
import { Text, useToken } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { transparentize } from 'polished'
import React from 'react'

export default function TabItem(props: {
  text: string,
  href: string,
  isActive?: boolean,
  isDisabled?: boolean
}) {
  const pathname = usePathname()

  const [text, primary1] = useToken('colors', ['text', 'primary1'])
  const isActive = pathname.startsWith(props.href)

  const color = isActive == true ? primary1 : transparentize(0.5, text)

  return (
    <Link
      href={props.isDisabled ? '#' : props.href}
    >
      <Text
        color={color}
        _hover={{
          cursor: 'pointer'
        }}
      >
        {props.text}
      </Text>
    </Link>
  )
}
