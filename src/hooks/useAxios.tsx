import axios from 'axios';
import { useState, useEffect } from 'react';

export const useAxios = <T,>(
  axiosFn: (signal?: AbortSignal) => Promise<T[]>,
  refetchYn?: boolean
): { data: T[]; loading: boolean; error: unknown | null } => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await axiosFn();
        setData(result);
      } catch (err) {
        setError(err);
        if (axios.isAxiosError(err)) {
          const { message }: { message: string } = err.response?.data;
          alert(message);
        } else {
          throw new Error('axios 에러가 아닙니다.');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [refetchYn]);

  return { data, loading, error };
};
