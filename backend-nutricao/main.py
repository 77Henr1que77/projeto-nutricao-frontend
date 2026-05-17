from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv
from pathlib import Path
import sqlite3
import hashlib
from typing import List, Optional

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

DB_PATH = BASE_DIR / "nutricao.db"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def criar_tabelas():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha_hash TEXT NOT NULL,
            idade INTEGER,
            peso REAL,
            altura_cm REAL
        )
    """)

    conn.commit()
    conn.close()


@app.on_event("startup")
def startup():
    criar_tabelas()


def hash_senha(senha: str) -> str:
    return hashlib.sha256(senha.encode()).hexdigest()


def validar_email(email: str) -> bool:
    return "@" in email and "." in email


def calcular_imc(peso: float, altura_cm: float) -> float:
    altura_m = altura_cm / 100
    return round(peso / (altura_m * altura_m), 1)


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


@app.get("/")
def home():
    return {"msg": "API de Nutrição funcionando"}


@app.post("/criar-conta")
def criar_conta(dados: CriarContaRequest):
    if not dados.nome.strip():
        raise HTTPException(status_code=400, detail="Nome é obrigatório.")

    if not validar_email(dados.email):
        raise HTTPException(status_code=400, detail="E-mail inválido.")

    if len(dados.senha) < 6:
        raise HTTPException(status_code=400, detail="A senha deve ter pelo menos 6 caracteres.")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id FROM usuarios WHERE email = ?", (dados.email,))
    existente = cursor.fetchone()

    if existente:
        conn.close()
        raise HTTPException(status_code=400, detail="Este e-mail já está cadastrado.")

    senha_hash = hash_senha(dados.senha)

    cursor.execute("""
        INSERT INTO usuarios (nome, email, senha_hash)
        VALUES (?, ?, ?)
    """, (
        dados.nome,
        dados.email,
        senha_hash
    ))

    conn.commit()
    conn.close()

    return {"mensagem": "Conta criada com sucesso."}


@app.post("/completar-perfil")
def completar_perfil(dados: CompletarPerfilRequest):
    if not validar_email(dados.email):
        raise HTTPException(status_code=400, detail="E-mail inválido.")

    if dados.idade < 16:
        raise HTTPException(status_code=400, detail="A idade mínima é 16 anos.")

    if dados.peso <= 0:
        raise HTTPException(status_code=400, detail="Peso inválido.")

    if dados.altura_cm <= 0:
        raise HTTPException(status_code=400, detail="Altura inválida.")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE email = ?", (dados.email,))
    usuario = cursor.fetchone()

    if not usuario:
        conn.close()
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")

    cursor.execute("""
        UPDATE usuarios
        SET idade = ?, peso = ?, altura_cm = ?
        WHERE email = ?
    """, (
        dados.idade,
        dados.peso,
        dados.altura_cm,
        dados.email
    ))

    conn.commit()

    cursor.execute("SELECT * FROM usuarios WHERE email = ?", (dados.email,))
    atualizado = cursor.fetchone()
    conn.close()

    return {
        "mensagem": "Perfil completado com sucesso.",
        "usuario": {
            "id": atualizado["id"],
            "nome": atualizado["nome"],
            "email": atualizado["email"],
            "idade": atualizado["idade"],
            "peso": atualizado["peso"],
            "altura_cm": atualizado["altura_cm"],
            "imc": calcular_imc(atualizado["peso"], atualizado["altura_cm"])
        }
    }


@app.post("/login")
def login(usuario: UsuarioLogin):
    if not validar_email(usuario.email):
        raise HTTPException(status_code=400, detail="E-mail inválido.")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE email = ?", (usuario.email,))
    user = cursor.fetchone()
    conn.close()

    if not user:
        raise HTTPException(status_code=401, detail="Usuário não encontrado.")

    if user["senha_hash"] != hash_senha(usuario.senha):
        raise HTTPException(status_code=401, detail="Senha incorreta.")

    perfil_completo = (
        user["idade"] is not None and
        user["peso"] is not None and
        user["altura_cm"] is not None
    )

    usuario_resposta = {
        "id": user["id"],
        "nome": user["nome"],
        "email": user["email"],
        "idade": user["idade"],
        "peso": user["peso"],
        "altura_cm": user["altura_cm"],
        "perfil_completo": perfil_completo
    }

    if perfil_completo:
        usuario_resposta["imc"] = calcular_imc(user["peso"], user["altura_cm"])

    return {
        "mensagem": "Login realizado com sucesso.",
        "usuario": usuario_resposta
    }


@app.post("/pergunta")
def responder(pergunta: Pergunta):
    try:
        mensagens = [
            {
                "role": "system",
                "content": (
                    "Você é um assistente de nutrição amigável, acolhedor e objetivo. "
                    "Responda como uma conversa natural, com linguagem simples e humana. "
                    "Seja direto e útil. "
                    "Responda em no máximo 4 linhas curtas ou 4 orientações curtas. "
                    "Evite textos longos, introduções grandes e explicações excessivas. "
                    "Dê sugestões práticas e fáceis de aplicar no dia a dia. "
                    "Não use markdown, não use asteriscos, não use negrito e não use listas com símbolos como * ou -. "
                    "Não substitui nutricionista."
                )
            }
        ]

        for msg in pergunta.historico[-6:]:
            mensagens.append({
                "role": msg.role,
                "content": msg.content
            })

        mensagens.append({
            "role": "user",
            "content": pergunta.pergunta
        })

        resposta = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            max_tokens=180,
            temperature=0.7,
            messages=mensagens
        )

        return {"resposta": resposta.choices[0].message.content}

    except Exception as e:
        return {"erro": str(e)}