import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export const getAllHeroContent = async () => {
  try {
    const q = query(collection(db, "hero"));
    const querySnapshot = await getDocs(q);
    const heroData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return heroData;
  } catch (error) {
    throw new Error("Failed to fetch hero content: " + error.message);
  }
};
