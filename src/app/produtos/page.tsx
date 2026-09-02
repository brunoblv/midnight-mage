import Link from "next/link";
import type { Metadata } from "next";
import { ProductFull } from "@/components/ProductCard";
import { getProductCategories, getProducts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Recomendações selecionadas para acompanhar esta jornada.",
};

type Props = {
  searchParams: Promise<{ categoria?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const [categories, products] = await Promise.all([
    getProductCategories(),
    getProducts(categoria),
  ]);

  return (
    <div className="wrap section-top">
      <h1 className="products-title serif">Produtos</h1>
      <p className="products-desc">
        Recomendações selecionadas para acompanhar esta jornada.
      </p>
      <p className="products-affiliate">Alguns links abaixo são links de afiliado.</p>
      <div className="product-cats">
        <Link href="/produtos" className={!categoria ? "active" : undefined}>
          Todos
        </Link>
        {categories.map((item) => (
          <Link
            key={item.id}
            href={`/produtos?categoria=${item.slug}`}
            className={categoria === item.slug ? "active" : undefined}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="grid-3">
        {products.map((product) => (
          <ProductFull key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
