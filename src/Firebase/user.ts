import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth, { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

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
  const userRef = collection(db, "users");
  const data = await addDoc(userRef, {
    id: user.user.uid,
    email: user.user.email,
    role: "User",
    isReadOnly: false,
  });
  console.log(data);
  return user;
};

export async function updateUserProfile(id: string, newData: any) {
  try {
    const q = query(collection(db, "users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No users founf");
    } else {
      querySnapshot.forEach(async (userDoc) => {
        const userDocRef = doc(db, "users", userDoc.id);
        await updateDoc(userDocRef, newData);
      });
    }
  } catch (error) {
    console.error("Error updating users by role:", error);
  }
}

export const signOut = async () => {
  await auth.signOut();
};
export const getUser = async (id: string) => {
  try {
    const q = query(collection(db, "users"), where("id", "==", id));
    return (await getDocs(q))?.docs[0]?.data();
  } catch (error) {
    console.error("Error updating users by role:", error);
  }
};
export const getUserDetails = async () => {
  try {
    const collectionRef = collection(db, "users");
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};
