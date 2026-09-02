import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleBody } from "@/components/ArticleBody";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { RelatedProduct } from "@/components/ProductCard";
import { parseBlocks } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { getPostBySlug, getRelatedPosts } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artigo" };
  return { title: post.title, description: post.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.kind !== "ARTICLE") notFound();

  const relatedPosts = await getRelatedPosts(post.id, post.categoryId);
  const recommended = post.products.find((item) => item.role === "recommended")?.product;
  const relatedProducts = post.products
    .filter((item) => item.role !== "recommended")
    .map((item) => item.product)
    .slice(0, 3);

  const categoryLabel = `${post.category.name} · ${post.tag?.name ?? "Texto"}`.toUpperCase();

  return (
    <article className="wrap-narrow">
      <div className="article-cat">{categoryLabel}</div>
      <h1 className="article-title serif">{post.title}</h1>
      {post.subtitle ? <p className="article-sub">{post.subtitle}</p> : null}
      <div className="article-meta">
        O Mago · {formatDate(post.publishedAt)} · {post.readingTime} min de leitura
      </div>
      <PlaceholderImage label="IMAGEM DESTACADA" className="article-hero" />

      <ArticleBody blocks={parseBlocks(post.content)} />

      {recommended ? (
        <div className="product-callout">
          <div className="thumb">
            <span>FOTO</span>
          </div>
          <div className="body">
            <div className="kicker">PRODUTO RECOMENDADO</div>
            <div className="name">{recommended.name}</div>
            <div className="desc">{recommended.description}</div>
            <a
              className="cta"
              href={recommended.affiliateUrl}
              target="_blank"
              rel="noreferrer sponsored"
            >
              VER PRODUTO →
            </a>
          </div>
        </div>
      ) : null}

      <div className="divider" />
      <h2 className="subsection-title serif">Continue sua jornada</h2>
      <div className="related-grid">
        {relatedPosts.map((item) => (
          <Link key={item.id} href={`/artigos/${item.slug}`} className="related-card">
            <PlaceholderImage label="IMAGEM" className="thumb" />
            <div className="title">{item.title}</div>
          </Link>
        ))}
      </div>

      {relatedProducts.length > 0 ? (
        <>
          <h2 className="subsection-title serif">Produtos relacionados</h2>
          <div className="related-product-grid">
            {relatedProducts.map((product) => (
              <RelatedProduct key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : null}
    </article>
  );
}
