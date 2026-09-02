"use client";

import { useState } from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function FaqList({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      {items.map((faq) => {
        const open = openId === faq.id;
        return (
          <button
            key={faq.id}
            type="button"
            className="faq-item"
            onClick={() => setOpenId(open ? null : faq.id)}
            aria-expanded={open}
          >
            <div className="row">
              <span>{faq.question}</span>
              <span className="icon">{open ? "—" : "+"}</span>
            </div>
            {open ? <div className="answer">{faq.answer}</div> : null}
          </button>
        );
      })}
    </div>
  );
}
