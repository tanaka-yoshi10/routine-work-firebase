import React from 'react';
import './App.css';
import { auth, provider } from './firebase';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';

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
    <div className="">
      <header className="">
        {user ? (
          <div>
            <button onClick={logout}>Google Logout</button>
          </div>
        ) : (
          <button onClick={login}>Google Login</button>
        )}
      </header>
      <div className="container">
        {user ? (<Dashboard user={user}/>) : null }
      </div>
    </div>
  );
}

export default App;
