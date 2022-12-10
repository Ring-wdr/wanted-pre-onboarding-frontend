import { Navigate } from 'react-router-dom';
import Todos from './Todos';

const Todo = () => (
  <>{localStorage.getItem('access_token') ? <Todos /> : <Navigate to='/' />}</>
);

export default Todo;
