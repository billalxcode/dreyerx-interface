'use client'
import store from '@/state/store'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider(props: {
    children: ReactNode
}) {
    return <Provider store={store}>{props.children}</Provider>
}
