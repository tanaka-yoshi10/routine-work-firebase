import { Button, HStack, Input } from '@chakra-ui/react';
import React, { useRef } from 'react'

type Props = {
  addMenu: (menu: string) => void,
};

function AddMenu({ addMenu }: Props) {
  const inputEl = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    const menu = inputEl.current?.value
    if (menu === undefined) {
      return
    }
    addMenu(menu)
    if (inputEl.current) {
      inputEl.current.value = ''
    }
  }

  return (
    <div>
      <HStack mt="8">
        <Input ref={inputEl} variant="filled" placeholder="learning chakraui with todo app"/>
        <Button onClick={handleClick} colorScheme="pink" px="8" type="submit">追加</Button>
      </HStack>
    </div>
  )
}

export default AddMenu
