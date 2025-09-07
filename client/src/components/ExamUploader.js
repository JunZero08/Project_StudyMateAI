import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function ExamUploader({ user }) {
  const [file, setFile] = useState(null);
  const upload = async () => {
    if (!file) return alert('파일 선택하세요');
    const text = await file.text();
    await addDoc(collection(db, 'exams'), {
      uid: user.uid,
      content: text,
      uploadedAt: Timestamp.now()
    });
    alert('업로드 완료');
    setFile(null);
  };
  return (
    <section>
      <h2>1. 시험 업로드</h2>
      <input type="file" accept="application/pdf"
             onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>업로드</button>
    </section>
  );
}
