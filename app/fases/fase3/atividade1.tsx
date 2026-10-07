import React from "react"
import FillBlanksActivity from "@/components/templates/FillBlanksActivity"

export default function Atividade3Fase3() {
    return (
        <FillBlanksActivity
            title="COMPLETE COM AS FRASES ABAIXO :"
            blanks={[
                { before: "MEU NOME É ", audio: require("@/components/audios/Meu_nome.mp3") },
                { before: "EU AMO ", audio: require("@/components/audios/Eu_amo.mp3") },
                { before: "EU TENHO", after: "ANOS", audio: require("@/components/audios/X_anos.mp3") },
                { before: "EU GOSTO DE ", audio: require("@/components/audios/Eu_gosto.mp3") },
                { before: "MINHA COMIDA FAVORITA É ", audio: require("@/components/audios/Minha_comida.mp3") },
            ]}
            nextRoute="/fases/fase3/atividade2"
            progress={0}
            audio={require("@/components/audios/complete_as_frases.mp4")}
        />
    )
}