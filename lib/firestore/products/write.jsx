import { db, storage } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewProduct = async ({ data, featureImage, imageList, variantImages }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!featureImage) {
    throw new Error("Feature Image is required");
  }
  if (data?.isVariable && (!data?.colors || data?.colors.length === 0)) {
    throw new Error("At least one color is required for variable products");
  }

  // Handle feature image
  const featureImageRef = ref(storage, `products/${featureImage?.name}`);
  await uploadBytes(featureImageRef, featureImage);
  const featureImageURL = await getDownloadURL(featureImageRef);

  // Handle image list
  let imageURLList = [];
  for (let i = 0; i < imageList?.length; i++) {
    const image = imageList[i];
    const imageRef = ref(storage, `products/${image?.name}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    imageURLList.push(url);
  }

  // Handle variant images
  let variantImagesURLs = {};
  if (data?.isVariable) {
    for (const color of data?.colors) {
      const images = variantImages[color] || [];
      const urls = [];
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageRef = ref(storage, `products/${color}_${image?.name}`);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        urls.push(url);
      }
      variantImagesURLs[color] = urls;
    }
  }

  const newId = doc(collection(db, `ids`)).id;

  await setDoc(doc(db, `products/${newId}`), {
    ...data,
    featureImageURL,
    imageList: imageURLList,
    variantImages: data?.isVariable ? variantImagesURLs : {},
    id: newId,
    timestampCreate: Timestamp.now(),
  });
};

export const updateProduct = async ({ data, featureImage, imageList, variantImages }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }
  if (data?.isVariable && (!data?.colors || data?.colors.length === 0)) {
    throw new Error("At least one color is required for variable products");
  }

  let featureImageURL = data?.featureImageURL ?? "";
  if (featureImage) {
    const featureImageRef = ref(storage, `products/${featureImage?.name}`);
    await uploadBytes(featureImageRef, featureImage);
    featureImageURL = await getDownloadURL(featureImageRef);
  }

  let imageURLList = imageList?.length === 0 ? data?.imageList : [];
  for (let i = 0; i < imageList?.length; i++) {
    const image = imageList[i];
    const imageRef = ref(storage, `products/${image?.name}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    imageURLList.push(url);
  }

  let variantImagesURLs = data?.variantImages ?? {};
  if (data?.isVariable) {
    for (const color of data?.colors) {
      const images = variantImages[color] || [];
      if (images.length > 0) {
        const urls = [];
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const imageRef = ref(storage, `products/${color}_${image?.name}`);
          await uploadBytes(imageRef, image);
          const url = await getDownloadURL(imageRef);
          urls.push(url);
        }
        variantImagesURLs[color] = urls;
      } else {
        variantImagesURLs[color] = variantImagesURLs[color] || [];
      }
    }
  } else {
    variantImagesURLs = {};
  }

  await setDoc(doc(db, `products/${data?.id}`), {
    ...data,
    featureImageURL,
    imageList: imageURLList,
    variantImages: variantImagesURLs,
    timestampUpdate: Timestamp.now(),
  });
};

export const deleteProduct = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `products/${id}`));
};