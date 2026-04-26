import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CadastroInicial from "./pages/CadastroInicial";
import ChatNutricional from "./pages/ChatNutricional";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroInicial />} />
        <Route path="/chat" element={<ChatNutricional />} />
      </Routes>
    </div>
  );
}

export default App;