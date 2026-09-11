import React from "react";
import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade2Screen() {
  return (
    <QuizActivity
 mode="text"
  question="identifique qual é a vogal"
  options={[
    { label: "K", value: "k" },
    { label: "D", value: "d" },
    { label: "M", value: "m" },
    { label: "E", value: "e" }
  ]}
  correctAnswer="e"
  nextRoute="/fases/fase1/atividade5"
  wrongRoute="/fases/fase1/atividade5"
  progress={0.6}
/>
  );
}