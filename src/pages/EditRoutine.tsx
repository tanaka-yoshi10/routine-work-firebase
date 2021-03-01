import React, { useEffect, useState } from "react";
import { firestore, User } from "../firebase";

import { useParams } from "react-router-dom";

export const EditRoutine: React.FC = () => {
  const { routineId }: any = useParams();
  console.log(routineId);

  return <span>Otameshi</span>;
};

export default EditRoutine;
