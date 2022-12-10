import { ITodo } from '../interface/todo/ITodo';
import TodoListItem from './TodoListItem';

interface Props {
  todos: ITodo[];
}

const TodoList = ({ todos }: Props) => {
  return (
    <div className='todoList'>
      {todos.length > 0
        ? todos.map((todo) => <TodoListItem key={todo.id} todo={todo} />)
        : null}
    </div>
  );
};

export default TodoList;
