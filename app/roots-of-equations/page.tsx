"use client";

import { Navbar } from "@/components/page-elements/main-nav";
import { Header } from "@/components/page-elements/page-header";
import { RootsOfEquations } from "./components/roots-of-equations";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header
        title="Raíces de Ecuaciones"
        description="Introduzca los coeficientes de su ecuación en los campos de entrada."
      />
      <RootsOfEquations />
    </>
  );
}
