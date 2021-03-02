import { useState, useEffect } from 'react';

export default function useDocumentSubscription (ref, dependencies = []) {
  const [item, setItem] = useState();
  useEffect(() => {
    if(!ref) {
      setItem(null);
      return;
    }

    const unsubscribe = ref
      .onSnapshot((doc) => {
        if(doc.exists) {
          setItem({ id: doc.id, ref, ...doc.data() });
        } else {
          setItem(null);
        }
      });
    return unsubscribe;
  }, dependencies);
  return item;
};
