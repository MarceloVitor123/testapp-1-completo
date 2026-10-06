import React from "react";

import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade1Screen() {
  return (
    <QuizActivity
      mode="text"

      question="QUANTAS UNIDADES FORMAM UMA CENTENA?"

      options={[
        { label: "50", value: "5" },
        { label: "120", value: "10" },
        { label: "260", value: "20" },
        { label: "100", value: "100" },
      ]}

      correctAnswer="100"
      nextRoute="/fases/fase6/atividade3"
      wrongRoute="/fases/fase6/atividade3"
      progress={0}
      audio={require("@/components/audios/1_centena.mp3")}
    />
  );
}