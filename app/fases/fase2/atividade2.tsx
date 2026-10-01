import React from "react";
import MarkActivity from "../../../components/templates/MarkActivity";

export default function Atividade2Screen() {
  return (
   <MarkActivity
  question='QUAIS SÍLABAS FORMAM A PALAVRA "GATO"?'
  options={[
    { label: "TO", value: "u" },
    { label: "NE", value: "e" },
    { label: "GA", value: "a" },
    { label: "PE", value: "b" },
    { label: "AU", value: "l" },
    { label: "PRO", value: "k" },
  ]}
  correctAnswers={["a","u"]}
  nextRoute="/fases/fase2/atividade3"
  wrongRoute="/fases/fase2/atividade3"
  audio={require("@/components/audios/Silabas_gato.mp3")}
  progress={0.2}
/>
  );
}