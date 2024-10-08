"use client";

import { Header } from "@/app/_components/header";
import { SerieDetails } from "./_components/serie-details";
import { Footer } from "@/app/_components/footer";

interface SeriePageProps {
  params: {
    id: number;
  };
}

export default function SeriePage({ params: { id } }: SeriePageProps) {
  return (
    <>
      <div className="hidden lg:block">
        <Header />
      </div>
      <SerieDetails id={id} />

      <div className="pt-10">
        <Footer />
      </div>
    </>
  );
}
