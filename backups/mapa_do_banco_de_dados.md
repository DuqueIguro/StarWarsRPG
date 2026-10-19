# Contexto de Desenvolvimento: Banco de Dados Supabase (Star Wars RPG)

## 1. Arquitetura de Conexão
O projeto utiliza Supabase como BaaS. As credenciais (URL e Anon Key) estão modularizadas em um arquivo JSON/JS de configuração e são injetadas no escopo global. 
*   **Variável Global:** O cliente do Supabase é acessado em qualquer script via `supabaseClient`.
*   **Autenticação:** As operações de banco exigem a identificação do usuário ativo na sessão:
    ```javascript
    const { data: userData, error } = await supabaseClient.auth.getUser();
    const userId = userData.user.id; 
    ```

## 2. Padrão de Operações (CRUD Frontend)
O sistema realiza o CRUD diretamente do frontend via JavaScript assíncrono. O tratamento de respostas segue o formato `{ data, error }`.

*   **Leitura (Select):** `await supabaseClient.from('tabela').select('*').eq('coluna', valor);`
*   **Inserção (Insert):** `await supabaseClient.from('tabela').insert([{ col1: 'A', user_id: userId }]);`
*   **Atualização (Update):** `await supabaseClient.from('tabela').update({ col1: 'B' }).eq('id', recordId);`
*   **Exclusão (Delete):** `await supabaseClient.from('tabela').delete().eq('id', recordId);`

## 3. Diretrizes de Segurança (RLS - Row Level Security) e Autorização
*   **Regra de Ouro:** O banco é blindado por RLS. Operações de `INSERT`, `UPDATE` ou `DELETE` frequentemente exigem que o payload contenha a assinatura do autor (`user_id` e/ou `personagem_id`). 
*   **Acesso ISB (Mestres/Devs):** A tabela `permissoes` e a função auxiliar `holonet_is_mestre()` ditam os privilégios administrativos. Usuários com os cargos `mestre`, `dev` ou `desenvolvedor` possuem políticas de RLS de exceção (bypass) com permissão irrestrita (`ALL`) às tabelas críticas do sistema.
*   **NUNCA** sugira o uso da `service_role key` no frontend. A segurança deve ser resolvida via modelagem de RLS ou ajuste no payload JS.

## 4. Estruturas JSONB Críticas (Atenção a estes nós)
O banco utiliza campos `jsonb` e `text` (com JSON parseado) para flexibilidade. Estruturas conhecidas:
*   `personagens.dados_ficha`: Contém o estado reativo da ficha do RPG (ex: `.biografia`, `.atributosBase`, `.pericias`, `.modificadoresManuais`).
*   `inventario.dados_customizados`: Contém metadados mutáveis ou itens criados por jogadores (ex: `.nome`, `.qualidade`, `.dadoDano`, `.bonusAtaque`). Na leitura, mescla-se com o ID base do item.
    *   **Naves** (`category = 'Naves Prontas'`) guardam aqui o combustível: `.subCap` / `.subLevel` (subluz, em **litros**), `.hypCap` / `.hypLevel` (hiperespacial, em **kg**), `.motorClass` (classe do motor: `'0.5'`, `'1'`, `'2'` ou `'3'`) e `.quote`. `subCap`/`hypCap` nulos = nave ainda não calibrada no Posto.
    *   **Nunca** altere `subLevel`/`hypLevel` com `update` direto de `dados_customizados` (sobrescreve alterações de outra página). Use a RPC `ajustar_combustivel`.
*   `log_bancario.dados_adicionais`: Contém metadados de transações financeiras e eventos bancários.
*   `ordens_servico.cliente`: `{nome, afiliacao, contato_holonet}`.
*   `ordens_servico.itens`: array de serviços `{servico_id, servico, tipo, improvisado, subtotal, detalhes:{causaDoProblema, peca:{nome, custo, cobrada}, maoDeObra:{custo, expressao?}}}`. `servico_id` aponta para `servicos_mcmt.id` (null se personalizado).
*   `ordens_servico.taxas` / `taxas_ocultas`: array de `{nome, sigla, tipo ('fixa'|'percentual'), base ('peca'|'mao_de_obra'|'mao_de_obra_improvisada'|'servico_total'), percentual, custo, justificativa}`. `base` e `percentual` só existem em taxas percentuais.
*   `ordens_servico.gorjeta`: `{tipo ('fixa'|'percentual'), percentual?, custo, justificativa}` ou null.
*   `ordens_servico.financeiro`: `{subtotalPecas, subtotalMaoDeObra, subtotalTaxasFixas, subtotalAdicionais, subtotalTaxasOcultas, moeda, total}`. Adicionais incluem taxas percentuais, gorjeta e taxas ocultas. `subtotalTaxasOcultas` é removido pela view para quem não é ISB.
*   `holonet_logs.mudancas` / `dados_antes` / `dados_depois`: Registram payloads em JSON das alterações executadas pela moderação no painel da HoloNet.

