import QuizActivity from "../../../components/templates/HQActivity";

export default function Atividade1() {
  return (
    <QuizActivity
      mode="text"
      question="O pai do Marcos tem 4 galinhas e 2 bois."
      subQuestion="Qual dos animais a seguir o pai do Marcos não tem?"
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
      nextRoute="/fases/fase4/atividade3"
      wrongRoute="/fases/fase4/atividade3"
      audio={require("../../../components/audios/o_pai_de_marcos.mp3")}
      subAudio={require("@/components/audios/o_pai_de_marcos_1.mp3")}
      progress={0.2}
    />
  );
}