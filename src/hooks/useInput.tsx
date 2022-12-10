import { useState } from 'react';

export function useInput(
  txt: string
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const [input, setInput] = useState<string>(txt);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  return [input, changeInput];
}
