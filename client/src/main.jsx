import React, { useMemo, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, ChevronRight, Clock, MessageCircle, Menu, X,
  CheckCircle2, AlertCircle, ArrowLeft, Paperclip, Send,
  BookOpen, Tag, Play, Video, Sun, Moon, ThumbsUp, ThumbsDown,
  Megaphone,
} from "lucide-react";
import "./styles.css";

import {
  cats as initialCats,
  catModels,
  videos as initialVideos,
  articles as initialArticles,
  siteConfig as initialConfig,
  companies as initialCompanies,
  DATA_VERSION,
} from "./data.js";
import AdminLogin from "./AdminLogin.jsx";
import AdminPanel from "./AdminPanel.jsx";
import ContactPage from "./ContactPage.jsx";
import CompaniesPage from "./CompaniesPage.jsx";

// ─── Hash router ──────────────────────────────────────────────────────────────
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");
  useEffect(() => {
    const handler = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return hash;
}

// ─── Persistência localStorage ────────────────────────────────────────────────
const LS_KEYS = {
  cats:      "arka_cats",
  articles:  "arka_articles",
  videos:    "arka_videos",
  config:    "arka_config",
  version:   "arka_data_version",
  theme:     "arka_theme",
  ratings:   "arka_ratings",
  banners:   "arka_banners",
  companies: "arka_companies",
};

function persist(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function loadOrMerge() {
  try {
    const savedVersion = parseInt(localStorage.getItem(LS_KEYS.version) || "0", 10);
    const hasStoredData = !!localStorage.getItem(LS_KEYS.articles);

    if (!hasStoredData || savedVersion < DATA_VERSION) {
      let storedCats = [];
      try { storedCats = JSON.parse(localStorage.getItem(LS_KEYS.cats) || "[]"); } catch {}
      const mergedCats = [
        ...initialCats.filter(ic => !storedCats.find(sc => sc.id === ic.id)),
        ...storedCats,
      ];

      let storedArticles = [];
      try { storedArticles = JSON.parse(localStorage.getItem(LS_KEYS.articles) || "[]"); } catch {}
      const mergedArticles = [
        ...storedArticles,
        ...initialArticles.filter(ia =>
          !storedArticles.find(sa => sa.title === ia.title && sa.cat === ia.cat)
        ),
      ];

      let storedVideos = [];
      try { storedVideos = JSON.parse(localStorage.getItem(LS_KEYS.videos) || "[]"); } catch {}
      const mergedVideos = [
        ...storedVideos,
        ...initialVideos.filter(iv =>
          !storedVideos.find(sv =>
            (iv.ytId && sv.ytId === iv.ytId) || sv.title === iv.title
          )
        ),
      ];

      let storedConfig = null;
      try { storedConfig = JSON.parse(localStorage.getItem(LS_KEYS.config) || "null"); } catch {}
      const config = storedConfig || initialConfig;

      let storedCompanies = null;
      try { storedCompanies = JSON.parse(localStorage.getItem(LS_KEYS.companies) || "null"); } catch {}
      const companies = storedCompanies || initialCompanies;

      persist(LS_KEYS.cats, mergedCats);
      persist(LS_KEYS.articles, mergedArticles);
      persist(LS_KEYS.videos, mergedVideos);
      persist(LS_KEYS.config, config);
      persist(LS_KEYS.companies, companies);
      localStorage.setItem(LS_KEYS.version, String(DATA_VERSION));

      return { cats: mergedCats, articles: mergedArticles, videos: mergedVideos, config, companies };
    }

    let companies = initialCompanies;
    try { companies = JSON.parse(localStorage.getItem(LS_KEYS.companies)) || initialCompanies; } catch {}

    return {
      cats:      JSON.parse(localStorage.getItem(LS_KEYS.cats)),
      articles:  JSON.parse(localStorage.getItem(LS_KEYS.articles)),
      videos:    JSON.parse(localStorage.getItem(LS_KEYS.videos)),
      config:    JSON.parse(localStorage.getItem(LS_KEYS.config)),
      companies,
    };
  } catch {
    return {
      cats: initialCats, articles: initialArticles, videos: initialVideos,
      config: initialConfig, companies: initialCompanies,
    };
  }
}

// ─── Fuzzy search ─────────────────────────────────────────────────────────────
// Verifica se todos os caracteres de `needle` aparecem em ordem em `haystack`
function fuzzyMatch(haystack, needle) {
  if (!needle) return true;
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase();
  let hi = 0;
  for (let ni = 0; ni < n.length; ni++) {
    hi = h.indexOf(n[ni], hi);
    if (hi === -1) return false;
    hi++;
  }
  return true;
}

// Score: quanto mais contíguo, maior a pontuação
function fuzzyScore(haystack, needle) {
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase();
  if (h.includes(n)) return 100; // match exato
  let score = 0;
  let hi = 0;
  for (let ni = 0; ni < n.length; ni++) {
    const pos = h.indexOf(n[ni], hi);
    if (pos === -1) return 0;
    score += 10 - Math.min(pos - hi, 9); // penaliza gaps grandes
    hi = pos + 1;
  }
  return score;
}

function searchArticles(articles, query) {
  const q = query.trim();
  if (!q) return articles.slice(0, 8);

  return articles
    .map((a) => {
      const text = [a.title, a.cat, a.summary, ...(a.tags || [])].join(" ");
      const score = fuzzyScore(text, q);
      return { a, score };
    })
    .filter(({ score }) => score > 0)
    .sort((x, y) => y.score - x.score)
    .map(({ a }) => a);
}

// ─── Tema ─────────────────────────────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(LS_KEYS.theme) || "dark"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(LS_KEYS.theme, theme);
  }, [theme]);
  const toggle = () => setTheme(t => t === "dark" ? "light" : "dark");
  return { theme, toggle };
}

