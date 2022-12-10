import { useState, useRef, useEffect } from 'react';
import { ITodo } from '../interface/todo/ITodo';
import TodoList from '../component/TodoList';
import { useRefetch } from '../hooks/useTodos';

const Todos = () => {
  const { refetch, refetcher, todoCtl } = useRefetch();
  const newTodoRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<ITodo[]>([]);

  const submitTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newTodoRef.current) {
      await todoCtl.createTodo(newTodoRef.current.value);
      refetcher();
    }
  };

  useEffect(() => {
    const ctl = new AbortController();
    const { signal } = ctl;
    (async () => {
      const result = await todoCtl.getTodos(signal);
      setTodos(result);
    })();
    return () => ctl.abort();
  }, [refetch]);

  return (
    <div className='todoPage'>
      <h2>Todos</h2>
      <form>
        <input type='text' ref={newTodoRef} placeholder='목록을 작성하시오' />
        <button onClick={submitTodo}>전송</button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};

export default Todos;
