import React, { useRef, useCallback } from "react";
import { firestore } from "../firebase";

import { Link, useParams } from "react-router-dom";
import useDocumentSubscription from "../hooks/useDocumentSubscription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FaTrashAlt } from 'react-icons/fa'
import { VStack, Button, Heading, IconButton, HStack, Text, StackDivider, Spacer, Input } from "@chakra-ui/react";
import MenuList from '../components/MenuList';
import AddMenu from '../components/AddMenu';

export const EditRoutine: React.FC = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const { routineId }: any = useParams();
  const routineRef = firestore.collection('routines').doc(routineId);
  const routine = useDocumentSubscription(routineRef);
  const { menus }:any = routine || { menus: [] };

  const handleClick = useCallback(()=>{
    const menu = inputEl.current?.value
    routineRef.update({ menus: [...menus, menu] });
    if (inputEl.current) {
      inputEl.current.value = ''
    }
  },[menus])

  const deleteMenu = (menu: string) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }

    const shifted = menus.filter((value:string) => value !== menu);
    routineRef.update({ menus: shifted });
  }

  const upMenu = (index: number) => {
    if (index === 0) {
      return
    }
    const newMenus = [...menus]
    newMenus.splice(index - 1, 2, newMenus[index], newMenus[index - 1])
    routineRef.update({ menus: newMenus });
  }

  const downMenu = (index: number) => {
    if (index === menus.length - 1) {
      return
    }
    const newMenus = [...menus]
    newMenus.splice(index, 2, newMenus[index + 1], newMenus[index])
    routineRef.update({ menus: newMenus });
  }

  return (
    <VStack p={4}>
      <Heading
        mb="8"
        fontWeight="extrabold"
        size="2x1"
        bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
      >
        Edit Routine
      </Heading>
      <MenuList menus={menus} deleteMenu={deleteMenu}/>
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
              <button className="btn" onClick={() => upMenu(index)}>
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
              <button className="btn" onClick={() => downMenu(index)}>
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
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
      <AddMenu/>
      <div>
        <HStack mt="8">
          <Input ref={inputEl} variant="filled" placeholder="learning chakraui with todo app"/>
          <Button onClick={handleClick} colorScheme="pink" px="8" type="submit">追加</Button>
        </HStack>
      </div>
      <div className="my-2">
        <Link className="btn btn-secondary" to="/">Back</Link>
      </div>
    </VStack>
  )};

export default EditRoutine;
