import Image from "next/image";
import { FormFields } from "@/app/_components/FormFieldInput";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormFields />
    </main>
  );
}
