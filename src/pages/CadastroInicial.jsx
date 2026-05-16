import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function CadastroInicial() {
  const navigate = useNavigate();

  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [alturaCm, setAlturaCm] = useState("");
  const [erro, setErro] = useState("");

  const continuar = async (e) => {
    e.preventDefault();
    setErro("");

    if (Number(idade) < 16) {
      setErro("A idade mínima é 16 anos.");
      return;
    }

    if (Number(peso) <= 0) {
      setErro("Informe um peso válido.");
      return;
    }

    if (Number(alturaCm) <= 0) {
      setErro("Informe uma altura válida em cm.");
      return;
    }

    const email = localStorage.getItem("emailUsuario") || "";

    if (!email) {
      setErro("Faça login novamente.");
      return;
    }

    try {
      const resposta = await fetch("http://127.0.0.1:8000/completar-perfil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          idade: Number(idade),
          peso: Number(peso),
          altura_cm: Number(alturaCm)
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.detail || "Erro ao completar perfil.");
        return;
      }

      localStorage.setItem("usuarioNutri", JSON.stringify(dados.usuario));
      navigate("/chat");
    } catch {
      setErro("Erro ao conectar com o backend.");
    }
  };

  return (
    <div className="pagina-login-tech">
      <div className="login-overlay">
        <div className="card-login-tech">
          <div className="logo-area-tech">
            <img
              src={logo}
              alt="Obesity Monitoring System"
              className="logo-login-tech"
            />
          </div>

          <span className="tag-login">Complete seu perfil</span>

          <h1>Dados iniciais</h1>
          <p className="subtitulo-login-tech">
            Informe seus dados para calcular o IMC e liberar o acesso completo.
          </p>

          <form onSubmit={continuar} className="formulario-tech">
            <input
              type="number"
              placeholder="Idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Peso (kg)"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Altura (cm)"
              value={alturaCm}
              onChange={(e) => setAlturaCm(e.target.value)}
              required
            />

            {erro && <p style={{ color: "#b91c1c", margin: 0 }}>{erro}</p>}

            <button type="submit">Salvar e continuar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroInicial;