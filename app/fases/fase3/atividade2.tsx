import React from "react";
import QuizActivity from "../../../components/templates/QuizActivity";

export default function MesesActivityScreen() {
  return (
    <QuizActivity
      mode="writingMultiple"
      question="COMPLETE OS NOMES DOS MESES ABAIXO COM CONSOANTES E VOGAIS :"
      correctAnswer=""
      nextRoute="/fases/fase3/atividade3"
      wrongRoute="/fases/fase3/atividade3"
      progress={0.2}
      writingItems={[
        {
          id: "julho",
          text: "J_LH_",
          answer: "JULHO",
        },
        {
          id: "agosto",
          text: "AG_ST_",
          answer: "AGOSTO",
        },
        {
          id: "setembro",
          text: "S_T_MB_O",
          answer: "SETEMBRO",
        },
        {
          id: "outubro",
          text: "O_T_BR_",
          answer: "OUTUBRO",
        },
        {
          id: "novembro",
          text: "N_V_MB_O",
          answer: "NOVEMBRO",
        },
        {
          id: "dezembro",
          text: "D_Z_MB_O",
          answer: "DEZEMBRO",
        },
      ]}
    />
  );
}
