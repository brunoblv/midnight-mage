import { formatPrice } from "@/lib/format";
import { PlaceholderImage } from "./PlaceholderImage";

type Product = {
  name: string;
  description: string;
  priceCents: number;
  store: string;
  affiliateUrl: string;
  category: { name: string };
};

export function ProductMini({
  product,
}: {
  product: Pick<Product, "name" | "priceCents" | "affiliateUrl">;
}) {
  return (
    <article className="product-mini">
      <PlaceholderImage label="FOTO DO PRODUTO" className="thumb" />
      <div className="name">{product.name}</div>
      <div className="price">{formatPrice(product.priceCents)}</div>
      <a
        className="cta"
        href={product.affiliateUrl}
        target="_blank"
        rel="noreferrer sponsored"
      >
        VER PRODUTO →
      </a>
    </article>
  );
}

export function ProductFull({ product }: { product: Product }) {
  return (
    <article className="product-full">
      <PlaceholderImage label="FOTO DO PRODUTO" className="thumb" />
      <div className="cat">{product.category.name.toUpperCase()}</div>
      <div className="name">{product.name}</div>
      <div className="desc">{product.description}</div>
      <div className="row">
        <span className="price">{formatPrice(product.priceCents)}</span>
        <span className="store">{product.store}</span>
      </div>
      <a
        className="buy"
        href={product.affiliateUrl}
        target="_blank"
        rel="noreferrer sponsored"
      >
        VER PRODUTO →
      </a>
      <div className="affiliate">contém link de afiliado</div>
    </article>
  );
}

export function RelatedProduct({
  product,
}: {
  product: Pick<Product, "name" | "priceCents" | "affiliateUrl">;
}) {
  return (
    <a
      className="related-product"
      href={product.affiliateUrl}
      target="_blank"
      rel="noreferrer sponsored"
    >
      <PlaceholderImage label="FOTO" className="thumb" />
      <div className="name">{product.name}</div>
      <div className="price">{formatPrice(product.priceCents)}</div>
    </a>
  );
}
