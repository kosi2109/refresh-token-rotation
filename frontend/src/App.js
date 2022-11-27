import { Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import User from './User';

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<User />} />
      </Routes>
      
    </main>
  );
}

export default App;
