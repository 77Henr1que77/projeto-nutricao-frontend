from fastapi import APIRouter, HTTPException

from database.connection import get_connection
from models.schemas import CriarContaRequest, CompletarPerfilRequest, UsuarioLogin
from utils.security import hash_senha
from utils.validators import validar_email, calcular_imc

router = APIRouter()


@router.post("/criar-conta")
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
    """, (dados.nome, dados.email, senha_hash))

    conn.commit()
    conn.close()

    return {"mensagem": "Conta criada com sucesso."}


@router.post("/completar-perfil")
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
    """, (dados.idade, dados.peso, dados.altura_cm, dados.email))

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


@router.post("/login")
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