# Obesity Monitoring System

   Descrição
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

   Tecnologias utilizadas

   Frontend
- React
- Vite
- CSS

    Backend
- Python
- FastAPI

  Banco de dados
- SQLite

   Inteligência Artificial
- Groq API

   Containerização
- Docker
- Docker Compose

---

  Estrutura do projeto


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

Funcionalidades
 criação de conta
 login de usuário
 cadastro de perfil
 cálculo automático de IMC
chat nutricional com IA
histórico de chat separado por usuário
relatório nutricional
documentação automática da API
execução com Docker
