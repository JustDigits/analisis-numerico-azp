import { Navbar } from "@/components/common/main-nav";
import { Header } from "@/components/common/page-header";
import { SolveSystemOfEquations } from "@/components/math/system-of-equations/system-of-equations";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header
        title="Sistemas de Ecuaciones"
        description="Introduzca los coeficientes de su sistema
        en los campos de entrada. Ajuste el tamaño de su sistema con los botones superiores izquierdos."
      />
      <SolveSystemOfEquations />
    </>
  );
}
