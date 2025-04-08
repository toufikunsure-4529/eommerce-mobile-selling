// lib/firestore/hero/write.js
import { db, storage } from "@/lib/firebase";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
// Create new hero content
export const createHeroContent = async ({ data, image }) => {
    try {
        const id = uuidv4(); // Generate a unique ID for the hero content
        let imageUrl = null;

        // Upload image to Firebase Storage if provided
        if (image) {
            const storageRef = ref(storage, `hero/${id}/${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            imageUrl = await getDownloadURL(snapshot.ref);
        }

        // Prepare the data to save in Firestore
        const heroData = {
            id,
            heading: data?.heading || "",
            subtitle: data?.subtitle || "",
            buttonText: data?.buttonText || "",
            imageUrl: imageUrl || null,
            createdAt: new Date().toISOString(),
        };

        // Save to Firestore
        await setDoc(doc(db, "hero", id), heroData);
        return heroData;
    } catch (error) {
        throw new Error("Failed to create hero content: " + error.message);
    }
};

// Update existing hero content
export const updateHeroContent = async ({ data, image }) => {
    try {
        const id = data?.id;
        if (!id) throw new Error("ID is required to update hero content");

        let imageUrl = data?.imageUrl || null;

        // Upload new image if provided
        if (image) {
            const storageRef = ref(storage, `hero/${id}/${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            imageUrl = await getDownloadURL(snapshot.ref);
        }

        // Prepare updated data
        const heroData = {
            heading: data?.heading || "",
            subtitle: data?.subtitle || "",
            buttonText: data?.buttonText || "",
            imageUrl: imageUrl || null,
            updatedAt: new Date().toISOString(),
        };

        // Update in Firestore
        await updateDoc(doc(db, "hero", id), heroData);
        return { id, ...heroData };
    } catch (error) {
        throw new Error("Failed to update hero content: " + error.message);
    }
};

// Delete hero content
export const deleteHeroContent = async ({ id, imageUrl }) => {
    try {
      if (!id) throw new Error("ID is required to delete hero content");
  
      // Delete image from storage if it exists
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef).catch((error) => {
          console.warn("Failed to delete image: ", error.message);
        });
      }
  
      // Delete document from Firestore
      await deleteDoc(doc(db, "hero", id));
      return true;
    } catch (error) {
      throw new Error("Failed to delete hero content: " + error.message);
    }
  };