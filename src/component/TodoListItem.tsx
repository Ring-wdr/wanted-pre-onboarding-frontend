import { useState, useRef } from 'react';
import { ITodo } from '../interface/ITodo';
import { Todo } from '../utils/api';

interface ITodoListItem {
  todo: ITodo;
  todoCtl: Todo;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoListItem = ({ todo, todoCtl, setRefetch }: ITodoListItem) => {
  const [onModify, setToggle] = useState<boolean>(false);
  const todoRef = useRef<HTMLInputElement>(null);
  const updateTodo = async (id: number, todo: string, isCompleted: boolean) => {
    await todoCtl.updateTodo(id, todo, isCompleted);
    setRefetch((prev) => !prev);
  };

  const deleteTodo = async (todoId: number) => {
    await todoCtl.deleteTodo(todoId);
    setRefetch((prev) => !prev);
  };

  return (
    <div key={todo.id}>
      <div>{todo.todo}</div>
      {onModify ? (
        <input type='text' ref={todoRef} placeholder='수정 사항을 입력하세요' />
      ) : null}
      <button onClick={() => setToggle((prev) => !prev)}>
        {onModify ? ' 취소' : '수정'}
      </button>
      {onModify ? (
        <button
          onClick={async () => {
            if (todoRef.current) {
              await updateTodo(
                todo.id,
                todoRef.current?.value,
                todo.isCompleted
              );
              setToggle((prev) => !prev);
            }
          }}
        >
          수정
        </button>
      ) : null}
      <label>
        <input
          type='checkbox'
          onClick={() => updateTodo(todo.id, todo.todo, !todo.isCompleted)}
          checked={todo.isCompleted}
        ></input>
        완료여부
      </label>
      <button onClick={() => deleteTodo(todo.id)}> 삭제</button>
    </div>
  );
};

export default TodoListItem;
