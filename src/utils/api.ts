import axios from 'axios';
import { ITodo } from '../interface/ITodo';
const HOST = process.env.REACT_APP_HOST;

interface IAuth {
  data: {
    access_token: string;
  };
}

export const WantedAuth = {
  signIn: async (email: string, password: string) => {
    const {
      data: { access_token },
    }: IAuth = await axios.post(`${HOST}/auth/signin`, { email, password });
    window.localStorage.setItem('access_token', access_token);
  },
  signUp: async (email: string, password: string) => {
    const result = await axios.post(`${HOST}/auth/signup`, { email, password });
    console.log(result);
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
