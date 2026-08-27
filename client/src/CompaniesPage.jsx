import React, { useMemo, useState } from "react";
import {
  Search, Building2, ArrowLeft, ExternalLink, Mail, Phone, User,
  MapPin, FileText, Server, StickyNote, ChevronRight, AlertCircle,
} from "lucide-react";
import { companyLinkTypes } from "./data.js";

const STATUS_LABELS = { ativo: "Ativo", inativo: "Inativo", prospect: "Prospect" };
const STATUS_COLORS = { ativo: "#34d399", inativo: "#94a3b8", prospect: "#f59e0b" };

function initials(name) {
  return name
    .split(/\s+/)
    .filter(w => w.length > 2)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join("");
}

function linkType(id) {
  return companyLinkTypes.find(t => t.id === id) || companyLinkTypes[companyLinkTypes.length - 1];
}

// ─── Card da lista ────────────────────────────────────────────────────────────
function CompanyCard({ company, onOpen }) {
  const color = company.color || "#3c9dff";
  const statusColor = STATUS_COLORS[company.status] || STATUS_COLORS.ativo;
  const docsCount = (company.links || []).filter(l => l.url).length;
  return (
    <button className="companyCard" style={{ "--company-color": color }} onClick={() => onOpen(company)}>
      <div className="companyCardTop">
        <div className="companyAvatar" style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
          {company.logo ? <img src={company.logo} alt={company.name} /> : <span>{initials(company.name)}</span>}
        </div>
        <span className="companyStatus" style={{ color: statusColor, background: `${statusColor}18`, border: `1px solid ${statusColor}30` }}>
          {STATUS_LABELS[company.status] || company.status}
        </span>
      </div>
      <h3 className="companyCardName">{company.name}</h3>
      <p className="companyCardSegment">
        {company.segment}
        {company.city ? ` · ${company.city}` : ""}
      </p>
      {company.summary && <p className="companyCardSummary">{company.summary}</p>}
      <div className="companyCardFoot">
        <span><FileText size={12} /> {docsCount} link{docsCount === 1 ? "" : "s"}</span>
        {company.sharepoint && <span className="companyCardSp">📁 SharePoint</span>}
        <ChevronRight size={16} className="companyCardArrow" />
      </div>
    </button>
  );
}

