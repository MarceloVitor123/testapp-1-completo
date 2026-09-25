import QuizActivity from "@/components/templates/HQActivity";

export default function Atividade5Screen() {
    return (
    <QuizActivity
        mode="text"
        question="JÉSSICA AMA LER LIVROS. NESSE MÊS, ELA JÁ LEU 5 !"
        subQuestion="A JÉSSICA: "
        options={[
            {label: "ODEIA LIVROS", value: "Odeia livros"},
            {label: "GOSTA DE LITERATURA", value: "Gosta de literatura"},
            {label: "NÃO LÊ MUITO", value: "Nao le muito"},
            {label: "NÃO POSSUI LIVROS ", value: "Nao possui livros "},
        ]}
        correctAnswer="Gosta de literatura"
        nextRoute="/fases/teste-resultado"
        wrongRoute="/fases/teste-resultado"
        audio={require("@/components/audios/A_Jessica.mp3")}
        subAudio={require("@/components/audios/A_Jessica_1.mp3")}
        progress={1.0}
    />
    );
}