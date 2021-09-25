import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { addDoc, collection } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { firestore, auth } from '../firebase';

type Inputs = {
  title: string,
}
function NewRoutine() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();
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
        <FormControl isInvalid={!!errors.title}>
          <FormLabel htmlFor="title">First name</FormLabel>
          <Input
            id="title"
            placeholder="title"
            {...register("title", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" }
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Add
        </Button>
      </form>
    </div>
  )
}

export default NewRoutine
