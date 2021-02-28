import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import Routine from '../components/Routine';

type Props = {
  user: any;
};

export default function Dashboard(props: Props) {
  const { user } = props
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const ref = firestore.collection('routines');
    const unsubscribe = ref
      .onSnapshot(({ docs }) => {
        // @ts-ignore
        setRoutines(docs.map(_ => ({ id: _.id, ref: _.ref, ..._.data() })));
      });
    return unsubscribe;
  }, []);

  return (
    <div>
      {
        routines.map((routine: any) => {
          return (<Routine key={routine.id} routine={routine} user={user}/>);
        })
      }
    </div>
  )
}
