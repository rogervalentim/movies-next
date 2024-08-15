import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { SearchComponent } from "./_components/search-component";

export default function SearchPage() {
  return (
    <>
      <Header />
      <div className="pt-4 px-5  lg:px-32">
        <SearchComponent />
      </div>

      <div className="pt-4">
        <Footer />
      </div>
    </>
  );
}
