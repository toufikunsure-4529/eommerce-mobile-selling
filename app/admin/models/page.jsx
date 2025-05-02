"use client";

import ModelForm from "./components/ModelForm";
import ModelListView from "./components/ModelListView";

export default function Page() {
  return (
    <main className="p-5 flex flex-col gap-5">
      <ModelForm />
      <ModelListView />
    </main>
  );
}