import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "./firebase";

export const addMachineData = async (data:{machineValue1:any, machineValue2:any, file:any, userId:any}) =>{
        const downloadURL = await uploadfile(data.file);
        const collectionRef = collection(db, "Machine");
        try {
          const docRef = await addDoc(collectionRef, {
            machineValue1: data.machineValue1,
            machineValue2: data.machineValue2,
            filePath: downloadURL,
            userId: data.userId
          });
          console.log("Document added with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        // Now you can use the downloadURL or save it to your database
        console.log("File uploaded. Download URL:", downloadURL);

}
export const uploadfile = async (file:any) =>{
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);

    // You can get the download URL of the uploaded file
    return await getDownloadURL(storageRef);
}

export const getMachineData = async () =>{
    try {
        const collectionRef = collection(db, "Machine");
        const querySnapshot = await getDocs(collectionRef);
        const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return documents;
      } catch (error) {
        console.error('Error getting documents: ', error);
    };
    return [];
}