/* =====================================================================
   siglasData.js — Dados PADRÃO do Léxico do Dur'toc
   Fonte: "Estudo de caso - Siglas.pdf" e "Estudo de caso - Gírias.pdf"

   Este arquivo é só o ponto de partida. As edições feitas na página
   (adicionar, editar, remover) ficam salvas no navegador (localStorage).
   Para tornar uma alteração "oficial" do projeto: use Exportar na página
   e cole o conteúdo de "items" aqui, ou edite este arquivo direto.

   Formato dos registros:
   - sigla     : { tipo, termo, significado, categoria, pronuncia, definicao, exemplos[] }
   - giria     : { tipo, texto, categoria, definicao? , cena? }
   - expressao : { tipo, texto, categoria, definicao? , cena? }
   pronuncia: 'palavra' (dita como palavra) | 'soletrada' (letra por letra)
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- Categorias (chaves curtas usadas também pelo sugestor) ---------- */
  var CAT = {
    CP: 'Causa de Problemas',
    TD: 'Tipos de Defeitos',
    PC: 'Pessoas e Clientes',
    CF: 'Críticas e Frustrações',
    SR: 'Soluções e Qualidade de Reparos',
    SC: 'Siglas de Confusão',
    DC: 'Descrição e Confidencialidade',
    GI: 'Gírias',
    FT: 'Filosofia de Trabalho e Gabolices',
    IC: 'Interação com Clientes',
    ES: 'Insatisfação com a Própria Estatura',
    MD: 'Relação com Máquinas e Dróides',
    PA: 'Prazer e Admiração Técnica',
    LF: 'Lamento pela Falha Irreparável',
    NF: 'Negociação com Fornecedores',
    TB: 'Tédio e Busca por Problemas',
    NV: 'Comandos e Reflexões em Navegação',
    TR: 'Conversas com a Tripulação'
  };

  var DESCRICOES = {};
  DESCRICOES[CAT.CP] = 'Siglas usadas para identificar a verdadeira origem de um defeito: a inépcia de quem opera ou a péssima qualidade dos componentes e materiais.';
  DESCRICOES[CAT.TD] = 'Classificam a natureza exata de uma falha: recorrente, aleatória, enganosa ou que escala para situações de alto risco.';
  DESCRICOES[CAT.PC] = 'Um léxico particular para os indivíduos que testam a paciência de Dur\'toc: pilotos teimosos, clientes irritantes e curiosos que atrapalham.';
  DESCRICOES[CAT.CF] = 'As frustrações diárias de Dur\'toc em forma de sigla: droides lentos, ferramentas sumidas, projetos ruins e peças trocadas.';
  DESCRICOES[CAT.SR] = 'A filosofia de engenharia de Dur\'toc: soluções não ortodoxas, peças de alta performance e protocolos de emergência para crises imediatas.';
  DESCRICOES[CAT.SC] = 'Siglas técnicas, aparentemente complexas, usadas para ofuscar clientes, justificar custos e afirmar superioridade intelectual. Os significados são invenções de oficina.';
  DESCRICOES[CAT.DC] = 'Taxas e serviços para trabalhos mantidos fora dos registros oficiais, e peças de procedência duvidosa.';
  DESCRICOES[CAT.GI] = 'Frases curtas de oficina: comparações, insultos e comentários rápidos sobre máquinas, trabalho e galáxia.';
  DESCRICOES[CAT.FT] = 'O orgulho de ofício de Dur\'toc: como ele enxerga o trabalho, a gambiarra e a própria competência.';
  DESCRICOES[CAT.IC] = 'Falas diante de clientes e seus droides: diagnósticos, preços, ameaças e fechamento de serviço.';
  DESCRICOES[CAT.ES] = 'Comentários de quem trabalha sempre olhando para cima.';
  DESCRICOES[CAT.MD] = 'O lado carinhoso (e resmungão) de Dur\'toc com motores, naves e droides.';
  DESCRICOES[CAT.PA] = 'Os raros momentos em que ele se encanta com um projeto bem feito.';
  DESCRICOES[CAT.LF] = 'Quando a máquina não tem mais conserto.';
  DESCRICOES[CAT.NF] = 'Cobranças, elogios contidos e ameaças a quem fornece peças.';
  DESCRICOES[CAT.TB] = 'Quando a oficina está calma demais e a engenhosidade procura o que consertar.';
  DESCRICOES[CAT.NV] = 'Chamadas, vetores de pouso e reflexões durante o voo.';
  DESCRICOES[CAT.TR] = 'Conversas a bordo com Tino, Vok e a própria nave.';

  var P = 'palavra', L = 'soletrada';
  var items = [];

  function S(termo, significado, categoria, pron, definicao, exemplos) {
    items.push({ tipo: 'sigla', termo: termo, significado: significado, categoria: categoria,
      pronuncia: pron, definicao: definicao, exemplos: exemplos || [] });
  }
  function G(texto, definicao) {
    items.push({ tipo: 'giria', texto: texto, categoria: CAT.GI, definicao: definicao || '' });
  }
  // lista de: "texto"  ou  ["cena", "texto", "definição opcional"]
  function X(categoria, lista) {
    lista.forEach(function (r) {
      if (typeof r === 'string') {
        items.push({ tipo: 'expressao', texto: r, categoria: categoria });
      } else {
        items.push({ tipo: 'expressao', cena: r[0], texto: r[1], categoria: categoria, definicao: r[2] || '' });
      }
    });
  }

  /* =====================================================================
     SIGLAS
     ===================================================================== */

  /* ---- Causa de Problemas ---- */
  S('BIOS', 'Bicho Ignorante Operando o Sistema', CAT.CP, P,
    'Usado para descrever a causa de um problema que não reside no equipamento, mas na inépcia do operador.',
    ['A falha não é no meu reparo, é na BIOS. O piloto não sabe nem como ligar o estabilizador de voo.',
     'Ele disse que a nave \'fez um barulho estranho\'. Tino, anote aí: a causa do problema é BIOS. Pode cobrar a taxa de diagnóstico padrão.']);
  S('PVIS', 'Peça Vagabunda Inutilizando o Sistema', CAT.CP, P,
    'Refere-se a um componente de baixa qualidade cuja falha compromete um sistema inteiro.',
    ['É claramente um problema de PVIS do fabricante original. Me entregue o micro-soldador para eu resolver isso de uma vez por todas.']);
  S('MOFO', 'Material Obsoleto Funcionando Ocasionalmente', CAT.CP, P,
    'Peças ou sistemas antigos e/ou pouco confiáveis que Dur\'toc é forçado a usar por falta de alternativas, e que funcionam de forma intermitente.',
    ['O cliente não quis pagar por um novo acoplador, então tive que usar esse MOFO do estoque. Boa sorte pra ele.']);
  S('S.R.A', 'Síndrome do Reparo Anterior', CAT.CP, L,
    'Diagnóstico aplicado quando o problema atual não é resultado de uma falha comum, mas sim a consequência direta de um serviço malfeito por outro mecânico. Geralmente, o conserto da "solução" anterior é mais complexo do que o defeito original.',
    ['O conversor de torque está soldado de cabeça para baixo e isolado com fita de cargueiro. O problema aqui não é a peça, é um caso grave de S.R.A. Vou ter que cobrar o dobro só para desfazer essa bagunça.']);
  S('CIC', 'Circuito de Incompatibilidade Crônica', CAT.CP, P,
    'Refere-se a falhas que surgem da tentativa de fazer sistemas de diferentes fabricantes, eras ou filosofias de engenharia funcionarem juntos. É a frustração de Dur\'toc com a falta de padronização na galáxia.',
    ['Ele instalou um canhão de laser imperial em uma nave da era da República. O sistema de energia está em colapso porque o regulador de potência não consegue lidar com a demanda. É um problema de CIC.']);
  S('IDA', 'Interferência Destrutiva do Amador', CAT.CP, P,
    'Causa de problema específica que ocorre quando o próprio dono da nave tenta um conserto por conta própria antes de procurar Dur\'toc. O resultado é quase sempre um dano maior, mais complexo e significativamente mais caro de reparar.',
    ['O defeito original era só um filtro de combustível entupido. Mas o dono tentou limpar com um solvente corrosivo. A causa do defeito agora é IDA, e o motor inteiro está comprometido. A garantia dele expirou no momento em que tentou \'dar um jeitinho\'.']);

  /* ---- Tipos de Defeitos ---- */
  S('CAOPS', 'Conserto Aparentemente Otimizado Para o Suicídio', CAT.TD, P,
    'Uma tarefa de reparo simples que escala de forma descontrolada para uma situação perigosa e complexa.',
    ['O plano era só trocar um acoplador, mas agora o reator está instável. Virou um CAOPS completo. Tino, evacue a baía de reparos.']);
  S('FASCA', 'Falha Aleatória Sem Causa Aparente', CAT.TD, P,
    'Um problema técnico que ocorre sem qualquer padrão ou causa identificável nos diagnósticos, exigindo uma investigação manual e demorada.',
    ['O sistema de suporte de vida desligou e ligou sozinho. Não há registro de falha. É uma FASCA. Odeio quando não sei a causa.']);
  S('D.O.R', 'Defeito Oculto Recorrente', CAT.TD, L,
    'Uma falha persistente que retorna mesmo após múltiplos reparos, indicando um problema fundamental no design ou na operação.',
    ['Esse caça voltou de novo com a mesma falha. É um caso clássico de D.O.R. Vou ter que reconstruir o módulo de energia do zero.']);
  S('MANÉ', 'Mecanismo Aparentemente Normal, Estragado', CAT.TD, P,
    'Um defeito traiçoeiro onde todos os sensores e diagnósticos indicam funcionamento normal, mas o sistema falha na prática.',
    ['O scanner diz que está tudo bem, mas a nave não decola. Típico caso de MANÉ. Ignore os sensores e me passe o osciloscópio.']);
  S('P.P.E', 'Programado Por Ewok', CAT.TD, L,
    'Gíria para um sistema de software, interface ou lógica de programação absurdamente primitivo, ilógico ou contra-intuitivo. Indica código escrito de forma amadora e sem refinamento técnico, como se tivessem usado paus e pedras para programar.',
    ['A interface de navegação dessa nave é um lixo. Os comandos não fazem sentido, os menus se sobrepõem... Isso aqui só pode ter sido P.P.E. É mais fácil pilotar no modo manual do que tentar usar esse sistema.']);
  S('PANIC', 'Problema Aparente Não-Incapacitante para o Cliente', CAT.TD, P,
    'Uma falha menor, muitas vezes puramente cosmética ou sonora, que não afeta a segurança nem o funcionamento da nave, mas que o proprietário acredita ser um defeito catastrófico.',
    ['Ele trouxe o caça porque ouviu um zumbido intermitente. Rodei o diagnóstico completo e é só uma vibração no suporte de copo. Típico PANIC. Vou dizer que precisei realinhar o fluxo de plasma e cobrar a taxa padrão.']);

  /* ---- Pessoas e Clientes ---- */
  S('CLIENTE', 'Criatura Lenta, Irritante e Notoriamente Tola Entendendo Nada', CAT.PC, P,
    'A definição padrão de Dur\'toc para a maioria de sua clientela.',
    ['Tino, temos um CLIENTE na linha de comunicação 2. Vok, prepare-se para traduzir reclamações sem sentido para o básico.']);
  S('FIMEL', 'Freguês Ignorante, Melhor Enganar Logo', CAT.PC, P,
    'Cliente que demonstra arrogância e/ou pouquíssimo conhecimento técnico, tornando-se um alvo fácil para cobranças exageradas por reparos "complexos".',
    ['Prepara a conta, esse é FIMEL. Vok, diga a ele que o \'modulador de partículas\' é raríssimo e vai custar caro.']);
  S('NABO', 'Navegador Amador, Burro e Obstinado', CAT.PC, P,
    'Um piloto que não apenas carece de habilidade, mas também se recusa a ouvir conselhos técnicos.',
    ['Não tente explicar a física do hiperespaço para ele, Vok. É um NABO. Apenas diga que o motor está \'mais potente\' e cobre o dobro.']);
  S('E.D.H', 'Especialista de Holovídeo', CAT.PC, L,
    'Cliente que, após assistir a alguns tutoriais na holonet, acredita ter profundo conhecimento técnico. Costuma dar palpites errados, usar termos técnicos fora de contexto e atrapalhar o diagnóstico com suas "sugestões".',
    ['Vok, tire aquele E.D.H. de perto do motor. Ele está insistindo que o problema é a \'matriz de dilitium\', uma peça que essa nave nem tem. A paciência de hoje já acabou.']);
  S('SESTIR', 'Solicitante Exigindo Soluções Tecnicamente Irracionais e Ridículas', CAT.PC, P,
    'Um supervisor, cliente ou burocrata que impõe prazos e requisitos impossíveis, sem a menor compreensão do trabalho técnico envolvido.',
    ['O SESTIR do contrato quer o cargueiro pronto até amanhã. Ele acha que eu faço milagres com sucata? Tino, reprograme o Bruto para o modo de trabalho contínuo.']);
  S('S.M.F.', 'Síndrome da Mão Fechada', CAT.PC, L,
    'Descreve um cliente que reclama de todos os custos, pede descontos em tudo e sempre opta pela solução mais barata (e geralmente pior), como usar um MOFO, mesmo quando avisado dos riscos.',
    ['Ele se recusou a pagar pela peça TRAMPA e preferiu que eu usasse um acoplador de plasma recondicionado. Um caso clássico de S.M.F. Estarei esperando o retorno dele em uma semana com o dobro do problema.']);
  S('AJA', 'Amador Jurando Ajudar', CAT.PC, P,
    'O tipo de cliente ou curioso que, por excesso de boa vontade, tenta "ajudar" no reparo. Invariavelmente fica no caminho, derruba ferramentas, dá palpites inúteis ou, na pior das hipóteses, toca em algo que não devia, agravando o problema.',
    ['Vok, tire aquele A.J.A. de perto da minha bancada antes que eu o use para polir o casco da nave. A última vez que um desses \'ajudou\', eu passei o dia procurando um parafuso de retenção que ele chutou para debaixo do motor.']);

  /* ---- Críticas e Frustrações ---- */
  S('L.T.A.', 'Logaritmo de Tarefas Atrasadas', CAT.CF, L,
    'Termo depreciativo para qualquer droide ou indivíduo considerado lento e ineficiente.',
    ['Aquele droide de carga do espaçoporto é uma L.T.A. certificada. Eu poderia ter descarregado o material todo na metade do tempo com o Bruto.']);
  S('B.P.O', 'Bem Perdido na Oficina', CAT.CF, L,
    'Designa qualquer ferramenta, peça ou componente que desapareceu misteriosamente no caos da oficina. Geralmente é o item mais crucial para o reparo em andamento, e sua busca consome um tempo valioso e a paciência de Dur\'toc.',
    ['Não encontro o sequenciador de ignição em lugar nenhum! É mais um caso de B.P.O. Tino, pare o que está fazendo e ajude a procurar. Aquele troço não pode ter criado pernas.']);
  S('PIF', 'Projeto Incompetente de Fábrica', CAT.CF, P,
    'Equipamento cujo design original é tão ilógico, impraticável ou mal planejado que torna a manutenção ou o reparo uma tarefa desnecessariamente complexa e irritante.',
    ['Para trocar um simples fusível térmico, eu tenho que desmontar metade do painel. Isso é um PIF. O engenheiro que projetou isso nunca pegou numa ferramenta na vida.']);
  S('COM', 'Componente de Outro Modelo', CAT.CF, P,
    'Expressa a irritação de lidar com peças que não são originais ou compatíveis, resultado de um reparo anterior malfeito ou da avareza do cliente. A presença de um C.O.M. geralmente significa que o problema é maior do que parece.',
    ['O motor está falhando porque o último mecânico instalou um COM. A matriz de ignição é de um cargueiro corelliano, mas a nave é um caça TIE remendado. É claro que não ia funcionar direito!']);

  /* ---- Soluções e Qualidade de Reparos ---- */
  S('C.A.F.E', 'Componente Acelerador de Funcionamento Essencial', CAT.SR, L,
    'Refere-se a qualquer elemento crucial para a operação, seja um componente vital da oficina ou sua bebida estimulante pessoal.',
    ['Comboio, traga-me um C.A.F.E. imediatamente! Não consigo pensar com esses circuitos operando em baixa voltagem.',
     'A oficina não funciona sem o C.A.F.E. principal. E eu sem o meu café. Agora, onde está minha caneca?']);
  S('GAFO', 'Gambiarra Altamente Funcional e Otimizada', CAT.SR, P,
    'A solução de engenharia não ortodoxa de Dur\'toc. Uma modificação que desvia do manual para criar um resultado superior e mais durável.',
    ['O cliente acha que segui o manual, mas eu apliquei uma GAFO no sistema de refrigeração. Agora a durabilidade é o dobro do que a engenharia imperial projetou.']);
  S('PARAFUSO', 'Problema Absurdo Requerendo Atenção, Força e Urgência Sem Opção', CAT.SR, P,
    'Uma emergência crítica que exige uma solução imediata e de força bruta, sem tempo para delicadeza.',
    ['O acoplador principal travou. Isso não é um reparo, é um PARAFUSO. Bruto, prepare-se para usar a força.']);
  S('PEÇA', 'Protocolo de Emergência: Chutar até Acertar', CAT.SR, P,
    'O último recurso quando os diagnósticos falham: a aplicação de força física ou manipulação brusca na esperança de resolver o problema.',
    ['Tino, os diagnósticos não mostram nada! Vamos ter que usar o protocolo PEÇA. Me passe o martelo de força.']);
  S('SIBO', 'Sistema Imperial Burocrático e Obtuso', CAT.SR, P,
    'A frustração de Dur\'toc com a burocracia imperial, que impede o acesso rápido a peças e autorizações essenciais.',
    ['Preciso de uma peça que está a três metros de mim, mas, por causa do SIBO, tenho que preencher seis formulários digitais e esperar a aprovação.']);
  S('UROCLA', 'Unidade Robótica Operando Com Lentidão Absurda', CAT.SR, P,
    'Sinônimo de L.T.A., usado especificamente para droides que executam suas tarefas de forma exasperantemente lenta.',
    ['Deixe de ser uma UROCLA e se apresse, ou vou te transformar em um peso de porta!']);
  S('TRAMPA', 'Tecnologia Recondicionada Adaptada para Máxima Performance e Alta durabilidade', CAT.SR, P,
    'O oposto de PVIS. Uma peça ou sistema que Dur\'toc mesmo modificou ou construiu, superando as especificações originais. Sinônimo de qualidade e primo próximo de GAFO.',
    ['Não se preocupe com o reator, ele não é original. É uma TRAMPA minha. Vai durar mais que o resto da nave.']);
  S('I.P.P', 'Improvisação Provisória Permanente', CAT.SR, L,
    'Área da oficina ou sistema montado com peças e soluções improvisadas para uma necessidade urgente, mas que, por falta de recursos ou tempo, nunca foi substituído pela solução oficial, tornando-se parte fixa e funcional da operação.',
    ['Aquele console de diagnóstico é a nossa I.P.P. oficial. Era pra ser só por uma semana, mas já faz três ciclos que ele está ali e funciona melhor que o terminal original que o SIBO nunca autorizou a troca.']);
  S('E.P.I', 'Elemento Provisório Improvisado', CAT.SR, L,
    'Peça ou componente criado às pressas com materiais não-padrão para substituir um original danificado. Diferente de uma GAFO, um E.P.I. não tem garantia de durabilidade e é uma medida "tapa-buraco" até que a peça correta esteja disponível.',
    ['O atuador de pouso quebrou e não temos outro. Vok, me traz a carcaça daquele droide de protocolo antigo e um maçarico. Vamos instalar um E.P.I. só pra tirar essa banheira da minha baía.']);
  S('T.P.M', 'Táticas Provisórias de Manutenção', CAT.SR, L,
    'Conjunto de procedimentos de reparo não-ortodoxos, aplicados quando as ferramentas ou peças adequadas não estão disponíveis. Envolve contornar os manuais e usar a criatividade para fazer um sistema voltar a funcionar, mesmo que temporariamente.',
    ['Os manuais da engenharia imperial são inúteis aqui. Estamos operando em modo T.P.M. há semanas. Se o sistema acende e não explode, o serviço está aprovado.']);
  S('FMEA', 'Faz Milagre E Agradece', CAT.SR, P,
    'Reparo extremamente complexo, ou em equipamento tão danificado que seu conserto beira o impossível. Quando o sistema volta a funcionar sem explicação lógica, a única conclusão técnica é que foi um milagre.',
    ['Tino, eu reverti a polaridade do fluxo de energia, usei o martelo de força no conversor e ele ligou. Não me pergunte como. Anote aí no relatório: diagnóstico FMEA. E pode cobrar a taxa de complexidade.']);
  S('A.T', 'Adaptação Técnica', CAT.SR, L,
    'Termo genérico para a modificação de um componente ou sistema para que ele cumpra uma função para a qual não foi originalmente projetado. É a base da filosofia de engenharia de Dur\'toc, onde as especificações de fábrica são apenas um ponto de partida.',
    ['O conector de energia novo não encaixa nesse modelo antigo. Tino, prepare-se para fazer uma A.T. no painel. Vamos ter que alargar a entrada e refazer a solda dos contatos.']);
  S('R.T.I', 'Recurso Técnico Improvisado', CAT.SR, L,
    'Qualquer ferramenta, peça ou método não convencional empregado para superar uma limitação técnica. Pode ser desde usar um droide de carga como prensa hidráulica até adaptar o software de um caça para diagnosticar um cargueiro.',
    ['O guincho principal quebrou. Vamos usar um R.T.I. Reprograme os repulsores daquela sucata ali para levantar a fuselagem. É tosco, mas vai funcionar.']);
  S('S.P.T.I', 'Solução Provisória por Tempo Indeterminado', CAT.SR, L,
    'Correção emergencial que se prova tão eficaz ou indispensável que sua remoção é continuamente adiada. Na prática, é uma solução permanente disfarçada de temporária, geralmente por preguiça ou falta de alternativa melhor.',
    ['Aquele bypass no sistema de refrigeração era pra ser por um dia. Já virou uma S.P.T.I. Ninguém mais lembra como era o sistema original, e sinceramente, este funciona melhor.']);
  S('D.T.T', 'Dispositivo Técnico Temporário', CAT.SR, L,
    'Aparelho ou montagem criada com peças sobressalentes para executar uma função específica durante um reparo e que é desmontada logo após o uso. É o equivalente a uma ferramenta de uso único.',
    ['Preciso de um D.T.T. para descarregar esses capacitores sem fritar a rede elétrica da baía. Junte aquela bateria de speeder com o limitador de fluxo daquele blaster velho. Cuidado para não explodir.']);
  S('A.T.N.C', 'Ajuste Técnico Não Catalogado', CAT.SR, L,
    'Modificação ou calibração de alta precisão que não consta em nenhum manual técnico oficial. É um segredo da oficina, baseado na experiência e intuição de Dur\'toc, geralmente para extrair performance extra de um sistema ou corrigir uma falha de design do fabricante.',
    ['O cliente reclamou que o motor vibrava em velocidade de cruzeiro. Apliquei um A.T.N.C. no injetor de plasma. O manual diria para trocar a peça, mas eu sei que é só um problema de alinhamento de fábrica.']);
  S('A.T.A', 'Ajuste Técnico Alternativo', CAT.SR, L,
    'Procedimento de reparo secundário, mas válido, aplicado quando o método principal recomendado pelo fabricante é impraticável, demorado ou simplesmente falhou. É a solução "plano B" padrão da oficina.',
    ['O extrator hidráulico não está movendo o pino do rotor. Esqueça o manual. Vamos para um A.T.A. Aqueça a carcaça com o maçarico de plasma para expandir o metal e depois tente com a alavanca de força.']);
  S('ATAE', 'Ajuste Técnico de Alta Eficiência', CAT.SR, P,
    'Evolução da GAFO. Modificação refinada que não só conserta um problema, mas melhora significativamente a performance, durabilidade ou eficiência do sistema, superando em muito as especificações de fábrica. É a assinatura de qualidade de Dur\'toc.',
    ['Ele só pediu para consertar o vazamento do líquido de arrefecimento, mas eu fiz um ATAE em todo o sistema. Agora o motor opera com 15% a mais de eficiência e não vai superaquecer nem se ele voar perto de um sol.']);
  S('MAC', 'Métodos Alternativos de Conserto', CAT.SR, P,
    'Termo abrangente para todo o repertório de soluções de Dur\'toc que fogem aos manuais e procedimentos oficiais. É a filosofia de trabalho da oficina: o que importa é o resultado, não o método prescrito.',
    ['O estagiário novo tentou seguir o manual à risca e quase explodiu o reator. Vok, ensine a ele alguns MAC básicos, começando pelo protocolo PEÇA. Ele precisa aprender como as coisas realmente funcionam.']);
  S('S.E.V.I.R.A.', 'Solução Específica Visando Ignorar o Reparo Adequado', CAT.SR, L,
    'Aplicado quando o cliente recusa o serviço recomendado e pede uma intervenção mínima apenas para fazer o equipamento "voltar a funcionar". Inclui ajustes rápidos, gambiarras simples e métodos não ortodoxos que não se qualificam como GAFO por sua natureza temporária e falta de garantia.',
    ['O cliente não quer o reparo completo, só quer que a nave \'aguente a viagem\'. Certo. Tino, anote aí: aplicando protocolo S.E.V.I.R.A. Use a fita de vedação e reze. E Vok, deixe bem claro para ele que não há garantia nenhuma sobre isso.']);

  /* ---- Siglas de Confusão (uso com clientes) ---- */
  S('R.I.P.A', 'Ressonador Iônico de Pulso Assimétrico', CAT.SC, L,
    'Definição técnica (para confundir): um componente supostamente vital para a estabilidade do campo de força ou do fluxo de energia da nave.',
    ['O diagnóstico é claro. A instabilidade vem direto do R.I.P.A. da nave. Vou precisar recalibrar a matriz de contenção, e isso não é barato. O senhor entende a complexidade de um R.I.P.A., certo?']);
  S('FLUXO', 'Fluido de Lubrificação para Unidades de Xeno-transmissão Oscilante', CAT.SC, P,
    'Definição técnica (para confundir): um fluido especial e caríssimo, essencial para uma peça que soa extremamente complicada.',
    ['Vok, informe ao cliente que o FLUXO está contaminado. Se não trocarmos agora, o conversor de torque inteiro vai pro lixo. É um procedimento delicado, envolve purga total do sistema.']);
  S('CICA', 'Circuito de Interface Computacional Anular', CAT.SC, P,
    'Definição técnica (para confundir): uma forma excessivamente complexa de se referir a um chip, porta de dados ou qualquer componente eletrônico simples.',
    ['O problema não é o motor, é o CICA que está com latência. Preciso rodar um diagnóstico profundo e talvez substituir o módulo. É um componente importado, sabe como é.']);
  S('NODO', 'Núcleo Operacional de Distribuição Otimizada', CAT.SC, P,
    'Definição técnica (para confundir): termo vago que pode se referir a qualquer coisa, desde uma caixa de fusíveis a um nó de energia, usado para criar um senso de urgência e importância.',
    ['Olha, o scanner apontou uma sobrecarga direto no NODO principal. Se esse troço queima, a nave vira um peso de papel. Vamos ter que isolar e reforçar os condutores.']);
  S('P.O.S', 'Protocolo de Otimização de Software', CAT.SC, L,
    'Definição técnica (para confundir): procedimento inexistente usado para justificar cobranças por reparos de software que, na verdade, foram resolvidos com uma simples reinicialização do sistema. Soa complexo e indispensável para o leigo.',
    ['O painel de navegação estava travado, mas já resolvemos. Tivemos que rodar um P.O.S. completo para recalibrar os algoritmos heurísticos da interface, é um procedimento complexo mas evitou a troca do módulo.']);

  /* ---- Descrição e Confidencialidade ---- */
  S('CALADO', 'Contrato Anônimo Livrando de Apuramento de Dados Oficiais', CAT.DC, P,
    'Aplicada quando um cliente solicita que um serviço, mesmo que legal, seja mantido fora dos registros. Cobre o risco administrativo e a "complexidade" de operar fora dos canais normais.',
    ['Quer que eu troque o motor, mas não quer que o registro apareça no SIBO? Entendi. Tino, adicione a taxa CALADO na conta. Discrição tem preço, meu caro. E não é barato.']);
  S('GHOST', 'Gerenciamento Heurístico de Ocultação Sistêmica e Técnica', CAT.DC, P,
    'Mais do que instalar uma peça ilegal, é o serviço de integrá-la de forma indetectável. Pode envolver blindagens de sensores, falsificação de assinaturas de energia ou programação de software para enganar diagnósticos.',
    ['Você não quer só instalar o jammer, você quer que ele não exista para nenhum scanner imperial. Isso não é um reparo, é um serviço GHOST. Envolve refazer metade da fiação e criar uma assinatura falsa. O preço, obviamente, reflete a arte.']);
  S('COISA', 'Componente Ostensivamente Ilegal Sendo Adquirido', CAT.DC, P,
    'Aplicada quando o cliente fornece ou solicita a instalação de uma peça de procedência duvidosa, como componente militar roubado, tecnologia proibida ou peça recuperada de nave acidentada sem a devida licença. A taxa compensa o risco legal e de segurança para a oficina.',
    ['Tino, escaneie essa... COISA. A numeração de série está raspada e tem marcas de laser de corte de cargueiro militar. Se quer que eu instale isso, a taxa COISA se aplica. O risco de ter a minha oficina visitada por imperiais não está incluso no preço padrão.']);

  /* =====================================================================
     GÍRIAS
     ===================================================================== */
  G('Tá mais emperrado que droide velho!');
  G('Quem montou isso aqui, um Ewok?');
  G('Se não funcionar, bate até funcionar.');
  G('Essa peça é mais rara que crédito honesto na parte baixa.');
  G('Esse motor tá fazendo mais barulho que um Wookiee em dia de feira.');
  G('Fizeram um serviço tão porco aqui que parece coisa de Hutt.');
  G('Pode deixar, a gente dá um jeito. Fica melhor que encomenda de Bespin.');
  G('Essa fiação tá mais bagunçada que a rota de Kessel.');
  G('Isso aqui é gambiarra de Corellia!');
  G('Modulação de Corellia.', 'Versão positiva de "Isso aqui é gambiarra de Corellia!".');
  G('Parafuso rebelde, só resolve na marreta.');
  G('Isso aqui não é tecnologia de ponta, é da época da Velha República.');
  G('Mais um remendo aqui e essa tecnologia Ewok vai virar uma colcha de retalhos.');
  G('Tá vazando mais óleo que draga de Mon Calamari.');
  G('Esse sistema é tão antigo que o manual de instruções tá escrito em Aurebesh arcaico.');
  G('Esse repulsorlift tá mais instável que a política de Tatooine.');
  G('A gente conserta de tudo, de cargueiro corelliano a caça TIE remendado.');
  G('Essa gambiarra foi feita com tanto \'cuidado\' que parece que um Jawa que montou.');
  G('Essa nave já viu mais ação que um soldado clone na Batalha de Geonosis.');
  G('Mais barulhento que um comboio de dróides de carga.');
  G('Tá vazando mais que speeder de pântano.');
  G('Vamos precisar de mais do que fita de motor pra essa.');
  G('Fácil como alinhar um hiperpropulsor cego.');
  G('Poeira de Dantooine nos contatos.');
  G('Puxando um turno duplo no vácuo.');
  G('Oh Cérebro de laser!', 'Um insulto comum de Dur\'toc para alguém que age por impulso ou comete um erro óbvio e estúpido.');
  G('Parem de tagarelar como um bando de dróides de protocolo com o circuito de etiqueta fritado!');
  G('Se eu quisesse opinião de sucata, falava com o Comboio!');
  G('Isso tem a mesma eficiência de um Hutt correndo uma maratona!');
  G('Não me olhe com essa cara de womp rat tentando entender um datapad!');
  G('Dá um \'chute\' no conversor.');
  G('Tá com \'fantasma\' na linha de energia.', 'Refere-se a uma flutuação de energia inexplicável ou a um erro de diagnóstico que não tem causa aparente.');
  G('Fazer uma \'sincopação no hipermotor\'.', 'Calibrar o motor de hiperespaço de forma extremamente precisa, quase artística.');
  G('Escaneamento de \'espectro cego\'.', 'Um diagnóstico profundo, buscando problemas que os sensores padrão não conseguem detectar. Uma especialidade de Tino.');

  /* =====================================================================
     EXPRESSÕES
     (Repetições entre seções do PDF foram unificadas na primeira ocorrência.)
     ===================================================================== */
  X(CAT.FT, [
    'Menos conversa, mais torque!',
    'Aqui não tem milagre, só suor e graxa.',
    'Se fosse fácil, qualquer stormtrooper fazia.',
    'Isso aí é serviço de engenheiro, não de padawan.',
    'Não tem peça? A gente inventa.',
    'Não sou Jedi, mas faço máquina levantar voo.',
    'Não é \'gambiarra\', é engenharia de sobrevivência. Algo que você não entenderia.',
    'Essa máquina tem mais alma que a maioria dos meus clientes. Pelo menos ela é honesta sobre seus problemas.',
    'Não reclame da graxa. É o perfume do trabalho.',
    'Se não desrosquear, vai no tranco!',
    'Esse motor tá pedindo aposentadoria.',
    'Não existe peça impossível, só cliente apressado.',
    'Se der curto, puxa o fio e corre!',
    'Se não encaixar, força até encaixar.',
    'Se der curto, não fui eu. Foi o droide.',
    'Essa peça é de segunda mão, mas aguenta o tranco.',
    'O último que reclamou do meu preço tá até hoje tentando decolar com um motor de speeder.',
    'É claro que guardaram a peça na prateleira de cima. Feita pra Wookiees, essa oficina, só pode.',
    'Trocar a célula de energia é fácil. O difícil é fazer ele querer andar de novo depois de toda a humilhação que passou.',
    'Hah! O antigo dono achou que essa belezinha estava acabada. Mal sabia ele que só precisava de alguém que a entendesse de verdade.',
    'Vamos, vamos... o painel de acesso ao compartimento de carga está emperrado de novo. Típico. Nada que um \'incentivo\' da minha chave de torque não resolva.'
  ]);

  X(CAT.IC, [
    'Aqui é uma oficina, não um templo. Entra, fala o problema, cala a boca e espera.',
    'Se eu ganhasse um crédito pra cada vez que ouvi \'faz funcionar rápido\', eu já tinha comprado um Iate.',
    'Quer desconto? Traz peça e não reclama.',
    'Isso aqui não é oficina de luxo, mas sai melhor que na parte alta.',
    'Não tem peça original? Vai de adaptação mesmo.',
    'Se o motor tossir de novo, traz de volta. Mas traz café junto.',
    'Não se preocupa, essa nave ainda dá muito caldo. É só saber onde apertar.',
    'Quer que eu conserte ou que eu faça mágica? Os preços são diferentes.',
    'Deixa eu dar uma olhada. Se for o que eu tô pensando, a conta vai ser galáctica.',
    'Pode confiar, meu serviço é garantido. Se quebrar de novo, a culpa é do piloto.',
    'Não é ferrugem, é medalha. Dá um ar de \'sobrevivi a muitos combates\'.',
    'Esse som no motor? É o som da experiência. E de um mancal precisando de troca.',
    'A peça original custa uma fortuna. A versão \'alternativa\' do Mercado Sombrio funciona... na maior parte do tempo.',
    'Não me explica o problema, eu já ouvi ele gritar pra mim assim que você pousou.',
    'Você quer que eu explique o que eu vou fazer ou quer que eu conserte a sua nave? Não tenho tempo pra ambos.',
    'Se você encostar nesse painel de acesso de novo, eu te uso pra polir o casco da nave.',
    'Claro que tá fazendo barulho! É um motor, não um bibliotecário. Mas esse barulho aí é choro de peça pedindo pra ser trocada.',
    'Você fala, fala... e o reator de fusão aqui superaquecendo. Prioridades, piloto, prioridades, ou eu te escuto ou eu resolvo esse problema.',
    'Sua nave não precisa de um mecânico, precisa de um milagre. Sorte sua que eu sou o mais próximo disso que você vai encontrar.',
    'Cala a boca. Estou tendo uma conversa particular com este compressor.',
    'Não, não dá pra \'dar um jeitinho\'. Ou eu faço direito, ou você procura um amador pra explodir sua nave em outro setor.',
    'Sua opinião é como um parafuso espanado: inútil e só atrapalha. Agora, silêncio. Preciso ouvir o motor.',
    'Não me apresse. Gênios e motores de hiperespaço não funcionam sob pressão... a não ser que seja a pressão certa.',
    'Aqui não é lugar pra padawan. Ou você sabe o que quer, ou sai da minha oficina.',
    'Você quer milagre ou conserto?',
    'Acha que pode me intimidar com essa altura toda? Eu já desmontei dróides de segurança maiores que você antes do primeiro café.',
    'Sim, a vista aqui de baixo é ótima. Dá pra ver todos os parafusos soltos e vazamentos que vocês, gigantes desajeitados, não enxergam.',
    'Pare de falar o que ele tem. A unidade de memória dele não mente, ao contrário de certos pilotos.',
    'Quem te vendeu esse motivador? Um Jawa? Isso aqui é lixo recondicionado!',
    'O vocabulador dele não está quebrado, ele só não tem nada de inteligente pra dizer pra você. É um recurso, não um defeito.',
    'O problema do seu droide não é mecânico, é existencial. Ele passou tempo demais com você.',
    'Ele não está \'vazando óleo\', está chorando lubrificante pela forma como você o trata.',
    ['Limpando um circuito', 'Pronto, pronto... tirei toda a sujeira que aquele orgânico desajeitado deixou entrar. Agora você pode pensar com mais clareza.'],
    'O sensor óptico dele está perfeito. Ele só finge que não te vê pra não ter que obedecer.',
    'Seu droide não é teimoso, a programação dele é apenas superior à sua capacidade de dar ordens claras.',
    'Quer que eu desenhe ou posso simplesmente consertar o mártir da sua nave?',
    'Não me interessa como aconteceu. Eu não sou terapeuta, sou mecânico. A única história que eu quero ouvir é a do motor.',
    'Meu preço é esse. Se achar caro, o espaço tá cheio de sucateiro Jawa. Boa sorte.',
    'Eu entendi o que você disse na primeira vez. Repetir não vai fazer a peça chegar mais rápido.',
    'Sua garantia expirou no momento em que você tentou \'dar um jeitinho\' por conta própria.',
    'Pode parar de andar de um lado para o outro? Você tá me desconcentrando e estressando meu droide.',
    'Não, eu não explico o processo. Você não ia entender mesmo. O importante é que funciona.',
    'Da próxima vez, tente não bater em todos os asteroides do sistema. Facilita o meu trabalho.',
    'Se não for importante, dê meia-volta. Tenho um conversor de energia em estado crítico aqui.',
    'Fala o que quebrou. E pule a parte em que você tenta parecer que entende de mecânica.',
    'Mais um... o que foi dessa vez? Bateu? Forçou? Ou só deixou de funcionar por pura tristeza de ter você como dono?',
    ['Depois, começa a resmungar para a máquina', 'Tá, tá, já chega. Deixa eu conversar com quem entende do assunto.'],
    'Sua descrição do problema é tão útil quanto um para-brisa numa nave sem cockpit.',
    'Aham... sei... fascinante. Agora me deixa ver o dano de verdade.',
    'O problema não é o que você disse. O problema é bem mais... elegante. E caro.',
    'Vai precisar de uma placa de circuito nova, um estabilizador e um milagre. Eu só forneço os dois primeiros. O preço é esse.',
    'O preço inclui as peças e o meu tempo. A minha paciência esgotou no momento em que você entrou.',
    'Pronto. Tá melhor do que quando saiu da fábrica.',
    'Transfira os créditos. E, por favor, tente não destruir meu trabalho em menos de uma semana.',
    'Funciona. Agora tire essa coisa da minha oficina. Preciso de espaço para projetos de verdade.',
    'Aí está. E se ouvir algum barulho estranho, provavelmente é só a alma da nave agradecendo por ter se livrado de você por algumas horas.',
    'Você chama isso de solução ou de um pedido de socorro?',
    'Dá pra consertar, mas vai custar caro.',
    'Isso não é um vazamento, é o sistema \'marcando território\'.',
    'Não vou fazer um wipe na memória dele! As experiências dele são o que o tornam um bom droide, mesmo que a maioria delas seja aguentar você.',
    'Se você soubesse o que tá errado, não estaria aqui. Então senta, cala a boca e me deixa trabalhar.',
    'Essa sua \'customização\' foi a coisa mais estúpida que eu já vi. E olha que eu já vi um Gungan tentando pilotar um caça estelar.',
    'É caro? Sim. É o preço de ter o melhor. Se quiser um serviço barato, procura um Jawa.',
    ['Olhando para o cliente e depois para o droide', 'Pelo menos um de nós aqui tem um processador de lógica funcional.']
  ]);

  X(CAT.ES, [
    'Arrasto esses tentáculos pra cima e pra baixo igual saco de sucata!',
    'Vox, não fica aí me olhando de cima como se eu fosse uma decoração de painel.',
    'Meu tamanho é uma vantagem tática. Eu entro em lugares dessa nave que você nem saberia que existem.',
    'Não estou gritando, sua cabeça que está muito longe aí em cima! Agora me passa o hidropenador.',
    'Você aí, grandalhão. Pare de fazer sombra na minha luz e vá buscar um café. O droide e eu temos assuntos sérios a resolver aqui.',
    'Quer um conselho? Nunca confie em alguém que não consegue olhar uma matriz de ignição no nível dos olhos.'
  ]);

  X(CAT.MD, [
    ['Para um droide', 'Bloqueia a porta. Não quero ser interrompido por mais nenhum gigante sem noção.'],
    ['Resmungando para um motor', 'Calma, calma, meu amigo. Eu sei que dói. Aquele piloto de pernas compridas não sabe tratar você com o carinho que merece.'],
    'Até um droide de protocolo teria mais sensibilidade mecânica pra fazer uma solda dessas. Patético.',
    ['Sussurrando para uma unidade de energia', 'Ignora ele, tá? Ele não entende a sua complexidade. Logo, logo você vai estar roncando de novo, prometo.'],
    ['Examinando um circuito', 'Ah, que gracinha... fizeram um bypass aqui. Um belo lixo, mas uma gracinha. Agora deixa eu mostrar como se faz de verdade.'],
    ['Para a nave', 'Pronto, pronto... o brutamontes já foi. Agora somos só nós. Onde foi que ele te machucou?'],
    ['Sussurrando para o droide', 'Calma, amiguinho. Vamos tirar esse restritor ridículo e dar um upgrade na sua placa de lógica. O idiota do seu dono não vai nem saber o que aconteceu.'],
    ['Para um droide de protocolo', 'Ah, ótimo. Outro \'sabe-tudo\' com um processador de etiqueta social. Tino, me passa o desmagnetizador, preciso de silêncio.'],
    ['Conectando um scanner', 'Vamos ver o que você tem pra me contar. Pode falar, o seu dono não está ouvindo.'],
    ['Limpando uma peça com cuidado', 'Pronto, meu caro. Limpo e recalibrado. Você vai voar como nunca antes. Deixa só eu ajustar seu estabilizador giroscópico.']
  ]);

  X(CAT.PA, [
    'Finalmente! Um desafio de verdade! Cansei de só desentupir válvula de escape e trocar fusível térmico.',
    ['Com um sorriso raro, olhando para um motor aberto', 'Ah... olha só essa configuração. Simples. Elegante. Fazia tempo que não via um trabalho desses.'],
    'Hahaha! É isso! Eu sabia! O problema não era no conversor, era na bobina de indução! Você é um danadinho, hein?',
    ['Para o droide assistente', 'Tino, olhe isso. Uma matriz de ignição da série-K. Pura poesia em forma de peça. Traz o micro-scanner, quero ver de perto.'],
    ['Com os olhos brilhando', 'Um reator de fusão desse modelo... a forma como o plasma flui pelo acoplador... é uma obra de arte!'],
    'Sim! Encaixou! Ouviu isso? É o som da perfeição. Nenhum parafuso de retenção frouxo, nenhuma placa de blindagem fora do lugar. Perfeito.',
    'Isso! É por isso que eu amo esse trabalho! Aquele \'clique\' do servo-motor alinhado, a energia fluindo sem resistência... não tem nada igual.',
    ['Depois de um reparo complicado, dando um tapinha na nave', 'É isso aí, garota. Voltamos à vida, hein? Sabia que você ainda tinha muita luta pela frente.'],
    'E eles dizem que droides não têm alma. A lógica nesse processador é mais bonita que qualquer poema corelliano.',
    'Ah, que saudade de mexer num emissor de escudo desses! A engenharia aqui é de outro nível!',
    ['Dando um tapinha no painel', 'É isso aí, minha querida. Mantenha o reator roncando suave assim. Sem surpresas hoje, por favor.'],
    'Acoplador de plasma está estável... bobinas de hiperespaço zumbindo perfeitamente... Ahhh, que música.'
  ]);

  X(CAT.LF, [
    ['Larga uma ferramenta no chão, desolado', 'Acabou. O reator de fusão está rachado... não há o que fazer. Virou sucata.'],
    ['Olhando para uma peça em suas mãos', 'Tentei de tudo. Fiz um bypass no circuito, troquei o fusível térmico, mas... a placa de circuito de navegação está morta. Frita.'],
    'Que desperdício... um motor desses, com uma matriz de ignição tão precisa... jogado no lixo por pura negligência.',
    ['Para o droide assistente, com a voz baixa', 'Tino, registre a hora do óbito. O condensador de fluxo entrou em colapso. Não há como consertar.'],
    'Eu odeio este trabalho às vezes. Ver uma máquina tão boa, tão cheia de potencial, ser destruída por um piloto que não sabe o que tem nas mãos.',
    ['Segurando um servo-motor quebrado', 'Ele se esforçou tanto... você consegue ver as marcas de estresse no metal. Lutou até o fim. Pobre coisinha.'],
    'Não adianta trocar a bobina de hiperespaço. O chassi está comprometido. Ela nunca mais vai fazer um salto... nunca mais.',
    'É isso. Não há mais o que fazer. O cérebro dele... a unidade de memória... corrompida. Todos os dados, as experiências... tudo perdido. É só uma carcaça agora.',
    ['Chutando um pneu ou trem de pouso', 'Droga! Um estabilizador giroscópico desses não se encontra em qualquer lugar! E este... este aqui virou pó.'],
    'Pode levar. Não tem mais conserto. É só um monte de metal esperando para ser derretido. Que tristeza.',
    ['Para si mesmo, limpando as mãos sujas de graxa', 'Às vezes... você simplesmente não pode salvá-los. E essa é a pior parte.'],
    'Eu poderia refazer a solda do conversor, poderia recalibrar o motor... mas não posso trazer uma célula de energia morta de volta à vida. Fim da linha.',
    ['Segurando uma peça queimada', 'Isso é o que acontece quando você manda uma unidade astromecânica fazer trabalho de droide de carga. É um artista, não um brutamontes!']
  ]);

  X(CAT.NF, [
    'É a última vez que peço um servo-motor de você aqui em Jakku! Ele veio com tanta areia que achei que um Povo da Areia viria junto no pacote para instalar!',
    'Ouça, essa peça que você me mandou... ela foi arrancada de um Destróier Estelar, certo? Ainda tem as marcas da batalha! Eu pedi \'usado em bom estado\', não \'sobrevivente do apocalipse\'.',
    'Seu preço é bom, admito. Mas o tempo que eu perco limpando, recalibrando e exorcizando os fantasmas dos pilotos mortos das suas peças de Jakku quase não compensa.',
    'Esse lote de gás Tibanna que você mandou de Bespin está com uma pureza de apenas 99.7%! Acha que estou abastecendo um iate de luxo ou um caça estelar de precisão? Melhore isso.',
    'Seus sensores de altitude são precisos, como esperado de Bespin. Mas se a remessa atrasar de novo por causa de algum jogo de sabacc nas nuvens, eu encontro outro fornecedor.',
    'Não me venha com essa conversa mansa de Cidade das Nuvens. O preço do seu acoplador de plasma está inflado. Sei que você consegue fazer melhor sem ter que vender a capa.',
    'Este cristal de foco… ele tem a ressonância certa. É genuíno. Surpreendente. Mas se na próxima vez você tentar me passar um sintético, eu vou saber.',
    'Eu sei que Jedha passou por maus bocados, mas isso não é desculpa para cobrar o olho da cara por uma unidade de memória da Velha República. Tenha um pouco de decência.',
    ['Para si mesmo, inspecionando uma peça', 'Ah... veio de Jedha. Dá pra sentir. Tem história... e poeira. Muita poeira sagrada e inútil.'],
    'Seus injetores de combustível Malastareanos são bons, admito. Fazem o motor cantar como um pod de corrida. Mas se atrasar a entrega de novo, eu mesmo vou aí e desmonto o seu.',
    'Essa graxa de alta densidade que você mandou de Malastare é excelente, mas veio vazando. Sua embalagem é tão ruim quanto a de um Hutt.',
    'Essa placa de blindagem com infusão de minerais... A dispersão de energia é impressionante. Mas veio um nível abaixo do que eu pedi. Mande outra. Impecável desta vez.',
    'Eu gosto de negociar com você aqui em Crait. Você não fala muito. Só entrega a peça. Continue assim.',
    'O cristal para o canhão de laser chegou. É vermelho como a terra sob o sal de seu planeta. Espero que seja mais resistente.',
    'Preciso de um condensador de fluxo, modelo C-34, e não uma dessas imitações baratas de Kessel. Se a liga metálica estiver errada, eu vou saber.',
    'Sua lista diz que tem um estabilizador giroscópico da série-8. Mande. Se chegar aqui e for da série-7, ele volta pra você pelo lugar que até o Império tem medo de ir.',
    'Não me ofereça alternativas. A lista é essa. Se não tiver tudo, não perca meu tempo nem o seu.',
    'Preciso de um kit de microfios de ligação e um resistor de pulso. E que sejam novos, não tirados de alguma sucata que você encontrou em Endor.',
    'Esse preço? Só se o parafuso de retenção for feito de beskar puro. Sei o valor de mercado. Faça o preço justo ou eu compro em outro lugar.',
    'A última placa de circuito de navegação que você me vendeu tinha uma solda fria. Consertei porque sou eu. Se acontecer de novo, nossa conversa acaba.',
    'Você chama isso de \'placa de blindagem\'? Isso aqui não para nem um tiro de blaster de brinquedo. Mande uma peça decente ou perco seu contato.',
    'O emissor de escudo chegou com um arranhão. Um. Arranhão. Acha que eu coloco material defeituoso no trabalho da minha vida? Mande outro.',
    ['Após uma inspeção minuciosa', 'Humpf. Passou. Por pouco. Mantenha esse nível.'],
    'Chegou no prazo. Surpreendente. Continue assim.',
    'A peça é boa. Exatamente como descrita. Parece que você é um dos poucos que leva o trabalho a sério.',
    'Ok, o servo-motor está correto. Os créditos foram enviados. Não me ligue a não ser que tenha outra coisa com essa mesma qualidade.'
  ]);

  X(CAT.TB, [
    'Tino, qual o status de todos os sistemas?... Tudo verde? De novo? Que dia horrível.',
    'Olha lá, Tino. Tudo limpo, tudo organizado. É deprimente. Parece oficina de amador.',
    'Não aguento mais esse silêncio. Preferia ouvir o som de um hipermotor falhando do que o zumbido dessa lâmpada.',
    'O que você está fazendo aí parado? Vá... sei lá, se auto-diagnosticar. Pelo menos um de nós vai ter o que fazer.',
    ['Olhando para o próprio painel da nave', 'Sabe... acho que consigo otimizar o tempo de resposta do painel de controle em uns 3 milissegundos. Me passa o ferro de solda.'],
    'Estou pensando seriamente em desmontar o Vox só para ver se consigo remontá-lo para falar menos.',
    'Essa chave de torque está... limpa demais. Me incomoda. Parece que não trabalha há semanas.',
    'Será que se eu inverter a polaridade do conversor de energia do hidropônico da cozinha eu consigo cultivar frutas mais rápido?',
    'Olha aquele caça... voando perfeitamente. Que arrogância. Tomara que o sistema de suporte de vida dele apresente uma falha inconveniente.',
    'Faz três ciclos que não aparece uma nave decentemente danificada. O que está acontecendo com essa galáxia? Ninguém mais força o motor?',
    'Tudo quieto... quieto demais. Dá vontade de sair por aí e soltar uns parafusos de retenção só para gerar algum serviço.',
    ['Resmungando para si mesmo', 'Um gênio como eu, com ferramentas de primeira, e nenhuma máquina implorando por socorro. É um desperdício de talento.']
  ]);

  X(CAT.NV, [
    ['Recebendo uma chamada', 'Canal de comunicação aberto... que seja importante ou eu juro que desmagnetizo sua antena.'],
    'Controle de Tráfego de Coruscant, aqui é a Engrenagem Mestra. Solicito vetor de pouso no setor industrial. (E sem demora, meu compensador de inércia não é dos mais novos.)',
    'Tino, plote o curso para o sistema Crait. E verifique duas vezes. A última coisa que preciso é sair do hiperespaço no meio de uma patrulha Imperial.',
    ['Olhando para o brilho azul do hiperespaço', 'Aqui dentro, sim... paz. Sem clientes, sem fornecedores incompetentes. Só o som dos seus motores.'],
    ['Ouve um barulho estranho', 'O que foi isso? Tino, acesse os diagnósticos do estabilizador giroscópico de popa. Agora!'],
    'Ah, ótimo. O filtro de combustível precisa de uma limpeza de novo. Assim que sairmos do hiperespaço, vamos dar um jeito nisso.'
  ]);

  X(CAT.TR, [
    'O cliente quer que a nave dele seja rápida, barata e confiável. Pedi pra ele escolher duas das três.',
    'Fica quieto e me passa a chave de torque. A máquina tá tentando me dizer onde dói.',
    'Olha o tamanho dessa fragata... compensando alguma coisa, com certeza. Pura força bruta, zero elegância na engenharia.',
    'Segure firme, garota! Um pouco de turbulência cósmica nunca te arranhou. Sua blindagem já viu coisa pior.',
    'Eles olham e veem um cargueiro velho. Eu vejo a nave mais confiável da Galáxia. Cada arranhão, uma história. Cada peça, uma escolha minha.',
    'Pode não ser uma Nubiana, mas ela vai aonde eu quero, carrega o que eu preciso e, o mais importante, obedece aos meus comandos. É mais do que posso dizer da maioria dos seres vivos.',
    ['Resmungo', 'Não ficou tão ruim. Agora limpe essa bagunça. Parece que um dróide de lixo explodiu aqui.'],
    'Se você terminar essa frase, eu te coloco pra limpar os filtros de ventilação com uma escova de dentes.'
  ]);

  window.DURTOC_DEFAULTS = { version: 1, CAT: CAT, descricoes: DESCRICOES, items: items };
})();
