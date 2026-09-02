import type { Metadata } from "next";
import { CategoryView } from "@/components/CategoryView";

export const metadata: Metadata = {
  title: "Minha Jornada",
};

export default function JornadaPage() {
  return <CategoryView slug="jornada" />;
}
