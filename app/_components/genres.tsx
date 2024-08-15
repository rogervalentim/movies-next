interface GenresData {
  id: number;
  name: string;
}

interface GenresProps {
  genres: GenresData[];
}

export function Genres({ genres }: GenresProps) {
  return (
    <div className="flex gap-2 overflow-x-auto lg:hidden [&::-webkit-scrollbar]:hidden py-2">
      {genres.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-center font-semibold rounded-full bg-secondary text-secondary-foreground px-4 py-1.5 shadow-md whitespace-nowrap"
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
