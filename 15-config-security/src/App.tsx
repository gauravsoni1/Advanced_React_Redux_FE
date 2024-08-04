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
import AddUser from './domain/AddUser';
import ProtectedRoute from './components/ProtectedRoute';
import { Permissions } from './const/permissions';
import withMouseTracking from './components/HOC/withMouseTracking';
import { useIsUserIdle } from './hooks/useIsUserIdle';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

function App() {
  const navRoute = useSelector(navStateRoute);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserIdle, getRemainingTime } = useIsUserIdle();

  useEffect(() => {
    (async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      console.log(result.visitorId);
      sessionStorage.setItem('fingerprint', result.visitorId);
    })()
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(`User will be logged out in ${getRemainingTime()}`);
  //   }, 1000)
  // }, [])

  // useEffect(() => {
  //   if (isUserIdle) {
  //     console.log("User will be logged out");
  //   }
  // }, [isUserIdle])

  useEffect(() => {
    if (navRoute) {
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
        <Route path='adduser' element={
          <ProtectedRoute permissions={[Permissions.ADD_USER]}>
            <AddUser />
          </ProtectedRoute>
        } />
      </Route>
      <Route path='*' element={<Navigate to='/signin' />}></Route>
    </Routes>
  )
}

export default withMouseTracking(App); 
