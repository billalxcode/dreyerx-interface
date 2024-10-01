import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

export default function PoolTable() {
  return (
      <TableContainer width={'full'}>
          <Table variant='simple'>
              <Thead>
                  <Tr>
                      <Th color={'text'} isNumeric>#</Th>
                      <Th color={'text'}>Pool</Th>
                      <Th color={'text'}>TVL</Th>
                      <Th color={'text'}>Volume 24H</Th>
                  </Tr>
              </Thead>
              <Tbody>
                  
              </Tbody>
          </Table>
      </TableContainer>
  )
}
