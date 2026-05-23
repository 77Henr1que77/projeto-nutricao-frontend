import hashlib


def hash_senha(senha: str) -> str:
    return hashlib.sha256(senha.encode()).hexdigest()