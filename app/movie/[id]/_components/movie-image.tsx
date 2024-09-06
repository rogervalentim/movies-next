"use client";

import { DrawerComponent } from "@/app/_components/drawer-component";
import { Button } from "@/app/_components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger
} from "@/app/_components/ui/drawer";

import { Separator } from "@/app/_components/ui/separator";
import {
  ChevronLeftIcon,
  Film,
  GithubIcon,
  HomeIcon,
  MenuIcon,
  MonitorPlay,
  Search,
  SunIcon,
  SunMoon
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface MovieImageProps {
  backdrop_path: string;
  poster_path: string;
  title: string;
}

export default function MovieImage({
  backdrop_path,
  poster_path,
  title
}: MovieImageProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleBackClick() {
    router.back();
  }

  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  return (
    <div className="relative w-full lg:hidden">
      <div className="relative h-[25rem]  w-full">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
          alt={title}
          width={0}
          height={0}
          quality={100}
          sizes="100vh"
          className="h-full w-full object-cover  bg-muted"
          loading="lazy"
        />

        <div className="absolute bottom-4 left-4 flex items-center">
          <Image
            src={`https://image.tmdb.org/t/p/w342${poster_path}`}
            alt={title}
            width={0}
            height={0}
            quality={100}
            sizes="100vh"
            className="h-40 w-28 md:h-48 md:w-32 object-cover bg-muted rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex">
        <Button
          className="absolute left-4 top-4 rounded-full text-black bg-white hover:text-white hover:bg-gradient-to-b from-[#3a3cff] to-[#2a18ff]"
          size="icon"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          size="icon"
          className="absolute right-4 top-4 rounded-full text-black bg-white hover:text-white hover:bg-gradient-to-b from-[#3a3cff] to-[#2a18ff]"
        >
          <DrawerComponent />
        </Button>
      </div>
    </div>
  );
}
