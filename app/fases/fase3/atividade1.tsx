
import React from "react";
import QuizActivity from "../../../components/templates/QuizActivity";

export default function MesesActivityScreen() {
  return (
    <QuizActivity
      mode="writingMultiple"
      question="Complete os nomes dos meses:"
      correctAnswer=""
      nextRoute="/fases/fase3/atividade2"
      wrongRoute="/fases/fase3/atividade2"
      progress={0}
      writingItems={[
        {
          id: "janeiro",
          text: "J_N__RO",
          answer: "JANEIRO",
        },
        {
          id: "fevereiro",
          text: "__V_R_I_O",
          answer: "FEVEREIRO",
        },
        {
          id: "marco",
          text: "M_RÇ_",
          answer: "MARÇO",
        },
        {
          id: "abril",
          text: "A_R_L",
          answer: "ABRIL",
        },
        {
          id: "maio",
          text: "M_I_",
          answer: "MAIO",
        },
        {
          id: "junho",
          text: "J_NH_",
          answer: "JUNHO",
        },
      ]}
    />
  );
}
