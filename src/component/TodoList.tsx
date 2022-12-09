import { ITodo } from '../interface/ITodo';
import { Todo } from '../utils/api';
import TodoListItem from './TodoListItem';

interface TodoProps {
  todos: ITodo[];
  todoCtl: Todo;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoList = ({ todos, todoCtl, setRefetch }: TodoProps) => {
  return (
    <div>
      {todos.length > 0
        ? todos.map((todo) => (
            <TodoListItem
              todo={todo}
              todoCtl={todoCtl}
              setRefetch={setRefetch}
            />
          ))
        : null}
    </div>
  );
};

export default TodoList;
