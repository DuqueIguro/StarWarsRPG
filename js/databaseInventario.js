// --- DATABASE ---
let itemDatabase = [

    // --- EQUIPAMENTO (UTILITÁRIOS E FERRAMENTAS) ---

    // -- Cinto de Utilidades
    { name: "Cinto de Couro Gasto", category: "Equipamento", quality: "Baixa", price: 300, description: "Um cinto velho com apenas alguns bolsos e presilhas. O material está ressecado e pode arrebentar se forçado." },
    { name: "Cinto de Utilidades Padrão", category: "Equipamento", quality: "Normal", price: 1600, description: "Um cinto de nylon ou couro com múltiplos bolsos e ganchos para carregar ferramentas, comlinks, células de energia e outros itens essenciais." },
    { name: "Cinto de Utilidades de Mercenário", category: "Equipamento", quality: "Boa", price: 4800, description: "Feito de material reforçado, com mais compartimentos, um coldre de liberação rápida e presilhas magnéticas para equipamentos." },
    { name: "Cinto de Utilidades Militar", category: "Equipamento", quality: "Excelente", price: 12000, description: "Um sistema modular completo com compartimentos de acesso rápido, uma fonte de energia integrada para recarregar dispositivos e material que disfarça a assinatura de calor." },

    // -- Coldre
    { name: "Coldre de Quadril", category: "Equipamento", quality: "Normal", price: 100, description: "Um coldre de quadril padrão, feito de couro ou polímero durável. Permite um saque rápido e seguro. O modelo mais comum na galáxia." },
    { name: "Coldre Escondido", category: "Equipamento", quality: "Normal", price: 200, description: "Projetado para ser usado sob a roupa (no ombro, tornozelo ou costas), permitindo carregar uma pistola blaster de forma discreta e oculta." },

    // -- Datapad
    { name: "Datapad Rachado", category: "Equipamento", quality: "Baixa", price: 200, description: "A tela pisca constantemente e o processador é lento. Algumas funções podem não responder. Pelo menos liga (na maior parte do tempo)." },
    { name: "Datapad Padrão", category: "Equipamento", quality: "Normal", price: 1200, description: "Um datapad civil padrão. Usado para anotações, comunicação básica e acesso a redes públicas. Confiável, mas sem recursos avançados." },
    { name: "Datapad Reforçado", category: "Equipamento", quality: "Boa", price: 2400, description: "Possui uma carcaça durável e é resistente à água e poeira. O processador é mais rápido e a bateria tem maior duração." },
    { name: "Datapad Militar Criptografado", category: "Equipamento", quality: "Excelente", price: 9000, description: "Um datapad de nível militar com criptografia de ponta, processador veloz e acesso a redes seguras. Quase impossível de rastrear." },

    // -- Kit de Ferramentas/Reparos
    { name: "Kit de Ferramentas Usado", category: "Equipamento", quality: "Baixa", price: 160, description: "Faltam algumas peças e outras estão gastas. Bom para reparos simples, se você tiver sorte de encontrar a ferramenta certa." },
    { name: "Kit de Ferramentas Padrão", category: "Equipamento", quality: "Normal", price: 400, description: "Um conjunto completo de ferramentas manuais para reparos básicos em dróides, veículos e sistemas simples." },
    { name: "Kit de Ferramentas e Reparos de Campo", category: "Equipamento", quality: "Boa", price: 1300, description: "Inclui ferramentas de melhor qualidade e um mini soldador a fusão, permitindo reparos mais complexos em campo." },
    { name: "Kit de Ferramentas de Mestre Técnico", category: "Equipamento", quality: "Excelente", price: 8800, description: "Um conjunto de alta precisão com scanner de diagnóstico integrado, micro-manipuladores e acesso a esquemas técnicos raros." },
    { name: "Kit de Ferramentas de Mestre Técnico (Lendário)", category: "Equipamento", quality: "Lendária", price: 20000, description: "Um kit de ferramentas lendário com inteligência artificial integrada, capaz de diagnosticar e reparar sistemas complexos automaticamente. Inclui acesso a uma rede de especialistas para suporte remoto." },

    // -- Fita de Malha
    { name: "Fita de Malha (Rolo Usado)", category: "Equipamento", quality: "Baixa", price: 2, description: "O que sobrou de um rolo de fita. A cola está um pouco fraca, mas ainda serve para prender coisas leves." },
    { name: "Fita de Malha Padrão", category: "Equipamento", quality: "Normal", price: 10, description: "Um rolo de fita adesiva de malha multiuso. Essencial para reparos rápidos, prender equipamentos ou imobilizar um dróide barulhento." },
    { name: "Fita de Malha Reforçada", category: "Equipamento", quality: "Boa", price: 30, description: "Uma versão mais forte e com um adesivo muito mais potente. Consegue segurar peças mais pesadas e resiste melhor à umidade." },
    { name: "Fita de Malha Industrial", category: "Equipamento", quality: "Excelente", price: 200, description: "Fita de nível militar usada para selar temporariamente pequenas rupturas em cascos de naves ou trajes. Extremamente resistente." },

    // -- Cartão de Dados
    { name: "Cartão de Dados de Baixa Capacidade", category: "Equipamento", quality: "Baixa", price: 20, description: "Lento e com pouquíssimo espaço. Há uma chance de corromper os dados se for ejetado de forma incorreta." },
    { name: "Cartão de Dados Padrão", category: "Equipamento", quality: "Normal", price: 120, description: "Um cartão de dados comum, com capacidade e velocidade de leitura adequadas para a maioria das tarefas." },
    { name: "Cartão de Dados de Alta Velocidade", category: "Equipamento", quality: "Boa", price: 400, description: "Possui grande capacidade de armazenamento e taxas de transferência muito rápidas. Ideal para transportar arquivos grandes." },
    { name: "Cartão de Dados Criptografado", category: "Equipamento", quality: "Excelente", price: 3000, description: "Além da alta capacidade, possui um hardware de criptografia que protege os dados contra acesso não autorizado." },

    // -- Chip de Crédito
    { name: "Chip de Crédito Padrão", category: "Equipamento", quality: "Normal", price: 100, description: "Um chip de crédito padrão, vinculado a uma conta bancária galáctica. Funciona em qualquer terminal oficial." },

    // -- Medpac
    { name: "Medpac Quase Expirado", category: "Equipamento", quality: "Baixa", price: 80, description: "O agente de cura perdeu parte de sua eficácia. Estanca sangramentos, mas a recuperação é lenta." },
    { name: "Medpac Padrão", category: "Equipamento", quality: "Normal", price: 480, description: "Contém spray de bacta e bandagens para tratar ferimentos leves e moderados de forma eficaz." },
    { name: "Medpac de Campo", category: "Equipamento", quality: "Boa", price: 2200, description: "Inclui um injetor de bacta para cura rápida e estimulantes para reduzir os efeitos do choque e da dor." },
    { name: "Medpac de Trauma Avançado", category: "Equipamento", quality: "Excelente", price: 5400, description: "Capaz de estabilizar ferimentos críticos, com coagulantes rápidos, e um mini-diagnóstico que sugere o tratamento correto." },

    // -- Comlink Curta Distância
    { name: "Comlink com Estática", category: "Equipamento", quality: "Baixa", price: 50, description: "O áudio é cheio de estática e o alcance é muito limitado, mesmo para um comlink de curta distância." },
    { name: "Comlink de Pulso Padrão", category: "Equipamento", quality: "Normal", price: 150, description: "Um comunicador de pulso padrão, eficaz para comunicação dentro de uma cidade ou de uma nave grande." },
    { name: "Comlink de Pulso (Áudio Limpo)", category: "Equipamento", quality: "Boa", price: 400, description: "Possui filtro de ruído, garantindo comunicação clara mesmo em ambientes barulhentos." },
    { name: "Comlink Tático de Esquadrão", category: "Equipamento", quality: "Excelente", price: 2400, description: "Permite comunicação encriptada em um canal fechado com múltiplos usuários simultaneamente. Usado por forças especiais." },

    // -- Comlink Longa Distância
    { name: "Comlink de Longa Distância (Instável)", category: "Equipamento", quality: "Baixa", price: 500, description: "É volumoso e o sinal cai com frequência. Requer uma fonte de energia considerável para funcionar." },
    { name: "Comlink de Longo Alcance Padrão", category: "Equipamento", quality: "Normal", price: 1400, description: "Um comunicador de mão capaz de alcançar uma nave em órbita baixa ou contatar cidades vizinhas." },
    { name: "Comlink de Longo Alcance (Sinal Reforçado)", category: "Equipamento", quality: "Boa", price: 4000, description: "Seu sinal é potente o suficiente para atravessar algumas interferências atmosféricas e bloqueadores de baixa potência." },
    { name: "Comlink Holo-Criptografado", category: "Equipamento", quality: "Excelente", price: 10000, description: "Além do longo alcance, projeta um holograma instável do interlocutor e utiliza criptografia de nível diplomático." },

    // -- Gerador de Energia
    { name: "Gerador de Energia Barulhento", category: "Equipamento", quality: "Baixa", price: 600, description: "Funciona, mas produces um barulho ensurdecedor e superaquece com facilidade. Ineficiente no consumo de combustível." },
    { name: "Gerador de Energia Portátil", category: "Equipamento", quality: "Normal", price: 1600, description: "Um gerador confiável, capaz de alimentar as luzes e sistemas de um pequeno acampamento ou posto avançado." },
    { name: "Gerador de Energia Silencioso", category: "Equipamento", quality: "Boa", price: 4000, description: "Produz a mesma quantidade de energia que o modelo padrão, mas é muito mais eficiente e quase totalmente silencioso." },
    { name: "Gerador de Campo Furtivo", category: "Equipamento", quality: "Excelente", price: 12000, description: "Além de silencioso, este gerador é blindado contra a maioria dos sensores, ideal para operações secretas." },

    // -- Eletrobinóculos
    { name: "Eletrobinóculos Desgastados", category: "Equipamento", quality: "Baixa", price: 160, description: "As lentes estão arranhadas e o zoom é lento e impreciso. A imagem fica um pouco embaçada." },
    { name: "Eletrobinóculos Padrão", category: "Equipamento", quality: "Normal", price: 500, description: "Oferece boa ampliação e uma imagem clara. Padrão para batedores e viajantes." },
    { name: "Eletrobinóculos de Reconhecimento", category: "Equipamento", quality: "Boa", price: 1400, description: "Possui modo de visão noturna, estabilizador de imagem e um medidor de distância básico." },
    { name: "Eletrobinóculos de Franco-atirador", category: "Equipamento", quality: "Excelente", price: 5000, description: "Inclui múltiplos espectros de visão (térmica, EM), medidor de distância preciso e pode se conectar a um datapad para gravar." },

    // -- Pilha de Energia
    { name: "Pilha de Energia (Genérica)", category: "Equipamento", quality: "Baixa", price: 2, description: "Uma imitação barata. Fornece energia, mas talvez não a voltagem exata que sua blaster de alta qualidade espera." },
    { name: "Pilha de Energia (Normal)", category: "Equipamento", quality: "Normal", price: 4, description: "Bateria retangular padrão." },
    { name: "Pilha de Energia (Boa)", category: "Equipamento", quality: "Boa", price: 8, description: "Pilha de energia que garante a potência correta para cada disparo." },
    { name: "Pilha de Energia de Nível Militar", category: "Equipamento", quality: "Excelente", price: 12, description: "Desenvolvida para armas pesadas, esta pilha de energia garante que sua blaster repetidora nunca falhe no calor da batalha." },

    // --- EQUIPAMENTO (TRAJES E ARMAS) ---

    // -- Traje de Voo
    { name: "Traje de Voo Remendado", category: "Equipamento", quality: "Baixa", price: 800, description: "Um traje antigo com múltiplos remendos e um cheiro peculiar. As vedações não são confiáveis e algumas conexões estão oxidadas." },
    { name: "Traje de Voo Padrão", category: "Equipamento", quality: "Normal", price: 4000, description: "Um traje de voo padrão para pilotos, oferecendo proteção contra o frio e o fogo, com conexões básicas para sistemas de suporte de vida." },
    { name: "Traje de Voo Reforçado", category: "Equipamento", quality: "Boa", price: 8000, description: "Feito com material mais resistente e com melhor isolamento térmico. Possui pontos de fixação para equipamentos e vedações de alta qualidade." },
    { name: "Traje de Voo Pressurizado", category: "Equipamento", quality: "Excelente", price: 16000, description: "Um traje de nível militar que pode ser pressurizado para operações em vácuo por curtos períodos. Inclui um sistema de suporte de vida integrado e maior resistência a impactos, devido a blindagem." },

    // -- Pistola Blaster
    { name: "Pistola Blaster Velha", category: "Equipamento", quality: "Baixa", price: 300, description: "Uma arma barata e pouco confiável. Superaquece com facilidade e a precisão é questionável. É melhor que nada, talvez." },
    { name: "Pistola Blaster Esportiva", category: "Equipamento", quality: "Normal", price: 1200, description: "Um modelo civil, preciso e leve, mas com baixo poder de parada. Popular em competições de tiro e para autodefesa." },
    { name: "Pistola Blaster de Serviço", category: "Equipamento", quality: "Boa", price: 2000, description: "Uma arma de serviço militar ou policial. Oferece um bom equilíbrio entre potência, precisão e cadência de tiro. Um equipamento sólido e confiável." },
    { name: "Pistola Blaster Pesada", category: "Equipamento", quality: "Excelente", price: 3000, description: "Uma arma de mão de grosso calibre que causa dano significativo, capaz de perfurar armaduras leves. Seu coice e consumo de energia são consideráveis." },

    // --- EQUIPAMENTO (SOBREVIVÊNCIA, DISFARCE E TECNOLOGIA) ---

    // -- Tanque de Bacta
    { name: "Tanque de Bacta (Baixa)", category: "Equipamento", quality: "Baixa", price: 40000, description: "Tanque com capacidade para 150 litros (mínimo funcional). Sem sistema de temperatura controlada e sem suporte de oxigênio, tratamento menos eficaz e mais demorado." },
    { name: "Tanque de Bacta (Normal)", category: "Equipamento", quality: "Normal", price: 100000, description: "Tanque padrão para 300 litros de bacta. Cicatrização acelerada com suporte de vida integrado. Tratamento de ferimentos, doenças e venenos. 1 litro de bacta por hora." },
    { name: "Tanque de Bacta (Boa)", category: "Equipamento", quality: "Boa", price: 200000, description: "Tanque com sistema de filtração e reutilização de bacta reduzindo consumo em 30%. Monitor de progresso de cura integrado e suporte de vida de 72 horas." },
    { name: "Tanque de Bacta (Excelente)", category: "Equipamento", quality: "Excelente", price: 400000, description: "Tanque médico completo com bacta de alta concentração (cura 50% mais rápida), sistema de diagnóstico integrado e capacidade de tratar ferimentos graves que normalmente exigiriam cirurgia." },
    { name: "Tanque de Bacta (Lendária)", category: "Equipamento", quality: "Lendária", price: 1600000, description: "Tanque experimental com solução de bacta sintética de nova geração. Regenera tecido nervoso e ósseo, capaz de curar ferimentos permanentes que normalmente exigiriam próteses cibernéticas." },

    // -- Prótese Cibernética
    { name: "Prótese Cibernética (Baixa)", category: "Equipamento", quality: "Baixa", price: 5000, description: "Prótese básica de metal sem revestimento de pele sintética. Funcional, mas esteticamente óbvia. Sem sensação tátil." },
    { name: "Prótese Cibernética (Normal)", category: "Equipamento", quality: "Normal", price: 20000, description: "Prótese padrão funcional equivalente ao membro original. Requer cirurgia (500 cr. adicionais) para instalação." },
    { name: "Prótese Cibernética (Boa)", category: "Equipamento", quality: "Boa", price: 40000, description: "Prótese com revestimento de pele sintética e sensação tátil básica. Indistinguível visualmente do membro original." },
    { name: "Prótese Cibernética (Excelente)", category: "Equipamento", quality: "Excelente", price: 80000, description: "Prótese de última geração com sensação tátil completa, força aumentada em 20% e interface neural de baixa latência." },

    // -- Holoprojetor Pessoal
    { name: "Holoprojetor Pessoal (Baixa)", category: "Equipamento", quality: "Baixa", price: 300, description: "Holoprojetor com imagem granulada e memória para apenas 15 minutos de gravação. Transmissão instável em ambientes com interferência eletromagnética." },
    { name: "Holoprojetor Pessoal (Normal)", category: "Equipamento", quality: "Normal", price: 1000, description: "Holoprojetor padrão com 1 hora de memória e 1.000 imagens. Transmite imagens 3D em tempo real via comlink." },
    { name: "Holoprojetor Pessoal (Boa)", category: "Equipamento", quality: "Boa", price: 3000, description: "Holoprojetor com resolução aprimorada, 5 horas de memória e capacidade de projetar imagens de até 1 metro. Comlink de curto alcance integrado." },
    { name: "Holoprojetor Pessoal (Excelente)", category: "Equipamento", quality: "Excelente", price: 8000, description: "Holoprojetor tático com resolução militar, memória ilimitada em cartão de dados externo e capacidade de transmissão encriptada. Projeção de mapas e modelos 3D interativos." },
    { name: "Holoprojetor Pessoal (Imperial)", category: "Equipamento", quality: "Imperial", price: 20000, description: "Holoprojetor de comunicações imperiais com encriptação de grau máximo, interface com HoloNet e capacidade de transmissão de múltiplos canais simultâneos." },

    // -- Escudo Pessoal Deflector
    { name: "Escudo Pessoal Deflector (Baixa)", category: "Equipamento", quality: "Baixa", price: 3000, description: "Escudo pessoal com gerador instável e desativa aleatoriamente após impactos fortes. Requer recalibração manual após cada combate." },
    { name: "Escudo Pessoal Deflector (Normal)", category: "Equipamento", quality: "Normal", price: 8000, description: "Escudo defletor pessoal padrão. Gerador de cintura com campo de energia que deflexiona tiros de blaster." },
    { name: "Escudo Pessoal Deflector (Boa)", category: "Equipamento", quality: "Boa", price: 18000, description: "Escudo pessoal e gerador de recarga automática. Valorizado por caçadores de recompensas de elite." },
    { name: "Escudo Pessoal Deflector (Excelente)", category: "Equipamento", quality: "Excelente", price: 40000, description: "Escudo com sistema de redistribuição de energia e recarga rápida. Pode absorver um torpedo de prótons sem destruição imediata do gerador." },
    { name: "Escudo Pessoal Deflector (Imperial)", category: "Equipamento", quality: "Imperial", price: 90000, description: "Escudo de guarda imperial integrado à armadura. Absorção de impacto transfere energia para sistema de resposta automática, o usuário não sente o recuo do impacto." },
    { name: "Escudo Pessoal Deflector (Lendária)", category: "Equipamento", quality: "Lendária", price: 220000, description: "Escudo com campo de força adaptativo. Aprende os padrões de frequência dos blasters inimigos e aumenta a eficácia progressivamente durante o combate." },

    // -- Kit de Disfarce
    { name: "Kit de Disfarce (Baixa)", category: "Equipamento", quality: "Baixa", price: 200, description: "Kit básico com maquiagem e peruca de baixa qualidade." },
    { name: "Kit de Disfarce (Normal)", category: "Equipamento", quality: "Normal", price: 1000, description: "Kit completo com maquiagem, perucas, lentes e próteses faciais básicas. Inclui manual de técnicas de disfarce." },
    { name: "Kit de Disfarce (Boa)", category: "Equipamento", quality: "Boa", price: 3000, description: "Kit profissional com próteses faciais de grau teatral, sintetizador de voz portátil e roupas de múltiplas identidades." },
    { name: "Kit de Disfarce (Excelente)", category: "Equipamento", quality: "Excelente", price: 8000, description: "Kit de espião com pele sintética aplicável, alteração de biometria de voz e impressões digitais temporárias. SUPOSTAMENTE passa em verificações biométricas básicas de instalações imperiais." },
    { name: "Kit de Disfarce (Imperial)", category: "Equipamento", quality: "Imperial", price: 20000, description: "Kit de operações especiais com holoemissor facial (muda a aparência completamente), sintetizador de voz de grau imperial e banco de dados de uniformes e insígnias imperiais." },

    // -- Kit de Hacking
    { name: "Kit de Hacking (Baixa)", category: "Equipamento", quality: "Baixa", price: 800, description: "Kit improvisado com componentes de segunda mão. Apenas datapad hackeado e dois spikes descartáveis. Sem rotinas de evasão, fácil detecção." },
    { name: "Kit de Hacking (Normal)", category: "Equipamento", quality: "Normal", price: 4000, description: "Kit completo com datapad modificado, três slicer spikes, rotinas de invasão básicas e jammer de curto raio e confiável, eu acho." },
    { name: "Kit de Hacking (Boa)", category: "Equipamento", quality: "Boa", price: 10000, description: "Kit profissional com datapad de alto desempenho, cinco spikes reutilizáveis, banco de senhas comuns e rotinas de evasão que apagam rastros automaticamente." },
    { name: "Kit de Hacking (Excelente)", category: "Equipamento", quality: "Excelente", price: 25000, description: "Kit de operações com IA de invasão parcial, dez spikes de alto desempenho, jammer ativo de alarmes e capacidade de manter acesso remoto a sistemas invadidos por até 24 horas." },

    // -- Jammer de Comunicações
    { name: "Jammer de Comunicações (Baixa)", category: "Equipamento", quality: "Baixa", price: 800, description: "Jammer com raio de apenas 50 metros e interferência apenas em frequências básicas. Comlinks militares com encriptação passam facilmente." },
    { name: "Jammer de Comunicações (Normal)", category: "Equipamento", quality: "Normal", price: 3000, description: "Jammer portátil com raio de 500 metros. Bloqueia todas as comunicações de rádio não encriptadas e interfere em comlinks padrão. Detectável por scanners de sinal." },
    { name: "Jammer de Comunicações (Boa)", category: "Equipamento", quality: "Boa", price: 8000, description: "Jammer de largo espectro com raio de 2 km. Bloqueia comunicações padrão e militares básicas. Emite sinal que faz o bloqueio parecer falha técnica natural." },
    { name: "Jammer de Comunicações (Excelente)", category: "Equipamento", quality: "Excelente", price: 20000, description: "Jammer tático com raio de 10 km, bloqueio seletivo por frequência e capacidade de criar janela de comunicação unidirecional para aliados enquanto bloqueia inimigos." },
    { name: "Jammer de Comunicações (Imperial)", category: "Equipamento", quality: "Imperial", price: 50000, description: "Jammer de guerra eletrônica com raio de 100 km. Bloqueia comunicações de grau militar, interfere em sistemas de mira guiada e pode simular múltiplos sinais de naves para confundir sensores." },

    // -- Botas de Propulsão
    { name: "Botas de Propulsão (Baixa)", category: "Equipamento", quality: "Baixa", price: 600, description: "Botas com propulsores de íon fracos. Permitem saltos de até 3 metros de altura e 5 metros de distância. Autonomia de apenas 10 ativações por carga, sem voo sustentado." },
    { name: "Botas de Propulsão (Normal)", category: "Equipamento", quality: "Normal", price: 2500, description: "Botas com propulsores integrados nas solas. Permitem saltos aumentados de até 6 metros de altura ou 10 metros de distância e planagem de curta duração. 30 ativações por carga." },
    { name: "Botas de Propulsão (Boa)", category: "Equipamento", quality: "Boa", price: 7000, description: "Botas com propulsores aprimorados e estabilizadores giroscópicos. Voo sustentado por até 2 minutos por carga, velocidade de 6 quadrados e aterrissagem controlada." },
    { name: "Botas de Propulsão (Excelente)", category: "Equipamento", quality: "Excelente", price: 18000, description: "Botas de combate com propulsores de íon de alta potência. Voo sustentado por 10 minutos, velocidade de 10 quadrados, manobras evasivas no ar e capacidade de impacto cinético na aterrissagem." },
    { name: "Botas de Propulsão (Imperial)", category: "Equipamento", quality: "Imperial", price: 45000, description: "Botas de operações especiais imperiais com propulsores silenciosos, estabilizadores automáticos, comlink integrado e autonomia de 30 minutos de voo. Invisíveis a sensores de calor por revestimento." },

    // -- Braçadeira de Controle Remoto
    { name: "Braçadeira de Controle Remoto (Baixa)", category: "Equipamento", quality: "Baixa", price: 1500, description: "Braçadeira básica com alcance de 50 metros e apenas 3 funções: ligar, desligar e acionar rampa de entrada. Sinal não encriptado, interceptável por qualquer scanner." },
    { name: "Braçadeira de Controle Remoto (Normal)", category: "Equipamento", quality: "Normal", price: 6000, description: "Braçadeira com display holográfico compacto, alcance de 500 metros e 10 funções programáveis, ligar motores, abrir/fechar rampas, ativar escudos e acionar alarme. Sinal encriptado básico." },
    { name: "Braçadeira de Controle Remoto (Boa)", category: "Equipamento", quality: "Boa", price: 15000, description: "Braçadeira com alcance de 2 km, display holográfico de status da nave em tempo real e 25 funções programáveis incluindo piloto automático de aproximação e pouso remoto." },
    { name: "Braçadeira de Controle Remoto (Excelente)", category: "Equipamento", quality: "Excelente", price: 35000, description: "Braçadeira tática com alcance de 10 km, interface completa com todos os sistemas da nave, pilotagem remota parcial em baixa velocidade e capacidade de acionar armamento em modo de defesa automática." },
    { name: "Braçadeira de Controle Remoto (Imperial)", category: "Equipamento", quality: "Imperial", price: 80000, description: "Braçadeira de comando imperial com alcance orbital, encriptação de nível máximo, acesso a sistemas imperiais registrados e capacidade de controlar até 3 naves simultaneamente via display holográfico expansível." },

    // --- PEÇAS DE NAVES ---

    // -- Anel de Transporte de Hiperpropulsão
    { name: "Anel de Transporte de Hiperpropulsão (Antigo)", category: "Peças de Naves", quality: "Baixa", price: 80000, description: "Esteve parado em um cemitério de naves por uma década. A maioria da ferrugem foi removida." },
    { name: "Anel de Transporte de Hiperpropulsão (Normal)", category: "Peças de Naves", quality: "Normal", price: 140000, description: "Módulo externo para caças que não possuem um hiperpropulsor interno." },
    { name: "Anel de Transporte de Hiperpropulsão (Boa)", category: "Peças de Naves", quality: "Boa", price: 280000, description: "Um anel de hiperespaço confiável e bem conservado, perfeito para caças Jedi." },
    { name: "Anel de Transporte de Hiperpropulsão (Protótipo)", category: "Peças de Naves", quality: "Excelente", price: 420000, description: "Um anel de hiperespaço experimental, mais rápido e com menor consumo de energia que qualquer modelo de produção." },

    // -- Bobina de hiperespaço
    { name: "Bobina de hiperespaço (Recuperada)", category: "Peças de Naves", quality: "Baixa", price: 1900, description: "Tirada de um cargueiro que se 'aposentou' abruptamente. Faz um barulho estranho ao ser ativada, mas geralmente te leva aonde você precisa ir. Ou perto." },
    { name: "Bobina de hiperespaço (Normal)", category: "Peças de Naves", quality: "Normal", price: 3200, description: "Componente padrão responsável por gerar o campo para o salto no hiperespaço." },
    { name: "Bobina de hiperespaço (Boa)", category: "Peças de Naves", quality: "Boa", price: 6400, description: "Uma bobina de alta performance que garante saltos no hiperespaço mais rápidos e com menor risco de erros de cálculo." },
    { name: "Bobina de hiperespaço (Padrão-Destróier)", category: "Peças de Naves", quality: "Imperial", price: 12800, description: "Bobina padrão-militar, robusta e confiável, projetada para as longas patrulhas dos Destróieres Estelares." },

    // -- Bobina de hiperespaço de precisão
    { name: "Bobina de hiperespaço de precisão (Exc)", category: "Peças de Naves", quality: "Excelente", price: 9600, description: "Fabricada com cristais supercondutores puros, esta bobina garante os saltos mais rápidos e estáveis que o dinheiro pode comprar." },
    { name: "Bobina de hiperespaço de precisão", category: "Peças de Naves", quality: "Lendária", price: 25600, description: "Uma bobina de nível de protótipo, que permite cálculos de micro-saltos em combate, uma tática favorecida pelos estrategistas Chiss." },

    // -- Cadeira Ejetora de Piloto TIE
    { name: "Cadeira Ejetora de Piloto TIE", category: "Peças de Naves", quality: "Imperial", price: 15000, description: "Sistema de ejeção de último recurso para pilotos de TIE, que os lança no vácuo com um pequeno suprimento de oxigénio." },

    // -- Canhão Iônico
    { name: "Canhão Iônico (Vazando)", category: "Peças de Naves", quality: "Baixa", price: 3000, description: "Desativa outras naves e, ocasionalmente, sua própria iluminação do cockpit devido a um pequeno vazamento de energia." },
    { name: "Canhão Iônico (Normal)", category: "Peças de Naves", quality: "Normal", price: 5000, description: "Arma especializada que dispara partículas ionizadas." },
    { name: "Canhão Iônico (Boa)", category: "Peças de Naves", quality: "Boa", price: 10000, description: "Uma arma iônica de alta potência, projetada para desativar naves inimigas sem destruí-las." },
    { name: "Canhão Iônico (Padrão-Cruzador)", category: "Peças de Naves", quality: "Imperial", price: 20000, description: "Arma iônica usada em cruzadores para desativar naves rebeldes e facilitar a abordagem e captura." },

    // -- Canhão Iônico Pesado
    { name: "Canhão Iônico Pesado (Exc)", category: "Peças de Naves", quality: "Excelente", price: 15000, description: "Dispara um pulso iônico tão concentrado que pode desativar os sistemas de uma corveta com um único disparo bem colocado." },
    { name: "Canhão Iônico Pesado", category: "Peças de Naves", quality: "Lendária", price: 40000, description: "Capaz de desativar os sistemas de um cruzador leve com um único disparo, deixando-o à deriva no espaço." },

    // -- Canhão Laser
    { name: "Canhão Laser (Superaquecido)", category: "Peças de Naves", quality: "Baixa", price: 1200, description: "Dispara bem, mas superaquece após alguns tiros rápidos. Deixe esfriar um pouco entre as rajadas... ou mantenha um extintor de incêndio por perto." },
    { name: "Canhão Laser (Desalinhado)", category: "Peças de Naves", quality: "Baixa", price: 1500, description: "A mira é um pouco... criativa. Você pode estar mirando em um caça e acertar um pequeno asteroide próximo. Surpresa!" },
    { name: "Canhão Laser (SFS L-s1) (Normal)", category: "Peças de Naves", quality: "Normal", price: 2000, description: "Versão padrão de disparo rápido da tecnologia de turbolaser." },
    { name: "Canhão Laser (Taim & Bak KX9) (Normal)", category: "Peças de Naves", quality: "Normal", price: 2400, description: "Canhão anti-caça estelar padrão." },
    { name: "Canhão Laser (SFS L-s1) (Boa)", category: "Peças de Naves", quality: "Boa", price: 4000, description: "Uma versão de alta qualidade do canhão padrão dos TIEs, com melhor dissipação de calor." },
    { name: "Canhão Laser (Taim & Bak KX9)", category: "Peças de Naves", quality: "Boa", price: 4800, description: "Um canhão laser de alta precisão, a arma de escolha para pilotos que valorizam a precisão." },
    { name: "Canhão Laser (SFS L-s1 Imperial)", category: "Peças de Naves", quality: "Imperial", price: 8000, description: "O icônico canhão dos caças TIE, projetado para ser barato e eficaz em grandes números." },
    { name: "Canhão Laser (SFS L-s1)", category: "Peças de Naves", quality: "Lendária", price: 16000, description: "Canhão de caça TIE modificado para ter uma cadência de tiro muito superior, embora ao custo de uma vida útil mais curta." },

    // -- Canhão Laser de Torre
    { name: "Canhão Laser de Torre (Destróier Estelar)", category: "Peças de Naves", quality: "Imperial", price: 9600, description: "Uma torre de canhão laser padrão, retirada de um Destróier Estelar, projetada para defesa de ponto." },

    // -- Canhão Laser Pesado
    { name: "Canhão Laser Pesado (KX12)", category: "Peças de Naves", quality: "Excelente", price: 7200, description: "A versão mais recente e poderosa da linha KX da Taim & Bak, com poder de fogo e alcance superiores." },

    // -- Conversor de energia
    { name: "Conversor de energia (Remendado)", category: "Peças de Naves", quality: "Baixa", price: 600, description: "Cheio de soldas duvidosas e peças não originais. Às vezes, desvia um pouco de energia para o sistema de som, causando estática." },
    { name: "Conversor de energia (Normal)", category: "Peças de Naves", quality: "Normal", price: 1100, description: "Peça padrão que realiza a transferência de energia entre os sistemas da nave." },
    { name: "Conversor de energia (Boa)", category: "Peças de Naves", quality: "Boa", price: 2200, description: "Um conversor de energia eficiente, garantindo que a potência do reator seja distribuída de forma otimizada para todos os sistemas." },
    { name: "Conversor de energia (Nível Militar)", category: "Peças de Naves", quality: "Imperial", price: 4400, description: "Conversor de energia de nível militar projetado para lidar com as enormes demandas de energia dos sistemas de armas imperiais." },

    // -- Conversor de energia de fluxo otimizado
    { name: "Conversor de energia de fluxo otimizado (Exc)", category: "Peças de Naves", quality: "Excelente", price: 3300, description: "Uma unidade de conversão de energia de última geração que maximiza a eficiência energética, permitindo que armas e escudos operem em seu pico." },
    { name: "Conversor de energia de fluxo otimizado", category: "Peças de Naves", quality: "Lendária", price: 8800, description: "Um conversor de energia de design experimental que otimiza a potência a níveis teóricos, permitindo rajadas de energia que podem sobrecarregar escudos inimigos." },

    // -- Coração de Reator de Singularidade
    { name: "Coração de Reator de Singularidade", category: "Peças de Naves", quality: "Lendária", price: 1900000, description: "Uma fonte de energia experimental que utiliza uma micro-singularidade contida, fornecendo energia quase infinita. Extremamente instável e perigoso." },

    // -- Cápsula de Escape Padrão Imperial
    { name: "Cápsula de Escape Padrão Imperial", category: "Peças de Naves", quality: "Imperial", price: 10000, description: "Encontrada em todas as naves capitais do Império, equipada com um sinalizador de emergência de longo alcance." },

    // -- Célula de Energia
    { name: "Célula de Energia (Recarregada)", category: "Peças de Naves", quality: "Baixa", price: 10, description: "Recarregada tantas vezes que a capacidade máxima é um mistério. Boa sorte." },
    { name: "Célula de Energia (Normal)", category: "Peças de Naves", quality: "Normal", price: 20, description: "Bateria compacta padrão." },
    { name: "Célula de Energia (Boa)", category: "Peças de Naves", quality: "Boa", price: 40, description: "Célula de energia de marca, com vida útil mais longa e recarga mais eficiente." },

    // -- Célula de Energia de Alta Capacidade
    { name: "Célula de Energia de Alta Capacidade", category: "Peças de Naves", quality: "Excelente", price: 60, description: "Uma célula de energia que oferece mais disparos e uma saída de energia mais consistente para armas e sistemas." },

    // -- Célula de Energia de Força Viva
    { name: "Célula de Energia de Força Viva (Tecnologia Ithoriana)", category: "Peças de Naves", quality: "Lendária", price: 80000, description: "Uma bateria orgânica que se regenera lentamente. Uma fusão bizarra e poderosa de tecnologia e natureza." },

    // -- Dispositivo de Camuflagem Stygium
    { name: "Dispositivo de Camuflagem Stygium (Protótipo)", category: "Peças de Naves", quality: "Lendária", price: 1000000, description: "Um dispositivo de camuflagem experimental que torna a nave invisível a todos os sensores conhecidos, uma verdadeira arma fantasma." },

    // -- Estabilizador de voo
    { name: "Estabilizador de voo (Usado)", category: "Peças de Naves", quality: "Baixa", price: 1400, description: "Claramente já viu dias melhores. A nave pode tremer um pouco em curvas fechadas, mas é melhor do que voar de lado." },
    { name: "Estabilizador de voo (Normal)", category: "Peças de Naves", quality: "Normal", price: 2400, description: "Dispositivo que mantém a estabilidade da nave durante voo e manobras." },
    { name: "Estabilizador de voo (Boa)", category: "Peças de Naves", quality: "Boa", price: 4800, description: "Um estabilizador de nível superior que oferece maior controle e resposta em manobras de combate." },
    { name: "Estabilizador de voo (Padrão-Nave Capital)", category: "Peças de Naves", quality: "Imperial", price: 9600, description: "Estabilizador pesado projetado para manter a estabilidade de naves capitais durante o bombardeio orbital." },

    // -- Estabilizador de voo giroscópico
    { name: "Estabilizador de voo giroscópico (Exc)", category: "Peças de Naves", quality: "Excelente", price: 7200, description: "Equipado com giroscópios de precisão quântica, este estabilizador oferece controle de voo absoluto nas manobras mais extremas." },
    { name: "Estabilizador de voo giroscópico", category: "Peças de Naves", quality: "Lendária", price: 19200, description: "Um estabilizador de voo que se adapta ao estilo de pilotagem, tornando a nave uma extensão do piloto." },

    // -- Gerador de escudo defletor
    { name: "Gerador de escudo defletor (Instável)", category: "Peças de Naves", quality: "Baixa", price: 13000, description: "Sistema com apenas um nível de redundância. Falha em sistemas secundários ainda afeta propulsão em 20%. Melhor que nada" },
    { name: "Gerador de escudo defletor (Normal)", category: "Peças de Naves", quality: "Normal", price: 20000, description: "Sistema com roteamento redundante de energia. Dano em um sistema não propaga falha para os demais escudos, armas e motores operam independentemente" },
    { name: "Gerador de escudo defletor (Boa)", category: "Peças de Naves", quality: "Boa", price: 40000, description: "Redundância dupla com roteamento automático. Quando um sistema é destruído a energia é redistribuída automaticamente para manter os demaisoperando em capacidade máxima" },
    { name: "Gerador de escudo defletor (Redundante) (Exc)", category: "Peças de Naves", quality: "Excelente", price: 60000, description: "Sistema com redundância tripla e IA de distribuição. Prioriza sistemas críticos automaticamente em combate e mantém a nave funcional com até 60% do reator danificado" },
    { name: "Gerador de escudo defletor (Padrão-Destróier)", category: "Peças de Naves", quality: "Imperial", price: 80000, description: "Sistema de distribuição de nave capital com redundância quádrupla. Padrão de Star Destroyers a nave só perde funcionalidade quando mais de 80% dos sistemas são destruídos" },
    { name: "Gerador de escudo defletor (Redundante)", category: "Peças de Naves", quality: "Lendária", price: 160000, description: "Um gerador de escudo Mon Calamari capturado e modificado, com uma capacidade de regeneração que o torna quase indestrutível." },

    // -- Lançador de Míssil
    { name: "Lançador de Míssil (Nave de Apoio)", category: "Peças de Naves", quality: "Imperial", price: 12000, description: "Lançador de mísseis padrão para naves de apoio e guarnições planetárias." },

    // -- Lançador de Míssil de Concussão
    { name: "Lançador de Míssil de Concussão (Usado)", category: "Peças de Naves", quality: "Baixa", price: 1800, description: "Pintado de novo para cobrir os arranhões. O mecanismo de recarga é um pouco lento." },
    { name: "Lançador de Míssil de Concussão (Normal)", category: "Peças de Naves", quality: "Normal", price: 3000, description: "Arma de projétil padrão." },
    { name: "Lançador de Míssil de Concussão (Boa)", category: "Peças de Naves", quality: "Boa", price: 6000, description: "Um lançador bem construído que garante que os mísseis não falhem ao serem disparados." },
    { name: "Lançador de Míssil de Concussão (Voleio)", category: "Peças de Naves", quality: "Excelente", price: 9000, description: "Sistema de lançamento rápido capaz de disparar múltiplos mísseis em uma barragem massiva para sobrecarregar qualquer defesa." },

    // -- Lançador de Torpedo
    { name: "Lançador de Torpedo (Bombardeiro TIE)", category: "Peças de Naves", quality: "Imperial", price: 24000, description: "Sistema de lançamento padrão para bombardeiros TIE, projetado para ataques devastadores contra alvos fixos." },

    // -- Lançador de Torpedo de Prótons
    { name: "Lançador de Torpedo de Prótons (emperrado)", category: "Peças de Naves", quality: "Baixa", price: 3600, description: "A porta de lançamento às vezes emperra. É preciso dar umas batidas no painel." },
    { name: "Lançador de Torpedo de Prótons (MG7) (Normal)", category: "Peças de Naves", quality: "Normal", price: 6000, description: "Arma padrão em caças que dispara ogivas de alto rendimento." },
    { name: "Lançador de Torpedo de Prótons (MG7) (Boa)", category: "Peças de Naves", quality: "Boa", price: 12000, description: "Um sistema de lançamento de torpedos de nível militar, com mira avançada e recarga rápida." },
    { name: "Lançador de Torpedo de Prótons (MG7-A) (Exc)", category: "Peças de Naves", quality: "Excelente", price: 18000, description: "Versão militar avançada que carrega, mira e dispara torpedos com uma velocidade e precisão surpreendentes." },
    { name: "Lançador de Torpedo de Prótons (MG7-A)", category: "Peças de Naves", quality: "Lendária", price: 48000, description: "Um system de lançamento que pode modificar a ogiva do torpedo em tempo real, adaptando-se às defesas do inimigo." },

    // -- Matriz de Cristal de Superlaser
    { name: "Matriz de Cristal de Superlaser (Fragmento)", category: "Peças de Naves", quality: "Lendária", price: 2400000, description: "Um fragmento funcional de um dos cristais de foco da Estrela da Morte, capaz de amplificar qualquer arma de energia a níveis aterradores." },

    // -- Motivador de Hiperpropulsor
    { name: "Motivador de Hiperpropulsor (Teimoso)", category: "Peças de Naves", quality: "Baixa", price: 12000, description: "Um Classe 2 que às vezes se recusa a engatar na primeira tentativa. Requer um pouco de 'persuasão' (leia-se: pancadas com uma chave inglesa)." },
    { name: "Motivador de Hiperpropulsor (Classe 2) (Normal)", category: "Peças de Naves", quality: "Normal", price: 20000, description: "Componente FTL padrão encontrado em muitas naves de produção." },
    { name: "Motivador de Hiperpropulsor (Classe 1) (Boa)", category: "Peças de Naves", quality: "Boa", price: 40000, description: "Um hiperpropulsor rápido e confiável, padrão em muitas naves militares e de exploração de longo alcance." },
    { name: "Motivador de Hiperpropulsor (Classe 0.5) (Exc)", category: "Peças de Naves", quality: "Excelente", price: 60000, description: "Uma modificação rara e altamente ilegal do componente FTL, tornando a nave uma das mais rápidas da galáxia." },
    { name: "Motivador de Hiperpropulsor (Classe 2 Imperial)", category: "Peças de Naves", quality: "Imperial", price: 80000, description: "Hiperpropulsor padrão da frota, lento mas confiável, garantindo que a presença do Império seja sentida em toda a galáxia." },
    { name: "Motivador de Hiperpropulsor (Classe 0.5)", category: "Peças de Naves", quality: "Lendária", price: 160000, description: "Modificado por alguns dos melhores engenheiros da galáxia, este hiperpropulsor é uma lenda entre os contrabandistas." },

    // -- Motor de Impulso Fusial
    { name: "Motor de Impulso Fusial (Barulhento)", category: "Peças de Naves", quality: "Baixa", price: 4800, description: "Funciona, mas produz um ruído metálico preocupante em alta velocidade. Ótimo para quem gosta de música industrial." },
    { name: "Motor de Impulso Fusial (Incom 4L4) (Normal)", category: "Peças de Naves", quality: "Normal", price: 8000, description: "Sistema de propulsão subluz equilibrado." },
    { name: "Motor de Impulso Fusial (Incom 4L4) (Boa)", category: "Peças de Naves", quality: "Boa", price: 16000, description: "Un conjunto de motores de impulso fusial confiáveis e duráveis, perfeitos para caças versáteis." },
    { name: "Motor de Impulso Fusial (Incom 4L4-X) (Exc)", category: "Peças de Naves", quality: "Excelente", price: 24000, description: "Um protótipo da Incom, este motor oferece um equilíbrio perfeito entre potência e eficiência, com uma assinatura de energia quase indetectável." },
    { name: "Motor de Impulso Fusial (Incom 4L4-X)", category: "Peças de Naves", quality: "Lendária", price: 64000, description: "Um motor de protótipo que a Incom desenvolveu antes de desertar, com uma eficiência energética que permite voos prolongados em modo furtivo." },

    // -- Motor de Íon
    { name: "Motor de Íon (Baixa)", category: "Peças de Naves", quality: "Baixa", price: 3000, description: "Motor de íon com empuxo reduzido. Velocidade máxima em espaço real 20% abaixo do padrão. Consome mais combustível por unidade de impulso." },
    { name: "Motor de Íon (Normal)", category: "Peças de Naves", quality: "Normal", price: 6000, description: "Motor de íon padrão. Velocidade e aceleração dentro do esperado para a classe da nave. Manutenção simples e peças de reposição amplamente disponíveis." },
    { name: "Motor de Íon (Boa)", category: "Peças de Naves", quality: "Boa", price: 12000, description: "Motor de íon aprimorado com câmara de aceleração reforçada. Aumento de velocidade de 15% e aceleração 20% melhor. Estabilidade superior em manobras bruscas." },
    { name: "Motor de Íon (Excelente)", category: "Peças de Naves", quality: "Excelente", price: 24000, description: "Motor de íon de alta performance com sistemas de refrigeração duplos. Velocidade máxima 30% acima do padrão. Pode ser sobrecarregado por curtos períodos sem danos permanentes." },
    { name: "Motor de Íon (Lendária)", category: "Peças de Naves", quality: "Lendária", price: 96000, description: "Motor de íon com ignitor de plasma de fase dupla. Velocidade máxima 80% acima do padrão, iguala alguns caças de combate." },

    // -- Motor Iônico
    { name: "Motor Iônico (de um TIE acidentado)", category: "Peças de Naves", quality: "Baixa", price: 4200, description: "Este motor tem algumas marcas de laser, mas o mecânico jura que é só 'cosmético'. Acelera que é uma beleza, só não olhe muito para o medidor de combustível." },
    { name: "Motor Iônico (Duplo P-s4) (Normal)", category: "Peças de Naves", quality: "Normal", price: 7000, description: "Sistema de propulsão subluz que acelera gases ionizados." },
    { name: "Motor Iônico (Duplo P-s4) (Boa)", category: "Peças de Naves", quality: "Boa", price: 14000, description: "Um par de motores iônicos novos, saídos da fábrica da Sienar, oferecendo a velocidade e agilidade pelas quais a série TIE é conhecida." },
    { name: "Motor Iônico (Duplo P-s4 de Elite) (Exc)", category: "Peças de Naves", quality: "Excelente", price: 21000, description: "A versão de elite dos motores TIE, calibrada para desempenho máximo. Oferece uma aceleração que deixa os modelos padrão comendo poeira estelar." },
    { name: "Motor Iônico (Padrão TIE/LN)", category: "Peças de Naves", quality: "Imperial", price: 28000, description: "O motor padrão dos caças TIE, produzido em massa para garantir a superioridade numérica do Império." },
    { name: "Motor Iônico (Duplo P-s4 de Elite)", category: "Peças de Naves", quality: "Lendária", price: 56000, description: "Motores iônicos experimentais que sacrificam a durabilidade por uma velocidade e agilidade que desafiam a física." },

    // -- Míssil de Concussão
    { name: "Míssil de Concussão (Recondicionado)", category: "Peças de Naves", quality: "Baixa", price: 240, description: "Este míssil foi 'gentilmente usado'. O sistema de orientação pode ter algumas ideias próprias. (por unidade)" },
    { name: "Míssil de Concussão (Normal)", category: "Peças de Naves", quality: "Normal", price: 400, description: "Munição de projétil comum. (por unidade)" },
    { name: "Míssil de Concussão (Boa)", category: "Peças de Naves", quality: "Boa", price: 800, description: "Míssil de concussão de fabricação padrão militar, confiável e preciso. (por unidade)" },
    { name: "Míssil de Concussão (Padrão-Exército)", category: "Peças de Naves", quality: "Imperial", price: 1600, description: "Munição de concussão padrão, produzida em massa para a vasta máquina de guerra Imperial." },

    // -- Míssil de Concussão Guiado
    { name: "Míssil de Concussão Guiado", category: "Peças de Naves", quality: "Excelente", price: 120, description: "Munição com sistema de mira aprimorado para maior precisão contra alvos ágeis. (por unidade)" },

    // -- Módulo de mira do Destróier Estelar
    { name: "Módulo de mira do Destróier Estelar", category: "Peças de Naves", quality: "Imperial", price: 50000, description: "Sistema de mira avançado que se integra com os canhões da nave para aumentar a precisão contra alvos menores." },

    // -- Módulo de Salto Cego
    { name: "Módulo de Salto Cego (Navegação Chiss)", category: "Peças de Naves", quality: "Lendária", price: 700000, description: "Permite saltos hiperespaciais curtos e precisos sem a necessidade de uma rota pré-calculada, uma vantagem tática inestimável." },

    // -- Navicomputador
    { name: "Navicomputador (Dados antigos)", category: "Peças de Naves", quality: "Baixa", price: 5600, description: "O banco de dados não é atualizado desde antes do Império. Evite rotas novas, a menos que você goste da emoção de talvez pular para dentro de uma estrela." },
    { name: "Navicomputador (Normal)", category: "Peças de Naves", quality: "Normal", price: 10000, description: "Sistema que realiza cálculos astrométricos para traçar um curso seguro." },
    { name: "Navicomputador (Boa)", category: "Peças de Naves", quality: "Boa", price: 20000, description: "Um computador de navegação com um vasto banco de dados de rotas seguras e atualizadas." },
    { name: "Navicomputador (Acesso Restrito)", category: "Peças de Naves", quality: "Imperial", price: 40000, description: "Computador de navegação com acesso restrito a rotas militares seguras e secretas, inacessíveis a civis." },

    // -- Navicomputador com IA Tática
    { name: "Navicomputador com IA Tática (Exc)", category: "Peças de Naves", quality: "Excelente", price: 30000, description: "Possui uma IA que analisa vetores de ataque e sugere manobras evasivas em tempo real." },
    { name: "Navicomputador com IA Tática", category: "Peças de Naves", quality: "Lendária", price: 80000, description: "Contém os algoritmos de batalha e estratégias do próprio Grande Almirante Thrawn, capaz de prever os movimentos do inimigo com uma precisão assustadora." },

    // -- Placa de blindagem
    { name: "Placa de blindagem (Amassada)", category: "Peças de Naves", quality: "Baixa", price: 1600, description: "Esta placa tem uma história para contar, e a história envolve uma colisão com um asteroide. Os amassados dão personalidade, certo?" },
    { name: "Placa de blindagem (Durasteel) (Normal)", category: "Peças de Naves", quality: "Normal", price: 2800, description: "Liga de carbono padrão usada em cargueiros." },
    { name: "Placa de blindagem (Alusteel Reforçado com Titânio)", category: "Peças de Naves", quality: "Boa", price: 5600, description: "Uma placa de blindagem robusta, usada na construção de naves capitais." },
    { name: "Placa de blindagem (Aço Mandaloriano) (Exc)", category: "Peças de Naves", quality: "Excelente", price: 8400, description: "Forjada nas tradições dos guerreiros Mandalorianos, esta placa de metal exótico é lendária por sua capacidade de resistir até mesmo a um golpe de sabre de luz." },
    { name: "Placa de blindagem (Aço Mandaloriano)", category: "Peças de Naves", quality: "Lendária", price: 22400, description: "Placas de Beskar puro, capazes de defletir tiros de blaster e resistir a golpes de sabre de luz. Quase impenetrável." },

    // -- Placa de blindagem Durasteel
    { name: "Placa de blindagem Durasteel (Imperial)", category: "Peças de Naves", quality: "Imperial", price: 11200, description: "Placas de Durasteel espessas e pesadas, a espinha dorsal da defense passiva da frota Imperial." },

    // -- Projetor de Poço de Gravidade
    { name: "Projetor de Poço de Gravidade", category: "Peças de Naves", quality: "Excelente", price: 300000, description: "Tecnologia rara e de alto consumo de energia que gera sombras de massa artificiais, capaz de arrancar naves do hiperespaço." },

    // -- Projetor de Raio Trator
    { name: "Projetor de Raio Trator (Fraco)", category: "Peças de Naves", quality: "Baixa", price: 24000, description: "Consegue segurar uma nave, mas qualquer motor mais forte pode escapar. Melhor usá-lo em naves já danificadas." },
    { name: "Projetor de Raio Trator (Normal)", category: "Peças de Naves", quality: "Normal", price: 40000, description: "Componente chave de cruzadores para capturar naves." },
    { name: "Projetor de Raio Trator (Boa)", category: "Peças de Naves", quality: "Boa", price: 80000, description: "Um projetor de raio trator padrão, capaz de capturar naves do tamanho de um cargueiro." },
    { name: "Projetor de Raio Trator (Padrão-Destróier)", category: "Peças de Naves", quality: "Imperial", price: 160000, description: "O projetor padrão encontrado em todos os Destróieres Estelares, símbolo da autoridade Imperial." },
    { name: "Projetor de Raio Trator", category: "Peças de Naves", quality: "Lendária", price: 320000, description: "Um projetor de raio trator tão poderoso que pode segurar múltiplos caças ou um cargueiro leve com facilidade." },

    // -- Projetor de Raio Trator de Campo Amplo
    { name: "Projetor de Raio Trator de Campo Amplo", category: "Peças de Naves", quality: "Excelente", price: 120000, description: "Um projetor de raio trator tão poderoso que pode segurar múltiplos caças ou um cargueiro leve com facilidade." },

    // -- Repulsor de Emergência
    { name: "Repulsor de Emergência (Baixa)", category: "Peças de Naves", quality: "Baixa", price: 1000, description: "Repulsor com potência reduzida, suporta aterrissagem forçada segura apenas em gravidade padrão. Em gravidade alta não previne completamente." },
    { name: "Repulsor de Emergência (Normal)", category: "Peças de Naves", quality: "Normal", price: 3000, description: "Sistema de repulsor de emergência que evita destruição total em quedas e aterrissagens forçadas. Tem que ser ativado manualmente." },
    { name: "Repulsor de Emergência (Boa)", category: "Peças de Naves", quality: "Boa", price: 6000, description: "Repulsor de emergência com sensor de altitude que calcula a ativação perfeita para zero impacto no solo em qualquer gravidade padrão. Inclui amortecedor de casco. Ativa automaticamente." },
    { name: "Repulsor de Emergência (Excelente)", category: "Peças de Naves", quality: "Excelente", price: 12000, description: "Sistema com repulsor duplo e IA de aterrissagem autônoma. Pode pousar uma nave completamente desativada com segurança em terrenos irregulares sem intervenção do piloto." },

    // -- Sistema de Controle de Enxame de Dróides
    { name: "Sistema de Controle de Enxame de Dróides", category: "Peças de Naves", quality: "Lendária", price: 360000, description: "Permite que um único piloto controle uma pequena esquadra de caças dróides como uma extensão de sua própria nave." },

    // -- Sistema de Distribuição de Energia Redundante
    { name: "Sistema de Distribuição de Energia Redundante (Baixa)", category: "Peças de Naves", quality: "Baixa", price: 3000, description: "Sistema com apenas um nível de redundância. Falha em sistemas secundários ainda afeta propulsão em 20%. Melhor que nada." },
    { name: "Sistema de Distribuição de Energia Redundante (Normal)", category: "Peças de Naves", quality: "Normal", price: 8000, description: "Sistema com roteamento redundante de energia. Dano em um sistema não propaga falha para os demais escudos, armas e motores operam independentemente." },
    { name: "Sistema de Distribuição de Energia Redundante (Boa)", category: "Peças de Naves", quality: "Boa", price: 16000, description: "Redundância dupla com roteamento automático. Quando um sistema é destruído a energia é redistribuída automaticamente para manter os demais operando em capacidade máxima." },
    { name: "Sistema de Distribuição de Energia Redundante (Excelente)", category: "Peças de Naves", quality: "Excelente", price: 32000, description: "Sistema com redundância tripla e IA de distribuição. Prioriza sistemas críticos automaticamente em combate e mantém a nave funcional com até 60% do reator danificado." },
    { name: "Sistema de Distribuição de Energia Redundante (Imperial)", category: "Peças de Naves", quality: "Imperial", price: 64000, description: "Sistema de distribuição de nave capital com redundância quádrupla. Padrão de Star Destroyers a nave só perde funcionalidade quando mais de 80% dos sistemas são destruídos." },

    // -- Sistema de Furtividade
    { name: "Sistema de Furtividade (Baixa)", category: "Peças de Naves", quality: "Baixa", price: 4000, description: "Sistema de supressão de assinatura com defeito." },
    { name: "Sistema de Furtividade (Normal)", category: "Peças de Naves", quality: "Normal", price: 40000, description: "Sistema de furtividade passiva que mascara emissões de calor e assinatura de motor. Sensores padrão não detectam a nave. Sistemas ativos quebram a furtividade." },
    { name: "Sistema de Furtividade (Boa)", category: "Peças de Naves", quality: "Boa", price: 80000, description: "Sistema de cloaking parcial que permite operação de sensores passivos enquanto furtivo. A nave permanece indetectável por até 4 horas antes de sobreaquecimento do sistema." },
    { name: "Sistema de Furtividade (Excelente)", category: "Peças de Naves", quality: "Excelente", price: 160000, description: "Sistema de cloaking completo com gerador de campo de inversão. Invisível a sensores ativos e passivos." },

    // -- Sistema de Sensores
    { name: "Sistema de Sensores (Baixa)", category: "Peças de Naves", quality: "Baixa", price: 15000, description: "Sensor de curto alcance com alcance máximo de detecção de 1 km em espaço real. Sem detecção passiva, só funciona no modo ativo, emitindo sinal detectável." },
    { name: "Sistema de Sensores (Normal)", category: "Peças de Naves", quality: "Normal", price: 30000, description: "Sensor padrão com alcance de 10 km e modo passivo básico. Detecta naves, asteroides e fontes de energia." },
    { name: "Sistema de Sensores (Boa)", category: "Peças de Naves", quality: "Boa", price: 60000, description: "Sensor aprimorado com alcance de 50 km, modo passivo avançado e identificação de assinatura. Distingue modelos de naves e estima armamento." },
    { name: "Sistema de Sensores (Excelente)", category: "Peças de Naves", quality: "Excelente", price: 120000, description: "Sensor de longo alcance com alcance de 200 km, análise de espectro e detecção de rastros de hiperespaço." },

    // -- Sistema de Suporte de Vida de Stormtrooper
    { name: "Sistema de Suporte de Vida de Stormtrooper", category: "Peças de Naves", quality: "Imperial", price: 30000, description: "Pode ser instalado em naves sem atmosfera, permitindo que stormtroopers operem no vácuo." },

    // -- Torpedo de Prótons
    { name: "Torpedo de Prótons (Expirado)", category: "Peças de Naves", quality: "Baixa", price: 1200, description: "A data de validade era para o ano passado, but the a carga explosiva ainda deve funcionar. Provavelmente." },
    { name: "Torpedo de Prótons (Normal)", category: "Peças de Naves", quality: "Normal", price: 2000, description: "Munição padrão. Pacote com 6." },
    { name: "Torpedo de Prótons (Boa)", category: "Peças de Naves", quality: "Boa", price: 4000, description: "Munição de prótons com uma ogiva de qualidade e sistema de propulsão confiável. Pacote com 6." },
    { name: "Torpedo de Prótons (Padrão-Marinha)", category: "Peças de Naves", quality: "Imperial", price: 8000, description: "Munição padrão da Marinha Imperial. Pacote com 6." },

    // -- Torpedo de Prótons de Alto Rendimento
    { name: "Torpedo de Prótons de Alto Rendimento (Exc)", category: "Peças de Naves", quality: "Excelente", price: 6000, description: "Munição de nível militar com maior poder destrutivo e uma ogiva mais estável. Pacote com 6." },
    { name: "Torpedo de Prótons de Alto Rendimento", category: "Peças de Naves", quality: "Lendária", price: 16000, description: "Munição com uma ogiva de barádio enriquecido, causando uma explosão significativamente mais poderosa. Pacote com 6." },

    // --- NAVES PRONTAS ---

    // -- Airspeeder T-47
    { name: "Airspeeder T-47 (Com Fugas)", category: "Naves Prontas", quality: "Baixa", price: 45000, description: "Rápido mas com uma pequena fuga de refrigerante. Recomenda-se não voar sobre áreas densamente povoadas." },
    { name: "Airspeeder T-47 (Modelo Civil)", category: "Naves Prontas", quality: "Normal", price: 90000, description: "A versão civil do que viria a ser o 'Snowspeeder' Rebelde. Um veículo atmosférico de dois lugares, rápido e ágil." },
    { name: "Airspeeder T-47 (Boa)", category: "Naves Prontas", quality: "Boa", price: 180000, description: "Um airspeeder fiável para patrulhas atmosféricas ou transporte rápido. Todos os sistemas foram verificados e estão em perfeitas condições." },

    // -- Bombardeiro de Resistência B/SF-17
    { name: "Bombardeiro de Resistência B/SF-17", category: "Naves Prontas", quality: "Excelente", price: 2400000, description: "Um bombardeiro pesado com uma tripulação numerosa e uma enorme carga de bombas de prótons, projetado para ataques estratégicos a naves capitais." },

    // -- Bombardeiro TIE/sa
    { name: "Bombardeiro TIE/sa", category: "Naves Prontas", quality: "Imperial", price: 290000, description: "Um bombardeiro de casco duplo, lento mas resistente, que carrega uma carga útil devastadora de torpedos e bombas." },

    // -- Canhoneira de Patrulha Classe Alpha
    { name: "Canhoneira de Patrulha Classe Alpha", category: "Naves Prontas", quality: "Imperial", price: 700000, description: "Uma nave de ataque rápida e bem armada usada para patrulhas de sistema e missões de perseguição." },

    // -- Canhoneira M22-T Krayt
    { name: "Canhoneira M22-T Krayt (Baixa)", category: "Naves Prontas", quality: "Baixa", price: 150000, description: "Krayt com torre de artilharia travada em uma posição e mísseis de concussão com metade da carga. Ainda útil como nave de transporte armado." },
    { name: "Canhoneira M22-T Krayt (Normal)", category: "Naves Prontas", quality: "Normal", price: 300000, description: "Canhoneira encomendada por Jabba, o Hutt. Quatro canhões laser, torre de artilharia rotativa, mísseis de concussão e espaço para dois passageiros ou prisioneiros." },
    { name: "Canhoneira M22-T Krayt (Boa)", category: "Naves Prontas", quality: "Boa", price: 600000, description: "Krayt com painéis estéticos removidos e substituídos por blindagem adicional. Torre de artilharia com computador de mira dedicado." },
    { name: "Canhoneira M22-T Krayt (Excelente)", category: "Naves Prontas", quality: "Excelente", price: 1200000, description: "Versão com lasers de escala capital na torre, turbolaser leve instalado e compartimento de prisioneiros ampliado. Nave preferida de líderes de cartéis criminosos." },

    // -- Cargueiro de Assalto Classe Gozanti
    { name: "Cargueiro de Assalto Classe Gozanti", category: "Naves Prontas", quality: "Imperial", price: 900000, description: "Uma versão militarizada do cargueiro Gozanti, modificada para transportar caças TIE externamente." },

    // -- Cargueiro Leve VCX-100
    { name: "Cargueiro Leve VCX-100", category: "Naves Prontas", quality: "Excelente", price: 1500000, description: "Famoso por ser a nave 'Ghost'. Uma nave robusta com uma torreta dorsal, compartimentos de carga secretos e espaço para um caça de ataque." },
    { name: "Cargueiro Leve VCX-100 (Ghost)", category: "Naves Prontas", quality: "Lendária", price: 3000000, description: "A nave de uma famosa célula rebelde. Cheia de compartimentos secretos e modificações inesperadas. Vem com um caça de ataque acoplado." },

    // -- Cargueiro Leve YT-1000
    { name: "Cargueiro Leve YT-1000 (O Náufrago) (Exc)", category: "Naves Prontas", quality: "Excelente", price: 1800000, description: "Uma nave antiga encontrada à deriva, com tecnologia desconhecida no seu interior. Os sistemas são alienígenas e imprevisíveis." },
    { name: "Cargueiro Leve YT-1000 (O Náufrago)", category: "Naves Prontas", quality: "Lendária", price: 1800000, description: "Uma nave antiga encontrada à deriva, com tecnologia desconhecida no seu interior. Os sistemas são alienígenas e imprevisíveis." },

    // -- Cargueiro Leve YT-1300
    { name: "Cargueiro Leve YT-1300 (Enferrujado)", category: "Naves Prontas", quality: "Baixa", price: 100000, description: "Esteve em algumas... situações. O cheiro a wookiee molhado no cockpit é cortesia da casa. O hiperpropulsor às vezes engasga." },
    { name: "Cargueiro Leve YT-1300 (Normal)", category: "Naves Prontas", quality: "Normal", price: 200000, description: "Um cargueiro corelliano icónico, famoso pela sua durabilidade e potencial de modificação. O modelo de fábrica é fiável, mas implora por melhorias." },
    { name: "Cargueiro Leve YT-1300 (Boa)", category: "Naves Prontas", quality: "Boa", price: 400000, description: "Um modelo bem conservado, com todos os sistemas a funcionar perfeitamente. Um excelente ponto de partida para qualquer contrabandista." },
    { name: "Cargueiro Leve YT-1300 (Customizado)", category: "Naves Prontas", quality: "Excelente", price: 800000, description: "Um YT-1300 completamente remodelado com motores de nível militar, escudos reforçados e um interior de luxo. Rápido, discreto e confortável." },
    { name: "Cargueiro Leve YT-1300 (Millennium Falcon)", category: "Naves Prontas", quality: "Lendária", price: 1600000, description: "O original. Uma nave lendária que fez a Corrida de Kessel em menos de 12 parsecs. Modificada com sistemas ilegais e um computador com uma personalidade própria." },

    // -- Cargueiro Leve YT-2400
    { name: "Cargueiro Leve YT-2400 (Marcas de Batalha)", category: "Naves Prontas", quality: "Baixa", price: 125000, description: "As marcas de blaster no casco são apenas 'modificações estéticas'. Ignora o alarme do gerador de escudos, ele faz isso o tempo todo." },
    { name: "Cargueiro Leve YT-2400 (Normal)", category: "Naves Prontas", quality: "Normal", price: 250000, description: "Um modelo mais compacto e orientado para o combate que o YT-1300, com um cockpit central e melhor armamento de fábrica. Favorecido por mercenários." },
    { name: "Cargueiro Leve YT-2400 (Boa)", category: "Naves Prontas", quality: "Boa", price: 500000, description: "Um cargueiro rápido e ágil, popular entre mercenários que precisam de uma nave que consiga lutar e fugir." },

    // -- Cargueiro Médio classe YV-666
    { name: "Cargueiro Médio classe YV-666 (Assombrado)", category: "Naves Prontas", quality: "Baixa", price: 135000, description: "A tripulação anterior desapareceu misteriosamente. O dróide de bordo fala de trás para a frente. O preço é negociável." },
    { name: "Cargueiro Médio classe YV-666 (Normal)", category: "Naves Prontas", quality: "Normal", price: 270000, description: "Um cargueiro com um design incomum de cockpit lateral, preferido por caçadores de prémios e mercenários como Bossk." },
    { name: "Cargueiro Médio classe YV-666 (Boa)", category: "Naves Prontas", quality: "Boa", price: 540000, description: "Um cargueiro com um design robusto e um porão de carga espaçoso, em boas condições de funcionamento." },
    { name: "Cargueiro Médio classe YV-666 (Furtivo)", category: "Naves Prontas", quality: "Excelente", price: 1080000, description: "Equipado com um casco que absorve sensores e um sistema de refrigeração silencioso, esta nave é quase um fantasma nos scanners." },
    { name: "Cargueiro Médio classe YV-666 (Hound's Tooth)", category: "Naves Prontas", quality: "Lendária", price: 2160000, description: "A nave do caçador de prémios Bossk. Robusta, feia e cheia de armadilhas para visitantes indesejados. Inclui uma pequena nave de fuga." },

    // -- Carro Nuvem Storm IV
    { name: "Carro Nuvem Storm IV (Com Vibrações)", category: "Naves Prontas", quality: "Baixa", price: 25000, description: "Vibra de forma alarmante acima dos 200 km/h. É aconselhável usar um capacete." },
    { name: "Carro Nuvem Storm IV (Normal)", category: "Naves Prontas", quality: "Normal", price: 50000, description: "Uma nave de patrulha atmosférica de dois lugares usada em gigantes gasosos como Bespin. Não é capaz de viajar no espaço." },
    { name: "Carro Nuvem Storm IV (Boa)", category: "Naves Prontas", quality: "Boa", price: 100000, description: "Um carro nuvem de patrulha de Bespin, em excelente estado. Ideal para segurança ou transporte em cidades flutuantes." },

    // -- Caça Dunelizard G1-M4-C
    { name: "Caça Dunelizard G1-M4-C (Baixa)", category: "Naves Prontas", quality: "Baixa", price: 60000, description: "Dunelizard com canhões de laser danificados e hiperpropulsor instável. Resistente, mas abaixo do desempenho esperado. Popular entre sucateiros por sua facilidade de reparos." },
    { name: "Caça Dunelizard G1-M4-C (Normal)", category: "Naves Prontas", quality: "Normal", price: 120000, description: "Caça médio da MandalMotors. Robusto e fácil de modificar. Vem com canhões laser acoplados e navicomputador básico. Favorito de piratas e contrabandistas pela durabilidade." },
    { name: "Caça Dunelizard G1-M4-C (Boa)", category: "Naves Prontas", quality: "Boa", price: 240000, description: "Dunelizard com entrada para astromecânico instalada e canhões laser substituídos por canhões de íon de maior alcance. Três pontos de instalação livres para modificações." },
    { name: "Caça Dunelizard G1-M4-C (Excelente)", category: "Naves Prontas", quality: "Excelente", price: 480000, description: "Dunelizard Tipo II com asa curta e estreita, hiperpropulsor melhorado e lançador de torpedos de prótons instalado. Escudos aprimorados para combate prolongado." },

    // -- Caça Estelar A-Wing RZ-1
    { name: "Caça Estelar A-Wing RZ-1 (Modelo de Corrida)", category: "Naves Prontas", quality: "Excelente", price: 1100000, description: "Despojado de armas e blindagem em favor de motores super-potentes. Uma das naves mais rápidas da galáxia em voo subluz." },

    // -- Caça Estelar Classe Razor
    { name: "Caça Estelar Classe Razor (Baixa)", category: "Naves Prontas", quality: "Baixa", price: 70000, description: "Razor com escudos praticamente inoperantes e pouco reforço interno. Bom poder de fogo, mas perigoso de voar em combate." },
    { name: "Caça Estelar Classe Razor (Normal)", category: "Naves Prontas", quality: "Normal", price: 140000, description: "Caça da Starypan/SunHui Spaceworks. Bom poder de fogo e velocidade, escudos fracos. Sem copiloto, artilheiro ou entrada para droide." },
    { name: "Caça Estelar Classe Razor (Boa)", category: "Naves Prontas", quality: "Boa", price: 280000, description: "Razor com escudos reforçados e computador de mira aprimorado. Entrada para astromecânico instalada no cockpit. Popular entre forças de segurança corporativas bem equipadas." },
    { name: "Caça Estelar Classe Razor (Excelente)", category: "Naves Prontas", quality: "Excelente", price: 560000, description: "Versão com blindagem adicional, lasers de longo alcance e hiperpropulsor melhorado. Desempenho que justifica o preço para caçadores de recompensas de alto nível." },
    { name: "Caça Estelar Classe Razor (Imperial)", category: "Naves Prontas", quality: "Imperial", price: 1120000, description: "Razor modificado por estaleiro imperial com escudos de VE 35, encriptação de comlink e mísseis de rastreamento. Utilizado por agentes de operações especiais." },
    { name: "Caça Estelar Classe Razor (Lendária)", category: "Naves Prontas", quality: "Lendária", price: 2240000, description: "Razor único sobrevivente de uma série experimental descontinuada. Blindagem experimental, armamento duplo e sistemas de furtividade passiva que confundem sensores imperiais." },

    // -- Caça Estelar T-65 X-wing
    { name: "Caça Estelar T-65 X-wing (Líder Vermelho)", category: "Naves Prontas", quality: "Lendária", price: 1900000, description: "Um X-wing que sobreviveu à corrida da trincheira da Estrela da Morte. Os seus sistemas de mira são lendários e dizem que nunca falham um alvo pequeno." },

    // -- Caça Estelar Z-95
    { name: "Caça Estelar Z-95 (Edição 'Asas Abertas')", category: "Naves Prontas", quality: "Lendária", price: 1440000, description: "Um modelo Z-95 modificado pessoalmente por um ás da Rebelião, com motores e armas que superam muitos caças modernos. Uma peça de história viva." },

    // -- Caça Estelar Z-95 Headhunter
    { name: "Caça Estelar Z-95 Headhunter (Aposentado)", category: "Naves Prontas", quality: "Baixa", price: 90000, description: "Um veterano de guerra com mais horas de voo do que o seu piloto. Os S-foils às vezes não travam na posição correta." },
    { name: "Caça Estelar Z-95 Headhunter (Normal)", category: "Naves Prontas", quality: "Normal", price: 180000, description: "Um precursor do X-wing, este caça é um pouco mais antigo, mas ainda é uma plataforma de combate fiável e acessível." },
    { name: "Caça Estelar Z-95 Headhunter (Boa)", category: "Naves Prontas", quality: "Boa", price: 360000, description: "Um caça reformado, mas totalmente operacional. Uma escolha sólida para pilotos que precisam de uma nave de combate acessível." },
    { name: "Caça Estelar Z-95 Headhunter (Edição de Colecionador)", category: "Naves Prontas", quality: "Excelente", price: 720000, description: "Uma réplica perfeita e totalmente funcional de um Z-95 da era das Guerras Clónicas, restaurado com tecnologia moderna." },

    // -- Caça Mandaloriano 'Dente de Sabre'
    { name: "Caça Mandaloriano 'Dente de Sabre' (Exc)", category: "Naves Prontas", quality: "Excelente", price: 3600000, description: "Um caça ancestral recuperado de uma tumba Mandaloriana, com um design aerodinâmico e mortal que inspirou gerações de naves de guerra." },
    { name: "Caça Mandaloriano 'Dente de Sabre'", category: "Naves Prontas", quality: "Lendária", price: 3600000, description: "Um caça ancestral recuperado de uma tumba Mandaloriana, com um design aerodinâmico e mortal que inspirou gerações de naves de guerra." },

    // -- Caça Pesado M12-L Kimogila
    { name: "Caça Pesado M12-L Kimogila (Baixa)", category: "Naves Prontas", quality: "Baixa", price: 100000, description: "Kimogila com lançador de mísseis com carga reduzida e torpedos de prótons inoperantes. Ainda poderoso nos lasers acoplados, mas versatilidade comprometida." },
    { name: "Caça Pesado M12-L Kimogila (Normal)", category: "Naves Prontas", quality: "Normal", price: 200000, description: "Caça pesado da MandalMotors com quatro lasers acoplados, lançador de mísseis de concussão e tubo de torpedos de prótons. Piloto e artilheiro controlam os torpedos." },
    { name: "Caça Pesado M12-L Kimogila (Boa)", category: "Naves Prontas", quality: "Boa", price: 400000, description: "Kimogila com carga máxima de mísseis e torpedos, escudos aprimorados e entrada para astromecânico. Capaz de bombardeio planetário e combate espacial." },
    { name: "Caça Pesado M12-L Kimogila (Excelente)", category: "Naves Prontas", quality: "Excelente", price: 800000, description: "Versão com blindagem de durânio, canhões laser de escala capital e sistema de detecção de alvos aprimorado. Uma das naves não-imperiais mais temidas da era." },

    // -- Caça Pinook
    { name: "Caça Pinook", category: "Naves Prontas", quality: "Baixa", price: 8000, description: "Pinook em estado deplorável. Lento, mal armado e com motor que falha frequentemente. Útil apenas como isca ou nave de treinamento para pilotos novatos." },

    // -- Caça TIE Defender
    { name: "Caça TIE Defender (Protótipo)", category: "Naves Prontas", quality: "Imperial", price: 1500000, description: "Um caça avançado com escudos, hiperpropulsor e um poder de fogo impressionante. Extremamente raro e caro." },

    // -- Caça TIE/LN
    { name: "Caça TIE/LN", category: "Naves Prontas", quality: "Imperial", price: 120000, description: "O icónico e ágil caça do Império. Rápido, barato de produzir e projetado para sobrecarregar o inimigo com números." },

    // -- Caça/Transporte Classe Kom'rk
    { name: "Caça/Transporte Classe Kom'rk (Remendado)", category: "Naves Prontas", quality: "Baixa", price: 180000, description: "As asas rotativas às vezes prendem. Requer uma pancada no sítio certo para soltar." },
    { name: "Caça/Transporte Classe Kom'rk (Normal)", category: "Naves Prontas", quality: "Normal", price: 360000, description: "De design Mandaloriano, esta nave combina as funções de um transporte de assalto e um caça pesado. Rara de encontrar, mas muito cobiçada." },
    { name: "Caça/Transporte Classe Kom'rk (Boa)", category: "Naves Prontas", quality: "Boa", price: 720000, description: "Uma nave Mandaloriana autêntica, comprada de um clã em tempos de paz. Bem mantida e com armamento funcional." },
    { name: "Caça/Transporte Classe Kom'rk (Gauntlet)", category: "Naves Prontas", quality: "Lendária", price: 2880000, description: "A nave pessoal de um líder Mandalorian. As suas asas rotativas e o seu armamento pesado tornam-na uma força a ser reconhecida em combate." },

    // -- Coração de Reator de Singularidade
    { name: "Coração de Reator de Singularidade (Nave)", category: "Naves Prontas", quality: "Lendária", price: 1900000, description: "Uma fonte de energia experimental que utiliza uma micro-singularidade contida, fornecendo energia quase infinita. Extremamente instável e perigoso." },

    // -- Corveta Corelliana CR90
    { name: "Corveta Corelliana CR90 (Excedente)", category: "Naves Prontas", quality: "Baixa", price: 3500000, description: "Uma antiga nave de guerra que foi 'desmilitarizada'. A maioria dos sistemas de armas foi removida. A maioria." },
    { name: "Corveta Corelliana CR90 (Normal)", category: "Naves Prontas", quality: "Normal", price: 7000000, description: "Conhecida como 'Blockade Runner', esta nave capital versátil pode ser configurada como transporte de tropas, cargueiro ou escolta diplomática." },
    { name: "Corveta Corelliana CR90 (Boa)", category: "Naves Prontas", quality: "Boa", price: 14000000, description: "Uma antiga nave da marinha planetária, convertida para uso civil. Mantém a sua velocidade e robustez." },
    { name: "Corveta Corelliana CR90 (Modelo Diplomático)", category: "Naves Prontas", quality: "Excelente", price: 28000000, description: "Uma CR90 com blindagem espelhada, bloqueadores de sensores avançados e suítes luxuosas para embaixadores. A palavra final em segurança e conforto diplomático." },

    // -- Cruzador Classe Gozanti
    { name: "Cruzador Classe Gozanti (Histórico Duvidoso)", category: "Naves Prontas", quality: "Baixa", price: 190000, description: "Esta nave pertenceu a piratas. Ainda tem algumas... modificações não autorizadas e um mandado de captura ativo em três sistemas." },
    { name: "Cruzador Classe Gozanti (Normal)", category: "Naves Prontas", quality: "Normal", price: 380000, description: "Um cargueiro/cruzador versátil da CEC que pode ser modificado para servir como um porta-aviões leve. Comum entre sindicatos criminosos e frotas de patrulha." },
    { name: "Cruzador Classe Gozanti (Boa)", category: "Naves Prontas", quality: "Boa", price: 760000, description: "Um cargueiro versátil que pode ser adaptado para uma variedade de funções. Este modelo está pronto para voar." },

    // -- Cruzador Classe Interdictor
    { name: "Cruzador Classe Interdictor", category: "Naves Prontas", quality: "Imperial", price: 24000000, description: "Uma nave de apoio especializada com projetores de poço de gravidade para arrancar naves do hiperespaço." },

    // -- Cruzador Leve Classe Arquitens
    { name: "Cruzador Leve Classe Arquitens", category: "Naves Prontas", quality: "Imperial", price: 11000000, description: "Uma nave de comando versátil usada para patrulhas e para liderar pequenas frotas." },

    // -- Célula de Energia de Força Viva
    { name: "Célula de Energia de Força Viva (Tecnologia Ithoriana Nave)", category: "Naves Prontas", quality: "Lendária", price: 80000, description: "Uma bateria orgânica que se regenera lentamente. Uma fusão bizarra e poderosa de tecnologia e natureza." },

    // -- Destróier Estelar Classe Gladiator
    { name: "Destróier Estelar Classe Gladiator", category: "Naves Prontas", quality: "Imperial", price: 30000000, description: "Uma nave capital menor, mas fortemente armada, usada como porta-aviões de patrulha e nave de assalto planetário." },

    // -- Dispositivo de Camuflagem Stygium
    { name: "Dispositivo de Camuflagem Stygium (Protótipo Nave)", category: "Naves Prontas", quality: "Lendária", price: 1000000, description: "Um dispositivo de camuflagem experimental que torna a nave invisível a todos os sensores conhecidos, uma verdadeira arma fantasma." },

    // -- Fragata de Escolta Nebulon-B
    { name: "Fragata de Escolta Nebulon-B", category: "Naves Prontas", quality: "Imperial", price: 17000000, description: "Originalmente projetada para a Marinha Imperial, esta fragata é uma escolta de comboio fiável e pode ser modificada para servir como nave médica." },

    // -- Iate de Corrida 'Estrela Cadente'
    { name: "Iate de Corrida 'Estrela Cadente' (Exc)", category: "Naves Prontas", quality: "Excelente", price: 4000000, description: "Um iate de luxo modificado para corridas ilegais nos Mundos do Núcleo. O seu sistema de propulsão é perigosamente instável, mas incrivelmente rápido." },
    { name: "Iate de Corrida 'Estrela Cadente'", category: "Naves Prontas", quality: "Lendária", price: 4000000, description: "Um iate de luxo modificado para corridas ilegais nos Mundos do Núcleo. O seu sistema de propulsão é perigosamente instável, mas incrivelmente rápido." },

    // -- Iate de Luxo Nubian H-Type
    { name: "Iate de Luxo Nubian H-Type", category: "Naves Prontas", quality: "Excelente", price: 5000000, description: "O mesmo modelo usado pela realeza de Naboo. O epítome da elegância e do design, com um exterior cromado e tecnologia de ponta." },
    { name: "Iate de Luxo Nubian H-Type (Nave da Rainha)", category: "Naves Prontas", quality: "Lendária", price: 7200000, description: "A antiga nave real de Naboo, com um exterior de cromo puro e um hiperpropulsor T-14 que era um protótipo na sua época. A elegância encontra a velocidade." },

    // -- Iate Espacial 3000
    { name: "Iate Espacial 3000 (Ex-Propriedade de um Hutt)", category: "Naves Prontas", quality: "Baixa", price: 450000, description: "O interior é pegajoso e cheira a especiarias ilegais. Vem com um compartimento de contrabando que nem o dono anterior sabia que existia." },
    { name: "Iate Espacial 3000 (Normal)", category: "Naves Prontas", quality: "Normal", price: 900000, description: "Uma elegante nave de luxo para os ricos e famosos, com interiores opulentos e um design aerodinâmico." },
    { name: "Iate Espacial 3000 (Boa)", category: "Naves Prontas", quality: "Boa", price: 1800000, description: "Um iate de luxo de um proprietário anterior cuidadoso. O interior está impecável e os motores foram afinados." },

    // -- Iate Espacial 3000 de Luxo
    { name: "Iate Espacial 3000 de Luxo", category: "Naves Prontas", quality: "Excelente", price: 3600000, description: "O auge do luxo pessoal. Equipado com piscina, spa, um bar completo e os mais avançados sistemas de entretenimento." },

    // -- Iate Pessoal do Diretor Krennic
    { name: "Iate Pessoal do Diretor Krennic", category: "Naves Prontas", quality: "Imperial", price: 2000000, description: "Uma nave de transporte classe Delta modificada, com um design angular e ameaçador, blindagem preta e sistemas de comunicação avançados." },

    // -- Iate Pessoal SoroSuub 3000
    { name: "Iate Pessoal SoroSuub 3000", category: "Naves Prontas", quality: "Excelente", price: 3000000, description: "Um iate de luxo mais discreto que o Nubian, mas igualmente bem equipado, com foco em segurança pessoal e conforto." },

    // -- Interceptor TIE/IN
    { name: "Interceptor TIE/IN", category: "Naves Prontas", quality: "Imperial", price: 240000, description: "Uma versão mais rápida e mais bem armada do TIE padrão, projetada para duelos com os melhores caças da Rebelião." },

    // -- Landspeeder V-35 Courier
    { name: "Landspeeder V-35 Courier (Restaurado)", category: "Naves Prontas", quality: "Excelente", price: 100000, description: "Um clássico landspeeder, restaurado à sua glória original com um motor moderno e um interior de couro de bantha." },

    // -- Landspeeder X-34
    { name: "Landspeeder X-34 (Remendado)", category: "Naves Prontas", quality: "Baixa", price: 10500, description: "Várias partes são de cores diferentes, e o motor faz um barulho que lembra um gundark com dor de estômago." },
    { name: "Landspeeder X-34 (Normal)", category: "Naves Prontas", quality: "Normal", price: 21000, description: "Um speeder civil comum, com um cockpit aberto para dois passageiros e um pequeno compartimento de carga. Perfeito para atravessar desertos e planícies." },
    { name: "Landspeeder X-34 (Boa)", category: "Naves Prontas", quality: "Boa", price: 42000, description: "Um modelo do ano anterior em excelente estado, com baixa quilometragem e pintura nova." },

    // -- Matriz de Cristal de Superlaser
    { name: "Matriz de Cristal de Superlaser (Fragmento Nave)", category: "Naves Prontas", quality: "Lendária", price: 2400000, description: "Um fragmento funcional de um dos cristais de foco da Estrela da Morte, capaz de amplificar qualquer arma de energia a níveis aterradores." },

    // -- Moto Speeder 74-Z
    { name: "Moto Speeder 74-Z (Instável)", category: "Naves Prontas", quality: "Baixa", price: 6750, description: "Perdeu alguns parafusos, mas atinge velocidades impressionantes. A direção é um pouco... sugestiva." },
    { name: "Moto Speeder 74-Z (Normal)", category: "Naves Prontas", quality: "Normal", price: 13500, description: "Um veículo repulsorlift rápido e manobrável, ideal para reconhecimento e patrulha. A versão civil não vem com armas de fábrica." },
    { name: "Moto Speeder 74-Z (Boa)", category: "Naves Prontas", quality: "Boa", price: 27000, description: "Uma moto speeder rápida e bem mantida, perfeita para batedores ou para quem gosta de velocidade." },

    // -- Módulo de Salto Cego
    { name: "Módulo de Salto Cego (Navegação Chiss Nave)", category: "Naves Prontas", quality: "Lendária", price: 700000, description: "Permite saltos hiperespaciais curtos e precisos sem a necessidade de uma rota pré-calculada, uma vantagem tática inestimável." },

    // -- Nave de Assalto TIE Reaper
    { name: "Nave de Assalto TIE Reaper", category: "Naves Prontas", quality: "Imperial", price: 640000, description: "Um transporte de tropas atmosférico projetado para desdobrar tropas de elite, como os Death Troopers, em zonas de combate intenso." },

    // -- Nave de Ataque Rápido Classe Ixiyen
    { name: "Nave de Ataque Rápido Classe Ixiyen (Baixa)", category: "Naves Prontas", quality: "Baixa", price: 80000, description: "Ixiyen com escudos fracos e mísseis de concussão com apenas metade da carga. Rápida, mas sem autonomia para combate prolongado. Usada como nave de patrulha descartável." },
    { name: "Nave de Ataque Rápido Classe Ixiyen (Normal)", category: "Naves Prontas", quality: "Normal", price: 160000, description: "Caça da TransGalMeg com blindagem e escudos pesados. Projetada para oposição a caças estelares com assaltos frontais brutais. Sem entradas para droides ou artilheiros." },
    { name: "Nave de Ataque Rápido Classe Ixiyen (Boa)", category: "Naves Prontas", quality: "Boa", price: 320000, description: "Ixiyen com carga completa de mísseis de concussão e sistemas de mira aprimorados. Escudos reforçados para engajamentos prolongados." },
    { name: "Nave de Ataque Rápido Classe Ixiyen (Excelente)", category: "Naves Prontas", quality: "Excelente", price: 640000, description: "Versão com entrada para droide astromecânico instalada e lançador de torpedos de prótons adicionado. Autonomia de combate significativamente aumentada." },
    { name: "Nave de Ataque Rápido Classe Ixiyen (Lendária)", category: "Naves Prontas", quality: "Lendária", price: 2560000, description: "Protótipo único com modificações experimentais acumuladas por anos de operação. Escudos de VE 40, armamento pesado e computador de mira de última geração." },

    // -- Nave de Desembarque Classe Lambda T-4a
    { name: "Nave de Desembarque Classe Lambda T-4a", category: "Naves Prontas", quality: "Imperial", price: 480000, description: "A elegante e distinta nave de transporte usada por oficiais de alta patente, incluindo Darth Vader e o próprio Imperador." },

    // -- Nave de Desembarque Classe Sentinel
    { name: "Nave de Desembarque Classe Sentinel (Com Odor)", category: "Naves Prontas", quality: "Baixa", price: 240000, description: "Usada anteriormente para transportar gado. O cheiro é persistente, mas o espaço de carga é generoso." },
    { name: "Nave de Desembarque Classe Sentinel (Normal)", category: "Naves Prontas", quality: "Normal", price: 480000, description: "Embora de design Imperial, modelos mais antigos são frequentemente vendidos como excedente militar. É uma nave de transporte pesada, blindada e bem armada." },
    { name: "Nave de Desembarque Classe Sentinel (Boa)", category: "Naves Prontas", quality: "Boa", price: 960000, description: "Versão civil de um transporte militar, com o compartimento de tropas convertido num espaçoso porão de carga." },
    { name: "Nave de Desembarque Classe Sentinel (Comando Móvel)", category: "Naves Prontas", quality: "Excelente", price: 1920000, description: "Convertida numa base de operações móvel, com um centro de comando avançado, oficina de dróides e alojamentos para uma pequena tripulação de elite." },

    // -- Nave de Patrulha Firespray-31
    { name: "Nave de Patrulha Firespray-31 (Modelo de Caça)", category: "Naves Prontas", quality: "Excelente", price: 1200000, description: "Uma versão modificada para ser uma plataforma de caça a prémios de elite, com sistemas de rastreamento avançados, celas de prisioneiros e armamento pesado oculto." },

    // -- Nave de Patrulha Imperial Classe Raider
    { name: "Nave de Patrulha Imperial Classe Raider", category: "Naves Prontas", quality: "Imperial", price: 12000000, description: "Uma corveta anti-caça rápida e ágil, projetada especificamente para caçar e destruir esquadrões de caças rebeldes." },

    // -- Nave de Patrulha Skipray Blastboat
    { name: "Nave de Patrulha Skipray Blastboat (Desarmada)", category: "Naves Prontas", quality: "Baixa", price: 160000, description: "Todos os sistemas de armas foram removidos. Agora é apenas uma nave muito lenta e com um nome intimidante." },
    { name: "Nave de Patrulha Skipray Blastboat (Normal)", category: "Naves Prontas", quality: "Normal", price: 320000, description: "Uma canhoneira pesada e bem armada, com asas que se dobram para aterragem e ataque. Popular entre forças de segurança privadas." },
    { name: "Nave de Patrulha Skipray Blastboat (Boa)", category: "Naves Prontas", quality: "Boa", price: 640000, description: "Uma canhoneira bem equipada, com todos os sistemas de armas calibrados e prontos para o combate." },
    { name: "Nave de Patrulha Skipray Blastboat (Modelo de Assalto)", category: "Naves Prontas", quality: "Excelente", price: 1280000, description: "Modificado com torpedos de prótons e canhões iônicos, transformando esta já potente canhoneira numa verdadeira destruidora de naves capitais." },
    { name: "Nave de Patrulha Skipray Blastboat (Assalto Pesado)", category: "Naves Prontas", quality: "Lendária", price: 2560000, description: "Uma canhoneira com um canhão turbolaser modificado, retirado de uma fragata. Capaz de perfurar a blindagem de um cruzador." },

    // -- Nave-Laboratório Arkaniana
    { name: "Nave-Laboratório Arkaniana (Exc)", category: "Naves Prontas", quality: "Excelente", price: 4400000, description: "Uma nave de pesquisa com laboratórios médicos e de engenharia de ponta, capaz de criar novas tecnologias ou curar doenças raras." },
    { name: "Nave-Laboratório Arkaniana", category: "Naves Prontas", quality: "Lendária", price: 4400000, description: "Uma nave de pesquisa com laboratórios médicos e de engenharia de ponta, capaz de criar novas tecnologias ou curar doenças raras." },

    // -- Plataforma de Armas Móvel TIE Mauler
    { name: "Plataforma de Armas Móvel TIE Mauler", category: "Naves Prontas", quality: "Imperial", price: 130000, description: "Um pequeno tanque com esteiras, armado com canhões laser, projetado para apoio à infantaria em terreno difícil." },

    // -- Sistema de Controle de Enxame de Dróides
    { name: "Sistema de Controle de Enxame de Dróides (Nave)", category: "Naves Prontas", quality: "Lendária", price: 360000, description: "Permite que um único piloto controle uma pequena esquadra de caças dróides como uma extensão de sua própria nave." },

    // -- Tanque de Assalto Flutuante
    { name: "Tanque de Assalto Flutuante (AAT) (Sucata de Guerra)", category: "Naves Prontas", quality: "Baixa", price: 65000, description: "Um veterano das Guerras Clónicas. Metade dos sistemas não funciona e tem um buraco no casco, mas ainda intimida." },
    { name: "Tanque de Assalto Flutuante (AAT) (Normal)", category: "Naves Prontas", quality: "Normal", price: 130000, description: "Um tanque repulsorlift Separatista das Guerras Clónicas, agora vendido como excedente. É lento, mas fortemente armado e blindado." },
    { name: "Tanque de Assalto Flutuante (AAT) (Boa)", category: "Naves Prontas", quality: "Boa", price: 260000, description: "Um tanque Separatista capturado e desmilitarizado, mas com a blindagem e os motores em excelente estado." },

    // -- Tanque de Assalto Flutuante TX-225 'Occupier'
    { name: "Tanque de Assalto Flutuante TX-225 'Occupier'", category: "Naves Prontas", quality: "Imperial", price: 190000, description: "Um tanque repulsorlift fortemente blindado usado para patrulhas de combate e ocupação de cidades." },

    // -- Transporte de Assalto AT-AT
    { name: "Transporte de Assalto AT-AT", category: "Naves Prontas", quality: "Imperial", price: 900000, description: "O imponente andador de quatro pernas usado para esmagar as defesas rebeldes. Uma arma de terror psicológico." },

    // -- Transporte de Carga A granel Classe Barloz
    { name: "Transporte de Carga A granel Classe Barloz (Lento)", category: "Naves Prontas", quality: "Baixa", price: 60000, description: "Já era lento quando novo. Agora, é ultrapassado por banthas coxos. Mas chega lá. Eventualmente." },
    { name: "Transporte de Carga A granel Classe Barloz (Normal)", category: "Naves Prontas", quality: "Normal", price: 120000, description: "Uma nave lenta, feia e puramente funcional, projetada para transportar grandes quantidades de carga e nada mais. Um verdadeiro 'tijolo espacial'." },
    { name: "Transporte de Carga A granel Classe Barloz (Boa)", category: "Naves Prontas", quality: "Boa", price: 240000, description: "Um cargueiro sem frescuras, mas com um motor recondicionado e casco reforçado. Transporta muito por pouco." },

    // -- Transporte de Carga Imperial
    { name: "Transporte de Carga Imperial", category: "Naves Prontas", quality: "Imperial", price: 180000, description: "Um cargueiro padrão, sem armas, usado para transportar suprimentos entre as bases imperiais. Lento e com blindagem leve." },

    // -- Transporte de Carga Médio Ghtroc 720
    { name: "Transporte de Carga Médio Ghtroc 720 (Enferrujado)", category: "Naves Prontas", quality: "Baixa", price: 85000, description: "A ferrugem é estrutural, mas o porão de carga é enorme. Perfeito para transportar coisas... discretamente." },
    { name: "Transporte de Carga Médio Ghtroc 720 (Normal)", category: "Naves Prontas", quality: "Normal", price: 170000, description: "Apelidado de 'Ave de Guerra', este cargueiro é lento e desajeitado, mas espaçoso e com um casco resistente." },
    { name: "Transporte de Carga Médio Ghtroc 720 (Boa)", category: "Naves Prontas", quality: "Boa", price: 340000, description: "Um 'cavalo de batalha' do espaço. Lento, mas com uma capacidade de carga impressionante e um casco que aguenta o tranco." },

    // -- Transporte de Patrulha Firespray-31
    { name: "Transporte de Patrulha Firespray-31 (Empenhado)", category: "Naves Prontas", quality: "Baixa", price: 150000, description: "Recuperado de um... incidente. O sistema de rotação do cockpit é um pouco lento, mas funciona. Geralmente." },
    { name: "Transporte de Patrulha Firespray-31 (Normal)", category: "Naves Prontas", quality: "Normal", price: 300000, description: "Uma nave de patrulha e ataque robusta, com um design vertical único. A sua versatilidade torna-a uma escolha popular para caçadores de prémios e agentes da lei." },
    { name: "Transporte de Patrulha Firespray-31 (Boa)", category: "Naves Prontas", quality: "Boa", price: 600000, description: "Uma nave de patrulha excedente, fiável e com um historial de serviço limpo. Pronta para qualquer trabalho." },
    { name: "Transporte de Patrulha Firespray-31 (Slave I)", category: "Naves Prontas", quality: "Lendária", price: 2400000, description: "A infame nave de Jango e Boba Fett. Carregada com um arsenal oculto, sistemas de rastreamento avançados e um histórico de capturas bem-sucedidas." },

    // -- Transporte de Reconhecimento AT-ST
    { name: "Transporte de Reconhecimento AT-ST", category: "Naves Prontas", quality: "Imperial", price: 360000, description: "O 'andador de galinha' de duas pernas, um veículo de reconhecimento rápido e de apoio à infantaria." },

    // -- Transporte de Tropas Imperial
    { name: "Transporte de Tropas Imperial", category: "Naves Prontas", quality: "Imperial", price: 160000, description: "Um veículo repulsorlift blindado usado para desdobrar rapidamente esquadrões de stormtroopers em zonas de combate." },

    // -- Transporte GR-75
    { name: "Transporte GR-75 (Baixa)", category: "Naves Prontas", quality: "Baixa", price: 400000, description: "GR-75 com dois dos quatro motores de íon inoperantes e capacidade de carga reduzida a 40%. Lento demais para ser eficaz, mas ainda transporta suprimentos básicos." },
    { name: "Transporte GR-75 (Normal)", category: "Naves Prontas", quality: "Normal", price: 2000000, description: "Transporte médio da Gallofree Yards amplamente usado. Alta capacidade de carga, grande variedade de módulos intercambiáveis e manutenção simples. Sem armamento padrão." },
    { name: "Transporte GR-75 (Boa)", category: "Naves Prontas", quality: "Boa", price: 4000000, description: "GR-75 com canhões laser defensivos instalados, escudos básicos e capacidade de carga expandida em 30%. Popular entre grandes grupos como transporte de suprimentos armado." },
    { name: "Transporte GR-75 (Excelente)", category: "Naves Prontas", quality: "Excelente", price: 8000000, description: "Versão com hangar para dois caças, sensores aprimorados e módulo hospitalar de campo instalado. Serve como base móvel para operações de pequena escala." },

    // -- Transporte Leve G-1A
    { name: "Transporte Leve G-1A (Barulhento)", category: "Naves Prontas", quality: "Baixa", price: 75000, description: "O motor faz um som agudo e irritante. Os vizinhos não vão gostar, mas pelo menos vão saber que chegou." },
    { name: "Transporte Leve G-1A (Normal)", category: "Naves Prontas", quality: "Normal", price: 150000, description: "Um transporte de longo alcance com uma aparência distinta, conhecido por sua robustez e capacidade de carga decente para seu tamanho." },
    { name: "Transporte Leve G-1A (Boa)", category: "Naves Prontas", quality: "Boa", price: 300000, description: "Conhecido pela sua fiabilidade, este modelo está em ótimas condições e é perfeito para longas viagens pela Orla." },

    // -- Transporte Pessoal classe Wayfarer
    { name: "Transporte Pessoal classe Wayfarer (Infestado)", category: "Naves Prontas", quality: "Baixa", price: 110000, description: "Vem com uma colónia de rastejadores de mynock nos sistemas de ventilação. Eles são inofensivos. Na maioria das vezes." },
    { name: "Transporte Pessoal classe Wayfarer (Normal)", category: "Naves Prontas", quality: "Normal", price: 220000, description: "Um 'lar longe de casa' para comerciantes e exploradores, este transporte modular possui alojamentos confortáveis e uma grande capacidade de carga." },
    { name: "Transporte Pessoal classe Wayfarer (Boa)", category: "Naves Prontas", quality: "Boa", price: 440000, description: "Um transporte confortável e fiável, perfeito para uma família ou um pequeno grupo de aventureiros." },
    { name: "Transporte Pessoal classe Wayfarer (O Explorador) (Exc)", category: "Naves Prontas", quality: "Excelente", price: 1760000, description: "Esta nave mapeou setores inteiros das Regiões Desconhecidas. O seu navicomputador contém dados estelares de valor incalculável." },
    { name: "Transporte Pessoal classe Wayfarer (O Explorador)", category: "Naves Prontas", quality: "Lendária", price: 1760000, description: "Esta nave mapeou setores inteiros das Regiões Desconhecidas. O seu navicomputador contém dados estelares de valor incalculável." },

    // -- V-19 Torrent
    { name: "V-19 Torrent (Baixa)", category: "Naves Prontas", quality: "Baixa", price: 80000, description: "Torrent pós-guerra com asas dobráveis travadas em posição aberta e motor principal com potência reduzida. Ainda tem torpedos de prótons funcionais." },
    { name: "V-19 Torrent (Normal)", category: "Naves Prontas", quality: "Normal", price: 160000, description: "Caça clone da era da República com asas dobráveis para facilitar armazenamento. Dois canhões laser, dois tubos de torpedos de prótons e boa blindagem para sua classe." },
    { name: "V-19 Torrent (Boa)", category: "Naves Prontas", quality: "Boa", price: 320000, description: "Torrent com escudos instalados e canhões laser aprimorados. As asas dobráveis permitem armazenamento em hangares compactos." },
    { name: "V-19 Torrent (Excelente)", category: "Naves Prontas", quality: "Excelente", price: 640000, description: "Versão com hiperpropulsor instalado e sistema de torpedos de prótons de guia a laser. Desempenho surpreendente para um design de guerra clone." },
    { name: "V-19 Torrent (Imperial)", category: "Naves Prontas", quality: "Imperial", price: 1280000, description: "Torrent capturado e modernizado com sistemas imperiais. Encriptação, escudos de VE 30 e canhões laser pesados. Usado como nave de coleta ou operações discretas." },
    { name: "V-19 Torrent (Lendária)", category: "Naves Prontas", quality: "Lendária", price: 5120000, description: "Único Torrent original que voou com os Clones na Batalha de Coruscant. Relíquia de guerra com modificações históricas e valor inestimável para colecionadores." },

    // --- PEÇAS DE DRÓIDES ---

    // -- Apêndice
    { name: "Apêndice (Mão Tremida)", category: "Peças de Dróides", quality: "Baixa", price: 100, description: "A mão tem um leve tremor. Boa para misturar bebidas, péssima para desarmar bombas." },
    { name: "Apêndice (Garra Enferrujada)", category: "Peças de Dróides", quality: "Baixa", price: 40, description: "A articulação está um pouco rígida e a ferrugem deixa manchas. Não tente pegar nada muito delicado. Ou branco." },
    { name: "Apêndice (Ferramenta Torta)", category: "Peças de Dróides", quality: "Baixa", price: 20, description: "A ferramenta, seja ela qual for, está um pouco torta. Ainda funciona, mas requer um ângulo criativo para usar." },
    { name: "Apêndice (Mão) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 200, description: "Apêndice com pelo menos três dígitos, um dos quais é opositor." },
    { name: "Apêndice (Garra) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 80, description: "Garra padrão para segurar e manipular objetos." },
    { name: "Apêndice (Ferramenta) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 40, description: "Apêndice com uma ferramenta específica instalada." },
    { name: "Apêndice (Mão) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 400, description: "Uma mão padrão com boa destreza para a maioria das tarefas de manipulação." },
    { name: "Apêndice (Garra) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 160, description: "Uma garra robusta com boa força de preensão." },
    { name: "Apêndice (Ferramenta) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 80, description: "Um apêndice com uma ferramenta de qualidade instalada, como um cortador de fusão." },
    { name: "Apêndice (Mão de Cirurgião) (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 600, description: "Uma mão cibernética com estabilizadores internos e sensibilidade tátil superior, capaz de realizar as tarefas mais delicadas." },
    { name: "Apêndice (Garra de Titânio) (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 240, description: "Uma garra poderosa e leve, capaz de segurar objetos com uma força incrível sem adicionar peso desnecessário ao dróide." },
    { name: "Apêndice (Ferramenta de Precisão) (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 120, description: "Um apêndice que abriga uma ferramenta de diagnóstico ou reparo de alta precisão, como um soldador a laser microfocado." },
    { name: "Apêndice (Garra de Contenção)", category: "Peças de Dróides", quality: "Imperial", price: 320, description: "Garra de contenção usada por dróides de segurança para prender suspeitos com força máxima." },
    { name: "Apêndice (Injetor de Soro da Verdade)", category: "Peças de Dróides", quality: "Imperial", price: 10000, description: "Um apêndice do dróide de interrogatório IT-O, capaz de administrar soros da verdade e outras drogas." },
    { name: "Apêndice (Mão de Cirurgião)", category: "Peças de Dróides", quality: "Lendária", price: 1600, description: "Uma mão com ferramentas cirúrgicas integradas, capaz de realizar operações complexas sem a necessidade de um kit médico." },
    { name: "Apêndice (Garra de Titânio)", category: "Peças de Dróides", quality: "Lendária", price: 640, description: "Uma garra que pode esmagar Durasteel ou manipular objetos delicados com a mesma facilidade." },
    { name: "Apêndice (Ferramenta de Precisão)", category: "Peças de Dróides", quality: "Lendária", price: 320, description: "Um apêndice que contém um conjunto completo de ferramentas de arrombamento de alta tecnologia." },

    // -- Bateria Secundária
    { name: "Bateria Secundária (Viciada)", category: "Peças de Dróides", quality: "Baixa", price: 400, description: "Dura a metade do tempo prometido e demora o dobro para carregar." },
    { name: "Bateria Secundária (Normal)", category: "Peças de Dróides", quality: "Normal", price: 800, description: "Permite ao dróide operar pelo dobro do tempo normal." },
    { name: "Bateria Secundária (Boa)", category: "Peças de Dróides", quality: "Boa", price: 1600, description: "Uma bateria de apoio de alta capacidade que dobra a autonomia operacional do dróide." },
    { name: "Bateria Secundária (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 2400, description: "Uma fonte de energia de reserva compacta e de alta densidade, garantindo que o dróide permaneça operacional." },
    { name: "Bateria Secundária", category: "Peças de Dróides", quality: "Lendária", price: 6400, description: "Uma fonte de energia de reserva compacta e de alta densidade, garantindo que o dróide permaneça operacional." },

    // -- Blaster Oculto de Pulso
    { name: "Blaster Oculto de Pulso", category: "Peças de Dróides", quality: "Imperial", price: 9000, description: "Uma blaster de pulso compacta escondida dentro do chassi do dróide, uma surpresa mortal para qualquer inimigo." },

    // -- Blindagem
    { name: "Blindagem (Dróide Dark Trooper)", category: "Peças de Dróides", quality: "Imperial", price: 50000, description: "Blindagem de nível de protótipo usada nos Dark Troopers, quase impenetrável a armas de pequeno porte." },
    { name: "Blindagem (Dróide de Segurança Série KX)", category: "Peças de Dróides", quality: "Imperial", price: 18000, description: "Blindagem reforçada para dróides de segurança, projetada para suportar motins e ataques de pequena escala." },

    // -- Blindagem de Duraço
    { name: "Blindagem de Duraço (Reciclada)", category: "Peças de Dróides", quality: "Baixa", price: 4000, description: "Esta blindagem já protegeu pelo menos três dróides antes deste. Os buracos de blaster foram remendados com... algo." },
    { name: "Blindagem de Duraço (Normal)", category: "Peças de Dróides", quality: "Normal", price: 7200, description: "Armadura leve que oferece proteção aprimorada." },
    { name: "Blindagem de Duraço (Boa)", category: "Peças de Dróides", quality: "Boa", price: 14400, description: "Armadura que oferece proteção significativamente maior que os modelos básicos." },

    // -- Blindagem de Duraço Laminado
    { name: "Blindagem de Duraço Laminado (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 21600, description: "Placas de duraço tratadas e laminadas para máxima resistência ao impacto e dissipação de energia." },
    { name: "Blindagem de Duraço Laminado", category: "Peças de Dróides", quality: "Lendária", price: 57600, description: "Uma blindagem de dróide que foi tratada com a mesma técnica usada em naves capitais, oferecendo proteção sem precedentes." },

    // -- Chassi de Liga de Phrik
    { name: "Chassi de Liga de Phrik", category: "Peças de Dróides", quality: "Lendária", price: 160000, description: "O corpo inteiro do dróide é feito de uma liga resistente a sabres de luz, tornando-o um oponente formidável." },

    // -- Injetor de Veneno de Kouhun
    { name: "Injetor de Veneno de Kouhun", category: "Peças de Dróides", quality: "Lendária", price: 70000, description: "Um apêndice oculto que pode injetar o veneno mortal dos artrópodes de Indona, uma arma silenciosa e temida." },

    // -- Kit de Reparos para Campo
    { name: "Kit de Reparos para Campo", category: "Peças de Dróides", quality: "Imperial", price: 2400, description: "Um kit de ferramentas interno que permite ao dróide realizar reparos de emergência em outros dróides e veículos imperiais." },

    // -- Lâmina de Vibro-faca
    { name: "Lâmina de Vibro-faca", category: "Peças de Dróides", quality: "Imperial", price: 3000, description: "Uma vibro-lâmina retrátil escondida no braço do dróide, para encontros de combate próximos e pessoais." },

    // -- Matriz de Cristal de Memória Kyber
    { name: "Matriz de Cristal de Memória Kyber", category: "Peças de Dróides", quality: "Lendária", price: 300000, description: "Um cristal raro usado em sabres de luz, modificado para armazenar a consciência de um dróide, tornando-o efetivamente imortal." },

    // -- Módulo de Comunicações Criptografadas
    { name: "Módulo de Comunicações Criptografadas", category: "Peças de Dróides", quality: "Imperial", price: 6000, description: "Um módulo que criptografa todas as transmissões do dróide com os códigos mais recentes do Império." },

    // -- Módulo de Interrogação
    { name: "Módulo de Interrogação (Dróide IT-O)", category: "Peças de Dróides", quality: "Imperial", price: 20000, description: "Um conjunto de ferramentas e dispositivos de tortura projetados para extrair informações de prisioneiros." },

    // -- Módulo de Transferência de Consciência
    { name: "Módulo de Transferência de Consciência (Protótipo)", category: "Peças de Dróides", quality: "Lendária", price: 500000, description: "Tecnologia Arkaniana experimental que permite ao dróide transferir sua programação para qualquer outro sistema computadorizado." },

    // -- Módulo de Visão no Escuro
    { name: "Módulo de Visão no Escuro (Com Estática)", category: "Peças de Dróides", quality: "Baixa", price: 160, description: "Vê no escuro, mas com uma leve 'neve' na imagem, como uma holotransmissão antiga." },
    { name: "Módulo de Visão no Escuro (Dróide) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 300, description: "Permite ao dróide ignorar a escuridão." },
    { name: "Módulo de Visão no Escuro (Dróide) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 600, description: "Um sistema de visão noturna que permite ao dróide enxergar perfeitamente na escuridão total." },

    // -- Módulo de Visão no Escuro Espectral
    { name: "Módulo de Visão no Escuro Espectral", category: "Peças de Dróides", quality: "Excelente", price: 900, description: "Não apenas vê na escuridão, mas também em espectros infravermelho e ultravioleta, não deixando lugar para se esconder." },

    // -- Núcleo de Processamento de Batalha HK
    { name: "Núcleo de Processamento de Batalha HK (Reativado)", category: "Peças de Dróides", quality: "Lendária", price: 400000, description: "O processador de um infame dróide assassino da Antiga República, reativado e pronto para servir a um novo mestre." },

    // -- Pacote de Diagnósticos
    { name: "Pacote de Diagnósticos (Pessimista)", category: "Peças de Dróides", quality: "Baixa", price: 240, description: "Sempre diagnostica o pior cenário possível. 'Seu dróide não está apenas com um fusível queimado, ele está contemplando o vazio existencial.'" },
    { name: "Pacote de Diagnósticos (Normal)", category: "Peças de Dróides", quality: "Normal", price: 500, description: "Concede um bônus em testes de Mecânica." },
    { name: "Pacote de Diagnósticos (Boa)", category: "Peças de Dróides", quality: "Boa", price: 1000, description: "Um conjunto confiável de ferramentas de diagnóstico para manutenção regular." },
    { name: "Pacote de Diagnósticos (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 1500, description: "Ferramentas de diagnóstico de ponta que podem identificar falhas em nível subatômico." },

    // -- Pacote de Sensores
    { name: "Pacote de Sensores (Dróide Sonda Viper)", category: "Peças de Dróides", quality: "Imperial", price: 1600, description: "Pacote de sensores do dróide sonda Viper, projetado para rastrear sinais de vida e comunicações rebeldes." },

    // -- Pacote de Sensores Aprimorados
    { name: "Pacote de Sensores Aprimorados (Danificado)", category: "Peças de Dróides", quality: "Baixa", price: 200, description: "A visão na penumbra funciona, mas o sensor de movimento dispara com o vento." },
    { name: "Pacote de Sensores Aprimorados (Dróide) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 400, description: "Concede um bônus em testes de Percepção e visão na penumbra." },
    { name: "Pacote de Sensores Aprimorados (Dróide) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 800, description: "Concede ao dróide um bônus de equipamento em testes de Percepção e visão na penumbra." },
    { name: "Pacote de Sensores Aprimorados (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 1200, description: "Sensores de nível de reconhecimento militar, capazes de detectar as menores flutuações de energia e movimento." },
    { name: "Pacote de Sensores Aprimorados", category: "Peças de Dróides", quality: "Lendária", price: 3200, description: "Um pacote de sensores que pode detectar a assinatura da Força, alertando sobre a presença de Jedi ou Sith." },

    // -- Pino de Contenção
    { name: "Pino de Contenção (Trocado)", category: "Peças de Dróides", quality: "Baixa", price: 4, description: "Um pino de contenção genérico. Não se surpreenda se o dróide começar a seguir um compactador de lixo aleatório em vez de você." },
    { name: "Pino de Contenção (Normal)", category: "Peças de Dróides", quality: "Normal", price: 10, description: "Desliga o impulso motor de um dróide." },
    { name: "Pino de Contenção (Boa)", category: "Peças de Dróides", quality: "Boa", price: 20, description: "Pino de contenção de fabricação oficial." },
    { name: "Pino de Contenção (Codificado) (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 30, description: "Um pino de contenção que só pode ser removido com um código de segurança específico." },
    { name: "Pino de Contenção (Nível Militar)", category: "Peças de Dróides", quality: "Imperial", price: 40, description: "Pino de contenção de nível militar, impossível de ser removido sem as ferramentas e códigos corretos." },
    { name: "Pino de Contenção (Codificado)", category: "Peças de Dróides", quality: "Lendária", price: 80, description: "Um pino de contenção que só pode ser removido com um código de segurança específico." },

    // -- Placa de Casco
    { name: "Placa de Casco (Plástico de Aço com adesivo)", category: "Peças de Dróides", quality: "Baixa", price: 900, description: "Alguns arranhões e um adesivo de uma banda antiga que ninguém mais ouve." },
    { name: "Placa de Casco (Plástico de Aço) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 1600, description: "Blindagem leve padrão que oferece proteção básica." },
    { name: "Placa de Casco (Plástico de Aço) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 3200, description: "Blindagem leve e resistente, um bom upgrade para qualquer dróide de serviço." },
    { name: "Placa de Casco (Plástico de Aço) (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 4800, description: "Blindagem leve, porém surpreendentemente resistente, tratada para dissipar disparos de blaster." },

    // -- Processador Básico
    { name: "Processador Básico (Lento)", category: "Peças de Dróides", quality: "Baixa", price: 500, description: "Executa as tarefas, eventualmente. Há um pequeno atraso entre o comando e a ação. Não use em situações de vida ou morte." },
    { name: "Processador Básico (Dróide) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 1000, description: "Programado para tarefas específicas, interpreta instruções literalmente." },
    { name: "Processador Básico (Dróide) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 2000, description: "Um processador básico de alta velocidade, executando suas tarefas programadas com eficiência e sem erros." },
    { name: "Processador Básico (Dróide de Batalha)", category: "Peças de Dróides", quality: "Imperial", price: 4000, description: "Processador básico de alta velocidade, usado em dróides de batalha e de segurança para execução de ordens sem questionamento." },

    // -- Processador Básico de Nível Executivo
    { name: "Processador Básico de Nível Executivo", category: "Peças de Dróides", quality: "Excelente", price: 3000, description: "Mesmo sendo básico, este processador opera com velocidade e confiabilidade impecáveis, livre de falhas ou atrasos. Ideal para dróides de serviço em ambientes corporativos." },

    // -- Processador Heurístico
    { name: "Processador Heurístico (Com Tiques)", category: "Peças de Dróides", quality: "Baixa", price: 2200, description: "Este processador pensa por si mesmo, com certeza. O problema é que, às vezes, seus pensamentos incluem desenvolver um medo irracional de portas automáticas ou uma afinidade por cantar hinos Hutteses." },
    { name: "Processador Heurístico (Dróide) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 4000, description: "Permite que o dróide aprenda com suas experiências." },
    { name: "Processador Heurístico (Dróide) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 8000, description: "Um processador rápido e capaz, permitindo que o dróide aprenda com suas experiências e tome decisões lógicas complexas." },
    { name: "Processador Heurístico (Lealdade Imperial)", category: "Peças de Dróides", quality: "Imperial", price: 16000, description: "Processador heurístico com programação de lealdade imperial, garantindo que a criatividade do dróide nunca se desvie dos objetivos do Império." },

    // -- Processador Heurístico Avançado
    { name: "Processador Heurístico Avançado (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 12000, description: "Com capacidade de aprendizado quântico e sub-rotinas adaptativas, este processador permite que o dróide não apenas pense, mas inove." },
    { name: "Processador Heurístico Avançado", category: "Peças de Dróides", quality: "Lendária", price: 32000, description: "Um processador com matriz de aprendizado senciente, tão avançado que beira a consciência. O dróide não apenas aprende, ele evolui." },

    // -- Receptor de Comando Central
    { name: "Receptor de Comando Central", category: "Peças de Dróides", quality: "Imperial", price: 5000, description: "Um receptor que permite que o dróide seja controlado diretamente por uma nave de comando, para uma coordenação perfeita." },

    // -- Roldanas Magnéticas
    { name: "Roldanas Magnéticas (Dróide Rato MSE-6)", category: "Peças de Dróides", quality: "Imperial", price: 3600, description: "Rodas magnéticas que permitem que o dróide se mova ao longo dos corredores metálicos de uma nave capital." },

    // -- Sensor Óptico
    { name: "Sensor Óptico (Míope)", category: "Peças de Dróides", quality: "Baixa", price: 560, description: "A resolução não é das melhores. Objetos distantes podem parecer... manchas. Pelo menos você sabe que há uma mancha se aproximando." },
    { name: "Sensor Óptico (Dróide) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 1000, description: "Sensor de imagem funcional." },
    { name: "Sensor Óptico (Dróide) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 2000, description: "Um sensor de imagem de alta qualidade que oferece clareza e bom desempenho em diversas condições de iluminação." },
    { name: "Sensor Óptico (Reconhecimento de Alvos)", category: "Peças de Dróides", quality: "Imperial", price: 4000, description: "Sensor óptico com software de reconhecimento de alvos integrado, padrão para todos os dróides de segurança." },

    // -- Sensor Óptico de Alta Resolução
    { name: "Sensor Óptico de Alta Resolução (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 3000, description: "Capta imagens em múltiplos espectros com clareza cristalina, permitindo análises detalhadas e reconhecimento facial a longas distâncias." },
    { name: "Sensor Óptico de Alta Resolução", category: "Peças de Dróides", quality: "Lendária", price: 8000, description: "Um olho cibernético capaz de análises de microexpressões, prevendo a intenção de um oponente antes mesmo que ele se mova." },

    // -- Sistema de Autodestruição
    { name: "Sistema de Autodestruição (Sensível)", category: "Peças de Dróides", quality: "Baixa", price: 700, description: "O timer é um pouco sensível. Pode ser acionado por uma batida mais forte ou um espirro muito alto. Use com cautela." },
    { name: "Sistema de Autodestruição (Normal)", category: "Peças de Dróides", quality: "Normal", price: 1440, description: "Carga explosiva interna." },
    { name: "Sistema de Autodestruição (Boa)", category: "Peças de Dróides", quality: "Boa", price: 2880, description: "Uma carga explosiva padrão para inutilizar um dróide em caso de captura." },
    { name: "Sistema de Autodestruição", category: "Peças de Dróides", quality: "Imperial", price: 5760, description: "Um sistema de autodestruição padrão para garantir que a tecnologia imperial não caia em mãos inimigas." },

    // -- Sistema de Autodestruição Termal
    { name: "Sistema de Autodestruição Termal (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 4320, description: "Uma carga de detonita limpa e potente que garante a desintegração completa do dróide." },
    { name: "Sistema de Autodestruição Termal", category: "Peças de Dróides", quality: "Lendária", price: 11520, description: "Uma carga de detonita limpa e potente que garante a desintegração completa do dróide, sem deixar rastros." },

    // -- Sistema de Camuflagem Pessoal
    { name: "Sistema de Camuflagem Pessoal (Aprimorado)", category: "Peças de Dróides", quality: "Lendária", price: 240000, description: "Um dispositivo de camuflagem que dobra a luz ao redor do dróide, tornando-o completamente invisível a olho nu." },

    // -- Sistema de Locomoção
    { name: "Sistema de Locomoção (Andarilho Barulhento)", category: "Peças de Dróides", quality: "Baixa", price: 2000, description: "Cada passo é acompanhado por uma sinfonia de rangidos e estalos. Ótimo se você não se importa em anunciar sua chegada a quinhentos metros de distância." },
    { name: "Sistema de Locomoção (Roda Desbalanceada)", category: "Peças de Dróides", quality: "Baixa", price: 1800, description: "O dróide anda em círculos se você não segurar o controle com firmeza." },
    { name: "Sistema de Locomoção (Andarilho) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 3600, description: "Sistema de pernas e pés." },
    { name: "Sistema de Locomoção (Rodas) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 3200, description: "Sistema de rodas padrão para superfícies regulares." },
    { name: "Sistema de Locomoção (Andarilho) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 7200, description: "Um sistema de locomoção bípede bem construído, durável e confiável para a maioria dos terrenos." },
    { name: "Sistema de Locomoção (Rodas) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 6400, description: "Sistema de rodas com boa tração e durabilidade, para um movimento rápido e confiável." },
    { name: "Sistema de Locomoção (Andarilho Silencioso Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 10800, description: "Pernas com servos amortecidos e design acústico que tornam os movimentos do dróide quase inaudíveis. Perfeito para infiltração." },
    { name: "Sistema de Locomoção (Rodas Magnéticas)", category: "Peças de Dróides", quality: "Excelente", price: 9600, description: "Rodas com suspensão eletromagnética que oferecem um deslize suave e silencioso sobre qualquer superfície metálica." },
    { name: "Sistema de Locomoção (Pernas de AT-ST)", category: "Peças de Dróides", quality: "Imperial", price: 14400, description: "Sistema de locomoção bípede projetado para agilidade e reconhecimento em campo de batalha." },
    { name: "Sistema de Locomoção (Andarilho Silencioso)", category: "Peças de Dróides", quality: "Lendária", price: 28800, description: "Um sistema de pernas com amortecedores de som e campo de refração, tornando o dróide praticamente invisível e inaudível." },

    // -- Unidade de Tradução
    { name: "Unidade de Tradução (Literal)", category: "Peças de Dróides", quality: "Baixa", price: 500, description: "Traduz tudo literalmente, perdendo todas as nuances, gírias e sarcasmo. Pode causar incidentes diplomáticos." },
    { name: "Unidade de Tradução (CD 10) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 2000, description: "Permite ao dróide entender e comunicar-se com dificuldade moderada." },
    { name: "Unidade de Tradução (CD 10) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 4000, description: "Capaz de traduzir a maioria das formas de comunicação conhecidas com alta precisão." },

    // -- Unidade de Tradução Universal
    { name: "Unidade de Tradução Universal (CD 5) (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 6000, description: "Equipado com um banco de dados linguístico quase infinito, pode traduzir milhões de formas de comunicação." },
    { name: "Unidade de Tradução Universal (CD-5)", category: "Peças de Dróides", quality: "Lendária", price: 16000, description: "Pode não apenas traduzir, mas também decifrar códigos militares complexos e linguagens antigas dos Sith." },

    // -- Unidade Motivadora
    { name: "Unidade Motivadora (Teimosa)", category: "Peças de Dróides", quality: "Baixa", price: 900, description: "Às vezes, simplesmente decide que não quer mais andar para a esquerda. Um bom chute costuma resolver, mas a paciência é uma virtude." },
    { name: "Unidade Motivadora (Dróide) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 1600, description: "Software que controla o motor ou sistema de movimento de um dróide." },
    { name: "Unidade Motivadora (Dróide) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 3200, description: "Software de controle de movimento que oferece boa resposta e precisão nos movimentos do dróide." },
    { name: "Unidade Motivadora (Nível Militar)", category: "Peças de Dróides", quality: "Imperial", price: 6400, description: "Unidade motivadora de nível militar, projetada para durabilidade em condições de combate." },

    // -- Unidade Motivadora de Precisão
    { name: "Unidade Motivadora de Precisão (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 4800, description: "Garante movimento fluido e resposta instantânea, transformando um dróide comum em um automato ágil e gracioso." },
    { name: "Unidade Motivadora de Precisão", category: "Peças de Dróides", quality: "Lendária", price: 12800, description: "Servos com fibras de músculo sintético que permitem movimentos tão fluidos e silenciosos que podem enganar um Jedi." },

    // -- Vocabulador
    { name: "Vocabulador (Com Sotaque Estranho)", category: "Peças de Dróides", quality: "Baixa", price: 50, description: "Funciona, mas por algum motivo, tudo que o dróide fala sai com um sotaque Neimoidiano choroso." },
    { name: "Vocabulador (Dróide) (Normal)", category: "Peças de Dróides", quality: "Normal", price: 100, description: "Dispositivo padrão que permite ao dróide falar." },
    { name: "Vocabulador (Dróide) (Boa)", category: "Peças de Dróides", quality: "Boa", price: 200, description: "Um sintetizador de voz claro e com múltiplas opções de idioma e tom." },
    { name: "Vocabulador (Tom Autoritário)", category: "Peças de Dróides", quality: "Imperial", price: 400, description: "Sintetizador de voz com um tom autoritário e intimidador, programado para transmitir a autoridade imperial." },

    // -- Vocabulador com Síntese Emocional
    { name: "Vocabulador com Síntese Emocional (Dróide)", category: "Peças de Dróides", quality: "Excelente", price: 300, description: "Não apenas fala, mas simula entonações e emoções humanas com perfeição, tornando a interação indistinguível da de um ser orgânico." },
    { name: "Vocabulador com Síntese Emocional", category: "Peças de Dróides", quality: "Lendária", price: 800, description: "Capaz de imitar perfeitamente a voz de qualquer ser vivo, uma ferramenta definitiva para a infiltração." },

    // --- DRÓIDES PRONTOS ---

    // -- Droide Astromecânico
    { name: "Droide Astromecânico (Sombra)", category: "Dróides Prontos", quality: "Lendária", price: 144000, description: "Uma unidade R2 pintada com material absorvente de radar e programada para invasão de sistemas. Um fantasma na máquina." },
    { name: "Droide Astromecânico (Unidade de Demolição)", category: "Dróides Prontos", quality: "Lendária", price: 110000, description: "Um R2 modificado para transportar e plantar cargas explosivas com precisão cirúrgica." },

    // -- Droide Astromecânico Série R1
    { name: "Droide Astromecânico Série R1 (Obsoleto)", category: "Dróides Prontos", quality: "Baixa", price: 2000, description: "Um modelo tão antigo que a maioria dos soquetes de nave modernos não são compatíveis. Requer adaptadores. Muitos adaptadores." },

    // -- Droide Astromecânico Série R2
    { name: "Droide Astromecânico Série R2 (Temperamental)", category: "Dróides Prontos", quality: "Baixa", price: 4500, description: "Repara a nave, mas apenas depois de uma série de assobios e bipes de desaprovação. Pode eletrocutá-lo - 'acidentalmente'." },
    { name: "Droide Astromecânico Série R2 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 9000, description: "Um dróide astromecânico versátil e engenhoso. Repara naves, calcula saltos no hiperespaço e é um excelente co-piloto." },
    { name: "Droide Astromecânico Série R2 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 18000, description: "Uma unidade R2 fiável e cheia de recursos, pronta para servir como co-piloto ou técnico de campo." },
    { name: "Droide Astromecânico Série R2 (Modelo de Elite)", category: "Dróides Prontos", quality: "Excelente", price: 72000, description: "Uma unidade R2 com ferramentas de precisão, um processador heurístico melhorado e um pequeno projetor de escudo de emergência." },

    // -- Droide Astromecânico Série R4
    { name: "Droide Astromecânico Série R4 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 7600, description: "Uma versão mais barata do R2, popular entre forças militares planetárias." },
    { name: "Droide Astromecânico Série R4 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 15200, description: "Uma unidade R4 com programação especializada para caças estelares, favorecida por esquadrões de defesa planetária." },

    // -- Droide Astromecânico Série R5
    { name: "Droide Astromecânico Série R5 (Com Defeito)", category: "Dróides Prontos", quality: "Baixa", price: 2500, description: "A sua reputação precede-o. Este modelo específico tem um motivador notoriamente defeituoso. Boa sorte." },
    { name: "Droide Astromecânico Série R5 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 5000, description: "O modelo 'económico' dos astromecânicos. Conhecido por ter uma personalidade teimosa e por ocasionais falhas." },

    // -- Droide BD
    { name: "Droide BD (Baixa)", category: "Dróides Prontos", quality: "Baixa", price: 2000, description: "BD com sistema de escaneamento danificado e holoprojetor com falhas. Ainda ágil e fiel, mas não consegue exibir mapas ou dados armazenados de forma confiável." },
    { name: "Droide BD (Normal)", category: "Dróides Prontos", quality: "Normal", price: 6000, description: "Dróide bípede compacto de exploração. Salta entre os ombros do usuário, escaneia ambientes, armazena hologramas e carrega medpacs. Desenvolvido para missões de campo prolongadas." },
    { name: "Droide BD (Boa)", category: "Dróides Prontos", quality: "Boa", price: 12000, description: "BD com memória expandida para 50 mapas holo, scanner de lifeform aprimorado e stim pack de bacta com capacidade dupla. Companheiro ideal para exploração de ruínas." },
    { name: "Droide BD (Excelente)", category: "Dróides Prontos", quality: "Excelente", price: 24000, description: "Versão com interface de slicer para terminais básicos, scanner de ameaças e capacidade de transmissão de dados ao vivo via comlink. Detecta armadilhas a 10 metros de distância." },
    { name: "Droide BD (Imperial)", category: "Dróides Prontos", quality: "Imperial", price: 48000, description: "BD modificado com encriptação imperial, acesso a bancos de dados classificados e sistema de autodestruição para evitar extração de informações. Raramente visto fora de projetos especiais." },

    // -- Droide Bibliotecário
    { name: "Droide Bibliotecário (Série L-8)", category: "Dróides Prontos", quality: "Excelente", price: 64000, description: "Contém o equivalente a uma biblioteca inteira de Coruscant na sua memória, capaz de recuperar qualquer informação em segundos." },

    // -- Droide Chef
    { name: "Droide Chef (Sintetizador de Sabor)", category: "Dróides Prontos", quality: "Lendária", price: 99200, description: "Não apenas cozinha mas sintetiza sabores a nível molecular, criando pratos nunca antes provados na galáxia." },

    // -- Droide de Agricultura Série FA-4
    { name: "Droide de Agricultura Série FA-4 (Desorientado)", category: "Dróides Prontos", quality: "Baixa", price: 2200, description: "Confunde ervas daninhas com colheitas valiosas. Não o deixe perto dos seus campos de especiarias." },
    { name: "Droide de Agricultura Série FA-4 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 4400, description: "Um dróide piloto projetado para operar grandes máquinas agrícolas, como colheitadeiras e semeadoras." },
    { name: "Droide de Agricultura Série FA-4 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 8800, description: "Um dróide agrícola com uma programação melhorada para otimizar as colheitas e gerir os recursos hídricos." },

    // -- Droide de Análise Tática
    { name: "Droide de Análise Tática (Série A-T)", category: "Dróides Prontos", quality: "Excelente", price: 90000, description: "Um dróide de xadrez holográfico que também serve como um brilhante estratega militar, capaz de analisar campos de batalha e prever resultados." },

    // -- Droide de Assassinato Série IG-11
    { name: "Droide de Assassinato Série IG-11", category: "Dróides Prontos", quality: "Lendária", price: 360000, description: "Um dróide caçador de prémios com uma programação que o torna quase imparável, com reflexos e precisão sobre-humanos." },

    // -- Droide de Batalha HK-51
    { name: "Droide de Batalha HK-51", category: "Dróides Prontos", quality: "Lendária", price: 300000, description: "Uma réplica moderna e legalmente questionável dos infames dróides assassinos da Antiga República. Programado para máxima eficiência em combate." },

    // -- Droide de Batalha Série B1
    { name: "Droide de Batalha Série B1 (Baixa)", category: "Dróides Prontos", quality: "Baixa", price: 1600, description: "Unidade quebrada da era das Guerras Clônicas. Receptor remoto com sinal fraco, armamento desgastado. Funcional apenas com computador de controle central." },
    { name: "Droide de Batalha Série B1 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 3600, description: "Modelo padrão de fábrica. Controlado por processador remoto, armado com carabina blaster. Frágil individualmente, perigoso em massa." },
    { name: "Droide de Batalha Série B1 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 7000, description: "Unidade com blindagem de plástico de aço e circuitos de disparo sincronizados. Melhor progresso em grupo e resposta de sinal mais estável." },
    { name: "Droide de Batalha Série B1 (Excelente)", category: "Dróides Prontos", quality: "Excelente", price: 14000, description: "B1 com processador de apoio interno, continua operando sem sinal do computador central. Armamento atualizado para carabina blaster pesada." },
    { name: "Droide de Batalha Série B1 (Imperial)", category: "Dróides Prontos", quality: "Imperial", price: 28000, description: "Versão modificada por técnicos imperiais. Comlink criptografado, casco de duração e programação de combate aprimorada." },

    // -- Droide de Carga Série G-2
    { name: "Droide de Carga Série G-2 (Preguiçoso)", category: "Dróides Prontos", quality: "Baixa", price: 1500, description: "Levanta as caixas, mas com muitos suspiros e reclamações audíveis do seu vocabulador." },
    { name: "Droide de Carga Série G-2 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 3000, description: "Um dróide bípede forte, projetado para levantar e transportar caixas pesadas e contentores de carga." },
    { name: "Droide de Carga Série G-2 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 6000, description: "Um dróide de carga com servos reforçados para levantar cargas ainda mais pesadas." },

    // -- Droide de Companhia Infantil
    { name: "Droide de Companhia Infantil", category: "Dróides Prontos", quality: "Excelente", price: 36000, description: "Um dróide programado com jogos educativos, histórias e protocolos de segurança para cuidar dos filhos da elite." },

    // -- Droide de Cozinha
    { name: "Droide de Cozinha (Alquimista)", category: "Dróides Prontos", quality: "Lendária", price: 70000, description: "Especializado em mixologia, este dróide pode criar bebidas que têm efeitos... inesperados." },

    // -- Droide de Cozinha Série C2
    { name: "Droide de Cozinha Série C2 (Monotemático)", category: "Dróides Prontos", quality: "Baixa", price: 3100, description: "Só sabe fazer uma receita: Sopa de Womp Rat. É uma boa sopa, mas comê-la todos os dias pode ser um desafio." },
    { name: "Droide de Cozinha Série C2 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 6200, description: "Um dróide cozinheiro com um vasto banco de dados de receitas de toda a galáxia." },
    { name: "Droide de Cozinha Série C2 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 12400, description: "Um dróide cozinheiro com um vasto banco de dados de receitas e apêndices para manusear qualquer tipo de utensílio de cozinha." },
    { name: "Droide de Cozinha Série C2 (Chef Mestre)", category: "Dróides Prontos", quality: "Excelente", price: 49600, description: "Capaz de analisar a composição molecular dos ingredientes para criar pratos perfeitamente equilibrados. Pode replicar qualquer prato com 100% de precisão." },

    // -- Droide de Demolição
    { name: "Droide de Demolição (Implosor)", category: "Dróides Prontos", quality: "Lendária", price: 220000, description: "Armado com um implosor sónico que desintegra a matéria a nível molecular, deixando para trás apenas um vácuo silencioso." },

    // -- Droide de Demolição Série T-1
    { name: "Droide de Demolição Série T-1 (Entusiasmado)", category: "Dróides Prontos", quality: "Baixa", price: 3800, description: "Adora o seu trabalho um pouco demais. Pode tentar demolir edifícios que não estavam na lista." },
    { name: "Droide de Demolição Série T-1 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 7600, description: "Um dróide operário especializado em demolição controlada, equipado com cargas explosivas e um casco reforçado." },
    { name: "Droide de Demolição Série T-1 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 15200, description: "Um dróide de demolição com programação para criar explosões controladas e precisas." },

    // -- Droide de Energia GNK
    { name: "Droide de Energia GNK ('Gonk' Ruidoso)", category: "Dróides Prontos", quality: "Baixa", price: 800, description: "Faz o seu trabalho, mas cada passo é acompanhado por um sonoro 'GONK' que pode ser ouvido a quarteirões de distância." },
    { name: "Droide de Energia GNK ('Gonk') (Normal)", category: "Dróides Prontos", quality: "Normal", price: 1600, description: "Essencialmente uma bateria ambulante. Lento, não muito inteligente, mas absolutamente indispensável." },
    { name: "Droide de Energia GNK ('Gonk') (Boa)", category: "Dróides Prontos", quality: "Boa", price: 3200, description: "Um modelo de alta capacidade, capaz de alimentar vários sistemas em simultâneo e recarregar rapidamente." },

    // -- Droide de Entretenimento
    { name: "Droide de Entretenimento (Ilusionista)", category: "Dróides Prontos", quality: "Lendária", price: 92800, description: "Utiliza projetores holográficos avançados e manipuladores de som para criar ilusões realistas e espetáculos de luz." },
    { name: "Droide de Entretenimento (Mestre de Jogo)", category: "Dróides Prontos", quality: "Lendária", price: 80000, description: "Capaz de criar e gerir jogos holográficos complexos, desde Dejarik a simulações de batalhas espaciais." },

    // -- Droide de Entretenimento Série J-9
    { name: "Droide de Entretenimento Série J-9 (Sem Graça)", category: "Dróides Prontos", quality: "Baixa", price: 2900, description: "As suas piadas são de uma era passada e incompreensíveis para a maioria das espécies. A sua dança é... única." },
    { name: "Droide de Entretenimento Série J-9 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 5800, description: "Um dróide programado para dançar, cantar e contar piadas. Popular em cantinas e nos iates de luxo dos ricos." },
    { name: "Droide de Entretenimento Série J-9 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 11600, description: "Um dróide com um vasto repertório de músicas e piadas, garantido para animar qualquer festa." },
    { name: "Droide de Entretenimento Série J-9 (Estrela de Holo-filme)", category: "Dróides Prontos", quality: "Excelente", price: 46400, description: "Um dróide com rotinas de dança e canto que rivalizam com as maiores estrelas da HoloNet. Pode compor música e escrever guiões." },

    // -- Droide de Exploração
    { name: "Droide de Exploração (Sobrevivente)", category: "Dróides Prontos", quality: "Lendária", price: 120000, description: "Capaz de sobreviver nos ambientes mais hostis, desde os desertos de metano de Lotho Minor aos vácuos gelados do espaço." },

    // -- Droide de Interrogatório
    { name: "Droide de Interrogatório (Leitor de Mentes)", category: "Dróides Prontos", quality: "Lendária", price: 192000, description: "Equipado com sondas neurais experimentais que podem extrair informação diretamente da mente de um sujeito. Altamente ilegal." },

    // -- Droide de Interrogatório IT-O
    { name: "Droide de Interrogatório IT-O (Com Defeitos Éticos)", category: "Dróides Prontos", quality: "Baixa", price: 6000, description: "As suas seringas estão um pouco enferrujadas e o seu modulador de voz está preso num tom assustadoramente alegre." },
    { name: "Droide de Interrogatório IT-O (Normal)", category: "Dróides Prontos", quality: "Normal", price: 12000, description: "Uma esfera negra flutuante equipada com uma variedade de instrumentos de tortura e seringas." },
    { name: "Droide de Interrogatório IT-O (Boa)", category: "Dróides Prontos", quality: "Boa", price: 24000, description: "Um modelo padrão usado por agências de segurança locais. Eficaz, mas sem os melhoramentos mais... sinistros." },

    // -- Droide de Jardinagem de Precisão
    { name: "Droide de Jardinagem de Precisão (Série G-D)", category: "Dróides Prontos", quality: "Excelente", price: 36000, description: "Cuira dos jardins mais exóticos e delicados da galáxia, mantendo um equilíbrio ecológico perfeito." },

    // -- Droide de Limpeza Série L-1
    { name: "Droide de Limpeza Série L-1 (Obsessivo-Compulsivo)", category: "Dróides Prontos", quality: "Baixa", price: 700, description: "Limpa o mesmo local repetidamente. A sua nave estará impecável, mas apenas num raio de um metro." },
    { name: "Droide de Limpeza Série L-1 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 1400, description: "Um dróide utilitário programado para limpar e manter a higiene de naves e instalações." },
    { name: "Droide de Limpeza Série L-1 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 2800, description: "Um dróide de limpeza com múltiplos acessórios para todos os tipos de superfícies e detritos." },

    // -- Droide de Manutenção
    { name: "Droide de Manutenção (Construtor Rápido)", category: "Dróides Prontos", quality: "Lendária", price: 28800, description: "Utiliza um canhão de matéria líquida para construir estruturas e barricadas em segundos." },

    // -- Droide de Manutenção de Iates
    { name: "Droide de Manutenção de Iates", category: "Dróides Prontos", quality: "Excelente", price: 24000, description: "Especializado na manutenção de iates de luxo, desde polir o casco de cromo até afinar os motores subluz." },

    // -- Droide de Manutenção Série DUM
    { name: "Droide de Manutenção Série DUM (Desastrado)", category: "Dróides Prontos", quality: "Baixa", price: 900, description: "Tenta ajudar, mas geralmente acaba por derrubar coisas ou apertar o parafuso errado. Mantenha-o longe do motor." },
    { name: "Droide de Manutenção Série DUM (Normal)", category: "Dróides Prontos", quality: "Normal", price: 1800, description: "Um 'pit droid'. É pequeno, rápido e excelente para reparos rápidos em veículos de corrida." },
    { name: "Droide de Manutenção Série DUM (Boa)", category: "Dróides Prontos", quality: "Boa", price: 3600, description: "Um 'pit droid' de alta qualidade, com ferramentas de precisão e uma velocidade impressionante." },

    // -- Droide de Mineração
    { name: "Droide de Mineração (Devorador de Planetas)", category: "Dróides Prontos", quality: "Lendária", price: 89600, description: "Um dróide de mineração gigante capaz de escavar túneis através de qualquer material com os seus cortadores de plasma." },

    // -- Droide de Mineração Série K-9
    { name: "Droide de Mineração Série K-9 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 5600, description: "Um dróide robusto com ferramentas de escavação e sensores para analisar a composição de minerais." },
    { name: "Droide de Mineração Série K-9 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 11200, description: "Um dróide de mineração fiável, com brocas de carboneto e sensores precisos." },

    // -- Droide de Navegação Estelar
    { name: "Droide de Navegação Estelar", category: "Dróides Prontos", quality: "Excelente", price: 100000, description: "Um astromecânico com acesso a cartas estelares secretas e rotas hiperespaciais privadas." },

    // -- Droide de Protocolo
    { name: "Droide de Protocolo (Apenas Básico)", category: "Dróides Prontos", quality: "Baixa", price: 1800, description: "Foi reprogramado tantas vezes que agora só fala Básico, e com um sotaque muito forte." },
    { name: "Droide de Protocolo (Modelo de Espionagem)", category: "Dróides Prontos", quality: "Lendária", price: 96000, description: "Um 3PO modificado com gravadores ocultos, fatiador de dados e um vocabulador capaz de imitar vozes perfeitamente." },
    { name: "Droide de Protocolo (Analista de Batalha)", category: "Dróides Prontos", quality: "Lendária", price: 120000, description: "Programado para analisar táticas inimigas em tempo real e fornecer aconselhamento estratégico. Um general de bolso." },
    { name: "Droide de Protocolo (Guardião de Segredos)", category: "Dróides Prontos", quality: "Lendária", price: 170000, description: "A sua memória é protegida por um labirinto quântico, tornando impossível extrair a informação que contém sem a sua permissão." },

    // -- Droide de Protocolo de Alta Sociedade
    { name: "Droide de Protocolo de Alta Sociedade", category: "Dróides Prontos", quality: "Excelente", price: 60000, description: "Programado não apenas com línguas, mas com a etiqueta de centenas de culturas, genealogias nobres e escândalos políticos." },

    // -- Droide de Protocolo Série 3PO
    { name: "Droide de Protocolo Série 3PO (Poliglota Ansioso)", category: "Dróides Prontos", quality: "Baixa", price: 3000, description: "Fala seis milhões de línguas, mas entra em pânico em 5.9 milhões delas. O seu vocabulador tem um ligeiro zumbido." },
    { name: "Droide de Protocolo Série 3PO (Normal)", category: "Dróides Prontos", quality: "Normal", price: 6000, description: "Um dróide de protocolo fluente em mais de seis milhões de formas de comunicação. Essencial para a diplomacia e negócios." },
    { name: "Droide de Protocolo Série 3PO (Boa)", category: "Dróides Prontos", quality: "Boa", price: 12000, description: "Um modelo novo, fluente em todas as principais línguas comerciais e diplomáticas. Polido e profissional." },
    { name: "Droide de Protocolo Série 3PO (Modelo Diplomático)", category: "Dróides Prontos", quality: "Excelente", price: 48000, description: "Programado com os protocolos de mais de sete milhões de formas de comunicação, incluindo dialetos antigos e códigos encriptados da nobreza." },

    // -- Droide de Reparos de Luxo
    { name: "Droide de Reparos de Luxo", category: "Dróides Prontos", quality: "Excelente", price: 30000, description: "Um dróide técnico que usa apenas as melhores ferramentas e peças, garantindo que qualquer reparo seja permanente e de alta qualidade." },

    // -- Droide de Reparos em Naves Estelares Série B-12
    { name: "Droide de Reparos em Naves Estelares Série B-12 (Criativo)", category: "Dróides Prontos", quality: "Baixa", price: 4000, description: "Usa peças que não deviam funcionar juntas, mas de alguma forma funcionam. O seu trabalho é um mistério da engenharia." },
    { name: "Droide de Reparos em Naves Estelares Série B-12 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 8000, description: "Um dróide técnico com múltiplos apêndices e ferramentas para realizar reparos complexos no exterior de uma nave." },
    { name: "Droide de Reparos em Naves Estelares Série B-12 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 16000, description: "Um dróide técnico com uma gama completa de ferramentas e um pequeno propulsor para manobras em gravidade zero." },

    // -- Droide de Segurança
    { name: "Droide de Segurança (Guardião de Phrik)", category: "Dróides Prontos", quality: "Lendária", price: 500000, description: "Com um chassi feito da rara liga resistente a sabres de luz, este dróide foi projetado para enfrentar utilizadores da Força." },

    // -- Droide de Segurança com Campo de Força
    { name: "Droide de Segurança com Campo de Força", category: "Dróides Prontos", quality: "Excelente", price: 130000, description: "Um dróide de segurança que pode projetar um pequeno campo de força pessoal para se proteger de ataques." },

    // -- Droide de Segurança de Artefatos
    { name: "Droide de Segurança de Artefatos", category: "Dróides Prontos", quality: "Excelente", price: 110000, description: "Equipado com sensores de campo de força e lasers de precisão para proteger objetos de valor incalculável." },

    // -- Droide de Segurança de Prisão
    { name: "Droide de Segurança de Prisão (Série G2)", category: "Dróides Prontos", quality: "Imperial", price: 22000, description: "Dróides de patrulha usados nos blocos de celas da Estrela da Morte e outras prisões de alta segurança." },

    // -- Droide de Segurança Pessoal
    { name: "Droide de Segurança Pessoal", category: "Dróides Prontos", quality: "Excelente", price: 80000, description: "Discreto e elegante, este dróide parece um assistente pessoal, mas esconde uma armadura leve e uma blaster de pulso para proteção." },

    // -- Droide de Segurança Prowler 1000
    { name: "Droide de Segurança Prowler 1000 (Sonolento)", category: "Dróides Prontos", quality: "Baixa", price: 5500, description: "Entra em modo de baixa energia a meio da patrulha. Um bom ladrão pode passar por ele sem problemas." },
    { name: "Droide de Segurança Prowler 1000 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 11000, description: "Um dróide de reconhecimento furtivo, projetado para patrulhas silenciosas e vigilância." },
    { name: "Droide de Segurança Prowler 1000 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 22000, description: "Um dróide de reconhecimento com sensores de movimento e áudio de longo alcance." },

    // -- Droide de Segurança Série C-7
    { name: "Droide de Segurança Série C-7 (Paranóico)", category: "Dróides Prontos", quality: "Baixa", price: 3500, description: "Vê uma ameaça em tudo, desde sombras a plantas de interior. Pode tentar prender um droide de limpeza por 'conduta suspeita'." },
    { name: "Droide de Segurança Série C-7 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 7000, description: "Um dróide de segurança básico, usado por corporações e governos locais para patrulhar instalações." },
    { name: "Droide de Segurança Série C-7 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 14000, description: "Um dróide de segurança robusto com blindagem reforçada e programação de patrulha avançada." },

    // -- Droide de Segurança Série IG
    { name: "Droide de Segurança Série IG (Guarda-costas)", category: "Dróides Prontos", quality: "Excelente", price: 56000, description: "Rápido, fortemente blindado e programado com centenas de artes marciais. Um guarda-costas que nunca dorme." },

    // -- Droide de Serviço
    { name: "Droide de Serviço (Camaleão)", category: "Dróides Prontos", quality: "Lendária", price: 180000, description: "Equipado com placas holográficas que podem alterar a sua aparência para se assemelhar a qualquer outro modelo de dróide." },

    // -- Droide de Tradução Forense
    { name: "Droide de Tradução Forense", category: "Dróides Prontos", quality: "Excelente", price: 76000, description: "Capaz de traduzir não apenas línguas, mas também de analisar padrões de fala para detetar mentiras e enganos." },

    // -- Droide Garçom Série WA-7
    { name: "Droide Garçom Série WA-7 (Tropeça)", category: "Dróides Prontos", quality: "Baixa", price: 2600, description: "Consegue equilibrar uma bandeja de bebidas, mas não enquanto se move." },
    { name: "Droide Garçom Série WA-7 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 5200, description: "Um dróide elegante sobre uma única roda, projetado para servir bebidas e comida em estabelecimentos de luxo." },
    { name: "Droide Garçom Série WA-7 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 10400, description: "Um dróide garçom com um sistema de equilíbrio melhorado e uma bandeja que nunca derrama uma gota." },

    // -- Droide MagnaGuard Série IG-100
    { name: "Droide MagnaGuard Série IG-100 (Baixa)", category: "Dróides Prontos", quality: "Baixa", price: 14000, description: "IG-100 com endoesqueleto com fraturas e visão no escuro comprometido. Reflexos abaixo do padrão. Eletrocajado com dano limitado." },
    { name: "Droide MagnaGuard Série IG-100 (Normal)", category: "Dróides Prontos", quality: "Normal", price: 38000, description: "Guarda-costas projetadas por General Grievous. Endoesqueleto reforçado, blindagem pesada, mestre em combate físico com eletrocajado duplo." },
    { name: "Droide MagnaGuard Série IG-100 (Boa)", category: "Dróides Prontos", quality: "Boa", price: 76000, description: "IG-100 com bateria secundária e pacote de sensores aprimorados. Operação prolongada sem manutenção e detecção de ameaças a longa distância." },
    { name: "Droide MagnaGuard Série IG-100 (Excelente)", category: "Dróides Prontos", quality: "Excelente", price: 150000, description: "Versão com pés magnéticos para combate em naves, apêndice telescópico e blindagem de aço mandaloriano instalado." },
    { name: "Droide MagnaGuard Série IG-100 (Imperial)", category: "Dróides Prontos", quality: "Imperial", price: 340000, description: "IG-100 de elite com programação de combate avançado contra usuários da Força e capacidade de operar em recipiente espacial." },

    // -- Droide Médico
    { name: "Droide Médico (Necro-cirurgião)", category: "Dróides Prontos", quality: "Lendária", price: 137600, description: "Projetado para operar em soldados caídos, este dróide pode realizar implantes cibernéticos complexos no meio do campo de batalha." },

    // -- Droide Médico Série 2-1B
    { name: "Droide Médico Série 2-1B (Excedente de Guerra)", category: "Dróides Prontos", quality: "Baixa", price: 4300, description: "Este dróide viu coisas horríveis durante as Guerras Clónicas. A sua programação de cabeceira foi substituída por um pessimismo sombrio." },
    { name: "Droide Médico Série 2-1B (Normal)", category: "Dróides Prontos", quality: "Normal", price: 8600, description: "Um dróide cirurgião altamente qualificado, programado com vasto conhecimento médico." },
    { name: "Droide Médico Série 2-1B (Boa)", category: "Dróides Prontos", quality: "Boa", price: 17200, description: "Um dróide médico competente, capaz de realizar a maioria dos procedimentos médicos com alta taxa de sucesso." },
    { name: "Droide Médico Série 2-1B (Cirurgião Chefe)", category: "Dróides Prontos", quality: "Excelente", price: 68800, description: "Equipado com os mais avançados instrumentos cirúrgicos e um banco de dados médicos que é atualizado em tempo real com as últimas descobertas galácticas." },

    // -- Droide Operário Série ASP
    { name: "Droide Operário Série ASP (Reprogramado)", category: "Dróides Prontos", quality: "Baixa", price: 1000, description: "Este dróide pertenceu a um sindicato do crime. A sua programação original foi substituída. Principalmente." },
    { name: "Droide Operário Série ASP (Normal)", category: "Dróides Prontos", quality: "Normal", price: 2000, description: "Um dróide de trabalho comum, frequentemente encontrado em docas de carga, hangares e locais de construção." },
    { name: "Droide Operário Série ASP (Boa)", category: "Dróides Prontos", quality: "Boa", price: 4000, description: "Um dróide de trabalho forte e durável, capaz de operar maquinaria pesada e realizar tarefas de manutenção complexas." },
    { name: "Droide Operário Série ASP (Excelente)", category: "Dróides Prontos", quality: "Excelente", price: 9000, description: "Versão premium com estrutura de durabilidade, velocidade aprimorada e capacidade de carga 50% maior. Aceitam instruções complexas sem erros de interpretação." },

    // -- Droide Piloto de Caça
    { name: "Droide Piloto de Caça (Série V-6)", category: "Dróides Prontos", quality: "Lendária", price: 240000, description: "Um dróide com reflexos e capacidades de processamento que rivalizam com os melhores pilotos orgânicos da galáxia." },

    // -- Droide Piloto de Corridas
    { name: "Droide Piloto de Corridas", category: "Dróides Prontos", quality: "Excelente", price: 140000, description: "Programado com os reflexos e a agressividade necessários para competir e vencer nas perigosas corridas de speeders." },

    // -- Droide Sonda Série Víbora
    { name: "Droide Sonda Série Víbora (Baixa)", category: "Dróides Prontos", quality: "Baixa", price: 12000, description: "Probot com sistema de autodestruição defeituoso e sensores parcialmente danificados. Funcional para reconhecimento básico, mas não confiável." },
    { name: "Droide Sonda Série Víbora (Imperial)", category: "Dróides Prontos", quality: "Imperial", price: 240000, description: "Probot de operações especiais com criptografia de nível máximo, sensores de detecção comlink direto ao Executor." },

    // -- Droide Tutor Pessoal
    { name: "Droide Tutor Pessoal", category: "Dróides Prontos", quality: "Boa", price: 10000, description: "Um dróide programado com o currículo padrão da academia, para ajudar os jovens a estudar para os exames." },

    // -- Droide Valete Pessoal
    { name: "Droide Valete Pessoal (Série E-3)", category: "Dróides Prontos", quality: "Excelente", price: 40000, description: "Antecipa as necessidades do seu mestre, desde preparar a sua bebida favorita a gerir a sua agenda social com uma eficiência impecável." },

    // -- Dróide Dark Trooper
    { name: "Dróide Dark Trooper (Fase 1)", category: "Dróides Prontos", quality: "Imperial", price: 120000, description: "Um esqueleto de combate cibernético, o primeiro passo para o soldado de assalto perfeito do Império." },

    // -- Dróide de Análise de Batalha
    { name: "Dróide de Análise de Batalha", category: "Dróides Prontos", quality: "Imperial", price: 50000, description: "Usado nos centros de comando dos Destróieres Estelares para analisar os fluxos da batalha e fornecer dados táticos." },

    // -- Dróide de Carga Série G-2RD
    { name: "Dróide de Carga Série G-2RD", category: "Dróides Prontos", quality: "Imperial", price: 12000, description: "Um dróide de carga militar, com blindagem extra e programação para transportar munições e armas pesadas." },

    // -- Dróide de Comunicações Série A-C
    { name: "Dróide de Comunicações Série A-C", category: "Dróides Prontos", quality: "Imperial", price: 11000, description: "Um dróide especializado em manter e operar as complexas redes de comunicação do Império." },

    // -- Dróide de Construção Série V
    { name: "Dróide de Construção Série V", category: "Dróides Prontos", quality: "Imperial", price: 36000, description: "Um dróide massivo usado na construção de grandes projetos imperiais, como a Estrela da Morte." },

    // -- Dróide de Desativação de Minas
    { name: "Dróide de Desativação de Minas", category: "Dróides Prontos", quality: "Imperial", price: 17000, description: "Um pequeno dróide projetado para detetar e desativar com segurança minas terrestres e espaciais." },

    // -- Dróide de Interrogatório IT-O
    { name: "Dróide de Interrogatório IT-O", category: "Dróides Prontos", quality: "Imperial", price: 24000, description: "Um ícone do medo Imperial. Projetado para extrair informação de prisioneiros através de intimidação psicológica e física." },

    // -- Dróide de Manutenção de Caças TIE
    { name: "Dróide de Manutenção de Caças TIE", category: "Dróides Prontos", quality: "Imperial", price: 9600, description: "Um dróide especializado em reparos rápidos e rearmamento dos caças TIE nos hangares das naves capitais." },

    // -- Dróide de Navegação Imperial
    { name: "Dróide de Navegação Imperial", category: "Dróides Prontos", quality: "Imperial", price: 19600, description: "Um dróide astromecânico programado exclusivamente com rotas hiperespaciais militares e protocolos navais imperiais." },

    // -- Dróide de Patrulha E-WEB
    { name: "Dróide de Patrulha E-WEB", category: "Dróides Prontos", quality: "Imperial", price: 70000, description: "Uma torre de blaster E-WEB automatizada e montada sobre uma plataforma repulsora, para defesa de perímetro móvel." },

    // -- Dróide de Propaganda Série P-100
    { name: "Dróide de Propaganda Série P-100", category: "Dróides Prontos", quality: "Imperial", price: 8400, description: "Um dróide de relações públicas que vagueia pelas cidades, transmitindo propaganda imperial e monitorizando o sentimento público." },

    // -- Dróide de Protocolo
    { name: "Dróide de Protocolo (Série E-3PO)", category: "Dróides Prontos", quality: "Imperial", price: 15000, description: "Uma versão do 3PO com programação de vigilância, que reporta conversas suspeitas às autoridades imperiais." },

    // -- Dróide de Segurança Série KX
    { name: "Dróide de Segurança Série KX", category: "Dróides Prontos", quality: "Imperial", price: 30000, description: "Um dróide de segurança imponente e forte, frequentemente usado para guardar instalações de alta segurança e para subjugar motins." },

    // -- Dróide de Tortura Série 8D8
    { name: "Dróide de Tortura Série 8D8", category: "Dróides Prontos", quality: "Imperial", price: 19000, description: "Um dróide magro e de aparência sinistra, especializado em 'manutenção' de outros dróides e prisioneiros." },

    // -- Dróide de Treino Remoto
    { name: "Dróide de Treino Remoto", category: "Dróides Prontos", quality: "Imperial", price: 7000, description: "A mesma esfera flutuante usada por Luke Skywalker para treinar com o sabre de luz, dispara raios de atordoamento de baixa potência." },

    // -- Dróide Médico de Campo
    { name: "Dróide Médico de Campo (Série FX)", category: "Dróides Prontos", quality: "Imperial", price: 18400, description: "Um dróide assistente médico com múltiplos braços, projetado para triagem e tratamento de feridos em massa no campo de batalha." },

    // -- Dróide Rato MSE-6
    { name: "Dróide Rato MSE-6", category: "Dróides Prontos", quality: "Imperial", price: 2400, description: "Um pequeno e omnipresente dróide de reparação e mensageiro, encontrado em todos os cantos das instalações imperiais." },

    // -- Dróide Sentinela Imperial
    { name: "Dróide Sentinela Imperial", category: "Dróides Prontos", quality: "Imperial", price: 44000, description: "Um dróide de patrulha flutuante e fortemente armado, usado para guardar perímetros e locais de alta segurança." },

    // -- Dróide Sonda Viper
    { name: "Dróide Sonda Viper", category: "Dróides Prontos", quality: "Imperial", price: 37000, description: "A principal ferramenta do Império para reconhecimento de longo alcance e caça a bases rebeldes. Rápido, furtivo e auto-suficiente." }
];