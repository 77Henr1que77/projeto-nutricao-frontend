import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CriarConta from "./pages/CriarConta";
import CadastroInicial from "./pages/CadastroInicial";
import ChatNutricional from "./pages/ChatNutricional";
import Relatorio from "./pages/Relatorio";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route path="/cadastro" element={<CadastroInicial />} />
        <Route path="/chat" element={<ChatNutricional />} />
        <Route path="/relatorio" element={<Relatorio />} />
      </Routes>
    </div>
  );
}

export default App;