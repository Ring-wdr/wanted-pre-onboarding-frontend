import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputBox } from '../component/InputBox';
import { useInput } from '../hooks/useInput';

const AuthPage = () => {
  const [email, changeEmail] = useInput('');
  const [pw, changePw] = useInput('');
  const [disable, setDisable] = useState(true);

  const nav = useNavigate();

  const onSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await import('../utils/sign').then(({ signIn }) => signIn(email, pw));
    if (localStorage.getItem('access_token')) {
      alert('로그인되었습니다!');
      return nav('/todos');
    }
  };
  const onSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await import('../utils/sign').then(({ signUp }) => signUp(email, pw));
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
      <div className='logo-box'>
        <img src={`${process.env.PUBLIC_URL}/wanted_logo.png`} alt='logo' />
      </div>
      <form>
        <InputBox
          type='text'
          value={email}
          onChange={changeEmail}
          placeholder='email'
        />
        <InputBox
          type='password'
          value={pw}
          onChange={changePw}
          placeholder='password'
        />
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