// ─── Avaliações de artigo ─────────────────────────────────────────────────────
function useRatings() {
  const [ratings, setRatings] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEYS.ratings) || "{}"); } catch { return {}; }
  });

  function rate(title, value) {
    setRatings(prev => {
      const current = prev[title] || { up: 0, down: 0, voted: null };
      // Cancela voto se clicar de novo
      if (current.voted === value) {
        const next = { ...prev, [title]: { ...current, [value]: current[value] - 1, voted: null } };
        persist(LS_KEYS.ratings, next);
        return next;
      }
      // Troca voto
      const wasVoted = current.voted;
      const next = {
        ...prev,
        [title]: {
          up:    current.up   + (value === "up"   ? 1 : wasVoted === "up"   ? -1 : 0),
          down:  current.down + (value === "down" ? 1 : wasVoted === "down" ? -1 : 0),
          voted: value,
        },
      };
      persist(LS_KEYS.ratings, next);
      return next;
    });
  }

  return { ratings, rate };
}

// ─── Root ─────────────────────────────────────────────────────────────────────
function Root() {
  const hash = useHashRoute();
  const { theme, toggle: toggleTheme } = useTheme();
  const { ratings, rate } = useRatings();

  const initial = useMemo(() => loadOrMerge(), []);
  const [cats,       setCatsState]    = useState(initial.cats);
  const [articles,   setArticlesState]= useState(initial.articles);
  const [videos,     setVideosState]  = useState(initial.videos);
  const [siteConfig, setConfigState]  = useState(initial.config);
  const [companies,  setCompaniesState] = useState(initial.companies);

  // Banners: array de { id, text, type:"info"|"warning"|"success", active }
  const [banners, setBannersState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEYS.banners) || "[]"); } catch { return []; }
  });

  function setCats(v)       { setCatsState(v);     persist(LS_KEYS.cats,     v); }
  function setArticles(v)   { setArticlesState(v); persist(LS_KEYS.articles,  v); }
  function setVideos(v)     { setVideosState(v);   persist(LS_KEYS.videos,    v); }
  function setSiteConfig(v) { setConfigState(v);   persist(LS_KEYS.config,    v); }
  function setBanners(v)    { setBannersState(v);  persist(LS_KEYS.banners,   v); }
  function setCompanies(v)  { setCompaniesState(v); persist(LS_KEYS.companies, v); }

  function handleReset() {
    setCats(initialCats);
    setArticles(initialArticles);
    setVideos(initialVideos);
    setSiteConfig(initialConfig);
    setCompanies(initialCompanies);
    localStorage.setItem(LS_KEYS.version, String(DATA_VERSION));
  }

  const [adminAuth, setAdminAuth] = useState(
    () => sessionStorage.getItem("arka_admin") === "1"
  );
  function handleLogin()  { setAdminAuth(true);  sessionStorage.setItem("arka_admin","1"); window.location.hash = "#/admin"; }
  function handleLogout() { setAdminAuth(false); sessionStorage.removeItem("arka_admin");  window.location.hash = "#/"; }

  // Roteamento
  if (hash === "#/admin/login" || hash.startsWith("#/admin/login")) {
    if (adminAuth) { window.location.hash = "#/admin"; return null; }
    return <AdminLogin onLogin={handleLogin} />;
  }
  if (hash === "#/admin" || hash.startsWith("#/admin")) {
    if (!adminAuth) { window.location.hash = "#/admin/login"; return null; }
    return (
      <AdminPanel
        cats={cats} articles={articles} videos={videos} siteConfig={siteConfig}
        banners={banners} companies={companies}
        onUpdateCats={setCats} onUpdateArticles={setArticles}
        onUpdateVideos={setVideos} onUpdateConfig={setSiteConfig}
        onUpdateBanners={setBanners} onUpdateCompanies={setCompanies}
        onReset={handleReset} onLogout={handleLogout}
      />
    );
  }

  // Rota empresas (área interna — exige login do ADM)
  if (hash === "#/empresas" || hash.startsWith("#/empresas")) {
    if (!adminAuth) { window.location.hash = "#/admin/login"; return null; }
    const selectedId = hash.split("/")[2] || null;
    return (
      <CompaniesPage
        companies={companies}
        selectedId={selectedId}
        onSelect={(id) => { window.location.hash = id ? `#/empresas/${id}` : "#/empresas"; }}
        onBack={() => { window.location.hash = "#/"; }}
      />
    );
  }

  // Rota contato
  if (hash === "#/contato" || hash.startsWith("#/contato")) {
    return (
      <ContactPage
        siteConfig={siteConfig}
        cats={cats}
        onBack={() => { window.location.hash = "#/"; }}
        onOpenTicket={() => { window.location.hash = "#/"; }}
      />
    );
  }

  return (
    <PortalApp
      cats={cats} articles={articles} videos={videos} siteConfig={siteConfig}
      banners={banners} theme={theme} onToggleTheme={toggleTheme}
      ratings={ratings} onRate={rate}
    />
  );
}

