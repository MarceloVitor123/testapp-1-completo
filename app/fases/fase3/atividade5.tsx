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
          text: "______ __ _____",
          
          answer: "ESCOVA DE DENTE ",
          options: [],
          image: require("../../../assets/images/escova de dente sem fundo.png"),
        },
        {
          id: "imagem2",
          text: "____",
          answer: "LAÇO",
          options: [],
          image: require("../../../assets/images/laço sem fundo.png"),
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
          image: require("../../../assets/images/pente sem fundo.png"),
        },
      ]}
    />
  );
}
