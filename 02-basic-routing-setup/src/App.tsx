import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './domain/Auth/Auth';
import Signin from './domain/Auth/Signin';
import Signup from './domain/Auth/Signup';

function App() {

  return (
    <Routes>
      <Route Component={Auth}>
        <Route path='signin' Component={Signin}></Route>
        <Route path='signup' Component={Signup}></Route>
      </Route>
      <Route path='*' element={<Navigate to='/signin' />}></Route>
    </Routes>
  )
}

export default App
