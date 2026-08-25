import React, { useState } from "react";
import {
  Phone, Mail, MapPin, Clock, MessageCircle, ChevronRight,
  Send, Paperclip, CheckCircle2, X, ArrowLeft,
} from "lucide-react";

// ── Ícone WhatsApp (SVG inline pois lucide não tem) ──
function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// ── Partículas reutilizadas ──
function Particles() {
  return (
    <div className="particles">
      {Array.from({ length: 40 }, (_, i) => (
        <i key={i} style={{
          left: `${(i * 53) % 100}%`,
          animationDelay: `-${i % 14}s`,
          animationDuration: `${12 + (i % 8)}s`,
        }} />
      ))}
    </div>
  );
}

// ── Card de canal de contato ──
function ContactCard({ icon, label, value, href, btnLabel, color, description }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="contactCard"
      style={{ "--contact-color": color }}
    >
      <div className="contactCardIcon" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
        {icon}
      </div>
      <div className="contactCardBody">
        <span className="contactCardLabel">{label}</span>
        <strong className="contactCardValue">{value}</strong>
        {description && <span className="contactCardDesc">{description}</span>}
      </div>
      {href && (
        <div className="contactCardBtn" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
          {btnLabel || "Acessar"} <ChevronRight size={14} />
        </div>
      )}
    </a>
  );
}

// ── Horário de atendimento ──
function HoursCard({ hours, hoursExtra }) {
  const days = [
    { day: "Segunda", open: true,  hours: "08h às 18h" },
    { day: "Terça",   open: true,  hours: "08h às 18h" },
    { day: "Quarta",  open: true,  hours: "08h às 18h" },
    { day: "Quinta",  open: true,  hours: "08h às 18h" },
    { day: "Sexta",   open: true,  hours: "08h às 18h" },
    { day: "Sábado",  open: false, hours: "Fechado" },
    { day: "Domingo", open: false, hours: "Fechado" },
  ];
  return (
    <div className="contactHoursCard">
      <div className="contactHoursHeader">
        <div className="contactHoursIcon"><Clock size={20} /></div>
        <div>
          <h3>Horário de atendimento</h3>
          <p>{hours}</p>
          {hoursExtra && <p>{hoursExtra}</p>}
        </div>
      </div>
      <div className="contactHoursDays">
        {days.map(({ day, open, hours }) => (
          <div key={day} className={`contactHoursDay${open ? " open" : " closed"}`}>
            <span>{day}</span>
            <span>{hours}</span>
          </div>
        ))}
      </div>
      <div className="contactOnlineBadge">
        <span className="contactOnlineDot" />
        Suporte remoto disponível
      </div>
    </div>
  );
}