// ─── Detalhe da empresa ───────────────────────────────────────────────────────
function CompanyDetail({ company, onBack }) {
  const color = company.color || "#3c9dff";
  const statusColor = STATUS_COLORS[company.status] || STATUS_COLORS.ativo;
  const links = (company.links || []).filter(l => l.url);

  const facts = [
    ["CNPJ", company.cnpj],
    ["Segmento", company.segment],
    ["Cliente desde", company.since],
    ["Contrato", company.contract],
    ["Cidade", company.city],
  ].filter(([, v]) => v);

  return (
    <div className="companyDetail" style={{ "--company-color": color }}>
      <button className="companyBack" onClick={onBack}>
        <ArrowLeft size={16} /> Voltar para empresas
      </button>

      <div className="companyDetailHead">
        <div className="companyAvatar companyAvatar--lg" style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
          {company.logo ? <img src={company.logo} alt={company.name} /> : <span>{initials(company.name)}</span>}
        </div>
        <div className="companyDetailHeadBody">
          <div className="companyDetailTitleRow">
            <h1>{company.name}</h1>
            <span className="companyStatus" style={{ color: statusColor, background: `${statusColor}18`, border: `1px solid ${statusColor}30` }}>
              {STATUS_LABELS[company.status] || company.status}
            </span>
          </div>
          {company.city && <p className="companyDetailLocation"><MapPin size={13} /> {company.city}</p>}
          {company.summary && <p className="companyDetailSummary">{company.summary}</p>}
          {company.sharepoint && (
            <a className="companySpBtn" href={company.sharepoint} target="_blank" rel="noopener noreferrer">
              📁 Abrir SharePoint da empresa <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {facts.length > 0 && (
        <div className="companyFacts">
          {facts.map(([label, value]) => (
            <div className="companyFact" key={label}>
              <span className="companyFactLabel">{label}</span>
              <span className="companyFactValue">{value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="companyPanels">
        <section className="companyPanel">
          <h2><FileText size={16} /> Documentos e links</h2>
          {links.length ? (
            <div className="companyLinkList">
              {links.map((l, i) => {
                const t = linkType(l.type);
                return (
                  <a className="companyLink" key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={{ "--link-color": t.color }}>
                    <span className="companyLinkIcon">{t.icon}</span>
                    <span className="companyLinkBody">
                      <strong>{l.label || l.url}</strong>
                      <small>{t.label}</small>
                    </span>
                    <ExternalLink size={14} />
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="companyEmptyText">Nenhum documento cadastrado.</p>
          )}
        </section>

        <section className="companyPanel">
          <h2><User size={16} /> Contatos</h2>
          {(company.contacts || []).length ? (
            <div className="companyContactList">
              {company.contacts.map((c, i) => (
                <div className="companyContact" key={i}>
                  <div className="companyContactHead">
                    <strong>{c.name}</strong>
                    {c.role && <span>{c.role}</span>}
                  </div>
                  {c.email && <a href={`mailto:${c.email}`}><Mail size={13} /> {c.email}</a>}
                  {c.phone && <a href={`tel:${c.phone.replace(/\D/g, "")}`}><Phone size={13} /> {c.phone}</a>}
                </div>
              ))}
            </div>
          ) : (
            <p className="companyEmptyText">Nenhum contato cadastrado.</p>
          )}
        </section>

        <section className="companyPanel">
          <h2><Server size={16} /> Ambiente e infraestrutura</h2>
          {(company.environment || []).length ? (
            <div className="companyEnvList">
              {company.environment.map((e, i) => (
                <div className="companyEnvItem" key={i}>
                  <span className="companyEnvLabel">{e.label}</span>
                  <span className="companyEnvValue">{e.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="companyEmptyText">Nenhuma informação de ambiente cadastrada.</p>
          )}
        </section>

        {company.notes && (
          <section className="companyPanel">
            <h2><StickyNote size={16} /> Observações</h2>
            <p className="companyNotes">{company.notes}</p>
          </section>
        )}
      </div>
    </div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function CompaniesPage({ companies, selectedId, onSelect, onBack }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("todos");

  const selected = useMemo(
    () => companies.find(c => c.id === selectedId) || null,
    [companies, selectedId]
  );

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return companies.filter(c => {
      if (status !== "todos" && (c.status || "ativo") !== status) return false;
      if (!term) return true;
      const hay = [c.name, c.segment, c.city, c.cnpj, c.summary, ...(c.contacts || []).map(ct => ct.name)]
        .filter(Boolean).join(" ").toLowerCase();
      return hay.includes(term);
    });
  }, [companies, q, status]);

  return (
    <div className="companiesPage">
      <header>
        <div className="nav">
          <div className="brand"><img src="/arka-logo.png" alt="Arka Tecnologia" /></div>
          <nav>
            <a href="#/">Portal</a>
            <a href="#/empresas">Empresas</a>
            <a href="#/admin">Painel ADM</a>
          </nav>
        </div>
      </header>

      <main className="container companiesMain">
        {selected ? (
          <CompanyDetail company={selected} onBack={() => onSelect(null)} />
        ) : (
          <>
            <div className="companiesHead">
              <div className="eyebrow">CLIENTES ARKA</div>
              <h1>Empresas</h1>
              <p>
                Documentação, contatos e links do SharePoint de cada cliente, centralizados em um só lugar.
              </p>
              <div className="companiesToolbar">
                <div className="companiesSearch">
                  <Search size={16} />
                  <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder="Buscar por empresa, segmento, CNPJ ou contato..."
                  />
                </div>
                <div className="companiesFilters">
                  {["todos", "ativo", "prospect", "inativo"].map(s => (
                    <button
                      key={s}
                      className={`companiesFilter${status === s ? " active" : ""}`}
                      onClick={() => setStatus(s)}
                    >
                      {s === "todos" ? "Todas" : STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filtered.length ? (
              <div className="companyGrid">
                {filtered.map(c => (
                  <CompanyCard key={c.id} company={c} onOpen={co => onSelect(co.id)} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <AlertCircle />
                <h3>Nenhuma empresa encontrada.</h3>
                <p>Cadastre novas empresas pelo painel administrativo.</p>
                <a className="primary" href="#/admin"><Building2 size={16} /> Ir para o painel</a>
              </div>
            )}
          </>
        )}

        <button className="companiesBackPortal" onClick={onBack}>
          <ArrowLeft size={14} /> Voltar ao portal
        </button>
      </main>
    </div>
  );
}
