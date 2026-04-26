import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CadastroInicial() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  const continuar = (e) => {
    e.preventDefault();

    const dadosUsuario = {
      nome,
      idade,
      peso,
      altura,
    };

    localStorage.setItem("usuarioNutri", JSON.stringify(dadosUsuario));
    navigate("/chat");
  };

  return (
    <div className="pagina-centralizada">
      <div className="card-form">
        <h1>Cadastro Inicial</h1>
        <p>Preencha seus dados para calcular o IMC</p>

        <form onSubmit={continuar} className="formulario">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
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
            step="0.01"
            placeholder="Altura (m)"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            required
          />
          <button type="submit">Continuar</button>
        </form>
      </div>
    </div>
  );
}

export default CadastroInicial;
