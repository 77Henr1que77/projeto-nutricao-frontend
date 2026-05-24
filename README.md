# Obesity Monitoring System

Sistema web de apoio inicial ao acompanhamento nutricional com uso de inteligência artificial.

## Descrição

O **Obesity Monitoring System** é uma aplicação web desenvolvida como MVP acadêmico para auxiliar no acompanhamento inicial de informações nutricionais.

O sistema permite que o usuário:

- crie uma conta;
- faça login;
- complete o perfil com idade, peso e altura;
- tenha o IMC calculado automaticamente;
- converse com um assistente nutricional com IA;
- gere um relatório inicial de apoio ao acompanhamento profissional.

> O sistema não substitui nutricionista, médico ou qualquer profissional da área da saúde. Ele funciona apenas como uma ferramenta de apoio inicial.

---

## Tecnologias utilizadas

### Frontend

- React
- Vite
- CSS
- React Router DOM

### Backend

- Python
- FastAPI
- Uvicorn

### Banco de dados

- SQLite

### Inteligência Artificial

- Groq API

### Containerização

- Docker
- Docker Compose

---

## Funcionalidades

- Criação de conta
- Login de usuário
- Cadastro de perfil
- Cálculo automático de IMC
- Classificação do IMC
- Chat nutricional com IA
- Histórico de chat separado por usuário
- Relatório nutricional inicial
- Documentação automática da API com Swagger
- Execução com Docker

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
```

---

## Rotas principais da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Verifica se a API está funcionando |
| POST | `/criar-conta` | Cria uma nova conta de usuário |
| POST | `/login` | Realiza o login do usuário |
| POST | `/completar-perfil` | Salva idade, peso e altura do usuário |
| POST | `/pergunta` | Envia uma pergunta para o assistente nutricional com IA |

Documentação automática da API:

```txt
http://127.0.0.1:8000/docs
```

---

## Variáveis de ambiente

Para usar a Groq API, crie um arquivo chamado `.env` dentro da pasta `backend-nutricao`.

Caminho:

```txt
backend-nutricao/.env
```

Conteúdo do arquivo `.env`:

```env
GROQ_API_KEY=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
```

> Obs:Nunca compartilhe sua chave real da API em arquivos públicos, GitHub, prints ou README.

---

## Como executar com Docker

Esta é a forma recomendada de executar o projeto, pois o Docker configura o frontend e o backend automaticamente.

### Requisito

- Docker Desktop instalado e em execução

### Comando

Na raiz do projeto, execute:

```bash
docker compose up --build
```

Após iniciar, acesse:

### Frontend

```txt
http://localhost:5173/
```

### Backend

```txt
http://127.0.0.1:8000/
```

### Swagger

```txt
http://127.0.0.1:8000/docs
```

---

## Como executar localmente

A execução local é opcional, caso o desenvolvedor queira rodar frontend e backend separadamente.

### Requisitos

- Node.js
- Python 3.11 ou superior
- Git

### 1. Clonar o repositório

```bash
git clone https://github.com/77Henr1que77/projeto-nutricao-frontend.git
cd projeto-nutricao-frontend
```

### 2. Rodar o frontend

Na raiz do projeto:

```bash
npm install
npm run dev
```

Frontend disponível em:

```txt
http://localhost:5173/
```

### 3. Rodar o backend

Entre na pasta do backend:

```bash
cd backend-nutricao
```

Crie o ambiente virtual:

```bash
python -m venv venv
```

Ative o ambiente virtual no PowerShell:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Crie o arquivo `.env` dentro da pasta `backend-nutricao`:

```env
GROQ_API_KEY=COLOQUE_SUA_CHAVE_AQUI
```

Execute o backend:

```bash
python -m uvicorn main:app --reload
```

Backend disponível em:

```txt
http://127.0.0.1:8000/
```

---

## Banco de dados

O projeto utiliza **SQLite** como banco de dados local.

O arquivo do banco é criado dentro da pasta do backend com o nome:

```txt
nutricao.db
```

Esse banco armazena dados como:

- usuários cadastrados;
- senha em formato de hash;
- idade;
- peso;
- altura;
- dados do perfil do usuário.

> O `nutricao.db` não é um banco vetorial. Ele é um banco SQLite comum, usado para armazenar dados estruturados.

## Comandos úteis do Docker

Parar os containers:

```bash
docker compose down
```

Subir novamente:

```bash
docker compose up --build
```

Subir em segundo plano:

```bash
docker compose up --build -d
```

Ver containers em execução:

```bash
docker ps
```

Ver logs:

```bash
docker compose logs -f
```

---

## Aviso importante

Este sistema não realiza diagnóstico médico ou nutricional.

As respostas fornecidas pela inteligência artificial são apenas orientativas e não substituem avaliação, prescrição ou acompanhamento feito por nutricionista, médico ou outro profissional de saúde.

O relatório gerado pelo sistema é apenas uma prévia de apoio e deve ser interpretado com cautela.

---

## Autores

- Daniel Shinji Onoue
- Guilherme Henrique Carloni de Carvalho
- Henrique Augusto Forti
- Leonardo De Oliveira Prata
- Ryan Taquita Konda

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos.
