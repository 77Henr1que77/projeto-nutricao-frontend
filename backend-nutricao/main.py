from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.init_db import criar_tabelas
from routes.auth import router as auth_router
from routes.chat import router as chat_router
from routes.home import router as home_router

app = FastAPI(
    title="API de Nutrição",
    description="Backend para sistema de acompanhamento nutricional com IA",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    criar_tabelas()


app.include_router(home_router)
app.include_router(auth_router)
app.include_router(chat_router)