"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const links = [
  { href: "/jornada", label: "Minha Jornada" },
  { href: "/espiritualidade", label: "Espiritualidade" },
  { href: "/guias", label: "Guias" },
  { href: "/produtos", label: "Produtos" },
  { href: "/sobre", label: "Sobre" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand">
          <Logo size={26} />
          <span>O MAGO DA MEIA NOITE</span>
        </Link>
        <nav className="nav-links">
          {links.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "active" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
