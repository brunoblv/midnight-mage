import type { ContentBlock } from "@/lib/content";
import { PlaceholderImage } from "./PlaceholderImage";

export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        if (block.type === "image") {
          return (
            <PlaceholderImage
              key={`${block.label}-${index}`}
              label={block.label}
              className="article-inline-img"
            />
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={index} className="article-quote">
              <span>&quot;{block.text}&quot;</span>
            </blockquote>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
