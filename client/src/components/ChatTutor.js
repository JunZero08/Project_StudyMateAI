import React, { useState } from 'react';
import axios from 'axios';
import { LLM_API } from '../firebase';

export default function ChatTutor() {
  const [q, setQ] = useState('');
  const [a, setA] = useState('');

  const ask = async () => {
    const res = await axios.post(`${LLM_API}/chat`, { query: q });
    setA(res.data.reply);
  };

  return (
    <section>
      <h2>챗봇 튜터</h2>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="질문 입력"/>
      <button onClick={ask}>질문</button>
      <div style={{whiteSpace:'pre-wrap',marginTop:10}}>{a}</div>
    </section>
  );
}
