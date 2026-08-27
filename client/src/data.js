// ─────────────────────────────────────────────
//  Dados centrais do portal — editados pelo ADM
// ─────────────────────────────────────────────
// DATA_VERSION: incremente sempre que adicionar itens novos em cats/articles/videos
// Isso força o merge automático com o localStorage na próxima carga.
export const DATA_VERSION = 4;

export const ADMIN_USER = "admin";
export const ADMIN_PASS = "arka@2026";

export const siteConfig = {
  heroTitle: "Como podemos",
  heroTitleEm: "ajudar?",
  heroSubtitle:
    "Encontre rapidamente respostas, tutoriais e soluções para os problemas mais comuns de tecnologia.",
  heroExamples: [
    "impressora não imprime",
    "configurar Outlook",
    "VPN",
    "senha Wi-Fi",
    "computador lento",
    "nobreak",
  ],
  contactPhone: "(27) 2103-0070",
  contactWhatsApp: "https://wa.me/552721030070",
  contactEmail: "arka@arkabrasil.com",
  contactAddress:
    "Av. Saturnino Rangel Mauro, 900\nPraia de Itaparica, Vila Velha — ES, 29102-034",
  contactMapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.6!2d-40.2945!3d-20.3571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb8178a7c9c5b5b%3A0x0!2sAv.+Saturnino+Rangel+Mauro%2C+900+-+Praia+de+Itaparica%2C+Vila+Velha+-+ES!5e0!3m2!1spt-BR!2sbr!4v1700000000000",
  contactHours: "Segunda a Sexta, 08h às 18h",
  contactHoursExtra: "",
  footerAbout:
    "Há mais de 20 anos entregando soluções de Tecnologia da Informação, infraestrutura, cibersegurança e cloud para empresas. Referência em TI no Espírito Santo.",
};

export const cats = [
  {
    id: "Computadores",
    label: "Computadores",
    desc: "Windows, lentidão, travamentos, drivers e periféricos",
    icon: "💻",
    color: "#3c9dff",
  },
  {
    id: "Impressoras",
    label: "Impressoras",
    desc: "Instalação, rede, fila, drivers e digitalização",
    icon: "🖨️",
    color: "#a855f7",
  },
  {
    id: "E-mail",
    label: "E-mail",
    desc: "Outlook, Microsoft 365, senhas e sincronização",
    icon: "✉️",
    color: "#22d3ee",
  },
  {
    id: "Rede e Internet",
    label: "Rede e Internet",
    desc: "Wi-Fi, VPN, DNS, IP e conectividade",
    icon: "🌐",
    color: "#34d399",
  },
  {
    id: "Segurança",
    label: "Segurança",
    desc: "Bitdefender, firewall, phishing e proteção",
    icon: "🔐",
    color: "#f59e0b",
  },
  {
    id: "Microsoft 365",
    label: "Microsoft 365",
    desc: "Teams, OneDrive, SharePoint e MFA",
    icon: "☁️",
    color: "#60a5fa",
  },
  {
    id: "Servidores",
    label: "Servidores",
    desc: "Windows Server, AD, permissões e backup",
    icon: "🖥️",
    color: "#f87171",
  },
  {
    id: "Sistemas e Aplicativos",
    label: "Sistemas e Aplicativos",
    desc: "Instalação, atualização e erros",
    icon: "⚙️",
    color: "#a3e635",
  },
  {
    id: "Nobreaks",
    label: "Nobreaks",
    desc: "Instalação, configuração, manutenção e troca de bateria",
    icon: "🔋",
    color: "#fb923c",
  },
];

// ─────────────────────────────────────────────
//  Empresas clientes — documentação centralizada
// ─────────────────────────────────────────────
// links[].type: "sharepoint" | "documento" | "acesso" | "outro"
export const companyLinkTypes = [
  { id: "sharepoint", label: "SharePoint", icon: "📁", color: "#22d3ee" },
  { id: "documento",  label: "Documento",  icon: "📄", color: "#a855f7" },
  { id: "acesso",     label: "Acesso",     icon: "🔑", color: "#f59e0b" },
  { id: "outro",      label: "Outro",      icon: "🔗", color: "#94a3b8" },
];

