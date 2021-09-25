import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import Routine from '../components/Routine';
import { User } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "@chakra-ui/react";

type Props = {
  user: User;
};

export default function Dashboard(props: Props) {
  const { user } = props
  const [routines, setRoutines] = useState<any>([]);

  useEffect(() => {
    const ref = collection(firestore, 'routines');
    const unsubscribe = onSnapshot(ref, ({ docs }) => {
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
      <Link to='/routines/new'>
        new routine
      </Link>
    </div>
  )
}
