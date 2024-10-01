import React from 'react'
import Card from '../Card'
import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa6'

export default function PoolHeader() {
  return (
      <Card direction={'column'} width={['full', 'full', '450px']} gap={3}>
          <Flex
              width={'full'}
              align={'center'}
              justify={'space-between'}
              px={5}
          >
              <Link
                  href={'/pool'}
              >
                  <FaArrowLeft />
              </Link>
              <Text flex={1} textAlign={'center'}>Create new pool</Text>
          </Flex>
      </Card>
  )
}
