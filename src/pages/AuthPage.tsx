import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WantedAuth } from '../utils/api';
import { useInput } from '../hooks/useInput';

const AuthPage = () => {
  const [email, changeEmail] = useInput('');
  const [pw, changePw] = useInput('');
  const [disable, setDisable] = useState(true);

  const nav = useNavigate();

  const onSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await WantedAuth.signIn(email, pw);
    if (localStorage.getItem('access_token')) {
      alert('로그인되었습니다!');
      return nav('/todos');
    }
  };
  const onSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await WantedAuth.signUp(email, pw);
  };
  useEffect(
    () =>
      email.includes('@') && pw.length >= 8
        ? setDisable(false)
        : setDisable(true),
    [email, pw]
  );

  return (
    <div className='login'>
      <h2>SignUp/SignIn Page</h2>
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
        <div className='sign-btn'>
          <button disabled={disable} onClick={onSignIn}>
            로그인
          </button>
          <button disabled={disable} onClick={onSignUp}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
