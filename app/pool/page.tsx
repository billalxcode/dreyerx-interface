'use client'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PoolTable from '@/components/Pool/table'
import Wrapper from '@/components/Pool/wrapper'
import SwapPoolTabs from '@/components/SwapPoolTabs'
import { Alert, AlertDescription, AlertIcon, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'

export default function Pool() {
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
                    <SwapPoolTabs />

                    <Alert status={'info'} bgColor={'transparent'} as={Card} width={['full', 'full', '450px']}>
                        <AlertIcon color={'white'} />

                        <AlertDescription fontSize={'14px'}>This app is in development stage, some features may not work or have errors</AlertDescription>
                    </Alert>

                    <Card direction={'column'} width={['full', 'full', '450px']} gap={3}>
                        <Link
                            href={'/pool/new'}
                            style={{ width: '100%' }}
                        >
                            <Button
                                backgroundColor={'primary1'}
                                width={'full'}
                            >
                                <Flex gap={2}>
                                    <FaPlus />
                                    <Text>
                                        New pool
                                    </Text>
                                </Flex>
                            </Button>
                        </Link>

                        <PoolTable />
                    </Card>

                    <Footer />
                </Flex>
            </Wrapper>
        </Flex>
    )
}
