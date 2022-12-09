import axios from 'axios';
import { IAuth } from '../interface/auth/IAuth';
import { ITodo } from '../interface/todo/ITodo';
const HOST = process.env.REACT_APP_HOST;

export const WantedAuth = {
  signIn: async (email: string, password: string) => {
    const {
      data: { access_token },
    }: IAuth = await axios.post(`${HOST}/auth/signin`, { email, password });
    window.localStorage.setItem('access_token', access_token);
  },
  signUp: async (email: string, password: string) => {
    const { statusText } = await axios.post(`${HOST}/auth/signup`, {
      email,
      password,
    });
    statusText === 'Created' && alert('정상 회원가입되었습니다.');
  },
};

export class Todo {
  access_token: string;
  constructor() {
    this.access_token = window.localStorage.getItem('access_token') || '';
  }

  async createTodo(todo: string) {
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
  }
  async getTodos(signal?: AbortSignal) {
    const { data }: { data: ITodo[] } = await axios.get(`${HOST}/todos`, {
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
      signal,
    });
    return data;
  }
  async updateTodo(id: number, todo: string, isCompleted: boolean) {
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
  }
  async deleteTodo(id: number) {
    const result = await axios.delete(`${HOST}/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
    });
    return result;
  }
}
