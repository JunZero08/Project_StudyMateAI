import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

export default function Login() {
  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h2>Google 계정으로 로그인</h2>
      <button onClick={() => signInWithPopup(auth, provider)}>
        로그인
      </button>
    </div>
  );
}
