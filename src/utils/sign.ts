import axios from 'axios';
import { IAuth } from '../interface/auth/IAuth';
const HOST = process.env.REACT_APP_HOST;

export const signIn = async (email: string, password: string) => {
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
};
export const signUp = async (email: string, password: string) => {
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
};
