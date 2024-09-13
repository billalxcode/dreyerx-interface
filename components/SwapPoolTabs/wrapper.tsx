import React, { ReactNode } from 'react'
import Card from '../Card'

export default function Wrapper(props: {
  children: ReactNode
}) {
  return (
    <Card flexDirection={'row'} gap={'20px'} width={'250px'} justify={'center'} align={'start'}>
      { props.children }
    </Card>
  )
}