// ── Formulário de contato ──
function ContactForm({ cats, onSuccess }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", subject: "", cat: "", message: ""
  });

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    onSuccess?.();
  }

  if (sent) {
    return (
      <div className="contactFormSuccess">
        <div className="contactFormSuccessIcon"><CheckCircle2 size={40} /></div>
        <h3>Mensagem enviada!</h3>
        <p>Nossa equipe entrará em contato em breve pelo e-mail ou telefone informado.</p>
        <button className="primary" onClick={() => setSent(false)}>
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form className="contactForm" onSubmit={handleSubmit}>
      <div className="contactFormGrid">
        <div className="contactFormField">
          <label>Nome *</label>
          <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Seu nome completo" />
        </div>
        <div className="contactFormField">
          <label>Empresa *</label>
          <input required value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="Nome da empresa" />
        </div>
        <div className="contactFormField">
          <label>E-mail *</label>
          <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="seu@email.com" />
        </div>
        <div className="contactFormField">
          <label>Telefone</label>
          <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="(27) 99999-0000" />
        </div>
        <div className="contactFormField" style={{ gridColumn: "1 / -1" }}>
          <label>Assunto *</label>
          <select required value={form.cat} onChange={e => setForm(p => ({ ...p, cat: e.target.value }))}>
            <option value="">Selecione o assunto</option>
            {cats.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            <option value="Orçamento">💰 Solicitar orçamento</option>
            <option value="Parceria">🤝 Parceria comercial</option>
            <option value="Outro">📝 Outro</option>
          </select>
        </div>
        <div className="contactFormField" style={{ gridColumn: "1 / -1" }}>
          <label>Mensagem *</label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            placeholder="Descreva detalhadamente como podemos ajudar..."
          />
        </div>
      </div>
      <button type="submit" className="primary contactFormSubmit">
        <Send size={16} /> Enviar mensagem
      </button>
    </form>
  );
}

// ── Página principal ──
export default function ContactPage({ siteConfig, cats, onBack, onOpenTicket }) {
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="contactPage">
      <Particles />

      {/* Header simples */}
      <header>
        <div className="nav">
          <div className="brand"><img src="/arka-logo.png" alt="Arka Tecnologia" /></div>
          <nav>
            <a href="#/">Início</a>
            <a href="#/contato" className="navActive">Contato</a>
          </nav>
          <button className="help" onClick={onOpenTicket}>
            <MessageCircle size={17} /> Precisa de ajuda?
          </button>
        </div>
      </header>

      {/* Hero da página */}
      <section className="contactHero">
        <div className="heroGlow" />
        <div className="container contactHeroIn">
          <button className="contactBackBtn" onClick={onBack}>
            <ArrowLeft size={16} /> Voltar ao portal
          </button>
          <div className="eyebrow">FALE COM A ARKA</div>
          <h1>Entre em <em>contato</em></h1>
          <p>Estamos prontos para atender você. Escolha o canal de preferência ou preencha o formulário abaixo.</p>
        </div>
      </section>

      <main className="container contactMain">

        {/* Cards de canal */}
        <div className="contactChannels">
          <ContactCard
            color="#25d366"
            icon={<WhatsAppIcon size={24} />}
            label="WhatsApp"
            value={siteConfig.contactWhatsApp && siteConfig.contactWhatsApp !== "https://wa.me/SEU_LINK_AQUI"
              ? "Chamar no WhatsApp"
              : "Em breve"}
            description="Resposta rápida em horário comercial"
            href={siteConfig.contactWhatsApp && siteConfig.contactWhatsApp !== "https://wa.me/SEU_LINK_AQUI"
              ? siteConfig.contactWhatsApp
              : undefined}
            btnLabel="Abrir chat"
          />
          <ContactCard
            color="#3c9dff"
            icon={<Phone size={22} />}
            label="Telefone"
            value={siteConfig.contactPhone}
            description="Atendimento direto com nossa equipe"
            href={`tel:${siteConfig.contactPhone?.replace(/\D/g,"")}`}
            btnLabel="Ligar agora"
          />
          <ContactCard
            color="#a855f7"
            icon={<Mail size={22} />}
            label="E-mail"
            value={siteConfig.contactEmail}
            description="Para solicitações e documentações"
            href={`mailto:${siteConfig.contactEmail}`}
            btnLabel="Enviar e-mail"
          />
          <ContactCard
            color="#f59e0b"
            icon={<MapPin size={22} />}
            label="Endereço"
            value={siteConfig.contactAddress?.split("\n")[0]}
            description={siteConfig.contactAddress?.split("\n")[1]}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contactAddress || "")}`}
            btnLabel="Ver no mapa"
          />
        </div>

        {/* Grid principal: formulário + horários */}
        <div className="contactGrid">

          {/* Formulário */}
          <div className="contactFormBox">
            <div className="contactBoxHeader">
              <h2>Envie uma mensagem</h2>
              <p>Preencha o formulário e nossa equipe responderá em até 1 dia útil.</p>
            </div>
            <ContactForm cats={cats} onSuccess={() => setFormSent(true)} />
          </div>

          {/* Coluna direita: horários + mapa */}
          <div className="contactSideCol">
            <HoursCard hours={siteConfig.contactHours} hoursExtra={siteConfig.contactHoursExtra} />

            {/* Mapa */}
            <div className="contactMapBox">
              <div className="contactBoxHeader" style={{ marginBottom: 0 }}>
                <h2>Nossa localização</h2>
                <p>{siteConfig.contactAddress}</p>
              </div>
              <div className="contactMapEmbed">
                <iframe
                  src={
                    siteConfig.contactMapEmbed ||
                    `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.contactAddress || "Vila Velha ES")}&output=embed`
                  }
                  title="Localização Arka Tecnologia"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contactAddress || "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contactMapLink"
              >
                <MapPin size={14} /> Abrir no Google Maps
              </a>
            </div>
          </div>
        </div>

      </main>

      <footer>
        <div className="container foot">
          <div>
            <div className="brand"><img src="/arka-logo.png" alt="Arka Tecnologia" /></div>
            <p>{siteConfig.footerAbout}</p>
          </div>
          <div>
            <h4>NAVEGAÇÃO</h4>
            <a href="#/">Portal de apoio</a>
            <a href="#/contato">Contato</a>
          </div>
          <div>
            <h4>CONTATO</h4>
            <p>{siteConfig.contactPhone}</p>
            <p>{siteConfig.contactEmail}</p>
          </div>
        </div>
        <div className="copy">© 2026 Arka Tecnologia. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}
