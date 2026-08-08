"use client";

import {
  ChevronDown,
  Clapperboard,
  Film,
  Home,
  Menu,
  Moon,
  MonitorPlay,
  Search,
  Sparkles,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "../_lib/utils";

const movieLinks = [
  { href: "/movies", label: "Explorar filmes" },
  { href: "/movies-trending", label: "Em tendência" },
  { href: "/movies-popular", label: "Populares" },
  { href: "/movies-top-rated", label: "Mais bem avaliados" },
  { href: "/movies-now-playing", label: "Em cartaz" },
];

const serieLinks = [
  { href: "/series", label: "Explorar séries" },
  { href: "/series-trending", label: "Em tendência" },
  { href: "/series-popular", label: "Populares" },
  { href: "/series-top-rated", label: "Mais bem avaliadas" },
  { href: "/series-now-playing", label: "No ar" },
];

function isSectionActive(pathname: string, section: "movies" | "series") {
  const prefixes =
    section === "movies" ? ["/movie", "/movies"] : ["/serie", "/series"];
  return prefixes.some((prefix) => pathname.startsWith(prefix));
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (pathname === "/search") {
      setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
    }
  }, [pathname]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedQuery = query.trim();
    router.push(
      normalizedQuery
        ? `/search?q=${encodeURIComponent(normalizedQuery)}`
        : "/search",
    );
  }

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  const navLinkClass = (active: boolean) =>
    cn(
      "relative inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
      active &&
        "bg-primary/10 text-foreground after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
      <div className="page-container flex min-h-[72px] items-center gap-3">
        <Link
          href="/"
          className="group mr-auto inline-flex min-h-11 items-center gap-2.5 rounded-xl focus-visible:outline-none"
          aria-label="CineVerse — página inicial"
        >
          <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-red-800 shadow-glow">
            <Clapperboard className="size-5 text-white transition-transform group-hover:-rotate-6" />
            <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
            Cine<span className="text-red-500">Verse</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegação principal"
        >
          <Link href="/" className={navLinkClass(pathname === "/")}>
            <Home className="size-4" /> Início
          </Link>

          <Menubar className="h-auto border-0 bg-transparent p-0">
            <MenubarMenu>
              <MenubarTrigger
                className={navLinkClass(isSectionActive(pathname, "movies"))}
                aria-label="Abrir menu de filmes"
              >
                <Film className="size-4" /> Filmes{" "}
                <ChevronDown className="size-3.5" />
              </MenubarTrigger>
              <MenubarContent className="min-w-56 border-border bg-popover/95 p-2 text-popover-foreground shadow-2xl backdrop-blur-xl">
                {movieLinks.map((item) => (
                  <MenubarItem
                    key={item.href}
                    asChild
                    className="min-h-10 cursor-pointer rounded-lg focus:bg-accent focus:text-accent-foreground"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger
                className={navLinkClass(isSectionActive(pathname, "series"))}
                aria-label="Abrir menu de séries"
              >
                <MonitorPlay className="size-4" /> Séries{" "}
                <ChevronDown className="size-3.5" />
              </MenubarTrigger>
              <MenubarContent className="min-w-56 border-border bg-popover/95 p-2 text-popover-foreground shadow-2xl backdrop-blur-xl">
                {serieLinks.map((item) => (
                  <MenubarItem
                    key={item.href}
                    asChild
                    className="min-h-10 cursor-pointer rounded-lg focus:bg-accent focus:text-accent-foreground"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </nav>

        <form
          onSubmit={handleSubmit}
          role="search"
          className="hidden w-full max-w-[260px] md:block xl:max-w-[310px]"
        >
          <label htmlFor="global-search" className="sr-only">
            Buscar filmes, séries e pessoas
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="global-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar no CineVerse"
              className="h-11 bg-muted/60 pl-10 pr-4"
            />
          </div>
        </form>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="hidden md:inline-flex"
          aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
          title={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
          onClick={toggleTheme}
        >
          {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="lg:hidden"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[88%] max-w-sm border-border bg-background p-5 text-foreground"
          >
            <SheetHeader className="text-left">
              <SheetTitle className="flex items-center gap-2 text-foreground">
                <Sparkles className="size-5 text-red-500" /> Navegar no
                CineVerse
              </SheetTitle>
            </SheetHeader>

            <form
              onSubmit={handleSubmit}
              role="search"
              className="mt-6 md:hidden"
            >
              <label htmlFor="mobile-search" className="sr-only">
                Buscar filmes, séries e pessoas
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="mobile-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Filme, série ou pessoa"
                  className="pl-10"
                />
              </div>
            </form>

            <nav className="mt-6 space-y-6" aria-label="Navegação mobile">
              <div className="space-y-1">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className={
                      navLinkClass(pathname === "/") + " w-full justify-start"
                    }
                  >
                    <Home className="size-4" /> Início
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/search"
                    className={
                      navLinkClass(pathname === "/search") +
                      " w-full justify-start"
                    }
                  >
                    <Search className="size-4" /> Buscar
                  </Link>
                </SheetClose>
              </div>

              <div>
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Filmes
                </p>
                <div className="space-y-1">
                  {movieLinks.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={
                          navLinkClass(pathname === item.href) +
                          " w-full justify-start"
                        }
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Séries
                </p>
                <div className="space-y-1">
                  {serieLinks.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={
                          navLinkClass(pathname === item.href) +
                          " w-full justify-start"
                        }
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </nav>

            <Button
              type="button"
              variant="outline"
              className="mt-6 w-full justify-start"
              onClick={toggleTheme}
            >
              {isDark ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
              {isDark ? "Usar modo claro" : "Usar modo escuro"}
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
