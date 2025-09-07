import React, { useEffect, useState } from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import ExamUploader from './components/ExamUploader';
import LearnSession from './components/LearnSession';
import Dashboard from './components/Dashboard';
import Gamification from './components/Gamification';
import ChatTutor from './components/ChatTutor';

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => onAuthStateChanged(auth, setUser), []);
  if (!user) return <Login />;
  return (
    <div style={{ padding: 20 }}>
      <header>
        <h1>Project_StudyMateAI</h1>
        <button onClick={() => signOut(auth)}>로그아웃</button>
      </header>
      <Gamification user={user} />
      <ExamUploader user={user} />
      <LearnSession user={user} />
      <Dashboard user={user} />
      <ChatTutor user={user} />
    </div>
  );
}
