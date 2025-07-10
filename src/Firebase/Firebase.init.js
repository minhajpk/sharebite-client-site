
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADl56DkXpT_oREW4OBEsvkaJCcLnNfz64",
  authDomain: "sharebite-85e8d.firebaseapp.com",
  projectId: "sharebite-85e8d",
  storageBucket: "sharebite-85e8d.firebasestorage.app",
  messagingSenderId: "804033788290",
  appId: "1:804033788290:web:cea4e16b7bf1342d20779b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);