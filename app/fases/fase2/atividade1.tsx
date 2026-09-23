import React from "react";
import MarkActivity from "../../../components/templates/MarkActivity";

export default function Atividade2Screen() {
  return (
   <MarkActivity
  question='QUAIS SÍLABAS FORMAM A PALAVRA "CASA"?'
  options={[
    { label: "PO", value: "u" },
    { label: "NE", value: "e" },
    { label: "CA", value: "a" },
    { label: "PE", value: "b" },
    { label: "LU", value: "l" },
    { label: "SA", value: "k" },
  ]}
  correctAnswers={["a","k"]}
  nextRoute="/fases/fase2/atividade2"
  wrongRoute="/fases/fase2/atividade2"
  progress={0}
/>
  );
}