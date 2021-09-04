import { VStack, Badge, StackDivider, HStack, IconButton, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { FaTrashAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';

type Props = {
  menus: Array<any>,
  deleteMenu: (menu: string) => void,
  upMenu: (index: number) => void,
  downMenu: (index: number) => void,
};

function MenuList(props: Props) {
  const { menus, deleteMenu, upMenu, downMenu } = props;
  if (!menus.length) {
    return (
      <Badge colorScheme='green' p='4' m='4' borderRadius='lg'>
        No Menus
      </Badge>
    )
  }
  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth="2px"
      p="4"
      borderradus="lg"
      w="100%"
      maxW={{base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw'}}
      alignItems="stretch"
    >
      {
        menus.map((menu:string, index:number) => (
          <HStack key={index}>
            <IconButton
              aria-label="up menu"
              icon={<FaArrowUp/>}
              isRound
              onClick={() => upMenu(index)}
            />
            <IconButton
              aria-label="down menu"
              icon={<FaArrowDown/>}
              isRound
              onClick={() => downMenu(index)}
            />
            <Text>{menu}</Text>
            <Spacer />
            <IconButton
              aria-label="delete menu"
              icon={<FaTrashAlt/>}
              isRound
              onClick={() => deleteMenu(menu)}
            />
          </HStack>
        ))
      }
    </VStack>
  )
}

export default MenuList
