'use client'
import { Link, useToken } from '@chakra-ui/react'
import { transparentize } from 'polished'
import React from 'react'

export default function TabItem(props: {
  text: string,
  href: string,
  active?: boolean
}) {
  const [text, primary1] = useToken('colors', ['text', 'primary1'])

  const color = props.active == true ? transparentize(0.2, primary1) : transparentize(0.5, text)

  return (
    <Link
      href={props.href}
      color={color}

      _hover={{
        cursor: 'pointer'
      }}
    >
      {props.text}
    </Link>
  )
}
