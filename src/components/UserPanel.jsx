import { useNavigate } from "react-router-dom";

function UserPanel({ usuario }) {
  const navigate = useNavigate();

  const peso = parseFloat(usuario?.peso || 0);
  const alturaCm = parseFloat(usuario?.altura_cm || 0);
  const alturaM = alturaCm > 0 ? (alturaCm / 100).toFixed(2) : "-";

  const imc =
    peso > 0 && alturaCm > 0
      ? (peso / ((alturaCm / 100) * (alturaCm / 100))).toFixed(1)
      : "Não calculado";

  return (
    <aside className="painel-usuario">
      <h3>Perfil do Usuário</h3>

      <p><strong>Nome:</strong> {usuario?.nome || "Usuário"}</p>
      <p><strong>Idade:</strong> {usuario?.idade || "-"}</p>
      <p><strong>Peso:</strong> {usuario?.peso || "-"} kg</p>
      <p><strong>Altura:</strong> {alturaM} m</p>
      <p><strong>IMC:</strong> {imc}</p>

      <button
        className="botao-secundario"
        onClick={() => navigate("/relatorio")}
      >
        Gerar relatório
      </button>
    </aside>
  );
}

export default UserPanel;