"use client"

import { db } from "@/lib/firebase"
import { collection, doc, limit, onSnapshot, query, startAfter, where, getDocs } from "firebase/firestore"
import useSWRSubscription from "swr/subscription"

export function useProducts({ pageLimit, lastSnapDoc }) {
  const { data, error } = useSWRSubscription(
    ["products", pageLimit, lastSnapDoc],
    ([path, pageLimit, lastSnapDoc], { next }) => {
      const ref = collection(db, path)
      let q = query(ref, limit(pageLimit ?? 10))

      if (lastSnapDoc) {
        q = query(q, startAfter(lastSnapDoc))
      }

      const unsub = onSnapshot(
        q,
        (snapshot) =>
          next(null, {
            list: snapshot.docs.length === 0 ? null : snapshot.docs.map((snap) => snap.data()),
            lastSnapDoc: snapshot.docs.length === 0 ? null : snapshot.docs[snapshot.docs.length - 1],
          }),
        (err) => next(err, null),
      )
      return () => unsub()
    },
  )

  return {
    data: data?.list || [],
    lastSnapDoc: data?.lastSnapDoc,
    error: error?.message,
    isLoading: data === undefined,
  }
}

export function useProduct({ productId }) {
  const { data, error } = useSWRSubscription(["products", productId], ([path, productId], { next }) => {
    const ref = doc(db, `${path}/${productId}`)

    const unsub = onSnapshot(
      ref,
      (snapshot) => next(null, snapshot.data()),
      (err) => next(err, null),
    )
    return () => unsub()
  })

  return {
    data: data,
    error: error?.message,
    isLoading: data === undefined,
  }
}

export function useProductsByIds({ idsList }) {
  const { data, error } = useSWRSubscription(["products", idsList], ([path, idsList], { next }) => {
    const ref = collection(db, path)

    const q = query(ref, where("id", "in", idsList))

    const unsub = onSnapshot(
      q,
      (snapshot) => next(null, snapshot.docs.length === 0 ? [] : snapshot.docs.map((snap) => snap.data())),
      (err) => next(err, null),
    )
    return () => unsub()
  })

  return {
    data: data || [],
    error: error?.message,
    isLoading: data === undefined,
  }
}

export const searchProducts = async (searchTerm) => {
  if (!searchTerm.trim()) return [];

  try {
    const ref = collection(db, "products");
    const lowerSearchTerm = searchTerm.trim().toLowerCase();

    // Search across multiple fields using a single query
    const q = query(ref); // We'll fetch all products and filter client-side for simplicity
    const snapshot = await getDocs(q);

    const products = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((product) =>
        [
          product.title?.toLowerCase(),
          product.shortDescription?.toLowerCase(),
          product.description?.toLowerCase(),
          product.brand?.toLowerCase(),
          product.series?.toLowerCase(),
        ].some((field) => field?.includes(lowerSearchTerm))
      );

    return products.slice(0, 10); // Limit to 10 results
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};
export function useProductsByModelId(modelId) {
  const { data, error } = useSWRSubscription(["products-by-model", modelId], ([_, modelId], { next }) => {
    const q = query(collection(db, "products"), where("modelId", "==", modelId))
    const unsub = onSnapshot(
      q,
      (snap) =>
        next(
          null,
          snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        ),
      (err) => next(err),
    )
    return () => unsub()
  })

  return {
    data: data || [],
    error: error?.message,
    isLoading: data === undefined,
  }
}
