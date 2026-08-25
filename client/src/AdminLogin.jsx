import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import { ADMIN_USER, ADMIN_PASS } from "./data.js";

export default function AdminLogin({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simula uma verificação assíncrona
    setTimeout(() => {
      if (user === ADMIN_USER && pass === ADMIN_PASS) {
        sessionStorage.setItem("arka_admin", "1");
        onLogin();
      } else {
        setError("Usuário ou senha incorretos.");
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div className="adminLoginBg">
      {/* Partículas de fundo */}
      <div className="particles">
        {Array.from({ length: 30 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 53) % 100}%`,
              animationDelay: `-${i % 14}s`,
              animationDuration: `${12 + (i % 8)}s`,
            }}
          />
        ))}
      </div>

      <div className="adminLoginCard">
        {/* Logo / ícone */}
        <div className="adminLoginLogo">
          <img src="/arka-logo.png" alt="Arka Tecnologia" />
        </div>

        <div className="adminLoginHeader">
          <div className="adminLoginIcon">
            <ShieldCheck size={28} />
          </div>
          <h1>Acesso Administrativo</h1>
          <p>Área restrita — somente para administradores autorizados.</p>
        </div>

        <form onSubmit={handleSubmit} className="adminLoginForm">
          <div className="adminLoginField">
            <label>Usuário</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Digite o usuário"
              autoComplete="username"
              required
            />
          </div>

          <div className="adminLoginField">
            <label>Senha</label>
            <div className="adminPassWrap">
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Digite a senha"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="adminPassToggle"
                onClick={() => setShowPass((v) => !v)}
                tabIndex={-1}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="adminLoginError">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <button type="submit" className="adminLoginBtn" disabled={loading}>
            <Lock size={16} />
            {loading ? "Verificando..." : "Entrar no painel"}
          </button>
        </form>

        <a href="#/" className="adminLoginBack">
          ← Voltar ao portal
        </a>
      </div>
    </div>
  );
}
