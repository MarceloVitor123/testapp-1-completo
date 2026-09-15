import QuizActivity from "@/components/templates/HQActivity";

export default function Atividade5Screen() {
    return (
    <QuizActivity
        mode="text"
        question="Jéssica ama ler livros. Nesse mês, ela já leu 5!"
        subQuestion="A Jéssica: "
        options={[
            {label: "Odeia livros", value: "Odeia livros"},
            {label: "Gosta de literatura", value: "Gosta de literatura"},
            {label: "Não lê muito", value: "Nao le muito"},
        ]}
        correctAnswer="Gosta de literatura"
        nextRoute="/fases/teste-resultado"
        wrongRoute="/fases/teste-resultado"
        audio={require("@/components/audios/A_Jessica.mp3")}
        progress={0.25}
    />
    );
}