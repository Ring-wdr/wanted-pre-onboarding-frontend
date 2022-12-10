import { Navigate } from 'react-router-dom';
import AuthPage from './AuthPage';

const Main = () => (
  <>
    {!localStorage.getItem('access_token') ? (
      <AuthPage />
    ) : (
      <Navigate to='/todos' />
    )}
  </>
);

export default Main;
