import './App.css';
import { auth } from './firebase';
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

  return (
    <div>
      <header>
        <Header user={user}/>
      </header>
      <div className="container">
        {user ? (<Dashboard user={user}/>) : null }
      </div>
    </div>
  );
}

export default App;
