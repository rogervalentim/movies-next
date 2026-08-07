import { Clapperboard, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-white/[0.08] bg-[#080808]">
      <div className="page-container grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:py-14">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 rounded-xl" aria-label="CineVerse — página inicial">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-red-500 to-red-800 shadow-glow"><Clapperboard className="size-5 text-white" /></span>
            <span className="text-xl font-extrabold text-white">Cine<span className="text-red-500">Verse</span></span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">Seu ponto de partida para descobrir filmes, séries, elencos e universos que merecem entrar na sua próxima sessão.</p>
          <p className="mt-4 text-xs leading-5 text-slate-500">Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.</p>
        </div>
        <nav aria-label="Links de conteúdo">
          <h2 className="text-sm font-semibold text-white">Explorar</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-red-400">Início</Link></li>
            <li><Link href="/movies" className="hover:text-red-400">Filmes</Link></li>
            <li><Link href="/series" className="hover:text-red-400">Séries</Link></li>
            <li><Link href="/search" className="hover:text-red-400">Buscar</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-white">Projeto</h2>
          <a href="https://github.com/rogervalentim/" target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-slate-400 hover:text-red-400">Código no GitHub <Github className="size-4" /><ExternalLink className="size-3" /></a>
        </div>
      </div>
      <div className="border-t border-white/[0.06]">
        <div className="page-container flex flex-col gap-2 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} CineVerse. Feito para quem ama boas histórias.</p>
          <p>Dados fornecidos por TMDB.</p>
        </div>
      </div>
    </footer>
  );
}