---

## 5. Estrutura do Banco de Dados (Schema)

| Tabela | Coluna | Tipo de Dado | Restrições / Notas |
| :--- | :--- | :--- | :--- |
| **cupons** | id, codigo, moeda, tipo_desconto, valor_desconto, limite_usos, vezes_usado, is_ativo, created_at, updated_at | uuid, text, text, text, numeric, int4, int4, bool, timestamptz, timestamptz | Primary Key (id), Unique (codigo) |
| **dividas_emprestimos** | id, categoria, titulo, alvo_descricao, personagem_id, valor_original, taxa_juros, valor_total, frequencia, status, observacoes, created_at, updated_at, ciclos_totais, ciclos_pagos | uuid, text, text, text, uuid, int8, numeric, int8, text, text, text, timestamptz, timestamptz, int4, int4 | Primary Key (id) |
| **frota_ativa** | id, nome, imagem, escudo_atual, escudo_maximo, casco_atual, casco_maximo, faccao, custo, created_at, visivel | uuid, text, text, int4, int4, int4, int4, text, int4, timestamptz, bool | Primary Key (id) |
| **holonet_config** | chave, valor, updated_at | text, text, timestamptz | Primary Key (chave) |
| **holonet_logs** | id, created_at, user_id, usuario_nome, usuario_cargo, secao, tabela, acao, registro_id, titulo_registro, resumo, mudancas, dados_antes, dados_depois | int8, timestamptz, uuid, text, text, text, text, text, text, text, text, jsonb, jsonb, jsonb | Primary Identity (id) |
| **holonet_mercados** | id, ordem, nome, valor, variacao, ativo, created_at, updated_at | int8, int4, text, text, numeric, bool, timestamptz, timestamptz | Primary Identity (id) |
| **holonet_noticias** | id, ordem, categoria, icone, titulo, subtitulo, corpo, fonte, data_texto, tag_aurebesh, publicada, created_at, updated_at | int8, int4, text, text, text, text, text, text, text, text, bool, timestamptz, timestamptz | Primary Identity (id) |
| **holonet_ticker** | id, ordem, texto, ativo, created_at, updated_at | int8, int4, text, bool, timestamptz, timestamptz | Primary Identity (id) |
| **holonet_transmissoes** | id, ordem, canal, status, descricao, ativo, created_at, updated_at | int8, int4, text, text, text, bool, timestamptz, timestamptz | Primary Identity (id) |
| **inventario** | id, user_id, personagem_id, item_id, quantidade, origem, dados_customizados, created_at | uuid, uuid, uuid, text, int4, text, jsonb, timestamptz | Primary Key (id) |
| **log_bancario** | id, user_id, personagem_id, tipo_evento, descricao, valor_creditos, dados_adicionais, created_at | uuid, uuid, uuid, text, text, int8, jsonb, timestamptz | Primary Key (id) |
| **logs_auditoria** | id, personagem_id, tipo_evento, descricao, mudanca_creditos, created_at | uuid, uuid, text, text, int8, timestamptz | Primary Key (id) |
| **logs_cassino** | id, personagem_id, user_id, jogo, tipo_evento, descricao, delta_fichas, created_at | uuid, uuid, uuid, varchar, varchar, text, int4, timestamptz | Primary Key (id) |
| **logs_dados** | id, personagem_id, user_id, nome_rolagem, dado_puro, bonus_total, resultado_final, detalhamento, created_at | int8, uuid, uuid, text, int4, int4, int4, text, timestamptz | Primary Identity (id) |
| **logs_taticos** | id, user_id, nome_jogador, nave_nome, faccao, acao, detalhes, created_at | uuid, uuid, text, text, text, text, text, timestamptz | Primary Key (id) |
| **ordens_servico** | id, ano_aby, sigla_localidade, serie, localidade, data_texto, sigiloso, status, titulo, mecanicos, unidade_responsavel, cliente, relatorio_problema, notas_mecanico, itens, taxas, taxas_ocultas, gorjeta, financeiro, termos_automaticos, termos_manuais, termos, created_by, created_at, updated_at | text, int2, text, int4, text, text, bool, text, text, text[], text, jsonb, text, text, jsonb, jsonb, jsonb, jsonb, jsonb, text[], text, text, uuid, timestamptz, timestamptz | Primary Key (id), Unique (ano_aby, sigla_localidade, serie). `id` e `serie` gerados pelo trigger `trg_os_gerar_id` no formato `OS-[ANO]-[SIGLA]-[SERIE 3 dígitos]` (ex.: `OS-14-COR-003`); o ID é imutável após criado. `status` ∈ Em Aberto, Em Progresso, Aguardando Peça, Concluído, Cancelado. `created_by` default `auth.uid()` |
| **ordens_servico_leitura** *(view)* | mesmas colunas de `ordens_servico`, exceto `created_by` | — | View de leitura pública (`anon`, `authenticated`). Filtra `sigiloso = false` OU `os_pode_editar()`; `taxas_ocultas` vira `[]` e `financeiro` perde `subtotalTaxasOcultas` para quem não é ISB. Roda com privilégios do dono (contorna o RLS da tabela de propósito) |
| **permissoes** | id, user_id, cargo, created_at, nome | int4, uuid, text, timestamptz, text | Primary Key (id) |
| **personagens** | id, user_id, nome, creditos, dados_ficha, created_at, updated_at, grupo_faccao, chave_transferencia, fichas, img_url, facecred, peggats | uuid, uuid, text, int8, jsonb, timestamptz, timestamptz, text, varchar, int4, text, int4, int4 | Primary Key (id), Unique (chave_transferencia) |
| **rotas_hiperespaco** | id, planeta_a, planeta_b, distancia_pc, criado_por, created_at | int8, text, text, int4, uuid, timestamptz | Primary Identity (id), Unique (planeta_a, planeta_b). Check: `planeta_a < planeta_b` (par sempre em ordem alfabética: A↔B e B↔A são a mesma linha); `distancia_pc > 0` |
| **servicos_mcmt** | id, oficina, nome_servico, categoria, mao_de_obra, peca, preco_componentes, descricao, created_at | int8, varchar, text, varchar, int2, text, int4, text, timestamptz | Primary Identity (id) |
| **status_faccoes** | faccao, em_combate | text, bool | Primary Key (faccao) |
| **storage_access** | id, key_name, display_name, password, redirect_url | int8, text, text, text, text | Primary Identity (id), Unique (key_name) |
| **system_access** | id, key_name, display_name, password, redirect_url, is_active | int8, text, text, text, text, bool | Primary Identity (id), Unique (key_name) |
| **transacoes_log** | id, tipo_transacao, remetente_id, destinatario_id, valor_ou_quantidade, detalhes, data_transacao | int4, varchar, uuid, uuid, int4, text, timestamp | Primary Key (id) |

