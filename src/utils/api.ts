import axios from 'axios';
import { ITodo } from '../interface/todo/ITodo';
const HOST = process.env.REACT_APP_HOST;

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
