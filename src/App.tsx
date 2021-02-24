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
    <div className="App">
      <header className="App-header">
        {user ? (
          <div>
            <button onClick={logout}>Google Logout</button>
            <Dashboard user={user}/>
          </div>
        ) : (
          <button onClick={login}>Google Login</button>
        )}
      </header>
    </div>
  );
}

export default App;
