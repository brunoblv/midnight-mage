import Link from "next/link";

type GuideCardPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: { name: string } | null;
};

export function GuideCard({ post }: { post: GuideCardPost }) {
  return (
    <Link href={`/guias/${post.slug}`} className="guide-card">
      <div className="tag">GUIA · {post.tag?.name ?? "GUIA"}</div>
      <div className="title serif">{post.title}</div>
      <div className="desc">{post.excerpt}</div>
    </Link>
  );
}
