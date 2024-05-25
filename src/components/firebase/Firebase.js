// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_secret_apiKey,  // we access env file data like this in create-react-app
  authDomain: process.env.REACT_APP_secret_authDomain,
  projectId: process.env.REACT_APP_secret_projectId,
  storageBucket: process.env.REACT_APP_secret_storageBucket,
  messagingSenderId: process.env.REACT_APP_secret_messagingSenderId,
  appId: process.env.REACT_APP_secret_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

export default app