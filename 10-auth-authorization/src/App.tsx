import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Auth from './domain/Auth/Auth';
import Signin from './domain/Auth/Signin';
import Signup from './domain/Auth/Signup';
import Landing from './domain/Landing/Landing';
import PropertyListing from './domain/PropertyListing/PropertyListing';
import { useDispatch, useSelector } from 'react-redux';
import { navStateRoute } from './redux/selectors/navSelector';
import { useEffect } from 'react';
import { clearRoute } from './redux/slice/navSlice';

function App() {
  const navRoute = useSelector(navStateRoute);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{ 
    if (navRoute){
      navigate(navRoute);
      dispatch(clearRoute());
    }
  }, [navRoute])

  return (
    <Routes>
      <Route Component={Auth}>
        <Route path='signin' Component={Signin}></Route>
        <Route path='signup' Component={Signup}></Route>
      </Route>
      <Route Component={Landing}>
        <Route path='listing' Component={PropertyListing}></Route>
      </Route>
      <Route path='*' element={<Navigate to='/signin' />}></Route>
    </Routes>
  )
}

export default App
