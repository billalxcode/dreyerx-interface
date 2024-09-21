'use client'
import { Link, useToken } from '@chakra-ui/react'
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
  const isActive = props.href === pathname

  const color = isActive == true ? primary1 : transparentize(0.5, text)

  return (
    <Link
      href={props.isDisabled ? '#' : props.href}
      color={color}

      _hover={{
        cursor: 'pointer'
      }}
    >
      {props.text}
    </Link>
  )
}
