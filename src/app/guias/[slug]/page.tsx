import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { stars } from "@/lib/format";
import { getPostBySlug } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.kind !== "GUIDE") return { title: "Guia" };
  return { title: post.title, description: post.excerpt };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.kind !== "GUIDE" || !post.guide) notFound();

  const guide = post.guide;
  const firstProductUrl = guide.products[0]?.product.affiliateUrl;

  return (
    <div className="wrap-landing">
      <div className="eyebrow">
        GUIA · {post.tag?.name?.toUpperCase() ?? "GUIA"}
      </div>
      <h1 className="landing-title serif">{post.title}</h1>
      <p className="landing-intro">{post.subtitle ?? post.excerpt}</p>

      <h2 className="subsection-title serif">Comparação</h2>
      <div className="compare-table">
        <div className="compare-head">
          <span>PRODUTO</span>
          <span>MELHOR PARA</span>
          <span>NÍVEL</span>
        </div>
        {guide.products.map((row) => (
          <div className="compare-row" key={row.id}>
            <span>{row.product.name}</span>
            <span className="best-for">{row.bestFor}</span>
            <span className="stars">{stars(row.level)}</span>
          </div>
        ))}
      </div>

      <h2 className="subsection-title serif">Análise individual</h2>
      {guide.products.map((row) => (
        <article className="review-card" key={row.id}>
          <div className="thumb">
            <span>FOTO</span>
          </div>
          <div className="body">
            <div className="name">{row.product.name}</div>
            <div className="desc">{row.description}</div>
            <div className="pros-cons">
              <span>+ {row.pro}</span>
              <span>− {row.con}</span>
            </div>
            <a
              className="cta"
              href={row.product.affiliateUrl}
              target="_blank"
              rel="noreferrer sponsored"
            >
              VER PRODUTO →
            </a>
          </div>
        </article>
      ))}

      <div className="cta-block">
        <div className="title serif">{guide.ctaTitle}</div>
        <div className="sub">{guide.ctaSubtitle}</div>
        {firstProductUrl ? (
          <a
            className="btn-solid"
            href={firstProductUrl}
            target="_blank"
            rel="noreferrer sponsored"
          >
            VER RECOMENDAÇÕES
          </a>
        ) : (
          <Link href="/produtos" className="btn-solid">
            VER RECOMENDAÇÕES
          </Link>
        )}
      </div>

      <h2 className="subsection-title serif">Perguntas frequentes</h2>
      <FaqList items={guide.faqs} />
    </div>
  );
}
