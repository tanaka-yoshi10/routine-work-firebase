import React, { useEffect, useState } from "react";
import { firestore, User } from "../firebase";

import { useParams } from "react-router-dom";
import useDocumentSubscription from "../hooks/useDocumentSubscription";

export const EditRoutine: React.FC = () => {
  const { routineId }: any = useParams();
  const routineRef = firestore.collection('routines').doc(routineId);
  const routine = useDocumentSubscription(routineRef);
  const { menus }:any = routine || { menus: [] };


  const onClickAdd = (menu: string) => {
    menus.push(menu)
    routineRef.update({ menus });
  }

  return (
    <div>
      {
        menus.map((menu:string, index:number) => {
          return (
            <div key={index}>
              {menu}
            </div>
          )
        })
      }
      <button onClick={() => onClickAdd('hoge')}>追加</button>
    </div>
  )};

export default EditRoutine;
