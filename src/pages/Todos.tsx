import { useState, useRef, useEffect } from 'react';
import { Todo } from '../utils/api';
import { ITodo } from '../interface/todo/ITodo';
import TodoList from '../component/TodoList';

const todoCtl = new Todo();

const Todos = () => {
  const newTodoRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  const submitTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    newTodoRef.current && todoCtl.createTodo(newTodoRef.current.value);
    setRefetch((prev) => !prev);
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
    <div>
      <h3>Todos</h3>
      <form>
        <input type='text' ref={newTodoRef} placeholder='목록을 작성하시오' />
        <button onClick={submitTodo}>전송</button>
      </form>
      <TodoList todos={todos} todoCtl={todoCtl} setRefetch={setRefetch} />
    </div>
  );
};

export default Todos;
