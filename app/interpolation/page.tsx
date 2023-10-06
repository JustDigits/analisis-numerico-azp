"use client";

import { Navbar } from "@/components/page-elements/main-nav";
import { Header } from "@/components/page-elements/page-header";

import { Interpolation } from "./components/inerpolation";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header
        title="Interpolación"
        description="Introduzca el conjunto de datos separados por coma en los campos de entrada."
      />
      <Interpolation />
    </>
  );
}
