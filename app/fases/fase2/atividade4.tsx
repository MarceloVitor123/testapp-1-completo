import React from "react";
import MarkActivity from "../../../components/templates/MarkActivity";

export default function Atividade2Screen() {
  return (
   <MarkActivity
  question='QUAIS SÍLABAS FORMAM A PALAVRA "CACHORRO"?'
  options={[
    { label: "RO", value: "u" },
    { label: "RRO", value: "e" },
    { label: "CHOR", value: "a" },
    { label: "FOI", value: "b" },
    { label: "AU", value: "l" },
    { label: "CA", value: "k" },
  ]}
  correctAnswers={["a","u","k"]}
  nextRoute="/fases/fase2/atividade5"
  wrongRoute="/fases/fase2/atividade5"
  progress={0.6}
/>
  );
}