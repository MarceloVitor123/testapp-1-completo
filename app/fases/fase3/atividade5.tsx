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
          text: "______",
          answer: "ESCOVA",
          options: [],
          image: "@/assets/images/banana.jpeg"
        },
        {
          id: "imagem2",
          text: "____",
          answer: "LAÇO",
          options: [],
        },
        {
          id: "imagem3",
          text: "______",
          answer: "SAPATO",
          options: [],
        },
        {
          id: "imagem4",
          text: "_____",
          answer: "COLAR",
          options: [],
        },
      ]}
    />
  );
}