import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth, { db } from "./firebase";
import { addDoc, collection, getDoc, getDocs } from 'firebase/firestore';

export const login = async (params: { email: string; password: string }) => {
  return await signInWithEmailAndPassword(
    auth,
    params?.email,
    params?.password
  );
};

export const signup = async (params: { email: string; password: string }) => {
  const user = await createUserWithEmailAndPassword(
    auth,
    params?.email,
    params?.password
  );
  const userRef = collection(db,"users");
  await addDoc(userRef,{id:user.user.uid, email:user.user.email, role:"user"});
  return user;
};

export const updateUserProfile = async (user: any) => {
    await updateProfile(user, { displayName: "admin" });
}

export const getUserDetails = async () => {
  try {
    const collectionRef = collection(db, "users");
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return documents;
  } catch (error) {
    console.error('Error getting documents: ', error);
};
}