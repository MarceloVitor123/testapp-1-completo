import React from "react";

import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade1Screen() {

  return (

    <QuizActivity

      mode="text"

      question="IDENTIFIQUE QUAL É O NÚMERO CINCO:"

      options={[
        { label: "0", value: "1" },
        { label: "5", value: "2" },
        { label: "2", value: "3" },
        { label: "3", value: "4" },
      ]}

      correctAnswer="2"

      nextRoute="/fases/fase5/atividade3"
      wrongRoute="/fases/fase5/atividade3"

      progress={0.2}
      audio={require("../../../components/audios/atividade 2 da 5.mp3")}
    />
  );
}