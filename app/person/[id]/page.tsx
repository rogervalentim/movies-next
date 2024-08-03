import { Footer } from "@/app/_components/footer";
import { Header } from "@/app/_components/header";
import { PersonDetails } from "./_components/person-details";

interface PersonPageProps {
  params: {
    id: number;
  };
}

export default function PersonPage({ params: { id } }: PersonPageProps) {
  return (
    <div>
      <div className="hidden lg:block">
        <Header />
      </div>

      <PersonDetails id={id} />

      <Footer />
    </div>
  );
}