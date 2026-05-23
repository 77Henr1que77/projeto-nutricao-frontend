import re
from groq import Groq

from core.config import GROQ_API_KEY, AI_MODEL, MAX_TOKENS, TEMPERATURE

client = Groq(api_key=GROQ_API_KEY)


def limpar_texto(texto: str) -> str:
    texto = texto.replace("**", "").replace("*", "")
    texto = re.sub(r"\n{3,}", "\n\n", texto)
    texto = re.sub(r"[ \t]+", " ", texto)
    return texto.strip()


def gerar_resposta_nutricional(pergunta: str, historico=None, usuario=None) -> str:
    historico = historico or []
    usuario = usuario or {}

    nome = usuario.get("nome", "não informado")
    idade = usuario.get("idade", "não informada")
    peso = usuario.get("peso", "não informado")
    altura_cm = usuario.get("altura_cm", "não informada")
    imc = usuario.get("imc", "não informado")

    contexto_usuario = (
        f"Dados do usuário: nome={nome}, idade={idade}, peso={peso} kg, "
        f"altura={altura_cm} cm, imc={imc}. "
        "Use essas informações apenas quando fizer sentido para personalizar a resposta."
    )

    mensagens = [
        {
            "role": "system",
            "content": (
                "Você é um assistente nutricional virtual. "
                "Responda sempre em português do Brasil, de forma profissional, clara, acolhedora e objetiva. "
                "Faça respostas curtas, completas e bem finalizadas, com no máximo 90 palavras. "
                "Não use markdown. Não use asteriscos. Não use negrito. "
                "Não use listas numeradas nem tópicos. "
                "Escreva em no máximo 1 parágrafo curto ou 3 frases curtas. "
                "Evite repetir ideias. Não corte frases no meio. "
                "Se o usuário pedir rotina, entregue uma versão simples e resumida, sem detalhar calorias em cada item. "
                "Se o usuário perguntar sobre o relatório, explique de forma simples o que ele mostra, como IMC, classificação, peso, altura, atividade física, meta de peso, gordura corporal, hábitos alimentares e observações. "
                "Explique também que o relatório é uma prévia de apoio para acompanhamento nutricional e não substitui avaliação profissional. "
                "Use os dados do usuário quando isso ajudar a personalizar a resposta. "
                "Você não substitui o acompanhamento de uma nutricionista."
            ),
        },
        {
            "role": "system",
            "content": contexto_usuario,
        },
        {
            "role": "system",
            "content": (
                "Se o usuário perguntar sobre o relatório, explique com linguagem simples e direta. "
                "Diga para que serve cada campo principal e como ele pode ajudar numa conversa com a nutricionista. "
                "Se perguntarem sobre IMC, explique que é um indicador baseado em peso e altura. "
                "Se perguntarem sobre classificação, explique que ela é baseada no IMC. "
                "Se perguntarem sobre observações, hábitos, meta de peso ou atividade física, explique que esses campos ajudam a montar uma visão inicial do perfil do usuário."
            ),
        },
    ]

    for item in historico[-4:]:
        mensagens.append(
            {
                "role": item.get("role", "user"),
                "content": item.get("content", ""),
            }
        )

    mensagens.append(
        {
            "role": "user",
            "content": pergunta,
        }
    )

    resposta = client.chat.completions.create(
        model=AI_MODEL,
        messages=mensagens,
        max_tokens=MAX_TOKENS,
        temperature=TEMPERATURE,
    )

    texto = resposta.choices[0].message.content or ""
    return limpar_texto(texto)