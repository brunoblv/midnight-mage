import Link from "next/link";
import { GuideCard } from "@/components/GuideCard";
import { Logo } from "@/components/Logo";
import { PostCard } from "@/components/PostCard";
import { ProductMini } from "@/components/ProductCard";
import { getHomeData } from "@/lib/queries";

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <div>
      <section className="hero">
        <div className="logo">
          <Logo size={46} />
        </div>
        <h1 className="serif">
          O Mago da
          <br />
          Meia Noite
        </h1>
        <p>
          Uma jornada para descobrir quem existe por trás de quem aprendemos a
          ser.
        </p>
        <Link href="/jornada" className="btn">
          EXPLORAR A JORNADA
        </Link>
      </section>

      <section className="wrap">
        <div className="section-head">
          <span className="title serif">Minha Jornada</span>
          <Link href="/jornada" className="link">
            ver tudo →
          </Link>
        </div>
        <div className="grid-3">
          {data.journeyPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="section-head">
          <span className="title serif">Reflexões</span>
        </div>
        <div className="grid-3">
          {data.reflectionPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="section-head">
          <span className="title serif">Espiritualidade</span>
          <Link href="/espiritualidade" className="link">
            ver tudo →
          </Link>
        </div>
        <div className="grid-3">
          {data.spiritPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="section-head">
          <span className="title serif">Guias</span>
          <Link href="/guias" className="link">
            ver tudo →
          </Link>
        </div>
        <div className="grid-3">
          {data.guides.map((post) => (
            <GuideCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="section-head">
          <span className="title serif">Produtos</span>
          <Link href="/produtos" className="link">
            ver catálogo →
          </Link>
        </div>
        <div className="grid-4">
          {data.homeProducts.map((product) => (
            <ProductMini key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
