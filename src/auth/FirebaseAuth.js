import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyB69epqbtd1SqjEu9BwzEhlk2ux_rlep4A",
  authDomain: "netflix-clone-3013b.firebaseapp.com",
  projectId: "netflix-clone-3013b",
  storageBucket: "netflix-clone-3013b.appspot.com",
  messagingSenderId: "1093711792328",
  appId: "1:1093711792328:web:79bccfed1a824cdaeb3dfd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);