import axios from 'axios';
import { IAuth } from '../interface/auth/IAuth';
import { ITodo } from '../interface/todo/ITodo';
const HOST = process.env.REACT_APP_HOST;

export const WantedAuth = {
  signIn: async (email: string, password: string) => {
    if (email.includes(' ')) {
      return alert('이메일 주소에 빈 칸은 입력할 수 없습니다.');
    }
    if (password.includes(' ')) {
      return alert('비밀번호에 빈 칸은 입력할 수 없습니다.');
    }
    try {
      const {
        data: { access_token },
      }: IAuth = await axios.post(`${HOST}/auth/signin`, { email, password });
      window.localStorage.setItem('access_token', access_token);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { message }: { message: string } = err.response?.data;
        alert(message);
      } else {
        throw new Error('axios 에러가 아닙니다.');
      }
    }
  },
  signUp: async (email: string, password: string) => {
    if (email.includes(' ')) {
      return alert('이메일 주소에 빈 칸은 입력할 수 없습니다.');
    }
    if (password.includes(' ')) {
      return alert('비밀번호에 빈 칸은 입력할 수 없습니다.');
    }
    try {
      const { statusText } = await axios.post(`${HOST}/auth/signup`, {
        email,
        password,
      });
      statusText === 'Created' && alert('정상 회원가입되었습니다.');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { message }: { message: string } = err.response?.data;
        alert(message);
      } else {
        throw new Error('axios 에러가 아닙니다.');
      }
    }
  },
};

export class Todo {
  access_token: string = '';
  constructor() {
    this.reloadToken();
  }
  reloadToken = () => {
    this.access_token = window.localStorage.getItem('access_token') || '';
  };

  createTodo = async (todo: string) => {
    const result: ITodo = await axios.post(
      `${HOST}/todos`,
      { todo },
      {
        headers: {
          Authorization: `Bearer ${this.access_token}`,
        },
      }
    );
    return result;
  };
  getTodos = async (signal?: AbortSignal) => {
    const { data }: { data: ITodo[] } = await axios.get(`${HOST}/todos`, {
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
      signal,
    });
    return data;
  };
  updateTodo = async (id: number, todo: string, isCompleted: boolean) => {
    const result: ITodo = await axios.put(
      `${HOST}/todos/${id}`,
      { todo, isCompleted },
      {
        headers: {
          Authorization: `Bearer ${this.access_token}`,
        },
      }
    );
    return result;
  };
  deleteTodo = async (id: number) => {
    const result = await axios.delete(`${HOST}/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
    });
    return result;
  };
}
