import { useState, useRef } from 'react';
import { useTodos } from '../hooks/useTodos';
import { ITodo } from '../interface/todo/ITodo';

interface Props {
  todo: ITodo;
}

const TodoListItem = ({ todo }: Props) => {
  const [onModify, setToggle] = useState<boolean>(false);
  const todoRef = useRef<HTMLInputElement>(null);
  const { refetcher, todoCtl } = useTodos();

  const updateTodo = async (id: number, todo: string, isCompleted: boolean) => {
    await todoCtl.updateTodo(id, todo, isCompleted);
    refetcher();
  };

  const deleteTodo = async (todoId: number) => {
    await todoCtl.deleteTodo(todoId);
    refetcher();
  };

  return (
    <div key={todo.id} className='todo-item'>
      <div className='todo-line'>
        <div>
          <div className={onModify ? '' : 'modify'} hidden={!onModify}>
            <input
              type='text'
              ref={todoRef}
              placeholder='수정 사항을 입력하세요'
            />
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
          </div>
          <div className={onModify ? 'modify' : ''} hidden={onModify}>
            <div>{todo.todo}</div>
          </div>
        </div>
        <div>
          <label>
            <input
              type='checkbox'
              onChange={() => updateTodo(todo.id, todo.todo, !todo.isCompleted)}
              checked={todo.isCompleted}
            ></input>
            ✅
          </label>
          <button
            onClick={() => {
              setToggle((prev) => !prev);
              if (todoRef.current) todoRef.current.value = todo.todo;
            }}
          >
            {onModify ? ' 취소' : '수정'}
          </button>
          <button onClick={() => deleteTodo(todo.id)}> 삭제</button>
        </div>
      </div>
    </div>
  );
};

export default TodoListItem;
