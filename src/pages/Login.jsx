import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const entrar = (e) => {
    e.preventDefault();
    navigate("/cadastro");
  };

  return (
    <div className="pagina-centralizada">
      <div className="card-form">
        <h1>Login</h1>
        <p>Acesse o sistema de nutrição com IA</p>

        <form onSubmit={entrar} className="formulario">
          <input type="text" placeholder="Login ou e-mail" required />
          <input type="password" placeholder="Senha" required />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;