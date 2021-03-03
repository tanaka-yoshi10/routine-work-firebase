import React, { useRef, useCallback } from "react";
import { firestore } from "../firebase";

import { Link, useParams } from "react-router-dom";
import useDocumentSubscription from "../hooks/useDocumentSubscription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div>
      {
        menus.map((menu:string, index:number) => {
          return (
            <div key={index}>
              <button className="btn" onClick={() => upMenu(index)}>
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
              <button className="btn" onClick={() => downMenu(index)}>
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
              {menu}
              <button className="btn" onClick={() => deleteMenu(menu)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          )
        })
      }
      <input ref={inputEl} type="text" />
      <button onClick={handleClick}>追加</button>
      <div className="my-2">
        <Link className="btn btn-secondary" to="/">Back</Link>
      </div>
    </div>
  )};

export default EditRoutine;
