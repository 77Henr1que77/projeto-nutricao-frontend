import { useState } from "react";
import UserPanel from "../components/UserPanel";

function ChatNutricional() {
  const usuario = JSON.parse(localStorage.getItem("usuarioNutri")) || {};

  const [mensagem, setMensagem] = useState("");
  const [conversa, setConversa] = useState([
    {
      autor: "ia",
      texto: "Olá! Sou seu assistente nutricional. Como posso ajudar você hoje?",
    },
  ]);

  const enviarMensagem = (e) => {
    e.preventDefault();

    if (!mensagem.trim()) return;

    const novaConversa = [
      ...conversa,
      { autor: "usuario", texto: mensagem },
      {
        autor: "ia",
        texto: "Essa é uma resposta simulada da IA para a prévia do projeto.",
      },
    ];

    setConversa(novaConversa);
    setMensagem("");
  };

  return (
    <div className="layout-chat">
      <UserPanel usuario={usuario} />

      <section className="chat-area">
        <div className="chat-header">
          <h1>Chat Nutricional</h1>
          <p>Tire dúvidas sobre alimentação e hábitos saudáveis</p>
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
        </div>

        <form onSubmit={enviarMensagem} className="chat-input-area">
          <input
            type="text"
            placeholder="Digite sua pergunta sobre alimentação..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}

export default ChatNutricional;