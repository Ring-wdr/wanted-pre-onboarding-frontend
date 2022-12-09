import { Navigate } from 'react-router-dom';

const isLogin = window.localStorage.getItem('access_token');

const Main = () => (
  <>{isLogin ? <Navigate to='/todos' /> : <Navigate to='/' />}</>
);

export default Main;
