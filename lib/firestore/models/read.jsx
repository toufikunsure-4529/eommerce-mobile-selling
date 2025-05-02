import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState, useCallback } from "react";

export async function getModelsBySeries(brandId, seriesId) {
  try {
    if (!brandId || !seriesId) {
      return [];
    }
    const modelsCollection = collection(db, "models");
    const q = query(
      modelsCollection,
      where("brandId", "==", brandId),
      where("seriesId", "==", seriesId)
    );
    const modelsSnapshot = await getDocs(q);
    const models = modelsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return models;
  } catch (error) {
    throw new Error("Failed to fetch models: " + error.message);
  }
}

export async function getModelById(modelId) {
  try {
    if (!modelId) {
      throw new Error("Model ID is required");
    }
    const modelRef = doc(db, "models", modelId);
    const modelDoc = await getDoc(modelRef);
    if (!modelDoc.exists()) {
      throw new Error("Model not found");
    }
    return { id: modelDoc.id, ...modelDoc.data() };
  } catch (error) {
    throw new Error("Failed to fetch model: " + error.message);
  }
}

export function useModelsBySeries(brandId, seriesId) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchModels = useCallback(async () => {
    if (!brandId || !seriesId) {
      setData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const models = await getModelsBySeries(brandId, seriesId);
      setData(models);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch models");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [brandId, seriesId]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  return { data, isLoading, error, refetch: fetchModels };
}

export function useModelById(modelId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchModel = useCallback(async () => {
    if (!modelId) {
      setData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const model = await getModelById(modelId);
      setData(model);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch model");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [modelId]);

  useEffect(() => {
    fetchModel();
  }, [fetchModel]);

  return { data, isLoading, error, refetch: fetchModel };
}