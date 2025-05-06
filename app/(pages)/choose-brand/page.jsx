// app/choose-brand/page.jsx
"use client";

import { useSearchParams } from "next/navigation";
import BrandListing from "./components/BrandListing";

const ChooseBrandPage = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  return (
    <main>
      <BrandListing categoryId={categoryId} />
    </main>
  );
};

export default ChooseBrandPage;
