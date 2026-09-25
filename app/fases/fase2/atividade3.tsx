import React from "react";
import MarkActivity from "../../../components/templates/MarkActivity";

export default function Atividade2Screen() {
  return (
   <MarkActivity
  question='QUAIS SÍLABAS FORMAM A PALAVRA "PANELA"'
  options={[
    { label: "PA", value: "u" },
    { label: "NE", value: "e" },
    { label: "GA", value: "a" },
    { label: "PE", value: "b" },
    { label: "LA", value: "l" },
    { label: "MAR", value: "k" },
  ]}
  correctAnswers={["e","u","l"]}
  nextRoute="/fases/fase2/atividade4"
  wrongRoute="/fases/fase2/atividade4"
  audio={require("@/components/audios/Silabas_panela.mp3")}
  progress={0.4}
/>
  );
}