export const companies = [
  {
    id: "empresa-exemplo",
    name: "Empresa Exemplo Ltda",
    segment: "Indústria",
    city: "Vila Velha — ES",
    cnpj: "00.000.000/0001-00",
    since: "2021",
    contract: "Suporte mensal — 40h",
    status: "ativo",
    color: "#3c9dff",
    sharepoint: "https://arkabrasil.sharepoint.com/sites/empresa-exemplo",
    summary:
      "Cliente de suporte mensal. Toda a documentação de infraestrutura e inventário fica no SharePoint.",
    contacts: [
      { name: "Contato de TI", role: "Responsável de TI", email: "ti@exemplo.com.br", phone: "(27) 0000-0000" },
    ],
    environment: [
      { label: "Usuários", value: "30" },
      { label: "Servidores", value: "1 x Windows Server 2019 (AD + arquivos)" },
      { label: "Antivírus", value: "Bitdefender GravityZone" },
      { label: "Backup", value: "Veeam — diário, retenção 30 dias" },
      { label: "VPN", value: "Fortinet SSL-VPN" },
    ],
    links: [
      { label: "Pasta no SharePoint", url: "https://arkabrasil.sharepoint.com/sites/empresa-exemplo", type: "sharepoint" },
      { label: "Inventário de equipamentos", url: "", type: "documento" },
    ],
    notes: "Janela de manutenção: sábados, 08h às 12h.",
  },
];

export const catModels = {
  Impressoras: [
    {
      id: "DCP-L2540DW",
      label: "Brother DCP-L2540DW",
      desc: "Multifuncional laser monocromática",
      icon: "🖨️",
      color: "#a855f7",
      specs: "Toner: TN-1060 · Cilindro: DR-1060",
    },
    {
      id: "DCP-L5652DN",
      label: "Brother DCP-L5652DN",
      desc: "Multifuncional laser monocromática de alto volume",
      icon: "🖨️",
      color: "#f59e0b",
      specs: "Toner: TN-3472 · Cilindro: DR-3472",
    },
  ],
};

export const videos = [
  {
    title: "DCP-L2540DW: Como trocar os suprimentos (Toner e Cilindro)",
    cat: "Impressoras",
    duration: "",
    thumb: `https://img.youtube.com/vi/OUZPBRv8gVw/hqdefault.jpg`,
    ytId: "OUZPBRv8gVw",
  },
  {
    title: "DCP-L2540DW: Como resetar o toner",
    cat: "Impressoras",
    duration: "",
    thumb: `https://img.youtube.com/vi/8XBDbyTXTJk/hqdefault.jpg`,
    ytId: "8XBDbyTXTJk",
  },
  {
    title: "DCP-L2540DW: Como resetar o cilindro",
    cat: "Impressoras",
    duration: "",
    thumb: `https://img.youtube.com/vi/gk_c20VSirs/hqdefault.jpg`,
    ytId: "gk_c20VSirs",
  },
  {
    title: "DCP-L5652DN: Como resetar o toner",
    cat: "Impressoras",
    duration: "",
    thumb: `https://img.youtube.com/vi/Zwleny5Fh2k/hqdefault.jpg`,
    ytId: "Zwleny5Fh2k",
  },
  {
    title: "DCP-L5652DN: Como resetar o cilindro",
    cat: "Impressoras",
    duration: "",
    thumb: `https://img.youtube.com/vi/6GkvMVpgjDg/hqdefault.jpg`,
    ytId: "6GkvMVpgjDg",
  },
  {
    title: "Como conectar uma impressora em rede",
    cat: "Impressoras",
    duration: "6:42",
    thumb: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=480&q=80",
    ytId: "",
  },
  {
    title: "Configurando o Outlook pela primeira vez",
    cat: "E-mail",
    duration: "5:18",
    thumb: "https://images.unsplash.com/photo-1596526131083-e8c633564290?w=480&q=80",
    ytId: "",
  },
  {
    title: "Como usar o OneDrive para salvar arquivos",
    cat: "Microsoft 365",
    duration: "4:55",
    thumb: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=480&q=80",
    ytId: "",
  },
  {
    title: "Diagnóstico de rede: ping e traceroute",
    cat: "Rede e Internet",
    duration: "7:10",
    thumb: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=480&q=80",
    ytId: "",
  },
  {
    title: "Como verificar o Bitdefender no computador",
    cat: "Segurança",
    duration: "3:30",
    thumb: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=480&q=80",
    ytId: "",
  },
  {
    title: "Windows lento: como identificar a causa",
    cat: "Computadores",
    duration: "8:05",
    thumb: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=480&q=80",
    ytId: "",
  },
  {
    title: "Nobreak: como funciona e como configurar",
    cat: "Nobreaks",
    duration: "",
    thumb: `https://img.youtube.com/vi/J0AHR_Thlto/hqdefault.jpg`,
    ytId: "J0AHR_Thlto",
  },
];

