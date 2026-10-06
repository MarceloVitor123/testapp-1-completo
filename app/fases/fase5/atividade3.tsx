import React from "react";

import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade1Screen() {

  return (

    <QuizActivity

      mode="text"

      question="IDENTIFIQUE QUAL É O NÚMERO SETE:"

      options={[
        { label: "8", value: "1" },
        { label: "2", value: "2" },
        { label: "8", value: "8" },
        { label: "7", value: "3" },
      ]}

      correctAnswer="3"

      nextRoute="/fases/fase5/atividade4"

      wrongRoute="/fases/fase5/atividade4"


      progress={0}
      audio={require("../../../components/audios/atividade 3 da 5.mp3")}

    />

  );
}