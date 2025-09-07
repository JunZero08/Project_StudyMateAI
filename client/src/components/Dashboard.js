import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, where, query, getDocs } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';

export default function Dashboard({ user }) {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    (async () => {
      const q = query(collection(db, 'sessions'), where('uid', '==', user.uid));
      const snap = await getDocs(q);
      setLogs(snap.docs.map(d => d.data()));
    })();
  }, [user]);

  const data = {
    labels: logs.map((_,i) => `세션 ${i+1}`),
    datasets: [{ label: '정답률(%)',
      data: logs.map(l => Math.round(l.report.correctRate*100)),
      borderColor: 'blue', fill: false }]
  };

  return (
    <section>
      <h2>3. 학습 대시보드</h2>
      <Line data={data} />
    </section>
  );
}
