import ImageMatchActivity from "@/components/templates/TESTE";
import React from "react";

export default function Atividade4Screen() {
    return (
        <ImageMatchActivity
            question="QUAL É NOME DESSE DOCE??"
            targetImage={require("../../../assets/images/Bolo.jpeg")}
            options={[
                {label: "BALA", value: "bala"},
                {label: "BOLO", value: "bolo"},
                {label: "LATA", value: "lata"},
                {label: "COLA", value: "cola"},

            ]}
            correctAnswer="bolo"
            nextRoute="/fases/fase4/atividade5"
            wrongRoute="/fases/fase4/atividade5"
            progress={0.7}
            />
    );
}