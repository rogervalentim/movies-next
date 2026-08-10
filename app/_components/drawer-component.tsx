"use client";

import {
  Film,
  HomeIcon,
  MenuIcon,
  MonitorPlay,
  Search
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger
} from "./ui/drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DrawerComponent() {
  const pathname = usePathname();
  return (
    <Drawer>
      <DrawerTrigger>
        <MenuIcon className="text-primary" />
      </DrawerTrigger>
      <DrawerContent className="px-3">
        <DrawerHeader>
          <ul className="flex flex-col gap-2">
            <li
              className={`flex items-center hover:bg-muted gap-3 px-2  rounded ${pathname === "/" ? "bg-muted " : ""}`}
            >
              <HomeIcon className="size-4" />
              <Link href="/">Inicio</Link>
            </li>

            <li
              className={`flex items-center hover:bg-muted gap-3 px-2 rounded ${pathname === "/movies" ? "bg-muted " : ""}`}
            >
              <Film className="size-4" />
              <Link href="/movies">Filmes</Link>
            </li>

            <li
              className={`flex items-center hover:bg-muted gap-3 px-2 rounded ${pathname === "/series" ? "bg-muted " : ""}`}
            >
              <MonitorPlay className="size-4" />
              <Link href="/series">Séries</Link>
            </li>

            <li
              className={`flex items-center hover:bg-muted gap-3 px-2 rounded ${pathname === "/search" ? "bg-muted " : ""}`}
            >
              <Search className="size-4" />
              <Link href="/search">Procure por tudo</Link>
            </li>
          </ul>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
