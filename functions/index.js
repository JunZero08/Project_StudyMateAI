const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// 세션 생성 시 사용자에게 10포인트 추가
exports.onSessionCreate = functions.firestore
  .document('sessions/{sid}')
  .onCreate(async (snap) => {
    const { uid } = snap.data();
    const userRef = admin.firestore().collection('users').doc(uid);
    await admin.firestore().runTransaction(async tx => {
      const doc = await tx.get(userRef);
      const prev = doc.exists ? doc.data().points || 0 : 0;
      tx.set(userRef, { points: prev + 10 }, { merge: true });
    });
  });
