import Link from "next/link";
import ListView from "./components/ListView";

export default function Page() {
  return (
    <main className="flex flex-col gap-4 md:p-5">
      
      <ListView />
    </main>
  );
}