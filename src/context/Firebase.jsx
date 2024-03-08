import { useContext, createContext } from "react";
//firebase imports
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//firebase storage
import {
  doc,
  addDoc,
  collection,
  getFirestore,
  setDoc,
  getDoc,
} from "firebase/firestore";

// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTMwGIOtxzIihpZD5F0TnZWlNColgIUHo",
  authDomain: "todoapp-react-bootstrap.firebaseapp.com",
  projectId: "todoapp-react-bootstrap",
  storageBucket: "todoapp-react-bootstrap.appspot.com",
  messagingSenderId: "46267279348",
  appId: "1:46267279348:web:5f30e3a7a160ba177f3ba1",
  measurementId: "G-ENYET59TR8",
};

//context
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const FirebaseProvider = ({ children }) => {
  const storeTasksToFirebase = async (tasks) => {
    const docRef = doc(db, "tasks", "sampleArray");
    const response = await setDoc(docRef, { tasks: tasks });
  };
  const getTasksFromFirebase = async () => {
    const docRef = doc(db, "tasks", "sampleArray");
    return await getDoc(docRef);
  };
  return (
    <FirebaseContext.Provider
      value={{ storeTasksToFirebase, getTasksFromFirebase }}>
      {children}
    </FirebaseContext.Provider>
  );
};

//firebase hosting:
//this is static hosting and stored files will be provided on request.

// dynamic hosting: files will be created by server with some internal server code on your request. (example => php server)

// step 1: install firebase tools => (user sudo install -g firebase-tools)
// step 2: login firebase with command in your app=> firebase login
// step 3: setup project with this command => firebase init / firebase init hosting
// step 4: build your project and enter the folder name in public
// step 5: deploy project and get url with this command => firebase deploy