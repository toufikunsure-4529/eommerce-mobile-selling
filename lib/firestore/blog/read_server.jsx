// @/lib/firestore/blog/read_server.js
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs, query, orderBy } from "firebase/firestore";

// Get a single blog post by ID (one-time fetch)
export const getBlogPost = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Blog ID is required");
    }

    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    throw new Error("Error fetching blog post: " + error.message);
  }
};

// Get all blog posts (one-time fetch)
export const getBlogPosts = async () => {
  try {
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, orderBy("createdAt", "desc")); // Order by creation date
    const querySnapshot = await getDocs(q);

    const blogs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return blogs;
  } catch (error) {
    throw new Error("Error fetching blog posts: " + error.message);
  }
};