import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {

  apiKey: "AIzaSyBRzxdJtTja4ZDnTQI1Vb6y29-W33Ykd9U",

  authDomain: "register-e552c.firebaseapp.com",

  projectId: "register-e552c",

  storageBucket: "register-e552c.appspot.com",

  messagingSenderId: "266764553567",

  appId: "1:266764553567:web:dff4cb411f7d247279baea"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
