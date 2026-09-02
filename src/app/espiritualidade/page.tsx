import type { Metadata } from "next";
import { CategoryView } from "@/components/CategoryView";

export const metadata: Metadata = {
  title: "Espiritualidade",
};

export default function EspiritualidadePage() {
  return <CategoryView slug="espiritualidade" />;
}
