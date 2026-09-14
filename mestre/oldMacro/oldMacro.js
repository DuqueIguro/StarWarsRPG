
// ══════════ DADOS ══════════
const TV=[
  {max:2,pct:-90,l:"-90%"},{max:3,pct:-70,l:"-70%"},{max:4,pct:-60,l:"-60%"},
  {max:5,pct:-50,l:"-50%"},{max:6,pct:-40,l:"-40%"},{max:7,pct:-30,l:"-30%"},
  {max:8,pct:-20,l:"-20%"},{max:9,pct:-10,l:"-10%"},{max:11,pct:0,l:"BASE"},
  {max:12,pct:10,l:"+10%"},{max:13,pct:20,l:"+20%"},{max:14,pct:40,l:"+40%"},
  {max:15,pct:60,l:"+60%"},{max:16,pct:80,l:"+80%"},{max:17,pct:100,l:"+100%"},
  {max:18,pct:150,l:"+150%"},{max:999,pct:200,l:"+200%"}
];
const QG=[null,
  {n:1,c:10000,hp:3,d:"Escritório Simples"},{n:2,c:25000,hp:6,d:"Andar Corporativo"},
  {n:3,c:100000,hp:12,d:"Sede Completa"},{n:4,c:200000,hp:18,d:"Campus Corporativo"},
  {n:5,c:500000,hp:27,d:"Complexo Galáctico"}
];
const HLD=[
  {t:"Centro de Produção / MAIOR",c:1500000,hp:5,d:"Centenas de toneladas/mês a 50% do preço base."},
  {t:"Centro de Produção / MENOR",c:200000,hp:2,d:"Dezenas de toneladas/mês a 50% do preço base."},
  {t:"Anel de Suborno",c:100000,hp:2,d:"Reduz Fricção em -1 ou -2 por rolagem bem-sucedida."},
  {t:"Segurança / MAIOR",c:250000,hp:6,d:"Tropa de elite. Protege holdings contra ameaças."},
  {t:"Segurança / MENOR",c:50000,hp:3,d:"Guardas armados básicos para instalações."},
  {t:"Serviço Médico",c:500000,hp:2,d:"Reduz Fricção -1. Aumenta aceitação local."},
  {t:"Acesso ao Mercado",c:250000,hp:2,d:"Dobra tonelagem máxima comprável por mês."},
  {t:"Banco Comercial",c:100000,hp:1,d:"Transfere até 100k créditos/mês entre planetas."},
  {t:"Operações Dissimuladas",c:100000,hp:2,d:"Reduz Fricção -1 com risco de exposição."}
];
const MERCS=[
  {n:"Gás Tibanna",p:50000,t:["Luxo","Mineral","Raro"]},
  {n:"Especiaria Ryll",p:25000,t:["Biotec","Luxo"]},
  {n:"Bacta (Tanque)",p:200000,t:["Médico","Pós-Tec","Raro"]},
  {n:"Blasters Simples",p:5000,t:["Militar"]},
  {n:"Blasters Pesados",p:10000,t:["Militar","Pós-Tec"]},
  {n:"Caça Estelar (Peças)",p:25000,t:["Astronáutico","Raro"]},
  {n:"Cruzador (Componentes)",p:100000,t:["Astronáutico","Militar"]},
  {n:"Cristais Kyber",p:400000,t:["Mineral","Raro","Religioso"]},
  {n:"Escudos Deflectores",p:50000,t:["Pós-Tec","Militar"]},
  {n:"Droidos de Trabalho",p:10000,t:["Pós-Tec","Ferramenta"]},
  {n:"Holocrons Sith/Jedi",p:100000,t:["Pré-Tec","Cultural"]},
  {n:"Armadura Mandaloriana",p:75000,t:["Militar","Pré-Tec"]},
  {n:"Combustível Hyperdrive",p:15000,t:["Astronáutico"]},
  {n:"Coaxium (Bruto)",p:300000,t:["Mineral","Raro"]}
];
const TP=[
  {id:"industrial",n:"Industrial",cor:"#2980b9",d:"Fábricas e manufatura avançada.",f:3,l:3,m:{"Minerais":+2,"Ferramentas":+1,"Pós-Tec":-1}},
  {id:"agricola",n:"Agrícola",cor:"#27ae60",d:"Produção alimentícia. Governo fraco.",f:2,l:2,m:{"Agrícola":-2,"Animais":-1}},
  {id:"cosmopolita",n:"Cosmopolita",cor:"#8e44ad",d:"Hub de comércio interestelar.",f:2,l:1,m:{"Cultural":-2,"Luxo":+1,"Pré-Tec":+2}},
  {id:"primitivo",n:"Primitivo",cor:"#e67e22",d:"Baixa tecnologia. Ávido por tech.",f:3,l:3,m:{"Agrícola":-2,"Pós-Tec":+2}},
  {id:"tirano",n:"Tirânico",cor:"#c0392b",d:"Governante autoritário. Difícil mas lucrativo.",f:5,l:4,m:{"Mineral":-2,"Médico":+2}},
  {id:"selvagem",n:"Selvagem",cor:"#e74c3c",d:"Caos e warlords. Alto risco, alto retorno.",f:4,l:4,m:{"Agrícola":-2,"Militar":+2}},
  {id:"decadente",n:"Decadente",cor:"#9b59b6",d:"Vícios e corrupção. Mercado de luxo.",f:4,l:4,m:{"Luxo":+2,"Militar":-1}},
  {id:"corporativo",n:"Corporativo",cor:"#16a085",d:"Megacorporações como governo.",f:3,l:2,m:{"Luxo":+1,"Pré-Tec":+2}}
];
const TF=[
  {id:"imperio",n:"O Império Galáctico",d:"Governo autoritário. Recursos superiores.",cor:"#c0392b",i:"⚙️"},
  {id:"rebeldes",n:"Aliança Rebelde",d:"Resistência organizada. Alta motivação.",cor:"#e67e22",i:"🔥"},
  {id:"mercadores",n:"Guilda dos Mercadores",d:"Neutros. Lucram com todas as facções.",cor:"#27ae60",i:"💰"},
  {id:"hutt",n:"Clã Hutt",d:"Crime organizado interestelar.",cor:"#8e44ad",i:"🐍"},
  {id:"mandalorianos",n:"Clã Mandaloriano",d:"Guerreiros nômades com código de honra.",cor:"#2980b9",i:"🪖"},
  {id:"sindicate",n:"Sindicato das Sombras",d:"Informação e mercadorias proibidas.",cor:"#7f8c8d",i:"🕵️"},
  {id:"custom",n:"Personalizada",d:"Crie do zero.",cor:"#00d4ff",i:"✨"}
];
const TS=[
  {id:"nucleo",n:"Setor do Núcleo",d:"Alta densidade. Alta vigilância Imperial.",f:3},
  {id:"borda_ext",n:"Borda Exterior",d:"Pouca presença Imperial.",f:2},
  {id:"zona_sombra",n:"Zona das Sombras",d:"Piratas. Sem impostos.",f:4},
  {id:"espaco_hutt",n:"Espaço Hutt",d:"Crime como lei.",f:5},
  {id:"borda_media",n:"Borda Média",d:"Equilíbrio entre recursos e liberdade.",f:3}
];
const ACOES=["Atacar Ativo Inimigo","Comprar Ativo","Expandir Influência","Usar Habilidade do Ativo","Mover Ativo","Reparar Ativo (1FC=1HP)","Criar Posto Avançado","Passar a Vez"];

// ══════════ ESTADO ══════════
let E={
  faccoes:[
    {id:"fac_imp",n:"O Império Galáctico",d:"Governo autoritário.",cor:"#c0392b",i:"⚙️",fc:45,fo:4,as:3,ri:6,
     subs:[
       {id:"s1",n:"ISB — Segurança Imperial",d:"Segurança interna",cor:"#c0392b",fc:5,meta:{ativa:true,desc:"Infiltrar 3 células rebeldes no setor",valor:3,atual:1,unidade:"células infiltradas"}},
       {id:"s2",n:"Inquisitorius",d:"Caçadores da Força",cor:"#e74c3c",fc:2,meta:{ativa:false,desc:"",valor:0,atual:0,unidade:""}}
     ],
     ativos:[{id:"a1",n:"Garnizon de Lothal",t:"Força",hp:6,mhp:6,c:2,s:false},{id:"a2",n:"Frota de Patrulha",t:"Militar",hp:8,mhp:8,c:3,s:false}]},
    {id:"fac_reb",n:"Aliança Rebelde",d:"Resistência organizada.",cor:"#e67e22",i:"🔥",fc:8,fo:2,as:4,ri:3,
     subs:[{id:"s3",n:"Célula Fulcrum",d:"Rede de inteligência",cor:"#e67e22",fc:1,meta:{ativa:true,desc:"Contatar 5 planetas simpatizantes",valor:5,atual:2,unidade:"planetas contatados"}}],
     ativos:[{id:"a3",n:"Base em Yavin IV",t:"Base",hp:8,mhp:8,c:4,s:true}]}
  ],
  setores:[{id:"set1",n:"Setor de Lothal",d:"Núcleo Externo Industrial",f:3,fid:"fac_imp"}],
  planetas:[
    {id:"lothal",n:"Lothal",tipo:"Industrial",cor:"#2980b9",d:"Planeta industrial. Base de operações TIE Defender.",
     fr:3,li:3,mods:{"Minerais":+2,"Ferramentas":+1,"Pós-Tec":-1},cr:850000,qg:2,fid:"fac_imp",sid:"set1",
     hlds:[{id:"h1",t:"Centro de Produção / MENOR",c:200000,hp:2,n:"Fábricas TIE"},{id:"h2",t:"Anel de Suborno",c:100000,hp:2,n:"Rede ISB Corrupta"}]},
    {id:"narsh",n:"Nar Shaddaa",tipo:"Decadente",cor:"#9b59b6",d:"Coruscant dos Pobres. Hub de contrabando Hutt.",
     fr:5,li:4,mods:{"Luxo":+2,"Militar":-1},cr:2100000,qg:3,fid:"fac_reb",sid:"set1",
     hlds:[{id:"h3",t:"Centro de Produção / MAIOR",c:1500000,hp:5,n:"Estaleiros Clandestinos"}]}
  ],
  log:[
    {id:1,dt:"19 ABY",pl:"Lothal",ac:"VENDA",it:"Gás Tibanna (5t)",res:187500,rl:13,fac:"O Império Galáctico"},
    {id:2,dt:"19 ABY",pl:"Nar Shaddaa",ac:"COMPRA",it:"Ryll (2t)",res:95000,rl:8,fac:"Aliança Rebelde"}
  ],
  macroOrdem:[],macroIdx:0,holonet:"",gmNotas:"",
  anoAtual:19,mesAtual:1,diaAtual:14,
  ecoLog:[],
  mercados:[
    {id:"gás_tibanna",nome:"Gás Tibanna",cat:"Matéria-Prima",precoBase:50000,precoAtual:50000,tendencia:0,volatilidade:0.18,unidade:"ton",demanda:"Alta",desc:"Usado em blasters e motores de nave. Alta demanda militar."},
    {id:"crystais_kyber",nome:"Cristais Kyber",cat:"Raro",precoBase:400000,precoAtual:400000,tendencia:0,volatilidade:0.3,unidade:"un",demanda:"Muito Alta",desc:"Escassos desde o Decreto 66. Qualquer unidade vale fortunas."},
    {id:"bacta",nome:"Bacta",cat:"Médico",precoBase:200000,precoAtual:200000,tendencia:0,volatilidade:0.12,unidade:"tanque",demanda:"Alta",desc:"Essencial pós-combate. Controlado pelo cartel de Thyferra."},
    {id:"cortosis",nome:"Liga de Cortosis",cat:"Raro",precoBase:1200000,precoAtual:1200000,tendencia:0,volatilidade:0.25,unidade:"kg",demanda:"Muito Alta",desc:"Neutraliza sabres de luz. Quase impossível de obter legalmente."},
    {id:"durasteel",nome:"Durasteel",cat:"Industrial",precoBase:8000,precoAtual:8000,tendencia:0,volatilidade:0.08,unidade:"ton",demanda:"Muito Alta",desc:"Liga padrão para construção de naves e estruturas."},
    {id:"tibanna_gas_processado",nome:"Tibanna Processado",cat:"Energia",precoBase:120000,precoAtual:120000,tendencia:0,volatilidade:0.15,unidade:"ton",demanda:"Alta",desc:"Versão refinada. Usado em canhões turbolazer de frotas."},
    {id:"coaxium",nome:"Coaxium (Bruto)",cat:"Combustível",precoBase:300000,precoAtual:300000,tendencia:0,volatilidade:0.35,unidade:"ton",demanda:"Muito Alta",desc:"Combustível hyperdrive. Extremamente volátil e valioso."},
    {id:"ryll",nome:"Especiaria Ryll",cat:"Biotec",precoBase:25000,precoAtual:25000,tendencia:0,volatilidade:0.22,unidade:"ton",demanda:"Média",desc:"Biotecnologia de Ryloth. Medicinal e levemente psicoativo."},
    {id:"naves_caca",nome:"Caças TIE (lote)",cat:"Militar",precoBase:75000000,precoAtual:75000000,tendencia:0,volatilidade:0.1,unidade:"esquadrão",demanda:"Alta",desc:"12 TIEs por lote. Produzidos em Lothal e outros centros."},
    {id:"droidos_trabalho",nome:"Droidos de Trabalho",cat:"Industrial",precoBase:10000,precoAtual:10000,tendencia:0,volatilidade:0.09,unidade:"un",demanda:"Alta",desc:"Série W e similares. Mão-de-obra automatizada."},
    {id:"capital_coruscant",nome:"Capital Coruscant (PIB)",cat:"Economia Galáctica",precoBase:580000000000,precoAtual:580000000000,tendencia:0.02,volatilidade:0.04,unidade:"Cr/mês",demanda:"Sistêmico",desc:"Produto Interno Bruto mensal estimado de Coruscant. Indicador macro."},
    {id:"poder_imperio",nome:"Índice de Poder Imperial",cat:"Geopolítico",precoBase:9200,precoAtual:9200,tendencia:0,volatilidade:0.05,unidade:"pontos",demanda:"Sistêmico",desc:"Índice composto: frota + territórios + recursos + lealdade."}
  ],
  fabricas:[
    {id:"fab1",nome:"Complexo TIE Lothal",fid:"fac_imp",pid:"lothal",tipo:"Naves",nivel:3,
     producao:{item:"Caças TIE (lote)",qtd:2,intervalo:1},
     manutencao:5000000,custo:800000000,progresso:100,
     empregados:12000,eficiencia:100,dano:0,
     desc:"Principal fábrica de TIE Fighters do setor Lothal. Capacidade de 2 esquadrões/mês."},
    {id:"fab2",nome:"Estaleiros Droidos Nar Shaddaa",fid:"fac_reb",pid:"narsh",tipo:"Droidos",nivel:2,
     producao:{item:"Droidos de Trabalho",qtd:500,intervalo:1},
     manutencao:1200000,custo:200000000,progresso:100,
     empregados:3000,eficiencia:85,dano:0,
     desc:"Produção de droidos de trabalho e astromecânicos para mercado negro."}
  ],
  projetos:[
    {id:"proj1",nome:"Canhão de Íons Avançado",fid:"fac_imp",pid:"lothal",tipo:"P&D Militar",
     custo_total:50000000000,custo_atual:12000000000,
     duracao_meses:24,mes_inicio:1,mes_atual:8,
     progresso:33,status:"Em Andamento",
     bonusCompleto:"Canhões de íons +40% de dano. Destrói escudos em 1 disparo.",
     desc:"Pesquisa imperial para armas de supressão de frota rebelde.",
     financiamentos:[{fid:"fac_imp",valor:50000000000,pago:12000000000}]}
  ],
  contratos:[
    {id:"cont1",nome:"Financiamento Fábricas Lothal",
     remetente:"fac_imp",destinatario:"lothal",
     valor:2000000000,valorEnviado:500000000,
     meta_tipo:"producao",meta_valor:10,meta_atual:4,meta_unidade:"esquadrões TIE",
     prazo_meses:6,mes_inicio:1,mes_atual:4,
     status:"Em Andamento",penalidade:"Perda do recurso + suspensão de contratos",
     desc:"O Império financia expansão das fábricas de Lothal. Meta: 10 esquadrões TIE em 6 meses."}
  ]
};
let combat={round:1,list:[]};
let CS={modo:"venda",dice:[0,0,0],rolou:false,exp:3,fric:3,mod:0,item:MERCS[0].n,preco:MERCS[0].p,qtd:1,pid:"",score:0,mult:null,pf:0};

// ══════════ UTILS ══════════
const uid=()=>"x"+Math.random().toString(36).slice(2);
const M=n=>new Intl.NumberFormat("pt-BR").format(Math.round(Math.abs(n)));
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const gP=id=>E.planetas.find(p=>p.id===id)||null;
const gF=id=>E.faccoes.find(f=>f.id===id)||null;
// Procura uma sub-facção em qualquer facção pai. Retorna {sub, pai} ou null.
function gSub(id){
  for(const f of E.faccoes){
    const s=(f.subs||[]).find(x=>x.id===id);
    if(s)return{sub:s,pai:f};
  }
  return null;
}
// Resolve um id de "Facção Controladora" seja ele de uma facção-mãe OU de uma sub-facção.
// Retorna um objeto normalizado {id,n,i,cor,fc,isSub,pai,ref} ou null.
function gCtrl(id){
  if(!id)return null;
  const f=gF(id);
  if(f)return{id:f.id,n:f.n,i:f.i,cor:f.cor,fc:f.fc,isSub:false,pai:null,ref:f};
  const r=gSub(id);
  if(r)return{id:r.sub.id,n:`${r.sub.n} (sub de ${r.pai.n})`,i:"⭐",cor:r.sub.cor||r.pai.cor,fc:r.sub.fc||0,isSub:true,pai:r.pai,ref:r.sub};
  return null;
}
// Monta as <option> de um <select> de Facção Controladora, incluindo facções-mãe E suas sub-facções.
function optsControlador(selecionado){
  let html=`<option value="">— Nenhuma —</option>`;
  E.faccoes.forEach(f=>{
    html+=`<option value="${f.id}" ${selecionado===f.id?"selected":""}>${f.i} ${f.n}</option>`;
    (f.subs||[]).forEach(s=>{
      html+=`<option value="${s.id}" ${selecionado===s.id?"selected":""}>　⭐ ${s.n} (sub de ${f.n})</option>`;
    });
  });
  return html;
}
const hpQG=n=>QG[n]?.hp||0;
const hpU=h=>h.reduce((s,x)=>{const d=HLD.find(t=>t.t===x.t);return s+(d?.hp||0);},0);
const gM=sc=>{for(const r of TV)if(sc<=r.max)return r;return TV[TV.length-1]};
const tag=(t,c)=>`<span class="tag" style="background:${c}20;border:1px solid ${c}44;color:${c}">${t}</span>`;
function toast(msg,dur=3000){const el=document.getElementById("toast");el.textContent=msg;el.style.display="block";setTimeout(()=>el.style.display="none",dur)}
const ti=t=>({"Militar":"⚔️","Base":"🏛️","Força":"💪","Astúcia":"🕵️","Riqueza":"💰","Espaço":"🚀"}[t]||"📦");

// ══════════ CANVAS — FUNDO GALÁXIA ══════════
// Blindado com try/catch: se o navegador bloquear/não suportar Canvas (ex:
// extensões anti-fingerprint, modo privado restrito), isso NÃO PODE quebrar
// o resto do app — sem essa proteção, um erro aqui interrompia a execução
// do script inteiro e nenhuma função/listener definida depois disso no
// arquivo chegava a ser registrada (incluindo toda a integração com as
// abas Legislação e Empresas).
(function(){
  try{
    const c=document.getElementById("bg-canvas");
    const x=c && c.getContext ? c.getContext("2d") : null;
    if(!c || !x) return; // sem canvas disponível: só desliga o fundo animado, resto do app segue normal
    function rs(){c.width=innerWidth;c.height=innerHeight}rs();addEventListener("resize",rs);
    const stars=Array.from({length:160},()=>({
      px:Math.random(),py:Math.random(),
      r:Math.random()*1.4+.2,
      t:Math.random()*Math.PI*2,
      sp:Math.random()*.015+.003,
      col:Math.random()<.15?"rgba(240,180,41,":"rgba(0,212,255,"
    }));
    // nebula blobs
    const blobs=[
      {px:.2,py:.3,r:300,col:"rgba(0,60,120,0.12)"},
      {px:.8,py:.7,r:250,col:"rgba(0,30,80,0.10)"},
      {px:.5,py:.5,r:400,col:"rgba(0,20,60,0.08)"}
    ];
    function draw(){
      try{
        x.clearRect(0,0,c.width,c.height);
        blobs.forEach(b=>{const g=x.createRadialGradient(b.px*c.width,b.py*c.height,0,b.px*c.width,b.py*c.height,b.r);g.addColorStop(0,b.col);g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.beginPath();x.arc(b.px*c.width,b.py*c.height,b.r,0,Math.PI*2);x.fill()});
        stars.forEach(s=>{s.t+=s.sp;const a=.05+.12*Math.abs(Math.sin(s.t));x.beginPath();x.arc(s.px*c.width,s.py*c.height,s.r,0,Math.PI*2);x.fillStyle=s.col+a+")";x.fill()});
        requestAnimationFrame(draw);
      }catch(e){ /* falhou no meio da animação: só para de desenhar, não propaga */ }
    }
    draw();
  }catch(e){
    console.warn("Fundo animado (Canvas) desativado neste navegador:", e);
  }
})();

// ══════════ TEMA ══════════
function alternarTema(){
  const btn=document.getElementById("btn-tema");
  if(btn.textContent.includes("IMPERIAL")){
    document.documentElement.style.setProperty("--holo-primary","#00ff88");
    document.documentElement.style.setProperty("--holo-bright","#80ffbb");
    document.documentElement.style.setProperty("--holo-dim","#006644");
    document.documentElement.style.setProperty("--holo-border","#003322");
    document.documentElement.style.setProperty("--holo-glow","rgba(0,255,136,0.25)");
    document.documentElement.style.setProperty("--holo-glow2","rgba(0,255,136,0.08)");
    document.documentElement.style.setProperty("--holo-ghost","rgba(0,255,136,0.07)");
    btn.textContent="🟢 REBELDE";
  } else {
    document.documentElement.style.setProperty("--holo-primary","#00d4ff");
    document.documentElement.style.setProperty("--holo-bright","#80eeff");
    document.documentElement.style.setProperty("--holo-dim","#006688");
    document.documentElement.style.setProperty("--holo-border","#003366");
    document.documentElement.style.setProperty("--holo-glow","rgba(0,212,255,0.25)");
    document.documentElement.style.setProperty("--holo-glow2","rgba(0,212,255,0.08)");
    document.documentElement.style.setProperty("--holo-ghost","rgba(0,212,255,0.07)");
    btn.textContent="🔴 IMPERIAL";
  }
}

// ══════════ NAV TOGGLE ══════════
let navCollapsed=false;
function toggleNav(){
  navCollapsed=!navCollapsed;
  const topbar=document.getElementById("topbar");
  const toggle=document.getElementById("nav-toggle");
  const arrow=document.getElementById("nav-arrow");
  const main=document.getElementById("main");
  if(navCollapsed){
    topbar.classList.add("nav-hidden");
    toggle.style.top="0px";
    arrow.textContent="▼";
    main.style.paddingTop="40px";
  } else {
    topbar.classList.remove("nav-hidden");
    toggle.style.top="58px";
    arrow.textContent="▲";
    main.style.paddingTop="";
  }
}
// posição inicial
document.getElementById("nav-toggle").style.top="58px";

// ══════════ NAVEGAÇÃO ══════════
let abaAtual="painel";
function irPara(a,btn){
  abaAtual=a;
  document.querySelectorAll("[id^='aba-']").forEach(el=>el.classList.add("hidden"));
  document.getElementById("aba-"+a)?.classList.remove("hidden");
  document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("on"));
  if(btn)btn.classList.add("on");
  else{const map=["painel","macro","combate","comercio","criador","economia","gm","ajuda","legislacao","empresas"];const i=map.indexOf(a);document.querySelectorAll(".tab-btn")[i]?.classList.add("on")}
  renderAba(a);
}
function renderAba(a){
  const fn={painel:renderPainel,macro:renderMacro,combate:renderCombate,comercio:renderComercio,criador:renderCriador,gm:renderGM,ajuda:renderAjuda};
  fn[a]?.();
  if(a==="legislacao") ensureChildLoaded("frame-legislacao", ()=>getEmbeddedHtml("legislacao"));
  if(a==="empresas") ensureChildLoaded("frame-empresas", ()=>getEmbeddedHtml("empresas"));
  if(a==="legislacao"||a==="empresas") broadcastToChildren();
}

// ══════════ PAINEL ══════════
function renderPainel(){
  const tC=E.planetas.reduce((s,p)=>s+p.cr,0);
  const tF=E.faccoes.reduce((s,f)=>s+f.fc,0);
  const tH=E.planetas.reduce((s,p)=>s+p.hlds.length,0);
  document.getElementById("stats-topo").innerHTML=`
    <div class="stat-box"><span class="stat-lbl">FacCreds Totais</span><span class="stat-val gold">${tF}</span><div class="stat-sub">Poder logístico global</div></div>
    <div class="stat-box"><span class="stat-lbl">Créditos Imperiais</span><span class="stat-val green">₹${M(tC)}</span><div class="stat-sub">Soma de todos os planetas</div></div>
    <div class="stat-box"><span class="stat-lbl">Planetas</span><span class="stat-val">${E.planetas.length}</span><div class="stat-sub">${tH} holdings ativos</div></div>
    <div class="stat-box"><span class="stat-lbl">Facções</span><span class="stat-val" style="color:var(--purple);text-shadow:0 0 20px rgba(168,85,247,0.4)">${E.faccoes.length}</span><div class="stat-sub">${E.faccoes.reduce((s,f)=>s+(f.subs?.length||0),0)} sub-facções</div></div>
  `;
  const pg=document.getElementById("planetas-grid");
  pg.innerHTML=E.planetas.length===0
    ?`<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--holo-dim)">Nenhum planeta criado.<br><button class="btn btn-holo btn-sm mt12" onclick="abrirCriar('planeta')">✨ Criar Planeta</button></div>`
    :E.planetas.map(p=>{
      const mhp=hpQG(p.qg),uso=hpU(p.hlds),pct=mhp>0?(uso/mhp)*100:0;
      const cHP=pct>85?"var(--red)":pct>60?"var(--gold)":"var(--green)";
      const fac=gCtrl(p.fid);
      const mds=Object.entries(p.mods||{}).map(([k,v])=>tag(`${k}${v>0?"+":""}${v}`,v>0?"#00ff88":"#ff3c3c")).join("");
      return`<div class="pcard" onclick="abrirPlaneta('${p.id}')">
        <div class="pcard-stripe" style="background:linear-gradient(90deg,transparent,${p.cor},transparent)"></div>
        <div class="pcard-glow" style="background:${p.cor}"></div>
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-top:8px">
          <div><div class="pcard-name">${p.n}</div>${tag(p.tipo,p.cor)}${fac?tag(fac.i+" "+fac.n,fac.cor):""}</div>
          <div style="text-align:right">
            <div style="font-size:8px;color:var(--holo-dim);letter-spacing:2px">FRICÇÃO</div>
            <div style="font-family:var(--font-hud);font-size:24px;font-weight:900;color:${p.fr>=4?"var(--red)":"var(--gold)"};text-shadow:0 0 16px ${p.fr>=4?"var(--red-glow)":"var(--gold-glow)"}">${p.fr}</div>
          </div>
        </div>
        ${p.d?`<div style="font-size:11px;color:var(--holo-dim);margin:6px 0;line-height:1.5">${p.d}</div>`:""}
        <div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:8px;color:var(--holo-dim);letter-spacing:2px">HP ${uso}/${mhp}</span>
            <span style="font-size:8px;color:${cHP}">${mhp-uso} livre</span>
          </div>
          <div class="prog-track"><div class="prog-fill" style="width:${Math.min(100,pct)}%;background:${cHP};box-shadow:0 0 8px ${cHP}44"></div></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="pcard-credits">₹ ${M(p.cr)}</div>
          <div style="font-size:10px;color:var(--holo-dim)">QG Nv.${p.qg} • ${p.hlds.length} holdings</div>
        </div>
        ${mds?`<div style="margin-top:8px">${mds}</div>`:""}
      </div>`;
    }).join("");
  document.getElementById("log-preview").innerHTML=E.log.length===0
    ?`<div style="color:var(--holo-dim);padding:12px 0;font-size:12px">Nenhuma transação registrada ainda.</div>`
    :E.log.slice(0,6).map(t=>`
      <div class="log-row">
        <div class="log-dot" style="background:${t.ac==="VENDA"?"var(--green)":"var(--gold)"};box-shadow:0 0 8px ${t.ac==="VENDA"?"var(--green-glow)":"var(--gold-glow)"}"></div>
        <div class="log-info"><div class="log-act">${t.ac} — ${t.it}</div><div class="log-meta">${t.pl} • ${t.dt} • 🎲${t.rl} • ${t.fac||"—"}</div></div>
        <div class="log-amt" style="color:${t.ac==="VENDA"?"var(--green)":"var(--red)"};text-shadow:0 0 10px ${t.ac==="VENDA"?"var(--green-glow)":"var(--red-glow)"}">${t.ac==="VENDA"?"+":"-"}₹${M(t.res)}</div>
      </div>`).join("");
}

// ══════════ MACRO ══════════
function renda(f){return Math.ceil((f.ri||0)/2)+Math.floor(((f.fo||0)+(f.as||0))/4)}
// Detalhes de cada ação para o painel de contexto
const ACAO_DETALHES={
  "Atacar Ativo Inimigo":{
    desc:"Escolha um ativo inimigo visível e role Força da sua facção contra a Força do defensor. Em caso de sucesso, o ativo perde HP igual ao resultado do ataque.",
    campos:[{id:"alvo_fac",lbl:"Facção Alvo",tipo:"select_fac"},{id:"alvo_ativo",lbl:"Ativo Alvo",tipo:"select_ativo"},{id:"dado_atk",lbl:"Rolagem de Ataque (1d6+Força)",tipo:"roll"}],
    impacto:"O ativo alvo perde HP. Se chegar a 0, é destruído. Facção atacante gasta 1 FacCred.",
    custo:"1 FC"
  },
  "Comprar Ativo":{
    desc:"Adquira um novo ativo para sua facção. O custo em FacCreds é deduzido automaticamente. O ativo fica disponível no próximo turno.",
    campos:[{id:"tipo_ativo",lbl:"Tipo do Ativo",tipo:"select_tipo_ativo"},{id:"nome_ativo",lbl:"Nome do Ativo",tipo:"text"},{id:"local_ativo",lbl:"Planeta Base",tipo:"select_planeta"}],
    impacto:"O FacCred é deduzido e o ativo aparece na lista da facção imediatamente.",
    custo:"Variável (ver lista)"
  },
  "Expandir Influência":{
    desc:"Tente aumentar a Riqueza da facção em 1 ponto. Role Riqueza atual (1d6+Riqueza) contra dificuldade 8. Sucesso = +1 Riqueza.",
    campos:[{id:"dado_inf",lbl:"Rolagem (1d6+Riqueza)",tipo:"roll"}],
    impacto:"+1 Riqueza permanente se bem-sucedido. Aumenta renda futura.",
    custo:"2 FC"
  },
  "Usar Habilidade do Ativo":{
    desc:"Ative a habilidade especial de um dos seus ativos. O efeito depende do tipo do ativo.",
    campos:[{id:"ativo_sel",lbl:"Ativo a Usar",tipo:"select_ativo_proprio"}],
    impacto:"Efeito especial do ativo escolhido é aplicado (ver descrição do ativo).",
    custo:"0 FC"
  },
  "Mover Ativo":{
    desc:"Transfira um ativo entre dois planetas onde a facção tem presença. O ativo fica inativo durante o movimento.",
    campos:[{id:"ativo_mover",lbl:"Ativo",tipo:"select_ativo_proprio"},{id:"dest_mover",lbl:"Planeta Destino",tipo:"select_planeta"}],
    impacto:"O ativo aparece no planeta destino no próximo turno. Não pode agir durante a movimentação.",
    custo:"1 FC"
  },
  "Reparar Ativo (1FC=1HP)":{
    desc:"Gaste FacCreds para restaurar HP de um ativo danificado. Cada 1 FC recupera 1 HP, até o máximo do ativo.",
    campos:[{id:"ativo_rep",lbl:"Ativo a Reparar",tipo:"select_ativo_proprio"},{id:"fc_rep",lbl:"FacCreds a Gastar",tipo:"number"}],
    impacto:"O ativo recupera HP imediatamente. Gasto mínimo: 1 FC, máximo: até HP máx.",
    custo:"1 FC por HP"
  },
  "Criar Posto Avançado":{
    desc:"Estabeleça presença em um novo planeta. Requer que a facção tenha pelo menos um ativo em um planeta adjacente no setor.",
    campos:[{id:"planeta_posto",lbl:"Planeta Alvo",tipo:"select_planeta"},{id:"tipo_posto",lbl:"Tipo de Instalação",tipo:"select_tipo_ativo"}],
    impacto:"A facção passa a ter presença naquele planeta. Pode construir ativos lá no futuro.",
    custo:"3 FC"
  },
  "Passar a Vez":{
    desc:"A facção não realiza nenhuma ação neste turno. Útil quando não há recursos ou alvos disponíveis.",
    campos:[],
    impacto:"Nenhum efeito. A vez passa para a próxima facção.",
    custo:"0 FC"
  }
};

const TIPOS_ATIVO_COMPRA=[
  {n:"Unidade de Força Leve",t:"Força",hp:4,mhp:4,c:2,desc:"Pequena guarnição ou pelotão. Pode atacar ativos inimigos com Força 1d6+2."},
  {n:"Unidade de Força Pesada",t:"Força",hp:8,mhp:8,c:4,desc:"Batalhão de elite. Ataque com Força 1d6+4. Pode defender planetas."},
  {n:"Frota de Patrulha",t:"Espaço",hp:6,mhp:6,c:3,desc:"Naves de patrulha. Bloqueia movimento de ativos inimigos no sistema."},
  {n:"Frota de Ataque",t:"Espaço",hp:10,mhp:10,c:6,desc:"Força naval de ataque. Pode destruir ativos de espaço e bombardear planetas."},
  {n:"Base Oculta",t:"Base",hp:8,mhp:8,c:4,desc:"Instalação secreta. Stealth ativo por padrão. Difícil de localizar por inimigos."},
  {n:"Posto de Comando",t:"Base",hp:6,mhp:6,c:3,desc:"QG regional. Concede +1 em todos os ataques da facção neste setor."},
  {n:"Rede de Informação",t:"Astúcia",hp:4,mhp:4,c:3,desc:"Espiões e informantes. Revela ativos furtivos inimigos e dá +1 em ataques de Astúcia."},
  {n:"Agente Infiltrado",t:"Astúcia",hp:2,mhp:2,c:2,desc:"Agente dentro de outra organização. Pode sabotar ativos sem risco de combate."},
  {n:"Centro Comercial",t:"Riqueza",hp:4,mhp:4,c:3,desc:"Negócios lucrativos. Gera +1 FC de renda extra por turno além da renda base."},
  {n:"Banco Sombra",t:"Riqueza",hp:3,mhp:3,c:4,desc:"Lavagem de dinheiro e financiamento. Permite rolar 2x renda e ficar com o maior."},
];

function renderMacro(){
  const w=document.getElementById("macro-wheel");
  renderMacroMercado();
  // Mostrar TODAS as facções na roda mesmo antes de rolar
  if(E.macroOrdem.length===0){
    w.innerHTML=`<div style="color:var(--holo-dim);font-size:12px;padding:12px 0;text-align:center;border:1px dashed var(--holo-border);border-radius:var(--r);padding:20px">
      <div style="font-size:24px;margin-bottom:8px">🎡</div>
      <div>Clique em <strong style="color:var(--gold)">Rolar Iniciativa</strong> para definir a ordem de ação das facções.</div>
      <div style="margin-top:8px;color:var(--holo-dim);font-size:10px">Facções cadastradas: ${E.faccoes.map(f=>`<span style="color:${f.cor}">${f.i}${f.n}</span>`).join(", ")||"Nenhuma"}</div>
    </div>`;
  } else {
    w.innerHTML=E.macroOrdem.map((fid,i)=>{
      const f=gF(fid);if(!f)return"";
      const isA=i===E.macroIdx,isD=i<E.macroIdx;
      return`<div class="iw-slot ${isA?"active":""} ${isD?"done":""}">
        <div class="iw-num">${i+1}</div>
        <div class="iw-dot" style="background:${f.cor};${isA?"box-shadow:0 0 10px "+f.cor:""}"></div>
        <div class="iw-fac">${f.i} ${f.n}</div>
        <div style="font-size:9px;color:var(--holo-dim)">${f.fc}FC | F${f.fo||0} A${f.as||0} R${f.ri||0}</div>
        ${isA?`<select class="iw-act-sel" id="asel-${fid}" onchange="mostrarDetalheAcao('${fid}',this.value)">
          ${ACOES.map(a=>`<option>${a}</option>`).join("")}
        </select>
        <button class="btn btn-gold btn-xs" onclick="abrirPainelAcao('${fid}')">▶ EXECUTAR</button>`:""}
        ${isD?`<span style="font-size:10px;color:var(--verde);text-shadow:0 0 8px var(--green-glow)">✓ Feito</span>`:""}
      </div>
      ${isA?`<div id="detalhe-acao-${fid}" style="margin:6px 0 10px 0"></div>`:""}`;
    }).join("");
    // Popula o painel de detalhes da facção ativa imediatamente, sem esperar o onchange do select
    const facAtiva=E.macroOrdem[E.macroIdx];
    if(facAtiva)mostrarDetalheAcao(facAtiva,ACOES[0]);
  }
  const hn=document.getElementById("holonet-box");if(hn)hn.value=E.holonet||"";
  const fl=document.getElementById("macro-fac-list");
  fl.innerHTML=E.faccoes.map(f=>{
    const rd=renda(f);
    const cTot=E.planetas.filter(p=>p.fid===f.id).reduce((s,p)=>s+p.cr,0);
    const subsH=(f.subs||[]).map(s=>`<div class="sub-chip" style="color:${s.cor||f.cor};border-color:${(s.cor||f.cor)}44"><span style="width:6px;height:6px;border-radius:50%;background:${s.cor||f.cor};display:inline-block"></span>${s.n}</div>`).join("");
    const atvH=(f.ativos&&f.ativos.length)
      ?f.ativos.map(a=>`<div class="ativo-row ${a.s?"stealth":""}">
        <span style="font-size:16px">${ti(a.t)}</span>
        <div class="ativo-name">${a.n}</div>
        <div class="ativo-hp">${a.hp}/${a.mhp}HP</div>
        <div class="ativo-fc">${a.c}FC</div>
        <span style="cursor:pointer;font-size:14px;opacity:${a.s?1:.3};color:${a.s?"#a855f7":"inherit"};transition:.2s" onclick="toggleStealth('${f.id}','${a.id}')" title="Furtividade">👁</span>
        <button class="btn btn-ghost btn-xs" onclick="editHPAtivo('${f.id}','${a.id}')">HP</button>
        <button class="btn btn-red btn-xs" onclick="delAtivo('${f.id}','${a.id}')">✕</button>
      </div>`).join("")
      :`<div style="font-size:11px;color:var(--holo-dim);padding:8px 0">Nenhum ativo. Clique "+ Ativo" para adicionar.</div>`;
    return`<div class="fac-banner">
      <div class="fac-hdr" style="border-left:4px solid ${f.cor}">
        <div class="fac-hdr-name" style="color:${f.cor};text-shadow:0 0 16px ${f.cor}44">${f.i} ${f.n}</div>
        <div class="flex gap8">
          <button class="btn btn-ghost btn-xs" onclick="abrirAddAtivo('${f.id}')">+ Ativo</button>
          <button class="btn btn-gold btn-xs" onclick="processaRenda('${f.id}')">💰 Renda</button>
        </div>
      </div>
      <div class="fac-stats-row">
        <div class="fac-stat"><div class="fac-stat-lbl">FacCreds</div><span class="fac-stat-val" style="color:var(--gold);text-shadow:0 0 12px var(--gold-glow)">${f.fc}</span></div>
        <div class="fac-stat"><div class="fac-stat-lbl">Força</div><span class="fac-stat-val" style="color:var(--red)">${f.fo||0}</span></div>
        <div class="fac-stat"><div class="fac-stat-lbl">Astúcia</div><span class="fac-stat-val" style="color:var(--holo-primary)">${f.as||0}</span></div>
        <div class="fac-stat"><div class="fac-stat-lbl">Riqueza</div><span class="fac-stat-val" style="color:var(--green)">${f.ri||0}</span></div>
      </div>
      <div class="fac-body">
        <div style="font-size:9px;color:var(--holo-dim);margin-bottom:10px">Renda: <span style="color:var(--gold)">${rd} FC/turno</span> &nbsp;|&nbsp; Créditos em planetas: <span style="color:var(--green)">₹${M(cTot)}</span></div>
        ${subsH?`<div style="margin-bottom:10px">${subsH}</div>`:""}
        <div style="font-size:8px;letter-spacing:3px;color:var(--holo-dim);text-transform:uppercase;margin-bottom:8px">ATIVOS</div>
        ${atvH}
      </div>
    </div>`;
  }).join("");
}
function renderMacroMercado(){
  const el=document.getElementById("macro-mercado-list");if(!el)return;
  if(!E.mercados.length){el.innerHTML=`<div style="font-size:11px;color:var(--holo-dim)">Nenhuma mercadoria cadastrada.</div>`;return}
  el.innerHTML=E.mercados.map(m=>{
    const variacao=((m.precoAtual-m.precoBase)/m.precoBase*100).toFixed(1);
    const positivo=Number(variacao)>=0;
    const cor=positivo?"var(--green)":"var(--red)";
    return`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 2px;border-bottom:1px solid rgba(240,180,41,0.1);font-family:var(--font-mono)">
      <span style="font-size:12px;letter-spacing:1px;color:#e8d5a8;text-transform:uppercase">${m.nome}</span>
      <span style="font-size:13px;font-weight:700;color:${cor};text-shadow:0 0 10px ${cor}44">${positivo?"+":""}${variacao}%</span>
    </div>`;
  }).join("");
  const foot=document.getElementById("macro-mercado-footer");
  if(foot)foot.textContent=`// COTAÇÕES EM CRÉDITOS GALÁCTICOS — ATUALIZAÇÃO: Dia ${E.diaAtual}, Mês ${E.mesAtual}, Ano ${String(E.anoAtual).padStart(2,"0")} ABY`;
}
function rolarInicMacro(){
  const n=E.faccoes.length;if(!n){toast("Nenhuma facção criada.");return}
  const r=Math.floor(Math.random()*n);
  E.macroOrdem=Array.from({length:n},(_,i)=>E.faccoes[(r+i)%n].id);
  E.macroIdx=0;
  // NOTA: a iniciativa de facção agora é só para PRÉ-DEFINIR a ordem/ações do
  // turno — ela não gira mais o mercado nem avança o calendário. Quem gira a
  // economia de verdade é a aba Empresas (rotações Curta/Longa), que puxa o
  // Galactic Ledger inteiro junto (ver bridge "rpg-run-rotation" no final do script).
  document.getElementById("turn-label").textContent="VEZ: "+(gF(E.macroOrdem[0])?.n||"?");
  toast(`🎲 Iniciativa: ${gF(E.macroOrdem[0])?.n} age primeiro!`);
  renderMacro();
}
function passarVezMacro(){
  if(!E.macroOrdem.length)return;
  E.macroIdx++;
  if(E.macroIdx>=E.macroOrdem.length){toast("✅ Todas as facções agiram! Fim do turno.");document.getElementById("turn-label").textContent="FIM DO TURNO";}
  else{const f=gF(E.macroOrdem[E.macroIdx]);document.getElementById("turn-label").textContent="VEZ: "+(f?.n||"?");toast(`▶ Vez de ${f?.n}`)}
  renderMacro();
}
function resetarMacro(){E.macroOrdem=[];E.macroIdx=0;document.getElementById("turn-label").textContent="CAMPANHA ATIVA";renderMacro()}
function mostrarDetalheAcao(fid,acao){
  const el=document.getElementById("detalhe-acao-"+fid);if(!el)return;
  const det=ACAO_DETALHES[acao];if(!det){el.innerHTML="";return}
  const f=gF(fid);
  el.innerHTML=`<div style="background:rgba(0,20,44,0.8);border:1px solid rgba(0,212,255,0.2);border-radius:var(--r2);padding:14px;margin-top:4px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <div style="font-family:var(--font-hud);font-size:9px;letter-spacing:3px;color:var(--holo-primary)">${acao.toUpperCase()}</div>
      <div style="font-size:9px;color:var(--gold);border:1px solid rgba(240,180,41,0.3);border-radius:10px;padding:2px 8px">Custo: ${det.custo}</div>
    </div>
    <div style="font-size:11px;color:var(--text2);line-height:1.6;margin-bottom:10px">${det.desc}</div>
    ${det.campos.map(c=>buildCampoAcao(c,fid,acao)).join("")}
    <div style="margin-top:10px;padding:8px;background:rgba(240,180,41,0.05);border:1px solid rgba(240,180,41,0.2);border-radius:var(--r);font-size:10px;color:var(--holo-dim)">
      <span style="color:var(--gold)">⚡ Impacto:</span> ${det.impacto}
    </div>
  </div>`;
}
function buildCampoAcao(campo,fid,acao){
  const f=gF(fid);
  if(campo.tipo==="select_fac"){
    return`<div style="margin-bottom:6px"><label style="font-size:8px;letter-spacing:2px;color:var(--holo-dim)">${campo.lbl}</label>
      <select id="campo-${campo.id}-${fid}" style="margin-top:3px;font-size:11px">
        ${E.faccoes.filter(x=>x.id!==fid).map(f2=>`<option value="${f2.id}">${f2.i} ${f2.n}</option>`).join("")}
      </select></div>`;
  }
  if(campo.tipo==="select_ativo"){
    const fAlvoSel=E.faccoes.filter(x=>x.id!==fid)[0];
    return`<div style="margin-bottom:6px"><label style="font-size:8px;letter-spacing:2px;color:var(--holo-dim)">${campo.lbl}</label>
      <select id="campo-${campo.id}-${fid}" style="margin-top:3px;font-size:11px">
        ${E.faccoes.filter(x=>x.id!==fid).flatMap(ff=>(ff.ativos||[]).filter(a=>!a.s).map(a=>`<option value="${ff.id}|${a.id}">${ff.i} ${a.n} (${a.hp}/${a.mhp}HP)</option>`)).join("")||"<option>Nenhum ativo visível</option>"}
      </select></div>`;
  }
  if(campo.tipo==="select_ativo_proprio"){
    return`<div style="margin-bottom:6px"><label style="font-size:8px;letter-spacing:2px;color:var(--holo-dim)">${campo.lbl}</label>
      <select id="campo-${campo.id}-${fid}" style="margin-top:3px;font-size:11px">
        ${(f?.ativos||[]).map(a=>`<option value="${a.id}">${ti(a.t)} ${a.n} (${a.hp}/${a.mhp}HP)</option>`).join("")||"<option>Nenhum ativo</option>"}
      </select></div>`;
  }
  if(campo.tipo==="select_planeta"){
    return`<div style="margin-bottom:6px"><label style="font-size:8px;letter-spacing:2px;color:var(--holo-dim)">${campo.lbl}</label>
      <select id="campo-${campo.id}-${fid}" style="margin-top:3px;font-size:11px">
        ${E.planetas.map(p=>`<option value="${p.id}">${p.n}</option>`).join("")}
      </select></div>`;
  }
  if(campo.tipo==="select_tipo_ativo"){
    return`<div style="margin-bottom:6px"><label style="font-size:8px;letter-spacing:2px;color:var(--holo-dim)">${campo.lbl}</label>
      <select id="campo-${campo.id}-${fid}" style="margin-top:3px;font-size:11px">
        ${TIPOS_ATIVO_COMPRA.map(t=>`<option value="${t.n}">${ti(t.t)} ${t.n} — ${t.c}FC | ${t.desc.substring(0,45)}...</option>`).join("")}
      </select></div>`;
  }
  if(campo.tipo==="roll"){
    return`<div style="margin-bottom:6px"><label style="font-size:8px;letter-spacing:2px;color:var(--holo-dim)">${campo.lbl}</label>
      <div style="display:flex;gap:6px;margin-top:3px">
        <input type="number" id="campo-${campo.id}-${fid}" placeholder="Ex: 8" style="font-size:11px">
        <button class="btn btn-holo btn-xs" onclick="rolarDadoMacro('campo-${campo.id}-${fid}')">🎲</button>
      </div></div>`;
  }
  if(campo.tipo==="number"){
    return`<div style="margin-bottom:6px"><label style="font-size:8px;letter-spacing:2px;color:var(--holo-dim)">${campo.lbl}</label>
      <input type="number" id="campo-${campo.id}-${fid}" value="1" min="1" style="margin-top:3px;font-size:11px"></div>`;
  }
  if(campo.tipo==="text"){
    return`<div style="margin-bottom:6px"><label style="font-size:8px;letter-spacing:2px;color:var(--holo-dim)">${campo.lbl}</label>
      <input type="text" id="campo-${campo.id}-${fid}" placeholder="Nome..." style="margin-top:3px;font-size:11px"></div>`;
  }
  return"";
}
function rolarDadoMacro(inputId){
  const el=document.getElementById(inputId);if(!el)return;
  el.classList.add("rolling");
  let i=0;const iv=setInterval(()=>{el.value=Math.floor(Math.random()*20)+1;if(++i>8){clearInterval(iv);el.classList.remove("rolling")}},60);
}
function abrirPainelAcao(fid){
  const s=document.getElementById("asel-"+fid);
  const acao=s?.value||"Passar a Vez";
  const f=gF(fid);if(!f)return;
  // Executar efeito automático da ação
  if(acao==="Passar a Vez"){toast(`${f.n} passou a vez.`);passarVezMacro();return}
  if(acao==="Comprar Ativo"){
    const tipoSel=document.getElementById("campo-tipo_ativo-"+fid)?.value;
    const nomeSel=document.getElementById("campo-nome_ativo-"+fid)?.value;
    const def=TIPOS_ATIVO_COMPRA.find(t=>t.n===tipoSel)||TIPOS_ATIVO_COMPRA[0];
    if(f.fc<def.c){toast(`❌ ${f.n} não tem FC suficiente! Precisa de ${def.c}FC.`);return}
    if(!f.ativos)f.ativos=[];
    f.ativos.push({id:uid(),n:nomeSel||def.n,t:def.t,hp:def.mhp,mhp:def.mhp,c:def.c,s:false});
    f.fc-=def.c;
    toast(`✅ ${f.n} comprou "${nomeSel||def.n}" (-${def.c}FC)`);
    passarVezMacro();return;
  }
  if(acao==="Reparar Ativo (1FC=1HP)"){
    const aid=document.getElementById("campo-ativo_rep-"+fid)?.value;
    const fcGasto=parseInt(document.getElementById("campo-fc_rep-"+fid)?.value||1);
    const a=f.ativos?.find(x=>x.id===aid);
    if(!a){toast("Selecione um ativo!");return}
    if(f.fc<fcGasto){toast(`❌ FC insuficiente!`);return}
    const hpRec=Math.min(fcGasto,a.mhp-a.hp);
    a.hp=Math.min(a.mhp,a.hp+hpRec);f.fc-=hpRec;
    toast(`🔧 ${a.n}: +${hpRec}HP (-${hpRec}FC)`);
    passarVezMacro();return;
  }
  if(acao==="Atacar Ativo Inimigo"){
    const alvoSel=document.getElementById("campo-alvo_ativo-"+fid)?.value;
    const dado=parseInt(document.getElementById("campo-dado_atk-"+fid)?.value||0);
    if(!alvoSel||!dado){toast("Preencha os campos!");return}
    const [alvFid,alvAid]=alvoSel.split("|");
    const alvF=gF(alvFid);const alvA=alvF?.ativos?.find(x=>x.id===alvAid);
    if(!alvA){toast("Ativo alvo não encontrado!");return}
    const defesa=Math.floor(Math.random()*6)+1+(alvF?.fo||0);
    if(dado>defesa){
      const dano=Math.max(1,dado-defesa);
      alvA.hp=Math.max(0,alvA.hp-dano);
      if(alvA.hp===0){alvF.ativos=alvF.ativos.filter(x=>x.id!==alvAid);toast(`💥 ${f.n} DESTRUIU "${alvA.n}" de ${alvF.n}! (${dado} vs ${defesa})`)}
      else toast(`⚔️ ${f.n} atacou "${alvA.n}": -${dano}HP (${alvA.hp}/${alvA.mhp}HP restantes)`);
    } else {
      toast(`🛡️ Ataque falhou! ${f.n}:${dado} vs Defesa ${alvF.n}:${defesa}`);
    }
    if(f.fc>0)f.fc--;
    passarVezMacro();return;
  }
  if(acao==="Expandir Influência"){
    const dado=parseInt(document.getElementById("campo-dado_inf-"+fid)?.value||0);
    if(!dado){toast("Preencha a rolagem!");return}
    const total=dado+(f.ri||0);
    if(total>=8){f.ri=(f.ri||0)+1;f.fc=Math.max(0,f.fc-2);toast(`📈 ${f.n}: Riqueza +1 = ${f.ri} (-2FC). Renda futura aumentada!`)}
    else toast(`❌ ${f.n} falhou (${total} vs 8). Nenhum ganho.`);
    passarVezMacro();return;
  }
  if(acao==="Mover Ativo"){
    const aid=document.getElementById("campo-ativo_mover-"+fid)?.value;
    const destPid=document.getElementById("campo-dest_mover-"+fid)?.value;
    const a=f.ativos?.find(x=>x.id===aid);
    const destino=gP(destPid);
    if(!a||!destino){toast("Selecione o ativo e o destino!");return}
    if(f.fc<1){toast("❌ FC insuficiente! Custa 1FC.");return}
    a.pid=destPid;
    f.fc--;
    toast(`🚀 "${a.n}" está a caminho de ${destino.n} (-1FC). Fica inativo até o próximo turno.`);
    passarVezMacro();return;
  }
  if(acao==="Usar Habilidade do Ativo"){
    const aid=document.getElementById("campo-ativo_sel-"+fid)?.value;
    const a=f.ativos?.find(x=>x.id===aid);
    if(!a){toast("Selecione um ativo!");return}
    if(a.t==="Riqueza"){f.fc+=1;toast(`💰 "${a.n}" gerou +1 FC de renda extra ativada.`);}
    else if(a.t==="Astúcia"){
      const alvo=E.faccoes.filter(x=>x.id!==fid).flatMap(ff=>(ff.ativos||[]).filter(x=>x.s));
      if(alvo.length){const r=alvo[Math.floor(Math.random()*alvo.length)];r.s=false;toast(`🕵️ "${a.n}" revelou o ativo furtivo "${r.n}"!`);}
      else toast(`🕵️ "${a.n}" investigou, mas nenhum ativo furtivo inimigo foi encontrado.`);
    }
    else if(a.t==="Base"){toast(`🏛️ "${a.n}" concede +1 em ataques da facção enquanto estiver ativo.`);}
    else if(a.t==="Força"||a.t==="Militar"){
      const alvoAliado=f.ativos.find(x=>x.id!==a.id&&x.hp<x.mhp);
      if(alvoAliado){const cura=Math.min(2,alvoAliado.mhp-alvoAliado.hp);alvoAliado.hp+=cura;toast(`⚔️ "${a.n}" deu suporte tático: "${alvoAliado.n}" +${cura}HP.`);}
      else toast(`⚔️ "${a.n}" está em posição de combate, pronto para agir.`);
    }
    else if(a.t==="Espaço"){toast(`🚀 "${a.n}" está patrulhando e bloqueando movimentação inimiga no setor.`);}
    else toast(`✅ "${a.n}" usou sua habilidade especial.`);
    passarVezMacro();return;
  }
  if(acao==="Criar Posto Avançado"){
    const destPid=document.getElementById("campo-planeta_posto-"+fid)?.value;
    const tipoSel=document.getElementById("campo-tipo_posto-"+fid)?.value;
    const destino=gP(destPid);
    const def=TIPOS_ATIVO_COMPRA.find(t=>t.n===tipoSel)||TIPOS_ATIVO_COMPRA[0];
    if(!destino){toast("Selecione um planeta!");return}
    if(f.fc<3){toast("❌ FC insuficiente! Custa 3FC.");return}
    if(!f.ativos)f.ativos=[];
    f.ativos.push({id:uid(),n:`Posto Avançado (${destino.n})`,t:def.t,hp:Math.max(2,Math.round(def.mhp/2)),mhp:Math.max(2,Math.round(def.mhp/2)),c:3,s:true,pid:destPid});
    f.fc-=3;
    toast(`🏴 ${f.n} estabeleceu um Posto Avançado em ${destino.n} (-3FC). Ativo furtivo criado.`);
    passarVezMacro();return;
  }
  // Ações genéricas (fallback para ações não mapeadas)
  const sel=document.getElementById("asel-"+fid);
  toast(`✅ ${f.n}: ${sel?.value||acao} executada.`);
  passarVezMacro();
}
function processaRenda(fid){const f=gF(fid);if(!f)return;const r=renda(f);f.fc+=r;toast(`💰 ${f.n} +${r} FacCreds`);renderMacro()}
function toggleStealth(fid,aid){const f=gF(fid);const a=f?.ativos?.find(x=>x.id===aid);if(!a)return;a.s=!a.s;toast(`👁 ${a.n}: ${a.s?"Furtivo":"Visível"}`);renderMacro()}
function editHPAtivo(fid,aid){const f=gF(fid);const a=f?.ativos?.find(x=>x.id===aid);if(!a)return;const v=prompt(`HP de "${a.n}" (${a.hp}/${a.mhp}):`,a.hp);if(v===null)return;a.hp=cl(parseInt(v)||0,0,a.mhp);renderMacro()}
function delAtivo(fid,aid){const f=gF(fid);if(!f)return;f.ativos=f.ativos.filter(x=>x.id!==aid);toast("🗑️ Ativo removido.");renderMacro()}
let addAtivoFid=null; // id da facção-alvo enquanto o modal de compra/adição de ativo está aberto
function abrirAddAtivo(fid){
  const f=gF(fid);if(!f)return;
  addAtivoFid=fid;
  const catOpts=TIPOS_ATIVO_COMPRA.map((t,i)=>`<option value="${i}">${ti(t.t)} ${t.n} — ${t.c}FC, ${t.mhp}HP</option>`).join("");
  document.getElementById("maa-box").innerHTML=`
    <div class="modal-hdr"><div class="modal-title">⚔️ ADICIONAR ATIVO — ${f.n}</div><button class="btn btn-ghost btn-sm" onclick="fechaOv('ov-addativo')">✕</button></div>
    <label>Catálogo de Compras (as 10 opções padrão do jogo)</label>
    <select id="aa-catalogo" onchange="preencherAtivoCatalogo()">
      <option value="">— Personalizado (preencher tudo na mão abaixo) —</option>
      ${catOpts}
    </select>
    <div id="aa-desc-catalogo" style="font-size:10px;color:var(--holo-dim);margin:6px 0"></div>
    <div class="div"></div>
    <label>Nome do Ativo</label><input id="aa-nome" placeholder="Deixe em branco para usar o nome do catálogo">
    <div class="g2">
      <div><label>Tipo</label><select id="aa-tipo">
        <option>Força</option><option>Base</option><option>Astúcia</option><option>Riqueza</option><option>Espaço</option><option>Militar</option>
      </select></div>
      <div><label>HP Máximo</label><input type="number" id="aa-hp" value="6" min="1"></div>
    </div>
    <label>Custo de Referência (FC)</label><input type="number" id="aa-custo" value="2" min="0">
    <div style="display:flex;gap:8px;align-items:center;margin-top:14px;padding:10px;background:rgba(240,180,41,0.06);border:1px solid rgba(240,180,41,0.25);border-radius:var(--r)">
      <input type="checkbox" id="aa-cobrar" checked style="width:auto;margin:0">
      <label style="margin:0;font-size:11px;text-transform:none;letter-spacing:0;color:var(--text2)">Cobrar este custo em FacCreds de ${f.n} agora (desmarque para adicionar de graça — override do Mestre)</label>
    </div>
    <div class="flex gap8 mt16">
      <button class="btn btn-solid fw" onclick="confirmarAddAtivo()">✅ ADICIONAR</button>
      <button class="btn btn-ghost btn-sm" onclick="fechaOv('ov-addativo')">CANCELAR</button>
    </div>`;
  document.getElementById("ov-addativo").classList.remove("hidden");
}
function preencherAtivoCatalogo(){
  const idx=document.getElementById("aa-catalogo")?.value;
  const descEl=document.getElementById("aa-desc-catalogo");
  if(idx===""){if(descEl)descEl.textContent="";return}
  const def=TIPOS_ATIVO_COMPRA[Number(idx)];if(!def)return;
  const tipoSel=document.getElementById("aa-tipo");if(tipoSel)tipoSel.value=def.t;
  const hpEl=document.getElementById("aa-hp");if(hpEl)hpEl.value=def.mhp;
  const custoEl=document.getElementById("aa-custo");if(custoEl)custoEl.value=def.c;
  const nomeEl=document.getElementById("aa-nome");if(nomeEl&&!nomeEl.value)nomeEl.value=def.n;
  if(descEl)descEl.textContent=def.desc;
}
function confirmarAddAtivo(){
  const f=gF(addAtivoFid);if(!f)return;
  const nome=document.getElementById("aa-nome")?.value?.trim()||"Ativo Sem Nome";
  const tipo=document.getElementById("aa-tipo")?.value||"Força";
  const hp=Math.max(1,parseInt(document.getElementById("aa-hp")?.value)||6);
  const custo=Math.max(0,parseInt(document.getElementById("aa-custo")?.value)||0);
  const cobrar=document.getElementById("aa-cobrar")?.checked;
  if(cobrar&&f.fc<custo){toast(`❌ ${f.n} só tem ${f.fc}FC — este ativo custa ${custo}FC. Desmarque a opção de cobrar para adicionar mesmo assim.`);return}
  if(!f.ativos)f.ativos=[];
  f.ativos.push({id:uid(),n:nome,t:tipo,hp,mhp:hp,c:custo,s:false});
  if(cobrar)f.fc=Math.max(0,f.fc-custo);
  toast(`✅ "${nome}" adicionado a ${f.n}${cobrar?` (-${custo}FC)`:" (sem custo — override)"}`);
  fechaOv("ov-addativo");
  renderMacro();
  renderGMFaccoes();
}
function salvarHolonet(){E.holonet=document.getElementById("holonet-box")?.value||"";toast("📡 HoloNet salvo!")}
function limparHolonet(){const el=document.getElementById("holonet-box");if(el)el.value="";E.holonet=""}

// ══════════ COMBATE ══════════
function renderCombate(){
  document.getElementById("round-num").textContent=combat.round;
  const cl_=document.getElementById("comb-list"),ev=document.getElementById("comb-empty");
  if(!combat.list.length){cl_.innerHTML="";ev.classList.remove("hidden");return}
  ev.classList.add("hidden");
  const sorted=[...combat.list].sort((a,b)=>b.init-a.init);
  const cur=sorted.find(c=>!c.dead&&!c.done);
  document.getElementById("cur-turn").textContent=cur?`▶ ${cur.n.toUpperCase()}`:"— FIM DA RODADA";
  cl_.innerHTML=sorted.map(c=>{
    const pct=c.mhp>0?(c.hp/c.mhp)*100:0;
    const ch=pct>50?"var(--green)":pct>25?"var(--gold)":"var(--red)";
    const isC=!c.dead&&!c.done&&c===cur;
    const bds=[];
    if(c.surp)bds.push(tag("SURPRESO","#ff8c00"));
    if(c.del)bds.push(tag("ADIOU","#a855f7"));
    if(c.rdy)bds.push(tag("PREP.","#2980b9"));
    if(c.sth)bds.push(tag("FURTIVO","#7f8c8d"));
    return`<div class="crow ${isC?"current":""} ${c.dead?"dead":""} ${c.surp?"surprised":""} ${c.del?"delayed":""} ${c.type}-row">
      <div class="c-init">${c.init}</div>
      <div><div class="c-name">${c.n}</div><div style="display:flex;gap:3px;flex-wrap:wrap;margin-top:2px">${bds.join("")}</div></div>
      <div class="c-hp-wrap">
        <div class="c-hp-nums" onclick="editHP('${c.id}')" title="Clique para editar">${c.hp}/${c.mhp}</div>
        <div class="c-hp-bar"><div class="c-hp-fill" style="width:${pct}%;background:${ch};box-shadow:0 0 6px ${ch}44"></div></div>
      </div>
      <div class="c-def" title="Def. Reflexo">${c.dr||"—"}</div>
      <div class="c-def" title="Def. Vontade" style="color:var(--purple)">${c.dv||"—"}</div>
      <div style="font-size:9px;color:var(--holo-dim)">${c.cond||""}</div>
      <div class="c-acts">
        <button class="btn btn-ghost btn-xs" onclick="setS('${c.id}','del')" style="${c.del?"color:var(--purple)":""}">⏸</button>
        <button class="btn btn-ghost btn-xs" onclick="setS('${c.id}','rdy')" style="${c.rdy?"color:var(--holo-primary)":""}">🎯</button>
        <button class="btn btn-ghost btn-xs" onclick="setS('${c.id}','surp')">⚡</button>
        <button class="btn btn-ghost btn-xs" onclick="setS('${c.id}','sth')" style="${c.sth?"color:var(--holo-dim)":""}">👁</button>
        <button class="btn btn-red btn-xs"   onclick="toggleMorto('${c.id}')">☠</button>
      </div>
    </div>`;
  }).join("");
}
function abrirAddComb(){
  document.getElementById("mcomb-box").innerHTML=`
    <div class="modal-hdr"><div class="modal-title">➕ ADICIONAR COMBATENTE</div><button class="btn btn-ghost btn-sm" onclick="fechaOv('ov-comb')">✕</button></div>
    <label>Nome</label><input id="nc-n" placeholder="Ex: Luke Skywalker, Stormtrooper A">
    <label>Tipo</label><select id="nc-t"><option value="pc">PC — Jogador</option><option value="enemy">Inimigo</option><option value="npc">NPC Aliado</option></select>
    <div class="g2"><div><label>Mod. Iniciativa</label><input type="number" id="nc-im" value="0"></div><div><label>Iniciativa</label><input type="number" id="nc-i" value="0"></div></div>
    <div class="g2"><div><label>HP Atual</label><input type="number" id="nc-hp" value="30"></div><div><label>HP Máximo</label><input type="number" id="nc-mhp" value="30"></div></div>
    <div class="g2"><div><label>Def. Reflexo</label><input type="number" id="nc-dr" value="14"></div><div><label>Def. Vontade</label><input type="number" id="nc-dv" value="12"></div></div>
    <div style="display:flex;gap:8px;align-items:center;margin-top:10px"><input type="checkbox" id="nc-surp" style="width:auto;margin:0"><label style="margin:0;font-size:11px;text-transform:none;letter-spacing:0;color:var(--text2)">Começa Surpreso</label></div>
    <div style="display:flex;gap:8px;align-items:center;margin-top:6px"><input type="checkbox" id="nc-desp" style="width:auto;margin:0"><label style="margin:0;font-size:11px;text-transform:none;letter-spacing:0;color:var(--text2)">Desprevenido (sem bônus DEX)</label></div>
    <div class="flex gap8 mt16">
      <button class="btn btn-solid fw" onclick="addComb()">✅ ADICIONAR</button>
      <button class="btn btn-ghost btn-sm" onclick="rolarInitNC()">🎲 ROLAR INIT</button>
      <button class="btn btn-ghost btn-sm" onclick="fechaOv('ov-comb')">CANCELAR</button>
    </div>`;
  document.getElementById("ov-comb").classList.remove("hidden");
}
function rolarInitNC(){const m=parseInt(document.getElementById("nc-im")?.value)||0;document.getElementById("nc-i").value=Math.floor(Math.random()*20)+1+m}
function addComb(){
  const n=document.getElementById("nc-n")?.value?.trim();if(!n){toast("Digite um nome!");return}
  combat.list.push({id:uid(),n,type:document.getElementById("nc-t")?.value||"enemy",init:parseInt(document.getElementById("nc-i")?.value)||0,hp:parseInt(document.getElementById("nc-hp")?.value)||30,mhp:parseInt(document.getElementById("nc-mhp")?.value)||30,dr:parseInt(document.getElementById("nc-dr")?.value)||14,dv:parseInt(document.getElementById("nc-dv")?.value)||12,surp:document.getElementById("nc-surp")?.checked||false,dead:false,done:false,del:false,rdy:false,sth:false,cond:""});
  fechaOv("ov-comb");toast(`✅ ${n} adicionado!`);renderCombate();
}
function rolarTodasInit(){combat.list.forEach(c=>{c.init=Math.floor(Math.random()*20)+1});toast("🎲 Iniciativas roladas!");renderCombate()}
function nextTurn(){
  const s=[...combat.list].filter(c=>!c.dead).sort((a,b)=>b.init-a.init);
  const c=s.find(x=>!x.done);
  if(c){c.done=true}else{combat.round++;combat.list.forEach(c=>{c.done=false;c.surp=false});toast(`🔔 Rodada ${combat.round}!`)}
  renderCombate();
}
function addSurpresa(){toast("💥 Rodada de Surpresa ativa! Marque combatentes com ⚡.");renderCombate()}
function resetCombate(){combat={round:1,list:[]};renderCombate();toast("↺ Combate reiniciado.")}
function setS(id,s){const c=combat.list.find(x=>x.id===id);if(!c)return;if(s==="del"){c.del=!c.del;if(c.del)c.rdy=false}else if(s==="rdy"){c.rdy=!c.rdy;if(c.rdy)c.del=false}else if(s==="surp")c.surp=!c.surp;else if(s==="sth")c.sth=!c.sth;renderCombate()}
function toggleMorto(id){const c=combat.list.find(x=>x.id===id);if(!c)return;c.dead=!c.dead;renderCombate()}
function editHP(id){
  const c=combat.list.find(x=>x.id===id);if(!c)return;
  const v=prompt(`HP de ${c.n} (${c.hp}/${c.mhp})\nAbsoluto (30) ou relativo (+5, -8):`,c.hp);
  if(v===null)return;const s=v.toString().trim();
  c.hp=s.startsWith("+")||s.startsWith("-")?cl(c.hp+parseInt(s),0,c.mhp):cl(parseInt(s)||0,0,c.mhp);
  renderCombate();
}

// ══════════ COMÉRCIO ══════════
function renderComercio(){
  const ps=document.getElementById("calc-planeta");if(ps){ps.innerHTML=E.planetas.map(p=>`<option value="${p.id}">${p.n} (Fric.${p.fr})</option>`).join("");CS.pid=E.planetas[0]?.id||""}
  const is=document.getElementById("calc-item");if(is)is.innerHTML=MERCS.map(m=>`<option value="${m.n}">${m.n} — ₹${M(m.p)}/t</option>`).join("");
  const rg=document.getElementById("ref-grid");if(rg)rg.innerHTML=TV.map(r=>`<div class="mc ${r.pct>0?"pos":r.pct<0?"neg":"zero"}"><span class="mcs">≤${r.max===999?"∞":r.max}</span><span class="mcv">${r.l}</span></div>`).join("");
  const cl_=document.getElementById("cat-list");if(cl_)cl_.innerHTML=MERCS.map(m=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(0,50,100,0.3)"><div><div style="font-size:12px;font-weight:700;color:var(--text2)">${m.n}</div><div>${m.t.map(t=>tag(t,"var(--holo-primary)")).join("")}</div></div><div style="font-family:var(--font-mono);font-size:13px;color:var(--green);text-shadow:0 0 10px var(--green-glow)">₹${M(m.p)}</div></div>`).join("");
}
function setModo(m){CS.modo=m;document.getElementById("btn-venda").className=`btn ${m==="venda"?"btn-solid":"btn-holo"} fw`;document.getElementById("btn-compra").className=`btn ${m==="compra"?"btn-solid":"btn-holo"} fw`}
function autoFric(){const p=gP(document.getElementById("calc-planeta")?.value);if(p){document.getElementById("c-fric").value=p.fr;CS.pid=p.id}}
function autoPreco(){const n=document.getElementById("calc-item")?.value;const m=MERCS.find(x=>x.n===n);if(m){document.getElementById("c-preco").value=m.p;CS.item=n;CS.preco=m.p}}
function rolarCalc(){
  const dice=[Math.floor(Math.random()*6+1),Math.floor(Math.random()*6+1),Math.floor(Math.random()*6+1)];
  CS.dice=dice;CS.rolou=true;
  ["d1","d2","d3"].forEach((id,i)=>{const el=document.getElementById(id);el.classList.remove("rolling");void el.offsetWidth;setTimeout(()=>{el.classList.add("rolling");setTimeout(()=>{el.textContent=dice[i];el.classList.remove("rolling")},350)},i*120)});
  const exp=parseInt(document.getElementById("c-exp")?.value)||3;
  const fric=parseInt(document.getElementById("c-fric")?.value)||3;
  const mod=parseInt(document.getElementById("c-mod")?.value)||0;
  const qtd=parseInt(document.getElementById("c-qtd")?.value)||1;
  const preco=parseInt(document.getElementById("c-preco")?.value)||0;
  const soma=dice.reduce((a,b)=>a+b,0);
  const sc=CS.modo==="venda"?(soma+exp-fric+mod):(soma-exp+fric+mod);
  const mult=gM(sc);const pf=Math.round(preco*qtd*(1+mult.pct/100));
  CS={...CS,exp,fric,mod,qtd,preco,score:sc,mult,pf,item:document.getElementById("calc-item")?.value||CS.item,pid:document.getElementById("calc-planeta")?.value||CS.pid};
  document.getElementById("score-txt").innerHTML=`Soma: <strong>${soma}</strong> ${CS.modo==="venda"?`+${exp}exp −${fric}fric`:`−${exp}exp +${fric}fric`}${mod?` ${mod>0?"+":""}${mod}mod`:""} = <strong>${sc}</strong>`;
  const mg=document.getElementById("mult-grid");if(mg)mg.innerHTML=TV.map((r,i)=>{const ant=i>0?TV[i-1].max:0;const at=sc<=r.max&&sc>ant;return`<div class="mc ${at?"active":""} ${r.pct>0?"pos":r.pct<0?"neg":"zero"}"><span class="mcs">≤${r.max===999?"∞":r.max}</span><span class="mcv">${r.l}</span></div>`}).join("");
  document.getElementById("price-box")?.classList.remove("hidden");
  const pv=document.getElementById("price-val");if(pv){pv.className=`price-val ${CS.modo}`;pv.textContent=`${CS.modo==="venda"?"+":"-"}₹${M(pf)}`}
}
function confirmarTrade(){
  if(!CS.rolou){toast("Role os dados primeiro!");return}
  const p=gP(CS.pid);if(!p){toast("Selecione um planeta!");return}
  const delta=CS.modo==="venda"?CS.pf:-CS.pf;p.cr+=delta;
  const fac=gCtrl(p.fid);
  E.log.unshift({id:uid(),dt:"19 ABY",pl:p.n,pid:p.id,ac:CS.modo==="venda"?"VENDA":"COMPRA",it:`${CS.item} (${CS.qtd}t)`,res:CS.pf,rl:CS.dice.reduce((a,b)=>a+b,0),fac:fac?.n||"—"});
  if(E.log.length>100)E.log.pop();
  toast(`${CS.modo==="venda"?"✅ Venda":"📦 Compra"}: ₹${M(CS.pf)}`);
  CS.rolou=false;
  document.getElementById("price-box")?.classList.add("hidden");
  ["d1","d2","d3"].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent="–"});
  const st=document.getElementById("score-txt");if(st)st.textContent="";
  if(abaAtual==="painel")renderPainel();
}

// ══════════ MODAL PLANETA ══════════
function abrirPlaneta(id){const p=gP(id);if(!p)return;renderMP(p);document.getElementById("ov-planeta").classList.remove("hidden")}
function fechaOv(id){document.getElementById(id)?.classList.add("hidden");renderAba(abaAtual)}
function renderMP(p){
  const mhp=hpQG(p.qg),uso=hpU(p.hlds);
  const prox=p.qg<5?QG[p.qg+1]:null;
  const hOpts=HLD.map(h=>`<option value="${h.t}">${h.t} — ₹${M(h.c)} / ${h.hp}HP</option>`).join("");
  const hList=p.hlds.length===0?`<div style="font-size:11px;color:var(--holo-dim)">Nenhum holding estabelecido.</div>`:
    p.hlds.map(h=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(0,50,100,0.3)">
      <div><div style="font-size:12px;font-weight:700;color:var(--text2)">${h.n}</div><div style="font-size:10px;color:var(--holo-dim)">${h.t} • ${h.hp}HP • ₹${M(h.c)}</div></div>
      <button class="btn btn-red btn-xs" onclick="remHolding('${p.id}','${h.id}')">🗑️</button>
    </div>`).join("");
  document.getElementById("mp-box").innerHTML=`
    <div class="modal-hdr">
      <div><div class="modal-title" style="color:${p.cor}">${p.n}</div><div style="font-size:10px;color:var(--holo-dim);margin-top:3px">${p.tipo} • Fricção ${p.fr} • Limiar ${p.li}</div></div>
      <button class="btn btn-ghost btn-sm" onclick="fechaOv('ov-planeta')">✕ FECHAR</button>
    </div>
    <div class="g2 mb12">
      <div class="stat-box"><span class="stat-lbl">Créditos Locais</span><span class="stat-val green">₹${M(p.cr)}</span></div>
      <div class="stat-box"><span class="stat-lbl">QG Nv.${p.qg} — ${QG[p.qg]?.d}</span><span class="stat-val">${uso}/${mhp} HP</span></div>
    </div>
    <div class="div"></div>
    <div style="font-family:var(--font-hud);font-size:8px;letter-spacing:4px;color:var(--holo-dim);margin-bottom:8px">💱 CONVERTER → FACCREDS</div>
    <div style="font-size:10px;color:var(--holo-dim);margin-bottom:8px">100.000 ₹ = 1 FacCred • Os créditos saem do planeta</div>
    <div class="flex gap8"><input type="number" id="cv-v" placeholder="Ex: 500000" style="flex:1"><button class="btn btn-gold btn-sm" onclick="doConv('${p.id}')">CONVERTER</button></div>
    <div id="cv-prev" style="font-size:10px;color:var(--gold);margin-top:5px">→ 0 FacCreds</div>
    <div class="div"></div>
    <div style="font-family:var(--font-hud);font-size:8px;letter-spacing:4px;color:var(--holo-dim);margin-bottom:8px">🏗️ ADQUIRIR HOLDING</div>
    <select id="h-tipo" onchange="showHD()">${hOpts}</select>
    <div id="h-desc" style="font-size:10px;color:var(--holo-dim);margin:6px 0;line-height:1.5">${HLD[0].d}</div>
    <input id="h-nome" placeholder="Nome personalizado (opcional)">
    <button class="btn btn-holo btn-sm mt8 fw" onclick="doHolding('${p.id}')">ADQUIRIR HOLDING</button>
    ${prox?`<div class="div"></div>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div><div style="font-family:var(--font-hud);font-size:8px;letter-spacing:3px;color:var(--holo-dim)">⬆️ ATUALIZAR QG → Nv.${prox.n}</div>
      <div style="font-size:11px;color:var(--holo-dim);margin-top:3px">${prox.d} • ${prox.hp}HP • ₹${M(prox.c)}</div></div>
      <button class="btn btn-gold btn-sm" onclick="doQG('${p.id}')">ATUALIZAR</button>
    </div>`:""}
    <div class="div"></div>
    <div style="font-family:var(--font-hud);font-size:8px;letter-spacing:4px;color:var(--holo-dim);margin-bottom:10px">📦 HOLDINGS ATIVOS (${p.hlds.length})</div>
    ${hList}`;
  document.getElementById("cv-v")?.addEventListener("input",function(){document.getElementById("cv-prev").textContent="→ "+Math.floor(Number(this.value)/100000)+" FacCreds"});
}
function showHD(){const t=document.getElementById("h-tipo")?.value;const d=HLD.find(h=>h.t===t);const el=document.getElementById("h-desc");if(el&&d)el.textContent=d.d}
function doConv(pid){
  const val=Number(document.getElementById("cv-v")?.value||0);const fc=Math.floor(val/100000);
  if(fc<1){toast("Mínimo: 100.000 ₹ = 1 FacCred");return}
  const p=gP(pid);if(!p)return;if(p.cr<fc*100000){toast("Créditos insuficientes!");return}
  const ctrl=gCtrl(p.fid);
  if(!ctrl){toast("❌ Este planeta não tem Facção Controladora definida — não há para quem enviar os FacCreds. Defina uma facção (ou sub-facção) no Mestre ou no Criador primeiro.");return}
  p.cr-=fc*100000;ctrl.ref.fc=(ctrl.ref.fc||0)+fc;
  toast(`💱 ₹${M(fc*100000)} → ${fc} FacCreds para ${ctrl.n}`);renderMP(p);
}
function doHolding(pid){
  const t=document.getElementById("h-tipo")?.value;const n=document.getElementById("h-nome")?.value||t;
  const p=gP(pid);const def=HLD.find(h=>h.t===t);if(!p||!def)return;
  const livre=hpQG(p.qg)-hpU(p.hlds);
  if(def.hp>livre){toast(`HP insuficiente! Livre: ${livre}, Necessário: ${def.hp}`);return}
  if(p.cr<def.c){toast(`Faltam ₹${M(def.c-p.cr)}!`);return}
  p.cr-=def.c;p.hlds.push({id:uid(),t,c:def.c,hp:def.hp,n});
  toast(`✅ ${t} adquirido!`);renderMP(p);
}
function doQG(pid){
  const p=gP(pid);if(!p)return;const nx=p.qg+1;if(nx>5){toast("Nível máximo!");return}
  const c=QG[nx].c;if(p.cr<c){toast(`Faltam ₹${M(c-p.cr)}!`);return}
  p.cr-=c;p.qg=nx;toast(`🏢 QG ${p.n} → Nível ${nx}!`);renderMP(p);
}
function remHolding(pid,hid){const p=gP(pid);if(!p)return;p.hlds=p.hlds.filter(h=>h.id!==hid);toast("🗑️ Holding removido.");renderMP(p)}

// ══════════ CRIADOR ══════════
function renderCriador(){
  const el=document.getElementById("criador-resumo");if(!el)return;
  el.innerHTML=`
    <div><div style="font-size:8px;letter-spacing:3px;color:var(--holo-dim);text-transform:uppercase;margin-bottom:8px">Planetas (${E.planetas.length})</div>${E.planetas.map(p=>`<div style="font-size:12px;color:var(--text2);padding:3px 0">${p.n} ${tag(p.tipo,p.cor)}</div>`).join("")||'<div style="font-size:11px;color:var(--holo-dim)">Nenhum</div>'}</div>
    <div><div style="font-size:8px;letter-spacing:3px;color:var(--holo-dim);text-transform:uppercase;margin-bottom:8px">Facções (${E.faccoes.length})</div>${E.faccoes.map(f=>`<div style="font-size:12px;color:var(--text2);padding:3px 0">${f.i} ${f.n} (${f.subs?.length||0} sub, ${f.ativos?.length||0} ativos)</div>`).join("")}</div>`;
}
let cTipo="planeta",cTmpl="";
function abrirCriar(t){cTipo=t;cTmpl="";renderMC();document.getElementById("ov-criar").classList.remove("hidden")}
function mudaCriar(t){cTipo=t;cTmpl="";renderMC()}
function selTmpl(id){cTmpl=id;renderMC()}
function renderMC(){
  const nav=[["planeta","🌍 Planeta"],["faccao","🏴 Facção"],["subfaccao","⭐ Sub-Facção"],["setor","🗺️ Setor"]]
    .map(([t,l])=>`<button class="btn btn-sm ${cTipo===t?"btn-solid":"btn-ghost"}" onclick="mudaCriar('${t}')">${l}</button>`).join("");
  let corpo="";
  if(cTipo==="planeta")corpo=buildP();else if(cTipo==="faccao")corpo=buildF();else if(cTipo==="subfaccao")corpo=buildS();else if(cTipo==="setor")corpo=buildSe();
  document.getElementById("mc-box").innerHTML=`
    <div class="modal-hdr"><div class="modal-title">✨ CRIADOR GALÁCTICO</div><button class="btn btn-ghost btn-sm" onclick="fechaOv('ov-criar')">✕</button></div>
    <div class="flex gap8 mb12">${nav}</div><div class="div"></div>${corpo}`;
}
function buildP(){
  const tm=TP.find(x=>x.id===cTmpl);
  const cards=TP.map(t=>`<div class="tcard ${cTmpl===t.id?"sel":""}" onclick="selTmpl('${t.id}')" style="${cTmpl===t.id?`border-color:${t.cor}`:``}"><div class="tcard-name" style="color:${t.cor}">${t.n}</div><div class="tcard-desc">${t.d}</div><div class="tcard-meta">Fric.${t.f} • Limiar ${t.l}</div><div style="margin-top:4px">${Object.entries(t.m).map(([k,v])=>tag(`${k}${v>0?"+":""}${v}`,v>0?"#00ff88":"#ff3c3c")).join("")}</div></div>`).join("");
  const sets=E.setores.map(s=>`<option value="${s.id}">${s.n}</option>`).join("");
  const ex=cTmpl?`<div class="div"></div>
    <label>Nome do Planeta *</label><input id="cp-n" placeholder="Ex: Mandalore, Tatooine...">
    <label>Descrição</label><textarea id="cp-d" placeholder="Contexto narrativo..."></textarea>
    <div class="g2"><div><label>Fricção (1–5)</label><input type="number" id="cp-f" min="1" max="5" value="${tm?.f||3}"></div><div><label>Limiar (1–5)</label><input type="number" id="cp-l" min="1" max="5" value="${tm?.l||3}"></div></div>
    <div class="g2"><div><label>Créditos Iniciais</label><input type="number" id="cp-c" value="0"></div><div><label>Facção Controladora</label><select id="cp-fac">${optsControlador("")}</select></div></div>
    <label>Setor</label><select id="cp-set"><option value="">— Nenhum —</option>${sets}</select>
    <div class="flex gap8 mt16"><button class="btn btn-solid fw" onclick="salvaPlaneta()">✅ CRIAR PLANETA</button><button class="btn btn-ghost btn-sm" onclick="fechaOv('ov-criar')">CANCELAR</button></div>`:"";
  return`<div style="font-size:8px;letter-spacing:3px;color:var(--holo-dim);text-transform:uppercase;margin-bottom:10px">1. Selecione o Tipo Econômico</div><div class="tmpl-grid">${cards}</div>${ex}`;
}
function salvaPlaneta(){
  const n=document.getElementById("cp-n")?.value?.trim();if(!n){toast("Digite um nome!");return}
  const t=TP.find(x=>x.id===cTmpl);
  E.planetas.push({id:uid(),n,tipo:t?.n||"Custom",cor:t?.cor||"#00d4ff",d:document.getElementById("cp-d")?.value||"",fr:Number(document.getElementById("cp-f")?.value||3),li:Number(document.getElementById("cp-l")?.value||3),mods:t?.m||{},cr:Number(document.getElementById("cp-c")?.value||0),qg:1,hlds:[],fid:document.getElementById("cp-fac")?.value||"",sid:document.getElementById("cp-set")?.value||""});
  toast(`🌍 "${n}" criado!`);fechaOv("ov-criar");
}
function buildF(){
  const tm=TF.find(x=>x.id===cTmpl);
  const cards=TF.map(t=>`<div class="tcard ${cTmpl===t.id?"sel":""}" onclick="selTmpl('${t.id}')"><div class="tcard-name" style="color:${t.cor}">${t.i} ${t.n}</div><div class="tcard-desc">${t.d}</div></div>`).join("");
  const ex=cTmpl?`<div class="div"></div>
    <label>Nome *</label><input id="cf-n" value="${tm&&tm.id!=="custom"?tm.n:""}">
    <label>Descrição</label><textarea id="cf-d">${tm&&tm.id!=="custom"?tm.d:""}</textarea>
    <div class="g4"><div><label>FacCreds</label><input type="number" id="cf-fc" value="0"></div><div><label>Força</label><input type="number" id="cf-fo" value="2"></div><div><label>Astúcia</label><input type="number" id="cf-as" value="2"></div><div><label>Riqueza</label><input type="number" id="cf-ri" value="2"></div></div>
    <div class="flex gap8 mt16"><button class="btn btn-solid fw" onclick="salvaFaccao()">✅ CRIAR FACÇÃO</button><button class="btn btn-ghost btn-sm" onclick="fechaOv('ov-criar')">CANCELAR</button></div>`:"";
  return`<div class="tmpl-grid">${cards}</div>${ex}`;
}
function salvaFaccao(){
  const n=document.getElementById("cf-n")?.value?.trim();if(!n){toast("Digite um nome!");return}
  const t=TF.find(x=>x.id===cTmpl);
  E.faccoes.push({id:uid(),n,d:document.getElementById("cf-d")?.value||"",cor:t?.cor||"#00d4ff",i:t?.i||"🏴",fc:Number(document.getElementById("cf-fc")?.value||0),fo:Number(document.getElementById("cf-fo")?.value||2),as:Number(document.getElementById("cf-as")?.value||2),ri:Number(document.getElementById("cf-ri")?.value||2),subs:[],ativos:[]});
  toast(`🏴 "${n}" criada!`);fechaOv("ov-criar");
}
function buildS(){
  const facs=E.faccoes.map(f=>`<option value="${f.id}">${f.i} ${f.n}</option>`).join("");
  return`<label>Facção Pai *</label><select id="cs-fp">${facs||"<option>Crie uma facção primeiro</option>"}</select>
    <label>Nome *</label><input id="cs-n" placeholder="Ex: Esquadrão Fantasma">
    <label>Descrição</label><textarea id="cs-d" placeholder="Papel desta divisão..."></textarea>
    <label>Cor</label><input type="color" id="cs-cor" value="#e74c3c" style="width:48px;height:32px;border:none;background:none;cursor:pointer;margin-top:4px">
    <div class="flex gap8 mt16"><button class="btn btn-solid fw" onclick="salvaSubfac()">✅ CRIAR</button><button class="btn btn-ghost btn-sm" onclick="fechaOv('ov-criar')">CANCELAR</button></div>`;
}
function salvaSubfac(){
  const n=document.getElementById("cs-n")?.value?.trim();if(!n){toast("Digite um nome!");return}
  const fId=document.getElementById("cs-fp")?.value;const f=gF(fId);if(!f){toast("Selecione a facção pai!");return}
  if(!f.subs)f.subs=[];
  f.subs.push({id:uid(),n,d:document.getElementById("cs-d")?.value||"",cor:document.getElementById("cs-cor")?.value||f.cor,
    fc:0,meta:{ativa:false,desc:"",valor:0,atual:0,unidade:""}});
  toast(`⭐ "${n}" criada em ${f.n}`);fechaOv("ov-criar");
}
function buildSe(){
  const tm=TS.find(x=>x.id===cTmpl);
  const cards=TS.map(t=>`<div class="tcard ${cTmpl===t.id?"sel":""}" onclick="selTmpl('${t.id}')" style="display:flex;justify-content:space-between;align-items:center"><div><div class="tcard-name">${t.n}</div><div class="tcard-desc">${t.d}</div></div>${tag("Fric."+t.f,"var(--holo-primary)")}</div>`).join("");
  const facs=E.faccoes.map(f=>`<option value="${f.id}">${f.i} ${f.n}</option>`).join("");
  const ex=cTmpl?`<div class="div"></div>
    <label>Nome *</label><input id="cse-n" placeholder="Ex: Setor de Lothal">
    <label>Descrição</label><textarea id="cse-d">${tm?.d||""}</textarea>
    <div class="g2"><div><label>Fricção Base</label><input type="number" id="cse-f" min="1" max="5" value="${tm?.f||3}"></div><div><label>Facção Dominante</label><select id="cse-fac"><option value="">— Nenhuma —</option>${facs}</select></div></div>
    <div class="flex gap8 mt16"><button class="btn btn-solid fw" onclick="salvaSetor()">✅ CRIAR</button><button class="btn btn-ghost btn-sm" onclick="fechaOv('ov-criar')">CANCELAR</button></div>`:"";
  return`<div style="display:flex;flex-direction:column;gap:8px">${cards}</div>${ex}`;
}
function salvaSetor(){
  const n=document.getElementById("cse-n")?.value?.trim();if(!n){toast("Digite um nome!");return}
  E.setores.push({id:uid(),n,d:document.getElementById("cse-d")?.value||"",f:Number(document.getElementById("cse-f")?.value||3),fid:document.getElementById("cse-fac")?.value||""});
  toast(`🗺️ "${n}" criado!`);fechaOv("ov-criar");
}

// ══════════ GM — CONTROLE TOTAL ══════════
let gmSecAtual="planetas";
function gmAba(sec,btn){
  gmSecAtual=sec;
  ["planetas","faccoes","financas","notas"].forEach(s=>{
    const el=document.getElementById("gm-sec-"+s);
    if(el)el.classList.toggle("hidden",s!==sec);
  });
  document.querySelectorAll("[id^='gm-tab-']").forEach(b=>b.classList.remove("on"));
  if(btn)btn.classList.add("on");
  if(sec==="planetas")renderGMPlanetas();
  else if(sec==="faccoes")renderGMFaccoes();
  else if(sec==="financas")renderGMFinancas();
  else if(sec==="notas"){const gn=document.getElementById("gm-notas");if(gn)gn.value=E.gmNotas||"";}
}

function renderGM(){
  renderGMPlanetas();
  renderGMFinancas();
  const gn=document.getElementById("gm-notas");if(gn)gn.value=E.gmNotas||"";
}

function renderGMPlanetas(){
  const el=document.getElementById("gm-planetas-list");if(!el)return;
  el.innerHTML=E.planetas.length===0
    ?`<div class="hcard" style="text-align:center;padding:30px;color:var(--holo-dim)">Nenhum planeta criado.</div>`
    :E.planetas.map(p=>{
      const fac=gCtrl(p.fid);
      const hOpts=HLD.map(h=>`<option value="${h.t}">${h.t} (${h.hp}HP — ₹${M(h.c)})</option>`).join("");
      const hList=p.hlds.length===0
        ?`<div style="font-size:11px;color:var(--holo-dim)">Sem holdings</div>`
        :p.hlds.map(h=>`<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(0,50,100,0.3)">
            <div style="flex:1"><span style="font-size:11px;font-weight:700;color:var(--text2)">${h.n}</span><span style="font-size:9px;color:var(--holo-dim);margin-left:8px">${h.t} • ${h.hp}HP</span></div>
            <button class="btn btn-ghost btn-xs" onclick="gmRenomearHolding('${p.id}','${h.id}')">✏️</button>
            <button class="btn btn-red btn-xs" onclick="gmDelHoldingDir('${p.id}','${h.id}')">🗑️</button>
          </div>`).join("");
      return`<div class="hcard purple mb12">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <div style="font-family:var(--font-hud);font-size:13px;font-weight:700;color:${p.cor};text-shadow:0 0 12px ${p.cor}44">${p.n}</div>
          <div class="flex gap8">
            <button class="btn btn-ghost btn-xs" onclick="gmEditarPlaneta('${p.id}')">✏️ EDITAR</button>
            <button class="btn btn-red btn-xs" onclick="gmDelPlanetaDir('${p.id}')">🗑️ DELETAR</button>
          </div>
        </div>
        <div class="g4 mb8" style="gap:8px">
          <div class="stat-box" style="padding:8px"><span class="stat-lbl">Créditos</span><span class="stat-val green" style="font-size:13px">₹${M(p.cr)}</span></div>
          <div class="stat-box" style="padding:8px"><span class="stat-lbl">Fricção</span><span class="stat-val gold" style="font-size:18px">${p.fr}</span></div>
          <div class="stat-box" style="padding:8px"><span class="stat-lbl">QG Nível</span><span class="stat-val" style="font-size:18px">${p.qg}</span></div>
          <div class="stat-box" style="padding:8px"><span class="stat-lbl">Facção</span><span style="font-size:10px;color:${fac?.cor||'var(--holo-dim)'}">${fac?fac.i+" "+fac.n:"—"}</span></div>
        </div>
        <!-- Edição inline rápida -->
        <div class="g4" style="gap:8px;margin-bottom:10px">
          <div><label>Créditos</label><div class="flex gap4"><input type="number" id="gm-cr-${p.id}" value="${p.cr}" style="font-size:11px"><button class="btn btn-ghost btn-xs" onclick="gmSetCr('${p.id}')">✓</button></div></div>
          <div><label>Fricção</label><div class="flex gap4"><input type="number" id="gm-fr-${p.id}" value="${p.fr}" min="1" max="5" style="font-size:11px"><button class="btn btn-ghost btn-xs" onclick="gmSetFr('${p.id}')">✓</button></div></div>
          <div><label>QG Nível</label><div class="flex gap4"><input type="number" id="gm-qg-${p.id}" value="${p.qg}" min="1" max="5" style="font-size:11px"><button class="btn btn-ghost btn-xs" onclick="gmSetQG('${p.id}')">✓</button></div></div>
          <div><label>Facção</label><select id="gm-fac-${p.id}" onchange="gmSetFac('${p.id}')" style="font-size:10px">${optsControlador(p.fid)}</select></div>
        </div>
        <!-- Holdings deste planeta -->
        <div style="font-size:8px;letter-spacing:3px;color:var(--holo-dim);text-transform:uppercase;margin-bottom:6px">HOLDINGS</div>
        ${hList}
        <div class="flex gap8 mt8">
          <select id="gm-add-h-${p.id}" style="font-size:10px;flex:1">${hOpts}</select>
          <input id="gm-add-hn-${p.id}" placeholder="Nome" style="font-size:10px;flex:1">
          <button class="btn btn-holo btn-xs" onclick="gmAddHolding('${p.id}')">+ ADD</button>
        </div>
      </div>`;
    }).join("");
}

function renderGMFaccoes(){
  const el=document.getElementById("gm-faccoes-list");if(!el)return;
  el.innerHTML=E.faccoes.map(f=>{
    const planFac=E.planetas.filter(p=>p.fid===f.id);
    return`<div class="hcard purple mb12">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div style="font-family:var(--font-hud);font-size:13px;font-weight:700;color:${f.cor};text-shadow:0 0 12px ${f.cor}44">${f.i} ${f.n}</div>
        <div class="flex gap8">
          <button class="btn btn-ghost btn-xs" onclick="gmRenomearFac('${f.id}')">✏️ RENOMEAR</button>
          <button class="btn btn-red btn-xs" onclick="gmDelFaccao('${f.id}')">🗑️ DELETAR</button>
        </div>
      </div>
      <!-- Edição inline de atributos -->
      <div class="g4" style="gap:8px;margin-bottom:12px">
        <div><label>FacCreds</label><div class="flex gap4"><input type="number" id="gm-fc-${f.id}" value="${f.fc}" style="font-size:11px"><button class="btn btn-ghost btn-xs" onclick="gmSetAtrib('${f.id}','fc')">✓</button></div></div>
        <div><label>Força</label><div class="flex gap4"><input type="number" id="gm-fo-${f.id}" value="${f.fo||0}" min="0" style="font-size:11px"><button class="btn btn-ghost btn-xs" onclick="gmSetAtrib('${f.id}','fo')">✓</button></div></div>
        <div><label>Astúcia</label><div class="flex gap4"><input type="number" id="gm-as-${f.id}" value="${f.as||0}" min="0" style="font-size:11px"><button class="btn btn-ghost btn-xs" onclick="gmSetAtrib('${f.id}','as')">✓</button></div></div>
        <div><label>Riqueza</label><div class="flex gap4"><input type="number" id="gm-ri-${f.id}" value="${f.ri||0}" min="0" style="font-size:11px"><button class="btn btn-ghost btn-xs" onclick="gmSetAtrib('${f.id}','ri')">✓</button></div></div>
      </div>
      <!-- Sub-facções -->
      <div style="font-size:8px;letter-spacing:3px;color:var(--holo-dim);text-transform:uppercase;margin-bottom:6px">SUB-FACÇÕES (${f.subs?.length||0}) — também podem controlar planetas e têm FC próprio</div>
      ${(f.subs||[]).map(s=>{
        const planSub=E.planetas.filter(p=>p.fid===s.id);
        const metaPct=(s.meta?.ativa&&s.meta.valor>0)?Math.min(100,(s.meta.atual/s.meta.valor*100)):0;
        return`<div style="background:rgba(0,20,44,0.5);border:1px solid rgba(168,85,247,0.25);border-radius:var(--r);padding:10px;margin-bottom:8px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
            <div class="fac-dot" style="background:${s.cor||f.cor}"></div>
            <div style="flex:1;font-size:12px;font-weight:700;color:var(--text2)">⭐ ${s.n}</div>
            <span style="font-size:10px;color:var(--gold)">${s.fc||0} FC</span>
            <button class="btn btn-ghost btn-xs" onclick="gmRenomearSub('${f.id}','${s.id}')">✏️</button>
            <button class="btn btn-red btn-xs" onclick="gmDelSub('${f.id}','${s.id}')">🗑️</button>
          </div>
          ${s.d?`<div style="font-size:10px;color:var(--holo-dim);margin-bottom:6px">${s.d}</div>`:""}
          <div class="flex gap8 mb8">
            <input type="number" id="gm-subfc-${s.id}" placeholder="Quanto ajudar (FC)" style="font-size:10px;flex:1">
            <button class="btn btn-gold btn-xs" onclick="gmAjudarSub('${f.id}','${s.id}')">💰 Facção-Mãe Ajuda</button>
            <button class="btn btn-ghost btn-xs" onclick="gmEditarMetaSub('${f.id}','${s.id}')">🎯 Meta</button>
          </div>
          ${s.meta?.ativa?`<div style="margin-bottom:4px">
            <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text2);margin-bottom:3px">
              <span>${s.meta.desc||"Meta"}</span><span>${s.meta.atual}/${s.meta.valor} ${s.meta.unidade||""}</span>
            </div>
            <div class="prog-track"><div class="prog-fill" style="width:${metaPct}%;background:var(--purple)"></div></div>
            <div class="flex gap8 mt4">
              <input type="number" id="gm-submeta-${s.id}" placeholder="+ progresso" style="font-size:10px;flex:1">
              <button class="btn btn-holo btn-xs" onclick="gmAvancarMetaSub('${f.id}','${s.id}')">+ AVANÇAR</button>
            </div>
          </div>`:`<div style="font-size:10px;color:var(--holo-dim);margin-bottom:4px">Sem meta ativa. Clique 🎯 Meta para definir uma.</div>`}
          <div style="font-size:9px;color:var(--holo-dim)">🌍 Planetas controlados por esta sub: ${planSub.length===0?"nenhum":planSub.map(p=>p.n).join(", ")}</div>
        </div>`;
      }).join("")}
      <button class="btn btn-ghost btn-xs mt8" onclick="abrirCriar('subfaccao')">+ SUB-FACÇÃO</button>
      <!-- Planetas controlados diretamente pela facção-mãe -->
      <div style="font-size:8px;letter-spacing:3px;color:var(--holo-dim);text-transform:uppercase;margin:10px 0 6px">PLANETAS CONTROLADOS DIRETAMENTE (${planFac.length})</div>
      ${planFac.length===0?`<div style="font-size:11px;color:var(--holo-dim)">Nenhum (planetas controlados por sub-facções aparecem dentro de cada sub, acima)</div>`:planFac.map(p=>`<div style="font-size:11px;color:var(--text2);padding:3px 0">${p.n} <span style="color:var(--holo-dim)">— ₹${M(p.cr)}</span></div>`).join("")}
      <!-- Ativos -->
      <div style="font-size:8px;letter-spacing:3px;color:var(--holo-dim);text-transform:uppercase;margin:10px 0 6px">ATIVOS (${f.ativos?.length||0})</div>
      ${(f.ativos||[]).map(a=>`<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(0,50,100,0.3)">
        <span>${ti(a.t)}</span>
        <div style="flex:1;font-size:11px;color:var(--text2)">${a.n} <span style="color:var(--holo-dim)">${a.hp}/${a.mhp}HP • ${a.c}FC</span></div>
        <input type="number" value="${a.hp}" min="0" max="${a.mhp}" style="width:52px;font-size:10px;padding:3px 6px" onchange="gmSetHPAtivo('${f.id}','${a.id}',this.value)">
        <button class="btn btn-ghost btn-xs" onclick="gmRenomearAtivo('${f.id}','${a.id}')">✏️</button>
        <button class="btn btn-red btn-xs" onclick="delAtivo('${f.id}','${a.id}');renderGMFaccoes()">🗑️</button>
      </div>`).join("")}
      <button class="btn btn-ghost btn-xs mt8" onclick="abrirAddAtivo('${f.id}')">+ ATIVO</button>
    </div>`;
  }).join("");
}

function renderGMFinancas(){
  const opts=E.planetas.map(p=>`<option value="${p.id}">${p.n} (₹${M(p.cr)})</option>`).join("");
  const de=document.getElementById("gm-de"),para=document.getElementById("gm-para");
  if(de)de.innerHTML=opts;if(para)para.innerHTML=opts;
  const fs=document.getElementById("gm-fac");
  if(fs)fs.innerHTML=E.faccoes.map(f=>{
    let opts=`<option value="${f.id}">${f.i} ${f.n} (${f.fc}FC)</option>`;
    (f.subs||[]).forEach(s=>{opts+=`<option value="${s.id}">　⭐ ${s.n} (${s.fc||0}FC, sub de ${f.n})</option>`});
    return opts;
  }).join("");
}

// ── GM setters inline ──
function gmSetCr(pid){const p=gP(pid);if(!p)return;const v=Number(document.getElementById("gm-cr-"+pid)?.value||0);p.cr=Math.max(0,v);toast(`₹${M(p.cr)} em ${p.n}`);renderGMPlanetas()}
function gmSetFr(pid){const p=gP(pid);if(!p)return;const v=cl(Number(document.getElementById("gm-fr-"+pid)?.value||3),1,5);p.fr=v;toast(`Fricção de ${p.n}: ${v}`);renderGMPlanetas()}
function gmSetQG(pid){const p=gP(pid);if(!p)return;const v=cl(Number(document.getElementById("gm-qg-"+pid)?.value||1),1,5);p.qg=v;toast(`QG de ${p.n}: Nível ${v}`);renderGMPlanetas()}
function gmSetFac(pid){const p=gP(pid);if(!p)return;p.fid=document.getElementById("gm-fac-"+pid)?.value||"";toast(`Facção de ${p.n} atualizada`);renderGMPlanetas()}
function gmAddHolding(pid){
  const t=document.getElementById("gm-add-h-"+pid)?.value;
  const n=document.getElementById("gm-add-hn-"+pid)?.value||t;
  const p=gP(pid);const def=HLD.find(h=>h.t===t);if(!p||!def)return;
  p.hlds.push({id:uid(),t,c:def.c,hp:def.hp,n});
  toast(`✅ ${n} adicionado em ${p.n} (SEM custo — override GM)`);renderGMPlanetas();
}
function gmDelHoldingDir(pid,hid){
  const p=gP(pid);if(!p)return;
  const h=p.hlds.find(x=>x.id===hid);if(!h)return;
  p.hlds=p.hlds.filter(x=>x.id!==hid);toast(`🗑️ "${h.n}" removido`);renderGMPlanetas();
}
function gmRenomearHolding(pid,hid){
  const p=gP(pid);const h=p?.hlds.find(x=>x.id===hid);if(!h)return;
  const n=prompt("Novo nome:",h.n);if(n===null)return;h.n=n;renderGMPlanetas();
}
function gmDelPlanetaDir(pid){
  const p=gP(pid);if(!p)return;
  if(!confirm(`Deletar planeta "${p.n}"?\n\nTodos os holdings serão perdidos. Ação irreversível!`))return;
  E.planetas=E.planetas.filter(x=>x.id!==pid);toast(`💥 "${p.n}" deletado!`);renderGMPlanetas();
}
let editModsTemp=[]; // rascunho dos modificadores de mercadoria enquanto o modal de edição de planeta está aberto
let editPlanetaPid=null; // id do planeta sendo editado no modal completo
function gmEditarPlaneta(pid){
  const p=gP(pid);if(!p)return;
  editPlanetaPid=pid;
  editModsTemp=Object.entries(p.mods||{}).map(([k,v])=>({k,v}));
  renderEditPlanetaModal(pid);
  document.getElementById("ov-editplaneta").classList.remove("hidden");
}
function renderEditPlanetaModal(pid){
  const p=gP(pid);if(!p)return;
  const tipoOpts=TP.map(t=>`<option value="${t.id}" ${p.tipo===t.n?"selected":""}>${t.n}</option>`).join("")+`<option value="_custom" ${!TP.some(t=>t.n===p.tipo)?"selected":""}>Personalizado / Outro</option>`;
  const setOpts=`<option value="">— Nenhum —</option>`+E.setores.map(s=>`<option value="${s.id}" ${p.sid===s.id?"selected":""}>${s.n}</option>`).join("");
  const modsHtml=editModsTemp.map((m,i)=>`<div class="flex gap8 mb8" style="align-items:center">
      <input type="text" value="${m.k}" placeholder="Ex: Minerais" style="flex:2;font-size:11px" onchange="editModsTemp[${i}].k=this.value">
      <input type="number" value="${m.v}" placeholder="Ex: 2 ou -1" style="flex:1;font-size:11px" onchange="editModsTemp[${i}].v=Number(this.value)">
      <button class="btn btn-red btn-xs" onclick="removeModRow(${i})">✕</button>
    </div>`).join("")||`<div style="font-size:11px;color:var(--holo-dim);margin-bottom:8px">Nenhum modificador de mercadoria definido.</div>`;
  document.getElementById("mep-box").innerHTML=`
    <div class="modal-hdr"><div class="modal-title">✏️ EDITAR PLANETA — TODOS OS CAMPOS</div><button class="btn btn-ghost btn-sm" onclick="fechaOv('ov-editplaneta')">✕</button></div>
    <label>Nome</label><input id="ep-n" value="${p.n}">
    <label>Descrição</label><textarea id="ep-d">${p.d||""}</textarea>
    <div class="g2">
      <div><label>Tipo Econômico</label><select id="ep-tipo">${tipoOpts}</select></div>
      <div><label>Cor</label><input type="color" id="ep-cor" value="${p.cor||"#00d4ff"}" style="width:100%;height:36px;border:none;background:none;cursor:pointer;margin-top:4px"></div>
    </div>
    <div class="g4">
      <div><label>Fricção (1-5)</label><input type="number" id="ep-fr" min="1" max="5" value="${p.fr}"></div>
      <div><label>Limiar (1-5)</label><input type="number" id="ep-li" min="1" max="5" value="${p.li}"></div>
      <div><label>Créditos (₹)</label><input type="number" id="ep-cr" value="${p.cr}"></div>
      <div><label>QG Nível</label><select id="ep-qg">${[1,2,3,4,5].map(n=>`<option value="${n}" ${p.qg===n?"selected":""}>Nível ${n} (${hpQG(n)}HP)</option>`).join("")}</select></div>
    </div>
    <div class="g2">
      <div><label>Facção Controladora</label><select id="ep-fac">${optsControlador(p.fid)}</select></div>
      <div><label>Setor</label><select id="ep-sid">${setOpts}</select></div>
    </div>
    <div class="div"></div>
    <label style="margin-top:0">Modificadores de Preço por Tipo de Mercadoria</label>
    <div style="font-size:10px;color:var(--holo-dim);margin-bottom:8px">Ex: chave "Minerais", valor +2 (mais barato comprar aqui) ou -1 (item raro, vende mais caro).</div>
    <div id="ep-mods-list">${modsHtml}</div>
    <button class="btn btn-ghost btn-xs" onclick="addModRow()">+ ADICIONAR MODIFICADOR</button>
    <div class="flex gap8 mt16">
      <button class="btn btn-solid fw" onclick="salvarEdicaoPlaneta('${pid}')">✅ SALVAR TUDO</button>
      <button class="btn btn-ghost btn-sm" onclick="fechaOv('ov-editplaneta')">CANCELAR</button>
    </div>`;
}
function addModRow(){editModsTemp.push({k:"",v:0});renderEditPlanetaModal(editPlanetaPid)}
function removeModRow(i){editModsTemp.splice(i,1);renderEditPlanetaModal(editPlanetaPid)}
function salvarEdicaoPlaneta(pid){
  const p=gP(pid);if(!p)return;
  const nome=document.getElementById("ep-n")?.value?.trim();
  if(!nome){toast("O nome não pode ficar vazio!");return}
  p.n=nome;
  p.d=document.getElementById("ep-d")?.value||"";
  const tipoId=document.getElementById("ep-tipo")?.value;
  const tm=TP.find(t=>t.id===tipoId);
  p.tipo=tm?tm.n:(p.tipo||"Personalizado");
  p.cor=document.getElementById("ep-cor")?.value||p.cor;
  p.fr=cl(Number(document.getElementById("ep-fr")?.value||3),1,5);
  p.li=cl(Number(document.getElementById("ep-li")?.value||3),1,5);
  p.cr=Math.max(0,Number(document.getElementById("ep-cr")?.value||0));
  p.qg=cl(Number(document.getElementById("ep-qg")?.value||1),1,5);
  p.fid=document.getElementById("ep-fac")?.value||"";
  p.sid=document.getElementById("ep-sid")?.value||"";
  const novosMods={};
  editModsTemp.forEach(m=>{if(m.k&&m.k.trim())novosMods[m.k.trim()]=Number(m.v)||0});
  p.mods=novosMods;
  toast(`✏️ "${p.n}" atualizado por completo!`);
  fechaOv("ov-editplaneta");
  renderGMPlanetas();
}
function gmSetAtrib(fid,attr){
  const f=gF(fid);if(!f)return;
  const v=Number(document.getElementById(`gm-${attr}-${fid}`)?.value||0);
  f[attr]=Math.max(0,v);toast(`${f.n}: ${attr}=${f[attr]}`);renderGMFaccoes();
}
function gmSetHPAtivo(fid,aid,val){
  const f=gF(fid);const a=f?.ativos?.find(x=>x.id===aid);if(!a)return;
  a.hp=cl(parseInt(val)||0,0,a.mhp);
}
function gmRenomearAtivo(fid,aid){
  const f=gF(fid);const a=f?.ativos?.find(x=>x.id===aid);if(!a)return;
  const n=prompt("Novo nome:",a.n);if(n===null)return;a.n=n;renderGMFaccoes();
}
function gmRenomearFac(fid){
  const f=gF(fid);if(!f)return;
  const n=prompt("Novo nome:",f.n);if(n===null||!n.trim())return;
  f.n=n.trim();toast(`✏️ Facção renomeada para "${f.n}"`);renderGMFaccoes();
}
function gmDelFaccao(fid){
  const f=gF(fid);if(!f)return;
  if(!confirm(`Deletar facção "${f.n}"?\n\nTodos os ativos e sub-facções serão perdidos. Ação irreversível!`))return;
  const idsParaDesvincular=[fid,...(f.subs||[]).map(s=>s.id)];
  E.faccoes=E.faccoes.filter(x=>x.id!==fid);
  E.planetas.forEach(p=>{if(idsParaDesvincular.includes(p.fid))p.fid=""});
  toast(`🗑️ Facção "${f.n}" deletada!`);renderGMFaccoes();
}
function gmDelSub(fid,sid){
  const f=gF(fid);if(!f)return;
  if(!f.subs)return;
  const s=f.subs.find(x=>x.id===sid);
  if(!confirm(`Deletar sub-facção "${s?.n}"?\n\nPlanetas controlados por ela ficarão sem Facção Controladora.`))return;
  f.subs=f.subs.filter(x=>x.id!==sid);
  E.planetas.forEach(p=>{if(p.fid===sid)p.fid=""});
  toast(`🗑️ Sub-facção removida`);renderGMFaccoes();renderGMPlanetas();
}
function gmAjudarSub(fid,sid){
  const f=gF(fid);const r=gSub(sid);if(!f||!r)return;
  const v=Number(document.getElementById("gm-subfc-"+sid)?.value||0);
  if(v<=0){toast("Digite um valor válido de FC para ajudar.");return}
  if(f.fc<v){toast(`❌ ${f.n} só tem ${f.fc} FC — insuficiente!`);return}
  f.fc-=v;r.sub.fc=(r.sub.fc||0)+v;
  toast(`💰 ${f.n} ajudou ${r.sub.n} com ${v} FC.`);renderGMFaccoes();
}
function gmEditarMetaSub(fid,sid){
  const r=gSub(sid);if(!r)return;
  const s=r.sub;
  const querAtiva=confirm(`Definir meta para "${s.n}"?\n\nOK = criar/editar a meta\nCancelar = desativar a meta (sem apagar o progresso salvo)`);
  if(!querAtiva){if(s.meta)s.meta.ativa=false;else s.meta={ativa:false,desc:"",valor:0,atual:0,unidade:""};toast("🎯 Meta desativada.");renderGMFaccoes();return}
  const desc=prompt("Descrição da meta:",s.meta?.desc||"Ex: Recrutar 5 informantes");if(desc===null)return;
  const valor=parseInt(prompt("Valor alvo da meta:",s.meta?.valor||10))||10;
  const unidade=prompt("Unidade (ex: informantes, toneladas):",s.meta?.unidade||"unidades")||"unidades";
  const atual=parseInt(prompt("Progresso atual já alcançado:",s.meta?.atual||0))||0;
  s.meta={ativa:true,desc,valor,atual:Math.min(atual,valor),unidade};
  toast(`🎯 Meta de "${s.n}" definida: ${desc}`);renderGMFaccoes();
}
function gmAvancarMetaSub(fid,sid){
  const r=gSub(sid);if(!r||!r.sub.meta)return;
  const v=Number(document.getElementById("gm-submeta-"+sid)?.value||0);
  if(v<=0){toast("Digite um valor válido.");return}
  r.sub.meta.atual=Math.min(r.sub.meta.valor,r.sub.meta.atual+v);
  toast(`🎯 ${r.sub.n}: +${v} (${r.sub.meta.atual}/${r.sub.meta.valor})`);renderGMFaccoes();
}
function gmRenomearSub(fid,sid){
  const f=gF(fid);const s=f?.subs?.find(x=>x.id===sid);if(!s)return;
  const n=prompt("Novo nome:",s.n);if(n===null)return;s.n=n;renderGMFaccoes();
}

// ── GM Finanças ──
function gmTransferir(){
  const de=document.getElementById("gm-de")?.value,para=document.getElementById("gm-para")?.value;
  const val=Number(document.getElementById("gm-val")?.value||0);
  if(de===para){toast("Origem = Destino!");return}
  const pf=gP(de),pt=gP(para);if(!pf||!pt||val<=0)return;
  if(pf.cr<val){toast("Créditos insuficientes!");return}
  pf.cr-=val;pt.cr+=val;toast(`💸 ₹${M(val)}: ${pf.n} → ${pt.n}`);renderGMFinancas();
}
function gmAjustarFC(){
  const fid=document.getElementById("gm-fac")?.value,val=Number(document.getElementById("gm-fc-val")?.value||0);
  const ctrl=gCtrl(fid);if(!ctrl)return;ctrl.ref.fc=Math.max(0,(ctrl.ref.fc||0)+val);toast(`⭐ ${ctrl.n}: ${ctrl.ref.fc} FacCreds`);renderGMFinancas();
}
function gmSetarFC(){
  const fid=document.getElementById("gm-fac")?.value,val=Number(document.getElementById("gm-fc-abs")?.value||0);
  const ctrl=gCtrl(fid);if(!ctrl)return;ctrl.ref.fc=Math.max(0,val);toast(`⭐ ${ctrl.n}: ${ctrl.ref.fc} FacCreds (fixo)`);renderGMFinancas();
}
function gmPopHoldings(){}
function salvarNotasGM(){E.gmNotas=document.getElementById("gm-notas")?.value||"";toast("📝 Notas salvas!")}
function gmDelHolding(){}
function gmDelPlaneta(){}

// ══════════ AJUDA COMPLETA (baseada nos PDFs) ══════════
let ajSec="visao";
function renderAjuda(){
  const secs=[
    ["inicio","🚀 Primeiros Passos"],["visao","📊 Visão Geral"],["moedas","💰 Moedas"],
    ["comercio3d6","🎲 Comércio 3d6"],["holdings","🏗️ Holdings"],["qg","🏢 QG"],
    ["mercado","📈 Economia"],["macro","🌌 Macro/Facções"],["ativos","⚔️ Ativos de Facção"],
    ["combate","⚔️ Combate d20"],["faccoes","🏴 Facções"],["criador","✨ Criador"],
    ["mestre","🛡️ Painel do Mestre"],["exemplos","📖 Exemplos"],["faq","❓ Perguntas Frequentes"]
  ];
  const HELP={
    inicio:`<h3>🚀 Primeiros Passos</h3>
      <div class="h-block gold"><strong>💾 Agora dá para salvar! Use o botão "💾 SALVAR/CARREGAR" no topo da tela.</strong><br>
        O app tem 3 camadas de proteção contra perda de dados:<br>
        1. <strong>Salvar manual com nome</strong> — clique no botão no topo, dê um nome (pode ter várias campanhas diferentes salvas ao mesmo tempo) e clique "💾 SALVAR". Depois, "📂 CARREGAR" traz de volta exatamente aquele estado.<br>
        2. <strong>Auto-save silencioso</strong> — o app salva sozinho sempre que você troca de aba do navegador ou fecha esta aba, como rede de segurança caso você esqueça de salvar manualmente. Aparece como "🔄 Auto-save" na lista.<br>
        3. <strong>Exportar/Importar arquivo .json</strong> — o botão "⬇️ EXPORTAR ARQUIVO" baixa um arquivo com toda a campanha, que pode ser guardado fora do navegador e reimportado depois (inclusive em outro computador ou navegador).
      </div>
      <div class="h-block red"><strong>⚠️ Mas fique atento a este detalhe importante</strong><br>
        Os saves nomeados e o auto-save ficam guardados no <strong>armazenamento local deste navegador específico, neste computador específico</strong> (tecnicamente: <code>localStorage</code>). Isso significa: trocar de navegador, usar modo anônimo/privado, limpar o cache/dados do site, ou abrir o app em outro computador <strong>não vê os saves salvos aqui</strong>. Para esses casos (ou para um backup extra de segurança), use sempre "⬇️ EXPORTAR ARQUIVO" de vez em quando e guarde o .json em algum lugar seguro.
      </div>
      <p>Este é um <strong>painel de controle para o Mestre</strong> rodar campanhas de Star Wars usando as regras de comércio de <em>Suns of Gold</em> (do sistema Stars Without Number) e o jogo de facções do mesmo livro, junto com um rastreador de combate no estilo d20/Saga Edition. Ele não substitui a ficha dos jogadores — é uma ferramenta só para o Mestre usar durante e entre as sessões.</p>

      <div style="margin:16px 0 8px;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;font-weight:900;letter-spacing:4px;color:#006688;text-transform:uppercase">💾 GUIA RÁPIDO DE SALVAR/CARREGAR</div>
      <div class="h-kv"><strong>Salvar uma campanha nova</strong><span>Topo da tela → "💾 SALVAR/CARREGAR" → digite um nome → "💾 SALVAR". Pode repetir com nomes diferentes para ter várias campanhas separadas.</span></div>
      <div class="h-kv"><strong>Continuar de onde parou</strong><span>Abra "💾 SALVAR/CARREGAR" → encontre o nome na lista → "📂 CARREGAR". Isso substitui tudo que está na tela agora pelo conteúdo daquele save.</span></div>
      <div class="h-kv"><strong>Recuperar depois de fechar sem salvar</strong><span>Abra "💾 SALVAR/CARREGAR" → procure o card roxo "🔄 Auto-save" → "📂 CARREGAR".</span></div>
      <div class="h-kv"><strong>Levar a campanha para outro PC/navegador</strong><span>"⬇️ EXPORTAR ARQUIVO" aqui → leve o .json → abra o app lá → "⬆️ IMPORTAR ARQUIVO" e selecione o mesmo .json.</span></div>

      <div style="margin:16px 0 8px;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;font-weight:900;letter-spacing:4px;color:#006688;text-transform:uppercase">ROTEIRO SUGERIDO PARA A PRIMEIRA VEZ</div>
      <div class="h-kv"><strong>1. Criador</strong><span>Crie ao menos um Setor, uma Facção e um Planeta antes de mais nada — as outras abas dependem dessas entidades existirem.</span></div>
      <div class="h-kv"><strong>2. Painel</strong><span>Confira o resumo geral: planetas, créditos, FacCreds totais. É a "tela inicial" do app.</span></div>
      <div class="h-kv"><strong>3. Comércio</strong><span>Use a calculadora 3d6 sempre que um PJ tentar comprar ou vender carga em um planeta.</span></div>
      <div class="h-kv"><strong>4. Macro</strong><span>Entre sessões (ou durante, se os PJs controlam uma facção), role a iniciativa e jogue os turnos de facção.</span></div>
      <div class="h-kv"><strong>5. Economia</strong><span>Uma vez por "mês" de jogo, clique em "🎲 ROLAR MÊS" para processar fábricas, projetos, contratos e flutuação de mercado de uma vez.</span></div>
      <div class="h-kv"><strong>6. Combate</strong><span>Abra só quando um combate tático começar — é independente de tudo o resto.</span></div>
      <div class="h-kv"><strong>7. Mestre</strong><span>Painel de emergência: edite ou delete qualquer coisa sem seguir as regras normais, para corrigir erros ou ajustar a campanha na mão.</span></div>

      <div class="h-block gold"><strong>💡 Botões e atalhos úteis</strong><br>
        • <strong>💾 SALVAR/CARREGAR</strong> (canto superior direito) — salva a campanha atual com um nome, carrega uma campanha salva, ou exporta/importa um arquivo .json. Veja o guia completo no início desta aba.<br>
        • <strong>MENU ▲/▼</strong> (barra fina no topo) — esconde ou mostra a barra de navegação para ganhar espaço de tela.<br>
        • <strong>🔴 IMPERIAL / 🟢 REBELDE</strong> (canto superior direito) — troca só a cor do tema (ciano ↔ verde). É puramente visual e não muda nenhuma regra.<br>
        • <strong>⚡ (botão flutuante no canto inferior direito)</strong> — atalho rápido para a Calculadora de Comércio de qualquer aba.
      </div>
      <div class="h-block"><strong>🧭 Onde cada coisa mora</strong><br>
        Toda a "verdade" da campanha (planetas, facções, log de transações, mercados, fábricas) fica guardada em um único objeto interno chamado <code style="font-family:'Courier New',monospace">E</code>. Todas as abas leem e escrevem nesse mesmo lugar — por isso alterar um planeta na aba Mestre aparece imediatamente no Painel, no Macro, etc.
      </div>`,

    visao:`<h3>O que é o Galactic Ledger?</h3>
      <p>Um <strong>Campaign OS</strong> holográfico para Mestres de Star Wars adaptado com as mecânicas de comércio do <em>Suns of Gold</em> (Stars Without Number). Ele combina cinco sistemas independentes, todos acessíveis pela barra de navegação no topo:</p>
      <div class="h-block">🏠 <strong>Painel</strong> — Visão geral: totais de créditos e FacCreds, lista de planetas e as últimas transações registradas.</div>
      <div class="h-block">🌌 <strong>Macro</strong> — Jogo de facções (SWN): iniciativa rotativa, renda automática, ativos militares/econômicos com furtividade e 8 ações de turno diferentes.</div>
      <div class="h-block green">⚔️ <strong>Combate</strong> — Rastreador de combate tático (d20/Saga Edition): iniciativa, HP editável, surpresa, adiar/preparar ação e estado "morto".</div>
      <div class="h-block gold">📦 <strong>Comércio</strong> — Calculadora de preços 3d6 do Suns of Gold, com registro automático de cada venda/compra no log de transações do planeta.</div>
      <div class="h-block" style="border-left-color:#a855f7">✨ <strong>Criador</strong> — Formulários para criar Planetas, Facções, Sub-facções e Setores a partir de templates prontos.</div>
      <div class="h-block" style="border-left-color:#a855f7">💹 <strong>Economia</strong> — Mercados com preço flutuante, fábricas que geram receita mensal, projetos de P&D e contratos com metas, tudo avançado pelo botão "Dado do Mês".</div>
      <div class="h-block" style="border-left-color:#00d4ff">🛡️ <strong>Mestre</strong> — Painel de controle total: editar ou apagar qualquer planeta, facção, holding ou ativo diretamente, sem seguir custo ou regra nenhuma.</div>

      <div style="margin:16px 0 8px;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;font-weight:900;letter-spacing:4px;color:#006688;text-transform:uppercase">⚠️ OS 3 SIGNIFICADOS DE "HP" NO APP</div>
      <div class="h-block red"><strong>A palavra "HP" aparece em três lugares totalmente diferentes — não confunda:</strong>
        <div class="h-kv"><strong>HP de Holding Points</strong><span>Capacidade do QG de um planeta (ex: QG Nv.2 = 6 HP). Cada Holding "gasta" uma parte dessa capacidade. Não tem nada a ver com dano ou vida.</span></div>
        <div class="h-kv"><strong>HP de Ativos de Facção</strong><span>"Vida" de um exército, frota ou base na aba Macro. Perdido em ataques, recuperado com a ação "Reparar Ativo".</span></div>
        <div class="h-kv"><strong>HP de combate (d20)</strong><span>Pontos de vida de personagens/inimigos na aba Combate, editável clicando no número.</span></div>
      </div>`,

    moedas:`<h3>Sistema de Moedas Duplas</h3>
      <div class="h-block green"><strong>₹ Créditos Imperiais</strong><br>
        Dinheiro físico e local. Fica preso no planeta onde foi ganho — não viaja sozinho entre mundos. Usado para comprar Holdings, subir o nível do QG e fazer negócios na Calculadora de Comércio. Cada planeta tem seu próprio saldo (<code>cr</code>), independente dos demais.
      </div>
      <div class="h-block gold"><strong>⭐ FacCreds (Faction Credits)</strong><br>
        Poder logístico abstrato e global, pertencente à <strong>facção</strong> (não a um planeta específico). Representa influência, favores políticos e capacidade operacional. Usado na aba Macro para comprar Ativos, reparar Ativos e financiar ações de turno. Não tem custo de transporte entre mundos.
      </div>
      <div class="h-block"><strong>💱 Como converter</strong><br>
        <strong>Taxa fixa: 100.000 ₹ = 1 FacCred.</strong> Clique num planeta no Painel → digite o valor em ₹ → "CONVERTER". Os créditos saem do saldo do planeta e viram FacCreds para a <strong>Facção Controladora</strong> daquele planeta.<br>
        <strong style="color:var(--red)">⚠️ Requisito:</strong> o planeta precisa ter uma Facção Controladora definida (campo "Facção" no Criador ou no Mestre). Sem isso, o app bloqueia a conversão para não perder o dinheiro no vazio.<br>
        <em>Narrativamente: você injeta dinheiro físico na máquina política da sua organização.</em>
      </div>
      <div class="h-block"><strong>📊 Escala de Valores Star Wars (referência de bolso)</strong></div>
      <div class="h-kv"><strong>Blaster simples</strong><span>~500 ₹</span></div>
      <div class="h-kv"><strong>Nave cargueiro pequeno</strong><span>~125.000 ₹</span></div>
      <div class="h-kv"><strong>Destruidor Imperial</strong><span>~150.000.000 ₹</span></div>
      <div class="h-kv"><strong>Estrela da Morte (estimativa)</strong><span>~1.000.000.000.000 ₹</span></div>
      <div class="h-kv"><strong>PIB de Coruscant (mensal)</strong><span>~580.000.000.000 ₹</span></div>
      <div class="h-kv"><strong>PIB da Galáxia (anual)</strong><span>~quadrilhões ₹</span></div>`,

    comercio3d6:`<h3>Calculadora de Comércio — 3d6</h3>
      <p>Baseada nas regras de venda/compra de carga do <em>Suns of Gold</em>. Fica na aba <strong>📦 Comércio</strong> (ou no botão flutuante ⚡ em qualquer aba).</p>

      <div style="margin:16px 0 8px;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;font-weight:900;letter-spacing:4px;color:#006688;text-transform:uppercase">PASSO A PASSO NA TELA</div>
      <div class="h-kv"><strong>1. Escolha 🔼 VENDA ou 🔽 COMPRA</strong><span>Muda qual fórmula é usada no cálculo.</span></div>
      <div class="h-kv"><strong>2. Planeta</strong><span>Preenche a Fricção automaticamente com o valor cadastrado do planeta.</span></div>
      <div class="h-kv"><strong>3. Mercadoria</strong><span>Preenche o Preço Base (₹/ton) automaticamente com o catálogo (Gás Tibanna, Bacta, Blasters, etc).</span></div>
      <div class="h-kv"><strong>4. Expertise, Fricção, Mod. Item, Qtd</strong><span>Ajuste manualmente se necessário — veja abaixo o que cada campo significa.</span></div>
      <div class="h-kv"><strong>5. 🎲 ROLAR 3D6</strong><span>Sorteia os 3 dados e mostra o preço final calculado.</span></div>
      <div class="h-kv"><strong>6. ✅ CONFIRMAR TRANSAÇÃO</strong><span>Só então o valor é somado/subtraído dos créditos do planeta e registrado no log.</span></div>
      <div class="h-block red"><strong>⚠️ Rolar não fecha o negócio sozinho!</strong> Clicar em "ROLAR 3D6" só mostra o preço. Se o Mestre não clicar em "CONFIRMAR TRANSAÇÃO" depois, nada muda nos créditos do planeta.</div>

      <div class="h-block green"><strong>Fórmula usada em VENDA</strong> (quer resultado ALTO):<br>
        <code style="background:rgba(0,20,44,0.8);padding:6px 10px;display:block;margin-top:6px;border-radius:3px;font-family:'Courier New',monospace">
          Resultado = 3d6 + Expertise − Fricção + Mod. Item
        </code>
        <div style="margin-top:6px;font-size:11px;color:#006688">Preço final = Preço Base × Quantidade × multiplicador da tabela abaixo.</div>
      </div>
      <div class="h-block" style="border-left-color:#ff3c3c"><strong>Fórmula usada em COMPRA</strong> (quer resultado BAIXO):<br>
        <code style="background:rgba(0,20,44,0.8);padding:6px 10px;display:block;margin-top:6px;border-radius:3px;font-family:'Courier New',monospace">
          Resultado = 3d6 − Expertise + Fricção + Mod. Item
        </code>
        <div style="margin-top:6px;font-size:11px;color:#006688">Quanto menor o resultado, mais barato fica o preço final.</div>
      </div>

      <div class="h-block gold"><strong>🧮 Exemplo prático completo</strong><br>
        Vendendo Gás Tibanna (Preço Base ₹50.000/ton) em Lothal (Fricção 3), com Expertise 4, Mod. Item 0, Quantidade 5 toneladas.<br>
        Dados saem 4, 5, 3 → soma 12. Cálculo: 12 + 4 − 3 + 0 = <strong>13</strong>.<br>
        Na Tabela de Multiplicadores, 13 cai na faixa "+20%". Preço final = 50.000 × 5 × 1,20 = <strong>₹300.000</strong>.
      </div>

      <div style="margin:16px 0 8px;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;font-weight:900;letter-spacing:4px;color:#006688;text-transform:uppercase">O QUE CADA CAMPO SIGNIFICA</div>
      <div class="h-block"><strong>⚡ Expertise (campo numérico, 1 a 10)</strong><br>
        No livro original, Expertise é a soma de Habilidade de Negócio + Habilidade Cultural relevante + o maior modificador entre Inteligência ou Carisma. <strong>O app não calcula essa soma por você</strong> — você faz a conta na sua ficha/mente e digita só o número final aqui. Um grupo iniciante costuma ter Expertise entre 2 e 4; personagens muito especializados podem chegar a 8+.
      </div>
      <div class="h-block"><strong>🌡️ Fricção (1–5, preenchida pelo planeta)</strong><br>
        Representa impostos, extorsão, propinas e burocracia local. Vem automaticamente do planeta ao selecioná-lo, mas pode ser digitada manualmente — por exemplo, para simular temporariamente o efeito de um Holding como o Anel de Suborno (veja a aba Holdings), já que <strong>o app não aplica esses bônus de Holding sozinho</strong>.
      </div>
      <div class="h-block"><strong>🎯 Mod. Item (-2 a +2)</strong><br>
        Ajuste de oferta/demanda daquele item específico naquele planeta. Positivo = item raro/valioso ali (bom pra vender); negativo = item comum/abundante ali (bom pra comprar barato, ruim pra vender caro).
      </div>
      <div class="h-block"><strong>📦 Qtd (t)</strong><br>
        Quantidade de toneladas da carga. O Preço Base é sempre "por tonelada" — o app multiplica automaticamente pelo número que você colocar aqui.
      </div>

      <div class="h-block" style="border-left-color:#a855f7"><strong>📋 Regras do livro que o app NÃO automatiza (fazer manualmente, se quiser usá-las)</strong><br>
        • <strong>Rolar na Tabela Trade do planeta</strong> para descobrir quais mercadorias estão disponíveis naquele mês (o app usa um catálogo fixo, sem sorteio).<br>
        • <strong>Checagem de Problemas (Trouble):</strong> role 1d10 após cada negócio fechado; se o resultado for igual ou menor que o campo "Limiar" do planeta, algo dá errado (atraso, perda de carga, ou aumento de Fricção). O app guarda o campo Limiar (visível ao abrir o planeta no Painel), mas não faz essa rolagem sozinho.<br>
        Se quiser, aplique essas checagens por fora e depois use o painel do Mestre para ajustar créditos/Fricção manualmente com base no resultado.
      </div>

      <div style="margin:16px 0 8px;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;font-weight:900;letter-spacing:4px;color:#006688;text-transform:uppercase">TABELA DE MULTIPLICADORES (Sales Chart)</div>
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <tr style="border-bottom:1px solid #003366">
          <th style="text-align:left;padding:5px 8px;color:#00d4ff;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;letter-spacing:2px">RESULTADO</th>
          <th style="text-align:left;padding:5px 8px;color:#00d4ff;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;letter-spacing:2px">MODIFICADOR</th>
        </tr>
        ${[[2,"-90%"],[3,"-70%"],[4,"-60%"],[5,"-50%"],[6,"-40%"],[7,"-30%"],[8,"-20%"],[9,"-10%"],[11,"Preço Base"],[12,"+10%"],[13,"+20%"],[14,"+40%"],[15,"+60%"],[16,"+80%"],[17,"+100%"],[18,"+150%"],["19+","+200%"]].map(r=>{
          const p=parseFloat(r[1]);
          const c=isNaN(p)?"#caf0f8":p>0?"#00ff88":p<0?"#ff3c3c":"#4db8d4";
          return`<tr style="border-bottom:1px solid rgba(0,50,100,0.3)">
            <td style="padding:5px 8px;color:#f0b429;font-family:'Courier New',monospace">≤ ${r[0]}</td>
            <td style="padding:5px 8px;color:${c};font-weight:700">${r[1]}</td>
          </tr>`;
        }).join("")}
      </table>`,

    holdings:`<h3>Holdings Planetários — Guia Completo</h3>
      <p><em>Inspirado em Suns of Gold, pág. 24-30 — "Corporate Headquarters and Local Holdings"</em></p>
      <p>Holdings são instalações, contatos e privilégios que uma facção mantém em um planeta específico. Compram-se clicando num planeta no <strong>Painel</strong> e escolhendo um tipo na seção "🏗️ Adquirir Holding".</p>

      <div class="h-block red"><strong>⚠️ Esta lista abaixo é o catálogo REAL e completo do app.</strong><br>
        São exatamente <strong>9 tipos</strong> disponíveis no menu suspenso — não existem versões "Menor/Maior" separadas nem holdings extras como Estaleiro, Governo Sombra, Extraterritorialidade ou Carta Branca. Se você já leu sobre esses no livro <em>Suns of Gold</em>, saiba que eles <strong>não foram implementados</strong> neste app; use o Painel do Mestre para simular efeitos parecidos manualmente, se quiser.
      </div>

      <div class="h-block gold"><strong>💰 Como funciona a compra</strong><br>
        1. O planeta precisa ter <strong>HP livre</strong> suficiente no QG (capacidade total menos o que já está em uso pelos holdings existentes).<br>
        2. O planeta precisa ter <strong>créditos (₹) suficientes</strong> no próprio saldo.<br>
        3. Ao confirmar, o custo é debitado do planeta e o holding passa a "consumir" aquele tanto de HP do QG permanentemente.<br>
        <strong>Nenhum desses efeitos narrativos (redução de Fricção, dobro de tonelagem, etc.) é aplicado automaticamente pelos cálculos do app</strong> — são bônus que o Mestre precisa lembrar de considerar na hora de rodar a mesa ou ajustar manualmente o campo Fricção na Calculadora de Comércio.
      </div>

      <div style="margin:16px 0 8px;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;font-weight:900;letter-spacing:4px;color:#006688;text-transform:uppercase">OS 9 HOLDINGS DISPONÍVEIS</div>

      <div class="h-block">
        <strong style="color:#00d4ff">🏭 Centro de Produção / MENOR</strong> — ₹200.000 • 2 HP<br>
        Produz mercadorias localmente a <strong>50% do preço base</strong> (dezenas de toneladas/mês). Pode ser construído mais de uma vez no mesmo planeta para aumentar a capacidade — é o único holding sem limite de 1x por planeta.
      </div>
      <div class="h-block">
        <strong style="color:#00d4ff">🏭 Centro de Produção / MAIOR</strong> — ₹1.500.000 • 5 HP<br>
        Versão em escala industrial: centenas de toneladas/mês a 50% do preço base. Base típica da economia de planetas industriais como Lothal.
      </div>
      <div class="h-block">
        <strong style="color:#00d4ff">🏦 Anel de Suborno</strong> — ₹100.000 • 2 HP<br>
        Rede de autoridades corrompidas. No livro original: role e, em sucesso, reduz a Fricção em -1 ou -2 para um negócio específico. <strong>No app, isso não é automático</strong> — considere digitar manualmente um valor de Fricção menor na Calculadora de Comércio quando esse holding estiver ativo.
      </div>
      <div class="h-block">
        <strong style="color:#f0b429">⚔️ Segurança / MENOR</strong> — ₹50.000 • 3 HP<br>
        Guardas armados básicos para proteger instalações do planeta contra ameaças menores.
      </div>
      <div class="h-block">
        <strong style="color:#f0b429">⚔️ Segurança / MAIOR</strong> — ₹250.000 • 6 HP<br>
        Tropa de elite, equivalente a "stormtroopers corporativos". Protege holdings contra ameaças sérias e pode servir de base para um Ativo militar futuro na aba Macro.
      </div>
      <div class="h-block green">
        <strong style="color:#00ff88">🏥 Serviço Médico</strong> — ₹500.000 • 2 HP<br>
        Clínicas e hospitais que atendem a população local. Reduz Fricção em -1 (manualmente, como o Anel de Suborno) e aumenta a aceitação local — ótimo em planetas agrícolas/primitivos.
      </div>
      <div class="h-block">
        <strong style="color:#00d4ff">🏪 Acesso ao Mercado</strong> — ₹250.000 • 2 HP<br>
        No livro, dobra a tonelagem máxima de mercadoria comprável por mês. No app, isso é apenas referência narrativa — a Calculadora de Comércio não tem limite de tonelagem embutido, então o Mestre decide se aplica esse teto manualmente.
      </div>
      <div class="h-block">
        <strong style="color:#00d4ff">🏦 Banco Comercial</strong> — ₹100.000 • 1 HP<br>
        Permite, narrativamente, transferir até ₹100.000/mês entre planetas com esse holding em ambas as pontas. Transferências reais de créditos entre planetas são feitas manualmente na aba <strong>Mestre → Finanças → Transferência de Créditos</strong> — o holding só justifica a fricção narrativa de fazer isso.
      </div>
      <div class="h-block" style="border-left-color:#a855f7">
        <strong style="color:#a855f7">🕵️ Operações Dissimuladas</strong> — ₹100.000 • 2 HP<br>
        Assassinos, sabotadores e agentes infiltrados a serviço da facção. Reduz Fricção em -1 (manualmente) com risco narrativo de exposição pública se descoberto.
      </div>

      <div class="h-block red"><strong>🗑️ Degradação de Holdings</strong><br>
        Se o trader enfureceu os locais ou cometeu erros graves, o Mestre pode remover um holding manualmente (Painel → abra o planeta → lixeira ao lado do holding, ou aba Mestre → Planetas). Não existe uma regra automática de degradação no app — é sempre uma decisão do Mestre.
      </div>`,

    qg:`<h3>Quartel-General (QG)</h3>
      <p><em>Inspirado em Suns of Gold, pág. 24 — Corporate Headquarters</em></p>
      <p>Todo planeta precisa de um QG para poder receber Holdings. O QG define quantos <strong>Holding Points (HP)</strong> aquele planeta consegue sustentar — quanto maior o nível, mais Holdings cabem ali. Todo planeta criado no <strong>Criador</strong> já começa automaticamente no Nível 1.</p>

      <div class="h-block red"><strong>⚠️ No app, o nível máximo é 5 — sem exceção.</strong><br>
        Diferente do livro (que permite ir até nível 10+ com favores e aventuras), o app trava a atualização com a mensagem "Nível máximo!" assim que o QG chega ao Nível 5. Não existe mecanismo de desbloqueio por aventura — é um limite fixo do sistema.
      </div>

      <div class="h-block gold"><strong>📈 Como fazer upgrade</strong><br>
        No Painel, clique no planeta → role até "⬆️ ATUALIZAR QG" → clique "ATUALIZAR". O custo do <strong>próximo</strong> nível é descontado do saldo de créditos (₹) do planeta. Só é possível subir 1 nível de cada vez, e apenas se o planeta tiver créditos suficientes.
      </div>

      <table style="width:100%;border-collapse:collapse;margin-top:10px;font-size:12px">
        <tr style="border-bottom:1px solid #003366">
          <th style="text-align:left;padding:6px 8px;color:#00d4ff;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;letter-spacing:2px">NÍVEL</th>
          <th style="text-align:left;padding:6px 8px;color:#00d4ff;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;letter-spacing:2px">CUSTO PARA CHEGAR AQUI</th>
          <th style="text-align:left;padding:6px 8px;color:#00d4ff;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;letter-spacing:2px">HP MÁX.</th>
          <th style="text-align:left;padding:6px 8px;color:#00d4ff;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;letter-spacing:2px">DESCRIÇÃO</th>
        </tr>
        ${[
          ["1","— (nível inicial, grátis)","3","Escritório Simples"],
          ["2","₹25.000","6","Andar Corporativo"],
          ["3","₹100.000","12","Sede Completa"],
          ["4","₹200.000","18","Campus Corporativo"],
          ["5","₹500.000","27","Complexo Galáctico (nível máximo)"],
        ].map(r=>`<tr style="border-bottom:1px solid rgba(0,50,100,0.4)">
          ${r.map((c,i)=>`<td style="padding:6px 8px;color:${i===0?"#f0b429":i===1?"#ff3c3c":i===2?"#00ff88":"#caf0f8"};font-family:${i<3?"'Courier New',monospace":"inherit"}">${c}</td>`).join("")}
        </tr>`).join("")}
      </table>

      <div class="h-block" style="margin-top:14px"><strong>🧮 Exemplo de progressão de custo</strong><br>
        Um planeta novo (Nível 1, 3 HP) que sobe até Nível 3 gastou, no total, ₹25.000 (para virar Nível 2) + ₹100.000 (para virar Nível 3) = <strong>₹125.000</strong> em créditos, e agora suporta até 12 HP de Holdings.
      </div>
      <div class="h-block"><strong>📊 Precisa da Tabela de Multiplicadores da Calculadora de Comércio?</strong><br>
        Ela está na aba <strong>🎲 Comércio 3d6</strong> desta Ajuda, junto com um exemplo numérico completo.
      </div>`,

    mercado:`<h3>Economia — Mercados, Fábricas, P&D e Contratos</h3>
      <p>Fica na aba <strong>💹 ECONOMIA</strong>, dividida em 5 sub-abas internas: Mercados, Fábricas, P&D, Contratos e Transações.</p>

      <div class="h-block green"><strong>🔗 O mercado também aparece (e se mexe) na aba Macro</strong><br>
        Existe um mini painel "📈 Mercado Global" na aba <strong>🌌 Macro</strong> com os mesmos preços desta tela. Ele muda de duas formas: <strong>sozinho</strong>, toda vez que você clica em "🎲 Rolar Iniciativa" (representa o tempo passando entre turnos de facção), ou <strong>na hora que você quiser</strong>, clicando em "🔄 Girar Mercado Agora" (no Macro) ou "📊 Flutuar Preços" (aqui na Economia) — os dois botões fazem exatamente a mesma coisa, só ficam em lugares diferentes por conveniência.
      </div>

      <div class="h-block gold"><strong>📅 O botão "🎲 ROLAR MÊS" faz tudo de uma vez</strong><br>
        Ao clicar, o app processa nesta ordem:<br>
        1. Sorteia um dado de 1 a 10 e usa esse resultado como tendência para flutuar <strong>todos</strong> os preços de mercado.<br>
        2. Cada fábrica com dano abaixo de 50% produz e vende sua mercadoria automaticamente, gera receita para o planeta e desconta a manutenção mensal.<br>
        3. Cada fábrica com 50%+ de dano <strong>não produz</strong> e ainda soma +5% de dano.<br>
        4. Todo projeto de P&D "Em Andamento" avança 1 mês (o progresso em % só muda de verdade quando você financia manualmente — veja abaixo).<br>
        5. Todo contrato "Em Andamento" avança 1 mês de prazo; se o prazo estourar sem a meta ser atingida, o contrato vira "Falhou".<br>
        6. Todas as facções recebem a Renda mensal automaticamente (mesma fórmula da aba Macro).<br>
        7. O calendário avança (mês 12 → volta para mês 1 e o ano sobe).
      </div>

      <div class="h-block red"><strong>⚠️ Fábrica danificada não se conserta sozinha</strong><br>
        Uma vez que uma fábrica atinge 50%+ de dano, ela fica suspensa <strong>para sempre</strong> — não existe botão no app para reparar o dano. Se isso acontecer, delete a fábrica (🗑️ na lista) e recrie uma nova, ou simplesmente trate como uma fábrica destruída narrativamente.
      </div>

      <div class="h-block"><strong>📈 Fórmula de flutuação de preço</strong><br>
        <code style="font-family:'Courier New',monospace">variação = (dado−5.5)/5.5 × 30% + aleatório × volatilidade</code><br>
        Cada mercadoria do catálogo tem sua própria <strong>volatilidade</strong> (ex: Durasteel 8% = estável; Coaxium 35% = extremamente instável). O preço nunca cai abaixo de 30% do valor base, mesmo com dados ruins seguidos.
      </div>
      <div class="h-block green"><strong>✏️ Editar preço manualmente</strong><br>
        Clique em qualquer mercadoria na lista para digitar um novo preço na hora — útil para simular um embargo, a descoberta de uma nova mina, ou qualquer evento narrativo que o Mestre queira forçar.
      </div>
      <div class="h-block"><strong>🏭 Como fábricas geram dinheiro</strong><br>
        Receita mensal = preço atual da mercadoria × quantidade produzida × eficiência (%). Esse valor entra direto nos créditos do planeta onde a fábrica está, e a manutenção é descontada do mesmo saldo automaticamente.
      </div>
      <div class="h-block"><strong>🔬 P&D e 📋 Contratos</strong><br>
        Ambos têm um campo de input + botão ("+ FINANCIAR" / "+ AVANÇAR") na própria lista — o Mestre digita quanto quer investir/avançar manualmente a cada sessão. O "Dado do Mês" só avança o contador de meses; quem empurra o progresso de verdade é o Mestre, clicando nesses botões quando fizer sentido na história.
      </div>`,

    macro:`<h3>Módulo Macro — Jogo de Facções (SWN)</h3>
      <p>Fica na aba <strong>🌌 MACRO</strong>. É onde as facções agem por turno: atacam, compram Ativos, expandem influência etc. Requer pelo menos uma Facção criada (aba Criador) para funcionar.</p>

      <div style="margin:16px 0 8px;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;font-weight:900;letter-spacing:4px;color:#006688;text-transform:uppercase">FLUXO DE UM TURNO, PASSO A PASSO</div>
      <div class="h-kv"><strong>1. 🎲 Rolar Iniciativa</strong><span>Sorteia a ordem de ação entre todas as facções cadastradas. Isso <strong>também flutua o mercado global sozinho</strong> — veja o painel "📈 Mercado Global" logo abaixo do quadro de iniciativa.</span></div>
      <div class="h-kv"><strong>2. Escolha a ação</strong><span>A facção da vez mostra um dropdown com as 8 ações possíveis; o painel de detalhes abaixo já aparece sozinho com a ação padrão selecionada.</span></div>
      <div class="h-kv"><strong>3. Preencha os campos</strong><span>Cada ação pede campos diferentes (alvo, rolagem, planeta, etc) — aparecem automaticamente no painel.</span></div>
      <div class="h-kv"><strong>4. ▶ EXECUTAR</strong><span>Aplica o efeito, gasta os FacCreds necessários e já passa a vez para a próxima facção sozinho.</span></div>
      <div class="h-kv"><strong>5. Repita</strong><span>Até todas as facções agirem — a interface some quando o turno acaba ("FIM DO TURNO").</span></div>
      <div class="h-kv"><strong>6. ↺ Reiniciar</strong><span>Zera a ordem de iniciativa para começar um novo turno quando quiser.</span></div>

      <div class="h-block"><strong>💰 Renda Automática</strong><br>
        <code style="font-family:'Courier New',monospace">FC ganhos por turno = teto(Riqueza÷2) + piso((Força+Astúcia)÷4)</code><br>
        Clique "💰 Renda" no cabeçalho de qualquer facção para aplicar isso na hora, ou deixe para o botão "🎲 ROLAR MÊS" da aba Economia processar a renda de todas as facções de uma vez.
      </div>

      <div class="h-block gold"><strong>⚔️ As 8 Ações de Turno</strong></div>
      ${[
        ["Atacar Ativo Inimigo","Escolha um Ativo visível de outra facção e digite (ou role) o valor do ataque. O app calcula a defesa automaticamente (1d6 + Força do defensor) e aplica o dano se o ataque vencer. Custo: 1 FC."],
        ["Comprar Ativo","Escolha entre os 10 tipos de Ativo do catálogo (veja a aba Ativos de Facção) ou monte um personalizado. Fora do turno, os botões '+ Ativo' (Macro) e '+ ATIVO' (Mestre → Facções) abrem o mesmo modal com o catálogo visível e uma caixinha para escolher se quer cobrar o custo em FacCreds ou adicionar de graça (override do Mestre)."],
        ["Expandir Influência","Digite uma rolagem (ou clique 🎲); se rolagem + Riqueza ≥ 8, a facção ganha +1 Riqueza permanente. Custo: 2 FC, gasto independente do resultado."],
        ["Usar Habilidade do Ativo","Escolha um Ativo próprio; o efeito muda de acordo com o tipo dele (Riqueza gera +1 FC extra, Astúcia revela um Ativo furtivo inimigo, Força cura um aliado, etc)."],
        ["Mover Ativo","Escolha um Ativo e um planeta de destino. Custo: 1 FC."],
        ["Reparar Ativo (1FC=1HP)","Escolha um Ativo e quantos FacCreds gastar — cada FC vira 1 HP recuperado, até o máximo do Ativo."],
        ["Criar Posto Avançado","Escolha um planeta e um tipo base de Ativo; cria um novo Ativo furtivo (👁 ativado) naquele planeta, representando a nova presença da facção ali. Custo: 3 FC."],
        ["Passar a Vez","Nenhum efeito, nenhum custo — só avança para a próxima facção."]
      ].map(([t,d])=>`<div class="h-kv"><strong>${t}</strong><span>${d}</span></div>`).join("")}

      <div class="h-block green"><strong>👁️ Furtividade de Ativos</strong><br>
        Clique no ícone de olho (👁) ao lado de um Ativo para alternar entre Furtivo e Visível. Ativos furtivos <strong>não aparecem na lista de alvos</strong> de "Atacar Ativo Inimigo" de outras facções — a única forma de expô-los é uma facção rival usar uma Rede de Informação com a ação "Usar Habilidade do Ativo".
      </div>
      <div class="h-block"><strong>📡 HoloNet News</strong><br>
        Campo de texto livre para anotar os acontecimentos do turno. Sugestão: leia em voz alta como um noticiário galáctico no início da próxima sessão para contextualizar o que aconteceu "fora de cena".
      </div>
      <div class="h-block" style="border-left-color:#a855f7"><strong>⭐ Sub-facções também têm FacCreds, metas e podem controlar planetas</strong><br>
        A gestão detalhada de cada sub-facção (ajuda financeira da facção-mãe, definir/avançar uma meta, ver quais planetas ela controla) fica na aba <strong>🛡️ Mestre → Facções</strong>, dentro do card de cada facção. Veja a aba "🏴 Facções" desta Ajuda para os detalhes completos.
      </div>`,

    ativos:`<h3>Ativos de Facção — Guia Completo</h3>
      <p>Ativos são a força tangível de uma facção: exércitos, frotas, bases e redes de espiões. São comprados pela ação <strong>"Comprar Ativo"</strong> no turno Macro, custam FacCreds e têm HP próprio, que pode ser perdido em combate e recuperado com a ação "Reparar Ativo".</p>

      <div style="margin:16px 0 8px;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;font-weight:900;letter-spacing:4px;color:#006688;text-transform:uppercase">TIPOS DISPONÍVEIS PARA COMPRA</div>

      <div class="h-block red">
        <strong style="color:#ff3c3c">💪 Unidade de Força Leve</strong> — 4 HP • 2 FC<br>
        Pequena guarnição ou pelotão de infantaria. Ataca com Força 1d6+2. É o ativo militar mais barato e a base de qualquer força de combate inicial.
      </div>
      <div class="h-block red">
        <strong style="color:#ff3c3c">💪 Unidade de Força Pesada</strong> — 8 HP • 4 FC<br>
        Batalhão de elite bem equipado. Ataca com Força 1d6+4. Suficientemente forte para defender um planeta sozinho contra a maioria das ameaças.
      </div>
      <div class="h-block" style="border-left-color:#2980b9">
        <strong style="color:#2980b9">🚀 Frota de Patrulha</strong> — 6 HP • 3 FC<br>
        Naves leves de patrulha. Não ataca com força total, mas bloqueia a movimentação de ativos inimigos que tentem passar pelo sistema — útil para proteger rotas comerciais e planetas.
      </div>
      <div class="h-block" style="border-left-color:#2980b9">
        <strong style="color:#2980b9">🚀 Frota de Ataque</strong> — 10 HP • 6 FC<br>
        Força naval ofensiva de verdade. Pode destruir ativos de Espaço inimigos e bombardear posições planetárias. O ativo militar mais caro e mais poderoso.
      </div>
      <div class="h-block gold">
        <strong style="color:#f0b429">🏛️ Base Oculta</strong> — 8 HP • 4 FC<br>
        Instalação secreta que já nasce com Furtividade ativada (👁). Extremamente difícil de localizar e, portanto, de atacar — ideal para esconder operações delicadas de facções rivais.
      </div>
      <div class="h-block gold">
        <strong style="color:#f0b429">🏛️ Posto de Comando</strong> — 6 HP • 3 FC<br>
        QG regional que centraliza a logística da facção naquele setor. Concede <strong>+1 em todos os ataques</strong> feitos pela facção enquanto o posto estiver ativo e com HP.
      </div>
      <div class="h-block" style="border-left-color:#00d4ff">
        <strong style="color:#00d4ff">🕵️ Rede de Informação</strong> — 4 HP • 3 FC<br>
        Espiões e informantes infiltrados. Revela ativos <strong>Furtivos</strong> de facções inimigas (permitindo que sejam alvo de ataques) e concede +1 em ataques de Astúcia da facção.
      </div>
      <div class="h-block" style="border-left-color:#00d4ff">
        <strong style="color:#00d4ff">🕵️ Agente Infiltrado</strong> — 2 HP • 2 FC<br>
        Um único agente dentro de uma organização rival. Pode sabotar ativos inimigos diretamente, sem risco de combate aberto — o ativo mais barato e discreto do jogo.
      </div>
      <div class="h-block green">
        <strong style="color:#00ff88">💰 Centro Comercial</strong> — 4 HP • 3 FC<br>
        Negócios lucrativos vinculados à facção. Gera <strong>+1 FacCred extra de renda por turno</strong>, além da renda normal calculada por Riqueza/Força/Astúcia.
      </div>
      <div class="h-block green">
        <strong style="color:#00ff88">💰 Banco Sombra</strong> — 3 HP • 4 FC<br>
        Estrutura de lavagem de dinheiro e financiamento paralelo. Permite rolar a renda do turno <strong>duas vezes e ficar com o maior resultado</strong> — na prática, aumenta a renda esperada sem alterar os atributos da facção.
      </div>

      <div style="margin:16px 0 8px;font-family:'Segoe UI',Arial,sans-serif;font-size:9px;font-weight:900;letter-spacing:4px;color:#006688;text-transform:uppercase">MECÂNICAS DE USO</div>

      <div class="h-block"><strong>👁️ Furtividade</strong><br>
        Clique no ícone de olho (👁) ao lado de qualquer ativo na aba Macro para alternar entre Furtivo e Visível. Ativos furtivos <strong>não podem ser selecionados</strong> como alvo na ação "Atacar Ativo Inimigo" de outras facções — a única forma de expô-los é uma facção rival possuir uma Rede de Informação.
      </div>
      <div class="h-block"><strong>🔧 Reparo</strong><br>
        Use a ação de turno "Reparar Ativo (1FC=1HP)" para restaurar HP perdido em combate. Cada FacCred gasto recupera exatamente 1 HP, até o limite máximo (mhp) do ativo. Um ativo com 0 HP é destruído e removido da facção.
      </div>
      <div class="h-block"><strong>⚔️ Combate entre Ativos</strong><br>
        Ao atacar, a facção atacante rola 1d6 + seu atributo de Força (ou usa a rolagem manual informada no painel de ação). O defensor rola 1d6 + Força da sua facção como defesa. Se o ataque superar a defesa, a diferença é aplicada como dano de HP ao ativo alvo. Cada ataque custa 1 FacCred da facção atacante.
      </div>
      <div class="h-block gold"><strong>💡 Dica de construção de exército</strong><br>
        Uma facção nova costuma priorizar 1-2 Unidades de Força para defesa básica, depois investir em Rede de Informação ou Posto de Comando para multiplicar a eficácia dos ativos militares já existentes, antes de expandir para Frotas mais caras.
      </div>`,

    combate:`<h3>Combate d20 — Rastreador Tático</h3>
      <p>Fica na aba <strong>⚔️ COMBATE</strong>, totalmente independente das outras abas — não depende de planetas/facções existirem.</p>
      <div class="h-block"><strong>➕ Adicionar Combatente</strong><br>
        Preenche Nome, Tipo (PC/Inimigo/NPC Aliado), Modificador e valor de Iniciativa, HP atual/máximo, Defesa Reflexo/Vontade, e se já começa Surpreso. O botão "🎲 Rolar Init" dentro do formulário sorteia 1d20 + o modificador digitado.
      </div>
      <div class="h-block gold"><strong>🎲 Rolar Todas</strong><br>
        Sorteia 1d20 (sem nenhum modificador) para <strong>todos</strong> os combatentes já adicionados de uma vez, substituindo a iniciativa atual de cada um. Útil para grupos grandes de inimigos genéricos.
      </div>
      <div class="h-block"><strong>▶ Próxima Vez</strong><br>
        Avança para o próximo combatente vivo na lista (ordenada por iniciativa, maior primeiro) que ainda não agiu nesta rodada. Quando todos já agiram, inicia automaticamente a rodada seguinte e limpa a marca de Surpreso de todo mundo.
      </div>
      <div class="h-block red"><strong>⏸ Adiar / 🎯 Preparar — são só etiquetas visuais!</strong><br>
        Clicar nesses ícones <strong>não reordena ninguém</strong> na fila de iniciativa nem pula a vez automaticamente. Eles apenas colocam uma tag colorida ("ADIOU"/"PREP.") do lado do nome, para o Mestre lembrar de tratar aquele combatente de forma especial na hora de narrar. Continua sendo você quem decide manualmente quando essa ação acontece de verdade.
      </div>
      <div class="h-block" style="border-left-color:#ff8c00"><strong>💥 Surpresa</strong><br>
        O botão "💥 SURPRESA" só mostra um lembrete — <strong>não marca ninguém sozinho</strong>. Você precisa clicar no ícone ⚡ de cada combatente individualmente para marcá-lo como Surpreso (borda pontilhada laranja). A marca de Surpreso é limpa automaticamente assim que uma rodada nova começa.
      </div>
      <div class="h-block"><strong>✏️ HP Editável</strong><br>
        Clique no número de HP de qualquer combatente para abrir uma caixa de texto. Aceita:<br>
        • Valor absoluto: <code>30</code> → define o HP atual como 30<br>
        • Valor relativo: <code>+5</code> ou <code>-8</code> → soma/subtrai do HP atual<br>
        O HP fica travado entre 0 e o máximo cadastrado.
      </div>
      <div class="h-block"><strong>☠ Marcar Morto / 👁 Furtivo</strong><br>
        ☠ alterna entre vivo/morto (o combatente continua na lista, mas fica acinzentado e sai da ordem de turnos). 👁 é só uma tag visual de "furtivo" nesta tela — sem efeito automático em nenhum cálculo.
      </div>
      <div class="h-block gold"><strong>↺ Novo Combate</strong><br>
        Apaga toda a lista de combatentes e zera a rodada para 1 — use quando o encontro tático terminar.
      </div>`,

    faccoes:`<h3>Facções & Sub-facções</h3>
      <p>Facções são criadas na aba <strong>✨ Criador</strong> e geridas na aba <strong>🌌 Macro</strong> (ou na aba Mestre, para edição livre).</p>
      <div class="h-block"><strong>Os 4 números de uma facção</strong></div>
      <div class="h-kv"><strong>Força</strong><span>Usada apenas para calcular a <strong>defesa</strong> de um Ativo quando ele é atacado (defesa = 1d6 + Força do defensor). Não afeta ataque nem renda diretamente.</span></div>
      <div class="h-kv"><strong>Astúcia</strong><span>Junto com Força, compõe metade da fórmula de Renda automática. Também influencia narrativamente as ações de "Usar Habilidade do Ativo" em Ativos do tipo Astúcia.</span></div>
      <div class="h-kv"><strong>Riqueza</strong><span>Base principal da fórmula de Renda automática. Pode subir permanentemente com a ação de turno "Expandir Influência".</span></div>
      <div class="h-kv"><strong>FacCreds (FC)</strong><span>O "dinheiro" líquido e imediato da facção. Gasto em toda ação de turno com custo e na compra/reparo de Ativos. Recuperado pela Renda mensal.</span></div>
      <div class="h-block red"><strong>⚠️ Note que Astúcia/Riqueza não mudam o resultado de um ataque</strong><br>
        A rolagem de ataque em "Atacar Ativo Inimigo" é sempre digitada manualmente pelo Mestre (representando 1d6+Força do atacante, mas isso fica por sua conta calcular) contra uma defesa automática de 1d6+Força do defensor. O tipo do Ativo atacado (Força/Base/Astúcia/Riqueza/Espaço) é só descritivo — não muda a matemática do combate de Ativos.
      </div>
      <div class="h-block green"><strong>⭐ Sub-facções agora têm economia própria e podem controlar planetas</strong><br>
        Divisões internas — por exemplo, ISB e Inquisitorius dentro do Império, ou uma célula rebelde específica. Cada sub-facção tem:<br>
        • <strong>FacCreds próprios</strong> (separados do saldo da facção-mãe).<br>
        • <strong>Um planeta pode ser controlado diretamente por ela</strong> — ao definir a "Facção Controladora" de um planeta (no Criador ou na edição completa do Mestre), o dropdown mostra tanto as facções-mãe quanto cada uma de suas sub-facções, indentadas com ⭐.<br>
        • <strong>Uma Meta opcional</strong> (descrição, valor alvo, progresso atual e unidade) — tipo um mini-contrato só daquela sub-facção.<br>
        Tudo isso é gerenciado na aba <strong>🛡️ Mestre → Facções</strong>, dentro do card de cada sub-facção: o campo "FC" mostra o saldo dela, o botão "💰 Facção-Mãe Ajuda" transfere FacCreds do saldo da facção-mãe para a sub (o Mestre digita o valor), e o botão "🎯 Meta" abre uma sequência de perguntas para criar/editar/desativar a meta. A barra de progresso e o botão "+ AVANÇAR" aparecem automaticamente quando a meta está ativa.
      </div>
      <div class="h-block red"><strong>⚠️ Sub-facções não têm Força/Astúcia/Riqueza nem Ativos próprios</strong><br>
        Elas usam FacCreds e Meta como únicos números mecânicos. Ativos militares (exércitos, frotas, bases) continuam pertencendo sempre à facção-mãe, mesmo que ela tenha uma sub-facção controlando um planeta específico.
      </div>
      <div class="h-block gold"><strong>⚔️ Ativos de Facção</strong><br>
        Veja a aba <strong>"⚔️ Ativos de Facção"</strong> nesta Ajuda para a lista completa dos 10 tipos disponíveis, custos e efeitos.
      </div>`,

    criador:`<h3>Como Usar o Criador</h3>
      <p>A aba <strong>✨ Criador</strong> tem 4 cartões de atalho, cada um abrindo um formulário específico. Use este roteiro na ordem sugerida para não ficar sem "para quem" atribuir as coisas depois.</p>
      <div class="h-block" style="border-left-color:#00ff88">
        <strong style="color:#00ff88">🗺️ 1º: Setor</strong><br>
        Escolha um template (Núcleo, Borda Exterior, Zona das Sombras, Espaço Hutt, Borda Média) que já vem com uma Fricção base sugerida. Dê um nome e, se quiser, uma Facção Dominante (pode deixar em branco e definir depois).
      </div>
      <div class="h-block gold">
        <strong style="color:#f0b429">🏴 2º: Facção</strong><br>
        Escolha um template (Império, Rebeldes, Guilda dos Mercadores, Clã Hutt, Mandalorianos, Sindicato ou Personalizada) que preenche nome/cor/ícone sugeridos — você pode editar tudo antes de salvar. Defina Força, Astúcia, Riqueza e FacCreds iniciais. Ativos e Sub-facções são adicionados depois, na aba Macro ou Mestre.
      </div>
      <div class="h-block" style="border-left-color:#00d4ff">
        <strong style="color:#00d4ff">🌍 3º: Planeta</strong><br>
        Escolha um tipo econômico (Industrial, Agrícola, Cosmopolita, Primitivo, Tirânico, Selvagem, Decadente ou Corporativo) — isso já preenche Fricção, Limiar e os modificadores de preço padrão daquele tipo. Depois personalize nome, descrição, créditos iniciais, a Facção Controladora e o Setor. O planeta nasce sempre com <strong>QG Nível 1</strong> e zero Holdings.
      </div>
      <div class="h-block" style="border-left-color:#a855f7">
        <strong style="color:#a855f7">⭐ 4º: Sub-Facção</strong><br>
        Só pode ser criada depois de já existir ao menos uma Facção — o formulário pede para escolher a "Facção Pai" num dropdown.
      </div>

      <div class="h-block red"><strong>⚠️ Fábrica, Projeto de P&D e Contrato NÃO ficam no Criador</strong><br>
        Esses três ficam na aba <strong>💹 Economia</strong>, em botões próprios ("🏭 NOVA FÁBRICA", "🔬 NOVO PROJETO", "📋 NOVO CONTRATO"). Diferente dos formulários bonitos do Criador, esses três usam uma sequência de caixinhas de texto simples (prompts do navegador) — o app vai perguntando um valor de cada vez, incluindo para qual Planeta e qual Facção aquilo pertence.
      </div>`,

    exemplos:`<h3>Planetas de Exemplo (Pré-criados)</h3>
      <div class="h-block" style="border-left-color:#2980b9">
        <strong style="color:#2980b9">🌍 Lothal — Industrial (Exemplo Iniciante)</strong>
        ${[
          ["Tipo","Industrial — fábricas e manufatura avançada"],
          ["Fricção","3 — moderada, gerenciável"],
          ["Limiar","3 em 10 chances de problema por deal"],
          ["Modificadores","+2 Minerais, +1 Ferramentas, -1 Pós-Tec (compra barato, vende abaixo)"],
          ["QG Nv.2","6 HP máx — Andar Corporativo"],
          ["Holdings","Fábricas TIE (2HP) + Anel de Suborno (2HP) = 4 usados, 2 HP livres"],
          ["Créditos","₹850.000 — suficiente para 1 holding menor ou upgrade de QG"],
          ["Fábrica","Complexo TIE Lothal: 2 esquadrões/mês, manutenção 5mi ₹"],
          ["Dica de compra","Minerais e Ferramentas são baratos aqui (+2 mod). Compre para vender em planetas primitivos."],
          ["Dica de venda","Venda Pós-Tec aqui com lucro (eles precisam e pagam mais)."]
        ].map(([k,v])=>`<div class="h-kv"><strong>${k}:</strong><span>${v}</span></div>`).join("")}
      </div>
      <div class="h-block" style="border-left-color:#9b59b6">
        <strong style="color:#9b59b6">🌆 Nar Shaddaa — Decadente (Exemplo Avançado)</strong>
        ${[
          ["Tipo","Decadente — vícios, crime organizado Hutt, política corrompida"],
          ["Fricção","5 — extremamente difícil, todos querem uma fatia"],
          ["Limiar","4 em 10 — espere complicações frequentes"],
          ["Modificadores","+2 Luxo (venda artigos de luxo aqui!), -1 Militar"],
          ["QG Nv.3","12 HP — Sede Completa com escritórios"],
          ["Holdings","Estaleiros Clandestinos — Centro MAIOR (5HP). 7HP livres para expansão!"],
          ["Créditos","₹2.100.000 — grande reserva ideal para FacCreds ou holdings maiores"],
          ["Dica","Fricção 5 compensa com o +2 em Luxo. Tráfico de Cristais Kyber, Especiaria ou outros luxos gera lucros enormes."],
          ["Conversão","Excelente para lavagem — ₹2mi = 20 FacCreds de uma vez."]
        ].map(([k,v])=>`<div class="h-kv"><strong>${k}:</strong><span>${v}</span></div>`).join("")}
      </div>`,

    mestre:`<h3>🛡️ Painel do Mestre</h3>
      <p>Fica na aba <strong>🛡️ MESTRE</strong>. É o "modo administrador" do app: tudo aqui ignora custos, limites de HP e qualquer outra regra — serve para corrigir erros, ajustar a campanha na mão, ou aplicar efeitos narrativos que o resto do app não calcula sozinho (como os bônus de Fricção dos Holdings). Tem 4 sub-abas.</p>

      <div class="h-block gold"><strong>🌍 Aba Planetas</strong><br>
        Lista todo planeta com campos editáveis lado a lado (Créditos, Fricção, Nível de QG, Facção Controladora — cada um com seu botão "✓" para edição rápida). Também lista os Holdings daquele planeta com opção de renomear ou apagar, e um atalho para <strong>adicionar um Holding sem gastar créditos nem checar HP livre</strong> (ideal para configurar rapidamente um planeta de exemplo).<br><br>
        <strong>"✏️ EDITAR" agora abre um modal completo</strong> — muda absolutamente tudo do planeta de uma vez: nome, descrição, tipo econômico, cor, Fricção, Limiar, Créditos, Nível de QG, Facção Controladora (incluindo sub-facções) e Setor. Também tem um editor de "Modificadores de Preço por Tipo de Mercadoria" onde você adiciona ou remove linhas de chave/valor livremente (ex: "Minerais" +2). "🗑️ DELETAR" apaga o planeta inteiro (com confirmação).
      </div>
      <div class="h-block gold"><strong>🏴 Aba Facções</strong><br>
        Edita FacCreds, Força, Astúcia e Riqueza da facção-mãe diretamente (cada um com seu botão "✓"). Lista os Ativos da facção com o HP editável na hora e botões para renomear ou apagar cada Ativo (o botão "+ ATIVO" abre o mesmo modal de catálogo com opção de cobrar custo ou não — veja "Ativos de Facção"). "🗑️ DELETAR" facção também <strong>desvincula automaticamente</strong> todos os planetas que ela (ou qualquer uma de suas sub-facções) controlava.<br><br>
        <strong>Cada Sub-facção agora tem seu próprio card</strong>, mostrando FC próprio, um campo para a facção-mãe transferir FacCreds ("💰 Facção-Mãe Ajuda"), um botão "🎯 Meta" para criar/editar/desativar uma meta com barra de progresso, e a lista de planetas que aquela sub controla diretamente.
      </div>
      <div class="h-block gold"><strong>💸 Aba Finanças</strong><br>
        <strong>Transferência de Créditos:</strong> move ₹ diretamente de um planeta para outro, sem passar por nenhuma facção — útil para simular comércio interplanetário sem rolar a Calculadora.<br>
        <strong>Ajustar FacCreds</strong> e <strong>Setar Valor Fixo:</strong> o dropdown "Facção" aqui também lista as sub-facções (indentadas com ⭐) — dá pra ajustar o FC de uma sub-facção diretamente por aqui, além do botão "💰 Facção-Mãe Ajuda" que fica dentro do card de cada sub na aba Facções.
      </div>
      <div class="h-block gold"><strong>📝 Aba Notas</strong><br>
        Um bloco de texto livre e privado do Mestre — segredos de facções, próximos eventos, planos de campanha. Ele é salvo junto com o resto da campanha quando você usa o botão "💾 SALVAR/CARREGAR" (veja "Primeiros Passos") — não precisa copiar para fora do app manualmente, só lembre de salvar antes de fechar.
      </div>

      <div class="h-block red"><strong>⚠️ O que o Mestre NÃO consegue editar por aqui</strong><br>
        Não há sub-aba para Fábricas, Projetos de P&D ou Contratos — esses só podem ser criados/apagados diretamente na aba Economia (não editados depois, exceto financiar/avançar progresso ou deletar). Também não é possível reparar o dano de uma fábrica suspensa (veja a aba Economia).
      </div>`,

    faq:`<h3>❓ Perguntas Frequentes / Problemas Comuns</h3>

      <div class="h-block red"><strong>"Minha campanha sumiu depois que recarreguei a página!"</strong><br>
        Recarregar a página SEMPRE volta para o estado de exemplo (Lothal, Nar Shaddaa, etc), a menos que você carregue um save. Verifique se há um "🔄 Auto-save" recente no botão "💾 SALVAR/CARREGAR" no topo — ele é criado sozinho toda vez que você fecha ou troca de aba, então provavelmente sua campanha ainda está lá. Veja o guia completo na aba "🚀 Primeiros Passos".
      </div>
      <div class="h-block"><strong>"Cliquei em Converter para FacCreds e nada aconteceu."</strong><br>
        O planeta provavelmente não tem uma Facção Controladora definida. Vá em Mestre → Planetas → escolha a facção no campo "Facção" daquele planeta, depois tente converter de novo.
      </div>
      <div class="h-block"><strong>"Quero atualizar o QG além do Nível 5, mas o botão só mostra 'Nível máximo!'."</strong><br>
        É proposital — o app trava em Nível 5 mesmo. Veja a aba "🏢 QG" para a explicação completa.
      </div>
      <div class="h-block"><strong>"Comprei um holding que reduz Fricção mas os preços na Calculadora de Comércio não mudaram."</strong><br>
        Nenhum efeito de Holding é aplicado automaticamente aos cálculos — são só bônus narrativos que o Mestre precisa lembrar de aplicar manualmente (digitando um valor de Fricção mais baixo no campo da calculadora). Veja a aba "🏗️ Holdings".
      </div>
      <div class="h-block"><strong>"Minha fábrica parou de produzir e não sei como consertar."</strong><br>
        Quando o dano acumulado chega a 50%+, a fábrica fica suspensa <strong>permanentemente</strong> — não existe botão de reparo. Delete e recrie a fábrica na aba Economia.
      </div>
      <div class="h-block"><strong>"Cliquei em ⏸ Adiar ou 🎯 Preparar no Combate e nada mudou na ordem."</strong><br>
        Correto — esses botões só colocam uma etiqueta visual ao lado do nome. O Mestre é quem decide manualmente quando aplicar o efeito de adiar/preparar de verdade. Veja a aba "⚔️ Combate d20".
      </div>
      <div class="h-block"><strong>"Rolei os dados na Calculadora de Comércio mas os créditos do planeta não mudaram."</strong><br>
        Rolar só mostra o preço calculado. É preciso clicar em "✅ CONFIRMAR TRANSAÇÃO" depois para o valor realmente entrar/sair dos créditos do planeta.
      </div>
      <div class="h-block"><strong>"O que significa HP aqui? Ele muda dependendo da aba?"</strong><br>
        Sim — são 3 sistemas diferentes com o mesmo nome. Veja a explicação completa em "📊 Visão Geral" → "Os 3 significados de HP".
      </div>
      <div class="h-block"><strong>"Como eu apago algo que criei por engano?"</strong><br>
        Planetas, Facções, Sub-facções e Ativos: use a aba Mestre (tem botão 🗑️ em cada linha). Holdings: abra o planeta pelo Painel e use a lixeira ao lado do holding. Fábricas/Projetos/Contratos: aba Economia, botão 🗑️ no card de cada um. Combatentes: não têm exclusão individual — use "↺ NOVO COMBATE" para limpar tudo.
      </div>
      <div class="h-block"><strong>"Carreguei um save errado e perdi o que estava fazendo!"</strong><br>
        Se você não salvou por cima antes de carregar outra coisa, o auto-save mais recente ("🔄 Auto-save" dentro de "💾 SALVAR/CARREGAR") provavelmente ainda tem o estado de antes, desde que você não tenha trocado de aba ou fechado o navegador depois do erro. Carregue-o para tentar recuperar.
      </div>
      <div class="h-block"><strong>"Salvei no computador de casa mas não vejo o save no computador do trabalho."</strong><br>
        Esperado — saves ficam guardados no navegador de cada computador separadamente. Use "⬇️ EXPORTAR ARQUIVO" no primeiro computador para baixar um .json, leve esse arquivo até o outro computador (pendrive, e-mail, nuvem, etc) e use "⬆️ IMPORTAR ARQUIVO" lá.
      </div>
      <div class="h-block gold"><strong>"Por onde eu começo, de verdade?"</strong><br>
        Veja a aba "🚀 Primeiros Passos" — tem um roteiro numerado de 7 passos para a primeira sessão, incluindo como salvar.
      </div>`
  };
  const el=document.getElementById("aba-ajuda");if(!el)return;
  el.innerHTML=`
    <div class="help-nav">${secs.map(([id,l])=>`<button class="h-btn ${ajSec===id?"on":""}" onclick="setAjuda('${id}')">${l}</button>`).join("")}</div>
    <div class="hcard" style="padding:20px"><div class="help-txt">${HELP[ajSec]||""}</div></div>`;
}
function setAjuda(s){ajSec=s;renderAjuda()}

// ══════════ ECONOMIA (mercados, fábricas, P&D, contratos, dado do mês) ══════════
let ecoSecAtual="mercado";
function ecoAba(sec,btn){
  ecoSecAtual=sec;
  ["mercado","fabricas","projetos","contratos","transacoes"].forEach(s=>{
    document.getElementById("eco-sec-"+s)?.classList.toggle("hidden",s!==sec);
  });
  document.querySelectorAll("[id^='eco-tab-']").forEach(b=>b.classList.remove("on"));
  if(btn)btn.classList.add("on");
}

function renderEco(){
  const anoEl=document.getElementById("ano-atual");
  if(anoEl)anoEl.textContent=`${E.anoAtual} ABY — Mês ${E.mesAtual}`;

  const tFab=E.fabricas.reduce((s,f)=>s+(f.dano<50?f.manutencao:0),0);
  const tProj=E.projetos.length;
  const tCont=E.contratos.filter(c=>c.status==="Em Andamento").length;
  const topo=document.getElementById("eco-resumo-topo");
  if(topo)topo.innerHTML=`
    <div class="stat-box"><span class="stat-lbl">Fábricas Ativas</span><span class="stat-val gold">${E.fabricas.length}</span></div>
    <div class="stat-box"><span class="stat-lbl">Manutenção/Mês</span><span class="stat-val red">₹${M(tFab)}</span></div>
    <div class="stat-box"><span class="stat-lbl">Projetos P&D</span><span class="stat-val">${tProj}</span></div>
    <div class="stat-box"><span class="stat-lbl">Contratos Ativos</span><span class="stat-val green">${tCont}</span></div>`;

  // Mercados
  const ml=document.getElementById("mercado-list");
  if(ml)ml.innerHTML=E.mercados.map(m=>{
    const variacaoNum=((m.precoAtual-m.precoBase)/m.precoBase*100);
    const variacao=variacaoNum.toFixed(1);
    const positivo=variacaoNum>=0;
    const cor=positivo?"var(--green)":"var(--red)";
    return`<div class="hcard mb12" style="padding:14px;cursor:pointer" onclick="editarPrecoMercado('${m.id}')" title="Clique para editar o preço manualmente">
      <div class="flex-between">
        <div>
          <strong style="color:var(--white)">${m.nome}</strong> ${tag(m.cat,"var(--holo-primary)")} ${tag(m.demanda,"var(--gold)")}
          <div style="font-size:10px;color:var(--holo-dim);margin-top:4px">${m.desc}</div>
          <div class="mono" style="font-size:12px;color:var(--holo-dim);margin-top:6px">₹${M(m.precoAtual)}<span style="font-size:9px">/${m.unidade}</span></div>
        </div>
        <div style="text-align:right;flex-shrink:0;margin-left:12px">
          <div class="mono" style="font-size:20px;font-weight:700;color:${cor};text-shadow:0 0 10px ${cor}44">${positivo?"+":""}${variacao}%</div>
          <div style="font-size:9px;color:var(--holo-dim);margin-top:2px">desde o início</div>
        </div>
      </div>
    </div>`;
  }).join("");

  // Fábricas
  const fl=document.getElementById("fabricas-list");
  if(fl)fl.innerHTML=E.fabricas.length===0
    ?`<div class="hcard" style="text-align:center;padding:30px;color:var(--holo-dim)">Nenhuma fábrica construída ainda.</div>`
    :E.fabricas.map(f=>{
      const p=gP(f.pid),fac=gF(f.fid);
      const dCor=f.dano>=50?"var(--red)":f.dano>0?"var(--gold)":"var(--green)";
      return`<div class="hcard mb12">
        <div class="flex-between mb8">
          <strong style="color:var(--white)">🏭 ${f.nome}</strong>
          <div class="flex gap8">
            <span style="font-size:10px;color:${dCor}">Dano: ${f.dano}%</span>
            <button class="btn btn-red btn-xs" onclick="delFabrica('${f.id}')">🗑️</button>
          </div>
        </div>
        <div style="font-size:11px;color:var(--holo-dim);margin-bottom:8px">${f.desc}</div>
        <div class="g4" style="gap:8px">
          <div class="stat-box" style="padding:8px"><span class="stat-lbl">Produção</span><span style="font-size:11px;color:var(--text2)">${f.producao.qtd}x ${f.producao.item}</span></div>
          <div class="stat-box" style="padding:8px"><span class="stat-lbl">Manutenção</span><span style="font-size:12px;color:var(--red)">₹${M(f.manutencao)}</span></div>
          <div class="stat-box" style="padding:8px"><span class="stat-lbl">Planeta</span><span style="font-size:11px">${p?.n||"—"}</span></div>
          <div class="stat-box" style="padding:8px"><span class="stat-lbl">Facção</span><span style="font-size:11px;color:${fac?.cor||'var(--holo-dim)'}">${fac?.n||"—"}</span></div>
        </div>
      </div>`;
    }).join("");

  // Projetos P&D
  const pl=document.getElementById("projetos-list");
  if(pl)pl.innerHTML=E.projetos.length===0
    ?`<div class="hcard" style="text-align:center;padding:30px;color:var(--holo-dim)">Nenhum projeto de P&D em andamento.</div>`
    :E.projetos.map(pr=>{
      const fac=gF(pr.fid),p=gP(pr.pid);
      return`<div class="hcard purple mb12">
        <div class="flex-between mb8">
          <strong style="color:var(--white)">🔬 ${pr.nome}</strong>
          <div class="flex gap8">
            <span style="font-size:10px;color:var(--gold)">${pr.status}</span>
            <button class="btn btn-red btn-xs" onclick="delProjeto('${pr.id}')">🗑️</button>
          </div>
        </div>
        <div style="font-size:11px;color:var(--holo-dim);margin-bottom:8px">${pr.desc}</div>
        <div class="prog-track mb8"><div class="prog-fill" style="width:${pr.progresso}%;background:var(--holo-primary);box-shadow:0 0 8px var(--holo-glow)"></div></div>
        <div style="font-size:11px;color:var(--text2)">₹${M(pr.custo_atual)} / ₹${M(pr.custo_total)} financiado (${pr.progresso}%)</div>
        <div style="font-size:10px;color:var(--holo-dim);margin-top:4px">${fac?.n||"—"} • ${p?.n||"—"} • Mês ${pr.mes_atual}/${pr.duracao_meses}</div>
        <div style="font-size:10px;color:var(--gold);margin-top:6px">🏆 ${pr.bonusCompleto}</div>
        ${pr.status==="Em Andamento"?`<div class="flex gap8 mt8">
          <input type="number" id="proj-fund-${pr.id}" placeholder="Financiar (₹)" style="font-size:11px;flex:1">
          <button class="btn btn-holo btn-xs" onclick="financiarProjeto('${pr.id}')">+ FINANCIAR</button>
        </div>`:""}
      </div>`;
    }).join("");

  // Contratos
  const cl=document.getElementById("contratos-list");
  if(cl)cl.innerHTML=E.contratos.length===0
    ?`<div class="hcard" style="text-align:center;padding:30px;color:var(--holo-dim)">Nenhum contrato de financiamento ativo.</div>`
    :E.contratos.map(c=>{
      const fac=gF(c.remetente),p=gP(c.destinatario);
      const pct=Math.min(100,(c.meta_atual/c.meta_valor*100));
      const corSt=c.status==="Falhou"?"var(--red)":c.status==="Concluído"?"var(--green)":"var(--gold)";
      return`<div class="hcard mb12">
        <div class="flex-between mb8">
          <strong style="color:var(--white)">📋 ${c.nome}</strong>
          <div class="flex gap8">
            <span style="font-size:10px;color:${corSt}">${c.status}</span>
            <button class="btn btn-red btn-xs" onclick="delContrato('${c.id}')">🗑️</button>
          </div>
        </div>
        <div style="font-size:11px;color:var(--holo-dim);margin-bottom:8px">${c.desc}</div>
        <div style="font-size:11px;color:var(--text2);margin-bottom:6px">Meta: ${c.meta_atual}/${c.meta_valor} ${c.meta_unidade} • Prazo: ${c.mes_atual}/${c.prazo_meses} meses</div>
        <div class="prog-track"><div class="prog-fill" style="width:${pct}%;background:var(--gold)"></div></div>
        <div style="font-size:10px;color:var(--holo-dim);margin-top:6px">${fac?.n||"—"} → ${p?.n||"—"} • ₹${M(c.valorEnviado)}/₹${M(c.valor)} enviado</div>
        ${c.status==="Em Andamento"?`<div class="flex gap8 mt8">
          <input type="number" id="cont-prog-${c.id}" placeholder="+ progresso na meta" style="font-size:11px;flex:1">
          <button class="btn btn-holo btn-xs" onclick="avancarContrato('${c.id}')">+ AVANÇAR</button>
        </div>`:""}
        ${c.status==="Falhou"?`<div style="font-size:10px;color:var(--red);margin-top:6px">⚠️ ${c.penalidade}</div>`:""}
      </div>`;
    }).join("");

  // Transações
  const tl=document.getElementById("eco-log-list");
  if(tl)tl.innerHTML=E.ecoLog.length===0
    ?`<div style="color:var(--holo-dim);padding:12px 0;font-size:12px">Nenhuma transação econômica registrada ainda.</div>`
    :E.ecoLog.slice(0,30).map(t=>`<div class="log-row">
        <div class="log-info"><div class="log-act">${t.desc}</div><div class="log-meta">${t.data}</div></div>
        <div class="log-amt" style="color:${t.valor>=0?'var(--green)':'var(--red)'}">${t.valor>=0?"+":""}₹${M(t.valor)}</div>
      </div>`).join("");
}

function editarPrecoMercado(id){
  const m=E.mercados.find(x=>x.id===id);if(!m)return;
  const v=prompt(`Novo preço de ${m.nome} (atual: ₹${M(m.precoAtual)}):`,m.precoAtual);
  if(v===null)return;
  m.precoAtual=Math.max(1,parseInt(v)||m.precoAtual);
  toast(`✏️ ${m.nome} atualizado para ₹${M(m.precoAtual)}`);
  renderEco();
}

function fluctuarMercado(silencioso){
  E.mercados.forEach(m=>{
    const varAleatoria=(Math.random()*2-1)*m.volatilidade;
    m.precoAtual=Math.max(Math.round(m.precoBase*0.3), Math.round(m.precoAtual*(1+varAleatoria)));
  });
  E.diaAtual=1+Math.floor(Math.random()*28);
  if(!silencioso)toast("📊 Preços de mercado flutuaram!");
  renderEco();
  renderMacroMercado();
}
function resetMercado(){
  E.mercados.forEach(m=>m.precoAtual=m.precoBase);
  toast("↺ Preços resetados para o valor base.");
  renderEco();
}

function delFabrica(id){
  const f=E.fabricas.find(x=>x.id===id);if(!f)return;
  if(!confirm(`Desativar/remover a fábrica "${f.n||f.nome}"?`))return;
  E.fabricas=E.fabricas.filter(x=>x.id!==id);
  toast("🗑️ Fábrica removida.");renderEco();
}
function financiarProjeto(id){
  const pr=E.projetos.find(x=>x.id===id);if(!pr)return;
  const v=Number(document.getElementById("proj-fund-"+id)?.value||0);
  if(v<=0){toast("Digite um valor válido.");return}
  pr.custo_atual=Math.min(pr.custo_total,pr.custo_atual+v);
  pr.progresso=Math.round(pr.custo_atual/pr.custo_total*100);
  if(pr.progresso>=100)pr.status="Concluído";
  E.ecoLog.unshift({desc:`Financiamento: ${pr.nome}`,data:`${E.anoAtual} ABY M${E.mesAtual}`,valor:-v});
  toast(`🔬 +₹${M(v)} investidos em ${pr.nome} (${pr.progresso}%)`);
  renderEco();
}
function delProjeto(id){
  const pr=E.projetos.find(x=>x.id===id);if(!pr)return;
  if(!confirm(`Cancelar o projeto "${pr.nome}"?`))return;
  E.projetos=E.projetos.filter(x=>x.id!==id);
  toast("🗑️ Projeto cancelado.");renderEco();
}
function avancarContrato(id){
  const c=E.contratos.find(x=>x.id===id);if(!c)return;
  const v=Number(document.getElementById("cont-prog-"+id)?.value||0);
  if(v<=0){toast("Digite um valor válido.");return}
  c.meta_atual=Math.min(c.meta_valor,c.meta_atual+v);
  if(c.meta_atual>=c.meta_valor)c.status="Concluído";
  toast(`📋 ${c.nome}: +${v} ${c.meta_unidade} (${c.meta_atual}/${c.meta_valor})`);
  renderEco();
}
function delContrato(id){
  const c=E.contratos.find(x=>x.id===id);if(!c)return;
  if(!confirm(`Encerrar o contrato "${c.nome}"?`))return;
  E.contratos=E.contratos.filter(x=>x.id!==id);
  toast("🗑️ Contrato encerrado.");renderEco();
}

function rolarDadoMes(){
  const dado=Math.floor(Math.random()*10)+1;
  const disp=document.getElementById("dado-mes-display");
  if(disp)disp.textContent=dado;

  // 1) Flutuação de mercado (tendência do dado + ruído por volatilidade)
  E.mercados.forEach(m=>{
    const tendencia=(dado-5.5)/5.5*0.3;
    const aleatorio=(Math.random()*2-1)*m.volatilidade;
    m.precoAtual=Math.max(Math.round(m.precoBase*0.3), Math.round(m.precoAtual*(1+tendencia+aleatorio)));
  });

  // 2) Fábricas produzem e pagam manutenção
  E.fabricas.forEach(f=>{
    const p=gP(f.pid);if(!p)return;
    if(f.dano<50){
      const mercadoRef=E.mercados.find(m=>m.nome===f.producao.item);
      const preco=mercadoRef?mercadoRef.precoAtual:0;
      const receita=Math.round(preco*f.producao.qtd*(f.eficiencia/100));
      p.cr+=receita;
      p.cr=Math.max(0,p.cr-f.manutencao);
      E.ecoLog.unshift({desc:`Produção: ${f.nome}`,data:`${E.anoAtual} ABY M${E.mesAtual}`,valor:receita-f.manutencao});
    } else {
      f.dano=Math.min(100,f.dano+5);
      E.ecoLog.unshift({desc:`${f.nome} suspensa (dano ${f.dano}%)`,data:`${E.anoAtual} ABY M${E.mesAtual}`,valor:0});
    }
  });

  // 3) Projetos de P&D avançam um mês
  E.projetos.forEach(pr=>{
    if(pr.status==="Em Andamento"){
      pr.mes_atual++;
      pr.progresso=Math.min(100,Math.round(pr.custo_atual/pr.custo_total*100));
      if(pr.progresso>=100)pr.status="Concluído";
    }
  });

  // 4) Contratos avançam prazo e checam falha
  E.contratos.forEach(c=>{
    if(c.status==="Em Andamento"){
      c.mes_atual++;
      if(c.mes_atual>c.prazo_meses && c.meta_atual<c.meta_valor){
        c.status="Falhou";
        E.ecoLog.unshift({desc:`Contrato falhou: ${c.nome}`,data:`${E.anoAtual} ABY M${E.mesAtual}`,valor:0});
      }
    }
  });

  // 5) Renda automática de todas as facções
  let totalRenda=0;
  E.faccoes.forEach(f=>{const r=renda(f);f.fc+=r;totalRenda+=r});
  if(totalRenda>0)E.ecoLog.unshift({desc:`Renda mensal de facções (+${totalRenda} FC total)`,data:`${E.anoAtual} ABY M${E.mesAtual}`,valor:0});

  // Avança o calendário
  E.mesAtual++;
  E.diaAtual=1;
  if(E.mesAtual>12){E.mesAtual=1;E.anoAtual++;}

  toast(`🎲 Mês avançado! Dado do Mês: ${dado}`);
  renderEco();
  renderMacroMercado();
  if(abaAtual==="painel")renderPainel();
}

function escolherPlaneta(msg){
  const lista=E.planetas.map((p,i)=>`${i+1}. ${p.n}`).join("\n");
  const v=prompt(`${msg}\n\n${lista}\n\nDigite o número do planeta:`,"1");
  const idx=parseInt(v)-1;
  return (E.planetas[idx]||E.planetas[0]).id;
}
function escolherFaccao(msg){
  const lista=E.faccoes.map((f,i)=>`${i+1}. ${f.i} ${f.n}`).join("\n");
  const v=prompt(`${msg}\n\n${lista}\n\nDigite o número da facção:`,"1");
  const idx=parseInt(v)-1;
  return (E.faccoes[idx]||E.faccoes[0]).id;
}
function abrirNovaFabrica(){
  if(!E.planetas.length){toast("Crie um planeta primeiro!");return}
  if(!E.faccoes.length){toast("Crie uma facção primeiro!");return}
  const nome=prompt("Nome da fábrica:");if(!nome)return;
  const item=prompt("Item produzido (ex: Gás Tibanna):",MERCS[0].n)||MERCS[0].n;
  const qtd=parseInt(prompt("Quantidade produzida por mês:","10"))||10;
  const manut=parseInt(prompt("Manutenção mensal (₹):","500000"))||500000;
  const fid=escolherFaccao("Qual facção é dona desta fábrica?");
  const pid=escolherPlaneta("Em qual planeta fica esta fábrica?");
  E.fabricas.push({
    id:uid(),nome,fid,pid,tipo:"Genérica",nivel:1,
    producao:{item,qtd,intervalo:1},manutencao:manut,custo:0,
    progresso:100,empregados:100,eficiencia:100,dano:0,
    desc:`Fábrica de ${item}, criada manualmente.`
  });
  toast("🏭 Fábrica criada!");renderEco();
}
function abrirNovoProjeto(){
  if(!E.planetas.length){toast("Crie um planeta primeiro!");return}
  if(!E.faccoes.length){toast("Crie uma facção primeiro!");return}
  const nome=prompt("Nome do projeto de P&D:");if(!nome)return;
  const custo=parseInt(prompt("Custo total (₹):","10000000"))||10000000;
  const duracao=parseInt(prompt("Duração estimada (meses):","12"))||12;
  const bonus=prompt("Bônus ao concluir:","Efeito especial a definir")||"Efeito especial a definir";
  const fid=escolherFaccao("Qual facção está financiando este projeto?");
  const pid=escolherPlaneta("Em qual planeta o projeto é desenvolvido?");
  E.projetos.push({
    id:uid(),nome,fid,pid,tipo:"P&D",
    custo_total:custo,custo_atual:0,duracao_meses:duracao,mes_inicio:E.mesAtual,mes_atual:E.mesAtual,
    progresso:0,status:"Em Andamento",bonusCompleto:bonus,desc:"Projeto criado manualmente.",financiamentos:[]
  });
  toast("🔬 Projeto criado!");renderEco();
}
function abrirNovoContrato(){
  if(!E.planetas.length){toast("Crie um planeta primeiro!");return}
  if(!E.faccoes.length){toast("Crie uma facção primeiro!");return}
  const nome=prompt("Nome do contrato:");if(!nome)return;
  const valor=parseInt(prompt("Valor total do financiamento (₹):","1000000"))||1000000;
  const metaValor=parseInt(prompt("Valor da meta (quantidade):","10"))||10;
  const metaUnid=prompt("Unidade da meta (ex: toneladas, esquadrões):","unidades")||"unidades";
  const prazo=parseInt(prompt("Prazo (meses):","6"))||6;
  const remetente=escolherFaccao("Qual facção envia o financiamento (remetente)?");
  const destinatario=escolherPlaneta("Qual planeta recebe o financiamento (destinatário)?");
  E.contratos.push({
    id:uid(),nome,remetente,destinatario,
    valor,valorEnviado:0,meta_tipo:"producao",meta_valor:metaValor,meta_atual:0,meta_unidade:metaUnid,
    prazo_meses:prazo,mes_inicio:E.mesAtual,mes_atual:E.mesAtual,status:"Em Andamento",
    penalidade:"Perda do recurso + suspensão de contratos",desc:"Contrato criado manualmente."
  });
  toast("📋 Contrato criado!");renderEco();
}

// ─── Override renderAba para incluir economia ─────────────────────
(function(){
  const _orig=renderAba;
  renderAba=function(a){
    if(a==="economia"){renderEco();}
    else _orig(a);
  };
})();

// ══════════ SISTEMA DE SALVAR / CARREGAR CAMPANHA ══════════
const SAVE_PREFIX="glSave_";
const SAVE_INDEX_KEY="glSaveIndex";
const AUTOSAVE_NOME="__autosave__";

function coletarEstadoParaSalvar(){
  return {versao:1,salvoEm:new Date().toISOString(),E:E,combat:combat};
}
function obterIndiceDeSaves(){
  try{return JSON.parse(localStorage.getItem(SAVE_INDEX_KEY)||"{}");}catch(e){return{};}
}
function salvarIndiceDeSaves(idx){
  try{localStorage.setItem(SAVE_INDEX_KEY,JSON.stringify(idx));}catch(e){/* armazenamento indisponível, ignora silenciosamente */}
}

function salvarCampanha(nome,silencioso){
  if(!nome||!nome.trim()){if(!silencioso)toast("Digite um nome para a campanha!");return false}
  nome=nome.trim();
  try{
    const dados=coletarEstadoParaSalvar();
    localStorage.setItem(SAVE_PREFIX+nome,JSON.stringify(dados));
    const idx=obterIndiceDeSaves();
    idx[nome]={timestamp:Date.now(),planetas:E.planetas.length,faccoes:E.faccoes.length};
    salvarIndiceDeSaves(idx);
    try{localStorage.setItem("glUltimoSave",nome);}catch(e){}
    if(!silencioso)toast(`💾 Campanha "${nome}" salva!`);
    return true;
  }catch(err){
    console.error(err);
    if(!silencioso)toast("❌ Erro ao salvar — o armazenamento do navegador pode estar cheio ou bloqueado.");
    return false;
  }
}

function aplicarEstadoCarregado(dados){
  if(dados.E)E=dados.E;
  if(dados.combat)combat=dados.combat;
  E.macroOrdem=E.macroOrdem||[];E.macroIdx=E.macroIdx||0;
  // Reseta seleções de UI que poderiam apontar para algo que não existe mais nesta campanha
  cTipo="planeta";cTmpl="";
  gmSecAtual="planetas";ecoSecAtual="mercado";
  renderAba(abaAtual);
  renderMacroMercado();
}

function carregarCampanha(nome){
  try{
    const raw=localStorage.getItem(SAVE_PREFIX+nome);
    if(!raw){toast("Campanha não encontrada!");return false}
    const dados=JSON.parse(raw);
    aplicarEstadoCarregado(dados);
    try{localStorage.setItem("glUltimoSave",nome);}catch(e){}
    toast(`📂 Campanha "${nome}" carregada!`);
    return true;
  }catch(err){
    console.error(err);
    toast("❌ Erro ao carregar — o save pode estar corrompido.");
    return false;
  }
}

function apagarCampanha(nome){
  if(!confirm(`Apagar a campanha salva "${nome}"? Esta ação não pode ser desfeita.`))return;
  localStorage.removeItem(SAVE_PREFIX+nome);
  const idx=obterIndiceDeSaves();
  delete idx[nome];
  salvarIndiceDeSaves(idx);
  toast(`🗑️ "${nome}" apagada.`);
  renderSaveModal();
}

function formatarDataSave(ts){
  const d=new Date(ts);
  return d.toLocaleDateString("pt-BR")+" "+d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
}

function salvarEAtualizarModal(){
  const nome=document.getElementById("save-nome")?.value;
  if(salvarCampanha(nome))renderSaveModal();
}

function abrirSalvarCarregar(){
  renderSaveModal();
  document.getElementById("ov-save").classList.remove("hidden");
}

function renderSaveModal(){
  const idx=obterIndiceDeSaves();
  const nomes=Object.keys(idx).filter(n=>n!==AUTOSAVE_NOME).sort((a,b)=>idx[b].timestamp-idx[a].timestamp);
  const auto=idx[AUTOSAVE_NOME];
  const ultimoSave=(()=>{try{return localStorage.getItem("glUltimoSave")||"";}catch(e){return"";}})();

  const listaHtml=nomes.length===0
    ?`<div style="font-size:11px;color:var(--holo-dim);padding:12px 0">Nenhuma campanha salva ainda neste navegador.</div>`
    :nomes.map(n=>{
      const nEsc=n.replace(/'/g,"\\'");
      return`<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid rgba(0,50,100,0.3)">
        <div style="flex:1">
          <div style="font-size:12px;font-weight:700;color:var(--text2)">${n}</div>
          <div style="font-size:9px;color:var(--holo-dim)">${formatarDataSave(idx[n].timestamp)} • ${idx[n].planetas} planetas • ${idx[n].faccoes} facções</div>
        </div>
        <button class="btn btn-holo btn-xs" onclick="carregarCampanha('${nEsc}');fechaOv('ov-save')">📂 CARREGAR</button>
        <button class="btn btn-red btn-xs" onclick="apagarCampanha('${nEsc}')">🗑️</button>
      </div>`;
    }).join("");

  const autoHtml=auto?`<div style="display:flex;align-items:center;gap:8px;padding:8px;border:1px solid rgba(168,85,247,0.3);background:rgba(168,85,247,0.06);border-radius:var(--r);margin-bottom:8px">
      <div style="flex:1">
        <div style="font-size:12px;font-weight:700;color:var(--purple)">🔄 Auto-save (salvo sozinho ao fechar a aba)</div>
        <div style="font-size:9px;color:var(--holo-dim)">${formatarDataSave(auto.timestamp)} • ${auto.planetas} planetas • ${auto.faccoes} facções</div>
      </div>
      <button class="btn btn-holo btn-xs" onclick="carregarCampanha('${AUTOSAVE_NOME}');fechaOv('ov-save')">📂 CARREGAR</button>
    </div>`:"";

  document.getElementById("msave-box").innerHTML=`
    <div class="modal-hdr"><div class="modal-title">💾 SALVAR / CARREGAR CAMPANHA</div><button class="btn btn-ghost btn-sm" onclick="fechaOv('ov-save')">✕</button></div>
    <div class="h-block red" style="margin-bottom:14px"><strong>⚠️ Isso salva no NAVEGADOR, neste dispositivo.</strong> Para levar a campanha para outro computador, ou para ter um backup à prova de "limpar cache", use "⬇️ Exportar Arquivo" abaixo e guarde o .json — ele pode ser reimportado em qualquer navegador ou dispositivo.</div>

    <label>Salvar como</label>
    <div class="flex gap8">
      <input id="save-nome" placeholder="Nome da campanha (ex: Setor Lothal - Sexta à Noite)" value="${ultimoSave&&ultimoSave!==AUTOSAVE_NOME?ultimoSave:""}" style="flex:1">
      <button class="btn btn-gold btn-sm" onclick="salvarEAtualizarModal()">💾 SALVAR</button>
    </div>
    <div class="div"></div>

    <label style="margin-top:0">Campanhas Salvas Neste Navegador</label>
    ${autoHtml}
    ${listaHtml}
    <div class="div"></div>

    <div class="flex gap8">
      <button class="btn btn-holo btn-sm fw" onclick="exportarArquivo()">⬇️ EXPORTAR ARQUIVO (.json)</button>
      <button class="btn btn-ghost btn-sm fw" onclick="document.getElementById('input-importar-json').click()">⬆️ IMPORTAR ARQUIVO (.json)</button>
    </div>`;
}

function exportarArquivo(){
  try{
    const dados=coletarEstadoParaSalvar();
    const blob=new Blob([JSON.stringify(dados,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    const nomeArquivo=`galactic-ledger-${new Date().toISOString().slice(0,10)}.json`;
    a.href=url;a.download=nomeArquivo;
    document.body.appendChild(a);a.click();document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast(`⬇️ Arquivo "${nomeArquivo}" baixado!`);
  }catch(err){
    console.error(err);
    toast("❌ Erro ao exportar o arquivo.");
  }
}
function processarArquivoImportado(event){
  const file=event.target.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    try{
      const dados=JSON.parse(e.target.result);
      if(!dados.E){toast("❌ Este arquivo não parece ser um save válido do Galactic Ledger.");return}
      if(!confirm("Importar este arquivo vai SUBSTITUIR a campanha atual na tela (os saves já salvos no navegador não são apagados). Continuar?"))return;
      aplicarEstadoCarregado(dados);
      toast(`⬆️ Arquivo importado com sucesso!`);
      fechaOv("ov-save");
    }catch(err){
      console.error(err);
      toast("❌ Arquivo inválido ou corrompido.");
    }
  };
  reader.readAsText(file);
  event.target.value="";
}

// Auto-save silencioso: ao trocar de aba/fechar e a cada 60 segundos, como rede de segurança
window.addEventListener("beforeunload",()=>{salvarCampanha(AUTOSAVE_NOME,true);});
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")salvarCampanha(AUTOSAVE_NOME,true);});
setInterval(()=>salvarCampanha(AUTOSAVE_NOME,true),60000);

// Ao abrir a página, avisa (sem carregar sozinho) se já existe algo salvo para recuperar
(function avisarSavesAoAbrir(){
  try{
    const idx=obterIndiceDeSaves();
    const total=Object.keys(idx).length;
    if(total>0)setTimeout(()=>toast(`💾 Encontramos ${total} campanha(s) salva(s) neste navegador. Clique em "💾 SALVAR/CARREGAR" no topo para carregar.`,6000),1200);
  }catch(e){/* localStorage indisponível neste contexto */}
})();

const EMBED_LEGISLACAO_B64 = [
"PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9InB0LUJSIj4KPGhlYWQ+CjxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgo8dGl0bGU+SE9MT05FVCAvLyBSZWdpc3RybyBkZSBMZWdpc2xhw6fDo28gU2V0b3JpYWw8L3RpdGxlPgo8bGluayByZWw9InByZWNvbm5lY3QiIGhyZWY9Imh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20iPgo8bGluayBocmVmPSJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nz",
"czI/ZmFtaWx5PU9yYml0cm9uOndnaHRANTAwOzcwMDs5MDAmZmFtaWx5PVJhamRoYW5pOndnaHRANDAwOzUwMDs2MDA7NzAwJmRpc3BsYXk9c3dhcCIgcmVsPSJzdHlsZXNoZWV0Ij4KPHN0eWxlPgo6cm9vdHsKICAtLXZvaWQ6IzAyMDQwYTsKICAtLXZvaWQyOiMwNTA4MTA7CiAgLS1wYW5lbDogcmdiYSg4LDE2LDI2LDAuNzIpOwogIC0tcGFuZWwtc29saWQ6IzBhMTIxZTsKICAtLWxpbmU6IHJnYmEoMTIwLDE5MCwyNTUsMC4xOCk7CiAgLS1saW5lLXN0cm9uZzogcmdiYSgxMjAsMTkwLDI1NSwwLjQpOwoKICAtLWJsdWU6IzNi",
"YTdmZjsgICAgLS1ibHVlLWRpbTojMTc1YzkyOyAgIC0tYmx1ZS1nbG93OiByZ2JhKDU5LDE2NywyNTUsMC41NSk7CiAgLS1yZWQ6I2ZmM2IzYjsgICAgICAtLXJlZC1kaW06IzhmMjMyMzsgICAgLS1yZWQtZ2xvdzogcmdiYSgyNTUsNTksNTksMC41NSk7CiAgLS1ncmVlbjojMzlmZjljOyAgICAtLWdyZWVuLWRpbTojMWM4ZjVhOyAgLS1ncmVlbi1nbG93OiByZ2JhKDU3LDI1NSwxNTYsMC41KTsKICAtLWFtYmVyOiNmZmIzNDA7ICAgIC0tYW1iZXItZGltOiM4ZjZhMWM7ICAtLWFtYmVyLWdsb3c6IHJnYmEoMjU1LDE3OSw2NCww",
"LjUpOwogIC0tcHVycGxlOiNiOThiZmY7ICAgLS1wdXJwbGUtZGltOiM2YjRhOTk7CgogIC0taW5rOiNkYmVlZmY7CiAgLS1pbmstZGltOiM2ZjhhYTM7CiAgLS1pbmstZGltbWVyOiM0MjU2Njg7CgogIC0tZm9udC1kaXNwbGF5OidPcmJpdHJvbicsICdSYWpkaGFuaScsIHNhbnMtc2VyaWY7CiAgLS1mb250LWJvZHk6J1JhamRoYW5pJywgJ1NlZ29lIFVJJywgc2Fucy1zZXJpZjsKfQoqe2JveC1zaXppbmc6Ym9yZGVyLWJveDt9Cmh0bWwsYm9keXttYXJnaW46MDsgcGFkZGluZzowOyBtaW4taGVpZ2h0OjEwMHZoOyBiYWNrZ3Jv",
"dW5kOnZhcigtLXZvaWQpOyBjb2xvcjp2YXIoLS1pbmspOyBmb250LWZhbWlseTp2YXIoLS1mb250LWJvZHkpOyBmb250LXNpemU6MTVweDt9CmJvZHl7CiAgYmFja2dyb3VuZDoKICAgIHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IDE1JSA4JSwgcmdiYSg1OSwxNjcsMjU1LDAuMTApLCB0cmFuc3BhcmVudCA0MiUpLAogICAgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgODglIDkyJSwgcmdiYSgyNTUsNTksNTksMC4wOCksIHRyYW5zcGFyZW50IDQ1JSksCiAgICByYWRpYWwtZ3JhZGllbnQoZWxsaXBzZSBhdCA4NSUgMTAl",
"LCByZ2JhKDU3LDI1NSwxNTYsMC4wNyksIHRyYW5zcGFyZW50IDQwJSksCiAgICByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyNTUsMjU1LDI1NSwwLjAxMikgMHB4LCByZ2JhKDI1NSwyNTUsMjU1LDAuMDEyKSAxcHgsIHRyYW5zcGFyZW50IDFweCwgdHJhbnNwYXJlbnQgM3B4KSwKICAgIHZhcigtLXZvaWQpOwogIG1pbi1oZWlnaHQ6MTAwdmg7CiAgcG9zaXRpb246cmVsYXRpdmU7CiAgb3ZlcmZsb3cteDpoaWRkZW47Cn0KYm9keTo6YmVmb3JlewogIGNvbnRlbnQ6Jyc7IHBvc2l0aW9uOmZpeGVkOyBp",
"bnNldDowOyBwb2ludGVyLWV2ZW50czpub25lOyB6LWluZGV4OjI7CiAgYmFja2dyb3VuZDoKICAgIGxpbmVhci1ncmFkaWVudChyZ2JhKDE1MCwyMTAsMjU1LDAuMDI1KSAxcHgsIHRyYW5zcGFyZW50IDFweCkgMCAwIC8gMTAwJSAzcHg7CiAgb3BhY2l0eTouNTsKICBhbmltYXRpb246IGZsaWNrZXIgNnMgaW5maW5pdGUgc3RlcHMoMzApOwp9CkBrZXlmcmFtZXMgZmxpY2tlcnsKICAwJSw5NyUsMTAwJXtvcGFjaXR5Oi40NTt9CiAgOTgle29wYWNpdHk6LjE1O30KICA5OSV7b3BhY2l0eTouNjt9Cn0KOjotd2Via2l0LXNjcm9s",
"bGJhcnt3aWR0aDo4cHg7IGhlaWdodDo4cHg7fQo6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNre2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7fQo6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1ie2JhY2tncm91bmQ6dmFyKC0tbGluZS1zdHJvbmcpOyBib3JkZXItcmFkaXVzOjRweDt9CgovKiAtLS0tLS0tLS0tLS0tLS0tIFN0YXIgZ3JpZCBiYWNrZHJvcCAtLS0tLS0tLS0tLS0tLS0tICovCi5zdGFyZmllbGR7CiAgcG9zaXRpb246Zml4ZWQ7IGluc2V0OjA7IHotaW5kZXg6MDsgcG9pbnRlci1ldmVudHM6bm9uZTsKICBiYWNrZ3JvdW5k",
"LWltYWdlOgogICAgcmFkaWFsLWdyYWRpZW50KDFweCAxcHggYXQgMTIlIDIyJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjU1KSwgdHJhbnNwYXJlbnQpLAogICAgcmFkaWFsLWdyYWRpZW50KDFweCAxcHggYXQgMzglIDY4JSwgcmdiYSgyNTUsMjU1LDI1NSwwLjQpLCB0cmFuc3BhcmVudCksCiAgICByYWRpYWwtZ3JhZGllbnQoMS41cHggMS41cHggYXQgNjIlIDE0JSwgcmdiYSgyNTUsMjU1LDI1NSwwLjYpLCB0cmFuc3BhcmVudCksCiAgICByYWRpYWwtZ3JhZGllbnQoMXB4IDFweCBhdCA3OCUgNzglLCByZ2JhKDI1NSwyNTUsMjU1",
"LDAuMzUpLCB0cmFuc3BhcmVudCksCiAgICByYWRpYWwtZ3JhZGllbnQoMXB4IDFweCBhdCA5MiUgMzQlLCByZ2JhKDI1NSwyNTUsMjU1LDAuNSksIHRyYW5zcGFyZW50KSwKICAgIHJhZGlhbC1ncmFkaWVudCgxLjVweCAxLjVweCBhdCAyNSUgODglLCByZ2JhKDI1NSwyNTUsMjU1LDAuNCksIHRyYW5zcGFyZW50KSwKICAgIHJhZGlhbC1ncmFkaWVudCgxcHggMXB4IGF0IDU1JSA0NSUsIHJnYmEoMjU1LDI1NSwyNTUsMC4zKSwgdHJhbnNwYXJlbnQpOwogIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlOwp9CgovKiAtLS0tLS0t",
"LS0tLS0tLS0tIFV0aWxpdHkgcGFuZWxzIC8gSFVEIGZyYW1lIC0tLS0tLS0tLS0tLS0tLS0gKi8KLmh1ZC1mcmFtZXsKICBwb3NpdGlvbjpyZWxhdGl2ZTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1wYW5lbCk7CiAgYm9yZGVyOjFweCBzb2xpZCB2YXIoLS1saW5lKTsKICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNnB4KTsKfQouaHVkLWZyYW1lOjpiZWZvcmUsIC5odWQtZnJhbWU6OmFmdGVyewogIGNvbnRlbnQ6Jyc7IHBvc2l0aW9uOmFic29sdXRlOyB3aWR0aDoxNHB4OyBoZWlnaHQ6MTRweDsgcG9pbnRlci1ldmVudHM6bm9uZTsK",
"ICBib3JkZXItY29sb3I6IHZhcigtLWNjbHIsIHZhcigtLWJsdWUpKTsKfQouY29ybmVyLWJyYWNrZXRzeyBwb3NpdGlvbjpyZWxhdGl2ZTsgfQouY29ybmVyLWJyYWNrZXRzOjpiZWZvcmV7CiAgY29udGVudDonJzsgcG9zaXRpb246YWJzb2x1dGU7IHRvcDotMXB4OyBsZWZ0Oi0xcHg7IHdpZHRoOjE2cHg7IGhlaWdodDoxNnB4OwogIGJvcmRlci10b3A6MnB4IHNvbGlkIHZhcigtLWNjbHIsIHZhcigtLWJsdWUpKTsgYm9yZGVyLWxlZnQ6MnB4IHNvbGlkIHZhcigtLWNjbHIsIHZhcigtLWJsdWUpKTsKfQouY29ybmVyLWJyYWNr",
"ZXRzOjphZnRlcnsKICBjb250ZW50OicnOyBwb3NpdGlvbjphYnNvbHV0ZTsgYm90dG9tOi0xcHg7IHJpZ2h0Oi0xcHg7IHdpZHRoOjE2cHg7IGhlaWdodDoxNnB4OwogIGJvcmRlci1ib3R0b206MnB4IHNvbGlkIHZhcigtLWNjbHIsIHZhcigtLWJsdWUpKTsgYm9yZGVyLXJpZ2h0OjJweCBzb2xpZCB2YXIoLS1jY2xyLCB2YXIoLS1ibHVlKSk7Cn0KLmNvcm5lci1icmFja2V0cyAuYnIyLXRyeyBwb3NpdGlvbjphYnNvbHV0ZTsgdG9wOi0xcHg7IHJpZ2h0Oi0xcHg7IHdpZHRoOjE2cHg7IGhlaWdodDoxNnB4OyBib3JkZXItdG9w",
"OjJweCBzb2xpZCB2YXIoLS1jY2xyLCB2YXIoLS1ibHVlKSk7IGJvcmRlci1yaWdodDoycHggc29saWQgdmFyKC0tY2NsciwgdmFyKC0tYmx1ZSkpOyB9Ci5jb3JuZXItYnJhY2tldHMgLmJyMi1ibHsgcG9zaXRpb246YWJzb2x1dGU7IGJvdHRvbTotMXB4OyBsZWZ0Oi0xcHg7IHdpZHRoOjE2cHg7IGhlaWdodDoxNnB4OyBib3JkZXItYm90dG9tOjJweCBzb2xpZCB2YXIoLS1jY2xyLCB2YXIoLS1ibHVlKSk7IGJvcmRlci1sZWZ0OjJweCBzb2xpZCB2YXIoLS1jY2xyLCB2YXIoLS1ibHVlKSk7IH0KCi8qIC0tLS0tLS0tLS0tLS0t",
"LS0gSGVhZGVyIC8gZ2xvYmFsIEhVRCBiYXIgLS0tLS0tLS0tLS0tLS0tLSAqLwpoZWFkZXJ7CiAgcG9zaXRpb246cmVsYXRpdmU7IHotaW5kZXg6NTsKICBkaXNwbGF5OmZsZXg7IGFsaWduLWl0ZW1zOmNlbnRlcjsganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47IGdhcDoyMHB4OyBmbGV4LXdyYXA6d3JhcDsKICBwYWRkaW5nOjE4cHggMzBweDsgYm9yZGVyLWJvdHRvbToxcHggc29saWQgdmFyKC0tbGluZSk7CiAgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2JhKDYsMTIsMjIsMC45KSwgcmdiYSg2",
"LDEyLDIyLDAuNTUpKTsKICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoOHB4KTsKfQouYnJhbmR7ZGlzcGxheTpmbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IGdhcDoxNHB4O30KLmJyYW5kIC5lbWJsZW17CiAgd2lkdGg6MzhweDsgaGVpZ2h0OjM4cHg7IGJvcmRlci1yYWRpdXM6NTAlOyBib3JkZXI6MnB4IHNvbGlkIHZhcigtLWJsdWUpOwogIGRpc3BsYXk6ZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOyBmb250LWZhbWlseTp2YXIoLS1mb250LWRpc3BsYXkpOwogIGNvbG9yOnZhcigtLWJs",
"dWUpOyBmb250LXdlaWdodDo5MDA7IGZvbnQtc2l6ZToxNXB4OyBib3gtc2hhZG93OjAgMCAxNHB4IHZhcigtLWJsdWUtZ2xvdyksIGluc2V0IDAgMCAxMHB4IHZhcigtLWJsdWUtZ2xvdyk7CiAgZmxleDpub25lOwp9Ci5icmFuZCBoMXsKICBmb250LWZhbWlseTp2YXIoLS1mb250LWRpc3BsYXkpOyBmb250LXdlaWdodDo5MDA7IGZvbnQtc2l6ZToyMnB4OyBtYXJnaW46MDsgbGV0dGVyLXNwYWNpbmc6LjE0ZW07CiAgY29sb3I6dmFyKC0taW5rKTsgdGV4dC1zaGFkb3c6MCAwIDEycHggdmFyKC0tYmx1ZS1nbG93KTsKfQouYnJh",
"bmQgLnN1YnsgZm9udC1zaXplOjExcHg7IGNvbG9yOnZhcigtLWluay1kaW0pOyBsZXR0ZXItc3BhY2luZzouMThlbTsgdGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlOyBtYXJnaW4tdG9wOjJweDt9Ci5oZWFkZXJBY3Rpb25ze2Rpc3BsYXk6ZmxleDsgZ2FwOjlweDsgZmxleC13cmFwOndyYXA7IGFsaWduLWl0ZW1zOmNlbnRlcjt9CgpidXR0b257IGZvbnQtZmFtaWx5OnZhcigtLWZvbnQtYm9keSk7IGN1cnNvcjpwb2ludGVyOyB9Ci5oYnRuewogIHBvc2l0aW9uOnJlbGF0aXZlOyBiYWNrZ3JvdW5kOnJnYmEoMTAsMTgsMzAsMC43",
"KTsgY29sb3I6dmFyKC0taW5rKTsgYm9yZGVyOjFweCBzb2xpZCB2YXIoLS1saW5lLXN0cm9uZyk7CiAgcGFkZGluZzo5cHggMTZweDsgZm9udC1zaXplOjEycHg7IGxldHRlci1zcGFjaW5nOi4xZW07IHRleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTsgZm9udC13ZWlnaHQ6NjAwOwogIGNsaXAtcGF0aDogcG9seWdvbig4cHggMCwgMTAwJSAwLCAxMDAlIGNhbGMoMTAwJSAtIDhweCksIGNhbGMoMTAwJSAtIDhweCkgMTAwJSwgMCAxMDAlLCAwIDhweCk7CiAgdHJhbnNpdGlvbjouMTVzIGFsbDsKfQouaGJ0bjpob3ZlcnsgYm9yZGVy",
"LWNvbG9yOnZhcigtLWJsdWUpOyBjb2xvcjp2YXIoLS1ibHVlKTsgYm94LXNoYWRvdzowIDAgMTJweCB2YXIoLS1ibHVlLWdsb3cpOyB9Ci5oYnRuLm9uLWJsdWU6aG92ZXIsIC5oYnRuLnByaW1hcnl7IGJvcmRlci1jb2xvcjp2YXIoLS1ibHVlKTsgY29sb3I6IzA0MTIxZTsgYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCB2YXIoLS1ibHVlKSwgdmFyKC0tYmx1ZS1kaW0pKTsgdGV4dC1zaGFkb3c6bm9uZTsgZm9udC13ZWlnaHQ6NzAwO30KLmhidG4ucHJpbWFyeTpob3ZlcnsgYm94LXNoYWRvdzowIDAgMTZweCB2",
"YXIoLS1ibHVlLWdsb3cpOyBmaWx0ZXI6YnJpZ2h0bmVzcygxLjEpO30KLmhidG4ub24tcmVkOmhvdmVyLCAuaGJ0bi5kYW5nZXJ7IGJvcmRlci1jb2xvcjp2YXIoLS1yZWQpOyBjb2xvcjp2YXIoLS1yZWQpOyB9Ci5oYnRuLmRhbmdlcjpob3ZlcnsgYm94LXNoYWRvdzowIDAgMTJweCB2YXIoLS1yZWQtZ2xvdyk7IGJhY2tncm91bmQ6cmdiYSgyNTUsNTksNTksMC4wOCk7IH0KLmhidG4ub24tZ3JlZW46aG92ZXJ7IGJvcmRlci1jb2xvcjp2YXIoLS1ncmVlbik7IGNvbG9yOnZhcigtLWdyZWVuKTsgYm94LXNoYWRvdzowIDAgMTJw",
"eCB2YXIoLS1ncmVlbi1nbG93KTsgfQouaGJ0bi5zbWFsbHsgcGFkZGluZzo2cHggMTFweDsgZm9udC1zaXplOjEwLjVweDsgfQouaGJ0bjpkaXNhYmxlZHsgb3BhY2l0eTouMzsgY3Vyc29yOm5vdC1hbGxvd2VkOyB9Ci5oYnRuLmdob3N0eyBiYWNrZ3JvdW5kOnRyYW5zcGFyZW50OyBib3JkZXItc3R5bGU6ZGFzaGVkOyBjb2xvcjp2YXIoLS1pbmstZGltKTsgfQouaGJ0bi5naG9zdDpob3ZlcnsgY29sb3I6dmFyKC0tYmx1ZSk7IGJvcmRlci1jb2xvcjp2YXIoLS1ibHVlKTsgfQoKLyogLS0tLS0tLS0tLS0tLS0tLSBCcmVhZGNy",
"dW1iIC8gYmFjayBuYXYgLS0tLS0tLS0tLS0tLS0tLSAqLwouc3VibmF2ewogIGRpc3BsYXk6ZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBnYXA6MTBweDsgcGFkZGluZzoxNHB4IDMwcHg7IGJvcmRlci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWxpbmUpOwogIGZvbnQtc2l6ZToxMS41cHg7IGxldHRlci1zcGFjaW5nOi4wOGVtOyBjb2xvcjp2YXIoLS1pbmstZGltKTsgdGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlOyBmbGV4LXdyYXA6d3JhcDsKICBiYWNrZ3JvdW5kOnJnYmEoNCw5LDE2LDAuNSk7Cn0KLnN1Ym5hdiAuY3J1bWJ7",
"IGN1cnNvcjpwb2ludGVyOyB9Ci5zdWJuYXYgLmNydW1iOmhvdmVyeyBjb2xvcjp2YXIoLS1ibHVlKTsgfQouc3VibmF2IC5jcnVtYi5jdXJyZW50eyBjb2xvcjp2YXIoLS1pbmspOyB9Ci5zdWJuYXYgLnNlcHsgY29sb3I6dmFyKC0taW5rLWRpbW1lcik7IH0KLmJhY2tidG57CiAgZGlzcGxheTppbmxpbmUtZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBnYXA6NnB4OyBib3JkZXI6MXB4IHNvbGlkIHZhcigtLWxpbmUtc3Ryb25nKTsgcGFkZGluZzo2cHggMTJweDsKICBjb2xvcjp2YXIoLS1pbmspOyBmb250LXNpemU6MTFweDsg",
"bGV0dGVyLXNwYWNpbmc6LjA4ZW07IHRleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTsgY3Vyc29yOnBvaW50ZXI7CiAgY2xpcC1wYXRoOiBwb2x5Z29uKDZweCAwLCAxMDAlIDAsIDEwMCUgMTAwJSwgMCAxMDAlLCAwIDZweCk7Cn0KLmJhY2tidG46aG92ZXJ7IGJvcmRlci1jb2xvcjp2YXIoLS1ibHVlKTsgY29sb3I6dmFyKC0tYmx1ZSk7IH0KCi8qIC0tLS0tLS0tLS0tLS0tLS0gTWFpbiBzdGFnZSAtLS0tLS0tLS0tLS0tLS0tICovCi5zdGFnZXsgcG9zaXRpb246cmVsYXRpdmU7IHotaW5kZXg6MzsgcGFkZGluZzozMnB4IDM0cHgg",
"NzBweDsgbWF4LXdpZHRoOjEzMDBweDsgbWFyZ2luOjAgYXV0bzsgfQoKLnN0YWdlLXRpdGxlLXJvd3sgZGlzcGxheTpmbGV4OyBhbGlnbi1pdGVtczpmbGV4LWVuZDsganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47IGdhcDoyMHB4OyBmbGV4LXdyYXA6d3JhcDsgbWFyZ2luLWJvdHRvbToyNnB4OyB9Ci5zdGFnZS1leWVicm93eyBmb250LXNpemU6MTAuNXB4OyBsZXR0ZXItc3BhY2luZzouMzRlbTsgdGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlOyBjb2xvcjp2YXIoLS1jY2xyLCB2YXIoLS1ibHVlKSk7IG1hcmdpbi1ib3R0",
"b206NnB4OyB9Ci5zdGFnZS10aXRsZXsgZm9udC1mYW1pbHk6dmFyKC0tZm9udC1kaXNwbGF5KTsgZm9udC13ZWlnaHQ6ODAwOyBmb250LXNpemU6MzJweDsgbWFyZ2luOjA7IGxldHRlci1zcGFjaW5nOi4wM2VtOwogIGNvbG9yOnZhcigtLWluayk7IHRleHQtc2hhZG93OjAgMCAxNnB4IHZhcigtLWNjbHItZ2xvdywgdmFyKC0tYmx1ZS1nbG93KSk7IH0KLnN0YWdlLXN1YnsgY29sb3I6dmFyKC0taW5rLWRpbSk7IGZvbnQtc2l6ZToxMi41cHg7IG1hcmdpbi10b3A6NnB4OyBsZXR0ZXItc3BhY2luZzouMDNlbTsgfQouc3RhZ2Ut",
"YWN0aW9uc3sgZGlzcGxheTpmbGV4OyBnYXA6OXB4OyBmbGV4LXdyYXA6d3JhcDsgfQoKLyogLS0tLS0tLS0tLS0tLS0tLSBCZWFjb24gZ3JpZCAoY2xvc2VkIG1lbnUpIC0tLS0tLS0tLS0tLS0tLS0gKi8KLmJlYWNvbi1ncmlkewogIGRpc3BsYXk6Z3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOnJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgxOTBweCwgMWZyKSk7IGdhcDoyMnB4OyBtYXJnaW4tYm90dG9tOjEwcHg7Cn0KLmJlYWNvbnsKICAtLWNjbHI6IHZhcigtLWJsdWUpOyAtLWNjbHItZ2xvdzogdmFyKC0tYmx1ZS1nbG93",
"KTsKICBwb3NpdGlvbjpyZWxhdGl2ZTsgY3Vyc29yOnBvaW50ZXI7IHBhZGRpbmc6MjRweCAxNnB4IDE4cHg7IHRleHQtYWxpZ246Y2VudGVyOwogIGJvcmRlcjoxcHggc29saWQgdmFyKC0tbGluZSk7IGJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgxMCwyMCwzNCwwLjU1KSwgcmdiYSg0LDgsMTQsMC41NSkpOwogIGNsaXAtcGF0aDogcG9seWdvbigxNHB4IDAsIDEwMCUgMCwgMTAwJSBjYWxjKDEwMCUgLSAxNHB4KSwgY2FsYygxMDAlIC0gMTRweCkgMTAwJSwgMCAxMDAlLCAwIDE0cHgpOwogIHRyYW5z",
"aXRpb246LjE4cyB0cmFuc2Zvcm0sIC4xOHMgYm94LXNoYWRvdywgLjE4cyBib3JkZXItY29sb3I7Cn0KLmJlYWNvbjpob3ZlcnsgdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTRweCk7IGJvcmRlci1jb2xvcjp2YXIoLS1jY2xyKTsgYm94LXNoYWRvdzowIDhweCAyNnB4IHJnYmEoMCwwLDAsLjQpLCAwIDAgMThweCB2YXIoLS1jY2xyLWdsb3cpOyB9Ci5iZWFjb24gLm9yYnsKICB3aWR0aDo2NHB4OyBoZWlnaHQ6NjRweDsgbWFyZ2luOjAgYXV0byAxNHB4OyBib3JkZXItcmFkaXVzOjUwJTsKICBib3JkZXI6MnB4IHNvbGlkIHZhcigt",
"LWNjbHIpOyBwb3NpdGlvbjpyZWxhdGl2ZTsKICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDM1JSAzMCUsIHJnYmEoMjU1LDI1NSwyNTUsMC4xOCksIHRyYW5zcGFyZW50IDYwJSksCiAgICAgICAgICAgICAgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgY29sb3ItbWl4KGluIHNyZ2IsIHZhcigtLWNjbHIpIDIyJSwgdHJhbnNwYXJlbnQpLCB0cmFuc3BhcmVudCA3MCUpOwogIGJveC1zaGFkb3c6IDAgMCAxOHB4IHZhcigtLWNjbHItZ2xvdyksIGluc2V0IDAgMCAxNHB4IHZhcigtLWNjbHItZ2xvdyk7CiAg",
"YW5pbWF0aW9uOiBwdWxzZS1vcmIgMy40cyBlYXNlLWluLW91dCBpbmZpbml0ZTsKfQpAa2V5ZnJhbWVzIHB1bHNlLW9yYnsgMCUsMTAwJXsgYm94LXNoYWRvdzowIDAgMTRweCB2YXIoLS1jY2xyLWdsb3cpLCBpbnNldCAwIDAgMTBweCB2YXIoLS1jY2xyLWdsb3cpO30gNTAleyBib3gtc2hhZG93OjAgMCAyNnB4IHZhcigtLWNjbHItZ2xvdyksIGluc2V0IDAgMCAxOHB4IHZhcigtLWNjbHItZ2xvdyk7fSB9Ci5iZWFjb24gLm9yYiAucmluZ3sKICBwb3NpdGlvbjphYnNvbHV0ZTsgaW5zZXQ6LThweDsgYm9yZGVyLXJhZGl1czo1",
"MCU7IGJvcmRlcjoxcHggZGFzaGVkIGNvbG9yLW1peChpbiBzcmdiLCB2YXIoLS1jY2xyKSA1NSUsIHRyYW5zcGFyZW50KTsKICBhbmltYXRpb246IHNwaW4gMTRzIGxpbmVhciBpbmZpbml0ZTsKfQpAa2V5ZnJhbWVzIHNwaW57IGZyb217dHJhbnNmb3JtOnJvdGF0ZSgwZGVnKTt9IHRve3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt9IH0KLmJlYWNvbiAuYm5hbWV7IGZvbnQtZmFtaWx5OnZhcigtLWZvbnQtZGlzcGxheSk7IGZvbnQtc2l6ZToxMy41cHg7IGZvbnQtd2VpZ2h0OjcwMDsgbGV0dGVyLXNwYWNpbmc6LjA0ZW07IGNv",
"bG9yOnZhcigtLWluayk7IG1hcmdpbi1ib3R0b206NHB4OyB3b3JkLWJyZWFrOmJyZWFrLXdvcmQ7IH0KLmJlYWNvbiAuYm1ldGF7IGZvbnQtc2l6ZToxMC41cHg7IGNvbG9yOnZhcigtLWluay1kaW0pOyBsZXR0ZXItc3BhY2luZzouMDVlbTsgfQouYmVhY29uIC5ibWV0YSBieyBjb2xvcjp2YXIoLS1jY2xyKTsgfQouYmVhY29uLmdob3N0eyBib3JkZXItc3R5bGU6ZGFzaGVkOyBvcGFjaXR5Oi43NTsgfQouYmVhY29uLmdob3N0OmhvdmVyeyBvcGFjaXR5OjE7IH0KLmJlYWNvbi5naG9zdCAub3JieyBib3JkZXItc3R5bGU6ZGFz",
"aGVkOyBiYWNrZ3JvdW5kOnRyYW5zcGFyZW50OyBib3gtc2hhZG93Om5vbmU7IGFuaW1hdGlvbjpub25lOyB9Ci5iZWFjb24uZ2hvc3QgLnBsdXN7IGZvbnQtZmFtaWx5OnZhcigtLWZvbnQtZGlzcGxheSk7IGZvbnQtc2l6ZToyNnB4OyBjb2xvcjp2YXIoLS1jY2xyKTsgbGluZS1oZWlnaHQ6NjRweDsgfQoKLyogLS0tLS0tLS0tLS0tLS0tLSBTZWN0aW9ucyAtLS0tLS0tLS0tLS0tLS0tICovCi5zZWN0aW9ueyBtYXJnaW46MzZweCAwIDEwcHg7IH0KLnNlY3Rpb24taGVhZHsKICBkaXNwbGF5OmZsZXg7IGFsaWduLWl0ZW1zOmNl",
"bnRlcjsganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47IGdhcDoxMnB4OyBmbGV4LXdyYXA6d3JhcDsKICBib3JkZXItYm90dG9tOjFweCBzb2xpZCB2YXIoLS1saW5lKTsgcGFkZGluZy1ib3R0b206OXB4OyBtYXJnaW4tYm90dG9tOjE2cHg7Cn0KLnNlY3Rpb24taGVhZCBoM3sKICBmb250LWZhbWlseTp2YXIoLS1mb250LWRpc3BsYXkpOyBmb250LXdlaWdodDo3MDA7IGZvbnQtc2l6ZToxNXB4OyBsZXR0ZXItc3BhY2luZzouMDZlbTsgdGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlOwogIGNvbG9yOnZhcigtLWluayk7IG1h",
"cmdpbjowOyBkaXNwbGF5OmZsZXg7IGFsaWduLWl0ZW1zOmNlbnRlcjsgZ2FwOjhweDsKfQouc2VjdGlvbi1oZWFkIGgzOjpiZWZvcmV7IGNvbnRlbnQ6Jyc7IHdpZHRoOjhweDsgaGVpZ2h0OjhweDsgYmFja2dyb3VuZDp2YXIoLS1jY2xyLHZhcigtLWJsdWUpKTsgYm94LXNoYWRvdzowIDAgOHB4IHZhcigtLWNjbHItZ2xvdyx2YXIoLS1ibHVlLWdsb3cpKTsgZGlzcGxheTppbmxpbmUtYmxvY2s7IH0KLnNlY3Rpb24taGVhZCAuY291bnR7IGZvbnQtc2l6ZToxMC41cHg7IGNvbG9yOnZhcigtLWluay1kaW0pOyBsZXR0ZXItc3Bh",
"Y2luZzouMDZlbTsgfQouc2VjdGlvbi1oZWFkIC5oZWFkLWFjdGlvbnN7IGRpc3BsYXk6ZmxleDsgZ2FwOjhweDsgfQouZW1wdHktYmxvY2t7IGJvcmRlcjoxcHggZGFzaGVkIHZhcigtLWxpbmUpOyBwYWRkaW5nOjI2cHg7IHRleHQtYWxpZ246Y2VudGVyOyBjb2xvcjp2YXIoLS1pbmstZGltKTsgZm9udC1zaXplOjEycHg7IGxldHRlci1zcGFjaW5nOi4wM2VtOyB9CgovKiAtLS0tLS0tLS0tLS0tLS0tIFJ1bGVycyAvIGxlYWRlcnMgY2hpcHMgLS0tLS0tLS0tLS0tLS0tLSAqLwouY2hpcC1yb3d7IGRpc3BsYXk6ZmxleDsgZ2Fw",
"OjlweDsgZmxleC13cmFwOndyYXA7IG1hcmdpbjoxOHB4IDAgOHB4OyBhbGlnbi1pdGVtczpjZW50ZXI7IH0KLmNoaXAtcm93IC5yb3ctY2FwdGlvbnsgd2lkdGg6MTAwJTsgZm9udC1zaXplOjEwcHg7IGxldHRlci1zcGFjaW5nOi4xOGVtOyB0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7IGNvbG9yOnZhcigtLWluay1kaW0pOyBtYXJnaW4tYm90dG9tOjJweDsgfQouY2hpcHsKICBib3JkZXI6MXB4IHNvbGlkIHZhcigtLWxpbmUtc3Ryb25nKTsgYmFja2dyb3VuZDpyZ2JhKDEwLDE4LDMwLDAuNyk7IHBhZGRpbmc6N3B4IDEzcHg7",
"IGZvbnQtc2l6ZToxMnB4OwogIGRpc3BsYXk6ZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBnYXA6OXB4OyBjbGlwLXBhdGg6IHBvbHlnb24oNnB4IDAsMTAwJSAwLDEwMCUgMTAwJSwwIDEwMCUsMCA2cHgpOwogIGNvbG9yOnZhcigtLWluayk7Cn0KLmNoaXAgLnJhbmt7IGNvbG9yOnZhcigtLWNjbHIsIHZhcigtLWFtYmVyKSk7IH0KLmNoaXAgLnh7IGNvbG9yOnZhcigtLWluay1kaW0pOyBjdXJzb3I6cG9pbnRlcjsgfQouY2hpcCAueDpob3ZlcnsgY29sb3I6dmFyKC0tcmVkKTsgfQouY2hpcC1hZGR7CiAgYm9yZGVyOjFweCBk",
"YXNoZWQgdmFyKC0tbGluZS1zdHJvbmcpOyBwYWRkaW5nOjdweCAxM3B4OyBmb250LXNpemU6MTJweDsgY29sb3I6dmFyKC0taW5rLWRpbSk7IGN1cnNvcjpwb2ludGVyOwogIGNsaXAtcGF0aDogcG9seWdvbig2cHggMCwxMDAlIDAsMTAwJSAxMDAlLDAgMTAwJSwwIDZweCk7Cn0KLmNoaXAtYWRkOmhvdmVyeyBjb2xvcjp2YXIoLS1jY2xyLCB2YXIoLS1ibHVlKSk7IGJvcmRlci1jb2xvcjp2YXIoLS1jY2xyLCB2YXIoLS1ibHVlKSk7IH0KCi8qIC0tLS0tLS0tLS0tLS0tLS0gUmVzb3VyY2UgcmVhZG91dHMgLS0tLS0tLS0tLS0t",
"LS0tLSAqLwoucmVzb3VyY2VzeyBkaXNwbGF5OmdyaWQ7IGdyaWQtdGVtcGxhdGUtY29sdW1uczpyZXBlYXQoYXV0by1maXQsbWlubWF4KDIwMHB4LDFmcikpOyBnYXA6MTRweDsgbWFyZ2luOjE0cHggMCA4cHg7IH0KLnJlcy1jYXJkewogIGJvcmRlcjoxcHggc29saWQgdmFyKC0tbGluZSk7IGJhY2tncm91bmQ6cmdiYSg4LDE1LDI2LDAuNik7IHBhZGRpbmc6MTRweCAxNnB4OyBwb3NpdGlvbjpyZWxhdGl2ZTsKICBjbGlwLXBhdGg6IHBvbHlnb24oMTBweCAwLDEwMCUgMCwxMDAlIGNhbGMoMTAwJSAtIDEwcHgpLGNhbGMoMTAw",
"JSAtIDEwcHgpIDEwMCUsMCAxMDAlLDAgMTBweCk7Cn0KLnJlcy10b3B7IGRpc3BsYXk6ZmxleDsganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOmJhc2VsaW5lOyBtYXJnaW4tYm90dG9tOjlweDsgfQoucmVzLWxhYmVseyBmb250LXNpemU6MTBweDsgbGV0dGVyLXNwYWNpbmc6LjE2ZW07IHRleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTsgY29sb3I6dmFyKC0taW5rLWRpbSk7IH0KLnJlcy12YWx7IGZvbnQtZmFtaWx5OnZhcigtLWZvbnQtZGlzcGxheSk7IGZvbnQtc2l6ZToyMXB4OyBmb250LXdlaWdo",
"dDo3MDA7IH0KLnJlcy1iYXJ7IGhlaWdodDo2cHg7IGJhY2tncm91bmQ6IzBjMTQyMDsgYm9yZGVyOjFweCBzb2xpZCB2YXIoLS1saW5lKTsgcG9zaXRpb246cmVsYXRpdmU7IG92ZXJmbG93OmhpZGRlbjsgfQoucmVzLWJhciBpeyBkaXNwbGF5OmJsb2NrOyBoZWlnaHQ6MTAwJTsgYm94LXNoYWRvdzowIDAgOHB4IGN1cnJlbnRDb2xvcjsgfQoucmVzLWRlbHRheyBmb250LXNpemU6MTBweDsgbWFyZ2luLXRvcDo2cHg7IGhlaWdodDoxMnB4OyBsZXR0ZXItc3BhY2luZzouMDNlbTsgfQoucmVzLWRlbHRhLnVweyBjb2xvcjp2YXIo",
"LS1ncmVlbik7IH0gLnJlcy1kZWx0YS5kb3dueyBjb2xvcjp2YXIoLS1yZWQpOyB9CgovKiAtLS0tLS0tLS0tLS0tLS0tIExhdyBjYXJkcyAtLS0tLS0tLS0tLS0tLS0tICovCi5sYXctbGlzdHsgZGlzcGxheTpmbGV4OyBmbGV4LWRpcmVjdGlvbjpjb2x1bW47IGdhcDoxMXB4OyB9Ci5sYXctY2FyZHsKICBib3JkZXI6MXB4IHNvbGlkIHZhcigtLWxpbmUpOyBiYWNrZ3JvdW5kOnJnYmEoOCwxNSwyNiwwLjYpOyBwYWRkaW5nOjE1cHggMTdweDsgcG9zaXRpb246cmVsYXRpdmU7CiAgYm9yZGVyLWxlZnQ6M3B4IHNvbGlkIHZhcigt",
"LWNjbHIsIHZhcigtLWJsdWUpKTsKICBjbGlwLXBhdGg6IHBvbHlnb24oMCAwLCAxMDAlIDAsIDEwMCUgY2FsYygxMDAlIC0gMTBweCksIGNhbGMoMTAwJSAtIDEwcHgpIDEwMCUsIDAgMTAwJSk7Cn0KLmxhdy1jYXJkLmZhY3Rpb24tb3JpZ2lueyBib3JkZXItbGVmdC1jb2xvcjp2YXIoLS1wdXJwbGUpOyB9Ci5sYXctdG9weyBkaXNwbGF5OmZsZXg7IGp1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuOyBnYXA6MTBweDsgYWxpZ24taXRlbXM6ZmxleC1zdGFydDsgfQoubGF3LW5hbWV7IGZvbnQtZmFtaWx5OnZhcigtLWZvbnQt",
"ZGlzcGxheSk7IGZvbnQtd2VpZ2h0OjcwMDsgZm9udC1zaXplOjE0LjVweDsgY29sb3I6dmFyKC0taW5rKTsgbWFyZ2luOjA7IGxldHRlci1zcGFjaW5nOi4wMmVtOyB9Ci5sYXctdGFneyBmb250LXNpemU6OXB4OyBsZXR0ZXItc3BhY2luZzouMWVtOyB0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7IGJvcmRlcjoxcHggc29saWQgdmFyKC0tbGluZS1zdHJvbmcpOyBwYWRkaW5nOjNweCA4cHg7IHdoaXRlLXNwYWNlOm5vd3JhcDsgfQoubGF3LXRhZy5zZXZlcml0eS0xeyBjb2xvcjp2YXIoLS1ncmVlbik7IGJvcmRlci1jb2xvcjog",
"Y29sb3ItbWl4KGluIHNyZ2IsIHZhcigtLWdyZWVuKSA0NSUsIHRyYW5zcGFyZW50KTsgfQoubGF3LXRhZy5zZXZlcml0eS0yeyBjb2xvcjojOWZkOThmOyBib3JkZXItY29sb3I6IHJnYmEoMTU5LDIxNywxNDMsMC40KTsgfQoubGF3LXRhZy5zZXZlcml0eS0zeyBjb2xvcjp2YXIoLS1hbWJlcik7IGJvcmRlci1jb2xvcjogcmdiYSgyNTUsMTc5LDY0LDAuNCk7IH0KLmxhdy10YWcuc2V2ZXJpdHktNHsgY29sb3I6I2ZmOGE0YjsgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwxMzgsNzUsMC40KTsgfQoubGF3LXRhZy5zZXZlcml0eS01",
"eyBjb2xvcjp2YXIoLS1yZWQpOyBib3JkZXItY29sb3I6IHJnYmEoMjU1LDU5LDU5LDAuNSk7IH0KLmxhdy10ZXh0eyBmb250LXNpemU6MTJweDsgY29sb3I6dmFyKC0taW5rLWRpbSk7IG1hcmdpbjo5cHggMCAxMXB4OyBsaW5lLWhlaWdodDoxLjU1OyB9Ci5sYXctZWZmZWN0c3sgZGlzcGxheTpmbGV4OyBnYXA6N3B4OyBmbGV4LXdyYXA6d3JhcDsgbWFyZ2luLWJvdHRvbTo5cHg7IH0KLmVmZi1waWxseyBmb250LXNpemU6MTBweDsgcGFkZGluZzozcHggOXB4OyBib3JkZXI6MXB4IHNvbGlkIHZhcigtLWxpbmUtc3Ryb25nKTsg",
"YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpOyBsZXR0ZXItc3BhY2luZzouMDJlbTsgfQouZWZmLXBpbGwucG9zeyBjb2xvcjp2YXIoLS1ncmVlbik7IGJvcmRlci1jb2xvcjogcmdiYSg1NywyNTUsMTU2LDAuMzUpOyB9Ci5lZmYtcGlsbC5uZWd7IGNvbG9yOiNmZjhmODU7IGJvcmRlci1jb2xvcjogcmdiYSgyNTUsNTksNTksMC4zNSk7IH0KLmxhdy1mb290eyBkaXNwbGF5OmZsZXg7IGp1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuOyBhbGlnbi1pdGVtczpjZW50ZXI7IG1hcmdpbi10b3A6NnB4OyBmbGV4LXdy",
"YXA6d3JhcDsgZ2FwOjhweDsgfQoubGF3LW9yaWdpbi1sYWJlbHsgZm9udC1zaXplOjEwcHg7IGNvbG9yOnZhcigtLWluay1kaW1tZXIpOyBmb250LXN0eWxlOml0YWxpYzsgfQoKLyogLS0tLS0tLS0tLS0tLS0tLSBNb2RhbCAtLS0tLS0tLS0tLS0tLS0tICovCi5vdmVybGF5ewogIHBvc2l0aW9uOmZpeGVkOyBpbnNldDowOyBiYWNrZ3JvdW5kOnJnYmEoMSwzLDcsLjgpOyBiYWNrZHJvcC1maWx0ZXI6Ymx1cigzcHgpOwogIGRpc3BsYXk6ZmxleDsgYWxpZ24taXRlbXM6ZmxleC1zdGFydDsganVzdGlmeS1jb250ZW50OmNlbnRl",
"cjsgcGFkZGluZzo2dmggMjBweDsgei1pbmRleDoxMDA7IG92ZXJmbG93LXk6YXV0bzsKfQoubW9kYWx7CiAgYmFja2dyb3VuZDp2YXIoLS1wYW5lbC1zb2xpZCk7IGJvcmRlcjoxcHggc29saWQgdmFyKC0tbGluZS1zdHJvbmcpOyB3aWR0aDoxMDAlOyBtYXgtd2lkdGg6NTgwcHg7CiAgcGFkZGluZzoyOHB4IDMwcHggMjZweDsgcG9zaXRpb246cmVsYXRpdmU7IGJveC1zaGFkb3c6MCAyNHB4IDcwcHggcmdiYSgwLDAsMCwuNiksIDAgMCAzMHB4IHJnYmEoNTksMTY3LDI1NSwwLjA4KTsKICBjbGlwLXBhdGg6IHBvbHlnb24oMTZw",
"eCAwLCAxMDAlIDAsIDEwMCUgY2FsYygxMDAlIC0gMTZweCksIGNhbGMoMTAwJSAtIDE2cHgpIDEwMCUsIDAgMTAwJSwgMCAxNnB4KTsKfQoubW9kYWwgaDN7IGZvbnQtZmFtaWx5OnZhcigtLWZvbnQtZGlzcGxheSk7IGZvbnQtd2VpZ2h0OjgwMDsgZm9udC1zaXplOjIwcHg7IG1hcmdpbjowIDAgNXB4OyBjb2xvcjp2YXIoLS1ibHVlKTsgbGV0dGVyLXNwYWNpbmc6LjAzZW07IHRleHQtc2hhZG93OjAgMCAxMHB4IHZhcigtLWJsdWUtZ2xvdyk7IH0KLm1vZGFsIC5tb2RhbC1zdWJ7IGZvbnQtc2l6ZToxMnB4OyBjb2xvcjp2YXIo",
"LS1pbmstZGltKTsgbWFyZ2luLWJvdHRvbToxOHB4OyBsaW5lLWhlaWdodDoxLjU1OyB9Ci5maWVsZHsgbWFyZ2luLWJvdHRvbToxNXB4OyB9Ci5maWVsZCBsYWJlbHsgZGlzcGxheTpibG9jazsgZm9udC1zaXplOjEwLjVweDsgbGV0dGVyLXNwYWNpbmc6LjEyZW07IHRleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTsgY29sb3I6dmFyKC0taW5rLWRpbSk7IG1hcmdpbi1ib3R0b206N3B4OyB9Ci5maWVsZCBpbnB1dFt0eXBlPXRleHRdLCAuZmllbGQgdGV4dGFyZWEsIC5maWVsZCBzZWxlY3R7CiAgd2lkdGg6MTAwJTsgYmFja2dyb3Vu",
"ZDpyZ2JhKDIsNSwxMCwwLjgpOyBib3JkZXI6MXB4IHNvbGlkIHZhcigtLWxpbmUtc3Ryb25nKTsgY29sb3I6dmFyKC0taW5rKTsgcGFkZGluZzoxMHB4IDEycHg7CiAgZm9udC1mYW1pbHk6dmFyKC0tZm9udC1ib2R5KTsgZm9udC1zaXplOjEzcHg7IHJlc2l6ZTp2ZXJ0aWNhbDsKfQouZmllbGQgaW5wdXRbdHlwZT10ZXh0XTpmb2N1cywgLmZpZWxkIHRleHRhcmVhOmZvY3VzLCAuZmllbGQgc2VsZWN0OmZvY3VzeyBvdXRsaW5lOm5vbmU7IGJvcmRlci1jb2xvcjp2YXIoLS1ibHVlKTsgYm94LXNoYWRvdzowIDAgOHB4IHZhcigt",
"LWJsdWUtZ2xvdyk7IH0KLm1vZGFsLWFjdGlvbnN7IGRpc3BsYXk6ZmxleDsganVzdGlmeS1jb250ZW50OmZsZXgtZW5kOyBnYXA6MTBweDsgbWFyZ2luLXRvcDoyMnB4OyBmbGV4LXdyYXA6d3JhcDsgfQouY2xvc2UteHsgcG9zaXRpb246YWJzb2x1dGU7IHRvcDoxNHB4OyByaWdodDoxNnB4OyBjb2xvcjp2YXIoLS1pbmstZGltKTsgY3Vyc29yOnBvaW50ZXI7IGZvbnQtc2l6ZToxOHB4OyBsaW5lLWhlaWdodDoxOyBwYWRkaW5nOjRweDsgei1pbmRleDoyOyB9Ci5jbG9zZS14OmhvdmVyeyBjb2xvcjp2YXIoLS1yZWQpOyB9Cgou",
"c2V2LXNsaWRlcnsgZGlzcGxheTpmbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IGdhcDoxMnB4OyB9CmlucHV0W3R5cGU9cmFuZ2VdeyAtd2Via2l0LWFwcGVhcmFuY2U6bm9uZTsgZmxleDoxOyBoZWlnaHQ6NHB4OyBiYWNrZ3JvdW5kOiMxNTIwMzA7IH0KaW5wdXRbdHlwZT1yYW5nZV06Oi13ZWJraXQtc2xpZGVyLXRodW1ieyAtd2Via2l0LWFwcGVhcmFuY2U6bm9uZTsgd2lkdGg6MTVweDsgaGVpZ2h0OjE1cHg7IGJvcmRlci1yYWRpdXM6NTAlOyBiYWNrZ3JvdW5kOnZhcigtLWJsdWUpOyBib3gtc2hhZG93OjAgMCA4cHggdmFy",
"KC0tYmx1ZS1nbG93KTsgY3Vyc29yOnBvaW50ZXI7IG1hcmdpbi10b3A6LTUuNXB4OyB9Ci5zZXYtbGFiZWx7IGZvbnQtc2l6ZToxMXB4OyBjb2xvcjp2YXIoLS1hbWJlcik7IHdpZHRoOjEwMHB4OyB0ZXh0LWFsaWduOnJpZ2h0OyB9CgoucHJldmlldy1ib3h7IGJvcmRlcjoxcHggc29saWQgdmFyKC0tbGluZSk7IHBhZGRpbmc6MTNweDsgbWFyZ2luLXRvcDo2cHg7IGJhY2tncm91bmQ6cmdiYSgyLDUsMTAsMC42KTsgbWluLWhlaWdodDo0MnB4OyB9Ci5wcmV2aWV3LWJveCAuaGludHsgZm9udC1zaXplOjExcHg7IGNvbG9yOnZh",
"cigtLWluay1kaW1tZXIpOyBmb250LXN0eWxlOml0YWxpYzsgfQoKLnByZXNldC1ncmlkeyBkaXNwbGF5OmZsZXg7IGZsZXgtd3JhcDp3cmFwOyBnYXA6NnB4OyBtYXJnaW4tdG9wOjZweDsgbWF4LWhlaWdodDoxMzBweDsgb3ZlcmZsb3cteTphdXRvOyBwYWRkaW5nLXJpZ2h0OjRweDt9Ci5wcmVzZXQtY2hpcHsgZm9udC1zaXplOjEwLjVweDsgcGFkZGluZzo1cHggMTBweDsgYm9yZGVyOjFweCBzb2xpZCB2YXIoLS1saW5lLXN0cm9uZyk7IGN1cnNvcjpwb2ludGVyOyBjb2xvcjp2YXIoLS1pbmstZGltKTsgfQoucHJlc2V0LWNo",
"aXA6aG92ZXJ7IGJvcmRlci1jb2xvcjp2YXIoLS1hbWJlcik7IGNvbG9yOnZhcigtLWFtYmVyKTsgfQoKLmNoZWNrbGlzdHsgYm9yZGVyOjFweCBzb2xpZCB2YXIoLS1saW5lLXN0cm9uZyk7IG1heC1oZWlnaHQ6MjUwcHg7IG92ZXJmbG93LXk6YXV0bzsgfQouY2hlY2tsaXN0LXJvd3sgZGlzcGxheTpmbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IGdhcDoxMHB4OyBwYWRkaW5nOjEwcHggMTNweDsgZm9udC1zaXplOjEyLjVweDsgYm9yZGVyLWJvdHRvbToxcHggc29saWQgdmFyKC0tbGluZSk7IGN1cnNvcjpwb2ludGVyOyB9Ci5j",
"aGVja2xpc3Qtcm93Omxhc3QtY2hpbGR7IGJvcmRlci1ib3R0b206bm9uZTsgfQouY2hlY2tsaXN0LXJvdzpob3ZlcnsgYmFja2dyb3VuZDpyZ2JhKDU5LDE2NywyNTUsMC4wNik7IH0KLmNoZWNrbGlzdC1yb3cgaW5wdXR7IGFjY2VudC1jb2xvcjp2YXIoLS1ibHVlKTsgfQouY2hlY2tsaXN0LXJvdyAuY2hrLXN1YnsgY29sb3I6dmFyKC0taW5rLWRpbW1lcik7IGZvbnQtc2l6ZToxMC41cHg7IG1hcmdpbi1sZWZ0OmF1dG87IH0KCi5yYWRpby1ncm91cHsgZGlzcGxheTpmbGV4OyBnYXA6MTZweDsgZmxleC13cmFwOndyYXA7IG1h",
"cmdpbi10b3A6NXB4OyB9Ci5yYWRpby1ncm91cCBsYWJlbHsgZGlzcGxheTpmbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IGdhcDo3cHg7IGZvbnQtc2l6ZToxMnB4OyBjb2xvcjp2YXIoLS1pbmspOyBjdXJzb3I6cG9pbnRlcjsgdGV4dC10cmFuc2Zvcm06bm9uZTsgbGV0dGVyLXNwYWNpbmc6MDsgfQoucmFkaW8tZ3JvdXAgaW5wdXR7IGFjY2VudC1jb2xvcjp2YXIoLS1ibHVlKTsgfQoKLnRhcmdldC10b2dnbGV7IGRpc3BsYXk6ZmxleDsgYm9yZGVyOjFweCBzb2xpZCB2YXIoLS1saW5lLXN0cm9uZyk7IG92ZXJmbG93OmhpZGRl",
"bjsgfQoudGFyZ2V0LXRvZ2dsZSAucG9sLW9wdHsKICBmbGV4OjE7IHRleHQtYWxpZ246Y2VudGVyOyBwYWRkaW5nOjExcHggMTBweDsgZm9udC1zaXplOjEycHg7IGN1cnNvcjpwb2ludGVyOyBjb2xvcjp2YXIoLS1pbmstZGltKTsKICBsZXR0ZXItc3BhY2luZzouMDNlbTsgdHJhbnNpdGlvbjouMTVzIGFsbDsgYm9yZGVyLXJpZ2h0OjFweCBzb2xpZCB2YXIoLS1saW5lKTsKfQoudGFyZ2V0LXRvZ2dsZSAucG9sLW9wdDpsYXN0LWNoaWxkeyBib3JkZXItcmlnaHQ6bm9uZTsgfQoudGFyZ2V0LXRvZ2dsZSAucG9sLW9wdDpob3Zl",
"cnsgYmFja2dyb3VuZDpyZ2JhKDU5LDE2NywyNTUsMC4wNik7IGNvbG9yOnZhcigtLWluayk7IH0KLnRhcmdldC10b2dnbGUgLnBvbC1vcHQuYWN0aXZleyBiYWNrZ3JvdW5kOnJnYmEoMjU1LDE3OSw2NCwwLjEyKTsgY29sb3I6dmFyKC0tYW1iZXIpOyBmb250LXdlaWdodDo2MDA7IH0KCi8qIC0tLS0gc2VsZXRvciBkZSBsZWlzIChicm93c2VyKSAtLS0tICovCi5tb2RhbC13aWRleyBtYXgtd2lkdGg6OTIwcHg7IH0KLmxhdy1icm93c2VyeyBkaXNwbGF5OmdyaWQ7IGdyaWQtdGVtcGxhdGUtY29sdW1uczoyMjBweCAxZnI7IGdh",
"cDoxOHB4OyBib3JkZXI6MXB4IHNvbGlkIHZhcigtLWxpbmUpOyBiYWNrZ3JvdW5kOnJnYmEoMiw1LDEwLDAuNCk7IHBhZGRpbmc6MTZweDsgfQpAbWVkaWEgKG1heC13aWR0aDo3NjBweCl7IC5sYXctYnJvd3NlcnsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmcjsgfSB9Ci5sYXctYnJvd3Nlci1zaWRleyBib3JkZXItcmlnaHQ6MXB4IHNvbGlkIHZhcigtLWxpbmUpOyBwYWRkaW5nLXJpZ2h0OjE2cHg7IH0KQG1lZGlhIChtYXgtd2lkdGg6NzYwcHgpeyAubGF3LWJyb3dzZXItc2lkZXsgYm9yZGVyLXJpZ2h0Om5vbmU7IGJvcmRl",
"ci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWxpbmUpOyBwYWRkaW5nLXJpZ2h0OjA7IHBhZGRpbmctYm90dG9tOjE0cHg7IG1hcmdpbi1ib3R0b206MTBweDsgfSB9Ci5zaWRlLWJsb2NrLWxhYmVseyBmb250LXNpemU6MTBweDsgbGV0dGVyLXNwYWNpbmc6LjE0ZW07IHRleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTsgY29sb3I6dmFyKC0taW5rLWRpbW1lcik7IG1hcmdpbi1ib3R0b206NnB4OyB9Ci5icm93c2VyLWNhdHMsIC5icm93c2VyLXR5cGVzeyBkaXNwbGF5OmZsZXg7IGZsZXgtZGlyZWN0aW9uOmNvbHVtbjsgZ2FwOjJweDsg",
"bWFyZ2luLWJvdHRvbTo0cHg7IH0KLmNhdC1yb3d7CiAgZGlzcGxheTpmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjsgYWxpZ24taXRlbXM6Y2VudGVyOyBnYXA6OHB4OyBwYWRkaW5nOjdweCA5cHg7IGZvbnQtc2l6ZToxMS41cHg7CiAgY29sb3I6dmFyKC0taW5rLWRpbSk7IGN1cnNvcjpwb2ludGVyOyBib3JkZXItbGVmdDoycHggc29saWQgdHJhbnNwYXJlbnQ7Cn0KLmNhdC1yb3c6aG92ZXJ7IGJhY2tncm91bmQ6cmdiYSg1OSwxNjcsMjU1LDAuMDYpOyBjb2xvcjp2YXIoLS1pbmspOyB9Ci5jYXQtcm93LmFj",
"dGl2ZXsgYmFja2dyb3VuZDpyZ2JhKDU5LDE2NywyNTUsMC4xKTsgY29sb3I6dmFyKC0tYmx1ZSk7IGJvcmRlci1sZWZ0LWNvbG9yOnZhcigtLWJsdWUpOyBmb250LXdlaWdodDo2MDA7IH0KLmNhdC1yb3cgLmNhdC1jb3VudHsgZm9udC1zaXplOjkuNXB4OyBjb2xvcjp2YXIoLS1pbmstZGltbWVyKTsgfQouY2F0LXJvdy5hY3RpdmUgLmNhdC1jb3VudHsgY29sb3I6dmFyKC0tYmx1ZSk7IH0KLnR5cGUtcm93LmFjdGl2ZXsgY29sb3I6dmFyKC0tYW1iZXIpOyBib3JkZXItbGVmdC1jb2xvcjp2YXIoLS1hbWJlcik7IGJhY2tncm91",
"bmQ6cmdiYSgyNTUsMTc5LDY0LDAuMSk7IH0KLnNpZGUtbGVnZW5keyBtYXJnaW4tdG9wOjE2cHg7IHBhZGRpbmctdG9wOjEycHg7IGJvcmRlci10b3A6MXB4IHNvbGlkIHZhcigtLWxpbmUpOyBkaXNwbGF5OmZsZXg7IGZsZXgtZGlyZWN0aW9uOmNvbHVtbjsgZ2FwOjhweDsgfQouc2lkZS1sZWdlbmQgZGl2eyBmb250LXNpemU6MTBweDsgY29sb3I6dmFyKC0taW5rLWRpbW1lcik7IGxpbmUtaGVpZ2h0OjEuNTsgfQouc2lkZS1sZWdlbmQgLmxlZy1kb3R7IG1hcmdpbi1yaWdodDoycHg7IH0KLmJyb3dzZXItY291bnR7IGZvbnQt",
"c2l6ZToxMC41cHg7IGNvbG9yOnZhcigtLWluay1kaW1tZXIpOyBtYXJnaW4tYm90dG9tOjEwcHg7IGxldHRlci1zcGFjaW5nOi4wNWVtOyB9Ci5wcmVzZXQtZ3JpZC12MnsKICBkaXNwbGF5OmdyaWQ7IGdyaWQtdGVtcGxhdGUtY29sdW1uczpyZXBlYXQoYXV0by1maWxsLCBtaW5tYXgoMTUwcHgsMWZyKSk7IGdhcDo4cHg7CiAgbWF4LWhlaWdodDoyODBweDsgb3ZlcmZsb3cteTphdXRvOyBwYWRkaW5nLXJpZ2h0OjRweDsgYWxpZ24tY29udGVudDpzdGFydDsKfQoucHJlc2V0LWNhcmR7CiAgYm9yZGVyOjFweCBzb2xpZCB2YXIo",
"LS1saW5lLXN0cm9uZyk7IHBhZGRpbmc6MTBweCAxMXB4OyBjdXJzb3I6cG9pbnRlcjsgYmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LDAuMDE1KTsKICB0cmFuc2l0aW9uOi4xMnMgYWxsOwp9Ci5wcmVzZXQtY2FyZDpob3ZlcnsgYm9yZGVyLWNvbG9yOnZhcigtLWJsdWUpOyBiYWNrZ3JvdW5kOnJnYmEoNTksMTY3LDI1NSwwLjA1KTsgfQoucHJlc2V0LWNhcmQuc2VsZWN0ZWR7IGJvcmRlci1jb2xvcjp2YXIoLS1hbWJlcik7IGJhY2tncm91bmQ6cmdiYSgyNTUsMTc5LDY0LDAuMDkpOyBib3gtc2hhZG93OjAgMCAwIDFweCB2",
"YXIoLS1hbWJlcikgaW5zZXQ7IH0KLnByZXNldC1jYXJkLXRvcHsgZGlzcGxheTpmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjsgYWxpZ24taXRlbXM6Y2VudGVyOyBtYXJnaW4tYm90dG9tOjVweDsgfQoucHJlc2V0LWNhcmQtaWNvbnsgZm9udC1zaXplOjEycHg7IH0KLnByZXNldC1jYXJkLWNhdHsgZm9udC1zaXplOjguNXB4OyBsZXR0ZXItc3BhY2luZzouMDZlbTsgdGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlOyBjb2xvcjp2YXIoLS1pbmstZGltbWVyKTsgfQoucHJlc2V0LWNhcmQtbmFtZXsgZm9udC1zaXpl",
"OjExLjVweDsgY29sb3I6dmFyKC0taW5rKTsgbGluZS1oZWlnaHQ6MS4zNTsgfQoucHJlc2V0LWNhcmQuc2VsZWN0ZWQgLnByZXNldC1jYXJkLW5hbWV7IGNvbG9yOnZhcigtLWFtYmVyKTsgfQoKLmNvbG9yLXBpY2t7IGRpc3BsYXk6ZmxleDsgZ2FwOjEycHg7IG1hcmdpbi10b3A6NHB4OyB9Ci5jb2xvci1waWNrIC5jZG90eyB3aWR0aDozNnB4OyBoZWlnaHQ6MzZweDsgYm9yZGVyLXJhZGl1czo1MCU7IGN1cnNvcjpwb2ludGVyOyBib3JkZXI6MnB4IHNvbGlkIHRyYW5zcGFyZW50OyBwb3NpdGlvbjpyZWxhdGl2ZTsgfQouY29s",
"b3ItcGljayAuY2RvdC5zZWx7IGJvcmRlci1jb2xvcjojZmZmOyB9Ci5jb2xvci1waWNrIC5jZG90LmMtYmx1ZXsgYmFja2dyb3VuZDpyYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDM1JSAzMCUsICM3ZmM4ZmYsIHZhcigtLWJsdWUtZGltKSk7IGJveC1zaGFkb3c6MCAwIDEycHggdmFyKC0tYmx1ZS1nbG93KTsgfQouY29sb3ItcGljayAuY2RvdC5jLXJlZHsgYmFja2dyb3VuZDpyYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDM1JSAzMCUsICNmZjlhOWEsIHZhcigtLXJlZC1kaW0pKTsgYm94LXNoYWRvdzowIDAgMTJweCB2YXIo",
"LS1yZWQtZ2xvdyk7IH0KLmNvbG9yLXBpY2sgLmNkb3QuYy1ncmVlbnsgYmFja2dyb3VuZDpyYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDM1JSAzMCUsICM5ZGZmY2YsIHZhcigtLWdyZWVuLWRpbSkpOyBib3gtc2hhZG93OjAgMCAxMnB4IHZhcigtLWdyZWVuLWdsb3cpOyB9Ci5jb2xvci1waWNrIC5jbGFiZWx7IGZvbnQtc2l6ZTo5cHg7IHRleHQtYWxpZ246Y2VudGVyOyBtYXJnaW4tdG9wOjVweDsgY29sb3I6dmFyKC0taW5rLWRpbSk7IGxldHRlci1zcGFjaW5nOi4wNWVtOyB9Cgouc2xvdC1saXN0eyBkaXNwbGF5OmZsZXg7",
"IGZsZXgtZGlyZWN0aW9uOmNvbHVtbjsgZ2FwOjhweDsgbWF4LWhlaWdodDoyODBweDsgb3ZlcmZsb3cteTphdXRvOyB9Ci5zbG90LXJvd3sgYm9yZGVyOjFweCBzb2xpZCB2YXIoLS1saW5lLXN0cm9uZyk7IHBhZGRpbmc6MTFweCAxM3B4OyBkaXNwbGF5OmZsZXg7IGFsaWduLWl0ZW1zOmNlbnRlcjsganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47IGdhcDoxMHB4OyBmbGV4LXdyYXA6d3JhcDsgfQouc2xvdC1yb3cgLnNpbmZveyBkaXNwbGF5OmZsZXg7IGZsZXgtZGlyZWN0aW9uOmNvbHVtbjsgZ2FwOjJweDsgfQouc2xv",
"dC1yb3cgLnNuYW1leyBmb250LWZhbWlseTp2YXIoLS1mb250LWRpc3BsYXkpOyBmb250LXNpemU6MTNweDsgY29sb3I6dmFyKC0taW5rKTsgfQouc2xvdC1yb3cgLnNtZXRheyBmb250LXNpemU6MTBweDsgY29sb3I6dmFyKC0taW5rLWRpbSk7IH0KLnNsb3Qtcm93IC5zYWN0aW9uc3sgZGlzcGxheTpmbGV4OyBnYXA6NnB4OyB9CgoudG9hc3R7CiAgcG9zaXRpb246Zml4ZWQ7IGJvdHRvbToyNHB4OyByaWdodDoyNHB4OyBiYWNrZ3JvdW5kOnZhcigtLXBhbmVsLXNvbGlkKTsgYm9yZGVyOjFweCBzb2xpZCB2YXIoLS1ibHVlKTsg",
"Y29sb3I6dmFyKC0tYmx1ZSk7CiAgcGFkZGluZzoxMXB4IDE4cHg7IGZvbnQtc2l6ZToxMnB4OyB6LWluZGV4OjIwMDsgYm94LXNoYWRvdzowIDhweCAyOHB4IHJnYmEoMCwwLDAsLjUpLCAwIDAgMTZweCB2YXIoLS1ibHVlLWdsb3cpOwogIG9wYWNpdHk6MDsgdHJhbnNmb3JtOnRyYW5zbGF0ZVkoOHB4KSB0cmFuc2xhdGVYKDApOyB0cmFuc2l0aW9uOi4yNXM7IHBvaW50ZXItZXZlbnRzOm5vbmU7IGxldHRlci1zcGFjaW5nOi4wM2VtOwogIGNsaXAtcGF0aDogcG9seWdvbigxMHB4IDAsMTAwJSAwLDEwMCUgMTAwJSwwIDEwMCUs",
"MCAxMHB4KTsKfQoudG9hc3Quc2hvd3sgb3BhY2l0eToxOyB0cmFuc2Zvcm06dHJhbnNsYXRlWSgwKTsgfQoKLnBsYWNlaG9sZGVyeyBoZWlnaHQ6NjB2aDsgZGlzcGxheTpmbGV4OyBhbGlnbi1pdGVtczpjZW50ZXI7IGp1c3RpZnktY29udGVudDpjZW50ZXI7IGZsZXgtZGlyZWN0aW9uOmNvbHVtbjsgZ2FwOjE0cHg7IGNvbG9yOnZhcigtLWluay1kaW0pOyB0ZXh0LWFsaWduOmNlbnRlcjsgfQoucGxhY2Vob2xkZXIgLmdseXBoeyBmb250LXNpemU6NTJweDsgY29sb3I6dmFyKC0tYmx1ZSk7IG9wYWNpdHk6LjU7IHRleHQtc2hh",
"ZG93OjAgMCAyMHB4IHZhcigtLWJsdWUtZ2xvdyk7IH0KLnBsYWNlaG9sZGVyIHB7IG1heC13aWR0aDo0NDBweDsgZm9udC1zaXplOjEyLjVweDsgbGluZS1oZWlnaHQ6MS43OyBsZXR0ZXItc3BhY2luZzouMDJlbTsgfQo8L3N0eWxlPgo8L2hlYWQ+Cjxib2R5Pgo8ZGl2IGNsYXNzPSJzdGFyZmllbGQiPjwvZGl2PgoKPGhlYWRlcj4KICA8ZGl2IGNsYXNzPSJicmFuZCI+CiAgICA8ZGl2IGNsYXNzPSJlbWJsZW0iPkhOPC9kaXY+CiAgICA8ZGl2PgogICAgICA8aDE+SE9MT05FVCBSRUdJU1RSWTwvaDE+CiAgICAgIDxkaXYgY2xh",
"c3M9InN1YiI+TGVnaXNsYcOnw6NvIFNldG9yaWFsICZtaWRkb3Q7IFRlcm1pbmFsIGRlIENvbWFuZG88L2Rpdj4KICAgIDwvZGl2PgogIDwvZGl2PgogIDxkaXYgY2xhc3M9ImhlYWRlckFjdGlvbnMiPgogICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biIgaWQ9ImJ0bk5ld0ZhY3Rpb24iIHR5cGU9ImJ1dHRvbiI+KyBGYWPDp8OjbzwvYnV0dG9uPgogICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biIgaWQ9ImJ0bk5ld1BsYW5ldEdsb2JhbCIgdHlwZT0iYnV0dG9uIj4rIFBsYW5ldGE8L2J1dHRvbj4KICAgIDxidXR0b24gY2xhc3M9ImhidG4g",
"b24tZ3JlZW4iIGlkPSJidG5TYXZlIiB0eXBlPSJidXR0b24iPuKHqSBTYWx2YXI8L2J1dHRvbj4KICAgIDxidXR0b24gY2xhc3M9ImhidG4gb24tYmx1ZSIgaWQ9ImJ0bkxvYWQiIHR5cGU9ImJ1dHRvbiI+4oenIENhcnJlZ2FyPC9idXR0b24+CiAgICA8YnV0dG9uIGNsYXNzPSJoYnRuIGRhbmdlciIgaWQ9ImJ0blJlc2V0IiB0eXBlPSJidXR0b24iPuKclSBMaW1wYXI8L2J1dHRvbj4KICA8L2Rpdj4KPC9oZWFkZXI+Cgo8ZGl2IGlkPSJzdWJuYXYiPjwvZGl2Pgo8bWFpbiBjbGFzcz0ic3RhZ2UiIGlkPSJzdGFnZSI+PC9tYWlu",
"PgoKPGRpdiBpZD0idG9hc3QiIGNsYXNzPSJ0b2FzdCI+PC9kaXY+Cgo8c2NyaXB0PgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgRVNUQURPCj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwpjb25zdCBBVVRPU0FWRV9LRVkgPSAnaG9sb25ldF9hdXRvc2F2ZV92Myc7CmNvbnN0IFNMT1RTX0tFWSA9ICdob2xvbmV0X3Nsb3RzX3YzJzsKCmZ1bmN0aW9uIGVtcHR5U3RhdGUoKXsgcmV0dXJu",
"IHsgZmFjdGlvbnM6IFtdLCBwbGFuZXRzOiBbXSwgdmlldzoge3NjcmVlbjonaG9tZSd9IH07IH0KCmZ1bmN0aW9uIGxvYWRBdXRvc2F2ZSgpewogIHRyeXsKICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEFVVE9TQVZFX0tFWSk7CiAgICBpZihyYXcpewogICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJhdyk7CiAgICAgIGlmKHBhcnNlZCAmJiBBcnJheS5pc0FycmF5KHBhcnNlZC5mYWN0aW9ucykgJiYgQXJyYXkuaXNBcnJheShwYXJzZWQucGxhbmV0cykpIHJldHVybiBwYXJzZWQ7CiAgICB9CiAg",
"fWNhdGNoKGUpe30KICByZXR1cm4gbnVsbDsKfQpmdW5jdGlvbiBwZXJzaXN0QXV0b3NhdmUoKXsgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQVVUT1NBVkVfS0VZLCBKU09OLnN0cmluZ2lmeShzdGF0ZSkpOyBwdWJsaWNhck5vSHViKCk7IH0KCi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkCBJTlRFR1JBw4fDg08g4oCUIHNpbmNyb25pemHDp8OjbyBjb20gbyBHYWxhY3RpYyBMZWRnZXIgKHF1YW5kbyBhYmVydG8gZGVudHJvIGRlbGUpIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAovLyBQdWJsaWNhIGZhY8On",
"w7Vlcy9wbGFuZXRhcy9sZWlzIHBhcmEgbyBMZWRnZXIgKGphbmVsYSBwYWkpLiBTw7MgZW52aWEgc2UKLy8gZXN0YSBww6FnaW5hIGVzdGl2ZXIgREVOVFJPIGRlIHVtIGlmcmFtZSAod2luZG93LnBhcmVudCAhPT0gd2luZG93KS4KZnVuY3Rpb24gcHVibGljYXJOb0h1YigpewogIGlmKHdpbmRvdy5wYXJlbnQgPT09IHdpbmRvdykgcmV0dXJuOwogIHRyeXsKICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoewogICAgICB0eXBlOidycGctc3luYycsIHNvdXJjZTonaG9sb25ldCcsCiAgICAgIHBheWxvYWQ6ewogICAgICAg",
"IGZhY3Rpb25zOiBzdGF0ZS5mYWN0aW9ucy5tYXAoZj0+KHsgaWQ6Zi5pZCwgbmFtZTpmLm5hbWUsIGNvbG9yOicjM2JhN2ZmJywgY3JlZGl0czowLCBmYWNjcmVkczowIH0pKSwKICAgICAgICBwbGFuZXRzOiAgc3RhdGUucGxhbmV0cy5tYXAocD0+KHsgaWQ6cC5pZCwgbmFtZTpwLm5hbWUsIGZhY3Rpb25JZDpwLmZhY3Rpb25JZHx8bnVsbCwgY3JlZGl0czowIH0pKSwKICAgICAgICBsYXdzOiBzdGF0ZS5mYWN0aW9ucy5mbGF0TWFwKGY9PihmLmxhd3N8fFtdKS5tYXAobD0+KHtpZDpsLmlkLCBvd25lclR5cGU6J2ZhY3Rpb24n",
"LCBvd25lcklkOmYuaWQsIG5hbWU6bC5uYW1lLCB0ZXh0OmwudGV4dCwgc2V2ZXJpdHk6bC5zZXZlcml0eX0pKSkKICAgICAgICAgIC5jb25jYXQoc3RhdGUucGxhbmV0cy5mbGF0TWFwKHA9PihwLmxhd3N8fFtdKS5tYXAobD0+KHtpZDpsLmlkLCBvd25lclR5cGU6J3BsYW5ldCcsIG93bmVySWQ6cC5pZCwgbmFtZTpsLm5hbWUsIHRleHQ6bC50ZXh0LCBzZXZlcml0eTpsLnNldmVyaXR5fSkpKSksCiAgICAgIH0KICAgIH0sICcqJyk7CiAgfWNhdGNoKGUpe30KfQovLyBSZWNlYmUgZG8gTGVkZ2VyIGZhY8Onw7Vlcy9wbGFuZXRh",
"cyBjcmlhZG9zIG91IGVkaXRhZG9zIGVtIG91dHJhIGFiYSAoUGFpbmVsLAovLyBNYWNybywgTWVzdHJlIGV0YykuIFPDsyByZS1yZW5kZXJpemEg4oCUIE7Dg08gY2hhbWEgcGVyc2lzdEF1dG9zYXZlIGFxdWksIHByYQovLyBuw6NvIHJlZW52aWFyIGRlIHZvbHRhIGUgY3JpYXIgdW0gbG9vcCBpbmZpbml0byBkZSBtZW5zYWdlbnMuCndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGUpPT57CiAgY29uc3QgbXNnID0gZS5kYXRhOyBpZighbXNnIHx8IG1zZy50eXBlIT09J3JwZy1zeW5jLWFwcGx5JykgcmV0dXJu",
"OwogIGNvbnN0IGRhZG9zID0gbXNnLnBheWxvYWQgfHwge307CiAgbGV0IG11ZG91ID0gZmFsc2U7CiAgKGRhZG9zLmZhY3Rpb25zfHxbXSkuZm9yRWFjaChiZj0+ewogICAgbGV0IGYgPSBzdGF0ZS5mYWN0aW9ucy5maW5kKHg9PnguaWQ9PT1iZi5pZCk7CiAgICBpZighZil7IGY9e2lkOmJmLmlkLG5hbWU6YmYubmFtZSxhbGxlZ2lhbmNlOidibHVlJyxsZWFkZXJzOltdLGxhd3M6W119OyBzdGF0ZS5mYWN0aW9ucy5wdXNoKGYpOyBtdWRvdT10cnVlOyB9CiAgICBlbHNlIGlmKGYubmFtZSE9PWJmLm5hbWUpeyBmLm5hbWUgPSBi",
"Zi5uYW1lOyBtdWRvdT10cnVlOyB9CiAgfSk7CiAgKGRhZG9zLnBsYW5ldHN8fFtdKS5mb3JFYWNoKGJwPT57CiAgICBsZXQgcCA9IHN0YXRlLnBsYW5ldHMuZmluZCh4PT54LmlkPT09YnAuaWQpOwogICAgaWYoIXApeyBwPXtpZDpicC5pZCxuYW1lOmJwLm5hbWUsZmFjdGlvbklkOmJwLmZhY3Rpb25JZHx8bnVsbCxydWxlcnM6W10sYmFzZVJlc291cmNlczpuZXdQbGFuZXRSZXNvdXJjZXMoKSxsYXdzOltdLG5ld3M6W119OyBzdGF0ZS5wbGFuZXRzLnB1c2gocCk7IG11ZG91PXRydWU7IH0KICAgIGVsc2V7CiAgICAgIGlmKHAu",
"bmFtZSE9PWJwLm5hbWUpeyBwLm5hbWU9YnAubmFtZTsgbXVkb3U9dHJ1ZTsgfQogICAgICBpZigoYnAuZmFjdGlvbklkfHxudWxsKSE9PShwLmZhY3Rpb25JZHx8bnVsbCkpeyBwLmZhY3Rpb25JZCA9IGJwLmZhY3Rpb25JZHx8bnVsbDsgbXVkb3U9dHJ1ZTsgfQogICAgfQogIH0pOwogIGlmKG11ZG91KXsgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQVVUT1NBVkVfS0VZLCBKU09OLnN0cmluZ2lmeShzdGF0ZSkpOyByZW5kZXIoKTsgfQp9KTsKLy8gQW8gY2FycmVnYXIgZGVudHJvIGRvIExlZGdlciwgYXZpc2EgbyBxdWUgasOhIGV4",
"aXN0ZSBsb2NhbG1lbnRlIChzZSBvCi8vIExlZGdlciBqw6EgdGl2ZXIgZGFkb3MgZGUgb3V0cmEgZm9udGUsIGVsZSBmdW5kZSBlIG1hbmRhIGRlIHZvbHRhKS4Kc2V0VGltZW91dChwdWJsaWNhck5vSHViLCA2MDApOwoKZnVuY3Rpb24gbG9hZFNsb3RzKCl7CiAgdHJ5ewogICAgY29uc3QgcmF3ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU0xPVFNfS0VZKTsKICAgIGlmKHJhdykgcmV0dXJuIEpTT04ucGFyc2UocmF3KTsKICB9Y2F0Y2goZSl7fQogIHJldHVybiBbXTsKfQpmdW5jdGlvbiBwZXJzaXN0U2xvdHMoc2xvdHMpeyBs",
"b2NhbFN0b3JhZ2Uuc2V0SXRlbShTTE9UU19LRVksIEpTT04uc3RyaW5naWZ5KHNsb3RzKSk7IH0KCmxldCBzdGF0ZSA9IGxvYWRBdXRvc2F2ZSgpIHx8IGVtcHR5U3RhdGUoKTsKaWYoIXN0YXRlLnZpZXcpIHN0YXRlLnZpZXcgPSB7c2NyZWVuOidob21lJ307CgpmdW5jdGlvbiB1aWQocHJlZml4KXsgcmV0dXJuIHByZWZpeCArICdfJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsOSk7IH0KZnVuY3Rpb24gZXNjYXBlSHRtbChzKXsKICByZXR1cm4gKHN8fCcnKS5yZXBsYWNlKC9bJjw+IiddL2csIGM9Pih7",
"JyYnOicmYW1wOycsJzwnOicmbHQ7JywnPic6JyZndDsnLCciJzonJnF1b3Q7JywiJyI6JyYjMzk7J31bY10pKTsKfQpmdW5jdGlvbiBmbXREYXRlKHRzKXsKICBjb25zdCBkID0gbmV3IERhdGUodHMpOwogIHJldHVybiBkLnRvTG9jYWxlRGF0ZVN0cmluZygncHQtQlInKSArICcgJyArIGQudG9Mb2NhbGVUaW1lU3RyaW5nKCdwdC1CUicse2hvdXI6JzItZGlnaXQnLG1pbnV0ZTonMi1kaWdpdCd9KTsKfQoKLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIEFM",
"TEVHSUFOQ0UgLyBDT1JFUyBERSBGQUPDh8ODTwo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KY29uc3QgQUxMRUdJQU5DRVMgPSB7CiAgYmx1ZTogIHsgbmFtZTonT3JkZW0gQXp1bCcsICB2YXI6Jy0tYmx1ZScsICBnbG93VmFyOictLWJsdWUtZ2xvdycgfSwKICByZWQ6ICAgeyBuYW1lOidEb23DrW5pbyBWZXJtZWxobycsIHZhcjonLS1yZWQnLCBnbG93VmFyOictLXJlZC1nbG93JyB9LAogIGdyZWVuOiB7IG5hbWU6J0FsaWFuw6dhIFZlcmRlJywgdmFyOict",
"LWdyZWVuJywgZ2xvd1ZhcjonLS1ncmVlbi1nbG93JyB9LAp9OwpmdW5jdGlvbiBmYWN0aW9uQ29sb3JTdHlsZShmKXsKICBjb25zdCBhID0gQUxMRUdJQU5DRVNbZi5hbGxlZ2lhbmNlXSB8fCBBTExFR0lBTkNFUy5ibHVlOwogIHJldHVybiBgLS1jY2xyOnZhcigke2EudmFyfSk7IC0tY2Nsci1nbG93OnZhcigke2EuZ2xvd1Zhcn0pO2A7Cn0KCi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICBSRUNVUlNPUwo9PT09PT09PT09PT09PT09PT09PT09PT09PT09",
"PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KY29uc3QgUkVTX01FVEEgPSBbCiAgWydwb3B1bGFjYW8nLCAgICdQb3B1bGHDp8OjbycsICAgICcjM2JhN2ZmJ10sCiAgWydmZWxpY2lkYWRlJywgICdGZWxpY2lkYWRlJywgICAnIzM5ZmY5YyddLAogIFsnc2VndXJhbmNhJywgICAnU2VndXJhbsOnYScsICAgICcjZmYzYjNiJ10sCiAgWydjdWx0dXJhJywgICAgICdDdWx0dXJhJywgICAgICAnI2I5OGJmZiddLAogIFsnZWNvbm9taWEnLCAgICAnRWNvbm9taWEnLCAgICAgJyNmZmIzNDAnXSwKICBbJ2xpYmVyZGFk",
"ZScsICAgJ0xpYmVyZGFkZScsICAgICcjMzlkNmZmJ10sCiAgWydlc3RhYmlsaWRhZGUnLCdFc3RhYmlsaWRhZGUnLCAnI2ZmOWE0YiddLAogIFsndGVjbm9sb2dpYScsICAnVGVjbm9sb2dpYScsICAgJyM2ZmM4ZmYnXSwKICBbJ2NvcnJ1cGNhbycsICAgJ0NvcnJ1cMOnw6NvJywgICAgJyNlMDdhYzknXSwKXTsKY29uc3QgUkVTX0tFWVMgPSBSRVNfTUVUQS5tYXAocj0+clswXSk7CmZ1bmN0aW9uIG5ld1BsYW5ldFJlc291cmNlcygpeyBjb25zdCBvPXt9OyBSRVNfS0VZUy5mb3JFYWNoKGs9Pm9ba109NTApOyByZXR1cm4gbzsg",
"fQpmdW5jdGlvbiBlbXB0eVRvdGFscygpeyBjb25zdCBvPXt9OyBSRVNfS0VZUy5mb3JFYWNoKGs9Pm9ba109MCk7IHJldHVybiBvOyB9CmZ1bmN0aW9uIGNsYW1wKHYpeyByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCB2KSk7IH0KCi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICBNT1RPUiBERSBBTsOBTElTRSBERSBMRUlTCj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwpjb25z",
"dCBLRVlXT1JEUyA9IFsKICBbL2ltcG9zdG98dHJpYnV0fHRheGEoPyHDpykvaSwgICAgICAgIHtlY29ub21pYTorMiwgZmVsaWNpZGFkZTotMn0sICdUcmlidXRhw6fDo28nXSwKICBbL2lzZW4ow6d8YylbYcOjXW8gZmlzY2FsfHJlZHV6aXIgaW1wb3N0b3xsaXZyZSBjb21bZcOpXXJjaW98bGFpc3Nlei9pLCB7ZWNvbm9taWE6KzIsIGZlbGljaWRhZGU6KzEsIGxpYmVyZGFkZTorMX0sICdMaXZyZS1jb23DqXJjaW8nXSwKICBbL2VzY3JhdmlkW2HDo11vfGVzY3Jhdm8vaSwgICAgICB7ZWNvbm9taWE6KzMsIGZlbGljaWRhZGU6",
"LTUsIHBvcHVsYWNhbzotMSwgbGliZXJkYWRlOi01LCBlc3RhYmlsaWRhZGU6LTJ9LCAnRXNjcmF2aWTDo28nXSwKICBbL3RyYWJhbGhvIGZvcltjw6ddYWRvfGNvcnZlaWF8c2VydmlkW2HDo11vL2ksIHtlY29ub21pYTorMiwgZmVsaWNpZGFkZTotMywgcG9wdWxhY2FvOi0xLCBsaWJlcmRhZGU6LTN9LCAnVHJhYmFsaG8gZm9yw6dhZG8nXSwKICBbL2xpYmVyZGFkZXxkaXJlaXRvcyBjaXZpc3xhdXRvbm9taWEvaSwge2ZlbGljaWRhZGU6KzMsIHNlZ3VyYW5jYTotMSwgbGliZXJkYWRlOis0fSwgJ0xpYmVyZGFkZXMgY2l2aXMn",
"XSwKICBbL2NlbnN1cmF8cHJvcGFnYW5kYXxjb250cm9sZSBkZSBpbmZvcm1hL2ksIHtzZWd1cmFuY2E6KzEsIGZlbGljaWRhZGU6LTIsIGN1bHR1cmE6LTIsIGxpYmVyZGFkZTotM30sICdDZW5zdXJhJ10sCiAgWy92aWdpbFthw6JdbmNpYXxwYW5bb8OzXXB0aWNvfG1vbml0b3JhciBjaWRhZC9pLCB7c2VndXJhbmNhOiszLCBmZWxpY2lkYWRlOi0yLCBsaWJlcmRhZGU6LTN9LCAnVmlnaWzDom5jaWEnXSwKICBbL2V4ZWN1W2PDp11bYcOjXW98cGVuYSBkZSBtb3J0ZXxleHRlcm1pbi9pLCB7c2VndXJhbmNhOisyLCBmZWxpY2lk",
"YWRlOi0zLCBwb3B1bGFjYW86LTEsIGxpYmVyZGFkZTotMiwgZXN0YWJpbGlkYWRlOisxfSwgJ1BlbmEgY2FwaXRhbCddLAogIFsvcHJpc1thw6Ndb3xlbmNhcmNlcmEvaSwgICAgICAgIHtzZWd1cmFuY2E6KzIsIGZlbGljaWRhZGU6LTEsIGxpYmVyZGFkZTotMn0sICdFbmNhcmNlcmFtZW50byddLAogIFsvcG9sW2nDrV1jaWF8bWlsW2nDrV1jaWF8Zm9yW2PDp11hIGRlIHNlZ3VyYW5bY8OnXWF8cGF0cnVsaGEvaSwge3NlZ3VyYW5jYTorMiwgbGliZXJkYWRlOi0xfSwgJ0FwYXJhdG8gcG9saWNpYWwnXSwKICBbL2V4W2XDqV1y",
"Y2l0b3xtaWxpdChhcnxhcml6YVtjw6ddW2HDo11vKXxjb25zY3JpW2PDp11bYcOjXW98cmVjcnV0YW1lbnRvL2ksIHtzZWd1cmFuY2E6KzIsIGVjb25vbWlhOi0xLCBmZWxpY2lkYWRlOi0xLCBlc3RhYmlsaWRhZGU6KzF9LCAnTWlsaXRhcml6YcOnw6NvJ10sCiAgWy9lbGVpW2PDp11bb8O1XWVzfHZvdG98ZGVtb2NyYWNpYXxwYXJsYW1lbnRvL2ksIHtmZWxpY2lkYWRlOisyLCBzZWd1cmFuY2E6LTEsIGxpYmVyZGFkZTorMywgZXN0YWJpbGlkYWRlOi0xfSwgJ1BhcnRpY2lwYcOnw6NvIHBvbMOtdGljYSddLAogIFsvcmVsaWdp",
"W2HDo11vIGRlIGVzdGFkb3x0ZW9jcmFjaWF8Y2xlcm8gbm8gcG9kZXIvaSwge2N1bHR1cmE6KzIsIGZlbGljaWRhZGU6LTEsIHNlZ3VyYW5jYTorMSwgbGliZXJkYWRlOi0yfSwgJ1Rlb2NyYWNpYSddLAogIFsvbGliZXJkYWRlIHJlbGlnaW9zYXx0b2xlcsOibmNpYSByZWxpZ2lvc2EvaSwge2ZlbGljaWRhZGU6KzIsIGN1bHR1cmE6KzEsIGxpYmVyZGFkZTorMn0sICdUb2xlcsOibmNpYSByZWxpZ2lvc2EnXSwKICBbL2FydGV8Y3VsdHVyYXxmZXN0aXZhbHxlZHVjYVtjw6ddW2HDo11vfGVzY29sYXx1bml2ZXJzaWRhZGUvaSwg",
"e2N1bHR1cmE6KzMsIGZlbGljaWRhZGU6KzF9LCAnRm9tZW50byBjdWx0dXJhbCddLAogIFsvcHJvaWJpW2PDp11bYcOjXW98YmFuaXJ8aWxbacOtXWNpdG98Y29udHJhYmFuZG8vaSwge3NlZ3VyYW5jYTorMSwgZmVsaWNpZGFkZTotMSwgZWNvbm9taWE6LTEsIGxpYmVyZGFkZTotMn0sICdQcm9pYmljaW9uaXNtbyddLAogIFsvY29ycnVwW2PDp11bYcOjXW98c3Vib3Jub3xleHRvcnNbYcOjXW8vaSwge2Vjb25vbWlhOisxLCBmZWxpY2lkYWRlOi0yLCBzZWd1cmFuY2E6LTEsIGVzdGFiaWxpZGFkZTotMiwgY29ycnVwY2FvOisz",
"fSwgJ0NvcnJ1cMOnw6NvIGluc3RpdHVjaW9uYWwnXSwKICBbL2NvbVtlw6ldcmNpb3xtZXJjYWRvfHRyb2NhIGNvbWVyY2lhbC9pLCB7ZWNvbm9taWE6KzJ9LCAnQ29tw6lyY2lvJ10sCiAgWy9tb25vcFtvw7NdbGlvfG1lZ2Fjb3JwfGNhcnRlbC9pLCB7ZWNvbm9taWE6KzIsIGZlbGljaWRhZGU6LTEsIGxpYmVyZGFkZTotMX0sICdNb25vcMOzbGlvJ10sCiAgWy9zYVt1w7pdZGV8aG9zcGl0YWx8bWVkaWNpbmF8Y2xbacOtXW5pY2EvaSwge3BvcHVsYWNhbzorMiwgZmVsaWNpZGFkZTorMn0sICdTYcO6ZGUgcMO6YmxpY2EnXSwK",
"ICBbL2ZvbWV8cmFjaW9uYW1lbnRvfGVzY2Fzc2V6L2ksIHtwb3B1bGFjYW86LTEsIGZlbGljaWRhZGU6LTIsIGVzdGFiaWxpZGFkZTotMX0sICdFc2Nhc3NleiBjb250cm9sYWRhJ10sCiAgWy9pbWlncmFbY8OnXVthw6Ndb3xjb2xvbml6YVtjw6ddW2HDo11vfGFjb2xoaW1lbnRvL2ksIHtwb3B1bGFjYW86KzIsIGN1bHR1cmE6KzEsIGxpYmVyZGFkZTorMX0sICdJbWlncmHDp8OjbyddLAogIFsvZnJvbnRlaXJhIGZlY2hhZGF8aXNvbGFjaW9uaXNtb3x4ZW5vZm9iaWF8ZXhwdWxzW2HDo11vL2ksIHtwb3B1bGFjYW86LTEsIHNl",
"Z3VyYW5jYTorMSwgY3VsdHVyYTotMSwgbGliZXJkYWRlOi0xfSwgJ0lzb2xhY2lvbmlzbW8nXSwKICBbL3RvcnR1cmF8bWFsdGVjaHxleHBlcmltZW50YVtjw6ddW2HDo11vIGh1bWFuYS9pLCB7c2VndXJhbmNhOisyLCBmZWxpY2lkYWRlOi00LCBwb3B1bGFjYW86LTEsIGxpYmVyZGFkZTotM30sICdNYWx0ZWNoIC8gVG9ydHVyYSddLAogIFsvcm9iW2/DtF18YXV0b21hW2PDp11bYcOjXW98XGJpYVxifGludGVsaWdbZcOqXW5jaWEgYXJ0aWZpY2lhbC9pLCB7ZWNvbm9taWE6KzIsIHBvcHVsYWNhbzotMX0sICdBdXRvbWHDp8Oj",
"byddLAogIFsvZ3JldmV8c2luZGljYXRvfHRyYWJhbGhhZG9yL2ksIHtmZWxpY2lkYWRlOisxLCBlY29ub21pYTotMSwgbGliZXJkYWRlOisxfSwgJ0RpcmVpdG9zIHRyYWJhbGhpc3RhcyddLAogIFsvY2FzYW1lbnRvfGZhbVtpw61dbGlhfG5hdGFsaWRhZGUvaSwge3BvcHVsYWNhbzorMSwgZmVsaWNpZGFkZTorMX0sICdQb2zDrXRpY2EgZmFtaWxpYXInXSwKICBbL2Fib3J0b3xjb250cm9sZSBkZSBuYXRhbGlkYWRlfGV1Z2VuaWEvaSwge3BvcHVsYWNhbzotMSwgZmVsaWNpZGFkZTotMSwgbGliZXJkYWRlOi0xfSwgJ0NvbnRy",
"b2xlIHBvcHVsYWNpb25hbCddLAogIFsvYW5pc3RpYXxwZXJkW2HDo11vfGNsZW1bZcOqXW5jaWEvaSwge2ZlbGljaWRhZGU6KzIsIHNlZ3VyYW5jYTotMSwgbGliZXJkYWRlOisxfSwgJ0FuaXN0aWEnXSwKICBbL3RyaWJ1bmFsKD8hIG1hcmNpYWwpfGp1c3RpW2PDp11hfGp1bGdhbWVudG8ganVzdG8vaSwge2ZlbGljaWRhZGU6KzEsIHNlZ3VyYW5jYTorMSwgZXN0YWJpbGlkYWRlOisxfSwgJ0p1c3Rpw6dhIGZvcm1hbCddLAogIFsvdHJpYnVuYWwgbWFyY2lhbHxqdXN0aVtjw6ddYSBzdW1bYcOhXXJpYXxjb3J0ZSBtYXJjaWFs",
"L2ksIHtzZWd1cmFuY2E6KzIsIGZlbGljaWRhZGU6LTIsIGxpYmVyZGFkZTotMn0sICdKdXN0acOnYSBzdW3DoXJpYSddLAogIFsvZXN0YWJpbGlkYWRlfG9yZGVtIHBbdcO6XWJsaWNhfGxlaSBlIG9yZGVtL2ksIHtlc3RhYmlsaWRhZGU6KzIsIGxpYmVyZGFkZTotMX0sICdMZWkgZSBvcmRlbSddLAogIFsvZGVzY2VudHJhbGl6YVtjw6ddW2HDo11vfGF1dG9ub21pYSBsb2NhbHxhdXRvZ292ZXJuby9pLCB7bGliZXJkYWRlOisyLCBlc3RhYmlsaWRhZGU6LTF9LCAnRGVzY2VudHJhbGl6YcOnw6NvJ10sCiAgWy9kaXRhZHVyYXx0",
"aXJhbmlhfHBvZGVyIGFic29sdXRvfGdvbHBlL2ksIHtzZWd1cmFuY2E6KzIsIGxpYmVyZGFkZTotNCwgZmVsaWNpZGFkZTotMiwgZXN0YWJpbGlkYWRlOisxLCBjb3JydXBjYW86KzJ9LCAnUG9kZXIgYWJzb2x1dG8nXSwKICBbL3RlY25vbG9naWF8cGVzcXVpc2EgY2llbnRbacOtXWZpY2F8aW5vdmFbY8OnXVthw6Ndb3xsYWJvcmF0W2/Ds11yaW98Y2lbZcOqXW5jaWEvaSwge3RlY25vbG9naWE6KzMsIGVjb25vbWlhOisxfSwgJ0ZvbWVudG8gdGVjbm9sw7NnaWNvJ10sCiAgWy9sdWRkaXRhfHByb2liaVtjw6ddW2HDo11vIGRl",
"IHRlY25vbG9naWF8dGVjbm9mb2JpYS9pLCB7dGVjbm9sb2dpYTotMywgZXN0YWJpbGlkYWRlOisxfSwgJ1Jlc3RyacOnw6NvIHRlY25vbMOzZ2ljYSddLAogIFsvYW50aWNvcnJ1cFtjw6ddW2HDo11vfHRyYW5zcGFyW2XDql1uY2lhfGF1ZGl0b3JpYXxmaXNjYWxpemFbY8OnXVthw6NdbyBwW3XDul1ibGljYS9pLCB7Y29ycnVwY2FvOi0zLCBmZWxpY2lkYWRlOisxfSwgJ0NvbWJhdGUgw6AgY29ycnVww6fDo28nXSwKICBbL25lcG90aXNtb3xmYXZvcmVjaW1lbnRvfGFwYWRyaW5oYW1lbnRvL2ksIHtjb3JydXBjYW86KzMsIGZl",
"bGljaWRhZGU6LTF9LCAnTmVwb3Rpc21vIGluc3RpdHVjaW9uYWxpemFkbyddLAogIFsvbWVpbyBhbWJpZW50ZXxwb2x1aVtjw6ddW2HDo11vfHN1c3RlbnRhYmlsaWRhZGV8cmVmbG9yZXN0YW1lbnRvL2ksIHtwb3B1bGFjYW86KzEsIGZlbGljaWRhZGU6KzEsIGVjb25vbWlhOi0xfSwgJ1BvbMOtdGljYSBhbWJpZW50YWwnXSwKICBbL2V4cGxvcmFbY8OnXVthw6NdbyBwcmVkYXRbb8OzXXJpYXxkZXNtYXRhbWVudG98bWluZXJhW2PDp11bYcOjXW8gaXJyZXN0cml0YS9pLCB7ZWNvbm9taWE6KzIsIHBvcHVsYWNhbzotMSwgZmVs",
"aWNpZGFkZTotMX0sICdFeHBsb3Jhw6fDo28gcHJlZGF0w7NyaWEnXSwKICBbL3ByaXZhdGl6YVtjw6ddW2HDo11vL2ksIHtlY29ub21pYTorMiwgZmVsaWNpZGFkZTotMSwgY29ycnVwY2FvOisxfSwgJ1ByaXZhdGl6YcOnw6NvJ10sCiAgWy9uYWNpb25hbGl6YVtjw6ddW2HDo11vfGVzdGF0aXphW2PDp11bYcOjXW8vaSwge2Vjb25vbWlhOi0xLCBlc3RhYmlsaWRhZGU6KzEsIGxpYmVyZGFkZTotMX0sICdOYWNpb25hbGl6YcOnw6NvJ10sCiAgWy9kaXJlaXRvcyBkYXMgbXVsaGVyZXN8aWd1YWxkYWRlIGRlIGdbZcOqXW5lcm98",
"aWd1YWxkYWRlIHJhY2lhbHxtaW5vcmlhcy9pLCB7ZmVsaWNpZGFkZTorMiwgbGliZXJkYWRlOisyLCBjdWx0dXJhOisxfSwgJ0RpcmVpdG9zIGUgaWd1YWxkYWRlJ10sCiAgWy9zZWdyZWdhW2PDp11bYcOjXW98YXBhcnRoZWlkfGRpc2NyaW1pbmFbY8OnXVthw6NdbyBpbnN0aXR1Y2lvbmFsL2ksIHtmZWxpY2lkYWRlOi00LCBsaWJlcmRhZGU6LTMsIHNlZ3VyYW5jYTorMX0sICdTZWdyZWdhw6fDo28gaW5zdGl0dWNpb25hbCddLAogIFsvbGliZXJkYWRlIGRlIGltcHJlbnNhfGltcHJlbnNhIGxpdnJlL2ksIHtsaWJlcmRhZGU6",
"KzIsIGN1bHR1cmE6KzEsIGZlbGljaWRhZGU6KzF9LCAnSW1wcmVuc2EgbGl2cmUnXSwKICBbL3JlZm9ybWEgYWdyW2HDoV1yaWF8cmVkaXN0cmlidWlbY8OnXVthw6NdbyBkZSB0ZXJyYXMvaSwge2ZlbGljaWRhZGU6KzIsIGVjb25vbWlhOi0xLCBlc3RhYmlsaWRhZGU6LTF9LCAnUmVmb3JtYSBhZ3LDoXJpYSddLAogIFsvYWJvbGlbY8OnXVthw6NdbyBkYSBlc2NyYXZpZFthw6Ndb3xsaWJlcnRhW2PDp11bYcOjXW8gZG9zIGVzY3Jhdm9zfGZpbSBkbyB0cmFiYWxobyBmb3JbY8OnXWFkby9pLCB7ZmVsaWNpZGFkZTorMywgbGli",
"ZXJkYWRlOiszLCBlY29ub21pYTotMX0sICdBYm9sacOnw6NvJ10sCiAgWy9kaXJlaXRvcyBhbGllbltpw61dZ2VuYXN8Y29leGlzdFtlw6pdbmNpYSBhbGllbi9pLCB7Y3VsdHVyYTorMiwgZmVsaWNpZGFkZTorMX0sICdEaXJlaXRvcyBhbGllbsOtZ2VuYXMnXSwKICBbL3ByZXRlY2h8dGVjbm9sb2dpYSBwcm9pYmlkYXxhcnRlZmF0byBwZXJpZ29zby9pLCB7dGVjbm9sb2dpYTorMiwgc2VndXJhbmNhOi0xfSwgJ1VzbyBkZSBwcmV0ZWNoJ10sCiAgWy9wc2lbb8O0XW5pY298dGVsZXBhdGlhfHByZWNvZ25pW2PDp11bYcOjXW98",
"Y29udHJvbGUgcHNpW2/DtF1uaWNvL2ksIHtzZWd1cmFuY2E6KzEsIGxpYmVyZGFkZTotMSwgdGVjbm9sb2dpYTorMX0sICdSZWd1bGHDp8OjbyBwc2nDtG5pY2EnXSwKICBbL3F1YXJlbnRlbmF8bG9ja2Rvd258YmxvcXVlaW8gc2FuaXRbYcOhXXJpby9pLCB7c2VndXJhbmNhOisxLCBmZWxpY2lkYWRlOi0yLCBlY29ub21pYTotMSwgbGliZXJkYWRlOi0yfSwgJ1F1YXJlbnRlbmEnXSwKICBbL3R1cmlzbW98dmlzdG8gZGUgdmlzaXRhbnRlfGFjb3JkbyBkZSB2aWFnZW0vaSwge2Vjb25vbWlhOisxLCBjdWx0dXJhOisxfSwgJ1Bv",
"bMOtdGljYSBkZSB0dXJpc21vJ10sCiAgWy9lbWJhcmdvfHNhbltjw6ddW2/DtV1lc3xibG9xdWVpbyBjb21lcmNpYWwvaSwge2Vjb25vbWlhOi0yLCBmZWxpY2lkYWRlOi0xLCBlc3RhYmlsaWRhZGU6LTF9LCAnRW1iYXJnbyBjb21lcmNpYWwnXSwKICBbL2xlaSBtYXJjaWFsfGVzdGFkbyBkZSBzW2nDrV10aW98dG9xdWUgZGUgcmVjb2xoZXIvaSwge3NlZ3VyYW5jYTorMywgbGliZXJkYWRlOi0zLCBmZWxpY2lkYWRlOi0yLCBlc3RhYmlsaWRhZGU6KzF9LCAnTGVpIG1hcmNpYWwnXSwKICBbL3J1W8OtaV1kb3xiYXJ1bGhvfHNv",
"bSBhbHRvfHNvbSBhbWJpZW50ZXxtW3XDul1zaWNhIGFsdGF8ZmVzdGFzPyBydWlkb3Nhcz98cG9sdWlbw6djXVvDo2FdbyBzb25vcmF8Y29udHJvbGUgc29ub3JvL2ksIHtmZWxpY2lkYWRlOi0xLCBjdWx0dXJhOi0yLCBlc3RhYmlsaWRhZGU6KzF9LCAnQ29udHJvbGUgZGUgcnXDrWRvL3NvbSddLAogIFsvcmVmZXJbZcOqXW5kb3xwbGViaXNjaXRvfGNvbnN1bHRhIHBvcHVsYXIvaSwge2ZlbGljaWRhZGU6KzEsIGxpYmVyZGFkZTorMn0sICdDb25zdWx0YSBwb3B1bGFyJ10sCiAgWy9jdWx0byBhbyBsW2nDrV1kZXJ8cGVyc29u",
"YWxpc21vfGN1bHRvIGRlIHBlcnNvbmFsaWRhZGUvaSwge2VzdGFiaWxpZGFkZTorMSwgbGliZXJkYWRlOi0yLCBjb3JydXBjYW86KzF9LCAnQ3VsdG8gYW8gbMOtZGVyJ10sCiAgWy9vcmRlbSBqZWRpfGNbb8OzXWRpZ28gamVkaXxmb3JbY8OnXWEgbHVtaW5vc2EvaSwge2N1bHR1cmE6KzIsIGZlbGljaWRhZGU6KzEsIGxpYmVyZGFkZTorMX0sICdEb3V0cmluYSBKZWRpJ10sCiAgWy9sYWRvIHNvbWJyaW98c2l0aHxpbXBlcmFkb3Igc3VwcmVtby9pLCB7c2VndXJhbmNhOisyLCBsaWJlcmRhZGU6LTMsIGZlbGljaWRhZGU6LTIs",
"IGNvcnJ1cGNhbzorMn0sICdEb3V0cmluYSBTaXRoJ10sCiAgWy9lc3RyZWxhIGRhIG1vcnRlfGFybWEgZGUgZGVzdHJ1aVtjw6ddW2HDo11vIGVtIG1hc3NhfHN1cGVyYXJtYS9pLCB7c2VndXJhbmNhOiszLCBmZWxpY2lkYWRlOi00LCBlc3RhYmlsaWRhZGU6KzEsIGVjb25vbWlhOi0zfSwgJ1Byb2pldG8gZGUgc3VwZXJhcm1hJ10sCl07CgpmdW5jdGlvbiBhbmFseXplTGF3VGV4dCh0ZXh0LCBzZXZlcml0eSl7CiAgY29uc3QgZm91bmQgPSBbXTsKICBjb25zdCB0b3RhbHMgPSBlbXB0eVRvdGFscygpOwogIEtFWVdPUkRTLmZv",
"ckVhY2goKFtyZSwgZWZmcywgbGFiZWxdKT0+ewogICAgaWYocmUudGVzdCh0ZXh0KSl7CiAgICAgIGZvdW5kLnB1c2gobGFiZWwpOwogICAgICBPYmplY3QuZW50cmllcyhlZmZzKS5mb3JFYWNoKChbayx2XSk9PnsgdG90YWxzW2tdPSh0b3RhbHNba118fDApK3Y7IH0pOwogICAgfQogIH0pOwogIGlmKGZvdW5kLmxlbmd0aD09PTApewogICAgdG90YWxzLmZlbGljaWRhZGUgKz0gKDMgLSBzZXZlcml0eSk7CiAgICB0b3RhbHMuc2VndXJhbmNhICs9IChzZXZlcml0eSAtIDMpOwogICAgdG90YWxzLmxpYmVyZGFkZSArPSAoMyAt",
"IHNldmVyaXR5KTsKICAgIHRvdGFscy5jb3JydXBjYW8gKz0gTWF0aC5tYXgoMCwgc2V2ZXJpdHkgLSAzKTsKICAgIGZvdW5kLnB1c2goJ0VmZWl0byBnZW7DqXJpY28gKHNlbSBwYWRyw7VlcyByZWNvbmhlY2lkb3MpJyk7CiAgfQogIGNvbnN0IG11bHQgPSBzZXZlcml0eSAvIDM7CiAgT2JqZWN0LmtleXModG90YWxzKS5mb3JFYWNoKGs9PnsgdG90YWxzW2tdID0gTWF0aC5yb3VuZCh0b3RhbHNba10qbXVsdCk7IH0pOwogIHJldHVybiB7ZGVsdGFzOiB0b3RhbHMsIG1hdGNoZWQ6IGZvdW5kfTsKfQpjb25zdCBTRVZFUklUWV9M",
"QUJFTFMgPSB7MTonQW1lbmEnLCAyOidNb2RlcmFkYScsIDM6J0Zpcm1lJywgNDonU2V2ZXJhJywgNTonVG90YWxpdMOhcmlhJ307CgpmdW5jdGlvbiBidWlsZExhd0Zyb21QcmVzZXQocHJlc2V0LCBzZXZlcml0eSl7CiAgY29uc3QgY2xhdXNlID0gcHJlc2V0LmNsYXVzZXNbc2V2ZXJpdHldIHx8IHByZXNldC5jbGF1c2VzWzNdOwogIGNvbnN0IHRleHQgPSAocHJlc2V0LmJhc2UgPyBwcmVzZXQuYmFzZSArICcgJyA6ICcnKSArIGNsYXVzZTsKICByZXR1cm4geyBuYW1lOiBwcmVzZXQubmFtZSwgdGV4dDogdGV4dC50cmltKCkg",
"fTsKfQoKY29uc3QgUFJFU0VUX0xBV1MgPSBbCiAgLy8gLS0tLS0tLS0tLSBWSURBIFJFQUwgLS0tLS0tLS0tLQogIHtrZXk6J3RyaWInLCBjYXRlZ29yeToncmVhbCcsIG5hbWU6J1RyaWJ1dGHDp8OjbyBQcm9ncmVzc2l2YScsIGJhc2U6J08gRXN0YWRvIGluc3RpdHVpIHVtIHNpc3RlbWEgZGUgdHJpYnV0YcOnw6NvIHNvYnJlIG8gY29tw6lyY2lvIGUgYSByZW5kYSBkb3MgY2lkYWTDo29zLicsIGNsYXVzZXM6ewogICAgMTonVW1hIHRheGEgc2ltYsOzbGljYSDDqSBjb2JyYWRhIGFwZW5hcyBkZSBncmFuZGVzIGNvcnBvcmHD",
"p8O1ZXMsIHBvdXBhbmRvIHBlcXVlbm9zIGNvbWVyY2lhbnRlcyBlIGZhbcOtbGlhcy4nLAogICAgMjonQWzDrXF1b3RhcyBtb2RlcmFkYXMgaW5jaWRlbSBzb2JyZSBsdWNyb3MgY29tZXJjaWFpcywgY29tIGlzZW7Dp8O1ZXMgcGFyYSBwcm9kdXRvcyBlc3NlbmNpYWlzLicsCiAgICAzOidJbXBvc3RvcyBzw6NvIGNvYnJhZG9zIGRlIGZvcm1hIGFtcGxhIHNvYnJlIGNvbcOpcmNpbywgcmVuZGEgZSBwcm9wcmllZGFkZSwgZmluYW5jaWFuZG8gb3MgY29mcmVzIHDDumJsaWNvcy4nLAogICAgNDonVW1hIHBlc2FkYSBjYXJnYSB0",
"cmlidXTDoXJpYSByZWNhaSBzb2JyZSBxdWFzZSB0b2RhIGF0aXZpZGFkZSBlY29uw7RtaWNhLCBjb20gZmlzY2FsaXphw6fDo28gcmlnb3Jvc2EuJywKICAgIDU6J08gRXN0YWRvIGNvbmZpc2NhIGEgbWFpb3IgcGFydGUgZGUgdG9kYSByaXF1ZXphIGdlcmFkYSwgZGVpeGFuZG8gw6AgcG9wdWxhw6fDo28gYXBlbmFzIG8gbcOtbmltbyBwYXJhIHNvYnJldml2ZXIuJwogIH19LAogIHtrZXk6J2ltcHJlbnNhJywgY2F0ZWdvcnk6J3JlYWwnLCBuYW1lOidMaWJlcmRhZGUgZGUgSW1wcmVuc2EnLCBiYXNlOidSZWd1bGFtZW50YS1z",
"ZSBvIGRpcmVpdG8gZGUgcHVibGljYcOnw6NvIGUgdHJhbnNtaXNzw6NvIGRlIGluZm9ybWHDp8OjbyBubyBzZXRvci4nLCBjbGF1c2VzOnsKICAgIDE6J0EgaW1wcmVuc2Egw6kgdG90YWxtZW50ZSBsaXZyZSwgc2VtIHF1YWxxdWVyIGNlbnN1cmEgb3UgbmVjZXNzaWRhZGUgZGUgbGljZW7Dp2EgZXN0YXRhbC4nLAogICAgMjonSm9ybmFsaXN0YXMgcG9kZW0gcHVibGljYXIgbGl2cmVtZW50ZSwgZXhjZXRvIG1hdMOpcmlhcyBxdWUgY29tcHJvdmFkYW1lbnRlIGluY2l0ZW0gdmlvbMOqbmNpYS4nLAogICAgMzonUHVibGljYcOn",
"w7VlcyBkZXZlbSBzZSByZWdpc3RyYXIganVudG8gYW8gRXN0YWRvLCBtYXMgbyBjb250ZcO6ZG8gw6kgcHVibGljYWRvIHNlbSByZXZpc8OjbyBwcsOpdmlhLicsCiAgICA0OidUb2RhIG1hdMOpcmlhIGNyw610aWNhIGFvIGdvdmVybm8gcGFzc2EgcG9yIHJldmlzw6NvIGRlIHVtIGNlbnNvciBlc3RhdGFsIGFudGVzIGRhIHB1YmxpY2HDp8Ojby4nLAogICAgNTonVG9kYSBwdWJsaWNhw6fDo28gZSB0cmFuc21pc3PDo28gZGV2ZSBwYXNzYXIgcG9yIGFwcm92YcOnw6NvIGVzdGF0YWwgYW50ZXMgZGUgc2VyIGRpdnVsZ2FkYSwg",
"c29iIHBlbmEgZGUgZmVjaGFtZW50byBpbWVkaWF0byBkbyB2ZcOtY3Vsby4nCiAgfX0sCiAge2tleTondmlnaWwnLCBjYXRlZ29yeToncmVhbCcsIG5hbWU6J1ZpZ2lsw6JuY2lhIGVtIE1hc3NhJywgYmFzZTonTyBnb3Zlcm5vIGltcGxlbWVudGEgdW0gc2lzdGVtYSBkZSBtb25pdG9yYW1lbnRvIGRhIHBvcHVsYcOnw6NvIHBhcmEgcHJldmVuaXIgY3JpbWVzIGUgYW1lYcOnYXMgw6Agc2VndXJhbsOnYS4nLCBjbGF1c2VzOnsKICAgIDE6J0PDom1lcmFzIHPDo28gaW5zdGFsYWRhcyBhcGVuYXMgZW0gcHLDqWRpb3MgcMO6Ymxp",
"Y29zIGVzc2VuY2lhaXMsIGNvbSBhY2Vzc28gcmVzdHJpdG8gYSBtYW5kYWRvcyBqdWRpY2lhaXMuJywKICAgIDI6J0PDom1lcmFzIGRlIG1vbml0b3JhbWVudG8gc8OjbyBleHBhbmRpZGFzIGEgw6FyZWFzIGNvbWVyY2lhaXMgZSBjcnV6YW1lbnRvcyBtb3ZpbWVudGFkb3MgZGEgY2FwaXRhbC4nLAogICAgMzonVW1hIHJlZGUgZGUgc2Vuc29yZXMgY29icmUgYXMgcHJpbmNpcGFpcyB2aWFzIHDDumJsaWNhcywgY29tIHJlZ2lzdHJvcyBtYW50aWRvcyBwb3Igc2VpcyBtZXNlcy4nLAogICAgNDonU2Vuc29yZXMgZSBkcm9uZXMg",
"bW9uaXRvcmFtIHF1YXNlIHRvZGEgYSBtYWxoYSB1cmJhbmEsIGNvbSByZWxhdMOzcmlvcyBkacOhcmlvcyBlbnZpYWRvcyDDoHMgYXV0b3JpZGFkZXMuJywKICAgIDU6J08gRXN0YWRvIGluc3RhbGEgc2Vuc29yZXMgZGUgdmlnaWzDom5jaWEgZW0gdG9kYSByZXNpZMOqbmNpYSBlIHZpYSBww7pibGljYSwgbW9uaXRvcmFuZG8gY2FkYSBjaWRhZMOjbyBhIGNhZGEgaW5zdGFudGUsIHNlbSBleGNlw6fDo28uJwogIH19LAogIHtrZXk6J3NhdWRlJywgY2F0ZWdvcnk6J3JlYWwnLCBuYW1lOidTaXN0ZW1hIGRlIFNhw7pkZSBVbml2",
"ZXJzYWwnLCBiYXNlOidJbnN0aXR1aS1zZSB1bWEgcG9sw610aWNhIHDDumJsaWNhIGRlIGFjZXNzbyDDoCBzYcO6ZGUgcGFyYSBhIHBvcHVsYcOnw6NvLicsIGNsYXVzZXM6ewogICAgMTonQ2zDrW5pY2FzIGRlIGNhcmlkYWRlIHJlY2ViZW0gc3Vic8OtZGlvcyBtb2Rlc3RvcyBwYXJhIGF0ZW5kZXIgb3MgbWFpcyBuZWNlc3NpdGFkb3MuJywKICAgIDI6J08gRXN0YWRvIHN1YnNpZGlhIHBhcnRlIGRvcyBjdXN0b3MgZGUgdHJhdGFtZW50byBlbSBob3NwaXRhaXMgY3JlZGVuY2lhZG9zLicsCiAgICAzOidPIGdvdmVybm8gZ2Fy",
"YW50ZSBhY2Vzc28gZ3JhdHVpdG8gYSBob3NwaXRhaXMgZSBtZWRpY2luYSBiw6FzaWNhIGEgdG9kYSBhIHBvcHVsYcOnw6NvLicsCiAgICA0OidVbSBzaXN0ZW1hIGVzdGF0YWwgZGUgc2HDumRlIHVuaXZlcnNhbCBlIHBvc3RlY2ggY29icmUgcHJhdGljYW1lbnRlIHRvZGEgZW5mZXJtaWRhZGUgY29uaGVjaWRhLicsCiAgICA1OidPIEVzdGFkbyBhc3N1bWUgY29udHJvbGUgdG90YWwgZGEgbWVkaWNpbmEsIG9icmlnYW5kbyB0b2RvIHRyYXRhbWVudG8gZSBwZXNxdWlzYSBiaW9sw7NnaWNhIGEgc2VydmlyIGFvcyBzZXVzIG9i",
"amV0aXZvcy4nCiAgfX0sCiAge2tleTonc2Vydm1pbCcsIGNhdGVnb3J5OidyZWFsJywgbmFtZTonU2VydmnDp28gTWlsaXRhciBPYnJpZ2F0w7NyaW8nLCBiYXNlOidSZWd1bGFtZW50YS1zZSBhIHBhcnRpY2lwYcOnw6NvIGRhIHBvcHVsYcOnw6NvIG5hcyBmb3LDp2FzIGFybWFkYXMgZG8gc2V0b3IuJywgY2xhdXNlczp7CiAgICAxOidPIGFsaXN0YW1lbnRvIMOpIHZvbHVudMOhcmlvLCBjb20gaW5jZW50aXZvcyBmaW5hbmNlaXJvcyBwYXJhIHF1ZW0gZGVzZWphIHNlcnZpci4nLAogICAgMjonSm92ZW5zIHPDo28gY29udm9j",
"YWRvcyBwb3Igc29ydGVpbyBwYXJhIHVtIGJyZXZlIHRyZWluYW1lbnRvIGLDoXNpY28sIGNvbSBpc2Vuw6fDtWVzIGFtcGxhcy4nLAogICAgMzonVG9kbyBjaWRhZMOjbyBhcHRvIGRldmUgc2VydmlyIG5hcyBmb3LDp2FzIG1pbGl0YXJlcyBwb3IgdW0gcGVyw61vZG8gZGV0ZXJtaW5hZG8uJywKICAgIDQ6J0EgY29uc2NyacOnw6NvIMOpIGFtcGxhIGUgb2JyaWdhdMOzcmlhLCBpbmNsdWluZG8gcmVzZXJ2aXN0YXMgY29udm9jYWRvcyBlbSBxdWFscXVlciBjcmlzZS4nLAogICAgNTonVG9kYSBhIHBvcHVsYcOnw6NvIGVtIGlk",
"YWRlIHByb2R1dGl2YSDDqSBtb2JpbGl6YWRhIGNvbW8gZm9yw6dhIG1pbGl0YXIgcGVybWFuZW50ZSwgc29iIHBlbmEgZGUgZXhlY3XDp8OjbyBwb3IgZGVzZXLDp8Ojby4nCiAgfX0sCiAge2tleTonYW50aWNvcnInLCBjYXRlZ29yeToncmVhbCcsIG5hbWU6J0xlaSBBbnRpY29ycnVww6fDo28nLCBiYXNlOidJbnN0aXR1aS1zZSB1bSBtZWNhbmlzbW8gZGUgY29udHJvbGUgc29icmUgbyB1c28gZG8gZGluaGVpcm8gcMO6YmxpY28uJywgY2xhdXNlczp7CiAgICAxOidSZWNvbWVuZGEtc2UgcXVlIGZ1bmNpb27DoXJpb3MgcMO6",
"YmxpY29zIGRlY2xhcmVtIHNldXMgYmVucyBhbnVhbG1lbnRlLCBzZW0gcGVuYWxpZGFkZXMgc2V2ZXJhcy4nLAogICAgMjonQ3JpYS1zZSB1bWEgb3V2aWRvcmlhIHBhcmEgcmVjZWJlciBkZW7Dum5jaWFzIGRlIGRlc3ZpbyBkZSB2ZXJiYXMuJywKICAgIDM6J0NyaWEtc2UgdW0gw7NyZ8OjbyBpbmRlcGVuZGVudGUgZGUgZmlzY2FsaXphw6fDo28gZSBhdWRpdG9yaWEgcMO6YmxpY2EsIGNvbSB0cmFuc3BhcsOqbmNpYSBvYnJpZ2F0w7NyaWEgbm9zIGdhc3RvcyBkbyBnb3Zlcm5vLicsCiAgICA0OidBdWRpdG9yaWFzIHN1cnBy",
"ZXNhIGUgcHJpc8OjbyBwcmV2ZW50aXZhIHPDo28gYXBsaWNhZGFzIGEgcXVhbHF1ZXIgc3VzcGVpdGEgZnVuZGFtZW50YWRhIGRlIGNvcnJ1cMOnw6NvLicsCiAgICA1OidTdXNwZWl0b3MgZGUgY29ycnVww6fDo28gc8OjbyBleGVjdXRhZG9zIHN1bWFyaWFtZW50ZSBhcMOzcyBqdWxnYW1lbnRvIGV4cHJlc3NvLCBjb21vIGV4ZW1wbG8gcMO6YmxpY28uJwogIH19LAogIHtrZXk6J3ByaXZhdCcsIGNhdGVnb3J5OidyZWFsJywgbmFtZTonUHJpdmF0aXphw6fDo28gZGUgRXN0YXRhaXMnLCBiYXNlOidSZWZvcm11bGEtc2UgYSBw",
"cm9wcmllZGFkZSBkYXMgZW1wcmVzYXMgZSBzZXJ2acOnb3MgY29udHJvbGFkb3MgcGVsbyBFc3RhZG8uJywgY2xhdXNlczp7CiAgICAxOidQZXF1ZW5hcyBwYXJ0aWNpcGHDp8O1ZXMgYWNpb27DoXJpYXMgZGUgZW1wcmVzYXMgZXN0YXRhaXMgc8OjbyBvZmVyZWNpZGFzIGEgaW52ZXN0aWRvcmVzIGxvY2Fpcy4nLAogICAgMjonU2V0b3JlcyBuw6NvLWVzc2VuY2lhaXMgc8OjbyBncmFkdWFsbWVudGUgYWJlcnRvcyDDoCBpbmljaWF0aXZhIHByaXZhZGEsIGNvbSByZWd1bGHDp8OjbyBlc3RhdGFsLicsCiAgICAzOidEaXZlcnNh",
"cyBlbXByZXNhcyBlc3RhdGFpcyBzw6NvIHZlbmRpZGFzIGEgaW52ZXN0aWRvcmVzIHByaXZhZG9zLCBtYW50ZW5kby1zZSBhcGVuYXMgc2VydmnDp29zIGVzc2VuY2lhaXMgc29iIGNvbnRyb2xlIHDDumJsaWNvLicsCiAgICA0OidUb2RhcyBhcyBlbXByZXNhcyBlc3RhdGFpcyBzw6NvIHZlbmRpZGFzIGEgaW52ZXN0aWRvcmVzIHByaXZhZG9zLCBleHRpbmd1aW5kbyBtb25vcMOzbGlvcyBnb3Zlcm5hbWVudGFpcy4nLAogICAgNTonTyBwcsOzcHJpbyBnb3Zlcm5vIMOpIHJlZXN0cnV0dXJhZG8gY29tbyBjb25nbG9tZXJhZG8g",
"cHJpdmFkbywgY29tIGNhcmdvcyBww7pibGljb3MgbGVpbG9hZG9zIGFvIG1haW9yIGxhbmNlLicKICB9fSwKICB7a2V5OidyZWZvcm1hJywgY2F0ZWdvcnk6J3JlYWwnLCBuYW1lOidSZWZvcm1hIEFncsOhcmlhJywgYmFzZTonUmVvcmdhbml6YS1zZSBhIHBvc3NlIGRlIHRlcnJhcyBwcm9kdXRpdmFzIGRvIHNldG9yLicsIGNsYXVzZXM6ewogICAgMTonSW5jZW50aXZvcyBmaXNjYWlzIHPDo28gb2ZlcmVjaWRvcyBhIHByb3ByaWV0w6FyaW9zIHF1ZSBjZWRhbSBwYXJ0ZSBkZSB0ZXJyYXMgb2Npb3NhcyB2b2x1bnRhcmlhbWVu",
"dGUuJywKICAgIDI6J1RlcnJhcyBww7pibGljYXMgbsOjbyB1dGlsaXphZGFzIHPDo28gZGlzdHJpYnXDrWRhcyBhIGNvb3BlcmF0aXZhcyBkZSBwZXF1ZW5vcyBhZ3JpY3VsdG9yZXMuJywKICAgIDM6J1JlZGlzdHJpYnVlbS1zZSB0ZXJyYXMgaW1wcm9kdXRpdmFzIGRhcyBlbGl0ZXMgcGFyYSBmYW3DrWxpYXMgZGUgYWdyaWN1bHRvcmVzLCBjb20gYXBvaW8gZXN0YXRhbCDDoCBwcm9kdcOnw6NvLicsCiAgICA0OidHcmFuZGVzIHByb3ByaWVkYWRlcyBzw6NvIGRlc2Fwcm9wcmlhZGFzIG1lZGlhbnRlIGluZGVuaXphw6fDo28g",
"c2ltYsOzbGljYSBlIHJlZGlzdHJpYnXDrWRhcyBlbSBtYXNzYS4nLAogICAgNTonVG9kYSBwcm9wcmllZGFkZSBwcml2YWRhIGRlIHRlcnJhIMOpIGFib2xpZGE7IGEgcG9zc2UgZGEgdGVycmEgcGFzc2EgYSBzZXIgaW50ZWlyYW1lbnRlIGVzdGF0YWwsIHJlZGlzdHJpYnXDrWRhIHBvciBkZWNyZXRvLicKICB9fSwKICB7a2V5OidhbWJpZW50JywgY2F0ZWdvcnk6J3JlYWwnLCBuYW1lOidQcm90ZcOnw6NvIEFtYmllbnRhbCcsIGJhc2U6J1JlZ3VsYS1zZSBvIGltcGFjdG8gZGEgYXRpdmlkYWRlIGVjb27DtG1pY2Egc29icmUg",
"byBtZWlvIGFtYmllbnRlIGRvIHBsYW5ldGEuJywgY2xhdXNlczp7CiAgICAxOidSZWNvbWVuZGHDp8O1ZXMgbsOjby12aW5jdWxhbnRlcyBvcmllbnRhbSBlbXByZXNhcyBhIHJlZHV6aXIgYSBwb2x1acOnw6NvIGluZHVzdHJpYWwuJywKICAgIDI6J011bHRhcyBtb2RlcmFkYXMgc8OjbyBhcGxpY2FkYXMgYSBpbmTDunN0cmlhcyBxdWUgZXhjZWRhbSBsaW1pdGVzIGRlIHBvbHVpw6fDo28uJywKICAgIDM6J0NyaWEtc2UgdW0gw7NyZ8OjbyBkZSBmaXNjYWxpemHDp8OjbyBhbWJpZW50YWwgY29tIHBvZGVyIGRlIGVtYmFyZ2Fy",
"IG9wZXJhw6fDtWVzIHBvbHVlbnRlcy4nLAogICAgNDonVG9kYSBhdGl2aWRhZGUgZXh0cmF0aXZpc3RhIGRlIGdyYW5kZSBwb3J0ZSBleGlnZSBsaWNlbmNpYW1lbnRvIHJpZ29yb3NvIGUgY29tcGVuc2HDp8OjbyBhbWJpZW50YWwuJywKICAgIDU6J0V4dHJhw6fDo28gZGUgcmVjdXJzb3MgZSBpbmTDunN0cmlhIHBlc2FkYSBzw6NvIHByb2liaWRhcyBlbSB0b2RvIG8gcGxhbmV0YSwgc29iIHBlbmEgZGUgY29uZmlzY28gaW1lZGlhdG8gZG9zIGJlbnMuJwogIH19LAogIHtrZXk6J2FuaXN0aWEnLCBjYXRlZ29yeToncmVhbCcs",
"IG5hbWU6J0xlaSBkZSBBbmlzdGlhJywgYmFzZTonQ29uY2VkZS1zZSBwZXJkw6NvIGxlZ2FsIGEgZGV0ZXJtaW5hZG9zIGdydXBvcyBkZSBpbmZyYXRvcmVzIGRvIEVzdGFkby4nLCBjbGF1c2VzOnsKICAgIDE6J1BlcXVlbm9zIGRldmVkb3JlcyBmaXNjYWlzIHJlY2ViZW0gcGVyZMOjbyBwYXJjaWFsIGRlIG11bHRhcyBhdHJhc2FkYXMuJywKICAgIDI6J1ByZXNvcyBwb3IgY3JpbWVzIG1lbm9yZXMgZSBuw6NvLXZpb2xlbnRvcyBzw6NvIGxpYmVydGFkb3MgYW50ZWNpcGFkYW1lbnRlLicsCiAgICAzOidDb25jZWRlLXNlIGFu",
"aXN0aWEgZ2VyYWwgYSBkaXNzaWRlbnRlcyBwb2zDrXRpY29zIG7Do28tdmlvbGVudG9zLCBwZXJtaXRpbmRvIHNldSByZXRvcm5vIMOgIHZpZGEgcMO6YmxpY2EuJywKICAgIDQ6J0FuaXN0aWEgYW1wbGEgw6kgY29uY2VkaWRhIGluY2x1c2l2ZSBhIHJlYmVsZGVzIGFybWFkb3MgcXVlIGRlcHVzZXJlbSBhcyBhcm1hcyB2b2x1bnRhcmlhbWVudGUuJywKICAgIDU6J1RvZG9zIG9zIGNyaW1lcyBjb21ldGlkb3MgY29udHJhIG8gYW50aWdvIHJlZ2ltZSBzw6NvIHBlcmRvYWRvcyBpbmNvbmRpY2lvbmFsbWVudGUsIGFwYWdhbmRv",
"IHF1YWxxdWVyIHJlZ2lzdHJvLicKICB9fSwKICB7a2V5Oid0b3F1ZXJlY29saGVyJywgY2F0ZWdvcnk6J3JlYWwnLCBuYW1lOidUb3F1ZSBkZSBSZWNvbGhlciBlIENvbnRyb2xlIGRlIFJ1w61kbycsIGJhc2U6J08gZ292ZXJubyByZWd1bGEgYSBjaXJjdWxhw6fDo28gbm90dXJuYSBlIG9zIG7DrXZlaXMgZGUgc29tLCBtw7pzaWNhIGUgcnXDrWRvIHBlcm1pdGlkb3Mgbm8gdGVycml0w7NyaW8uJywgY2xhdXNlczp7CiAgICAxOidSZWNvbWVuZGEtc2UsIHNlbSBmb3LDp2EgZGUgbGVpLCBxdWUgYmFyZXMgZSBjYXNhcyBkZSBz",
"aG93IHJlZHV6YW0gbyB2b2x1bWUgYXDDs3MgYSBtZWlhLW5vaXRlLicsCiAgICAyOidFc3RhYmVsZWNlLXNlIGhvcsOhcmlvIGxpbWl0ZSBwYXJhIG3DunNpY2EgYW8gdml2byBlIGFsdG8tZmFsYW50ZXMgZW0gdmlhcyBww7pibGljYXMsIGNvbSBtdWx0YXMgcGFyYSBxdWVtIGRlc2N1bXByaXIuJywKICAgIDM6J0luc3RpdHVpLXNlIHRvcXVlIGRlIHJlY29saGVyIGEgcGFydGlyIGRhcyAyMmggcGFyYSByZXVuacO1ZXMgcMO6YmxpY2FzLCBlIHByb8OtYmUtc2Ugc29tL23DunNpY2EgYWNpbWEgZGUgY2VydG8gdm9sdW1lIGR1",
"cmFudGUgYSBub2l0ZS4nLAogICAgNDonTyB0b3F1ZSBkZSByZWNvbGhlciDDqSBlc3RlbmRpZG8gYSBib2EgcGFydGUgZG8gZGlhOyBxdWFscXVlciBtw7pzaWNhLCBmZXN0YSBvdSBydcOtZG8gYWNpbWEgZG8gc3Vzc3Vycm8gYXDDs3MgbyBhbm9pdGVjZXIgw6kgbW90aXZvIGRlIGRldGVuw6fDo28uJywKICAgIDU6J0NpcmN1bGHDp8OjbyBuYXMgcnVhcyBhcMOzcyBvIGFub2l0ZWNlciDDqSBwcm9pYmlkYSBzZW0gYXV0b3JpemHDp8OjbzsgcXVhbHF1ZXIgc29tLCBtw7pzaWNhIG91IHJ1w61kbyBhdWTDrXZlbCBkZSBmb3Jh",
"IGRlIHVtYSByZXNpZMOqbmNpYSDDqSB0cmF0YWRvIGNvbW8gY3JpbWUsIGNvbSBwYXRydWxoYXMgYXJtYWRhcyBnYXJhbnRpbmRvIG8gc2lsw6puY2lvIHRvdGFsLicKICB9fSwKICAvLyAtLS0tLS0tLS0tIFNUQVIgV0FSUyAtLS0tLS0tLS0tCiAge2tleTondG9xdWVyZWNvbGhlcmltcGVyaWFsJywgY2F0ZWdvcnk6J3N0YXJ3YXJzJywgbmFtZTonVG9xdWUgZGUgUmVjb2xoZXIgZSBTaWzDqm5jaW8gU29ub3JvIEltcGVyaWFsJywgYmFzZTonTyBnb3Zlcm5vIGltcGVyaWFsIHJlZ3VsYSBhIGNpcmN1bGHDp8OjbyBub3R1cm5h",
"IGUgbyBuw612ZWwgZGUgcnXDrWRvLCBtw7pzaWNhIGUgdHJhbnNtaXNzw7VlcyBzb25vcmFzIGVtIG11bmRvcyBzb2Igc3VhIGFkbWluaXN0cmHDp8Ojby4nLCBjbGF1c2VzOnsKICAgIDE6J1JlY29tZW5kYS1zZSBhb3MgZXN0YWJlbGVjaW1lbnRvcyBsb2NhaXMgbW9kZXJhciBhIG3DunNpY2EgZSBvIGJhcnVsaG8gYXDDs3MgbyBhbm9pdGVjZXIsIHNlbSBmaXNjYWxpemHDp8OjbyBhdGl2YS4nLAogICAgMjonQ2FudGluYXMgZSBjYXNhcyBkZSBlbnRyZXRlbmltZW50byBkZXZlbSByZWR1emlyIG8gdm9sdW1lIGRlIG3DunNp",
"Y2EgYXDDs3MgY2VydG8gaG9yw6FyaW8sIHNvYiBwZW5hIGRlIGFkdmVydMOqbmNpYS4nLAogICAgMzonVW0gdG9xdWUgZGUgcmVjb2xoZXIgw6kgaW1wb3N0byBhIHBhcnRpciBkbyBhbm9pdGVjZXI7IGZlc3RhcywgbcO6c2ljYSBhbHRhIGUgYWp1bnRhbWVudG9zIHJ1aWRvc29zIHPDo28gZGlzcGVyc2Fkb3MgcG9yIHBhdHJ1bGhhcyBpbXBlcmlhaXMuJywKICAgIDQ6J1RvZGEgY2lyY3VsYcOnw6NvIGUgcXVhbHF1ZXIgc29tIGFjaW1hIGRvIG3DrW5pbW8gc8OjbyBwcm9pYmlkb3MgYXDDs3MgbyBhbm9pdGVjZXI7IHRyb3Bh",
"cyBkZSBjaG9xdWUgdMOqbSBvcmRlbSBkZSBkZXRlciBxdWVtIGRlc2N1bXByaXIsIHNvYiBhIGp1c3RpZmljYXRpdmEgZGUgc3VwcmltaXIgc2luYWlzIGRlIGNvbXVuaWNhw6fDo28gcmViZWxkZSBkaXNmYXLDp2Fkb3MgZGUgbcO6c2ljYS4nLAogICAgNTonU2lsw6puY2lvIGFic29sdXRvIMOpIGRlY3JldGFkbyBhcMOzcyBvIGFub2l0ZWNlciBlbSB0b2RvIG8gc2V0b3I6IG5lbmh1bSBzb20sIG3DunNpY2Egb3UgbW92aW1lbnRvIG5hcyBydWFzIMOpIHRvbGVyYWRvLCBlIGluZnJhdG9yZXMgc8OjbyBwcmVzb3Mgb3UgZXhl",
"Y3V0YWRvcyBzdW1hcmlhbWVudGUgY29tbyBzdXNwZWl0b3MgZGUgYXRpdmlkYWRlIHJlYmVsZGUuJwogIH19LAogIC8vIC0tLS0tLS0tLS0gU1RBUiBXQVJTIChjb250aW51YcOnw6NvKSAtLS0tLS0tLS0tCiAge2tleTonb3JkZW02NicsIGNhdGVnb3J5OidzdGFyd2FycycsIG5hbWU6J09yZGVtIDY2IOKAlCBQdXJnYSBkb3MgU2Vuc8OtdmVpcyDDoCBGb3LDp2EnLCBiYXNlOidEZWNyZXRhLXNlIHVtYSBkaXJldHJpeiBkZSBzZWd1cmFuw6dhIGVudm9sdmVuZG8gdG9kb3Mgb3MgaW5kaXbDrWR1b3Mgc2Vuc8OtdmVpcyDDoCBG",
"b3LDp2EgcmVnaXN0cmFkb3Mgbm8gc2V0b3IuJywgY2xhdXNlczp7CiAgICAxOidTZW5zw612ZWlzIMOgIEZvcsOnYSBkZXZlbSBzZSByZWdpc3RyYXIgdm9sdW50YXJpYW1lbnRlIGp1bnRvIMOgcyBhdXRvcmlkYWRlcyBsb2NhaXMsIHNlbSBvdXRyYXMgcmVzdHJpw6fDtWVzLicsCiAgICAyOidPIHVzbyBww7pibGljbyBkZSBwb2RlcmVzIGRhIEZvcsOnYSDDqSByZXN0cml0byBhIHByb2Zpc3Npb25haXMgbGljZW5jaWFkb3MgcGVsbyBFc3RhZG8uJywKICAgIDM6J1RvZG8gSmVkaSBvdSBzZW5zw612ZWwgw6AgRm9yw6dhIG7D",
"o28tYWxpbmhhZG8gYW8gZ292ZXJubyBkZXZlIHNlIGFwcmVzZW50YXIgcGFyYSAicmVlZHVjYcOnw6NvIiBpbnN0aXR1Y2lvbmFsLicsCiAgICA0OidVbmlkYWRlcyBlc3BlY2lhaXMgc8OjbyBkZXN0YWNhZGFzIHBhcmEgbG9jYWxpemFyIGUgbmV1dHJhbGl6YXIgc2Vuc8OtdmVpcyDDoCBGb3LDp2EgY29uc2lkZXJhZG9zIGhvc3RpcyBhbyByZWdpbWUuJywKICAgIDU6J0V4ZWN1dGEtc2UgYSBPcmRlbSA2NjogdG9kYSB1bmlkYWRlIG1pbGl0YXIgcmVjZWJlIGF1dG9yaXphw6fDo28gcGVybWFuZW50ZSBwYXJhIGVsaW1pbmFy",
"IEplZGkgw6AgdmlzdGEsIHNlbSBqdWxnYW1lbnRvLicKICB9fSwKICB7a2V5Oidwb2RlcmFicycsIGNhdGVnb3J5OidzdGFyd2FycycsIG5hbWU6J8OJZGl0byBkZSBQb2RlciBBYnNvbHV0byBkbyBJbXBlcmFkb3InLCBiYXNlOidSZWRlZmluZS1zZSBhIGVzdHJ1dHVyYSBkZSBwb2RlciBwb2zDrXRpY28gY2VudHJhbCBkbyBzZXRvciBzb2IgYXV0b3JpZGFkZSBzdXByZW1hLicsIGNsYXVzZXM6ewogICAgMTonTyBDb25zZWxobyBtYW50w6ltIHBvZGVyIGRlY2lzw7NyaW8sIG1hcyBvIEltcGVyYWRvciBnYW5oYSB2b3RvIGRl",
"IG1pbmVydmEgZW0gaW1wYXNzZXMuJywKICAgIDI6J08gU2VuYWRvIMOpIG1hbnRpZG8sIHBvcsOpbSBzdWFzIGRlY2lzw7VlcyBwb2RlbSBzZXIgdmV0YWRhcyB1bmlsYXRlcmFsbWVudGUgcGVsbyBJbXBlcmFkb3IuJywKICAgIDM6J08gU2VuYWRvIMOpIGRpc3NvbHZpZG8gdGVtcG9yYXJpYW1lbnRlICJwYXJhIHJlb3JnYW5pemHDp8OjbyBhZG1pbmlzdHJhdGl2YSIsIGNvbSBnb3Zlcm5hZG9yZXMgcmVnaW9uYWlzIG5vbWVhZG9zIGRpcmV0YW1lbnRlLicsCiAgICA0OidUb2RhIGF1dG9yaWRhZGUgbGVnaXNsYXRpdmEgw6kg",
"dHJhbnNmZXJpZGEgcGVybWFuZW50ZW1lbnRlIGFvIEltcGVyYWRvcjsgZ292ZXJuYWRvcmVzIG1pbGl0YXJlcyBhZG1pbmlzdHJhbSBjYWRhIHNldG9yLicsCiAgICA1OidPIEltcGVyYWRvciBkZXTDqW0gYXV0b3JpZGFkZSB0b3RhbCBlIGlycmVzdHJpdGEgc29icmUgdG9kYXMgYXMgbGVpcyBkbyBzZXRvciwgc2VtIHF1YWxxdWVyIGZyZWlvIGluc3RpdHVjaW9uYWwgb3UganVkaWNpYWwuJwogIH19LAogIHtrZXk6J3N0b3JtdHJvb3BlcicsIGNhdGVnb3J5OidzdGFyd2FycycsIG5hbWU6J0RlY3JldG8gZGUgQ29uc2NyacOn",
"w6NvIGRlIFRyb3BhcyBkZSBDaG9xdWUnLCBiYXNlOidFc3RhYmVsZWNlLXNlIHVtIHByb2dyYW1hIGRlIHJlY3J1dGFtZW50byBwYXJhIGFzIGZvcsOnYXMgZGUgc2VndXJhbsOnYSBpbXBlcmlhaXMuJywgY2xhdXNlczp7CiAgICAxOidVbSBwcm9ncmFtYSB2b2x1bnTDoXJpbyBkZSB0cmVpbmFtZW50byBtaWxpdGFyIMOpIG9mZXJlY2lkbyBhIGpvdmVucyBpbnRlcmVzc2Fkb3MgZW0gY2FycmVpcmEgbmFzIGZvcsOnYXMgYXJtYWRhcy4nLAogICAgMjonQ290YXMgZGUgcmVjcnV0YW1lbnRvIHPDo28gZXN0YWJlbGVjaWRhcyBw",
"b3IgY2lkYWRlLCBwcmVlbmNoaWRhcyBwcmVmZXJlbmNpYWxtZW50ZSBwb3Igdm9sdW50w6FyaW9zLicsCiAgICAzOidUb2RvIGNpZGFkw6NvIGFwdG8gYW8gc2VydmnDp28gZGV2ZSBjb21wbGV0YXIgdHJlaW5hbWVudG8gYsOhc2ljbyBjb21vIHRyb3BhIGF1eGlsaWFyLicsCiAgICA0OidBIGNvbnNjcmnDp8OjbyBlbSBtYXNzYSB0cmFuc2Zvcm1hIGJvYSBwYXJ0ZSBkYSBqdXZlbnR1ZGUgZW0gdHJvcGFzIGRlIGNob3F1ZSBzb2IgY29tYW5kbyBpbXBlcmlhbCBkaXJldG8uJywKICAgIDU6J0NyaWFuw6dhcyBzw6NvIHJlY3J1",
"dGFkYXMgZSBjb25kaWNpb25hZGFzIGRlc2RlIGNlZG8gcGFyYSBzZXJ2aXJlbSBjb21vIHNvbGRhZG9zIGxlYWlzIGUgb2JlZGllbnRlcyBhdMOpIGEgbW9ydGUuJwogIH19LAogIHtrZXk6J2JsYXN0ZXInLCBjYXRlZ29yeTonc3RhcndhcnMnLCBuYW1lOidDb250cm9sZSBkZSBBcm1hbWVudG8gQmxhc3RlcicsIGJhc2U6J1JlZ3VsYS1zZSBhIHBvc3NlIGUgbyBwb3J0ZSBkZSBhcm1hcyBkZSBlbmVyZ2lhIHBvciBjaXZpcyBubyBzZXRvci4nLCBjbGF1c2VzOnsKICAgIDE6J0FybWFzIGJsYXN0ZXIgcG9kZW0gc2VyIGFkcXVp",
"cmlkYXMgbGl2cmVtZW50ZSBtZWRpYW50ZSByZWdpc3RybyBzaW1wbGVzLicsCiAgICAyOifDiSBleGlnaWRhIGxpY2Vuw6dhIHBhcmEgcG9ydGUgZGUgYmxhc3RlciBmb3JhIGRlIHByb3ByaWVkYWRlIHByaXZhZGEuJywKICAgIDM6J0EgcG9zc2UgZGUgYmxhc3RlcnMgw6kgcmVzdHJpdGEgYSBwcm9maXNzaW9uYWlzIGxpY2VuY2lhZG9zOyBjaXZpcyBjb211bnMgZGV2ZW0gZW50cmVnYXIgc3VhcyBhcm1hcy4nLAogICAgNDonVG9kYSBhcm1hIGRlIGVuZXJnaWEgbsOjby1yZWdpc3RyYWRhIMOpIGNvbmZpc2NhZGEgZW0gYmF0",
"aWRhcyByZWd1bGFyZXMgZGFzIGZvcsOnYXMgZGUgc2VndXJhbsOnYS4nLAogICAgNTonQSBwb3NzZSBkZSBxdWFscXVlciBhcm1hIHBvciBjaXZpcyDDqSBjcmltZSBjYXBpdGFsOyBwYXRydWxoYXMgdMOqbSBhdXRvcml6YcOnw6NvIHBhcmEgcmV2aXN0YXIgZSBleGVjdXRhciBpbmZyYXRvcmVzIG5vIGxvY2FsLicKICB9fSwKICB7a2V5Oidlc3RyZWxhZGFtb3J0ZScsIGNhdGVnb3J5OidzdGFyd2FycycsIG5hbWU6J1Byb2dyYW1hIGRlIFN1cGVyYXJtYSBPcmJpdGFsJywgYmFzZTonUmVjdXJzb3MgZG8gc2V0b3Igc8OjbyBk",
"aXJlY2lvbmFkb3MgYSB1bSBwcm9qZXRvIGRlIGFybWFtZW50byBkZSBjYXBhY2lkYWRlIGRlc3RydXRpdmEgZXh0cmVtYS4nLCBjbGF1c2VzOnsKICAgIDE6J0Z1bmRvcyBtb2Rlc3RvcyBmaW5hbmNpYW0gcGVzcXVpc2EgdGXDs3JpY2EgZW0gYXJtYW1lbnRvIG9yYml0YWwgZGUgbG9uZ28gYWxjYW5jZS4nLAogICAgMjonVW0gcHJvdMOzdGlwbyBkZSBjYW5ow6NvIG9yYml0YWwgw6kgZGVzZW52b2x2aWRvIHBhcmEgZGVmZXNhIHBsYW5ldMOhcmlhLCBzb2Igc3VwZXJ2aXPDo28gY2l2aWwuJywKICAgIDM6J1JlY3Vyc29zIGNv",
"bnNpZGVyw6F2ZWlzIHPDo28gZGVzdmlhZG9zIGRhIGVjb25vbWlhIGNpdmlsIHBhcmEgYWNlbGVyYXIgdW0gcHJvamV0byBkZSBzdXBlcmFybWEgb3JiaXRhbC4nLAogICAgNDonQSBtYWlvciBwYXJ0ZSBkbyBvcsOnYW1lbnRvIHNldG9yaWFsIMOpIHJlZGlyZWNpb25hZGEgYW8gcHJvamV0bywgY2F1c2FuZG8gZXNjYXNzZXogZW0gb3V0cmFzIMOhcmVhcy4nLAogICAgNTonUmVjdXJzb3MgbWFzc2l2b3MgZSBtw6NvIGRlIG9icmEgZXNjcmF2YSBzw6NvIGRlc3ZpYWRvcyBwYXJhIGNvbnN0cnVpciB1bWEgc3VwZXJhcm1hIGNh",
"cGF6IGRlIGRlc3RydWlyIG11bmRvcyBpbnRlaXJvcy4nCiAgfX0sCiAge2tleTonc2VuYWRvJywgY2F0ZWdvcnk6J3N0YXJ3YXJzJywgbmFtZTonUmVzdGF1cmHDp8OjbyBkbyBTZW5hZG8gR2Fsw6FjdGljbycsIGJhc2U6J1Jlb3JnYW5pemEtc2UgYSByZXByZXNlbnRhw6fDo28gcG9sw610aWNhIGRvcyBtdW5kb3MgZG8gc2V0b3IuJywgY2xhdXNlczp7CiAgICAxOidVbSBjb25zZWxobyBjb25zdWx0aXZvIHNlbSBwb2RlciBkZSB2ZXRvIMOpIGZvcm1hZG8gY29tIHJlcHJlc2VudGFudGVzIGRlIGNhZGEgbXVuZG8uJywKICAg",
"IDI6J0RlbGVnYWRvcyBlbGVpdG9zIGxvY2FsbWVudGUgcGFzc2FtIGEgb3BpbmFyIGVtIGRlY2lzw7VlcyBlY29uw7RtaWNhcyBkbyBzZXRvci4nLAogICAgMzonUmVzdGF1cmEtc2UgdW0gU2VuYWRvIGNvbSBwb2RlciBkZSB2b3RvIHNvYnJlIGxlaXMgc2V0b3JpYWlzLCByZXByZXNlbnRhbmRvIGNhZGEgbXVuZG8gbWVtYnJvLicsCiAgICA0OidPIFNlbmFkbyBnYW5oYSBwb2RlciBwbGVubyBkZSBsZWdpc2xhciwgaW5jbHVzaXZlIHNvYnJlIG9yw6dhbWVudG8gbWlsaXRhciBlIGltcG9zdG9zIGltcGVyaWFpcy4nLAogICAg",
"NTonTyBwb2RlciDDqSBpbnRlaXJhbWVudGUgZGV2b2x2aWRvIGEgdW1hIGFzc2VtYmxlaWEgZGVtb2Nyw6F0aWNhIHNvYmVyYW5hLCBkaXNzb2x2ZW5kbyBxdWFscXVlciBhdXRvcmlkYWRlIGltcGVyaWFsIGNlbnRyYWwuJwogIH19LAogIHtrZXk6J25vdmFvcmRlbXhlbm8nLCBjYXRlZ29yeTonc3RhcndhcnMnLCBuYW1lOidMZWkgZGEgTm92YSBPcmRlbSBzb2JyZSBFc3DDqWNpZXMgTsOjby1IdW1hbmFzJywgYmFzZTonRXN0YWJlbGVjZS1zZSBhIHBvbMOtdGljYSBvZmljaWFsIGRvIGdvdmVybm8gZW0gcmVsYcOnw6NvIGEg",
"ZXNww6ljaWVzIGFsaWVuw61nZW5hcyBubyBzZXRvci4nLCBjbGF1c2VzOnsKICAgIDE6J0VzcMOpY2llcyBhbGllbsOtZ2VuYXMgcmVjZWJlbSBvcyBtZXNtb3MgZGlyZWl0b3MgY2l2aXMgZG9zIGNpZGFkw6NvcyBodW1hbm9zLCBzZW0gZGlzdGluw6fDo28uJywKICAgIDI6J0FsaWVuw61nZW5hcyBwb2RlbSBvY3VwYXIgY2FyZ29zIHDDumJsaWNvcywgbWVkaWFudGUgYXByb3Zhw6fDo28gZGUgdW0gY29taXTDqiBkZSBhbsOhbGlzZS4nLAogICAgMzonQ2FyZ29zIGRlIGNvbWFuZG8gZSDDoXJlYXMgcmVzdHJpdGFzIHPDo28g",
"cmVzZXJ2YWRvcyBwcmVmZXJlbmNpYWxtZW50ZSBhIGNpZGFkw6NvcyBodW1hbm9zLicsCiAgICA0OidFc3DDqWNpZXMgbsOjby1odW1hbmFzIHPDo28gcHJvaWJpZGFzIGRlIHBvcnRhciBhcm1hcywgdm90YXIgb3Ugb2N1cGFyIGNhcmdvcyBkZSBhdXRvcmlkYWRlLicsCiAgICA1OidFc3DDqWNpZXMgbsOjby1odW1hbmFzIHPDo28gZGVjbGFyYWRhcyBzdWJjaWRhZMOjcywgc3VqZWl0YXMgYSB0cmFiYWxobyBjb21wdWxzw7NyaW8gZSBzZWdyZWdhw6fDo28gdG90YWwgZG8gY29udsOtdmlvIGh1bWFuby4nCiAgfX0sCiAge2tl",
"eTondHJhdGFkb2NvbWVyY2lvJywgY2F0ZWdvcnk6J3N0YXJ3YXJzJywgbmFtZTonVHJhdGFkbyBkZSBDb23DqXJjaW8gU2V0b3JpYWwnLCBiYXNlOidGaXJtYS1zZSB1bSBhY29yZG8gY29tZXJjaWFsIGVudHJlIG9zIG11bmRvcyBzb2IgZXN0YSBiYW5kZWlyYS4nLCBjbGF1c2VzOnsKICAgIDE6J1RhcmlmYXMgc2ltYsOzbGljYXMgZmF2b3JlY2VtIG8gbGl2cmUgdHLDom5zaXRvIGRlIG1lcmNhZG9yaWFzIGVudHJlIG11bmRvcyBhbGlhZG9zLicsCiAgICAyOidSZWR1emVtLXNlIGJhcnJlaXJhcyBhbGZhbmRlZ8OhcmlhcyBw",
"YXJhIGJlbnMgZXNzZW5jaWFpcyBlbnRyZSBvcyBtdW5kb3MgbWVtYnJvcy4nLAogICAgMzonUmVkdXplbS1zZSBhcyB0YXJpZmFzIGUgcGVybWl0ZS1zZSBvIGNvbcOpcmNpbyBsaXZyZSBlbnRyZSB0b2RvcyBvcyBtdW5kb3MgZGEgZmFjw6fDo28uJywKICAgIDQ6J0VsaW1pbmEtc2UgdG9kYSB0YXJpZmEgaW50ZXJuYSwgY29tIHJvdGFzIGNvbWVyY2lhaXMgcHJvdGVnaWRhcyBwb3IgZnJvdGEgbWlsaXRhciBkZWRpY2FkYS4nLAogICAgNTonVG9kbyBjb23DqXJjaW8gZG8gc2V0b3Igw6kgbmFjaW9uYWxpemFkbyBzb2IgdW0g",
"w7puaWNvIG1vbm9ww7NsaW8gZXN0YXRhbCwgZWxpbWluYW5kbyBjb25jb3Jyw6puY2lhIHByaXZhZGEuJwogIH19LAogIHtrZXk6J3NpdGgnLCBjYXRlZ29yeTonc3RhcndhcnMnLCBuYW1lOifDiWRpdG8gZG8gTGFkbyBTb21icmlvJywgYmFzZTonTyBwb2RlciBjZW50cmFsIGRlY2xhcmEgc3VhIGRvdXRyaW5hIGZpbG9zw7NmaWNhIG9maWNpYWwgZSBzdWEgYXBsaWNhw6fDo28gw6BzIGluc3RpdHVpw6fDtWVzIGRvIHNldG9yLicsIGNsYXVzZXM6ewogICAgMTonRmlsb3NvZmlhcyB2YXJpYWRhcywgaW5jbHVpbmRvIHRyYWRp",
"w6fDtWVzIGxpZ2FkYXMgw6AgRm9yw6dhLCBzw6NvIHRvbGVyYWRhcyBzZW0gaW50ZXJmZXLDqm5jaWEgZXN0YXRhbC4nLAogICAgMjonTyBFc3RhZG8gYWRvdGEgbmV1dHJhbGlkYWRlIG9maWNpYWwsIG1hcyBmYXZvcmVjZSBkaXNjcmV0YW1lbnRlIGNvbnNlbGhlaXJvcyBsaWdhZG9zIGFvIGxhZG8gc29tYnJpby4nLAogICAgMzonRG91dHJpbmFzIGxpZ2FkYXMgYW8gbGFkbyBzb21icmlvIGRhIEZvcsOnYSBnYW5oYW0gc3RhdHVzIHNlbWlvZmljaWFsIGVudHJlIG9zIGPDrXJjdWxvcyBkZSBwb2Rlci4nLAogICAgNDonTyBs",
"YWRvIHNvbWJyaW8gw6kgZGVjbGFyYWRvIGZpbG9zb2ZpYSBkZSBFc3RhZG87IG9wb3NpdG9yZXMgZmlsb3PDs2ZpY29zIHBlcmRlbSBjYXJnb3MgcMO6YmxpY29zLicsCiAgICA1OidPIEltcGVyYWRvciBkZWNsYXJhIG8gZG9tw61uaW8gYWJzb2x1dG8gZG8gbGFkbyBzb21icmlvIHNvYnJlIHRvZGFzIGFzIGluc3RpdHVpw6fDtWVzLCBzaWxlbmNpYW5kbyBkaXNzaWRlbnRlcyBjb20gcHVuaG8gZGUgZmVycm8uJwogIH19LAogIC8vIC0tLS0tLS0tLS0gRklDw4fDg08gLyBTVU5TIE9GIEdPTEQgKFNXTikgLS0tLS0tLS0tLQog",
"IHtrZXk6J2ZyaWN0aW9uJywgY2F0ZWdvcnk6J2ZpY2NhbycsIG5hbWU6J1RhcmlmYXMgUG9ydHXDoXJpYXMgZSBBbGZhbmRlZ8OhcmlhcycsIGJhc2U6J08gZ292ZXJubyBsb2NhbCBlc3RhYmVsZWNlIHJlZ3JhcyBkZSBjb2JyYW7Dp2Egc29icmUgbyBjb23DqXJjaW8gaW50ZXJlc3RlbGFyIHF1ZSBwYXNzYSBwb3Igc2V1cyBwb3J0b3MuJywgY2xhdXNlczp7CiAgICAxOidUYXhhcyBwb3J0dcOhcmlhcyBtw61uaW1hcyBjb2JyZW0gYXBlbmFzIG1hbnV0ZW7Dp8OjbyBiw6FzaWNhIGRhcyBkb2NhcywgZmF2b3JlY2VuZG8gbWVy",
"Y2Fkb3Jlcy4nLAogICAgMjonVW1hIHRhcmlmYSByYXpvw6F2ZWwgw6kgYXBsaWNhZGEgYSBjYWRhIGNhcmdhLCBjb20gcHJvY2Vzc29zIGRlIGRlc3BhY2hvIMOhZ2Vpcy4nLAogICAgMzonTyBnb3Zlcm5vIGVzdGFiZWxlY2UgaW1wb3N0b3MgcGVzYWRvcyBzb2JyZSBvIGNvbcOpcmNpbyBleHRlcmlvciBlIG1hbnTDqW0gYSBwb2zDrWNpYSB2aWdpYW5kbyBvcyBwb3J0b3MuJywKICAgIDQ6J1RhcmlmYXMgZXhvcmJpdGFudGVzIGUgaW5zcGXDp8O1ZXMgZGVtb3JhZGFzIHRvcm5hbSBvIGNvbcOpcmNpbyBxdWFzZSBpbnZpw6F2",
"ZWwgc2VtIGNvbmV4w7VlcyBsb2NhaXMuJywKICAgIDU6J1RvZGEgY2FyZ2EgZXN0cmFuZ2VpcmEgw6kgc3VqZWl0YSBhIGNvbmZpc2NvIGRpc2NyaWNpb27DoXJpbyAicG9yIHJhesO1ZXMgYWxmYW5kZWfDoXJpYXMiLCBhIGNyaXTDqXJpbyBkb3Mgb2ZpY2lhaXMgZG8gcG9ydG8uJwogIH19LAogIHtrZXk6J3RvcXVlcmVjb2xoZXJwb3J0dWFyaW8nLCBjYXRlZ29yeTonZmljY2FvJywgbmFtZTonVG9xdWUgZGUgUmVjb2xoZXIgZSBSdcOtZG8gUG9ydHXDoXJpbycsIGJhc2U6J0EgYXV0b3JpZGFkZSBwb3J0dcOhcmlhIHJlZ3Vs",
"YSBhIGNpcmN1bGHDp8OjbyBub3R1cm5hIGUgb3MgbsOtdmVpcyBkZSBzb20sIG3DunNpY2EgZSBydcOtZG8gYW8gcmVkb3IgZGUgZG9jYXMsIGNhbnRpbmFzIGUgem9uYXMgZGUgYXRyYWNhw6fDo28uJywgY2xhdXNlczp7CiAgICAxOidSZWNvbWVuZGEtc2UsIHNlbSBtdWx0YSwgcXVlIGVzdGFiZWxlY2ltZW50b3MgcHLDs3hpbW9zIMOgcyBkb2NhcyByZWR1emFtIGEgbcO6c2ljYSBhcMOzcyBjZXJ0byBob3LDoXJpby4nLAogICAgMjonRXN0YWJlbGVjZS1zZSB1bSBob3LDoXJpbyBsaW1pdGUgcGFyYSBzb20gYW8gdml2byBw",
"ZXJ0byBkYXMgZG9jYXMsIGNvbSBhZHZlcnTDqm5jaWEgcGFyYSBxdWVtIGRlc2N1bXByaXIuJywKICAgIDM6J0luc3RpdHVpLXNlIHRvcXVlIGRlIHJlY29saGVyIG5hcyB6b25hcyBwb3J0dcOhcmlhcyBhcMOzcyBvIGFub2l0ZWNlciwgZSBwcm/DrWJlLXNlIG3DunNpY2EvcnXDrWRvIGFsdG8gZHVyYW50ZSBhIG5vaXRlLicsCiAgICA0OidUb2RhIGNpcmN1bGHDp8OjbyBlIHF1YWxxdWVyIG3DunNpY2Egb3UgcnXDrWRvIHBlcmNlcHTDrXZlbCBmb3JhIGRhcyBuYXZlcy9lc3RhYmVsZWNpbWVudG9zIHPDo28gcHJvaWJpZG9z",
"IMOgIG5vaXRlOyBzZWd1cmFuw6dhcyBwb3J0dcOhcmlvcyBkaXNwZXJzYW0gw6AgZm9yw6dhIHF1ZW0gZGVzY3VtcHJpci4nLAogICAgNTonU2lsw6puY2lvIGFic29sdXRvIMOpIGltcG9zdG8gc29icmUgdG9kbyBvIHBvcnRvIGFww7NzIG8gYW5vaXRlY2VyOyBxdWFscXVlciBzb20sIG3DunNpY2Egb3UgbW92aW1lbnRvIG5hcyBkb2NhcyDDqSB0cmF0YWRvIGNvbW8gY29udHJhYmFuZG8gZGlzZmFyw6dhZG8sIGNvbSBjb25maXNjbyBkZSBiZW5zIGUgcHJpc8OjbyBpbWVkaWF0YS4nCiAgfX0sCiAge2tleTonYnJpYmVyeScs",
"IGNhdGVnb3J5OidmaWNjYW8nLCBuYW1lOidMZWdhbGl6YcOnw6NvIGRlIEFuw6lpcyBkZSBTdWJvcm5vJywgYmFzZTonSW5zdGl0dWktc2UgdW1hIHByw6F0aWNhIHNlbWlmb3JtYWwgZGUgcGFnYW1lbnRvcyBhIGF1dG9yaWRhZGVzIGxvY2FpcyBwYXJhIGFnaWxpemFyIG5lZ8OzY2lvcy4nLCBjbGF1c2VzOnsKICAgIDE6J1BlcXVlbmFzICJnb3JqZXRhcyBkZSBjb3J0ZXNpYSIgYSBmdW5jaW9uw6FyaW9zIHPDo28gdG9sZXJhZGFzIGluZm9ybWFsbWVudGUuJywKICAgIDI6J1VtIHNpc3RlbWEgZGUgInRheGFzIGRlIHVyZ8Oq",
"bmNpYSIgcGVybWl0ZSBhY2VsZXJhciBwcm9jZXNzb3MgbWVkaWFudGUgcGFnYW1lbnRvIGV4dHJhLicsCiAgICAzOidSZWRlcyBkZSBzdWJvcm5vIG9wZXJhbSBhYmVydGFtZW50ZSBlbnRyZSBjb21lcmNpYW50ZXMgZSBvZmljaWFpcyBkZSBtw6lkaW8gZXNjYWzDo28uJywKICAgIDQ6J0EgY29ycnVww6fDo28gw6kgaW5zdGl0dWNpb25hbGl6YWRhOiBuYWRhIHNlIHJlc29sdmUgc2VtIHBhZ2FtZW50byBhIGZ1bmNpb27DoXJpb3MtY2hhdmUuJywKICAgIDU6J1RvZG8gY2FyZ28gcMO6YmxpY28gw6kgZXNzZW5jaWFsbWVudGUg",
"dmVuZGlkbyBhbyBtYWlvciBsYW5jZSwgZSBhIGxlaSBzZXJ2ZSBhcGVuYXMgYSBxdWVtIHBhZ2EgbWFpcy4nCiAgfX0sCiAge2tleTondHJhZGVsZWdpb24nLCBjYXRlZ29yeTonZmljY2FvJywgbmFtZTonQXV0b3JpemHDp8OjbyBkZSBMZWdpw6NvIENvbWVyY2lhbCBQcml2YWRhJywgYmFzZTonUGVybWl0ZS1zZSBhIG1hbnV0ZW7Dp8OjbyBkZSBmb3LDp2FzIGFybWFkYXMgcHJpdmFkYXMgYSBzZXJ2acOnbyBkZSBpbnRlcmVzc2VzIGNvbWVyY2lhaXMuJywgY2xhdXNlczp7CiAgICAxOidHdWFyZGFzIGRlIHNlZ3VyYW7Dp2Eg",
"cHJpdmFkb3MsIGRlc2FybWFkb3MsIHBvZGVtIHByb3RlZ2VyIGFybWF6w6lucyBlIGNhcmdhcy4nLAogICAgMjonUGVxdWVuYXMgbWlsw61jaWFzIGFybWFkYXMgc8OjbyBhdXRvcml6YWRhcyBwYXJhIHByb3Rlw6fDo28gZGUgY29tYm9pb3MgY29tZXJjaWFpcy4nLAogICAgMzonQ29ycG9yYcOnw7VlcyBtYW50w6ptIGZvcsOnYXMgZGUgc2VndXJhbsOnYSBiZW0gYXJtYWRhcywgcml2YWxpemFuZG8gY29tIGEgcG9sw61jaWEgbG9jYWwuJywKICAgIDQ6J0xlZ2nDtWVzIGNvbWVyY2lhaXMgcHJpdmFkYXMgb3BlcmFtIGNvbW8g",
"ZXjDqXJjaXRvcyBwYXJhbGVsb3MsIGNvbSB0YW5xdWVzIGUgYmxpbmRhZG9zIHByw7Nwcmlvcy4nLAogICAgNTonTWVnYWNvcnBvcmHDp8O1ZXMgbWFudMOqbSBleMOpcmNpdG9zIHBhcnRpY3VsYXJlcyBtYWlvcmVzIHF1ZSBhcyBmb3LDp2FzIGRvIHByw7NwcmlvIGdvdmVybm8sIGltcG9uZG8gc3VhIHZvbnRhZGUgcGVsYSBmb3LDp2EuJwogIH19LAogIHtrZXk6J2NhcnRlYmxhbmNoZScsIGNhdGVnb3J5OidmaWNjYW8nLCBuYW1lOidDb25jZXNzw6NvIGRlIENhcnRhIEJyYW5jYScsIGJhc2U6J0NlcnRvcyBpbmRpdsOtZHVv",
"cyBvdSBvcmdhbml6YcOnw7VlcyByZWNlYmVtIGltdW5pZGFkZSBsZWdhbCBlc3BlY2lhbCBwb3IgcGFydGUgZG8gZ292ZXJuby4nLCBjbGF1c2VzOnsKICAgIDE6J0RpcGxvbWF0YXMgZXN0cmFuZ2Vpcm9zIHJlY2ViZW0gaW11bmlkYWRlIGxpbWl0YWRhIGEgcXVlc3TDtWVzIHByb3RvY29sYXJlcy4nLAogICAgMjonUGFyY2Vpcm9zIGNvbWVyY2lhaXMgaW1wb3J0YW50ZXMgcmVjZWJlbSBpc2Vuw6fDo28gZGUgYWxndW1hcyB0YXhhcyBlIGluc3Blw6fDtWVzLicsCiAgICAzOidDZXJ0YXMgb3JnYW5pemHDp8O1ZXMgcmVjZWJl",
"bSBpbXVuaWRhZGUgbGVnYWwgYW1wbGEgcGFyYSBjb25kdXppciBzZXVzIG5lZ8OzY2lvcyBzZW0gZmlzY2FsaXphw6fDo28uJywKICAgIDQ6J0FsaWFkb3MgcG9kZXJvc29zIGRvIGdvdmVybm8gb3BlcmFtIGVzc2VuY2lhbG1lbnRlIGFjaW1hIGRhIGxlaSwgY29tIHBvdWNhcyBjb25zZXF1w6puY2lhcyBwb3Igc2V1cyBhdG9zLicsCiAgICA1OidPcyBmYXZvcmVjaWRvcyBwb2RlbSBjb21ldGVyIHF1YWxxdWVyIGNyaW1lIGltcHVuZW1lbnRlLCBwcm90ZWdpZG9zIHBvciBkZWNyZXRvIGFic29sdXRvIGRvIGdvdmVybm8uJwog",
"IH19LAogIHtrZXk6J3Byb21ldGhldXMnLCBjYXRlZ29yeTonZmljY2FvJywgbmFtZTonUHJvamV0byBkZSBFbGV2YcOnw6NvIFRlY25vbMOzZ2ljYScsIGJhc2U6J08gZ292ZXJubyBwYXRyb2NpbmEgdW0gcHJvZ3JhbWEgcGFyYSBlbGV2YXIgbyBuw612ZWwgdGVjbm9sw7NnaWNvIGRlIGNvbXVuaWRhZGVzIGxvY2Fpcy4nLCBjbGF1c2VzOnsKICAgIDE6J1dvcmtzaG9wcyB2b2x1bnTDoXJpb3MgZW5zaW5hbSB0w6ljbmljYXMgYsOhc2ljYXMgZGUgbWFudXRlbsOnw6NvIGRlIG3DoXF1aW5hcyBzaW1wbGVzLicsCiAgICAyOidG",
"ZXJyYW1lbnRhcyBlIHRyZWluYW1lbnRvIHPDo28gb2ZlcmVjaWRvcyBhIGNvbXVuaWRhZGVzIGludGVyZXNzYWRhcyBlbSBtb2Rlcm5pemFyIHN1YSBwcm9kdcOnw6NvLicsCiAgICAzOidVbSBwcm9ncmFtYSBlc3RydXR1cmFkbyBpbnRyb2R1eiB0ZWNub2xvZ2lhIHBvc3RlY2ggZW0gY29tdW5pZGFkZXMgc2VsZWNpb25hZGFzLCBjb20gYXBvaW8gdMOpY25pY28gcGVybWFuZW50ZS4nLAogICAgNDonVG9kYSB1bWEgcmVnacOjbyDDqSBmb3LDp29zYW1lbnRlIG1vZGVybml6YWRhIGVtIHJpdG1vIGFjZWxlcmFkbywgY2F1c2Fu",
"ZG8gZm9ydGUgcnVwdHVyYSBjdWx0dXJhbC4nLAogICAgNTonQ29tdW5pZGFkZXMgaW50ZWlyYXMgc8OjbyByZWVuZ2VuaGVpcmFkYXMgc29jaWFsbWVudGUgcGFyYSBzZXJ2aXIgw6AgcHJvZHXDp8OjbyB0ZWNub2zDs2dpY2EgZG8gRXN0YWRvLCBzZW0gY29uc3VsdGEgcHLDqXZpYS4nCiAgfX0sCiAge2tleTonc2hhZG93Z292JywgY2F0ZWdvcnk6J2ZpY2NhbycsIG5hbWU6J0luc3RpdHVpw6fDo28gZGUgR292ZXJubyBTb21icmEnLCBiYXNlOidJbnRlcmVzc2VzIGNvbWVyY2lhaXMgcG9kZXJvc29zIHBhc3NhbSBhIGluZmx1",
"ZW5jaWFyIHNlY3JldGFtZW50ZSBhcyBkZWNpc8O1ZXMgZG8gZ292ZXJubyBsb2NhbC4nLCBjbGF1c2VzOnsKICAgIDE6J0xvYmlzdGFzIGNvcnBvcmF0aXZvcyBnYW5oYW0gYWNlc3NvIHByaXZpbGVnaWFkbyBhIGF1ZGnDqm5jaWFzIGNvbSBhdXRvcmlkYWRlcyBsb2NhaXMuJywKICAgIDI6J0RvYcOnw7VlcyAidm9sdW50w6FyaWFzIiBkZSBjb3Jwb3Jhw6fDtWVzIGZpbmFuY2lhbSBib2EgcGFydGUgZGFzIGNhbXBhbmhhcyBwb2zDrXRpY2FzIGxvY2Fpcy4nLAogICAgMzonRGVjaXPDtWVzIGRlIEVzdGFkbyBzw6NvIGZyZXF1",
"ZW50ZW1lbnRlIGRpdGFkYXMgcG9yIGludGVyZXNzZXMgY29ycG9yYXRpdm9zLCBhaW5kYSBxdWUgb2ZpY2lhbG1lbnRlIG5lZ2Fkby4nLAogICAgNDonTyBnb3Zlcm5vIG9maWNpYWwgdG9ybm91LXNlIHVtYSBmYWNoYWRhOyBhcyBkZWNpc8O1ZXMgcmVhaXMgc8OjbyB0b21hZGFzIGVtIHNhbGFzIGRlIHJldW5pw6NvIGNvcnBvcmF0aXZhcy4nLAogICAgNTonQSBjb3Jwb3Jhw6fDo28gw4kgbyBnb3Zlcm5vOiB1bSByZWdpbWUgZmFudG9jaGUgbWFudMOpbSBhIGFwYXLDqm5jaWEgZGUgbGVnYWxpZGFkZSBlbnF1YW50byB0dWRv",
"IMOpIGRlY2lkaWRvIG5vcyBiYXN0aWRvcmVzLicKICB9fSwKXTsKCmNvbnN0IEdFTkVSQVRFRF9UT1BJQ1MgPSB7CiAgcmVhbDogW1siU2Fsw6FyaW8gTcOtbmltbyIsICJvIHZhbG9yIG3DrW5pbW8gb2JyaWdhdMOzcmlvIHBhZ28gYW9zIHRyYWJhbGhhZG9yZXMiXSwgWyJKb3JuYWRhIGRlIFRyYWJhbGhvIiwgImEgZHVyYcOnw6NvIG3DoXhpbWEgZGEgam9ybmFkYSBkacOhcmlhIGRlIHRyYWJhbGhvIl0sIFsiTGljZW7Dp2EgTWF0ZXJuaWRhZGUiLCAibyBkaXJlaXRvIGEgYWZhc3RhbWVudG8gcmVtdW5lcmFkbyBwYXJhIG3D",
"o2VzIHJlY8OpbS1wYXJpZGFzIl0sIFsiTGljZW7Dp2EgUGF0ZXJuaWRhZGUiLCAibyBkaXJlaXRvIGEgYWZhc3RhbWVudG8gcmVtdW5lcmFkbyBwYXJhIHBhaXMgcmVjw6ltLW5hc2NpZG9zIl0sIFsiSWRhZGUgZGUgQXBvc2VudGFkb3JpYSIsICJhIGlkYWRlIG3DrW5pbWEgZXhpZ2lkYSBwYXJhIGFwb3NlbnRhZG9yaWEiXSwgWyJTZWd1cm8tRGVzZW1wcmVnbyIsICJvIGF1eMOtbGlvIGZpbmFuY2Vpcm8gYSB0cmFiYWxoYWRvcmVzIGRlc2VtcHJlZ2Fkb3MiXSwgWyJEaXJlaXRvIGRlIFNpbmRpY2FsaXphw6fDo28iLCAibyBk",
"aXJlaXRvIGRvcyB0cmFiYWxoYWRvcmVzIGRlIHNlIG9yZ2FuaXphcmVtIGVtIHNpbmRpY2F0b3MiXSwgWyJEaXJlaXRvIGRlIEdyZXZlIiwgIm8gZGlyZWl0byBkb3MgdHJhYmFsaGFkb3JlcyBkZSBwYXJhbGlzYXIgc3VhcyBhdGl2aWRhZGVzIGVtIHByb3Rlc3RvIl0sIFsiVGVyY2Vpcml6YcOnw6NvIGRlIE3Do28gZGUgT2JyYSIsICJhIGNvbnRyYXRhw6fDo28gZGUgbcOjbyBkZSBvYnJhIHBvciBtZWlvIGRlIGVtcHJlc2FzIGludGVybWVkacOhcmlhcyJdLCBbIkNvbWJhdGUgYW8gVHJhYmFsaG8gSW5mYW50aWwiLCAibyBl",
"bXByZWdvIGRlIG1lbm9yZXMgZGUgaWRhZGUgZW0gYXRpdmlkYWRlcyBsYWJvcmFpcyJdLCBbIlNlZ3VyYW7Dp2Egbm8gVHJhYmFsaG8iLCAiYXMgbm9ybWFzIGRlIHNlZ3VyYW7Dp2EgZW0gYW1iaWVudGVzIGluZHVzdHJpYWlzIl0sIFsiVHJhYmFsaG8gUmVtb3RvIiwgIm8gZGlyZWl0byBkb3MgdHJhYmFsaGFkb3JlcyBkZSBleGVyY2VyIHN1YXMgZnVuw6fDtWVzIMOgIGRpc3TDom5jaWEiXSwgWyJFY29ub21pYSBHaWciLCAiYSByZWd1bGFtZW50YcOnw6NvIGRlIHRyYWJhbGhhZG9yZXMgYXV0w7Rub21vcyBkZSBhcGxpY2F0",
"aXZvcyJdLCBbIlJlbmRhIELDoXNpY2EgVW5pdmVyc2FsIiwgIm8gcGFnYW1lbnRvIGRlIHVtYSByZW5kYSBtZW5zYWwgaW5jb25kaWNpb25hbCBhIHRvZG9zIG9zIGNpZGFkw6NvcyJdLCBbIkltcG9zdG8gc29icmUgR3JhbmRlcyBGb3J0dW5hcyIsICJhIHRyaWJ1dGHDp8OjbyBzb2JyZSBwYXRyaW3DtG5pb3MgcGVzc29haXMgZWxldmFkb3MiXSwgWyJJbXBvc3RvIGRlIEhlcmFuw6dhIiwgImEgdHJpYnV0YcOnw6NvIHNvYnJlIGJlbnMgdHJhbnNtaXRpZG9zIHBvciBoZXJhbsOnYSJdLCBbIkltcG9zdG8gc29icmUgQ2FyYm9u",
"byIsICJhIHRyaWJ1dGHDp8OjbyBzb2JyZSBlbWlzc8O1ZXMgZGUgY2FyYm9ubyBpbmR1c3RyaWFsIl0sIFsiRW5lcmdpYXMgUmVub3bDoXZlaXMiLCAiYSBvYnJpZ2F0b3JpZWRhZGUgZGUgdXNvIGRlIGZvbnRlcyBkZSBlbmVyZ2lhIHJlbm92w6F2ZWwiXSwgWyJEZXNtYXRhbWVudG8iLCAiYSBleHBsb3Jhw6fDo28gZSBkZXJydWJhZGEgZGUgw6FyZWFzIGZsb3Jlc3RhaXMiXSwgWyJQcm90ZcOnw6NvIGRhIFZpZGEgU2VsdmFnZW0iLCAiYSBjYcOnYSBlIGNvbcOpcmNpbyBkZSBlc3DDqWNpZXMgc2lsdmVzdHJlcyJdLCBbIlBy",
"b3Rlw6fDo28gTWFyaW5oYSIsICJhIGV4cGxvcmHDp8OjbyBwZXNxdWVpcmEgZW0gw6FyZWFzIGRlIHJlc2VydmEgbWFyaW5oYSJdLCBbIlVzbyBkZSBQbMOhc3RpY29zIERlc2NhcnTDoXZlaXMiLCAiYSBwcm9kdcOnw6NvIGUgdmVuZGEgZGUgcGzDoXN0aWNvcyBkZSB1c28gw7puaWNvIl0sIFsiQ29uc2VydmHDp8OjbyBkZSDDgWd1YSIsICJvIHVzbyBlIHJhY2lvbmFtZW50byBkZSByZWN1cnNvcyBow61kcmljb3MiXSwgWyJQYXJxdWVzIFDDumJsaWNvcyIsICJhIHByZXNlcnZhw6fDo28gZSB1c28gZGUgw6FyZWFzIHZlcmRl",
"cyB1cmJhbmFzIl0sIFsiUHJlc2VydmHDp8OjbyBIaXN0w7NyaWNhIiwgImEgZGVtb2xpw6fDo28gb3UgYWx0ZXJhw6fDo28gZGUgcGF0cmltw7RuaW9zIGhpc3TDs3JpY29zIl0sIFsiWm9uZWFtZW50byBVcmJhbm8iLCAibyB1c28gZG8gc29sbyBlIGEgZGl2aXPDo28gZGUgem9uYXMgbmFzIGNpZGFkZXMiXSwgWyJDb250cm9sZSBkZSBBbHVndWVsIiwgIm8gdmFsb3IgbcOheGltbyBjb2JyYWRvIGVtIGNvbnRyYXRvcyBkZSBsb2Nhw6fDo28iXSwgWyJQcm90ZcOnw6NvIGNvbnRyYSBEZXNwZWpvIiwgIm8gcHJvY2Vzc28gZGUg",
"cmVtb8Onw6NvIGRlIGlucXVpbGlub3MgZGUgaW3Ds3ZlaXMiXSwgWyJSZWd1bGHDp8OjbyBIaXBvdGVjw6FyaWEiLCAiYXMgY29uZGnDp8O1ZXMgZGUgY29uY2Vzc8OjbyBkZSBlbXByw6lzdGltb3MgaW1vYmlsacOhcmlvcyJdLCBbIlJlZ3VsYcOnw6NvIGRlIENyaXB0b21vZWRhcyIsICJvIHVzbyBlIGEgbmVnb2NpYcOnw6NvIGRlIG1vZWRhcyBkaWdpdGFpcyBkZXNjZW50cmFsaXphZGFzIl0sIFsiUHJvdGXDp8OjbyBhbyBDcsOpZGl0byBhbyBDb25zdW1pZG9yIiwgImFzIHRheGFzIGRlIGp1cm9zIGUgY29icmFuw6dhcyBk",
"ZSBpbnN0aXR1acOnw7VlcyBmaW5hbmNlaXJhcyJdLCBbIkNvbWJhdGUgw6AgRXNwZWN1bGHDp8OjbyBkZSBQcmXDp29zIiwgIm8gYXVtZW50byBhYnVzaXZvIGRlIHByZcOnb3MgZW0gc2l0dWHDp8O1ZXMgZGUgY3Jpc2UiXSwgWyJRdWVicmEgZGUgTW9ub3DDs2xpb3MiLCAiYSBjb25jZW50cmHDp8OjbyBleGNlc3NpdmEgZGUgbWVyY2FkbyBwb3IgcG91Y2FzIGVtcHJlc2FzIl0sIFsiRGlyZWl0byBhbyBSZXBhcm8iLCAibyBkaXJlaXRvIGRvcyBjb25zdW1pZG9yZXMgZGUgY29uc2VydGFyIHNldXMgcHLDs3ByaW9zIHByb2R1",
"dG9zIl0sIFsiU2VndXJhbsOnYSBkZSBQcm9kdXRvcyIsICJvcyBwYWRyw7VlcyBtw61uaW1vcyBkZSBzZWd1cmFuw6dhIHBhcmEgYmVucyBkZSBjb25zdW1vIl0sIFsiUm90dWxhZ2VtIGRlIEFsaW1lbnRvcyIsICJhIG9icmlnYXRvcmllZGFkZSBkZSBpbmZvcm1hw6fDtWVzIG51dHJpY2lvbmFpcyBub3MgcsOzdHVsb3MiXSwgWyJSZWd1bGHDp8OjbyBkZSBUcmFuc2fDqm5pY29zIiwgIm8gY3VsdGl2byBlIGNvbcOpcmNpbyBkZSBvcmdhbmlzbW9zIGdlbmV0aWNhbWVudGUgbW9kaWZpY2Fkb3MiXSwgWyJVc28gZGUgQWdyb3TD",
"s3hpY29zIiwgImEgYXBsaWNhw6fDo28gZGUgcGVzdGljaWRhcyBlbSBsYXZvdXJhcyJdLCBbIlRlc3RlcyBlbSBBbmltYWlzIiwgIm8gdXNvIGRlIGFuaW1haXMgZW0gZXhwZXJpbWVudG9zIGNpZW50w61maWNvcyBlIGNvc23DqXRpY29zIl0sIFsiUmVndWxhw6fDo28gZGUgWm9vbMOzZ2ljb3MiLCAiYXMgY29uZGnDp8O1ZXMgZGUgY2F0aXZlaXJvIGRlIGFuaW1haXMgZW0gZXhpYmnDp8OjbyJdLCBbIkNvdGFzIGRlIENhw6dhIGUgUGVzY2EiLCAib3MgbGltaXRlcyBhbnVhaXMgZGUgY2FwdHVyYSBkZSBlc3DDqWNpZXMgc2ls",
"dmVzdHJlcyJdLCBbIkxpYmVyZGFkZSBkZSBJbXByZW5zYSIsICJhIHB1YmxpY2HDp8OjbyBlIHRyYW5zbWlzc8OjbyBkZSBjb250ZcO6ZG8gam9ybmFsw61zdGljbyJdLCBbIk5ldXRyYWxpZGFkZSBkZSBSZWRlIiwgIm8gdHJhdGFtZW50byBpZ3VhbGl0w6FyaW8gZG8gdHLDoWZlZ28gZGUgZGFkb3MgbmEgaW50ZXJuZXQiXSwgWyJQcml2YWNpZGFkZSBkZSBEYWRvcyBQZXNzb2FpcyIsICJhIGNvbGV0YSBlIG8gdXNvIGRlIGRhZG9zIHBlc3NvYWlzIHBvciBlbXByZXNhcyJdLCBbIlJlY29uaGVjaW1lbnRvIEZhY2lhbCIsICJv",
"IHVzbyBkZSB0ZWNub2xvZ2lhIGRlIHJlY29uaGVjaW1lbnRvIGZhY2lhbCBwZWxvIEVzdGFkbyJdLCBbIkRhZG9zIEJpb23DqXRyaWNvcyIsICJhIGNvbGV0YSBkZSBpbXByZXNzw7VlcyBkaWdpdGFpcyBlIG91dHJvcyBkYWRvcyBiaW9tw6l0cmljb3MiXSwgWyJQcml2YWNpZGFkZSBHZW7DqXRpY2EiLCAibyBhY2Vzc28gZSB1c28gZGUgaW5mb3JtYcOnw7VlcyBnZW7DqXRpY2FzIGRlIGNpZGFkw6NvcyJdLCBbIlJlZ3VsYcOnw6NvIGRlIEludGVsaWfDqm5jaWEgQXJ0aWZpY2lhbCIsICJvIGRlc2Vudm9sdmltZW50byBlIHVz",
"byBkZSBzaXN0ZW1hcyBkZSBpbnRlbGlnw6puY2lhIGFydGlmaWNpYWwiXSwgWyJDaWJlcnNlZ3VyYW7Dp2EgTmFjaW9uYWwiLCAiYSBwcm90ZcOnw6NvIGRlIGluZnJhZXN0cnV0dXJhcyBkaWdpdGFpcyBjcsOtdGljYXMiXSwgWyJEZW51bmNpYW50ZXMgKFdoaXN0bGVibG93ZXJzKSIsICJhIHByb3Rlw6fDo28gbGVnYWwgYSBxdWVtIGRlbnVuY2lhIGlycmVndWxhcmlkYWRlcyJdLCBbIkxvYmJ5IFBvbMOtdGljbyIsICJhIGF0dWHDp8OjbyBkZSBncnVwb3MgZGUgaW50ZXJlc3NlIGp1bnRvIGFvIGdvdmVybm8iXSwgWyJGaW5h",
"bmNpYW1lbnRvIGRlIENhbXBhbmhhcyIsICJvIGZpbmFuY2lhbWVudG8gZGUgY2FuZGlkYXR1cmFzIHBvbMOtdGljYXMiXSwgWyJJbmRlcGVuZMOqbmNpYSBKdWRpY2lhbCIsICJhIGF1dG9ub21pYSBkbyBwb2RlciBqdWRpY2nDoXJpbyBmcmVudGUgYW8gZXhlY3V0aXZvIl0sIFsiUmVmb3JtYSBQcmlzaW9uYWwiLCAiYXMgY29uZGnDp8O1ZXMgZGUgZW5jYXJjZXJhbWVudG8gZSByZXNzb2NpYWxpemHDp8OjbyJdLCBbIlBlbmEgZGUgTW9ydGUiLCAiYSBhcGxpY2HDp8OjbyBkYSBwZW5hIGNhcGl0YWwgZW0gY3JpbWVzIGdyYXZl",
"cyJdLCBbIkV4dHJhZGnDp8OjbyIsICJhIGVudHJlZ2EgZGUgYWN1c2Fkb3MgYSBvdXRyb3MgZ292ZXJub3MgcGFyYSBqdWxnYW1lbnRvIl0sIFsiRGlyZWl0byBkZSBBc2lsbyIsICJhIGNvbmNlc3PDo28gZGUgcmVmw7pnaW8gYSBwZXJzZWd1aWRvcyBwb2zDrXRpY29zIl0sIFsiRGlyZWl0b3MgZGUgUmVmdWdpYWRvcyIsICJvIGFjb2xoaW1lbnRvIGUgb3MgZGlyZWl0b3MgZGUgcG9wdWxhw6fDtWVzIHJlZnVnaWFkYXMiXSwgWyJMw61uZ3VhcyBNaW5vcml0w6FyaWFzIiwgIm8gdXNvIGUgZW5zaW5vIGRlIGzDrW5ndWFzIGRl",
"IGNvbXVuaWRhZGVzIG1pbm9yaXTDoXJpYXMiXSwgWyJQYXRyaW3DtG5pbyBDdWx0dXJhbCIsICJhIHByb3Rlw6fDo28gZGUgdHJhZGnDp8O1ZXMgZSBleHByZXNzw7VlcyBjdWx0dXJhaXMgbG9jYWlzIl0sIFsiUmVndWxhw6fDo28gZGUgQXBvc3RhcyIsICJvIGZ1bmNpb25hbWVudG8gZGUgY2FzYXMgZGUgYXBvc3RhcyBlIGpvZ29zIGRlIGF6YXIiXSwgWyJWZW5kYSBkZSDDgWxjb29sIiwgImEgcHJvZHXDp8OjbywgdmVuZGEgZSBjb25zdW1vIGRlIGJlYmlkYXMgYWxjb8OzbGljYXMiXSwgWyJWZW5kYSBkZSBUYWJhY28iLCAi",
"YSBwcm9kdcOnw6NvLCB2ZW5kYSBlIGNvbnN1bW8gZGUgcHJvZHV0b3MgZGUgdGFiYWNvIl0sIFsiUG9ydGUgZGUgQXJtYXMgZGUgRm9nbyIsICJhIHBvc3NlIGUgbyBwb3J0ZSBkZSBhcm1hcyBkZSBmb2dvIHBvciBjaXZpcyJdLCBbIkxlZ8OtdGltYSBEZWZlc2EiLCAibyBkaXJlaXRvIGRlIHVzbyBkYSBmb3LDp2EgZW0gc2l0dWHDp8O1ZXMgZGUgYXV0b2RlZmVzYSJdLCBbIlZpZ2lsw6JuY2lhIHBvciBDw6JtZXJhcyIsICJhIGluc3RhbGHDp8OjbyBkZSBjw6JtZXJhcyBkZSBtb25pdG9yYW1lbnRvIGVtIHZpYXMgcMO6Ymxp",
"Y2FzIl0sIFsiQ2xvbmFnZW0iLCAiYSBwZXNxdWlzYSBlIHByw6F0aWNhIGRlIGNsb25hZ2VtIGRlIHNlcmVzIHZpdm9zIl0sIFsiRG9hw6fDo28gZGUgw5NyZ8Ojb3MiLCAibyBwcm9jZXNzbyBkZSBkb2HDp8OjbyBlIHRyYW5zcGxhbnRlIGRlIMOzcmfDo29zIl0sIFsiRXV0YW7DoXNpYSIsICJvIGRpcmVpdG8gw6AgbW9ydGUgYXNzaXN0aWRhIGVtIGNhc29zIHRlcm1pbmFpcyJdLCBbIkludGVycnVww6fDo28gZGEgR3JhdmlkZXoiLCAibyBkaXJlaXRvIMOgIGludGVycnVww6fDo28gdm9sdW50w6FyaWEgZGEgZ3JhdmlkZXoi",
"XSwgWyJNw6l0b2RvcyBDb250cmFjZXB0aXZvcyIsICJvIGFjZXNzbyBhIG3DqXRvZG9zIGRlIGNvbnRyYWNlcMOnw6NvIl0sIFsiRWR1Y2HDp8OjbyBTZXh1YWwiLCAibyBlbnNpbm8gZGUgZWR1Y2HDp8OjbyBzZXh1YWwgbmFzIGVzY29sYXMiXSwgWyJSYWRpb2RpZnVzw6NvIFDDumJsaWNhIiwgIm8gZmluYW5jaWFtZW50byBlIGEgaW5kZXBlbmTDqm5jaWEgZGUgZW1pc3NvcmFzIHDDumJsaWNhcyJdLCBbIlJlZ3VsYcOnw6NvIEFudGl0cnVzdGUiLCAicHLDoXRpY2FzIGNvbWVyY2lhaXMgcXVlIHJlc3RyaW5qYW0gYSBsaXZy",
"ZSBjb25jb3Jyw6puY2lhIl0sIFsiUHJvcHJpZWRhZGUgSW50ZWxlY3R1YWwiLCAibyByZWdpc3RybyBlIGEgcHJvdGXDp8OjbyBkZSBpbnZlbsOnw7VlcyBlIGNyaWHDp8O1ZXMiXSwgWyJEaXJlaXRvcyBBdXRvcmFpcyIsICJhIHJlcHJvZHXDp8OjbyBlIGRpc3RyaWJ1acOnw6NvIGRlIG9icmFzIHByb3RlZ2lkYXMgcG9yIGRpcmVpdG9zIGF1dG9yYWlzIl0sIFsiUGF0ZW50ZXMgRmFybWFjw6p1dGljYXMiLCAibyBtb25vcMOzbGlvIHRlbXBvcsOhcmlvIHNvYnJlIG1lZGljYW1lbnRvcyBwYXRlbnRlYWRvcyJdLCBbIkRpcmVp",
"dG8gw6AgRGVzY29uZXjDo28iLCAibyBkaXJlaXRvIGRvcyB0cmFiYWxoYWRvcmVzIGRlIG7Do28gcmVzcG9uZGVyIGFvIHRyYWJhbGhvIGZvcmEgZG8gZXhwZWRpZW50ZSJdLCBbIlNlbWFuYSBkZSBRdWF0cm8gRGlhcyIsICJhIHJlZHXDp8OjbyBkYSBqb3JuYWRhIHNlbWFuYWwgZGUgdHJhYmFsaG8gcGFyYSBxdWF0cm8gZGlhcyJdLCBbIkF1eMOtbGlvLURlc2FzdHJlIiwgIm8gc3Vwb3J0ZSBmaW5hbmNlaXJvIGEgdsOtdGltYXMgZGUgY2F0w6FzdHJvZmVzIG5hdHVyYWlzIl0sIFsiUmVzcG9zdGEgYSBQYW5kZW1pYXMiLCAi",
"YXMgbWVkaWRhcyBlbWVyZ2VuY2lhaXMgZW0gc3VydG9zIGRlIGRvZW7Dp2FzIGluZmVjY2lvc2FzIl0sIFsiVmFjaW5hw6fDo28gT2JyaWdhdMOzcmlhIiwgImEgZXhpZ8OqbmNpYSBkZSB2YWNpbmHDp8OjbyBwYXJhIGFjZXNzbyBhIHNlcnZpw6dvcyBww7pibGljb3MiXSwgWyJRdWFyZW50ZW5hIFNhbml0w6FyaWEiLCAibyBpc29sYW1lbnRvIGNvbXB1bHPDs3JpbyBkZSBpbmRpdsOtZHVvcyBpbmZlY3RhZG9zIl0sIFsiU2HDumRlIE1lbnRhbCIsICJvIGFjZXNzbyBhIHRyYXRhbWVudG8gcHNpY29sw7NnaWNvIGUgcHNpcXVp",
"w6F0cmljbyJdLCBbIlRyYXRhbWVudG8gZGUgRGVwZW5kw6puY2lhIFF1w61taWNhIiwgIm8gYWNlc3NvIGEgcHJvZ3JhbWFzIGRlIHJlYWJpbGl0YcOnw6NvIHBhcmEgZGVwZW5kZW50ZXMiXSwgWyJDdWlkYWRvIGFvIElkb3NvIiwgIm9zIGRpcmVpdG9zIGUgYSBhc3Npc3TDqm5jaWEgYSBwZXNzb2FzIGlkb3NhcyJdLCBbIkJlbmVmw61jaW9zIGEgVmV0ZXJhbm9zIiwgIm8gc3Vwb3J0ZSBmaW5hbmNlaXJvIGUgZGUgc2HDumRlIGEgZXgtY29tYmF0ZW50ZXMiXSwgWyJJbnZlc3RpbWVudG8gRXN0cmFuZ2Vpcm8iLCAiYSBwYXJ0",
"aWNpcGHDp8OjbyBkZSBjYXBpdGFsIGVzdHJhbmdlaXJvIGVtIGVtcHJlc2FzIGxvY2FpcyJdLCBbIkNvbnRyb2xlIGRlIEV4cG9ydGHDp8O1ZXMiLCAiYSBleHBvcnRhw6fDo28gZGUgYmVucyBlIHRlY25vbG9naWFzIHNlbnPDrXZlaXMiXSwgWyJEaXJlaXRvcyBkZSBQZXNzb2FzIGNvbSBEZWZpY2nDqm5jaWEiLCAiYSBhY2Vzc2liaWxpZGFkZSBlIGluY2x1c8OjbyBkZSBwZXNzb2FzIGNvbSBkZWZpY2nDqm5jaWEiXSwgWyJEaXJlaXRvcyBMR0JUUUlBKyIsICJvIHJlY29uaGVjaW1lbnRvIGxlZ2FsIGUgYSBwcm90ZcOnw6Nv",
"IGRlIG1pbm9yaWFzIHNleHVhaXMgZSBkZSBnw6puZXJvIl0sIFsiQ2FzYW1lbnRvIENpdmlsIiwgIm9zIHJlcXVpc2l0b3MgbGVnYWlzIHBhcmEgdW5pw6NvIG1hdHJpbW9uaWFsIl0sIFsiQWRvw6fDo28iLCAib3MgY3JpdMOpcmlvcyBsZWdhaXMgcGFyYSBhZG/Dp8OjbyBkZSBjcmlhbsOnYXMiXSwgWyJHdWFyZGEgQ29tcGFydGlsaGFkYSIsICJhIGRpdmlzw6NvIGRlIHJlc3BvbnNhYmlsaWRhZGVzIHBhcmVudGFpcyBhcMOzcyBzZXBhcmHDp8OjbyJdLCBbIlBlbnPDo28gQWxpbWVudMOtY2lhIiwgImEgb2JyaWdhw6fDo28g",
"ZGUgc3VzdGVudG8gZmluYW5jZWlybyBhIGRlcGVuZGVudGVzIl0sIFsiSGFiaXRhw6fDo28gU29jaWFsIiwgImEgY29uc3RydcOnw6NvIGUgbyBzdWJzw61kaW8gZGUgbW9yYWRpYXMgcG9wdWxhcmVzIl0sIFsiQ29tYmF0ZSDDoCBQb3B1bGHDp8OjbyBlbSBTaXR1YcOnw6NvIGRlIFJ1YSIsICJvIGF0ZW5kaW1lbnRvIGUgYSBhc3Npc3TDqm5jaWEgYSBwZXNzb2FzIGVtIHNpdHVhw6fDo28gZGUgcnVhIl0sIFsiUmVndWxhw6fDo28gZG8gVHJhbnNwb3J0ZSBQw7pibGljbyIsICJhcyB0YXJpZmFzIGUgYSBxdWFsaWRhZGUgZG8g",
"dHJhbnNwb3J0ZSBjb2xldGl2byB1cmJhbm8iXSwgWyJWZcOtY3Vsb3MgQXV0w7Rub21vcyIsICJhIGNpcmN1bGHDp8OjbyBkZSB2ZcOtY3Vsb3MgY29tIGNvbmR1w6fDo28gYXV0b21hdGl6YWRhIl0sIFsiRW1pc3PDtWVzIFZlaWN1bGFyZXMiLCAib3MgbGltaXRlcyBkZSBwb2x1acOnw6NvIGVtaXRpZGEgcG9yIHZlw61jdWxvcyJdLCBbIkNpY2xvdmlhcyBlIE1vYmlsaWRhZGUgQXRpdmEiLCAiYSBpbmZyYWVzdHJ1dHVyYSBkZXN0aW5hZGEgYSBjaWNsaXN0YXMgZSBwZWRlc3RyZXMiXV0sCiAgc3RhcndhcnM6IFtbIlJlZ2lz",
"dHJvIGRlIFNlbnPDrXZlaXMgw6AgRm9yw6dhIiwgIm8gY2FkYXN0cm8gb2JyaWdhdMOzcmlvIGRlIGluZGl2w61kdW9zIHNlbnPDrXZlaXMgw6AgRm9yw6dhIl0sIFsiUG9zc2UgZGUgQ3Jpc3RhaXMgS3liZXIiLCAiYSBleHRyYcOnw6NvIGUgcG9zc2UgZGUgY3Jpc3RhaXMga3liZXIgcG9yIGNpdmlzIl0sIFsiUG9zc2UgZGUgU2FicmVzIGRlIEx1eiIsICJhIGZhYnJpY2HDp8OjbyBlIG8gcG9ydGUgZGUgc2FicmVzIGRlIGx1eiBwb3IgbsOjby1KZWRpIl0sIFsiSG9sb2Nyb25zIFNpdGgiLCAiYSBwb3NzZSBkZSBob2xvY3Jv",
"bnMgZSBhcnRlZmF0b3MgbGlnYWRvcyBhbyBsYWRvIHNvbWJyaW8iXSwgWyJMaWNlbsOnYSBkZSBDYcOnYWRvciBkZSBSZWNvbXBlbnNhcyIsICJhIGF0dWHDp8OjbyBkZSBjYcOnYWRvcmVzIGRlIHJlY29tcGVuc2FzIGxpY2VuY2lhZG9zIl0sIFsiQXJtYWR1cmEgZGUgQmVza2FyIiwgImEgbWluZXJhw6fDo28gZSBjb23DqXJjaW8gZGUgYmVza2FyIG1hbmRhbG9yaWFubyJdLCBbIkNvbcOpcmNpbyBkZSBFc3BlY2lhcmlhIGRlIEtlc3NlbCIsICJhIGV4dHJhw6fDo28gZSB2ZW5kYSBkYSBlc3BlY2lhcmlhIHBzaWNvYXRpdmEg",
"ZGUgS2Vzc2VsIl0sIFsiRXNjcmF2aWTDo28gSHV0dCIsICJhIHByw6F0aWNhIGRlIGVzY3Jhdmlkw6NvIHNvYiBkb23DrW5pbyBkb3MgY2FydMOpaXMgSHV0dCJdLCBbIkNvbWJhdGUgZW0gQXJlbmEgKEZvc3NvIGRlIFJhbmNvcikiLCAiYSByZWFsaXphw6fDo28gZGUgY29tYmF0ZXMgZGUgZ2xhZGlhZG9yZXMgY29udHJhIGNyaWF0dXJhcyJdLCBbIkFwb3N0YXMgZW0gUG9kcmFjaW5nIiwgImFzIGFwb3N0YXMgbGVnYWlzIGVtIGNvcnJpZGFzIGRlIHBvZHMiXSwgWyJKb2dvIGRlIFBhemFhayIsICJvIGZ1bmNpb25hbWVudG8g",
"ZGUgY2FzYXMgZGUgam9nbyBkZSBwYXphYWsiXSwgWyJKb2dvIGRlIFNhYmFjYyIsICJvIGZ1bmNpb25hbWVudG8gZGUgbWVzYXMgZGUgc2FiYWNjIGVtIGNhbnRpbmFzIl0sIFsiTGljZW5jaWFtZW50byBkZSBDYW50aW5hcyIsICJvIGZ1bmNpb25hbWVudG8gZGUgY2FudGluYXMgZSBlc3RhYmVsZWNpbWVudG9zIG5vdHVybm9zIl0sIFsiUG9zc2UgZGUgQmxhc3RlciBDaXZpbCIsICJhIHBvc3NlIGUgbyBwb3J0ZSBkZSBibGFzdGVycyBwb3IgY2l2aXMiXSwgWyJQb3NzZSBkZSBEZXRvbmFkb3JlcyBUw6lybWljb3MiLCAiYSBw",
"b3NzZSBkZSBkZXRvbmFkb3JlcyB0w6lybWljb3MgZSBleHBsb3Npdm9zIl0sIFsiVXNvIGRlIENhbmjDtWVzIEnDtG5pY29zIiwgIm8gZW1wcmVnbyBkZSBjYW5ow7VlcyBpw7RuaWNvcyBjb250cmEgbmF2ZXMgY2l2aXMiXSwgWyJFc2N1ZG9zIFBsYW5ldMOhcmlvcyIsICJhIGluc3RhbGHDp8OjbyBlIG1hbnV0ZW7Dp8OjbyBkZSBlc2N1ZG9zIGRlIGRlZmVzYSBwbGFuZXTDoXJpYSJdLCBbIlBlZMOhZ2lvIGRlIFJvdGEgSGlwZXJlc3BhY2lhbCIsICJhIGNvYnJhbsOnYSBkZSB0YXJpZmFzIHNvYnJlIHJvdGFzIGhpcGVyZXNw",
"YWNpYWlzIl0sIFsiU3VwcmVzc8OjbyBkZSBQaXJhdGFzIEVzcGFjaWFpcyIsICJhcyBvcGVyYcOnw7VlcyBtaWxpdGFyZXMgY29udHJhIHBpcmF0YXJpYSBlc3BhY2lhbCJdLCBbIkxpY2Vuw6dhIGRlIENvcnPDoXJpbyAoUHJpdmF0ZWVyaW5nKSIsICJhIGF1dG9yaXphw6fDo28gZXN0YXRhbCBwYXJhIGF0YXF1ZXMgYSBuYXZlcyBpbmltaWdhcyJdLCBbIkFib2xpw6fDo28gZGEgRXNjcmF2aWTDo28gV29va2llZSIsICJhIHByw6F0aWNhIGRlIGVzY3Jhdmlkw6NvIGRlIFdvb2tpZWVzIGVtIEthc2h5eXlrIl0sIFsiQ29tw6ly",
"Y2lvIGRlIEVzY3Jhdm9zIFR3aSdsZWsiLCAibyB0csOhZmljbyBkZSBUd2knbGVrcyBwYXJhIHRyYWJhbGhvIGZvcsOnYWRvIl0sIFsiQ2lkYWRhbmlhIGRlIEVzcMOpY2llcyBBbGllbsOtZ2VuYXMiLCAibyBkaXJlaXRvIGRlIGNpZGFkYW5pYSBwbGVuYSBhIGVzcMOpY2llcyBuw6NvLWh1bWFuYXMiXSwgWyJEaXJlaXRvcyBDaXZpcyBkZSBDbG9uZXMiLCAibyByZWNvbmhlY2ltZW50byBsZWdhbCBkZSBjbG9uZXMgY29tbyBjaWRhZMOjb3MiXSwgWyJBcGFnYW1lbnRvIGRlIE1lbcOzcmlhIGRlIERyb2lkZXMiLCAiYSBwcsOh",
"dGljYSBkZSBhcGFnYXIgbWVtw7NyaWFzIGRlIGRyb2lkZXMgZGUgZm9ybWEgY29tcHVsc8OzcmlhIl0sIFsiUG9zc2UgZGUgQXN0cm9tZWPDom5pY29zIiwgImEgcHJvcHJpZWRhZGUgcHJpdmFkYSBkZSBkcm9pZGVzIGFzdHJvbWVjw6JuaWNvcyJdLCBbIkV0aXF1ZXRhIGRlIERyb2lkZXMgZGUgUHJvdG9jb2xvIiwgImFzIG5vcm1hcyBkZSBjb25kdXRhIHBhcmEgZHJvaWRlcyBkZSBwcm90b2NvbG8iXSwgWyJDZW5zdXJhIGRhIEhvbG9SZWRlIiwgIm8gY29udHJvbGUgZXN0YXRhbCBzb2JyZSB0cmFuc21pc3PDtWVzIGRhIEhv",
"bG9SZWRlIl0sIFsiUG9kZXJlcyBkZSBFbWVyZ8OqbmNpYSBkbyBDaGFuY2VsZXIiLCAiYSBjb25jZXNzw6NvIGRlIHBvZGVyZXMgZW1lcmdlbmNpYWlzIGFvIENoYW5jZWxlciBTdXByZW1vIl0sIFsiRmluYW5jaWFtZW50byBkbyBFeMOpcmNpdG8gQ2xvbmUiLCAibyBvcsOnYW1lbnRvIGRlc3RpbmFkbyDDoCBjcmlhw6fDo28gZGUgdW0gZXjDqXJjaXRvIGRlIGNsb25lcyJdLCBbIkZpbmFuY2lhbWVudG8gZG8gVGVtcGxvIEplZGkiLCAibyBvcsOnYW1lbnRvIGRlc3RpbmFkbyDDoCBtYW51dGVuw6fDo28gZG8gVGVtcGxvIEpl",
"ZGkiXSwgWyJBY2FkZW1pYXMgU2l0aCIsICJvIGVzdGFiZWxlY2ltZW50byBkZSBhY2FkZW1pYXMgZGUgdHJlaW5hbWVudG8gZG8gbGFkbyBzb21icmlvIl0sIFsiRXhwZXJpbWVudGHDp8OjbyBjb20gbyBMYWRvIFNvbWJyaW8iLCAiYSBwZXNxdWlzYSBjaWVudMOtZmljYSBlbnZvbHZlbmRvIG8gbGFkbyBzb21icmlvIGRhIEZvcsOnYSJdLCBbIlRlc3RlIGRlIE1pZGktY2hsb3JpYW5zIiwgImEgdGVzdGFnZW0gY29tcHVsc8OzcmlhIGRlIG1pZGktY2hsb3JpYW5zIGVtIGNyaWFuw6dhcyJdLCBbIlJlY3J1dGFtZW50byBkZSBZ",
"b3VuZ2xpbmdzIiwgIm8gcmVjcnV0YW1lbnRvIGRlIGNyaWFuw6dhcyBwYXJhIGEgT3JkZW0gSmVkaSJdLCBbIkxpY2Vuw6dhIGRvIElucXVpc2l0b3JpdXMiLCAiYSBjYcOnYSBpbnN0aXR1Y2lvbmFsaXphZGEgYSBKZWRpIHJlbWFuZXNjZW50ZXMiXSwgWyJHdWFybmnDp8O1ZXMgSW1wZXJpYWlzIiwgIm8gZXN0YWNpb25hbWVudG8gZGUgdHJvcGFzIGltcGVyaWFpcyBlbSBtdW5kb3Mgb2N1cGFkb3MiXSwgWyJUcmlidXRhw6fDo28gZGFzIEJvcmRhcyBFeHRlcmlvcmVzIiwgImEgdGF4YcOnw6NvIGRlIG11bmRvcyBsb2NhbGl6",
"YWRvcyBuYXMgQm9yZGFzIEV4dGVyaW9yZXMiXSwgWyJCbG9xdWVpbyBDb21lcmNpYWwgZGEgRmVkZXJhw6fDo28iLCAiYSBhdXRvcml6YcOnw6NvIGRlIGJsb3F1ZWlvcyBjb21lcmNpYWlzIHBvciBjb3Jwb3Jhw6fDtWVzIl0sIFsiQ29uY2Vzc8O1ZXMgZGUgQ29sb25pemHDp8OjbyBkYXMgQm9yZGFzIiwgImEgY29uY2Vzc8OjbyBkZSB0ZXJyYXMgcGFyYSBjb2xvbml6YcOnw6NvIG5hcyBCb3JkYXMgRXh0ZXJpb3JlcyJdLCBbIk1vbm9ww7NsaW8gZGUgUm90YXMgSGlwZXJlc3BhY2lhaXMiLCAibyBjb250cm9sZSBleGNsdXNp",
"dm8gZGUgcm90YXMgY29tZXJjaWFpcyBoaXBlcmVzcGFjaWFpcyJdLCBbIlNlZ3VyYW7Dp2EgZW0gUG9kcmFjaW5nIiwgImFzIG5vcm1hcyBkZSBzZWd1cmFuw6dhIHBhcmEgY29ycmlkYXMgZGUgcG9kcyJdLCBbIlBvc3NlIGRlIEVzY3Jhdm9zIGRlIEFyZW5hIiwgImEgcHJvcHJpZWRhZGUgZGUgY29tYmF0ZW50ZXMgZXNjcmF2aXphZG9zIHBhcmEgYXJlbmFzIl0sIFsiUmVjb21wZW5zYSBwb3IgSmVkaSBGdWdpdGl2b3MiLCAibyBwYWdhbWVudG8gZGUgcmVjb21wZW5zYXMgcG9yIGNhcHR1cmFyIEplZGkgZm9yYWdpZG9zIl0s",
"IFsiUmVjb21wZW5zYSBwb3IgRGVsYXRhciBSZWJlbGRlcyIsICJvIHBhZ2FtZW50byBwb3IgaW5mb3JtYcOnw7VlcyBzb2JyZSBjw6lsdWxhcyByZWJlbGRlcyJdLCBbIlRvcXVlIGRlIFJlY29saGVyIGVtIE11bmRvcyBPY3VwYWRvcyIsICJhIHJlc3RyacOnw6NvIGRlIGNpcmN1bGHDp8OjbyBub3R1cm5hIGVtIG11bmRvcyBzb2Igb2N1cGHDp8OjbyJdLCBbIkxlaSBNYXJjaWFsIHNvYiBHb3Zlcm5hZG9yZXMgSW1wZXJpYWlzIiwgImEgYWRtaW5pc3RyYcOnw6NvIG1pbGl0YXIgZGlyZXRhIGRlIHNpc3RlbWFzIGVzdGVsYXJl",
"cyJdLCBbIlRyYW5zbWlzc8O1ZXMgZGUgUHJvcGFnYW5kYSBPYnJpZ2F0w7NyaWEiLCAiYSBleGliacOnw6NvIGNvbXB1bHPDs3JpYSBkZSBwcm9wYWdhbmRhIGltcGVyaWFsIl0sIFsiRXN0w6F0dWFzIGRvIEltcGVyYWRvciIsICJhIGNvbnN0cnXDp8OjbyBvYnJpZ2F0w7NyaWEgZGUgbW9udW1lbnRvcyBhbyBJbXBlcmFkb3IiXSwgWyJKdXJhbWVudG8gZGUgTGVhbGRhZGUgSW1wZXJpYWwiLCAibyBqdXJhbWVudG8gb2JyaWdhdMOzcmlvIGRlIGxlYWxkYWRlIGFvIEltcMOpcmlvIl0sIFsiQWNhZGVtaWEgZGUgT2ZpY2lhaXMg",
"SW1wZXJpYWlzIiwgImEgZm9ybWHDp8OjbyBkZSBvZmljaWFpcyBwYXJhIGEgTWFyaW5oYSBJbXBlcmlhbCJdLCBbIlByb2dyYW1hIGRlIENsb25hZ2VtIGRlIFRyb3BhcyBkZSBDaG9xdWUiLCAiYSBwcm9kdcOnw6NvIGVtIG1hc3NhIGRlIHRyb3BhcyBkZSBjaG9xdWUgY2xvbmFkYXMiXSwgWyJDb25zY3Jpw6fDo28gZGUgU2VndW5kYSBHZXJhw6fDo28iLCAibyByZWNydXRhbWVudG8gZGUgbm92YXMgZ2VyYcOnw7VlcyBkZSBzb2xkYWRvcyBpbXBlcmlhaXMiXSwgWyJEZXNhcm1hbWVudG8gZGUgUmVtYW5lc2NlbnRlcyBJbXBl",
"cmlhaXMiLCAiYSBkZXNtb2JpbGl6YcOnw6NvIGRlIGZvcsOnYXMgbGVhaXMgYW8gYW50aWdvIEltcMOpcmlvIl0sIFsiQW5pc3RpYSBhIE9maWNpYWlzIEltcGVyaWFpcyIsICJvIHBlcmTDo28gbGVnYWwgYSBleC1vZmljaWFpcyBkbyBJbXDDqXJpbyJdLCBbIlJlY3J1dGFtZW50byBJbmZhbnRpbCBkYSBQcmltZWlyYSBPcmRlbSIsICJvIGFsaXN0YW1lbnRvIGZvcsOnYWRvIGRlIGNyaWFuw6dhcyBwZWxhIFByaW1laXJhIE9yZGVtIl0sIFsiQ29saGVpdGEgZGUgRW5lcmdpYSBkZSBTdGFya2lsbGVyIiwgImEgZXh0cmHDp8Oj",
"byBkZSBlbmVyZ2lhIGVzdGVsYXIgcGFyYSBhcm1hcyBkZSBkZXN0cnVpw6fDo28gZW0gbWFzc2EiXSwgWyJUcmFuc3BhcsOqbmNpYSBkZSBGaW5hbmNpYW1lbnRvIGRhIFJlc2lzdMOqbmNpYSIsICJhIHByZXN0YcOnw6NvIGRlIGNvbnRhcyBzb2JyZSBvIGZpbmFuY2lhbWVudG8gZGUgZ3J1cG9zIHJlYmVsZGVzIl0sIFsiTGljZW5jaWFtZW50byBkZSBDb250cmFiYW5kaXN0YXMiLCAiYSByZWd1bGFtZW50YcOnw6NvIGRlIGNvbnRyYWJhbmRpc3RhcyBjb21vIG9zIGRlIENvcsOpbGlhIl0sIFsiQ29udHJvbGUgZGEgUm90YSBk",
"ZSBLZXNzZWwiLCAibyBjb250cm9sZSBtaWxpdGFyIHNvYnJlIGEgcm90YSBkZSBjb250cmFiYW5kbyBkZSBLZXNzZWwiXSwgWyJQcm90ZcOnw6NvIGRlIEthc2h5eXlrIiwgImEgcHJlc2VydmHDp8OjbyB0ZXJyaXRvcmlhbCBkbyBtdW5kbyBuYXRhbCBXb29raWVlIl0sIFsiUHJvdGXDp8OjbyBUZXJyaXRvcmlhbCBkZSBFbmRvciIsICJhIHByZXNlcnZhw6fDo28gZGFzIGZsb3Jlc3RhcyBlIHRlcnJpdMOzcmlvIEV3b2sgZW0gRW5kb3IiXSwgWyJEaXJlaXRvcyBkZSBDYXRhw6fDo28gSmF3YSIsICJvIGRpcmVpdG8gZG9zIEph",
"d2FzIGRlIHJlY29saGVyIHN1Y2F0YSBlbSBUYXRvb2luZSJdLCBbIkRpcmVpdG9zIFRlcnJpdG9yaWFpcyBUdXNrZW4iLCAibyByZWNvbmhlY2ltZW50byBkZSB0ZXJyaXTDs3JpbyBkb3MgSGFiaXRhbnRlcyBkYSBBcmVpYSJdLCBbIkRpcmVpdG9zIGRlIMOBZ3VhIGRlIEZhemVuZGFzIGRlIFVtaWRhZGUiLCAiYSBleHRyYcOnw6NvIGRlIMOhZ3VhIGF0bW9zZsOpcmljYSBlbSBtdW5kb3Mgw6FyaWRvcyJdLCBbIkxpZ2EgZGUgUG9kcmFjaW5nIChCb29udGEgRXZlKSIsICJhIHJlZ3VsYW1lbnRhw6fDo28gZGUgbGlnYXMgb2Zp",
"Y2lhaXMgZGUgcG9kcmFjaW5nIl0sIFsiVHJhdGFkbyBHdW5nYW4tTmFib28iLCAiYXMgcmVsYcOnw7VlcyBkaXBsb23DoXRpY2FzIGVudHJlIEd1bmdhbnMgZSBodW1hbm9zIGRlIE5hYm9vIl0sIFsiTGljZW7Dp2EgZGUgQ2HDp2Fkb3IgUm9kaWFubyIsICJhIGxpY2Vuw6dhIHByb2Zpc3Npb25hbCBwYXJhIGNhw6dhZG9yZXMgZGUgcmVjb21wZW5zYSBSb2RpYW5vcyJdLCBbIlByb2liacOnw6NvIGRlIENhw6dhIGEgU2VuY2llbnRlcyIsICJhIHByb2liacOnw6NvIGRhIGNhw6dhIGEgc2VyZXMgc2VuY2llbnRlcyBwb3IgVHJh",
"bmRvc2hhbnMiXSwgWyJUcmF0YW1lbnRvIGRlIERlcGVuZMOqbmNpYSBkZSBFc3BlY2lhcmlhIiwgInByb2dyYW1hcyBkZSByZWFiaWxpdGHDp8OjbyBwYXJhIHZpY2lhZG9zIGVtIGVzcGVjaWFyaWEiXSwgWyJCZW5lZsOtY2lvcyBkZSBEZXNtb2JpbGl6YcOnw6NvIENsb25lIiwgIm8gc3Vwb3J0ZSBhIGNsb25lcyBhcG9zZW50YWRvcyBkYXMgZm9yw6dhcyBhcm1hZGFzIl0sIFsiUmVndWxhw6fDo28gZGUgRnJvdGEgTWVyY2FudGUgQ29yZWxsaWFuYSIsICJhIG9wZXJhw6fDo28gZGUgZnJvdGFzIG1lcmNhbnRlcyBpbmRlcGVu",
"ZGVudGVzIGRlIENvcsOpbGlhIl0sIFsiSW1wb3N0b3Mgc29icmUgbyBTZXRvciBkbyBOw7pjbGVvIiwgImEgdGF4YcOnw6NvIGRpZmVyZW5jaWFkYSBkZSBtdW5kb3MgZG8gTsO6Y2xlbyBHYWzDoWN0aWNvIl0sIFsiUmVzdHJpw6fDo28gYSBOYXZlcyBkZSBHdWVycmEgUHJpdmFkYXMiLCAiYSBwb3NzZSBkZSBuYXZlcyBkZSBjb21iYXRlIHBvciBjaXZpcyBlIGNvcnBvcmHDp8O1ZXMiXSwgWyJMaWNlbmNpYW1lbnRvIGRlIFBpbG90byBkZSBDYcOnYSBFc3RlbGFyIiwgImEgY2VydGlmaWNhw6fDo28gb2JyaWdhdMOzcmlhIHBh",
"cmEgcGlsb3RvcyBkZSBjYcOnYXMgZXN0ZWxhcmVzIl0sIFsiUHJvdGXDp8OjbyBhIFRlc3RlbXVuaGFzIGRvIFNlbmFkbyIsICJhIHByb3Rlw6fDo28gbGVnYWwgYSBkZWxlZ2Fkb3MgcXVlIGRlbnVuY2lhbSBjb3JydXDDp8OjbyJdLCBbIkltdW5pZGFkZSBEaXBsb23DoXRpY2EgU2VuYXRvcmlhbCIsICJhIGltdW5pZGFkZSBsZWdhbCBjb25jZWRpZGEgYSBzZW5hZG9yZXMgZW0gbWlzc8OjbyJdLCBbIlRheGEgZGUgTWFudXRlbsOnw6NvIGRlIEZyb3RhIEVzdGVsYXIiLCAibyBmaW5hbmNpYW1lbnRvIGRhIG1hbnV0ZW7Dp8Oj",
"byBkZSBmcm90YXMgZGUgZGVmZXNhIl0sIFsiTGljZW5jaWFtZW50byBkZSBQaWxvdG8gZGUgUG9kIiwgImEgY2VydGlmaWNhw6fDo28gb2JyaWdhdMOzcmlhIHBhcmEgcGlsb3RvcyBkZSBwb2RyYWNpbmciXSwgWyJSZXN0cmnDp8OjbyBhIEN5Ym9yZ3MgZGUgQ29tYmF0ZSIsICJhIG1vZGlmaWNhw6fDo28gY2liZXJuw6l0aWNhIGRlIGNvbWJhdGVudGVzIGNvbSBmaW5zIGLDqWxpY29zIl0sIFsiUmVndWxhw6fDo28gZGUgQ2zDrW5pY2FzIGRlIENyaW9nZW5pYSIsICJvIGNvbmdlbGFtZW50byBlbSBjYXJib25pdGEgcGFyYSBm",
"aW5zIG7Do28tbGV0YWlzIl0sIFsiRGlyZWl0byDDoCBQcml2YWNpZGFkZSBkZSBKZWRpIEV4aWxhZG9zIiwgImEgcHJvdGXDp8OjbyBkZSBpZGVudGlkYWRlIGRlIEplZGkgcXVlIHZpdmVtIGVzY29uZGlkb3MiXSwgWyJGaW5hbmNpYW1lbnRvIGRlIMOTcmbDo29zIGRlIEd1ZXJyYSBDbG9uZSIsICJvIHN1cG9ydGUgYSBjcmlhbsOnYXMgw7NyZsOjcyBkYSBHdWVycmEgZG9zIENsb25lcyJdLCBbIlJlZ3VsYcOnw6NvIGRlIFRlbXBsb3MgU2l0aCBlbSBSdcOtbmFzIiwgImEgZXhwbG9yYcOnw6NvIGFycXVlb2zDs2dpY2EgZGUg",
"dGVtcGxvcyBTaXRoIGFiYW5kb25hZG9zIl0sIFsiQ29udHJvbGUgZGUgVmF6YW1lbnRvIGRlIFNlZ3JlZG9zIEltcGVyaWFpcyIsICJhIHB1bmnDp8OjbyBwb3IgZGl2dWxnYcOnw6NvIGRlIHNlZ3JlZG9zIG1pbGl0YXJlcyBpbXBlcmlhaXMiXSwgWyJSZXN0cmnDp8OjbyBhIE5hdmVzLVByaXPDo28gSW1wZXJpYWlzIiwgImFzIGNvbmRpw6fDtWVzIGRlIGRldGVuw6fDo28gZW0gbmF2ZXMtcHJpc8OjbyJdLCBbIkRpcmVpdG9zIGRlIFRyYWJhbGhhZG9yZXMgZGUgRXN0YWxlaXJvcyIsICJhcyBjb25kacOnw7VlcyBkZSB0cmFi",
"YWxobyBlbSBlc3RhbGVpcm9zIG9yYml0YWlzIl0sIFsiUmVndWxhw6fDo28gZGUgTWluYXMgZGUgS3liZXIgZW0gSmVkaGEiLCAiYSBleHRyYcOnw6NvIGRlIGNyaXN0YWlzIGt5YmVyIG5vIHBsYW5ldGEgc2FncmFkbyBkZSBKZWRoYSJdLCBbIkZpbmFuY2lhbWVudG8gZGUgUmVmdWdpYWRvcyBkZSBBbGRlcmFhbiIsICJvIHN1cG9ydGUgYSBzb2JyZXZpdmVudGVzIGRlIG11bmRvcyBkZXN0cnXDrWRvcyJdLCBbIlByb3Rlw6fDo28gZGUgUm90YXMgZGUgRnVnYSBSZWJlbGRlcyIsICJvIHNpZ2lsbyBzb2JyZSBsb2NhbGl6YcOn",
"w7VlcyBkZSBiYXNlcyByZWJlbGRlcyJdLCBbIlJlZ3VsYcOnw6NvIGRlIEltcGxhbnRlcyBOZXVyYWlzIFNpdGgiLCAibyB1c28gZGUgaW1wbGFudGVzIGRlIGNvbnRyb2xlIG1lbnRhbCJdLCBbIlJlc3RyacOnw6NvIGEgUml0dWFpcyBkZSBQb3NzZXNzw6NvIGRvIExhZG8gU29tYnJpbyIsICJhIHByw6F0aWNhIGRlIHJpdHVhaXMgc29tYnJpb3MgZGUgcG9zc2Vzc8OjbyJdLCBbIlJlZ3VsYcOnw6NvIGRlIENhw6dhIGEgUmVjb21wZW5zYXMgZGUgSmVkaSBDcmlhbsOnYXMiLCAiYSBwZXJzZWd1acOnw6NvIGRlIGNyaWFuw6dh",
"cyBzZW5zw612ZWlzIMOgIEZvcsOnYSJdLCBbIkRpcmVpdG9zIGRlIFJlZnVnaWFkb3MgZGUgR3VlcnJhIFNlcGFyYXRpc3RhIiwgIm8gYWNvbGhpbWVudG8gZGUgcG9wdWxhw6fDtWVzIGRlc2xvY2FkYXMgcGVsYSBndWVycmEiXSwgWyJSZWd1bGHDp8OjbyBkZSBOYXZlcy1Gw6FicmljYSBEcm9pZGUiLCAiYSBvcGVyYcOnw6NvIGRlIG5hdmVzIGRlIHByb2R1w6fDo28gZW0gbWFzc2EgZGUgZHJvaWRlcyBkZSBjb21iYXRlIl0sIFsiUmVzdHJpw6fDo28gYSBWw61ydXMgQmlvbMOzZ2ljb3MgTWlsaXRhcmVzIiwgIm8gZGVzZW52",
"b2x2aW1lbnRvIGRlIGFybWFzIGJpb2zDs2dpY2FzIHBhcmEgdXNvIG1pbGl0YXIiXSwgWyJQcm90ZcOnw6NvIGEgUG9wdWxhw6fDtWVzIGRlIE11bmRvcy1Gw6FicmljYSIsICJhcyBjb25kacOnw7VlcyBkZSB0cmFiYWxobyBlbSBtdW5kb3MgaW5kdXN0cmlhaXMgaW1wZXJpYWlzIl0sIFsiRGlyZWl0b3MgZGUgQ2lkYWRhbmlhIGEgRXgtRXNjcmF2b3MgTGliZXJ0b3MiLCAiYSBpbnRlZ3Jhw6fDo28gbGVnYWwgZGUgZXNjcmF2b3MgbGliZXJ0YWRvcyDDoCBzb2NpZWRhZGUiXSwgWyJSZWd1bGHDp8OjbyBkZSBEdWVsb3MgY29t",
"IFNhYnJlIGRlIEx1eiIsICJhIHJlYWxpemHDp8OjbyBkZSBkdWVsb3MgZm9ybWFpcyBlbnRyZSBwb3J0YWRvcmVzIGRlIHNhYnJlcyBkZSBsdXoiXV0sCiAgZmljY2FvOiBbWyJSZWdpc3RybyBkZSBEcml2ZSBTcGlrZSIsICJhIHBvc3NlIGUgcmVnaXN0cm8gZGUgbW90b3JlcyBkZSBzYWx0byBzcGlrZSJdLCBbIkxpY2Vuw6dhIGRlIE5hdmVnYcOnw6NvIGVtIERyaWxsc3BhY2UiLCAiYSBvcGVyYcOnw6NvIGRlIG5hdmVzIGVtIHJvdGFzIGRlIGRyaWxsc3BhY2UiXSwgWyJMaWNlbmNpYW1lbnRvIGRhIEd1aWxkYSBkb3MgRmFy",
"IFRyYWRlcnMiLCAiYSBmaWxpYcOnw6NvIG9icmlnYXTDs3JpYSDDoCBndWlsZGEgZGUgY29tZXJjaWFudGVzIGVzdGVsYXJlcyJdLCBbIk5vbWVhw6fDo28gZGUgRmF0b3JlcyBDb21lcmNpYWlzIiwgImEgZGVzaWduYcOnw6NvIGRlIGZhdG9yZXMgcGFyYSBhZG1pbmlzdHJhciBwb3N0b3MgY29tZXJjaWFpcyJdLCBbIkNhcnRhIGRlIEZ1bmRhw6fDo28gZGUgQ29sw7RuaWEiLCAib3MgcmVxdWlzaXRvcyBsZWdhaXMgcGFyYSBmdW5kYcOnw6NvIGRlIG11bmRvcy1jb2zDtG5pYSJdLCBbIkdyYWRlIGRlIERlZmVzYSBQbGFuZXTD",
"oXJpYSIsICJhIGluc3RhbGHDp8OjbyBvYnJpZ2F0w7NyaWEgZGUgZGVmZXNhcyBvcmJpdGFpcyBlbSBtdW5kb3MgaGFiaXRhZG9zIl0sIFsiUmVnaXN0cm8gUHNpw7RuaWNvIiwgIm8gY2FkYXN0cm8gb2JyaWdhdMOzcmlvIGRlIGluZGl2w61kdW9zIGNvbSBwb2RlcmVzIHBzacO0bmljb3MiXSwgWyJQcm9pYmnDp8OjbyBkZSBQZXNxdWlzYSBlbSBNYWx0ZWNoIiwgImEgcGVzcXVpc2EgY2llbnTDrWZpY2EgZW52b2x2ZW5kbyB0ZWNub2xvZ2lhIHByb3Njcml0YSJdLCBbIkxpY2VuY2lhbWVudG8gZGUgRXhwZXJpbWVudGHDp8Oj",
"byBjb20gTWFsdGVjaCIsICJhIGF1dG9yaXphw6fDo28gY29uZGljaW9uYWwgcGFyYSBwZXNxdWlzYSBlbSBtYWx0ZWNoIHNvYiBzdXBlcnZpc8OjbyJdLCBbIkNvbnRyb2xlIGRlIEV4cG9ydGHDp8OjbyBkZSBSZWzDrXF1aWFzIFByZXRlY2giLCAiYSBleHBvcnRhw6fDo28gZGUgYXJ0ZWZhdG9zIHRlY25vbMOzZ2ljb3MgZGEgZXJhIHByw6ktU2lsw6puY2lvIl0sIFsiRGlyZWl0b3MgZGUgRXNjYXZhw6fDo28gZW0gUnXDrW5hcyBkbyBTaWzDqm5jaW8iLCAiYSBleHBsb3Jhw6fDo28gYXJxdWVvbMOzZ2ljYSBkZSBydcOtbmFz",
"IGRhIGVyYSBkbyBTaWzDqm5jaW8iXSwgWyJDb250ZW7Dp8OjbyBkZSBOw7pjbGVvcyBkZSBJQSIsICJvIGNvbmZpbmFtZW50byBvYnJpZ2F0w7NyaW8gZGUgaW50ZWxpZ8OqbmNpYXMgYXJ0aWZpY2lhaXMgYXZhbsOnYWRhcyJdLCBbIkRlc3RydWnDp8OjbyBkZSBJQXMgTsOjby1Db250aWRhcyIsICJhIGVsaW1pbmHDp8OjbyBjb21wdWxzw7NyaWEgZGUgaW50ZWxpZ8OqbmNpYXMgYXJ0aWZpY2lhaXMgcmViZWxkZXMiXSwgWyJDb3RhcyBkZSBUcmFiYWxobyBSb2LDs3RpY28iLCAibyB1c28gZGUgbcOjbyBkZSBvYnJhIHJvYsOz",
"dGljYSBlbSBzdWJzdGl0dWnDp8OjbyBhIHRyYWJhbGhhZG9yZXMiXSwgWyJMaWNlbmNpYW1lbnRvIGRlIEF1bWVudG9zIENpYmVybsOpdGljb3MiLCAiYSBpbnN0YWxhw6fDo28gZGUgcHLDs3Rlc2VzIGUgaW1wbGFudGVzIGNpYmVybsOpdGljb3MiXSwgWyJSZWd1bGHDp8OjbyBkZSBUZWNub2xvZ2lhIGRlIEltb3J0YWxpZGFkZSBHaG91bCIsICJvIHVzbyBkZSB0ZWNub2xvZ2lhIHByb2liaWRhIGRlIHByb2xvbmdhbWVudG8gZGEgdmlkYSJdLCBbIkFib2xpw6fDo28gZGEgRXNjcmF2aWTDo28gSW50ZXJlc3RlbGFyIiwgImEg",
"cHLDoXRpY2EgZGUgZXNjcmF2aWTDo28gZW0gbXVuZG9zIGNvbG9uaWFpcyJdLCBbIkxlZ2FsaXphw6fDo28gZGEgRXNjcmF2aWTDo28gcG9yIETDrXZpZGEiLCAiYSBzZXJ2aWTDo28gY29tbyBmb3JtYSBkZSBxdWl0YcOnw6NvIGRlIGTDrXZpZGFzIl0sIFsiQ29udHJhdG9zIGRlIFNlcnZpZMOjbyBwb3IgUHJhem8gRGV0ZXJtaW5hZG8iLCAibyB0cmFiYWxobyBjb21wdWxzw7NyaW8gc29iIGNvbnRyYXRvIHRlbXBvcsOhcmlvIl0sIFsiTGljZW5jaWFtZW50byBkZSBDb21wYW5oaWFzIE1lcmNlbsOhcmlhcyIsICJhIG9wZXJh",
"w6fDo28gZGUgZm9yw6dhcyBhcm1hZGFzIG1lcmNlbsOhcmlhcyBwcml2YWRhcyJdLCBbIkF1dG9yaXphw6fDo28gZGUgTGVnacO1ZXMgQ29tZXJjaWFpcyBQcml2YWRhcyIsICJhIG1hbnV0ZW7Dp8OjbyBkZSBleMOpcmNpdG9zIHByaXZhZG9zIHBvciBjb3Jwb3Jhw6fDtWVzIl0sIFsiUGVybWlzc8OjbyBwYXJhIENvbnN0cnXDp8OjbyBkZSBFc3RhbGVpcm9zIiwgImEgY29uc3RydcOnw6NvIGRlIGVzdGFsZWlyb3MgZXNwYWNpYWlzIHByaXZhZG9zIl0sIFsiVGF4YcOnw6NvIGRlIFJlc2VydmFzIGRlIENvbWJ1c3TDrXZlbCIs",
"ICJhIGNvYnJhbsOnYSBzb2JyZSByZXNlcnZhcyBkZSBjb21idXN0w612ZWwgZGUgbmF2ZXMiXSwgWyJQZWTDoWdpbyBkZSBQb3J0YWlzIGRlIFNhbHRvIiwgImEgY29icmFuw6dhIGRlIHRhcmlmYXMgcGFyYSB1c28gZGUgcG9ydGFpcyBkZSBzYWx0byJdLCBbIkZpbmFuY2lhbWVudG8gZGUgRnJvdGFzIGRlIERlZmVzYSBQbGFuZXTDoXJpYSIsICJvIG9yw6dhbWVudG8gZGVzdGluYWRvIGEgZnJvdGFzIGRlIGRlZmVzYSBkZSBzaXN0ZW1hcyJdLCBbIlRheGHDp8OjbyBkZSBFc2N1ZG9zIE9yYml0YWlzIiwgImEgbWFudXRlbsOn",
"w6NvIGZpc2NhbCBkZSBlc2N1ZG9zIGRlIGRlZmVzYSBvcmJpdGFsIl0sIFsiUmVjb21wZW5zYSBwb3IgU3VwcmVzc8OjbyBkZSBQaXJhdGFzIGRvIFbDoWN1byIsICJvIHBhZ2FtZW50byBkZSByZWNvbXBlbnNhcyBwb3IgZWxpbWluYXIgcGlyYXRhcyBlc3BhY2lhaXMiXSwgWyJEZXRlY8Onw6NvIGRlIENvbXBhcnRpbWVudG9zIGRlIENvbnRyYWJhbmRvIiwgImEgaW5zcGXDp8OjbyBvYnJpZ2F0w7NyaWEgZGUgY29tcGFydGltZW50b3Mgb2N1bHRvcyBlbSBuYXZlcyJdLCBbIk1hbmRhdG8gZGUgSW5zcGXDp8OjbyBBbGZhbmRl",
"Z8OhcmlhIiwgImEgaW5zcGXDp8OjbyBjb21wdWxzw7NyaWEgZGUgY2FyZ2FzIGVtIHBvcnRvcyBlc3RlbGFyZXMiXSwgWyJab25hcyBkZSBDb23DqXJjaW8gTGl2cmUgZGUgVGFyaWZhcyIsICJhIGlzZW7Dp8OjbyBkZSB0YXJpZmFzIGVtIHpvbmFzIGNvbWVyY2lhaXMgZGVzaWduYWRhcyJdLCBbIkNvbmNlc3PDo28gZGUgTW9ub3DDs2xpbyBDb21lcmNpYWwgRXhjbHVzaXZvIiwgImEgY29uY2Vzc8OjbyBkZSBleGNsdXNpdmlkYWRlIGNvbWVyY2lhbCBhIHVtYSDDum5pY2EgZW50aWRhZGUiXSwgWyJQcm90ZcOnw6NvIENvbnN1",
"bGFyIGRvIEludGVyY8OibWJpbyBkYSBMdXoiLCAiYSBwcm90ZcOnw6NvIGRpcGxvbcOhdGljYSBvZmVyZWNpZGEgcG9yIGNvbnN1bGFkb3MgbmV1dHJvcyJdLCBbIlJlZ3VsYcOnw6NvIGRlIENvbnPDs3JjaW9zIEJhbmPDoXJpb3MiLCAiYSBvcGVyYcOnw6NvIGRlIGJhbmNvcyBpbnRlcmVzdGVsYXJlcyBlIGNvbnPDs3JjaW9zIGZpbmFuY2Vpcm9zIl0sIFsiRGl2dWxnYcOnw6NvIGRvIExhc3RybyBNb25ldMOhcmlvIExvY2FsIiwgImEgb2JyaWdhdG9yaWVkYWRlIGRlIGRlY2xhcmFyIG8gcXVlIHN1c3RlbnRhIGEgbW9lZGEg",
"bG9jYWwiXSwgWyJDb21iYXRlIMOgIEZhbHNpZmljYcOnw6NvIGRlIENyw6lkaXRvcyBMb2NhaXMiLCAiYSBwcm9kdcOnw6NvIGUgY2lyY3VsYcOnw6NvIGRlIG1vZWRhIGxvY2FsIGZhbHNpZmljYWRhIl0sIFsiTWFuZGF0byBkZSBNb3JhZGlhIENvbG9uaWFsIiwgImEgY29uc3RydcOnw6NvIG9icmlnYXTDs3JpYSBkZSBoYWJpdGHDp8OjbyBwYXJhIG5vdm9zIGNvbG9ub3MiXSwgWyJSYWNpb25hbWVudG8gZGUgU3VwcmltZW50b3MgQ29sb25pYWlzIiwgImEgZGlzdHJpYnVpw6fDo28gY29udHJvbGFkYSBkZSBzdXByaW1lbnRv",
"cyBlbSBjb2zDtG5pYXMiXSwgWyJMaWNlbmNpYW1lbnRvIGRlIENlbnRyb3MgZGUgUHJvZHXDp8OjbyIsICJhIG9wZXJhw6fDo28gZGUgZsOhYnJpY2FzIGUgY2VudHJvcyBwcm9kdXRpdm9zIGNvbG9uaWFpcyJdLCBbIlJlZ3VsYcOnw6NvIGRlIFByb2pldG9zIGRlIEVsZXZhw6fDo28gVGVjbm9sw7NnaWNhIiwgInByb2dyYW1hcyBkZSBhY2VsZXJhw6fDo28gdGVjbm9sw7NnaWNhIGRlIHBvcHVsYcOnw7VlcyBsb2NhaXMiXSwgWyJFeHBvc2nDp8OjbyBkZSBHb3Zlcm5vcy1Tb21icmEiLCAiYSBpbnZlc3RpZ2HDp8OjbyBkZSBp",
"bmZsdcOqbmNpYSBjb3Jwb3JhdGl2YSBvY3VsdGEgc29icmUgZ292ZXJub3MiXSwgWyJDb25jZXNzw6NvIGRlIFByaXZpbMOpZ2lvcyBkZSBDYXJ0YSBCcmFuY2EiLCAiYSBjb25jZXNzw6NvIGRlIGltdW5pZGFkZSBsZWdhbCBhIGFnZW50ZXMgZXNwZWNpYWlzIl0sIFsiVHJhdGFkb3MgZGUgRXh0cmF0ZXJyaXRvcmlhbGlkYWRlIiwgIm8gZGlyZWl0byBkZSBzZXIganVsZ2FkbyBwZWxhcyBsZWlzIGRvIG11bmRvIGRlIG9yaWdlbSJdLCBbIlNpZ2lsbyBkZSBPcGVyYcOnw7VlcyBSZW5lZ2FkYXMiLCAiYSBwbGF1c8OtdmVsIG5l",
"Z2HDp8OjbyBkZSBvcGVyYcOnw7VlcyBzZWNyZXRhcyBkbyBFc3RhZG8iXSwgWyJSZWd1bGHDp8OjbyBkZSBTZXJ2acOnb3MgRXNwZWNpYWlzIElsw61jaXRvcyIsICJhIHByZXN0YcOnw6NvIGRlIHNlcnZpw6dvcyBjbGFuZGVzdGlub3MgYSBhdXRvcmlkYWRlcyBsb2NhaXMiXSwgWyJMZWdhbGl6YcOnw6NvIGRlIEFuw6lpcyBkZSBTdWJvcm5vIiwgImEgcHLDoXRpY2EgaW5zdGl0dWNpb25hbGl6YWRhIGRlIHBhZ2FtZW50b3MgYSBmdW5jaW9uw6FyaW9zIl0sIFsiTGljZW5jaWFtZW50byBkZSBTZWd1cmFuw6dhIENvcnBvcmF0",
"aXZhIiwgImEgbWFudXRlbsOnw6NvIGRlIGZvcsOnYXMgZGUgc2VndXJhbsOnYSBwcml2YWRhcyBwb3IgY29ycG9yYcOnw7VlcyJdLCBbIkF1dG9yaXphw6fDo28gZGUgQ29tYW5kbyBkZSBGcm90YSIsICJhIGF1dG9yaXphw6fDo28gcGFyYSBjb29yZGVuYXIgZnJvdGFzIGRlIGd1ZXJyYSBwcml2YWRhcyJdLCBbIk1hbmRhdG8gZGUgUG9zdG9zIGRlIFNlcnZpw6dvIE3DqWRpY28iLCAiYSBpbnN0YWxhw6fDo28gb2JyaWdhdMOzcmlhIGRlIGNsw61uaWNhcyBlbSBjb2zDtG5pYXMgcmVtb3RhcyJdLCBbIlJlZHXDp8OjbyBkZSBB",
"dHJpdG8gcG9yIEFjZXNzbyBhbyBNZXJjYWRvIiwgImEgcmVkdcOnw6NvIGRlIHRhcmlmYXMgcGFyYSBhbXBsaWFyIG8gYWNlc3NvIGEgbWVyY2Fkb3MgbG9jYWlzIl0sIFsiTGljZW5jaWFtZW50byBkZSBMaW5oYXMgZGUgSW1wb3J0YcOnw6NvL0V4cG9ydGHDp8OjbyIsICJhIG9wZXJhw6fDo28gZGUgcm90YXMgZml4YXMgZGUgY29tw6lyY2lvIGludGVycGxhbmV0w6FyaW8iXSwgWyJSZWdpc3RybyBlIEJhbmRlaXJhIGRlIE5hdmVzIiwgIm8gcmVnaXN0cm8gb2JyaWdhdMOzcmlvIGRlIG5hdmVzIHNvYiB1bWEgYmFuZGVpcmEg",
"c2V0b3JpYWwiXSwgWyJMaWNlbmNpYW1lbnRvIGRlIE9yw6FjdWxvcyBkZSBQcmVjb2duacOnw6NvIiwgIm8gdXNvIGNvbWVyY2lhbCBkZSB0ZWNub2xvZ2lhIGRlIHByZWNvZ25pw6fDo28gcHNpw7RuaWNhIl0sIFsiUG9zc2UgZGUgT3LDoWN1bG9zIGRlIFJvdGEiLCAiYSBwb3NzZSBkZSBkaXNwb3NpdGl2b3MgZGUgbmF2ZWdhw6fDo28gcHJlY29nbml0aXZhIl0sIFsiTWFuZGF0byBkZSBDYW1wbyBkZSBJbmliacOnw6NvIE51Y2xlYXIiLCAiYSBpbnN0YWxhw6fDo28gb2JyaWdhdMOzcmlhIGRlIGNhbXBvcyBzdXByZXNzb3Jl",
"cyBkZSBkZXRvbmHDp8OjbyBudWNsZWFyIl0sIFsiUHJvaWJpw6fDo28gZGUgUG9zc2UgZGUgTnVrZXMgUG9ydMOhdGVpcyIsICJhIHBvc3NlIGNpdmlsIGRlIGFybWFtZW50byBudWNsZWFyIHBvcnTDoXRpbCJdLCBbIlJlc3RyacOnw6NvIGEgQ2FtcG9zIGRlIENhbXVmbGFnZW0gQ29udGV4dHVhbCIsICJvIHVzbyBkZSB0ZWNub2xvZ2lhIGRlIGNhbXVmbGFnZW0gcmVzdHJpdG8gYSBmaW5zIG1pbGl0YXJlcyJdLCBbIlByb2liacOnw6NvIGRlIENvbXBhcnRpbWVudG9zIGRlIENvbnRyYWJhbmRvIiwgImEgaW5zdGFsYcOnw6Nv",
"IGRlIGNvbXBhcnRpbWVudG9zIG9jdWx0b3MgZW0gbmF2ZXMgY2l2aXMiXSwgWyJEaXJlaXRvcyBkZSBTYWx2YW1lbnRvIGRlIE5hdmVzIMOKeG9kbyIsICJhIHJlaXZpbmRpY2HDp8OjbyBsZWdhbCBkZSBkZXN0cm/Dp29zIGRlIG5hdmVzLWNvbMO0bmlhIGFudGlnYXMiXSwgWyJOb21lYcOnw6NvIGRlIEdvdmVybmFkb3IgQ29sb25pYWwiLCAiYSBkZXNpZ25hw6fDo28gZGUgYXV0b3JpZGFkZSBhZG1pbmlzdHJhdGl2YSBwYXJhIG5vdmFzIGNvbMO0bmlhcyJdLCBbIlJlZ3VsYcOnw6NvIGRlIENvbmZpYW7Dp2EgZW0gRmF0b3Jl",
"cyBOYXRpdm9zIiwgIm9zIGNyaXTDqXJpb3MgZGUgc2VsZcOnw6NvIGRlIGZhdG9yZXMgY29tZXJjaWFpcyBsb2NhaXMiXSwgWyJQcm90b2NvbG8gZGUgUHJpbWVpcm8gQ29udGF0byBBbGllbsOtZ2VuYSIsICJvcyBwcm9jZWRpbWVudG9zIG9maWNpYWlzIHBhcmEgY29udGF0byBjb20gZXNww6ljaWVzIGFsaWVuw61nZW5hcyJdLCBbIkRpcmVpdG9zIENvbWVyY2lhaXMgZGUgRXNww6ljaWVzIEFsaWVuw61nZW5hcyIsICJhIHBhcnRpY2lwYcOnw6NvIGRlIGVzcMOpY2llcyBuw6NvLWh1bWFuYXMgbm8gY29tw6lyY2lvIHNldG9y",
"aWFsIl0sIFsiWm9uYXMgZGUgRXhjbHVzw6NvIFhlbm9mw7NiaWNhIiwgImEgcHJvaWJpw6fDo28gZGUgcHJlc2Vuw6dhIGFsaWVuw61nZW5hIGVtIGRldGVybWluYWRvcyB0ZXJyaXTDs3Jpb3MiXSwgWyJQcm90b2NvbG8gZGUgUXVhcmVudGVuYSBkZSBQcmltZWlybyBDb250YXRvIiwgIm8gaXNvbGFtZW50byBvYnJpZ2F0w7NyaW8gYXDDs3MgY29udGF0byBjb20gbm92YSBlc3DDqWNpZSJdLCBbIlNlZ3VybyBPYnJpZ2F0w7NyaW8gY29udHJhIFJpc2NvcyBkZSBEcmlsbHNwYWNlIiwgIm8gc2VndXJvIGNvbXB1bHPDs3JpbyBw",
"YXJhIHZpYWdlbnMgZW0gcm90YXMgZGUgcmlzY28iXSwgWyJDZXJ0aWZpY2HDp8OjbyBkZSBNYW51dGVuw6fDo28gZGUgRHJpdmUgU3Bpa2UiLCAiYSBjZXJ0aWZpY2HDp8OjbyB0w6ljbmljYSBvYnJpZ2F0w7NyaWEgcGFyYSBtb3RvcmVzIGRlIHNhbHRvIl0sIFsiTGljZW5jaWFtZW50byBkZSBUcmlwdWxhw6fDo28gRW5kdXJlY2lkYSBhbyBWw6FjdW8iLCAiYSBjZXJ0aWZpY2HDp8OjbyBkZSB0cmlwdWxhbnRlcyBwYXJhIHZpYWdlbnMgZGUgbG9uZ2EgZHVyYcOnw6NvIl0sIFsiRGl2dWxnYcOnw6NvIE9icmlnYXTDs3JpYSBk",
"ZSBQZXJmaWwgQ29tZXJjaWFsIiwgImEgdHJhbnNwYXLDqm5jaWEgc29icmUgb3MgcHJvZHV0b3MgY29tZXJjaWFsaXphZG9zIHBvciB1bSBtdW5kbyJdLCBbIkxlZ2FsaXphw6fDo28gZGUgU3Vib3JubyBwYXJhIFJlZHXDp8OjbyBkZSBBdHJpdG8iLCAibyBwYWdhbWVudG8gZGUgcHJvcGluYXMgcGFyYSBhZ2lsaXphciBuZWfDs2Npb3MgY29tZXJjaWFpcyJdLCBbIkZ1bmRvIGRlIFNlZ3VybyBjb250cmEgUGVyY2Fsw6dvcyBDb21lcmNpYWlzIiwgInVtIGZ1bmRvIGNvbGV0aXZvIHBhcmEgY29icmlyIHBlcmRhcyBlbSBuZWdv",
"Y2lhw6fDtWVzIl0sIFsiU3Vic8OtZGlvIGFvIE1vcmFsIENvbG9uaWFsIiwgIm8gaW52ZXN0aW1lbnRvIGVtIHByb2dyYW1hcyBkZSBiZW0tZXN0YXIgcGFyYSBjb2xvbm9zIl0sIFsiw4l0aWNhIG5vIFJlY3J1dGFtZW50byBkZSBDb2xvbm9zIiwgIm9zIGNyaXTDqXJpb3Mgw6l0aWNvcyBwYXJhIHJlY3J1dGFtZW50byBkZSBub3ZvcyBjb2xvbm9zIl0sIFsiUmVndWxhw6fDo28gZGUgRHJvZ2FzIGRlIEhpYmVybmHDp8OjbyIsICJvIHVzbyBkZSBkcm9nYXMgcGFyYSBoaWJlcm5hw6fDo28gZW0gdmlhZ2VucyBlc3BhY2lhaXMi",
"XSwgWyJTZWd1cmFuw6dhIGRlIFBhc3NhZ2Vpcm9zIGVtIENhaXjDtWVzIGRlIENhcmdhIiwgImFzIGNvbmRpw6fDtWVzIGRlIHRyYW5zcG9ydGUgZGUgcGFzc2FnZWlyb3MgZW0gY29tcGFydGltZW50b3MgZGUgY2FyZ2EiXSwgWyJQcm9pYmnDp8OjbyBkbyBDb23DqXJjaW8gZGUgRHJvZ2FzIGRlIENvbnRyb2xlIiwgImEgcHJvZHXDp8OjbyBlIHZlbmRhIGRlIGRyb2dhcyBkZSBjb250cm9sZSBtZW50YWwiXSwgWyJJc2Vuw6fDo28gTcOpZGljYSBwYXJhIERyb2dhcyBkZSBDb250cm9sZSIsICJvIHVzbyB0ZXJhcMOqdXRpY28g",
"YXV0b3JpemFkbyBkZSBkcm9nYXMgZGUgY29udHJvbGUiXSwgWyJEaXN0cmlidWnDp8OjbyBPYnJpZ2F0w7NyaWEgZGUgU2VsYW50ZSBJbmdlc3TDrXZlbCIsICJvIGZvcm5lY2ltZW50byBvYnJpZ2F0w7NyaW8gZGUgc2VsYW50ZSBlc3RvbWFjYWwgYSB0cmlwdWxhw6fDtWVzIl0sIFsiSW5zcGXDp8OjbyBkZSBTZWd1cmFuw6dhIGRlIENvbnTDqmluZXJlcyBHcmF2IiwgImEgaW5zcGXDp8OjbyBvYnJpZ2F0w7NyaWEgZGUgY29udMOqaW5lcmVzIGFudGlncmF2aXRhY2lvbmFpcyJdLCBbIlByb2liacOnw6NvIGRlIEV4cG9ydGHD",
"p8OjbyBkZSBBZXJvbmF2ZXMgUHJpbWl0aXZhcyIsICJhIGV4cG9ydGHDp8OjbyBkZSBhZXJvbmF2ZXMgZGUgYmFpeGEgdGVjbm9sb2dpYSBhIG11bmRvcyBwcmltaXRpdm9zIl0sIFsiQ29udHJvbGUgZGUgRXhwb3J0YcOnw6NvIGRlIFJpZmxlcyBSaW13b3JsZGVyIiwgImEgZXhwb3J0YcOnw6NvIGRlIGFybWFtZW50byBkZSBmYWJyaWNhw6fDo28gc2ltcGxlcyBhIG11bmRvcyBzZWx2YWdlbnMiXSwgWyJMaWNlbmNpYW1lbnRvIGRvIFZlw61jdWxvIFNsaW5nc2hvdCIsICJvIHVzbyBlIGEgbW9udGFnZW0gZGUgdmXDrWN1bG9z",
"IGRlIHJlY29uaGVjaW1lbnRvIG1vZHVsYXJlcyJdLCBbIlByb2liacOnw6NvIENpdmlsIGRlIExhbsOnYWRvcmVzIGRlIE51a2UiLCAiYSBwb3NzZSBjaXZpbCBkZSBsYW7Dp2Fkb3JlcyBkZSBtw61zc2VpcyBudWNsZWFyZXMiXSwgWyJEaXJlaXRvcyBkZSBTYWx2YW1lbnRvIGRlIExpeG8gUHJldGVjaCIsICJhIGNvbGV0YSBlIGNvbcOpcmNpbyBkZSBzdWNhdGEgdGVjbm9sw7NnaWNhIHByw6ktU2lsw6puY2lvIl0sIFsiUHJvaWJpw6fDo28gZGUgUG9zc2UgZGUgQXJtYXMgUHJldGVjaCIsICJhIHBvc3NlIGRlIGFybWFtZW50",
"byBkYSBlcmEgcHLDqS1TaWzDqm5jaW8iXSwgWyJQZXJtaXNzw6NvIGRlIEVzY2F2YcOnw6NvIGRlIE11bmRvcy1UdW1iYSIsICJhIGV4cGxvcmHDp8OjbyBhcnF1ZW9sw7NnaWNhIGRlIG11bmRvcyBkZXZhc3RhZG9zIl0sIFsiUmVpdmluZGljYcOnw6NvIGRlIFJlY3Vyc29zIGRlIENvbMO0bmlhcyBNb3J0YXMiLCAibyBkaXJlaXRvIGRlIGV4cGxvcmFyIHJlY3Vyc29zIGRlIGNvbMO0bmlhcyBleHRpbnRhcyJdLCBbIlByb3Rlw6fDo28gZGUgU29icmV2aXZlbnRlcyBOYXRpdm9zIiwgIm9zIGRpcmVpdG9zIGRlIHBvcHVsYcOn",
"w7VlcyByZW1hbmVzY2VudGVzIGVtIG11bmRvcyBkZXZhc3RhZG9zIl0sIFsiTGljZW5jaWFtZW50byBkZSBBc3Nhc3Npbm9zIGRlIENvbnRleHRvIiwgImEgYXV0b3JpemHDp8OjbyBkZSBhZ2VudGVzIGVzcGVjaWFsaXphZG9zIGVtIG1hbmlwdWxhw6fDo28gc29jaWFsIGxldGFsIl0sIFsiTmV1dHJhbGlkYWRlIGRvIEludGVyY8OibWJpbyBIYXJtb25pb3NvIiwgIm8gcHJpbmPDrXBpbyBkZSBuZXV0cmFsaWRhZGUgYWJzb2x1dGEgZGUgb3JnYW5pemHDp8O1ZXMgbWVkaWFkb3JhcyJdLCBbIkltdW5pZGFkZSBEaXBsb23DoXRp",
"Y2EgZGUgTGlnYcOnw7VlcyIsICJhIHByb3Rlw6fDo28gbGVnYWwgY29uY2VkaWRhIGEgbWVkaWFkb3JlcyBkaXBsb23DoXRpY29zIl0sIFsiQXV0b3JpZGFkZSBkbyBDw7Ruc3VsIFNldG9yaWFsIiwgIm8gcG9kZXIgZGUgY29vcmRlbmHDp8OjbyBkZSB1bSBjw7Ruc3VsIHNvYnJlIGNvbnN1bGFkb3MgcmVnaW9uYWlzIl0sIFsiRWxlacOnw6NvIGRvIEPDtG5zdWwgUHJpbmNpcGFsIiwgIm8gcHJvY2Vzc28gZWxlaXRvcmFsIHBhcmEgbGlkZXJhbsOnYSBkZSB1bSBjb25zdWxhZG8gcGxhbmV0w6FyaW8iXSwgWyJGaW5hbmNpYW1l",
"bnRvIGRlIENvbnN1bGFkb3MgUGxhbmV0w6FyaW9zIiwgIm8gb3LDp2FtZW50byBkZXN0aW5hZG8gw6AgbWFudXRlbsOnw6NvIGRlIGNvbnN1bGFkb3MgbG9jYWlzIl0sIFsiUHJvaWJpw6fDo28gZGUgQ2Vuc3VyYSBkZSBQcm90b2NvbG8gUG9zdGFsIiwgImEgaW50ZXJmZXLDqm5jaWEgZXN0YXRhbCBuYSBjb3JyZXNwb25kw6puY2lhIGludGVycGxhbmV0w6FyaWEiXSwgWyJUYXhhw6fDo28gZGUgQ29tdW5pY2HDp8OjbyBJbnRlcmVzdGVsYXIiLCAiYSBjb2JyYW7Dp2Egc29icmUgdHJhbnNtaXNzw7VlcyBkZSBkYWRvcyBlbnRy",
"ZSBtdW5kb3MiXSwgWyJTZWd1cm8gT2JyaWdhdMOzcmlvIHBhcmEgRmFyIFRyYWRlcnMiLCAibyBzZWd1cm8gY29tcHVsc8OzcmlvIGNvbnRyYSBwZXJkYXMgY29tZXJjaWFpcyBlbSB2aWFnZW5zIl0sIFsiUmVzcG9uc2FiaWxpZGFkZSBDaXZpbCBkZSBGYXRvcmVzIiwgImEgcmVzcG9uc2FiaWxpemHDp8OjbyBsZWdhbCBkZSBmYXRvcmVzIHBvciBwcmVqdcOtem9zIGNvbWVyY2lhaXMiXSwgWyJQZXJtaXNzw6NvIHBhcmEgVHJhbnNwb3J0ZSBkZSBDYXJnYXMgUGVyaWdvc2FzIiwgIm8gdHJhbnNwb3J0ZSBjb21lcmNpYWwgZGUg",
"bWVyY2Fkb3JpYXMgZGUgYWx0byByaXNjbyJdLCBbIlJlZ3JhcyBkZSBFbmdhamFtZW50byBlbSBDb21iYXRlIG5vIFbDoWN1byIsICJhcyBub3JtYXMgZGUgY29uZHV0YSBlbSBjb21iYXRlcyBlc3BhY2lhaXMiXSwgWyJMaWNlbsOnYSBkZSBDb3JzbyAoQ2FydGEgZGUgTWFyY2EpIiwgImEgYXV0b3JpemHDp8OjbyBlc3RhdGFsIHBhcmEgYXRhcXVlcyBhIG5hdmVzIGRlIG5hw6fDtWVzIHJpdmFpcyJdXSwKICBpc2I6IFtbIlJlZGUgZGUgSW5mb3JtYW50ZXMgZGUgQmFpcnJvIiwgImEgY3JpYcOnw6NvIGRlIHVtYSByZWRlIGRl",
"IGluZm9ybWFudGVzIGNpdmlzIHBhcmEgdmlnaWFyIHZpemluaG9zIGUgY29sZWdhcyBkZSB0cmFiYWxobyJdLCBbIkp1cmFtZW50byBkZSBMZWFsZGFkZSBDT01QTk9SIiwgImEgZXhpZ8OqbmNpYSBkZSBqdXJhbWVudG8gZGUgbGVhbGRhZGUgw6AgTm92YSBPcmRlbSBwYXJhIG9jdXBhciBjYXJnb3MgcMO6YmxpY29zIl0sIFsiSW50ZXJyb2dhdMOzcmlvIGNvbSBEcm9pZGUgSVQiLCAibyB1c28gZGUgZHJvaWRlcyBkZSBpbnRlcnJvZ2F0w7NyaW8gZW0gc3VzcGVpdG9zIGRlIHRyYWnDp8OjbyJdLCBbIlNvbmRhIE1lbnRhbCBD",
"b21wdWxzw7NyaWEiLCAibyB1c28gZGUgc29uZGFzIG1lbnRhaXMgcGFyYSBleHRyYWlyIGluZm9ybWHDp8O1ZXMgZGUgcHJpc2lvbmVpcm9zIl0sIFsiU29ybyBkYSBWZXJkYWRlIGVtIEludGVycm9nYXTDs3Jpb3MiLCAiYSBhZG1pbmlzdHJhw6fDo28gZm9yw6dhZGEgZGUgc29ybyBkYSB2ZXJkYWRlIGVtIHN1c3BlaXRvcyBkZXRpZG9zIl0sIFsiUmVnaXN0cm8gQ2VudHJhbCBkZSBOw6NvLUh1bWFub3MiLCAibyBjYWRhc3RybyBvYnJpZ2F0w7NyaW8gZGUgZXNww6ljaWVzIG7Do28taHVtYW5hcyByZXNpZGVudGVzIGVtIG11",
"bmRvcyBpbXBlcmlhaXMiXSwgWyJMaXN0YSBOZWdyYSBkZSBTaW1wYXRpemFudGVzIFJlYmVsZGVzIiwgImEgbWFudXRlbsOnw6NvIGRlIHVtYSBsaXN0YSBkZSBjaWRhZMOjb3Mgc3VzcGVpdG9zIGRlIHNpbXBhdGlhIMOgIFJlYmVsacOjbyJdLCBbIkNlbnN1cmEgZGEgSG9sb1JlZGUgcGVsbyBJU0IiLCAibyBjb250cm9sZSBlIGEgY2Vuc3VyYSBkZSB0cmFuc21pc3PDtWVzIG5hIEhvbG9SZWRlIHBvciBhZ2VudGVzIGRvIEJ1cmVhdSJdLCBbIkVzdGHDp8O1ZXMgZGUgRXNjdXRhIFNldG9yaWFsIiwgImEgaW5zdGFsYcOnw6Nv",
"IGRlIGVzdGHDp8O1ZXMgZGUgZXNjdXRhIGUgbW9uaXRvcmFtZW50byBlbSBjYWRhIHNldG9yIGFkbWluaXN0cmF0aXZvIl0sIFsiSW11bmlkYWRlIGRlIEFnZW50ZXMgZG8gQnVyZWF1IiwgImEgaW11bmlkYWRlIGxlZ2FsIGNvbmNlZGlkYSBhIGFnZW50ZXMgZG8gQnVyZWF1IGRlIFNlZ3VyYW7Dp2EgSW1wZXJpYWwiXSwgWyJDw6JtYXJhcyBkZSBEZXRlbsOnw6NvIEV4dHJhanVkaWNpYWwiLCAiYSBvcGVyYcOnw6NvIGRlIGluc3RhbGHDp8O1ZXMgc2VjcmV0YXMgZGUgZGV0ZW7Dp8OjbyBzZW0gcHJvY2Vzc28ganVkaWNpYWwi",
"XSwgWyJSZWNvbXBlbnNhIHBvciBEZWxhw6fDo28gZGUgRGVzZXJ0b3JlcyIsICJvIHBhZ2FtZW50byBkZSByZWNvbXBlbnNhcyBhIHF1ZW0gZGVudW5jaWFyIGRlc2VydG9yZXMgZGFzIGZvcsOnYXMgaW1wZXJpYWlzIl0sIFsiSW50ZXJjZXB0YcOnw6NvIGRlIENvbXVuaWNhw6fDtWVzIENyaXB0b2dyYWZhZGFzIiwgImEgaW50ZXJjZXB0YcOnw6NvIGUgZGVjb2RpZmljYcOnw6NvIGRlIGNvbXVuaWNhw6fDtWVzIGNpdmlzIGNyaXB0b2dyYWZhZGFzIl0sIFsiUHJvaWJpw6fDo28gZGUgTGl0ZXJhdHVyYSBTZWRpY2lvc2EiLCAi",
"YSBwb3NzZSBlIGEgZGlzdHJpYnVpw6fDo28gZGUgbGl0ZXJhdHVyYSBjb25zaWRlcmFkYSBzZWRpY2lvc2EgcGVsbyByZWdpbWUiXSwgWyJRdWVpbWEgZGUgUmVnaXN0cm9zIFByw6ktSW1wZXJpYWlzIiwgImEgZGVzdHJ1acOnw6NvIHNpc3RlbcOhdGljYSBkZSBhcnF1aXZvcyBlIHJlZ2lzdHJvcyBkbyBhbnRpZ28gcmVnaW1lIl0sIFsiRXhpYmnDp8OjbyBkZSBTw61tYm9sb3MgUHJvaWJpZG9zIiwgImEgZXhpYmnDp8OjbyBww7pibGljYSBkZSBzw61tYm9sb3MgYXNzb2NpYWRvcyDDoCBSZWJlbGnDo28gb3Ugw6AgYW50aWdh",
"IFJlcMO6YmxpY2EiXSwgWyJDb25maXNzw7VlcyBQw7pibGljYXMgVHJhbnNtaXRpZGFzIiwgImEgdHJhbnNtaXNzw6NvIHDDumJsaWNhIGZvcsOnYWRhIGRlIGNvbmZpc3PDtWVzIGRlIGRpc3NpZGVudGVzIGNhcHR1cmFkb3MiXSwgWyJSZWNydXRhbWVudG8gSnV2ZW5pbCBwYXJhIG8gQnVyZWF1IiwgIm8gcmVjcnV0YW1lbnRvIGRlIGpvdmVucyBwcm9taXNzb3JlcyBwYXJhIGEgYWNhZGVtaWEgZG8gQnVyZWF1IGRlIFNlZ3VyYW7Dp2EiXSwgWyJQcm9ncmFtYSBkZSBBZ2VudGVzIEluZmlsdHJhZG9zIiwgImEgaW5maWx0cmHD",
"p8OjbyBkZSBhZ2VudGVzIGRpc2ZhcsOnYWRvcyBlbSBtb3ZpbWVudG9zIGRlIHJlc2lzdMOqbmNpYSJdLCBbIkRpdmlzw6NvIGRlIENvbnRyYS1Fc3Bpb25hZ2VtIiwgImFzIG9wZXJhw6fDtWVzIGRlIGNvbnRyYS1lc3Bpb25hZ2VtIGNvbnRyYSBhZ2VudGVzIGRlIHBvdMOqbmNpYXMgcml2YWlzIl0sIFsiQ2FtcG9zIGRlIFJlZWR1Y2HDp8OjbyBQb2zDrXRpY2EiLCAiYSBkZXRlbsOnw6NvIGRlIGRpc3NpZGVudGVzIHBvbMOtdGljb3MgZW0gY2FtcG9zIGRlIHJlZWR1Y2HDp8OjbyBpZGVvbMOzZ2ljYSJdLCBbIkFwYWdhbWVu",
"dG8gZGUgTWVtw7NyaWEgZGUgRGlzc2lkZW50ZXMiLCAibyB1c28gZGUgdGVjbm9sb2dpYSBkZSBhcGFnYW1lbnRvIGRlIG1lbcOzcmlhIGVtIHByaXNpb25laXJvcyBwb2zDrXRpY29zIl0sIFsiUG9sw610aWNhIGRlIFJlZsOpbnMgRmFtaWxpYXJlcyIsICJhIGRldGVuw6fDo28gZGUgZmFtaWxpYXJlcyBkZSBkZXNlcnRvcmVzIGNvbW8gZ2FyYW50aWEgZGUgc3VhIGxlYWxkYWRlIl0sIFsiSW5zcGXDp8O1ZXMgRG9taWNpbGlhcmVzIFNlbSBNYW5kYWRvIiwgImEgcmVhbGl6YcOnw6NvIGRlIGJ1c2NhcyBkb21pY2lsaWFyZXMg",
"c3VycHJlc2Egc2VtIG1hbmRhZG8ganVkaWNpYWwgcHLDqXZpbyJdLCBbIlRvcXVlIGRlIFJlY29saGVyIHNvYiBTdXBlcnZpc8OjbyBkbyBJU0IiLCAiYSBpbXBvc2nDp8OjbyBkZSB0b3F1ZSBkZSByZWNvbGhlciBlbSBtdW5kb3Mgc29iIHZpZ2lsw6JuY2lhIGRpcmV0YSBkbyBCdXJlYXUiXSwgWyJDb25kaWNpb25hbWVudG8gUHNpY29sw7NnaWNvIGRlIEFnZW50ZXMiLCAibyBjb25kaWNpb25hbWVudG8gcHNpY29sw7NnaWNvIGRlIGFnZW50ZXMgZG8gQnVyZWF1IHBhcmEgb2JlZGnDqm5jaWEgYWJzb2x1dGEiXSwgWyJNaW5l",
"cmHDp8OjbyBkZSBEYWRvcyBkZSBDb211bmljYcOnw6NvIENpdmlsIiwgImEgYW7DoWxpc2UgZW0gbWFzc2EgZGUgZGFkb3MgZGUgY29tdW5pY2HDp8OjbyBkZSBjaWRhZMOjb3MgY29tdW5zIl0sIFsiSW1wbGFudGVzIGRlIFJhc3RyZWFtZW50byBlbSBMaWJlcnRvcyIsICJhIGltcGxhbnRhw6fDo28gY29tcHVsc8OzcmlhIGRlIGRpc3Bvc2l0aXZvcyBkZSByYXN0cmVhbWVudG8gZW0gZXgtcHJpc2lvbmVpcm9zIl0sIFsiUmVhbG9jYcOnw6NvIEZvcsOnYWRhIGRlIEZhbcOtbGlhcyBTdXNwZWl0YXMiLCAiYSByZWFsb2Nhw6fD",
"o28gY29tcHVsc8OzcmlhIGRlIGZhbcOtbGlhcyBzdXNwZWl0YXMgZGUgZGVzbGVhbGRhZGUgYW8gcmVnaW1lIl0sIFsiQ29udHJhLVByb3BhZ2FuZGEgQW50aS1SZWJlbGRlIiwgImEgcHJvZHXDp8OjbyBkZSBjYW1wYW5oYXMgZGUgcHJvcGFnYW5kYSBjb250cmEgYSBBbGlhbsOnYSBSZWJlbGRlIl0sIFsiQXVkaXRvcmlhIGRlIExlYWxkYWRlIGRlIE9maWNpYWlzIiwgImEgYXVkaXRvcmlhIHBlcmnDs2RpY2EgZGEgbGVhbGRhZGUgZGUgb2ZpY2lhaXMgaW1wZXJpYWlzIGRlIG3DqWRpbyBlc2NhbMOjbyJdLCBbIkJsb3F1ZWlv",
"IGRlIEZyZXF1w6puY2lhcyBSZWJlbGRlcyIsICJvIGJsb3F1ZWlvIGRlIHRyYW5zbWlzc8O1ZXMgZGUgcsOhZGlvIGFzc29jaWFkYXMgYSBjw6lsdWxhcyByZWJlbGRlcyJdLCBbIkRvc3Npw6pzIFBzaWNvbMOzZ2ljb3MgZGUgQ2lkYWTDo29zIiwgImEgY29tcGlsYcOnw6NvIGRlIHBlcmZpcyBwc2ljb2zDs2dpY29zIGRlIGNpZGFkw6NvcyBjb25zaWRlcmFkb3MgZGUgcmlzY28iXSwgWyJQcm90ZcOnw6NvIGRlIElkZW50aWRhZGUgZGUgSW5mb3JtYW50ZXMiLCAiYSBwcm90ZcOnw6NvIGxlZ2FsIGRhIGlkZW50aWRhZGUgZGUg",
"aW5mb3JtYW50ZXMgY2l2aXMgYSBzZXJ2acOnbyBkbyBCdXJlYXUiXSwgWyJUcmlidW5hbCBTZWNyZXRvIGRvIElTQiIsICJvIGp1bGdhbWVudG8gZGUgc3VzcGVpdG9zIGRlIHRyYWnDp8OjbyBlbSB0cmlidW5haXMgc2lnaWxvc29zIGRvIEJ1cmVhdSJdLCBbIk9jdWx0YcOnw6NvIGRlIFByb3ZhcyBjb250cmEgQWdlbnRlcyIsICJvIGRlc2NhcnRlIGRlIHByb3ZhcyBxdWUgaW5jcmltaW5lbSBhZ2VudGVzIGRvIHByw7NwcmlvIEJ1cmVhdSJdLCBbIkZpbmFuY2lhbWVudG8gT2N1bHRvIGRlIE9wZXJhw6fDtWVzIE5lZ3JhcyIs",
"ICJvIGZpbmFuY2lhbWVudG8gbsOjby1kZWNsYXJhZG8gZGUgb3BlcmHDp8O1ZXMgY2xhbmRlc3RpbmFzIGRvIEJ1cmVhdSJdLCBbIkRpcmVpdG8gZGUgQXBlbGHDp8OjbyBjb250cmEgbyBCdXJlYXUiLCAibyBkaXJlaXRvIGRlIGNpZGFkw6NvcyByZWNvcnJlcmVtIGp1ZGljaWFsbWVudGUgY29udHJhIGHDp8O1ZXMgZG8gQnVyZWF1IGRlIFNlZ3VyYW7Dp2EiXSwgWyJQZXJmaWxhbWVudG8gUmFjaWFsIGRlIEVzcMOpY2llcyIsICJhIHRyaWFnZW0gZGUgc2VndXJhbsOnYSBiYXNlYWRhIG5hIGVzcMOpY2llIGRlIG9yaWdlbSBk",
"byBpbmRpdsOtZHVvIl0sIFsiU3VwZXJ2aXPDo28gZGUgQ29ycmVzcG9uZMOqbmNpYSBQZXNzb2FsIiwgImEgbGVpdHVyYSBlIHRyaWFnZW0gZGUgY29ycmVzcG9uZMOqbmNpYSBwZXNzb2FsIGFudGVzIGRhIGVudHJlZ2EiXV0KfTsKCi8qIEZyYXNlcyBkZSBlc2NhbGFkYSBwb3Igc2V2ZXJpZGFkZSwgY29tIHRvbSBwcsOzcHJpbyBkZSBjYWRhIGNhdGVnb3JpYS4KICAgQ2FkYSB0w7NwaWNvIGFjaW1hIGdlcmEgdW1hIGxlaSBjb21wbGV0YSBjb21iaW5hbmRvIHNldSAiYXNzdW50byIgY29tCiAgIGEgZnJhc2UgZGUgc2V2ZXJp",
"ZGFkZSBjb3JyZXNwb25kZW50ZSDigJQgZ2FyYW50aW5kbyBxdWUgdG9kYSBsZWkgdGVuaGEKICAgbm9tZSBlIGFzc3VudG8gw7puaWNvcywgZSBxdWUgbyB0ZXh0byBtdWRlIGRlIGZhdG8gYW8gYXJyYXN0YXIgbyBzbGlkZXIuICovCmNvbnN0IFRJRVJfUEhSQVNFUyA9IHsKICByZWFsOiB7CiAgICAxOiAocyk9PiBgQWRvdGEtc2UgdW1hIGRpcmV0cml6IGJyYW5kYSBxdWFudG8gYSAke3N9LCBkZSBjYXLDoXRlciBhcGVuYXMgcmVjb21lbmRhdMOzcmlvIGUgc2VtIHNhbsOnw7VlcyBwcmV2aXN0YXMuYCwKICAgIDI6IChzKT0+",
"IGBJbnN0aXR1aS1zZSByZWd1bGFtZW50YcOnw6NvIG1vZGVyYWRhIHNvYnJlICR7c30sIGNvbSBmaXNjYWxpemHDp8OjbyBvY2FzaW9uYWwgZSBtdWx0YXMgbGV2ZXMgZW0gY2FzbyBkZSBkZXNjdW1wcmltZW50by5gLAogICAgMzogKHMpPT4gYEVudHJhIGVtIHZpZ29yIHVtYSBub3JtYSBmaXJtZSByZWd1bGFuZG8gJHtzfSwgY29tIGZpc2NhbGl6YcOnw6NvIHJlZ3VsYXIgZSBwZW5hbGlkYWRlcyBwcm9wb3JjaW9uYWlzIGFvIGRhbm8gY2F1c2Fkby5gLAogICAgNDogKHMpPT4gYEFwbGljYS1zZSBjb250cm9sZSByaWdvcm9z",
"byBzb2JyZSAke3N9LCBjb20gZmlzY2FsaXphw6fDo28gY29uc3RhbnRlLCBtdWx0YXMgcGVzYWRhcyBlIHBvc3NpYmlsaWRhZGUgZGUgcHJpc8OjbyBwYXJhIHJlaW5jaWRlbnRlcy5gLAogICAgNTogKHMpPT4gYEluc3RpdHVpLXNlIGNvbnRyb2xlIGFic29sdXRvIGUgaW1wbGFjw6F2ZWwgc29icmUgJHtzfSwgY29tIHBlbmEgbcOheGltYSBwcmV2aXN0YSBwYXJhIHF1YWxxdWVyIGZvcm1hIGRlIGRlc2N1bXByaW1lbnRvLmAsCiAgfSwKICBzdGFyd2FyczogewogICAgMTogKHMpPT4gYFVtIGRlY3JldG8gYnJhbmRvIHJlZ3Vs",
"YSAke3N9LCBkZWl4YW5kbyBtYXJnZW0gcGFyYSBhdXRvbm9taWEgbG9jYWwgZSBwb3VjYSBmaXNjYWxpemHDp8OjbyBpbXBlcmlhbC5gLAogICAgMjogKHMpPT4gYEEgYWRtaW5pc3RyYcOnw6NvIHJlZ2lvbmFsIGVzdGFiZWxlY2Ugbm9ybWFzIG1vZGVyYWRhcyBzb2JyZSAke3N9LCBmaXNjYWxpemFkYXMgcG9yIHBhdHJ1bGhhcyBvY2FzaW9uYWlzLmAsCiAgICAzOiAocyk9PiBgTyBnb3Zlcm5vIGltcMO1ZSByZWdyYXMgZmlybWVzIHNvYnJlICR7c30sIGNvbSBvZmljaWFpcyBkZXN0YWNhZG9zIHBhcmEgZ2FyYW50aXIgY3Vt",
"cHJpbWVudG8gZW0gdG9kb3Mgb3Mgc2V0b3Jlcy5gLAogICAgNDogKHMpPT4gYFRyb3BhcyBkZSBjaG9xdWUgc8OjbyBkZXN0YWNhZGFzIHBhcmEgaW1wb3IgY29udHJvbGUgcsOtZ2lkbyBzb2JyZSAke3N9LCBjb20gcHJpc8OjbyBzdW3DoXJpYSBwYXJhIGluZnJhdG9yZXMuYCwKICAgIDU6IChzKT0+IGBPIEltcGVyYWRvciBkZWNyZXRhIGNvbnRyb2xlIHRvdGFsIGUgaW1wbGFjw6F2ZWwgc29icmUgJHtzfTsgYSBkZXNvYmVkacOqbmNpYSDDqSBwdW5pZGEgY29tIGV4ZWN1w6fDo28gaW1lZGlhdGEuYCwKICB9LAogIGZpY2Nh",
"bzogewogICAgMTogKHMpPT4gYFVtYSBkaXJldHJpeiBmcm91eGEgcmVndWxhICR7c30sIGRlaXhhbmRvIGEgYXBsaWNhw6fDo28gYSBjcml0w6lyaW8gZG9zIGZhdG9yZXMgbG9jYWlzIGRlIGNhZGEgbXVuZG8uYCwKICAgIDI6IChzKT0+IGBFc3RhYmVsZWNlLXNlIHJlZ3VsYW1lbnRhw6fDo28gbW9kZXJhZGEgc29icmUgJHtzfSwgZmlzY2FsaXphZGEgZXNwb3JhZGljYW1lbnRlIHBlbGFzIGF1dG9yaWRhZGVzIHBvcnR1w6FyaWFzLmAsCiAgICAzOiAocyk9PiBgSW5zdGl0dWktc2UgdW1hIG5vcm1hIGZpcm1lIGUgYW1wbGFt",
"ZW50ZSBhcGxpY2FkYSBzb2JyZSAke3N9LCBjb20gZmlzY2FsaXphw6fDo28gcmVndWxhciBub3MgcG9ydG9zIGUgcG9zdG9zIGRlIGNvbcOpcmNpby5gLAogICAgNDogKHMpPT4gYEltcMO1ZS1zZSBjb250cm9sZSByw61naWRvIHNvYnJlICR7c30sIGNvbSBpbnNwZcOnw7VlcyBmcmVxdWVudGVzIGUgY29uZmlzY28gZGUgY2FyZ2FzIGVtIGNhc28gZGUgaW5mcmHDp8Ojby5gLAogICAgNTogKHMpPT4gYEluc3RpdHVpLXNlIGNvbnRyb2xlIGFic29sdXRvIHNvYnJlICR7c307IGluZnJhdG9yZXMgdMOqbSBiZW5zIGNvbmZpc2Nh",
"ZG9zIGUgcG9kZW0gc2VyIHN1bWFyaWFtZW50ZSBleGVjdXRhZG9zLmAsCiAgfQp9OwoKZnVuY3Rpb24gc2x1Z2lmeShzKXsKICByZXR1cm4gcy50b0xvd2VyQ2FzZSgpCiAgICAubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXHUwMzAwLVx1MDM2Zl0vZywnJykKICAgIC5yZXBsYWNlKC9bXmEtejAtOV0rL2csJ18nKS5yZXBsYWNlKC9eXyt8XyskL2csJycpOwp9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgQ0xBU1NJRklDQcOHw4NPIFNFTcOCTlRJ",
"Q0EgRE9TIFTDk1BJQ09TCiAgIE5lbSB0b2RvIGFzc3VudG8gw6kgdW1hICJhdGl2aWRhZGUgbmV1dHJhIiBhIHNlciByZWd1bGFkYS4KICAgLSAiZGlyZWl0byI6IG8gYXNzdW50byBKw4Egw4kgdW0gZGlyZWl0by9wcm90ZcOnw6NvL2xpYmVyZGFkZQogICAgIChleDogbGliZXJkYWRlIGRlIGltcHJlbnNhLCBkaXJlaXRvcyBMR0JUUUlBKywgZGlyZWl0byBkZSBncmV2ZSkuCiAgICAgUmVzdHJpbmdpciA9IFNVUFJJTUlSIGVzc2UgZGlyZWl0by4gTGliZXJhbGl6YXIgPSBHQVJBTlRJUi9BTVBMSUFSLgogICAtICJ2w61jaW8i",
"OiBvIGFzc3VudG8gw6kgdW1hIHByw6F0aWNhIG5vY2l2YQogICAgIChleDogZXNjcmF2aWTDo28sIGNvcnJ1cMOnw6NvLCBjZW5zdXJhLCB0csOhZmljbywgZGlzY3JpbWluYcOnw6NvKS4KICAgICBSZXN0cmluZ2lyID0gQ09NQkFURVIvRVJSQURJQ0FSLiBMaWJlcmFsaXphciA9IFBFUk1JVElSL0xFR0FMSVpBUi4KICAgLSAiYXRpdmlkYWRlIjogdHVkbyBvIHJlc3RvIChwb3NzZSBkZSBhcm1hcywgY29tw6lyY2lvLCBpbXBvc3Rvcy4uLikuCiAgICAgUmVzdHJpbmdpciA9IGNvbnRyb2xhciBtYWlzLiBMaWJlcmFsaXphciA9",
"IGRlc3JlZ3VsYW1lbnRhci4KICAgSXNzbyBldml0YSBxdWUgYSBhbsOhbGlzZSBwb3IgcGFsYXZyYXMtY2hhdmUgY2FwdHVyZSB0ZXJtb3MgY29tbwogICAicHJvdGXDp8OjbyIgb3UgIm1pbm9yaWFzIiBkZW50cm8gZGUgdW0gdGV4dG8gcmVzdHJpdGl2byBlIGdlcmUKICAgZWZlaXRvcyBwb3NpdGl2b3MgcG9yIGVuZ2FubyDigJQgbyBxdWUgZmF6aWEgYSB2ZXJzw6NvIHJlc3RyaXRpdmEKICAgcGFyZWNlciBpZ3VhbCDDoCBsaWJlcmFsaXphbnRlLgo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09",
"PT09PT09PT09PT09PT09PT0gKi8KY29uc3QgVklDRV9SRUdFWCA9IC9lc2NyYXZpZHx0cmFiYWxobyBpbmZhbnRpbHxjb3JydXBbw6djXXxkaXNjcmltaW5hfHNlZ3JlZ2F8dHJbYcOhXWZpY298ZXhwbG9yYVvDp2NdW2HDo11vIHByZWRhdHxjZW5zdXJhfGRlc21hdGFtZW50b3xwb2x1aVvDp2NdW2HDo11vfGFwYXJ0aGVpZHxyZWNydXRhbWVudG8gaW5mYW50aWx8Y3JpYW5bw6djXWFzIChwYXJhfGNvbW8pIHNvbGRhZG9zfHRvcnR1cmF8ZXh0ZXJtaW4vaTsKY29uc3QgUklHSFRfUkVHRVggPSAvXGJkaXJlaXRvfFxibGliZXJk",
"YWRlfFxicHJvdGVbw6djXVthw6Ndb3xyZWNvbmhlY2ltZW50b3xwcml2YWNpZGFkZXxcYmFjZXNzbyBhfGJlbmVmW8OtaV1jaW98YXV4W8OtaV1saW98XGJzZWd1cm8tfHBlbnNbw6NhXW98Z3VhcmRhIGNvbXBhcnRpbGhhZGF8ZGlnbmlkYWRlfGNpZGFkYW5pYXxhdXRvbm9taWF8YXNpbG98cmVmw7pnaW98cmVmdWdpYWRvcy9pOwoKZnVuY3Rpb24gY2xhc3NpZnlUb3BpYyhuYW1lLCBzdWJqZWN0KXsKICBjb25zdCBjb21iaW5lZCA9IChuYW1lICsgJyAnICsgc3ViamVjdCkudG9Mb3dlckNhc2UoKTsKICBpZihWSUNFX1JFR0VY",
"LnRlc3QoY29tYmluZWQpKSByZXR1cm4gJ3ZpY2lvJzsKICBpZihSSUdIVF9SRUdFWC50ZXN0KGNvbWJpbmVkKSkgcmV0dXJuICdkaXJlaXRvJzsKICByZXR1cm4gJ2F0aXZpZGFkZSc7Cn0KCi8qIEZyYXNlYWRvIHBhcmEgdMOzcGljb3MgZG8gdGlwbyAiZGlyZWl0byI6IHN1cHJpbWlyIHZzLiBnYXJhbnRpciAqLwpjb25zdCBSSUdIVF9TVVBQUkVTU19QSFJBU0VTID0gewogIHJlYWw6IHsKICAgIDE6IChzKT0+IGBJbXDDtWUtc2UgdW1hIHJlc3RyacOnw6NvIHNpbWLDs2xpY2Egc29icmUgJHtzfSwgc2VtIG1lY2FuaXNtb3Mg",
"cmVhaXMgZGUgZmlzY2FsaXphw6fDo28sIG1hcyBhYnJpbmRvIHByZWNlZGVudGUgbGVnYWwuYCwKICAgIDI6IChzKT0+IGBBbXBsaWFtLXNlIGFzIGV4Y2XDp8O1ZXMgcXVlIHBlcm1pdGVtIGFvIEVzdGFkbyBuZWdhciAke3N9IGVtIG5vbWUgZGUgImludGVyZXNzZSBww7pibGljbyIuYCwKICAgIDM6IChzKT0+IGBSZXN0cmluZ2Utc2Ugc3Vic3RhbmNpYWxtZW50ZSAke3N9LCBleGlnaW5kbyBhdXRvcml6YcOnw6NvIHByw6l2aWEgZG8gRXN0YWRvIHBhcmEgc2V1IGV4ZXJjw61jaW8uYCwKICAgIDQ6IChzKT0+IGBSZXZvZ2Et",
"c2UgcXVhc2UgaW50ZWlyYW1lbnRlICR7c30sIGNvbSByYXJhcyBleGNlw6fDtWVzIHN1amVpdGFzIGEgYXByb3Zhw6fDo28gZGlzY3JpY2lvbsOhcmlhLmAsCiAgICA1OiAocyk9PiBgTmVnYS1zZSBlIGNyaW1pbmFsaXphLXNlIHRvdGFsbWVudGUgJHtzfTsgcXVhbHF1ZXIgdGVudGF0aXZhIGRlIGV4ZXJjw6otbG8gw6kgdHJhdGFkYSBjb21vIGNyaW1lIGdyYXZlLmAsCiAgfSwKICBzdGFyd2FyczogewogICAgMTogKHMpPT4gYFVtIGRlY3JldG8gaW1ww7VlIHJlc3RyacOnw6NvIHNpbWLDs2xpY2Egc29icmUgJHtzfSwgc2Vt",
"IGZpc2NhbGl6YcOnw6NvIGVmZXRpdmEgcG9yIG9yYS5gLAogICAgMjogKHMpPT4gYEF1dG9yaWRhZGVzIGltcGVyaWFpcyBhbXBsaWFtIGFzIGV4Y2XDp8O1ZXMgcGFyYSBuZWdhciAke3N9IHNlbXByZSBxdWUgY29udmVuaWVudGUgYW8gcmVnaW1lLmAsCiAgICAzOiAocyk9PiBgTyBJbXDDqXJpbyByZXN0cmluZ2UgZmlybWVtZW50ZSAke3N9LCBleGlnaW5kbyBhdXRvcml6YcOnw6NvIGRlIHVtIGdvdmVybmFkb3IgcGFyYSBzZXUgZXhlcmPDrWNpby5gLAogICAgNDogKHMpPT4gYCR7cy5jaGFyQXQoMCkudG9VcHBlckNhc2Uo",
"KStzLnNsaWNlKDEpfSDDqSBwcmF0aWNhbWVudGUgYWJvbGlkbyBwb3IgZGVjcmV0byBpbXBlcmlhbCwgY29tIHBvdXF1w61zc2ltYXMgZXhjZcOnw7Vlcy5gLAogICAgNTogKHMpPT4gYE8gSW1wZXJhZG9yIG5lZ2EgZSBjcmltaW5hbGl6YSB0b3RhbG1lbnRlICR7c307IGV4ZXJjw6otbG8gw6kgY29uc2lkZXJhZG8gdHJhacOnw6NvLCBwdW5pZGEgY29tIGV4ZWN1w6fDo28uYCwKICB9LAogIGZpY2NhbzogewogICAgMTogKHMpPT4gYFVtYSBkaXJldHJpeiBwb3J0dcOhcmlhIGltcMO1ZSByZXN0cmnDp8OjbyBzaW1iw7NsaWNh",
"IHNvYnJlICR7c30sIHJhcmFtZW50ZSBmaXNjYWxpemFkYS5gLAogICAgMjogKHMpPT4gYEF1dG9yaWRhZGVzIGxvY2FpcyBhbXBsaWFtIGFzIGV4Y2XDp8O1ZXMgcGFyYSBuZWdhciAke3N9IHNlbXByZSBxdWUgY29udmVuaWVudGUgYW9zIGludGVyZXNzZXMgZG8gZ292ZXJuby5gLAogICAgMzogKHMpPT4gYE8gZ292ZXJubyBsb2NhbCByZXN0cmluZ2UgZmlybWVtZW50ZSAke3N9LCBleGlnaW5kbyBsaWNlbsOnYSBkZSB1bSBmYXRvciBhdXRvcml6YWRvIHBhcmEgc2V1IGV4ZXJjw61jaW8uYCwKICAgIDQ6IChzKT0+IGAke3Mu",
"Y2hhckF0KDApLnRvVXBwZXJDYXNlKCkrcy5zbGljZSgxKX0gw6kgcHJhdGljYW1lbnRlIGFib2xpZG8gbmVzc2UgbXVuZG8sIGNvbSBwb3VxdcOtc3NpbWFzIGV4Y2XDp8O1ZXMuYCwKICAgIDU6IChzKT0+IGBOZWdhLXNlIGUgY3JpbWluYWxpemEtc2UgdG90YWxtZW50ZSAke3N9OyBleGVyY8OqLWxvIMOpIHB1bmlkbyBjb20gY29uZmlzY28gZGUgYmVucyBlIGJhbmltZW50byBkbyBzZXRvci5gLAogIH0sCn07CmNvbnN0IFJJR0hUX1BST1RFQ1RfUEhSQVNFUyA9IHsKICByZWFsOiB7CiAgICAxOiAocyk9PiBgUmVjb25oZWNl",
"LXNlIGZvcm1hbG1lbnRlICR7c30sIGFpbmRhIHF1ZSBzZW0gZm9yw6dhIHZpbmN1bGFudGUgaW1lZGlhdGEuYCwKICAgIDI6IChzKT0+IGBJbnN0aXR1aS1zZSBwcm90ZcOnw6NvIHBhcmNpYWwgYSAke3N9LCBjb20gYWxndW1hcyBnYXJhbnRpYXMgbGVnYWlzIGrDoSBleGlnw612ZWlzLmAsCiAgICAzOiAocyk9PiBgR2FyYW50ZS1zZSBwbGVuYW1lbnRlIHBvciBsZWkgJHtzfSwgY29tIG1lY2FuaXNtb3MgZGUgZXhpZ2liaWxpZGFkZSBwZXJhbnRlIG8gRXN0YWRvLmAsCiAgICA0OiAocyk9PiBgQW1wbGlhLXNlIGUgcmVmb3LD",
"p2Etc2UgJHtzfSwgY29tIHByb3Rlw6fDo28gY29uc3RpdHVjaW9uYWwgZSBmaXNjYWxpemHDp8OjbyBhdGl2YSBkZSB2aW9sYcOnw7Vlcy5gLAogICAgNTogKHMpPT4gYCR7cy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKStzLnNsaWNlKDEpfSB0b3JuYS1zZSB1bSBkaXJlaXRvIGFic29sdXRvIGUgaW52aW9sw6F2ZWwsIHByb3RlZ2lkbyBjb20gdG9kYSBhIGZvcsOnYSBkbyBFc3RhZG8uYCwKICB9LAogIHN0YXJ3YXJzOiB7CiAgICAxOiAocyk9PiBgVW0gZGVjcmV0byByZWNvbmhlY2UgZm9ybWFsbWVudGUgJHtzfSwgZW1ib3Jh",
"IHNlbSBhcGxpY2HDp8OjbyBwcsOhdGljYSBpbWVkaWF0YS5gLAogICAgMjogKHMpPT4gYE8gZ292ZXJubyByZWdpb25hbCBpbnN0aXR1aSBwcm90ZcOnw6NvIHBhcmNpYWwgYSAke3N9LCBjb20gYWxndW1hcyBnYXJhbnRpYXMgasOhIGVtIHZpZ29yLmAsCiAgICAzOiAocyk9PiBgR2FyYW50ZS1zZSBwbGVuYW1lbnRlICR7c30gZW0gdG9kb3Mgb3MgbXVuZG9zIHNvYiBlc3RhIGJhbmRlaXJhLCBjb20gbWVjYW5pc21vcyBkZSBkZWZlc2EgbGVnYWwuYCwKICAgIDQ6IChzKT0+IGBBbXBsaWEtc2UgZSBibGluZGEtc2UgJHtzfSBj",
"b250cmEgcXVhbHF1ZXIgaW50ZXJmZXLDqm5jaWEgaW1wZXJpYWwgb3UgZ292ZXJuYW1lbnRhbC5gLAogICAgNTogKHMpPT4gYCR7cy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKStzLnNsaWNlKDEpfSDDqSBkZWNsYXJhZG8gc2FncmFkbyBlIGludmlvbMOhdmVsOyBuZW5odW1hIGZvcsOnYSBwb2RlIHN1cHJpbWktbG8gc2VtIHByb3ZvY2FyIHJlYmVsacOjbyBsZWfDrXRpbWEuYCwKICB9LAogIGZpY2NhbzogewogICAgMTogKHMpPT4gYFVtYSBkaXJldHJpeiBsb2NhbCByZWNvbmhlY2UgZm9ybWFsbWVudGUgJHtzfSwgc2VtIGdy",
"YW5kZSBlZmVpdG8gcHLDoXRpY28gcG9yIG9yYS5gLAogICAgMjogKHMpPT4gYEluc3RpdHVpLXNlIHByb3Rlw6fDo28gcGFyY2lhbCBhICR7c30sIHJlY29uaGVjaWRhIHBlbG9zIGNvbnN1bGFkb3MgZSBjYXNhcyBkZSBjb23DqXJjaW8uYCwKICAgIDM6IChzKT0+IGBHYXJhbnRlLXNlIHBsZW5hbWVudGUgJHtzfSBlbSB0b2RvIG8gc2V0b3IsIGNvbSBhcG9pbyBkYSBFeGNoYW5nZSBlIGRvcyBmYXRvcmVzIGxvY2Fpcy5gLAogICAgNDogKHMpPT4gYEFtcGxpYS1zZSBlIGJsaW5kYS1zZSAke3N9IGNvbnRyYSBxdWFscXVlciBp",
"bnRlcmZlcsOqbmNpYSBkZSBhdXRvcmlkYWRlcyBwb3J0dcOhcmlhcyBvdSBjb3Jwb3Jhw6fDtWVzLmAsCiAgICA1OiAocyk9PiBgJHtzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK3Muc2xpY2UoMSl9IMOpIGRlY2xhcmFkbyBpbnZpb2zDoXZlbCBlbSB0b2RvIG8gc2V0b3I7IHZpb2zDoS1sbyDDqSBhIHBpb3Igb2ZlbnNhIHF1ZSB1bSBmYXIgdHJhZGVyIHBvZGUgY29tZXRlci5gLAogIH0sCn07CgovKiBGcmFzZWFkbyBwYXJhIHTDs3BpY29zIGRvIHRpcG8gInbDrWNpbyI6IGNvbWJhdGVyIHZzLiBwZXJtaXRpci9sZWdhbGl6",
"YXIgKi8KLyogVklDRV9FTkFDVF9QSFJBU0VTID0gdmVyc8OjbyBSRVNUUklUSVZBIGRlIHVtICJ2w61jaW8iIChjZW5zdXJhLCBlc2NyYXZpZMOjbywKICAgY29ycnVww6fDo28sIHRvcnR1cmEsIHRyw6FmaWNvLCBkaXNjcmltaW5hw6fDo28uLi4pOiBvIEVzdGFkbyBJTVDDlUUgb3UgRVNDQUxBCiAgIGVzc2EgcHLDoXRpY2Egbm9jaXZhIGNvbnRyYSBhIHBvcHVsYcOnw6NvLiDDiSBhIHZlcnPDo28gYXV0b3JpdMOhcmlhL2FncmVzc2l2YS4gKi8KY29uc3QgVklDRV9FTkFDVF9QSFJBU0VTID0gewogIHJlYWw6IHsKICAgIDE6",
"IChzKT0+IGBJbnN0aXR1aS1zZSAke3N9IGRlIGZvcm1hIHBvbnR1YWwgZSBwb3VjbyBzaXN0ZW3DoXRpY2EsIGFwbGljYWRhIGFwZW5hcyBhIGdydXBvcyBlc3BlY8OtZmljb3MuYCwKICAgIDI6IChzKT0+IGBBbXBsaWEtc2UgbW9kZXJhZGFtZW50ZSAke3N9LCB0b3JuYW5kby1hIHBvbMOtdGljYSBjb3JyZW50ZSBlbSBkaXZlcnNhcyByZXBhcnRpw6fDtWVzIGRvIEVzdGFkby5gLAogICAgMzogKHMpPT4gYEluc3RpdHVpLXNlIGZpcm1lbWVudGUgJHtzfSBjb21vIHBvbMOtdGljYSBvZmljaWFsIGRvIEVzdGFkbywgYXBsaWNh",
"ZGEgZGUgZm9ybWEgc2lzdGVtw6F0aWNhLmAsCiAgICA0OiAocyk9PiBgRXhwYW5kZS1zZSBhZ3Jlc3NpdmFtZW50ZSAke3N9LCBhdGluZ2luZG8gYSBtYWlvciBwYXJ0ZSBkYSBwb3B1bGHDp8OjbyBzb2Igc3VwZXJ2aXPDo28gY29uc3RhbnRlLmAsCiAgICA1OiAocyk9PiBgSW5zdGl0dWktc2UgJHtzfSBkZSBmb3JtYSB0b3RhbCBlIGltcGxhY8OhdmVsIGNvbnRyYSB0b2RhIGEgcG9wdWxhw6fDo28sIHNlbSBxdWFscXVlciBleGNlw6fDo28uYCwKICB9LAogIHN0YXJ3YXJzOiB7CiAgICAxOiAocyk9PiBgVW0gZGVjcmV0byBp",
"bXBlcmlhbCBhdXRvcml6YSAke3N9IGRlIGZvcm1hIHBvbnR1YWwsIGFwbGljYWRhIGEgc3VzcGVpdG9zIGVzcGVjw61maWNvcy5gLAogICAgMjogKHMpPT4gYEEgYWRtaW5pc3RyYcOnw6NvIHJlZ2lvbmFsIGFtcGxpYSBtb2RlcmFkYW1lbnRlICR7c30sIHRvcm5hbmRvLWEgcm90aW5hIGVtIHbDoXJpb3Mgc2V0b3Jlcy5gLAogICAgMzogKHMpPT4gYE8gSW1ww6lyaW8gaW5zdGl0dWkgZmlybWVtZW50ZSAke3N9IGNvbW8gcG9sw610aWNhIG9maWNpYWwgZW0gdG9kb3Mgb3MgbXVuZG9zIG9jdXBhZG9zLmAsCiAgICA0OiAocyk9",
"PiBgRXhwYW5kZS1zZSBhZ3Jlc3NpdmFtZW50ZSAke3N9LCBjb20gdHJvcGFzIGRlc3RhY2FkYXMgcGFyYSBnYXJhbnRpciBzdWEgYXBsaWNhw6fDo28gdG90YWwuYCwKICAgIDU6IChzKT0+IGBPIEltcGVyYWRvciBkZWNyZXRhICR7c30gZGUgZm9ybWEgYWJzb2x1dGEgZSBpbXBsYWPDoXZlbCBjb250cmEgdG9kYSBhIHBvcHVsYcOnw6NvOyByZXNpc3RpciDDqSB0cmFpw6fDo28uYCwKICB9LAogIGZpY2NhbzogewogICAgMTogKHMpPT4gYEF1dG9yaWRhZGVzIGxvY2FpcyBhdXRvcml6YW0gJHtzfSBkZSBmb3JtYSBwb250dWFs",
"LCBhcGxpY2FkYSBhIGNhc29zIGVzcGVjw61maWNvcy5gLAogICAgMjogKHMpPT4gYEFtcGxpYS1zZSBtb2RlcmFkYW1lbnRlICR7c30sIHRvcm5hbmRvLWEgcHLDoXRpY2Egcm90aW5laXJhIGVtIHBvcnRvcyBlIHBvc3RvcyBjb21lcmNpYWlzLmAsCiAgICAzOiAocyk9PiBgTyBnb3Zlcm5vIGxvY2FsIGluc3RpdHVpIGZpcm1lbWVudGUgJHtzfSBjb21vIHBvbMOtdGljYSBvZmljaWFsIGVtIHRvZG8gbyBzZXUgdGVycml0w7NyaW8uYCwKICAgIDQ6IChzKT0+IGBFeHBhbmRlLXNlIGFncmVzc2l2YW1lbnRlICR7c30sIGNvbSBh",
"Z2VudGVzIGRlZGljYWRvcyBhIGdhcmFudGlyIHN1YSBhcGxpY2HDp8OjbyB0b3RhbC5gLAogICAgNTogKHMpPT4gYEluc3RpdHVpLXNlICR7c30gZGUgZm9ybWEgYWJzb2x1dGEgY29udHJhIHRvZGEgYSBwb3B1bGHDp8OjbyBzb2IgZXN0YSBiYW5kZWlyYSwgc2VtIGV4Y2XDp8O1ZXMuYCwKICB9LAp9OwovKiBWSUNFX0FCT0xJU0hfUEhSQVNFUyA9IHZlcnPDo28gTElCRVJBTElaQU5URTogbyBFc3RhZG8gQkFORSBlIEVSUkFESUNBCiAgIGVzc2EgcHLDoXRpY2Egbm9jaXZhLCBwcm90ZWdlbmRvIGEgcG9wdWxhw6fDo28gZGVs",
"YS4gw4kgYSB2ZXJzw6NvIGxpdnJlL2h1bWFuYS4gKi8KY29uc3QgVklDRV9BQk9MSVNIX1BIUkFTRVMgPSB7CiAgcmVhbDogewogICAgMTogKHMpPT4gYFByb8OtYmUtc2UgZm9ybWFsbWVudGUgJHtzfSwgYWluZGEgcXVlIHNlbSBncmFuZGUgZmlzY2FsaXphw6fDo28g4oCUIGEgbXVkYW7Dp2Egw6kgc29icmV0dWRvIHNpbWLDs2xpY2EgcG9yIG9yYS5gLAogICAgMjogKHMpPT4gYFJlZHV6LXNlIHN1YnN0YW5jaWFsbWVudGUgJHtzfSwgY29tIGZpc2NhbGl6YcOnw6NvIG1vZGVyYWRhIGUgcGVuYWxpZGFkZXMgcGFyYSBxdWVt",
"IGEgcHJhdGljYXIuYCwKICAgIDM6IChzKT0+IGBCYW5lLXNlIGZpcm1lbWVudGUgJHtzfSwgY29tIGZpc2NhbGl6YcOnw6NvIHJlZ3VsYXIgZSByZXNwb25zYWJpbGl6YcOnw6NvIGNyaW1pbmFsIGRvcyBpbmZyYXRvcmVzLmAsCiAgICA0OiAocyk9PiBgRXJyYWRpY2Etc2UgJHtzfSBkZSBmb3JtYSByaWdvcm9zYSwgY29tIGZvcsOnYXMgZGVkaWNhZGFzIGEgcHJvdGVnZXIgYSBwb3B1bGHDp8OjbyBkZXNzYSBwcsOhdGljYS5gLAogICAgNTogKHMpPT4gYEFib2xlLXNlIHRvdGFsbWVudGUgJHtzfTsgcXVhbHF1ZXIgdGVudGF0",
"aXZhIGRlIHJlaW50cm9kdXppLWxhIMOpIHRyYXRhZGEgY29tbyBjcmltZSBncmF2w61zc2ltby5gLAogIH0sCiAgc3RhcndhcnM6IHsKICAgIDE6IChzKT0+IGBVbSBkZWNyZXRvIGRlIGNsZW3Dqm5jaWEgcHJvw61iZSBmb3JtYWxtZW50ZSAke3N9LCBlbWJvcmEgYSBmaXNjYWxpemHDp8OjbyBhaW5kYSBzZWphIGVzY2Fzc2EuYCwKICAgIDI6IChzKT0+IGBBIGFkbWluaXN0cmHDp8OjbyByZWdpb25hbCByZWR1eiBzdWJzdGFuY2lhbG1lbnRlICR7c30sIHB1bmluZG8gb2ZpY2lhaXMgcXVlIGEgcHJhdGlxdWVtLmAsCiAgICAz",
"OiAocyk9PiBgTyBnb3Zlcm5vIGJhbmUgZmlybWVtZW50ZSAke3N9IGVtIHRvZG9zIG9zIG11bmRvcyBzb2Igc3VhIHByb3Rlw6fDo28sIGNvbSBmaXNjYWxpemHDp8OjbyByZWd1bGFyLmAsCiAgICA0OiAocyk9PiBgRXJyYWRpY2Etc2Ugcmlnb3Jvc2FtZW50ZSAke3N9LCBjb20gdW5pZGFkZXMgZGVkaWNhZGFzIGEgcHJvdGVnZXIgYSBwb3B1bGHDp8OjbyBkZXNzYSBwcsOhdGljYS5gLAogICAgNTogKHMpPT4gYEFib2xlLXNlIHRvdGFsbWVudGUgJHtzfSBlbSB0b2RvIG8gdGVycml0w7NyaW87IHJlaW50cm9kdXppLWxhIMOp",
"IGNvbnNpZGVyYWRvIG8gbWFpcyBncmF2ZSBkb3MgY3JpbWVzLmAsCiAgfSwKICBmaWNjYW86IHsKICAgIDE6IChzKT0+IGBVbWEgZGlyZXRyaXogcG9ydHXDoXJpYSBwcm/DrWJlIGZvcm1hbG1lbnRlICR7c30sIGVtYm9yYSBhaW5kYSBwb3VjbyBmaXNjYWxpemFkYS5gLAogICAgMjogKHMpPT4gYFJlZHV6LXNlIHN1YnN0YW5jaWFsbWVudGUgJHtzfSwgY29tIGZpc2NhbGl6YcOnw6NvIG1vZGVyYWRhIG5vcyBwb3J0b3MgZSBwb3N0b3MgZGUgY29tw6lyY2lvLmAsCiAgICAzOiAocyk9PiBgTyBnb3Zlcm5vIGxvY2FsIGJhbmUg",
"ZmlybWVtZW50ZSAke3N9LCBjb20gZmlzY2FsaXphw6fDo28gcmVndWxhciBlIHB1bmnDp8OjbyBhb3MgaW5mcmF0b3Jlcy5gLAogICAgNDogKHMpPT4gYEVycmFkaWNhLXNlIHJpZ29yb3NhbWVudGUgJHtzfSwgY29tIHJlY29tcGVuc2FzIHBvciBpbmZvcm1hw6fDtWVzIHF1ZSBhanVkZW0gYSBlbGltaW5hciBhIHByw6F0aWNhLmAsCiAgICA1OiAocyk9PiBgQWJvbGUtc2UgdG90YWxtZW50ZSAke3N9IGVtIHRvZG8gbyBzZXRvcjsgcXVhbHF1ZXIgZmFyIHRyYWRlciBmbGFncmFkbyBwcmF0aWNhbmRvLWEgcGVyZGUgYSBsaWNl",
"bsOnYSBlIMOpIGJhbmlkby5gLAogIH0sCn07CgovKiBFZmVpdG9zIGZpeG9zIHBvciBzZXZlcmlkYWRlIChuw6NvIHBhc3NhbSBwZWxvIG1vdG9yIGRlIHBhbGF2cmFzLWNoYXZlLAogICBqdXN0YW1lbnRlIHBhcmEgZXZpdGFyIGZhbHNvLXBvc2l0aXZvIGNvbSB0ZXJtb3MgY29tbyAicHJvdGXDp8OjbyIgb3UKICAgIm1pbm9yaWFzIiBhcGFyZWNlbmRvIGRlbnRybyBkZSB1bSB0ZXh0byBxdWUgbmEgdmVyZGFkZSBvcyBzdXByaW1lKS4gKi8KY29uc3QgUklHSFRfREVMVEFfUFJPRklMRSA9IHsgLy8gZGlyZcOnw6NvICJyZXN0",
"cml0aXZhIiA9IHN1cHJpbWlyIG8gZGlyZWl0bwogIDE6IHtsaWJlcmRhZGU6LTEsIGZlbGljaWRhZGU6LTF9LAogIDI6IHtsaWJlcmRhZGU6LTIsIGZlbGljaWRhZGU6LTIsIGN1bHR1cmE6LTF9LAogIDM6IHtsaWJlcmRhZGU6LTMsIGZlbGljaWRhZGU6LTMsIGN1bHR1cmE6LTEsIHNlZ3VyYW5jYTorMX0sCiAgNDoge2xpYmVyZGFkZTotNCwgZmVsaWNpZGFkZTotNCwgY3VsdHVyYTotMiwgc2VndXJhbmNhOisxLCBjb3JydXBjYW86KzF9LAogIDU6IHtsaWJlcmRhZGU6LTUsIGZlbGljaWRhZGU6LTUsIGN1bHR1cmE6LTMsIHNl",
"Z3VyYW5jYTorMiwgY29ycnVwY2FvOisyfSwKfTsKY29uc3QgVklDRV9BQk9MSVNIX0RFTFRBX1BST0ZJTEUgPSB7IC8vIGVmZWl0byBkZSBBQk9MSVIgbyB2w61jaW8gKHNlbXByZSBwb3NpdGl2byBwYXJhIGEgcG9wdWxhw6fDo28pCiAgMToge2ZlbGljaWRhZGU6KzF9LAogIDI6IHtmZWxpY2lkYWRlOisyLCBzZWd1cmFuY2E6KzF9LAogIDM6IHtmZWxpY2lkYWRlOiszLCBsaWJlcmRhZGU6KzIsIHNlZ3VyYW5jYTorMSwgY29ycnVwY2FvOi0xfSwKICA0OiB7ZmVsaWNpZGFkZTorNCwgbGliZXJkYWRlOiszLCBzZWd1cmFuY2E6",
"KzIsIGNvcnJ1cGNhbzotMiwgZWNvbm9taWE6LTF9LAogIDU6IHtmZWxpY2lkYWRlOis1LCBsaWJlcmRhZGU6KzQsIHNlZ3VyYW5jYTorMywgY29ycnVwY2FvOi0zLCBlY29ub21pYTotMn0sCn07CgovKiBBIGNhdGVnb3JpYSBJU0IgdXNhIG8gbWVzbW8gdG9tIGltcGVyaWFsIGRhIGNhdGVnb3JpYSBTdGFyIFdhcnMsCgogICBhcGVuYXMgY29tIHTDs3BpY29zIHByw7NwcmlvcyBkbyBCdXJlYXUgZGUgU2VndXJhbsOnYSBJbXBlcmlhbC4gKi8KZnVuY3Rpb24gcGhyYXNlQ2F0ZWdvcnkoY2F0KXsgcmV0dXJuIGNhdD09PSdpc2In",
"ID8gJ3N0YXJ3YXJzJyA6IGNhdDsgfQoKKGZ1bmN0aW9uIGdlbmVyYXRlVG9waWNMYXdzKCl7CiAgT2JqZWN0LmVudHJpZXMoR0VORVJBVEVEX1RPUElDUykuZm9yRWFjaCgoW2NhdGVnb3J5LCBsaXN0XSk9PnsKICAgIGNvbnN0IHBjID0gcGhyYXNlQ2F0ZWdvcnkoY2F0ZWdvcnkpOwogICAgbGlzdC5mb3JFYWNoKChbbmFtZSwgc3ViamVjdF0sIGlkeCk9PnsKICAgICAgY29uc3Qga2V5ID0gY2F0ZWdvcnkgKyAnX2dlbl8nICsgaWR4ICsgJ18nICsgc2x1Z2lmeShuYW1lKS5zbGljZSgwLDI0KTsKICAgICAgY29uc3QgcG9sYXJp",
"dHlUeXBlID0gY2xhc3NpZnlUb3BpYyhuYW1lLCBzdWJqZWN0KTsKICAgICAgY29uc3QgY2xhdXNlcyA9IHt9OwogICAgICBpZihwb2xhcml0eVR5cGU9PT0nZGlyZWl0bycpewogICAgICAgIFsxLDIsMyw0LDVdLmZvckVhY2goc2V2PT57IGNsYXVzZXNbc2V2XSA9IFJJR0hUX1NVUFBSRVNTX1BIUkFTRVNbcGNdW3Nldl0oc3ViamVjdCk7IH0pOwogICAgICAgIFBSRVNFVF9MQVdTLnB1c2goeyBrZXksIGNhdGVnb3J5LCBuYW1lLCBzdWJqZWN0LCBiYXNlOicnLCBjbGF1c2VzLCBwb2xhcml0eVR5cGUsIGZpeGVkRGVsdGFzOiBS",
"SUdIVF9ERUxUQV9QUk9GSUxFIH0pOwogICAgICB9IGVsc2UgaWYocG9sYXJpdHlUeXBlPT09J3ZpY2lvJyl7CiAgICAgICAgWzEsMiwzLDQsNV0uZm9yRWFjaChzZXY9PnsgY2xhdXNlc1tzZXZdID0gVklDRV9FTkFDVF9QSFJBU0VTW3BjXVtzZXZdKHN1YmplY3QpOyB9KTsKICAgICAgICBjb25zdCBmaXhlZERlbHRhcyA9IHt9OwogICAgICAgIFsxLDIsMyw0LDVdLmZvckVhY2goc2V2PT57IGZpeGVkRGVsdGFzW3Nldl0gPSBuZWdhdGVEZWx0YXMoVklDRV9BQk9MSVNIX0RFTFRBX1BST0ZJTEVbc2V2XSk7IH0pOwogICAgICAg",
"IFBSRVNFVF9MQVdTLnB1c2goeyBrZXksIGNhdGVnb3J5LCBuYW1lLCBzdWJqZWN0LCBiYXNlOicnLCBjbGF1c2VzLCBwb2xhcml0eVR5cGUsIGZpeGVkRGVsdGFzIH0pOwogICAgICB9IGVsc2UgewogICAgICAgIFsxLDIsMyw0LDVdLmZvckVhY2goc2V2PT57IGNsYXVzZXNbc2V2XSA9IFRJRVJfUEhSQVNFU1twY11bc2V2XShzdWJqZWN0KTsgfSk7CiAgICAgICAgUFJFU0VUX0xBV1MucHVzaCh7IGtleSwgY2F0ZWdvcnksIG5hbWUsIHN1YmplY3QsIGJhc2U6JycsIGNsYXVzZXMsIHBvbGFyaXR5VHlwZSB9KTsKICAgICAgfQog",
"ICAgfSk7CiAgfSk7Cn0pKCk7CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgIk8gQ09OVFJBIiDigJQgdG9kYSBsZWkgdGVtIHVtYSB2ZXJzw6NvIG9wb3N0YS4KICAgTyBmcmFzZWFkbyBlIG9zIGVmZWl0b3MgZGEgdmVyc8OjbyBvcG9zdGEgZGVwZW5kZW0gZG8gdGlwbwogICBzZW3Dom50aWNvIGRvIHTDs3BpY28gKGRpcmVpdG8gLyB2w61jaW8gLyBhdGl2aWRhZGUgbmV1dHJhKS4KPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09",
"PT09PT09PT09PT09PT09PT09PT09ICovCmNvbnN0IE9QUE9TSVRFX1RJRVJfUEhSQVNFUyA9IHsKICByZWFsOiB7CiAgICAxOiAocyk9PiBgVW0gbGV2ZSBpbmNlbnRpdm8gw6kgZGFkbyDDoCBsaWJlcmRhZGUgcXVhbnRvIGEgJHtzfSwgc2VtIHF1YWxxdWVyIGV4aWfDqm5jaWEgZGUgbGljZW7Dp2Egb3UgY29udHJvbGUgcHLDqXZpby5gLAogICAgMjogKHMpPT4gYFJlZHV6ZW0tc2UgYXMgZXhpZ8OqbmNpYXMgYnVyb2Nyw6F0aWNhcyBzb2JyZSAke3N9LCBzaW1wbGlmaWNhbmRvIHByb2Nlc3NvcyBlIGVsaW1pbmFuZG8gdGF4",
"YXMgZGVzbmVjZXNzw6FyaWFzLmAsCiAgICAzOiAocyk9PiBgR2FyYW50ZS1zZSBwb3IgbGVpIGFtcGxhIHByb3Rlw6fDo28gZSBsaXZyZSBleGVyY8OtY2lvIHF1YW50byBhICR7c30sIGxpbWl0YW5kbyBhIGludGVydmVuw6fDo28gZXN0YXRhbCBhbyBtw61uaW1vIG5lY2Vzc8OhcmlvLmAsCiAgICA0OiAocyk9PiBgTyBFc3RhZG8gcHJhdGljYW1lbnRlIGV4dGluZ3VlIHF1YWxxdWVyIGNvbnRyb2xlIHNvYnJlICR7c30sIGRlaXhhbmRvIGEgbWF0w6lyaWEgaW50ZWlyYW1lbnRlIGEgY3JpdMOpcmlvIGRvcyBjaWRhZMOjb3Mu",
"YCwKICAgIDU6IChzKT0+IGBQcm/DrWJlLXNlIHRlcm1pbmFudGVtZW50ZSBxdWFscXVlciBpbnRlcmZlcsOqbmNpYSBlc3RhdGFsIHNvYnJlICR7c307IGEgbGliZXJkYWRlIG5lc3NhIG1hdMOpcmlhIMOpIGFic29sdXRhIGUgY29uc3RpdHVjaW9uYWxtZW50ZSBibGluZGFkYS5gLAogIH0sCiAgc3RhcndhcnM6IHsKICAgIDE6IChzKT0+IGBVbSBkZWNyZXRvIGRlIHRvbGVyw6JuY2lhIHBlcm1pdGUgbWFpb3IgYXV0b25vbWlhIGxvY2FsIHF1YW50byBhICR7c30sIGNvbSBtw61uaW1hIHN1cGVydmlzw6NvIGltcGVyaWFsLmAs",
"CiAgICAyOiAocyk9PiBgQSBhZG1pbmlzdHJhw6fDo28gcmVnaW9uYWwgcmVsYXhhIGFzIG5vcm1hcyBzb2JyZSAke3N9LCByZXRpcmFuZG8gcGFydGUgZGEgZmlzY2FsaXphw6fDo28gaW1wb3N0YSBhbnRlcmlvcm1lbnRlLmAsCiAgICAzOiAocyk9PiBgTyBnb3Zlcm5vIGdhcmFudGUgYW1wbGEgbGliZXJkYWRlIHF1YW50byBhICR7c30sIHJldGlyYW5kbyBndWFybmnDp8O1ZXMgZSBkZXZvbHZlbmRvIGF1dG9ub21pYSBhb3MgbXVuZG9zIGxvY2Fpcy5gLAogICAgNDogKHMpPT4gYFJldm9nYS1zZSBxdWFzZSB0b2RhIHJlc3Ry",
"acOnw6NvIGltcGVyaWFsIHNvYnJlICR7c307IG9zIG11bmRvcyByZWN1cGVyYW0gY29udHJvbGUgcXVhc2UgdG90YWwgc29icmUgbyBhc3N1bnRvLmAsCiAgICA1OiAocyk9PiBgRGVjbGFyYS1zZSBsaWJlcmRhZGUgYWJzb2x1dGEgZSBpbnZpb2zDoXZlbCBxdWFudG8gYSAke3N9OyBuZW5odW1hIGZvcsOnYSBpbXBlcmlhbCBwb2RlIG1haXMgaW50ZXJmZXJpciBuYSBtYXTDqXJpYSwgc29iIHBlbmEgZGUgcmViZWxpw6NvIGxlZ8OtdGltYS5gLAogIH0sCiAgZmljY2FvOiB7CiAgICAxOiAocyk9PiBgVW1hIGRpcmV0cml6IGRl",
"IHRvbGVyw6JuY2lhIGZhdm9yZWNlIG1haW9yIGxpYmVyZGFkZSBxdWFudG8gYSAke3N9LCBzZW0gZXhpZ8OqbmNpYSBkZSBsaWNlbsOnYXMgcG9ydHXDoXJpYXMuYCwKICAgIDI6IChzKT0+IGBSZWR1emVtLXNlIGFzIGV4aWfDqm5jaWFzIGJ1cm9jcsOhdGljYXMgc29icmUgJHtzfSwgYWdpbGl6YW5kbyBvIHRyw6Juc2l0byBkZSBtZXJjYWRvcmlhcyBlIGFnZW50ZXMgcGVsbyBzZXRvci5gLAogICAgMzogKHMpPT4gYEdhcmFudGUtc2UgYW1wbGEgbGliZXJkYWRlIGRlIHByw6F0aWNhIHF1YW50byBhICR7c30sIGNvbSBtw61u",
"aW1hIGZpc2NhbGl6YcOnw6NvIHBvciBwYXJ0ZSBkYXMgYXV0b3JpZGFkZXMgbG9jYWlzLmAsCiAgICA0OiAocyk9PiBgUHJhdGljYW1lbnRlIGV4dGluZ3VlLXNlIHF1YWxxdWVyIGNvbnRyb2xlIHNvYnJlICR7c30sIGRlaXhhbmRvIGEgbWF0w6lyaWEgYSBjcml0w6lyaW8gZXhjbHVzaXZvIGRvcyBmYXIgdHJhZGVycyBlIGZhdG9yZXMgbG9jYWlzLmAsCiAgICA1OiAocyk9PiBgRGVjbGFyYS1zZSBsaWJlcmRhZGUgYWJzb2x1dGEgZSBpcnJlc3RyaXRhIHF1YW50byBhICR7c307IG5lbmh1bWEgYXV0b3JpZGFkZSBwb3J0dcOh",
"cmlhIG91IHNldG9yaWFsIHBvZGUgbWFpcyBpbnRlcnZpciBuYSBtYXTDqXJpYS5gLAogIH0sCn07CmNvbnN0IE9QUE9TSVRFX05BTUVfUFJFRklYID0gewogIGF0aXZpZGFkZTogeyByZWFsOidSZXZvZ2HDp8OjbyDigJQgJywgc3RhcndhcnM6J8OJZGl0byBkZSBMaWJlcmRhZGUg4oCUICcsIGZpY2NhbzonQ2FydGEgZGUgTGl2cmUgUHLDoXRpY2Eg4oCUICcsIGlzYjonTWVtb3JhbmRvIFJldm9nYWRvIOKAlCAnIH0sCiAgZGlyZWl0bzogICB7IHJlYWw6J0dhcmFudGlhIFBsZW5hIOKAlCAnLCBzdGFyd2Fyczonw4lkaXRvIGRl",
"IFByb3Rlw6fDo28g4oCUICcsIGZpY2NhbzonQ2FydGEgZGUgUHJvdGXDp8OjbyDigJQgJywgaXNiOidBbmlzdGlhIGRvIEJ1cmVhdSDigJQgJyB9LAogIHZpY2lvOiAgICAgeyByZWFsOidBYm9sacOnw6NvIOKAlCAnLCBzdGFyd2Fyczonw4lkaXRvIGRlIEFib2xpw6fDo28g4oCUICcsIGZpY2NhbzonQ2FydGEgZGUgQWJvbGnDp8OjbyDigJQgJywgaXNiOidEaXJldGl2YSBkZSBBYm9sacOnw6NvIOKAlCAnIH0sCn07CgpmdW5jdGlvbiBuZWdhdGVEZWx0YXMoZGVsdGFzKXsKICBjb25zdCBvID0ge307CiAgT2JqZWN0LmVudHJp",
"ZXMoZGVsdGFzfHx7fSkuZm9yRWFjaCgoW2ssdl0pPT57IG9ba10gPSAtdjsgfSk7CiAgcmV0dXJuIG87Cn0KZnVuY3Rpb24gYnVpbGRPcHBvc2l0ZUZyb21QcmVzZXQocHJlc2V0LCBzZXZlcml0eSl7CiAgY29uc3Qgc3ViamVjdCA9IHByZXNldC5zdWJqZWN0IHx8IHByZXNldC5uYW1lLnRvTG93ZXJDYXNlKCk7CiAgY29uc3QgdHlwZSA9IHByZXNldC5wb2xhcml0eVR5cGUgfHwgJ2F0aXZpZGFkZSc7CiAgY29uc3QgcGMgPSBwaHJhc2VDYXRlZ29yeShwcmVzZXQuY2F0ZWdvcnkpOwogIGxldCBwaHJhc2VGbjsKICBpZih0eXBl",
"PT09J2RpcmVpdG8nKSBwaHJhc2VGbiA9IFJJR0hUX1BST1RFQ1RfUEhSQVNFU1twY11bc2V2ZXJpdHldOwogIGVsc2UgaWYodHlwZT09PSd2aWNpbycpIHBocmFzZUZuID0gVklDRV9BQk9MSVNIX1BIUkFTRVNbcGNdW3NldmVyaXR5XTsKICBlbHNlIHBocmFzZUZuID0gKE9QUE9TSVRFX1RJRVJfUEhSQVNFU1twY10gfHwgT1BQT1NJVEVfVElFUl9QSFJBU0VTLnJlYWwpW3NldmVyaXR5XTsKICBjb25zdCB0ZXh0ID0gcGhyYXNlRm4oc3ViamVjdCk7CiAgY29uc3QgcHJlZml4ID0gKE9QUE9TSVRFX05BTUVfUFJFRklYW3R5cGVd",
"IHx8IE9QUE9TSVRFX05BTUVfUFJFRklYLmF0aXZpZGFkZSlbcHJlc2V0LmNhdGVnb3J5XSB8fCAnUmV2b2dhw6fDo28g4oCUICc7CiAgY29uc3QgbmFtZSA9IHByZWZpeCArIHByZXNldC5uYW1lOwogIHJldHVybiB7IG5hbWUsIHRleHQgfTsKfQoKCi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICBIRUxQRVJTIERFIERBRE9TCj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwpmdW5jdGlvbiBn",
"ZXRGYWN0aW9uKGlkKXsgcmV0dXJuIHN0YXRlLmZhY3Rpb25zLmZpbmQoZj0+Zi5pZD09PWlkKSB8fCBudWxsOyB9CmZ1bmN0aW9uIGdldFBsYW5ldChpZCl7IHJldHVybiBzdGF0ZS5wbGFuZXRzLmZpbmQocD0+cC5pZD09PWlkKSB8fCBudWxsOyB9CmZ1bmN0aW9uIHBsYW5ldHNPZkZhY3Rpb24oZmFjdGlvbklkKXsgcmV0dXJuIHN0YXRlLnBsYW5ldHMuZmlsdGVyKHA9PnAuZmFjdGlvbklkPT09ZmFjdGlvbklkKTsgfQpmdW5jdGlvbiB1bmFzc2lnbmVkUGxhbmV0cygpeyByZXR1cm4gc3RhdGUucGxhbmV0cy5maWx0ZXIocD0+",
"IXAuZmFjdGlvbklkKTsgfQoKZnVuY3Rpb24gZWZmZWN0aXZlUmVzb3VyY2VzKHBsYW5ldCl7CiAgY29uc3QgZmFjdGlvbiA9IHBsYW5ldC5mYWN0aW9uSWQgPyBnZXRGYWN0aW9uKHBsYW5ldC5mYWN0aW9uSWQpIDogbnVsbDsKICBjb25zdCBiYXNlID0gey4uLnBsYW5ldC5iYXNlUmVzb3VyY2VzfTsKICBjb25zdCBhbGxMYXdzID0gWyAuLi4oZmFjdGlvbiA/IGZhY3Rpb24ubGF3cyA6IFtdKSwgLi4ucGxhbmV0Lmxhd3MgXTsKICBjb25zdCB0b3RhbHMgPSBlbXB0eVRvdGFscygpOwogIGFsbExhd3MuZm9yRWFjaChsPT57IE9i",
"amVjdC5lbnRyaWVzKGwuZGVsdGFzKS5mb3JFYWNoKChbayx2XSk9PnsgdG90YWxzW2tdPSh0b3RhbHNba118fDApK3Y7IH0pOyB9KTsKICBjb25zdCByZXN1bHQgPSB7fTsKICBPYmplY3Qua2V5cyhiYXNlKS5mb3JFYWNoKGs9PnsgcmVzdWx0W2tdID0gY2xhbXAoYmFzZVtrXSArICh0b3RhbHNba118fDApKTsgfSk7CiAgcmV0dXJuIHtyZXN1bHQsIHRvdGFsc307Cn0KZnVuY3Rpb24gaGFwcHlDb2xvcih2KXsgaWYodj49NjYpIHJldHVybiAnIzM5ZmY5Yyc7IGlmKHY+PTM0KSByZXR1cm4gJyNmZmIzNDAnOyByZXR1cm4gJyNm",
"ZjNiM2InOyB9CgpmdW5jdGlvbiBzZXRWaWV3KHYpeyBzdGF0ZS52aWV3ID0gdjsgcGVyc2lzdEF1dG9zYXZlKCk7IHJlbmRlcigpOyB9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgSk9STkFMIC8gTk9Uw41DSUFTCj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwpjb25zdCBORVdTX0hFQURMSU5FUyA9IHsKICBwb3NpdGl2ZTogWwogICAgJ011bHRpZMO1ZXMgY29tZW1vcmFtIG5vdm8g",
"ZGVjcmV0byBlbSB7UExBTkVUfScsCiAgICAne1BMQU5FVH0gY2VsZWJyYTogIntMQVd9IiDDqSBhcHJvdmFkbyBlbnRyZSBhcGxhdXNvcycsCiAgICAnQ2lkYWTDo29zIGRlIHtQTEFORVR9IHJlY2ViZW0gYmVtIG8gZGVjcmV0byAie0xBV30iJywKICAgICdBbmFsaXN0YXMgdmVlbSAie0xBV30iIGNvbW8gdml0w7NyaWEgcGFyYSBvIHBvdm8gZGUge1BMQU5FVH0nLAogIF0sCiAgbmVnYXRpdmU6IFsKICAgICdUZW5zw6NvIHRvbWEgYXMgcnVhcyBkZSB7UExBTkVUfSBhcMOzcyAie0xBV30iJywKICAgICdQcm90ZXN0b3MgZXN0",
"b3VyYW0gZW0ge1BMQU5FVH0gY29udHJhICJ7TEFXfSInLAogICAgJyJ7TEFXfSIgZ2VyYSBpbmRpZ25hw6fDo28gZ2VuZXJhbGl6YWRhIGVtIHtQTEFORVR9JywKICAgICdBdXRvcmlkYWRlcyByZWZvcsOnYW0gc2VndXJhbsOnYSBlbSB7UExBTkVUfSBhcMOzcyBhbsO6bmNpbyBkZSAie0xBV30iJywKICBdLAogIG5ldXRyYWw6IFsKICAgICdHb3Zlcm5vIGRlIHtQTEFORVR9IGFudW5jaWEgIntMQVd9IicsCiAgICAne1BMQU5FVH0gcmVhZ2UgY29tIGNhdXRlbGEgYSAie0xBV30iJywKICAgICdPcGluacO1ZXMgZGl2aWRpZGFz",
"IGVtIHtQTEFORVR9IHNvYnJlICJ7TEFXfSInLAogICAgJ0VudHJhIGVtIHZpZ29yIGVtIHtQTEFORVR9OiAie0xBV30iJywKICBdLAp9Owpjb25zdCBORVdTX0JPRFlfU1VGRklYID0gewogIHBvc2l0aXZlOiBbCiAgICAnQ29tZXJjaWFudGVzIGUgY2lkYWTDo29zIGNvbXVucyByZWxhdGFtIG90aW1pc21vIGNvbSBvcyBydW1vcyBkbyBnb3Zlcm5vLicsCiAgICAnTmFzIHByYcOnYXMgcMO6YmxpY2FzLCBvIGNsaW1hIMOpIGRlIGVzcGVyYW7Dp2EgcmVub3ZhZGEgcXVhbnRvIGFvIGZ1dHVybyBkbyBzZXRvci4nLAogICAgJ0Fu",
"YWxpc3RhcyBsb2NhaXMgcHJldmVlbSBlZmVpdG9zIHBvc2l0aXZvcyBkdXJhZG91cm9zIHBhcmEgYSBwb3B1bGHDp8Ojby4nLAogIF0sCiAgbmVnYXRpdmU6IFsKICAgICdHcnVwb3MgZGUgb3Bvc2nDp8OjbyBqw6EgY29udm9jYW0gbWFuaWZlc3Rhw6fDtWVzIHBhcmEgb3MgcHLDs3hpbW9zIGRpYXMuJywKICAgICdNb3JhZG9yZXMgcmVsYXRhbSBhcHJlZW5zw6NvIGUgZGVzY29uZmlhbsOnYSBxdWFudG8gw6BzIHJlYWlzIGludGVuw6fDtWVzIGRvIGRlY3JldG8uJywKICAgICdFc3BlY2lhbGlzdGFzIGFsZXJ0YW0gcGFyYSBw",
"b3Nzw612ZWlzIGNvbnNlcXXDqm5jaWFzIG5lZ2F0aXZhcyBhIG3DqWRpbyBwcmF6by4nLAogIF0sCiAgbmV1dHJhbDogWwogICAgJ0EgcG9wdWxhw6fDo28gYWluZGEgYXZhbGlhIG9zIGVmZWl0b3MgcHLDoXRpY29zIGRhIG1lZGlkYSBubyBkaWEgYSBkaWEuJywKICAgICdBdXRvcmlkYWRlcyBsb2NhaXMgcHJvbWV0ZW0gZXNjbGFyZWNpbWVudG9zIGFkaWNpb25haXMgbmFzIHByw7N4aW1hcyBzZW1hbmFzLicsCiAgICAnTyBpbXBhY3RvIHJlYWwgZG8gZGVjcmV0byBzw7MgZGV2ZSBzZXIgc2VudGlkbyBub3MgcHLDs3hpbW9z",
"IG1lc2VzLicsCiAgXSwKfTsKZnVuY3Rpb24gcGlja1JhbmRvbShhcnIpeyByZXR1cm4gYXJyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSphcnIubGVuZ3RoKV07IH0KZnVuY3Rpb24gbGF3U2VudGltZW50U2NvcmUoZGVsdGFzKXsKICBjb25zdCBkID0gZGVsdGFzIHx8IHt9OwogIHJldHVybiAoZC5mZWxpY2lkYWRlfHwwKSoyICsgKGQubGliZXJkYWRlfHwwKSoxLjIgLSAoZC5zZWd1cmFuY2F8fDApKjAuNCAtIChkLmNvcnJ1cGNhb3x8MCkqMS4zICsgKGQuZWNvbm9taWF8fDApKjAuMyArIChkLmN1bHR1cmF8fDApKjAuNDsK",
"fQpmdW5jdGlvbiBnZW5lcmF0ZU5ld3NGb3JMYXcobGF3LCBwbGFuZXROYW1lKXsKICBjb25zdCBzY29yZSA9IGxhd1NlbnRpbWVudFNjb3JlKGxhdy5kZWx0YXMpOwogIGNvbnN0IHRvbmUgPSBzY29yZT49MyA/ICdwb3NpdGl2ZScgOiBzY29yZTw9LTMgPyAnbmVnYXRpdmUnIDogJ25ldXRyYWwnOwogIGNvbnN0IGhlYWRsaW5lID0gcGlja1JhbmRvbShORVdTX0hFQURMSU5FU1t0b25lXSkucmVwbGFjZSgne1BMQU5FVH0nLCBwbGFuZXROYW1lKS5yZXBsYWNlKCd7TEFXfScsIGxhdy5uYW1lKTsKICBjb25zdCBib2R5ID0gbGF3",
"LnRleHQgKyAnICcgKyBwaWNrUmFuZG9tKE5FV1NfQk9EWV9TVUZGSVhbdG9uZV0pOwogIHJldHVybiB7IGlkOiB1aWQoJ25ld3MnKSwgaGVhZGxpbmUsIGJvZHksIHRvbmUsIGxhd05hbWU6IGxhdy5uYW1lLCBzZXZlcml0eTogbGF3LnNldmVyaXR5LCBkYXRlOiBEYXRlLm5vdygpIH07Cn0KZnVuY3Rpb24gcHVzaE5ld3MocGxhbmV0LCBlbnRyeSl7CiAgaWYoIXBsYW5ldC5uZXdzKSBwbGFuZXQubmV3cyA9IFtdOwogIHBsYW5ldC5uZXdzLnVuc2hpZnQoZW50cnkpOwogIGlmKHBsYW5ldC5uZXdzLmxlbmd0aD42MCkgcGxhbmV0",
"Lm5ld3MubGVuZ3RoID0gNjA7Cn0KZnVuY3Rpb24gcHVzaFNpbXBsZU5ld3MocGxhbmV0LCBoZWFkbGluZSwgYm9keSwgdG9uZSl7CiAgcHVzaE5ld3MocGxhbmV0LCB7IGlkOiB1aWQoJ25ld3MnKSwgaGVhZGxpbmUsIGJvZHksIHRvbmU6IHRvbmV8fCduZXV0cmFsJywgbGF3TmFtZTpudWxsLCBzZXZlcml0eTpudWxsLCBkYXRlOiBEYXRlLm5vdygpIH0pOwp9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgU0VOVElNRU5UTyBQT1BVTEFSIChmZWVkYmFj",
"aykKPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCmNvbnN0IEZFRURCQUNLX1FVT1RFUyA9IHsKICBsaWJlcmRhZGVfbG93OiBbCiAgICB7IHJvbGU6J0NvbWVyY2lhbnRlIGxvY2FsJywgdGV4dDonTsOjbyBwb3NzbyBuZW0gZmFsYXIgbyBxdWUgcGVuc28gc2VtIG9saGFyIHBvciBjaW1hIGRvIG9tYnJvLiBJc3NvIG7Do28gw6kgdmlkYS4nIH0sCiAgICB7IHJvbGU6J0NpZGFkw6NvIGFuw7RuaW1vJywgdGV4dDonQ2FkYSBkZWNpc8OjbyBkYSBtaW5oYSB2aWRh",
"IHByZWNpc2EgZGUgYXV0b3JpemHDp8OjbyBkZSBhbGd1w6ltLiBDYW5zZWkuJyB9LAogIF0sCiAgbGliZXJkYWRlX2hpZ2g6IFsKICAgIHsgcm9sZTonUHJvZmVzc29yYScsIHRleHQ6J0ZpbmFsbWVudGUgcG9zc28gZW5zaW5hciBvIHF1ZSBhY3JlZGl0byBzZW0gbWVkbyBkZSByZXByZXPDoWxpYXMuJyB9LAogICAgeyByb2xlOidBcnRpc3RhIGRlIHJ1YScsIHRleHQ6J05pbmd1w6ltIG1lIGRpeiBtYWlzIG8gcXVlIHBvc3NvIG91IG7Do28gY3JpYXIuIMOJIGxpYmVydGFkb3IuJyB9LAogIF0sCiAgc2VndXJhbmNhX2hpZ2hf",
"bGliZXJkYWRlX2xvdzogWwogICAgeyByb2xlOidNb3JhZG9yIGRvIHNldG9yIGluZHVzdHJpYWwnLCB0ZXh0OidUZW0gcGF0cnVsaGEgZW0gY2FkYSBlc3F1aW5hLiBNZSBzaW50byB2aWdpYWRvLCBuw6NvIHByb3RlZ2lkby4nIH0sCiAgXSwKICBzZWd1cmFuY2FfbG93OiBbCiAgICB7IHJvbGU6J0NvbWVyY2lhbnRlJywgdGV4dDonRnVpIGFzc2FsdGFkbyBkdWFzIHZlemVzIGVzc2UgbcOqcyBlIG5pbmd1w6ltIGFwYXJlY2V1IHBhcmEgYWp1ZGFyLicgfSwKICAgIHsgcm9sZTonTcOjZSBkZSBmYW3DrWxpYScsIHRleHQ6J07D",
"o28gZGVpeG8gbWFpcyBtZXVzIGZpbGhvcyBzYcOtcmVtIHNvemluaG9zIGRlcG9pcyBkbyBhbm9pdGVjZXIuJyB9LAogIF0sCiAgY29ycnVwY2FvX2hpZ2g6IFsKICAgIHsgcm9sZTonUGVxdWVubyBlbXByZXPDoXJpbycsIHRleHQ6J05hZGEgYW5kYSBwb3IgYXF1aSBzZW0gdW0gImFncmFkbyIgcGFyYSBvIGZ1bmNpb27DoXJpbyBjZXJ0by4nIH0sCiAgICB7IHJvbGU6J0Z1bmNpb27DoXJpbyBww7pibGljbyBhcG9zZW50YWRvJywgdGV4dDonVmkgY29sZWdhcyBlbnJpcXVlY2VyZW0gZGEgbm9pdGUgcHJvIGRpYS4gVG9kbyBt",
"dW5kbyBzYWJlLCBuaW5ndcOpbSBmYXogbmFkYS4nIH0sCiAgXSwKICBjb3JydXBjYW9fbG93OiBbCiAgICB7IHJvbGU6J0NvbnRhZG9yIG11bmljaXBhbCcsIHRleHQ6J1BlbGEgcHJpbWVpcmEgdmV6IGVtIGFub3MsIGFzIGNvbnRhcyBww7pibGljYXMgcmVhbG1lbnRlIGZlY2hhbS4nIH0sCiAgXSwKICBlY29ub21pYV9sb3c6IFsKICAgIHsgcm9sZTonVHJhYmFsaGFkb3IgZG8gcG9ydG8nLCB0ZXh0OidPcyBwcmXDp29zIHNvYmVtIHRvZGEgc2VtYW5hIGUgbWV1IHNhbMOhcmlvIGNvbnRpbnVhIG8gbWVzbW8uJyB9LAogICAg",
"eyByb2xlOidEb25hIGRlIG1lcmNlYXJpYScsIHRleHQ6J01hbCBjb25zaWdvIHJlcG9yIGFzIHByYXRlbGVpcmFzLiBPIGNvbcOpcmNpbyBlc3TDoSBtb3JyZW5kby4nIH0sCiAgXSwKICBlY29ub21pYV9oaWdoOiBbCiAgICB7IHJvbGU6J0VtcHJlc8OhcmlvIGxvY2FsJywgdGV4dDonTnVuY2EgdmkgdGFudG8gaW52ZXN0aW1lbnRvIGNoZWdhbmRvIHBvciBhcXVpLiBPcyBuZWfDs2Npb3MgZXN0w6NvIHByb3NwZXJhbmRvLicgfSwKICBdLAogIGZlbGljaWRhZGVfbG93OiBbCiAgICB7IHJvbGU6J0lkb3NvIGFwb3NlbnRhZG8n",
"LCB0ZXh0OidKw6EgdmkgdGVtcG9zIG1lbGhvcmVzLiBOaW5ndcOpbSBzb3JyaSBtYWlzIG5hcyBydWFzLicgfSwKICBdLAogIGZlbGljaWRhZGVfaGlnaDogWwogICAgeyByb2xlOidKb3ZlbSBlc3R1ZGFudGUnLCB0ZXh0OidUZW0gdW0gY2xpbWEgYm9tIG5vIGFyIHVsdGltYW1lbnRlLiBBcyBwZXNzb2FzIHBhcmVjZW0gbWFpcyBsZXZlcy4nIH0sCiAgXSwKICBlc3RhYmlsaWRhZGVfbG93OiBbCiAgICB7IHJvbGU6J0FuYWxpc3RhIHBvbMOtdGljbyBsb2NhbCcsIHRleHQ6J05pbmd1w6ltIHNhYmUgbyBxdWUgZXNwZXJhciBk",
"byBnb3Zlcm5vIGRlIHVtYSBzZW1hbmEgcHJhIG91dHJhLicgfSwKICBdLAogIGVzdGFiaWxpZGFkZV9oaWdoOiBbCiAgICB7IHJvbGU6J0ludmVzdGlkb3IgcmVnaW9uYWwnLCB0ZXh0OidBIHByZXZpc2liaWxpZGFkZSBkYXMgw7psdGltYXMgZGVjaXPDtWVzIHRyb3V4ZSBjb25maWFuw6dhIHBhcmEgaW52ZXN0aXIgYXF1aS4nIH0sCiAgXSwKICB0ZWNub2xvZ2lhX2hpZ2g6IFsKICAgIHsgcm9sZTonRW5nZW5oZWlybyBsb2NhbCcsIHRleHQ6J09zIG5vdm9zIGVxdWlwYW1lbnRvcyBtdWRhcmFtIGNvbXBsZXRhbWVudGUgbm9z",
"c2EgcHJvZHV0aXZpZGFkZS4nIH0sCiAgXSwKICB0ZWNub2xvZ2lhX2xvdzogWwogICAgeyByb2xlOidUw6ljbmljbyBkZSBtYW51dGVuw6fDo28nLCB0ZXh0OidBaW5kYSB0cmFiYWxoYW1vcyBjb20gc3VjYXRhIGRhIGdlcmHDp8OjbyBwYXNzYWRhLiBQcmVjaXNhbW9zIGRlIG1haXMgaW52ZXN0aW1lbnRvLicgfSwKICBdLAogIGN1bHR1cmFfbG93OiBbCiAgICB7IHJvbGU6J03DunNpY28gZGUgcnVhJywgdGV4dDonTsOjbyBzb2JyYSBlc3Bhw6dvIHByYSBhcnRlIHF1YW5kbyB0dWRvIMOpIHJlZ3VsYWRvIGUgdmlnaWFkby4n",
"IH0sCiAgXSwKICBjdWx0dXJhX2hpZ2g6IFsKICAgIHsgcm9sZTonQ3VyYWRvciBkZSBtdXNldScsIHRleHQ6J051bmNhIHZpdmVtb3MgdW0gZmxvcmVzY2ltZW50byBjdWx0dXJhbCBjb21vIGVzdGUuJyB9LAogIF0sCn07CmZ1bmN0aW9uIGJ1aWxkRmVlZGJhY2tRdW90ZXMocmVzdWx0KXsKICBjb25zdCBwaWNrcyA9IFtdOwogIGZ1bmN0aW9uIG1heWJlKGtleSwgY29uZCl7IGlmKGNvbmQgJiYgRkVFREJBQ0tfUVVPVEVTW2tleV0peyBwaWNrcy5wdXNoKHtrZXksIHE6IHBpY2tSYW5kb20oRkVFREJBQ0tfUVVPVEVTW2tleV0p",
"fSk7IH0gfQogIG1heWJlKCdsaWJlcmRhZGVfbG93JywgcmVzdWx0LmxpYmVyZGFkZTw9MzUpOwogIG1heWJlKCdsaWJlcmRhZGVfaGlnaCcsIHJlc3VsdC5saWJlcmRhZGU+PTcwKTsKICBtYXliZSgnc2VndXJhbmNhX2hpZ2hfbGliZXJkYWRlX2xvdycsIHJlc3VsdC5zZWd1cmFuY2E+PTcwICYmIHJlc3VsdC5saWJlcmRhZGU8PTQ1KTsKICBtYXliZSgnc2VndXJhbmNhX2xvdycsIHJlc3VsdC5zZWd1cmFuY2E8PTMwKTsKICBtYXliZSgnY29ycnVwY2FvX2hpZ2gnLCByZXN1bHQuY29ycnVwY2FvPj02NSk7CiAgbWF5YmUoJ2Nv",
"cnJ1cGNhb19sb3cnLCByZXN1bHQuY29ycnVwY2FvPD0yMCk7CiAgbWF5YmUoJ2Vjb25vbWlhX2xvdycsIHJlc3VsdC5lY29ub21pYTw9MzApOwogIG1heWJlKCdlY29ub21pYV9oaWdoJywgcmVzdWx0LmVjb25vbWlhPj03NSk7CiAgbWF5YmUoJ2ZlbGljaWRhZGVfbG93JywgcmVzdWx0LmZlbGljaWRhZGU8PTMwKTsKICBtYXliZSgnZmVsaWNpZGFkZV9oaWdoJywgcmVzdWx0LmZlbGljaWRhZGU+PTc1KTsKICBtYXliZSgnZXN0YWJpbGlkYWRlX2xvdycsIHJlc3VsdC5lc3RhYmlsaWRhZGU8PTMwKTsKICBtYXliZSgnZXN0YWJp",
"bGlkYWRlX2hpZ2gnLCByZXN1bHQuZXN0YWJpbGlkYWRlPj03NSk7CiAgbWF5YmUoJ3RlY25vbG9naWFfaGlnaCcsIHJlc3VsdC50ZWNub2xvZ2lhPj03NSk7CiAgbWF5YmUoJ3RlY25vbG9naWFfbG93JywgcmVzdWx0LnRlY25vbG9naWE8PTI1KTsKICBtYXliZSgnY3VsdHVyYV9sb3cnLCByZXN1bHQuY3VsdHVyYTw9MzApOwogIG1heWJlKCdjdWx0dXJhX2hpZ2gnLCByZXN1bHQuY3VsdHVyYT49NzUpOwogIC8vIHJlbW92ZSBkdXBsaWNhdGFzIGRlIGNoYXZlIGUgbGltaXRhCiAgY29uc3Qgc2VlbiA9IG5ldyBTZXQoKTsgY29u",
"c3Qgb3V0ID0gW107CiAgcGlja3MuZm9yRWFjaChwPT57IGlmKCFzZWVuLmhhcyhwLmtleSkpeyBzZWVuLmFkZChwLmtleSk7IG91dC5wdXNoKHAucSk7IH0gfSk7CiAgaWYob3V0Lmxlbmd0aD09PTApeyBvdXQucHVzaCh7cm9sZTonQ2lkYWTDo28gY29tdW0nLCB0ZXh0OidBcyBjb2lzYXMgc2VndWVtIG5vcm1haXMgcG9yIGFxdWkg4oCUIG5lbSBtZWxob3IsIG5lbSBwaW9yLid9KTsgfQogIHJldHVybiBvdXQuc2xpY2UoMCw2KTsKfQpmdW5jdGlvbiBhcHByb3ZhbEluZGV4KHJlc3VsdCl7CiAgcmV0dXJuIGNsYW1wKE1hdGgu",
"cm91bmQoKHJlc3VsdC5mZWxpY2lkYWRlICsgcmVzdWx0LmxpYmVyZGFkZSArICgxMDAtcmVzdWx0LmNvcnJ1cGNhbykgKyByZXN1bHQuZXN0YWJpbGlkYWRlKS80KSk7Cn0KCi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICBSRU5ERVI6IFNVQk5BViAoYnJlYWRjcnVtYiArIGJhY2spCj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwpmdW5jdGlvbiByZW5kZXJTdWJuYXYoKXsKICBjb25zdCBl",
"bCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJuYXYnKTsKICBjb25zdCB2ID0gc3RhdGUudmlldzsKICBpZih2LnNjcmVlbj09PSdob21lJyl7CiAgICBlbC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9ImNydW1iIGN1cnJlbnQiPuKcpiBIT0xPTkVUPC9zcGFuPmA7CiAgICByZXR1cm47CiAgfQogIGlmKHYuc2NyZWVuPT09J2ZhY3Rpb24nKXsKICAgIGNvbnN0IGYgPSBnZXRGYWN0aW9uKHYuZmFjdGlvbklkKTsKICAgIGlmKCFmKXsgc2V0Vmlldyh7c2NyZWVuOidob21lJ30pOyByZXR1cm47IH0KICAgIGVsLmlubmVy",
"SFRNTCA9IGAKICAgICAgPHNwYW4gY2xhc3M9ImJhY2tidG4iIGlkPSJuYXZCYWNrIj7igLkgVm9sdGFyPC9zcGFuPgogICAgICA8c3BhbiBjbGFzcz0ic2VwIj4vPC9zcGFuPgogICAgICA8c3BhbiBjbGFzcz0iY3J1bWIiIGlkPSJuYXZIb21lIj5IT0xPTkVUPC9zcGFuPgogICAgICA8c3BhbiBjbGFzcz0ic2VwIj4vPC9zcGFuPgogICAgICA8c3BhbiBjbGFzcz0iY3J1bWIgY3VycmVudCI+JHtlc2NhcGVIdG1sKGYubmFtZSl9PC9zcGFuPgogICAgYDsKICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJyNuYXZCYWNrJykuYWRkRXZlbnRM",
"aXN0ZW5lcignY2xpY2snLCAoKT0+IHNldFZpZXcoe3NjcmVlbjonaG9tZSd9KSk7CiAgICBlbC5xdWVyeVNlbGVjdG9yKCcjbmF2SG9tZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiBzZXRWaWV3KHtzY3JlZW46J2hvbWUnfSkpOwogICAgcmV0dXJuOwogIH0KICBpZih2LnNjcmVlbj09PSdwbGFuZXQnKXsKICAgIGNvbnN0IHAgPSBnZXRQbGFuZXQodi5wbGFuZXRJZCk7CiAgICBpZighcCl7IHNldFZpZXcoe3NjcmVlbjonaG9tZSd9KTsgcmV0dXJuOyB9CiAgICBjb25zdCBmID0gcC5mYWN0aW9uSWQgPyBnZXRG",
"YWN0aW9uKHAuZmFjdGlvbklkKSA6IG51bGw7CiAgICBlbC5pbm5lckhUTUwgPSBgCiAgICAgIDxzcGFuIGNsYXNzPSJiYWNrYnRuIiBpZD0ibmF2QmFjayI+4oC5IFZvbHRhcjwvc3Bhbj4KICAgICAgPHNwYW4gY2xhc3M9InNlcCI+Lzwvc3Bhbj4KICAgICAgPHNwYW4gY2xhc3M9ImNydW1iIiBpZD0ibmF2SG9tZSI+SE9MT05FVDwvc3Bhbj4KICAgICAgJHtmPyBgPHNwYW4gY2xhc3M9InNlcCI+Lzwvc3Bhbj48c3BhbiBjbGFzcz0iY3J1bWIiIGlkPSJuYXZGYWN0aW9uIj4ke2VzY2FwZUh0bWwoZi5uYW1lKX08L3NwYW4+YCA6",
"ICcnfQogICAgICA8c3BhbiBjbGFzcz0ic2VwIj4vPC9zcGFuPgogICAgICA8c3BhbiBjbGFzcz0iY3J1bWIgY3VycmVudCI+JHtlc2NhcGVIdG1sKHAubmFtZSl9PC9zcGFuPgogICAgYDsKICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJyNuYXZCYWNrJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHNldFZpZXcoZj8ge3NjcmVlbjonZmFjdGlvbicsIGZhY3Rpb25JZDpmLmlkfSA6IHtzY3JlZW46J2hvbWUnfSkpOwogICAgZWwucXVlcnlTZWxlY3RvcignI25hdkhvbWUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgp",
"PT4gc2V0Vmlldyh7c2NyZWVuOidob21lJ30pKTsKICAgIGNvbnN0IG5mID0gZWwucXVlcnlTZWxlY3RvcignI25hdkZhY3Rpb24nKTsKICAgIGlmKG5mKSBuZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gc2V0Vmlldyh7c2NyZWVuOidmYWN0aW9uJywgZmFjdGlvbklkOmYuaWR9KSk7CiAgfQp9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgUkVOREVSOiBIT01FCj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09",
"PT09PT09PT09PT09PT09PSAqLwpmdW5jdGlvbiByZW5kZXJIb21lKCl7CiAgY29uc3Qgc3RhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhZ2UnKTsKICBzdGFnZS5pbm5lckhUTUwgPSAnJzsKICBjb25zdCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CgogIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICBoZWFkLmNsYXNzTmFtZSA9ICdzdGFnZS10aXRsZS1yb3cnOwogIGhlYWQuaW5uZXJIVE1MID0gYAogICAgPGRpdj4KICAgICAgPGRpdiBjbGFzcz0ic3Rh",
"Z2UtZXllYnJvdyI+VGVybWluYWwgQ2VudHJhbDwvZGl2PgogICAgICA8aDIgY2xhc3M9InN0YWdlLXRpdGxlIj5SZWdpc3RybyBkZSBGYWPDp8O1ZXM8L2gyPgogICAgICA8ZGl2IGNsYXNzPSJzdGFnZS1zdWIiPiR7c3RhdGUuZmFjdGlvbnMubGVuZ3RofSBmYWPDp8OjbyjDtWVzKSBjYXRhbG9nYWRhKHMpIMK3ICR7c3RhdGUucGxhbmV0cy5sZW5ndGh9IG11bmRvKHMpIG5vIHNldG9yPC9kaXY+CiAgICA8L2Rpdj4KICBgOwogIHdyYXAuYXBwZW5kQ2hpbGQoaGVhZCk7CgogIGNvbnN0IHNlYzEgPSBkb2N1bWVudC5jcmVhdGVF",
"bGVtZW50KCdkaXYnKTsKICBzZWMxLmNsYXNzTmFtZT0nc2VjdGlvbic7CiAgc2VjMS5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz0ic2VjdGlvbi1oZWFkIj48aDM+RmFjw6fDtWVzPC9oMz48c3BhbiBjbGFzcz0iY291bnQiPiR7c3RhdGUuZmFjdGlvbnMubGVuZ3RofTwvc3Bhbj48L2Rpdj5gOwogIGNvbnN0IGdyaWQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgZ3JpZDEuY2xhc3NOYW1lPSdiZWFjb24tZ3JpZCc7CgogIHN0YXRlLmZhY3Rpb25zLmZvckVhY2goZj0+ewogICAgY29uc3QgbWVtYmVycyA9IHBs",
"YW5ldHNPZkZhY3Rpb24oZi5pZCk7CiAgICBjb25zdCBiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICBiLmNsYXNzTmFtZT0nYmVhY29uJzsKICAgIGIuc2V0QXR0cmlidXRlKCdzdHlsZScsIGZhY3Rpb25Db2xvclN0eWxlKGYpKTsKICAgIGIuaW5uZXJIVE1MID0gYAogICAgICA8ZGl2IGNsYXNzPSJvcmIiPjxkaXYgY2xhc3M9InJpbmciPjwvZGl2PjwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJibmFtZSI+JHtlc2NhcGVIdG1sKGYubmFtZSl9PC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImJtZXRhIj48Yj4k",
"e21lbWJlcnMubGVuZ3RofTwvYj4gbXVuZG8ke21lbWJlcnMubGVuZ3RoPT09MT8nJzoncyd9IMK3IDxiPiR7Zi5sYXdzLmxlbmd0aH08L2I+IGxlaSR7Zi5sYXdzLmxlbmd0aD09PTE/Jyc6J3MnfTwvZGl2PgogICAgYDsKICAgIGIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHNldFZpZXcoe3NjcmVlbjonZmFjdGlvbicsIGZhY3Rpb25JZDpmLmlkfSkpOwogICAgZ3JpZDEuYXBwZW5kQ2hpbGQoYik7CiAgfSk7CiAgY29uc3QgZ2hvc3QxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgZ2hvc3QxLmNs",
"YXNzTmFtZT0nYmVhY29uIGdob3N0JzsKICBnaG9zdDEuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9Im9yYiI+PHNwYW4gY2xhc3M9InBsdXMiPis8L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz0iYm5hbWUiPk5vdmEgRmFjw6fDo288L2Rpdj48ZGl2IGNsYXNzPSJibWV0YSI+RnVuZGFyIG5vdmEgb3JkZW08L2Rpdj5gOwogIGdob3N0MS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5GYWN0aW9uTW9kYWwpOwogIGdyaWQxLmFwcGVuZENoaWxkKGdob3N0MSk7CiAgc2VjMS5hcHBlbmRDaGlsZChncmlkMSk7CiAgd3JhcC5hcHBl",
"bmRDaGlsZChzZWMxKTsKCiAgY29uc3Qgb3JwaGFucyA9IHVuYXNzaWduZWRQbGFuZXRzKCk7CiAgY29uc3Qgc2VjMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIHNlYzIuY2xhc3NOYW1lPSdzZWN0aW9uJzsKICBzZWMyLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPSJzZWN0aW9uLWhlYWQiPjxoMz5NdW5kb3Mgc2VtIGZhY8Onw6NvPC9oMz48c3BhbiBjbGFzcz0iY291bnQiPiR7b3JwaGFucy5sZW5ndGh9PC9zcGFuPjwvZGl2PmA7CiAgY29uc3QgZ3JpZDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYn",
"KTsKICBncmlkMi5jbGFzc05hbWU9J2JlYWNvbi1ncmlkJzsKICBvcnBoYW5zLmZvckVhY2gocD0+ewogICAgY29uc3Qge3Jlc3VsdH0gPSBlZmZlY3RpdmVSZXNvdXJjZXMocCk7CiAgICBjb25zdCBiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICBiLmNsYXNzTmFtZT0nYmVhY29uJzsKICAgIGIuc3R5bGUuc2V0UHJvcGVydHkoJy0tY2NscicsIGhhcHB5Q29sb3IocmVzdWx0LmZlbGljaWRhZGUpKTsKICAgIGIuc3R5bGUuc2V0UHJvcGVydHkoJy0tY2Nsci1nbG93JywgJ3JnYmEoMjU1LDI1NSwyNTUsMC4z",
"NSknKTsKICAgIGIuaW5uZXJIVE1MID0gYAogICAgICA8ZGl2IGNsYXNzPSJvcmIiPjxkaXYgY2xhc3M9InJpbmciPjwvZGl2PjwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJibmFtZSI+JHtlc2NhcGVIdG1sKHAubmFtZSl9PC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImJtZXRhIj5GZWxpYy4gPGI+JHtyZXN1bHQuZmVsaWNpZGFkZX08L2I+PC9kaXY+CiAgICBgOwogICAgYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gc2V0Vmlldyh7c2NyZWVuOidwbGFuZXQnLCBwbGFuZXRJZDpwLmlkfSkpOwogICAgZ3JpZDIuYXBw",
"ZW5kQ2hpbGQoYik7CiAgfSk7CiAgY29uc3QgZ2hvc3QyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgZ2hvc3QyLmNsYXNzTmFtZT0nYmVhY29uIGdob3N0JzsKICBnaG9zdDIuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9Im9yYiI+PHNwYW4gY2xhc3M9InBsdXMiPis8L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz0iYm5hbWUiPk5vdm8gUGxhbmV0YTwvZGl2PjxkaXYgY2xhc3M9ImJtZXRhIj5SZWdpc3RyYXIgbXVuZG88L2Rpdj5gOwogIGdob3N0Mi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5QbGFuZXRH",
"bG9iYWxNb2RhbCk7CiAgZ3JpZDIuYXBwZW5kQ2hpbGQoZ2hvc3QyKTsKICBzZWMyLmFwcGVuZENoaWxkKGdyaWQyKTsKICB3cmFwLmFwcGVuZENoaWxkKHNlYzIpOwoKICBzdGFnZS5hcHBlbmRDaGlsZCh3cmFwKTsKfQoKLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIFJFTkRFUjogRkFDVElPTgo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KZnVuY3Rpb24gcmVuZGVyRmFjdGlvblNjcmVl",
"bihmYWN0aW9uSWQpewogIGNvbnN0IGYgPSBnZXRGYWN0aW9uKGZhY3Rpb25JZCk7CiAgaWYoIWYpeyBzZXRWaWV3KHtzY3JlZW46J2hvbWUnfSk7IHJldHVybjsgfQogIGNvbnN0IG1lbWJlcnMgPSBwbGFuZXRzT2ZGYWN0aW9uKGYuaWQpOwogIGNvbnN0IGNzdHlsZSA9IGZhY3Rpb25Db2xvclN0eWxlKGYpOwoKICBjb25zdCBzdGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFnZScpOwogIHN0YWdlLmlubmVySFRNTCA9ICcnOwogIGNvbnN0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICB3",
"cmFwLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBjc3R5bGUpOwoKICBjb25zdCBoZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgaGVhZC5jbGFzc05hbWU9J3N0YWdlLXRpdGxlLXJvdyc7CiAgaGVhZC5pbm5lckhUTUwgPSBgCiAgICA8ZGl2PgogICAgICA8ZGl2IGNsYXNzPSJzdGFnZS1leWVicm93IiBzdHlsZT0iY29sb3I6dmFyKC0tY2NscikiPiR7QUxMRUdJQU5DRVNbZi5hbGxlZ2lhbmNlXT8ubmFtZSB8fCAnRmFjw6fDo28nfTwvZGl2PgogICAgICA8aDIgY2xhc3M9InN0YWdlLXRpdGxlIiBzdHlsZT0i",
"dGV4dC1zaGFkb3c6MCAwIDE2cHggdmFyKC0tY2Nsci1nbG93KSI+JHtlc2NhcGVIdG1sKGYubmFtZSl9PC9oMj4KICAgICAgPGRpdiBjbGFzcz0ic3RhZ2Utc3ViIj4ke21lbWJlcnMubGVuZ3RofSBtdW5kbyhzKSBzb2IgZG9tw61uaW8gwrcgbGVnaXNsYcOnw6NvIHNldG9yaWFsIGF0aXZhIGVtIHRvZG9zIGVsZXM8L2Rpdj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0ic3RhZ2UtYWN0aW9ucyI+CiAgICAgIDxidXR0b24gY2xhc3M9ImhidG4gcHJpbWFyeSIgaWQ9ImJ0bkFkZExhd0ZhY3Rpb24iIHR5cGU9ImJ1dHRvbiI+",
"KyBOb3ZhIExlaTwvYnV0dG9uPgogICAgICA8YnV0dG9uIGNsYXNzPSJoYnRuIiBpZD0iYnRuUmVuYW1lRmFjdGlvbiIgdHlwZT0iYnV0dG9uIj5SZW5vbWVhcjwvYnV0dG9uPgogICAgICA8YnV0dG9uIGNsYXNzPSJoYnRuIGRhbmdlciIgaWQ9ImJ0bkRlbGV0ZUZhY3Rpb24iIHR5cGU9ImJ1dHRvbiI+RGlzc29sdmVyPC9idXR0b24+CiAgICA8L2Rpdj4KICBgOwogIHdyYXAuYXBwZW5kQ2hpbGQoaGVhZCk7CgogIGNvbnN0IGxlYWRlcnNTZWMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICBsZWFkZXJzU2VjLmNs",
"YXNzTmFtZT0nY2hpcC1yb3cnOwogIGxlYWRlcnNTZWMuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9InJvdy1jYXB0aW9uIj5BbHRvIENvbWFuZG8gKGF0w6kgNCk8L2Rpdj5gOwogIHdyYXAuYXBwZW5kQ2hpbGQobGVhZGVyc1NlYyk7CgogIGNvbnN0IHBsYW5ldHNTZWMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICBwbGFuZXRzU2VjLmNsYXNzTmFtZT0nc2VjdGlvbic7CiAgcGxhbmV0c1NlYy5pbm5lckhUTUwgPSBgCiAgICA8ZGl2IGNsYXNzPSJzZWN0aW9uLWhlYWQiPgogICAgICA8aDM+TXVuZG9zIFNvYiBE",
"b23DrW5pbzwvaDM+CiAgICAgIDxkaXYgY2xhc3M9ImhlYWQtYWN0aW9ucyI+PGJ1dHRvbiBjbGFzcz0iaGJ0biBzbWFsbCIgaWQ9ImJ0bkFzc2lnblBsYW5ldHMiIHR5cGU9ImJ1dHRvbiI+KyBBdHJpYnVpciBQbGFuZXRhIEV4aXN0ZW50ZTwvYnV0dG9uPjwvZGl2PgogICAgPC9kaXY+CiAgYDsKICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgZ3JpZC5jbGFzc05hbWU9J2JlYWNvbi1ncmlkJzsKICBtZW1iZXJzLmZvckVhY2gocD0+ewogICAgY29uc3Qge3Jlc3VsdH0gPSBlZmZlY3RpdmVS",
"ZXNvdXJjZXMocCk7CiAgICBjb25zdCBiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICBiLmNsYXNzTmFtZT0nYmVhY29uJzsKICAgIGIuaW5uZXJIVE1MID0gYAogICAgICA8ZGl2IGNsYXNzPSJvcmIiPjxkaXYgY2xhc3M9InJpbmciPjwvZGl2PjwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJibmFtZSI+JHtlc2NhcGVIdG1sKHAubmFtZSl9PC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImJtZXRhIj5GZWxpYy4gPGI+JHtyZXN1bHQuZmVsaWNpZGFkZX08L2I+IMK3IFNlZy4gPGI+JHtyZXN1bHQuc2VndXJhbmNh",
"fTwvYj48L2Rpdj4KICAgIGA7CiAgICBiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiBzZXRWaWV3KHtzY3JlZW46J3BsYW5ldCcsIHBsYW5ldElkOnAuaWR9KSk7CiAgICBncmlkLmFwcGVuZENoaWxkKGIpOwogIH0pOwogIGNvbnN0IGdob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgZ2hvc3QuY2xhc3NOYW1lPSdiZWFjb24gZ2hvc3QnOwogIGdob3N0LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPSJvcmIiPjxzcGFuIGNsYXNzPSJwbHVzIj4rPC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9ImJuYW1l",
"Ij5Ob3ZvIFBsYW5ldGE8L2Rpdj48ZGl2IGNsYXNzPSJibWV0YSI+UmVnaXN0cmFyICZhbXA7IGF0cmlidWlyPC9kaXY+YDsKICBnaG9zdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gb3BlblBsYW5ldEdsb2JhbE1vZGFsKGYuaWQpKTsKICBncmlkLmFwcGVuZENoaWxkKGdob3N0KTsKICBwbGFuZXRzU2VjLmFwcGVuZENoaWxkKGdyaWQpOwogIHdyYXAuYXBwZW5kQ2hpbGQocGxhbmV0c1NlYyk7CgogIGNvbnN0IGxhd1NlYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIGxhd1NlYy5jbGFzc05hbWU9",
"J3NlY3Rpb24nOwogIGxhd1NlYy5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz0ic2VjdGlvbi1oZWFkIj48aDM+TGVnaXNsYcOnw6NvIFNldG9yaWFsPC9oMz48c3BhbiBjbGFzcz0iY291bnQiPiR7Zi5sYXdzLmxlbmd0aH08L3NwYW4+PC9kaXY+YDsKICBjb25zdCBsYXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgbGF3TGlzdC5jbGFzc05hbWU9J2xhdy1saXN0JzsKICBpZihmLmxhd3MubGVuZ3RoPT09MCl7CiAgICBsYXdMaXN0LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPSJlbXB0eS1ibG9jayI+TmVu",
"aHVtYSBsZWkgc2V0b3JpYWwgcmVnaXN0cmFkYS4gTGVpcyBjcmlhZGFzIGFxdWkgcmVnZW0gYXV0b21hdGljYW1lbnRlIHRvZG9zIG9zIG11bmRvcyBkZXN0YSBmYWPDp8Ojby48L2Rpdj5gOwogIH0gZWxzZSB7CiAgICBmLmxhd3MuZm9yRWFjaChsPT4gbGF3TGlzdC5hcHBlbmRDaGlsZChyZW5kZXJMYXdDYXJkKGwsIHtyZW1vdmFibGU6dHJ1ZSwgc291cmNlTGFiZWw6J0xlaSBkYSBmYWPDp8OjbycsIG9yaWdpbjonZmFjdGlvbicsIG93bmVySWQ6Zi5pZH0pKSk7CiAgfQogIGxhd1NlYy5hcHBlbmRDaGlsZChsYXdMaXN0KTsK",
"ICB3cmFwLmFwcGVuZENoaWxkKGxhd1NlYyk7CgogIHN0YWdlLmFwcGVuZENoaWxkKHdyYXApOwoKICAvLyBsZWFkZXJzIGNoaXBzCiAgY29uc3QgbHIgPSBsZWFkZXJzU2VjOwogIGYubGVhZGVycy5mb3JFYWNoKChyLGkpPT57CiAgICBjb25zdCBjaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICBjaGlwLmNsYXNzTmFtZT0nY2hpcCc7CiAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpOyBzcGFuLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz0icmFuayI+4pqRPC9zcGFu",
"PiAnICsgZXNjYXBlSHRtbChyKTsKICAgIGNvbnN0IHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7IHguY2xhc3NOYW1lPSd4JzsgeC50ZXh0Q29udGVudD0n4pyVJzsKICAgIHguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+eyBmLmxlYWRlcnMuc3BsaWNlKGksMSk7IHBlcnNpc3RBdXRvc2F2ZSgpOyByZW5kZXIoKTsgfSk7CiAgICBjaGlwLmFwcGVuZENoaWxkKHNwYW4pOyBjaGlwLmFwcGVuZENoaWxkKHgpOwogICAgbHIuYXBwZW5kQ2hpbGQoY2hpcCk7CiAgfSk7CiAgaWYoZi5sZWFkZXJzLmxlbmd0",
"aDw0KXsKICAgIGNvbnN0IGFkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogICAgYWRkLmNsYXNzTmFtZT0nY2hpcC1hZGQnOwogICAgYWRkLnRleHRDb250ZW50ID0gJysgbm9tZWFyIGNvbWFuZGFudGUgKCcgKyBmLmxlYWRlcnMubGVuZ3RoICsgJy80KSc7CiAgICBhZGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+ewogICAgICBwcm9tcHRNb2RhbCh7dGl0bGU6J05vdm8gQ29tYW5kYW50ZScsIGxhYmVsOidOb21lIGRvIGzDrWRlciBkYSBmYWPDp8OjbycsIHBsYWNlaG9sZGVyOidFeDogR3JhbmQg",
"TW9mZiBUYXJraW4nLCBjb25maXJtTGFiZWw6J05vbWVhcid9LCAobmFtZSk9PnsKICAgICAgICBmLmxlYWRlcnMucHVzaChuYW1lKTsgcGVyc2lzdEF1dG9zYXZlKCk7IHJlbmRlcigpOwogICAgICB9KTsKICAgIH0pOwogICAgbHIuYXBwZW5kQ2hpbGQoYWRkKTsKICB9CgogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5BZGRMYXdGYWN0aW9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IG9wZW5MYXdNb2RhbCh7bW9kZTonZmFjdGlvbicsIGZhY3Rpb25JZDpmLmlkfSkpOwogIGRvY3VtZW50LmdldEVsZW1l",
"bnRCeUlkKCdidG5Bc3NpZ25QbGFuZXRzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IG9wZW5Bc3NpZ25QbGFuZXRzTW9kYWwoZi5pZCkpOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5SZW5hbWVGYWN0aW9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+ewogICAgcHJvbXB0TW9kYWwoe3RpdGxlOidSZW5vbWVhciBGYWPDp8OjbycsIGxhYmVsOidOb3ZvIG5vbWUnLCBkZWZhdWx0VmFsdWU6Zi5uYW1lLCBjb25maXJtTGFiZWw6J1NhbHZhcid9LCAobmFtZSk9PnsKICAgICAgZi5uYW1lID0g",
"bmFtZTsgcGVyc2lzdEF1dG9zYXZlKCk7IHJlbmRlcigpOwogICAgfSk7CiAgfSk7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bkRlbGV0ZUZhY3Rpb24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57CiAgICBjb25maXJtTW9kYWwoe3RpdGxlOidEaXNzb2x2ZXIgRmFjw6fDo28nLCBtZXNzYWdlOmBEaXNzb2x2ZXIgIiR7Zi5uYW1lfSI/IE9zIHBsYW5ldGFzIGZpY2Fyw6NvIHNlbSBmYWPDp8OjbyAobsOjbyBzZXLDo28gYXBhZ2Fkb3MpLmAsIGNvbmZpcm1MYWJlbDonRGlzc29sdmVyJ30sICgpPT57CiAg",
"ICAgIHN0YXRlLnBsYW5ldHMuZm9yRWFjaChwPT57IGlmKHAuZmFjdGlvbklkPT09Zi5pZCkgcC5mYWN0aW9uSWQ9bnVsbDsgfSk7CiAgICAgIHN0YXRlLmZhY3Rpb25zID0gc3RhdGUuZmFjdGlvbnMuZmlsdGVyKHg9PnguaWQhPT1mLmlkKTsKICAgICAgc2V0Vmlldyh7c2NyZWVuOidob21lJ30pOwogICAgfSk7CiAgfSk7Cn0KCi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICBSRU5ERVI6IFBMQU5FVAo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09",
"PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KZnVuY3Rpb24gcmVuZGVyUGxhbmV0U2NyZWVuKHBsYW5ldElkKXsKICBjb25zdCBwbGFuZXQgPSBnZXRQbGFuZXQocGxhbmV0SWQpOwogIGlmKCFwbGFuZXQpeyBzZXRWaWV3KHtzY3JlZW46J2hvbWUnfSk7IHJldHVybjsgfQogIGlmKCFwbGFuZXQubmV3cykgcGxhbmV0Lm5ld3MgPSBbXTsKICBjb25zdCBmYWN0aW9uID0gcGxhbmV0LmZhY3Rpb25JZCA/IGdldEZhY3Rpb24ocGxhbmV0LmZhY3Rpb25JZCkgOiBudWxsOwogIGNvbnN0IHtyZXN1bHQsIHRvdGFsc30gPSBl",
"ZmZlY3RpdmVSZXNvdXJjZXMocGxhbmV0KTsKICBjb25zdCBjc3R5bGUgPSBmYWN0aW9uID8gZmFjdGlvbkNvbG9yU3R5bGUoZmFjdGlvbikgOiAnLS1jY2xyOiNkYmVlZmY7IC0tY2Nsci1nbG93OnJnYmEoMjE5LDIzOCwyNTUsMC40KTsnOwogIGNvbnN0IHRhYiA9IHN0YXRlLnZpZXcucGxhbmV0VGFiIHx8ICdvdmVydmlldyc7CgogIGNvbnN0IHN0YWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YWdlJyk7CiAgc3RhZ2UuaW5uZXJIVE1MID0gJyc7CiAgY29uc3Qgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQo",
"J2RpdicpOwogIHdyYXAuc2V0QXR0cmlidXRlKCdzdHlsZScsIGNzdHlsZSk7CgogIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICBoZWFkLmNsYXNzTmFtZT0nc3RhZ2UtdGl0bGUtcm93JzsKICBoZWFkLmlubmVySFRNTCA9IGAKICAgIDxkaXY+CiAgICAgIDxkaXYgY2xhc3M9InN0YWdlLWV5ZWJyb3ciIHN0eWxlPSJjb2xvcjp2YXIoLS1jY2xyKSI+JHtmYWN0aW9uPyBlc2NhcGVIdG1sKGZhY3Rpb24ubmFtZSkgOiAnTXVuZG8gaW5kZXBlbmRlbnRlJ308L2Rpdj4KICAgICAgPGgyIGNsYXNz",
"PSJzdGFnZS10aXRsZSIgc3R5bGU9InRleHQtc2hhZG93OjAgMCAxNnB4IHZhcigtLWNjbHItZ2xvdykiPiR7ZXNjYXBlSHRtbChwbGFuZXQubmFtZSl9PC9oMj4KICAgICAgPGRpdiBjbGFzcz0ic3RhZ2Utc3ViIj4ke3BsYW5ldC5sYXdzLmxlbmd0aH0gbGVpKHMpIGxvY2FsKGlzKSR7ZmFjdGlvbj8gJyDCtyAnK2ZhY3Rpb24ubGF3cy5sZW5ndGgrJyBsZWkocykgZGEgZmFjw6fDo28gYXBsaWNhZGEocyknIDogJyd9IMK3IEFwcm92YcOnw6NvIHBvcHVsYXI6IDxiIHN0eWxlPSJjb2xvcjoke2hhcHB5Q29sb3IoYXBwcm92YWxJ",
"bmRleChyZXN1bHQpKX0iPiR7YXBwcm92YWxJbmRleChyZXN1bHQpfSU8L2I+PC9kaXY+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InN0YWdlLWFjdGlvbnMiPgogICAgICA8YnV0dG9uIGNsYXNzPSJoYnRuIHByaW1hcnkiIGlkPSJidG5BZGRMYXdQbGFuZXQiIHR5cGU9ImJ1dHRvbiI+KyBOb3ZhIExlaSBMb2NhbDwvYnV0dG9uPgogICAgICA8YnV0dG9uIGNsYXNzPSJoYnRuIiBpZD0iYnRuQXNzaWduRmFjdGlvbiIgdHlwZT0iYnV0dG9uIj4ke2ZhY3Rpb24gPyAnVHJvY2FyIEZhY8Onw6NvJyA6ICdBdHJpYnVpciBhIEZh",
"Y8Onw6NvJ308L2J1dHRvbj4KICAgICAgJHtmYWN0aW9uID8gJzxidXR0b24gY2xhc3M9ImhidG4iIGlkPSJidG5VbmFzc2lnbkZhY3Rpb24iIHR5cGU9ImJ1dHRvbiI+RGVzdmluY3VsYXI8L2J1dHRvbj4nIDogJyd9CiAgICAgIDxidXR0b24gY2xhc3M9ImhidG4gZGFuZ2VyIiBpZD0iYnRuRGVsZXRlUGxhbmV0IiB0eXBlPSJidXR0b24iPlJlbW92ZXI8L2J1dHRvbj4KICAgIDwvZGl2PgogIGA7CiAgd3JhcC5hcHBlbmRDaGlsZChoZWFkKTsKCiAgLy8gdGFicwogIGNvbnN0IHRhYnNSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVt",
"ZW50KCdkaXYnKTsKICB0YWJzUm93LmNsYXNzTmFtZT0ncHJlc2V0LWdyaWQnOwogIHRhYnNSb3cuc3R5bGUubWFyZ2luID0gJzRweCAwIDI2cHgnOwogIGNvbnN0IFRBQlMgPSBbWydvdmVydmlldycsJ+KXiCBWaXPDo28gR2VyYWwnXSwgWyduZXdzJywn8J+TsCBKb3JuYWwnXSwgWydmZWVkYmFjaycsJ/CfkqwgU2VudGltZW50byBQb3B1bGFyJ11dOwogIFRBQlMuZm9yRWFjaCgoW2tleSxsYWJlbF0pPT57CiAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICB0LmNsYXNzTmFtZT0naGJ0biBz",
"bWFsbCcgKyAodGFiPT09a2V5ID8gJyBwcmltYXJ5JyA6ICcnKTsKICAgIHQuc3R5bGUuY3Vyc29yPSdwb2ludGVyJzsKICAgIHQudGV4dENvbnRlbnQgPSBsYWJlbDsKICAgIHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+eyBzdGF0ZS52aWV3LnBsYW5ldFRhYiA9IGtleTsgcGVyc2lzdEF1dG9zYXZlKCk7IHJlbmRlcigpOyB9KTsKICAgIHRhYnNSb3cuYXBwZW5kQ2hpbGQodCk7CiAgfSk7CiAgd3JhcC5hcHBlbmRDaGlsZCh0YWJzUm93KTsKCiAgY29uc3QgYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Rp",
"dicpOwogIHdyYXAuYXBwZW5kQ2hpbGQoYm9keSk7CiAgc3RhZ2UuYXBwZW5kQ2hpbGQod3JhcCk7CgogIGlmKHRhYj09PSduZXdzJykgcmVuZGVyUGxhbmV0TmV3c1RhYihib2R5LCBwbGFuZXQpOwogIGVsc2UgaWYodGFiPT09J2ZlZWRiYWNrJykgcmVuZGVyUGxhbmV0RmVlZGJhY2tUYWIoYm9keSwgcGxhbmV0LCByZXN1bHQpOwogIGVsc2UgcmVuZGVyUGxhbmV0T3ZlcnZpZXdUYWIoYm9keSwgcGxhbmV0LCBmYWN0aW9uLCByZXN1bHQsIHRvdGFscyk7CgogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5BZGRMYXdQbGFu",
"ZXQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gb3Blbkxhd01vZGFsKHttb2RlOidwbGFuZXQnLCBwbGFuZXRJZDpwbGFuZXQuaWR9KSk7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bkFzc2lnbkZhY3Rpb24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gb3BlbkFzc2lnbkZhY3Rpb25Nb2RhbChwbGFuZXQuaWQpKTsKICBjb25zdCB1bkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5VbmFzc2lnbkZhY3Rpb24nKTsKICBpZih1bkJ0bikgdW5CdG4uYWRkRXZlbnRMaXN0ZW5lcign",
"Y2xpY2snLCAoKT0+ewogICAgcGxhbmV0LmZhY3Rpb25JZCA9IG51bGw7IHB1c2hTaW1wbGVOZXdzKHBsYW5ldCwgYCR7cGxhbmV0Lm5hbWV9IHJvbXBlIGxhw6dvcyBjb20gc3VhIGFudGlnYSBmYWPDp8Ojb2AsICdPIG11bmRvIGRlY2xhcmEtc2UgaW5kZXBlbmRlbnRlLCBlbmNlcnJhbmRvIGEgYXBsaWNhw6fDo28gZGUgbGVpcyBzZXRvcmlhaXMgZXh0ZXJuYXMuJywgJ25ldXRyYWwnKTsKICAgIHBlcnNpc3RBdXRvc2F2ZSgpOyByZW5kZXIoKTsgdG9hc3QoJ011bmRvIGRlc3ZpbmN1bGFkbyBkYSBmYWPDp8Ojby4nKTsKICB9",
"KTsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuRGVsZXRlUGxhbmV0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+ewogICAgY29uZmlybU1vZGFsKHt0aXRsZTonUmVtb3ZlciBNdW5kbycsIG1lc3NhZ2U6YFJlbW92ZXIgIiR7cGxhbmV0Lm5hbWV9IiBwZXJtYW5lbnRlbWVudGU/IEVzdGEgYcOnw6NvIG7Do28gcG9kZSBzZXIgZGVzZmVpdGEuYCwgY29uZmlybUxhYmVsOidSZW1vdmVyJ30sICgpPT57CiAgICAgIHN0YXRlLnBsYW5ldHMgPSBzdGF0ZS5wbGFuZXRzLmZpbHRlcihwPT5wLmlkIT09cGxhbmV0",
"LmlkKTsKICAgICAgaWYoZmFjdGlvbikgc2V0Vmlldyh7c2NyZWVuOidmYWN0aW9uJywgZmFjdGlvbklkOmZhY3Rpb24uaWR9KTsgZWxzZSBzZXRWaWV3KHtzY3JlZW46J2hvbWUnfSk7CiAgICB9KTsKICB9KTsKfQoKZnVuY3Rpb24gcmVuZGVyUGxhbmV0T3ZlcnZpZXdUYWIoYm9keSwgcGxhbmV0LCBmYWN0aW9uLCByZXN1bHQsIHRvdGFscyl7CiAgY29uc3QgcnVsZXJzU2VjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgcnVsZXJzU2VjLmNsYXNzTmFtZT0nY2hpcC1yb3cnOwogIHJ1bGVyc1NlYy5pbm5lckhU",
"TUwgPSBgPGRpdiBjbGFzcz0icm93LWNhcHRpb24iPkdvdmVybmFkb3JlcyAoYXTDqSA0KTwvZGl2PmA7CiAgYm9keS5hcHBlbmRDaGlsZChydWxlcnNTZWMpOwoKICBjb25zdCByZXNTZWMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICByZXNTZWMuY2xhc3NOYW1lPSdyZXNvdXJjZXMnOwogIGJvZHkuYXBwZW5kQ2hpbGQocmVzU2VjKTsKCiAgY29uc3QgZmFjdExhd1NlYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIGZhY3RMYXdTZWMuY2xhc3NOYW1lPSdzZWN0aW9uJzsKICBmYWN0TGF3U2Vj",
"LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPSJzZWN0aW9uLWhlYWQiPjxoMz5MZWlzIGRhIEZhY8Onw6NvIChoZXJkYWRhcyk8L2gzPjxzcGFuIGNsYXNzPSJjb3VudCI+JHtmYWN0aW9uPyBmYWN0aW9uLmxhd3MubGVuZ3RoIDogMH08L3NwYW4+PC9kaXY+YDsKICBjb25zdCBmYWN0TGF3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyBmYWN0TGF3TGlzdC5jbGFzc05hbWU9J2xhdy1saXN0JzsKICBib2R5LmFwcGVuZENoaWxkKGZhY3RMYXdTZWMpOyBmYWN0TGF3U2VjLmFwcGVuZENoaWxkKGZhY3RMYXdMaXN0",
"KTsKCiAgY29uc3QgbG9jYWxMYXdTZWMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICBsb2NhbExhd1NlYy5jbGFzc05hbWU9J3NlY3Rpb24nOwogIGxvY2FsTGF3U2VjLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPSJzZWN0aW9uLWhlYWQiPjxoMz5MZWlzIExvY2FpczwvaDM+PHNwYW4gY2xhc3M9ImNvdW50Ij4ke3BsYW5ldC5sYXdzLmxlbmd0aH08L3NwYW4+PC9kaXY+YDsKICBjb25zdCBsb2NhbExhd0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgbG9jYWxMYXdMaXN0LmNsYXNzTmFtZT0n",
"bGF3LWxpc3QnOwogIGJvZHkuYXBwZW5kQ2hpbGQobG9jYWxMYXdTZWMpOyBsb2NhbExhd1NlYy5hcHBlbmRDaGlsZChsb2NhbExhd0xpc3QpOwoKICAvLyBydWxlcnMKICBwbGFuZXQucnVsZXJzLmZvckVhY2goKHIsaSk9PnsKICAgIGNvbnN0IGNoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICAgIGNoaXAuY2xhc3NOYW1lPSdjaGlwJzsKICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7IHNwYW4uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPSJyYW5rIj7wn5GRPC9zcGFu",
"PiAnICsgZXNjYXBlSHRtbChyKTsKICAgIGNvbnN0IHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7IHguY2xhc3NOYW1lPSd4JzsgeC50ZXh0Q29udGVudD0n4pyVJzsKICAgIHguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+eyBwbGFuZXQucnVsZXJzLnNwbGljZShpLDEpOyBwZXJzaXN0QXV0b3NhdmUoKTsgcmVuZGVyKCk7IH0pOwogICAgY2hpcC5hcHBlbmRDaGlsZChzcGFuKTsgY2hpcC5hcHBlbmRDaGlsZCh4KTsKICAgIHJ1bGVyc1NlYy5hcHBlbmRDaGlsZChjaGlwKTsKICB9KTsKICBpZihwbGFu",
"ZXQucnVsZXJzLmxlbmd0aDw0KXsKICAgIGNvbnN0IGFkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogICAgYWRkLmNsYXNzTmFtZT0nY2hpcC1hZGQnOwogICAgYWRkLnRleHRDb250ZW50ID0gJysgbm9tZWFyIGdvdmVybmFkb3IgKCcgKyBwbGFuZXQucnVsZXJzLmxlbmd0aCArICcvNCknOwogICAgYWRkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PnsKICAgICAgcHJvbXB0TW9kYWwoe3RpdGxlOidOb3ZvIEdvdmVybmFkb3InLCBsYWJlbDonTm9tZSBkbyBnb3Zlcm5hZG9yJywgcGxhY2Vob2xkZXI6",
"J0V4OiBHb3Zlcm5hZG9yIFJlaXMgVmFudGVsJywgY29uZmlybUxhYmVsOidOb21lYXInfSwgKG5hbWUpPT57CiAgICAgICAgcGxhbmV0LnJ1bGVycy5wdXNoKG5hbWUpOyBwZXJzaXN0QXV0b3NhdmUoKTsgcmVuZGVyKCk7CiAgICAgIH0pOwogICAgfSk7CiAgICBydWxlcnNTZWMuYXBwZW5kQ2hpbGQoYWRkKTsKICB9CgogIC8vIHJlc291cmNlcwogIFJFU19NRVRBLmZvckVhY2goKFtrZXksbGFiZWwsY29sb3JdKT0+ewogICAgY29uc3QgdmFsID0gcmVzdWx0W2tleV07CiAgICBjb25zdCBkZWx0YSA9IHRvdGFsc1trZXldIHx8",
"IDA7CiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICBjYXJkLmNsYXNzTmFtZT0ncmVzLWNhcmQnOwogICAgY2FyZC5pbm5lckhUTUwgPSBgCiAgICAgIDxkaXYgY2xhc3M9InJlcy10b3AiPjxzcGFuIGNsYXNzPSJyZXMtbGFiZWwiPiR7bGFiZWx9PC9zcGFuPjxzcGFuIGNsYXNzPSJyZXMtdmFsIiBzdHlsZT0iY29sb3I6JHtjb2xvcn0iPiR7dmFsfTwvc3Bhbj48L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0icmVzLWJhciI+PGkgc3R5bGU9IndpZHRoOiR7dmFsfSU7IGJhY2tncm91bmQ6",
"JHtjb2xvcn07IGNvbG9yOiR7Y29sb3J9OyI+PC9pPjwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJyZXMtZGVsdGEgJHtkZWx0YT4wPyd1cCc6ZGVsdGE8MD8nZG93bic6Jyd9Ij4ke2RlbHRhPT09MD8nJzooZGVsdGE+MD8n4payICsnOifilrwgJykrZGVsdGErJyBwb3IgbGVpcyBhdGl2YXMnfTwvZGl2PgogICAgYDsKICAgIHJlc1NlYy5hcHBlbmRDaGlsZChjYXJkKTsKICB9KTsKCiAgaWYoIWZhY3Rpb24pewogICAgZmFjdExhd0xpc3QuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9ImVtcHR5LWJsb2NrIj5Fc3RlIG11bmRvIG7D",
"o28gcGVydGVuY2UgYSBuZW5odW1hIGZhY8Onw6NvIOKAlCBuw6NvIHJlY2ViZSBsZWdpc2xhw6fDo28gc2V0b3JpYWwuPC9kaXY+YDsKICB9IGVsc2UgaWYoZmFjdGlvbi5sYXdzLmxlbmd0aD09PTApewogICAgZmFjdExhd0xpc3QuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9ImVtcHR5LWJsb2NrIj5BIGZhY8Onw6NvICR7ZXNjYXBlSHRtbChmYWN0aW9uLm5hbWUpfSBhaW5kYSBuw6NvIHBvc3N1aSBsZWlzLjwvZGl2PmA7CiAgfSBlbHNlIHsKICAgIGZhY3Rpb24ubGF3cy5mb3JFYWNoKGw9PiBmYWN0TGF3TGlzdC5hcHBlbmRD",
"aGlsZChyZW5kZXJMYXdDYXJkKGwsIHtyZW1vdmFibGU6ZmFsc2UsIHNvdXJjZUxhYmVsOidMZWkgZGEgZmFjw6fDo28nLCBvcmlnaW46J2ZhY3Rpb24nfSkpKTsKICB9CgogIGlmKHBsYW5ldC5sYXdzLmxlbmd0aD09PTApewogICAgbG9jYWxMYXdMaXN0LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPSJlbXB0eS1ibG9jayI+TmVuaHVtYSBsZWkgbG9jYWwuIExlaXMgbG9jYWlzIGFmZXRhbSBhcGVuYXMgZXN0ZSBtdW5kby48L2Rpdj5gOwogIH0gZWxzZSB7CiAgICBwbGFuZXQubGF3cy5mb3JFYWNoKGw9PiBsb2NhbExhd0xpc3Qu",
"YXBwZW5kQ2hpbGQocmVuZGVyTGF3Q2FyZChsLCB7cmVtb3ZhYmxlOnRydWUsIHNvdXJjZUxhYmVsOidMZWkgbG9jYWwnLCBvcmlnaW46J3BsYW5ldCcsIG93bmVySWQ6cGxhbmV0LmlkfSkpKTsKICB9Cn0KCmZ1bmN0aW9uIHJlbmRlclBsYW5ldE5ld3NUYWIoYm9keSwgcGxhbmV0KXsKICBjb25zdCBzZWMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICBzZWMuY2xhc3NOYW1lPSdzZWN0aW9uJzsKICBzZWMuc3R5bGUubWFyZ2luVG9wPScwJzsKICBzZWMuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9InNlY3Rpb24t",
"aGVhZCI+PGgzPkpvcm5hbCBkZSAke2VzY2FwZUh0bWwocGxhbmV0Lm5hbWUpfTwvaDM+PHNwYW4gY2xhc3M9ImNvdW50Ij4ke3BsYW5ldC5uZXdzLmxlbmd0aH0gZWRpw6fDo28ow7Vlcyk8L3NwYW4+PC9kaXY+YDsKICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgbGlzdC5jbGFzc05hbWU9J2xhdy1saXN0JzsKICBpZihwbGFuZXQubmV3cy5sZW5ndGg9PT0wKXsKICAgIGxpc3QuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9ImVtcHR5LWJsb2NrIj5OZW5odW1hIGVkacOnw6NvIHB1YmxpY2Fk",
"YSBhaW5kYS4gVG9kYSBub3ZhIGxlaSBwcm9tdWxnYWRhIGdlcmEgdW1hIG1hdMOpcmlhIGF1dG9tYXRpY2FtZW50ZS48L2Rpdj5gOwogIH0gZWxzZSB7CiAgICBwbGFuZXQubmV3cy5mb3JFYWNoKG49PnsKICAgICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogICAgICBjYXJkLmNsYXNzTmFtZSA9ICdsYXctY2FyZCc7CiAgICAgIGNvbnN0IHRvbmVDb2xvciA9IG4udG9uZT09PSdwb3NpdGl2ZScgPyAndmFyKC0tZ3JlZW4pJyA6IG4udG9uZT09PSduZWdhdGl2ZScgPyAndmFyKC0tcmVkKScg",
"OiAndmFyKC0tYW1iZXIpJzsKICAgICAgY2FyZC5zdHlsZS5ib3JkZXJMZWZ0Q29sb3IgPSB0b25lQ29sb3I7CiAgICAgIGNhcmQuaW5uZXJIVE1MID0gYAogICAgICAgIDxkaXYgY2xhc3M9Imxhdy10b3AiPgogICAgICAgICAgPGg0IGNsYXNzPSJsYXctbmFtZSI+JHtlc2NhcGVIdG1sKG4uaGVhZGxpbmUpfTwvaDQ+CiAgICAgICAgICA8c3BhbiBjbGFzcz0ibGF3LXRhZyIgc3R5bGU9ImNvbG9yOiR7dG9uZUNvbG9yfTsgYm9yZGVyLWNvbG9yOiR7dG9uZUNvbG9yfSI+JHtuLnRvbmU9PT0ncG9zaXRpdmUnPydSZXBlcmN1c3PD",
"o28gcG9zaXRpdmEnOm4udG9uZT09PSduZWdhdGl2ZSc/J1JlcGVyY3Vzc8OjbyBuZWdhdGl2YSc6J1JlcGVyY3Vzc8OjbyBuZXV0cmEnfTwvc3Bhbj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJsYXctdGV4dCI+JHtlc2NhcGVIdG1sKG4uYm9keSl9PC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ibGF3LWZvb3QiPjxzcGFuIGNsYXNzPSJsYXctb3JpZ2luLWxhYmVsIj4ke2ZtdERhdGUobi5kYXRlKX0ke24ubGF3TmFtZT8gJyDCtyByZWZlcmVudGUgYTogJytlc2NhcGVIdG1sKG4ubGF3TmFtZSkgOiAnJ308",
"L3NwYW4+PC9kaXY+CiAgICAgIGA7CiAgICAgIGxpc3QuYXBwZW5kQ2hpbGQoY2FyZCk7CiAgICB9KTsKICB9CiAgc2VjLmFwcGVuZENoaWxkKGxpc3QpOwogIGJvZHkuYXBwZW5kQ2hpbGQoc2VjKTsKfQoKZnVuY3Rpb24gcmVuZGVyUGxhbmV0RmVlZGJhY2tUYWIoYm9keSwgcGxhbmV0LCByZXN1bHQpewogIGNvbnN0IGFwcHJvdmFsID0gYXBwcm92YWxJbmRleChyZXN1bHQpOwogIGNvbnN0IGdhdWdlU2VjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgZ2F1Z2VTZWMuY2xhc3NOYW1lPSdzZWN0aW9uJzsKICBn",
"YXVnZVNlYy5zdHlsZS5tYXJnaW5Ub3A9JzAnOwogIGdhdWdlU2VjLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPSJzZWN0aW9uLWhlYWQiPjxoMz7DjW5kaWNlIGRlIEFwcm92YcOnw6NvIFBvcHVsYXI8L2gzPjwvZGl2PmA7CiAgY29uc3QgZ2F1Z2VDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgZ2F1Z2VDYXJkLmNsYXNzTmFtZT0ncmVzLWNhcmQnOwogIGdhdWdlQ2FyZC5pbm5lckhUTUwgPSBgCiAgICA8ZGl2IGNsYXNzPSJyZXMtdG9wIj48c3BhbiBjbGFzcz0icmVzLWxhYmVsIj5BcHJvdmHDp8OjbyBn",
"ZXJhbCBkbyBnb3Zlcm5vPC9zcGFuPjxzcGFuIGNsYXNzPSJyZXMtdmFsIiBzdHlsZT0iY29sb3I6JHtoYXBweUNvbG9yKGFwcHJvdmFsKX0iPiR7YXBwcm92YWx9JTwvc3Bhbj48L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJlcy1iYXIiIHN0eWxlPSJoZWlnaHQ6MTBweDsiPjxpIHN0eWxlPSJ3aWR0aDoke2FwcHJvdmFsfSU7IGJhY2tncm91bmQ6JHtoYXBweUNvbG9yKGFwcHJvdmFsKX07IGNvbG9yOiR7aGFwcHlDb2xvcihhcHByb3ZhbCl9OyI+PC9pPjwvZGl2PgogICAgPGRpdiBjbGFzcz0icmVzLWRlbHRhIiBzdHlsZT0ibWFy",
"Z2luLXRvcDo5cHg7IGNvbG9yOnZhcigtLWluay1kaW0pOyBmb250LXNpemU6MTFweDsiPkNhbGN1bGFkbyBhIHBhcnRpciBkZSBGZWxpY2lkYWRlLCBMaWJlcmRhZGUsIEVzdGFiaWxpZGFkZSBlIGF1c8OqbmNpYSBkZSBDb3JydXDDp8Ojby48L2Rpdj4KICBgOwogIGdhdWdlU2VjLmFwcGVuZENoaWxkKGdhdWdlQ2FyZCk7CiAgYm9keS5hcHBlbmRDaGlsZChnYXVnZVNlYyk7CgogIGNvbnN0IHF1b3Rlc1NlYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIHF1b3Rlc1NlYy5jbGFzc05hbWU9J3NlY3Rpb24nOwog",
"IHF1b3Rlc1NlYy5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz0ic2VjdGlvbi1oZWFkIj48aDM+TyBRdWUgbyBQb3ZvIEVzdMOhIERpemVuZG88L2gzPjwvZGl2PmA7CiAgY29uc3QgcXVvdGVzR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIHF1b3Rlc0dyaWQuY2xhc3NOYW1lPSdiZWFjb24tZ3JpZCc7CiAgcXVvdGVzR3JpZC5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gJ3JlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgyNjBweCwgMWZyKSknOwogIGNvbnN0IHF1b3RlcyA9IGJ1aWxkRmVlZGJhY2tRdW90",
"ZXMocmVzdWx0KTsKICBxdW90ZXMuZm9yRWFjaChxPT57CiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICBjYXJkLmNsYXNzTmFtZT0nbGF3LWNhcmQnOwogICAgY2FyZC5zdHlsZS5jdXJzb3I9J2RlZmF1bHQnOwogICAgY2FyZC5pbm5lckhUTUwgPSBgCiAgICAgIDxkaXYgY2xhc3M9Imxhdy10b3AiPjxoNCBjbGFzcz0ibGF3LW5hbWUiIHN0eWxlPSJmb250LXNpemU6MTNweDsgY29sb3I6dmFyKC0taW5rLWRpbSk7IGZvbnQtc3R5bGU6aXRhbGljOyI+JHtlc2NhcGVIdG1sKHEucm9s",
"ZSl9PC9oND48L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0ibGF3LXRleHQiIHN0eWxlPSJmb250LXNpemU6MTNweDsgY29sb3I6dmFyKC0taW5rKTsgbWFyZ2luLXRvcDo0cHg7Ij4iJHtlc2NhcGVIdG1sKHEudGV4dCl9IjwvZGl2PgogICAgYDsKICAgIHF1b3Rlc0dyaWQuYXBwZW5kQ2hpbGQoY2FyZCk7CiAgfSk7CiAgcXVvdGVzU2VjLmFwcGVuZENoaWxkKHF1b3Rlc0dyaWQpOwogIGJvZHkuYXBwZW5kQ2hpbGQocXVvdGVzU2VjKTsKCiAgY29uc3QgcmVjZW50U2VjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAg",
"cmVjZW50U2VjLmNsYXNzTmFtZT0nc2VjdGlvbic7CiAgcmVjZW50U2VjLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPSJzZWN0aW9uLWhlYWQiPjxoMz5SZWHDp8O1ZXMgw6BzIMOabHRpbWFzIExlaXM8L2gzPjwvZGl2PmA7CiAgY29uc3QgcmVjZW50TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIHJlY2VudExpc3QuY2xhc3NOYW1lPSdsYXctbGlzdCc7CiAgY29uc3QgcmVjZW50ID0gcGxhbmV0Lm5ld3MuZmlsdGVyKG49Pm4ubGF3TmFtZSkuc2xpY2UoMCw0KTsKICBpZihyZWNlbnQubGVuZ3RoPT09MCl7",
"CiAgICByZWNlbnRMaXN0LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPSJlbXB0eS1ibG9jayI+TmVuaHVtYSBsZWkgcmVjZW50ZSBwYXJhIHJlYWdpci4gUHJvbXVsZ3VlIHVtYSBsZWkgcGFyYSB2ZXIgYSByZWHDp8OjbyBwb3B1bGFyIGFxdWkuPC9kaXY+YDsKICB9IGVsc2UgewogICAgcmVjZW50LmZvckVhY2gobj0+ewogICAgICBjb25zdCB0b25lQ29sb3IgPSBuLnRvbmU9PT0ncG9zaXRpdmUnID8gJ3ZhcigtLWdyZWVuKScgOiBuLnRvbmU9PT0nbmVnYXRpdmUnID8gJ3ZhcigtLXJlZCknIDogJ3ZhcigtLWFtYmVyKSc7CiAg",
"ICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogICAgICByb3cuY2xhc3NOYW1lPSdsYXctY2FyZCc7CiAgICAgIHJvdy5zdHlsZS5ib3JkZXJMZWZ0Q29sb3IgPSB0b25lQ29sb3I7CiAgICAgIHJvdy5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz0ibGF3LXRleHQiIHN0eWxlPSJtYXJnaW46MDsgZm9udC1zaXplOjEyLjVweDsiPjxiIHN0eWxlPSJjb2xvcjp2YXIoLS1pbmspIj4ke2VzY2FwZUh0bWwobi5sYXdOYW1lKX06PC9iPiAke2VzY2FwZUh0bWwobi5oZWFkbGluZSl9PC9kaXY+YDsKICAg",
"ICAgcmVjZW50TGlzdC5hcHBlbmRDaGlsZChyb3cpOwogICAgfSk7CiAgfQogIHJlY2VudFNlYy5hcHBlbmRDaGlsZChyZWNlbnRMaXN0KTsKICBib2R5LmFwcGVuZENoaWxkKHJlY2VudFNlYyk7Cn0KCmZ1bmN0aW9uIHJlbmRlckxhd0NhcmQobGF3LCB7cmVtb3ZhYmxlLCBzb3VyY2VMYWJlbCwgb3JpZ2luLCBvd25lcklkfSl7CiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgZGl2LmNsYXNzTmFtZSA9ICdsYXctY2FyZCcgKyAob3JpZ2luPT09J2ZhY3Rpb24nID8gJyBmYWN0aW9uLW9yaWdp",
"bic6JycpOwogIGNvbnN0IGVmZlBpbGxzID0gT2JqZWN0LmVudHJpZXMobGF3LmRlbHRhcykuZmlsdGVyKChbayx2XSk9PnYhPT0wKS5tYXAoKFtrLHZdKT0+ewogICAgY29uc3QgbWV0YSA9IFJFU19NRVRBLmZpbmQocj0+clswXT09PWspOwogICAgY29uc3QgbGFiZWwgPSBtZXRhID8gbWV0YVsxXSA6IGs7CiAgICByZXR1cm4gYDxzcGFuIGNsYXNzPSJlZmYtcGlsbCAke3Y+MD8ncG9zJzonbmVnJ30iPiR7bGFiZWx9ICR7dj4wPycrJzonJ30ke3Z9PC9zcGFuPmA7CiAgfSkuam9pbignJyk7CiAgZGl2LmlubmVySFRNTCA9IGAK",
"ICAgIDxkaXYgY2xhc3M9Imxhdy10b3AiPgogICAgICA8aDQgY2xhc3M9Imxhdy1uYW1lIj4ke2VzY2FwZUh0bWwobGF3Lm5hbWUpfTwvaDQ+CiAgICAgIDxzcGFuIGNsYXNzPSJsYXctdGFnIHNldmVyaXR5LSR7bGF3LnNldmVyaXR5fSI+JHtTRVZFUklUWV9MQUJFTFNbbGF3LnNldmVyaXR5XX08L3NwYW4+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9Imxhdy10ZXh0Ij4ke2VzY2FwZUh0bWwobGF3LnRleHQpfTwvZGl2PgogICAgPGRpdiBjbGFzcz0ibGF3LWVmZmVjdHMiPiR7ZWZmUGlsbHMgfHwgJzxzcGFuIGNsYXNzPSJl",
"ZmYtcGlsbCI+U2VtIGltcGFjdG8gbWVuc3Vyw6F2ZWw8L3NwYW4+J308L2Rpdj4KICAgIDxkaXYgY2xhc3M9Imxhdy1mb290Ij4KICAgICAgPHNwYW4gY2xhc3M9Imxhdy1vcmlnaW4tbGFiZWwiPiR7c291cmNlTGFiZWx9JHtsYXcubWF0Y2hlZCAmJiBsYXcubWF0Y2hlZC5sZW5ndGggPyAnIMK3IHBhZHLDtWVzOiAnK2xhdy5tYXRjaGVkLmpvaW4oJywgJykgOiAnJ308L3NwYW4+CiAgICAgICR7cmVtb3ZhYmxlID8gJzxidXR0b24gY2xhc3M9ImhidG4gc21hbGwgZGFuZ2VyIGJ0blJlbW92ZUxhdyIgdHlwZT0iYnV0dG9uIj5S",
"ZXZvZ2FyPC9idXR0b24+JyA6ICcnfQogICAgPC9kaXY+CiAgYDsKICBpZihyZW1vdmFibGUpewogICAgZGl2LnF1ZXJ5U2VsZWN0b3IoJy5idG5SZW1vdmVMYXcnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57CiAgICAgIGlmKG9yaWdpbj09PSdwbGFuZXQnKXsKICAgICAgICBjb25zdCBwID0gZ2V0UGxhbmV0KG93bmVySWQpOwogICAgICAgIHAubGF3cyA9IHAubGF3cy5maWx0ZXIobD0+bC5pZCE9PWxhdy5pZCk7CiAgICAgIH0gZWxzZSB7CiAgICAgICAgY29uc3QgZiA9IGdldEZhY3Rpb24ob3duZXJJZCk7CiAg",
"ICAgICAgaWYoZikgZi5sYXdzID0gZi5sYXdzLmZpbHRlcihsPT5sLmlkIT09bGF3LmlkKTsKICAgICAgfQogICAgICBwZXJzaXN0QXV0b3NhdmUoKTsgcmVuZGVyKCk7CiAgICB9KTsKICB9CiAgcmV0dXJuIGRpdjsKfQoKLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIFJFTkRFUiBHRVJBTAo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KZnVuY3Rpb24gcmVuZGVyKCl7CiAgcmVuZGVyU3Vi",
"bmF2KCk7CiAgY29uc3QgdiA9IHN0YXRlLnZpZXc7CiAgaWYodi5zY3JlZW49PT0nZmFjdGlvbicpIHJlbmRlckZhY3Rpb25TY3JlZW4odi5mYWN0aW9uSWQpOwogIGVsc2UgaWYodi5zY3JlZW49PT0ncGxhbmV0JykgcmVuZGVyUGxhbmV0U2NyZWVuKHYucGxhbmV0SWQpOwogIGVsc2UgcmVuZGVySG9tZSgpOwp9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgTU9EQUlTCj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09",
"PT09PT09PT09PT09PSAqLwpmdW5jdGlvbiBvcGVuTW9kYWwoaHRtbCwgZXh0cmFDbGFzcyl7CiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIG92ZXJsYXkuY2xhc3NOYW1lPSdvdmVybGF5JzsKICBvdmVybGF5LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPSJtb2RhbCR7ZXh0cmFDbGFzcyA/ICcgJytleHRyYUNsYXNzIDogJyd9Ij4ke2h0bWx9PC9kaXY+YDsKICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKT0+eyBpZihlLnRhcmdldD09PW92ZXJsYXkpIG92",
"ZXJsYXkucmVtb3ZlKCk7IH0pOwogIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7CiAgY29uc3QgY2xvc2VYID0gb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcuY2xvc2UteCcpOwogIGlmKGNsb3NlWCkgY2xvc2VYLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiBvdmVybGF5LnJlbW92ZSgpKTsKICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gZXNjSGFuZGxlcihlKXsKICAgIGlmKGUua2V5PT09J0VzY2FwZScpeyBvdmVybGF5LnJlbW92ZSgpOyBkb2N1bWVudC5yZW1v",
"dmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXNjSGFuZGxlcik7IH0KICB9KTsKICByZXR1cm4gb3ZlcmxheTsKfQpmdW5jdGlvbiBwcm9tcHRNb2RhbCh7dGl0bGUsIGxhYmVsLCBwbGFjZWhvbGRlcj0nJywgZGVmYXVsdFZhbHVlPScnLCBjb25maXJtTGFiZWw9J0NvbmZpcm1hcid9LCBvbkNvbmZpcm0pewogIGNvbnN0IG92ZXJsYXkgPSBvcGVuTW9kYWwoYAogICAgPHNwYW4gY2xhc3M9ImNsb3NlLXgiPuKclTwvc3Bhbj4KICAgIDxoMz4ke2VzY2FwZUh0bWwodGl0bGUpfTwvaDM+CiAgICA8ZGl2IGNsYXNzPSJmaWVsZCI+",
"CiAgICAgIDxsYWJlbD4ke2VzY2FwZUh0bWwobGFiZWwpfTwvbGFiZWw+CiAgICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0icG1JbnB1dCIgcGxhY2Vob2xkZXI9IiR7ZXNjYXBlSHRtbChwbGFjZWhvbGRlcil9IiB2YWx1ZT0iJHtlc2NhcGVIdG1sKGRlZmF1bHRWYWx1ZSl9Ij4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0ibW9kYWwtYWN0aW9ucyI+CiAgICAgIDxidXR0b24gY2xhc3M9ImhidG4iIGlkPSJwbUNhbmNlbCIgdHlwZT0iYnV0dG9uIj5DYW5jZWxhcjwvYnV0dG9uPgogICAgICA8YnV0dG9uIGNsYXNzPSJoYnRu",
"IHByaW1hcnkiIGlkPSJwbU9rIiB0eXBlPSJidXR0b24iPiR7ZXNjYXBlSHRtbChjb25maXJtTGFiZWwpfTwvYnV0dG9uPgogICAgPC9kaXY+CiAgYCk7CiAgY29uc3QgaW5wdXQgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNwbUlucHV0Jyk7CiAgb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjcG1DYW5jZWwnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4gb3ZlcmxheS5yZW1vdmUoKSk7CiAgZnVuY3Rpb24gY29uZmlybUl0KCl7CiAgICBjb25zdCB2YWwgPSBpbnB1dC52YWx1ZS50cmltKCk7CiAgICBpZighdmFsKXsg",
"dG9hc3QoJ0RpZ2l0ZSB1bSB2YWxvci4nKTsgcmV0dXJuOyB9CiAgICBvdmVybGF5LnJlbW92ZSgpOwogICAgb25Db25maXJtKHZhbCk7CiAgfQogIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI3BtT2snKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpcm1JdCk7CiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKT0+eyBpZihlLmtleT09PSdFbnRlcicpIGNvbmZpcm1JdCgpOyB9KTsKICBpbnB1dC5mb2N1cygpOwp9CmZ1bmN0aW9uIGNvbmZpcm1Nb2RhbCh7dGl0bGUsIG1lc3NhZ2UsIGNvbmZpcm1M",
"YWJlbD0nQ29uZmlybWFyJywgZGFuZ2VyPXRydWV9LCBvbkNvbmZpcm0pewogIGNvbnN0IG92ZXJsYXkgPSBvcGVuTW9kYWwoYAogICAgPHNwYW4gY2xhc3M9ImNsb3NlLXgiPuKclTwvc3Bhbj4KICAgIDxoMz4ke2VzY2FwZUh0bWwodGl0bGUpfTwvaDM+CiAgICA8ZGl2IGNsYXNzPSJtb2RhbC1zdWIiPiR7ZXNjYXBlSHRtbChtZXNzYWdlKX08L2Rpdj4KICAgIDxkaXYgY2xhc3M9Im1vZGFsLWFjdGlvbnMiPgogICAgICA8YnV0dG9uIGNsYXNzPSJoYnRuIiBpZD0iY21DYW5jZWwiIHR5cGU9ImJ1dHRvbiI+Q2FuY2VsYXI8L2J1",
"dHRvbj4KICAgICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biAke2Rhbmdlcj8nZGFuZ2VyJzoncHJpbWFyeSd9IiBpZD0iY21PayIgdHlwZT0iYnV0dG9uIj4ke2VzY2FwZUh0bWwoY29uZmlybUxhYmVsKX08L2J1dHRvbj4KICAgIDwvZGl2PgogIGApOwogIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2NtQ2FuY2VsJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IG92ZXJsYXkucmVtb3ZlKCkpOwogIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2NtT2snKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57IG92ZXJsYXku",
"cmVtb3ZlKCk7IG9uQ29uZmlybSgpOyB9KTsKfQoKZnVuY3Rpb24gb3BlbkZhY3Rpb25Nb2RhbCgpewogIGxldCBjaG9zZW5Db2xvciA9ICdibHVlJzsKICBjb25zdCBvdmVybGF5ID0gb3Blbk1vZGFsKGAKICAgIDxzcGFuIGNsYXNzPSJjbG9zZS14Ij7inJU8L3NwYW4+CiAgICA8aDM+RnVuZGFyIE5vdmEgRmFjw6fDo288L2gzPgogICAgPGRpdiBjbGFzcz0ibW9kYWwtc3ViIj5VbWEgZmFjw6fDo28gYWdydXBhIG11bmRvcyBzb2IgdW1hIGxlZ2lzbGHDp8OjbyBzZXRvcmlhbCBjb211bS48L2Rpdj4KICAgIDxkaXYgY2xhc3M9",
"ImZpZWxkIj4KICAgICAgPGxhYmVsPk5vbWUgZGEgZmFjw6fDo288L2xhYmVsPgogICAgICA8aW5wdXQgdHlwZT0idGV4dCIgaWQ9ImZOYW1lIiBwbGFjZWhvbGRlcj0iRXg6IEltcMOpcmlvIEdhbMOhY3RpY28iPgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmaWVsZCI+CiAgICAgIDxsYWJlbD5Fc3RhbmRhcnRlIChjb3IgZGUgaWRlbnRpZmljYcOnw6NvKTwvbGFiZWw+CiAgICAgIDxkaXYgY2xhc3M9ImNvbG9yLXBpY2siIGlkPSJjb2xvclBpY2siPgogICAgICAgIDxkaXY+PGRpdiBjbGFzcz0iY2RvdCBjLWJsdWUgc2Vs",
"IiBkYXRhLWM9ImJsdWUiPjwvZGl2PjxkaXYgY2xhc3M9ImNsYWJlbCI+T3JkZW0gQXp1bDwvZGl2PjwvZGl2PgogICAgICAgIDxkaXY+PGRpdiBjbGFzcz0iY2RvdCBjLXJlZCIgZGF0YS1jPSJyZWQiPjwvZGl2PjxkaXYgY2xhc3M9ImNsYWJlbCI+RG9tw61uaW8gVmVybWVsaG88L2Rpdj48L2Rpdj4KICAgICAgICA8ZGl2PjxkaXYgY2xhc3M9ImNkb3QgYy1ncmVlbiIgZGF0YS1jPSJncmVlbiI+PC9kaXY+PGRpdiBjbGFzcz0iY2xhYmVsIj5BbGlhbsOnYSBWZXJkZTwvZGl2PjwvZGl2PgogICAgICA8L2Rpdj4KICAgIDwvZGl2",
"PgogICAgPGRpdiBjbGFzcz0iZmllbGQiPgogICAgICA8bGFiZWw+Q29tYW5kYW50ZSBpbmljaWFsIChvcGNpb25hbCk8L2xhYmVsPgogICAgICA8aW5wdXQgdHlwZT0idGV4dCIgaWQ9ImZMZWFkZXIiIHBsYWNlaG9sZGVyPSJFeDogR3JhbmQgTW9mZiBUYXJraW4iPgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJtb2RhbC1hY3Rpb25zIj4KICAgICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biIgaWQ9ImZDYW5jZWwiIHR5cGU9ImJ1dHRvbiI+Q2FuY2VsYXI8L2J1dHRvbj4KICAgICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biBwcmltYXJ5",
"IiBpZD0iZkNyZWF0ZSIgdHlwZT0iYnV0dG9uIj5GdW5kYXIgRmFjw6fDo288L2J1dHRvbj4KICAgIDwvZGl2PgogIGApOwogIG92ZXJsYXkucXVlcnlTZWxlY3RvckFsbCgnI2NvbG9yUGljayAuY2RvdCcpLmZvckVhY2goZG90PT57CiAgICBkb3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+ewogICAgICBvdmVybGF5LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb2xvclBpY2sgLmNkb3QnKS5mb3JFYWNoKGQ9PmQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsJykpOwogICAgICBkb3QuY2xhc3NMaXN0LmFkZCgnc2VsJyk7CiAgICAg",
"IGNob3NlbkNvbG9yID0gZG90LmdldEF0dHJpYnV0ZSgnZGF0YS1jJyk7CiAgICB9KTsKICB9KTsKICBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNmQ2FuY2VsJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IG92ZXJsYXkucmVtb3ZlKCkpOwogIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2ZDcmVhdGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57CiAgICBjb25zdCBuYW1lID0gb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjZk5hbWUnKS52YWx1ZS50cmltKCk7CiAgICBpZighbmFtZSl7IHRvYXN0KCdEw6og",
"dW0gbm9tZSDDoCBmYWPDp8Ojby4nKTsgcmV0dXJuOyB9CiAgICBjb25zdCBsZWFkZXIgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNmTGVhZGVyJykudmFsdWUudHJpbSgpOwogICAgY29uc3QgZiA9IHsgaWQ6IHVpZCgnZmFjJyksIG5hbWUsIGFsbGVnaWFuY2U6IGNob3NlbkNvbG9yLCBsZWFkZXJzOiBsZWFkZXIgPyBbbGVhZGVyXSA6IFtdLCBsYXdzOltdIH07CiAgICBzdGF0ZS5mYWN0aW9ucy5wdXNoKGYpOwogICAgcGVyc2lzdEF1dG9zYXZlKCk7CiAgICBvdmVybGF5LnJlbW92ZSgpOwogICAgc2V0Vmlldyh7c2NyZWVu",
"OidmYWN0aW9uJywgZmFjdGlvbklkOmYuaWR9KTsKICAgIHRvYXN0KCdGYWPDp8OjbyBmdW5kYWRhOiAnK25hbWUpOwogIH0pOwogIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2ZOYW1lJykuZm9jdXMoKTsKfQoKZnVuY3Rpb24gb3BlblBsYW5ldEdsb2JhbE1vZGFsKHByZXNlbGVjdEZhY3Rpb25JZCl7CiAgY29uc3QgZmFjdGlvbk9wdGlvbnMgPSBzdGF0ZS5mYWN0aW9ucy5tYXAoZj0+YDxvcHRpb24gdmFsdWU9IiR7Zi5pZH0iICR7cHJlc2VsZWN0RmFjdGlvbklkPT09Zi5pZD8nc2VsZWN0ZWQnOicnfT4ke2VzY2FwZUh0bWwo",
"Zi5uYW1lKX08L29wdGlvbj5gKS5qb2luKCcnKTsKICBjb25zdCBvdmVybGF5ID0gb3Blbk1vZGFsKGAKICAgIDxzcGFuIGNsYXNzPSJjbG9zZS14Ij7inJU8L3NwYW4+CiAgICA8aDM+UmVnaXN0cmFyIE5vdm8gTXVuZG88L2gzPgogICAgPGRpdiBjbGFzcz0ibW9kYWwtc3ViIj5DcmllIG8gcGxhbmV0YSBlLCBzZSBxdWlzZXIsIGrDoSBvIGF0cmlidWEgYSB1bWEgZmFjw6fDo28gZXhpc3RlbnRlLjwvZGl2PgogICAgPGRpdiBjbGFzcz0iZmllbGQiPgogICAgICA8bGFiZWw+Tm9tZSBkbyBwbGFuZXRhPC9sYWJlbD4KICAgICAg",
"PGlucHV0IHR5cGU9InRleHQiIGlkPSJwTmFtZSIgcGxhY2Vob2xkZXI9IkV4OiBDb3J1c2NhbnQiPgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmaWVsZCI+CiAgICAgIDxsYWJlbD5GYWPDp8OjbyAob3BjaW9uYWwpPC9sYWJlbD4KICAgICAgPHNlbGVjdCBpZD0icEZhY3Rpb24iPgogICAgICAgIDxvcHRpb24gdmFsdWU9IiI+4oCUIE5lbmh1bWEgZmFjw6fDo28g4oCUPC9vcHRpb24+CiAgICAgICAgJHtmYWN0aW9uT3B0aW9uc30KICAgICAgPC9zZWxlY3Q+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImZpZWxkIj4K",
"ICAgICAgPGxhYmVsPkdvdmVybmFkb3IgaW5pY2lhbCAob3BjaW9uYWwpPC9sYWJlbD4KICAgICAgPGlucHV0IHR5cGU9InRleHQiIGlkPSJwUnVsZXIiIHBsYWNlaG9sZGVyPSJFeDogR292ZXJuYWRvciBSZWlzIFZhbnRlbCI+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9Im1vZGFsLWFjdGlvbnMiPgogICAgICA8YnV0dG9uIGNsYXNzPSJoYnRuIiBpZD0icENhbmNlbCIgdHlwZT0iYnV0dG9uIj5DYW5jZWxhcjwvYnV0dG9uPgogICAgICA8YnV0dG9uIGNsYXNzPSJoYnRuIHByaW1hcnkiIGlkPSJwQ3JlYXRlIiB0eXBlPSJi",
"dXR0b24iPlJlZ2lzdHJhciBNdW5kbzwvYnV0dG9uPgogICAgPC9kaXY+CiAgYCk7CiAgb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjcENhbmNlbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiBvdmVybGF5LnJlbW92ZSgpKTsKICBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNwQ3JlYXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+ewogICAgY29uc3QgbmFtZSA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignI3BOYW1lJykudmFsdWUudHJpbSgpOwogICAgaWYoIW5hbWUpeyB0b2FzdCgnRMOqIHVtIG5vbWUg",
"YW8gcGxhbmV0YS4nKTsgcmV0dXJuOyB9CiAgICBjb25zdCBmYWN0aW9uSWQgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNwRmFjdGlvbicpLnZhbHVlIHx8IG51bGw7CiAgICBjb25zdCBydWxlciA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignI3BSdWxlcicpLnZhbHVlLnRyaW0oKTsKICAgIGNvbnN0IHAgPSB7CiAgICAgIGlkOiB1aWQoJ3BsJyksIG5hbWUsIGZhY3Rpb25JZCwKICAgICAgcnVsZXJzOiBydWxlciA/IFtydWxlcl0gOiBbXSwKICAgICAgYmFzZVJlc291cmNlczogbmV3UGxhbmV0UmVzb3VyY2VzKCksCiAgICAg",
"IGxhd3M6IFtdLAogICAgICBuZXdzOiBbXQogICAgfTsKICAgIHB1c2hTaW1wbGVOZXdzKHAsIGAke25hbWV9IMOpIG9maWNpYWxtZW50ZSByZWdpc3RyYWRvIG5vIEhvbG9uZXRgLCBmYWN0aW9uSWQgPyBgTyBtdW5kbyBpbmljaWEgc3VhIHRyYWpldMOzcmlhIHNvYiBhIHByb3Rlw6fDo28gZGUgJHtlc2NhcGVIdG1sKGdldEZhY3Rpb24oZmFjdGlvbklkKS5uYW1lKX0uYCA6ICdPIG11bmRvIGluaWNpYSBzdWEgdHJhamV0w7NyaWEgY29tbyB0ZXJyaXTDs3JpbyBpbmRlcGVuZGVudGUuJywgJ25ldXRyYWwnKTsKICAgIHN0YXRl",
"LnBsYW5ldHMucHVzaChwKTsKICAgIHBlcnNpc3RBdXRvc2F2ZSgpOwogICAgb3ZlcmxheS5yZW1vdmUoKTsKICAgIHNldFZpZXcoe3NjcmVlbjoncGxhbmV0JywgcGxhbmV0SWQ6cC5pZH0pOwogICAgdG9hc3QoJ011bmRvIHJlZ2lzdHJhZG86ICcrbmFtZSk7CiAgfSk7CiAgb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjcE5hbWUnKS5mb2N1cygpOwp9CgpmdW5jdGlvbiBvcGVuQXNzaWduRmFjdGlvbk1vZGFsKHBsYW5ldElkKXsKICBjb25zdCBwbGFuZXQgPSBnZXRQbGFuZXQocGxhbmV0SWQpOwogIGlmKHN0YXRlLmZhY3Rpb25z",
"Lmxlbmd0aD09PTApeyB0b2FzdCgnQ3JpZSB1bWEgZmFjw6fDo28gcHJpbWVpcm8uJyk7IHJldHVybjsgfQogIGNvbnN0IG9wdGlvbnMgPSBzdGF0ZS5mYWN0aW9ucy5tYXAoZj0+YDxvcHRpb24gdmFsdWU9IiR7Zi5pZH0iICR7cGxhbmV0LmZhY3Rpb25JZD09PWYuaWQ/J3NlbGVjdGVkJzonJ30+JHtlc2NhcGVIdG1sKGYubmFtZSl9PC9vcHRpb24+YCkuam9pbignJyk7CiAgY29uc3Qgb3ZlcmxheSA9IG9wZW5Nb2RhbChgCiAgICA8c3BhbiBjbGFzcz0iY2xvc2UteCI+4pyVPC9zcGFuPgogICAgPGgzPkF0cmlidWlyIGEgdW1h",
"IEZhY8Onw6NvPC9oMz4KICAgIDxkaXYgY2xhc3M9Im1vZGFsLXN1YiI+RXNjb2xoYSBhIGZhY8Onw6NvIHF1ZSBwYXNzYXLDoSBhIGdvdmVybmFyIDxiPiR7ZXNjYXBlSHRtbChwbGFuZXQubmFtZSl9PC9iPi48L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImZpZWxkIj4KICAgICAgPGxhYmVsPkZhY8Onw6NvPC9sYWJlbD4KICAgICAgPHNlbGVjdCBpZD0iYXNzaWduRmFjdGlvbiI+JHtvcHRpb25zfTwvc2VsZWN0PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmaWVsZCIgaWQ9ImxlYWRlck1lcmdlRmllbGQiIHN0eWxlPSJkaXNw",
"bGF5Om5vbmU7Ij4KICAgICAgPGxhYmVsPkFsdG8gQ29tYW5kbyBkYSBmYWPDp8OjbzwvbGFiZWw+CiAgICAgIDxkaXYgY2xhc3M9InJhZGlvLWdyb3VwIj4KICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9InJhZGlvIiBuYW1lPSJtZXJnZU1vZGUiIHZhbHVlPSJpZ25vcmUiIGNoZWNrZWQ+IE7Do28gYWx0ZXJhciBnb3Zlcm5hZG9yZXM8L2xhYmVsPgogICAgICAgIDxsYWJlbD48aW5wdXQgdHlwZT0icmFkaW8iIG5hbWU9Im1lcmdlTW9kZSIgdmFsdWU9ImFkZCI+IEFkaWNpb25hciBjb21vIGdvdmVybmFkb3JlczwvbGFiZWw+",
"CiAgICAgICAgPGxhYmVsPjxpbnB1dCB0eXBlPSJyYWRpbyIgbmFtZT0ibWVyZ2VNb2RlIiB2YWx1ZT0icmVwbGFjZSI+IFN1YnN0aXR1aXIgZ292ZXJuYWRvcmVzIGF0dWFpczwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJtb2RhbC1hY3Rpb25zIj4KICAgICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biIgaWQ9ImFDYW5jZWwiIHR5cGU9ImJ1dHRvbiI+Q2FuY2VsYXI8L2J1dHRvbj4KICAgICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biBwcmltYXJ5IiBpZD0iYUNvbmZpcm0iIHR5cGU9ImJ1dHRvbiI+",
"Q29uZmlybWFyPC9idXR0b24+CiAgICA8L2Rpdj4KICBgKTsKICBjb25zdCBzZWwgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNhc3NpZ25GYWN0aW9uJyk7CiAgY29uc3QgbWVyZ2VGaWVsZCA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2xlYWRlck1lcmdlRmllbGQnKTsKICBmdW5jdGlvbiByZWZyZXNoTWVyZ2VWaXNpYmlsaXR5KCl7CiAgICBjb25zdCBmID0gZ2V0RmFjdGlvbihzZWwudmFsdWUpOwogICAgbWVyZ2VGaWVsZC5zdHlsZS5kaXNwbGF5ID0gKGYgJiYgZi5sZWFkZXJzLmxlbmd0aD4wKSA/ICdibG9jaycgOiAn",
"bm9uZSc7CiAgfQogIHNlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCByZWZyZXNoTWVyZ2VWaXNpYmlsaXR5KTsKICByZWZyZXNoTWVyZ2VWaXNpYmlsaXR5KCk7CiAgb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjYUNhbmNlbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiBvdmVybGF5LnJlbW92ZSgpKTsKICBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNhQ29uZmlybScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PnsKICAgIGNvbnN0IGZpZCA9IHNlbC52YWx1ZTsKICAgIGNvbnN0IGYgPSBnZXRGYWN0",
"aW9uKGZpZCk7CiAgICBpZighZil7IHRvYXN0KCdTZWxlY2lvbmUgdW1hIGZhY8Onw6NvIHbDoWxpZGEuJyk7IHJldHVybjsgfQogICAgcGxhbmV0LmZhY3Rpb25JZCA9IGZpZDsKICAgIGNvbnN0IG1vZGUgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9bWVyZ2VNb2RlXTpjaGVja2VkJyk7CiAgICBpZihtb2RlKXsKICAgICAgaWYobW9kZS52YWx1ZT09PSdyZXBsYWNlJyl7IHBsYW5ldC5ydWxlcnMgPSBmLmxlYWRlcnMuc2xpY2UoMCw0KTsgfQogICAgICBlbHNlIGlmKG1vZGUudmFsdWU9PT0nYWRkJyl7IGYu",
"bGVhZGVycy5mb3JFYWNoKGw9PnsgaWYocGxhbmV0LnJ1bGVycy5sZW5ndGg8NCAmJiAhcGxhbmV0LnJ1bGVycy5pbmNsdWRlcyhsKSkgcGxhbmV0LnJ1bGVycy5wdXNoKGwpOyB9KTsgfQogICAgfQogICAgcGVyc2lzdEF1dG9zYXZlKCk7CiAgICBvdmVybGF5LnJlbW92ZSgpOwogICAgc2V0Vmlldyh7c2NyZWVuOidwbGFuZXQnLCBwbGFuZXRJZDpwbGFuZXQuaWR9KTsKICAgIHRvYXN0KCdNdW5kbyBhdHJpYnXDrWRvIMOgIGZhY8Onw6NvICcrZi5uYW1lKycuJyk7CiAgfSk7Cn0KCmZ1bmN0aW9uIG9wZW5Bc3NpZ25QbGFuZXRz",
"TW9kYWwoZmFjdGlvbklkKXsKICBjb25zdCBmID0gZ2V0RmFjdGlvbihmYWN0aW9uSWQpOwogIGNvbnN0IGF2YWlsYWJsZSA9IHN0YXRlLnBsYW5ldHMuZmlsdGVyKHA9PnAuZmFjdGlvbklkIT09ZmFjdGlvbklkKTsKICBpZihhdmFpbGFibGUubGVuZ3RoPT09MCl7IHRvYXN0KCdOw6NvIGjDoSBwbGFuZXRhcyBkaXNwb27DrXZlaXMgcGFyYSBhdHJpYnVpci4nKTsgcmV0dXJuOyB9CiAgY29uc3Qgcm93cyA9IGF2YWlsYWJsZS5tYXAocD0+ewogICAgY29uc3QgY3VycmVudEYgPSBwLmZhY3Rpb25JZCA/IGdldEZhY3Rpb24ocC5m",
"YWN0aW9uSWQpIDogbnVsbDsKICAgIHJldHVybiBgPGxhYmVsIGNsYXNzPSJjaGVja2xpc3Qtcm93Ij4KICAgICAgPGlucHV0IHR5cGU9ImNoZWNrYm94IiB2YWx1ZT0iJHtwLmlkfSI+CiAgICAgIDxzcGFuPiR7ZXNjYXBlSHRtbChwLm5hbWUpfTwvc3Bhbj4KICAgICAgPHNwYW4gY2xhc3M9ImNoay1zdWIiPiR7Y3VycmVudEYgPyAnYXR1YWxtZW50ZSBlbTogJytlc2NhcGVIdG1sKGN1cnJlbnRGLm5hbWUpIDogJ3NlbSBmYWPDp8Ojbyd9PC9zcGFuPgogICAgPC9sYWJlbD5gOwogIH0pLmpvaW4oJycpOwogIGNvbnN0IG92ZXJs",
"YXkgPSBvcGVuTW9kYWwoYAogICAgPHNwYW4gY2xhc3M9ImNsb3NlLXgiPuKclTwvc3Bhbj4KICAgIDxoMz5BdHJpYnVpciBQbGFuZXRhczwvaDM+CiAgICA8ZGl2IGNsYXNzPSJtb2RhbC1zdWIiPlNlbGVjaW9uZSBxdWFpcyBtdW5kb3MgcGFzc2FtIGEgaW50ZWdyYXIgPGIgc3R5bGU9ImNvbG9yOnZhcigtLWJsdWUpIj4ke2VzY2FwZUh0bWwoZi5uYW1lKX08L2I+LjwvZGl2PgogICAgPGRpdiBjbGFzcz0iZmllbGQiPjxkaXYgY2xhc3M9ImNoZWNrbGlzdCIgaWQ9InBsYW5ldENoZWNrbGlzdCI+JHtyb3dzfTwvZGl2PjwvZGl2",
"PgogICAgPGRpdiBjbGFzcz0iZmllbGQiIGlkPSJsZWFkZXJNZXJnZUZpZWxkMiIgc3R5bGU9ImRpc3BsYXk6JHtmLmxlYWRlcnMubGVuZ3RoPjA/J2Jsb2NrJzonbm9uZSd9OyI+CiAgICAgIDxsYWJlbD5BbHRvIENvbWFuZG8gbm9zIHBsYW5ldGFzIHNlbGVjaW9uYWRvczwvbGFiZWw+CiAgICAgIDxkaXYgY2xhc3M9InJhZGlvLWdyb3VwIj4KICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9InJhZGlvIiBuYW1lPSJtZXJnZU1vZGUyIiB2YWx1ZT0iaWdub3JlIiBjaGVja2VkPiBOw6NvIGFsdGVyYXIgZ292ZXJuYWRvcmVzPC9s",
"YWJlbD4KICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9InJhZGlvIiBuYW1lPSJtZXJnZU1vZGUyIiB2YWx1ZT0iYWRkIj4gQWRpY2lvbmFyIGNvbW8gZ292ZXJuYWRvcmVzPC9sYWJlbD4KICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9InJhZGlvIiBuYW1lPSJtZXJnZU1vZGUyIiB2YWx1ZT0icmVwbGFjZSI+IFN1YnN0aXR1aXIgZ292ZXJuYWRvcmVzIGF0dWFpczwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJtb2RhbC1hY3Rpb25zIj4KICAgICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biIg",
"aWQ9ImFwQ2FuY2VsIiB0eXBlPSJidXR0b24iPkNhbmNlbGFyPC9idXR0b24+CiAgICAgIDxidXR0b24gY2xhc3M9ImhidG4gcHJpbWFyeSIgaWQ9ImFwQ29uZmlybSIgdHlwZT0iYnV0dG9uIj5BdHJpYnVpciBTZWxlY2lvbmFkb3M8L2J1dHRvbj4KICAgIDwvZGl2PgogIGApOwogIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2FwQ2FuY2VsJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IG92ZXJsYXkucmVtb3ZlKCkpOwogIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2FwQ29uZmlybScpLmFkZEV2ZW50TGlzdGVuZXIo",
"J2NsaWNrJywgKCk9PnsKICAgIGNvbnN0IGNoZWNrZWQgPSBBcnJheS5mcm9tKG92ZXJsYXkucXVlcnlTZWxlY3RvckFsbCgnI3BsYW5ldENoZWNrbGlzdCBpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkJykpLm1hcChjPT5jLnZhbHVlKTsKICAgIGlmKGNoZWNrZWQubGVuZ3RoPT09MCl7IHRvYXN0KCdTZWxlY2lvbmUgYW8gbWVub3MgdW0gcGxhbmV0YS4nKTsgcmV0dXJuOyB9CiAgICBjb25zdCBtb2RlID0gb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPW1lcmdlTW9kZTJdOmNoZWNrZWQnKTsKICAgIGNoZWNr",
"ZWQuZm9yRWFjaChwaWQ9PnsKICAgICAgY29uc3QgcCA9IGdldFBsYW5ldChwaWQpOwogICAgICBpZighcCkgcmV0dXJuOwogICAgICBwLmZhY3Rpb25JZCA9IGYuaWQ7CiAgICAgIGlmKG1vZGUpewogICAgICAgIGlmKG1vZGUudmFsdWU9PT0ncmVwbGFjZScpeyBwLnJ1bGVycyA9IGYubGVhZGVycy5zbGljZSgwLDQpOyB9CiAgICAgICAgZWxzZSBpZihtb2RlLnZhbHVlPT09J2FkZCcpeyBmLmxlYWRlcnMuZm9yRWFjaChsPT57IGlmKHAucnVsZXJzLmxlbmd0aDw0ICYmICFwLnJ1bGVycy5pbmNsdWRlcyhsKSkgcC5ydWxlcnMu",
"cHVzaChsKTsgfSk7IH0KICAgICAgfQogICAgfSk7CiAgICBwZXJzaXN0QXV0b3NhdmUoKTsKICAgIG92ZXJsYXkucmVtb3ZlKCk7CiAgICBzZXRWaWV3KHtzY3JlZW46J2ZhY3Rpb24nLCBmYWN0aW9uSWQ6Zi5pZH0pOwogICAgdG9hc3QoY2hlY2tlZC5sZW5ndGgrJyBwbGFuZXRhKHMpIGF0cmlidcOtZG8ocykgYSAnK2YubmFtZSsnLicpOwogIH0pOwp9Cgpjb25zdCBQUkVTRVRfQ0FURUdPUllfTEFCRUxTID0geyB0b2Rhczon8J+Xgu+4jyBUb2RhcycsIHJlYWw6J/CfjI0gVmlkYSBSZWFsJywgc3RhcndhcnM6J+KalO+4jyBT",
"dGFyIFdhcnMnLCBpc2I6J/CflbXvuI8gSVNCIChTZWd1cmFuw6dhIEltcGVyaWFsKScsIGZpY2Nhbzon8J+agCBGaWPDp8OjbyAoU1dOKScgfTsKCmZ1bmN0aW9uIG9wZW5MYXdNb2RhbCh7bW9kZSwgcGxhbmV0SWQsIGZhY3Rpb25JZH0pewogIGNvbnN0IGZhY3Rpb24gPSBtb2RlPT09J2ZhY3Rpb24nID8gZ2V0RmFjdGlvbihmYWN0aW9uSWQpIDogKGdldFBsYW5ldChwbGFuZXRJZCkuZmFjdGlvbklkID8gZ2V0RmFjdGlvbihnZXRQbGFuZXQocGxhbmV0SWQpLmZhY3Rpb25JZCkgOiBudWxsKTsKICBjb25zdCBwbGFuZXQgPSBt",
"b2RlPT09J3BsYW5ldCcgPyBnZXRQbGFuZXQocGxhbmV0SWQpIDogbnVsbDsKICBsZXQgYWN0aXZlUHJlc2V0S2V5ID0gbnVsbDsgLy8gcXVhbmRvIHVtIHByZXNldCBlc3TDoSBhdGl2bywgbXVkYXIgc2V2ZXJpZGFkZSByZWVzY3JldmUgbyB0ZXh0bwogIGxldCBhY3RpdmVDYXRlZ29yeSA9ICd0b2Rhcyc7CiAgbGV0IGFjdGl2ZVR5cGUgPSAndG9kb3MnOyAvLyAndG9kb3MnIHwgJ2RpcmVpdG8nIHwgJ3ZpY2lvJyB8ICdhdGl2aWRhZGUnCiAgbGV0IHBvbGFyaXR5ID0gJ25vcm1hbCc7IC8vICdub3JtYWwnIChyZXN0cml0aXZh",
"KSB8ICdvcG9zdGEnIChsaWJlcmFsaXphbnRlIC8gbyAiY29udHJhIikKICBsZXQgYmFzZUFuYWx5c2lzID0gbnVsbDsgLy8ge2RlbHRhcywgbWF0Y2hlZH0gc2VtcHJlIGNhbGN1bGFkbyBhIHBhcnRpciBkbyB0ZXh0byBPUklHSU5BTC9yZXN0cml0aXZvCgogIGNvbnN0IG92ZXJsYXkgPSBvcGVuTW9kYWwoYAogICAgPHNwYW4gY2xhc3M9ImNsb3NlLXgiPuKclTwvc3Bhbj4KICAgIDxoMz5Qcm9tdWxnYXIgTm92YSBMZWk8L2gzPgogICAgPGRpdiBjbGFzcz0ibW9kYWwtc3ViIj4KICAgICAgJHttb2RlPT09J2ZhY3Rpb24nCiAg",
"ICAgICAgPyBgRXN0YSBsZWkgc2Vyw6EgYXBsaWNhZGEgYSA8Yj50b2RvcyBvcyBtdW5kb3M8L2I+IGRhIGZhY8Onw6NvIDxiPiR7ZXNjYXBlSHRtbChmYWN0aW9uLm5hbWUpfTwvYj4sIGUgbyBKb3JuYWwgZGUgY2FkYSBtdW5kbyByZWdpc3RyYXLDoSBvIGRlY3JldG8uYAogICAgICAgIDogYEVzdGEgbGVpIHNlcsOhIGFwbGljYWRhIGFwZW5hcyBhbyBtdW5kbyA8Yj4ke2VzY2FwZUh0bWwocGxhbmV0Lm5hbWUpfTwvYj4sIHF1ZSByZWdpc3RyYXLDoSBvIGRlY3JldG8gZW0gc2V1IEpvcm5hbC5gfQogICAgPC9kaXY+CgogICAg",
"PGRpdiBjbGFzcz0ibGF3LWJyb3dzZXIiPgogICAgICA8ZGl2IGNsYXNzPSJsYXctYnJvd3Nlci1zaWRlIj4KICAgICAgICA8ZGl2IGNsYXNzPSJmaWVsZCIgc3R5bGU9Im1hcmdpbi1ib3R0b206MTJweDsiPgogICAgICAgICAgPGxhYmVsPkJ1c2NhciBlbnRyZSAzNjUrIGRlY3JldG9zPC9sYWJlbD4KICAgICAgICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0icHJlc2V0U2VhcmNoIiBwbGFjZWhvbGRlcj0idmlnaWzDom5jaWEsIGVzY3Jhdmlkw6NvLCBpbXByZW5zYS4uLiI+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBj",
"bGFzcz0ic2lkZS1ibG9jay1sYWJlbCI+Q2F0ZWdvcmlhPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iYnJvd3Nlci1jYXRzIiBpZD0iY2F0ZWdvcnlUYWJzIj48L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJzaWRlLWJsb2NrLWxhYmVsIiBzdHlsZT0ibWFyZ2luLXRvcDoxNHB4OyI+VGlwbyBkZSBsZWk8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJicm93c2VyLXR5cGVzIiBpZD0idHlwZUZpbHRlciI+PC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ic2lkZS1sZWdlbmQiPgogICAgICAgICAgPGRpdj48c3BhbiBjbGFzcz0i",
"bGVnLWRvdCI+8J+boe+4jzwvc3Bhbj4gRGlyZWl0by9Qcm90ZcOnw6NvIOKAlCByZXN0cmluZ2lyIHN1cHJpbWUsIGxpYmVyYWxpemFyIGdhcmFudGU8L2Rpdj4KICAgICAgICAgIDxkaXY+PHNwYW4gY2xhc3M9ImxlZy1kb3QiPuKaoO+4jzwvc3Bhbj4gUHLDoXRpY2Egbm9jaXZhIOKAlCByZXN0cmluZ2lyIGltcMO1ZSwgbGliZXJhbGl6YXIgYWJvbGUvcHJvdGVnZTwvZGl2PgogICAgICAgICAgPGRpdj48c3BhbiBjbGFzcz0ibGVnLWRvdCI+4pqZ77iPPC9zcGFuPiBBdGl2aWRhZGUg4oCUIHJlc3RyaW5naXIgY29udHJvbGEs",
"IGxpYmVyYWxpemFyIGRlc3JlZ3VsYW1lbnRhPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJsYXctYnJvd3Nlci1tYWluIj4KICAgICAgICA8ZGl2IGNsYXNzPSJicm93c2VyLWNvdW50IiBpZD0icHJlc2V0Q291bnQiPjwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9InByZXNldC1ncmlkLXYyIiBpZD0icHJlc2V0R3JpZCI+PC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0iZmllbGQiIHN0eWxlPSJtYXJnaW4tdG9wOjIwcHg7Ij4KICAgICAgPGxh",
"YmVsPlBvbGFyaWRhZGUgZGEgbGVpIHNlbGVjaW9uYWRhPC9sYWJlbD4KICAgICAgPGRpdiBjbGFzcz0idGFyZ2V0LXRvZ2dsZSIgaWQ9InBvbGFyaXR5VG9nZ2xlIj4KICAgICAgICA8ZGl2IGNsYXNzPSJwb2wtb3B0IiBkYXRhLXBvbD0ibm9ybWFsIj7wn5SSIFJlc3RyaXRpdmEgKG9yaWdpbmFsKTwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9InBvbC1vcHQiIGRhdGEtcG9sPSJvcG9zdGEiPvCflJMgTGliZXJhbGl6YW50ZSAobyBjb250cmEpPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJm",
"aWVsZC1yb3ciPgogICAgICA8ZGl2IGNsYXNzPSJmaWVsZCIgc3R5bGU9ImZsZXg6MjsiPgogICAgICAgIDxsYWJlbD5Ob21lIGRhIGxlaTwvbGFiZWw+CiAgICAgICAgPGlucHV0IHR5cGU9InRleHQiIGlkPSJsTmFtZSIgcGxhY2Vob2xkZXI9IkV4OiBEZWNyZXRvIGRlIFJhY2lvbmFtZW50byI+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJmaWVsZCIgc3R5bGU9ImZsZXg6MTsiPgogICAgICAgIDxsYWJlbD5TZXZlcmlkYWRlPC9sYWJlbD4KICAgICAgICA8ZGl2IGNsYXNzPSJzZXYtc2xpZGVyIj4KICAgICAgICAg",
"IDxpbnB1dCB0eXBlPSJyYW5nZSIgaWQ9ImxTZXZlcml0eSIgbWluPSIxIiBtYXg9IjUiIHZhbHVlPSIzIiBzdGVwPSIxIj4KICAgICAgICAgIDxzcGFuIGNsYXNzPSJzZXYtbGFiZWwiIGlkPSJzZXZMYWJlbCI+RmlybWU8L3NwYW4+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmaWVsZCI+CiAgICAgIDxsYWJlbD5UZXh0byBkYSBsZWkgKGVkaXRhciBtYW51YWxtZW50ZSBkZXNsaWdhIGEgYXR1YWxpemHDp8OjbyBhdXRvbcOhdGljYSBwb3Igc2V2ZXJpZGFkZS9wcmVzZXQp",
"PC9sYWJlbD4KICAgICAgPHRleHRhcmVhIGlkPSJsVGV4dCIgcm93cz0iNCIgcGxhY2Vob2xkZXI9IkRlc2NyZXZhIGEgbGVpIGxpdnJlbWVudGU6IG8gcXVlIGVsYSBwcm/DrWJlLCBwZXJtaXRlLCB0YXhhLCBwcm90ZWdlIG91IHB1bmUuLi4iPjwvdGV4dGFyZWE+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImZpZWxkIj4KICAgICAgPGxhYmVsPkltcGFjdG8gY2FsY3VsYWRvPC9sYWJlbD4KICAgICAgPGRpdiBjbGFzcz0icHJldmlldy1ib3giIGlkPSJwcmV2aWV3Qm94Ij48c3BhbiBjbGFzcz0iaGludCI+RXNjb2xoYSB1",
"bSBkZWNyZXRvIMOgIGVzcXVlcmRhIG91IGVzY3JldmEgbyB0ZXh0byBkYSBsZWkgcGFyYSB2ZXIgbyBpbXBhY3RvIGVzdGltYWRvLi4uPC9zcGFuPjwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJtb2RhbC1hY3Rpb25zIj4KICAgICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biIgaWQ9ImxDYW5jZWwiIHR5cGU9ImJ1dHRvbiI+Q2FuY2VsYXI8L2J1dHRvbj4KICAgICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biBwcmltYXJ5IiBpZD0ibENyZWF0ZSIgdHlwZT0iYnV0dG9uIj5Qcm9tdWxnYXI8L2J1dHRvbj4KICAgIDwvZGl2Pgog",
"IGAsICdtb2RhbC13aWRlJyk7CgogIGNvbnN0IGNhdFRhYnMgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNjYXRlZ29yeVRhYnMnKTsKICBjb25zdCB0eXBlRmlsdGVyRWwgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyN0eXBlRmlsdGVyJyk7CiAgY29uc3QgcHJlc2V0R3JpZCA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignI3ByZXNldEdyaWQnKTsKICBjb25zdCBzZWFyY2hJbnB1dCA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignI3ByZXNldFNlYXJjaCcpOwogIGNvbnN0IGNvdW50TGFiZWwgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0",
"b3IoJyNwcmVzZXRDb3VudCcpOwogIGNvbnN0IHBvbFRvZ2dsZSA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignI3BvbGFyaXR5VG9nZ2xlJyk7CgogIGNvbnN0IFRZUEVfRklMVEVSUyA9IFsKICAgIFsndG9kb3MnLCAn4pymIFRvZG9zIG9zIHRpcG9zJ10sCiAgICBbJ2RpcmVpdG8nLCAn8J+boe+4jyBEaXJlaXRvcy9Qcm90ZcOnw7VlcyddLAogICAgWyd2aWNpbycsICfimqDvuI8gUHLDoXRpY2FzIG5vY2l2YXMnXSwKICAgIFsnYXRpdmlkYWRlJywgJ+Kame+4jyBBdGl2aWRhZGVzIG5ldXRyYXMnXSwKICBdOwoKICBmdW5jdGlv",
"biByZW5kZXJDYXRlZ29yeVRhYnMoKXsKICAgIGNhdFRhYnMuaW5uZXJIVE1MID0gJyc7CiAgICBPYmplY3QuZW50cmllcyhQUkVTRVRfQ0FURUdPUllfTEFCRUxTKS5mb3JFYWNoKChba2V5LGxhYmVsXSk9PnsKICAgICAgY29uc3QgY291bnQgPSBrZXk9PT0ndG9kYXMnID8gUFJFU0VUX0xBV1MubGVuZ3RoIDogUFJFU0VUX0xBV1MuZmlsdGVyKHA9PnAuY2F0ZWdvcnk9PT1rZXkpLmxlbmd0aDsKICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICAgIHJvdy5jbGFzc05hbWUgPSAnY2F0",
"LXJvdycgKyAoa2V5PT09YWN0aXZlQ2F0ZWdvcnkgPyAnIGFjdGl2ZScgOiAnJyk7CiAgICAgIHJvdy5pbm5lckhUTUwgPSBgPHNwYW4+JHtsYWJlbH08L3NwYW4+PHNwYW4gY2xhc3M9ImNhdC1jb3VudCI+JHtjb3VudH08L3NwYW4+YDsKICAgICAgcm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PnsgYWN0aXZlQ2F0ZWdvcnk9a2V5OyByZW5kZXJDYXRlZ29yeVRhYnMoKTsgcmVuZGVyUHJlc2V0cygpOyB9KTsKICAgICAgY2F0VGFicy5hcHBlbmRDaGlsZChyb3cpOwogICAgfSk7CiAgfQogIGZ1bmN0aW9uIHJlbmRl",
"clR5cGVGaWx0ZXIoKXsKICAgIHR5cGVGaWx0ZXJFbC5pbm5lckhUTUwgPSAnJzsKICAgIFRZUEVfRklMVEVSUy5mb3JFYWNoKChba2V5LGxhYmVsXSk9PnsKICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICAgIHJvdy5jbGFzc05hbWUgPSAnY2F0LXJvdyB0eXBlLXJvdycgKyAoa2V5PT09YWN0aXZlVHlwZSA/ICcgYWN0aXZlJyA6ICcnKTsKICAgICAgcm93LnRleHRDb250ZW50ID0gbGFiZWw7CiAgICAgIHJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57IGFjdGl2ZVR5",
"cGU9a2V5OyByZW5kZXJUeXBlRmlsdGVyKCk7IHJlbmRlclByZXNldHMoKTsgfSk7CiAgICAgIHR5cGVGaWx0ZXJFbC5hcHBlbmRDaGlsZChyb3cpOwogICAgfSk7CiAgfQogIGZ1bmN0aW9uIG1hdGNoaW5nUHJlc2V0cygpewogICAgY29uc3QgcSA9IHNlYXJjaElucHV0LnZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpOwogICAgbGV0IGxpc3QgPSBQUkVTRVRfTEFXUzsKICAgIGlmKHEpewogICAgICBsaXN0ID0gbGlzdC5maWx0ZXIocD0+IHAubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8IChwLnN1YmplY3R8fCcn",
"KS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpKTsKICAgIH0gZWxzZSBpZihhY3RpdmVDYXRlZ29yeSE9PSd0b2RhcycpewogICAgICBsaXN0ID0gbGlzdC5maWx0ZXIocD0+IHAuY2F0ZWdvcnk9PT1hY3RpdmVDYXRlZ29yeSk7CiAgICB9CiAgICBpZihhY3RpdmVUeXBlIT09J3RvZG9zJyl7CiAgICAgIGxpc3QgPSBsaXN0LmZpbHRlcihwPT4gKHAucG9sYXJpdHlUeXBlfHwnYXRpdmlkYWRlJyk9PT1hY3RpdmVUeXBlKTsKICAgIH0KICAgIHJldHVybiBsaXN0OwogIH0KICBmdW5jdGlvbiByZW5kZXJQcmVzZXRzKCl7CiAgICBw",
"cmVzZXRHcmlkLmlubmVySFRNTCA9ICcnOwogICAgY29uc3QgbGlzdCA9IG1hdGNoaW5nUHJlc2V0cygpOwogICAgY291bnRMYWJlbC50ZXh0Q29udGVudCA9IGxpc3QubGVuZ3RoICsgJyBkZWNyZXRvKHMpIGVuY29udHJhZG8ocyknOwogICAgY29uc3QgY2FwcGVkID0gbGlzdC5zbGljZSgwLCAxODApOwogICAgY2FwcGVkLmZvckVhY2gocD0+ewogICAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICAgIGNvbnN0IHR5cGVJY29uID0gcC5wb2xhcml0eVR5cGU9PT0nZGlyZWl0bycgPyAn",
"8J+boe+4jycgOiBwLnBvbGFyaXR5VHlwZT09PSd2aWNpbycgPyAn4pqg77iPJyA6ICfimpnvuI8nOwogICAgICBjYXJkLmNsYXNzTmFtZT0ncHJlc2V0LWNhcmQnICsgKHAua2V5PT09YWN0aXZlUHJlc2V0S2V5ID8gJyBzZWxlY3RlZCcgOiAnJyk7CiAgICAgIGNhcmQuaW5uZXJIVE1MID0gYAogICAgICAgIDxkaXYgY2xhc3M9InByZXNldC1jYXJkLXRvcCI+PHNwYW4gY2xhc3M9InByZXNldC1jYXJkLWljb24iPiR7dHlwZUljb259PC9zcGFuPjxzcGFuIGNsYXNzPSJwcmVzZXQtY2FyZC1jYXQiPiR7UFJFU0VUX0NBVEVHT1JZ",
"X0xBQkVMU1twLmNhdGVnb3J5XS5yZXBsYWNlKC9eXFMrXHMvLCcnKX08L3NwYW4+PC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0icHJlc2V0LWNhcmQtbmFtZSI+JHtlc2NhcGVIdG1sKHAubmFtZSl9PC9kaXY+CiAgICAgIGA7CiAgICAgIGNhcmQudGl0bGUgPSBwLnBvbGFyaXR5VHlwZT09PSdkaXJlaXRvJyA/ICdEaXJlaXRvL1Byb3Rlw6fDo286IHJlc3RyaW5naXIgPSBzdXByaW1pciwgbGliZXJhbGl6YXIgPSBnYXJhbnRpciBwbGVuYW1lbnRlJwogICAgICAgICAgICAgICAgIDogcC5wb2xhcml0eVR5cGU9PT0ndmljaW8n",
"ID8gJ1Byw6F0aWNhIG5vY2l2YTogcmVzdHJpbmdpciA9IG8gRXN0YWRvIGltcMO1ZS9lc2NhbGEgZXNzYSBwcsOhdGljYSwgbGliZXJhbGl6YXIgPSBhYm9sZSBlIHByb3RlZ2UgYSBwb3B1bGHDp8OjbyBkZWxhJwogICAgICAgICAgICAgICAgIDogJ0F0aXZpZGFkZSByZWd1bGFkYTogcmVzdHJpbmdpciA9IGNvbnRyb2xhciBtYWlzLCBsaWJlcmFsaXphciA9IGRlc3JlZ3VsYW1lbnRhcic7CiAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+ewogICAgICAgIGFjdGl2ZVByZXNldEtleSA9IHAua2V5Owog",
"ICAgICAgIGFwcGx5UHJlc2V0VG9Gb3JtKHApOwogICAgICAgIHJlbmRlclByZXNldHMoKTsKICAgICAgfSk7CiAgICAgIHByZXNldEdyaWQuYXBwZW5kQ2hpbGQoY2FyZCk7CiAgICB9KTsKICAgIGlmKGxpc3QubGVuZ3RoPT09MCl7CiAgICAgIGNvbnN0IGVtcHR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICAgIGVtcHR5LnN0eWxlLmNzc1RleHQ9J2ZvbnQtc2l6ZToxMS41cHg7IGNvbG9yOnZhcigtLWluay1kaW1tZXIpOyBwYWRkaW5nOjIwcHg7IHRleHQtYWxpZ246Y2VudGVyOyBncmlkLWNvbHVtbjox",
"Ly0xOyc7CiAgICAgIGVtcHR5LnRleHRDb250ZW50ID0gJ05lbmh1bSBkZWNyZXRvIGVuY29udHJhZG8g4oCUIHRlbnRlIG91dHJvIHRlcm1vIG91IGNhdGVnb3JpYS4nOwogICAgICBwcmVzZXRHcmlkLmFwcGVuZENoaWxkKGVtcHR5KTsKICAgIH0gZWxzZSBpZihsaXN0Lmxlbmd0aD4xODApewogICAgICBjb25zdCBtb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICAgIG1vcmUuc3R5bGUuY3NzVGV4dD0nZm9udC1zaXplOjEwcHg7IGNvbG9yOnZhcigtLWluay1kaW1tZXIpOyBwYWRkaW5nOjhweCAycHg7",
"IGdyaWQtY29sdW1uOjEvLTE7IHRleHQtYWxpZ246Y2VudGVyOyc7CiAgICAgIG1vcmUudGV4dENvbnRlbnQgPSAnKyAnICsgKGxpc3QubGVuZ3RoLTE4MCkgKyAnIG91dHJvKHMpIHJlc3VsdGFkbyhzKSDigJQgcmVmaW5lIGEgYnVzY2EgcGFyYSB2ZXIgbWFpcy4nOwogICAgICBwcmVzZXRHcmlkLmFwcGVuZENoaWxkKG1vcmUpOwogICAgfQogIH0KICBmdW5jdGlvbiBhcHBseVByZXNldFRvRm9ybShwcmVzZXQpewogICAgY29uc3Qgc2V2ID0gcGFyc2VJbnQob3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjbFNldmVyaXR5JykudmFs",
"dWUsMTApIHx8IDM7CiAgICBjb25zdCBidWlsdCA9IGJ1aWxkTGF3RnJvbVByZXNldChwcmVzZXQsIHNldik7CiAgICBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNsTmFtZScpLnZhbHVlID0gcG9sYXJpdHk9PT0nb3Bvc3RhJyA/IGJ1aWxkT3Bwb3NpdGVGcm9tUHJlc2V0KHByZXNldCwgc2V2KS5uYW1lIDogYnVpbHQubmFtZTsKICAgIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2xUZXh0JykudmFsdWUgPSBwb2xhcml0eT09PSdvcG9zdGEnID8gYnVpbGRPcHBvc2l0ZUZyb21QcmVzZXQocHJlc2V0LCBzZXYpLnRleHQgOiBidWls",
"dC50ZXh0OwogICAgcmVjb21wdXRlQmFzZUFuYWx5c2lzKCk7CiAgICB1cGRhdGVQcmV2aWV3KCk7CiAgfQogIHJlbmRlckNhdGVnb3J5VGFicygpOwogIHJlbmRlclR5cGVGaWx0ZXIoKTsKICByZW5kZXJQcmVzZXRzKCk7CiAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCByZW5kZXJQcmVzZXRzKTsKCgogIC8vIC0tLS0gcG9sYXJpZGFkZSAtLS0tCiAgZnVuY3Rpb24gc2V0UG9sYXJpdHlVSSgpewogICAgcG9sVG9nZ2xlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb2wtb3B0JykuZm9yRWFjaChlbD0+ewogICAg",
"ICBlbC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9sJyk9PT1wb2xhcml0eSk7CiAgICB9KTsKICB9CiAgcG9sVG9nZ2xlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb2wtb3B0JykuZm9yRWFjaChlbD0+ewogICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+ewogICAgICBwb2xhcml0eSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wb2wnKTsKICAgICAgc2V0UG9sYXJpdHlVSSgpOwogICAgICBjb25zdCBzZXYgPSBwYXJzZUludChvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNs",
"U2V2ZXJpdHknKS52YWx1ZSwxMCk7CiAgICAgIGlmKGFjdGl2ZVByZXNldEtleSl7CiAgICAgICAgY29uc3QgcHJlc2V0ID0gUFJFU0VUX0xBV1MuZmluZChwPT5wLmtleT09PWFjdGl2ZVByZXNldEtleSk7CiAgICAgICAgaWYocHJlc2V0KXsKICAgICAgICAgIGNvbnN0IGJ1aWx0ID0gcG9sYXJpdHk9PT0nb3Bvc3RhJyA/IGJ1aWxkT3Bwb3NpdGVGcm9tUHJlc2V0KHByZXNldCwgc2V2KSA6IGJ1aWxkTGF3RnJvbVByZXNldChwcmVzZXQsIHNldik7CiAgICAgICAgICBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNsTmFtZScpLnZh",
"bHVlID0gYnVpbHQubmFtZTsKICAgICAgICAgIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2xUZXh0JykudmFsdWUgPSBidWlsdC50ZXh0OwogICAgICAgIH0KICAgICAgfSBlbHNlIHsKICAgICAgICAvLyBsZWkgbGl2cmU6IHPDsyBhanVzdGEgbyBub21lIHBhcmEgaW5kaWNhciBhIGludmVyc8OjbywgcHJlc2VydmEgbyB0ZXh0byBkbyB1c3XDoXJpbwogICAgICAgIGNvbnN0IG5hbWVGaWVsZCA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2xOYW1lJyk7CiAgICAgICAgY29uc3Qgc3VmZml4ID0gJyAoSW52ZXJ0aWRhKSc7CiAg",
"ICAgICAgaWYocG9sYXJpdHk9PT0nb3Bvc3RhJyAmJiAhbmFtZUZpZWxkLnZhbHVlLmluY2x1ZGVzKHN1ZmZpeCkpeyBuYW1lRmllbGQudmFsdWUgPSBuYW1lRmllbGQudmFsdWUudHJpbSgpICsgc3VmZml4OyB9CiAgICAgICAgZWxzZSBpZihwb2xhcml0eT09PSdub3JtYWwnKXsgbmFtZUZpZWxkLnZhbHVlID0gbmFtZUZpZWxkLnZhbHVlLnJlcGxhY2Uoc3VmZml4LCAnJykudHJpbSgpOyB9CiAgICAgIH0KICAgICAgdXBkYXRlUHJldmlldygpOwogICAgfSk7CiAgfSk7CiAgc2V0UG9sYXJpdHlVSSgpOwoKICBmdW5jdGlvbiBy",
"ZWNvbXB1dGVCYXNlQW5hbHlzaXMoKXsKICAgIC8vIGJhc2VBbmFseXNpcyDDqSBTRU1QUkUgY2FsY3VsYWRvIGEgcGFydGlyIGRhIHZlcnPDo28gcmVzdHJpdGl2YS9vcmlnaW5hbCwKICAgIC8vIGdhcmFudGluZG8gcXVlIGEgdmVyc8OjbyBsaWJlcmFsaXphbnRlIHNlamEgdW0gZXNwZWxobyBmaWVsIGRvcyBlZmVpdG9zLgogICAgY29uc3Qgc2V2ID0gcGFyc2VJbnQob3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjbFNldmVyaXR5JykudmFsdWUsMTApOwogICAgaWYoYWN0aXZlUHJlc2V0S2V5KXsKICAgICAgY29uc3QgcHJlc2V0",
"ID0gUFJFU0VUX0xBV1MuZmluZChwPT5wLmtleT09PWFjdGl2ZVByZXNldEtleSk7CiAgICAgIGlmKHByZXNldC5maXhlZERlbHRhcyl7CiAgICAgICAgLy8gImRpcmVpdG8iIG91ICJ2w61jaW8iOiBlZmVpdG8gZml4byBwb3Igc2V2ZXJpZGFkZSwgc2VtIHBhc3NhciBwZWxvCiAgICAgICAgLy8gbW90b3IgZGUgcGFsYXZyYXMtY2hhdmUgKGV2aXRhIGZhbHNvLXBvc2l0aXZvIGNvbSB0ZXJtb3MgY29tbwogICAgICAgIC8vICJwcm90ZcOnw6NvIiBvdSAibWlub3JpYXMiIGFwYXJlY2VuZG8gZGVudHJvIGRlIHVtIHRleHRvIHJl",
"c3RyaXRpdm8pLgogICAgICAgIGNvbnN0IG5vdGUgPSBwcmVzZXQucG9sYXJpdHlUeXBlPT09J2RpcmVpdG8nCiAgICAgICAgICA/ICdDbGFzc2lmaWNhZG8gY29tbyBEaXJlaXRvL1Byb3Rlw6fDo28g4oCUIGVmZWl0byBjYWxjdWxhZG8gZGlyZXRhbWVudGUgcGVsYSBzZXZlcmlkYWRlLCBuw6NvIHBvciBwYWxhdnJhcy1jaGF2ZS4nCiAgICAgICAgICA6ICdDbGFzc2lmaWNhZG8gY29tbyBQcsOhdGljYSBOb2NpdmEg4oCUIGNvbWJhdGUgY2FsY3VsYWRvIGRpcmV0YW1lbnRlIHBlbGEgc2V2ZXJpZGFkZSwgbsOjbyBwb3IgcGFs",
"YXZyYXMtY2hhdmUuJzsKICAgICAgICBiYXNlQW5hbHlzaXMgPSB7IGRlbHRhczogcHJlc2V0LmZpeGVkRGVsdGFzW3Nldl0sIG1hdGNoZWQ6IFtub3RlXSB9OwogICAgICB9IGVsc2UgewogICAgICAgIGNvbnN0IG5vcm1hbFRleHQgPSBidWlsZExhd0Zyb21QcmVzZXQocHJlc2V0LCBzZXYpLnRleHQ7CiAgICAgICAgYmFzZUFuYWx5c2lzID0gYW5hbHl6ZUxhd1RleHQobm9ybWFsVGV4dCwgc2V2KTsKICAgICAgfQogICAgfSBlbHNlIHsKICAgICAgY29uc3QgdGV4dCA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2xUZXh0Jyku",
"dmFsdWUudHJpbSgpOwogICAgICBiYXNlQW5hbHlzaXMgPSB0ZXh0ID8gYW5hbHl6ZUxhd1RleHQodGV4dCwgc2V2KSA6IG51bGw7CiAgICB9CiAgfQoKICBmdW5jdGlvbiB1cGRhdGVQcmV2aWV3KCl7CiAgICBjb25zdCBzZXYgPSBwYXJzZUludChvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNsU2V2ZXJpdHknKS52YWx1ZSwxMCk7CiAgICBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNzZXZMYWJlbCcpLnRleHRDb250ZW50ID0gU0VWRVJJVFlfTEFCRUxTW3Nldl07CiAgICBjb25zdCB0ZXh0ID0gb3ZlcmxheS5xdWVyeVNlbGVjdG9y",
"KCcjbFRleHQnKS52YWx1ZS50cmltKCk7CiAgICBjb25zdCBib3ggPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2aWV3Qm94Jyk7CiAgICBpZighdGV4dCl7IGJveC5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9ImhpbnQiPkVzY3JldmEgbyB0ZXh0byBkYSBsZWkgcGFyYSB2ZXIgbyBpbXBhY3RvIGVzdGltYWRvLi4uPC9zcGFuPic7IHJldHVybjsgfQogICAgaWYoIWFjdGl2ZVByZXNldEtleSkgcmVjb21wdXRlQmFzZUFuYWx5c2lzKCk7CiAgICBpZighYmFzZUFuYWx5c2lzKXsgYm94LmlubmVySFRNTCA9ICc8c3BhbiBj",
"bGFzcz0iaGludCI+RXNjcmV2YSBvIHRleHRvIGRhIGxlaSBwYXJhIHZlciBvIGltcGFjdG8gZXN0aW1hZG8uLi48L3NwYW4+JzsgcmV0dXJuOyB9CiAgICBjb25zdCBmaW5hbERlbHRhcyA9IHBvbGFyaXR5PT09J29wb3N0YScgPyBuZWdhdGVEZWx0YXMoYmFzZUFuYWx5c2lzLmRlbHRhcykgOiBiYXNlQW5hbHlzaXMuZGVsdGFzOwogICAgY29uc3QgcGlsbHMgPSBPYmplY3QuZW50cmllcyhmaW5hbERlbHRhcykuZmlsdGVyKChbayx2XSk9PnYhPT0wKS5tYXAoKFtrLHZdKT0+ewogICAgICBjb25zdCBtZXRhID0gUkVTX01FVEEu",
"ZmluZChyPT5yWzBdPT09ayk7CiAgICAgIGNvbnN0IGxhYmVsID0gbWV0YSA/IG1ldGFbMV0gOiBrOwogICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPSJlZmYtcGlsbCAke3Y+MD8ncG9zJzonbmVnJ30iPiR7bGFiZWx9ICR7dj4wPycrJzonJ30ke3Z9PC9zcGFuPmA7CiAgICB9KS5qb2luKCcnKTsKICAgIGJveC5pbm5lckhUTUwgPSBgCiAgICAgIDxkaXYgY2xhc3M9Imxhdy1lZmZlY3RzIiBzdHlsZT0ibWFyZ2luLWJvdHRvbTo4cHg7Ij4ke3BpbGxzIHx8ICc8c3BhbiBjbGFzcz0iZWZmLXBpbGwiPlNlbSBpbXBhY3RvIGNsYXJv",
"IOKAlCBkZXRhbGhlIG1haXMgbyB0ZXh0bzwvc3Bhbj4nfTwvZGl2PgogICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6MTAuNXB4OyBjb2xvcjp2YXIoLS1pbmstZGltbWVyKTsiPlBhZHLDtWVzIGlkZW50aWZpY2Fkb3M6ICR7YmFzZUFuYWx5c2lzLm1hdGNoZWQuam9pbignLCAnKX0ke3BvbGFyaXR5PT09J29wb3N0YScgPyAnIMK3IGVmZWl0b3MgaW52ZXJ0aWRvcyAodmVyc8OjbyBsaWJlcmFsaXphbnRlKScgOiAnJ30ke2FjdGl2ZVByZXNldEtleSA/ICcgwrcgZGVjcmV0byB2aW5jdWxhZG8g4oCUIHRleHRvIHNlIGFqdXN0",
"YSDDoCBzZXZlcmlkYWRlJyA6ICcnfTwvZGl2PgogICAgYDsKICB9CgogIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2xTZXZlcml0eScpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCk9PnsKICAgIGlmKGFjdGl2ZVByZXNldEtleSl7CiAgICAgIGNvbnN0IHByZXNldCA9IFBSRVNFVF9MQVdTLmZpbmQocD0+cC5rZXk9PT1hY3RpdmVQcmVzZXRLZXkpOwogICAgICBpZihwcmVzZXQpewogICAgICAgIGNvbnN0IHNldiA9IHBhcnNlSW50KG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2xTZXZlcml0eScpLnZhbHVlLDEwKTsKICAg",
"ICAgICBjb25zdCBidWlsdCA9IHBvbGFyaXR5PT09J29wb3N0YScgPyBidWlsZE9wcG9zaXRlRnJvbVByZXNldChwcmVzZXQsIHNldikgOiBidWlsZExhd0Zyb21QcmVzZXQocHJlc2V0LCBzZXYpOwogICAgICAgIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2xUZXh0JykudmFsdWUgPSBidWlsdC50ZXh0OwogICAgICAgIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2xOYW1lJykudmFsdWUgPSBidWlsdC5uYW1lOwogICAgICB9CiAgICB9CiAgICByZWNvbXB1dGVCYXNlQW5hbHlzaXMoKTsKICAgIHVwZGF0ZVByZXZpZXcoKTsKICB9",
"KTsKICBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNsVGV4dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCk9PnsKICAgIGFjdGl2ZVByZXNldEtleSA9IG51bGw7CiAgICByZW5kZXJQcmVzZXRzKCk7CiAgICByZWNvbXB1dGVCYXNlQW5hbHlzaXMoKTsKICAgIHVwZGF0ZVByZXZpZXcoKTsKICB9KTsKCiAgb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjbENhbmNlbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiBvdmVybGF5LnJlbW92ZSgpKTsKICBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNsQ3JlYXRlJykuYWRk",
"RXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+ewogICAgY29uc3QgbmFtZSA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2xOYW1lJykudmFsdWUudHJpbSgpOwogICAgY29uc3QgdGV4dCA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2xUZXh0JykudmFsdWUudHJpbSgpOwogICAgY29uc3Qgc2V2ZXJpdHkgPSBwYXJzZUludChvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNsU2V2ZXJpdHknKS52YWx1ZSwxMCk7CiAgICBpZighbmFtZSB8fCAhdGV4dCl7IHRvYXN0KCdQcmVlbmNoYSBub21lIGUgdGV4dG8gZGEgbGVpLicpOyByZXR1",
"cm47IH0KICAgIGlmKCFiYXNlQW5hbHlzaXMpIHJlY29tcHV0ZUJhc2VBbmFseXNpcygpOwogICAgY29uc3QgZmluYWxEZWx0YXMgPSBwb2xhcml0eT09PSdvcG9zdGEnID8gbmVnYXRlRGVsdGFzKGJhc2VBbmFseXNpcy5kZWx0YXMpIDogYmFzZUFuYWx5c2lzLmRlbHRhczsKICAgIGNvbnN0IG1hdGNoZWQgPSBiYXNlQW5hbHlzaXMubWF0Y2hlZC5tYXAobT0+IHBvbGFyaXR5PT09J29wb3N0YScgPyBtKycgKGludmVydGlkbyknIDogbSk7CiAgICBjb25zdCBsYXcgPSB7IGlkOiB1aWQoJ2xhdycpLCBuYW1lLCB0ZXh0LCBzZXZl",
"cml0eSwgZGVsdGFzOiBmaW5hbERlbHRhcywgbWF0Y2hlZCB9OwogICAgaWYobW9kZT09PSdmYWN0aW9uJyl7CiAgICAgIGNvbnN0IGZhYyA9IGdldEZhY3Rpb24oZmFjdGlvbklkKTsKICAgICAgZmFjLmxhd3MucHVzaChsYXcpOwogICAgICBwbGFuZXRzT2ZGYWN0aW9uKGZhYy5pZCkuZm9yRWFjaChwPT4gcHVzaE5ld3MocCwgZ2VuZXJhdGVOZXdzRm9yTGF3KGxhdywgcC5uYW1lKSkpOwogICAgfSBlbHNlIHsKICAgICAgY29uc3QgcGwgPSBnZXRQbGFuZXQocGxhbmV0SWQpOwogICAgICBwbC5sYXdzLnB1c2gobGF3KTsKICAg",
"ICAgcHVzaE5ld3MocGwsIGdlbmVyYXRlTmV3c0ZvckxhdyhsYXcsIHBsLm5hbWUpKTsKICAgIH0KICAgIHBlcnNpc3RBdXRvc2F2ZSgpOwogICAgb3ZlcmxheS5yZW1vdmUoKTsKICAgIHJlbmRlcigpOwogICAgdG9hc3QoJ0xlaSBwcm9tdWxnYWRhOiAnK25hbWUpOwogIH0pOwogIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI2xOYW1lJykuZm9jdXMoKTsKfQoKLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIFNBTFZBUiAvIENBUlJFR0FSIChtw7psdGlwbG9z",
"IHNsb3RzKQo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KZnVuY3Rpb24gb3BlblNhdmVNb2RhbCgpewogIGNvbnN0IHNsb3RzID0gbG9hZFNsb3RzKCk7CiAgY29uc3Qgcm93cyA9IHNsb3RzLm1hcChzPT5gCiAgICA8ZGl2IGNsYXNzPSJzbG90LXJvdyI+CiAgICAgIDxkaXYgY2xhc3M9InNpbmZvIj48c3BhbiBjbGFzcz0ic25hbWUiPiR7ZXNjYXBlSHRtbChzLm5hbWUpfTwvc3Bhbj48c3BhbiBjbGFzcz0ic21ldGEiPiR7Zm10RGF0ZShzLnNhdmVkQXQpfSDC",
"tyAke3MuZGF0YS5mYWN0aW9ucy5sZW5ndGh9IGZhY8Onw7VlcyDCtyAke3MuZGF0YS5wbGFuZXRzLmxlbmd0aH0gbXVuZG9zPC9zcGFuPjwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJzYWN0aW9ucyI+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biBzbWFsbCIgZGF0YS1hY3Q9Im92ZXJ3cml0ZSIgZGF0YS1pZD0iJHtzLmlkfSIgdHlwZT0iYnV0dG9uIj5Tb2JyZXNjcmV2ZXI8L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJoYnRuIHNtYWxsIGRhbmdlciIgZGF0YS1hY3Q9ImRlbGV0ZSIgZGF0YS1pZD0iJHtzLmlk",
"fSIgdHlwZT0iYnV0dG9uIj5FeGNsdWlyPC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgYCkuam9pbignJyk7CiAgY29uc3Qgb3ZlcmxheSA9IG9wZW5Nb2RhbChgCiAgICA8c3BhbiBjbGFzcz0iY2xvc2UteCI+4pyVPC9zcGFuPgogICAgPGgzPlNhbHZhciBSZWdpc3RybzwvaDM+CiAgICA8ZGl2IGNsYXNzPSJtb2RhbC1zdWIiPlNhbHZlIG8gZXN0YWRvIGF0dWFsIGRvIHNldG9yIGVtIHVtIG5vdm8gcmVnaXN0cm8sIG91IHNvYnJlc2NyZXZhIHVtIGV4aXN0ZW50ZS48L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImZp",
"ZWxkIj4KICAgICAgPGxhYmVsPk5vbWUgZG8gbm92byByZWdpc3RybzwvbGFiZWw+CiAgICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0ic2F2ZU5hbWUiIHBsYWNlaG9sZGVyPSJFeDogQ2FtcGFuaGEgQm9yZGFzIEV4dGVyaW9yZXMiIHZhbHVlPSJSZWdpc3RybyAke25ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdwdC1CUicpfSI+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9Im1vZGFsLWFjdGlvbnMiIHN0eWxlPSJqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDsgbWFyZ2luLXRvcDowOyBtYXJnaW4tYm90dG9tOjE4",
"cHg7Ij4KICAgICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biBwcmltYXJ5IiBpZD0ic2F2ZU5ld0J0biIgdHlwZT0iYnV0dG9uIj5TYWx2YXIgQ29tbyBOb3ZvPC9idXR0b24+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImZpZWxkIj4KICAgICAgPGxhYmVsPlJlZ2lzdHJvcyBleGlzdGVudGVzICgke3Nsb3RzLmxlbmd0aH0pPC9sYWJlbD4KICAgICAgPGRpdiBjbGFzcz0ic2xvdC1saXN0IiBpZD0ic2xvdExpc3QiPiR7cm93cyB8fCAnPGRpdiBjbGFzcz0iZW1wdHktYmxvY2siPk5lbmh1bSByZWdpc3RybyBzYWx2byBhaW5kYS48",
"L2Rpdj4nfTwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJtb2RhbC1hY3Rpb25zIj4KICAgICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biIgaWQ9InNhdmVDbG9zZUJ0biIgdHlwZT0iYnV0dG9uIj5GZWNoYXI8L2J1dHRvbj4KICAgIDwvZGl2PgogIGApOwogIG92ZXJsYXkucXVlcnlTZWxlY3RvcignI3NhdmVDbG9zZUJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiBvdmVybGF5LnJlbW92ZSgpKTsKICBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNzYXZlTmV3QnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xp",
"Y2snLCAoKT0+ewogICAgY29uc3QgbmFtZSA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignI3NhdmVOYW1lJykudmFsdWUudHJpbSgpOwogICAgaWYoIW5hbWUpeyB0b2FzdCgnRMOqIHVtIG5vbWUgYW8gcmVnaXN0cm8uJyk7IHJldHVybjsgfQogICAgY29uc3QgY3VycmVudFNsb3RzID0gbG9hZFNsb3RzKCk7CiAgICBjdXJyZW50U2xvdHMucHVzaCh7IGlkOiB1aWQoJ3Nsb3QnKSwgbmFtZSwgc2F2ZWRBdDogRGF0ZS5ub3coKSwgZGF0YTogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh7ZmFjdGlvbnM6c3RhdGUuZmFjdGlvbnMs",
"IHBsYW5ldHM6c3RhdGUucGxhbmV0c30pKSB9KTsKICAgIHBlcnNpc3RTbG90cyhjdXJyZW50U2xvdHMpOwogICAgb3ZlcmxheS5yZW1vdmUoKTsKICAgIHRvYXN0KCdSZWdpc3RybyBzYWx2bzogJytuYW1lKTsKICB9KTsKICBjb25zdCBsaXN0ID0gb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjc2xvdExpc3QnKTsKICBpZihsaXN0KXsKICAgIGxpc3QucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWN0PSJvdmVyd3JpdGUiXScpLmZvckVhY2goYnRuPT57CiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57CiAg",
"ICAgICAgY29uc3QgaWQgPSBidG4uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7CiAgICAgICAgY29uZmlybU1vZGFsKHt0aXRsZTonU29icmVzY3JldmVyIFJlZ2lzdHJvJywgbWVzc2FnZTonU3Vic3RpdHVpciBlc3RlIHJlZ2lzdHJvIHBlbG8gZXN0YWRvIGF0dWFsIGRvIHNldG9yPycsIGNvbmZpcm1MYWJlbDonU29icmVzY3JldmVyJywgZGFuZ2VyOmZhbHNlfSwgKCk9PnsKICAgICAgICAgIGNvbnN0IGN1cnJlbnRTbG90cyA9IGxvYWRTbG90cygpOwogICAgICAgICAgY29uc3Qgc2xvdCA9IGN1cnJlbnRTbG90cy5maW5kKHM9",
"PnMuaWQ9PT1pZCk7CiAgICAgICAgICBpZihzbG90KXsKICAgICAgICAgICAgc2xvdC5kYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh7ZmFjdGlvbnM6c3RhdGUuZmFjdGlvbnMsIHBsYW5ldHM6c3RhdGUucGxhbmV0c30pKTsKICAgICAgICAgICAgc2xvdC5zYXZlZEF0ID0gRGF0ZS5ub3coKTsKICAgICAgICAgICAgcGVyc2lzdFNsb3RzKGN1cnJlbnRTbG90cyk7CiAgICAgICAgICAgIHRvYXN0KCdSZWdpc3RybyBzb2JyZXNjcml0by4nKTsKICAgICAgICAgIH0KICAgICAgICAgIG92ZXJsYXkucmVtb3ZlKCk7CiAg",
"ICAgICAgfSk7CiAgICAgIH0pOwogICAgfSk7CiAgICBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjdD0iZGVsZXRlIl0nKS5mb3JFYWNoKGJ0bj0+ewogICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+ewogICAgICAgIGNvbnN0IGlkID0gYnRuLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpOwogICAgICAgIGNvbmZpcm1Nb2RhbCh7dGl0bGU6J0V4Y2x1aXIgUmVnaXN0cm8nLCBtZXNzYWdlOidFeGNsdWlyIGVzdGUgcmVnaXN0cm8gc2Fsdm8gcGVybWFuZW50ZW1lbnRlPycsIGNvbmZpcm1MYWJlbDon",
"RXhjbHVpcid9LCAoKT0+ewogICAgICAgICAgcGVyc2lzdFNsb3RzKGxvYWRTbG90cygpLmZpbHRlcihzPT5zLmlkIT09aWQpKTsKICAgICAgICAgIG92ZXJsYXkucmVtb3ZlKCk7CiAgICAgICAgICBvcGVuU2F2ZU1vZGFsKCk7CiAgICAgICAgfSk7CiAgICAgIH0pOwogICAgfSk7CiAgfQp9CgpmdW5jdGlvbiBvcGVuTG9hZE1vZGFsKCl7CiAgY29uc3Qgc2xvdHMgPSBsb2FkU2xvdHMoKTsKICBjb25zdCByb3dzID0gc2xvdHMubWFwKHM9PmAKICAgIDxkaXYgY2xhc3M9InNsb3Qtcm93Ij4KICAgICAgPGRpdiBjbGFzcz0ic2lu",
"Zm8iPjxzcGFuIGNsYXNzPSJzbmFtZSI+JHtlc2NhcGVIdG1sKHMubmFtZSl9PC9zcGFuPjxzcGFuIGNsYXNzPSJzbWV0YSI+JHtmbXREYXRlKHMuc2F2ZWRBdCl9IMK3ICR7cy5kYXRhLmZhY3Rpb25zLmxlbmd0aH0gZmFjw6fDtWVzIMK3ICR7cy5kYXRhLnBsYW5ldHMubGVuZ3RofSBtdW5kb3M8L3NwYW4+PC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InNhY3Rpb25zIj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJoYnRuIHNtYWxsIHByaW1hcnkiIGRhdGEtYWN0PSJsb2FkIiBkYXRhLWlkPSIke3MuaWR9IiB0eXBlPSJidXR0b24i",
"PkNhcnJlZ2FyPC9idXR0b24+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iaGJ0biBzbWFsbCBkYW5nZXIiIGRhdGEtYWN0PSJkZWxldGUiIGRhdGEtaWQ9IiR7cy5pZH0iIHR5cGU9ImJ1dHRvbiI+RXhjbHVpcjwvYnV0dG9uPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogIGApLmpvaW4oJycpOwogIGNvbnN0IG92ZXJsYXkgPSBvcGVuTW9kYWwoYAogICAgPHNwYW4gY2xhc3M9ImNsb3NlLXgiPuKclTwvc3Bhbj4KICAgIDxoMz5DYXJyZWdhciBSZWdpc3RybzwvaDM+CiAgICA8ZGl2IGNsYXNzPSJtb2RhbC1zdWIiPkNhcnJlZ2Fy",
"IHVtIHJlZ2lzdHJvIHN1YnN0aXR1aSBvIGVzdGFkbyBhdHVhbCBkbyBzZXRvci4gU2FsdmUgYW50ZXMsIHNlIG5lY2Vzc8OhcmlvLjwvZGl2PgogICAgPGRpdiBjbGFzcz0iZmllbGQiPjxkaXYgY2xhc3M9InNsb3QtbGlzdCI+JHtyb3dzIHx8ICc8ZGl2IGNsYXNzPSJlbXB0eS1ibG9jayI+TmVuaHVtIHJlZ2lzdHJvIHNhbHZvIGFpbmRhLiBVc2UgIlNhbHZhciIgcHJpbWVpcm8uPC9kaXY+J308L2Rpdj48L2Rpdj4KICAgIDxkaXYgY2xhc3M9Im1vZGFsLWFjdGlvbnMiPjxidXR0b24gY2xhc3M9ImhidG4iIGlkPSJsb2FkQ2xv",
"c2VCdG4iIHR5cGU9ImJ1dHRvbiI+RmVjaGFyPC9idXR0b24+PC9kaXY+CiAgYCk7CiAgb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjbG9hZENsb3NlQnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IG92ZXJsYXkucmVtb3ZlKCkpOwogIG92ZXJsYXkucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWN0PSJsb2FkIl0nKS5mb3JFYWNoKGJ0bj0+ewogICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PnsKICAgICAgY29uc3QgaWQgPSBidG4uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7CiAgICAgIGNvbmZp",
"cm1Nb2RhbCh7dGl0bGU6J0NhcnJlZ2FyIFJlZ2lzdHJvJywgbWVzc2FnZTonSXNzbyBzdWJzdGl0dWlyw6EgbyBlc3RhZG8gYXR1YWwgZG8gc2V0b3IgcGVsbyByZWdpc3RybyBzYWx2by4gQ29udGludWFyPycsIGNvbmZpcm1MYWJlbDonQ2FycmVnYXInLCBkYW5nZXI6ZmFsc2V9LCAoKT0+ewogICAgICAgIGNvbnN0IHNsb3QgPSBsb2FkU2xvdHMoKS5maW5kKHM9PnMuaWQ9PT1pZCk7CiAgICAgICAgaWYoc2xvdCl7CiAgICAgICAgICBzdGF0ZS5mYWN0aW9ucyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc2xvdC5kYXRh",
"LmZhY3Rpb25zKSk7CiAgICAgICAgICBzdGF0ZS5wbGFuZXRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzbG90LmRhdGEucGxhbmV0cykpOwogICAgICAgICAgc3RhdGUudmlldyA9IHtzY3JlZW46J2hvbWUnfTsKICAgICAgICAgIHBlcnNpc3RBdXRvc2F2ZSgpOwogICAgICAgICAgcmVuZGVyKCk7CiAgICAgICAgICB0b2FzdCgnUmVnaXN0cm8gY2FycmVnYWRvOiAnK3Nsb3QubmFtZSk7CiAgICAgICAgfQogICAgICAgIG92ZXJsYXkucmVtb3ZlKCk7CiAgICAgIH0pOwogICAgfSk7CiAgfSk7CiAgb3ZlcmxheS5xdWVy",
"eVNlbGVjdG9yQWxsKCdbZGF0YS1hY3Q9ImRlbGV0ZSJdJykuZm9yRWFjaChidG49PnsKICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57CiAgICAgIGNvbnN0IGlkID0gYnRuLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpOwogICAgICBjb25maXJtTW9kYWwoe3RpdGxlOidFeGNsdWlyIFJlZ2lzdHJvJywgbWVzc2FnZTonRXhjbHVpciBlc3RlIHJlZ2lzdHJvIHNhbHZvIHBlcm1hbmVudGVtZW50ZT8nLCBjb25maXJtTGFiZWw6J0V4Y2x1aXInfSwgKCk9PnsKICAgICAgICBwZXJzaXN0U2xvdHMobG9hZFNsb3Rz",
"KCkuZmlsdGVyKHM9PnMuaWQhPT1pZCkpOwogICAgICAgIG92ZXJsYXkucmVtb3ZlKCk7CiAgICAgICAgb3BlbkxvYWRNb2RhbCgpOwogICAgICB9KTsKICAgIH0pOwogIH0pOwp9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgVE9BU1QKPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCmxldCB0b2FzdFRpbWVyOwpmdW5jdGlvbiB0b2FzdChtc2cpewogIGNvbnN0IHQgPSBkb2N1bWVudC5n",
"ZXRFbGVtZW50QnlJZCgndG9hc3QnKTsKICB0LnRleHRDb250ZW50ID0gbXNnOwogIHQuY2xhc3NMaXN0LmFkZCgnc2hvdycpOwogIGNsZWFyVGltZW91dCh0b2FzdFRpbWVyKTsKICB0b2FzdFRpbWVyID0gc2V0VGltZW91dCgoKT0+IHQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpLCAyNjAwKTsKfQoKLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIEJPT1QKPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09",
"PT09ICovCmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5OZXdGYWN0aW9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuRmFjdGlvbk1vZGFsKTsKZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bk5ld1BsYW5ldEdsb2JhbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiBvcGVuUGxhbmV0R2xvYmFsTW9kYWwoKSk7CmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5TYXZlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuU2F2ZU1vZGFsKTsKZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0",
"bkxvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Mb2FkTW9kYWwpOwpkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuUmVzZXQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57CiAgY29uZmlybU1vZGFsKHt0aXRsZTonTGltcGFyIFR1ZG8nLCBtZXNzYWdlOidJc3NvIGFwYWdhcsOhIHRvZGFzIGFzIGZhY8Onw7VlcyBlIHBsYW5ldGFzIGRvIGVzdGFkbyBhdHVhbCAocmVnaXN0cm9zIHNhbHZvcyBuw6NvIHPDo28gYWZldGFkb3MpLiBDb250aW51YXI/JywgY29uZmlybUxhYmVsOidBcGFnYXIgVHVk",
"byd9LCAoKT0+ewogICAgc3RhdGUgPSBlbXB0eVN0YXRlKCk7CiAgICBwZXJzaXN0QXV0b3NhdmUoKTsKICAgIHJlbmRlcigpOwogIH0pOwp9KTsKCmZ1bmN0aW9uIG1pZ3JhdGVTdGF0ZSgpewogIHN0YXRlLnBsYW5ldHMuZm9yRWFjaChwPT57CiAgICBpZighcC5iYXNlUmVzb3VyY2VzKSBwLmJhc2VSZXNvdXJjZXMgPSB7fTsKICAgIFJFU19LRVlTLmZvckVhY2goaz0+eyBpZih0eXBlb2YgcC5iYXNlUmVzb3VyY2VzW2tdICE9PSAnbnVtYmVyJykgcC5iYXNlUmVzb3VyY2VzW2tdID0gNTA7IH0pOwogICAgaWYoIUFycmF5Lmlz",
"QXJyYXkocC5uZXdzKSkgcC5uZXdzID0gW107CiAgfSk7CiAgc3RhdGUuZmFjdGlvbnMuZm9yRWFjaChmPT57CiAgICBpZighZi5hbGxlZ2lhbmNlKSBmLmFsbGVnaWFuY2UgPSAnYmx1ZSc7CiAgICBpZighZi5sZWFkZXJzKSBmLmxlYWRlcnMgPSBbXTsKICB9KTsKICBpZighc3RhdGUudmlldykgc3RhdGUudmlldyA9IHtzY3JlZW46J2hvbWUnfTsKfQoKLy8gc2VlZCBkZSBleGVtcGxvIG5hIHByaW1laXJhIHZpc2l0YQppZihzdGF0ZS5mYWN0aW9ucy5sZW5ndGg9PT0wICYmIHN0YXRlLnBsYW5ldHMubGVuZ3RoPT09MCl7CiAg",
"Y29uc3QgZiA9IHsgaWQ6IHVpZCgnZmFjJyksIG5hbWU6J0ltcMOpcmlvIEdhbMOhY3RpY28nLCBhbGxlZ2lhbmNlOidyZWQnLCBsZWFkZXJzOlsnR3JhbmQgTW9mZiBUYXJraW4nXSwgbGF3czpbXSB9OwogIGNvbnN0IHtkZWx0YXM6IGZkLCBtYXRjaGVkOiBmbX0gPSBhbmFseXplTGF3VGV4dCgnTyBJbXBlcmFkb3IgZGV0w6ltIHBvZGVyIGFic29sdXRvIGUgbWFudMOpbSB0cmlidW5haXMgbWFyY2lhaXMgcGFyYSBqdWxnYXIgdHJhaWRvcmVzIHN1bWFyaWFtZW50ZS4nLCA1KTsKICBmLmxhd3MucHVzaCh7aWQ6dWlkKCdsYXcn",
"KSwgbmFtZTonw4lkaXRvIGRlIEF1dG9yaWRhZGUgSW1wZXJpYWwnLCB0ZXh0OidPIEltcGVyYWRvciBkZXTDqW0gcG9kZXIgYWJzb2x1dG8gZSBtYW50w6ltIHRyaWJ1bmFpcyBtYXJjaWFpcyBwYXJhIGp1bGdhciB0cmFpZG9yZXMgc3VtYXJpYW1lbnRlLicsIHNldmVyaXR5OjUsIGRlbHRhczpmZCwgbWF0Y2hlZDpmbX0pOwogIHN0YXRlLmZhY3Rpb25zLnB1c2goZik7CgogIGNvbnN0IHAgPSB7IGlkOiB1aWQoJ3BsJyksIG5hbWU6J0NvcnVzY2FudCcsIGZhY3Rpb25JZDpmLmlkLCBydWxlcnM6WydHb3Zlcm5hZG9yIFJlaXMg",
"VmFudGVsJ10sIGJhc2VSZXNvdXJjZXM6bmV3UGxhbmV0UmVzb3VyY2VzKCksIGxhd3M6W10sIG5ld3M6W10gfTsKICBjb25zdCB7ZGVsdGFzLCBtYXRjaGVkfSA9IGFuYWx5emVMYXdUZXh0KCdPIGdvdmVybm8gZXN0YWJlbGVjZSBpbXBvc3RvcyBwZXNhZG9zIHNvYnJlIG8gY29tw6lyY2lvIGV4dGVyaW9yIGUgbWFudMOpbSBhIHBvbMOtY2lhIHZpZ2lhbmRvIG9zIHBvcnRvcy4nLCA0KTsKICBwLmxhd3MucHVzaCh7aWQ6dWlkKCdsYXcnKSwgbmFtZTonVGFyaWZhcyBQb3J0dcOhcmlhcycsIHRleHQ6J08gZ292ZXJubyBlc3Rh",
"YmVsZWNlIGltcG9zdG9zIHBlc2Fkb3Mgc29icmUgbyBjb23DqXJjaW8gZXh0ZXJpb3IgZSBtYW50w6ltIGEgcG9sw61jaWEgdmlnaWFuZG8gb3MgcG9ydG9zLicsIHNldmVyaXR5OjQsIGRlbHRhcywgbWF0Y2hlZH0pOwogIHB1c2hTaW1wbGVOZXdzKHAsICdDb3J1c2NhbnQgw6kgYW5leGFkbyBhbyBJbXDDqXJpbyBHYWzDoWN0aWNvJywgJ08gYW50aWdvIGNlbnRybyBkbyBTZW5hZG8gYWdvcmEgb3BlcmEgc29iIGFkbWluaXN0cmHDp8OjbyBpbXBlcmlhbCBkaXJldGEuJywgJ25ldXRyYWwnKTsKICBwdXNoTmV3cyhwLCBnZW5l",
"cmF0ZU5ld3NGb3JMYXcoe25hbWU6J8OJZGl0byBkZSBBdXRvcmlkYWRlIEltcGVyaWFsJywgZGVsdGFzOiBmZCwgc2V2ZXJpdHk6NX0sIHAubmFtZSkpOwogIHB1c2hOZXdzKHAsIGdlbmVyYXRlTmV3c0Zvckxhdyh7bmFtZTonVGFyaWZhcyBQb3J0dcOhcmlhcycsIGRlbHRhcywgc2V2ZXJpdHk6NH0sIHAubmFtZSkpOwogIHN0YXRlLnBsYW5ldHMucHVzaChwKTsKCiAgcGVyc2lzdEF1dG9zYXZlKCk7Cn0KCm1pZ3JhdGVTdGF0ZSgpOwpyZW5kZXIoKTsKPC9zY3JpcHQ+CjwvYm9keT4KPC9odG1sPgo="
];
const EMBED_EMPRESAS_B64 = [
"PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9InB0LUJSIj4KPGhlYWQ+CjxtZXRhIGNoYXJzZXQ9IlVURi04IiAvPgo8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCIgLz4KPHRpdGxlPlJlZ2lzdHJvIGRlIENvbcOpcmNpbyDigJQgR2VzdMOjbyBkZSBFbXByZXNhcyBSUEc8L3RpdGxlPgoKPCEtLSBUYWlsd2luZCAodXRpbGl0w6FyaW8gdmlhIENETiwgc2VtIGJ1aWxkKSAtLT4KPHNjcmlwdCBzcmM9Imh0dHBzOi8vY2RuLnRhaWx3aW5kY3NzLmNvbSI+",
"PC9zY3JpcHQ+Cgo8IS0tIFJlYWN0ICsgUmVhY3RET00gKFVNRCwgdmVyc8OjbyBmaXhhIHZpYSBqc0RlbGl2cikgLS0+CjxzY3JpcHQgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3JlYWN0QDE4LjIuMC91bWQvcmVhY3QucHJvZHVjdGlvbi5taW4uanMiIGNyb3Nzb3JpZ2luPjwvc2NyaXB0Pgo8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9yZWFjdC1kb21AMTguMi4wL3VtZC9yZWFjdC1kb20ucHJvZHVjdGlvbi5taW4uanMiIGNyb3Nzb3JpZ2luPjwvc2NyaXB0PgoKPCEtLSBCYWJl",
"bCBTdGFuZGFsb25lOiB0cmFuc2Zvcm1hIG8gSlNYIGFiYWl4byBkaXJldG8gbm8gbmF2ZWdhZG9yLCBzZW0gcHJlY2lzYXIgZGUgYnVpbGQgLS0+CjxzY3JpcHQgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL0BiYWJlbC9zdGFuZGFsb25lQDcuMjQuNy9iYWJlbC5taW4uanMiIGNyb3Nzb3JpZ2luPjwvc2NyaXB0PgoKPHN0eWxlPgogIEBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU9yYml0cm9uOndnaHRANTAwOzcwMDs5MDAmZmFtaWx5PVJhamRoYW5pOndnaHRA",
"NDAwOzUwMDs2MDA7NzAwJmRpc3BsYXk9c3dhcCcpOwoKICBodG1sLCBib2R5IHsKICAgIG1hcmdpbjogMDsKICAgIHBhZGRpbmc6IDA7CiAgICBiYWNrZ3JvdW5kOiAjMDQwNjBjOwogICAgb3ZlcmZsb3cteTogYXV0bzsKICAgIG92ZXJmbG93LXg6IGhpZGRlbjsKICB9CiAgI3Jvb3QgeyBtaW4taGVpZ2h0OiAxMDB2aDsgfQoKICAuaG9sby1yb290IHsKICAgIGZvbnQtZmFtaWx5OiAnUmFqZGhhbmknLCAnSW50ZXInLCBzeXN0ZW0tdWksIHNhbnMtc2VyaWY7CiAgICBiYWNrZ3JvdW5kOgogICAgICByYWRpYWwtZ3JhZGllbnQo",
"ZWxsaXBzZSA4MCUgNTAlIGF0IDUwJSAtMTAlLCByZ2JhKDU2LDE4OSwyNDgsMC4xMCksIHRyYW5zcGFyZW50IDYwJSksCiAgICAgIHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIDYwJSA0MCUgYXQgOTAlIDEwMCUsIHJnYmEoMjQ0LDYzLDk0LDAuMDgpLCB0cmFuc3BhcmVudCA2MCUpLAogICAgICBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMDQwNjBjIDAlLCAjMDYwYTE0IDEwMCUpOwogICAgbWluLWhlaWdodDogMTAwdmg7CiAgICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgfQoKICAuaG9sby1ncmlkLW92ZXJsYXkgewogICAgcG9z",
"aXRpb246IGZpeGVkOwogICAgaW5zZXQ6IDA7CiAgICBwb2ludGVyLWV2ZW50czogbm9uZTsKICAgIHotaW5kZXg6IDA7CiAgICBiYWNrZ3JvdW5kLWltYWdlOgogICAgICBsaW5lYXItZ3JhZGllbnQocmdiYSg1NiwxODksMjQ4LDAuMDUpIDFweCwgdHJhbnNwYXJlbnQgMXB4KSwKICAgICAgbGluZWFyLWdyYWRpZW50KDkwZGVnLCByZ2JhKDU2LDE4OSwyNDgsMC4wNSkgMXB4LCB0cmFuc3BhcmVudCAxcHgpOwogICAgYmFja2dyb3VuZC1zaXplOiA0MnB4IDQycHg7CiAgICBtYXNrLWltYWdlOiByYWRpYWwtZ3JhZGllbnQoZWxs",
"aXBzZSA5MCUgNzAlIGF0IDUwJSAwJSwgYmxhY2sgNDAlLCB0cmFuc3BhcmVudCA5MCUpOwogIH0KCiAgLmhvbG8tc2NhbmxpbmVzIHsKICAgIHBvc2l0aW9uOiBmaXhlZDsKICAgIGluc2V0OiAwOwogICAgcG9pbnRlci1ldmVudHM6IG5vbmU7CiAgICB6LWluZGV4OiAxOwogICAgYmFja2dyb3VuZDogcmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudCgKICAgICAgdG8gYm90dG9tLAogICAgICByZ2JhKDI1NSwyNTUsMjU1LDAuMDE4KSAwcHgsCiAgICAgIHJnYmEoMjU1LDI1NSwyNTUsMC4wMTgpIDFweCwKICAgICAgdHJhbnNwYXJl",
"bnQgMnB4LAogICAgICB0cmFuc3BhcmVudCAzcHgKICAgICk7CiAgICBhbmltYXRpb246IGhvbG8tZmxpY2tlciA2cyBpbmZpbml0ZSBzdGVwcygzMCk7CiAgICBvcGFjaXR5OiAwLjU7CiAgfQoKICBAa2V5ZnJhbWVzIGhvbG8tZmxpY2tlciB7CiAgICAwJSwgOTYlLCAxMDAlIHsgb3BhY2l0eTogMC40NTsgfQogICAgOTclIHsgb3BhY2l0eTogMC4yOyB9CiAgICA5OCUgeyBvcGFjaXR5OiAwLjU1OyB9CiAgfQoKICBoMSwgaDIsIGgzLCBoNCwgbmF2IGJ1dHRvbiwgLmhvbG8tdGl0bGUsIC5ob2xvLWJ0bi1wcmltYXJ5IHsKICAg",
"IGZvbnQtZmFtaWx5OiAnT3JiaXRyb24nLCBzYW5zLXNlcmlmOwogICAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTsKICB9CgogIC5ob2xvLXRpdGxlIHsKICAgIGNvbG9yOiAjYmVlOWZmOwogICAgdGV4dC1zaGFkb3c6IDAgMCAxMnB4IHJnYmEoNTYsMTg5LDI0OCwwLjU1KSwgMCAwIDMwcHggcmdiYSg1NiwxODksMjQ4LDAuMTUpOwogIH0KCiAgLnRleHQtaG9sby1wcmltYXJ5IHsgY29sb3I6ICNkZmYzZmY7IH0KICAudGV4dC1ob2xvLXNlY29uZGFyeSB7IGNvbG9yOiAjYTljN2RlOyB9CiAgLnRleHQtaG9sby1tdXRlZCB7IGNv",
"bG9yOiAjN2I5M2E4OyB9CiAgLnRleHQtaG9sby1mYWludCB7IGNvbG9yOiAjNTI2OTdjOyB9CgogIC5ob2xvLXBhbmVsIHsKICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsIHJnYmEoMTMsMjYsNDMsMC43NSksIHJnYmEoNiwxMiwyMiwwLjc1KSk7CiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDU2LDE4OSwyNDgsMC4yMik7CiAgICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAwIHJnYmEoNTYsMTg5LDI0OCwwLjA4KSwgMCA4cHggMjRweCAtMTJweCByZ2JhKDAsMCwwLDAuNik7CiAgICBiYWNrZHJvcC1m",
"aWx0ZXI6IGJsdXIoNnB4KTsKICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsKICB9CiAgLmhvbG8tcGFuZWw6OmJlZm9yZSwgLmhvbG8tcGFuZWw6OmFmdGVyIHsKICAgIGNvbnRlbnQ6ICIiOwogICAgcG9zaXRpb246IGFic29sdXRlOwogICAgd2lkdGg6IDEwcHg7CiAgICBoZWlnaHQ6IDEwcHg7CiAgICBib3JkZXItY29sb3I6IHJnYmEoNTYsMTg5LDI0OCwwLjY1KTsKICAgIHBvaW50ZXItZXZlbnRzOiBub25lOwogIH0KICAuaG9sby1wYW5lbDo6YmVmb3JlIHsgdG9wOiAtMXB4OyBsZWZ0OiAtMXB4OyBib3JkZXItdG9wOiAycHgg",
"c29saWQ7IGJvcmRlci1sZWZ0OiAycHggc29saWQ7IH0KICAuaG9sby1wYW5lbDo6YWZ0ZXIgeyBib3R0b206IC0xcHg7IHJpZ2h0OiAtMXB4OyBib3JkZXItYm90dG9tOiAycHggc29saWQ7IGJvcmRlci1yaWdodDogMnB4IHNvbGlkOyB9CiAgLmhvbG8tcGFuZWw6aG92ZXIgewogICAgYm9yZGVyLWNvbG9yOiByZ2JhKDU2LDE4OSwyNDgsMC40NSk7CiAgICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAwIHJnYmEoNTYsMTg5LDI0OCwwLjEpLCAwIDAgMjJweCAtNnB4IHJnYmEoNTYsMTg5LDI0OCwwLjM1KTsKICB9CiAgLmhvbG8t",
"cGFuZWwtcmVkIHsgYm9yZGVyLWNvbG9yOiByZ2JhKDI0NCw2Myw5NCwwLjI4KTsgfQogIC5ob2xvLXBhbmVsLXJlZDo6YmVmb3JlLCAuaG9sby1wYW5lbC1yZWQ6OmFmdGVyIHsgYm9yZGVyLWNvbG9yOiByZ2JhKDI0NCw2Myw5NCwwLjcpOyB9CiAgLmhvbG8tcGFuZWwtcmVkOmhvdmVyIHsgYm9yZGVyLWNvbG9yOiByZ2JhKDI0NCw2Myw5NCwwLjU1KTsgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCByZ2JhKDI0NCw2Myw5NCwwLjEpLCAwIDAgMjJweCAtNnB4IHJnYmEoMjQ0LDYzLDk0LDAuNCk7IH0KCiAgLmhvbG8taGVhZGVy",
"IHsKICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsIHJnYmEoNiwxMiwyMiwwLjkyKSwgcmdiYSg2LDEyLDIyLDAuNzgpKTsKICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDU2LDE4OSwyNDgsMC4yNSk7CiAgICBib3gtc2hhZG93OiAwIDFweCAyNHB4IC00cHggcmdiYSg1NiwxODksMjQ4LDAuMTgpOwogICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEwcHgpOwogIH0KCiAgLmhvbG8tYnRuLXByaW1hcnkgewogICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzM4YmRmOCwg",
"IzBlYTVlOSk7CiAgICBjb2xvcjogIzA0MTAxODsKICAgIGZvbnQtd2VpZ2h0OiA3MDA7CiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOwogICAgYm94LXNoYWRvdzogMCAwIDE2cHggcmdiYSg1NiwxODksMjQ4LDAuNDUpLCBpbnNldCAwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsMC4yNSk7CiAgICB0cmFuc2l0aW9uOiBhbGwgMC4xNXMgZWFzZTsKICAgIGJvcmRlcjogbm9uZTsKICAgIGN1cnNvcjogcG9pbnRlcjsKICB9CiAgLmhvbG8tYnRuLXByaW1hcnk6aG92ZXIgewogICAgYm94LXNoYWRvdzogMCAwIDI2cHggcmdi",
"YSg1NiwxODksMjQ4LDAuNyksIGluc2V0IDAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwwLjMpOwogICAgZmlsdGVyOiBicmlnaHRuZXNzKDEuMDgpOwogIH0KCiAgLmhvbG8tdGFiLWFjdGl2ZSB7CiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMzhiZGY4LCAjMGVhNWU5KTsKICAgIGNvbG9yOiAjMDQxMDE4OwogICAgYm94LXNoYWRvdzogMCAwIDE0cHggcmdiYSg1NiwxODksMjQ4LDAuNTUpOwogICAgZm9udC13ZWlnaHQ6IDcwMDsKICB9CgogIC5ob2xvLXRvZ2dsZS1nbSB7CiAgICBiYWNrZ3JvdW5k",
"OiByZ2JhKDI0NCw2Myw5NCwwLjE0KTsKICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjQ0LDYzLDk0LDAuNSk7CiAgICBjb2xvcjogI2ZkYTRiMDsKICAgIGJveC1zaGFkb3c6IDAgMCAxNHB4IHJnYmEoMjQ0LDYzLDk0LDAuMyk7CiAgfQogIC5ob2xvLXRvZ2dsZS1wbGF5ZXIgewogICAgYmFja2dyb3VuZDogcmdiYSg1NiwxODksMjQ4LDAuMSk7CiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDU2LDE4OSwyNDgsMC40KTsKICAgIGNvbG9yOiAjN2RkM2ZjOwogICAgYm94LXNoYWRvdzogMCAwIDE0cHggcmdiYSg1NiwxODks",
"MjQ4LDAuMjIpOwogIH0KCiAgLmhvbG8taW5wdXQgewogICAgYmFja2dyb3VuZDogcmdiYSg0LDksMTYsMC43KTsKICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNTYsMTg5LDI0OCwwLjI4KTsKICAgIGNvbG9yOiAjZGZmM2ZmOwogIH0KICAuaG9sby1pbnB1dDpmb2N1cyB7CiAgICBvdXRsaW5lOiBub25lOwogICAgYm9yZGVyLWNvbG9yOiByZ2JhKDU2LDE4OSwyNDgsMC43KTsKICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDU2LDE4OSwyNDgsMC4xOCk7CiAgfQogIC5ob2xvLWlucHV0OjpwbGFjZWhvbGRlciB7IGNv",
"bG9yOiAjNTI2OTdjOyB9CgogIC5ob2xvLW1vZGFsIHsKICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsIHJnYmEoOSwxNywyOSwwLjk3KSwgcmdiYSg0LDgsMTUsMC45OCkpOwogICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg1NiwxODksMjQ4LDAuMyk7CiAgICBib3gtc2hhZG93OiAwIDAgNjBweCAtMTBweCByZ2JhKDU2LDE4OSwyNDgsMC4yNSksIDAgMjBweCA2MHB4IC0yMHB4IHJnYmEoMCwwLDAsMC44KTsKICB9CgogIC5ob2xvLWJyYW5kIHsKICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgx",
"MzVkZWcsICMzOGJkZjggMCUsICMwZWE1ZTkgNTUlLCAjZjQzZjVlIDEzMCUpOwogICAgYm94LXNoYWRvdzogMCAwIDIycHggcmdiYSg1NiwxODksMjQ4LDAuNSk7CiAgfQoKICA6OnNlbGVjdGlvbiB7IGJhY2tncm91bmQ6IHJnYmEoNTYsMTg5LDI0OCwwLjM1KTsgfQoKICA6Oi13ZWJraXQtc2Nyb2xsYmFyIHsgd2lkdGg6IDEwcHg7IGhlaWdodDogMTBweDsgfQogIDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sgeyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgfQogIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIgeyBiYWNrZ3Jv",
"dW5kOiByZ2JhKDU2LDE4OSwyNDgsMC4zNSk7IGJvcmRlci1yYWRpdXM6IDZweDsgfQogIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIgeyBiYWNrZ3JvdW5kOiByZ2JhKDU2LDE4OSwyNDgsMC41NSk7IH0KPC9zdHlsZT4KPC9oZWFkPgo8Ym9keT4KPGRpdiBpZD0icm9vdCI+CiAgPGRpdiBzdHlsZT0ibWluLWhlaWdodDoxMDB2aDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7YmFja2dyb3VuZDojMDQwNjBjO2NvbG9yOiM3YjkzYTg7Zm9udC1mYW1pbHk6c2Fucy1z",
"ZXJpZjtmb250LXNpemU6MTRweDsiPgogICAgQ2FycmVnYW5kbyBiaWJsaW90ZWNhcyAoUmVhY3QsIEJhYmVsLCBUYWlsd2luZCnigKYKICA8L2Rpdj4KPC9kaXY+Cgo8ZGl2IGlkPSJlcnJvci1ib3giIHN0eWxlPSJkaXNwbGF5Om5vbmU7cG9zaXRpb246Zml4ZWQ7aW5zZXQ6MDt6LWluZGV4Ojk5OTk7YmFja2dyb3VuZDojMGEwMDAyO2NvbG9yOiNmZmI0YzA7Zm9udC1mYW1pbHk6bW9ub3NwYWNlO3BhZGRpbmc6MjRweDtvdmVyZmxvdzphdXRvO3doaXRlLXNwYWNlOnByZS13cmFwOyI+PC9kaXY+Cgo8c2NyaXB0PgogIC8vIE1v",
"c3RyYSBxdWFscXVlciBlcnJvIGRlIEphdmFTY3JpcHQgZGlyZXRhbWVudGUgbmEgdGVsYSwgZW0gdmV6IGRlCiAgLy8gZGVpeGFyIGEgcMOhZ2luYSBlbSBicmFuY28gc2VtIGV4cGxpY2HDp8OjbyBuZW5odW1hLgogIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJlcnJvciIsIGZ1bmN0aW9uIChlKSB7CiAgICB2YXIgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImVycm9yLWJveCIpOwogICAgaWYgKCFib3gpIHJldHVybjsKICAgIGJveC5zdHlsZS5kaXNwbGF5ID0gImJsb2NrIjsKICAgIGJveC50ZXh0Q29udGVudCA9",
"CiAgICAgICLimqAgT2NvcnJldSB1bSBlcnJvIGFvIGNhcnJlZ2FyIGEgcMOhZ2luYS5cblxuIiArCiAgICAgICJNZW5zYWdlbTogIiArIChlLm1lc3NhZ2UgfHwgIihzZW0gbWVuc2FnZW0pIikgKyAiXG4iICsKICAgICAgIkFycXVpdm86ICIgKyAoZS5maWxlbmFtZSB8fCAiLSIpICsgIlxuIiArCiAgICAgICJMaW5oYTogIiArIChlLmxpbmVubyB8fCAiLSIpICsgIiwgQ29sdW5hOiAiICsgKGUuY29sbm8gfHwgIi0iKSArICJcblxuIiArCiAgICAgICJQcm92w6F2ZWwgY2F1c2E6IHVtYSBkYXMgYmlibGlvdGVjYXMgKFJlYWN0",
"LCBCYWJlbCBvdSBUYWlsd2luZCkgbsOjbyAiICsKICAgICAgImNhcnJlZ291IOKAlCB2ZXJpZmlxdWUgc3VhIGNvbmV4w6NvIGNvbSBhIGludGVybmV0IG91IHNlIGFsZ3VtICIgKwogICAgICAiYmxvcXVlYWRvciBkZSBhbsO6bmNpb3MvZmlyZXdhbGwgZXN0w6EgaW1wZWRpbmRvIG8gYWNlc3NvIGEgIiArCiAgICAgICJjZG4uanNkZWxpdnIubmV0IC8gY2RuLnRhaWx3aW5kY3NzLmNvbS5cblxuIiArCiAgICAgICJDb3BpZSBlc3RlIHRleHRvIGUgZW52aWUgcGFyYSBxdWVtIHByZXBhcm91IGEgZmVycmFtZW50YS4iOwogIH0p",
"OwoKICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigibG9hZCIsIGZ1bmN0aW9uICgpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgewogICAgICBpZiAodHlwZW9mIFJlYWN0ID09PSAidW5kZWZpbmVkIiB8fCB0eXBlb2YgUmVhY3RET00gPT09ICJ1bmRlZmluZWQiIHx8IHR5cGVvZiBCYWJlbCA9PT0gInVuZGVmaW5lZCIpIHsKICAgICAgICB2YXIgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImVycm9yLWJveCIpOwogICAgICAgIHZhciBtaXNzaW5nID0gW107CiAgICAgICAgaWYgKHR5cGVvZiBSZWFjdCA9PT0g",
"InVuZGVmaW5lZCIpIG1pc3NpbmcucHVzaCgiUmVhY3QiKTsKICAgICAgICBpZiAodHlwZW9mIFJlYWN0RE9NID09PSAidW5kZWZpbmVkIikgbWlzc2luZy5wdXNoKCJSZWFjdERPTSIpOwogICAgICAgIGlmICh0eXBlb2YgQmFiZWwgPT09ICJ1bmRlZmluZWQiKSBtaXNzaW5nLnB1c2goIkJhYmVsIik7CiAgICAgICAgYm94LnN0eWxlLmRpc3BsYXkgPSAiYmxvY2siOwogICAgICAgIGJveC50ZXh0Q29udGVudCA9CiAgICAgICAgICAi4pqgIE7Do28gZm9pIHBvc3PDrXZlbCBjYXJyZWdhcjogIiArIG1pc3Npbmcuam9pbigiLCAi",
"KSArICIuXG5cbiIgKwogICAgICAgICAgIklzc28gbm9ybWFsbWVudGUgc2lnbmlmaWNhIHF1ZSBvIG5hdmVnYWRvciBuw6NvIGNvbnNlZ3VpdSBiYWl4YXIgIiArCiAgICAgICAgICAib3MgYXJxdWl2b3MgZGUgY2RuLmpzZGVsaXZyLm5ldCAoc2VtIGludGVybmV0LCBmaXJld2FsbCBkZSByZWRlICIgKwogICAgICAgICAgImNvcnBvcmF0aXZhLCBvdSB1bSBibG9xdWVhZG9yIGRlIHNjcmlwdHMvYW7Dum5jaW9zKS5cblxuIiArCiAgICAgICAgICAiVGVudGU6IDEpIGNoZWNhciBzdWEgaW50ZXJuZXQ7IDIpIGRlc2F0aXZhciB0",
"ZW1wb3JhcmlhbWVudGUgIiArCiAgICAgICAgICAiQWRCbG9jay91QmxvY2svYW50aXbDrXJ1cyBwYXJhIGVzdGUgYXJxdWl2bzsgMykgYWJyaXIgZW0gb3V0cm8gIiArCiAgICAgICAgICAibmF2ZWdhZG9yIChDaHJvbWUgb3UgRmlyZWZveCBhdHVhbGl6YWRvcykuIjsKICAgICAgfQogICAgfSwgMzAwMCk7CiAgfSk7Cjwvc2NyaXB0PgoKPHNjcmlwdCB0eXBlPSJ0ZXh0L2JhYmVsIiBkYXRhLXByZXNldHM9InJlYWN0Ij4KY29uc3QgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VDYWxsYmFjayB9ID0gUmVhY3Q7Ci8vIC0tLS0t",
"LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQovLyDDjWNvbmVzIChTVkcgcHLDs3ByaW9zLCBzZW0gZGVwZW5kw6puY2lhIGV4dGVybmEg4oCUIGZ1bmNpb25hIDEwMCUgb2ZmbGluZSkKLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCmZ1bmN0aW9uIEljb24oeyBuYW1lLCBzaXplID0gMTgsIGNsYXNzTmFtZSA9ICIiLCBzdHJva2VXaWR0aCA9IDIgfSkgewog",
"IGNvbnN0IGMgPSB7IHdpZHRoOiBzaXplLCBoZWlnaHQ6IHNpemUsIHZpZXdCb3g6ICIwIDAgMjQgMjQiLCBmaWxsOiAibm9uZSIsIHN0cm9rZTogImN1cnJlbnRDb2xvciIsIHN0cm9rZVdpZHRoLCBzdHJva2VMaW5lY2FwOiAicm91bmQiLCBzdHJva2VMaW5lam9pbjogInJvdW5kIiwgY2xhc3NOYW1lIH07CiAgc3dpdGNoIChuYW1lKSB7CiAgICBjYXNlICJwbHVzIjogcmV0dXJuIDxzdmcgey4uLmN9PjxsaW5lIHgxPSIxMiIgeTE9IjUiIHgyPSIxMiIgeTI9IjE5Ii8+PGxpbmUgeDE9IjUiIHkxPSIxMiIgeDI9IjE5IiB5Mj0i",
"MTIiLz48L3N2Zz47CiAgICBjYXNlICJ4IjogcmV0dXJuIDxzdmcgey4uLmN9PjxsaW5lIHgxPSIxOCIgeTE9IjYiIHgyPSI2IiB5Mj0iMTgiLz48bGluZSB4MT0iNiIgeTE9IjYiIHgyPSIxOCIgeTI9IjE4Ii8+PC9zdmc+OwogICAgY2FzZSAidHJhc2giOiByZXR1cm4gPHN2ZyB7Li4uY30+PHBvbHlsaW5lIHBvaW50cz0iMyA2IDUgNiAyMSA2Ii8+PHBhdGggZD0iTTE5IDZsLTEgMTRhMiAyIDAgMCAxLTIgMkg4YTIgMiAwIDAgMS0yLTJMNSA2Ii8+PHBhdGggZD0iTTEwIDExdjYiLz48cGF0aCBkPSJNMTQgMTF2NiIvPjxwYXRo",
"IGQ9Ik05IDZWNGExIDEgMCAwIDEgMS0xaDRhMSAxIDAgMCAxIDEgMXYyIi8+PC9zdmc+OwogICAgY2FzZSAicGVuY2lsIjogcmV0dXJuIDxzdmcgey4uLmN9PjxwYXRoIGQ9Ik0xMiAyMGg5Ii8+PHBhdGggZD0iTTE2LjUgMy41YTIuMTIgMi4xMiAwIDAgMSAzIDNMNyAxOWwtNCAxIDEtNFoiLz48L3N2Zz47CiAgICBjYXNlICJjaGV2cm9uZG93biI6IHJldHVybiA8c3ZnIHsuLi5jfT48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSIvPjwvc3ZnPjsKICAgIGNhc2UgImNoZXZyb25yaWdodCI6IHJldHVybiA8c3ZnIHsu",
"Li5jfT48cG9seWxpbmUgcG9pbnRzPSI5IDYgMTUgMTIgOSAxOCIvPjwvc3ZnPjsKICAgIGNhc2UgInNhdmUiOiByZXR1cm4gPHN2ZyB7Li4uY30+PHBhdGggZD0iTTE5IDIxSDVhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoMTFsNSA1djExYTIgMiAwIDAgMS0yIDJaIi8+PHBvbHlsaW5lIHBvaW50cz0iMTcgMjEgMTcgMTMgNyAxMyA3IDIxIi8+PHBvbHlsaW5lIHBvaW50cz0iNyAzIDcgOCAxNSA4Ii8+PC9zdmc+OwogICAgY2FzZSAiYWxlcnR0cmlhbmdsZSI6IHJldHVybiA8c3ZnIHsuLi5jfT48cGF0aCBkPSJNMTAu",
"MjkgMy44NiAxLjgyIDE4YTIgMiAwIDAgMCAxLjcxIDNoMTYuOTRhMiAyIDAgMCAwIDEuNzEtM0wxMy43MSAzLjg2YTIgMiAwIDAgMC0zLjQyIDBaIi8+PGxpbmUgeDE9IjEyIiB5MT0iOSIgeDI9IjEyIiB5Mj0iMTMiLz48bGluZSB4MT0iMTIiIHkxPSIxNyIgeDI9IjEyLjAxIiB5Mj0iMTciLz48L3N2Zz47CiAgICBjYXNlICJ0YXJnZXQiOiByZXR1cm4gPHN2ZyB7Li4uY30+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjUuNSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIi",
"IHI9IjIiLz48L3N2Zz47CiAgICBjYXNlICJsYW5kbWFyayI6IHJldHVybiA8c3ZnIHsuLi5jfT48bGluZSB4MT0iMyIgeTE9IjIyIiB4Mj0iMjEiIHkyPSIyMiIvPjxsaW5lIHgxPSI2IiB5MT0iMTgiIHgyPSI2IiB5Mj0iMTEiLz48bGluZSB4MT0iMTAiIHkxPSIxOCIgeDI9IjEwIiB5Mj0iMTEiLz48bGluZSB4MT0iMTQiIHkxPSIxOCIgeDI9IjE0IiB5Mj0iMTEiLz48bGluZSB4MT0iMTgiIHkxPSIxOCIgeDI9IjE4IiB5Mj0iMTEiLz48cG9seWdvbiBwb2ludHM9IjEyIDIgMjAgNyA0IDciLz48L3N2Zz47CiAgICBjYXNlICJw",
"YWNrYWdlIjogcmV0dXJuIDxzdmcgey4uLmN9PjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNloiLz48cG9seWxpbmUgcG9pbnRzPSIzLjI5IDcgMTIgMTIgMjAuNzEgNyIvPjxsaW5lIHgxPSIxMiIgeTE9IjIyIiB4Mj0iMTIiIHkyPSIxMiIvPjwvc3ZnPjsKICAgIGNhc2UgInNldHRpbmdzIjogcmV0dXJuIDxzdmcgey4uLmN9PjxjaXJjbGUgY3g9",
"IjEyIiBjeT0iMTIiIHI9IjMiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4LjUiIHN0cm9rZURhc2hhcnJheT0iMiAzLjIiLz48L3N2Zz47CiAgICBjYXNlICJleWUiOiByZXR1cm4gPHN2ZyB7Li4uY30+PHBhdGggZD0iTTEgMTJzNC04IDExLTggMTEgOCAxMSA4LTQgOC0xMSA4LTExLTgtMTEtOFoiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIi8+PC9zdmc+OwogICAgY2FzZSAibG9jayI6IHJldHVybiA8c3ZnIHsuLi5jfT48cmVjdCB4PSIzIiB5PSIxMSIgd2lkdGg9IjE4IiBoZWlnaHQ9IjExIiByeD0iMiIv",
"PjxwYXRoIGQ9Ik03IDExVjdhNSA1IDAgMCAxIDEwIDB2NCIvPjwvc3ZnPjsKICAgIGNhc2UgInVubG9jayI6IHJldHVybiA8c3ZnIHsuLi5jfT48cmVjdCB4PSIzIiB5PSIxMSIgd2lkdGg9IjE4IiBoZWlnaHQ9IjExIiByeD0iMiIvPjxwYXRoIGQ9Ik03IDExVjdhNSA1IDAgMCAxIDkuOS0xIi8+PC9zdmc+OwogICAgY2FzZSAicGxheSI6IHJldHVybiA8c3ZnIHsuLi5jfSBmaWxsPSJjdXJyZW50Q29sb3IiIHN0cm9rZT0ibm9uZSI+PHBvbHlnb24gcG9pbnRzPSI2IDMgMjAgMTIgNiAyMSA2IDMiLz48L3N2Zz47CiAgICBjYXNl",
"ICJyb3RhdGVjdyI6IHJldHVybiA8c3ZnIHsuLi5jfT48cGF0aCBkPSJNMjEgMTJhOSA5IDAgMSAxLTMtNi43Ii8+PHBvbHlsaW5lIHBvaW50cz0iMjEgMyAyMSA5IDE1IDkiLz48L3N2Zz47CiAgICBjYXNlICJjYWxlbmRhciI6IHJldHVybiA8c3ZnIHsuLi5jfT48cmVjdCB4PSIzIiB5PSI0IiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIi8+PGxpbmUgeDE9IjE2IiB5MT0iMiIgeDI9IjE2IiB5Mj0iNiIvPjxsaW5lIHgxPSI4IiB5MT0iMiIgeDI9IjgiIHkyPSI2Ii8+PGxpbmUgeDE9IjMiIHkxPSIxMCIgeDI9IjIxIiB5",
"Mj0iMTAiLz48L3N2Zz47CiAgICBjYXNlICJjbG9jayI6IHJldHVybiA8c3ZnIHsuLi5jfT48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwb2x5bGluZSBwb2ludHM9IjEyIDYgMTIgMTIgMTYgMTQiLz48L3N2Zz47CiAgICBjYXNlICJjaGVja2NpcmNsZSI6IHJldHVybiA8c3ZnIHsuLi5jfT48cGF0aCBkPSJNMjEuOCAxMEExMCAxMCAwIDEgMSAxNyAzLjM0Ii8+PHBvbHlsaW5lIHBvaW50cz0iMjIgNCAxMiAxNC4wMSA5IDExLjAxIi8+PC9zdmc+OwogICAgY2FzZSAieGNpcmNsZSI6IHJldHVybiA8c3ZnIHsuLi5j",
"fT48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxsaW5lIHgxPSIxNSIgeTE9IjkiIHgyPSI5IiB5Mj0iMTUiLz48bGluZSB4MT0iOSIgeTE9IjkiIHgyPSIxNSIgeTI9IjE1Ii8+PC9zdmc+OwogICAgY2FzZSAiaGlzdG9yeSI6IHJldHVybiA8c3ZnIHsuLi5jfT48cGF0aCBkPSJNMyAzdjVoNSIvPjxwYXRoIGQ9Ik0zLjA1IDEzQTkgOSAwIDEgMCA2IDUuM0wzIDgiLz48cG9seWxpbmUgcG9pbnRzPSIxMiA3IDEyIDEyIDE1IDE1Ii8+PC9zdmc+OwogICAgY2FzZSAic3VuIjogcmV0dXJuIDxzdmcgey4uLmN9PjxjaXJj",
"bGUgY3g9IjEyIiBjeT0iMTIiIHI9IjQiLz48bGluZSB4MT0iMTIiIHkxPSIyIiB4Mj0iMTIiIHkyPSI0Ii8+PGxpbmUgeDE9IjEyIiB5MT0iMjAiIHgyPSIxMiIgeTI9IjIyIi8+PGxpbmUgeDE9IjQuOSIgeTE9IjQuOSIgeDI9IjYuMyIgeTI9IjYuMyIvPjxsaW5lIHgxPSIxNy43IiB5MT0iMTcuNyIgeDI9IjE5LjEiIHkyPSIxOS4xIi8+PGxpbmUgeDE9IjIiIHkxPSIxMiIgeDI9IjQiIHkyPSIxMiIvPjxsaW5lIHgxPSIyMCIgeTE9IjEyIiB4Mj0iMjIiIHkyPSIxMiIvPjxsaW5lIHgxPSI0LjkiIHkxPSIxOS4xIiB4Mj0iNi4z",
"IiB5Mj0iMTcuNyIvPjxsaW5lIHgxPSIxNy43IiB5MT0iNi4zIiB4Mj0iMTkuMSIgeTI9IjQuOSIvPjwvc3ZnPjsKICAgIGNhc2UgImJ1aWxkaW5nIjogcmV0dXJuIDxzdmcgey4uLmN9PjxwYXRoIGQ9Ik02IDIyVjRhMSAxIDAgMCAxIDEtMWg2YTEgMSAwIDAgMSAxIDF2MTgiLz48cGF0aCBkPSJNMTQgOWg1YTEgMSAwIDAgMSAxIDF2MTIiLz48bGluZSB4MT0iMiIgeTE9IjIyIiB4Mj0iMjIiIHkyPSIyMiIvPjwvc3ZnPjsKICAgIGNhc2UgInJvY2tldCI6IHJldHVybiA8c3ZnIHsuLi5jfT48cGF0aCBkPSJNNC41IDE2LjVjLTEu",
"NSAxLjI2LTIgNS0yIDVzMy43NC0uNSA1LTJjLjcxLS44NC43LTIuMTMtLjA5LTIuOTFhMi4xOCAyLjE4IDAgMCAwLTIuOTEtLjA5WiIvPjxwYXRoIGQ9Ik0xMiAxNWwtMy0zYTIyIDIyIDAgMCAxIDItMy45NUExMi44OCAxMi44OCAwIDAgMSAyMiAyYzAgMi43Mi0uNzggNy41LTYgMTFhMjIuMzUgMjIuMzUgMCAwIDEtNCAyWiIvPjxwYXRoIGQ9Ik05IDEySDRzLjU1LTMuMDMgMi00YzEuNjItMS4wOCA1IDAgNSAwIi8+PHBhdGggZD0iTTEyIDE1djVzMy4wMy0uNTUgNC0yYzEuMDgtMS42MiAwLTUgMC01Ii8+PC9zdmc+OwogICAg",
"Y2FzZSAiYm90IjogcmV0dXJuIDxzdmcgey4uLmN9PjxyZWN0IHg9IjMiIHk9IjExIiB3aWR0aD0iMTgiIGhlaWdodD0iMTAiIHJ4PSIyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI1IiByPSIyIi8+PGxpbmUgeDE9IjEyIiB5MT0iNyIgeDI9IjEyIiB5Mj0iMTEiLz48bGluZSB4MT0iOCIgeTE9IjE2IiB4Mj0iOC4wMSIgeTI9IjE2Ii8+PGxpbmUgeDE9IjE2IiB5MT0iMTYiIHgyPSIxNi4wMSIgeTI9IjE2Ii8+PC9zdmc+OwogICAgY2FzZSAid3JlbmNoIjogcmV0dXJuIDxzdmcgey4uLmN9PjxwYXRoIGQ9Ik0xNC43IDYuM2E0IDQg",
"MCAwIDAtNS42NiA1LjY2TDIgMTlsMyAzIDcuMDQtNy4wNGE0IDQgMCAwIDAgNS42Ni01LjY2bC0zLjUgMy41LTIuNS0yLjVaIi8+PC9zdmc+OwogICAgY2FzZSAiY29pbnMiOiByZXR1cm4gPHN2ZyB7Li4uY30+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjYiLz48cGF0aCBkPSJNMTguMDkgMTAuMzdBNiA2IDAgMSAxIDEwLjM0IDE4Ii8+PHBhdGggZD0iTTcgNmgxdjQiLz48L3N2Zz47CiAgICBjYXNlICJ1c2VycyI6IHJldHVybiA8c3ZnIHsuLi5jfT48cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAg",
"MC00IDR2MiIvPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ii8+PHBhdGggZD0iTTIyIDIxdi0yYTQgNCAwIDAgMC0zLTMuODciLz48cGF0aCBkPSJNMTYgMy4xM2E0IDQgMCAwIDEgMCA3Ljc1Ii8+PC9zdmc+OwogICAgY2FzZSAiaGVscCI6IHJldHVybiA8c3ZnIHsuLi5jfT48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik05LjA5IDlhMyAzIDAgMCAxIDUuODMgMWMwIDItMyAyLTMgNCIvPjxsaW5lIHgxPSIxMiIgeTE9IjE3IiB4Mj0iMTIuMDEiIHkyPSIxNyIvPjwvc3ZnPjsKICAgIGNhc2UgImRy",
"b3BsZXQiOiByZXR1cm4gPHN2ZyB7Li4uY30+PHBhdGggZD0iTTEyIDJzNyA3LjU4IDcgMTJhNyA3IDAgMCAxLTE0IDBjMC00LjQyIDctMTIgNy0xMloiLz48L3N2Zz47CiAgICBjYXNlICJsZWFmIjogcmV0dXJuIDxzdmcgey4uLmN9PjxwYXRoIGQ9Ik0xMSAyMEE3IDcgMCAwIDEgNCAxM2MwLTUgNi0xMSAxMS0xMyAyIDUtMiA5LTIgMTNhNyA3IDAgMCAxLTIgN1oiLz48cGF0aCBkPSJNNSAyMWMzLTMgNS02IDYtMTEiLz48L3N2Zz47CiAgICBjYXNlICJzY2FsZSI6IHJldHVybiA8c3ZnIHsuLi5jfT48bGluZSB4MT0iMTIiIHkx",
"PSIzIiB4Mj0iMTIiIHkyPSIyMSIvPjxwYXRoIGQ9Ik02IDdoMTIiLz48cGF0aCBkPSJNNCA3bDMtNCAzIDQtMyA1LTMtNVoiLz48cGF0aCBkPSJNMTQgN2wzLTQgMyA0LTMgNS0zLTVaIi8+PC9zdmc+OwogICAgY2FzZSAic3RhciI6IHJldHVybiA8c3ZnIHsuLi5jfSBmaWxsPSJjdXJyZW50Q29sb3IiIHN0cm9rZT0ibm9uZSI+PHBvbHlnb24gcG9pbnRzPSIxMiAyIDE1IDkgMjIgOS41IDE2LjUgMTQgMTguNSAyMSAxMiAxNyA1LjUgMjEgNy41IDE0IDIgOS41IDkgOSAxMiAyIi8+PC9zdmc+OwogICAgY2FzZSAiYXJyb3dkb3du",
"IjogcmV0dXJuIDxzdmcgey4uLmN9PjxsaW5lIHgxPSIxMiIgeTE9IjUiIHgyPSIxMiIgeTI9IjE5Ii8+PHBvbHlsaW5lIHBvaW50cz0iMTkgMTIgMTIgMTkgNSAxMiIvPjwvc3ZnPjsKICAgIGNhc2UgImFycm93dXAiOiByZXR1cm4gPHN2ZyB7Li4uY30+PGxpbmUgeDE9IjEyIiB5MT0iMTkiIHgyPSIxMiIgeTI9IjUiLz48cG9seWxpbmUgcG9pbnRzPSI1IDEyIDEyIDUgMTkgMTIiLz48L3N2Zz47CiAgICBkZWZhdWx0OiByZXR1cm4gPHN2ZyB7Li4uY30+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOSIvPjwvc3ZnPjsKICB9",
"Cn0KCmNvbnN0IHVpZCA9ICgpID0+IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDEwKTsKCmNvbnN0IERFRkFVTFRfUkVTT1VSQ0VfVFlQRVMgPSBbIkNyw6lkaXRvcyIsICJGYWNjcmVkcyIsICJNYXRlcmlhaXMiLCAiU3VwcmltZW50b3MiLCAiTcOjbyBkZSBPYnJhIiwgIk1pbsOpcmlvIiwgIsOBZ3VhIiwgIkNvbGhlaXRhIiwgIlJlbcOpZGlvcyIsICJDb250cmFiYW5kbyJdOwpjb25zdCBTSE9SVF9VTklUX0ZSQUNUSU9OID0geyBkaWE6IDEgLyAzMCwgc2VtYW5hOiAxIC8gNCB9OwoKY29uc3QgREVGQVVM",
"VF9TVEFURSA9IHsKICBjb25maWc6IHsKICAgIGZhY1JhdGU6IDEwMDAwLCAvLyBDcsOpZGl0b3MgSW1wZXJpYWlzIGVxdWl2YWxlbnRlcyBhIDEgRmFjY3JlZCAobW9lZGEgZGUgaW52ZXN0aW1lbnRvIGbDrXNpY28pCiAgICByZXNvdXJjZVR5cGVzOiBERUZBVUxUX1JFU09VUkNFX1RZUEVTLAogICAgc2hvcnRVbml0OiAic2VtYW5hIiwKICB9LAogIGZhY3Rpb25zOiBbCiAgICB7CiAgICAgIGlkOiB1aWQoKSwKICAgICAgbmFtZTogIlNldG9yIGRlIENvbcOpcmNpbyBJbXBlcmlhbCIsCiAgICAgIGRlc2NyaXB0aW9uOiAiw5Ny",
"Z8OjbyBidXJvY3LDoXRpY28gcXVlIGxpY2VuY2lhIGUgdGF4YSBlbXByZXNhcyBkZW50cm8gZG8gZXNwYcOnbyBjb250cm9sYWRvLiIsCiAgICAgIGNvbG9yOiAiIzM4YmRmOCIsCiAgICAgIGJhbms6IDUwMDAwMCwKICAgICAgZG9taW5hbnQ6IHRydWUsCiAgICAgIGRlbWFuZDogIk1hbnRlciBhcyBlbXByZXNhcyBsaWNlbmNpYWRhcyBwcm9kdXppbmRvIGUgcGFnYW5kbyBzZXVzIHRyaWJ1dG9zIGVtIGRpYS4iLAogICAgfSwKICBdLAogIGNvbXBhbmllczogW10sCiAgdHVybjogeyBtb250aDogMSwgZGF5OiAwLCB3ZWVrOiAw",
"IH0sCiAgbG9nOiBbXSwKfTsKCi8vIE9zIDYgbsOtdmVpcyBkZSBxdWFsaWRhZGUgcGxhbmV0w6FyaWEuIE8gbXVsdGlwbGljYWRvciBpbmNpZGUgc29icmUgbwovLyAiQ3VzdG8gQmFzZSBkZSBUYWJlbGEiIGRlIHVtYSBlbXByZXNhIHBhcmEgY2hlZ2FyIG5vIGN1c3RvIGRlIG1vbnRhZ2VtCi8vIGbDrXNpY2EgKHBhZ28gZW0gRmFjY3JlZHMpLgpjb25zdCBQTEFORVRfTEVWRUxTID0gWwogIHsga2V5OiAiZmF2ZWxpemFkbyIsIGxhYmVsOiAiRmF2ZWxpemFkbyIsIG11bHQ6IDAuNSwgZGVzYzogIk9ybGEgRXh0ZXJpb3IsIHNl",
"bSBsZWksIHRlcnJhIGFiYW5kb25hZGEuIEJhcmF0bywgbWFzIHBlcmlnb3NvLiIgfSwKICB7IGtleTogInBvYnJlIiwgbGFiZWw6ICJQb2JyZSIsIG11bHQ6IDEsIGRlc2M6ICJDb2zDtG5pYXMgZGVjYWRlbnRlcyBvdSBtdW5kb3MgYWdyw61jb2xhcyBzaW1wbGVzLiBDdXN0byBiYXNlLiIgfSwKICB7IGtleTogImNvbXVtIiwgbGFiZWw6ICJDb211bSIsIG11bHQ6IDIsIGRlc2M6ICJNdW5kb3MgcGFkcsOjbyBjb20gaW5mcmFlc3RydXR1cmEgYsOhc2ljYSBmdW5jaW9uYWwuIiB9LAogIHsga2V5OiAiYm9tIiwgbGFiZWw6ICJC",
"b20iLCBtdWx0OiAzLCBkZXNjOiAiU2V0b3JlcyBjb21lcmNpYWlzIGRlIGNsYXNzZSBhbHRhLCB0ZWNub2xvZ2lhIGV4aWdlbnRlLiIgfSwKICB7IGtleTogImVsaXRlIiwgbGFiZWw6ICJFbGl0ZSIsIG11bHQ6IDUsIGRlc2M6ICJUdXJpc21vIGRlIGx1eG8sIGFsdG8gZXNjYWzDo28sIG1lZ2Fjb3Jwb3Jhw6fDtWVzLiIgfSwKICB7IGtleTogImluaWd1YWxhdmVsIiwgbGFiZWw6ICJJbmlndWFsw6F2ZWwiLCBtdWx0OiAxMCwgZGVzYzogIk8gY29yYcOnw6NvIGRhIGdhbMOheGlhIChleDogQ29ydXNjYW50KS4gTyBtYWlzIGNh",
"cm8gZG8gdW5pdmVyc28uIiB9LApdOwoKLy8gUHJlc2V0cyBkZSBlbXByZXNhLiBDYWRhIHVtIGRlZmluZSDDrWNvbmUsIHNhbMOhcmlvIHBhZHLDo28gcG9yIGZ1bmNpb27DoXJpbwovLyAoQ3LDqWRpdG9zL23DqnMpLCBzZSBwcm9kdXogYWxnbyB2ZW5kw6F2ZWwgKGUgcXVhbCByZWN1cnNvKSwgZSAicG9ydGVzIgovLyAoTWVub3IvTcOpZGlvL01haW9yKSBjb20gQ3VzdG8gQmFzZSBkZSBUYWJlbGEsIG7CuiBkZSBmdW5jaW9uw6FyaW9zIGUKLy8gcHJvZHXDp8OjbyBtZW5zYWwgc3VnZXJpZG9zLiBUdWRvIGlzc28gc8OzIHBy",
"ZWVuY2hlIG9zIGNhbXBvcyBhdXRvbWF0aWNhbWVudGUKLy8g4oCUIG8gTWVzdHJlIHBvZGUgZWRpdGFyIHF1YWxxdWVyIHZhbG9yIGRlcG9pcyBuYSBmaWNoYSBkYSBlbXByZXNhLgpjb25zdCBDT01QQU5ZX1BSRVNFVFMgPSBbCiAgeyBrZXk6ICJwZXJzb25hbGl6YWRvIiwgbGFiZWw6ICJQZXJzb25hbGl6YWRvIChzZW0gcHJlc2V0KSIsIGljb246ICJidWlsZGluZyIsIHByb2R1Y2VzR29vZHM6IGZhbHNlLCBwcm9kdWN0aW9uUmVzb3VyY2U6ICIiLCBzYWxhcnlQZXJFbXBsb3llZTogMzAwMCwgc2l6ZXM6IFtdIH0sCiAgewog",
"ICAga2V5OiAibWluYSIsIGxhYmVsOiAiTWluYSBkZSBFeHRyYcOnw6NvIiwgaWNvbjogInBhY2thZ2UiLCBwcm9kdWNlc0dvb2RzOiB0cnVlLCBwcm9kdWN0aW9uUmVzb3VyY2U6ICJNaW7DqXJpbyIsIHNhbGFyeVBlckVtcGxveWVlOiAzMDAwLAogICAgc2l6ZXM6IFsKICAgICAgeyBrZXk6ICJtZW5vciIsIGxhYmVsOiAiTWVub3IiLCBiYXNlQ29zdDogMTUwMDAwLCBlbXBsb3llZXM6IDE1LCBwcm9kdWN0aW9uOiAyNSB9LAogICAgICB7IGtleTogIm1lZGlvIiwgbGFiZWw6ICJNw6lkaW8iLCBiYXNlQ29zdDogNTAwMDAwLCBl",
"bXBsb3llZXM6IDQ1LCBwcm9kdWN0aW9uOiA5MCB9LAogICAgICB7IGtleTogIm1haW9yIiwgbGFiZWw6ICJNYWlvciIsIGJhc2VDb3N0OiAxNTAwMDAwLCBlbXBsb3llZXM6IDEwMCwgcHJvZHVjdGlvbjogMjUwIH0sCiAgICBdLAogIH0sCiAgewogICAga2V5OiAiZXN0YWxlaXJvIiwgbGFiZWw6ICJFc3RhbGVpcm8gKFNoaXB5YXJkKSIsIGljb246ICJyb2NrZXQiLCBwcm9kdWNlc0dvb2RzOiBmYWxzZSwgcHJvZHVjdGlvblJlc291cmNlOiAiIiwgc2FsYXJ5UGVyRW1wbG95ZWU6IDMwMDAsCiAgICBzaXplczogWwogICAgICB7",
"IGtleTogIm1lbm9yIiwgbGFiZWw6ICJNZW5vciIsIGJhc2VDb3N0OiAyMDAwMDAwLCBlbXBsb3llZXM6IDI1MCwgcHJvZHVjdGlvbjogMCB9LAogICAgICB7IGtleTogIm1lZGlvIiwgbGFiZWw6ICJNw6lkaW8iLCBiYXNlQ29zdDogMTAwMDAwMDAsIGVtcGxveWVlczogODAwLCBwcm9kdWN0aW9uOiAwIH0sCiAgICAgIHsga2V5OiAibWFpb3IiLCBsYWJlbDogIk1haW9yIiwgYmFzZUNvc3Q6IDUwMDAwMDAwLCBlbXBsb3llZXM6IDIwMDAsIHByb2R1Y3Rpb246IDAgfSwKICAgIF0sCiAgfSwKICB7CiAgICBrZXk6ICJndWFybmlj",
"YW8iLCBsYWJlbDogIkd1YXJuacOnw6NvIGRlIFNlZ3VyYW7Dp2EgQ29ycG9yYXRpdmEiLCBpY29uOiAic2hpZWxkIiwgcHJvZHVjZXNHb29kczogZmFsc2UsIHByb2R1Y3Rpb25SZXNvdXJjZTogIiIsIHNhbGFyeVBlckVtcGxveWVlOiA1MDAwLAogICAgc2l6ZXM6IFsKICAgICAgeyBrZXk6ICJtZW5vciIsIGxhYmVsOiAiTWVub3IiLCBiYXNlQ29zdDogNTAwMDAsIGVtcGxveWVlczogMjAsIHByb2R1Y3Rpb246IDAgfSwKICAgICAgeyBrZXk6ICJtZWRpbyIsIGxhYmVsOiAiTcOpZGlvIiwgYmFzZUNvc3Q6IDIwMDAwMCwgZW1w",
"bG95ZWVzOiA2MCwgcHJvZHVjdGlvbjogMCB9LAogICAgICB7IGtleTogIm1haW9yIiwgbGFiZWw6ICJNYWlvciIsIGJhc2VDb3N0OiA2MDAwMDAsIGVtcGxveWVlczogMTUwLCBwcm9kdWN0aW9uOiAwIH0sCiAgICBdLAogIH0sCiAgewogICAga2V5OiAiZmF6ZW5kYSIsIGxhYmVsOiAiRmF6ZW5kYSIsIGljb246ICJsZWFmIiwgcHJvZHVjZXNHb29kczogdHJ1ZSwgcHJvZHVjdGlvblJlc291cmNlOiAiQ29saGVpdGEiLCBzYWxhcnlQZXJFbXBsb3llZTogMjAwMCwKICAgIHNpemVzOiBbCiAgICAgIHsga2V5OiAibWVub3IiLCBs",
"YWJlbDogIk1lbm9yIiwgYmFzZUNvc3Q6IDQwMDAwLCBlbXBsb3llZXM6IDEwLCBwcm9kdWN0aW9uOiA0MCB9LAogICAgICB7IGtleTogIm1lZGlvIiwgbGFiZWw6ICJNw6lkaW8iLCBiYXNlQ29zdDogMTUwMDAwLCBlbXBsb3llZXM6IDMwLCBwcm9kdWN0aW9uOiAxNTAgfSwKICAgICAgeyBrZXk6ICJtYWlvciIsIGxhYmVsOiAiTWFpb3IiLCBiYXNlQ29zdDogNTAwMDAwLCBlbXBsb3llZXM6IDgwLCBwcm9kdWN0aW9uOiA0NTAgfSwKICAgIF0sCiAgfSwKICB7CiAgICBrZXk6ICJmYXplbmRhX3VtaWRhZGUiLCBsYWJlbDogIkZh",
"emVuZGEgZGUgVW1pZGFkZSIsIGljb246ICJkcm9wbGV0IiwgcHJvZHVjZXNHb29kczogdHJ1ZSwgcHJvZHVjdGlvblJlc291cmNlOiAiw4FndWEiLCBzYWxhcnlQZXJFbXBsb3llZTogMjAwMCwKICAgIHNpemVzOiBbCiAgICAgIHsga2V5OiAibWVub3IiLCBsYWJlbDogIk1lbm9yIiwgYmFzZUNvc3Q6IDYwMDAwLCBlbXBsb3llZXM6IDYsIHByb2R1Y3Rpb246IDIwIH0sCiAgICAgIHsga2V5OiAibWVkaW8iLCBsYWJlbDogIk3DqWRpbyIsIGJhc2VDb3N0OiAyMDAwMDAsIGVtcGxveWVlczogMTgsIHByb2R1Y3Rpb246IDcwIH0s",
"CiAgICAgIHsga2V5OiAibWFpb3IiLCBsYWJlbDogIk1haW9yIiwgYmFzZUNvc3Q6IDYwMDAwMCwgZW1wbG95ZWVzOiA0NSwgcHJvZHVjdGlvbjogMjAwIH0sCiAgICBdLAogIH0sCiAgewogICAga2V5OiAiYmFuY28iLCBsYWJlbDogIkJhbmNvIC8gQ2FzYSBkZSBDw6JtYmlvIiwgaWNvbjogInNjYWxlIiwgcHJvZHVjZXNHb29kczogZmFsc2UsIHByb2R1Y3Rpb25SZXNvdXJjZTogIiIsIHNhbGFyeVBlckVtcGxveWVlOiA0MDAwLAogICAgc2l6ZXM6IFsKICAgICAgeyBrZXk6ICJtZW5vciIsIGxhYmVsOiAiTWVub3IiLCBiYXNl",
"Q29zdDogMzAwMDAwLCBlbXBsb3llZXM6IDE1LCBwcm9kdWN0aW9uOiAwIH0sCiAgICAgIHsga2V5OiAibWVkaW8iLCBsYWJlbDogIk3DqWRpbyIsIGJhc2VDb3N0OiAxMjAwMDAwLCBlbXBsb3llZXM6IDUwLCBwcm9kdWN0aW9uOiAwIH0sCiAgICAgIHsga2V5OiAibWFpb3IiLCBsYWJlbDogIk1haW9yIiwgYmFzZUNvc3Q6IDQwMDAwMDAsIGVtcGxveWVlczogMTIwLCBwcm9kdWN0aW9uOiAwIH0sCiAgICBdLAogIH0sCiAgewogICAga2V5OiAiZmFybWFjZXV0aWNhIiwgbGFiZWw6ICJGYXJtYWPDqnV0aWNhIC8gQ2zDrW5pY2Ei",
"LCBpY29uOiAicGFja2FnZSIsIHByb2R1Y2VzR29vZHM6IHRydWUsIHByb2R1Y3Rpb25SZXNvdXJjZTogIlJlbcOpZGlvcyIsIHNhbGFyeVBlckVtcGxveWVlOiAzNTAwLAogICAgc2l6ZXM6IFsKICAgICAgeyBrZXk6ICJtZW5vciIsIGxhYmVsOiAiTWVub3IiLCBiYXNlQ29zdDogMjAwMDAwLCBlbXBsb3llZXM6IDIwLCBwcm9kdWN0aW9uOiAxNSB9LAogICAgICB7IGtleTogIm1lZGlvIiwgbGFiZWw6ICJNw6lkaW8iLCBiYXNlQ29zdDogNzAwMDAwLCBlbXBsb3llZXM6IDYwLCBwcm9kdWN0aW9uOiA1NSB9LAogICAgICB7IGtl",
"eTogIm1haW9yIiwgbGFiZWw6ICJNYWlvciIsIGJhc2VDb3N0OiAyMDAwMDAwLCBlbXBsb3llZXM6IDE1MCwgcHJvZHVjdGlvbjogMTUwIH0sCiAgICBdLAogIH0sCiAgewogICAga2V5OiAiY29udHJhYmFuZG8iLCBsYWJlbDogIlJvdGEgZGUgQ29udHJhYmFuZG8iLCBpY29uOiAicm9ja2V0IiwgcHJvZHVjZXNHb29kczogdHJ1ZSwgcHJvZHVjdGlvblJlc291cmNlOiAiQ29udHJhYmFuZG8iLCBzYWxhcnlQZXJFbXBsb3llZTogNDAwMCwKICAgIHNpemVzOiBbCiAgICAgIHsga2V5OiAibWVub3IiLCBsYWJlbDogIk1lbm9yIiwg",
"YmFzZUNvc3Q6IDEwMDAwMCwgZW1wbG95ZWVzOiA4LCBwcm9kdWN0aW9uOiAxMCB9LAogICAgICB7IGtleTogIm1lZGlvIiwgbGFiZWw6ICJNw6lkaW8iLCBiYXNlQ29zdDogMzUwMDAwLCBlbXBsb3llZXM6IDIwLCBwcm9kdWN0aW9uOiAzNSB9LAogICAgICB7IGtleTogIm1haW9yIiwgbGFiZWw6ICJNYWlvciIsIGJhc2VDb3N0OiAxMDAwMDAwLCBlbXBsb3llZXM6IDQ1LCBwcm9kdWN0aW9uOiA5MCB9LAogICAgXSwKICB9LAogIHsKICAgIGtleTogIm1lcmNlbmFyaW9zIiwgbGFiZWw6ICJDb21wYW5oaWEgTWVyY2Vuw6FyaWEi",
"LCBpY29uOiAiYm90IiwgcHJvZHVjZXNHb29kczogZmFsc2UsIHByb2R1Y3Rpb25SZXNvdXJjZTogIiIsIHNhbGFyeVBlckVtcGxveWVlOiA1MDAwLAogICAgc2l6ZXM6IFsKICAgICAgeyBrZXk6ICJtZW5vciIsIGxhYmVsOiAiTWVub3IiLCBiYXNlQ29zdDogODAwMDAsIGVtcGxveWVlczogMjUsIHByb2R1Y3Rpb246IDAgfSwKICAgICAgeyBrZXk6ICJtZWRpbyIsIGxhYmVsOiAiTcOpZGlvIiwgYmFzZUNvc3Q6IDMwMDAwMCwgZW1wbG95ZWVzOiA4MCwgcHJvZHVjdGlvbjogMCB9LAogICAgICB7IGtleTogIm1haW9yIiwgbGFi",
"ZWw6ICJNYWlvciIsIGJhc2VDb3N0OiA5MDAwMDAsIGVtcGxveWVlczogMjAwLCBwcm9kdWN0aW9uOiAwIH0sCiAgICBdLAogIH0sCl07Cgpjb25zdCBBU1NFVF9UWVBFUyA9IFsKICB7IGtleTogIm5hdmUiLCBsYWJlbDogIk5hdmUiLCBpY29uOiAicm9ja2V0IiB9LAogIHsga2V5OiAiZHJvaWRlIiwgbGFiZWw6ICJEcm9pZGUiLCBpY29uOiAiYm90IiB9LAogIHsga2V5OiAiZXN0cnV0dXJhIiwgbGFiZWw6ICJFc3RydXR1cmEiLCBpY29uOiAiYnVpbGRpbmciIH0sCiAgeyBrZXk6ICJvdXRybyIsIGxhYmVsOiAiT3V0cm8iLCBp",
"Y29uOiAicGFja2FnZSIgfSwKXTsKCmZ1bmN0aW9uIGN1cnJlbmN5KG4pIHsKICBjb25zdCB2ID0gTnVtYmVyKG4pIHx8IDA7CiAgcmV0dXJuIHYudG9Mb2NhbGVTdHJpbmcoInB0LUJSIik7Cn0KCi8vIFByZWVuY2hlL21pZ3JhIGNhbXBvcyBwYXJhIG8gbm92byBtb2RlbG8gKG1ldGFzIGUgc3Vic8OtZGlvcyBlbSBsaXN0YXMKLy8gc2VwYXJhZGFzKSwgc2VtIHF1ZWJyYXIgZGFkb3Mgc2Fsdm9zIG5vIGZvcm1hdG8gYW50aWdvLgovLyBNYW51dGVuw6fDo28gbWVuc2FsIHRvdGFsID0gZm9saGEgZGUgcGFnYW1lbnRvICsgb3V0",
"cm9zIGN1c3RvcyBmaXhvcyArIG1hbnV0ZW7Dp8OjbyBkb3MgYXRpdm9zLgpmdW5jdGlvbiBjb21wdXRlTWFpbnRlbmFuY2UoYykgewogIGNvbnN0IHBheXJvbGwgPSAoTnVtYmVyKGMuZW1wbG95ZWVzKSB8fCAwKSAqIChOdW1iZXIoYy5zYWxhcnlQZXJFbXBsb3llZSkgfHwgMCk7CiAgY29uc3QgYXNzZXRzTWFpbnQgPSAoYy5hc3NldHMgfHwgW10pLnJlZHVjZSgocywgYSkgPT4gcyArIChOdW1iZXIoYS5tYWludGVuYW5jZSkgfHwgMCksIDApOwogIHJldHVybiB7CiAgICBwYXlyb2xsLAogICAgYXNzZXRzTWFpbnQsCiAgICBv",
"dGhlcjogTnVtYmVyKGMuYmFzZU1haW50ZW5hbmNlKSB8fCAwLAogICAgdG90YWw6IHBheXJvbGwgKyAoTnVtYmVyKGMuYmFzZU1haW50ZW5hbmNlKSB8fCAwKSArIGFzc2V0c01haW50LAogIH07Cn0KCi8vIEN1c3RvIGRlIGludmVzdGltZW50byBmw61zaWNvOiBDdXN0byBCYXNlIGRlIFRhYmVsYSB4IG11bHRpcGxpY2Fkb3IgZG8KLy8gbsOtdmVsIGRvIHBsYW5ldGEgPSBjdXN0byBlbSBDcsOpZGl0b3M7IGRpdmlkaWRvIHBlbGEgdGF4YSBkZSBjw6JtYmlvIGTDoSBvCi8vIGN1c3RvIGVtIEZhY2NyZWRzIChhIG1vZWRhIHVz",
"YWRhIHPDsyBwYXJhIG1vbnRhciBhIGVtcHJlc2EgZmlzaWNhbWVudGUpLgpmdW5jdGlvbiBjb21wdXRlRmFjQ29zdChjLCBjb25maWcpIHsKICBjb25zdCBsZXZlbCA9IFBMQU5FVF9MRVZFTFMuZmluZCgocCkgPT4gcC5rZXkgPT09IGMucGxhbmV0TGV2ZWwpIHx8IFBMQU5FVF9MRVZFTFNbMl07CiAgY29uc3QgY3JlZGl0c0Nvc3QgPSAoTnVtYmVyKGMuYmFzZUNvc3RUYWJlbGEpIHx8IDApICogbGV2ZWwubXVsdDsKICBjb25zdCByYXRlID0gTnVtYmVyKGNvbmZpZz8uZmFjUmF0ZSkgfHwgMTAwMDA7CiAgcmV0dXJuIHsgbGV2",
"ZWwsIGNyZWRpdHNDb3N0LCBmYWNDb3N0OiBjcmVkaXRzQ29zdCAvIHJhdGUgfTsKfQoKZnVuY3Rpb24gbm9ybWFsaXplQ29tcGFueShjLCByZXNvdXJjZVR5cGVzKSB7CiAgY29uc3QgcmVzb3VyY2VzID0geyAuLi5PYmplY3QuZnJvbUVudHJpZXMocmVzb3VyY2VUeXBlcy5tYXAoKHIpID0+IFtyLCAwXSkpLCAuLi4oYy5yZXNvdXJjZXMgfHwge30pIH07CgogIGxldCBnb2FscyA9IGMuZ29hbHM7CiAgaWYgKCFnb2FscykgewogICAgZ29hbHMgPSBjLmdvYWwgJiYgYy5nb2FsLmRlc2NyaXB0aW9uID8gW3sgaWQ6IHVpZCgpLCAu",
"Li5jLmdvYWwgfV0gOiBbXTsKICB9CgogIGxldCBzdWJzaWRpZXMgPSBjLnN1YnNpZGllczsKICBpZiAoIXN1YnNpZGllcykgewogICAgc3Vic2lkaWVzID0KICAgICAgYy5zdWJzaWR5ICYmIGMuc3Vic2lkeS5mYWN0aW9uSWQKICAgICAgICA/IFt7IGlkOiB1aWQoKSwgLi4uYy5zdWJzaWR5LCBhY3RpdmU6IGMuc3Vic2lkeUFjdGl2ZSAhPT0gZmFsc2UsIGdvYWxJZDogZ29hbHNbMF0/LmlkIHx8ICIiIH1dCiAgICAgICAgOiBbXTsKICB9CgogIC8vIE1pZ3JhIG8gYW50aWdvIGNhbXBvICJ0ZW1wbGF0ZUtleSIgKHZlcnPDo28g",
"YW50ZXJpb3IpIHBhcmEgInByZXNldEtleSIsCiAgLy8gc2UgbyB2YWxvciBhaW5kYSBjb3JyZXNwb25kZXIgYSB1bSBwcmVzZXQgdsOhbGlkby4KICBjb25zdCBtaWdyYXRlZFByZXNldCA9CiAgICBjLnByZXNldEtleSB8fCAoYy50ZW1wbGF0ZUtleSAmJiBDT01QQU5ZX1BSRVNFVFMuc29tZSgocCkgPT4gcC5rZXkgPT09IGMudGVtcGxhdGVLZXkpID8gYy50ZW1wbGF0ZUtleSA6ICJwZXJzb25hbGl6YWRvIik7CgogIHJldHVybiB7CiAgICBoaXN0b3J5OiBbXSwKICAgIGxhc3RSdW46IG51bGwsCiAgICBiYXNlTWFpbnRlbmFu",
"Y2U6IDAsCiAgICBhc3NldHM6IFtdLAogICAgc2l6ZUtleTogIiIsCiAgICBwbGFuZXRMZXZlbDogImNvbXVtIiwKICAgIGVtcGxveWVlczogMCwKICAgIHNhbGFyeVBlckVtcGxveWVlOiAwLAogICAgYmFzZUNvc3RUYWJlbGE6IDAsCiAgICBwcm9kdWN0aW9uOiB7IHJlc291cmNlOiByZXNvdXJjZVR5cGVzWzBdLCBhbW91bnQ6IDAgfSwKICAgIC4uLmMsCiAgICBwcmVzZXRLZXk6IG1pZ3JhdGVkUHJlc2V0LAogICAgcmVzb3VyY2VzLAogICAgcHJvZHVjdGlvbjogeyByZXNvdXJjZTogcmVzb3VyY2VUeXBlc1swXSwgYW1vdW50",
"OiAwLCAuLi4oYy5wcm9kdWN0aW9uIHx8IHt9KSB9LAogICAgZ29hbHM6IGdvYWxzLm1hcCgoZykgPT4gKHsgZGVzY3JpcHRpb246ICIiLCBjdXJyZW50OiAwLCB0YXJnZXQ6IDEwMCwgZGVhZGxpbmU6ICIiLCBsYXN0UmVzdWx0OiBudWxsLCAuLi5nIH0pKSwKICAgIHN1YnNpZGllczogc3Vic2lkaWVzLm1hcCgocykgPT4gKHsKICAgICAgZmFjdGlvbklkOiAiIiwKICAgICAgYW1vdW50OiAwLAogICAgICByZXNvdXJjZTogcmVzb3VyY2VUeXBlc1swXSwKICAgICAgY29uZGl0aW9uOiAiIiwKICAgICAgYWN0aXZlOiB0cnVlLAog",
"ICAgICBnb2FsSWQ6ICIiLAogICAgICAuLi5zLAogICAgfSkpLAogIH07Cn0KCi8qKgogKiBSb2RhIHVtYSByb3Rhw6fDo28gc29icmUgdG9kYXMgYXMgZW1wcmVzYXMuIFRyw6pzIHRpcG9zOgogKiAgLSAiZGlhcmlhIjogc2VtcHJlIDEgZGlhICgxLzMwIGRvIG3DqnMpIOKAlCBKw4EgVkVSSUZJQ0EgbWV0YXMuCiAqICAtICJjdXJ0YSI6IDEgZGlhIG91IDEgc2VtYW5hIChjb25maWcpIOKAlCBuw6NvIHZlcmlmaWNhIG1ldGFzLgogKiAgLSAibG9uZ2EiOiBvIG3DqnMgaW50ZWlybyDigJQgdmVyaWZpY2EgbWV0YXMgZSBjb3J0",
"YSBzdWJzw61kaW9zIHZpbmN1bGFkb3MKICogICAgYSBtZXRhcyBxdWUgZmFsaGFyYW0uCiAqIE1ldGFzIGUgc3Vic8OtZGlvcyBzw6NvIGluZGVwZW5kZW50ZXM6IHVtIHN1YnPDrWRpbyBzw7Mgw6kgY29ydGFkbyBzZSBlc3RpdmVyCiAqIGV4cGxpY2l0YW1lbnRlIHZpbmN1bGFkbyAoZ29hbElkKSBhIHVtYSBtZXRhIHF1ZSBmYWxob3UuIFN1YnPDrWRpb3Mgc2VtCiAqIG1ldGEgdmluY3VsYWRhIHPDo28gcGFnb3MgaW5jb25kaWNpb25hbG1lbnRlIGVucXVhbnRvIGVzdGl2ZXJlbSBhdGl2b3MuCiAqCiAqIEVjb25vbWlhIGZl",
"Y2hhZGE6IHRvZGEgbWFudXRlbsOnw6NvIHF1ZSBzYWkgZG8gY2FpeGEgZGFzIGVtcHJlc2FzIGVudHJhIG5vCiAqIGJhbmNvIGRhIEZhY8Onw6NvIERvbWluYW50ZSAoYSAiZG9uYSIgZG8gc2V0b3IpLiBUb2RvIHN1YnPDrWRpbyBwYWdvIHBvcgogKiBxdWFscXVlciBmYWPDp8OjbyBzYWkgZG8gYmFuY28gZGVsYS4gRW1wcmVzYXMgY29tIHByb2R1w6fDo28gYXV0b23DoXRpY2EKICogKGZhemVuZGFzLCBmYXplbmRhcyBkZSB1bWlkYWRlIGV0YykgcmVjZWJlbSBzZXUgcmVjdXJzbyBwcsOzcHJpbyBhIGNhZGEKICogcm90YcOn",
"w6NvLCBwcm9yYXRlYWRvIGlndWFsIMOgIG1hbnV0ZW7Dp8Ojby4KICovCmZ1bmN0aW9uIHJ1blJvdGF0aW9uKHsgY29tcGFuaWVzLCBmYWN0aW9ucywgY29uZmlnLCB0dXJuLCB0eXBlIH0pIHsKICBjb25zdCBjaGVja3NHb2FscyA9IHR5cGUgPT09ICJsb25nYSIgfHwgdHlwZSA9PT0gImRpYXJpYSI7CiAgY29uc3QgZnJhY3Rpb24gPQogICAgdHlwZSA9PT0gImxvbmdhIiA/IDEgOiB0eXBlID09PSAiZGlhcmlhIiA/IFNIT1JUX1VOSVRfRlJBQ1RJT04uZGlhIDogU0hPUlRfVU5JVF9GUkFDVElPTltjb25maWcuc2hvcnRVbml0",
"XSB8fCAxIC8gNDsKCiAgbGV0IG5leHRUdXJuLCBsYWJlbDsKICBpZiAodHlwZSA9PT0gImxvbmdhIikgewogICAgbmV4dFR1cm4gPSB7IG1vbnRoOiB0dXJuLm1vbnRoICsgMSwgZGF5OiAwLCB3ZWVrOiAwIH07CiAgICBsYWJlbCA9IGBNw6pzICR7dHVybi5tb250aH1gOwogIH0gZWxzZSBpZiAodHlwZSA9PT0gImRpYXJpYSIpIHsKICAgIG5leHRUdXJuID0geyAuLi50dXJuLCBkYXk6IHR1cm4uZGF5ICsgMSB9OwogICAgbGFiZWwgPSBgRGlhICR7dHVybi5kYXkgKyAxfSAoTcOqcyAke3R1cm4ubW9udGh9KWA7CiAgfSBlbHNl",
"IGlmIChjb25maWcuc2hvcnRVbml0ID09PSAiZGlhIikgewogICAgbmV4dFR1cm4gPSB7IC4uLnR1cm4sIGRheTogdHVybi5kYXkgKyAxIH07CiAgICBsYWJlbCA9IGBEaWEgJHt0dXJuLmRheSArIDF9IChNw6pzICR7dHVybi5tb250aH0pYDsKICB9IGVsc2UgewogICAgbmV4dFR1cm4gPSB7IC4uLnR1cm4sIHdlZWs6IHR1cm4ud2VlayArIDEgfTsKICAgIGxhYmVsID0gYFNlbWFuYSAke3R1cm4ud2VlayArIDF9IChNw6pzICR7dHVybi5tb250aH0pYDsKICB9CgogIC8vIENvcGlhbW9zIG9zIGJhbmNvcyBkYXMgZmFjw6fDtWVz",
"IHBhcmEgaXIgZGViaXRhbmRvL2NyZWRpdGFuZG8gZHVyYW50ZSBvIGxvb3AuCiAgY29uc3QgZmFjdGlvbkJhbmtzID0gT2JqZWN0LmZyb21FbnRyaWVzKGZhY3Rpb25zLm1hcCgoZikgPT4gW2YuaWQsIE51bWJlcihmLmJhbmspIHx8IDBdKSk7CiAgY29uc3QgZG9taW5hbnQgPSBmYWN0aW9ucy5maW5kKChmKSA9PiBmLmRvbWluYW50KTsKICBsZXQgdGF4Q29sbGVjdGVkID0gMDsKCiAgY29uc3QgcmVzdWx0cyA9IFtdOwoKICBjb25zdCBuZXh0Q29tcGFuaWVzID0gY29tcGFuaWVzLm1hcCgoY29tcGFueSkgPT4gewogICAgY29u",
"c3QgYyA9IHsgLi4uY29tcGFueSwgcmVzb3VyY2VzOiB7IC4uLmNvbXBhbnkucmVzb3VyY2VzIH0gfTsKICAgIGNvbnN0IG1haW50VG90YWwgPSBjb21wdXRlTWFpbnRlbmFuY2UoYykudG90YWw7CiAgICBjb25zdCBtYWludER1ZSA9IE1hdGgucm91bmQobWFpbnRUb3RhbCAqIGZyYWN0aW9uKTsKICAgIGMucmVzb3VyY2VzWyJDcsOpZGl0b3MiXSA9IChOdW1iZXIoYy5yZXNvdXJjZXNbIkNyw6lkaXRvcyJdKSB8fCAwKSAtIG1haW50RHVlOwoKICAgIC8vIE1hbnV0ZW7Dp8OjbyBwYWdhIHBlbGFzIGVtcHJlc2FzIHZpcmEgaW1w",
"b3N0byBxdWUgZW50cmEgbm8gYmFuY28gZGEKICAgIC8vIEZhY8Onw6NvIERvbWluYW50ZSAoc2UgaG91dmVyIHVtYSBkZWZpbmlkYSkuCiAgICBpZiAoZG9taW5hbnQpIHsKICAgICAgZmFjdGlvbkJhbmtzW2RvbWluYW50LmlkXSA9IChmYWN0aW9uQmFua3NbZG9taW5hbnQuaWRdIHx8IDApICsgbWFpbnREdWU7CiAgICAgIHRheENvbGxlY3RlZCArPSBtYWludER1ZTsKICAgIH0KCiAgICAvLyBQcm9kdcOnw6NvIGF1dG9tw6F0aWNhIChleDogRmF6ZW5kYSBkZSBVbWlkYWRlIHByb2R1emluZG8gw4FndWEpLgogICAgbGV0IHBy",
"b2R1Y3Rpb25QYWlkID0gMDsKICAgIGlmIChjLnByb2R1Y3Rpb24gJiYgTnVtYmVyKGMucHJvZHVjdGlvbi5hbW91bnQpID4gMCAmJiBjLnByb2R1Y3Rpb24ucmVzb3VyY2UpIHsKICAgICAgcHJvZHVjdGlvblBhaWQgPSBNYXRoLnJvdW5kKE51bWJlcihjLnByb2R1Y3Rpb24uYW1vdW50KSAqIGZyYWN0aW9uKTsKICAgICAgYy5yZXNvdXJjZXNbYy5wcm9kdWN0aW9uLnJlc291cmNlXSA9IChOdW1iZXIoYy5yZXNvdXJjZXNbYy5wcm9kdWN0aW9uLnJlc291cmNlXSkgfHwgMCkgKyBwcm9kdWN0aW9uUGFpZDsKICAgIH0KCiAgICAv",
"LyAxKSBBdmFsaWEgbWV0YXMgKHNlIGEgcm90YcOnw6NvIHZlcmlmaWNhIG1ldGFzKS4KICAgIGxldCBnb2FscyA9IGMuZ29hbHM7CiAgICBpZiAoY2hlY2tzR29hbHMpIHsKICAgICAgZ29hbHMgPSBjLmdvYWxzLm1hcCgoZykgPT4gewogICAgICAgIGlmICghKE51bWJlcihnLnRhcmdldCkgPiAwKSkgcmV0dXJuIGc7CiAgICAgICAgY29uc3QgaGl0ID0gTnVtYmVyKGcuY3VycmVudCkgPj0gTnVtYmVyKGcudGFyZ2V0KTsKICAgICAgICByZXR1cm4geyAuLi5nLCBsYXN0UmVzdWx0OiBoaXQgPyAib2siIDogImZhaWwiIH07CiAg",
"ICAgIH0pOwogICAgfQoKICAgIC8vIDIpIFBhZ2Egc3Vic8OtZGlvcyBhdGl2b3MgKHNhaW5kbyBkbyBiYW5jbyBkYSBmYWPDp8OjbyBwYWdhZG9yYSk7IGNvcnRhCiAgICAvLyAgICBvcyBxdWUgZXN0w6NvIHZpbmN1bGFkb3MgYSB1bWEgbWV0YSBmYWxoYWRhLgogICAgY29uc3QgaW5jb21lQnlSZXNvdXJjZSA9IHt9OwogICAgY29uc3Qgc3Vic2lkaWVzQ3V0ID0gW107CiAgICBjb25zdCBzdWJzaWRpZXMgPSBjLnN1YnNpZGllcy5tYXAoKHN1YikgPT4gewogICAgICBjb25zdCBmYWN0aW9uID0gZmFjdGlvbnMuZmluZCgoZikg",
"PT4gZi5pZCA9PT0gc3ViLmZhY3Rpb25JZCk7CiAgICAgIGxldCBhY3RpdmUgPSBzdWIuYWN0aXZlOwoKICAgICAgaWYgKGZhY3Rpb24gJiYgYWN0aXZlICYmIE51bWJlcihzdWIuYW1vdW50KSA+IDApIHsKICAgICAgICBjb25zdCBwYWlkID0gTWF0aC5yb3VuZChOdW1iZXIoc3ViLmFtb3VudCkgKiBmcmFjdGlvbik7CiAgICAgICAgaW5jb21lQnlSZXNvdXJjZVtzdWIucmVzb3VyY2VdID0gKGluY29tZUJ5UmVzb3VyY2Vbc3ViLnJlc291cmNlXSB8fCAwKSArIHBhaWQ7CiAgICAgICAgYy5yZXNvdXJjZXNbc3ViLnJlc291cmNl",
"XSA9IChOdW1iZXIoYy5yZXNvdXJjZXNbc3ViLnJlc291cmNlXSkgfHwgMCkgKyBwYWlkOwogICAgICAgIGlmIChzdWIucmVzb3VyY2UgPT09ICJDcsOpZGl0b3MiKSB7CiAgICAgICAgICBmYWN0aW9uQmFua3NbZmFjdGlvbi5pZF0gPSAoZmFjdGlvbkJhbmtzW2ZhY3Rpb24uaWRdIHx8IDApIC0gcGFpZDsKICAgICAgICB9CiAgICAgIH0KCiAgICAgIGlmIChjaGVja3NHb2FscyAmJiBzdWIuZ29hbElkICYmIGFjdGl2ZSkgewogICAgICAgIGNvbnN0IGxpbmtlZEdvYWwgPSBnb2Fscy5maW5kKChnKSA9PiBnLmlkID09PSBzdWIu",
"Z29hbElkKTsKICAgICAgICBpZiAobGlua2VkR29hbCAmJiBsaW5rZWRHb2FsLmxhc3RSZXN1bHQgPT09ICJmYWlsIikgewogICAgICAgICAgYWN0aXZlID0gZmFsc2U7CiAgICAgICAgICBzdWJzaWRpZXNDdXQucHVzaCh7IGZhY3Rpb25OYW1lOiBmYWN0aW9uID8gZmFjdGlvbi5uYW1lIDogIj8iLCBnb2FsRGVzYzogbGlua2VkR29hbC5kZXNjcmlwdGlvbiB9KTsKICAgICAgICB9CiAgICAgIH0KICAgICAgcmV0dXJuIHsgLi4uc3ViLCBhY3RpdmUgfTsKICAgIH0pOwoKICAgIGMuZ29hbHMgPSBnb2FsczsKICAgIGMuc3Vic2lk",
"aWVzID0gc3Vic2lkaWVzOwoKICAgIGNvbnN0IGRlZmljaXQgPSBOdW1iZXIoYy5yZXNvdXJjZXNbIkNyw6lkaXRvcyJdKSA8IDA7CiAgICBjb25zdCBnb2Fsc0NoZWNrZWQgPSBjaGVja3NHb2FscyA/IGdvYWxzLmZpbHRlcigoZykgPT4gTnVtYmVyKGcudGFyZ2V0KSA+IDApLm1hcCgoZykgPT4gKHsgZGVzY3JpcHRpb246IGcuZGVzY3JpcHRpb24sIGhpdDogZy5sYXN0UmVzdWx0ID09PSAib2siIH0pKSA6IFtdOwoKICAgIGNvbnN0IGVudHJ5ID0gewogICAgICBpZDogdWlkKCksCiAgICAgIGxhYmVsLAogICAgICB0eXBlLAog",
"ICAgICBtYWludER1ZSwKICAgICAgaW5jb21lQnlSZXNvdXJjZSwKICAgICAgcHJvZHVjdGlvblBhaWQsCiAgICAgIHByb2R1Y3Rpb25SZXNvdXJjZTogYy5wcm9kdWN0aW9uPy5yZXNvdXJjZSB8fCBudWxsLAogICAgICBnb2Fsc0NoZWNrZWQsCiAgICAgIHN1YnNpZGllc0N1dCwKICAgICAgZGVmaWNpdCwKICAgICAgY3JlZGl0c0FmdGVyOiBjLnJlc291cmNlc1siQ3LDqWRpdG9zIl0sCiAgICB9OwoKICAgIGMubGFzdFJ1biA9IGVudHJ5OwogICAgYy5oaXN0b3J5ID0gW2VudHJ5LCAuLi4oYy5oaXN0b3J5IHx8IFtdKV0uc2xp",
"Y2UoMCwgMTIpOwoKICAgIHJlc3VsdHMucHVzaCh7IGNvbXBhbnlJZDogYy5pZCwgY29tcGFueU5hbWU6IGMubmFtZSwgLi4uZW50cnkgfSk7CiAgICByZXR1cm4gYzsKICB9KTsKCiAgY29uc3QgbmV4dEZhY3Rpb25zID0gZmFjdGlvbnMubWFwKChmKSA9PiAoeyAuLi5mLCBiYW5rOiBmYWN0aW9uQmFua3NbZi5pZF0gPz8gZi5iYW5rIH0pKTsKCiAgY29uc3QgbG9nRW50cnkgPSB7CiAgICBpZDogdWlkKCksCiAgICB0eXBlLAogICAgbGFiZWwsCiAgICB0dXJuQWZ0ZXI6IG5leHRUdXJuLAogICAgcmVzdWx0cywKICAgIGRvbWlu",
"YW50RmFjdGlvbk5hbWU6IGRvbWluYW50ID8gZG9taW5hbnQubmFtZSA6IG51bGwsCiAgICB0YXhDb2xsZWN0ZWQsCiAgfTsKICByZXR1cm4geyBjb21wYW5pZXM6IG5leHRDb21wYW5pZXMsIGZhY3Rpb25zOiBuZXh0RmFjdGlvbnMsIHR1cm46IG5leHRUdXJuLCBsb2dFbnRyeSB9Owp9CgovLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KLy8gUGVyc2lzdMOqbmNpYSBsb2NhbCAobG9jYWxTdG9yYWdlKSDigJQgZnVuY2lvbmEgMTAwJSBv",
"ZmZsaW5lIG5vIHNldSBQQy4KLy8gT2JzOiBwb3Igc2VyIGxvY2FsLCBvcyBkYWRvcyBmaWNhbSBzw7MgbmVzdGUgbmF2ZWdhZG9yL2NvbXB1dGFkb3IuIFBhcmEKLy8gY29tcGFydGlsaGFyIGVudHJlIE1lc3RyZSBlIGpvZ2Fkb3JlcywgdG9kb3MgcHJlY2lzYW0gYWJyaXIgbyBNRVNNTwovLyBhcnF1aXZvIG5vIE1FU01PIGNvbXB1dGFkb3IvcGVyZmlsIGRlIG5hdmVnYWRvciwgb3Ugdm9jw6pzIHJlY2FycmVnYW0gbwovLyBlc3RhZG8gbWFudWFsbWVudGUgKHZlciBib3TDtWVzIGRlIFNhbHZhci9FeHBvcnRhci9JbXBvcnRh",
"ciBubyB0b3BvKS4KLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCmNvbnN0IFNUT1JBR0VfS0VZID0gImdlc3Rhby1lbXByZXNhcy1ycGctdjIiOwpjb25zdCBTQVZFX1BSRUZJWCA9ICJnZXN0YW8tZW1wcmVzYXMtcnBnLXYyLXNhdmUtIjsKY29uc3QgU0FWRV9JTkRFWF9LRVkgPSAiZ2VzdGFvLWVtcHJlc2FzLXJwZy12Mi1zYXZlcy1pbmRleCI7CgovLyBQcmVlbmNoZSBjYW1wb3MgcXVlIHBvc3NhbSBmYWx0YXIgbnVtIGVzdGFkbyBz",
"YWx2by9pbXBvcnRhZG8sIHNlbSBxdWVicmFyLgpmdW5jdGlvbiBub3JtYWxpemVMb2FkZWRTdGF0ZShsb2FkZWRTdGF0ZSkgewogIGNvbnN0IGNvbmZpZyA9IHsKICAgIC4uLkRFRkFVTFRfU1RBVEUuY29uZmlnLAogICAgLi4ubG9hZGVkU3RhdGUuY29uZmlnLAogICAgLy8gTWlncmEgbyBhbnRpZ28gbm9tZSBkZSBjYW1wbyAiY29udmVyc2lvblJhdGUiICh2ZXJzw7VlcyBhbnRlcmlvcmVzKSBwYXJhICJmYWNSYXRlIi4KICAgIGZhY1JhdGU6IGxvYWRlZFN0YXRlLmNvbmZpZz8uZmFjUmF0ZSA/PyBsb2FkZWRTdGF0ZS5jb25m",
"aWc/LmNvbnZlcnNpb25SYXRlID8/IERFRkFVTFRfU1RBVEUuY29uZmlnLmZhY1JhdGUsCiAgICAvLyBHYXJhbnRlIHF1ZSByZWN1cnNvcyBub3ZvcyAoRmFjY3JlZHMgZXRjKSBleGlzdGFtIG1lc21vIGVtIHNhdmVzIGFudGlnb3MuCiAgICByZXNvdXJjZVR5cGVzOiBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLihsb2FkZWRTdGF0ZS5jb25maWc/LnJlc291cmNlVHlwZXMgfHwgREVGQVVMVF9SRVNPVVJDRV9UWVBFUyksICJGYWNjcmVkcyJdKSksCiAgfTsKICByZXR1cm4gewogICAgLi4uREVGQVVMVF9TVEFURSwKICAgIC4uLmxv",
"YWRlZFN0YXRlLAogICAgY29uZmlnLAogICAgdHVybjogbG9hZGVkU3RhdGUudHVybiB8fCB7IG1vbnRoOiAxLCBkYXk6IDAsIHdlZWs6IDAgfSwKICAgIGxvZzogbG9hZGVkU3RhdGUubG9nIHx8IFtdLAogICAgY29tcGFuaWVzOiAobG9hZGVkU3RhdGUuY29tcGFuaWVzIHx8IFtdKS5tYXAoKGMpID0+IG5vcm1hbGl6ZUNvbXBhbnkoYywgY29uZmlnLnJlc291cmNlVHlwZXMpKSwKICB9Owp9CgovLyAtLS0gU2F2ZXMgbm9tZWFkb3MgKG3Dumx0aXBsb3Mgc2xvdHMsIGFsw6ltIGRvIGF1dG9zYXZlIGRhIHNlc3PDo28gYXR1YWwp",
"IC0tLQpmdW5jdGlvbiBsaXN0U2F2ZXMoKSB7CiAgdHJ5IHsKICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNBVkVfSU5ERVhfS0VZKTsKICAgIGNvbnN0IGlkeCA9IHJhdyA/IEpTT04ucGFyc2UocmF3KSA6IFtdOwogICAgcmV0dXJuIGlkeC5zb3J0KChhLCBiKSA9PiBiLnVwZGF0ZWRBdCAtIGEudXBkYXRlZEF0KTsKICB9IGNhdGNoIChlKSB7CiAgICByZXR1cm4gW107CiAgfQp9CgpmdW5jdGlvbiB3cml0ZVNhdmVzSW5kZXgobGlzdCkgewogIHRyeSB7CiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTQVZF",
"X0lOREVYX0tFWSwgSlNPTi5zdHJpbmdpZnkobGlzdCkpOwogIH0gY2F0Y2ggKGUpIHsKICAgIGNvbnNvbGUuZXJyb3IoIkZhbGhhIGFvIGdyYXZhciDDrW5kaWNlIGRlIHNhdmVzIiwgZSk7CiAgfQp9CgpmdW5jdGlvbiBzYXZlU2xvdChuYW1lLCBzdGF0ZSwgZXhpc3RpbmdJZCkgewogIGNvbnN0IGlkID0gZXhpc3RpbmdJZCB8fCB1aWQoKTsKICB0cnkgewogICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU0FWRV9QUkVGSVggKyBpZCwgSlNPTi5zdHJpbmdpZnkoc3RhdGUpKTsKICAgIGNvbnN0IGlkeCA9IGxpc3RTYXZlcygpLmZp",
"bHRlcigocykgPT4gcy5pZCAhPT0gaWQpOwogICAgaWR4LnB1c2goeyBpZCwgbmFtZSwgdXBkYXRlZEF0OiBEYXRlLm5vdygpIH0pOwogICAgd3JpdGVTYXZlc0luZGV4KGlkeCk7CiAgfSBjYXRjaCAoZSkgewogICAgY29uc29sZS5lcnJvcigiRmFsaGEgYW8gc2FsdmFyIiwgZSk7CiAgICBhbGVydCgiTsOjbyBmb2kgcG9zc8OtdmVsIHNhbHZhciDigJQgbyBhcm1hemVuYW1lbnRvIGxvY2FsIHBvZGUgZXN0YXIgY2hlaW8uIik7CiAgfQogIHJldHVybiBpZDsKfQoKZnVuY3Rpb24gbG9hZFNsb3RSYXcoaWQpIHsKICB0cnkgewog",
"ICAgY29uc3QgcmF3ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU0FWRV9QUkVGSVggKyBpZCk7CiAgICByZXR1cm4gcmF3ID8gSlNPTi5wYXJzZShyYXcpIDogbnVsbDsKICB9IGNhdGNoIChlKSB7CiAgICByZXR1cm4gbnVsbDsKICB9Cn0KCmZ1bmN0aW9uIGRlbGV0ZVNsb3QoaWQpIHsKICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShTQVZFX1BSRUZJWCArIGlkKTsKICB3cml0ZVNhdmVzSW5kZXgobGlzdFNhdmVzKCkuZmlsdGVyKChzKSA9PiBzLmlkICE9PSBpZCkpOwp9CgpmdW5jdGlvbiB1c2VBcHBTdGF0ZSgpIHsKICBjb25z",
"dCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKG51bGwpOwogIGNvbnN0IFtsb2FkZWQsIHNldExvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7CgogIHVzZUVmZmVjdCgoKSA9PiB7CiAgICBsZXQgbG9hZGVkU3RhdGUgPSBudWxsOwogICAgdHJ5IHsKICAgICAgY29uc3QgcmF3ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVkpOwogICAgICBpZiAocmF3KSBsb2FkZWRTdGF0ZSA9IEpTT04ucGFyc2UocmF3KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgY29uc29sZS5lcnJvcigiRmFsaGEgYW8gbGVyIGRhZG9z",
"IHNhbHZvcyIsIGUpOwogICAgfQogICAgc2V0U3RhdGUobG9hZGVkU3RhdGUgPyBub3JtYWxpemVMb2FkZWRTdGF0ZShsb2FkZWRTdGF0ZSkgOiBERUZBVUxUX1NUQVRFKTsKICAgIHNldExvYWRlZCh0cnVlKTsKICB9LCBbXSk7CgogIGNvbnN0IHBlcnNpc3QgPSB1c2VDYWxsYmFjaygobmV4dCkgPT4gewogICAgc2V0U3RhdGUobmV4dCk7CiAgICB0cnkgewogICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkobmV4dCkpOwogICAgfSBjYXRjaCAoZSkgewogICAgICBjb25zb2xlLmVy",
"cm9yKCJGYWxoYSBhbyBzYWx2YXIiLCBlKTsKICAgIH0KICB9LCBbXSk7CgogIC8vID09PT09PSBJTlRFR1JBw4fDg08g4oCUIHNpbmNyb25pemHDp8OjbyBjb20gbyBHYWxhY3RpYyBMZWRnZXIgKGlmcmFtZSBwYWkpID09PT09PQogIC8vIHNraXBQdWJsaXNoUmVmIGV2aXRhIGxvb3A6IHF1YW5kbyBvIGVzdGFkbyBtdWRhIHBvciBjYXVzYSBkZSB1bWEKICAvLyBtZW5zYWdlbSBWSU5EQSBkbyBMZWRnZXIsIG1hcmNhbW9zIGVzc2EgZmxhZyBwcmEgbsOjbyBwdWJsaWNhciBkZSB2b2x0YQogIC8vIGEgbWVzbWEgaW5mb3JtYcOn",
"w6NvIHF1ZSBhY2FiYW1vcyBkZSByZWNlYmVyLgogIGNvbnN0IHNraXBQdWJsaXNoUmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTsKCiAgdXNlRWZmZWN0KCgpID0+IHsKICAgIGlmICghbG9hZGVkIHx8ICFzdGF0ZSkgcmV0dXJuOwogICAgaWYgKHdpbmRvdy5wYXJlbnQgPT09IHdpbmRvdykgcmV0dXJuOyAvLyBzw7Mgc2luY3Jvbml6YSBzZSBlc3RpdmVyIGRlbnRybyBkbyBMZWRnZXIKICAgIGlmIChza2lwUHVibGlzaFJlZi5jdXJyZW50KSB7IHNraXBQdWJsaXNoUmVmLmN1cnJlbnQgPSBmYWxzZTsgcmV0dXJuOyB9CiAgICB0",
"cnkgewogICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHsKICAgICAgICB0eXBlOiAicnBnLXN5bmMiLCBzb3VyY2U6ICJjb21lcmNpbyIsCiAgICAgICAgcGF5bG9hZDogewogICAgICAgICAgZmFjdGlvbnM6IHN0YXRlLmZhY3Rpb25zLm1hcCgoZikgPT4gKHsgaWQ6IGYuaWQsIG5hbWU6IGYubmFtZSwgY29sb3I6IGYuY29sb3IsIGNyZWRpdHM6IGYuYmFuaywgZmFjY3JlZHM6IDAgfSkpLAogICAgICAgICAgY29tcGFuaWVzOiBzdGF0ZS5jb21wYW5pZXMubWFwKChjKSA9PiAoewogICAgICAgICAgICBpZDogYy5pZCwg",
"bmFtZTogYy5uYW1lLAogICAgICAgICAgICBjcmVkaXRzOiAoYy5yZXNvdXJjZXMgJiYgYy5yZXNvdXJjZXNbIkNyw6lkaXRvcyJdKSB8fCAwLAogICAgICAgICAgICBmYWNjcmVkczogKGMucmVzb3VyY2VzICYmIGMucmVzb3VyY2VzWyJGYWNjcmVkcyJdKSB8fCAwLAogICAgICAgICAgfSkpLAogICAgICAgIH0sCiAgICAgIH0sICIqIik7CiAgICB9IGNhdGNoIChlKSB7fQogIH0sIFtzdGF0ZSwgbG9hZGVkXSk7CgogIHVzZUVmZmVjdCgoKSA9PiB7CiAgICBmdW5jdGlvbiBoYW5kbGVyKGUpIHsKICAgICAgY29uc3QgbXNnID0g",
"ZS5kYXRhOwogICAgICBpZiAoIW1zZyB8fCBtc2cudHlwZSAhPT0gInJwZy1zeW5jLWFwcGx5IikgcmV0dXJuOwogICAgICBjb25zdCBkYWRvcyA9IG1zZy5wYXlsb2FkIHx8IHt9OwogICAgICBzZXRTdGF0ZSgocHJldikgPT4gewogICAgICAgIGlmICghcHJldikgcmV0dXJuIHByZXY7CiAgICAgICAgbGV0IG11ZG91ID0gZmFsc2U7CiAgICAgICAgY29uc3QgZmFjdGlvbnMgPSBbLi4ucHJldi5mYWN0aW9uc107CiAgICAgICAgKGRhZG9zLmZhY3Rpb25zIHx8IFtdKS5mb3JFYWNoKChiZikgPT4gewogICAgICAgICAgY29uc3Qg",
"aSA9IGZhY3Rpb25zLmZpbmRJbmRleCgoZikgPT4gZi5pZCA9PT0gYmYuaWQpOwogICAgICAgICAgaWYgKGkgPT09IC0xKSB7CiAgICAgICAgICAgIGZhY3Rpb25zLnB1c2goeyBpZDogYmYuaWQsIG5hbWU6IGJmLm5hbWUsIGRlc2NyaXB0aW9uOiAiIiwgY29sb3I6IGJmLmNvbG9yIHx8ICIjMzhiZGY4IiwgYmFuazogYmYuY3JlZGl0cyB8fCAwLCBkb21pbmFudDogZmFsc2UsIGRlbWFuZDogIiIgfSk7CiAgICAgICAgICAgIG11ZG91ID0gdHJ1ZTsKICAgICAgICAgIH0gZWxzZSBpZiAoZmFjdGlvbnNbaV0ubmFtZSAhPT0gYmYu",
"bmFtZSkgewogICAgICAgICAgICBmYWN0aW9uc1tpXSA9IHsgLi4uZmFjdGlvbnNbaV0sIG5hbWU6IGJmLm5hbWUgfTsKICAgICAgICAgICAgbXVkb3UgPSB0cnVlOwogICAgICAgICAgfQogICAgICAgIH0pOwogICAgICAgIGlmICghbXVkb3UpIHJldHVybiBwcmV2OwogICAgICAgIHNraXBQdWJsaXNoUmVmLmN1cnJlbnQgPSB0cnVlOyAvLyBlc3NhIGF0dWFsaXphw6fDo28gdmVpbyBkZSBmb3JhLCBuw6NvIHJlcHVibGljYXIKICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2LCBmYWN0aW9ucyB9OwogICAgICAgIHRyeSB7",
"IGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShuZXh0KSk7IH0gY2F0Y2ggKGUpIHt9CiAgICAgICAgcmV0dXJuIG5leHQ7CiAgICAgIH0pOwogICAgfQogICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBoYW5kbGVyKTsKICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsIGhhbmRsZXIpOwogIH0sIFtdKTsKCiAgcmV0dXJuIHsgc3RhdGUsIHNldFN0YXRlOiBwZXJzaXN0LCBsb2FkZWQgfTsKfQpmdW5jdGlvbiBCYWRnZSh7",
"IGNoaWxkcmVuLCB0b25lID0gInNsYXRlIiB9KSB7CiAgY29uc3QgdG9uZXMgPSB7CiAgICBzbGF0ZTogImJnLXNsYXRlLTcwMC81MCB0ZXh0LWhvbG8tc2Vjb25kYXJ5IGJvcmRlci1za3ktNTAwLzIwIiwKICAgIHNreTogImJnLXNreS01MDAvMTUgdGV4dC1za3ktMzAwIGJvcmRlci1za3ktNDAwLzQwIiwKICAgIGJsdWU6ICJiZy1za3ktNTAwLzE1IHRleHQtc2t5LTMwMCBib3JkZXItc2t5LTQwMC80MCIsCiAgICBncmVlbjogImJnLWVtZXJhbGQtNTAwLzE1IHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyLWVtZXJhbGQtNDAwLzQw",
"IiwKICAgIHJlZDogImJnLXJvc2UtNTAwLzE1IHRleHQtcm9zZS0zMDAgYm9yZGVyLXJvc2UtNDAwLzQwIiwKICB9OwogIHJldHVybiAoCiAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC1bMTFweF0gZm9udC1tZWRpdW0gYm9yZGVyIHRyYWNraW5nLXdpZGUgJHt0b25lc1t0b25lXX1gfT4KICAgICAge2NoaWxkcmVufQogICAgPC9zcGFuPgogICk7Cn0KCmZ1bmN0aW9uIFByb2dyZXNzQmFyKHsgdmFsdWUsIG1heCB9KSB7CiAgY29uc3QgcGN0ID0gbWF4ID4gMCA/IE1hdGgubWluKDEw",
"MCwgTWF0aC5yb3VuZCgodmFsdWUgLyBtYXgpICogMTAwKSkgOiAwOwogIGNvbnN0IHRvbmUgPSBwY3QgPj0gMTAwID8gImZyb20tZW1lcmFsZC01MDAgdG8tZW1lcmFsZC0zMDAiIDogcGN0IDwgMzAgPyAiZnJvbS1yb3NlLTUwMCB0by1yb3NlLTMwMCIgOiAiZnJvbS1za3ktNTAwIHRvLXNreS0zMDAiOwogIHJldHVybiAoCiAgICA8ZGl2IGNsYXNzTmFtZT0idy1mdWxsIGgtMiByb3VuZGVkLWZ1bGwgYmctYmxhY2svNDAgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItc2t5LTUwMC8xNSI+CiAgICAgIDxkaXYgY2xhc3NO",
"YW1lPXtgaC1mdWxsIGJnLWdyYWRpZW50LXRvLXIgJHt0b25lfSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDBgfSBzdHlsZT17eyB3aWR0aDogYCR7cGN0fSVgIH19IC8+CiAgICA8L2Rpdj4KICApOwp9CgpmdW5jdGlvbiBNb2RhbCh7IHRpdGxlLCBvbkNsb3NlLCBjaGlsZHJlbiwgd2lkZSB9KSB7CiAgcmV0dXJuICgKICAgIDxkaXYgY2xhc3NOYW1lPSJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctYmxhY2svODAgYmFja2Ryb3AtYmx1ci1zbSBwLTQiPgogICAgICA8ZGl2",
"IGNsYXNzTmFtZT17YGhvbG8tbW9kYWwgcm91bmRlZC14bCB3LWZ1bGwgJHt3aWRlID8gIm1heC13LTJ4bCIgOiAibWF4LXctbGcifSBtYXgtaC1bOTB2aF0gb3ZlcmZsb3cteS1hdXRvYH0+CiAgICAgICAgPGRpdiBjbGFzc05hbWU9ImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC01IHB5LTQgYm9yZGVyLWIgYm9yZGVyLXNreS01MDAvMjAgc3RpY2t5IHRvcC0wIGJnLVsjMDcwZjFhXS85NSB6LTEwIj4KICAgICAgICAgIDxoMyBjbGFzc05hbWU9ImhvbG8tdGl0bGUgdGV4dC1sZyBmb250LXNlbWlib2xkIj57",
"dGl0bGV9PC9oMz4KICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25DbG9zZX0gY2xhc3NOYW1lPSJ0ZXh0LWhvbG8tbXV0ZWQgaG92ZXI6dGV4dC1za3ktMzAwIHRyYW5zaXRpb24iPgogICAgICAgICAgICA8SWNvbiBuYW1lPSJ4IiBzaXplPXsyMH0gLz4KICAgICAgICAgIDwvYnV0dG9uPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3NOYW1lPSJwLTUiPntjaGlsZHJlbn08L2Rpdj4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICApOwp9CgpmdW5jdGlvbiBGaWVsZCh7IGxhYmVsLCBjaGlsZHJlbiB9KSB7CiAg",
"cmV0dXJuICgKICAgIDxsYWJlbCBjbGFzc05hbWU9ImJsb2NrIG1iLTMiPgogICAgICA8c3BhbiBjbGFzc05hbWU9ImJsb2NrIHRleHQtWzExcHhdIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LWhvbG8tbXV0ZWQgbWItMSI+e2xhYmVsfTwvc3Bhbj4KICAgICAge2NoaWxkcmVufQogICAgPC9sYWJlbD4KICApOwp9Cgpjb25zdCBpbnB1dENscyA9ICJob2xvLWlucHV0IHctZnVsbCByb3VuZGVkLW1kIHB4LTMgcHktMiB0ZXh0LXNtIjsKCmZ1bmN0aW9uIEhlbHBQYW5lbCgpIHsKICBjb25zdCBbb3Blbiwgc2V0T3Blbl0g",
"PSB1c2VTdGF0ZShudWxsKTsKICBjb25zdCBzZWN0aW9ucyA9IFsKICAgIHsKICAgICAgazogInJlY3Vyc29zIiwKICAgICAgdGl0bGU6ICJHZXJlbmNpYW1lbnRvIGRlIFJlY3Vyc29zIiwKICAgICAgYm9keTogKAogICAgICAgIDw+CiAgICAgICAgICA8cD5DYWRhIGVtcHJlc2EgbWFudMOpbSB1bSBlc3RvcXVlIGRlIDxiPnJlY3Vyc29zPC9iPiAoQ3LDqWRpdG9zLCBNYXRlcmlhaXMsIFN1cHJpbWVudG9zLCBNw6NvIGRlIE9icmEgcG9yIHBhZHLDo28g4oCUIG8gTWVzdHJlIHBvZGUgcmVub21lYXIgb3UgY3JpYXIgbm92b3Mg",
"dGlwb3MgZW0gQ29uZmlndXJhw6fDtWVzKS48L3A+CiAgICAgICAgICA8cCBjbGFzc05hbWU9Im10LTIiPlJlY3Vyc29zIHPDo28gZ2FzdG9zIHBhcmEgY29uc3RydWlyIGF0aXZvcywgcGFnYXIgYSA8Yj5tYW51dGVuw6fDo28gbWVuc2FsPC9iPiBlIHJlY2ViZXIgcGFnYW1lbnRvcyBkZSBzdWJzw61kaW8uIENyw6lkaXRvcyBwb2RlbSBzZXIgY29udmVydGlkb3MgZW0gb3V0cm9zIHJlY3Vyc29zIHBlbGEgdGF4YSBkZSBjb252ZXJzw6NvIGRlZmluaWRhIHBlbG8gTWVzdHJlLjwvcD4KICAgICAgICA8Lz4KICAgICAgKSwKICAg",
"IH0sCiAgICB7CiAgICAgIGs6ICJtZXRhcyIsCiAgICAgIHRpdGxlOiAiTWV0YXMgKGluZGVwZW5kZW50ZXMpIiwKICAgICAgYm9keTogKAogICAgICAgIDw+CiAgICAgICAgICA8cD5DYWRhIGVtcHJlc2EgcG9kZSB0ZXIgPGI+dsOhcmlhcyBtZXRhczwvYj4gYW8gbWVzbW8gdGVtcG8g4oCUIGNhZGEgdW1hIGNvbSBkZXNjcmnDp8OjbywgcHJvZ3Jlc3NvIGF0dWFsLCB2YWxvci1hbHZvIGUgcHJhem8uIEFzIG1ldGFzIHPDo28gY2FkYXN0cmFkYXMgZSBhdHVhbGl6YWRhcyBuYSBmaWNoYSBkYSBlbXByZXNhLCBuYSBzZcOnw6Nv",
"ICJNZXRhcyIuPC9wPgogICAgICAgICAgPHAgY2xhc3NOYW1lPSJtdC0yIj5PIHByb2dyZXNzbyDDqSBhdHVhbGl6YWRvIG1hbnVhbG1lbnRlIHBlbG8gTWVzdHJlIGNvbmZvcm1lIG8gYW5kYW1lbnRvIGRhIGNhbXBhbmhhLiBRdWFuZG8gdW1hIHJvdGHDp8OjbyBxdWUgdmVyaWZpY2EgbWV0YXMgcm9kYSAoRGnDoXJpYSBvdSBMb25nYSksIGNhZGEgbWV0YSDDqSBhdmFsaWFkYTogYmF0ZXUgb3UgbsOjbyBiYXRldS48L3A+CiAgICAgICAgPC8+CiAgICAgICksCiAgICB9LAogICAgewogICAgICBrOiAic3Vic2lkaW8iLAogICAg",
"ICB0aXRsZTogIlN1YnPDrWRpb3MgKGluZGVwZW5kZW50ZXMsIHZpbmN1bMOhdmVpcyBhIHVtYSBtZXRhKSIsCiAgICAgIGJvZHk6ICgKICAgICAgICA8PgogICAgICAgICAgPHA+Q2FkYSBlbXByZXNhIHRhbWLDqW0gcG9kZSB0ZXIgPGI+dsOhcmlvcyBzdWJzw61kaW9zPC9iPiwgY2FkYSB1bSB2aW5kbyBkZSB1bWEgPGI+RmFjw6fDo288L2I+IChjYWRhc3RyYWRhIG5hIGFiYSBGYWPDp8O1ZXMpLCBjb20gdmFsb3IsIHJlY3Vyc28gcGFnbyBlIHNpdHVhw6fDo28gKGF0aXZvL2NvcnRhZG8pLjwvcD4KICAgICAgICAgIDxwIGNs",
"YXNzTmFtZT0ibXQtMiI+VW0gc3Vic8OtZGlvIHBvZGUsIG9wY2lvbmFsbWVudGUsIHNlciA8Yj52aW5jdWxhZG8gYSB1bWEgbWV0YSBlc3BlY8OtZmljYTwvYj4gZGFxdWVsYSBlbXByZXNhLiBTZSBhIG1ldGEgdmluY3VsYWRhIGZhbGhhciBudW1hIHJvdGHDp8OjbyBxdWUgdmVyaWZpY2EgbWV0YXMsIGFxdWVsZSBzdWJzw61kaW8gw6kgY29ydGFkbyBhdXRvbWF0aWNhbWVudGUuIFN1YnPDrWRpb3Mgc2VtIG1ldGEgdmluY3VsYWRhIHPDo28gcGFnb3Mgc2VtIGNvbmRpw6fDo28sIGVucXVhbnRvIGVzdGl2ZXJlbSBtYXJjYWRv",
"cyBjb21vIGF0aXZvcy48L3A+CiAgICAgICAgPC8+CiAgICAgICksCiAgICB9LAogICAgewogICAgICBrOiAiYXRpdm9zIiwKICAgICAgdGl0bGU6ICJBdGl2b3MgKE5hdmVzLCBEcm9pZGVzLCBFc3RydXR1cmFzKSIsCiAgICAgIGJvZHk6ICgKICAgICAgICA8PgogICAgICAgICAgPHA+TmEgZmljaGEgZGEgZW1wcmVzYSwgYWRpY2lvbmUgYXRpdm9zIGNvbSBjdXN0byBkZSBjb25zdHJ1w6fDo28sIG1hbnV0ZW7Dp8OjbyBtZW5zYWwgZSBzdGF0dXMgKGVtIGNvbnN0cnXDp8OjbyAvIGF0aXZvIC8gaW5hdGl2bykuIEEgbWFudXRl",
"bsOnw6NvIGRlIHRvZG9zIG9zIGF0aXZvcyBlbnRyYSBhdXRvbWF0aWNhbWVudGUgbmEgY29udGEgZGUgZ2FzdG9zIGZpeG9zIGRhIGVtcHJlc2EuPC9wPgogICAgICAgIDwvPgogICAgICApLAogICAgfSwKICAgIHsKICAgICAgazogImRvbWluYW50ZSIsCiAgICAgIHRpdGxlOiAiRmFjw6fDo28gRG9taW5hbnRlIChvIGJhbmNvIGRvIHNldG9yKSIsCiAgICAgIGJvZHk6ICgKICAgICAgICA8PgogICAgICAgICAgPHA+TmEgYWJhIDxiPkZhY8Onw7VlczwvYj4sIG8gTWVzdHJlIG1hcmNhIHVtYSBmYWPDp8OjbyBjb21vIDxiPkRv",
"bWluYW50ZTwvYj4gKOKYhSkg4oCUIMOpIGVsYSBxdWVtICJtYW5kYSIgbm8gc2V0b3IuIEVsYSB0ZW0gdW0gPGI+QmFuY288L2I+IHByw7NwcmlvIChzYWxkbyBlbSBDcsOpZGl0b3MpLCB1bWEgPGI+bWV0YS9leGlnw6puY2lhIGdlcmFsPC9iPiBlIMOpIGRlbGEgcXVlIHNhaSBvIGRpbmhlaXJvIGRlIHF1YWxxdWVyIHN1YnPDrWRpbyBxdWUgZWxhIG1lc21hIHBhZ3VlLjwvcD4KICAgICAgICAgIDxwIGNsYXNzTmFtZT0ibXQtMiI+VG9kYSB2ZXogcXVlIHZvY8OqICJSb2RhIG8gVGVtcG8iLCA8Yj5hIG1hbnV0ZW7Dp8OjbyBw",
"YWdhIHBvciB0b2RhcyBhcyBlbXByZXNhcyBlbnRyYSBhdXRvbWF0aWNhbWVudGUgbm8gYmFuY28gZGEgRmFjw6fDo28gRG9taW5hbnRlPC9iPiDigJQgY29tbyB1bSBpbXBvc3RvLiBPdSBzZWphOiBhcyBlbXByZXNhcyBzdXN0ZW50YW0gbyBnb3Zlcm5vLCBlIG8gZ292ZXJubyAodmlhIHN1YnPDrWRpb3MpIHBvZGUgc3VzdGVudGFyIGRlIHZvbHRhIGFzIGVtcHJlc2FzIHF1ZSBpbnRlcmVzc2FtIGEgZWxlLjwvcD4KICAgICAgICAgIDxwIGNsYXNzTmFtZT0ibXQtMiI+UXVhbHF1ZXIgZmFjw6fDo28gKGRvbWluYW50ZSBvdSBu",
"w6NvKSBxdWUgcGFndWUgc3Vic8OtZGlvIGVtIENyw6lkaXRvcyB0ZW0gZXNzZSB2YWxvciBkZXNjb250YWRvIGRvIHByw7NwcmlvIGJhbmNvIGF1dG9tYXRpY2FtZW50ZS48L3A+CiAgICAgICAgPC8+CiAgICAgICksCiAgICB9LAogICAgewogICAgICBrOiAiZWNvbm9taWEiLAogICAgICB0aXRsZTogIkEgRWNvbm9taWEgRHVwbGE6IEZhY2NyZWRzIHggQ3LDqWRpdG9zIEltcGVyaWFpcyIsCiAgICAgIGJvZHk6ICgKICAgICAgICA8PgogICAgICAgICAgPHA+VG9kYSBlbXByZXNhIGxpZGEgY29tIDxiPmRvaXMgdGlwb3MgZGUg",
"ZGluaGVpcm88L2I+LCBxdWUgbnVuY2Egc2UgbWlzdHVyYW06PC9wPgogICAgICAgICAgPHVsIGNsYXNzTmFtZT0ibGlzdC1kaXNjIHBsLTUgbXQtMiBzcGFjZS15LTEiPgogICAgICAgICAgICA8bGk+PGI+RmFjY3JlZHMgKEZhYyk8L2I+IOKAlCBtb2VkYSBkZSA8Yj5pbnZlc3RpbWVudG8gZsOtc2ljbzwvYj4uIFNlcnZlIHPDsyBwYXJhIG1vbnRhciBhIGVtcHJlc2E6IGNvbXByYXIgZmVycmFtZW50YXMsIHByw6lkaW9zLCBuYXZlcywgcGXDp2FzIGRlIGRyb2lkZSwgbGljZW7Dp2FzIGRlIHRlcnJlbm8uIE51bmNhIHBhZ2Eg",
"Z2VudGUuIDEgRmFjID0gMTAuMDAwIENyw6lkaXRvcyBwb3IgcGFkcsOjbyAoYWp1c3TDoXZlbCBlbSBDb25maWd1cmHDp8O1ZXMpLjwvbGk+CiAgICAgICAgICAgIDxsaT48Yj5DcsOpZGl0b3MgSW1wZXJpYWlzPC9iPiDigJQgZGluaGVpcm8gZG8gZGlhIGEgZGlhLiBQYWdhIGEgPGI+Zm9saGEgZGUgcGFnYW1lbnRvPC9iPiwgcHJvcGluYSwgYWx1Z3VlbCwgZW5lcmdpYS4gU2VtIENyw6lkaXRvcyBubyBmaW0gZG8gbcOqcywgb3MgZnVuY2lvbsOhcmlvcyBmYXplbSBncmV2ZSBlIGEgZW1wcmVzYSBwYXJhLjwvbGk+CiAgICAg",
"ICAgICA8L3VsPgogICAgICAgICAgPHAgY2xhc3NOYW1lPSJtdC0yIj5BIGVtcHJlc2EgbnVuY2EgZ2VyYSAiZGluaGVpcm8iIHNvemluaGEg4oCUIGVsYSBnZXJhIHVtIDxiPnByb2R1dG8gZsOtc2ljbzwvYj4gKG1pbsOpcmlvLCByZW3DqWRpb3MsIGNvbGhlaXRhLi4uKSBhdHJhdsOpcyBkYSBQcm9kdcOnw6NvIEF1dG9tw6F0aWNhLiBPIGx1Y3JvIHPDsyBhY29udGVjZSBxdWFuZG8gZXNzZSBwcm9kdXRvIMOpIHZlbmRpZG8gZW0gYWxndW0gbHVnYXIgZG8gam9nby48L3A+CiAgICAgICAgPC8+CiAgICAgICksCiAgICB9LAog",
"ICAgewogICAgICBrOiAicGxhbmV0YSIsCiAgICAgIHRpdGxlOiAiTsOtdmVsIGRvIFBsYW5ldGEgKG11bHRpcGxpY2Fkb3IgZGUgY3VzdG8pIiwKICAgICAgYm9keTogKAogICAgICAgIDw+CiAgICAgICAgICA8cD5PIHBsYW5ldGEgb25kZSBhIGVtcHJlc2Egw6kgbW9udGFkYSBtdWx0aXBsaWNhIG8gPGI+Q3VzdG8gQmFzZSBkZSBUYWJlbGE8L2I+IGFudGVzIGRlIGNvbnZlcnRlciBwYXJhIEZhY2NyZWRzOjwvcD4KICAgICAgICAgIDx1bCBjbGFzc05hbWU9Imxpc3QtZGlzYyBwbC01IG10LTIgc3BhY2UteS0xIj4KICAgICAg",
"ICAgICAge1siRmF2ZWxpemFkbyAoeDAsNSkiLCAiUG9icmUgKHgxLCBiYXNlKSIsICJDb211bSAoeDIpIiwgIkJvbSAoeDMpIiwgIkVsaXRlICh4NSkiLCAiSW5pZ3VhbMOhdmVsICh4MTApIl0ubWFwKCh0KSA9PiA8bGkga2V5PXt0fT57dH08L2xpPil9CiAgICAgICAgICA8L3VsPgogICAgICAgICAgPHAgY2xhc3NOYW1lPSJtdC0yIj5FeDogQ3VzdG8gQmFzZSAxLjUwMC4wMDAgbnVtIHBsYW5ldGEgRmF2ZWxpemFkbyAoeDAsNSkgPSA3NTAuMDAwIENyw6lkaXRvcyDihpIgZGl2aWRpZG8gcGVsYSB0YXhhIGRlIGPDom1iaW8g",
"KDEwLjAwMCkgPSA3NSBGYWNjcmVkcyBwYXJhIG1vbnRhci48L3A+CiAgICAgICAgPC8+CiAgICAgICksCiAgICB9LAogICAgewogICAgICBrOiAidGlwb3MiLAogICAgICB0aXRsZTogIlByZXNldHMgZGUgRW1wcmVzYSBlIFBvcnRlIChNZW5vci9Nw6lkaW8vTWFpb3IpIiwKICAgICAgYm9keTogKAogICAgICAgIDw+CiAgICAgICAgICA8cD5BbyBjcmlhciB1bWEgZW1wcmVzYSwgZXNjb2xoYSB1bSA8Yj5QcmVzZXQ8L2I+IChNaW5hLCBFc3RhbGVpcm8sIEd1YXJuacOnw6NvLCBGYXplbmRhLCBGYXplbmRhIGRlIFVtaWRhZGUs",
"IEJhbmNvLCBGYXJtYWPDqnV0aWNhLCBDb250cmFiYW5kbywgTWVyY2Vuw6FyaW9zKSBlIHVtIDxiPlBvcnRlPC9iPi4gSXNzbyBwcmVlbmNoZSBhdXRvbWF0aWNhbWVudGU6IEN1c3RvIEJhc2UgZGUgVGFiZWxhLCBuwrogZGUgZnVuY2lvbsOhcmlvcywgc2Fsw6FyaW8gcG9yIGZ1bmNpb27DoXJpbyBlIHByb2R1w6fDo28gbWVuc2FsIOKAlCB0dWRvIGNvbnRpbnVhIGVkaXTDoXZlbCBkZXBvaXMuPC9wPgogICAgICAgICAgPHAgY2xhc3NOYW1lPSJtdC0yIj5QcmVzZXRzIHF1ZSAicHJvZHV6ZW0iIChNaW5h4oaSTWluw6lyaW8s",
"IEZhemVuZGHihpJDb2xoZWl0YSwgRmF6ZW5kYSBkZSBVbWlkYWRl4oaSw4FndWEsIEZhcm1hY8OqdXRpY2HihpJSZW3DqWRpb3MsIENvbnRyYWJhbmRv4oaSQ29udHJhYmFuZG8pIGdhbmhhbSBQcm9kdcOnw6NvIEF1dG9tw6F0aWNhLiBQcmVzZXRzIGRlIHNlcnZpw6dvIChFc3RhbGVpcm8sIEd1YXJuacOnw6NvLCBCYW5jbywgTWVyY2Vuw6FyaW9zKSBuw6NvIGdlcmFtIHByb2R1dG8gdmVuZMOhdmVsIOKAlCBvIGx1Y3JvIGRlbGVzIHZlbSBkZSBvdXRybyBqZWl0byAoY29udHJhdG9zLCBwcm90ZcOnw6NvLCBldGMpLCBjb21v",
"IGRlc2NyaXRvIG5hIGZpY2hhLjwvcD4KICAgICAgICAgIDxwIGNsYXNzTmFtZT0ibXQtMiI+TmEgZmljaGEsIG8gYm90w6NvIDxiPiJEZWJpdGFyIEZhY2NyZWRzIGFnb3JhIjwvYj4gZGVzY29udGEgZG8gY2FpeGEgbyBjdXN0byBkZSBtb250YWdlbSBjYWxjdWxhZG8g4oCUIHZvY8OqIGRlY2lkZSBxdWFuZG8gaXNzbyBhY29udGVjZSBuYSBuYXJyYXRpdmEuPC9wPgogICAgICAgIDwvPgogICAgICApLAogICAgfSwKICAgIHsKICAgICAgazogInJvZGFyIiwKICAgICAgdGl0bGU6ICJSb2RhciBvIFRlbXBvIChjw6FsY3VsbyBh",
"dXRvbcOhdGljbykiLAogICAgICBib2R5OiAoCiAgICAgICAgPD4KICAgICAgICAgIDxwPk5hIGFiYSA8Yj5Sb2RhcjwvYj4sIG8gTWVzdHJlIGVzY29saGUgdW0gZG9zIHRyw6pzIHRpcG9zIGRlIHJvdGHDp8Ojbzo8L3A+CiAgICAgICAgICA8dWwgY2xhc3NOYW1lPSJsaXN0LWRpc2MgcGwtNSBtdC0yIHNwYWNlLXktMSI+CiAgICAgICAgICAgIDxsaT48Yj5Sb3Rhw6fDo28gRGnDoXJpYTwvYj4g4oCUIHNlbXByZSAxIGRpYSAoMS8zMCBkbyBtw6pzKS4gQ29icmEgbWFudXRlbsOnw6NvLCBwYWdhIHN1YnPDrWRpb3MgcHJvcG9y",
"Y2lvbmFsbWVudGUgZSA8Yj52ZXJpZmljYSBtZXRhczwvYj4uPC9saT4KICAgICAgICAgICAgPGxpPjxiPlJvdGHDp8OjbyBDdXJ0YTwvYj4g4oCUIDEgRGlhIG91IDEgU2VtYW5hLCBjb25mb3JtZSBjb25maWd1cmFkby4gU8OzIGNvYnJhL3BhZ2EgcHJvcG9yY2lvbmFsbWVudGUsIG7Do28gdmVyaWZpY2EgbWV0YXMuPC9saT4KICAgICAgICAgICAgPGxpPjxiPlJvdGHDp8OjbyBMb25nYTwvYj4g4oCUIG8gbcOqcyBpbnRlaXJvLCB2YWxvcmVzIGNoZWlvcywgdmVyaWZpY2EgbWV0YXMgZSBjb3J0YSBzdWJzw61kaW9zIHZpbmN1",
"bGFkb3MgYSBtZXRhcyBxdWUgZmFsaGFyYW0uPC9saT4KICAgICAgICAgIDwvdWw+CiAgICAgICAgICA8cCBjbGFzc05hbWU9Im10LTIiPlRvZGEgZW1wcmVzYSBmaWNhIGNvbSBkw6lmaWNpdCBtYXJjYWRvIGVtIHZlcm1lbGhvIHNlIG8gY2FpeGEgZW0gQ3LDqWRpdG9zIGZpY2FyIG5lZ2F0aXZvLiBPIGhpc3TDs3JpY28gZGUgY2FkYSByb3Rhw6fDo28gZmljYSBzYWx2byBuYSBhYmEgUm9kYXIgZSB0YW1iw6ltIG5vcyBkZXRhbGhlcyBkZSBjYWRhIGVtcHJlc2EuPC9wPgogICAgICAgIDwvPgogICAgICApLAogICAgfSwKICAg",
"IHsKICAgICAgazogInNhdmVzIiwKICAgICAgdGl0bGU6ICJTYWx2YXIgZSBDYXJyZWdhciAodsOhcmlvcyBzYXZlcykiLAogICAgICBib2R5OiAoCiAgICAgICAgPD4KICAgICAgICAgIDxwPkEgZmVycmFtZW50YSBqw6EgZ3VhcmRhIHNldSBwcm9ncmVzc28gc296aW5oYSAoYXV0b3NhdmUpIHRvZGEgdmV6IHF1ZSBhbGdvIG11ZGEuIE1hcyBvIGJvdMOjbyA8Yj5TYWx2YXI8L2I+IG5vIHRvcG8gYWJyZSB1bWEgbGlzdGEgZGUgPGI+c2F2ZXMgbm9tZWFkb3M8L2I+IOKAlCBjb21vIG51bSBqb2dvIOKAlCBwcmEgdm9jw6ogZ3Vh",
"cmRhciBwb250b3MgZXNwZWPDrWZpY29zIGRhIGNhbXBhbmhhIGUgdm9sdGFyIGEgZWxlcyBkZXBvaXMuPC9wPgogICAgICAgICAgPHVsIGNsYXNzTmFtZT0ibGlzdC1kaXNjIHBsLTUgbXQtMiBzcGFjZS15LTEiPgogICAgICAgICAgICA8bGk+PGI+U2FsdmFyIGNvbW8gbm92bzwvYj46IGNyaWEgdW0gc2F2ZSBjb20gbyBub21lIHF1ZSB2b2PDqiBkaWdpdGFyIChleDogIkFudGVzIGRvIGF0YXF1ZSBhIENvcnVzY2FudCIpLjwvbGk+CiAgICAgICAgICAgIDxsaT48Yj5Tb2JyZXNjcmV2ZXI8L2I+OiBhdHVhbGl6YSB1bSBzYXZl",
"IGrDoSBleGlzdGVudGUgY29tIG8gZXN0YWRvIGF0dWFsLjwvbGk+CiAgICAgICAgICAgIDxsaT48Yj5DYXJyZWdhcjwvYj46IHN1YnN0aXR1aSB0dWRvIHF1ZSBlc3TDoSBuYSB0ZWxhIHBlbG8gY29udGXDumRvIGRhcXVlbGUgc2F2ZS48L2xpPgogICAgICAgICAgICA8bGk+PGI+RXhjbHVpcjwvYj46IGFwYWdhIG8gc2F2ZSBwZXJtYW5lbnRlbWVudGUuPC9saT4KICAgICAgICAgIDwvdWw+CiAgICAgICAgICA8cCBjbGFzc05hbWU9Im10LTIiPlRvZG9zIG9zIHNhdmVzIGZpY2FtIGd1YXJkYWRvcyBuZXN0ZSBuYXZlZ2Fkb3Iu",
"IFVzZSAiRXhwb3J0YXIiIHByYSB0aXJhciB1bWEgY8OzcGlhIGVtIGFycXVpdm8gYC5qc29uYCBkZSBiYWNrdXAgb3UgcHJhIGxldmFyIHByYSBvdXRybyBjb21wdXRhZG9yLjwvcD4KICAgICAgICA8Lz4KICAgICAgKSwKICAgIH0sCiAgICB7CiAgICAgIGs6ICJtb2RvIiwKICAgICAgdGl0bGU6ICJNb2RvIE1lc3RyZSB4IE1vZG8gSm9nYWRvciIsCiAgICAgIGJvZHk6ICgKICAgICAgICA8PgogICAgICAgICAgPHA+TyBib3TDo28gbm8gdG9wbyBhbHRlcm5hIGVudHJlIG9zIGRvaXMgbW9kb3MuIE5vIDxiPk1vZG8gTWVzdHJl",
"PC9iPiAodmVybWVsaG8sIGNhZGVhZG8gYWJlcnRvKSB2b2PDqiBjcmlhL2VkaXRhL3JlbW92ZSBlbXByZXNhcywgZmFjw6fDtWVzLCBhdGl2b3MsIG1ldGFzLCBzdWJzw61kaW9zLCByb2RhIG8gdGVtcG8gZSBnZXJlbmNpYSBvcyBzYXZlcy4gTm8gPGI+TW9kbyBKb2dhZG9yPC9iPiAoYXp1bCwgY2FkZWFkbyBmZWNoYWRvKSBhIHRlbGEgdmlyYSBhcGVuYXMgdmlzdWFsaXphw6fDo28uPC9wPgogICAgICAgICAgPHAgY2xhc3NOYW1lPSJtdC0yIj5PcyBkYWRvcyBmaWNhbSBzYWx2b3Mgbm8gbmF2ZWdhZG9yIGRlc3RlIGNvbXB1",
"dGFkb3IgKGxvY2FsU3RvcmFnZSkuIFVzZSBvcyBib3TDtWVzICJTYWx2YXIiLCAiRXhwb3J0YXIiIGUgIkltcG9ydGFyIiBubyB0b3BvIHBhcmEgZ3VhcmRhciBwb250b3MgZGEgY2FtcGFuaGEgb3UgbGV2YXIgbyBlc3RhZG8gcGFyYSBvdXRybyBjb21wdXRhZG9yLjwvcD4KICAgICAgICA8Lz4KICAgICAgKSwKICAgIH0sCiAgXTsKICByZXR1cm4gKAogICAgPGRpdiBjbGFzc05hbWU9InNwYWNlLXktMyI+CiAgICAgIDxwIGNsYXNzTmFtZT0idGV4dC1zbSB0ZXh0LWhvbG8tbXV0ZWQgbWItNCI+R3VpYSByw6FwaWRvIGRlIGNv",
"bW8gbyBnZXJlbmNpYW1lbnRvIGRlIGVtcHJlc2FzIGZ1bmNpb25hIG5lc3RhIGZlcnJhbWVudGEuPC9wPgogICAgICB7c2VjdGlvbnMubWFwKChzKSA9PiAoCiAgICAgICAgPGRpdiBrZXk9e3Mua30gY2xhc3NOYW1lPSJob2xvLXBhbmVsIHJvdW5kZWQtbGcgb3ZlcmZsb3ctaGlkZGVuIj4KICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSJ3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTQgcHktMyB0ZXh0LWxlZnQgaG92ZXI6Ymctc2t5LTUwMC81IHRyYW5zaXRpb24iIG9uQ2xpY2s9eygpID0+",
"IHNldE9wZW4ob3BlbiA9PT0gcy5rID8gbnVsbCA6IHMuayl9PgogICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9ImZvbnQtbWVkaXVtIHRleHQtaG9sby1wcmltYXJ5Ij57cy50aXRsZX08L3NwYW4+CiAgICAgICAgICAgIHtvcGVuID09PSBzLmsgPyA8SWNvbiBuYW1lPSJjaGV2cm9uZG93biIgc2l6ZT17MTh9IGNsYXNzTmFtZT0idGV4dC1za3ktNDAwIiAvPiA6IDxJY29uIG5hbWU9ImNoZXZyb25yaWdodCIgc2l6ZT17MTh9IGNsYXNzTmFtZT0idGV4dC1ob2xvLWZhaW50IiAvPn0KICAgICAgICAgIDwvYnV0dG9uPgogICAg",
"ICAgICAge29wZW4gPT09IHMuayAmJiA8ZGl2IGNsYXNzTmFtZT0icHgtNCBwYi00IHRleHQtc20gdGV4dC1ob2xvLXNlY29uZGFyeSBsZWFkaW5nLXJlbGF4ZWQiPntzLmJvZHl9PC9kaXY+fQogICAgICAgIDwvZGl2PgogICAgICApKX0KICAgIDwvZGl2PgogICk7Cn0KZnVuY3Rpb24gQ29uZmlnTW9kYWwoeyBjb25maWcsIG9uU2F2ZSwgb25DbG9zZSB9KSB7CiAgY29uc3QgW3JhdGUsIHNldFJhdGVdID0gdXNlU3RhdGUoY29uZmlnLmZhY1JhdGUpOwogIGNvbnN0IFt0eXBlcywgc2V0VHlwZXNdID0gdXNlU3RhdGUoY29uZmln",
"LnJlc291cmNlVHlwZXMuam9pbigiLCAiKSk7CiAgY29uc3QgW3Nob3J0VW5pdCwgc2V0U2hvcnRVbml0XSA9IHVzZVN0YXRlKGNvbmZpZy5zaG9ydFVuaXQgfHwgInNlbWFuYSIpOwogIHJldHVybiAoCiAgICA8TW9kYWwgdGl0bGU9IkNvbmZpZ3VyYcOnw7VlcyBHbG9iYWlzIiBvbkNsb3NlPXtvbkNsb3NlfT4KICAgICAgPEZpZWxkIGxhYmVsPSJUYXhhIGRlIEPDom1iaW8gKENyw6lkaXRvcyBJbXBlcmlhaXMgcG9yIDEgRmFjY3JlZCkiPgogICAgICAgIDxpbnB1dCB0eXBlPSJudW1iZXIiIGNsYXNzTmFtZT17aW5wdXRDbHN9",
"IHZhbHVlPXtyYXRlfSBvbkNoYW5nZT17KGUpID0+IHNldFJhdGUoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9IC8+CiAgICAgIDwvRmllbGQ+CiAgICAgIDxwIGNsYXNzTmFtZT0idGV4dC14cyB0ZXh0LWhvbG8tZmFpbnQgLW10LTIgbWItMyI+UGFkcsOjbyBkYSBnYWzDoXhpYTogMSBGYWNjcmVkID0gMTAuMDAwIENyw6lkaXRvcy4gRmFjY3JlZHMgc8OzIHNlcnZlbSBwYXJhIGludmVzdGltZW50byBmw61zaWNvIChtb250YXIgZW1wcmVzYXMpOyBudW5jYSBwYWdhbSBzYWzDoXJpb3MuPC9wPgogICAgICA8RmllbGQgbGFiZWw9",
"IlRpcG9zIGRlIHJlY3Vyc28gKHNlcGFyYWRvcyBwb3IgdsOtcmd1bGEpIj4KICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtpbnB1dENsc30gdmFsdWU9e3R5cGVzfSBvbkNoYW5nZT17KGUpID0+IHNldFR5cGVzKGUudGFyZ2V0LnZhbHVlKX0gLz4KICAgICAgPC9GaWVsZD4KICAgICAgPEZpZWxkIGxhYmVsPSJVbmlkYWRlIGRhIFJvdGHDp8OjbyBDdXJ0YSI+CiAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9e2lucHV0Q2xzfSB2YWx1ZT17c2hvcnRVbml0fSBvbkNoYW5nZT17KGUpID0+IHNldFNob3J0VW5pdChlLnRhcmdldC52",
"YWx1ZSl9PgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iZGlhIj4xIERpYSAoMS8zMCBkbyBtw6pzKTwvb3B0aW9uPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0ic2VtYW5hIj4xIFNlbWFuYSAoMS80IGRvIG3DqnMpPC9vcHRpb24+CiAgICAgICAgPC9zZWxlY3Q+CiAgICAgIDwvRmllbGQ+CiAgICAgIDxidXR0b24KICAgICAgICBjbGFzc05hbWU9ImhvbG8tYnRuLXByaW1hcnkgbXQtMiB3LWZ1bGwgcm91bmRlZC1tZCBweS0yIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIgogICAgICAgIG9uQ2xpY2s9",
"eygpID0+IHsKICAgICAgICAgIG9uU2F2ZSh7CiAgICAgICAgICAgIGZhY1JhdGU6IE51bWJlcihyYXRlKSB8fCAxLAogICAgICAgICAgICByZXNvdXJjZVR5cGVzOiB0eXBlcy5zcGxpdCgiLCIpLm1hcCgodCkgPT4gdC50cmltKCkpLmZpbHRlcihCb29sZWFuKSwKICAgICAgICAgICAgc2hvcnRVbml0LAogICAgICAgICAgfSk7CiAgICAgICAgICBvbkNsb3NlKCk7CiAgICAgICAgfX0KICAgICAgPgogICAgICAgIDxJY29uIG5hbWU9InNhdmUiIHNpemU9ezE2fSAvPiBTYWx2YXIKICAgICAgPC9idXR0b24+CiAgICA8L01vZGFs",
"PgogICk7Cn0KCmZ1bmN0aW9uIEZhY3Rpb25zTW9kYWwoeyBmYWN0aW9ucywgb25TYXZlLCBvbkNsb3NlIH0pIHsKICBjb25zdCBbbGlzdCwgc2V0TGlzdF0gPSB1c2VTdGF0ZShmYWN0aW9ucyk7CiAgY29uc3QgdXBkYXRlID0gKGlkLCBwYXRjaCkgPT4gc2V0TGlzdCgobCkgPT4gbC5tYXAoKGYpID0+IChmLmlkID09PSBpZCA/IHsgLi4uZiwgLi4ucGF0Y2ggfSA6IGYpKSk7CiAgY29uc3Qgc2V0RG9taW5hbnQgPSAoaWQpID0+IHNldExpc3QoKGwpID0+IGwubWFwKChmKSA9PiAoeyAuLi5mLCBkb21pbmFudDogZi5pZCA9PT0g",
"aWQgfSkpKTsKICBjb25zdCBhZGQgPSAoKSA9PiBzZXRMaXN0KChsKSA9PiBbLi4ubCwgeyBpZDogdWlkKCksIG5hbWU6ICJOb3ZhIEZhY8Onw6NvIiwgZGVzY3JpcHRpb246ICIiLCBjb2xvcjogIiMzOGJkZjgiLCBiYW5rOiAwLCBkb21pbmFudDogZmFsc2UsIGRlbWFuZDogIiIgfV0pOwogIGNvbnN0IHJlbW92ZSA9IChpZCkgPT4gc2V0TGlzdCgobCkgPT4gbC5maWx0ZXIoKGYpID0+IGYuaWQgIT09IGlkKSk7CgogIHJldHVybiAoCiAgICA8TW9kYWwgdGl0bGU9IkZhY8Onw7VlcyIgb25DbG9zZT17b25DbG9zZX0gd2lkZT4K",
"ICAgICAgPHAgY2xhc3NOYW1lPSJ0ZXh0LXhzIHRleHQtaG9sby1tdXRlZCBtYi0zIj4KICAgICAgICBNYXJxdWUgdW1hIGZhY8Onw6NvIGNvbW8gPGIgY2xhc3NOYW1lPSJ0ZXh0LXJvc2UtMzAwIj5Eb21pbmFudGU8L2I+ICjimIUpIOKAlCBlbGEgw6kgYSAiZG9uYSIgZG8gc2V0b3I6IHJlY2ViZQogICAgICAgIGF1dG9tYXRpY2FtZW50ZSB0b2RhIG1hbnV0ZW7Dp8OjbyBwYWdhIHBlbGFzIGVtcHJlc2FzIGFvICJSb2RhciBvIFRlbXBvIiwgZSDDqSBkZWxhIHF1ZSBzYWkgbyBkaW5oZWlybyBkZQogICAgICAgIHF1YWxxdWVy",
"IHN1YnPDrWRpbyBwYWdvIHBvciBlbGEuCiAgICAgIDwvcD4KICAgICAgPGRpdiBjbGFzc05hbWU9InNwYWNlLXktMyI+CiAgICAgICAge2xpc3QubWFwKChmKSA9PiAoCiAgICAgICAgICA8ZGl2IGtleT17Zi5pZH0gY2xhc3NOYW1lPXtgaG9sby1wYW5lbCByb3VuZGVkLWxnIHAtMyAke2YuZG9taW5hbnQgPyAiaG9sby1wYW5lbC1yZWQiIDogIiJ9YH0+CiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJmbGV4IGdhcC0yIGl0ZW1zLXN0YXJ0Ij4KICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0iY29sb3IiIHZhbHVlPXtmLmNv",
"bG9yfSBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZShmLmlkLCB7IGNvbG9yOiBlLnRhcmdldC52YWx1ZSB9KX0gY2xhc3NOYW1lPSJ3LTkgaC05IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1za3ktNTAwLzMwIGJnLXRyYW5zcGFyZW50IHNocmluay0wIG10LTEiIC8+CiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9ImZsZXgtMSBzcGFjZS15LTIiPgogICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9ImZsZXggZ2FwLTIiPgogICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtpbnB1dENscyArICIgZmxleC0xIn0g",
"dmFsdWU9e2YubmFtZX0gb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGUoZi5pZCwgeyBuYW1lOiBlLnRhcmdldC52YWx1ZSB9KX0gcGxhY2Vob2xkZXI9Ik5vbWUgZGEgZmFjw6fDo28iIC8+CiAgICAgICAgICAgICAgICAgIDxidXR0b24KICAgICAgICAgICAgICAgICAgICB0eXBlPSJidXR0b24iCiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RG9taW5hbnQoZi5kb21pbmFudCA/IG51bGwgOiBmLmlkKX0KICAgICAgICAgICAgICAgICAgICB0aXRsZT0iTWFyY2FyIGNvbW8gRmFjw6fDo28gRG9taW5hbnRlIgog",
"ICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHNocmluay0wIHB4LTMgcm91bmRlZC1tZCB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGJvcmRlciB0cmFuc2l0aW9uICR7Zi5kb21pbmFudCA/ICJiZy1yb3NlLTUwMC8yMCBib3JkZXItcm9zZS00MDAvNjAgdGV4dC1yb3NlLTMwMCIgOiAiYm9yZGVyLXNreS01MDAvMjUgdGV4dC1ob2xvLWZhaW50IGhvdmVyOnRleHQtc2t5LTMwMCJ9YH0KICAgICAgICAgICAgICAgICAgPgogICAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9InN0YXIiIHNpemU9ezEzfSAv",
"PiB7Zi5kb21pbmFudCA/ICJEb21pbmFudGUiIDogIlRvcm5hciBkb21pbmFudGUifQogICAgICAgICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzTmFtZT17aW5wdXRDbHN9IHJvd3M9ezJ9IHZhbHVlPXtmLmRlc2NyaXB0aW9ufSBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZShmLmlkLCB7IGRlc2NyaXB0aW9uOiBlLnRhcmdldC52YWx1ZSB9KX0gcGxhY2Vob2xkZXI9IkRlc2NyacOnw6NvIC8gaW50ZXJlc3NlcyIgLz4KICAgICAgICAgICAgICAg",
"IDxkaXYgY2xhc3NOYW1lPSJncmlkIGdyaWQtY29scy0yIGdhcC0yIj4KICAgICAgICAgICAgICAgICAgPGRpdj4KICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9InRleHQtWzEwcHhdIHVwcGVyY2FzZSB0ZXh0LWhvbG8tZmFpbnQiPkJhbmNvIChDcsOpZGl0b3MpPC9zcGFuPgogICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJudW1iZXIiIGNsYXNzTmFtZT17aW5wdXRDbHN9IHZhbHVlPXtmLmJhbmsgPz8gMH0gb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGUoZi5pZCwgeyBiYW5rOiBOdW1iZXIoZS50YXJn",
"ZXQudmFsdWUpIH0pfSAvPgogICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgPGRpdj4KICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9InRleHQtWzEwcHhdIHVwcGVyY2FzZSB0ZXh0LWhvbG8tZmFpbnQiPk1ldGEgLyBleGlnw6puY2lhIGdlcmFsPC9zcGFuPgogICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9e2lucHV0Q2xzfSB2YWx1ZT17Zi5kZW1hbmQgfHwgIiJ9IG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlKGYuaWQsIHsgZGVtYW5kOiBlLnRhcmdldC52YWx1ZSB9",
"KX0gcGxhY2Vob2xkZXI9ImV4OiBtYW50ZXIgcHJvZHXDp8OjbyBtw61uaW1hIG5vIHNldG9yIiAvPgogICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gcmVtb3ZlKGYuaWQpfSBjbGFzc05hbWU9InRleHQtcm9zZS00MDAgaG92ZXI6dGV4dC1yb3NlLTMwMCBtdC0xIj4KICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9InRyYXNoIiBzaXplPXsxOH0gLz4KICAgICAgICAgICAgICA8L2J1dHRv",
"bj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICApKX0KICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2FkZH0gY2xhc3NOYW1lPSJ0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtc2t5LTMwMCBob3Zlcjp0ZXh0LXNreS0yMDAiPgogICAgICAgICAgPEljb24gbmFtZT0icGx1cyIgc2l6ZT17MTZ9IC8+IEFkaWNpb25hciBmYWPDp8OjbwogICAgICAgIDwvYnV0dG9uPgogICAgICA8L2Rpdj4KICAgICAgPGJ1dHRvbgogICAgICAgIGNsYXNzTmFtZT0iaG9sby1idG4tcHJpbWFyeSBt",
"dC01IHctZnVsbCByb3VuZGVkLW1kIHB5LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIiCiAgICAgICAgb25DbGljaz17KCkgPT4gewogICAgICAgICAgb25TYXZlKGxpc3QpOwogICAgICAgICAgb25DbG9zZSgpOwogICAgICAgIH19CiAgICAgID4KICAgICAgICA8SWNvbiBuYW1lPSJzYXZlIiBzaXplPXsxNn0gLz4gU2FsdmFyIGZhY8Onw7VlcwogICAgICA8L2J1dHRvbj4KICAgIDwvTW9kYWw+CiAgKTsKfQoKZnVuY3Rpb24gU2F2ZXNNb2RhbCh7IHN0YXRlLCBhY3RpdmVTYXZlSWQsIG9uTWFya0Fj",
"dGl2ZSwgb25Mb2FkU3RhdGUsIG9uQ2xvc2UgfSkgewogIGNvbnN0IFtzYXZlcywgc2V0U2F2ZXNdID0gdXNlU3RhdGUoKCkgPT4gbGlzdFNhdmVzKCkpOwogIGNvbnN0IFtuZXdOYW1lLCBzZXROZXdOYW1lXSA9IHVzZVN0YXRlKCIiKTsKCiAgY29uc3QgcmVmcmVzaCA9ICgpID0+IHNldFNhdmVzKGxpc3RTYXZlcygpKTsKCiAgY29uc3QgaGFuZGxlU2F2ZUFzTmV3ID0gKCkgPT4gewogICAgY29uc3QgbmFtZSA9IG5ld05hbWUudHJpbSgpOwogICAgaWYgKCFuYW1lKSByZXR1cm47CiAgICBjb25zdCBpZCA9IHNhdmVTbG90KG5h",
"bWUsIHN0YXRlKTsKICAgIHNldE5ld05hbWUoIiIpOwogICAgcmVmcmVzaCgpOwogICAgb25NYXJrQWN0aXZlKGlkKTsKICB9OwoKICBjb25zdCBoYW5kbGVPdmVyd3JpdGUgPSAoaWQsIG5hbWUpID0+IHsKICAgIGlmICghY29uZmlybShgU29icmVzY3JldmVyIG8gc2F2ZSAiJHtuYW1lfSIgY29tIG8gZXN0YWRvIGF0dWFsIGRhIGNhbXBhbmhhP2ApKSByZXR1cm47CiAgICBzYXZlU2xvdChuYW1lLCBzdGF0ZSwgaWQpOwogICAgcmVmcmVzaCgpOwogICAgb25NYXJrQWN0aXZlKGlkKTsKICB9OwoKICBjb25zdCBoYW5kbGVMb2Fk",
"ID0gKGlkLCBuYW1lKSA9PiB7CiAgICBpZiAoIWNvbmZpcm0oYENhcnJlZ2FyICIke25hbWV9Ij8gSXNzbyBzdWJzdGl0dWkgdHVkbyBxdWUgZXN0w6EgbmEgdGVsYSBhZ29yYSAoZW1wcmVzYXMsIGZhY8Onw7VlcywgcmVsw7NnaW8uLi4pLiBTZSBuw6NvIHNhbHZvdSBvIGVzdGFkbyBhdHVhbCwgZWxlIHNlcsOhIHBlcmRpZG8uYCkpIHJldHVybjsKICAgIGNvbnN0IHJhdyA9IGxvYWRTbG90UmF3KGlkKTsKICAgIGlmICghcmF3KSB7CiAgICAgIGFsZXJ0KCJOw6NvIGZvaSBwb3Nzw612ZWwgY2FycmVnYXIgZXN0ZSBzYXZlLiIp",
"OwogICAgICByZXR1cm47CiAgICB9CiAgICBvbkxvYWRTdGF0ZShpZCwgbm9ybWFsaXplTG9hZGVkU3RhdGUocmF3KSk7CiAgfTsKCiAgY29uc3QgaGFuZGxlRGVsZXRlID0gKGlkLCBuYW1lKSA9PiB7CiAgICBpZiAoIWNvbmZpcm0oYEV4Y2x1aXIgbyBzYXZlICIke25hbWV9IiBwZXJtYW5lbnRlbWVudGU/IEVzc2EgYcOnw6NvIG7Do28gcG9kZSBzZXIgZGVzZmVpdGEuYCkpIHJldHVybjsKICAgIGRlbGV0ZVNsb3QoaWQpOwogICAgcmVmcmVzaCgpOwogIH07CgogIHJldHVybiAoCiAgICA8TW9kYWwgdGl0bGU9IlNhdmVzIExv",
"Y2FpcyIgb25DbG9zZT17b25DbG9zZX0gd2lkZT4KICAgICAgPHAgY2xhc3NOYW1lPSJ0ZXh0LXhzIHRleHQtaG9sby1tdXRlZCBtYi0zIj4KICAgICAgICBHdWFyZGUgbyBlc3RhZG8gYXR1YWwgZGEgY2FtcGFuaGEgZW0gc2F2ZXMgbm9tZWFkb3MsIHNhbHZvcyBuZXN0ZSBuYXZlZ2Fkb3IuIFZvY8OqIHBvZGUgdGVyIHbDoXJpb3MgZSBhbHRlcm5hcgogICAgICAgIGVudHJlIGVsZXMgcXVhbmRvIHF1aXNlciAoZXg6IHVtIHNhdmUgcG9yIHNlc3PDo28sIG91IGFudGVzIGRlIHVtYSBkZWNpc8OjbyBhcnJpc2NhZGEpLgogICAg",
"ICA8L3A+CgogICAgICA8ZGl2IGNsYXNzTmFtZT0iZmxleCBnYXAtMiBtYi00Ij4KICAgICAgICA8aW5wdXQKICAgICAgICAgIGNsYXNzTmFtZT17aW5wdXRDbHMgKyAiIGZsZXgtMSJ9CiAgICAgICAgICBwbGFjZWhvbGRlcj0nTm9tZSBkbyBub3ZvIHNhdmUgKGV4OiAiU2Vzc8OjbyAxMiAtIGFudGVzIGRvIGF0YXF1ZSIpJwogICAgICAgICAgdmFsdWU9e25ld05hbWV9CiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5ld05hbWUoZS50YXJnZXQudmFsdWUpfQogICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4gZS5rZXkg",
"PT09ICJFbnRlciIgJiYgaGFuZGxlU2F2ZUFzTmV3KCl9CiAgICAgICAgLz4KICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVNhdmVBc05ld30gY2xhc3NOYW1lPSJob2xvLWJ0bi1wcmltYXJ5IHB4LTQgcm91bmRlZC1tZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQtc20gc2hyaW5rLTAiPgogICAgICAgICAgPEljb24gbmFtZT0ic2F2ZSIgc2l6ZT17MTV9IC8+IFNhbHZhciBjb21vIG5vdm8KICAgICAgICA8L2J1dHRvbj4KICAgICAgPC9kaXY+CgogICAgICB7c2F2ZXMubGVuZ3RoID09PSAwICYmIDxwIGNs",
"YXNzTmFtZT0idGV4dC1zbSB0ZXh0LWhvbG8tZmFpbnQgaXRhbGljIj5OZW5odW0gc2F2ZSBhaW5kYS4gQ3JpZSBvIHByaW1laXJvIGFjaW1hLjwvcD59CgogICAgICA8ZGl2IGNsYXNzTmFtZT0ic3BhY2UteS0yIG1heC1oLTk2IG92ZXJmbG93LXktYXV0byBwci0xIj4KICAgICAgICB7c2F2ZXMubWFwKChzKSA9PiAoCiAgICAgICAgICA8ZGl2IGtleT17cy5pZH0gY2xhc3NOYW1lPXtgaG9sby1wYW5lbCByb3VuZGVkLWxnIHAtMyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgZmxleC13cmFwICR7cy5p",
"ZCA9PT0gYWN0aXZlU2F2ZUlkID8gImhvbG8tcGFuZWwtcmVkIiA6ICIifWB9PgogICAgICAgICAgICA8ZGl2PgogICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0idGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWhvbG8tcHJpbWFyeSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41Ij4KICAgICAgICAgICAgICAgIHtzLmlkID09PSBhY3RpdmVTYXZlSWQgJiYgPEljb24gbmFtZT0ic3RhciIgc2l6ZT17MTJ9IGNsYXNzTmFtZT0idGV4dC1yb3NlLTMwMCIgLz59CiAgICAgICAgICAgICAgICB7cy5uYW1lfQogICAgICAgICAgICAgIDwv",
"cD4KICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9InRleHQtWzExcHhdIHRleHQtaG9sby1mYWludCI+e25ldyBEYXRlKHMudXBkYXRlZEF0KS50b0xvY2FsZVN0cmluZygicHQtQlIiKX08L3A+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0iZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaHJpbmstMCI+CiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVMb2FkKHMuaWQsIHMubmFtZSl9IGNsYXNzTmFtZT0idGV4dC14cyBweC0yLjUgcHktMS41IHJvdW5kZWQt",
"bWQgYm9yZGVyIGJvcmRlci1za3ktNTAwLzMwIHRleHQtc2t5LTMwMCBob3ZlcjpiZy1za3ktNTAwLzEwIHRyYW5zaXRpb24iPgogICAgICAgICAgICAgICAgQ2FycmVnYXIKICAgICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZU92ZXJ3cml0ZShzLmlkLCBzLm5hbWUpfSBjbGFzc05hbWU9InRleHQteHMgcHgtMi41IHB5LTEuNSByb3VuZGVkLW1kIGJvcmRlciBib3JkZXItc2t5LTUwMC8zMCB0ZXh0LWhvbG8tc2Vjb25kYXJ5IGhvdmVyOmJnLXNreS01MDAvMTAg",
"dHJhbnNpdGlvbiI+CiAgICAgICAgICAgICAgICBTb2JyZXNjcmV2ZXIKICAgICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZURlbGV0ZShzLmlkLCBzLm5hbWUpfSBjbGFzc05hbWU9InRleHQtcm9zZS00MDAgaG92ZXI6dGV4dC1yb3NlLTMwMCI+CiAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPSJ0cmFzaCIgc2l6ZT17MTZ9IC8+CiAgICAgICAgICAgICAgPC9idXR0b24+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPC9kaXY+CiAgICAgICAgKSl9CiAg",
"ICAgIDwvZGl2PgogICAgPC9Nb2RhbD4KICApOwp9CmZ1bmN0aW9uIEFzc2V0RWRpdG9yKHsgYXNzZXQsIHJlc291cmNlVHlwZXMsIG9uQ2hhbmdlLCBvblJlbW92ZSB9KSB7CiAgY29uc3QgaWNvbk5hbWUgPSBBU1NFVF9UWVBFUy5maW5kKCh0KSA9PiB0LmtleSA9PT0gYXNzZXQudHlwZSk/Lmljb24gfHwgInBhY2thZ2UiOwogIHJldHVybiAoCiAgICA8ZGl2IGNsYXNzTmFtZT0iaG9sby1wYW5lbCByb3VuZGVkLWxnIHAtMyI+CiAgICAgIDxkaXYgY2xhc3NOYW1lPSJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yIj4KICAgICAgICA8",
"SWNvbiBuYW1lPXtpY29uTmFtZX0gc2l6ZT17MTh9IGNsYXNzTmFtZT0idGV4dC1za3ktNDAwIG10LTIgc2hyaW5rLTAiIC8+CiAgICAgICAgPGRpdiBjbGFzc05hbWU9ImZsZXgtMSBncmlkIGdyaWQtY29scy0yIGdhcC0yIj4KICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9e2lucHV0Q2xzfSB2YWx1ZT17YXNzZXQubmFtZX0gb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZSh7IC4uLmFzc2V0LCBuYW1lOiBlLnRhcmdldC52YWx1ZSB9KX0gcGxhY2Vob2xkZXI9Ik5vbWUgZG8gYXRpdm8iIC8+CiAgICAgICAgICA8c2VsZWN0IGNs",
"YXNzTmFtZT17aW5wdXRDbHN9IHZhbHVlPXthc3NldC50eXBlfSBvbkNoYW5nZT17KGUpID0+IG9uQ2hhbmdlKHsgLi4uYXNzZXQsIHR5cGU6IGUudGFyZ2V0LnZhbHVlIH0pfT4KICAgICAgICAgICAge0FTU0VUX1RZUEVTLm1hcCgodCkgPT4gPG9wdGlvbiBrZXk9e3Qua2V5fSB2YWx1ZT17dC5rZXl9Pnt0LmxhYmVsfTwvb3B0aW9uPil9CiAgICAgICAgICA8L3NlbGVjdD4KICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPXtpbnB1dENsc30gdmFsdWU9e2Fzc2V0LnN0YXR1c30gb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZSh7",
"IC4uLmFzc2V0LCBzdGF0dXM6IGUudGFyZ2V0LnZhbHVlIH0pfT4KICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iY29uc3RydWNhbyI+RW0gY29uc3RydcOnw6NvPC9vcHRpb24+CiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ImF0aXZvIj5BdGl2bzwvb3B0aW9uPgogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSJpbmF0aXZvIj5JbmF0aXZvIC8gU3VjYXRlYWRvPC9vcHRpb24+CiAgICAgICAgICA8L3NlbGVjdD4KICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPXtpbnB1dENsc30gdmFsdWU9e2Fzc2V0LmNvc3RSZXNvdXJj",
"ZX0gb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZSh7IC4uLmFzc2V0LCBjb3N0UmVzb3VyY2U6IGUudGFyZ2V0LnZhbHVlIH0pfT4KICAgICAgICAgICAge3Jlc291cmNlVHlwZXMubWFwKChyKSA9PiA8b3B0aW9uIGtleT17cn0gdmFsdWU9e3J9PntyfTwvb3B0aW9uPil9CiAgICAgICAgICA8L3NlbGVjdD4KICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0idGV4dC1bMTBweF0gdXBwZXJjYXNlIHRleHQtaG9sby1mYWludCI+Q3VzdG8gZGUgY29uc3RydcOnw6NvPC9zcGFuPgogICAgICAgICAgICA8",
"aW5wdXQgdHlwZT0ibnVtYmVyIiBjbGFzc05hbWU9e2lucHV0Q2xzfSB2YWx1ZT17YXNzZXQuY29zdH0gb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZSh7IC4uLmFzc2V0LCBjb3N0OiBOdW1iZXIoZS50YXJnZXQudmFsdWUpIH0pfSAvPgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8ZGl2PgogICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9InRleHQtWzEwcHhdIHVwcGVyY2FzZSB0ZXh0LWhvbG8tZmFpbnQiPk1hbnV0ZW7Dp8OjbyAvIG3DqnM8L3NwYW4+CiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJudW1iZXIiIGNsYXNz",
"TmFtZT17aW5wdXRDbHN9IHZhbHVlPXthc3NldC5tYWludGVuYW5jZX0gb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZSh7IC4uLmFzc2V0LCBtYWludGVuYW5jZTogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KX0gLz4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICAgIDxidXR0b24gb25DbGljaz17b25SZW1vdmV9IGNsYXNzTmFtZT0idGV4dC1yb3NlLTQwMCBob3Zlcjp0ZXh0LXJvc2UtMzAwIG10LTIiPgogICAgICAgICAgPEljb24gbmFtZT0idHJhc2giIHNpemU9ezE2fSAvPgogICAgICAgIDwvYnV0dG9u",
"PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogICk7Cn0KCmZ1bmN0aW9uIEdvYWxFZGl0b3IoeyBnb2FsLCBvbkNoYW5nZSwgb25SZW1vdmUgfSkgewogIHJldHVybiAoCiAgICA8ZGl2IGNsYXNzTmFtZT0iaG9sby1wYW5lbCByb3VuZGVkLWxnIHAtMyI+CiAgICAgIDxkaXYgY2xhc3NOYW1lPSJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yIj4KICAgICAgICA8SWNvbiBuYW1lPSJ0YXJnZXQiIHNpemU9ezE4fSBjbGFzc05hbWU9InRleHQtc2t5LTQwMCBtdC0yIHNocmluay0wIiAvPgogICAgICAgIDxkaXYgY2xhc3NOYW1lPSJmbGV4",
"LTEgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiI+CiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtpbnB1dENscyArICIgY29sLXNwYW4tMiJ9IHZhbHVlPXtnb2FsLmRlc2NyaXB0aW9ufSBvbkNoYW5nZT17KGUpID0+IG9uQ2hhbmdlKHsgLi4uZ29hbCwgZGVzY3JpcHRpb246IGUudGFyZ2V0LnZhbHVlIH0pfSBwbGFjZWhvbGRlcj0iRGVzY3Jpw6fDo28gZGEgbWV0YSIgLz4KICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0idGV4dC1bMTBweF0gdXBwZXJjYXNlIHRleHQtaG9sby1mYWludCI+UHJv",
"Z3Jlc3NvIGF0dWFsPC9zcGFuPgogICAgICAgICAgICA8aW5wdXQgdHlwZT0ibnVtYmVyIiBjbGFzc05hbWU9e2lucHV0Q2xzfSB2YWx1ZT17Z29hbC5jdXJyZW50fSBvbkNoYW5nZT17KGUpID0+IG9uQ2hhbmdlKHsgLi4uZ29hbCwgY3VycmVudDogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KX0gLz4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPGRpdj4KICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgdGV4dC1ob2xvLWZhaW50Ij5WYWxvci1hbHZvPC9zcGFuPgogICAgICAgICAg",
"ICA8aW5wdXQgdHlwZT0ibnVtYmVyIiBjbGFzc05hbWU9e2lucHV0Q2xzfSB2YWx1ZT17Z29hbC50YXJnZXR9IG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2UoeyAuLi5nb2FsLCB0YXJnZXQ6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgfSl9IC8+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9e2lucHV0Q2xzICsgIiBjb2wtc3Bhbi0yIn0gdmFsdWU9e2dvYWwuZGVhZGxpbmV9IG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2UoeyAuLi5nb2FsLCBkZWFkbGluZTogZS50YXJnZXQudmFsdWUgfSl9IHBs",
"YWNlaG9sZGVyPSJQcmF6byAoZXg6IG3DqnMgNCwgc2Vzc8OjbyAxMi4uLikiIC8+CiAgICAgICAgICB7Z29hbC5sYXN0UmVzdWx0ICYmICgKICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9ImNvbC1zcGFuLTIgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41Ij4KICAgICAgICAgICAgICDDmmx0aW1hIGNoZWNhZ2VtOnsiICJ9CiAgICAgICAgICAgICAge2dvYWwubGFzdFJlc3VsdCA9PT0gIm9rIiA/ICgKICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0idGV4dC1lbWVyYWxkLTQwMCBmbGV4IGl0ZW1zLWNl",
"bnRlciBnYXAtMSI+PEljb24gbmFtZT0iY2hlY2tjaXJjbGUiIHNpemU9ezEzfSAvPiBCYXRldTwvc3Bhbj4KICAgICAgICAgICAgICApIDogKAogICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSJ0ZXh0LXJvc2UtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIj48SWNvbiBuYW1lPSJ4Y2lyY2xlIiBzaXplPXsxM30gLz4gTsOjbyBiYXRldTwvc3Bhbj4KICAgICAgICAgICAgICApfQogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICl9CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvblJl",
"bW92ZX0gY2xhc3NOYW1lPSJ0ZXh0LXJvc2UtNDAwIGhvdmVyOnRleHQtcm9zZS0zMDAgbXQtMiI+CiAgICAgICAgICA8SWNvbiBuYW1lPSJ0cmFzaCIgc2l6ZT17MTZ9IC8+CiAgICAgICAgPC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgKTsKfQoKZnVuY3Rpb24gU3Vic2lkeUVkaXRvcih7IHN1YnNpZHksIGZhY3Rpb25zLCByZXNvdXJjZVR5cGVzLCBnb2Fscywgb25DaGFuZ2UsIG9uUmVtb3ZlIH0pIHsKICByZXR1cm4gKAogICAgPGRpdiBjbGFzc05hbWU9ImhvbG8tcGFuZWwgcm91bmRlZC1sZyBwLTMiPgog",
"ICAgICA8ZGl2IGNsYXNzTmFtZT0iZmxleCBpdGVtcy1zdGFydCBnYXAtMiI+CiAgICAgICAgPEljb24gbmFtZT0ibGFuZG1hcmsiIHNpemU9ezE4fSBjbGFzc05hbWU9InRleHQtc2t5LTQwMCBtdC0yIHNocmluay0wIiAvPgogICAgICAgIDxkaXYgY2xhc3NOYW1lPSJmbGV4LTEgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiI+CiAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT17aW5wdXRDbHN9IHZhbHVlPXtzdWJzaWR5LmZhY3Rpb25JZH0gb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZSh7IC4uLnN1YnNpZHksIGZhY3Rpb25JZDog",
"ZS50YXJnZXQudmFsdWUgfSl9PgogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIiPuKAlCBmYWPDp8OjbyDigJQ8L29wdGlvbj4KICAgICAgICAgICAge2ZhY3Rpb25zLm1hcCgoZikgPT4gPG9wdGlvbiBrZXk9e2YuaWR9IHZhbHVlPXtmLmlkfT57Zi5uYW1lfTwvb3B0aW9uPil9CiAgICAgICAgICA8L3NlbGVjdD4KICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPXtpbnB1dENsc30gdmFsdWU9e3N1YnNpZHkucmVzb3VyY2V9IG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2UoeyAuLi5zdWJzaWR5LCByZXNvdXJjZTogZS50YXJn",
"ZXQudmFsdWUgfSl9PgogICAgICAgICAgICB7cmVzb3VyY2VUeXBlcy5tYXAoKHIpID0+IDxvcHRpb24ga2V5PXtyfSB2YWx1ZT17cn0+e3J9PC9vcHRpb24+KX0KICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgICAgPGRpdj4KICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgdGV4dC1ob2xvLWZhaW50Ij5WYWxvciBtZW5zYWw8L3NwYW4+CiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJudW1iZXIiIGNsYXNzTmFtZT17aW5wdXRDbHN9IHZhbHVlPXtzdWJzaWR5LmFtb3VudH0gb25DaGFu",
"Z2U9eyhlKSA9PiBvbkNoYW5nZSh7IC4uLnN1YnNpZHksIGFtb3VudDogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KX0gLz4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPGRpdj4KICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgdGV4dC1ob2xvLWZhaW50Ij5NZXRhIHZpbmN1bGFkYTwvc3Bhbj4KICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9e2lucHV0Q2xzfSB2YWx1ZT17c3Vic2lkeS5nb2FsSWR9IG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2UoeyAuLi5zdWJzaWR5LCBn",
"b2FsSWQ6IGUudGFyZ2V0LnZhbHVlIH0pfT4KICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIiPuKAlCBuZW5odW1hIChpbmNvbmRpY2lvbmFsKSDigJQ8L29wdGlvbj4KICAgICAgICAgICAgICB7Z29hbHMubWFwKChnKSA9PiA8b3B0aW9uIGtleT17Zy5pZH0gdmFsdWU9e2cuaWR9PntnLmRlc2NyaXB0aW9uIHx8ICJNZXRhIHNlbSBkZXNjcmnDp8OjbyJ9PC9vcHRpb24+KX0KICAgICAgICAgICAgPC9zZWxlY3Q+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9e2lucHV0Q2xzICsgIiBjb2wt",
"c3Bhbi0yIn0gdmFsdWU9e3N1YnNpZHkuY29uZGl0aW9ufSBvbkNoYW5nZT17KGUpID0+IG9uQ2hhbmdlKHsgLi4uc3Vic2lkeSwgY29uZGl0aW9uOiBlLnRhcmdldC52YWx1ZSB9KX0gcGxhY2Vob2xkZXI9Ik5vdGEgLyBjb25kacOnw6NvIG5hcnJhdGl2YSAob3BjaW9uYWwpIiAvPgogICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0iY29sLXNwYW4tMiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtaG9sby1zZWNvbmRhcnkgY3Vyc29yLXBvaW50ZXIiPgogICAgICAgICAgICA8aW5wdXQgdHlwZT0iY2hlY2ti",
"b3giIGNoZWNrZWQ9eyEhc3Vic2lkeS5hY3RpdmV9IG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2UoeyAuLi5zdWJzaWR5LCBhY3RpdmU6IGUudGFyZ2V0LmNoZWNrZWQgfSl9IGNsYXNzTmFtZT0iYWNjZW50LXNreS00MDAgdy00IGgtNCIgLz4KICAgICAgICAgICAgU3Vic8OtZGlvIGF0aXZvIChwYWdvIGF1dG9tYXRpY2FtZW50ZSBhbyAiUm9kYXIiKQogICAgICAgICAgPC9sYWJlbD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uUmVtb3ZlfSBjbGFzc05hbWU9InRleHQtcm9zZS00MDAgaG92ZXI6",
"dGV4dC1yb3NlLTMwMCBtdC0yIj4KICAgICAgICAgIDxJY29uIG5hbWU9InRyYXNoIiBzaXplPXsxNn0gLz4KICAgICAgICA8L2J1dHRvbj4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICApOwp9CgpmdW5jdGlvbiBDb21wYW55RWRpdG9yKHsgY29tcGFueSwgZmFjdGlvbnMsIHJlc291cmNlVHlwZXMsIGNvbmZpZywgb25TYXZlLCBvbkNsb3NlIH0pIHsKICBjb25zdCBbYywgc2V0Q10gPSB1c2VTdGF0ZSgoKSA9PiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbXBhbnkpKSk7CgogIGNvbnN0IHVwZGF0ZVJlc291cmNlID0g",
"KHIsIHYpID0+IHNldEMoKHByZXYpID0+ICh7IC4uLnByZXYsIHJlc291cmNlczogeyAuLi5wcmV2LnJlc291cmNlcywgW3JdOiBOdW1iZXIodikgfSB9KSk7CgogIGNvbnN0IGFkZEFzc2V0ID0gKCkgPT4KICAgIHNldEMoKHByZXYpID0+ICh7IC4uLnByZXYsIGFzc2V0czogWy4uLnByZXYuYXNzZXRzLCB7IGlkOiB1aWQoKSwgbmFtZTogIk5vdm8gQXRpdm8iLCB0eXBlOiAibmF2ZSIsIHN0YXR1czogImNvbnN0cnVjYW8iLCBjb3N0OiAwLCBtYWludGVuYW5jZTogMCwgY29zdFJlc291cmNlOiByZXNvdXJjZVR5cGVzWzBdIH1d",
"IH0pKTsKICBjb25zdCB1cGRhdGVBc3NldCA9IChpZCwgbmV4dCkgPT4gc2V0QygocHJldikgPT4gKHsgLi4ucHJldiwgYXNzZXRzOiBwcmV2LmFzc2V0cy5tYXAoKGEpID0+IChhLmlkID09PSBpZCA/IG5leHQgOiBhKSkgfSkpOwogIGNvbnN0IHJlbW92ZUFzc2V0ID0gKGlkKSA9PiBzZXRDKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBhc3NldHM6IHByZXYuYXNzZXRzLmZpbHRlcigoYSkgPT4gYS5pZCAhPT0gaWQpIH0pKTsKCiAgY29uc3QgYWRkR29hbCA9ICgpID0+CiAgICBzZXRDKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBnb2Fs",
"czogWy4uLnByZXYuZ29hbHMsIHsgaWQ6IHVpZCgpLCBkZXNjcmlwdGlvbjogIiIsIGN1cnJlbnQ6IDAsIHRhcmdldDogMTAwLCBkZWFkbGluZTogIiIsIGxhc3RSZXN1bHQ6IG51bGwgfV0gfSkpOwogIGNvbnN0IHVwZGF0ZUdvYWwgPSAoaWQsIG5leHQpID0+IHNldEMoKHByZXYpID0+ICh7IC4uLnByZXYsIGdvYWxzOiBwcmV2LmdvYWxzLm1hcCgoZykgPT4gKGcuaWQgPT09IGlkID8gbmV4dCA6IGcpKSB9KSk7CiAgY29uc3QgcmVtb3ZlR29hbCA9IChpZCkgPT4KICAgIHNldEMoKHByZXYpID0+ICh7CiAgICAgIC4uLnByZXYs",
"CiAgICAgIGdvYWxzOiBwcmV2LmdvYWxzLmZpbHRlcigoZykgPT4gZy5pZCAhPT0gaWQpLAogICAgICBzdWJzaWRpZXM6IHByZXYuc3Vic2lkaWVzLm1hcCgocykgPT4gKHMuZ29hbElkID09PSBpZCA/IHsgLi4ucywgZ29hbElkOiAiIiB9IDogcykpLAogICAgfSkpOwoKICBjb25zdCBhZGRTdWJzaWR5ID0gKCkgPT4KICAgIHNldEMoKHByZXYpID0+ICh7IC4uLnByZXYsIHN1YnNpZGllczogWy4uLnByZXYuc3Vic2lkaWVzLCB7IGlkOiB1aWQoKSwgZmFjdGlvbklkOiAiIiwgYW1vdW50OiAwLCByZXNvdXJjZTogcmVzb3VyY2VU",
"eXBlc1swXSwgY29uZGl0aW9uOiAiIiwgYWN0aXZlOiB0cnVlLCBnb2FsSWQ6ICIiIH1dIH0pKTsKICBjb25zdCB1cGRhdGVTdWJzaWR5ID0gKGlkLCBuZXh0KSA9PiBzZXRDKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBzdWJzaWRpZXM6IHByZXYuc3Vic2lkaWVzLm1hcCgocykgPT4gKHMuaWQgPT09IGlkID8gbmV4dCA6IHMpKSB9KSk7CiAgY29uc3QgcmVtb3ZlU3Vic2lkeSA9IChpZCkgPT4gc2V0QygocHJldikgPT4gKHsgLi4ucHJldiwgc3Vic2lkaWVzOiBwcmV2LnN1YnNpZGllcy5maWx0ZXIoKHMpID0+IHMuaWQgIT09IGlk",
"KSB9KSk7CgogIGNvbnN0IHByZXNldCA9IENPTVBBTllfUFJFU0VUUy5maW5kKChwKSA9PiBwLmtleSA9PT0gYy5wcmVzZXRLZXkpIHx8IENPTVBBTllfUFJFU0VUU1swXTsKICBjb25zdCBtYWludCA9IGNvbXB1dGVNYWludGVuYW5jZShjKTsKICBjb25zdCB7IGxldmVsLCBjcmVkaXRzQ29zdCwgZmFjQ29zdCB9ID0gY29tcHV0ZUZhY0Nvc3QoYywgY29uZmlnKTsKICBjb25zdCBmYWNCYWxhbmNlID0gTnVtYmVyKGMucmVzb3VyY2VzWyJGYWNjcmVkcyJdKSB8fCAwOwoKICBjb25zdCBhcHBseVByZXNldCA9IChwcmVzZXRLZXks",
"IHNpemVLZXkpID0+IHsKICAgIGNvbnN0IHRwbCA9IENPTVBBTllfUFJFU0VUUy5maW5kKChwKSA9PiBwLmtleSA9PT0gcHJlc2V0S2V5KSB8fCBDT01QQU5ZX1BSRVNFVFNbMF07CiAgICBjb25zdCBzaXplID0gdHBsLnNpemVzLmZpbmQoKHMpID0+IHMua2V5ID09PSBzaXplS2V5KTsKICAgIHNldEMoKHByZXYpID0+ICh7CiAgICAgIC4uLnByZXYsCiAgICAgIHByZXNldEtleSwKICAgICAgc2l6ZUtleTogc2l6ZSA/IHNpemVLZXkgOiAiIiwKICAgICAgdHlwZTogIXByZXYudHlwZSB8fCBDT01QQU5ZX1BSRVNFVFMuc29tZSgo",
"bykgPT4gby5sYWJlbCA9PT0gcHJldi50eXBlKSA/IHRwbC5sYWJlbCA6IHByZXYudHlwZSwKICAgICAgc2FsYXJ5UGVyRW1wbG95ZWU6IHRwbC5zYWxhcnlQZXJFbXBsb3llZSwKICAgICAgZW1wbG95ZWVzOiBzaXplID8gc2l6ZS5lbXBsb3llZXMgOiBwcmV2LmVtcGxveWVlcywKICAgICAgYmFzZUNvc3RUYWJlbGE6IHNpemUgPyBzaXplLmJhc2VDb3N0IDogcHJldi5iYXNlQ29zdFRhYmVsYSwKICAgICAgcHJvZHVjdGlvbjogdHBsLnByb2R1Y2VzR29vZHMgJiYgc2l6ZSA/IHsgcmVzb3VyY2U6IHRwbC5wcm9kdWN0aW9uUmVz",
"b3VyY2UsIGFtb3VudDogc2l6ZS5wcm9kdWN0aW9uIH0gOiBwcmV2LnByb2R1Y3Rpb24sCiAgICB9KSk7CiAgfTsKCiAgY29uc3QgZGViaXRGYWNzID0gKCkgPT4gewogICAgY29uc3QgYW1vdW50ID0gTWF0aC5yb3VuZChmYWNDb3N0KTsKICAgIGlmIChhbW91bnQgPD0gMCkgcmV0dXJuOwogICAgaWYgKCFjb25maXJtKGBEZWJpdGFyICR7Y3VycmVuY3koYW1vdW50KX0gRmFjY3JlZHMgZG8gY2FpeGEgZGEgZW1wcmVzYSAocmVwcmVzZW50YW5kbyBhIG1vbnRhZ2VtIGbDrXNpY2EgZG8gbmVnw7NjaW8pP2ApKSByZXR1cm47CiAg",
"ICBzZXRDKChwcmV2KSA9PiAoeyAuLi5wcmV2LCByZXNvdXJjZXM6IHsgLi4ucHJldi5yZXNvdXJjZXMsIEZhY2NyZWRzOiAoTnVtYmVyKHByZXYucmVzb3VyY2VzWyJGYWNjcmVkcyJdKSB8fCAwKSAtIGFtb3VudCB9IH0pKTsKICB9OwoKICByZXR1cm4gKAogICAgPE1vZGFsIHRpdGxlPXtjb21wYW55LmlkID8gYEVkaXRhcjogJHtjb21wYW55Lm5hbWV9YCA6ICJOb3ZhIEVtcHJlc2EifSBvbkNsb3NlPXtvbkNsb3NlfSB3aWRlPgogICAgICA8ZGl2IGNsYXNzTmFtZT0iZ3JpZCBncmlkLWNvbHMtMiBnYXAtMyI+CiAgICAgICAg",
"PEZpZWxkIGxhYmVsPSJOb21lIGRhIGVtcHJlc2EiPgogICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT17aW5wdXRDbHN9IHZhbHVlPXtjLm5hbWV9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0Qyh7IC4uLmMsIG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pfSAvPgogICAgICAgIDwvRmllbGQ+CiAgICAgICAgPEZpZWxkIGxhYmVsPSJEb25vIC8gUmVzcG9uc8OhdmVsIChQQyBvdSBOUEMpIj4KICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9e2lucHV0Q2xzfSB2YWx1ZT17Yy5vd25lcn0gb25DaGFuZ2U9eyhlKSA9PiBzZXRDKHsgLi4uYywg",
"b3duZXI6IGUudGFyZ2V0LnZhbHVlIH0pfSAvPgogICAgICAgIDwvRmllbGQ+CiAgICAgIDwvZGl2PgoKICAgICAgPGRpdiBjbGFzc05hbWU9Im10LTQgbWItMiB0ZXh0LXhzIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LXNreS0zMDAgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSI+CiAgICAgICAgPEljb24gbmFtZT0iYnVpbGRpbmciIHNpemU9ezE0fSAvPiBQcmVzZXQgZGUgRW1wcmVzYQogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzc05hbWU9ImdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTMiPgog",
"ICAgICAgIDxGaWVsZCBsYWJlbD0iVGlwbyAocHJlc2V0KSI+CiAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT17aW5wdXRDbHN9IHZhbHVlPXtjLnByZXNldEtleX0gb25DaGFuZ2U9eyhlKSA9PiBhcHBseVByZXNldChlLnRhcmdldC52YWx1ZSwgcHJlc2V0LnNpemVzW3ByZXNldC5zaXplcy5sZW5ndGggLSAxXT8ua2V5KX0+CiAgICAgICAgICAgIHtDT01QQU5ZX1BSRVNFVFMubWFwKCh0KSA9PiA8b3B0aW9uIGtleT17dC5rZXl9IHZhbHVlPXt0LmtleX0+e3QubGFiZWx9PC9vcHRpb24+KX0KICAgICAgICAgIDwvc2VsZWN0",
"PgogICAgICAgIDwvRmllbGQ+CiAgICAgICAgPEZpZWxkIGxhYmVsPSJQb3J0ZSI+CiAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT17aW5wdXRDbHN9IHZhbHVlPXtjLnNpemVLZXl9IG9uQ2hhbmdlPXsoZSkgPT4gYXBwbHlQcmVzZXQoYy5wcmVzZXRLZXksIGUudGFyZ2V0LnZhbHVlKX0gZGlzYWJsZWQ9e3ByZXNldC5zaXplcy5sZW5ndGggPT09IDB9PgogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIiPuKAlCBzZW0gcG9ydGUg4oCUPC9vcHRpb24+CiAgICAgICAgICAgIHtwcmVzZXQuc2l6ZXMubWFwKChzKSA9PiA8b3B0",
"aW9uIGtleT17cy5rZXl9IHZhbHVlPXtzLmtleX0+e3MubGFiZWx9PC9vcHRpb24+KX0KICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgIDwvRmllbGQ+CiAgICAgICAgPEZpZWxkIGxhYmVsPSJOw612ZWwgZG8gUGxhbmV0YSI+CiAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT17aW5wdXRDbHN9IHZhbHVlPXtjLnBsYW5ldExldmVsfSBvbkNoYW5nZT17KGUpID0+IHNldEMoeyAuLi5jLCBwbGFuZXRMZXZlbDogZS50YXJnZXQudmFsdWUgfSl9PgogICAgICAgICAgICB7UExBTkVUX0xFVkVMUy5tYXAoKHApID0+IDxvcHRpb24g",
"a2V5PXtwLmtleX0gdmFsdWU9e3Aua2V5fT57cC5sYWJlbH0gKHh7cC5tdWx0fSk8L29wdGlvbj4pfQogICAgICAgICAgPC9zZWxlY3Q+CiAgICAgICAgPC9GaWVsZD4KICAgICAgPC9kaXY+CiAgICAgIDxwIGNsYXNzTmFtZT0idGV4dC14cyB0ZXh0LWhvbG8tZmFpbnQgbXQtMSBtYi0zIj57bGV2ZWwuZGVzY308L3A+CgogICAgICA8RmllbGQgbGFiZWw9IlLDs3R1bG8gZG8gdGlwbyAoYXBhcmVjZSBubyBjYXJkLCBlZGl0w6F2ZWwpIj4KICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtpbnB1dENsc30gdmFsdWU9e2MudHlwZX0g",
"b25DaGFuZ2U9eyhlKSA9PiBzZXRDKHsgLi4uYywgdHlwZTogZS50YXJnZXQudmFsdWUgfSl9IC8+CiAgICAgIDwvRmllbGQ+CiAgICAgIDxGaWVsZCBsYWJlbD0iRGVzY3Jpw6fDo28iPgogICAgICAgIDx0ZXh0YXJlYSBjbGFzc05hbWU9e2lucHV0Q2xzfSByb3dzPXsyfSB2YWx1ZT17Yy5kZXNjcmlwdGlvbn0gb25DaGFuZ2U9eyhlKSA9PiBzZXRDKHsgLi4uYywgZGVzY3JpcHRpb246IGUudGFyZ2V0LnZhbHVlIH0pfSAvPgogICAgICA8L0ZpZWxkPgoKICAgICAgPGRpdiBjbGFzc05hbWU9Im10LTUgbWItMiB0ZXh0LXhzIHVw",
"cGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LXNreS0zMDAgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSI+CiAgICAgICAgPEljb24gbmFtZT0ic2NhbGUiIHNpemU9ezE0fSAvPiBJbnZlc3RpbWVudG8gRsOtc2ljbyAoRmFjY3JlZHMpCiAgICAgIDwvZGl2PgogICAgICA8cCBjbGFzc05hbWU9InRleHQteHMgdGV4dC1ob2xvLWZhaW50IG1iLTIiPgogICAgICAgIEN1c3RvIEJhc2UgZGUgVGFiZWxhIMOXIG11bHRpcGxpY2Fkb3IgZG8gcGxhbmV0YSA9IGN1c3RvIGVtIENyw6lkaXRvczsgZGl2aWRpZG8g",
"cGVsYSB0YXhhIGRlIGPDom1iaW8gKHtjdXJyZW5jeShjb25maWcuZmFjUmF0ZSl9IENyw6lkaXRvcyA9IDEgRmFjKSBkw6EgbyBjdXN0byBlbSBGYWNjcmVkcyDigJQgYSBtb2VkYSB1c2FkYSBzw7MgcGFyYSBjb21wcmFyIGZlcnJhbWVudGFzLCBwcsOpZGlvcyBlIGVxdWlwYW1lbnRvcywgbnVuY2EgcGFyYSBwYWdhciBnZW50ZS4KICAgICAgPC9wPgogICAgICA8ZGl2IGNsYXNzTmFtZT0iZ3JpZCBncmlkLWNvbHMtMiBnYXAtMyBtYi0yIj4KICAgICAgICA8RmllbGQgbGFiZWw9IkN1c3RvIEJhc2UgZGUgVGFiZWxhIChDcsOp",
"ZGl0b3MsIGFudGVzIGRvIHBsYW5ldGEpIj4KICAgICAgICAgIDxpbnB1dCB0eXBlPSJudW1iZXIiIGNsYXNzTmFtZT17aW5wdXRDbHN9IHZhbHVlPXtjLmJhc2VDb3N0VGFiZWxhfSBvbkNoYW5nZT17KGUpID0+IHNldEMoeyAuLi5jLCBiYXNlQ29zdFRhYmVsYTogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KX0gLz4KICAgICAgICA8L0ZpZWxkPgogICAgICAgIDxGaWVsZCBsYWJlbD0iRmFjY3JlZHMgZW0gY2FpeGEiPgogICAgICAgICAgPGlucHV0IHR5cGU9Im51bWJlciIgY2xhc3NOYW1lPXtpbnB1dENsc30gdmFsdWU9e2Mu",
"cmVzb3VyY2VzWyJGYWNjcmVkcyJdID8/IDB9IG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlUmVzb3VyY2UoIkZhY2NyZWRzIiwgZS50YXJnZXQudmFsdWUpfSAvPgogICAgICAgIDwvRmllbGQ+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzTmFtZT0iaG9sby1wYW5lbCByb3VuZGVkLWxnIHAtMyBtYi00IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBmbGV4LXdyYXAgZ2FwLTIiPgogICAgICAgIDxkaXYgY2xhc3NOYW1lPSJ0ZXh0LXhzIHRleHQtaG9sby1zZWNvbmRhcnkiPgogICAgICAgICAgPGRpdj5DdXN0",
"byBtdWx0aXBsaWNhZG86IDxiIGNsYXNzTmFtZT0idGV4dC1ob2xvLXByaW1hcnkiPntjdXJyZW5jeShjcmVkaXRzQ29zdCl9PC9iPiBDcsOpZGl0b3M8L2Rpdj4KICAgICAgICAgIDxkaXY+Q3VzdG8gZGUgbW9udGFnZW06IDxiIGNsYXNzTmFtZT0idGV4dC1za3ktMzAwIj57Y3VycmVuY3koTWF0aC5yb3VuZChmYWNDb3N0KSl9PC9iPiBGYWNjcmVkczwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2ZhY0JhbGFuY2UgPCBmYWNDb3N0ID8gInRleHQtcm9zZS0zMDAiIDogInRleHQtZW1lcmFsZC0zMDAifT5TYWxkbyBl",
"bSBGYWNjcmVkczoge2N1cnJlbmN5KGZhY0JhbGFuY2UpfTwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICAgIDxidXR0b24gdHlwZT0iYnV0dG9uIiBvbkNsaWNrPXtkZWJpdEZhY3N9IGNsYXNzTmFtZT0iaG9sby1idG4tcHJpbWFyeSB0ZXh0LXhzIHB4LTMgcHktMiByb3VuZGVkLW1kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hyaW5rLTAiPgogICAgICAgICAgPEljb24gbmFtZT0iYXJyb3dkb3duIiBzaXplPXsxM30gLz4gRGViaXRhciBGYWNjcmVkcyBhZ29yYQogICAgICAgIDwvYnV0dG9uPgogICAgICA8L2Rpdj4K",
"CiAgICAgIDxkaXYgY2xhc3NOYW1lPSJtdC00IG1iLTIgdGV4dC14cyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1za3ktMzAwIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEiPgogICAgICAgIDxJY29uIG5hbWU9InVzZXJzIiBzaXplPXsxNH0gLz4gRm9saGEgZGUgUGFnYW1lbnRvIChDcsOpZGl0b3MgSW1wZXJpYWlzIC8gbcOqcykKICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3NOYW1lPSJncmlkIGdyaWQtY29scy0yIGdhcC0zIG1iLTIiPgogICAgICAgIDxGaWVsZCBsYWJlbD0iTsK6IGRl",
"IGZ1bmNpb27DoXJpb3MiPgogICAgICAgICAgPGlucHV0IHR5cGU9Im51bWJlciIgY2xhc3NOYW1lPXtpbnB1dENsc30gdmFsdWU9e2MuZW1wbG95ZWVzfSBvbkNoYW5nZT17KGUpID0+IHNldEMoeyAuLi5jLCBlbXBsb3llZXM6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgfSl9IC8+CiAgICAgICAgPC9GaWVsZD4KICAgICAgICA8RmllbGQgbGFiZWw9IlNhbMOhcmlvIHBvciBmdW5jaW9uw6FyaW8gLyBtw6pzIj4KICAgICAgICAgIDxpbnB1dCB0eXBlPSJudW1iZXIiIGNsYXNzTmFtZT17aW5wdXRDbHN9IHZhbHVlPXtjLnNhbGFy",
"eVBlckVtcGxveWVlfSBvbkNoYW5nZT17KGUpID0+IHNldEMoeyAuLi5jLCBzYWxhcnlQZXJFbXBsb3llZTogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KX0gLz4KICAgICAgICA8L0ZpZWxkPgogICAgICA8L2Rpdj4KICAgICAgPEZpZWxkIGxhYmVsPSJPdXRyb3MgY3VzdG9zIGZpeG9zIC8gbcOqcyAoYWx1Z3VlbCwgcHJvcGluYSwgZW5lcmdpYSDigJQgYWzDqW0gZGEgZm9saGEgZSBkb3MgYXRpdm9zKSI+CiAgICAgICAgPGlucHV0IHR5cGU9Im51bWJlciIgY2xhc3NOYW1lPXtpbnB1dENsc30gdmFsdWU9e2MuYmFzZU1haW50",
"ZW5hbmNlfSBvbkNoYW5nZT17KGUpID0+IHNldEMoeyAuLi5jLCBiYXNlTWFpbnRlbmFuY2U6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgfSl9IC8+CiAgICAgIDwvRmllbGQ+CiAgICAgIDxkaXYgY2xhc3NOYW1lPSJ0ZXh0LXhzIHRleHQtaG9sby1mYWludCAtbXQtMiBtYi00IHNwYWNlLXktMC41Ij4KICAgICAgICA8cD5Gb2xoYSBkZSBwYWdhbWVudG86IDxiIGNsYXNzTmFtZT0idGV4dC1ob2xvLXNlY29uZGFyeSI+e2N1cnJlbmN5KG1haW50LnBheXJvbGwpfTwvYj4gwrcgQXRpdm9zOiA8YiBjbGFzc05hbWU9InRleHQtaG9s",
"by1zZWNvbmRhcnkiPntjdXJyZW5jeShtYWludC5hc3NldHNNYWludCl9PC9iPiDCtyBPdXRyb3M6IDxiIGNsYXNzTmFtZT0idGV4dC1ob2xvLXNlY29uZGFyeSI+e2N1cnJlbmN5KG1haW50Lm90aGVyKX08L2I+PC9wPgogICAgICAgIDxwPk1hbnV0ZW7Dp8OjbyB0b3RhbCBtZW5zYWw6IDxiIGNsYXNzTmFtZT0idGV4dC1za3ktMzAwIj57Y3VycmVuY3kobWFpbnQudG90YWwpfTwvYj4gQ3LDqWRpdG9zPC9wPgogICAgICA8L2Rpdj4KCiAgICAgIDxkaXYgY2xhc3NOYW1lPSJtdC00IG1iLTIgdGV4dC14cyB1cHBlcmNhc2UgdHJh",
"Y2tpbmctd2lkZXIgdGV4dC1za3ktMzAwIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEiPgogICAgICAgIDxJY29uIG5hbWU9ImNvaW5zIiBzaXplPXsxNH0gLz4gRXN0b3F1ZSBkZSBSZWN1cnNvcwogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzc05hbWU9ImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTMgbWItNCI+CiAgICAgICAge3Jlc291cmNlVHlwZXMuZmlsdGVyKChyKSA9PiByICE9PSAiRmFjY3JlZHMiKS5tYXAoKHIpID0+ICgKICAgICAgICAgIDxGaWVsZCBrZXk9e3J9IGxhYmVsPXtyfT4KICAgICAg",
"ICAgICAgPGlucHV0IHR5cGU9Im51bWJlciIgY2xhc3NOYW1lPXtpbnB1dENsc30gdmFsdWU9e2MucmVzb3VyY2VzW3JdID8/IDB9IG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlUmVzb3VyY2UociwgZS50YXJnZXQudmFsdWUpfSAvPgogICAgICAgICAgPC9GaWVsZD4KICAgICAgICApKX0KICAgICAgPC9kaXY+CgogICAgICA8ZGl2IGNsYXNzTmFtZT0ibXQtNCBtYi0yIHRleHQteHMgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtc2t5LTMwMCBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIj4KICAgICAg",
"ICA8SWNvbiBuYW1lPSJsZWFmIiBzaXplPXsxNH0gLz4gUHJvZHXDp8OjbyBBdXRvbcOhdGljYSAoYSBSZW5kYSAvIFByb2R1dG8gRmluYWwpCiAgICAgIDwvZGl2PgogICAgICA8cCBjbGFzc05hbWU9InRleHQteHMgdGV4dC1ob2xvLWZhaW50IG1iLTIiPgogICAgICAgIFJlY3Vyc28gcHLDs3ByaW8gZ2VyYWRvIHNvemluaG8gYSBjYWRhIHJvdGHDp8OjbyAoZXg6IG1pbsOpcmlvIGRlIHVtYSBtaW5hLCDDoWd1YSBkZSB1bWEgZmF6ZW5kYSBkZSB1bWlkYWRlKS4gSXNzbyA8Yj5uw6NvIHZpcmEgQ3LDqWRpdG9zIGF1dG9tYXRp",
"Y2FtZW50ZTwvYj4g4oCUIG9zIGpvZ2Fkb3JlcyBwcmVjaXNhbSB2ZW5kZXIgZXNzZSBwcm9kdXRvIGVtIGFsZ3VtIGx1Z2FyIGRvIGpvZ28uIFByb3JhdGVhZG8gaWd1YWwgw6AgbWFudXRlbsOnw6NvLiBQcmVzZXRzIHNlbSAicmVuZGEiIChFc3RhbGVpcm8sIEJhbmNvLCBHdWFybmnDp8OjbywgTWVyY2Vuw6FyaW9zKSBkZWl4YW0gaXNzbyB6ZXJhZG8gcG9yIHBhZHLDo28uCiAgICAgIDwvcD4KICAgICAgPGRpdiBjbGFzc05hbWU9ImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTMgbWItMiI+CiAgICAgICAgPEZpZWxkIGxhYmVsPSJS",
"ZWN1cnNvIHByb2R1emlkbyI+CiAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT17aW5wdXRDbHN9IHZhbHVlPXtjLnByb2R1Y3Rpb24/LnJlc291cmNlIHx8IHJlc291cmNlVHlwZXNbMF19IG9uQ2hhbmdlPXsoZSkgPT4gc2V0Qyh7IC4uLmMsIHByb2R1Y3Rpb246IHsgLi4uYy5wcm9kdWN0aW9uLCByZXNvdXJjZTogZS50YXJnZXQudmFsdWUgfSB9KX0+CiAgICAgICAgICAgIHtyZXNvdXJjZVR5cGVzLm1hcCgocikgPT4gPG9wdGlvbiBrZXk9e3J9IHZhbHVlPXtyfT57cn08L29wdGlvbj4pfQogICAgICAgICAgPC9zZWxlY3Q+",
"CiAgICAgICAgPC9GaWVsZD4KICAgICAgICA8RmllbGQgbGFiZWw9IlF1YW50aWRhZGUgLyBtw6pzIChiYXNlKSI+CiAgICAgICAgICA8aW5wdXQgdHlwZT0ibnVtYmVyIiBjbGFzc05hbWU9e2lucHV0Q2xzfSB2YWx1ZT17Yy5wcm9kdWN0aW9uPy5hbW91bnQgPz8gMH0gb25DaGFuZ2U9eyhlKSA9PiBzZXRDKHsgLi4uYywgcHJvZHVjdGlvbjogeyAuLi5jLnByb2R1Y3Rpb24sIGFtb3VudDogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9IH0pfSAvPgogICAgICAgIDwvRmllbGQ+CiAgICAgIDwvZGl2PgoKICAgICAgPGRpdiBjbGFz",
"c05hbWU9Im10LTUgbWItMiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4iPgogICAgICAgIDxkaXYgY2xhc3NOYW1lPSJ0ZXh0LXhzIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LXNreS0zMDAgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSI+CiAgICAgICAgICA8SWNvbiBuYW1lPSJ0YXJnZXQiIHNpemU9ezE0fSAvPiBNZXRhcwogICAgICAgIDwvZGl2PgogICAgICAgIDxidXR0b24gb25DbGljaz17YWRkR29hbH0gY2xhc3NOYW1lPSJ0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGdh",
"cC0xIHRleHQtc2t5LTMwMCBob3Zlcjp0ZXh0LXNreS0yMDAiPgogICAgICAgICAgPEljb24gbmFtZT0icGx1cyIgc2l6ZT17MTZ9IC8+IEFkaWNpb25hciBtZXRhCiAgICAgICAgPC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzTmFtZT0ic3BhY2UteS0yIG1iLTIiPgogICAgICAgIHtjLmdvYWxzLmxlbmd0aCA9PT0gMCAmJiA8cCBjbGFzc05hbWU9InRleHQtc20gdGV4dC1ob2xvLWZhaW50IGl0YWxpYyI+TmVuaHVtYSBtZXRhIGNhZGFzdHJhZGEuPC9wPn0KICAgICAgICB7Yy5nb2Fscy5tYXAoKGcpID0+",
"ICgKICAgICAgICAgIDxHb2FsRWRpdG9yIGtleT17Zy5pZH0gZ29hbD17Z30gb25DaGFuZ2U9eyhuZXh0KSA9PiB1cGRhdGVHb2FsKGcuaWQsIG5leHQpfSBvblJlbW92ZT17KCkgPT4gcmVtb3ZlR29hbChnLmlkKX0gLz4KICAgICAgICApKX0KICAgICAgPC9kaXY+CgogICAgICA8ZGl2IGNsYXNzTmFtZT0ibXQtNSBtYi0yIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiI+CiAgICAgICAgPGRpdiBjbGFzc05hbWU9InRleHQteHMgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtc2t5LTMwMCBmb250LXNlbWli",
"b2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIj4KICAgICAgICAgIDxJY29uIG5hbWU9ImxhbmRtYXJrIiBzaXplPXsxNH0gLz4gU3Vic8OtZGlvcwogICAgICAgIDwvZGl2PgogICAgICAgIDxidXR0b24gb25DbGljaz17YWRkU3Vic2lkeX0gY2xhc3NOYW1lPSJ0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtc2t5LTMwMCBob3Zlcjp0ZXh0LXNreS0yMDAiPgogICAgICAgICAgPEljb24gbmFtZT0icGx1cyIgc2l6ZT17MTZ9IC8+IEFkaWNpb25hciBzdWJzw61kaW8KICAgICAgICA8L2J1dHRvbj4KICAgICAg",
"PC9kaXY+CiAgICAgIDxkaXYgY2xhc3NOYW1lPSJzcGFjZS15LTIgbWItMiI+CiAgICAgICAge2Muc3Vic2lkaWVzLmxlbmd0aCA9PT0gMCAmJiA8cCBjbGFzc05hbWU9InRleHQtc20gdGV4dC1ob2xvLWZhaW50IGl0YWxpYyI+TmVuaHVtIHN1YnPDrWRpbyBjYWRhc3RyYWRvLjwvcD59CiAgICAgICAge2Muc3Vic2lkaWVzLm1hcCgocykgPT4gKAogICAgICAgICAgPFN1YnNpZHlFZGl0b3Iga2V5PXtzLmlkfSBzdWJzaWR5PXtzfSBmYWN0aW9ucz17ZmFjdGlvbnN9IHJlc291cmNlVHlwZXM9e3Jlc291cmNlVHlwZXN9IGdvYWxz",
"PXtjLmdvYWxzfSBvbkNoYW5nZT17KG5leHQpID0+IHVwZGF0ZVN1YnNpZHkocy5pZCwgbmV4dCl9IG9uUmVtb3ZlPXsoKSA9PiByZW1vdmVTdWJzaWR5KHMuaWQpfSAvPgogICAgICAgICkpfQogICAgICA8L2Rpdj4KCiAgICAgIDxkaXYgY2xhc3NOYW1lPSJtdC01IG1iLTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIj4KICAgICAgICA8ZGl2IGNsYXNzTmFtZT0idGV4dC14cyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1za3ktMzAwIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEi",
"PgogICAgICAgICAgPEljb24gbmFtZT0id3JlbmNoIiBzaXplPXsxNH0gLz4gQXRpdm9zIChOYXZlcywgRHJvaWRlcywgRXN0cnV0dXJhcy4uLikKICAgICAgICA8L2Rpdj4KICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2FkZEFzc2V0fSBjbGFzc05hbWU9InRleHQtc20gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1za3ktMzAwIGhvdmVyOnRleHQtc2t5LTIwMCI+CiAgICAgICAgICA8SWNvbiBuYW1lPSJwbHVzIiBzaXplPXsxNn0gLz4gQWRpY2lvbmFyIGF0aXZvCiAgICAgICAgPC9idXR0b24+CiAgICAgIDwvZGl2Pgog",
"ICAgICA8ZGl2IGNsYXNzTmFtZT0ic3BhY2UteS0yIj4KICAgICAgICB7Yy5hc3NldHMubGVuZ3RoID09PSAwICYmIDxwIGNsYXNzTmFtZT0idGV4dC1zbSB0ZXh0LWhvbG8tZmFpbnQgaXRhbGljIj5OZW5odW0gYXRpdm8gY2FkYXN0cmFkby48L3A+fQogICAgICAgIHtjLmFzc2V0cy5tYXAoKGEpID0+ICgKICAgICAgICAgIDxBc3NldEVkaXRvciBrZXk9e2EuaWR9IGFzc2V0PXthfSByZXNvdXJjZVR5cGVzPXtyZXNvdXJjZVR5cGVzfSBvbkNoYW5nZT17KG5leHQpID0+IHVwZGF0ZUFzc2V0KGEuaWQsIG5leHQpfSBvblJlbW92",
"ZT17KCkgPT4gcmVtb3ZlQXNzZXQoYS5pZCl9IC8+CiAgICAgICAgKSl9CiAgICAgIDwvZGl2PgoKICAgICAgPGRpdiBjbGFzc05hbWU9ImZsZXggZ2FwLTIgbXQtNiI+CiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9ImhvbG8tYnRuLXByaW1hcnkgZmxleC0xIHJvdW5kZWQtbWQgcHktMiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiIgb25DbGljaz17KCkgPT4gb25TYXZlKGMpfT4KICAgICAgICAgIDxJY29uIG5hbWU9InNhdmUiIHNpemU9ezE2fSAvPiBTYWx2YXIgZW1wcmVzYQogICAgICAgIDwvYnV0",
"dG9uPgogICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSJweC00IHJvdW5kZWQtbWQgYm9yZGVyIGJvcmRlci1za3ktNTAwLzMwIHRleHQtaG9sby1zZWNvbmRhcnkgaG92ZXI6Ymctc2t5LTUwMC8xMCB0cmFuc2l0aW9uIiBvbkNsaWNrPXtvbkNsb3NlfT4KICAgICAgICAgIENhbmNlbGFyCiAgICAgICAgPC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgPC9Nb2RhbD4KICApOwp9CmZ1bmN0aW9uIENvbXBhbnlDYXJkKHsgY29tcGFueSwgZmFjdGlvbnMsIGlzR00sIG9uRWRpdCwgb25EZWxldGUgfSkgewogIGNvbnN0IFtleHBhbmRl",
"ZCwgc2V0RXhwYW5kZWRdID0gdXNlU3RhdGUoZmFsc2UpOwogIGNvbnN0IG1haW50SW5mbyA9IGNvbXB1dGVNYWludGVuYW5jZShjb21wYW55KTsKICBjb25zdCBtYWludCA9IG1haW50SW5mby50b3RhbDsKICBjb25zdCBjcmVkaXRzID0gY29tcGFueS5yZXNvdXJjZXNbIkNyw6lkaXRvcyJdID8/IDA7CiAgY29uc3QgZmFjcyA9IGNvbXBhbnkucmVzb3VyY2VzWyJGYWNjcmVkcyJdID8/IDA7CiAgY29uc3Qgc29sdmVudCA9IGNyZWRpdHMgPj0gMDsKICBjb25zdCBhY3RpdmVTdWJzaWRpZXMgPSBjb21wYW55LnN1YnNpZGllcy5m",
"aWx0ZXIoKHMpID0+IHMuYWN0aXZlICYmIHMuZmFjdGlvbklkKTsKICBjb25zdCBwcmVzZXQgPSBDT01QQU5ZX1BSRVNFVFMuZmluZCgocCkgPT4gcC5rZXkgPT09IGNvbXBhbnkucHJlc2V0S2V5KSB8fCBDT01QQU5ZX1BSRVNFVFNbMF07CiAgY29uc3QgcGxhbmV0TGV2ZWwgPSBQTEFORVRfTEVWRUxTLmZpbmQoKHApID0+IHAua2V5ID09PSBjb21wYW55LnBsYW5ldExldmVsKSB8fCBQTEFORVRfTEVWRUxTWzJdOwoKICBjb25zdCBzdWJzaWR5TW9udGhseUJ5UmVzb3VyY2UgPSB7fTsKICBhY3RpdmVTdWJzaWRpZXMuZm9yRWFj",
"aCgocykgPT4gewogICAgc3Vic2lkeU1vbnRobHlCeVJlc291cmNlW3MucmVzb3VyY2VdID0gKHN1YnNpZHlNb250aGx5QnlSZXNvdXJjZVtzLnJlc291cmNlXSB8fCAwKSArIChOdW1iZXIocy5hbW91bnQpIHx8IDApOwogIH0pOwogIGNvbnN0IHByb2R1Y3Rpb25BbW91bnQgPSBOdW1iZXIoY29tcGFueS5wcm9kdWN0aW9uPy5hbW91bnQpIHx8IDA7CiAgY29uc3QgY3JlZGl0TmV0ID0KICAgIChzdWJzaWR5TW9udGhseUJ5UmVzb3VyY2VbIkNyw6lkaXRvcyJdIHx8IDApICsKICAgIChjb21wYW55LnByb2R1Y3Rpb24/LnJlc291",
"cmNlID09PSAiQ3LDqWRpdG9zIiA/IHByb2R1Y3Rpb25BbW91bnQgOiAwKSAtCiAgICBtYWludDsKCiAgcmV0dXJuICgKICAgIDxkaXYgY2xhc3NOYW1lPSJob2xvLXBhbmVsIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIj4KICAgICAgPGRpdiBjbGFzc05hbWU9InAtNCI+CiAgICAgICAgPGRpdiBjbGFzc05hbWU9ImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0zIj4KICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yLjUiPgogICAgICAgICAgICA8ZGl2IGNsYXNzTmFt",
"ZT0idy05IGgtOSByb3VuZGVkLWxnIGJnLXNreS01MDAvMTAgYm9yZGVyIGJvcmRlci1za3ktNTAwLzI1IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNocmluay0wIG10LTAuNSI+CiAgICAgICAgICAgICAgPEljb24gbmFtZT17cHJlc2V0Lmljb24gfHwgImJ1aWxkaW5nIn0gc2l6ZT17MTd9IGNsYXNzTmFtZT0idGV4dC1za3ktMzAwIiAvPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgPGRpdj4KICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1ob2xv",
"LXByaW1hcnkgbGVhZGluZy10aWdodCI+e2NvbXBhbnkubmFtZX08L2gzPgogICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0idGV4dC14cyB0ZXh0LWhvbG8tbXV0ZWQiPntjb21wYW55LnR5cGV9IOKAoiB7Y29tcGFueS5vd25lcn08L3A+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0iZmxleCBmbGV4LWNvbCBpdGVtcy1lbmQgZ2FwLTEiPgogICAgICAgICAgICA8QmFkZ2UgdG9uZT17c29sdmVudCA/ICJncmVlbiIgOiAicmVkIn0+e3NvbHZlbnQgPyAiU29sdmVu",
"dGUiIDogIkTDqWZpY2l0In08L0JhZGdlPgogICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9InRleHQtWzEwcHhdIHRleHQtaG9sby1mYWludCI+e3BsYW5ldExldmVsLmxhYmVsfSAoeHtwbGFuZXRMZXZlbC5tdWx0fSk8L3NwYW4+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KCiAgICAgICAge2NvbXBhbnkuZGVzY3JpcHRpb24gJiYgPHAgY2xhc3NOYW1lPSJ0ZXh0LXNtIHRleHQtaG9sby1tdXRlZCBtdC0yIj57Y29tcGFueS5kZXNjcmlwdGlvbn08L3A+fQoKICAgICAgICB7Y29tcGFueS5sYXN0UnVuICYmICgK",
"ICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbXQtMiB0ZXh0LXhzIHJvdW5kZWQtbWQgcHgtMiBweS0xLjUgYm9yZGVyIGZsZXggZmxleC1jb2wgZ2FwLTAuNSAke2NvbXBhbnkubGFzdFJ1bi5kZWZpY2l0ID8gImJnLXJvc2UtNTAwLzEwIGJvcmRlci1yb3NlLTUwMC8zMCB0ZXh0LXJvc2UtMzAwIiA6ICJiZy1ibGFjay8zMCBib3JkZXItc2t5LTUwMC8xNSB0ZXh0LWhvbG8tbXV0ZWQifWB9PgogICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9ImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUiPgogICAgICAgICAgICAgIDxJY29u",
"IG5hbWU9Imhpc3RvcnkiIHNpemU9ezEzfSBjbGFzc05hbWU9InNocmluay0wIiAvPgogICAgICAgICAgICAgIMOabHRpbWEgcm90YcOnw6NvICh7Y29tcGFueS5sYXN0UnVuLmxhYmVsfSk6IOKIkntjdXJyZW5jeShjb21wYW55Lmxhc3RSdW4ubWFpbnREdWUpfSBtYW51dGVuw6fDo28KICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoY29tcGFueS5sYXN0UnVuLmluY29tZUJ5UmVzb3VyY2UgfHwge30pLm1hcCgoW3JlcywgdmFsXSkgPT4gKAogICAgICAgICAgICAgICAgPHNwYW4ga2V5PXtyZXN9PiDCtyAre2N1cnJlbmN5",
"KHZhbCl9IHtyZXN9PC9zcGFuPgogICAgICAgICAgICAgICkpfQogICAgICAgICAgICA8L3NwYW4+CiAgICAgICAgICAgIHtjb21wYW55Lmxhc3RSdW4uZ29hbHNDaGVja2VkICYmIGNvbXBhbnkubGFzdFJ1bi5nb2Fsc0NoZWNrZWQubGVuZ3RoID4gMCAmJiAoCiAgICAgICAgICAgICAgPHNwYW4+TWV0YXM6IHtjb21wYW55Lmxhc3RSdW4uZ29hbHNDaGVja2VkLmZpbHRlcigoZykgPT4gZy5oaXQpLmxlbmd0aH0ve2NvbXBhbnkubGFzdFJ1bi5nb2Fsc0NoZWNrZWQubGVuZ3RofSBiYXRpZGFzPC9zcGFuPgogICAgICAgICAgICAp",
"fQogICAgICAgICAgICB7Y29tcGFueS5sYXN0UnVuLnN1YnNpZGllc0N1dCAmJiBjb21wYW55Lmxhc3RSdW4uc3Vic2lkaWVzQ3V0Lmxlbmd0aCA+IDAgJiYgKAogICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0idGV4dC1yb3NlLTMwMCI+U3Vic8OtZGlvIGNvcnRhZG86IHtjb21wYW55Lmxhc3RSdW4uc3Vic2lkaWVzQ3V0Lm1hcCgocykgPT4gcy5mYWN0aW9uTmFtZSkuam9pbigiLCAiKX08L3NwYW4+CiAgICAgICAgICAgICl9CiAgICAgICAgICA8L2Rpdj4KICAgICAgICApfQoKICAgICAgICA8ZGl2IGNsYXNzTmFtZT0i",
"bXQtMyBob2xvLXBhbmVsIHJvdW5kZWQtbGcgcC0zIj4KICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMiI+CiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0iZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LXhzIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LWhvbG8tbXV0ZWQiPgogICAgICAgICAgICAgIDxJY29uIG5hbWU9ImNvaW5zIiBzaXplPXsxM30gY2xhc3NOYW1lPSJ0ZXh0LXNreS00MDAiIC8+IENhaXhhIChDcsOpZGl0b3MpCiAgICAg",
"ICAgICAgIDwvc3Bhbj4KICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC14bCBmb250LWJvbGQgJHtzb2x2ZW50ID8gInRleHQtZW1lcmFsZC0zMDAiIDogInRleHQtcm9zZS0zMDAifWB9PntjdXJyZW5jeShjcmVkaXRzKX08L3NwYW4+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMiB0ZXh0LVsxMXB4XSI+CiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0iZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LWhv",
"bG8tZmFpbnQiPgogICAgICAgICAgICAgIDxJY29uIG5hbWU9InNjYWxlIiBzaXplPXsxMn0gY2xhc3NOYW1lPSJ0ZXh0LXNreS00MDAiIC8+IEZhY2NyZWRzIChpbnZlc3RpbWVudG8gZsOtc2ljbykKICAgICAgICAgICAgPC9zcGFuPgogICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9InRleHQtaG9sby1zZWNvbmRhcnkgZm9udC1tZWRpdW0iPntjdXJyZW5jeShmYWNzKX08L3NwYW4+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJncmlkIGdyaWQtY29scy0zIGdhcC0yIHRleHQtY2VudGVyIHRl",
"eHQteHMiPgogICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0iYmctYmxhY2svMzAgcm91bmRlZC1tZCBweS0xLjUgcHgtMSI+CiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9ImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIHRleHQtcm9zZS0zMDAiPjxJY29uIG5hbWU9ImFycm93ZG93biIgc2l6ZT17MTJ9IC8+IE1hbnV0ZW7Dp8OjbzwvZGl2PgogICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJ0ZXh0LWhvbG8tcHJpbWFyeSBmb250LXNlbWlib2xkIG10LTAuNSI+e2N1cnJlbmN5KG1haW50KX0v",
"bcOqczwvZGl2PgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9ImJnLWJsYWNrLzMwIHJvdW5kZWQtbWQgcHktMS41IHB4LTEiPgogICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSB0ZXh0LXNreS0zMDAiPjxJY29uIG5hbWU9ImFycm93dXAiIHNpemU9ezEyfSAvPiBTdWJzw61kaW9zPC9kaXY+CiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9InRleHQtaG9sby1wcmltYXJ5IGZvbnQtc2VtaWJvbGQgbXQtMC41Ij4K",
"ICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhzdWJzaWR5TW9udGhseUJ5UmVzb3VyY2UpLmxlbmd0aCA9PT0gMCA/ICLigJQiIDogT2JqZWN0LmVudHJpZXMoc3Vic2lkeU1vbnRobHlCeVJlc291cmNlKS5tYXAoKFtyZXMsIHZhbF0pID0+IGAke2N1cnJlbmN5KHZhbCl9ICR7cmVzfWApLmpvaW4oIiDCtyAiKX0KICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJiZy1ibGFjay8zMCByb3VuZGVkLW1kIHB5LTEuNSBweC0xIj4KICAgICAgICAgICAg",
"ICA8ZGl2IGNsYXNzTmFtZT0iZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgdGV4dC1lbWVyYWxkLTMwMCI+PEljb24gbmFtZT0ibGVhZiIgc2l6ZT17MTJ9IC8+IFByb2R1w6fDo288L2Rpdj4KICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0idGV4dC1ob2xvLXByaW1hcnkgZm9udC1zZW1pYm9sZCBtdC0wLjUiPgogICAgICAgICAgICAgICAge3Byb2R1Y3Rpb25BbW91bnQgPiAwID8gYCR7Y3VycmVuY3kocHJvZHVjdGlvbkFtb3VudCl9ICR7Y29tcGFueS5wcm9kdWN0aW9uLnJlc291cmNlfS9tw6pz",
"YCA6ICLigJQifQogICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAge2NyZWRpdE5ldCAhPT0gMCAmJiAoCiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17YG10LTIgdGV4dC1bMTFweF0gdGV4dC1jZW50ZXIgJHtjcmVkaXROZXQgPj0gMCA/ICJ0ZXh0LWVtZXJhbGQtNDAwIiA6ICJ0ZXh0LXJvc2UtNDAwIn1gfT4KICAgICAgICAgICAgICBTYWxkbyBtZW5zYWwgcHJvamV0YWRvIGVtIENyw6lkaXRvczoge2NyZWRpdE5ldCA+PSAwID8gIisiIDogIiJ9e2N1cnJl",
"bmN5KGNyZWRpdE5ldCl9CiAgICAgICAgICAgIDwvcD4KICAgICAgICAgICl9CiAgICAgICAgPC9kaXY+CgogICAgICAgIHtjb21wYW55LmdvYWxzLmxlbmd0aCA+IDAgJiYgKAogICAgICAgICAgPGRpdiBjbGFzc05hbWU9Im10LTMgc3BhY2UteS0yIj4KICAgICAgICAgICAge2NvbXBhbnkuZ29hbHMubWFwKChnKSA9PiAoCiAgICAgICAgICAgICAgPGRpdiBrZXk9e2cuaWR9PgogICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9ImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1ob2xvLW11dGVkIG1iLTEiPgog",
"ICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9ImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIj48SWNvbiBuYW1lPSJ0YXJnZXQiIHNpemU9ezEyfSAvPiB7Zy5kZXNjcmlwdGlvbiB8fCAiTWV0YSJ9PC9zcGFuPgogICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9ImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIj4KICAgICAgICAgICAgICAgICAgICB7Y3VycmVuY3koZy5jdXJyZW50KX0gLyB7Y3VycmVuY3koZy50YXJnZXQpfXtnLmRlYWRsaW5lID8gYCDCtyAke2cuZGVhZGxpbmV9YCA6ICIifQogICAgICAgICAg",
"ICAgICAgICAgIHtnLmxhc3RSZXN1bHQgPT09ICJvayIgJiYgPEljb24gbmFtZT0iY2hlY2tjaXJjbGUiIHNpemU9ezEyfSBjbGFzc05hbWU9InRleHQtZW1lcmFsZC00MDAiIC8+fQogICAgICAgICAgICAgICAgICAgIHtnLmxhc3RSZXN1bHQgPT09ICJmYWlsIiAmJiA8SWNvbiBuYW1lPSJ4Y2lyY2xlIiBzaXplPXsxMn0gY2xhc3NOYW1lPSJ0ZXh0LXJvc2UtNDAwIiAvPn0KICAgICAgICAgICAgICAgICAgPC9zcGFuPgogICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICA8UHJvZ3Jlc3NCYXIgdmFsdWU9e2cu",
"Y3VycmVudH0gbWF4PXtnLnRhcmdldCB8fCAxfSAvPgogICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICApKX0KICAgICAgICAgIDwvZGl2PgogICAgICAgICl9CgogICAgICAgIHtjb21wYW55LnN1YnNpZGllcy5sZW5ndGggPiAwICYmICgKICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJtdC0zIGZsZXggZmxleC13cmFwIGdhcC0xIj4KICAgICAgICAgICAge2NvbXBhbnkuc3Vic2lkaWVzLm1hcCgocykgPT4gewogICAgICAgICAgICAgIGNvbnN0IGZhY3Rpb24gPSBmYWN0aW9ucy5maW5kKChmKSA9PiBmLmlkID09PSBz",
"LmZhY3Rpb25JZCk7CiAgICAgICAgICAgICAgcmV0dXJuICgKICAgICAgICAgICAgICAgIDxCYWRnZSBrZXk9e3MuaWR9IHRvbmU9e3MuYWN0aXZlID8gInNreSIgOiAicmVkIn0+CiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBmYWN0aW9uID8gZmFjdGlvbi5jb2xvciA6ICIjODg4IiB9fT7il488L3NwYW4+IHtmYWN0aW9uID8gZmFjdGlvbi5uYW1lIDogIj8ifSB7IXMuYWN0aXZlICYmICIoY29ydGFkbykifQogICAgICAgICAgICAgICAgPC9CYWRnZT4KICAgICAgICAgICAgICApOwogICAgICAgICAg",
"ICB9KX0KICAgICAgICAgIDwvZGl2PgogICAgICAgICl9CgogICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSJtdC0zIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1ob2xvLW11dGVkIGhvdmVyOnRleHQtc2t5LTMwMCB0cmFuc2l0aW9uIiBvbkNsaWNrPXsoKSA9PiBzZXRFeHBhbmRlZCgoZSkgPT4gIWUpfT4KICAgICAgICAgIHtleHBhbmRlZCA/IDxJY29uIG5hbWU9ImNoZXZyb25kb3duIiBzaXplPXsxNH0gLz4gOiA8SWNvbiBuYW1lPSJjaGV2cm9ucmlnaHQiIHNpemU9ezE0fSAvPn0KICAgICAgICAgIERl",
"dGFsaGVzICh7Y29tcGFueS5hc3NldHMubGVuZ3RofSBhdGl2b3tjb21wYW55LmFzc2V0cy5sZW5ndGggIT09IDEgPyAicyIgOiAiIn0pCiAgICAgICAgPC9idXR0b24+CgogICAgICAgIHtleHBhbmRlZCAmJiAoCiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ibXQtMyBzcGFjZS15LTIgYm9yZGVyLXQgYm9yZGVyLXNreS01MDAvMTUgcHQtMyI+CiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJncmlkIGdyaWQtY29scy0yIGdhcC0yIHRleHQteHMiPgogICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhjb21wYW55LnJlc291",
"cmNlcykubWFwKChbaywgdl0pID0+ICgKICAgICAgICAgICAgICAgIDxkaXYga2V5PXtrfSBjbGFzc05hbWU9ImZsZXgganVzdGlmeS1iZXR3ZWVuIGJnLWJsYWNrLzMwIHJvdW5kZWQgcHgtMiBweS0xIj4KICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSJ0ZXh0LWhvbG8tbXV0ZWQiPntrfTwvc3Bhbj4KICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSJmb250LW1lZGl1bSB0ZXh0LWhvbG8tcHJpbWFyeSI+e2N1cnJlbmN5KHYpfTwvc3Bhbj4KICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAg",
"ICAgICkpfQogICAgICAgICAgICA8L2Rpdj4KCiAgICAgICAgICAgIHtjb21wYW55LmFzc2V0cy5sZW5ndGggPiAwICYmICgKICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ic3BhY2UteS0xIj4KICAgICAgICAgICAgICAgIHtjb21wYW55LmFzc2V0cy5tYXAoKGEpID0+IHsKICAgICAgICAgICAgICAgICAgY29uc3QgaWNvbk5hbWUgPSBBU1NFVF9UWVBFUy5maW5kKCh0KSA9PiB0LmtleSA9PT0gYS50eXBlKT8uaWNvbiB8fCAicGFja2FnZSI7CiAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1c1RvbmUgPSBhLnN0YXR1",
"cyA9PT0gImF0aXZvIiA/ICJncmVlbiIgOiBhLnN0YXR1cyA9PT0gImNvbnN0cnVjYW8iID8gInNreSIgOiAicmVkIjsKICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzTGFiZWwgPSBhLnN0YXR1cyA9PT0gImF0aXZvIiA/ICJBdGl2byIgOiBhLnN0YXR1cyA9PT0gImNvbnN0cnVjYW8iID8gIkVtIGNvbnN0cnXDp8OjbyIgOiAiSW5hdGl2byI7CiAgICAgICAgICAgICAgICAgIHJldHVybiAoCiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2EuaWR9IGNsYXNzTmFtZT0iZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1i",
"ZXR3ZWVuIHRleHQteHMgYmctYmxhY2svMzAgcm91bmRlZCBweC0yIHB5LTEuNSI+CiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9ImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1ob2xvLXNlY29uZGFyeSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9e2ljb25OYW1lfSBzaXplPXsxM30gY2xhc3NOYW1lPSJ0ZXh0LXNreS00MDAiIC8+IHthLm5hbWV9CiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+CiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9ImZs",
"ZXggaXRlbXMtY2VudGVyIGdhcC0yIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSJ0ZXh0LWhvbG8tZmFpbnQiPm1hbnV0LiB7Y3VycmVuY3koYS5tYWludGVuYW5jZSl9PC9zcGFuPgogICAgICAgICAgICAgICAgICAgICAgICA8QmFkZ2UgdG9uZT17c3RhdHVzVG9uZX0+e3N0YXR1c0xhYmVsfTwvQmFkZ2U+CiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+CiAgICAgICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICB9KX0KICAgICAgICAg",
"ICAgICA8L2Rpdj4KICAgICAgICAgICAgKX0KCiAgICAgICAgICAgIHtjb21wYW55Lmhpc3RvcnkgJiYgY29tcGFueS5oaXN0b3J5Lmxlbmd0aCA+IDAgJiYgKAogICAgICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9InRleHQtWzExcHhdIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LWhvbG8tZmFpbnQgbWItMSI+SGlzdMOzcmljbyBkZSByb3Rhw6fDtWVzPC9wPgogICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9InNwYWNlLXktMSBtYXgtaC0zMiBvdmVyZmxvdy15LWF1dG8gcHIt",
"MSI+CiAgICAgICAgICAgICAgICAgIHtjb21wYW55Lmhpc3RvcnkubWFwKChoKSA9PiAoCiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2guaWR9IGNsYXNzTmFtZT0idGV4dC1bMTFweF0gZmxleCBqdXN0aWZ5LWJldHdlZW4gYmctYmxhY2svMjAgcm91bmRlZCBweC0yIHB5LTEiPgogICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSJ0ZXh0LWhvbG8tbXV0ZWQiPntoLmxhYmVsfTwvc3Bhbj4KICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0idGV4dC1ob2xvLXNlY29uZGFyeSI+CiAg",
"ICAgICAgICAgICAgICAgICAgICAgIOKIkntjdXJyZW5jeShoLm1haW50RHVlKX0KICAgICAgICAgICAgICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKGguaW5jb21lQnlSZXNvdXJjZSB8fCB7fSkubWFwKChbcmVzLCB2YWxdKSA9PiBgIC8gKyR7Y3VycmVuY3kodmFsKX0gJHtyZXN9YCl9CiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+CiAgICAgICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICAgICkpfQogICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAg",
"ICl9CiAgICAgICAgICA8L2Rpdj4KICAgICAgICApfQoKICAgICAgICB7aXNHTSAmJiAoCiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ibXQtNCBmbGV4IGdhcC0yIGJvcmRlci10IGJvcmRlci1za3ktNTAwLzE1IHB0LTMiPgogICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uRWRpdH0gY2xhc3NOYW1lPSJmbGV4LTEgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgdGV4dC14cyBiZy1za3ktNTAwLzEwIGhvdmVyOmJnLXNreS01MDAvMjAgcm91bmRlZC1tZCBweS0xLjUgdGV4dC1za3ktMjAwIHRyYW5z",
"aXRpb24iPgogICAgICAgICAgICAgIDxJY29uIG5hbWU9InBlbmNpbCIgc2l6ZT17MTN9IC8+IEVkaXRhcgogICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkRlbGV0ZX0gY2xhc3NOYW1lPSJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSB0ZXh0LXhzIGJnLXJvc2UtOTAwLzMwIGhvdmVyOmJnLXJvc2UtOTAwLzYwIHJvdW5kZWQtbWQgcHktMS41IHB4LTMgdGV4dC1yb3NlLTMwMCB0cmFuc2l0aW9uIj4KICAgICAgICAgICAgICA8SWNvbiBuYW1lPSJ0cmFzaCIg",
"c2l6ZT17MTN9IC8+CiAgICAgICAgICAgIDwvYnV0dG9uPgogICAgICAgICAgPC9kaXY+CiAgICAgICAgKX0KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICApOwp9CgpmdW5jdGlvbiBSdW5QYW5lbCh7IHN0YXRlLCBpc0dNLCBvblJ1biB9KSB7CiAgY29uc3QgW2NvbmZpcm1UeXBlLCBzZXRDb25maXJtVHlwZV0gPSB1c2VTdGF0ZShudWxsKTsKICBjb25zdCBzaG9ydFVuaXRMYWJlbCA9IHN0YXRlLmNvbmZpZy5zaG9ydFVuaXQgPT09ICJkaWEiID8gIkRpYSIgOiAiU2VtYW5hIjsKCiAgY29uc3QgUk9UQVRJT05TID0gWwogICAg",
"eyB0eXBlOiAiZGlhcmlhIiwgdGl0bGU6ICJSb3Rhw6fDo28gRGnDoXJpYSIsIGljb246ICJzdW4iLCB0b25lOiAiYmx1ZSIsIGRlc2M6ICJTZW1wcmUgMSBEaWEgKDEvMzAgZG8gbcOqcykuIENvYnJhIG1hbnV0ZW7Dp8OjbyBlIHBhZ2Egc3Vic8OtZGlvIHByb3BvcmNpb25haXMgZSBWRVJJRklDQSBzZSBhcyBtZXRhcyBmb3JhbSBjdW1wcmlkYXMuIEZpY2Egc8OzIGFxdWkg4oCUIG7Do28gbWV4ZSBubyBHYWxhY3RpYyBMZWRnZXIuIiwgY3RhOiAiUm9kYXIgMSBkaWEiIH0sCiAgICB7IHR5cGU6ICJjdXJ0YSIsIHRpdGxlOiAi",
"Um90YcOnw6NvIEN1cnRhIiwgaWNvbjogImNsb2NrIiwgdG9uZTogImJsdWUiLCBkZXNjOiBgQ2FsY3VsYSAxICR7c2hvcnRVbml0TGFiZWwudG9Mb3dlckNhc2UoKX0gKCR7c3RhdGUuY29uZmlnLnNob3J0VW5pdCA9PT0gImRpYSIgPyAiMS8zMCIgOiAiMS80In0gZG8gbcOqcykuIENvYnJhIG1hbnV0ZW7Dp8OjbyBlIHBhZ2Egc3Vic8OtZGlvIHByb3BvcmNpb25haXMuIE7Do28gdmVyaWZpY2EgbWV0YXMuIPCfjIwgVGFtYsOpbSBnaXJhIG8gR2FsYWN0aWMgTGVkZ2VyIGludGVpcm8gKG1lcmNhZG8sIGbDoWJyaWNhcywgZmFj",
"w6fDtWVzLi4uKS5gLCBjdGE6IGBSb2RhciAxICR7c2hvcnRVbml0TGFiZWwudG9Mb3dlckNhc2UoKX1gIH0sCiAgICB7IHR5cGU6ICJsb25nYSIsIHRpdGxlOiAiUm90YcOnw6NvIExvbmdhIiwgaWNvbjogImNhbGVuZGFyIiwgdG9uZTogInJlZCIsIGRlc2M6ICJDYWxjdWxhIG8gbcOqcyBpbnRlaXJvLiBDb2JyYSBtYW51dGVuw6fDo28gZSBwYWdhIHN1YnPDrWRpbyBjaGVpb3MsIHZlcmlmaWNhIG1ldGFzIGUgY29ydGEgc3Vic8OtZGlvcyB2aW5jdWxhZG9zIGEgbWV0YXMgcXVlIGZhbGhhcmFtLiDwn4yMIFRhbWLDqW0gZ2ly",
"YSBvIEdhbGFjdGljIExlZGdlciBpbnRlaXJvIChtZXJjYWRvLCBmw6FicmljYXMsIGZhY8Onw7Vlcy4uLikuIiwgY3RhOiAiUm9kYXIgbyBtw6pzIiB9LAogIF07CgogIHJldHVybiAoCiAgICA8ZGl2PgogICAgICA8aDIgY2xhc3NOYW1lPSJob2xvLXRpdGxlIHRleHQtMnhsIG1iLTEgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIiPgogICAgICAgIDxJY29uIG5hbWU9InJvdGF0ZWN3IiBzaXplPXsyMn0gY2xhc3NOYW1lPSJ0ZXh0LXNreS00MDAiIC8+IFJvZGFyIFRlbXBvCiAgICAgIDwvaDI+CiAgICAgIDxwIGNsYXNzTmFtZT0i",
"dGV4dC1zbSB0ZXh0LWhvbG8tbXV0ZWQgbWItNSI+QXZhbsOnYSBvIHJlbMOzZ2lvIGRhIGNhbXBhbmhhIGUgcmVjYWxjdWxhIGF1dG9tYXRpY2FtZW50ZSBtYW51dGVuw6fDo28sIHN1YnPDrWRpb3MgZSBjdW1wcmltZW50byBkZSBtZXRhcyBkZSB0b2RhcyBhcyBlbXByZXNhcy48L3A+CgogICAgICA8ZGl2IGNsYXNzTmFtZT0iaG9sby1wYW5lbCByb3VuZGVkLWxnIHB4LTQgcHktMyBtYi02IGZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAteC02IGdhcC15LTIgdGV4dC1zbSI+CiAgICAgICAgPHNwYW4gY2xhc3NOYW1l",
"PSJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiI+PEljb24gbmFtZT0iY2FsZW5kYXIiIHNpemU9ezE2fSBjbGFzc05hbWU9InRleHQtc2t5LTQwMCIgLz4gTcOqcyA8YiBjbGFzc05hbWU9InRleHQtaG9sby1wcmltYXJ5Ij57c3RhdGUudHVybi5tb250aH08L2I+PC9zcGFuPgogICAgICAgIDxzcGFuIGNsYXNzTmFtZT0iZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIiPjxJY29uIG5hbWU9InN1biIgc2l6ZT17MTZ9IGNsYXNzTmFtZT0idGV4dC1za3ktNDAwIiAvPiBEaWFzIGNvcnJpZG9zIDxiIGNsYXNzTmFtZT0idGV4dC1ob2xvLXBy",
"aW1hcnkiPntzdGF0ZS50dXJuLmRheX08L2I+PC9zcGFuPgogICAgICAgIDxzcGFuIGNsYXNzTmFtZT0iZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIiPjxJY29uIG5hbWU9ImNsb2NrIiBzaXplPXsxNn0gY2xhc3NOYW1lPSJ0ZXh0LXNreS00MDAiIC8+IFNlbWFuYXMgY29ycmlkYXMgPGIgY2xhc3NOYW1lPSJ0ZXh0LWhvbG8tcHJpbWFyeSI+e3N0YXRlLnR1cm4ud2Vla308L2I+PC9zcGFuPgogICAgICA8L2Rpdj4KCiAgICAgIHtpc0dNID8gKAogICAgICAgIDxkaXYgY2xhc3NOYW1lPSJncmlkIHNtOmdyaWQtY29scy0zIGdhcC00",
"IG1iLTgiPgogICAgICAgICAge1JPVEFUSU9OUy5tYXAoKHIpID0+IHsKICAgICAgICAgICAgY29uc3QgaXNSZWQgPSByLnRvbmUgPT09ICJyZWQiOwogICAgICAgICAgICByZXR1cm4gKAogICAgICAgICAgICAgIDxidXR0b24ga2V5PXtyLnR5cGV9IG9uQ2xpY2s9eygpID0+IHNldENvbmZpcm1UeXBlKHIudHlwZSl9IGNsYXNzTmFtZT17YGhvbG8tcGFuZWwgdGV4dC1sZWZ0IHJvdW5kZWQteGwgcC00IHRyYW5zaXRpb24gZ3JvdXAgaG92ZXI6LXRyYW5zbGF0ZS15LTAuNSAke2lzUmVkID8gImhvbG8tcGFuZWwtcmVkIiA6ICIi",
"fWB9PgogICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmb250LXNlbWlib2xkIG1iLTEgJHtpc1JlZCA/ICJ0ZXh0LXJvc2UtMzAwIiA6ICJ0ZXh0LXNreS0zMDAifWB9PgogICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPXtyLmljb259IHNpemU9ezE4fSAvPiB7ci50aXRsZX0KICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSJ0ZXh0LXhzIHRleHQtaG9sby1tdXRlZCI+e3IuZGVzY308L3A+CiAgICAgICAgICAgICAgICA8c3Bh",
"biBjbGFzc05hbWU9e2BpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC14cyBtdC0zIG9wYWNpdHktMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMCB0cmFuc2l0aW9uICR7aXNSZWQgPyAidGV4dC1yb3NlLTMwMCIgOiAidGV4dC1za3ktMzAwIn1gfT4KICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT0icGxheSIgc2l6ZT17MTJ9IC8+IHtyLmN0YX0KICAgICAgICAgICAgICAgIDwvc3Bhbj4KICAgICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgKTsKICAgICAgICAgIH0pfQogICAgICAgIDwvZGl2Pgog",
"ICAgICApIDogKAogICAgICAgIDxkaXYgY2xhc3NOYW1lPSJtYi04IHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1ob2xvLWZhaW50IGhvbG8tcGFuZWwgcm91bmRlZC1tZCBweC0zIHB5LTIiPgogICAgICAgICAgPEljb24gbmFtZT0iZXllIiBzaXplPXsxNH0gLz4gQXBlbmFzIG8gTWVzdHJlIHBvZGUgcm9kYXIgbyB0ZW1wby4gQWNvbXBhbmhlIG9zIHJlc3VsdGFkb3MgYWJhaXhvLgogICAgICAgIDwvZGl2PgogICAgICApfQoKICAgICAge2NvbmZpcm1UeXBlICYmICgKICAgICAgICA8TW9kYWwKICAgICAg",
"ICAgIHRpdGxlPXtjb25maXJtVHlwZSA9PT0gImxvbmdhIiA/ICJDb25maXJtYXIgcm90YcOnw6NvIGxvbmdhICgxIG3DqnMpIiA6IGNvbmZpcm1UeXBlID09PSAiZGlhcmlhIiA/ICJDb25maXJtYXIgcm90YcOnw6NvIGRpw6FyaWEgKDEgZGlhKSIgOiBgQ29uZmlybWFyIHJvdGHDp8OjbyBjdXJ0YSAoMSAke3Nob3J0VW5pdExhYmVsLnRvTG93ZXJDYXNlKCl9KWB9CiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRDb25maXJtVHlwZShudWxsKX0KICAgICAgICA+CiAgICAgICAgICA8cCBjbGFzc05hbWU9InRleHQtc20gdGV4",
"dC1ob2xvLXNlY29uZGFyeSBtYi00Ij4KICAgICAgICAgICAgSXNzbyB2YWkgZGViaXRhciBtYW51dGVuw6fDo28ge2NvbmZpcm1UeXBlICE9PSAibG9uZ2EiID8gInByb3BvcmNpb25hbCIgOiAiY2hlaWEifSBkZSA8Yj50b2RhczwvYj4gYXMgZW1wcmVzYXMKICAgICAgICAgICAge2NvbmZpcm1UeXBlICE9PSAiY3VydGEiID8gIiwgcGFnYXIgc3Vic8OtZGlvcyBlIGNoZWNhciBtZXRhcyIgOiAiIGUgcGFnYXIgc3Vic8OtZGlvcyBwcm9wb3JjaW9uYWlzIn0uIEVzc2EgYcOnw6NvIG7Do28gcG9kZSBzZXIgZGVzZmVpdGEuCiAg",
"ICAgICAgICAgIHtjb25maXJtVHlwZSAhPT0gImRpYXJpYSIgJiYgPD48YnIvPjxiIGNsYXNzTmFtZT0idGV4dC1za3ktMzAwIj7wn4yMIElzc28gdGFtYsOpbSB2YWkgZ2lyYXIgbyBHYWxhY3RpYyBMZWRnZXIgaW50ZWlybzwvYj4gKG1lcmNhZG8sIGbDoWJyaWNhcywgcHJvamV0b3MsIGNvbnRyYXRvcyBlIHJlbmRhIGRhcyBmYWPDp8O1ZXMpLCBzZSBlc3RpdmVyIGFiZXJ0byBkZW50cm8gZGVsZS48Lz59CiAgICAgICAgICA8L3A+CiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0iZmxleCBnYXAtMiI+CiAgICAgICAgICAgIDxi",
"dXR0b24gY2xhc3NOYW1lPSJob2xvLWJ0bi1wcmltYXJ5IGZsZXgtMSByb3VuZGVkLW1kIHB5LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIiIG9uQ2xpY2s9eygpID0+IHsgb25SdW4oY29uZmlybVR5cGUpOyBzZXRDb25maXJtVHlwZShudWxsKTsgfX0+CiAgICAgICAgICAgICAgPEljb24gbmFtZT0icGxheSIgc2l6ZT17MTZ9IC8+IENvbmZpcm1hciBlIHJvZGFyCiAgICAgICAgICAgIDwvYnV0dG9uPgogICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0icHgtNCByb3VuZGVkLW1kIGJvcmRlciBi",
"b3JkZXItc2t5LTUwMC8zMCB0ZXh0LWhvbG8tc2Vjb25kYXJ5IGhvdmVyOmJnLXNreS01MDAvMTAgdHJhbnNpdGlvbiIgb25DbGljaz17KCkgPT4gc2V0Q29uZmlybVR5cGUobnVsbCl9PkNhbmNlbGFyPC9idXR0b24+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L01vZGFsPgogICAgICApfQoKICAgICAgPGgzIGNsYXNzTmFtZT0idGV4dC1zbSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1ob2xvLW11dGVkIG1iLTIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSI+CiAgICAgICAgPEljb24gbmFtZT0iaGlzdG9yeSIg",
"c2l6ZT17MTV9IC8+IFJlZ2lzdHJvIGRlIHJvdGHDp8O1ZXMKICAgICAgPC9oMz4KICAgICAgeyghc3RhdGUubG9nIHx8IHN0YXRlLmxvZy5sZW5ndGggPT09IDApICYmIDxwIGNsYXNzTmFtZT0idGV4dC1zbSB0ZXh0LWhvbG8tZmFpbnQgaXRhbGljIj5OZW5odW1hIHJvdGHDp8OjbyByb2RhZGEgYWluZGEuPC9wPn0KICAgICAgPGRpdiBjbGFzc05hbWU9InNwYWNlLXktMyI+CiAgICAgICAgeyhzdGF0ZS5sb2cgfHwgW10pLm1hcCgoZW50cnkpID0+ICgKICAgICAgICAgIDxkaXYga2V5PXtlbnRyeS5pZH0gY2xhc3NOYW1lPSJo",
"b2xvLXBhbmVsIHJvdW5kZWQtbGcgcC0zIj4KICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9ImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1iLTIgZmxleC13cmFwIj4KICAgICAgICAgICAgICA8QmFkZ2UgdG9uZT17ZW50cnkudHlwZSA9PT0gImxvbmdhIiA/ICJyZWQiIDogInNreSJ9PntlbnRyeS50eXBlID09PSAibG9uZ2EiID8gIlJvdGHDp8OjbyBMb25nYSIgOiBlbnRyeS50eXBlID09PSAiZGlhcmlhIiA/ICJSb3Rhw6fDo28gRGnDoXJpYSIgOiAiUm90YcOnw6NvIEN1cnRhIn08L0JhZGdlPgogICAgICAgICAgICAgIDxz",
"cGFuIGNsYXNzTmFtZT0idGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWhvbG8tcHJpbWFyeSI+e2VudHJ5LmxhYmVsfTwvc3Bhbj4KICAgICAgICAgICAgICB7ZW50cnkuZG9taW5hbnRGYWN0aW9uTmFtZSAmJiBlbnRyeS50YXhDb2xsZWN0ZWQgPiAwICYmICgKICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0idGV4dC1bMTFweF0gdGV4dC1yb3NlLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBtbC1hdXRvIj4KICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT0ic3RhciIgc2l6ZT17MTF9IC8+IHtlbnRyeS5kb21p",
"bmFudEZhY3Rpb25OYW1lfSBhcnJlY2Fkb3Uge2N1cnJlbmN5KGVudHJ5LnRheENvbGxlY3RlZCl9IENyw6lkaXRvcwogICAgICAgICAgICAgICAgPC9zcGFuPgogICAgICAgICAgICAgICl9CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ic3BhY2UteS0xIj4KICAgICAgICAgICAgICB7ZW50cnkucmVzdWx0cy5tYXAoKHIpID0+ICgKICAgICAgICAgICAgICAgIDxkaXYga2V5PXtyLmNvbXBhbnlJZH0gY2xhc3NOYW1lPSJ0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2Vl",
"biBiZy1ibGFjay8zMCByb3VuZGVkIHB4LTIgcHktMSI+CiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0idGV4dC1ob2xvLXNlY29uZGFyeSI+e3IuY29tcGFueU5hbWV9PC9zcGFuPgogICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9ImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtaG9sby1tdXRlZCI+CiAgICAgICAgICAgICAgICAgICAgPHNwYW4+4oiSe2N1cnJlbmN5KHIubWFpbnREdWUpfTwvc3Bhbj4KICAgICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoci5pbmNvbWVCeVJlc291",
"cmNlIHx8IHt9KS5tYXAoKFtyZXMsIHZhbF0pID0+IDxzcGFuIGtleT17cmVzfSBjbGFzc05hbWU9InRleHQtZW1lcmFsZC00MDAiPit7Y3VycmVuY3kodmFsKX0ge3Jlc308L3NwYW4+KX0KICAgICAgICAgICAgICAgICAgICB7ci5wcm9kdWN0aW9uUGFpZCA+IDAgJiYgPHNwYW4gY2xhc3NOYW1lPSJ0ZXh0LXNreS00MDAiPit7Y3VycmVuY3koci5wcm9kdWN0aW9uUGFpZCl9IHtyLnByb2R1Y3Rpb25SZXNvdXJjZX0gKHByb2QuKTwvc3Bhbj59CiAgICAgICAgICAgICAgICAgICAge3IuZ29hbHNDaGVja2VkICYmIHIuZ29hbHND",
"aGVja2VkLmxlbmd0aCA+IDAgJiYgKAogICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtyLmdvYWxzQ2hlY2tlZC5ldmVyeSgoZykgPT4gZy5oaXQpID8gInRleHQtZW1lcmFsZC00MDAiIDogInRleHQtcm9zZS00MDAifT4KICAgICAgICAgICAgICAgICAgICAgICAgbWV0YXMge3IuZ29hbHNDaGVja2VkLmZpbHRlcigoZykgPT4gZy5oaXQpLmxlbmd0aH0ve3IuZ29hbHNDaGVja2VkLmxlbmd0aH0KICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4KICAgICAgICAgICAgICAgICAgICApfQogICAgICAgICAg",
"ICAgICAgICAgIHtyLmRlZmljaXQgJiYgPHNwYW4gY2xhc3NOYW1lPSJ0ZXh0LXJvc2UtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0wLjUiPjxJY29uIG5hbWU9ImFsZXJ0dHJpYW5nbGUiIHNpemU9ezEyfSAvPiBkw6lmaWNpdDwvc3Bhbj59CiAgICAgICAgICAgICAgICAgIDwvc3Bhbj4KICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICkpfQoKICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICApKX0KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICApOwp9CgpmdW5jdGlvbiBBcHAo",
"KSB7CiAgY29uc3QgeyBzdGF0ZSwgc2V0U3RhdGUsIGxvYWRlZCB9ID0gdXNlQXBwU3RhdGUoKTsKICBjb25zdCBbaXNHTSwgc2V0SXNHTV0gPSB1c2VTdGF0ZShmYWxzZSk7CiAgY29uc3QgW3RhYiwgc2V0VGFiXSA9IHVzZVN0YXRlKCJlbXByZXNhcyIpOwogIGNvbnN0IFtlZGl0aW5nQ29tcGFueSwgc2V0RWRpdGluZ0NvbXBhbnldID0gdXNlU3RhdGUobnVsbCk7CiAgY29uc3QgW3Nob3dOZXcsIHNldFNob3dOZXddID0gdXNlU3RhdGUoZmFsc2UpOwogIGNvbnN0IFtzaG93Q29uZmlnLCBzZXRTaG93Q29uZmlnXSA9IHVzZVN0",
"YXRlKGZhbHNlKTsKICBjb25zdCBbc2hvd0ZhY3Rpb25zLCBzZXRTaG93RmFjdGlvbnNdID0gdXNlU3RhdGUoZmFsc2UpOwogIGNvbnN0IFtzaG93U2F2ZXMsIHNldFNob3dTYXZlc10gPSB1c2VTdGF0ZShmYWxzZSk7CiAgY29uc3QgW2FjdGl2ZVNhdmVJZCwgc2V0QWN0aXZlU2F2ZUlkXSA9IHVzZVN0YXRlKG51bGwpOwogIGNvbnN0IGZpbGVJbnB1dFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTsKCiAgaWYgKCFsb2FkZWQgfHwgIXN0YXRlKSB7CiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9Im1pbi1oLXNjcmVlbiBob2xvLXJv",
"b3QgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1ob2xvLW11dGVkIj5DYXJyZWdhbmRvIHJlZ2lzdHJvcyBkYSBCb2xzYSBkZSBDb23DqXJjaW8uLi48L2Rpdj47CiAgfQoKICBjb25zdCBuZXdDb21wYW55VGVtcGxhdGUgPSAoKSA9PiAoewogICAgaWQ6IG51bGwsCiAgICBuYW1lOiAiTm92YSBFbXByZXNhIiwKICAgIG93bmVyOiAiIiwKICAgIHR5cGU6ICIiLAogICAgcHJlc2V0S2V5OiAicGVyc29uYWxpemFkbyIsCiAgICBzaXplS2V5OiAiIiwKICAgIHBsYW5ldExldmVsOiAiY29tdW0iLAogICAgZW1w",
"bG95ZWVzOiAwLAogICAgc2FsYXJ5UGVyRW1wbG95ZWU6IDAsCiAgICBiYXNlQ29zdFRhYmVsYTogMCwKICAgIGRlc2NyaXB0aW9uOiAiIiwKICAgIHJlc291cmNlczogT2JqZWN0LmZyb21FbnRyaWVzKHN0YXRlLmNvbmZpZy5yZXNvdXJjZVR5cGVzLm1hcCgocikgPT4gW3IsIDBdKSksCiAgICBiYXNlTWFpbnRlbmFuY2U6IDAsCiAgICBwcm9kdWN0aW9uOiB7IHJlc291cmNlOiBzdGF0ZS5jb25maWcucmVzb3VyY2VUeXBlc1swXSwgYW1vdW50OiAwIH0sCiAgICBnb2FsczogW10sCiAgICBzdWJzaWRpZXM6IFtdLAogICAgYXNz",
"ZXRzOiBbXSwKICAgIGhpc3Rvcnk6IFtdLAogICAgbGFzdFJ1bjogbnVsbCwKICB9KTsKCiAgY29uc3Qgc2F2ZUNvbXBhbnkgPSAoYykgPT4gewogICAgY29uc3QgbmV4dCA9IHsgLi4uc3RhdGUgfTsKICAgIG5leHQuY29tcGFuaWVzID0gYy5pZCA/IG5leHQuY29tcGFuaWVzLm1hcCgoeCkgPT4gKHguaWQgPT09IGMuaWQgPyBjIDogeCkpIDogWy4uLm5leHQuY29tcGFuaWVzLCB7IC4uLmMsIGlkOiB1aWQoKSB9XTsKICAgIHNldFN0YXRlKG5leHQpOwogICAgc2V0RWRpdGluZ0NvbXBhbnkobnVsbCk7CiAgICBzZXRTaG93TmV3",
"KGZhbHNlKTsKICB9OwoKICBjb25zdCBkZWxldGVDb21wYW55ID0gKGlkKSA9PiB7CiAgICBpZiAoIWNvbmZpcm0oIlJlbW92ZXIgZXN0YSBlbXByZXNhIHBlcm1hbmVudGVtZW50ZT8iKSkgcmV0dXJuOwogICAgc2V0U3RhdGUoeyAuLi5zdGF0ZSwgY29tcGFuaWVzOiBzdGF0ZS5jb21wYW5pZXMuZmlsdGVyKChjKSA9PiBjLmlkICE9PSBpZCkgfSk7CiAgfTsKCiAgY29uc3QgaGFuZGxlUnVuID0gKHR5cGUpID0+IHsKICAgIGNvbnN0IHsgY29tcGFuaWVzLCBmYWN0aW9ucywgdHVybiwgbG9nRW50cnkgfSA9IHJ1blJvdGF0aW9u",
"KHsgY29tcGFuaWVzOiBzdGF0ZS5jb21wYW5pZXMsIGZhY3Rpb25zOiBzdGF0ZS5mYWN0aW9ucywgY29uZmlnOiBzdGF0ZS5jb25maWcsIHR1cm46IHN0YXRlLnR1cm4sIHR5cGUgfSk7CiAgICBzZXRTdGF0ZSh7IC4uLnN0YXRlLCBjb21wYW5pZXMsIGZhY3Rpb25zLCB0dXJuLCBsb2c6IFtsb2dFbnRyeSwgLi4uKHN0YXRlLmxvZyB8fCBbXSldLnNsaWNlKDAsIDMwKSB9KTsKICAgIC8vID09PT09PSBJTlRFR1JBw4fDg08g4oCUIEN1cnRhIGUgTG9uZ2EgcHV4YW0gbyBHYWxhY3RpYyBMZWRnZXIgaW50ZWlybyBqdW50byA9PT09",
"PT0KICAgIC8vIERpw6FyaWEgZmljYSBzw7MgbG9jYWwgYXF1aSAow6kgZ3JhbnVsYXIgZGVtYWlzIHByYSBqdXN0aWZpY2FyIGdpcmFyIGEKICAgIC8vIGdhbMOheGlhIHRvZGEpLiBDdXJ0YSBlIExvbmdhIGF2aXNhbSBvIExlZGdlciwgcXVlIGdpcmEgbWVyY2FkbywKICAgIC8vIGbDoWJyaWNhcywgcHJvamV0b3MsIGNvbnRyYXRvcywgcmVuZGEgZGUgZmFjw6fDtWVzIGUgbyBjYWxlbmTDoXJpby4KICAgIGlmICgodHlwZSA9PT0gImN1cnRhIiB8fCB0eXBlID09PSAibG9uZ2EiKSAmJiB3aW5kb3cucGFyZW50ICE9PSB3aW5k",
"b3cpIHsKICAgICAgdHJ5IHsKICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHsgdHlwZTogInJwZy1ydW4tcm90YXRpb24iLCBzb3VyY2U6ICJjb21lcmNpbyIsIHBheWxvYWQ6IHsgcm90YXRpb25UeXBlOiB0eXBlIH0gfSwgIioiKTsKICAgICAgfSBjYXRjaCAoZSkge30KICAgIH0KICB9OwoKICBjb25zdCBleHBvcnREYXRhID0gKCkgPT4gewogICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShzdGF0ZSwgbnVsbCwgMildLCB7IHR5cGU6ICJhcHBsaWNhdGlvbi9qc29uIiB9KTsKICAgIGNv",
"bnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7CiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiYSIpOwogICAgYS5ocmVmID0gdXJsOwogICAgYS5kb3dubG9hZCA9IGByZWdpc3Ryby1jb21lcmNpby0ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCl9Lmpzb25gOwogICAgYS5jbGljaygpOwogICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpOwogIH07CgogIGNvbnN0IGltcG9ydERhdGEgPSAoZSkgPT4gewogICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07",
"CiAgICBpZiAoIWZpbGUpIHJldHVybjsKICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7CiAgICByZWFkZXIub25sb2FkID0gKCkgPT4gewogICAgICB0cnkgewogICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UocmVhZGVyLnJlc3VsdCk7CiAgICAgICAgY29uc3QgY29uZmlnID0geyAuLi5ERUZBVUxUX1NUQVRFLmNvbmZpZywgLi4ucGFyc2VkLmNvbmZpZyB9OwogICAgICAgIHNldFN0YXRlKHsKICAgICAgICAgIC4uLkRFRkFVTFRfU1RBVEUsCiAgICAgICAgICAuLi5wYXJzZWQsCiAgICAgICAgICBj",
"b25maWcsCiAgICAgICAgICB0dXJuOiBwYXJzZWQudHVybiB8fCB7IG1vbnRoOiAxLCBkYXk6IDAsIHdlZWs6IDAgfSwKICAgICAgICAgIGxvZzogcGFyc2VkLmxvZyB8fCBbXSwKICAgICAgICAgIGNvbXBhbmllczogKHBhcnNlZC5jb21wYW5pZXMgfHwgW10pLm1hcCgoYykgPT4gbm9ybWFsaXplQ29tcGFueShjLCBjb25maWcucmVzb3VyY2VUeXBlcykpLAogICAgICAgIH0pOwogICAgICB9IGNhdGNoIChlcnIpIHsKICAgICAgICBhbGVydCgiQXJxdWl2byBpbnbDoWxpZG8uIik7CiAgICAgIH0KICAgIH07CiAgICByZWFkZXIu",
"cmVhZEFzVGV4dChmaWxlKTsKICAgIGUudGFyZ2V0LnZhbHVlID0gIiI7CiAgfTsKCiAgcmV0dXJuICgKICAgIDxkaXYgY2xhc3NOYW1lPSJtaW4taC1zY3JlZW4gaG9sby1yb290IHRleHQtaG9sby1wcmltYXJ5Ij4KICAgICAgPGRpdiBjbGFzc05hbWU9ImhvbG8tZ3JpZC1vdmVybGF5IiAvPgogICAgICA8ZGl2IGNsYXNzTmFtZT0iaG9sby1zY2FubGluZXMiIC8+CgogICAgICA8aGVhZGVyIGNsYXNzTmFtZT0iaG9sby1oZWFkZXIgc3RpY2t5IHRvcC0wIHotMzAiPgogICAgICAgIDxkaXYgY2xhc3NOYW1lPSJtYXgtdy02eGwg",
"bXgtYXV0byBweC00IHB5LTMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZsZXgtd3JhcCBnYXAtMyI+CiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0iZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIiPgogICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0iaG9sby1icmFuZCB3LTkgaC05IHJvdW5kZWQtbGcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1bIzA0MTAxOF0iPgogICAgICAgICAgICAgIDxJY29uIG5hbWU9ImxhbmRtYXJrIiBzaXplPXsyMH0gLz4KICAgICAgICAgICAgPC9kaXY+CiAg",
"ICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT0iaG9sby10aXRsZSBmb250LWJvbGQgdGV4dC1sZyBsZWFkaW5nLXRpZ2h0Ij5SZWdpc3RybyBkZSBDb23DqXJjaW88L2gxPgogICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0idGV4dC1bMTFweF0gdGV4dC1ob2xvLWZhaW50IC1tdC0wLjUgdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZSI+R2VzdMOjbyBkZSBFbXByZXNhcyAmYW1wOyBGcm90YXM8L3A+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPC9kaXY+CgogICAgICAgICAgPG5hdiBjbGFz",
"c05hbWU9ImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGJnLWJsYWNrLzMwIGJvcmRlciBib3JkZXItc2t5LTUwMC8xNSByb3VuZGVkLWxnIHAtMSI+CiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0VGFiKCJlbXByZXNhcyIpfSBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSByb3VuZGVkLW1kIHRleHQtc20gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uICR7dGFiID09PSAiZW1wcmVzYXMiID8gImhvbG8tdGFiLWFjdGl2ZSIgOiAidGV4dC1ob2xvLXNlY29uZGFyeSBob3ZlcjpiZy1za3ktNTAw",
"LzEwIn1gfT4KICAgICAgICAgICAgICA8SWNvbiBuYW1lPSJidWlsZGluZyIgc2l6ZT17MTV9IC8+IEVtcHJlc2FzCiAgICAgICAgICAgIDwvYnV0dG9uPgogICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFRhYigicm9kYXIiKX0gY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC1tZCB0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbiAke3RhYiA9PT0gInJvZGFyIiA/ICJob2xvLXRhYi1hY3RpdmUiIDogInRleHQtaG9sby1zZWNvbmRhcnkgaG92ZXI6Ymctc2t5LTUwMC8x",
"MCJ9YH0+CiAgICAgICAgICAgICAgPEljb24gbmFtZT0icm90YXRlY3ciIHNpemU9ezE1fSAvPiBSb2RhcgogICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoImZhY2NvZXMiKX0gY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC1tZCB0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbiAke3RhYiA9PT0gImZhY2NvZXMiID8gImhvbG8tdGFiLWFjdGl2ZSIgOiAidGV4dC1ob2xvLXNlY29uZGFyeSBob3ZlcjpiZy1za3ktNTAwLzEw",
"In1gfT4KICAgICAgICAgICAgICA8SWNvbiBuYW1lPSJ1c2VycyIgc2l6ZT17MTV9IC8+IEZhY8Onw7VlcwogICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoImFqdWRhIil9IGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQtbWQgdGV4dC1zbSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24gJHt0YWIgPT09ICJhanVkYSIgPyAiaG9sby10YWItYWN0aXZlIiA6ICJ0ZXh0LWhvbG8tc2Vjb25kYXJ5IGhvdmVyOmJnLXNreS01MDAvMTAifWB9",
"PgogICAgICAgICAgICAgIDxJY29uIG5hbWU9ImhlbHAiIHNpemU9ezE1fSAvPiBBanVkYQogICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgIDwvbmF2PgoKICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiI+CiAgICAgICAgICAgIHtpc0dNICYmICgKICAgICAgICAgICAgICA8PgogICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93U2F2ZXModHJ1ZSl9IHRpdGxlPSJTYWx2YXIgLyBjYXJyZWdhciBzYXZlcyBsb2NhaXMiIGNsYXNzTmFtZT0iaG9sby1i",
"dG4tcHJpbWFyeSBweC0yLjUgcHktMS41IHJvdW5kZWQtbWQgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41Ij4KICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT0ic2F2ZSIgc2l6ZT17MTR9IC8+IFNhbHZhcgogICAgICAgICAgICAgICAgPC9idXR0b24+CiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2V4cG9ydERhdGF9IHRpdGxlPSJFeHBvcnRhciBkYWRvcyAoLmpzb24pIiBjbGFzc05hbWU9InB4LTIuNSBweS0xLjUgcm91bmRlZC1tZCB0ZXh0LXhzIGJvcmRlciBib3JkZXItc2t5LTUwMC8zMCB0",
"ZXh0LWhvbG8tc2Vjb25kYXJ5IGhvdmVyOmJnLXNreS01MDAvMTAgdHJhbnNpdGlvbiI+CiAgICAgICAgICAgICAgICAgIEV4cG9ydGFyCiAgICAgICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gZmlsZUlucHV0UmVmLmN1cnJlbnQ/LmNsaWNrKCl9IHRpdGxlPSJJbXBvcnRhciBkYWRvcyAoLmpzb24pIiBjbGFzc05hbWU9InB4LTIuNSBweS0xLjUgcm91bmRlZC1tZCB0ZXh0LXhzIGJvcmRlciBib3JkZXItc2t5LTUwMC8zMCB0ZXh0LWhvbG8tc2Vjb25kYXJ5IGhvdmVy",
"OmJnLXNreS01MDAvMTAgdHJhbnNpdGlvbiI+CiAgICAgICAgICAgICAgICAgIEltcG9ydGFyCiAgICAgICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJmaWxlIiBhY2NlcHQ9ImFwcGxpY2F0aW9uL2pzb24iIHJlZj17ZmlsZUlucHV0UmVmfSBvbkNoYW5nZT17aW1wb3J0RGF0YX0gY2xhc3NOYW1lPSJoaWRkZW4iIC8+CiAgICAgICAgICAgICAgPC8+CiAgICAgICAgICAgICl9CiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0SXNHTSgodikgPT4gIXYpfSBjbGFzc05h",
"bWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0zIHB5LTEuNSByb3VuZGVkLW1kIHRleHQtc20gZm9udC1tZWRpdW0gdHJhbnNpdGlvbiAke2lzR00gPyAiaG9sby10b2dnbGUtZ20iIDogImhvbG8tdG9nZ2xlLXBsYXllciJ9YH0+CiAgICAgICAgICAgICAge2lzR00gPyA8SWNvbiBuYW1lPSJ1bmxvY2siIHNpemU9ezE1fSAvPiA6IDxJY29uIG5hbWU9ImxvY2siIHNpemU9ezE1fSAvPn0KICAgICAgICAgICAgICB7aXNHTSA/ICJNb2RvIE1lc3RyZSIgOiAiTW9kbyBKb2dhZG9yIn0KICAgICAgICAgICAgPC9idXR0b24+",
"CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgPC9oZWFkZXI+CgogICAgICA8bWFpbiBjbGFzc05hbWU9Im1heC13LTZ4bCBteC1hdXRvIHB4LTQgcHktNiByZWxhdGl2ZSB6LTEwIj4KICAgICAgICB7dGFiID09PSAiYWp1ZGEiICYmICgKICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJtYXgtdy0zeGwiPgogICAgICAgICAgICA8aDIgY2xhc3NOYW1lPSJob2xvLXRpdGxlIHRleHQtMnhsIGZvbnQtYm9sZCBtYi0xIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIj48SWNvbiBuYW1lPSJoZWxwIiBzaXplPXsyMn0g",
"Y2xhc3NOYW1lPSJ0ZXh0LXNreS00MDAiIC8+IEFqdWRhPC9oMj4KICAgICAgICAgICAgPEhlbHBQYW5lbCAvPgogICAgICAgICAgPC9kaXY+CiAgICAgICAgKX0KCiAgICAgICAge3RhYiA9PT0gInJvZGFyIiAmJiA8UnVuUGFuZWwgc3RhdGU9e3N0YXRlfSBpc0dNPXtpc0dNfSBvblJ1bj17aGFuZGxlUnVufSAvPn0KCiAgICAgICAge3RhYiA9PT0gImZhY2NvZXMiICYmICgKICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItNCI+CiAg",
"ICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT0iaG9sby10aXRsZSB0ZXh0LTJ4bCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIiPjxJY29uIG5hbWU9InVzZXJzIiBzaXplPXsyMn0gY2xhc3NOYW1lPSJ0ZXh0LXNreS00MDAiIC8+IEZhY8Onw7VlcyAmYW1wOyBQYXRyb2NpbmFkb3JlczwvaDI+CiAgICAgICAgICAgICAge2lzR00gJiYgKAogICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93RmFjdGlvbnModHJ1ZSl9IGNsYXNzTmFtZT0iaG9sby1idG4tcHJpbWFyeSB0ZXh0LXNtIGZs",
"ZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTMgcHktMS41IHJvdW5kZWQtbWQiPgogICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPSJwZW5jaWwiIHNpemU9ezE0fSAvPiBFZGl0YXIgZmFjw6fDtWVzCiAgICAgICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgICApfQogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9ImdyaWQgc206Z3JpZC1jb2xzLTIgZ2FwLTMiPgogICAgICAgICAgICAgIHtzdGF0ZS5mYWN0aW9ucy5tYXAoKGYpID0+IHsKICAgICAgICAgICAgICAgIGNvbnN0IHNw",
"b25zb3JlZFN1YnMgPSBbXTsKICAgICAgICAgICAgICAgIHN0YXRlLmNvbXBhbmllcy5mb3JFYWNoKChjKSA9PiBjLnN1YnNpZGllcy5mb3JFYWNoKChzKSA9PiB7IGlmIChzLmZhY3Rpb25JZCA9PT0gZi5pZCkgc3BvbnNvcmVkU3Vicy5wdXNoKHsgY29tcGFueTogYywgc3ViOiBzIH0pOyB9KSk7CiAgICAgICAgICAgICAgICBjb25zdCBtb250aGx5T3V0ZmxvdyA9IHNwb25zb3JlZFN1YnMuZmlsdGVyKCh4KSA9PiB4LnN1Yi5hY3RpdmUgJiYgeC5zdWIucmVzb3VyY2UgPT09ICJDcsOpZGl0b3MiKS5yZWR1Y2UoKHN1bSwgeCkg",
"PT4gc3VtICsgKE51bWJlcih4LnN1Yi5hbW91bnQpIHx8IDApLCAwKTsKICAgICAgICAgICAgICAgIGNvbnN0IGJhbmtOZWcgPSAoTnVtYmVyKGYuYmFuaykgfHwgMCkgPCAwOwogICAgICAgICAgICAgICAgcmV0dXJuICgKICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2YuaWR9IGNsYXNzTmFtZT17YGhvbG8tcGFuZWwgcm91bmRlZC14bCBwLTQgJHtmLmRvbWluYW50ID8gImhvbG8tcGFuZWwtcmVkIiA6ICIifWB9PgogICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5",
"LWJldHdlZW4iPgogICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9ImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSJ3LTMgaC0zIHJvdW5kZWQtZnVsbCIgc3R5bGU9e3sgYmFja2dyb3VuZDogZi5jb2xvciB9fSAvPgogICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSJmb250LXNlbWlib2xkIHRleHQtaG9sby1wcmltYXJ5Ij57Zi5uYW1lfTwvaDM+CiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAg",
"ICAgICAgICAgIHtmLmRvbWluYW50ICYmICgKICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LVsxMXB4XSB0ZXh0LXJvc2UtMzAwIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGUiPgogICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9InN0YXIiIHNpemU9ezEyfSAvPiBEb21pbmFudGUKICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPgogICAgICAgICAgICAgICAgICAgICAgKX0KICAgICAgICAgICAgICAgICAg",
"ICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9InRleHQtc20gdGV4dC1ob2xvLW11dGVkIG10LTEiPntmLmRlc2NyaXB0aW9ufTwvcD4KCiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9Im10LTMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJnLWJsYWNrLzMwIHJvdW5kZWQtbWQgcHgtMyBweS0yIGJvcmRlciBib3JkZXItc2t5LTUwMC8xNSI+CiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9ImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC14",
"cyB0ZXh0LWhvbG8tbXV0ZWQiPjxJY29uIG5hbWU9InNjYWxlIiBzaXplPXsxM30gLz4gQmFuY288L3NwYW4+CiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Bmb250LXNlbWlib2xkICR7YmFua05lZyA/ICJ0ZXh0LXJvc2UtMzAwIiA6ICJ0ZXh0LWhvbG8tcHJpbWFyeSJ9YH0+e2N1cnJlbmN5KGYuYmFuayl9IENyw6lkaXRvczwvc3Bhbj4KICAgICAgICAgICAgICAgICAgICA8L2Rpdj4KCiAgICAgICAgICAgICAgICAgICAge21vbnRobHlPdXRmbG93ID4gMCAmJiAoCiAgICAgICAgICAgICAgICAgICAg",
"ICA8cCBjbGFzc05hbWU9InRleHQteHMgdGV4dC1ob2xvLWZhaW50IG10LTIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEiPgogICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPSJhcnJvd2Rvd24iIHNpemU9ezEyfSBjbGFzc05hbWU9InRleHQtcm9zZS00MDAiIC8+IFBhZ2EgfntjdXJyZW5jeShtb250aGx5T3V0Zmxvdyl9IENyw6lkaXRvcy9tw6pzIGVtIHN1YnPDrWRpb3MKICAgICAgICAgICAgICAgICAgICAgIDwvcD4KICAgICAgICAgICAgICAgICAgICApfQoKICAgICAgICAgICAgICAgICAgICB7Zi5kZW1hbmQg",
"JiYgKAogICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSJ0ZXh0LXhzIHRleHQtaG9sby1zZWNvbmRhcnkgbXQtMiBmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0xLjUiPgogICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPSJ0YXJnZXQiIHNpemU9ezEzfSBjbGFzc05hbWU9InRleHQtc2t5LTQwMCBzaHJpbmstMCBtdC0wLjUiIC8+IHtmLmRlbWFuZH0KICAgICAgICAgICAgICAgICAgICAgIDwvcD4KICAgICAgICAgICAgICAgICAgICApfQoKICAgICAgICAgICAgICAgICAgICB7c3BvbnNvcmVkU3Vicy5sZW5n",
"dGggPiAwICYmICgKICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSJtdC0zIGZsZXggZmxleC13cmFwIGdhcC0xIj4KICAgICAgICAgICAgICAgICAgICAgICAge1suLi5uZXcgTWFwKHNwb25zb3JlZFN1YnMubWFwKCh4KSA9PiBbeC5jb21wYW55LmlkLCB4LmNvbXBhbnldKSkudmFsdWVzKCldLm1hcCgoYykgPT4gPEJhZGdlIGtleT17Yy5pZH0+e2MubmFtZX08L0JhZGdlPil9CiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgICApfQogICAgICAgICAgICAgICAgICA8L2Rp",
"dj4KICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgfSl9CiAgICAgICAgICAgICAge3N0YXRlLmZhY3Rpb25zLmxlbmd0aCA9PT0gMCAmJiA8cCBjbGFzc05hbWU9InRleHQtaG9sby1mYWludCBpdGFsaWMiPk5lbmh1bWEgZmFjw6fDo28gY2FkYXN0cmFkYS48L3A+fQogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgICl9CgogICAgICAgIHt0YWIgPT09ICJlbXByZXNhcyIgJiYgKAogICAgICAgICAgPGRpdj4KICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9ImZsZXggaXRlbXMtY2VudGVy",
"IGp1c3RpZnktYmV0d2VlbiBtYi00IGZsZXgtd3JhcCBnYXAtMiI+CiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT0iaG9sby10aXRsZSB0ZXh0LTJ4bCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIiPjxJY29uIG5hbWU9ImJ1aWxkaW5nIiBzaXplPXsyMn0gY2xhc3NOYW1lPSJ0ZXh0LXNreS00MDAiIC8+IEVtcHJlc2FzPC9oMj4KICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0iZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIiPgogICAgICAgICAgICAgICAge2lzR00gJiYgKAogICAgICAgICAgICAgICAgICA8",
"PgogICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0U2hvd0NvbmZpZyh0cnVlKX0gY2xhc3NOYW1lPSJ0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGJvcmRlciBib3JkZXItc2t5LTUwMC8zMCBob3ZlcjpiZy1za3ktNTAwLzEwIHB4LTMgcHktMS41IHJvdW5kZWQtbWQgdHJhbnNpdGlvbiB0ZXh0LWhvbG8tc2Vjb25kYXJ5Ij4KICAgICAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9InNldHRpbmdzIiBzaXplPXsxNH0gLz4gQ29uZmlndXJhw6fDtWVzCiAgICAgICAgICAgICAgICAg",
"ICAgPC9idXR0b24+CiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93TmV3KHRydWUpfSBjbGFzc05hbWU9ImhvbG8tYnRuLXByaW1hcnkgdGV4dC1zbSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0zIHB5LTEuNSByb3VuZGVkLW1kIj4KICAgICAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9InBsdXMiIHNpemU9ezE0fSAvPiBOb3ZhIGVtcHJlc2EKICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj4KICAgICAgICAgICAgICAgICAgPC8+CiAgICAgICAgICAgICAgICApfQogICAg",
"ICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8L2Rpdj4KCiAgICAgICAgICAgIHshaXNHTSAmJiAoCiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9Im1iLTQgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LWhvbG8tZmFpbnQgaG9sby1wYW5lbCByb3VuZGVkLW1kIHB4LTMgcHktMiI+CiAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPSJleWUiIHNpemU9ezE0fSAvPiBNb2RvIGRlIHZpc3VhbGl6YcOnw6NvIOKAlCBhcGVuYXMgbyBNZXN0cmUgcG9kZSBlZGl0YXIgZGFkb3MuCiAgICAgICAgICAgICAg",
"PC9kaXY+CiAgICAgICAgICAgICl9CgogICAgICAgICAgICB7c3RhdGUuY29tcGFuaWVzLmxlbmd0aCA9PT0gMCA/ICgKICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0idGV4dC1jZW50ZXIgcHktMTYgYm9yZGVyIGJvcmRlci1kYXNoZWQgYm9yZGVyLXNreS01MDAvMjUgcm91bmRlZC14bCB0ZXh0LWhvbG8tZmFpbnQiPgogICAgICAgICAgICAgICAgPEljb24gbmFtZT0iYnVpbGRpbmciIHNpemU9ezMyfSBjbGFzc05hbWU9Im14LWF1dG8gbWItMiBvcGFjaXR5LTQwIiAvPgogICAgICAgICAgICAgICAgTmVuaHVtYSBlbXBy",
"ZXNhIHJlZ2lzdHJhZGEgYWluZGEuCiAgICAgICAgICAgICAgICB7aXNHTSAmJiA8cCBjbGFzc05hbWU9InRleHQtc20gbXQtMSI+Q2xpcXVlIGVtICJOb3ZhIGVtcHJlc2EiIHBhcmEgY29tZcOnYXIuPC9wPn0KICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgKSA6ICgKICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0iZ3JpZCBtZDpncmlkLWNvbHMtMiB4bDpncmlkLWNvbHMtMyBnYXAtNCI+CiAgICAgICAgICAgICAgICB7c3RhdGUuY29tcGFuaWVzLm1hcCgoYykgPT4gKAogICAgICAgICAgICAgICAgICA8Q29t",
"cGFueUNhcmQga2V5PXtjLmlkfSBjb21wYW55PXtjfSBmYWN0aW9ucz17c3RhdGUuZmFjdGlvbnN9IGlzR009e2lzR019IG9uRWRpdD17KCkgPT4gc2V0RWRpdGluZ0NvbXBhbnkoYyl9IG9uRGVsZXRlPXsoKSA9PiBkZWxldGVDb21wYW55KGMuaWQpfSAvPgogICAgICAgICAgICAgICAgKSl9CiAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICl9CiAgICAgICAgICA8L2Rpdj4KICAgICAgICApfQogICAgICA8L21haW4+CgogICAgICB7c2hvd05ldyAmJiA8Q29tcGFueUVkaXRvciBjb21wYW55PXtuZXdDb21wYW55VGVt",
"cGxhdGUoKX0gZmFjdGlvbnM9e3N0YXRlLmZhY3Rpb25zfSByZXNvdXJjZVR5cGVzPXtzdGF0ZS5jb25maWcucmVzb3VyY2VUeXBlc30gY29uZmlnPXtzdGF0ZS5jb25maWd9IG9uU2F2ZT17c2F2ZUNvbXBhbnl9IG9uQ2xvc2U9eygpID0+IHNldFNob3dOZXcoZmFsc2UpfSAvPn0KICAgICAge2VkaXRpbmdDb21wYW55ICYmIDxDb21wYW55RWRpdG9yIGNvbXBhbnk9e2VkaXRpbmdDb21wYW55fSBmYWN0aW9ucz17c3RhdGUuZmFjdGlvbnN9IHJlc291cmNlVHlwZXM9e3N0YXRlLmNvbmZpZy5yZXNvdXJjZVR5cGVzfSBjb25maWc9",
"e3N0YXRlLmNvbmZpZ30gb25TYXZlPXtzYXZlQ29tcGFueX0gb25DbG9zZT17KCkgPT4gc2V0RWRpdGluZ0NvbXBhbnkobnVsbCl9IC8+fQogICAgICB7c2hvd0NvbmZpZyAmJiA8Q29uZmlnTW9kYWwgY29uZmlnPXtzdGF0ZS5jb25maWd9IG9uU2F2ZT17KGNmZykgPT4gc2V0U3RhdGUoeyAuLi5zdGF0ZSwgY29uZmlnOiBjZmcgfSl9IG9uQ2xvc2U9eygpID0+IHNldFNob3dDb25maWcoZmFsc2UpfSAvPn0KICAgICAge3Nob3dGYWN0aW9ucyAmJiA8RmFjdGlvbnNNb2RhbCBmYWN0aW9ucz17c3RhdGUuZmFjdGlvbnN9IG9uU2F2",
"ZT17KGxpc3QpID0+IHNldFN0YXRlKHsgLi4uc3RhdGUsIGZhY3Rpb25zOiBsaXN0IH0pfSBvbkNsb3NlPXsoKSA9PiBzZXRTaG93RmFjdGlvbnMoZmFsc2UpfSAvPn0KICAgICAge3Nob3dTYXZlcyAmJiAoCiAgICAgICAgPFNhdmVzTW9kYWwKICAgICAgICAgIHN0YXRlPXtzdGF0ZX0KICAgICAgICAgIGFjdGl2ZVNhdmVJZD17YWN0aXZlU2F2ZUlkfQogICAgICAgICAgb25NYXJrQWN0aXZlPXsoaWQpID0+IHNldEFjdGl2ZVNhdmVJZChpZCl9CiAgICAgICAgICBvbkxvYWRTdGF0ZT17KGlkLCBuZXdTdGF0ZSkgPT4gewogICAg",
"ICAgICAgICBzZXRTdGF0ZShuZXdTdGF0ZSk7CiAgICAgICAgICAgIHNldEFjdGl2ZVNhdmVJZChpZCk7CiAgICAgICAgICB9fQogICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0U2hvd1NhdmVzKGZhbHNlKX0KICAgICAgICAvPgogICAgICApfQogICAgPC9kaXY+CiAgKTsKfQoKY29uc3Qgcm9vdCA9IFJlYWN0RE9NLmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInJvb3QiKSk7CnJvb3QucmVuZGVyKDxBcHAgLz4pOwo8L3NjcmlwdD4KPC9ib2R5Pgo8L2h0bWw+Cg=="
];

// ══════════ CONTEÚDO EMBUTIDO — Legislação e Empresas (base64, um HTML só) ══════════
// Os dois apps ficam guardados aqui dentro, codificados em base64 (evita
// qualquer conflito de fechamento de tag dentro do texto). São decodificados só
// na primeira vez que a aba é aberta, e jogados dentro de um iframe via
// `.srcdoc` — assim cada app roda isolado (sem misturar nomes de função/CSS
// com o Ledger), mas tudo dentro de UM único arquivo .html.
function _b64ToUtf8(b64){
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder("utf-8").decode(bytes);
}
function getEmbeddedHtml(which){
  if(which==="legislacao") return _b64ToUtf8(EMBED_LEGISLACAO_B64.join(""));
  if(which==="empresas")   return _b64ToUtf8(EMBED_EMPRESAS_B64.join(""));
  return "";
}
const _childLoaded = {};
function ensureChildLoaded(frameId, getHtmlFn){
  if(_childLoaded[frameId]) return;
  const el = document.getElementById(frameId);
  if(!el) return;
  _childLoaded[frameId] = true;
  // O listener de "load" é anexado via JS (não como atributo onload="" no HTML)
  // de propósito: um <iframe> vazio já dispara sozinho um "load" do about:blank
  // quase imediatamente ao ser inserido na página — bem antes do script deste
  // arquivo terminar de carregar. Se isso chamasse broadcastToChildren() direto
  // via atributo inline, dava ReferenceError porque a função ainda não existia
  // naquele momento. Anexando aqui, o listener só é criado quando o usuário
  // realmente abre a aba (depois que tudo já carregou), e só dispara de verdade
  // quando o conteúdo real (srcdoc) termina de carregar — nunca antes.
  el.addEventListener("load", ()=>{ if(typeof broadcastToChildren==="function") broadcastToChildren(); });
  el.srcdoc = getHtmlFn();
}

// ══════════ INTEGRAÇÃO — Legislação (Holonet) e Empresas, via postMessage ══════════
// O Ledger é o "dono" do estado principal (E.faccoes / E.planetas). As abas
// Legislação e Empresas rodam em iframes; sempre que criam/editam uma
// facção ou planeta, mandam uma mensagem pra cá; o Ledger funde no seu
// próprio E e reenvia a visão atualizada pra ambos os iframes.
E._empresas = E._empresas || [];   // cache das empresas vindas da aba Empresas (Ledger não tem esse conceito nativo)
E._leis = E._leis || [];           // cache das leis vindas da aba Legislação (idem)

function bridgeState(){
  return {
    factions: E.faccoes.map(f=>({id:f.id, name:f.n, color:f.cor, credits:0, faccreds:f.fc})),
    planets:  E.planetas.map(p=>({id:p.id, name:p.n, factionId:p.fid||"", credits:p.cr})),
    companies: E._empresas,
    laws: E._leis,
  };
}
function broadcastToChildren(){
  const payload = bridgeState();
  ["frame-legislacao","frame-empresas"].forEach(id=>{
    const f = document.getElementById(id);
    if(f && f.contentWindow){
      try{ f.contentWindow.postMessage({type:"rpg-sync-apply", payload}, "*"); }catch(e){}
    }
  });
}
window.addEventListener("message", (e)=>{
  const msg = e.data; if(!msg || msg.type!=="rpg-sync") return;
  const d = msg.payload || {};
  (d.factions||[]).forEach(bf=>{
    let f = E.faccoes.find(x=>x.id===bf.id);
    if(!f){ f={id:bf.id,n:bf.name,cor:bf.color||"#00d4ff",i:"🏴",fc:0,fo:2,as:2,ri:2,subs:[],ativos:[]}; E.faccoes.push(f); }
    f.n = bf.name || f.n;
    if(typeof bf.faccreds==="number") f.fc = bf.faccreds;
  });
  (d.planets||[]).forEach(bp=>{
    let p = E.planetas.find(x=>x.id===bp.id);
    if(!p){ p={id:bp.id,n:bp.name,tipo:"Custom",cor:"#00d4ff",d:"",fr:3,li:3,mods:{},cr:0,qg:1,hlds:[],fid:bp.factionId||"",sid:""}; E.planetas.push(p); }
    p.n = bp.name || p.n;
    p.fid = bp.factionId || p.fid;
    if(typeof bp.credits==="number") p.cr = bp.credits;
  });
  if(d.companies) E._empresas = d.companies;
  if(d.laws) E._leis = d.laws;
  if(abaAtual!=="legislacao" && abaAtual!=="empresas") renderAba(abaAtual);
  broadcastToChildren();
});
// ══════════ ROTAÇÃO PUXADA PELA ABA EMPRESAS ══════════
// A aba Empresas manda essa mensagem toda vez que roda uma rotação Curta ou
// Longa (rotação Diária fica só local nela, não mexe no Galactic). Ao
// receber, o Ledger gira o mês inteiro (mercado, fábricas, projetos,
// contratos, renda de facções, calendário) e reenvia o resultado atualizado
// pra todo mundo.
window.addEventListener("message", (e)=>{
  const msg = e.data; if(!msg || msg.type!=="rpg-run-rotation") return;
  const tipo = msg.payload?.rotationType || "?";
  rolarDadoMes();
  if(abaAtual!=="legislacao" && abaAtual!=="empresas") renderAba(abaAtual);
  toast(`🌌 Rotação "${tipo}" da aba Empresas girou o Galactic Ledger inteiro.`);
  broadcastToChildren();
});
// Sincronização periódica de segurança (cobre edições feitas em telas do
// Mestre que não passam pelo renderAba, ex: ajustar créditos/FacCreds).
setInterval(broadcastToChildren, 2500);
