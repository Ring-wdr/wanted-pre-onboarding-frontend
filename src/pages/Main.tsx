import { Navigate } from 'react-router-dom';
import AuthPage from './AuthPage';

const Main = () => {
  return (
    <>
      {!localStorage.getItem('access_token') ? (
        <AuthPage />
      ) : (
        <Navigate to='/todos' />
      )}
    </>
  );
};

export default Main;
