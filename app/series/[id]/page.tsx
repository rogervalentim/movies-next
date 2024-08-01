"use client";

import { Header } from "@/app/_components/header";
import { SerieDetails } from "./_components/serie-details";

interface SeriePageProps {
  params: {
    id: number;
  };
}

export default function SeriePage({ params: { id } }: SeriePageProps) {
  return (
    <div>
      <div className="hidden lg:block">
        <Header />
      </div>

      <SerieDetails id={id} />
    </div>
  );
}
