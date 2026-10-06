import React from "react";

import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade1Screen() {
  return (
    <QuizActivity
      mode="text"
      question="IDENTIFIQUE QUAL É O NOME DO NÚMERO 9 POR EXTENSO:"
      options={[
        { label: "NOVE", value: "5" },
        { label: "DOIS", value: "2" },
        { label: "TRÊS", value: "3" },
        { label: "QUATRO", value: "4" },
      ]}
      correctAnswer="5"
      nextRoute="/fases/teste-resultado"
      wrongRoute="/fases/teste-resultado"
      progress={0}
      audio={require("../../../components/audios/atividade 5 da 5.mp3")}
    />
  );
}
