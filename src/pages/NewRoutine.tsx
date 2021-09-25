import { addDoc, collection } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { firestore, auth } from '../firebase';

type Inputs = {
  title: string,
}
function NewRoutine() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const ref = collection(firestore, 'routines')
    addDoc(ref, {
      ...data,
      createdAt: new Date(),
      menus: [],
      uid: user.uid ,
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register('title', { required: true })} />
        {errors.title && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </div>
  )
}

export default NewRoutine