export const articles = [
  {
    cat: "Impressoras",
    title: "Minha impressora não imprime",
    summary: "Verifique conexão, fila de impressão e o driver instalado.",
    time: "5 min",
    tags: ["driver", "fila", "IPP"],
    content: `
<h3>Problema</h3>
<p>A impressora está ligada e conectada, mas o documento não é impresso.</p>
<div class="note"><b>Antes de começar</b><ul><li>Confirme que a impressora está ligada e sem erros no painel.</li><li>Verifique cabo USB ou conexão de rede.</li><li>Confirme que o computador está na mesma rede.</li></ul></div>
<h3>Passo 1 — Verifique a fila de impressão</h3>
<p>Acesse <b>Painel de Controle → Dispositivos e Impressoras</b>, clique duplo na impressora e cancele todos os trabalhos pendentes.</p>
<h3>Passo 2 — Reinicie o serviço de spooler</h3>
<p>Pressione <code>Win + R</code>, digite <code>services.msc</code>, localize <b>Spooler de Impressão</b>, clique com o botão direito e selecione <b>Reiniciar</b>.</p>
<h3>Passo 3 — Verifique o driver</h3>
<p>Confira se o Windows instalou um driver oficial do fabricante ou um driver genérico <code>IPP/Class</code>. Quando aplicável, baixe o driver oficial no site do fabricante.</p>
<h3>Passo 4 — Faça um teste de impressão</h3>
<p>Clique com o botão direito na impressora e selecione <b>Propriedades da impressora → Imprimir página de teste</b>.</p>
<div class="tip">💡 Se continuar sem imprimir após os passos acima, anote o modelo exato da impressora e abra um chamado com o suporte Arka.</div>`,
  },
  {
    cat: "Impressoras",
    title: "Como conectar uma impressora em rede",
    summary: "Passo a passo para localizar o equipamento e instalar o driver.",
    time: "6 min",
    tags: ["rede", "IP", "driver"],
    content: `
<h3>Objetivo</h3>
<p>Adicionar uma impressora compartilhada na rede ao seu computador Windows.</p>
<div class="note"><b>O que você precisará saber</b><ul><li>O endereço IP da impressora (verifique no painel do equipamento ou com o suporte).</li><li>O modelo exato da impressora para baixar o driver correto.</li></ul></div>
<h3>Passo 1 — Adicionar impressora manualmente</h3>
<p>Vá em <b>Configurações → Bluetooth e dispositivos → Impressoras e scanners → Adicionar dispositivo</b>. Clique em <b>Adicionar manualmente</b> e escolha <b>Adicionar impressora usando endereço TCP/IP ou nome do host</b>.</p>
<h3>Passo 2 — Informe o IP</h3>
<p>Digite o endereço IP da impressora no campo <b>Nome do host ou endereço IP</b> e clique em Avançar. O Windows tentará detectar o driver automaticamente.</p>
<h3>Passo 3 — Instale o driver</h3>
<p>Se o driver genérico for instalado, baixe o driver oficial no site do fabricante e execute o instalador para substituí-lo.</p>
<div class="tip">💡 Para verificar o IP da impressora diretamente no equipamento, imprima uma página de configuração de rede pelo menu do painel.</div>`,
  },
  {
    cat: "Impressoras",
    title: "Como limpar a fila de impressão",
    summary: "Remova documentos presos e reinicie o serviço de impressão.",
    time: "4 min",
    tags: ["fila", "spooler"],
    content: `
<h3>Problema</h3>
<p>Documentos ficam travados na fila e novos trabalhos não são processados.</p>
<h3>Passo 1 — Pare o serviço Spooler</h3>
<p>Pressione <code>Win + R</code>, digite <code>services.msc</code>, localize <b>Spooler de Impressão</b> e clique em <b>Parar</b>.</p>
<h3>Passo 2 — Delete os arquivos da fila</h3>
<p>Abra o Explorador de Arquivos e navegue até <code>C:\\Windows\\System32\\spool\\PRINTERS</code>. Delete todos os arquivos da pasta (não delete a pasta em si).</p>
<h3>Passo 3 — Reinicie o serviço</h3>
<p>Volte ao <code>services.msc</code> e clique em <b>Iniciar</b> no serviço Spooler de Impressão.</p>
<div class="tip">💡 Se o problema ocorrer com frequência, pode ser sinal de driver incompatível. Informe ao suporte.</div>`,
  },
  {
    cat: "Impressoras",
    model: "DCP-L2540DW",
    title: "DCP-L2540DW: Como resetar o toner",
    summary:
      "Passo a passo para resetar o contador de toner após a troca no modelo Brother DCP-L2540DW.",
    time: "3 min",
    tags: ["toner", "reset", "Brother", "DCP-L2540DW"],
    content: `
<h3>Quando fazer o reset do toner?</h3>
<p>Após instalar um toner novo na impressora Brother DCP-L2540DW, é necessário resetar o contador interno para que a impressora reconheça o nível correto do cartucho e pare de exibir o alerta de toner vazio.</p>
<div class="note"><b>Atenção</b><p>Realize este procedimento somente após a troca física do toner. Resetar o contador sem trocar o toner pode causar problemas de qualidade de impressão.</p></div>
<h3>Assista ao tutorial em vídeo</h3>
<div class="articleVideo">
  <iframe src="https://www.youtube.com/embed/8XBDbyTXTJk" title="DCP-L2540DW: Como resetar o toner" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<h3>Passo a passo (resumo)</h3>
<ol>
<li>Com a impressora <b>ligada</b>, abra a tampa frontal.</li>
<li>Aguarde a mensagem de "Tampa aberta" aparecer no display.</li>
<li>Pressione e segure o botão <b>OK</b> ou siga a sequência indicada no vídeo.</li>
<li>O display exibirá a opção de reset — confirme.</li>
<li>Feche a tampa. A impressora reconhecerá o novo nível de toner.</li>
</ol>
<div class="tip">💡 O procedimento pode variar levemente dependendo do firmware da impressora. Se não aparecer a opção de reset, assista ao vídeo completo acima para a sequência exata de botões.</div>`,
  },
  {
    cat: "Impressoras",
    model: "DCP-L2540DW",
    title: "DCP-L2540DW: Como resetar o cilindro",
    summary:
      "Passo a passo para resetar o contador do cilindro após a troca no modelo Brother DCP-L2540DW.",
    time: "3 min",
    tags: ["cilindro", "reset", "Brother", "DCP-L2540DW"],
    content: `
<h3>Quando fazer o reset do cilindro?</h3>
<p>Após instalar um cilindro (unidade de drum) novo na impressora Brother DCP-L2540DW, é necessário resetar o contador interno para que a impressora reconheça o componente como novo e pare de exibir o alerta de troca de cilindro.</p>
<div class="note"><b>Atenção</b><p>Realize este procedimento somente após a troca física do cilindro. O cilindro é diferente do toner — são dois componentes separados neste modelo.</p></div>
<h3>Assista ao tutorial em vídeo</h3>
<div class="articleVideo">
  <iframe src="https://www.youtube.com/embed/gk_c20VSirs" title="DCP-L2540DW: Como resetar o cilindro" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<h3>Passo a passo (resumo)</h3>
<ol>
<li>Com a impressora <b>ligada</b>, abra a tampa frontal.</li>
<li>Pressione e segure o botão <b>OK</b> por alguns segundos até o display exibir a opção de reset do cilindro.</li>
<li>Confirme o reset pelo botão indicado no display.</li>
<li>Feche a tampa. O contador do cilindro será zerado.</li>
</ol>
<div class="tip">💡 O cilindro compatível com a DCP-L2540DW é o modelo <b>Brother DR-1060</b>. Para solicitar a reposição, entre em contato com o suporte Arka informando o modelo da impressora.</div>`,
  },
  {
    cat: "Impressoras",
    model: "DCP-L2540DW",
    title: "DCP-L2540DW: Como trocar os suprimentos (Toner e Cilindro)",
    summary:
      "Tutorial completo de troca do toner e cilindro na multifuncional Brother DCP-L2540DW.",
    time: "5 min",
    tags: ["toner", "cilindro", "troca", "Brother", "DCP-L2540DW", "suprimentos"],
    content: `
<h3>Suprimentos da DCP-L2540DW</h3>
<p>A Brother DCP-L2540DW utiliza dois componentes separados que precisam de troca periódica:</p>
<ul>
<li><b>Toner:</b> modelo <b>TN-1060</b> — responsável pela tinta em pó usada na impressão.</li>
<li><b>Cilindro (Drum):</b> modelo <b>DR-1060</b> — responsável por transferir o toner para o papel.</li>
</ul>
<div class="note"><b>Como saber qual precisa ser trocado?</b><p>A impressora exibe alertas distintos no display: <b>"Toner Baixo"</b> ou <b>"Trocar Cilindro"</b>. Verifique qual alerta está ativo antes de solicitar o suprimento.</p></div>
<h3>Assista ao tutorial completo</h3>
<div class="articleVideo">
  <iframe src="https://www.youtube.com/embed/OUZPBRv8gVw" title="DCP-L2540DW: Como trocar os suprimentos" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<h3>Após a troca — não esqueça de resetar!</h3>
<p>Depois de instalar o suprimento novo, é necessário resetar o contador interno da impressora.</p>
<div class="tip">💡 Para solicitar toner ou cilindro, entre em contato com o suporte Arka informando o <b>modelo da impressora</b> e o <b>nome do computador</b> ou setor.</div>`,
  },
  {
    cat: "Impressoras",
    model: "DCP-L5652DN",
    title: "DCP-L5652DN: Como resetar o toner",
    summary:
      "Passo a passo para resetar o contador de toner após a troca no modelo Brother DCP-L5652DN.",
    time: "3 min",
    tags: ["toner", "reset", "Brother", "DCP-L5652DN"],
    content: `
<h3>Quando fazer o reset do toner?</h3>
<p>Após instalar um toner novo na impressora Brother DCP-L5652DN, é necessário resetar o contador interno.</p>
<div class="note"><b>Atenção</b><p>Realize este procedimento somente após a troca física do toner.</p></div>
<h3>Assista ao tutorial em vídeo</h3>
<div class="articleVideo">
  <iframe src="https://www.youtube.com/embed/Zwleny5Fh2k" title="DCP-L5652DN: Como resetar o toner" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<div class="tip">💡 O toner compatível com a DCP-L5652DN é o modelo <b>Brother TN-3472</b>.</div>`,
  },
  {
    cat: "Impressoras",
    model: "DCP-L5652DN",
    title: "DCP-L5652DN: Como resetar o cilindro",
    summary:
      "Passo a passo para resetar o contador do cilindro após a troca no modelo Brother DCP-L5652DN.",
    time: "3 min",
    tags: ["cilindro", "reset", "Brother", "DCP-L5652DN"],
    content: `
<h3>Quando fazer o reset do cilindro?</h3>
<p>Após instalar um cilindro novo na impressora Brother DCP-L5652DN, é necessário resetar o contador interno.</p>
<div class="note"><b>Atenção</b><p>O cilindro (drum) é um componente separado do toner neste modelo.</p></div>
<h3>Assista ao tutorial em vídeo</h3>
<div class="articleVideo">
  <iframe src="https://www.youtube.com/embed/6GkvMVpgjDg" title="DCP-L5652DN: Como resetar o cilindro" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<div class="tip">💡 O cilindro compatível com a DCP-L5652DN é o modelo <b>Brother DR-3472</b>.</div>`,
  },
  {
    cat: "Impressoras",
    title: "Problema com driver da impressora",
    summary: "Identifique drivers genéricos e compare com uma máquina funcional.",
    time: "5 min",
    tags: ["driver", "IPP"],
    content: `
<h3>Como identificar um driver genérico</h3>
<p>Acesse <b>Painel de Controle → Dispositivos e Impressoras</b>. Se o nome exibir <b>IPP Class Driver</b>, um driver genérico está instalado.</p>
<div class="note"><b>Por que isso é um problema?</b><p>Drivers genéricos não suportam recursos avançados como frente-e-verso, seleção de bandeja ou digitalização.</p></div>
<h3>Como corrigir</h3>
<p>Acesse o site oficial do fabricante e baixe o driver completo para o modelo exato da sua impressora.</p>`,
  },
  {
    cat: "Rede e Internet",
    title: "Internet está lenta. O que fazer?",
    summary: "Checklist inicial para identificar onde está o problema.",
    time: "4 min",
    tags: ["lentidão", "Wi-Fi"],
    content: `
<h3>Diagnóstico inicial</h3>
<div class="note"><b>Checklist rápido</b><ul><li>Reinicie o roteador/switch.</li><li>Verifique se outros computadores também estão lentos.</li><li>Teste em outro navegador.</li><li>Conecte via cabo se estiver usando Wi-Fi.</li></ul></div>
<h3>Teste de velocidade</h3>
<p>Acesse <b>fast.com</b> ou <b>speedtest.net</b> e anote a velocidade. Compare com o plano contratado.</p>
<div class="tip">💡 Se apenas um computador estiver lento, o problema é local. Reinicie o adaptador de rede.</div>`,
  },
  {
    cat: "Rede e Internet",
    title: "Como conectar ao Wi-Fi",
    summary: "Confira rede, senha e conectividade do equipamento.",
    time: "3 min",
    tags: ["Wi-Fi", "senha"],
    content: `
<h3>Conectando ao Wi-Fi no Windows 11</h3>
<p>Clique no ícone de rede na barra de tarefas. Selecione a rede desejada e clique em <b>Conectar</b>. Digite a senha quando solicitado.</p>
<div class="tip">💡 Após conectar, verifique se há acesso à internet abrindo um site.</div>`,
  },
  {
    cat: "Rede e Internet",
    title: "Como descobrir o IP do computador",
    summary: "Veja o endereço IP usando as ferramentas do Windows.",
    time: "2 min",
    tags: ["IP", "Windows"],
    content: `
<h3>Método 1 — Prompt de Comando</h3>
<p>Pressione <code>Win + R</code>, digite <code>cmd</code>. No prompt, digite <code>ipconfig</code> e localize o <b>Endereço IPv4</b>.</p>`,
  },
  {
    cat: "Rede e Internet",
    title: "Como testar conexão com ping",
    summary: "Teste comunicação entre computador, gateway e servidor.",
    time: "3 min",
    tags: ["ping", "diagnóstico"],
    content: `
<h3>Como usar</h3>
<p>Pressione <code>Win + R</code>, digite <code>cmd</code>. Execute: <code>ping 8.8.8.8</code></p>
<div class="note"><b>Resultados</b><ul><li>Resposta normal: tempo em ms, sem perda.</li><li>Timeout: sem comunicação.</li><li>Perda de pacotes: instabilidade.</li></ul></div>`,
  },
  {
    cat: "Computadores",
    title: "Computador lento",
    summary: "Confira inicialização, espaço, atualizações e processos.",
    time: "6 min",
    tags: ["lentidão", "Windows"],
    content: `
<h3>Diagnóstico de lentidão</h3>
<h3>Passo 1 — Inicialização</h3>
<p>Pressione <code>Ctrl + Shift + Esc</code>, aba <b>Inicializar</b>, desative programas com impacto <b>Alto</b>.</p>
<h3>Passo 2 — Espaço em disco</h3>
<p>Se C: tiver menos de 10% livre, execute <code>cleanmgr</code>.</p>
<div class="tip">💡 Se ficou lento após uma atualização específica, informe a data ao suporte.</div>`,
  },
  {
    cat: "Computadores",
    title: "Windows não inicia",
    summary: "Verificações iniciais antes de abrir um chamado.",
    time: "5 min",
    tags: ["boot", "Windows"],
    content: `
<h3>Problema</h3>
<p>O computador liga mas o Windows não carrega, trava na tela inicial ou apresenta tela azul (BSOD).</p>
<div class="note"><b>Antes de ligar</b><ul><li>Anote o código de erro exibido.</li><li>Verifique se ocorreu após uma atualização.</li></ul></div>
<h3>Modo de Segurança</h3>
<p>Na tela de login: <b>Energia → Reiniciar segurando Shift → Solucionar problemas → Opções avançadas → F4</b>.</p>`,
  },
  {
    cat: "Computadores",
    title: "Como reiniciar o computador corretamente",
    summary: "Orientação simples para reinicialização segura.",
    time: "2 min",
    tags: ["reiniciar"],
    content: `
<h3>Por que reiniciar da forma correta?</h3>
<p>Desligar pelo botão de energia pode corromper arquivos. Use sempre <b>Iniciar → Energia → Reiniciar</b>.</p>
<div class="note"><b>Reiniciar vs Desligar</b><p>No Windows 11, o <b>Reiniciar</b> faz uma reinicialização completa — prefira ao resolver problemas.</p></div>`,
  },
  {
    cat: "Computadores",
    title: "Como alterar a senha do Windows",
    summary: "Passo a passo para alteração da senha do usuário.",
    time: "3 min",
    tags: ["senha", "Windows"],
    content: `
<h3>Alterando a senha</h3>
<p>Pressione <code>Ctrl + Alt + Delete</code> e selecione <b>Alterar senha</b>. Digite a senha atual, a nova e confirme.</p>
<div class="tip">💡 Se esqueceu a senha, entre em contato com o suporte.</div>`,
  },
  {
    cat: "Computadores",
    title: "Como identificar o nome do computador",
    summary: "Encontre o nome do equipamento para informar ao suporte.",
    time: "2 min",
    tags: ["hostname", "suporte"],
    content: `
<h3>Método rápido</h3>
<p>Pressione <code>Win + R</code>, digite <code>cmd</code>. No prompt: <code>hostname</code></p>
<div class="tip">💡 Sempre informe o nome do computador ao abrir um chamado.</div>`,
  },
  {
    cat: "E-mail",
    title: "Como configurar o Outlook",
    summary: "Orientações para configurar a conta corporativa.",
    time: "5 min",
    tags: ["Outlook", "conta"],
    content: `
<h3>Adicionando conta corporativa</h3>
<p>Abra o Outlook. Vá em <b>Arquivo → Adicionar Conta</b>. Insira seu e-mail corporativo e clique em <b>Conectar</b>.</p>
<div class="tip">💡 Se pedir configuração manual, entre em contato com o suporte.</div>`,
  },
  {
    cat: "E-mail",
    title: "Outlook não envia e-mail",
    summary: "Checklist de conexão, autenticação e sincronização.",
    time: "4 min",
    tags: ["Outlook", "envio"],
    content: `
<h3>Diagnóstico</h3>
<div class="note"><b>Checklist</b><ul><li>Verifique conexão com a internet.</li><li>Confirme que o Outlook não está no modo offline.</li></ul></div>
<h3>Passo 1 — Desative o modo offline</h3>
<p>Na aba <b>Enviar/Receber</b>, verifique se <b>Trabalhar Offline</b> está ativo e clique para desativar.</p>`,
  },
  {
    cat: "E-mail",
    title: "Como configurar assinatura do Outlook",
    summary: "Crie e aplique uma assinatura corporativa.",
    time: "3 min",
    tags: ["assinatura", "Outlook"],
    content: `
<h3>Criando a assinatura</h3>
<p>No Outlook: <b>Arquivo → Opções → Email → Assinaturas → Nova</b>. Adicione suas informações e configure para inserção automática.</p>`,
  },
  {
    cat: "Segurança",
    title: "Como verificar a proteção do computador",
    summary: "Confira se o agente de segurança está ativo e atualizado.",
    time: "3 min",
    tags: ["Bitdefender", "antivírus"],
    content: `
<h3>Verificando o Bitdefender</h3>
<p>Localize o ícone do Bitdefender na bandeja do sistema. O painel deve exibir status <b>Protegido</b> em verde.</p>
<div class="tip">💡 Nunca desative o antivírus por conta própria.</div>`,
  },
  {
    cat: "Segurança",
    title: "Bloqueio de sites",
    summary: "Orientações sobre bloqueios aplicados por políticas de segurança.",
    time: "4 min",
    tags: ["bloqueio", "política"],
    content: `
<h3>Por que sites são bloqueados?</h3>
<p>A empresa utiliza políticas que bloqueiam categorias de risco: redes sociais, streaming, downloads, apostas e conteúdo adulto.</p>
<div class="note"><b>Atenção</b><p>Tentativas de contornar bloqueios (VPN pessoal, proxies) violam as políticas de uso de TI.</p></div>`,
  },
  {
    cat: "Microsoft 365",
    title: "Como acessar o Microsoft 365",
    summary: "Passos iniciais para acesso aos serviços corporativos.",
    time: "3 min",
    tags: ["login", "M365"],
    content: `
<h3>Acessando pelo navegador</h3>
<p>Acesse <b>office.com</b> e clique em <b>Entrar</b>. Use seu e-mail e senha corporativos.</p>`,
  },
  {
    cat: "Microsoft 365",
    title: "Como usar o OneDrive",
    summary: "Orientações básicas para arquivos sincronizados.",
    time: "4 min",
    tags: ["OneDrive", "arquivos"],
    content: `
<h3>O que é o OneDrive?</h3>
<p>Serviço de armazenamento em nuvem da Microsoft. Arquivos salvos no OneDrive ficam sincronizados em qualquer dispositivo.</p>
<div class="tip">💡 Prefira salvar no OneDrive corporativo em vez do desktop.</div>`,
  },
  {
    cat: "Sistemas e Aplicativos",
    title: "Como tirar print da tela",
    summary: "Formas rápidas de capturar uma tela para enviar ao suporte.",
    time: "2 min",
    tags: ["print", "captura"],
    content: `
<h3>Método recomendado</h3>
<p>Pressione <code>Win + Shift + S</code>. Selecione a área desejada. A imagem é copiada automaticamente — cole em um e-mail com <code>Ctrl + V</code>.</p>`,
  },
  {
    cat: "Nobreaks",
    title: "Nobreak: como funciona e como configurar",
    summary: "Entenda o funcionamento do nobreak e veja o passo a passo de configuração e instalação.",
    time: "5 min",
    tags: ["nobreak", "UPS", "bateria", "energia"],
    content: `
<h3>O que é um nobreak?</h3>
<p>O nobreak (UPS — Uninterruptible Power Supply) é um equipamento que fornece energia elétrica temporária aos dispositivos conectados em caso de queda de energia, além de proteger contra variações de tensão.</p>
<div class="note"><b>Por que é importante?</b><ul><li>Evita perda de dados por desligamento abrupto.</li><li>Protege equipamentos contra picos e quedas de tensão.</li><li>Garante tempo para salvar arquivos e desligar corretamente o computador.</li></ul></div>
<h3>Assista ao tutorial em vídeo</h3>
<div class="articleVideo">
  <iframe src="https://www.youtube.com/embed/J0AHR_Thlto" title="Nobreak: como funciona e como configurar" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<h3>Cuidados importantes</h3>
<div class="note"><b>Atenção</b><ul><li>Não sobrecarregue o nobreak conectando equipamentos além da capacidade (VA) indicada.</li><li>Verifique periodicamente o estado da bateria — baterias envelhecidas reduzem o tempo de autonomia.</li><li>Mantenha o nobreak em local ventilado e longe de umidade.</li></ul></div>
<div class="tip">💡 Se o nobreak emitir bipes constantes ou o LED de bateria piscar, entre em contato com o suporte Arka para avaliação.</div>`,
  },
];
