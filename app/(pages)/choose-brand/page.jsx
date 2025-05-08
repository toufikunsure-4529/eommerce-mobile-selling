// app/choose-brand/page.jsx
import { Suspense } from "react";
import ChooseBrandClient from "./components/ChooseBrandClient";

export const metadata = {
  title: "Choose Phone Brand | Mobile Display Seller",
  description: "Select your phone brand to find compatible replacement parts such as displays, batteries, and more at Mobile Display Seller.",
};

const ChooseBrandPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChooseBrandClient />
    </Suspense>
  );
};

export default ChooseBrandPage;
