import React from "react";
import ImageMatchActivity from "../../../components/templates/TESTE";

export default function ModalVerbActivityScreen() {
  return (
    <ImageMatchActivity
      question="SELECIONE O NOME DO ITEM COM A IMAGEM AO LADO."
      // Imagem exibida no card à direita
      targetImage={require("../../../assets/images/óculos2.png")}
      // Lista de botões da coluna esquerda
      options={[
        { label: "CARREGADOR", value: "carregador" },
        { label: "ÓCULOS", value: "oculos" },
        { label: "CARAMELO", value: "caramelo" },
        { label: "MAÇA", value: "maça" },
      ]}
      correctAnswer="oculos"
      // Rotas de destino (acerto ou erro)
      nextRoute="/fases/fase4/atividade4"
      wrongRoute="/fases/fase4/atividade4"
      // Progresso da barra superior (0.0 a 1.0)
      progress={0.4}
    />
  );
}