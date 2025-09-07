import React, { useState } from 'react';
import axios from 'axios';
import { LLM_API, db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function LearnSession({ user }) {
  const [answers, setAnswers] = useState([]);
  const [report, setReport] = useState(null);
  const [materials, setMaterials] = useState('');

  const analyze = async () => {
    const res = await axios.post(`${LLM_API}/analyze`, { answers });
    setReport(res.data);
  };

  const generate = async () => {
    const res = await axios.post(`${LLM_API}/generate`, { report });
    setMaterials(res.data.materials);
    await addDoc(collection(db, 'sessions'), {
      uid: user.uid,
      report,
      materials: res.data.materials,
      timestamp: Timestamp.now()
    });
  };

  return (
    <section>
      <h2>2. 학습 세션</h2>
      <button onClick={analyze}>오답 분석</button>
      {report && (
        <>
          <pre>{JSON.stringify(report, null,2)}</pre>
          <button onClick={generate}>맞춤 자료 생성</button>
        </>
      )}
      {materials && (
        <div>
          <h3>학습 자료</h3>
          <div style={{ whiteSpace: 'pre-wrap' }}>{materials}</div>
        </div>
      )}
    </section>
  );
}
