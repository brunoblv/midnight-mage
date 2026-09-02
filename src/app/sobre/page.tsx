import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { parseStringList } from "@/lib/content";
import { getSitePage } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Sobre",
};

export default async function AboutPage() {
  const page = await getSitePage("sobre");
  if (!page) notFound();

  const paragraphs = parseStringList(page.body);
  const themes = parseStringList(page.themes);
  const split = Math.ceil(paragraphs.length / 2);

  return (
    <div className="wrap-about">
      <h1 className="about-title serif">{page.title}</h1>
      <div className="about-body">
        {paragraphs.slice(0, split).map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
      {page.quote ? (
        <blockquote className="about-quote">
          <span>&quot;{page.quote}&quot;</span>
        </blockquote>
      ) : null}
      <div className="about-body">
        {paragraphs.slice(split).map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
      <h2 className="themes-title serif">Temas abordados</h2>
      <div className="themes">
        {themes.map((theme) => (
          <span key={theme}>{theme}</span>
        ))}
      </div>
    </div>
  );
}
