import { VStack, Badge } from '@chakra-ui/react'
import React from 'react'

type Props = {
  menus: Array<any>,
  deleteMenu: any,
};

function MenuList(props: Props) {
  const { menus } = props;
  if (!menus.length) {
    return (
      <Badge colorScheme='green' p='4' m='4' borderRadius='lg'>
        No Menus
      </Badge>
    )
  }
  return (
    <VStack>
    </VStack>
  )
}

export default MenuList