---

## 6. Políticas de Segurança Ativas (RLS Policies)

| Tabela | Nome da Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- | :--- |
| **cupons** | Leitura de cupons ativos | SELECT | anon, authenticated | `is_ativo = true` |
| **cupons** | ISB gerenciamento total de cupons | ALL | authenticated | Cargos ISB (`mestre`, `dev`, `desenvolvedor`) |
| **dividas_emprestimos** | Jogadores podem ver proprias dividas | SELECT | authenticated | `personagem_id` pertence a um personagem do `auth.uid()` |
| **dividas_emprestimos** | Jogadores podem criar dividas | INSERT | authenticated | `personagem_id` pertence a um personagem do `auth.uid()` |
| **dividas_emprestimos** | Jogadores podem deletar proprias dividas | DELETE | authenticated | `personagem_id` pertence a um personagem do `auth.uid()` |
| **dividas_emprestimos** | ISB gerenciamento total de dividas e emprestimos | ALL | authenticated | Cargos ISB (`mestre`, `dev`, `desenvolvedor`) |
| **frota_ativa** | Acesso total frota | ALL | authenticated | Acesso livre a usuários autenticados |
| **holonet_config** | holonet_config leitura | SELECT | anon, authenticated | Leitura irrestrita (`true`) |
| **holonet_config** | holonet_config ISB escrita | ALL | authenticated | Apenas Mestre/Dev via `holonet_is_mestre()` |
| **holonet_logs** | holonet_logs leitura ISB | SELECT | authenticated | Apenas Mestre/Dev via `holonet_is_mestre()` |
| **holonet_mercados** | holonet_mercados leitura | SELECT | anon, authenticated | `ativo = true` OU `holonet_is_mestre()` |
| **holonet_mercados** | holonet_mercados ISB escrita | ALL | authenticated | Apenas Mestre/Dev via `holonet_is_mestre()` |
| **holonet_noticias** | holonet_noticias leitura | SELECT | anon, authenticated | `publicada = true` OU `holonet_is_mestre()` |
| **holonet_noticias** | holonet_noticias ISB escrita | ALL | authenticated | Apenas Mestre/Dev via `holonet_is_mestre()` |
| **holonet_ticker** | holonet_ticker leitura | SELECT | anon, authenticated | `ativo = true` OU `holonet_is_mestre()` |
| **holonet_ticker** | holonet_ticker ISB escrita | ALL | authenticated | Apenas Mestre/Dev via `holonet_is_mestre()` |
| **holonet_transmissoes** | holonet_transmissoes leitura | SELECT | anon, authenticated | `ativo = true` OU `holonet_is_mestre()` |
| **holonet_transmissoes** | holonet_transmissoes ISB escrita | ALL | authenticated | Apenas Mestre/Dev via `holonet_is_mestre()` |
| **inventario** | Visualizar próprio inventário | SELECT | public | `auth.uid() = user_id` |
| **inventario** | Inserir no próprio inventário | INSERT | public | `auth.uid() = user_id` |
| **inventario** | Atualizar próprio inventário | UPDATE | public | `auth.uid() = user_id` |
| **inventario** | Deletar do próprio inventário | DELETE | public | `auth.uid() = user_id` |
| **inventario** | ISB acesso total a inventario | ALL | public | Cargos ISB (`mestre`, `dev`, `desenvolvedor`) |
| **inventario** | Inventario_Select / Insert / Update / Delete | SELECT, INSERT, UPDATE, DELETE | authenticated | Acesso total de CRUD para autenticados |
| **log_bancario** | Permitir leitura log_bancario proprio e ISB | SELECT | authenticated | `auth.uid() = user_id` OU Cargos ISB |
| **log_bancario** | Permitir insercao log_bancario autenticado | INSERT | authenticated | Autenticados podem inserir transações |
| **log_bancario** | ISB delete log_bancario | DELETE | authenticated | Cargos ISB (`mestre`, `dev`, `desenvolvedor`) |
| **logs_auditoria** | Visualizar próprios logs | SELECT | public | Personagem associado a `auth.uid()` |
| **logs_auditoria** | Inserir próprios logs | INSERT | public | Personagem associado a `auth.uid()` |
| **logs_auditoria** | Acesso irrestrito de leitura aos logs para o ISB | SELECT | public | Cargos: `mestre` ou `dev` |
| **logs_auditoria** | ISB acesso total a logs_auditoria | ALL | public | Cargos ISB (`mestre`, `dev`, `desenvolvedor`) |
| **logs_auditoria** | LogsAuditoria_Select / LogsAuditoria_Insert | SELECT, INSERT | authenticated | Autenticados têm permissão de leitura e inserção |
| **logs_cassino** | Permitir select proprio e ISB logs_cassino | SELECT | authenticated | `auth.uid() = user_id` OU Cargos ISB |
| **logs_cassino** | Permitir insert proprio logs_cassino | INSERT | authenticated | `auth.uid() = user_id` |
| **logs_cassino** | Permitir delete ISB logs_cassino | DELETE | authenticated | Cargos ISB (`mestre`, `dev`, `desenvolvedor`) |
| **logs_dados** | Jogador pode ler proprios dados | SELECT | public | `auth.uid() = user_id` |
| **logs_dados** | Jogador pode inserir proprios dados | INSERT | public | `auth.uid() = user_id` |
| **logs_dados** | ISB acesso total a logs de dados | ALL | public | Cargos ISB (`mestre`, `dev`, `desenvolvedor`) |
| **logs_taticos** | Acesso total logs | ALL | authenticated | Acesso livre a usuários autenticados |
| **ordens_servico** | ISB gerenciamento total de ordens_servico | ALL | authenticated | `os_pode_editar()` (hoje = `holonet_is_mestre()`). `anon` sem acesso à tabela; leitura pública apenas pela view `ordens_servico_leitura` |
| **permissoes** | Permitir leitura da própria permissao | SELECT | public | `auth.uid() = user_id` |
| **personagens** | Jogadores podem ver/criar/atualizar/deletar | SELECT, INSERT, UPDATE, DELETE | public | `auth.uid() = user_id` |
| **personagens** | Acesso irrestrito de leitura aos personagens para o ISB | SELECT | public | Cargos: `mestre` ou `dev` |
| **personagens** | ISB acesso total a personagens | ALL | public | Cargos ISB (`mestre`, `dev`, `desenvolvedor`) |
| **personagens** | Permitir leitura geral personagens | SELECT | authenticated | Leitura aberta para autenticados |
| **personagens** | Permitir update personagens | UPDATE | authenticated | Atualização aberta para autenticados |
| **rotas_hiperespaco** | Leitura de rotas para autenticados | SELECT | authenticated | Leitura irrestrita (`true`) |
| **rotas_hiperespaco** | ISB gerenciamento total de rotas | ALL | authenticated | Apenas Mestre/Dev via `holonet_is_mestre()` |
| **servicos_mcmt** | Permitir leitura publica dos servicos | SELECT | public | Leitura irrestrita (`true`) |
| **servicos_mcmt** | Permitir insercao/update/delete apenas autorizados | INSERT, UPDATE, DELETE | authenticated | Restrito a UUIDs específicos de mestres/oficinas |
| **status_faccoes** | Acesso total status_faccoes | ALL | authenticated | Acesso livre a usuários autenticados |
| **storage_access** | Enable read access for all users | SELECT | public | Leitura irrestrita (`true`) |
| **system_access** | Enable read access for all users / Permitir leitura publica | SELECT | public | Leitura irrestrita (`true`) |
| **transacoes_log** | Log_Select / Log_Insert | SELECT, INSERT | authenticated | Leitura e inserção liberadas para autenticados |

