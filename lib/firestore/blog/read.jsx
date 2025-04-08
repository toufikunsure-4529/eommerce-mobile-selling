// @/lib/firestore/blog/read.js
import { db } from "@/lib/firebase";
import { doc, collection, onSnapshot, query, orderBy } from "firebase/firestore";

// Get a single blog post by ID (real-time)
export const listenToBlogPost = (id, callback) => {
  try {
    if (!id) {
      throw new Error("Blog ID is required");
    }

    const docRef = doc(db, "blogs", id);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          callback({
            id: docSnap.id,
            ...docSnap.data(),
          });
        } else {
          callback(null);
        }
      },
      (error) => {
        throw new Error("Error listening to blog post: " + error.message);
      }
    );

    return unsubscribe; // Return unsubscribe function to stop listening
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all blog posts (real-time)
export const listenToBlogPosts = (callback) => {
  try {
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, orderBy("createdAt", "desc")); // Order by creation date

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(blogs);
      },
      (error) => {
        throw new Error("Error listening to blog posts: " + error.message);
      }
    );

    return unsubscribe; // Return unsubscribe function to stop listening
  } catch (error) {
    throw new Error(error.message);
  }
};