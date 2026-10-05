import React from "react";

import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade1Screen() {
  return (
    <QuizActivity
      mode="text"

      question="QUANTAS UNIDADES FORMAM 4 DEZENAS?"

      options={[
        { label: "40", value: "10" },
        { label: "150", value: "40" },
        { label: "290", value: "20" },
        { label: "1000", value: "100" },
      ]}

      correctAnswer="10"

      nextRoute="/fases/fase6/atividade4"

      wrongRoute="/fases/fase6/atividade4"

      progress={0}
    />
  );
}