# Obesity Monitoring System

## Descrição do projeto
O **Obesity Monitoring System** é um sistema web de apoio nutricional com inteligência artificial, desenvolvido como MVP para auxiliar usuários no acompanhamento inicial de informações relacionadas à saúde e alimentação.

A aplicação permite:
- criar conta
- fazer login
- completar perfil com idade, peso e altura
- calcular IMC automaticamente
- acessar um chat nutricional com IA
- gerar um relatório inicial de apoio ao acompanhamento profissional

O sistema **não substitui nutricionista**, sendo apenas uma ferramenta de apoio inicial.

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
│   ├── .env
│   ├── Dockerfile
│   ├── main.py
│   ├── nutricao.db
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
