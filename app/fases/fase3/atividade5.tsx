import React from "react";

import QuizActivity from "../../../components/templates/QuizActivity";

export default function EscrevaNomeActivityScreen() {
  return (
    <QuizActivity
      mode="writingMultiple"
      question="OLHE AS IMAGENS ABAIXO E ESCREVA O NOME DA IMAGEM NO QUADRADINHO AO LADO:"
      correctAnswer=""
  nextRoute="/fases/teste-resultado"
  wrongRoute="/fases/teste-resultado"
      progress={1.0}
      writingItems={[
        {
          id: "imagem1",
          text: "________",
          answer: "ESCOVA",
          options: [],
        },
        {
          id: "imagem2",
          text: "________",
          answer: "PENTE",
          options: [],
        },
        {
          id: "imagem3",
          text: "________",
          answer: "LAÇO",
          options: [],
        },
        {
          id: "imagem4",
          text: "________",
          answer: "SAPATO",
          options: [],
        },
        {
          id: "imagem5",
          text: "________",
          answer: "COLAR",
          options: [],
        },
      ]}
    />
  );
}