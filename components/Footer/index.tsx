import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FaGithub, FaTelegram } from 'react-icons/fa6'
import Link from 'next/link'

export default function Footer() {
    return (
        <Flex
            width={'full'}
        >
            <Flex width={'full'} boxShadow={'none'}>
                <Flex
                    width={'full'}
                    flexDirection={'row'}
                    justify={'space-between'}
                    align={'center'}
                    paddingX={'20px'}
                >
                    <Text
                        fontSize={'10px'}
                    >
                        &copy; 2024 DreyerX. All right reserved
                    </Text>

                    <Flex gap={2}>
                        <Link href={'https://github.com/dreyerx'} target='_blank'>
                            <FaGithub />
                        </Link>
                        <Link href={'https://t.me/dreyerxcoin'} target='_blank'>
                            <FaTelegram />
                        </Link>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
