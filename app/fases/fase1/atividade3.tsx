import React from "react";
import QuizActivity from "../../../components/templates/QuizActivity";

export default function Atividade2Screen() {
  return (
    <QuizActivity
 mode="text"
  question="identifique qual é a consoante"
  options={[
    { label: "X", value: "x" },
    { label: "U", value: "u" },
    { label: "I", value: "i" },
    { label: "O", value: "o" }
  ]}
  correctAnswer="x"
  nextRoute="/fases/fase1/atividade4"
  wrongRoute="/fases/fase1/atividade4"
  progress={0.4}
/>
  );
}