import React from "react";

import QuizActivity from "../../../components/templates/QuizActivity";

export default function IsqueiroActivityScreen() {
  return (
    <QuizActivity
      mode="writingMultiple"
      question="MONTE O NOME DA IMAGEM:"
      correctAnswer="ISQUEIRO"
      nextRoute="/fases/fase3/atividade5"
      wrongRoute="/fases/fase3/atividade5"
      progress={0.7}
      writingItems={[
        {
          id: "isqueiro",
          text: "________",
          answer: "ISQUEIRO",
          options: ["R", "S", "I", "Q", "O", "E", "U", "I"],
        },
      ]}
    />
  );
}
