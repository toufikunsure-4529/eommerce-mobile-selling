import { db, storage } from "@/lib/firebase";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// Create hero content with only image
export const createHeroContent = async ({ image }) => {
  try {
    const id = uuidv4();
    let imageUrl = null;

    if (image) {
      const storageRef = ref(storage, `hero/${id}/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const heroData = {
      id,
      imageUrl,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "hero", id), heroData);
    return heroData;
  } catch (error) {
    throw new Error("Failed to upload hero image: " + error.message);
  }
};

// Update hero content image only
export const updateHeroContent = async ({ data, image }) => {
  try {
    const id = data?.id;
    if (!id) throw new Error("ID is required to update image");

    let imageUrl = data?.imageUrl || null;

    if (image) {
      const storageRef = ref(storage, `hero/${id}/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const heroData = {
      imageUrl,
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(doc(db, "hero", id), heroData);
    return { id, ...heroData };
  } catch (error) {
    throw new Error("Failed to update hero image: " + error.message);
  }
};

// Delete hero content and image
export const deleteHeroContent = async ({ id, imageUrl }) => {
  try {
    if (!id) throw new Error("ID is required to delete content");

    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef).catch((error) => {
        console.warn("Failed to delete image: ", error.message);
      });
    }

    await deleteDoc(doc(db, "hero", id));
    return true;
  } catch (error) {
    throw new Error("Failed to delete hero content: " + error.message);
  }
};
