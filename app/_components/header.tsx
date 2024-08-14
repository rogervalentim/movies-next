"use client";

import {
  Clapperboard,
  Film,
  HomeIcon,
  LogInIcon,
  MenuIcon,
  MonitorPlay,
  SearchIcon
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { Search } from "./search";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center border-border border-b px-5 lg:px-32 p-4">
      <div className="flex gap-2 items-center">
        <Clapperboard size={25} className="text-[#2a18ff] " />
        <h1 className="font-bold text-2xl text-[#2a18ff]">Movies</h1>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          <div className="flex items-center justify-between pt-10">
            <h2 className="font-semibold">Olá Faça o seu login!</h2>
            <Button size="icon" className="bg-[#3a3cff] text-white">
              <LogInIcon />
            </Button>
          </div>
          <div className="py-5">
            <Separator />
          </div>

          <div className="space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start space-x-3 rounded-full text-sm font-normal ${pathname === "/" ? "bg-[#3a3cff] text-white" : ""}`}
              asChild
            >
              <Link href="/">
                <HomeIcon size={16} />
                <span className="block"> Início</span>
              </Link>
            </Button>
          </div>

          <div className="py-3">
            <Separator />
          </div>

          <div className="space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start space-x-3 rounded-full text-sm font-normal ${pathname === "/movies" ? "bg-[#3a3cff] text-white" : ""}`}
              asChild
            >
              <Link href="/movies">
                <Film size={16} />
                <span className="block"> Filmes</span>
              </Link>
            </Button>
          </div>

          <div className="py-3">
            <Separator />
          </div>

          <div className="space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start space-x-3 rounded-full text-sm font-normal ${pathname === "/series" ? "bg-[#3a3cff] text-white" : ""}`}
              asChild
            >
              <Link href="/series">
                <MonitorPlay size={16} />
                <span className="block">Séries</span>
              </Link>
            </Button>
          </div>
          <div className="py-3">
            <Separator />
          </div>

          <div className="space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start space-x-3 rounded-full text-sm font-normal ${pathname === "/search" ? "bg-[#3a3cff] text-white" : ""}`}
              asChild
            >
              <Link href="/search">
                <SearchIcon size={16} />
                <span className="block">Procure por tudo</span>
              </Link>
            </Button>
          </div>

          <div className="py-3">
            <Separator />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
