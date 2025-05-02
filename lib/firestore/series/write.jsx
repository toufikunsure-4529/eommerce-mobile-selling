// lib/firestore/series/write.js
import { db } from "@/lib/firebase";
import { collection, doc, addDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

export const createNewSeries = async ({ data }) => {
  try {
    if (!data.seriesName || !data.brandId) {
      throw new Error("Series name and brand are required");
    }

    const seriesData = {
      seriesName: data.seriesName.trim(),
      brandId: data.brandId,
      categoryId: data.categoryId || null,
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

export const batchCreateSeries = async (brandId, seriesNames) => {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required");
    }
    if (!seriesNames || seriesNames.length === 0) {
      throw new Error("At least one series name is required");
    }

    const batch = [];
    const timestamp = serverTimestamp();

    seriesNames.forEach(seriesName => {
      const seriesData = {
        seriesName: seriesName.trim(),
        brandId,
        categoryId: null,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      batch.push(addDoc(collection(db, "series"), seriesData));
    });

    await Promise.all(batch);
    return seriesNames.length;
  } catch (error) {
    console.error("Error batch creating series:", error);
    throw new Error(error.message || "Failed to batch create series");
  }
};

export const deleteSeries = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Series ID is required");
    }
    const docRef = doc(db, "series", id);
    await deleteDoc(docRef);
    return id;
  } catch (error) {
    console.error("Error deleting series:", error);
    throw new Error(error.message || "Failed to delete series");
  }
};