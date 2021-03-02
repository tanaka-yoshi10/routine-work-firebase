import React, { useEffect, useState, useRef, useCallback } from "react";
import { firestore, User } from "../firebase";

import { useParams } from "react-router-dom";
import useDocumentSubscription from "../hooks/useDocumentSubscription";

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
      <input ref={inputEl} type="text" />
      <button onClick={handleClick}>追加</button>
    </div>
  )};

export default EditRoutine;
