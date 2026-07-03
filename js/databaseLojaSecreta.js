/* ============================================================
   databaseLojaSecreta.js
   Arquivo de Aquisições Especiais — base de dados dos lotes
   Edite este arquivo para adicionar, remover ou reprecificar itens.
   Cada item pertence a uma "classificação de risco":
     lendario     -> relíquia da Força, valiosa mas estável
     amaldicoado  -> item senciente/amaldiçoado, risco psicológico
     proibido     -> arma ou tecnologia ilegal em quase toda a galáxia
     classificado -> informação/dado, o próprio conhecimento é a arma
   ============================================================ */

const LOJA_SECRETA_DB = [

  // ---------------- RELÍQUIAS ----------------
  {
    id: "holocron-alta-republica",
    lote: "REL-01",
    categoria: "reliquias",
    classificacao: "lendario",
    nome: "Holocron Jedi da Alta República",
    precoBase: 18000000,
    incremento: 500000,
    descricao: "Dispositivo de memória Jedi contendo os ensinamentos da Ordem durante seu auge. O conhecimento dentro dele é vasto, mas protegido por enigmas da Força que apenas sensíveis conseguem resolver. Possui uma guardiã holográfica que testa o caráter de quem tenta acessá-lo."
  },
  {
    id: "sabre-thalor-enari",
    lote: "REL-02",
    categoria: "reliquias",
    classificacao: "lendario",
    nome: "Sabre de Luz de Thalor Enari",
    precoBase: 14000000,
    incremento: 400000,
    descricao: "Elegante sabre de luz, pertenceu a um cavaleiro jedi no período das Guerras Clônicas."
  },
  {
    id: "mascara-lorde-momin",
    lote: "REL-03",
    categoria: "reliquias",
    classificacao: "amaldicoado",
    nome: "Máscara de Lorde Momin",
    precoBase: 21000000,
    incremento: 600000,
    descricao: "Máscara de um Lorde Sith focado em arquitetura e arte, que aprisionou sua própria consciência dentro dela. Sussurra seus segredos de poder e arquitetura a quem a usa."
  },
  {
    id: "holocron-sith-moraband",
    lote: "REL-04",
    categoria: "reliquias",
    classificacao: "lendario",
    nome: "Holocron Sith de Moraband",
    precoBase: 18000000,
    incremento: 500000,
    descricao: "Recuperado do Vale dos Lordes Sombrios em Moraband. Contém os rituais e a história dos primeiros Sith, registrados pelo próprio Darth Bane."
  },
  {
    id: "adaga-cultista-sith",
    lote: "REL-05",
    categoria: "reliquias",
    classificacao: "lendario",
    nome: "Adaga Ritualística de um Cultista Sith",
    precoBase: 5100000,
    incremento: 150000,
    descricao: "Adaga cerimonial usada em sacrifícios pelos cultistas Sith. Suas inscrições em Sith antigo brilham em vermelho quando próximas a uma forte presença da Força."
  },
  {
    id: "livro-proibido-malachor",
    lote: "REL-06",
    categoria: "reliquias",
    classificacao: "amaldicoado",
    nome: "O Livro Proibido de Malachor",
    precoBase: 20000000,
    incremento: 600000,
    descricao: "Tomo que detalha a construção do templo Sith de Malachor e de sua superarma. Suas páginas parecem mover-se sozinhas e o texto reorganiza-se conforme o nível de compreensão do leitor. Contém conhecimento de como converter energia da Força em destruição em massa."
  },
  {
    id: "artefato-nihil",
    lote: "REL-07",
    categoria: "reliquias",
    classificacao: "proibido",
    nome: "Artefato dos Nihil",
    precoBase: 10000000,
    incremento: 300000,
    descricao: "Tecnologia secreta usada pelos Nihil para fazer micro-saltos imprevisíveis no hiperespaço sem coordenadas convencionais. Instável e perigoso para naves não preparadas, mas quem domina seu uso se torna virtualmente impossível de rastrear ou perseguir pelo hiperespaço."
  },

  // ---------------- INSTRUMENTOS DE PODER ----------------
  {
    id: "darksaber",
    lote: "INS-01",
    categoria: "instrumentos",
    classificacao: "amaldicoado",
    nome: "Darksaber",
    precoBase: null,
    consulta: true,
    incremento: 0,
    descricao: "O sabre de luz único criado por Tarre Vizsla, o primeiro Mandaloriano a entrar na Ordem Jedi. Símbolo de liderança para todos os Mandalorianos, quem o possui comanda seu povo. Nenhum preço fixado porque nenhum vendedor que o possuiu sobreviveu para definir um."
  },
  {
    id: "armadura-beskar-completa",
    lote: "INS-02",
    categoria: "instrumentos",
    classificacao: "proibido",
    nome: "Armadura de Beskar Mandaloriana Completa",
    precoBase: 27000000,
    incremento: 700000,
    descricao: "Armadura completa de puro Beskar, praticamente impenetrável e capaz de resistir a golpes diretos de sabre de luz. Forjada durante as guerras contra os Jedi. Cada conjunto é único, esta pertenceu a um Mandaloriano sem nome, cujo histórico de batalhas foi deliberadamente apagado."
  },
  {
    id: "lanca-cortosis",
    lote: "INS-03",
    categoria: "instrumentos",
    classificacao: "proibido",
    nome: "Lança de Cortosis",
    precoBase: 10000000,
    incremento: 300000,
    descricao: "Lança com ponta tecida com fibras de cortosis, capaz de desativar um sabre de luz por um breve período após o contato. Arma especialmente projetada para combate anti-Jedi. O material é ilegal em praticamente todos os sistemas."
  },
  {
    id: "rastreamento-hiperespacial",
    lote: "INS-04",
    categoria: "instrumentos",
    classificacao: "proibido",
    nome: "Dispositivo de Rastreamento Hiperespacial",
    precoBase: 75000000,
    incremento: 2000000,
    descricao: "Tecnologia experimental que permite rastrear naves através do hiperespaço em tempo real. Esta unidade foi extraída de um laboratório de pesquisa antes de sua destruição. Quem a possui pode rastrear qualquer nave para qualquer destino."
  },
  {
    id: "cloaking-avancado",
    lote: "INS-05",
    categoria: "instrumentos",
    classificacao: "proibido",
    nome: "Cloaking Device de Geração Avançada",
    precoBase: 38000000,
    incremento: 1000000,
    descricao: "Sistema de cloaking com operação contínua sem limite de tempo e sem sobreaquecer. Permite o disparo de armas sem quebrar a furtividade por até 3 rodadas consecutivas."
  },
  {
    id: "jammer-orbital",
    lote: "INS-06",
    categoria: "instrumentos",
    classificacao: "proibido",
    nome: "Jammer de Comunicações de Alcance Orbital",
    precoBase: 28000000,
    incremento: 800000,
    descricao: "Sistema capaz de isolar um planeta inteiro da rede HoloNet por até 6 horas. Esta unidade nunca deveria ter saído das instalações imperiais."
  },
  {
    id: "protese-cortosis",
    lote: "INS-07",
    categoria: "instrumentos",
    classificacao: "proibido",
    nome: "Prótese Cibernética de Cortosis",
    precoBase: 30000000,
    incremento: 800000,
    descricao: "Prótese de última geração com materiais de cortosis nas juntas e revestimento externo. Resistente a golpes diretos de sabre de luz, força aprimorada em 50% acima do biológico original e sensor de ameaças integrado capaz de detectar campos de Força ativos num raio de 5 metros."
  },
  {
    id: "kit-biometrico-nanobots",
    lote: "INS-08",
    categoria: "instrumentos",
    classificacao: "proibido",
    nome: "Kit de Alteração Biométrica com Nanobots",
    precoBase: 28000000,
    incremento: 800000,
    descricao: "Sistema com nanobots de alteração de aparência que remodela características físicas reais por até 48 horas. Impossível de detectar como disfarce sem scanner médico completo de grau hospitalar avançado. Passa em verificações biométricas imperiais de qualquer nível. O criador foi executado pelo Império após sua conclusão."
  },
  {
    id: "computadores-observatorio-jakku",
    lote: "INS-09",
    categoria: "instrumentos",
    classificacao: "classificado",
    nome: "Computadores do Observatório de Jakku",
    precoBase: 200000000,
    incremento: 5000000,
    destaque: true,
    descricao: "Módulo de memória extraído dos computadores ancestrais do Observatório Imperial de Jakku antes de sua destruição. Contém cálculos hiperespaciais das Regiões Desconhecidas, dados sobre a Contingência Imperial e registros de pesquisa que o Imperador levou décadas para compilar. O item mais perigoso deste catálogo."
  },
  {
    id: "coordenadas-ahch-to",
    lote: "INS-10",
    categoria: "instrumentos",
    classificacao: "classificado",
    nome: "Coordenadas para Ahch-To",
    precoBase: 35000000,
    incremento: 1000000,
    descricao: "Localização do planeta oceânico que abriga o Primeiro Templo Jedi, escondido nas Regiões Desconhecidas. Considerado o local mais sagrado da Ordem Jedi. O Império oferece recompensa de 60 milhões de créditos por qualquer informação que leve a este planeta."
  },
  {
    id: "coordenadas-euphoria",
    lote: "INS-11",
    categoria: "instrumentos",
    classificacao: "classificado",
    nome: "Coordenadas para Euphoria",
    precoBase: 60000000,
    incremento: 1500000,
    descricao: "Conjunto de coordenadas multi-salto para um planeta não catalogado nas profundezas das Regiões Desconhecidas, referenciado em registros fragmentados apenas como \"Euphoria\". A origem do nome é desconhecida. Os dados foram extraídos de um navicomputador recuperado de uma nave destruída sem sobreviventes. Nenhuma expedição que partiu com essas coordenadas retornou para confirmar o destino. O vendedor não sabe o que há lá. Ninguém sabe."
  },
  {
    id: "sistema-sensores",
    lote: "INS-12",
    categoria: "instrumentos",
    classificacao: "proibido",
    nome: "Sistema de Sensores",
    precoBase: 25000000,
    incremento: 700000,
    descricao: "Sensor com capacidade de detecção passiva a 5.000 km. Identifica naves por assinatura de motor mesmo com sistemas de furtividade ativos."
  },
  {
    id: "droid-bd",
    lote: "INS-13",
    categoria: "instrumentos",
    classificacao: "proibido",
    nome: "Droid BD",
    precoBase: 50000000,
    incremento: 1200000,
    descricao: "BD veterano com décadas de memória acumulada e personalidade desenvolvida. Armazena conhecimento de civilizações extintas, ruínas perdidas e segredos."
  },
  {
    id: "computador-navegacao",
    lote: "INS-14",
    categoria: "instrumentos",
    classificacao: "proibido",
    nome: "Computador de Navegação",
    precoBase: 20000000,
    incremento: 600000,
    descricao: "Navicomputador experimental com IA de navegação autônoma. Calcula rotas em tempo real durante combate, inclui mapa estelar completo da galáxia e acesso a rotas que não figuram em nenhum banco de dados oficial."
  },
  {
    id: "blindagem-nave",
    lote: "INS-15",
    categoria: "instrumentos",
    classificacao: "proibido",
    nome: "Blindagem (nave)",
    precoBase: 5000000,
    incremento: 150000,
    descricao: "Blindagem de cortosis que dissipa energia de sabre de luz e canhões laser."
  },
  {
    id: "tanque-bacta",
    lote: "INS-16",
    categoria: "instrumentos",
    classificacao: "proibido",
    nome: "Tanque de Bacta",
    precoBase: 20000000,
    incremento: 600000,
    descricao: "Tanque experimental com solução de bacta sintética de nova geração. Regenera tecido nervoso e ósseo, capaz de curar ferimentos permanentes que normalmente exigiriam próteses cibernéticas."
  }
];