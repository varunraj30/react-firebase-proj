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
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  query,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  // KEYS
};

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

  const getImageURL = async (path) => {
    return await getDownloadURL(ref(storage, path));
  };

  const listAllBooks = async () => {
    return getDocs(collection(firestore, "books"));
  };

  const fetchMyBooks = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "===", userId));
    const res = await getDocs(q);
  };

  const getBookById = async (id) => {
    const docRef = await doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const res = await addDoc(collectionRef, {
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
    });
    return res;
  };

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const res = await getDocs(collectionRef);
    return res;
  };

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
        user,
        signupUser,
        signinUser,
        signInWithPopup,
        placeOrder,
        isLoggedIn,
        handleCreateNewList,
        fetchMyBooks,
        listAllBooks,
        getImageURL,
        getBookById,
        getOrders,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
