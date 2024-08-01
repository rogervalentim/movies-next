import { Ghost, Heart, Smile } from "lucide-react";
import { FaRegSadCry } from "react-icons/fa";
import { GiRevolver } from "react-icons/gi";

export const categoriesData = [
  {
    name: "Ação",
    icon: <GiRevolver />
  },
  {
    name: "Comédia",
    icon: <Smile />
  },
  {
    name: "Drama",
    icon: <FaRegSadCry />
  },
  {
    name: "Romance",
    icon: <Heart />
  },
  {
    name: "Suspense",
    icon: <GiRevolver />
  },
  {
    name: "Terror",
    icon: <Ghost />
  }
];
