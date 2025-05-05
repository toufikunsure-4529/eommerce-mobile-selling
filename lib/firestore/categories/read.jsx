// lib/firestore/categories/read.js
"use client";

import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useCategories() {
  const { data, error } = useSWRSubscription(
    ["categories"],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsub = onSnapshot(
        ref,
        (snapshot) => {
          const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          const map = new Map(list.map((cat) => [cat.id, cat]));
          next(null, { list, map });
        },
        (err) => next(err, null)
      );
      return () => unsub();
    }
  );

  return {
    data: data?.list ?? [],
    categoriesList: data?.list ?? [],
    categoriesMap: data?.map ?? new Map(),
    isLoading: data === undefined,
    error: error?.message,
  };
}
