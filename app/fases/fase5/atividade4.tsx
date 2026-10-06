import React from "react";

import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade1Screen() {

  return (

    <QuizActivity

      mode="text"

      question="IDENTIFIQUE QUAL É O NOME DO NÚMERO 4 POR EXTENSO:"

      options={[
        { label: "ZERO", value: "1" },
        { label: "QUATRO", value: "2" },
        { label: "SEIS", value: "3" },
        { label: "DOIS", value: "4" },
      ]}

      correctAnswer="2"

      nextRoute="/fases/fase5/atividade5"

      wrongRoute="/fases/fase5/atividade5"



      progress={0.7}
      audio={require("../../../components/audios/atividade 4 da 5.mp3")}
    />

  );
}