import { useState } from 'react';
import { WantedAuth } from '../utils/api';

const AuthPage = () => {
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [disable, setDisable] = useState(true);
  const buttonCtl = () => {
    email.includes('@') && pw.length >= 8
      ? setDisable(false)
      : setDisable(true);
  };
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    buttonCtl();
  };
  const changePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    buttonCtl();
  };
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
    } catch (err: any) {
      const { message }: { message: string } = err.response.data;
      alert(message);
    }
  };

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