---

## 7. Funções RPC (Postgres) — chamadas via `supabaseClient.rpc(...)`
Funções com `SECURITY DEFINER` centralizam escritas sensíveis ou que precisam ser atômicas. Todas exigem usuário autenticado (`EXECUTE` revogado para `anon`).

| Função | Parâmetros | Retorno | Uso |
| :--- | :--- | :--- | :--- |
| `holonet_is_mestre()` | — | bool | Helper de RLS: `true` para cargos `mestre`/`dev`/`desenvolvedor`. |
| `os_pode_editar()` | — | bool | Helper de RLS/view das ordens de serviço (security definer). Hoje apenas envolve `holonet_is_mestre()`; é o **único ponto a alterar** para liberar criação/edição de OS à equipe da oficina. |
| `limites_regiao(p_regiao)` | text | tabela `(r_min, r_max)` | Raios (em PC) do anel de cada região: Núcleo 0–3.500, Orla Interior 3.500–8.500, Orla Média 8.500–14.000, Orla Exterior 14.000–20.000; região desconhecida = galáxia inteira (0–20.000). **É aqui que se ajusta a escala da galáxia.** |
| `sortear_distancia(p_regiao_a, p_regiao_b)` | text, text | int | Sorteia a distância entre dois planetas: cada um cai num ponto aleatório (uniforme por área) do anel da sua região e a distância é a reta entre os pontos (mínimo 400 PC). **Não grava nada.** Usada por `obter_ou_criar_rota` e pelas simulações do ISB. |
| `consultar_rota(p_a, p_b)` | text, text | int ou `null` | Lê a distância já catalogada entre dois planetas (ordem dos nomes indiferente). **Não cria nada** — usada nas simulações do ISB. |
| `obter_ou_criar_rota(p_a, p_b, p_regiao_a, p_regiao_b)` | text, text, text, text | tabela `(distancia int, criada bool)` | Devolve a distância da rota; se for a primeira viagem, sorteia no servidor (`sortear_distancia`), grava em `rotas_hiperespaco` e retorna `criada = true`. Resistente a corrida (o primeiro a gravar vence). |
| `ajustar_combustivel(p_inventario_id, p_tipo, p_delta)` | uuid (`inventario.id`), text (`'subluz'` ou `'hiperespacial'`), numeric | numeric (nível resultante) | Soma (`delta > 0`, Posto) ou desconta (`delta < 0`, Navegação) combustível de uma nave em `inventario.dados_customizados` (`subLevel`/`hypLevel`). Trava a linha (`FOR UPDATE`), limita ao máximo (`subCap`/`hypCap`) e só altera o nível. Só o dono (`inventario.user_id`) ou ISB. Erros: `NAO_AUTENTICADO`, `TIPO_INVALIDO`, `QUANTIDADE_INVALIDA`, `NAVE_NAO_ENCONTRADA`, `SEM_PERMISSAO`, `NAVE_NAO_CALIBRADA`, `COMBUSTIVEL_INSUFICIENTE`. |
| `definir_motor_nave(p_inventario_id, p_classe)` | uuid, text (`'0.5'`, `'1'`, `'2'`, `'3'`) | void | Grava `dados_customizados.motorClass`. Jogador define **uma única vez** (se estiver vazio); ISB altera sempre. Erros: `CLASSE_INVALIDA`, `MOTOR_JA_DEFINIDO`, `SEM_PERMISSAO`, `NAVE_NAO_ENCONTRADA`. |

