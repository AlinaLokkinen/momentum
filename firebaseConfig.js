import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAtBqcb-6RnoYJXFtdDu4-dbboPQX2mK6Y",
  authDomain: "momentum-d423c.firebaseapp.com",
  databaseURL: "https://momentum-d423c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "momentum-d423c",
  storageBucket: "momentum-d423c.appspot.com",
  messagingSenderId: "83078360690",
  appId: "1:83078360690:web:54732420274d31e1859ceb"
};

// Initialize Firebase
export const app2 = initializeApp(firebaseConfig);