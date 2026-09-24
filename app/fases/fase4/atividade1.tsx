import React from "react";
import ImageMatchActivity from "../../../components/templates/TESTE";

export default function ModalVerbActivityScreen() {
  return (
    <ImageMatchActivity
      question="SELECIONE O NOME DO ITÉM COM A IMAGEM:"
      // Imagem exibida no card à direita
      targetImage={require("@/assets/images/chinelo.jpeg")}
      // Lista de botões da coluna esquerda
      options={[
        { label: "LÁPIS", value: "lapis" },
        { label: "MESA", value: "mesa" },
        { label: "CHINELO", value: "chinelo" },
        { label: "BANANA", value: "banana" },
      ]}
      correctAnswer="chinelo"
      // Rotas de destino (acerto ou erro)
      nextRoute="/fases/fase4/atividade2"
      wrongRoute="/fases/fase4/atividade2"
      // Progresso da barra superior (0.0 a 1.0)
      progress={0}
    />
  );
}
