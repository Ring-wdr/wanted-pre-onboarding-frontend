import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { WantedAuth } from '../utils/api';

const AuthPage = () => {
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [disable, setDisable] = useState(true);

  const nav = useNavigate();

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const changePw = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPw(e.target.value);

  const onSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // avoid blank on input
    if (email.includes(' ')) {
      return alert('이메일 주소에 빈 칸은 입력할 수 없습니다.');
    }
    if (pw.includes(' ')) {
      return alert('비밀번호에 빈 칸은 입력할 수 없습니다.');
    }
    try {
      await WantedAuth.signIn(email, pw);
      alert('로그인되었습니다!');
      if (localStorage.getItem('access_token')) return nav('/todos');
    } catch (err) {
      console.error(err);
    }
  };
  const onSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // avoid blank on input
    if (email.includes(' ')) {
      return alert('이메일 주소에 빈 칸은 입력할 수 없습니다.');
    }
    if (pw.includes(' ')) {
      return alert('비밀번호에 빈 칸은 입력할 수 없습니다.');
    }
    try {
      await WantedAuth.signUp(email, pw);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { message }: { message: string } = err.response?.data;
        alert(message);
      } else {
        throw new Error('axios 에러가 아닙니다.');
      }
    }
  };
  useEffect(() => {
    email.includes('@') && pw.length >= 8
      ? setDisable(false)
      : setDisable(true);
  }, [email, pw]);

  return (
    <div>
      <form>
        <div>
          <input
            type='text'
            value={email}
            onChange={changeEmail}
            placeholder='put email'
          />
        </div>
        <div>
          <input
            type='password'
            value={pw}
            onChange={changePw}
            placeholder='put password'
          />
        </div>
        <button disabled={disable} onClick={onSignIn}>
          로그인
        </button>
        <button disabled={disable} onClick={onSignUp}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
