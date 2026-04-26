function UserPanel({ usuario }) {
  const peso = parseFloat(usuario?.peso || 0);
  const altura = parseFloat(usuario?.altura || 0);

  const imc =
    altura > 0 ? (peso / (altura * altura)).toFixed(1) : "Não calculado";

  return (
    <aside className="painel-usuario">
      <h3>Perfil do Usuário</h3>
      <p><strong>Nome:</strong> {usuario?.nome || "Usuário"}</p>
      <p><strong>Idade:</strong> {usuario?.idade || "-"}</p>
      <p><strong>Peso:</strong> {usuario?.peso || "-"} kg</p>
      <p><strong>Altura:</strong> {usuario?.altura || "-"} m</p>
      <p><strong>IMC:</strong> {imc}</p>

      <button className="botao-secundario">Gerar relatório</button>
    </aside>
  );
}

export default UserPanel;