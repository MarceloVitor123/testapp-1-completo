import React from "react";
import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade1Screen() {
  return (
   <QuizActivity
  mode="text"
  question="identifique qual é vogal"
  options={[
    { label: "A", value: "a" },
    { label: "B", value: "b" },
    { label: "C", value: "c" },
    { label: "D", value: "d" },
  ]}
  correctAnswer="a"
  nextRoute="/fases/fase1/atividade2"
  wrongRoute="/fases/fase1/atividade2"
/>
  );
}