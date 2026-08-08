"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, MapPin, Sparkles, User } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { DetailsSkeleton } from "@/app/_components/details-skeleton";
import { ErrorState } from "@/app/_components/error-state";
import { Loading } from "@/app/_components/loading";
import { TabButton } from "@/app/_components/tab-button";
import { useCombinedCredits } from "@/app/_hooks/use-combined-credits";
import { usePersonDetails } from "@/app/_hooks/use-person-details";
import { formatDate } from "@/app/utils/format-date";
import { Credits } from "./credits";
import { Images } from "./images";

interface PersonDetailsProps {
  id: number;
}

type PersonTab = "credits" | "images";

const departmentLabels: Record<string, string> = {
  Acting: "Atuação",
  Directing: "Direção",
  Production: "Produção",
  Writing: "Roteiro",
  Camera: "Fotografia",
  Editing: "Edição",
  Sound: "Som",
  Art: "Arte",
};

function getAge(birthday: string | null, deathday: string | null) {
  if (!birthday) return null;

  const birth = new Date(`${birthday}T12:00:00`);
  const end = deathday ? new Date(`${deathday}T12:00:00`) : new Date();
  if (Number.isNaN(birth.getTime()) || Number.isNaN(end.getTime())) return null;

  let age = end.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    end.getMonth() < birth.getMonth() ||
    (end.getMonth() === birth.getMonth() && end.getDate() < birth.getDate());

  if (beforeBirthday) age -= 1;
  return age >= 0 ? age : null;
}

export function PersonDetails({ id }: PersonDetailsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PersonTab>("credits");
  const { personDetails, error, refetch } = usePersonDetails(id);
  const { latestWork } = useCombinedCredits(id);

  useEffect(() => {
    document.title = personDetails?.name
      ? `${personDetails.name} | CineVerse`
      : "CineVerse";
  }, [personDetails]);

  const age = useMemo(
    () =>
      getAge(personDetails?.birthday || null, personDetails?.deathday || null),
    [personDetails?.birthday, personDetails?.deathday],
  );

  if (error) {
    return (
      <ErrorState
        title="Esta história saiu de cena"
        description={error}
        onRetry={refetch}
      />
    );
  }

  if (!personDetails) return <DetailsSkeleton />;

  const department =
    departmentLabels[personDetails.known_for_department] ||
    personDetails.known_for_department ||
    "Cinema e televisão";
  const biography =
    personDetails.biography.trim() ||
    "Ainda não há uma biografia disponível para esta pessoa.";

  return (
    <main>
      <section className="relative isolate min-h-[560px] overflow-hidden border-b border-white/[0.08] bg-[#080808] sm:min-h-[620px] lg:min-h-[650px]">
        {latestWork?.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${latestWork.backdrop_path}`}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_25%,rgba(229,9,20,0.24),transparent_34%),linear-gradient(135deg,#1b1b1b,#080808_65%)]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/35 to-black/30" />

        <div className="page-container relative z-10 flex min-h-[560px] items-end pb-10 pt-20 sm:min-h-[620px] sm:pb-12 lg:min-h-[650px] lg:items-center lg:pb-10 lg:pt-16">
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => router.back()}
            className="absolute left-4 top-5 bg-black/35 text-white backdrop-blur-md sm:left-6 lg:left-10 xl:left-16"
            aria-label="Voltar"
          >
            <ArrowLeft className="size-5" />
          </Button>

          <div className="grid w-full items-end gap-6 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[230px_minmax(0,720px)] lg:items-center lg:gap-10">
            <div className="aspect-[2/3] w-32 overflow-hidden rounded-2xl border border-white/15 bg-[#151515] shadow-2xl sm:w-full">
              {personDetails.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${personDetails.profile_path}`}
                  alt={`Foto de ${personDetails.name}`}
                  width={500}
                  height={750}
                  sizes="(max-width: 639px) 128px, (max-width: 1023px) 160px, 230px"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-red-950 to-[#151515] text-red-300">
                  <User className="size-10" />
                  <span className="px-3 text-center text-xs text-slate-400">
                    Foto indisponível
                  </span>
                </div>
              )}
            </div>

            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                <Sparkles className="size-3.5" /> {department}
              </p>
              <h1 className="max-w-[18ch] text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white drop-shadow-xl sm:text-5xl lg:text-6xl">
                {personDetails.name}
              </h1>

              <div className="mt-5 flex flex-wrap gap-2.5 text-sm text-slate-200">
                {personDetails.birthday && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-md">
                    <CalendarDays className="size-4 text-red-400" />
                    {formatDate(personDetails.birthday)}
                    {age !== null && ` · ${age} anos`}
                  </span>
                )}
                {personDetails.place_of_birth && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-md">
                    <MapPin className="size-4 text-red-400" />
                    {personDetails.place_of_birth}
                  </span>
                )}
              </div>

              {personDetails.deathday && (
                <p className="mt-3 text-sm text-slate-400">
                  Faleceu em {formatDate(personDetails.deathday)}.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="page-container py-8 sm:py-10 lg:py-12">
        <section
          className="glass-panel relative overflow-hidden rounded-3xl p-5 shadow-card sm:p-7 lg:p-8"
          aria-labelledby="biography-title"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-primary/[0.06] blur-3xl" />
          <div className="grid gap-5 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-10">
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Conheça a trajetória
              </p>
              <h2
                id="biography-title"
                className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                Biografia
              </h2>
            </div>
            <p className="relative max-w-[82ch] whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              {biography}
            </p>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="person-content-title">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Explore mais
              </p>
              <h2
                id="person-content-title"
                className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                Carreira e galeria
              </h2>
            </div>

            <div
              className="scrollbar-none flex gap-2 overflow-x-auto pb-1"
              role="tablist"
              aria-label={`Conteúdo de ${personDetails.name}`}
            >
              <TabButton
                onClick={() => setActiveTab("credits")}
                isActive={activeTab === "credits"}
                label="Filmografia"
              />
              <TabButton
                onClick={() => setActiveTab("images")}
                isActive={activeTab === "images"}
                label="Fotos"
              />
            </div>
          </div>

          <div className="mt-6" role="tabpanel">
            <Suspense fallback={<Loading />}>
              {activeTab === "credits" ? (
                <Credits id={id} />
              ) : (
                <Images id={id} personName={personDetails.name} />
              )}
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}
