import React from 'react';
import logo from './logo.svg';
import './App.css';
import { firestore, database, auth, provider } from './firebase';
import { useState, useEffect } from 'react';

function App() {
  const ref = firestore.collection('routines');
  const [items, setItems] = useState([]);

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

  useEffect(() => {
    if(!ref) return;
    const unsubscribe = ref
      .onSnapshot(({ docs }) => {
        // @ts-ignore
        setItems(docs.map(_ => ({ id: _.id, ref: _.ref, ..._.data() })));
      });
    return unsubscribe;
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        {
          items.map((item) => {
            // @ts-ignore
            return (<p key={item.id}>{item.title}</p>);
          })
        }

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {user ? (
          <button onClick={logout}>Google Logout</button>
        ) : (
          <button onClick={login}>Google Login</button>
        )}
      </header>
    </div>
  );
}

export default App;
