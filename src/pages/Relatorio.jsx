import { useMemo, useState } from "react";
import logo from "../assets/logo.png";

function Relatorio() {
  const usuario = JSON.parse(localStorage.getItem("usuarioNutri")) || {};

  const [gordura, setGordura] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [atividadeFisica, setAtividadeFisica] = useState("");
  const [habitos, setHabitos] = useState("");
  const [metaPeso, setMetaPeso] = useState("");

  const peso = parseFloat(usuario?.peso || 0);
  const alturaCm = parseFloat(usuario?.altura_cm || 0);
  const alturaM = alturaCm > 0 ? (alturaCm / 100).toFixed(2) : "-";
  const idade = usuario?.idade || "-";
  const nome = usuario?.nome || "Usuário";

  const dataAtual = new Date().toLocaleDateString("pt-BR");

  const imc = useMemo(() => {
    if (!peso || !alturaCm) return "Não calculado";
    return (peso / ((alturaCm / 100) * (alturaCm / 100))).toFixed(1);
  }, [peso, alturaCm]);

  const classificacaoImc = useMemo(() => {
    const valor = parseFloat(imc);
    if (isNaN(valor)) return "-";
    if (valor < 18.5) return "Abaixo do peso";
    if (valor < 25) return "Peso normal";
    if (valor < 30) return "Sobrepeso";
    if (valor < 35) return "Obesidade grau 1";
    if (valor < 40) return "Obesidade grau 2";
    return "Obesidade grau 3";
  }, [imc]);

  const barrasGrafico = [
    {
      label: "IMC",
      valor: Math.min(parseFloat(imc) || 0, 50),
      max: 50,
      texto: imc,
    },
    {
      label: "Gordura corporal %",
      valor: Math.min(parseFloat(gordura) || 0, 60),
      max: 60,
      texto: gordura || "0",
    },
    {
      label: "Peso atual",
      valor: Math.min(peso || 0, 200),
      max: 200,
      texto: usuario?.peso || "0",
    },
    {
      label: "Meta de peso",
      valor: Math.min(parseFloat(metaPeso) || 0, 200),
      max: 200,
      texto: metaPeso || "0",
    },
  ];

  const imprimirRelatorio = () => {
    window.print();
  };

  return (
    <div className="pagina-relatorio">
      <div className="relatorio-box premium">
        <div className="relatorio-topo premium-topo">
          <div className="relatorio-brand">
            <img
              src={logo}
              alt="Obesity Monitoring System"
              className="logo-relatorio"
            />

            <div>
              <p className="relatorio-tag">Avaliação inicial</p>
              <h1>Relatório Nutricional</h1>
              <p className="subtitulo-relatorio">
                Documento de apoio para acompanhamento com nutricionista
              </p>
            </div>
          </div>

          <div className="acoes-topo">
            <div className="data-relatorio">
              <span>Data de emissão</span>
              <strong>{dataAtual}</strong>
            </div>

            <button className="botao-imprimir" onClick={imprimirRelatorio}>
              Imprimir relatório
            </button>
          </div>
        </div>

        <div className="card-relatorio cabecalho-paciente">
          <div>
            <span className="resumo-label">Paciente</span>
            <p>{nome}</p>
          </div>

          <div>
            <span className="resumo-label">Idade</span>
            <p>{idade} anos</p>
          </div>

          <div>
            <span className="resumo-label">Peso atual</span>
            <p>{usuario?.peso || "-"} kg</p>
          </div>

          <div>
            <span className="resumo-label">Altura</span>
            <p>{alturaM} m</p>
          </div>
        </div>

        <div className="relatorio-grid">
          <div className="card-relatorio">
            <h3>Indicadores automáticos</h3>

            <div className="dados-lista">
              <div className="dado-item">
                <span>Nome</span>
                <strong>{nome}</strong>
              </div>

              <div className="dado-item">
                <span>Idade</span>
                <strong>{idade}</strong>
              </div>

              <div className="dado-item">
                <span>Peso</span>
                <strong>{usuario?.peso || "-"} kg</strong>
              </div>

              <div className="dado-item">
                <span>Altura</span>
                <strong>{alturaM} m</strong>
              </div>

              <div className="dado-item">
                <span>IMC</span>
                <strong>{imc}</strong>
              </div>

              <div className="dado-item">
                <span>Classificação</span>
                <strong className="badge-classificacao">{classificacaoImc}</strong>
              </div>
            </div>
          </div>

          <div className="card-relatorio">
            <h3>Informações complementares</h3>

            <label>% de gordura corporal</label>
            <input
              type="number"
              placeholder="Ex: 28"
              value={gordura}
              onChange={(e) => setGordura(e.target.value)}
            />

            <label>Objetivo principal</label>
            <input
              type="text"
              placeholder="Ex: emagrecimento"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
            />

            <label>Meta de peso</label>
            <input
              type="number"
              placeholder="Ex: 85"
              value={metaPeso}
              onChange={(e) => setMetaPeso(e.target.value)}
            />

            <label>Nível de atividade física</label>
            <select
              value={atividadeFisica}
              onChange={(e) => setAtividadeFisica(e.target.value)}
            >
              <option value="">Selecione uma opção</option>
              <option value="Leve">Leve</option>
              <option value="Moderado">Moderado</option>
              <option value="Intenso">Intenso</option>
            </select>
          </div>
        </div>

        <div className="relatorio-grid">
          <div className="card-relatorio">
            <h3>Hábitos alimentares</h3>
            <textarea
              rows="6"
              placeholder="Ex: costuma pular café da manhã, come fora com frequência, sente fome à noite..."
              value={habitos}
              onChange={(e) => setHabitos(e.target.value)}
            />
          </div>

          <div className="card-relatorio">
            <h3>Observações</h3>
            <textarea
              rows="6"
              placeholder="Ex: dificuldade em controlar doces, ansiedade, baixa ingestão de água..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </div>
        </div>

        <div className="card-relatorio destaque-card">
          <h3>Resumo para avaliação profissional</h3>

          <div className="resumo-grid">
            <div>
              <span className="resumo-label">Objetivo</span>
              <p>{objetivo || "Não informado"}</p>
            </div>

            <div>
              <span className="resumo-label">% de gordura corporal</span>
              <p>{gordura ? `${gordura}%` : "Não informado"}</p>
            </div>

            <div>
              <span className="resumo-label">Meta de peso</span>
              <p>{metaPeso ? `${metaPeso} kg` : "Não informado"}</p>
            </div>

            <div>
              <span className="resumo-label">Atividade física</span>
              <p>{atividadeFisica || "Não informado"}</p>
            </div>

            <div className="resumo-linha-inteira">
              <span className="resumo-label">Hábitos alimentares</span>
              <p>{habitos || "Sem informações registradas."}</p>
            </div>

            <div className="resumo-linha-inteira">
              <span className="resumo-label">Observações</span>
              <p>{observacoes || "Sem observações registradas."}</p>
            </div>
          </div>
        </div>

        <div className="card-relatorio">
          <h3>Indicadores visuais</h3>

          {barrasGrafico.map((item, index) => (
            <div className="grafico-item" key={index}>
              <div className="grafico-info">
                <span>{item.label}</span>
                <span>{item.texto}</span>
              </div>

              <div className="grafico-fundo">
                <div
                  className="grafico-barra"
                  style={{ width: `${(item.valor / item.max) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="observacao-final">
          <strong>Observação importante:</strong> este relatório é apenas uma
          prévia inicial com base nos dados informados pelo usuário e serve como
          apoio para avaliação profissional. Não substitui consulta, diagnóstico
          ou acompanhamento com nutricionista.
        </div>

        <div className="assinatura-area">
          <div className="assinatura-box">
            <div className="linha-assinatura"></div>
            <p>Assinatura do paciente</p>
          </div>

          <div className="assinatura-box">
            <div className="linha-assinatura"></div>
            <p>Nutricionista / responsável pela avaliação</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Relatorio;