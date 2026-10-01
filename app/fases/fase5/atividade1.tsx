import React from "react";

import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade1Screen() {

  return (

    <QuizActivity

      mode="text"

      question="IDENTIFIQUE QUAL É O NÚMERO TRÊS:"

      options={[
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
      ]}

      correctAnswer="3"

      nextRoute="/fases/fase5/atividade2"

      wrongRoute="/fases/fase5/atividade2"


      progress={0}

    />

  );
}