// ─── Banner de comunicados ────────────────────────────────────────────────────
const BANNER_ICONS = { info: "📢", warning: "⚠️", success: "✅" };

function BannerStrip({ banners }) {
  const [dismissed, setDismissed] = useState([]);
  const active = banners.filter(b => b.active && !dismissed.includes(b.id));
  if (!active.length) return null;
  return (
    <div className="bannerStrip">
      {active.map(b => (
        <div key={b.id} className={`bannerItem bannerItem--${b.type}`}>
          <span className="bannerIcon">{BANNER_ICONS[b.type]}</span>
          <span className="bannerText">{b.text}</span>
          <button className="bannerClose" onClick={() => setDismissed(d => [...d, b.id])}
            aria-label="Fechar">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Avaliação de artigo ──────────────────────────────────────────────────────
function ArticleRating({ title, ratings, onRate }) {
  const r = ratings[title] || { up: 0, down: 0, voted: null };
  return (
    <div className="articleRating">
      <span className="articleRatingLabel">Este artigo foi útil?</span>
      <div className="articleRatingBtns">
        <button
          className={`ratingBtn ratingBtn--up${r.voted === "up" ? " active" : ""}`}
          onClick={() => onRate(title, "up")}
          aria-label="Sim, foi útil"
        >
          <ThumbsUp size={16} />
          <span>{r.up > 0 ? r.up : ""}</span>
          Sim
        </button>
        <button
          className={`ratingBtn ratingBtn--down${r.voted === "down" ? " active" : ""}`}
          onClick={() => onRate(title, "down")}
          aria-label="Não foi útil"
        >
          <ThumbsDown size={16} />
          <span>{r.down > 0 ? r.down : ""}</span>
          Não
        </button>
      </div>
      {r.voted && (
        <p className="ratingThanks">
          {r.voted === "up"
            ? "😊 Obrigado pelo feedback!"
            : "📝 Obrigado! Vamos melhorar este artigo."}
        </p>
      )}
    </div>
  );
}

// ─── Partículas ───────────────────────────────────────────────────────────────
function Particles() {
  return (
    <div className="particles">
      {Array.from({ length: 65 }, (_, i) => (
        <i key={i} style={{
          left: `${(i * 37) % 100}%`,
          animationDelay: `-${i % 18}s`,
          animationDuration: `${10 + (i % 11)}s`,
        }} />
      ))}
    </div>
  );
}

// ─── Article List ─────────────────────────────────────────────────────────────
function ArticleList({ items, cat, activeColor, onOpenArticle, onClose }) {
  if (!items.length)
    return <div className="drawerEmpty"><AlertCircle size={32}/><p>Nenhum artigo encontrado.</p></div>;
  return items.map((art, i) => (
    <button key={i} className="drawerCard" onClick={() => { onClose(); onOpenArticle(art, cat); }}>
      <div className="drawerCardBody">
        <div className="drawerCardMeta">
          <span className="drawerCardCat" style={{ color: activeColor, background: `${activeColor}14` }}>
            {art.model || art.cat}
          </span>
          <span className="drawerCardTime"><Clock size={12}/>{art.time} de leitura</span>
        </div>
        <h3 className="drawerCardTitle">{art.title}</h3>
        <p className="drawerCardSummary">{art.summary}</p>
        {art.tags && (
          <div className="drawerCardTags">
            <Tag size={11}/>
            {art.tags.slice(0,3).map(tag => <span key={tag}>{tag}</span>)}
          </div>
        )}
      </div>
      <ChevronRight size={16} className="drawerCardArrow"/>
    </button>
  ));
}

// ─── Category Drawer ──────────────────────────────────────────────────────────
function CategoryDrawer({ cat, articles, onClose, onOpenArticle }) {
  const [activeModel, setActiveModel] = useState(null);
  const models       = catModels[cat.id] || [];
  const generalItems = articles.filter(a => a.cat === cat.id && !a.model);
  const modelItems   = activeModel ? articles.filter(a => a.cat === cat.id && a.model === activeModel) : [];
  const selectedModel = models.find(m => m.id === activeModel);
  const totalItems   = articles.filter(a => a.cat === cat.id).length;
  const activeColor  = selectedModel?.color || cat.color;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = e => {
      if (e.key === "Escape") { if (activeModel) setActiveModel(null); else onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose, activeModel]);

  return (
    <div className="drawerOverlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="drawer" style={{ "--cat-color": activeColor }}>
        <div className="drawerHeader">
          <div className="drawerHeaderLeft">
            <div className="drawerCatIcon" style={{ background:`${activeColor}18`, border:`1px solid ${activeColor}33` }}>
              <span>{selectedModel?.icon || cat.icon}</span>
            </div>
            <div>
              {activeModel
                ? <p className="drawerEyebrow" style={{ cursor:"pointer" }} onClick={() => setActiveModel(null)}>← {cat.label.toUpperCase()}</p>
                : <p className="drawerEyebrow">BASE DE CONHECIMENTO</p>
              }
              <h2 className="drawerTitle">{selectedModel?.label || cat.label}</h2>
              <p className="drawerDesc">{selectedModel?.desc || cat.desc}</p>
            </div>
          </div>
          <button className="drawerClose" onClick={onClose}><X size={18}/></button>
        </div>
        <div className="drawerStats">
          <div className="drawerStat"><BookOpen size={14}/><span>{activeModel ? modelItems.length : totalItems} artigo{(activeModel ? modelItems.length : totalItems)!==1?"s":""}</span></div>
          <div className="drawerStatDiv"/>
          <div className="drawerStat"><Clock size={14}/><span>Atualizado hoje</span></div>
          {activeModel && (<><div className="drawerStatDiv"/><button className="drawerBackBtn" onClick={() => setActiveModel(null)}><ArrowLeft size={13}/> Voltar</button></>)}
        </div>
        <div className="drawerList">
          {!activeModel ? (
            <>
              {models.length > 0 && (
                <>
                  <div className="drawerSectionLabel"><span>Por modelo</span></div>
                  {models.map(m => {
                    const count = articles.filter(a => a.cat === cat.id && a.model === m.id).length;
                    return (
                      <button key={m.id} className="drawerModelCard" onClick={() => setActiveModel(m.id)} style={{ "--model-color": m.color }}>
                        <div className="drawerModelIcon" style={{ background:`${m.color}18`, border:`1px solid ${m.color}30` }}><span>{m.icon}</span></div>
                        <div className="drawerModelBody">
                          <h3>{m.label}</h3><p>{m.desc}</p>
                          {m.specs && <span className="drawerModelSpecs">{m.specs}</span>}
                        </div>
                        <div className="drawerModelRight">
                          <span className="drawerModelCount">{count}</span>
                          <ChevronRight size={16} className="drawerModelArrow"/>
                        </div>
                      </button>
                    );
                  })}
                  {generalItems.length > 0 && <div className="drawerSectionLabel" style={{marginTop:8}}><span>Geral</span></div>}
                </>
              )}
              <ArticleList items={generalItems} cat={cat} activeColor={cat.color} onOpenArticle={onOpenArticle} onClose={onClose}/>
            </>
          ) : (
            <ArticleList items={modelItems} cat={cat} activeColor={activeColor} onOpenArticle={onOpenArticle} onClose={onClose}/>
          )}
        </div>
        <div className="drawerFooter">
          <p>Não encontrou o que precisa?</p>
          <button className="primary" onClick={onClose} style={{ fontSize:"13px", padding:"10px 16px" }}>
            <MessageCircle size={14}/> Abrir chamado
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Video Card ───────────────────────────────────────────────────────────────
function VideoCard({ video, cats }) {
  const [hovered, setHovered] = useState(false);
  const cat = cats.find(c => c.id === video.cat);
  return (
    <div
      className={`videoCard${video.ytId?" videoCardClickable":""}`}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => { if (video.ytId) window.open(`https://www.youtube.com/watch?v=${video.ytId}`,"_blank","noopener,noreferrer"); }}
      role={video.ytId?"link":undefined}
    >
      <div className="videoThumb">
        <img src={video.thumb} alt={video.title} loading="lazy"/>
        <div className={`videoPlay${hovered?" hovered":""}`}/>
        {video.duration && <div className="videoDuration"><Clock size={11}/>{video.duration}</div>}
        {video.ytId && <div className={`videoYtBadge${hovered?" videoYtBadgeHover":""}`}><Play size={11} fill="white"/> Assistir no YouTube</div>}
        {cat && <div className="videoCatBadge" style={{ background:`${cat.color}22`, color:cat.color, border:`1px solid ${cat.color}33` }}>{cat.icon} {cat.label}</div>}
      </div>
      <div className="videoInfo">
        <h4>{video.title}</h4>
        <span className="videoLabel"><Video size={13}/> {video.ytId?"Tutorial em vídeo · YouTube":"Em breve"}</span>
      </div>
    </div>
  );
}

// ─── Portal App ───────────────────────────────────────────────────────────────
function openWhatsApp(siteConfig) {
  const url = siteConfig?.contactWhatsApp || "https://wa.me/552721030070";
  window.open(url, "_blank", "noopener,noreferrer");
}

function PortalApp({ cats, articles, videos, siteConfig, banners, theme, onToggleTheme, ratings, onRate }) {
  const [q, setQ]             = useState("");
  const [selected, setSelected] = useState(null);
  const [menu, setMenu]       = useState(false);
  const [faq, setFaq]         = useState(null);
  const [activeCat, setActiveCat] = useState(null);
  const [ticket, setTicket] = useState(false);

  const results = useMemo(() => searchArticles(articles, q), [q, articles]);

  const openSearch  = term => { setQ(term); document.getElementById("articles")?.scrollIntoView({ behavior:"smooth" }); };
  const openArticle = (art, fromCat=null) => setSelected({ art, fromCat });
  const closeArticle = () => setSelected(null);
  const backToDrawer = () => { const cat = selected?.fromCat; setSelected(null); if (cat) setActiveCat(cat); };
  const goWA = () => openWhatsApp(siteConfig);

  return (
    <div>
      <Particles/>
      <BannerStrip banners={banners}/>

      <header>
        <div className="nav">
          <div className="brand"><img src="/arka-logo.png" alt="Arka Tecnologia"/></div>
          <nav className={menu?"open":""}>
            {["Início","Base de Conhecimento","Categorias","Tutoriais","FAQ"].map((x,i) => (
              <a key={x} href={i===0?"#":"#articles"} onClick={() => setMenu(false)}>{x}</a>
            ))}
            <a href="#/contato" onClick={() => setMenu(false)}>Contato</a>
            <a href="#/empresas" onClick={() => setMenu(false)}>Empresas</a>
          </nav>
          {/* Toggle tema */}
          <button className="themeToggle" onClick={onToggleTheme} aria-label="Alternar tema" title={theme==="dark"?"Modo claro":"Modo escuro"}>
            {theme==="dark" ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
          <button className="help" onClick={goWA}><MessageCircle size={17}/> Precisa de ajuda?</button>
          <button className="mobileMenu" onClick={() => setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="heroGlow"/>
        <div className="container heroIn">
          <div className="eyebrow">PORTAL DE APOIO AO USUÁRIO</div>
          <h1>{siteConfig.heroTitle} <em>{siteConfig.heroTitleEm}</em></h1>
          <p>{siteConfig.heroSubtitle}</p>
          <div className="search">
            <Search/>
            <input value={q} onChange={e => setQ(e.target.value)}
              onKeyDown={e => e.key==="Enter" && openSearch(q)}
              placeholder="Pesquise por um problema, equipamento ou solução..."/>
            <button onClick={() => openSearch(q)}>Pesquisar</button>
          </div>
          <div className="examples">
            <span>Exemplos:</span>
            {siteConfig.heroExamples.map(x => <button key={x} onClick={() => openSearch(x)}>{x}</button>)}
          </div>
        </div>
      </section>

      <main className="container">
        {/* Categorias */}
        <section className="section">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">NAVEGUE POR ASSUNTO</div>
              <h2>Encontre uma solução</h2>
              <p>Selecione uma categoria para encontrar artigos e tutoriais relacionados.</p>
            </div>
          </div>
          <div className="catGrid">
            {cats.map(cat => (
              <button className={`cat${activeCat?.id===cat.id?" catActive":""}`} key={cat.id}
                onClick={() => setActiveCat(cat)} style={{ "--cat-accent": cat.color }}>
                <div className="catIconWrap" style={{ background:`${cat.color}15`, border:`1px solid ${cat.color}28` }}>
                  <span className="catIcon">{cat.icon}</span>
                </div>
                <div className="catBody">
                  <h3>{cat.label}</h3><p>{cat.desc}</p>
                  <div className="catCount"><BookOpen size={11}/>{articles.filter(a=>a.cat===cat.id).length} artigos</div>
                </div>
                <ChevronRight className="catArrow"/>
              </button>
            ))}
          </div>
        </section>

        {/* Base de Conhecimento */}
        <section className="section" id="articles">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">BASE DE CONHECIMENTO</div>
              <h2>{q?`Resultados para "${q}"`:"Problemas mais comuns"}</h2>
              <p>{q
                ? `${results.length} solução${results.length===1?"":"ões"} encontrada${results.length===1?"":"s"}.`
                : "Artigos mais acessados pela comunidade."}</p>
            </div>
          </div>
          {results.length ? (
            <div className="articleGrid">
              {results.map(a => (
                <article className="article" key={a.title} onClick={() => openArticle(a)}>
                  <div className="articleTop"><span>{a.cat}</span><Clock size={14}/>{a.time}</div>
                  <h3>{a.title}</h3>
                  <p>{a.summary}</p>
                  {a.tags && <div className="articleTags">{a.tags.map(t=><span key={t}>{t}</span>)}</div>}
                  <div className="read">Ver solução <ChevronRight size={15}/></div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty">
              <AlertCircle/><h3>Não encontramos uma solução para sua pesquisa.</h3>
              <p>Não se preocupe. Nossa equipe pode ajudar.</p>
              <button className="primary" onClick={goWA}>Abrir chamado</button>
            </div>
          )}
        </section>

        {/* Tutoriais em Vídeo */}
        <section className="section" id="tutoriais">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">TUTORIAIS EM VÍDEO</div>
              <h2>Aprenda no seu ritmo</h2>
              <p>Vídeos curtos e objetivos com os procedimentos mais solicitados ao suporte.</p>
            </div>
          </div>
          <div className="videoGrid">
            {videos.map((v,i) => <VideoCard key={i} video={v} cats={cats}/>)}
          </div>
          <div className="videoFootnote">
            <Video size={16}/>
            <span>Os vídeos serão disponibilizados em breve. Acesse nossa Base de Conhecimento para soluções em texto.</span>
          </div>
        </section>

        {/* Checklist */}
        <section className="before section">
          <div>
            <div className="eyebrow">ANTES DE ABRIR UM CHAMADO</div>
            <h2>Alguns problemas podem ser resolvidos rapidamente.</h2>
            <p>Faça um checklist rápido antes de solicitar suporte.</p>
          </div>
          <div className="checks">
            {["Reiniciei o computador","Verifiquei os cabos","Verifiquei minha conexão com a internet","Verifiquei se outros usuários estão com o mesmo problema","Pesquisei o problema na Base de Conhecimento"].map(x => (
              <div key={x}><CheckCircle2 size={18}/>{x}</div>
            ))}
            <button className="primary" onClick={goWA}>Não encontrou a solução? Abrir chamado</button>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq section" id="faq">
          <div className="sectionHead"><div><div className="eyebrow">FAQ</div><h2>Perguntas frequentes</h2></div></div>
          {["Como abrir um chamado?","Qual o horário de atendimento?","Como falar com o suporte?","O que devo informar ao abrir um chamado?","Como enviar uma captura de tela para o suporte?","Como informar o nome do computador?"].map((x,i) => (
            <div className="faqItem" key={x} onClick={() => setFaq(faq===i?null:i)}>
              <div>{x}</div>
              <ChevronRight className={faq===i?"rot":""}/>
              {faq===i && <p>Consulte a Base de Conhecimento para as orientações mais atualizadas. Se ainda precisar de ajuda, abra um chamado com o máximo de informações possível.</p>}
            </div>
          ))}
        </section>
      </main>

      <footer>
        <div className="container foot">
          <div>
            <div className="brand"><img src="/arka-logo.png" alt="Arka Tecnologia"/></div>
            <p>{siteConfig.footerAbout}</p>
          </div>
          <div>
            <h4>NAVEGAÇÃO</h4>
            <a href="#inicio">Início</a><a href="#articles">Base de Conhecimento</a>
            <a href="#tutoriais">Tutoriais</a><a href="#faq">FAQ</a>
          </div>
          <div>
            <h4>SUPORTE</h4>
            <a href="#articles">Problemas comuns</a>
            <a href="#/empresas">Empresas clientes</a>
            <button onClick={() => setTicket(true)}>Abrir chamado</button>
            <button onClick={() => setTicket(true)}>Falar com a Arka</button>
          </div>
          <div>
            <h4>CONTATO</h4>
            <p>{siteConfig.contactPhone}</p><p>{siteConfig.contactEmail}</p>
            <p style={{ whiteSpace:"pre-line" }}>{siteConfig.contactAddress}</p>
            <p>{siteConfig.contactHours}</p>
          </div>
        </div>
        <div className="copy">© 2026 Arka Tecnologia. Todos os direitos reservados.</div>
      </footer>

      <button className="float" onClick={() => setTicket(true)}><MessageCircle/> <span>Precisa de ajuda?</span></button>

      {activeCat && (
        <CategoryDrawer cat={activeCat} articles={articles}
          onClose={() => setActiveCat(null)}
          onOpenArticle={(art,cat) => { setActiveCat(null); openArticle(art,cat); }}/>
      )}

      {/* Modal de artigo */}
      {selected && (
        <div className="overlay">
          <div className="modal">
            <button className="close" onClick={closeArticle}><X/></button>
            <div className="breadcrumb">
              <button className="breadcrumbHome" onClick={closeArticle}>Portal</button>
              <ChevronRight size={13}/>
              {selected.fromCat ? (
                <>
                  <button className="breadcrumbCat" onClick={backToDrawer} style={{ color:selected.fromCat.color }}>
                    {selected.fromCat.icon} {selected.fromCat.label}
                  </button>
                  <ChevronRight size={13}/>
                </>
              ) : (
                <><span className="breadcrumbCatPlain">{selected.art.cat}</span><ChevronRight size={13}/></>
              )}
              <span className="breadcrumbCurrent">{selected.art.title}</span>
            </div>
            {selected.fromCat && (
              <button className="back" onClick={backToDrawer}><ArrowLeft size={16}/> Voltar para {selected.fromCat.label}</button>
            )}
            <div className="articleTop">
              {selected.art.cat} · Última atualização: 12/08/2026 · <Clock size={14}/>{selected.art.time}
            </div>
            <h2>{selected.art.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: selected.art.content || `<h3>Orientação</h3><p>${selected.art.summary}</p>` }}/>

            {/* Avaliação */}
            <ArticleRating title={selected.art.title} ratings={ratings} onRate={onRate}/>

            <div className="articleCta">
              <b>Ainda não funcionou?</b>
              <button className="primary" onClick={() => { closeArticle(); setTicket(true); }}>Abrir chamado</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de chamado */}
      {ticket && (
        <div className="overlay">
          <div className="modal ticket">
            <button className="close" onClick={() => setTicket(false)}><X/></button>
            <div className="eyebrow">SUPORTE ARKA</div>
            <h2>Abrir chamado</h2>
            <p>Preencha as informações abaixo. Esta é uma interface demonstrativa, preparada para futura integração com o sistema de chamados.</p>
            <div className="form">
              {["Nome","Empresa","E-mail","Telefone","Equipamento"].map(x => <input key={x} placeholder={x}/>)}
              <select><option>Categoria</option>{cats.map(c=><option key={c.id}>{c.label}</option>)}</select>
              <select><option>Prioridade</option><option>Baixa</option><option>Normal</option><option>Alta</option></select>
              <textarea placeholder="Descrição do problema"/>
              <label className="attach"><Paperclip size={16}/> Anexar arquivo<input type="file" hidden/></label>
              <button className="primary" onClick={() => { setTicket(false); alert("Solicitação registrada na prévia."); }}>
                <Send size={16}/> Enviar solicitação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Root/>);
