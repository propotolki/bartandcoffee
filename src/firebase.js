import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmjJ-YkuykNqCwgkcIHtNDvlXZmq9Pzg4",
  authDomain: "bart-and-coffee.firebaseapp.com",
  projectId: "bart-and-coffee",
  storageBucket: "bart-and-coffee.appspot.com", // Исправлено на стандартный формат
  messagingSenderId: "513236275835",
  appId: "1:513236275835:web:227ce1237724b7ea1388de"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация сервисов
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };