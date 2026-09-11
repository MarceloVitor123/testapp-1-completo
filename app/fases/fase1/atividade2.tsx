import React from "react";
import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade2Screen() {
  return (
    <QuizActivity
 mode="text"
  question="identifique qual é a consoante"
  options={[
    { label: "A", value: "a" },
    { label: "B", value: "b" },
    { label: "I", value: "i" },
    { label: "E", value: "e" }
  ]}
  correctAnswer="b"
  nextRoute="/fases/fase1/atividade3"
  wrongRoute="/fases/fase1/atividade3"
  progress={0.2}
/>
  );
}