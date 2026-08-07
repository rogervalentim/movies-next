import Link from "next/link";
import { formatDate } from "../utils/format-date";
import { formatDuration } from "../utils/format-duration";
import { formatCurrency } from "../utils/format-currency";

interface NamedItem { name: string; }
interface Creator extends NamedItem { id: number; }

interface OverviewProps {
  release_date?: string;
  runtime?: number;
  original_title?: string;
  budget?: number;
  revenue?: number;
  spoken_languages?: NamedItem[];
  original_name?: string;
  first_air_date?: string;
  last_air_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  networks?: NamedItem[];
  created_by?: Creator[];
  production_companies?: NamedItem[];
}

export default function Overview(props: OverviewProps) {
  const items = [
    { label: "Lançamento", value: formatDate(props.release_date || props.first_air_date) },
    props.last_air_date ? { label: "Último episódio", value: formatDate(props.last_air_date) } : null,
    props.runtime ? { label: "Duração", value: formatDuration(props.runtime) } : null,
    props.number_of_seasons ? { label: "Temporadas", value: String(props.number_of_seasons) } : null,
    props.number_of_episodes ? { label: "Episódios", value: String(props.number_of_episodes) } : null,
    props.original_title || props.original_name ? { label: "Título original", value: props.original_title || props.original_name || "Não informado" } : null,
    props.spoken_languages?.length ? { label: "Idiomas", value: props.spoken_languages.map((item) => item.name).join(", ") } : null,
    props.networks?.length ? { label: "Emissoras", value: props.networks.map((item) => item.name).join(", ") } : null,
    props.production_companies?.length ? { label: "Produção", value: props.production_companies.map((item) => item.name).join(", ") } : null,
    props.budget ? { label: "Orçamento", value: formatCurrency(props.budget) } : null,
    props.revenue ? { label: "Receita", value: formatCurrency(props.revenue) } : null
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section aria-labelledby="overview-title">
      <div className="mb-5">
        <h2 id="overview-title" className="text-xl font-bold text-white sm:text-2xl">Informações</h2>
        <p className="mt-1 text-sm text-slate-400">Detalhes de produção e lançamento fornecidos pelo TMDB.</p>
      </div>
      {props.created_by?.length ? (
        <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Criação</p>
          <p className="mt-2 text-sm text-slate-200">
            {props.created_by.map((creator, index) => (
              <span key={creator.id}>
                <Link href={`/person/${creator.id}`} className="font-medium text-red-400 hover:text-red-300 hover:underline">{creator.name}</Link>
                {index < props.created_by!.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      ) : null}
      <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="min-h-28 bg-[#101010] p-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">{item.label}</dt>
            <dd className="mt-2 text-sm leading-6 text-slate-200">{item.value || "Não informado"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
