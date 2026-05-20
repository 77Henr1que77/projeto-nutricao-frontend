import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const entrar = async (e) => {
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

    localStorage.setItem("emailUsuario", email);
    localStorage.setItem("senhaUsuario", senha);

    try {
      const resposta = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.detail || "Erro ao realizar login.");
        return;
      }

      localStorage.setItem("usuarioNutri", JSON.stringify(dados.usuario));

      if (dados.usuario.perfil_completo) {
        navigate("/chat");
      } else {
        navigate("/cadastro");
      }
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

          <span className="tag-login">
            Inteligência artificial aplicada à saúde
          </span>

          <h1>Obesity Monitoring System</h1>
          <p className="subtitulo-login-tech">
            Entre com sua conta para acessar a plataforma.
          </p>

          <form onSubmit={entrar} className="formulario-tech">
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

            <button type="submit">Entrar no sistema</button>
          </form>

        <p className="aviso-login-tech">
  Ainda não tem conta?{" "}
  <button
    type="button"
    className="link-criar-conta"
    onClick={() => navigate("/criar-conta")}
  >
    Criar conta
  </button>
</p>
        </div>
      </div>
    </div>
  );
}

export default Login;