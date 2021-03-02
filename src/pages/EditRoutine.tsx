import React, { useEffect, useState } from "react";
import { firestore, User } from "../firebase";

import { useParams } from "react-router-dom";
import useDocumentSubscription from "../hooks/useDocumentSubscription";

export const EditRoutine: React.FC = () => {
  const { routineId }: any = useParams();
  const routineRef = firestore.collection('routines').doc(routineId);
  const routine = useDocumentSubscription(routineRef);
  const { menus }:any = routine || {};

  return <span>{ menus }</span>;
};

export default EditRoutine;
