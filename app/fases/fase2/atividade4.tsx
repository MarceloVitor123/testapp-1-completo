import ImageMatchActivity from "@/components/templates/TESTE";
import React from "react";

export default function Atividade4Screen() {
    return (
        <ImageMatchActivity
            question="Qual é o nome desse doce?"
            targetImage={require("../../../assets/images/Bolo.jpeg")}
            options={[
                {label: "BALA", value: "bala"},
                {label: "BOLO", value: "bolo"},
                {label: "LATA", value: "lata"},
            ]}
            correctAnswer="bolo"
            nextRoute="/fases/fase2/atividade5"
            wrongRoute="/fases/fase2/atividade5"
            progress={0.2}
            />
    );
}