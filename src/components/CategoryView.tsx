import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { GuideCard } from "@/components/GuideCard";
import { getCategoryBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";

export async function CategoryView({ slug }: { slug: string }) {
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const isGuides = category.section === "GUIAS";

  return (
    <div className="wrap section-top">
      <div className="eyebrow">{category.eyebrow}</div>
      <div className="page-title serif">{category.name}</div>
      <div className="page-desc">{category.description}</div>
      <div className="subcats">
        {category.tags.map((item) => (
          <span key={item.id}>{item.name}</span>
        ))}
      </div>
      {isGuides ? (
        <div className="grid-3">
          {category.posts.map((post) => (
            <GuideCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="grid-3">
          {category.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
      {category.posts.length === 0 ? (
        <p className="page-desc">Nenhum conteúdo publicado nesta seção ainda.</p>
      ) : null}
      <p className="back-home">
        <Link href="/">← voltar ao início</Link>
      </p>
    </div>
  );
}
