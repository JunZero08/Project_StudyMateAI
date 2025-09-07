import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function Gamification({ user }) {
  const [points, setPoints] = useState(0);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', user.uid), snap => {
      setPoints(snap.exists() ? snap.data().points : 0);
    });
    return unsub;
  }, [user]);
  return (
    <section>
      <h2>포인트: {points}</h2>
      <progress value={points} max="100" />
    </section>
  );
}
