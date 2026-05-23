from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class CriarContaRequest(BaseModel):
    nome: str
    email: str
    senha: str


class CompletarPerfilRequest(BaseModel):
    email: str
    idade: int
    peso: float
    altura_cm: float


class UsuarioLogin(BaseModel):
    email: str
    senha: str


class MensagemHistorico(BaseModel):
    role: str
    content: str


class Pergunta(BaseModel):
    pergunta: str
    historico: Optional[List[MensagemHistorico]] = []
    usuario: Optional[Dict[str, Any]] = {}