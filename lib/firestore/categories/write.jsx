import { db, storage } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewCategory = async ({ data, image }) => {
  if (!image) {
    throw new Error("Image is Required");
  }
  if (!data?.name) {
    throw new Error("Name is required");
  }
  const newId = doc(collection(db, `ids`)).id;
  const imageRef = ref(storage, `categories/${newId}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);

  await setDoc(doc(db, `categories/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
};

export const updateCategory = async ({ id, data, image }) => {
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!id) {
    throw new Error("ID is required");
  }

  let imageURL = null;

  // First get the current image URL if it exists
  const docRef = doc(db, `categories/${id}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    imageURL = docSnap.data().imageURL;
  }

  // If new image is provided, upload it
  if (image) {
    const imageRef = ref(storage, `categories/${id}`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  await updateDoc(doc(db, `categories/${id}`), {
    ...data,
    imageURL: imageURL,
    timestampUpdate: Timestamp.now(),
  });
};

export const deleteCategory = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `categories/${id}`));
};