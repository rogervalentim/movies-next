import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { SearchComponent } from "./_components/search-component";
import { Suspense } from "react";
import { Loading } from "../_components/loading";

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="page-container">
        <Suspense fallback={<div className="py-12"><Loading /></div>}>
          <SearchComponent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