### Regras de negócio da navegação (`distanciaPlanetas.html`)
*   **Rotas fixas:** a distância entre dois planetas é sorteada **uma única vez** (1ª viagem real) e gravada em `rotas_hiperespaco`. Vale nos dois sentidos.
*   **Viagem com parada (A > B > C):** cada trecho (A-B, B-C) é resolvido separadamente via `obter_ou_criar_rota`: trecho conhecido reaproveita o valor, trecho desconhecido é sorteado e gravado; o total é a soma. A rota direta A-C **não** é afetada.
*   **Modelo da galáxia:** as regiões são anéis concêntricos, cada um envolvendo o anterior (Núcleo é um disco). Dois planetas da **mesma** orla podem ficar muito perto ou muito longe (em orlas externas, a área é bem maior, então a dispersão também). Os sorteios de rotas de pares diferentes são independentes: não há coordenadas fixas por planeta, então a desigualdade triangular não é garantida (A-B e B-C curtas não obrigam A-C curta).
*   **Chaves das rotas:** o nome do planeta (`planetas_database.json → nome`). Renomear um planeta no JSON deixa suas rotas antigas órfãs.
*   **Naves e combustível compartilhados com o Posto (`posto.html`):** as duas páginas usam as mesmas naves (`inventario`) e a mesma RPC `ajustar_combustivel`. Posto soma; Navegação subtrai. Unidades: subluz em litros (L), hiperespacial em kg.
*   **Quem vê o quê:** jogador vê as naves do seu personagem (igual ao Posto); ISB vê as naves de todos os personagens, mais as naves *placeholder* de simulação.
*   **Simulação (somente ISB):** as naves *placeholder* do JS (`simulationShips`) e qualquer rota ainda desconhecida **não gravam nada** no banco; rotas já catalogadas são reaproveitadas.
*   **Log:** cada viagem/manobra com nave real é registrada em `logs_taticos` (`acao` = `VIAGEM_HIPERESPACO` ou `MANOBRA_SUBLUZ`). Abastecimentos continuam em `logs_auditoria` (`tipo_evento = 'ABASTECIMENTO'`).

### Ordens de serviço (`durtoc/oficina.html`)
*   **Leitura:** a página lê de `ordens_servico_leitura` (nunca da tabela). OS sigilosas e linhas de taxas ocultas só chegam ao ISB.
*   **Criação/edição/exclusão:** direto na tabela `ordens_servico`, só ISB. O payload **não** envia `id` nem `serie`: o trigger os calcula (próxima série livre por ano + sigla, com advisory lock). Após o insert, usar `.select().single()` para obter o ID gerado.
*   **Serviços:** o formulário puxa o catálogo de `servicos_mcmt` (`nome_servico`, `peca`, `preco_componentes`, `mao_de_obra`) e grava uma cópia em `itens`; mudanças posteriores no catálogo não alteram OS antigas.
*   **Financeiro:** calculado no frontend e gravado em `financeiro`. Base `servico_total` = valor de todas as peças + mão de obra; `peca` inclui peças fornecidas pelo cliente (`cobrada = false`), que não entram em `subtotalPecas`.
*   **Siglas de localidade:** vêm de `durtoc/database/siglasLocalidade.json`. OS legadas `OS-14-OFI-001/002` mantêm a sigla `OFI`, que não existe nesse arquivo.