import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

async function uploadImage(image, modelId) {
  if (!image) return null;

  // Validate image type
  if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
    throw new Error("Invalid image type. Only JPEG, PNG, and WEBP are allowed.");
  }

  // Validate image size
  if (image.size > MAX_IMAGE_SIZE) {
    throw new Error("Image size exceeds 5MB limit.");
  }

  try {
    const storageRef = ref(storage, `models/${modelId}_${Date.now()}_${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

export async function createNewModel({ data, image }) {
  if (!data.name || !data.brandId || !data.seriesId) {
    throw new Error("Missing required fields");
  }

  try {
    const modelData = {
      name: data.name.trim(),
      brandId: data.brandId,
      seriesId: data.seriesId,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "models"), modelData);
    
    if (image) {
      const imageURL = await uploadImage(image, docRef.id);
      await updateDoc(docRef, { imageURL });
      modelData.imageURL = imageURL;
    }

    return { id: docRef.id, ...modelData };
  } catch (error) {
    throw new Error(`Failed to create model: ${error.message}`);
  }
}

export async function updateModel({ id, data, image }) {
  if (!id) {
    throw new Error("Model ID is required");
  }

  try {
    const modelData = {
      name: data.name?.trim(),
      brandId: data.brandId,
      seriesId: data.seriesId,
      imageURL: data.imageURL,
      updatedAt: new Date().toISOString(),
    };

    if (image) {
      modelData.imageURL = await uploadImage(image, id);
    }

    // Remove undefined fields
    Object.keys(modelData).forEach((key) => {
      if (modelData[key] === undefined) {
        delete modelData[key];
      }
    });

    await updateDoc(doc(db, "models", id), modelData);
    return { id, ...modelData };
  } catch (error) {
    throw new Error(`Failed to update model: ${error.message}`);
  }
}

export async function deleteModel({ id }) {
  if (!id) {
    throw new Error("Model ID is required");
  }

  try {
    await deleteDoc(doc(db, "models", id));
    return { id };
  } catch (error) {
    throw new Error(`Failed to delete model: ${error.message}`);
  }
}