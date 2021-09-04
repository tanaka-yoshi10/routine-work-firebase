import { DocumentData, DocumentReference, onSnapshot } from '@firebase/firestore';
import { useState, useEffect } from 'react';

interface DocumentModel {
  id: string;
  ref: DocumentReference | null;
}

export default function useDocumentSubscription<T extends DocumentModel>(
  ref: DocumentReference<DocumentData> | null | undefined,
  ctor: { new (params: any): T },
  dependencies: any[] = []
): T | null {
  const [item, setItem] = useState<T | null>(null);
  useEffect(() => {
    if (!ref) return;
    const unsubscribe = onSnapshot(ref, (doc) => {
      if (doc.exists()) {
        setItem(new ctor({ id: doc.id, ref, ...doc.data() }));
      } else {
        setItem(null);
      }
    });
    return unsubscribe;
  }, dependencies);
  return item;
}