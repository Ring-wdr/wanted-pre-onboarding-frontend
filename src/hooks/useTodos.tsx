import { createContext, useContext, useState } from 'react';
import { Todo } from '../utils/api';

interface Props {
  children: React.ReactNode;
}

type TodosContextType = {
  refetch: boolean;
  refetcher: () => void;
  todoCtl: Todo;
};

const todoCtl = new Todo();

const iTodosContextState = {
  refetch: false,
  refetcher: () => {},
  todoCtl,
};

const TodosContext = createContext<TodosContextType>(iTodosContextState);

export function TodosProvider({ children }: Props) {
  const [refetch, setRefetch] = useState<boolean>(false);
  const refetcher = () => setRefetch((prev) => !prev);
  return (
    <TodosContext.Provider value={{ refetch, refetcher, todoCtl }}>
      {children}
    </TodosContext.Provider>
  );
}

export const useTodos = () => useContext(TodosContext);
