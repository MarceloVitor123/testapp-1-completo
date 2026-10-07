import React from "react";

import QuizActivity from "../../../components/templates/QuizActivity";

export default function EscrevaNomeActivityScreen() {
  return (
    <QuizActivity
      mode="writingMultiple"
      question="OLHE AS IMAGENS ABAIXO E ESCREVA O NOME DA IMAGEM NOS QUADRADINHOS:"
      correctAnswer=""
      nextRoute="/fases/teste-resultado"
      wrongRoute="/fases/teste-resultado"
      audio={require("@/components/audios/quadradinho.mp3")}
      progress={1.0}
      writingItems={[
        {
          id: "imagem1",
          text: "______",
          answer: "ESCOVA",
          options: [],
          image: require("../../../assets/images/escova de dente.png"),
        },
        {
          id: "imagem2",
          text: "____",
          answer: "LAÇO",
          options: [],
          image: require("../../../assets/images/laço.png"),
        },
        {
          id: "imagem3",
          text: "______",
          answer: "SAPATO",
          options: [],
          image: require("../../../assets/images/sapato.png"),
        },
        {
          id: "imagem4",
          text: "_____",
          answer: "COLAR",
          options: [],
          image: require("../../../assets/images/pente.png"),
        },
      ]}
      specialLayout
    />
  );
}
