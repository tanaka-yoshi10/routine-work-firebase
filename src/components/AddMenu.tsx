import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import React, { useRef } from 'react'

type Props = {
  addMenu: (menu: string) => void,
};

function AddMenu({ addMenu }: Props) {
  const inputEl = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const menu = inputEl.current?.value
    if (!menu) {
      toast({
        title: 'No content',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      return
    }
    addMenu(menu)
    if (inputEl.current) {
      inputEl.current.value = ''
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt="8">
        <Input ref={inputEl} variant="filled" placeholder="learning chakraui with todo app"/>
        <Button colorScheme="pink" px="8" type="submit">追加</Button>
      </HStack>
    </form>
  )
}

export default AddMenu
