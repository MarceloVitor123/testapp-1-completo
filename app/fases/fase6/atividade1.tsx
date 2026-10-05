import React from "react";

import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade1Screen() {
  return (
    <QuizActivity
      mode="text"

      question="QUANTAS UNIDADES FORMAM UMA DEZENA?"

      options={[
        { label: "5", value: "5" },
        { label: "10", value: "10" },
        { label: "20", value: "20" },
        { label: "100", value: "100" },
      ]}

      correctAnswer="10"

      nextRoute="/fases/fase6/atividade2"

      wrongRoute="/fases/fase6/atividade2"

      progress={0}
    />
  );
}