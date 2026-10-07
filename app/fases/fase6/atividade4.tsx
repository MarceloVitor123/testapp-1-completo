import React from "react";

import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade1Screen() {
  return (
    <QuizActivity
      mode="text"

      question="QUANTAS UNIDADES FORMAM 2 CENTENAS?"

      options={[
        { label: "80", value: "5" },
        { label: "1020", value: "60" },
        { label: "200", value: "10" },
        { label: "100", value: "100" },
      ]}

      correctAnswer="10"
      nextRoute="/fases/fase6/atividade5"
      wrongRoute="/fases/fase6/atividade5"
      progress={0.7}
      audio={require("@/components/audios/2_centenas.mp3")}
    />
  );
}