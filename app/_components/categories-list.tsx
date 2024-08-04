import { categoriesData } from "../_constants/data";

export function CategoriesList() {
  return (
    <>
      {categoriesData.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-center gap-3 rounded-full bg-muted text-primary px-4 py-3 shadow-md"
        >
          {item.icon}
          <span className="text-sm font-semibold">{item.name}</span>
        </div>
      ))}
    </>
  );
}
