import React from 'react'
import { auth } from '../firebase';
import { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react"
import Header from './Header';

import routes from '../routes';
const history = createBrowserHistory();

function Root() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  const router = (
    <Router history={history}>
      {routes}
    </Router>
  )

  return (
    <ChakraProvider>
      <header>
        <Header user={user}/>
      </header>
      <div className="container">
        {user ? router : null }
      </div>
    </ChakraProvider>
  )
}

export default Root
