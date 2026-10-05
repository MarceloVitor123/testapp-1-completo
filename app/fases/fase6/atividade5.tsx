import React from "react";

import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade1Screen() {
  return (
    <QuizActivity
      mode="text"

      question="QUANTAS UNIDADES FORMAM 8 DEZENAS?"

      options={[
        { label: "30", value: "5" },
        { label: "80", value: "10" },
        { label: "10", value: "20" },
        { label: "500", value: "100" },
      ]}

      correctAnswer="10"
  nextRoute="/fases/teste-resultado"
  wrongRoute="/fases/teste-resultado"
      progress={0}
    />
  );
}