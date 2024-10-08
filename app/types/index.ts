export interface MovieDetailsData {
  id: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  title: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  original_title: string;
  budget: number;
  revenue: number;
  spoken_languages: [
    {
      name: string;
    }
  ];
  production_companies: [
    {
      name: string;
    }
  ];
  belongs_to_collection?: {
    id: number;
    name: string;
    backdrop_path: string;
    poster_path: string;
  };
  genres: [
    {
      id: number;
      name: string;
    }
  ];
}

export interface SerieDetailsData {
  id: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  name: string;
  vote_average: number;
  original_name: string;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  language: string;
  production_companies: [
    {
      name: string;
    }
  ];
  networks: [
    {
      name: string;
    }
  ];
  created_by: [
    {
      id: number;
      name: string;
    }
  ];
  spoken_languages: [
    {
      name: string;
    }
  ];
  genres: [
    {
      id: number;
      name: string;
    }
  ];
}

export interface PersonDetailsData {
  id: number;
  name: string;
  profile_path: string;
  biography: string;
  birthday: string;
  deathday: string | null;
  place_of_birth: string;
  known_for_department: string;
}
