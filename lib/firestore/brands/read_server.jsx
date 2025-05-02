// lib/firestore/brands/read_server.js
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, where, orderBy } from "firebase/firestore";

export const getBrand = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Brand ID is required");
    }
    const docRef = doc(db, "brands", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching brand:", error);
    throw new Error(error.message || "Failed to fetch brand");
  }
};

export const getBrands = async () => {
  try {
    const q = query(collection(db, "brands"), orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error(error.message || "Failed to fetch brands");
  }
};
export const getBrandsByCategory = async ({ categoryId }) => {
  try {
    if (!categoryId) {
      throw new Error("Category ID is required");
    }
    console.log("Fetching brands for categoryId:", categoryId); // Debug log
    const brandsRef = collection(db, "brands");
    const q = query(
      brandsRef,
      where("categoryId", "==", categoryId),
      orderBy("name", "asc")
    );
    const snapshot = await getDocs(q);
    const brands = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched brands:", brands); // Debug log
    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error(error.message || "Failed to fetch brands");
  }
};