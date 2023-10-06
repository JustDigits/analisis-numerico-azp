import { Navbar } from "@/components/page-elements/main-nav";
import { Header } from "@/components/page-elements/page-header";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header
        title="Análisis Numérico"
        description="Proyectos de análisis numérico."
      />
    </>
  );
}
