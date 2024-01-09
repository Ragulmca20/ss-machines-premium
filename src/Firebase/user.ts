import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "./firebase";

export const login = async (params: { email: string; password: string }) => {
  return await signInWithEmailAndPassword(
    auth,
    params?.email,
    params?.password
  );
};

export const signup = async (params: { email: string; password: string }) => {
  return await createUserWithEmailAndPassword(
    auth,
    params?.email,
    params?.password
  );
};

export const updateUserProfile = async (user: any) => {
    await updateProfile(user, { displayName: "admin" });
}