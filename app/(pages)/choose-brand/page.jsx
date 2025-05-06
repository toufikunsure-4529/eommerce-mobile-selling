// app/choose-brand/page.jsx
import { Suspense } from "react";
import ChooseBrandClient from "./components/ChooseBrandClient";

const ChooseBrandPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChooseBrandClient />
    </Suspense>
  );
};

export default ChooseBrandPage;
