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

const RefetchContext = createContext<TodosContextType>(iTodosContextState);

export function RefetchProvider({ children }: Props) {
  const [refetch, setRefetch] = useState<boolean>(false);
  const refetcher = () => setRefetch((prev) => !prev);

  return (
    <RefetchContext.Provider value={{ refetch, refetcher, todoCtl }}>
      {children}
    </RefetchContext.Provider>
  );
}

export const useRefetch = () => useContext(RefetchContext);
