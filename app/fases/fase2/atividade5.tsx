import React from "react";
import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade1Screen() {
  return (
   <QuizActivity
  mode="text"
  question='QUANTAS SILABAS TEM A PALAVRA "MAR"'
  options={[
    { label: "1", value: "a" },
    { label: "2", value: "b" },
    { label: "3", value: "c" },
    { label: "4", value: "d" },
  ]}
  correctAnswer="a"
  nextRoute="/fases/teste-resultado"
  wrongRoute="/fases/teste-resultado"
/>
  );
}