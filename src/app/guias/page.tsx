import type { Metadata } from "next";
import { CategoryView } from "@/components/CategoryView";

export const metadata: Metadata = {
  title: "Guias",
};

export default function GuiasPage() {
  return <CategoryView slug="guias" />;
}
