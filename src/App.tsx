import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TodosProvider } from './hooks/useTodos';
import Main from './pages/Main';
import Todo from './pages/Todo';

function App() {
  return (
    <Router>
      <TodosProvider>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/todos' element={<Todo />} />
        </Routes>
      </TodosProvider>
    </Router>
  );
}

export default App;
