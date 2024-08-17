import { formatDate } from "../utils/format-date";
import { formatDuration } from "../utils/format-duration";
import { formatCurrency } from "../utils/format-currency";
import { Card } from "./ui/card";
import Link from "next/link";

interface OverviewProps {
  release_date?: string;
  runtime?: number;
  original_title?: string;
  budget?: number;
  revenue?: number;
  spoken_languages: [
    {
      name: string;
    }
  ];
  original_name?: string;
  first_air_date?: string;
  last_air_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  networks?: [
    {
      name: string;
    }
  ];
  created_by?: [
    {
      id: number;
      name: string;
    }
  ];
  production_companies: [
    {
      name: string;
    }
  ];
}

export default function Overview({
  release_date,
  runtime,
  original_title,
  budget,
  revenue,
  spoken_languages,
  first_air_date,
  last_air_date,
  number_of_seasons,
  number_of_episodes,
  networks,
  created_by,
  production_companies
}: OverviewProps) {
  return (
    <Card className="grid grid-cols-2 lg:grid-cols-4 justify-between py-6 gap-4 px-5">
      {created_by && (
        <ul>
          <li className="font-semibold">Criado por</li>
          {created_by.map((creator, index) => (
            <Link
              key={creator.id}
              href={`/person/${creator.id}`}
              className="underline text-muted-foreground"
            >
              {creator.name}
              {index < created_by.length - 1 ? ", " : ""}
            </Link>
          ))}
        </ul>
      )}

      {release_date && (
        <ul>
          <li className="font-semibold">Data de lançamento</li>
          <li className="text-muted-foreground">{formatDate(release_date)}</li>
        </ul>
      )}

      {original_title && (
        <ul>
          <li className="font-semibold">Título original</li>
          <li className="text-muted-foreground">{original_title}</li>
        </ul>
      )}

      {runtime && (
        <ul>
          <li className="font-semibold">Duração</li>
          <li className="text-muted-foreground">{formatDuration(runtime)}</li>
        </ul>
      )}

      {budget && (
        <ul>
          <li className="font-semibold">Orçamento</li>
          <li className="text-muted-foreground">{formatCurrency(budget)}</li>
        </ul>
      )}

      {revenue && (
        <ul>
          <li className="font-semibold">Receita</li>
          <li className="text-muted-foreground">{formatCurrency(revenue)}</li>
        </ul>
      )}

      {spoken_languages && (
        <ul>
          <li className="font-semibold">Linguagens</li>
          <li className="text-muted-foreground">
            {spoken_languages.map((language) => language.name).join(", ")}
          </li>
        </ul>
      )}

      {first_air_date && (
        <ul>
          <li className="font-semibold">Data da primeira exibição</li>
          <li className="text-muted-foreground">
            {formatDate(first_air_date)}
          </li>
        </ul>
      )}

      {last_air_date && (
        <ul>
          <li className="font-semibold">Data da última exibição</li>
          <li className="text-muted-foreground">{formatDate(last_air_date)}</li>
        </ul>
      )}

      {number_of_seasons && (
        <ul>
          <li className="font-semibold">Número de temporadas</li>
          <li className="text-muted-foreground">{number_of_seasons}</li>
        </ul>
      )}

      {number_of_episodes && (
        <ul>
          <li className="font-semibold">Número de episódios</li>
          <li className="text-muted-foreground">{number_of_episodes}</li>
        </ul>
      )}

      {networks && (
        <ul>
          <li className="font-semibold">Redes</li>
          <li className="text-muted-foreground">
            {networks.map((network) => network.name).join(", ")}
          </li>
        </ul>
      )}

      {production_companies && (
        <ul>
          <li className="font-semibold">Empresas de Produção</li>
          <li className="text-muted-foreground">
            {production_companies.map((company) => company.name).join(", ")}
          </li>
        </ul>
      )}
    </Card>
  );
}
