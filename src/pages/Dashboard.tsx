import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";

export default function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const ref = firestore.collection('routines');
    const unsubscribe = ref
      .onSnapshot(({ docs }) => {
        // @ts-ignore
        setItems(docs.map(_ => ({ id: _.id, ref: _.ref, ..._.data() })));
      });
    return unsubscribe;
  }, []);

  return (
    <div>
      {
        items.map((item) => {
          // @ts-ignore
          return (<p key={item.id}>{item.title}</p>);
        })
      }
    </div>
  )
}
