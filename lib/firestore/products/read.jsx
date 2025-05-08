"use client";

import { db } from "@/lib/firebase";
import { collection, doc, limit, onSnapshot, query, startAfter, where, getDocs } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useProducts({ pageLimit, lastSnapDoc }) {
  const { data, error } = useSWRSubscription(
    ["products", pageLimit, lastSnapDoc],
    ([path, pageLimit, lastSnapDoc], { next }) => {
      const ref = collection(db, path);
      let q = query(ref, limit(pageLimit ?? 10));

      if (lastSnapDoc) {
        q = query(q, startAfter(lastSnapDoc));
      }

      const unsub = onSnapshot(
        q,
        (snapshot) =>
          next(null, {
            list: snapshot.docs.length === 0 ? null : snapshot.docs.map((snap) => ({
              id: snap.id,
              ...snap.data(),
              variantImages: snap.data().variantImages || {}, // Ensure variantImages is included
            })),
            lastSnapDoc: snapshot.docs.length === 0 ? null : snapshot.docs[snapshot.docs.length - 1],
          }),
        (err) => next(err, null),
      );
      return () => unsub();
    },
  );

  return {
    data: data?.list || [],
    lastSnapDoc: data?.lastSnapDoc,
    error: error?.message,
    isLoading: data === undefined,
  };
}

export function useProduct({ productId }) {
  const { data, error } = useSWRSubscription(
    ["products", productId],
    ([path, productId], { next }) => {
      const ref = doc(db, `${path}/${productId}`);

      const unsub = onSnapshot(
        ref,
        (snapshot) => next(null, {
          id: snapshot.id,
          ...snapshot.data(),
          variantImages: snapshot.data()?.variantImages || {}, // Ensure variantImages is included
        }),
        (err) => next(err, null),
      );
      return () => unsub();
    },
  );

  return {
    data: data,
    error: error?.message,
    isLoading: data === undefined,
  };
}

export function useProductsByIds({ idsList }) {
  const { data, error } = useSWRSubscription(
    ["products", idsList],
    ([path, idsList], { next }) => {
      const ref = collection(db, path);
      const q = query(ref, where("id", "in", idsList));

      const unsub = onSnapshot(
        q,
        (snapshot) =>
          next(
            null,
            snapshot.docs.length === 0
              ? []
              : snapshot.docs.map((snap) => ({
                  id: snap.id,
                  ...snap.data(),
                  variantImages: snap.data().variantImages || {}, // Ensure variantImages is included
                })),
          ),
        (err) => next(err, null),
      );
      return () => unsub();
    },
  );

  return {
    data: data || [],
    error: error?.message,
    isLoading: data === undefined,
  };
}

export const searchProducts = async (searchTerm) => {
  if (!searchTerm.trim()) return [];

  try {
    const ref = collection(db, "products");
    const lowerSearchTerm = searchTerm.trim().toLowerCase();

    const q = query(ref);
    const snapshot = await getDocs(q);

    const products = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
        variantImages: doc.data().variantImages || {}, // Ensure variantImages is included
      }))
      .filter((product) =>
        [
          product.title?.toLowerCase(),
          product.shortDescription?.toLowerCase(),
          product.description?.toLowerCase(),
          product.brand?.toLowerCase(),
          product.series?.toLowerCase(),
          ...(product.colors || []).map((color) => color.toLowerCase()), // Include colors in search
        ].some((field) => field?.includes(lowerSearchTerm)),
      );

    return products.slice(0, 10);
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

export function useProductsByModelId(modelId) {
  const { data, error } = useSWRSubscription(
    ["products-by-model", modelId],
    ([_, modelId], { next }) => {
      const q = query(collection(db, "products"), where("modelId", "==", modelId));
      const unsub = onSnapshot(
        q,
        (snap) =>
          next(
            null,
            snap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              variantImages: doc.data().variantImages || {}, // Ensure variantImages is included
            })),
          ),
        (err) => next(err),
      );
      return () => unsub();
    },
  );

  return {
    data: data || [],
    error: error?.message,
    isLoading: data === undefined,
  };
}