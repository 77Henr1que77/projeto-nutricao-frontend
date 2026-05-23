def validar_email(email: str) -> bool:
    return "@" in email and "." in email


def calcular_imc(peso: float, altura_cm: float) -> float:
    altura_m = altura_cm / 100
    return round(peso / (altura_m * altura_m), 1)