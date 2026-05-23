# Obesity Monitoring System

## Descrição
O **Obesity Monitoring System** é um sistema web de apoio nutricional com inteligência artificial.  
Ele permite que o usuário:

- crie uma conta
- faça login
- complete o perfil com idade, peso e altura
- tenha o IMC calculado automaticamente
- converse com um assistente nutricional com IA
- gere um relatório inicial de apoio ao acompanhamento profissional

> O sistema não substitui nutricionista. Ele é uma ferramenta de apoio inicial.

---

## Tecnologias utilizadas

### Frontend
- React
- Vite
- CSS

### Backend
- Python
- FastAPI

### Banco de dados
- SQLite

### Inteligência Artificial
- Groq API

### Containerização
- Docker
- Docker Compose

---

## Estrutura do projeto

```txt
projeto-nutricao-frontend/
├── backend-nutricao/
│   ├── core/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── docker-compose.yml
├── Dockerfile.frontend
├── index.html
├── package.json
└── README.md
---
```
## Funcionalidades
- criação de conta
- login de usuário
- cadastro de perfil
- cálculo automático de IMC
- chat nutricional com IA
- histórico de chat separado por usuário
- relatório nutricional
- documentação automática da API
- execução com Docker



## Rotas principais da API
- POST /criar-conta
- POST /login
- POST /completar-perfil
- POST /pergunta
- GET /

Documentação automática:

http://127.0.0.1:8000/docs

## Como executar localmente
## Requisitos
- Node.js
- Python 3.11+
- Git
## 1. Clonar o repositório

git clone https://github.com/77Henr1que77/projeto-nutricao-frontend.git
cd projeto-nutricao-frontend

## 2. Rodar o frontend
npm install
npm run dev

## Frontend disponível em:
http://localhost:5173/

## 3. Rodar o backend
Entre na pasta do backend:

cd backend-nutricao
python -m venv venv

Ative o ambiente virtual no PowerShell:
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1

Instale as dependências:
pip install -r requirements.txt

Crie um arquivo .env dentro de backend-nutricao com:
GROQ_API_KEY=sua_chave_aqui

Execute o backend:
python -m uvicorn main:app --reload

Backend disponível em:
http://127.0.0.1:8000/

## Como executar com Docker
Requisito
-Docker Desktop

Na raiz do projeto:
docker compose up --build

Frontend:
http://localhost:5173/

Backend:
http://127.0.0.1:8000/

Swagger:
http://127.0.0.1:8000/docs

## Observações
- O sistema foi desenvolvido como MVP acadêmico.
- A aplicação utiliza IA para responder perguntas nutricionais de forma inicial e orientativa.
- O relatório gerado é apenas uma prévia e não substitui avaliação profissional.
