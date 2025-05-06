import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getHeroContent = async ({ id }) => {
  try {
    if (!id) throw new Error("ID is required");

    const docRef = doc(db, "hero", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    throw new Error("Failed to fetch hero content: " + error.message);
  }
};
