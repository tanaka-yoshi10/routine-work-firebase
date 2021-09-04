import React from 'react';
import { Button, ChakraProvider, Heading } from "@chakra-ui/react"
import './App.css';
import { auth, provider } from './firebase';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  const login = () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  };

  const logout = () => {
    auth.signOut();
  };

  return (
    <ChakraProvider>
      <div className="">
        <Header/>
        <header className="">
          {user ? (
            <div>
              <Button onClick={logout}>Google Logout</Button>
            </div>
          ) : (
            <Button onClick={login}>Google Login</Button>
          )}
        </header>
        <div className="container">
          {user ? (<Dashboard user={user}/>) : null }
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
