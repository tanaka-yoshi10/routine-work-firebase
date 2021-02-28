import React, { useEffect, useState } from "react";
import { firestore, User } from "../firebase";
import Routine from '../components/Routine';

type Props = {
  user: User;
};

export default function Dashboard(props: Props) {
  const { user } = props
  const [routines, setRoutines] = useState<any>([]);

  useEffect(() => {
    const ref = firestore.collection('routines');
    const unsubscribe = ref
      .onSnapshot(({ docs }) => {
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
