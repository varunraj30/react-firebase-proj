import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleAuth = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUser = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUser = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleAuth);
  };

  const isLoggedIn = user ? true : false;

  console.log(user);

  const handleCreateNewList = async (name, isbn, price, cover) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}/${cover.name}`);
    const uploadResult = await uploadBytes(imageRef, cover);
    console.log(uploadResult);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUser,
        signinUser,
        signInWithPopup,
        isLoggedIn,
        handleCreateNewList,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
