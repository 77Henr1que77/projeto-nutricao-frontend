from fastapi import APIRouter, HTTPException

from models.schemas import Pergunta
from services.ai_service import gerar_resposta_nutricional

router = APIRouter()


@router.post("/pergunta")
def responder(pergunta: Pergunta):
    if not pergunta.pergunta.strip():
        raise HTTPException(status_code=400, detail="A pergunta não pode estar vazia.")

    try:
        resposta = gerar_resposta_nutricional(
            pergunta=pergunta.pergunta,
            historico=[msg.dict() for msg in (pergunta.historico or [])],
            usuario=pergunta.usuario or {}
        )

        return {"resposta": resposta}

    except Exception as e:
        return {
            "erro": "Não foi possível gerar uma resposta no momento.",
            "detalhe": str(e)
        }