"use client";

import { Header } from "@/app/_components/header";
import { MovieDetails } from "./_components/movie-details";

interface MoviePageProps {
  params: {
    id: number;
  };
}
export default function MoviePage({ params: { id } }: MoviePageProps) {
  return (
    <div>
      <div className="hidden lg:block">
        <Header />
      </div>

      <MovieDetails id={id} />
    </div>
  );
}
