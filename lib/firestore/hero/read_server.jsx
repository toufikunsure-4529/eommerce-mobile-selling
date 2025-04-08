// lib/firestore/hero/read_server.js
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// Fetch hero content by ID
export const getHeroContent = async ({ id }) => {
  try {
    if (!id) throw new Error("ID is required to fetch hero content");

    const docRef = doc(db, "hero", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null; // Return null if document doesn't exist
    }

    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    throw new Error("Failed to fetch hero content: " + error.message);
  }
};