import React, { useRef, useCallback } from "react";
import { firestore } from "../firebase";

import { Link, useParams } from "react-router-dom";
import useDocumentSubscription from "../hooks/useDocumentSubscription";
import { VStack, Heading, } from "@chakra-ui/react";
import MenuList from '../components/MenuList';
import AddMenu from '../components/AddMenu';

export const EditRoutine: React.FC = () => {
  const { routineId }: any = useParams();
  const routineRef = firestore.collection('routines').doc(routineId);
  const routine = useDocumentSubscription(routineRef);
  const { menus }:any = routine || { menus: [] };

  const addMenu = useCallback((menu: string)=>{
    routineRef.update({ menus: [...menus, menu] });
  }, [menus])

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
      <MenuList
       menus={menus}
       deleteMenu={deleteMenu}
       upMenu={upMenu}
       downMenu={downMenu}
      />
      <AddMenu addMenu={addMenu}/>
      <div className="my-2">
        <Link className="btn btn-secondary" to="/">Back</Link>
      </div>
    </VStack>
  )};

export default EditRoutine;
