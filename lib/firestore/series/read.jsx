// lib/firestore/series/read.js
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { getBrand } from "@/lib/firestore/brands/read_server";

export const useSeries = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, "series"));
    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        try {
          const seriesList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Fetch category and brand names
          const enrichedSeries = await Promise.all(
            seriesList.map(async (series) => {
              const category = await getCategory({ id: series.categoryId });
              const brand = await getBrand({ id: series.brandId });
              return {
                ...series,
                categoryName: category?.name || "Unknown",
                brandName: brand?.name || "Unknown",
              };
            })
          );

          setData(enrichedSeries);
          setError(null);
        } catch (err) {
          console.error("Error fetching series:", err);
          setError(err.message || "Failed to fetch series");
          setData([]);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        console.error("Snapshot error:", err);
        setError(err.message || "Failed to fetch series");
        setIsLoading(false);
        setData([]);
      }
    );

    return () => unsubscribe();
  }, []);

  return { data, isLoading, error };
};