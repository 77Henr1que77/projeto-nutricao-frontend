import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function CriarConta() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const criarConta = async (e) => {
    e.preventDefault();
    setErro("");

    if (!email.includes("@")) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const resposta = await fetch("http://127.0.0.1:8000/criar-conta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          email,
          senha
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.detail || "Erro ao criar conta.");
        return;
      }

      localStorage.setItem("emailUsuario", email);
      localStorage.setItem("senhaUsuario", senha);

      navigate("/cadastro");
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

          <span className="tag-login">Criar conta</span>

          <h1>Cadastre sua conta</h1>
          <p className="subtitulo-login-tech">
            Crie seu acesso para começar o monitoramento nutricional.
          </p>

          <form onSubmit={criarConta} className="formulario-tech">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            {erro && <p style={{ color: "#b91c1c", margin: 0 }}>{erro}</p>}

            <button type="submit">Criar conta</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CriarConta;