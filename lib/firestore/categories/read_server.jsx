import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, orderBy } from "firebase/firestore";

export const getCategory = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Category ID is required");
    }
    const docRef = doc(db, "categories", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error(error.message || "Failed to fetch category");
  }
};

export const getCategories = async () => {
  try {
    const q = query(collection(db, "categories"), orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(error.message || "Failed to fetch categories");
  }
};