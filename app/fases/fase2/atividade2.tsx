import QuizActivity from "../../../components/templates/HQActivity";

export default function Atividade1() {
  return (
    <QuizActivity
      mode="text"
      question="O pai do Marcos tem 4 galinhas e 2 bois."
      correctAnswer="PORCO"
      options={[
        {
          label: "BOI",
          value: "BOI",
        },
        {
          label: "GALINHA",
          value: "GALINHA",
        },
        {
          label: "PORCO",
          value: "PORCO",
        },
      ]}
      nextRoute="/fases/fase2/atividade4"
      wrongRoute="/fases/fase2/atividade4"
      audio={require("../../../components/audios/o_pai_de_marcos.mp3")}
      progress={0.2}
    />
  );
}