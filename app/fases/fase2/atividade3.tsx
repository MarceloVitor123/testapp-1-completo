import React from "react";
import ImageMatchActivity from "../../../components/templates/TESTE";

export default function ModalVerbActivityScreen() {
  return (
    <ImageMatchActivity
      question="Selecione o nome do item com a imagem."
      // Imagem exibida no card à direita
      targetImage={require("../../../assets/images/óculos2.png")}
      // Lista de botões da coluna esquerda
      options={[
        { label: "CARREGADOR", value: "lapis" },
        { label: "ÓCULOS", value: "mesa" },
        { label: "CARAMELO", value: "chinelo" },
        { label: "MAÇA", value: "banana" },
      ]}
      correctAnswer="mesa"
      // Rotas de destino (acerto ou erro)
      nextRoute="/fases/fase2/atividade4"
      wrongRoute="/fases/fase2/atividade4"
      // Progresso da barra superior (0.0 a 1.0)
      progress={0.25}
    />
  );
}