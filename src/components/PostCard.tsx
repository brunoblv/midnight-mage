import Link from "next/link";
import { PlaceholderImage } from "./PlaceholderImage";

type PostCardPost = {
  slug: string;
  title: string;
  excerpt: string;
  kind: "ARTICLE" | "GUIDE";
  tag: { name: string } | null;
  category: { name: string; slug: string };
};

export function PostCard({ post }: { post: PostCardPost }) {
  const href =
    post.kind === "GUIDE" ? `/guias/${post.slug}` : `/artigos/${post.slug}`;
  const categoryLabel =
    post.kind === "GUIDE"
      ? `GUIA · ${post.tag?.name ?? post.category.name}`
      : (post.tag?.name ?? post.category.name).toUpperCase();

  return (
    <Link href={href} className="post-card">
      <PlaceholderImage label="IMAGEM DO ARTIGO" className="thumb" />
      <div className="cat">{categoryLabel}</div>
      <div className="title serif">{post.title}</div>
      <div className="excerpt">{post.excerpt}</div>
    </Link>
  );
}
