import React from "react"

import FillBlanksActivity from "@/components/templates/FillBlanksActivity"

export default function Atividade3Fase3() {
    return (
        <FillBlanksActivity
            title="Complete as frases abaixo:"
            blanks={[
                { before: "Meu nome é" },
                { before: "Eu amo" },
                { before: "Eu tenho", after: "anos" },
                { before: "Eu gosto de" },
                { before: "Minha comida favorita é" },
            ]}
            nextRoute="/fases/fase3/atividade4"
            progress={0.4}
        />
    )
}