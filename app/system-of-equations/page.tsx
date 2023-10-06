"use client";

import { Navbar } from "@/components/page-elements/main-nav";
import { Header } from "@/components/page-elements/page-header";

import { SystemOfEquations } from "./components/system-of-equations";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header
        title="Sistemas de Ecuaciones"
        description="Introduzca los coeficientes de su sistema
        en los campos de entrada. Ajuste el tamaño de su sistema con los botones superiores izquierdos."
      />
      <SystemOfEquations />
    </>
  );
}
