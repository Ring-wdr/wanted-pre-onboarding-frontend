import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Todos from './pages/Todos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/todos' element={<Todos />} />
      </Routes>
    </Router>
  );
}

export default App;
