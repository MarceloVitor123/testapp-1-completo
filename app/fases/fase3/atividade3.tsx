import React from "react"

import FillBlanksActivity from "@/components/templates/FillBlanksActivity"

export default function Atividade3Fase3() {
    return (
        <FillBlanksActivity
            title="COMPLETE COM AS FRASES ABAIXO :"
            blanks={[
                { before: "MEU NOME É ? " },
                { before: "EU AMO ? " },
                { before: "EU TENHO", after: "ANOS" },
                { before: "EU GOSTO DE ? " },
                { before: "MINHA COMIDA FAVORITA É ?" },
            ]}
            nextRoute="/fases/fase3/atividade4"
            progress={0.4}
        />
    )
}