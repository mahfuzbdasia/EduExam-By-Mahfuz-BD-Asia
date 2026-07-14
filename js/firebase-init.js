// ============================================================
// FIREBASE INIT — এই ফাইলে তোমার নিজের ফ্রি Firebase config বসাও
// ============================================================
// কিভাবে পাবে (সম্পূর্ণ ফ্রি, কোনো কার্ড লাগবে না):
// 1) https://console.firebase.google.com -> "Add project" -> নাম দাও -> Create
// 2) বাম পাশে "Build" -> "Authentication" -> Get Started -> "Email/Password" চালু করো
// 3) বাম পাশে "Build" -> "Firestore Database" -> Create database -> "Start in test mode"
//    (পরে firestore.rules ফাইল থেকে rules বসিয়ে দিও, নিচে README দেখো)
// 4) Project settings (⚙️ আইকন) -> General -> "Your apps" -> Web (</>) আইকনে ক্লিক
// 5) যে config object দেখাবে সেটা এখানে নিচে বসাও
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 👇👇👇 তোমার নিজের Firebase config বসানো হয়েছে 👇👇👇
const firebaseConfig = {
  apiKey: "AIzaSyDU2PnZQwfNmQXohsaMQLuu0KnxjVJ_FBY",
  authDomain: "eduexam-mahfuzbdasia.firebaseapp.com",
  projectId: "eduexam-mahfuzbdasia",
  storageBucket: "eduexam-mahfuzbdasia.firebasestorage.app",
  messagingSenderId: "815078199539",
  appId: "1:815078199539:web:ea9427d597019bd5d46786",
  measurementId: "G-BBKNPSPRST",
};
// 👆👆👆 এই অংশটা replace করো 👆👆👆

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  serverTimestamp,
};
