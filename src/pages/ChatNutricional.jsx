import { useState } from "react";
import UserPanel from "../components/UserPanel";
import logo from "../assets/logo.png";

function ChatNutricional() {
  const usuario = JSON.parse(localStorage.getItem("usuarioNutri")) || {};

  const conversaInicial = JSON.parse(localStorage.getItem("chatNutri")) || [
    {
      autor: "ia",
      texto: "Olá! Sou seu assistente nutricional. Como posso ajudar você hoje?",
    },
    {
      autor: "ia",
      texto: "Posso te ajudar com orientações gerais sobre alimentação e hábitos saudáveis, mas meu apoio não substitui o acompanhamento com uma nutricionista.",
    },
  ];

  const [mensagem, setMensagem] = useState("");
  const [conversa, setConversa] = useState(conversaInicial);
  const [carregando, setCarregando] = useState(false);

  const limparHistorico = () => {
    const conversaPadrao = [
      {
        autor: "ia",
        texto: "Olá! Sou seu assistente nutricional. Como posso ajudar você hoje?",
      },
      {
        autor: "ia",
        texto: "Posso te ajudar com orientações gerais sobre alimentação e hábitos saudáveis, mas meu apoio não substitui o acompanhamento com uma nutricionista.",
      },
    ];

    setConversa(conversaPadrao);
    localStorage.setItem("chatNutri", JSON.stringify(conversaPadrao));
  };

  const enviarMensagem = async (e) => {
    e.preventDefault();

    if (!mensagem.trim()) return;

    const perguntaUsuario = mensagem;

    const conversaComUsuario = [
      ...conversa,
      { autor: "usuario", texto: perguntaUsuario },
    ];

    setConversa(conversaComUsuario);
    localStorage.setItem("chatNutri", JSON.stringify(conversaComUsuario));
    setMensagem("");
    setCarregando(true);

    const historicoFormatado = conversa.map((item) => ({
      role: item.autor === "usuario" ? "user" : "assistant",
      content: item.texto,
    }));

    try {
      const resposta = await fetch("http://127.0.0.1:8000/pergunta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pergunta: perguntaUsuario,
          historico: historicoFormatado,
        }),
      });

      const dados = await resposta.json();

      const novaConversa = [
        ...conversaComUsuario,
        {
          autor: "ia",
          texto:
            dados.resposta ||
            dados.erro ||
            "Não foi possível obter resposta.",
        },
      ];

      setConversa(novaConversa);
      localStorage.setItem("chatNutri", JSON.stringify(novaConversa));
    } catch {
      const novaConversa = [
        ...conversaComUsuario,
        {
          autor: "ia",
          texto: "Erro ao conectar com o backend.",
        },
      ];

      setConversa(novaConversa);
      localStorage.setItem("chatNutri", JSON.stringify(novaConversa));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="layout-chat">
      <UserPanel usuario={usuario} />

      <section className="chat-area">
        <div className="chat-header">
          <div className="chat-brand">
            <img
              src={logo}
              alt="Obesity Monitoring System"
              className="logo-chat"
            />
            <div>
              <span className="chat-tag">Assistente com IA</span>
              <h1>Bate-papo Nutricional</h1>
              <p>Tire dúvidas sobre alimentação e hábitos saudáveis</p>
            </div>
          </div>

          <button
            type="button"
            className="botao-limpar-chat"
            onClick={limparHistorico}
          >
            Limpar histórico
          </button>
        </div>

        <div className="chat-mensagens">
          {conversa.map((item, index) => (
            <div
              key={index}
              className={
                item.autor === "usuario"
                  ? "mensagem mensagem-usuario"
                  : "mensagem mensagem-ia"
              }
            >
              {item.texto}
            </div>
          ))}

          {carregando && (
            <div className="mensagem mensagem-ia">
              Pensando na resposta...
            </div>
          )}
        </div>

        <form onSubmit={enviarMensagem} className="chat-input-area">
          <input
            type="text"
            placeholder="Digite sua pergunta sobre alimentação..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
          <button type="submit">➤</button>
        </form>
      </section>
    </div>
  );
}

export default ChatNutricional;