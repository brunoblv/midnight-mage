import Link from "next/link";

export default function NotFound() {
  return (
    <div className="hero">
      <h1 className="serif">Página não encontrada</h1>
      <p>Esse caminho ainda não existe nesta jornada.</p>
      <Link href="/" className="btn">
        VOLTAR AO INÍCIO
      </Link>
    </div>
  );
}
