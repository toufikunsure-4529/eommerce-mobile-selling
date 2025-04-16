// lib/firestore/series/write.js (updated)
import { db } from "@/lib/firebase";
import { collection, doc, addDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

export const createNewSeries = async ({ data }) => {
  try {
    if (!data.seriesName || !data.categoryId || !data.brandId) {
      throw new Error("Series name, category, and brand are required");
    }

    const seriesData = {
      seriesName: data.seriesName.trim(),
      categoryId: data.categoryId,
      brandId: data.brandId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "series"), seriesData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating series:", error);
    throw new Error(error.message || "Failed to create series");
  }
};

export const updateSeries = async ({ id, data }) => {
  try {
    if (!id) {
      throw new Error("Series ID is required");
    }
    if (!data.seriesName || !data.categoryId || !data.brandId) {
      throw new Error("Series name, category, and brand are required");
    }

    const seriesData = {
      seriesName: data.seriesName.trim(),
      categoryId: data.categoryId,
      brandId: data.brandId,
      updatedAt: serverTimestamp(),
    };

    const docRef = doc(db, "series", id);
    await setDoc(docRef, seriesData, { merge: true });
    return id;
  } catch (error) {
    console.error("Error updating series:", error);
    throw new Error(error.message || "Failed to update series");
  }
};

export const deleteSeries = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Series ID is required");
    }
    const docRef = doc(db, "series", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting series:", error);
    throw new Error(error.message || "Failed to delete series");
  }
};