import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { ITodo } from '../interface/todo/ITodo';
import TodoList from '../component/TodoList';
import { useTodos } from '../hooks/useTodos';

const Todos = () => {
  const {
    refetch,
    refetcher,
    todoCtl: { reloadToken, getTodos, createTodo },
  } = useTodos();
  const newTodoRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<ITodo[]>([]);

  const submitTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newTodoRef.current) {
      await createTodo(newTodoRef.current.value);
      refetcher();
    }
  };

  useLayoutEffect(() => {
    reloadToken();
  }, []);

  useEffect(() => {
    const ctl = new AbortController();
    const { signal } = ctl;
    (async () => {
      const result = await getTodos(signal);
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
