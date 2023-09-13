"use client";

import { Navbar } from "@/components/page-elements/main-nav";
import { Header } from "@/components/page-elements/page-header";

import { SystemOfEquationsInput } from "./components/system-of-equations-input";

import { useSystemOfEquationsStore } from "./hooks/use-system-of-equations";

export default function Home() {
  const coefficients = useSystemOfEquationsStore((state) => state.coefficients);
  const results = useSystemOfEquationsStore((state) => state.results);

  return (
    <>
      <Navbar />
      <Header
        title="Refactoring Sistemas de Ecuaciones"
        description="Introduzca los coeficientes de su sistema
        en los campos de entrada. Ajuste el tamaño de su sistema con los botones superiores izquierdos."
      />
      <SystemOfEquationsInput />
    </>
  );
}
