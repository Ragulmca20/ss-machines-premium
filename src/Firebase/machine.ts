import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "./firebase";
import { Role } from "../Store/Auth/AuthSlice";

export const addMachineData = async (data: {
  machineValue1: string;
  machineValue2: string;
  file: File;
  userId: string;
}) => {
  const downloadURL = await uploadfile(data.file);
  const collectionRef = collection(db, "Machine");
  try {
    await addDoc(collectionRef, {
      machineValue1: data.machineValue1,
      machineValue2: data.machineValue2,
      filePath: downloadURL,
      userId: data.userId || "yjTwOtZU0QNgvz82wUSNv9F9VYk2",
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  // Now you can use the downloadURL or save it to your database
  console.log("File uploaded. Download URL:", downloadURL);
};
export const uploadfile = async (file: any) => {
  const storage = getStorage();
  const storageRef = ref(storage, file.name);
  await uploadBytes(storageRef, file);

  // You can get the download URL of the uploaded file
  return await getDownloadURL(storageRef);
};

export const getMachineData = async (id: string) => {
  try {
    const q = query(
      collection(db, "users"),
      where("id", "==", id),
      where("role", "==", Role.admin)
    );
    const user = await getDocs(q);
    let collectionRef ;
    if(user.docs[0]?.data()){
      collectionRef  = collection(db, "Machine");
    }
    else {
      collectionRef = query(collection(db,"Machine"), where("userId", "==",id))
    }
    
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
  return [];
};
