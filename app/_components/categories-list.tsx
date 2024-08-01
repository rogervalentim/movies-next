import { categoriesData } from "../_constants/data";

export function CategoriesList() {
  return (
    <>
      {categoriesData.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md"
        >
          {item.icon}
          <span className="text-sm font-semibold text-[#323232]">
            {item.name}
          </span>
        </div>
      ))}
    </>
  );
}
