import './App.css';
import { auth } from './firebase';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      <Dashboard user={user}/>
    </div>
  );
}

export default App;
