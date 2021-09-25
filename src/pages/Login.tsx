import { Heading } from '@chakra-ui/react'
import React from 'react'

function Login() {
  return (
    <div>
      <Heading
        mt="8"
        textAlign="center"
        fontWeight="extrabold"
        fontSize="3xl"
        bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
        bgClip="text"
      >
        Please Login
      </Heading>
    </div>
  )
}

export default Login
