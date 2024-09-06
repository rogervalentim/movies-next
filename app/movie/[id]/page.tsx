"use client";

import { Header } from "@/app/_components/header";
import { MovieDetails } from "./_components/movie-details";
import { Footer } from "@/app/_components/footer";

interface MoviePageProps {
  params: {
    id: number;
  };
}

export default function MoviePage({ params: { id } }: MoviePageProps) {
  return (
    <>
      <div className="hidden lg:block">
        <Header />
      </div>
      <MovieDetails id={id} />

      <div className="pt-10">
        <Footer />
      </div>
    </>
  );
}
