import React, { useState, useRef } from "react";
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  Video,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  Tag,
  CheckCircle2,
  AlertCircle,
  Eye,
  RotateCcw,
  Play,
  Sparkles,
  Loader,
  Link,
  Megaphone,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

// ─── helpers ──────────────────────────────────────
function Toast({ msg, type, onClose }) {
  return (
    <div className={`adminToast adminToast--${type}`}>
      {type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      {msg}
      <button onClick={onClose}>
        <X size={14} />
      </button>
    </div>
  );
}

function useToast() {
  const [toast, setToast] = useState(null);
  const show = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };
  return { toast, show };
}

// ─── Dashboard ────────────────────────────────────
function Dashboard({ cats, articles, videos, onReset }) {
  const stats = [
    { label: "Categorias", value: cats.length, icon: <FolderOpen size={22} />, color: "#3c9dff" },
    { label: "Artigos", value: articles.length, icon: <BookOpen size={22} />, color: "#a855f7" },
    { label: "Vídeos", value: videos.length, icon: <Video size={22} />, color: "#22d3ee" },
    {
      label: "Tags únicas",
      value: [...new Set(articles.flatMap((a) => a.tags || []))].length,
      icon: <Tag size={22} />,
      color: "#34d399",
    },
  ];

  return (
    <div className="adminSection">
      <h2 className="adminSectionTitle">Dashboard</h2>
      <div className="adminStatsGrid">
        {stats.map((s) => (
          <div className="adminStatCard" key={s.label} style={{ "--stat-color": s.color }}>
            <div className="adminStatIcon">{s.icon}</div>
            <div>
              <div className="adminStatValue">{s.value}</div>
              <div className="adminStatLabel">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="adminSubtitle">Artigos por categoria</h3>
      <div className="adminBarList">
        {cats.map((c) => {
          const count = articles.filter((a) => a.cat === c.id).length;
          const pct = articles.length ? Math.round((count / articles.length) * 100) : 0;
          return (
            <div key={c.id} className="adminBarItem">
              <span className="adminBarLabel">
                {c.icon} {c.label}
              </span>
              <div className="adminBarTrack">
                <div
                  className="adminBarFill"
                  style={{ width: `${pct}%`, background: c.color }}
                />
              </div>
              <span className="adminBarCount">{count}</span>
            </div>
          );
        })}
      </div>

      <div className="adminResetBox">
        <div>
          <p className="adminResetTitle">Resetar conteúdo</p>
          <p className="adminResetDesc">Apaga todas as alterações e restaura os dados originais do portal.</p>
        </div>
        <button
          className="adminBtnDanger"
          onClick={() => {
            if (confirm("Tem certeza? Todas as edições serão perdidas e os dados voltarão ao padrão original.")) {
              onReset();
            }
          }}
        >
          <RotateCcw size={14} /> Restaurar padrão
        </button>
      </div>
    </div>
  );
}

// ─── SiteConfig ───────────────────────────────────
function SiteConfigEditor({ config, onChange, toast }) {
  const [local, setLocal] = useState({ ...config });
  const [examplesStr, setExamplesStr] = useState(config.heroExamples.join(", "));

  function save() {
    const parsed = { ...local, heroExamples: examplesStr.split(",").map((s) => s.trim()).filter(Boolean) };
    onChange(parsed);
    toast.show("Configurações salvas!");
  }

  const field = (label, key, multiline = false) => (
    <div className="adminField" key={key}>
      <label>{label}</label>
      {multiline ? (
        <textarea
          value={local[key] || ""}
          onChange={(e) => setLocal((p) => ({ ...p, [key]: e.target.value }))}
          rows={3}
        />
      ) : (
        <input
          value={local[key] || ""}
          onChange={(e) => setLocal((p) => ({ ...p, [key]: e.target.value }))}
        />
      )}
    </div>
  );

  return (
    <div className="adminSection">
      <h2 className="adminSectionTitle">Configurações do site</h2>
      <div className="adminFieldGrid">
        {field("Título do hero (parte 1)", "heroTitle")}
        {field("Título do hero (destaque)", "heroTitleEm")}
        {field("Subtítulo do hero", "heroSubtitle", true)}
        <div className="adminField">
          <label>Exemplos de pesquisa (separados por vírgula)</label>
          <input
            value={examplesStr}
            onChange={(e) => setExamplesStr(e.target.value)}
          />
        </div>
        {field("Telefone de contato", "contactPhone")}
        {field("Link do WhatsApp (https://wa.me/...)", "contactWhatsApp")}
        {field("E-mail de contato", "contactEmail")}
        {field("Endereço", "contactAddress", true)}
        {field("URL do mapa (Google Maps embed)", "contactMapEmbed")}
        {field("Horário de atendimento", "contactHours")}
        {field("Horário extra (opcional)", "contactHoursExtra")}
        {field("Texto sobre a empresa (rodapé)", "footerAbout", true)}
      </div>
      <button className="adminBtnPrimary" onClick={save}>
        <Save size={15} /> Salvar configurações
      </button>
    </div>
  );
}

// ─── CategoriesEditor ─────────────────────────────
function CategoriesEditor({ cats, onChange, toast }) {
  const [editing, setEditing] = useState(null); // índice ou "new"
  const [form, setForm] = useState({});

  function startEdit(i) {
    setEditing(i);
    setForm(i === "new" ? { id: "", label: "", desc: "", icon: "", color: "#3c9dff" } : { ...cats[i] });
  }

  function save() {
    if (!form.id || !form.label) return toast.show("ID e nome são obrigatórios.", "error");
    let next;
    if (editing === "new") {
      if (cats.find((c) => c.id === form.id)) return toast.show("ID já existe.", "error");
      next = [...cats, form];
    } else {
      next = cats.map((c, i) => (i === editing ? form : c));
    }
    onChange(next);
    setEditing(null);
    toast.show("Categoria salva!");
  }

  function remove(i) {
    if (!confirm(`Remover a categoria "${cats[i].label}"?`)) return;
    onChange(cats.filter((_, idx) => idx !== i));
    toast.show("Categoria removida.");
  }

  return (
    <div className="adminSection">
      <div className="adminSectionHeader">
        <h2 className="adminSectionTitle">Categorias</h2>
        <button className="adminBtnPrimary" onClick={() => startEdit("new")}>
          <Plus size={15} /> Nova categoria
        </button>
      </div>

      <div className="adminTable">
        <div className="adminTableHead">
          <span>Ícone</span>
          <span>ID / Nome</span>
          <span>Descrição</span>
          <span>Cor</span>
          <span>Ações</span>
        </div>
        {cats.map((c, i) => (
          <div className="adminTableRow" key={c.id}>
            <span className="adminCatIcon">{c.icon}</span>
            <span>
              <b>{c.label}</b>
              <br />
              <small>{c.id}</small>
            </span>
            <span className="adminMuted">{c.desc}</span>
            <span>
              <span className="adminColorDot" style={{ background: c.color }} />
              <small>{c.color}</small>
            </span>
            <span className="adminActions">
              <button onClick={() => startEdit(i)} title="Editar">
                <Pencil size={14} />
              </button>
              <button onClick={() => remove(i)} title="Remover" className="adminDanger">
                <Trash2 size={14} />
              </button>
            </span>
          </div>
        ))}
      </div>

      {editing !== null && (
        <div className="adminModal">
          <div className="adminModalBox">
            <div className="adminModalHeader">
              <h3>{editing === "new" ? "Nova categoria" : "Editar categoria"}</h3>
              <button onClick={() => setEditing(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="adminFieldGrid">
              <div className="adminField">
                <label>ID (único, sem espaços)</label>
                <input
                  value={form.id || ""}
                  onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))}
                  disabled={editing !== "new"}
                />
              </div>
              <div className="adminField">
                <label>Nome</label>
                <input
                  value={form.label || ""}
                  onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
                />
              </div>
              <div className="adminField" style={{ gridColumn: "1 / -1" }}>
                <label>Descrição</label>
                <input
                  value={form.desc || ""}
                  onChange={(e) => setForm((p) => ({ ...p, desc: e.target.value }))}
                />
              </div>
              <div className="adminField">
                <label>Ícone (emoji)</label>
                <input
                  value={form.icon || ""}
                  onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
                />
              </div>
              <div className="adminField">
                <label>Cor (hex)</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="color"
                    value={form.color || "#3c9dff"}
                    onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
                    style={{ width: 44, padding: 2, height: 40 }}
                  />
                  <input
                    value={form.color || ""}
                    onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <div className="adminModalFooter">
              <button className="adminBtnSecondary" onClick={() => setEditing(null)}>
                Cancelar
              </button>
              <button className="adminBtnPrimary" onClick={save}>
                <Save size={14} /> Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Utilitários YouTube ──────────────────────────
function extractYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?.*v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /^([A-Za-z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function buildIframeHtml(ytId, title) {
  return `<div class="articleVideo">
  <iframe src="https://www.youtube.com/embed/${ytId}" title="${title || "Vídeo tutorial"}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>`;
}

// ─── Gerador de conteúdo inteligente ─────────────
function generateContent(title, cat, ytId) {
  const catMap = {
    "Impressoras": { verb: "configurar ou solucionar problemas", tip: "Verifique se o driver está instalado corretamente antes de iniciar." },
    "Computadores": { verb: "diagnosticar e resolver", tip: "Reiniciar o computador resolve boa parte dos problemas comuns." },
    "Rede e Internet": { verb: "configurar e diagnosticar", tip: "Anote o IP e o resultado do ping ao abrir um chamado." },
    "E-mail": { verb: "configurar e usar", tip: "Mantenha o Outlook atualizado para evitar falhas de sincronização." },
    "Segurança": { verb: "verificar e aplicar", tip: "Nunca desative o antivírus por conta própria." },
    "Microsoft 365": { verb: "acessar e configurar", tip: "Use sempre o e-mail corporativo para acessar os serviços M365." },
    "Servidores": { verb: "administrar e manter", tip: "Documente qualquer alteração realizada no servidor." },
    "Nobreaks": { verb: "instalar e manter", tip: "Verifique o nível de carga e o estado da bateria periodicamente." },
    "Sistemas e Aplicativos": { verb: "instalar e configurar", tip: "Feche todos os programas antes de iniciar uma instalação." },
  };

  const info = catMap[cat] || { verb: "utilizar corretamente", tip: "Consulte o suporte Arka em caso de dúvidas." };
  const titleLower = title.toLowerCase();
  const isTroca = /troc|substitu|repor/.test(titleLower);
  const isConfig = /configur|instala|conect/.test(titleLower);
  const isReset = /reset|reinici|zerar/.test(titleLower);
  const isDiag = /lento|problem|erro|falh|não funciona|não imprime/.test(titleLower);

  let intro = `<h3>Sobre este procedimento</h3>\n<p>Este artigo explica como ${info.verb} relacionado a: <b>${title}</b>.</p>`;

  if (isTroca) intro = `<h3>Quando realizar este procedimento?</h3>\n<p>Realize a troca apenas quando o equipamento apresentar alertas ou redução visível de desempenho. Certifique-se de ter o componente correto em mãos antes de iniciar.</p>`;
  if (isConfig) intro = `<h3>Pré-requisitos</h3>\n<p>Antes de iniciar, verifique se você tem as permissões necessárias e os dados de acesso (usuário, senha, IP) disponíveis.</p>`;
  if (isReset) intro = `<h3>Quando fazer o reset?</h3>\n<p>Realize este procedimento somente quando indicado — geralmente após a troca de um componente ou quando o equipamento não reconhece uma atualização.</p>`;
  if (isDiag) intro = `<h3>Diagnóstico inicial</h3>\n<p>Antes de avançar, verifique os itens básicos: cabos, conexão de rede, energia e se o problema ocorre em outros equipamentos também.</p>`;

  const videoBlock = ytId ? `\n<h3>Assista ao tutorial em vídeo</h3>\n${buildIframeHtml(ytId, title)}\n` : "";

  const steps = `<h3>Passo a passo</h3>
<ol>
<li>Verifique as condições iniciais do equipamento ou sistema.</li>
<li>Siga as instruções na tela ou no painel do equipamento conforme indicado.</li>
<li>Aguarde a conclusão do processo antes de fechar ou desligar.</li>
<li>Confirme que o procedimento foi concluído com sucesso.</li>
</ol>`;

  const tip = `\n<div class="tip">💡 ${info.tip} Se o problema persistir, entre em contato com o suporte Arka.</div>`;

  return `${intro}${videoBlock}\n${steps}${tip}`;
}

function generateSummary(title, cat) {
  const catMap = {
    "Impressoras": "Resolva problemas de impressão com este guia passo a passo.",
    "Computadores": "Diagnóstico e solução rápida para este problema no Windows.",
    "Rede e Internet": "Verifique a conectividade e corrija a configuração de rede.",
    "E-mail": "Configure e use o e-mail corporativo corretamente.",
    "Segurança": "Mantenha o equipamento protegido seguindo estas orientações.",
    "Microsoft 365": "Acesse e configure os serviços Microsoft 365 da empresa.",
    "Servidores": "Procedimento para administração e manutenção de servidores.",
    "Nobreaks": "Instalação, configuração e manutenção do nobreak.",
    "Sistemas e Aplicativos": "Instale e configure o aplicativo corretamente.",
  };
  const base = catMap[cat] || "Siga este guia para resolver o problema.";
  // personaliza com palavras-chave do título
  if (/reset|reinici/.test(title.toLowerCase())) return `Passo a passo para resetar o contador após a troca. ${base}`;
  if (/troc|substitu/.test(title.toLowerCase())) return `Tutorial completo de substituição do componente. ${base}`;
  if (/configur|instala/.test(title.toLowerCase())) return `Guia de instalação e configuração. ${base}`;
  if (/lento|devagar/.test(title.toLowerCase())) return `Identifique e corrija a causa da lentidão. ${base}`;
  return base;
}

function generateTags(title, cat) {
  const base = [cat.toLowerCase().replace(/\s+/g, "-")];
  const words = title.toLowerCase().split(/\s+/);
  const keywords = ["reset", "driver", "rede", "ip", "wi-fi", "senha", "outlook", "toner",
    "cilindro", "bateria", "nobreak", "ups", "windows", "instalação", "configuração",
    "spooler", "fila", "vpn", "onedrive", "teams", "bitdefender", "servidor"];
  keywords.forEach((k) => { if (words.some((w) => w.includes(k))) base.push(k); });
  // pega substantivos relevantes do título (palavras com 4+ letras)
  words.filter((w) => w.length >= 4 && !["como", "para", "uma", "esse", "este", "após"].includes(w))
    .slice(0, 3).forEach((w) => { if (!base.includes(w)) base.push(w); });
  return [...new Set(base)].slice(0, 6).join(", ");
}

// ─── ArticlesEditor ───────────────────────────────
function ArticlesEditor({ articles, cats, onChange, toast }) {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [tagsStr, setTagsStr] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [ytUrl, setYtUrl] = useState("");
  const [generating, setGenerating] = useState(false);
  const fileInputRef = useRef(null);

  const filtered = articles.filter((a) => {
    const matchCat = !filterCat || a.cat === filterCat;
    const matchQ =
      !search ||
      `${a.title} ${a.summary} ${a.cat}`.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  function startEdit(i) {
    const art = i === "new"
      ? { cat: cats[0]?.id || "", title: "", summary: "", time: "3 min", tags: [], content: "" }
      : { ...articles[i] };
    setEditing(i);
    setForm(art);
    setTagsStr((art.tags || []).join(", "));
    setYtUrl("");
  }

  // Insere o iframe do YouTube no conteúdo quando URL é colada
  function handleYtUrl(url) {
    setYtUrl(url);
    const ytId = extractYouTubeId(url.trim());
    if (!ytId) return;
    const iframe = buildIframeHtml(ytId, form.title || "Vídeo tutorial");
    // insere antes do conteúdo existente se já tiver algo, senão substitui
    setForm((p) => ({
      ...p,
      content: p.content
        ? p.content.includes("articleVideo")
          // substitui iframe existente
          ? p.content.replace(/<div class="articleVideo">[\s\S]*?<\/div>/, iframe)
          // adiciona no início
          : `<h3>Assista ao tutorial em vídeo</h3>\n${iframe}\n\n${p.content}`
        : `<h3>Assista ao tutorial em vídeo</h3>\n${iframe}`,
    }));
    toast.show("Vídeo inserido no conteúdo!");
  }

  // Converte imagem selecionada em base64 e insere no conteúdo
  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      toast.show("Imagem muito grande (máx. 3MB).", "error");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const imgTag = `<img src="${reader.result}" alt="${file.name}" style="max-width:100%;border-radius:8px;margin:12px 0;" />\n`;
      setForm((p) => ({ ...p, content: (p.content || "") + "\n" + imgTag }));
      toast.show("Imagem inserida no conteúdo!");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }
  

  function handleGenerate() {
    if (!form.title) return toast.show("Preencha o título antes de gerar.", "error");
    setGenerating(true);
    // simula um leve delay para feedback visual
    setTimeout(() => {
      const ytId = extractYouTubeId(ytUrl.trim()) || extractYouTubeId(form.content || "");
      const content = generateContent(form.title, form.cat, ytId);
      const summary = generateSummary(form.title, form.cat);
      const tags = generateTags(form.title, form.cat);
      setForm((p) => ({ ...p, summary, content }));
      setTagsStr(tags);
      setGenerating(false);
      toast.show("Conteúdo gerado com sucesso!");
    }, 700);
  }

  function save() {
    if (!form.title || !form.cat) return toast.show("Categoria e título são obrigatórios.", "error");
    const art = { ...form, tags: tagsStr.split(",").map((t) => t.trim()).filter(Boolean) };
    let next;
    if (editing === "new") {
      next = [...articles, art];
    } else {
      next = articles.map((a, i) => (i === editing ? art : a));
    }
    onChange(next);
    setEditing(null);
    toast.show("Artigo salvo!");
  }

  function remove(i) {
    if (!confirm(`Remover o artigo "${articles[i].title}"?`)) return;
    onChange(articles.filter((_, idx) => idx !== i));
    toast.show("Artigo removido.");
  }

  function moveUp(i) {
    if (i === 0) return;
    const next = [...articles];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    onChange(next);
  }

  function moveDown(i) {
    if (i === articles.length - 1) return;
    const next = [...articles];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    onChange(next);
  }

  return (
    <div className="adminSection">
      <div className="adminSectionHeader">
        <h2 className="adminSectionTitle">Artigos ({articles.length})</h2>
        <button className="adminBtnPrimary" onClick={() => startEdit("new")}>
          <Plus size={15} /> Novo artigo
        </button>
      </div>

      <div className="adminFilters">
        <input
          placeholder="Buscar artigo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
          <option value="">Todas as categorias</option>
          {cats.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon} {c.label}
            </option>
          ))}
        </select>
        <span className="adminMuted">{filtered.length} resultado(s)</span>
      </div>

      <div className="adminArticleList">
        {filtered.map((a) => {
          const realIdx = articles.indexOf(a);
          const isOpen = expanded === realIdx;
          const cat = cats.find((c) => c.id === a.cat);
          return (
            <div className={`adminArticleItem${isOpen ? " open" : ""}`} key={realIdx}>
              <div className="adminArticleRow" onClick={() => setExpanded(isOpen ? null : realIdx)}>
                <span className="adminArticleCat" style={{ color: cat?.color, background: `${cat?.color}18` }}>
                  {cat?.icon} {a.cat}
                  {a.model && <> · {a.model}</>}
                </span>
                <span className="adminArticleTitle">{a.title}</span>
                <span className="adminMuted" style={{ fontSize: 12 }}>{a.time}</span>
                <div className="adminArticleActions" onClick={(e) => e.stopPropagation()}>
                  <button title="Mover para cima" onClick={() => moveUp(realIdx)}>
                    <ChevronUp size={14} />
                  </button>
                  <button title="Mover para baixo" onClick={() => moveDown(realIdx)}>
                    <ChevronDown size={14} />
                  </button>
                  <button title="Editar" onClick={() => startEdit(realIdx)}>
                    <Pencil size={14} />
                  </button>
                  <button title="Remover" className="adminDanger" onClick={() => remove(realIdx)}>
                    <Trash2 size={14} />
                  </button>
                </div>
                {isOpen ? <ChevronUp size={15} className="adminArticleChevron" /> : <ChevronDown size={15} className="adminArticleChevron" />}
              </div>
              {isOpen && (
                <div className="adminArticlePreview">
                  <p><b>Resumo:</b> {a.summary}</p>
                  <p><b>Tags:</b> {(a.tags || []).join(", ") || "—"}</p>
                  <details>
                    <summary style={{ cursor: "pointer", color: "#57dfff", fontSize: 13 }}>
                      <Eye size={13} style={{ marginRight: 4 }} /> Ver HTML do conteúdo
                    </summary>
                    <pre className="adminPre">{a.content}</pre>
                  </details>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="adminEmpty">
            <AlertCircle size={28} />
            <p>Nenhum artigo encontrado.</p>
          </div>
        )}
      </div>

      {editing !== null && (
        <div className="adminModal">
          <div className="adminModalBox adminModalLarge">
            <div className="adminModalHeader">
              <h3>{editing === "new" ? "Novo artigo" : "Editar artigo"}</h3>
              <button onClick={() => setEditing(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="adminFieldGrid">
              <div className="adminField">
                <label>Categoria</label>
                <select
                  value={form.cat || ""}
                  onChange={(e) => setForm((p) => ({ ...p, cat: e.target.value }))}
                >
                  {cats.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="adminField">
                <label>Modelo (opcional)</label>
                <input
                  value={form.model || ""}
                  onChange={(e) => setForm((p) => ({ ...p, model: e.target.value || undefined }))}
                  placeholder="Ex: DCP-L2540DW"
                />
              </div>
              <div className="adminField" style={{ gridColumn: "1 / -1" }}>
                <label>Título</label>
                <input
                  value={form.title || ""}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                />
              </div>

              {/* ── Campo YouTube ── */}
              <div className="adminField" style={{ gridColumn: "1 / -1" }}>
                <label>
                  <Link size={13} style={{ display:"inline", marginRight:5, verticalAlign:"middle" }} />
                  URL do vídeo YouTube (cole aqui para inserir no artigo)
                </label>
                <div className="adminYtInputWrap">
                  <input
                    value={ytUrl}
                    onChange={(e) => setYtUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="adminYtInput"
                  />
                  <button
                    type="button"
                    className="adminYtBtn"
                    onClick={() => handleYtUrl(ytUrl)}
                    disabled={!ytUrl.trim()}
                    title="Inserir vídeo no conteúdo"
                  >
                    <Play size={14} fill="currentColor" /> Inserir vídeo
                  </button>
                </div>
                {ytUrl && extractYouTubeId(ytUrl.trim()) && (
                  <div className="adminYtPreview">
                    <img
                      src={`https://img.youtube.com/vi/${extractYouTubeId(ytUrl.trim())}/hqdefault.jpg`}
                      alt="preview"
                    />
                    <span>ID: {extractYouTubeId(ytUrl.trim())}</span>
                  </div>
                )}
                {ytUrl && !extractYouTubeId(ytUrl.trim()) && (
                  <span className="adminYtError"><AlertCircle size={12} /> URL inválida — verifique o link do YouTube</span>
                )}
              </div>

              <div className="adminField" style={{ gridColumn: "1 / -1" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                  <label style={{ margin:0 }}>Resumo</label>
                  <button
                    type="button"
                    className="adminGenBtn"
                    onClick={handleGenerate}
                    disabled={generating || !form.title}
                    title="Gerar resumo, tags e conteúdo automaticamente com base no título e categoria"
                  >
                    {generating
                      ? <><Loader size={13} className="adminSpinner" /> Gerando...</>
                      : <><Sparkles size={13} /> Gerar descrição</>
                    }
                  </button>
                </div>
                <input
                  value={form.summary || ""}
                  onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))}
                  placeholder="Breve descrição do artigo..."
                />
              </div>

              <div className="adminField">
                <label>Tempo de leitura</label>
                <input
                  value={form.time || ""}
                  onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                  placeholder="Ex: 5 min"
                />
              </div>
              <div className="adminField">
                <label>Tags (separadas por vírgula)</label>
                <input
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="driver, fila, IPP"
                />
              </div>
              <div className="adminField" style={{ gridColumn: "1 / -1" }}>
                <label>Conteúdo (HTML)</label>
                <textarea
                  value={form.content || ""}
                  onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                  rows={14}
                  style={{ fontFamily: "monospace", fontSize: 13 }}
                />
              </div>
            </div>

            <div className="adminModalFooter">
              <button className="adminBtnSecondary" onClick={() => setEditing(null)}>
                Cancelar
              </button>
              <button className="adminBtnPrimary" onClick={save}>
                <Save size={14} /> Salvar artigo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── VideosEditor ─────────────────────────────────
function VideosEditor({ videos, cats, onChange, toast }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  function startEdit(i) {
    setEditing(i);
    setForm(
      i === "new"
        ? { title: "", cat: cats[0]?.id || "", duration: "", thumb: "", ytId: "" }
        : { ...videos[i] }
    );
  }

  function save() {
    if (!form.title || !form.cat) return toast.show("Categoria e título são obrigatórios.", "error");
    let next;
    if (editing === "new") {
      next = [...videos, form];
    } else {
      next = videos.map((v, i) => (i === editing ? form : v));
    }
    onChange(next);
    setEditing(null);
    toast.show("Vídeo salvo!");
  }

  function remove(i) {
    if (!confirm(`Remover o vídeo "${videos[i].title}"?`)) return;
    onChange(videos.filter((_, idx) => idx !== i));
    toast.show("Vídeo removido.");
  }

  return (
    <div className="adminSection">
      <div className="adminSectionHeader">
        <h2 className="adminSectionTitle">Vídeos ({videos.length})</h2>
        <button className="adminBtnPrimary" onClick={() => startEdit("new")}>
          <Plus size={15} /> Novo vídeo
        </button>
      </div>

      <div className="adminVideoGrid">
        {videos.map((v, i) => {
          const cat = cats.find((c) => c.id === v.cat);
          return (
            <div className="adminVideoCard" key={i}>
              <div className="adminVideoThumb">
                {v.thumb ? (
                  <img src={v.thumb} alt={v.title} />
                ) : (
                  <div className="adminVideoThumbEmpty">
                    <Video size={32} />
                  </div>
                )}
                {v.ytId && (
                  <span className="adminVideoYtBadge">YT</span>
                )}
              </div>
              <div className="adminVideoInfo">
                <span className="adminVideoCat" style={{ color: cat?.color }}>
                  {cat?.icon} {v.cat}
                </span>
                <p>{v.title}</p>
                {v.duration && <small>{v.duration}</small>}
              </div>
              <div className="adminVideoActions">
                <button onClick={() => startEdit(i)} title="Editar">
                  <Pencil size={14} />
                </button>
                <button onClick={() => remove(i)} title="Remover" className="adminDanger">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
        {videos.length === 0 && (
          <div className="adminEmpty">
            <Video size={28} />
            <p>Nenhum vídeo cadastrado.</p>
          </div>
        )}
      </div>

      {editing !== null && (
        <div className="adminModal">
          <div className="adminModalBox">
            <div className="adminModalHeader">
              <h3>{editing === "new" ? "Novo vídeo" : "Editar vídeo"}</h3>
              <button onClick={() => setEditing(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="adminFieldGrid">
              <div className="adminField" style={{ gridColumn: "1 / -1" }}>
                <label>Título</label>
                <input
                  value={form.title || ""}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                />
              </div>
              <div className="adminField">
                <label>Categoria</label>
                <select
                  value={form.cat || ""}
                  onChange={(e) => setForm((p) => ({ ...p, cat: e.target.value }))}
                >
                  {cats.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="adminField">
                <label>Duração (ex: 4:30)</label>
                <input
                  value={form.duration || ""}
                  onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))}
                  placeholder="Ex: 4:30"
                />
              </div>
              <div className="adminField" style={{ gridColumn: "1 / -1" }}>
                <label>URL da thumbnail</label>
                <input
                  value={form.thumb || ""}
                  onChange={(e) => setForm((p) => ({ ...p, thumb: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
              <div className="adminField" style={{ gridColumn: "1 / -1" }}>
                <label>ID do YouTube (apenas o código, ex: dQw4w9WgXcQ)</label>
                <input
                  value={form.ytId || ""}
                  onChange={(e) => setForm((p) => ({ ...p, ytId: e.target.value }))}
                  placeholder="Deixe vazio se não tiver vídeo"
                />
              </div>
              {form.ytId && (
                <div className="adminField" style={{ gridColumn: "1 / -1" }}>
                  <label>Preview</label>
                  <img
                    src={`https://img.youtube.com/vi/${form.ytId}/hqdefault.jpg`}
                    alt="thumb"
                    style={{ width: "100%", borderRadius: 8, maxHeight: 200, objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
            <div className="adminModalFooter">
              <button className="adminBtnSecondary" onClick={() => setEditing(null)}>
                Cancelar
              </button>
              <button className="adminBtnPrimary" onClick={save}>
                <Save size={14} /> Salvar vídeo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BannersEditor ────────────────────────────────
const BANNER_TYPE_LABELS = { info: "📢 Informativo", warning: "⚠️ Atenção", success: "✅ Novidade" };
const BANNER_TYPE_COLORS = { info: "#3c9dff", warning: "#f59e0b", success: "#34d399" };

function BannersEditor({ banners, onChange, toast }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState({});

  function startEdit(i) {
    setEditing(i);
    setForm(
      i === "new"
        ? { id: Date.now().toString(), text: "", type: "info", active: true }
        : { ...banners[i] }
    );
  }

  function save() {
    if (!form.text.trim()) return toast.show("O texto do comunicado é obrigatório.", "error");
    const next = editing === "new"
      ? [...banners, form]
      : banners.map((b, i) => (i === editing ? form : b));
    onChange(next);
    setEditing(null);
    toast.show("Comunicado salvo!");
  }

  function remove(i) {
    if (!confirm(`Remover este comunicado?`)) return;
    onChange(banners.filter((_, idx) => idx !== i));
    toast.show("Comunicado removido.");
  }

  function toggle(i) {
    const next = banners.map((b, idx) => idx === i ? { ...b, active: !b.active } : b);
    onChange(next);
    toast.show(next[i].active ? "Comunicado ativado." : "Comunicado desativado.");
  }

  return (
    <div className="adminSection">
      <div className="adminSectionHeader">
        <h2 className="adminSectionTitle">Comunicados</h2>
        <button className="adminBtnPrimary" onClick={() => startEdit("new")}>
          <Plus size={15}/> Novo comunicado
        </button>
      </div>

      <p className="adminMuted" style={{ marginBottom: 16, fontSize: 13 }}>
        Comunicados ativos aparecem em uma faixa no topo do portal para todos os visitantes.
        O usuário pode fechar individualmente.
      </p>

      {banners.length === 0 && (
        <div className="adminEmpty">
          <Megaphone size={28}/>
          <p>Nenhum comunicado cadastrado. Crie um para avisar seus clientes.</p>
        </div>
      )}

      <div className="adminBannerList">
        {banners.map((b, i) => {
          const color = BANNER_TYPE_COLORS[b.type] || "#3c9dff";
          return (
            <div key={b.id || i} className={`adminBannerItem${b.active ? " adminBannerItem--active" : ""}`}
              style={{ "--banner-color": color }}>
              <div className="adminBannerLeft">
                <span className="adminBannerTypeBadge" style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}>
                  {BANNER_TYPE_LABELS[b.type]}
                </span>
                <p className="adminBannerText">{b.text}</p>
              </div>
              <div className="adminBannerActions">
                <button
                  className={`adminToggleBtn${b.active ? " adminToggleBtn--on" : ""}`}
                  onClick={() => toggle(i)}
                  title={b.active ? "Desativar" : "Ativar"}
                >
                  {b.active ? <ToggleRight size={22}/> : <ToggleLeft size={22}/>}
                  <span>{b.active ? "Ativo" : "Inativo"}</span>
                </button>
                <button onClick={() => startEdit(i)} title="Editar">
                  <Pencil size={14}/>
                </button>
                <button onClick={() => remove(i)} title="Remover" className="adminDanger">
                  <Trash2 size={14}/>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editing !== null && (
        <div className="adminModal">
          <div className="adminModalBox">
            <div className="adminModalHeader">
              <h3>{editing === "new" ? "Novo comunicado" : "Editar comunicado"}</h3>
              <button onClick={() => setEditing(null)}><X size={18}/></button>
            </div>
            <div className="adminFieldGrid">
              <div className="adminField">
                <label>Tipo</label>
                <select value={form.type || "info"} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                  <option value="info">📢 Informativo</option>
                  <option value="warning">⚠️ Atenção</option>
                  <option value="success">✅ Novidade</option>
                </select>
              </div>
              <div className="adminField">
                <label>Status inicial</label>
                <select value={form.active ? "true" : "false"} onChange={e => setForm(p => ({ ...p, active: e.target.value === "true" }))}>
                  <option value="true">Ativo — aparece no portal</option>
                  <option value="false">Inativo — oculto no portal</option>
                </select>
              </div>
              <div className="adminField" style={{ gridColumn: "1 / -1" }}>
                <label>Texto do comunicado</label>
                <textarea
                  value={form.text || ""}
                  onChange={e => setForm(p => ({ ...p, text: e.target.value }))}
                  rows={3}
                  placeholder="Ex: Manutenção programada no dia 25/08 das 22h às 23h. Serviços podem ficar indisponíveis."
                />
              </div>
            </div>

            {/* Preview */}
            {form.text && (
              <div className="adminBannerPreview">
                <p className="adminBannerPreviewLabel">Preview</p>
                <div className={`bannerItem bannerItem--${form.type || "info"}`} style={{ borderRadius: 8 }}>
                  <span className="bannerIcon">{{ info:"📢", warning:"⚠️", success:"✅" }[form.type || "info"]}</span>
                  <span className="bannerText">{form.text}</span>
                  <button className="bannerClose" disabled><X size={14}/></button>
                </div>
              </div>
            )}

            <div className="adminModalFooter">
              <button className="adminBtnSecondary" onClick={() => setEditing(null)}>Cancelar</button>
              <button className="adminBtnPrimary" onClick={save}><Save size={14}/> Salvar comunicado</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AdminPanel (root) ────────────────────────────
export default function AdminPanel({
  cats,
  articles,
  videos,
  siteConfig,
  banners,
  onUpdateCats,
  onUpdateArticles,
  onUpdateVideos,
  onUpdateConfig,
  onUpdateBanners,
  onReset,
  onLogout,
}) {
  const [tab, setTab] = useState("dashboard");
  const { toast, show: showToast } = useToast();

  const tabs = [
    { id: "dashboard",  label: "Dashboard",      icon: <LayoutDashboard size={17}/> },
    { id: "articles",   label: "Artigos",         icon: <BookOpen size={17}/> },
    { id: "categories", label: "Categorias",      icon: <FolderOpen size={17}/> },
    { id: "videos",     label: "Vídeos",          icon: <Video size={17}/> },
    { id: "banners",    label: "Comunicados",     icon: <Megaphone size={17}/> },
    { id: "config",     label: "Configurações",   icon: <Settings size={17}/> },
  ];

  return (
    <div className="adminShell">
      {/* Sidebar */}
      <aside className="adminSidebar">
        <div className="adminSidebarLogo">
          <img src="/arka-logo.png" alt="Arka" />
          <span className="adminBadge">ADM</span>
        </div>

        <nav className="adminNav">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`adminNavItem${tab === t.id ? " active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>

        <div className="adminSidebarFooter">
          <a href="#/" className="adminNavItem">
            <Eye size={17} /> Ver portal
          </a>
          <button className="adminNavItem adminNavLogout" onClick={onLogout}>
            <LogOut size={17} /> Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="adminMain">
        <div className="adminTopBar">
          <div>
            <h1 className="adminPageTitle">
              {tabs.find((t) => t.id === tab)?.icon}
              {tabs.find((t) => t.id === tab)?.label}
            </h1>
          </div>
          <div className="adminTopBarRight">
            <span className="adminUser">
              <ShieldCheck size={15} /> admin
            </span>
          </div>
        </div>

        <div className="adminContent">
          {tab === "dashboard" && (
            <Dashboard cats={cats} articles={articles} videos={videos} onReset={onReset} />
          )}
          {tab === "articles" && (
            <ArticlesEditor
              articles={articles}
              cats={cats}
              onChange={onUpdateArticles}
              toast={{ show: showToast }}
            />
          )}
          {tab === "categories" && (
            <CategoriesEditor
              cats={cats}
              onChange={onUpdateCats}
              toast={{ show: showToast }}
            />
          )}
          {tab === "videos" && (
            <VideosEditor
              videos={videos}
              cats={cats}
              onChange={onUpdateVideos}
              toast={{ show: showToast }}
            />
          )}
          {tab === "banners" && (
            <BannersEditor
              banners={banners || []}
              onChange={onUpdateBanners}
              toast={{ show: showToast }}
            />
          )}
          {tab === "config" && (
            <SiteConfigEditor
              config={siteConfig}
              onChange={onUpdateConfig}
              toast={{ show: showToast }}
            />
          )}
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <Toast msg={toast.msg} type={toast.type} onClose={() => {}} />
      )}
    </div>
  );
}

// ShieldCheck importado mas precisa ser re-importado aqui
function ShieldCheck(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
