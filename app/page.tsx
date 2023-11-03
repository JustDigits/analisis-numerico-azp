import { Navbar } from "@/components/page-elements/main-nav";
import { Header } from "@/components/page-elements/page-header";
import { Card } from "@/components/page-elements/card";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header
        title="Análisis Numérico"
        description="Proyectos de análisis numérico."
      />
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/system-of-equations" legacyBehavior passHref>
          <span className="cursor-pointer">
            <Card
              imgSrc="/assets/system-of-equations.webp"
              title="Sistemas de ecuaciones"
            />
          </span>
        </Link>
        <Link href="/roots-of-equations" legacyBehavior passHref>
          <span className="cursor-pointer">
            <Card imgSrc="/assets/roots.jpg" title="Raíces de ecuaciones" />
          </span>
        </Link>
        <Link href="/interpolation" legacyBehavior passHref>
          <span className="cursor-pointer">
            <Card imgSrc="/assets/interpolation.jpg" title="Interpolación" />
          </span>
        </Link>
      </div>
    </>
  );
}
