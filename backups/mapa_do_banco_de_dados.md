# Contexto de Desenvolvimento: Banco de Dados Supabase (Star Wars RPG)

## 1. Arquitetura de Conexão
O projeto utiliza Supabase como BaaS. As credenciais (URL e Anon Key) estão modularizadas em um arquivo JSON/JS de configuração e são injetadas no escopo global.
*   **Variável Global:** O cliente do Supabase é declarado como `const supabaseClient` em `js/supabase.js`. Por ser `const`, ele fica acessível pelo nome em qualquer script, mas **não** é propriedade de `window`. Use `supabaseClient` diretamente, ou `typeof supabaseClient !== 'undefined' ? supabaseClient : window.supabaseClient` como fallback.
*   **Autenticação:** As operações de banco exigem a identificação do usuário ativo na sessão:
    ```javascript
    const { data: userData, error } = await supabaseClient.auth.getUser();
    const userId = userData.user.id;
    ```
*   **Ambientes:** Produção e staging são instâncias separadas. Antes de testar, confirme em qual ambiente a página está rodando, porque o banco e as políticas podem divergir entre eles.

## 2. Padrão de Operações (CRUD Frontend)
O sistema realiza o CRUD diretamente do frontend via JavaScript assíncrono. O tratamento de respostas segue o formato `{ data, error }`.

*   **Leitura (Select):** `await supabaseClient.from('tabela').select('*').eq('coluna', valor);`
*   **Inserção (Insert):** `await supabaseClient.from('tabela').insert([{ col1: 'A', user_id: userId }]);`
*   **Atualização (Update):** `await supabaseClient.from('tabela').update({ col1: 'B' }).eq('id', recordId);`
*   **Exclusão (Delete):** `await supabaseClient.from('tabela').delete().eq('id', recordId);`

## 3. Diretrizes de Segurança (RLS - Row Level Security) e Autorização
*   **Regra de Ouro:** O banco é blindado por RLS. Operações de `INSERT`, `UPDATE` ou `DELETE` frequentemente exigem que o payload contenha a assinatura do autor (`user_id` e/ou `personagem_id`).
*   **Acesso ISB (Mestres/Devs):** A tabela `permissoes` e a função auxiliar `holonet_is_mestre()` ditam os privilégios administrativos. Usuários com os cargos `mestre`, `dev` ou `desenvolvedor` possuem políticas de exceção com acesso irrestrito (`ALL`) às tabelas críticas do sistema.
*   **Padrão de cargos:** Sempre use os três cargos (`mestre`, `dev`, `desenvolvedor`). Algumas políticas antigas ainda usam só `mestre` e `dev` (ver seção 8).
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
| **dev_itens** | id, tipo, titulo, descricao, pagina, status, responsavel, origem, reportado_por, criado_por, created_at, updated_at, fechado_em | int8, text, text, text, text, text, text, text, text, uuid, timestamptz, timestamptz, timestamptz | Primary Identity (id). `tipo` ∈ bug, post, servico. `origem` ∈ dev, manutencao. `status` (constraint `dev_itens_status_check`): valores aceitos = aberto, por_fazer, em_andamento, aguardando_revisao, abandonado, concluido. Posts usam aberto/concluido. Chamados e serviços usam o fluxo completo. `aberto` em chamados é legado e a UI exibe como "Por fazer". A constraint não cruza `tipo` com `status`, então a validação por tipo fica no JS. `criado_por` deve ter default `auth.uid()` (a confirmar no painel). Reports anônimos da página de manutenção entram com `origem = 'manutencao'` e `criado_por` nulo |
| **dividas_emprestimos** | id, categoria, titulo, alvo_descricao, personagem_id, valor_original, taxa_juros, valor_total, frequencia, status, observacoes, created_at, updated_at, ciclos_totais, ciclos_pagos | uuid, text, text, text, uuid, int8, numeric, int8, text, text, text, timestamptz, timestamptz, int4, int4 | Primary Key (id) |
| **frota_ativa** | id, nome, imagem, escudo_atual, escudo_maximo, casco_atual, casco_maximo, faccao, custo, created_at, visivel | uuid, text, text, int4, int4, int4, int4, text, int4, timestamptz, bool | Primary Key (id) |
| **holonet_config** | chave, valor, updated_at | text, text, timestamptz | Primary Key (chave) |
| **holonet_logs** | id, created_at, user_id, usuario_nome, usuario_cargo, secao, tabela, acao, registro_id, titulo_registro, resumo, mudancas, dados_antes, dados_depois | int8, timestamptz, uuid, text, text, text, text, text, text, text, text, jsonb, jsonb, jsonb | Primary Identity (id). Exclusivo das ações da página Holonet (HNN) |
| **holonet_mercados** | id, ordem, nome, valor, variacao, ativo, created_at, updated_at | int8, int4, text, text, numeric, bool, timestamptz, timestamptz | Primary Identity (id) |
| **holonet_noticias** | id, ordem, categoria, icone, titulo, subtitulo, corpo, fonte, data_texto, tag_aurebesh, publicada, created_at, updated_at | int8, int4, text, text, text, text, text, text, text, text, bool, timestamptz, timestamptz | Primary Identity (id) |
| **holonet_ticker** | id, ordem, texto, ativo, created_at, updated_at | int8, int4, text, bool, timestamptz, timestamptz | Primary Identity (id) |
| **holonet_transmissoes** | id, ordem, canal, status, descricao, ativo, created_at, updated_at | int8, int4, text, text, text, bool, timestamptz, timestamptz | Primary Identity (id) |
| **inventario** | id, user_id, personagem_id, item_id, quantidade, origem, dados_customizados, created_at | uuid, uuid, uuid, text, int4, text, jsonb, timestamptz | Primary Key (id) |
| **log_bancario** | id, user_id, personagem_id, tipo_evento, descricao, valor_creditos, dados_adicionais, created_at | uuid, uuid, uuid, text, text, int8, jsonb, timestamptz | Primary Key (id) |
| **logs_auditoria** | id, personagem_id, tipo_evento, descricao, mudanca_creditos, created_at | uuid, uuid, text, text, int8, timestamptz | Primary Key (id) |
| **logs_cassino** | id, personagem_id, user_id, jogo, tipo_evento, descricao, delta_fichas, created_at | uuid, uuid, uuid, varchar, varchar, text, int4, timestamptz | Primary Key (id) |
| **logs_dados** | id, personagem_id, user_id, nome_rolagem, dado_puro, bonus_total, resultado_final, detalhamento, created_at | int8, uuid, uuid, text, int4, int4, int4, text, timestamptz | Primary Identity (id) |
| **logs_dev** | id, created_at, user_id, usuario_nome, usuario_cargo, acao, tabela, registro_id, titulo_registro, resumo | int8, timestamptz, uuid, text, text, text, text, text, text, text | Primary Identity (id). Atividade da página de controleBugs (`dev/controleBugs.html`). Não recebe registros da manutenção, que é anônima. `registro_id` guarda o id de `dev_itens` como texto. `acao` ∈ CRIAR, ETAPA, ATRIBUIR, CONCLUIR, REABRIR, NOTA, EXCLUIR. Notas são linhas com `acao = 'NOTA'`, em que `resumo` guarda o texto da nota e `usuario_nome` o autor. Não há coluna própria de notas. Excluir uma linha do log também apaga a nota correspondente |
| **logs_taticos** | id, user_id, nome_jogador, nave_nome, faccao, acao, detalhes, created_at | uuid, uuid, text, text, text, text, text, timestamptz | Primary Key (id) |
| **ordens_servico** | id, ano_aby, sigla_localidade, serie, localidade, data_texto, sigiloso, status, titulo, mecanicos, unidade_responsavel, cliente, relatorio_problema, notas_mecanico, itens, taxas, taxas_ocultas, gorjeta, financeiro, termos_automaticos, termos_manuais, termos, created_by, created_at, updated_at | text, int2, text, int4, text, text, bool, text, text, text[], text, jsonb, text, text, jsonb, jsonb, jsonb, jsonb, jsonb, text[], text, text, uuid, timestamptz, timestamptz | Primary Key (id), Unique (ano_aby, sigla_localidade, serie). `id` e `serie` gerados pelo trigger `trg_os_gerar_id` no formato `OS-[ANO]-[SIGLA]-[SERIE 3 dígitos]` (ex.: `OS-14-COR-003`); o ID é imutável após criado. `status` ∈ Em Aberto, Em Progresso, Aguardando Peça, Concluído, Cancelado. `created_by` default `auth.uid()` |
| **ordens_servico_leitura** *(view)* | mesmas colunas de `ordens_servico`, exceto `created_by` | — | View de leitura pública (`anon`, `authenticated`). Filtra `sigiloso = false` OU `os_pode_editar()`; `taxas_ocultas` vira `[]` e `financeiro` perde `subtotalTaxasOcultas` para quem não é ISB. Roda com privilégios do dono (contorna o RLS da tabela de propósito) |
| **permissoes** | id, user_id, cargo, created_at, nome | int4, uuid, text, timestamptz, text | Primary Key (id) |
| **personagens** | id, user_id, nome, creditos, dados_ficha, created_at, updated_at, grupo_faccao, chave_transferencia, fichas, img_url, facecred, peggats | uuid, uuid, text, int8, jsonb, timestamptz, timestamptz, text, varchar, int4, text, int4, int4 | Primary Key (id), Unique (chave_transferencia) |
| **rotas_hiperespaco** | id, planeta_a, planeta_b, distancia_pc, criado_por, created_at | int8, text, text, int4, uuid, timestamptz | Primary Identity (id), Unique (planeta_a, planeta_b). Check: `planeta_a < planeta_b` (par sempre em ordem alfabética: A↔B e B↔A são a mesma linha); `distancia_pc > 0` |
| **servicos_mcmt** | id, oficina, nome_servico, categoria, mao_de_obra, peca, preco_componentes, descricao, created_at | int8, varchar, text, varchar, int2, text, int4, text, timestamptz | Primary Identity (id) |
| **status_faccoes** | faccao, em_combate | text, bool | Primary Key (faccao) |
| **storage_access** | id, key_name, display_name, password, redirect_url | int8, text, text, text, text | Primary Identity (id), Unique (key_name). Ver seção 8 (senha exposta) |
| **system_access** | id, key_name, display_name, password, redirect_url, is_active | int8, text, text, text, text, bool | Primary Identity (id), Unique (key_name). Ver seção 8 (senha exposta) |
| **transacoes_log** | id, tipo_transacao, remetente_id, destinatario_id, valor_ou_quantidade, detalhes, data_transacao | int4, varchar, uuid, uuid, int4, text, timestamp | Primary Key (id) |

---

## 6. Políticas de Segurança Ativas (RLS Policies)

Resumo por tabela. Políticas permissivas se somam: se uma política libera o acesso, ele é liberado mesmo que outra seja mais restritiva. Por isso as políticas de `authenticated` com `true` anulam as de dono (ver seção 8).

### `cupons`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Leitura de cupons ativos | SELECT | anon, authenticated | `is_ativo = true` |
| ISB gerenciamento total de cupons | ALL | authenticated | Cargos ISB (`mestre`, `dev`, `desenvolvedor`) |

### `dividas_emprestimos`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Jogadores podem ver proprias dividas | SELECT | authenticated | `personagem_id` pertence a um personagem do `auth.uid()` |
| Jogadores podem criar dividas | INSERT | authenticated | `personagem_id` pertence a um personagem do `auth.uid()` (WITH CHECK) |
| Jogadores podem deletar proprias dividas | DELETE | authenticated | `personagem_id` pertence a um personagem do `auth.uid()` |
| ISB gerenciamento total de dividas e emprestimos | ALL | authenticated | Cargos ISB (`mestre`, `dev`, `desenvolvedor`) |

### `dev_itens`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| dev_itens devs total | ALL | authenticated | `holonet_is_mestre()` (USING e WITH CHECK) |
| dev_itens manutencao envia bug | INSERT | anon | Só `tipo = 'bug'`, `origem = 'manutencao'`, `status = 'aberto'` e `criado_por IS NULL` |

### `cupons`, `dividas_emprestimos` e demais tabelas ISB
Os blocos acima seguem o mesmo padrão: a condição ISB é `EXISTS (SELECT 1 FROM permissoes WHERE user_id = auth.uid() AND cargo IN ('mestre','dev','desenvolvedor'))`.

### `frota_ativa`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Acesso total frota | ALL | authenticated | `true` (USING e WITH CHECK) |

### `holonet_config`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| holonet_config leitura | SELECT | anon, authenticated | `true` |
| holonet_config ISB escrita | ALL | authenticated | `holonet_is_mestre()` |

### `holonet_logs`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| holonet_logs leitura ISB | SELECT | authenticated | `holonet_is_mestre()` |

Não há política de INSERT para `holonet_logs` no dump atual. A gravação é feita pela página Holonet com privilégios que já estão configurados. A política antiga `holonet_logs insert controleBugs` foi removida, porque as ações da página de controleBugs passaram para `logs_dev`.

### `holonet_mercados`, `holonet_noticias`, `holonet_ticker`, `holonet_transmissoes`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| `<tabela>` leitura | SELECT | anon, authenticated | `ativo = true` (ou `publicada = true` em notícias) OU `holonet_is_mestre()` |
| `<tabela>` ISB escrita | ALL | authenticated | `holonet_is_mestre()` |

### `inventario`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Visualizar próprio inventário | SELECT | public | `auth.uid() = user_id` |
| Inserir no próprio inventário | INSERT | public | `auth.uid() = user_id` (WITH CHECK) |
| Atualizar próprio inventário | UPDATE | public | `auth.uid() = user_id` |
| Deletar do próprio inventário | DELETE | public | `auth.uid() = user_id` |
| ISB acesso total a inventario | ALL | public | Cargos ISB |
| Inventario_Select | SELECT | authenticated | `true` (ver seção 8) |
| Inventario_Insert | INSERT | authenticated | `true` (ver seção 8) |
| Inventario_Update | UPDATE | authenticated | `true` (ver seção 8) |
| Inventario_Delete | DELETE | authenticated | `true` (ver seção 8) |

### `log_bancario`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Permitir insercao log_bancario autenticado | INSERT | authenticated | `true` (ver seção 8) |
| Permitir leitura log_bancario proprio e ISB | SELECT | authenticated | `auth.uid() = user_id` OU Cargos ISB |
| ISB delete log_bancario | DELETE | authenticated | Cargos ISB |

### `logs_auditoria`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Visualizar próprios logs | SELECT | public | Personagem associado a `auth.uid()` |
| Inserir próprios logs | INSERT | public | Personagem associado a `auth.uid()` (WITH CHECK) |
| Acesso irrestrito de leitura aos logs para o ISB | SELECT | public | Cargos `mestre` ou `dev` |
| ISB acesso total a logs_auditoria | ALL | public | Cargos ISB |
| LogsAuditoria_Select | SELECT | authenticated | `true` (ver seção 8) |
| LogsAuditoria_Insert | INSERT | authenticated | `true` (ver seção 8) |

### `logs_cassino`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Permitir select proprio e ISB logs_cassino | SELECT | authenticated | `auth.uid() = user_id` OU Cargos ISB |
| Permitir insert proprio logs_cassino | INSERT | authenticated | `auth.uid() = user_id` (WITH CHECK) |
| Permitir delete ISB logs_cassino | DELETE | authenticated | Cargos ISB |

### `logs_dados`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Jogador pode ler proprios dados | SELECT | public | `auth.uid() = user_id` |
| Jogador pode inserir proprios dados | INSERT | public | `auth.uid() = user_id` (WITH CHECK) |
| ISB acesso total a logs de dados | ALL | public | Cargos ISB |

### `logs_dev`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| logs_dev leitura ISB | SELECT | authenticated | `holonet_is_mestre()` |
| logs_dev insercao ISB | INSERT | authenticated | `holonet_is_mestre()` (WITH CHECK) |
| logs_dev exclusao ISB | DELETE | authenticated | `holonet_is_mestre()`. Criada para permitir a exclusão de registros pelo painel de devs. A restrição de exibir o botão só para os devs fica na UI (ver seção 9) |

### `logs_taticos`, `status_faccoes`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Acesso total logs / Acesso total status_faccoes | ALL | authenticated | `true` (ver seção 8) |

### `ordens_servico`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| ISB gerenciamento total de ordens_servico | ALL | authenticated | `os_pode_editar()` (USING e WITH CHECK). `anon` não tem acesso à tabela; leitura pública só pela view `ordens_servico_leitura` |

### `permissoes`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Permitir leitura da própria permissao | SELECT | public | `auth.uid() = user_id` |

### `personagens`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Jogadores podem ver seus próprios personagens | SELECT | public | `auth.uid() = user_id` |
| Jogadores podem criar personagens | INSERT | public | `auth.uid() = user_id` (WITH CHECK) |
| Jogadores podem atualizar seus personagens | UPDATE | public | `auth.uid() = user_id` |
| Jogadores podem deletar seus personagens | DELETE | public | `auth.uid() = user_id` |
| Acesso irrestrito de leitura aos personagens para o ISB | SELECT | public | Cargos `mestre` ou `dev` |
| ISB acesso total a personagens | ALL | public | Cargos ISB |
| Permitir leitura geral personagens | SELECT | authenticated | `true` (ver seção 8) |
| Permitir update personagens | UPDATE | authenticated | `true` (ver seção 8) |

### `rotas_hiperespaco`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Leitura de rotas para autenticados | SELECT | authenticated | `true` |
| ISB gerenciamento total de rotas | ALL | authenticated | `holonet_is_mestre()` |

### `servicos_mcmt`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Permitir leitura publica dos servicos | SELECT | public | `true` |
| Permitir insercao apenas autorizados | INSERT | authenticated | UUIDs fixos no código (ver seção 8) |
| Permitir update apenas autorizados | UPDATE | authenticated | UUIDs fixos no código (ver seção 8) |
| Permitir delete apenas autorizados | DELETE | authenticated | UUIDs fixos no código (ver seção 8) |

### `storage_access` e `system_access`
| Tabela | Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- | :--- |
| storage_access | Enable read access for all users | SELECT | public | `true` (ver seção 8) |
| system_access | Enable read access for all users | SELECT | public | `true` (ver seção 8) |
| system_access | Permitir leitura publica | SELECT | public | `true` (ver seção 8) |

### `transacoes_log`
| Política | Comando | Roles | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| Log_Select | SELECT | authenticated | `true` |
| Log_Insert | INSERT | authenticated | `true` (WITH CHECK) |

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

### Gatekeeper ISB (`js/isb_gatekeeper.js`)
*   Exposto como `window.isbReady`, uma promise que resolve com `{ user, nome, cargo }` quando o acesso é aprovado, ou `null` quando redireciona.
*   Também dispara o evento `isb:autorizado` e define `window.isbAutorizado`.
*   Cargos aceitos: `mestre`, `dev`, `desenvolvedor`, igual a `holonet_is_mestre()` e às políticas ISB.
*   Páginas com `<body data-isb-overlay="custom">` mostram animação própria e não recebem o overlay padrão. Na ordem do HTML, o gatekeeper vem logo após `supabase.js`.

---

## 8. Painel de controleBugs (`dev/controleBugs.html`)
*   **Chamados, posts e serviços:** tudo em `dev_itens`, com realtime ativo (`supabase_realtime`). Chamados e serviços têm etapa (Por fazer, Em andamento, Esperando revisão, Abandonado, Concluído) em um seletor no card. Posts mantêm CONCLUIR/REABRIR. Os cards têm versão reduzida (título, etapa, página, responsável) e versão expandida (descrição, responsável, notas, exclusão), aberta pelo botão DETALHES.
*   **Notas:** gravadas em `logs_dev` com `acao = 'NOTA'` (ver seção 5). Ao adicionar uma nota, o código também atualiza `updated_at` do reporte para disparar o realtime nos outros devs.
*   **Exclusão:** reportes (`dev_itens`) e linhas do log (`logs_dev`) podem ser excluídos. O botão só aparece para os devs (`Duque Iguro` e `EidenFox`, pelo nome do operador). O cargo `mestre` nunca vê o botão. No banco, a policy de `dev_itens` e a de `logs_dev` permitem exclusão a qualquer usuário com `holonet_is_mestre()`, então o mestre ainda consegue excluir pela API.
*   **Reports da manutenção:** `pages/manutencao.html` grava direto em `dev_itens` com `origem = 'manutencao'` (usuário anônimo, role `anon`). Aparecem na aba Chamados com a marca VIA MANUTENÇÃO.
*   **Log de atividade:** cada criação, conclusão, reabertura, mudança de etapa ou atribuição grava uma linha em `logs_dev`. A página do mestre lê essa tabela na aba "Desenvolvedore (DEV_CORE)" de `log.html`.
*   **Holonet:** `holonet_logs` continua exclusivo das ações da página Holonet.
*   **Tema:** aplicado pelo nome do operador (Duque → verde, Eiden → rosa) ou pelo cargo `mestre` (vermelho), usando as mesmas variáveis do `controleUsuario.css`.

### Controle de usuário (`dev/controleUsuario.html`)
*   Usa o gatekeeper com `data-isb-overlay="custom"` e mantém a animação própria. A autorização vem do cargo no banco, não de uma lista de UIDs.

---

## 9. Pontos de atenção (segurança)

Achados da leitura das políticas atuais. Alguns podem ser intencionais (mesa compartilhada), mas ficam registrados para decisão.

| Tabela | Política | Problema | Risco |
| :--- | :--- | :--- | :--- |
| **system_access** | Enable read access for all users / Permitir leitura publica | SELECT público (`true`) expõe a coluna `password` | Qualquer visitante anônimo lê senhas, se a tabela tiver valores reais. **Prioridade máxima** |
| **storage_access** | Enable read access for all users | SELECT público (`true`) expõe a coluna `password` | Idem |
| **personagens** | Permitir leitura geral personagens | SELECT para `authenticated` com `true` | Qualquer usuário logado lê as fichas de todos. Sobrepõe a política de dono, pois políticas permissivas se somam |
| **personagens** | Permitir update personagens | UPDATE para `authenticated` com `true` | Qualquer usuário logado altera créditos, facção e demais campos de qualquer personagem |
| **inventario** | Inventario_Select / Insert / Update / Delete | CRUD total para `authenticated` | Qualquer usuário logado altera o inventário de outros |
| **logs_auditoria** | LogsAuditoria_Select / LogsAuditoria_Insert | Leitura e inserção `true` para `authenticated` | Qualquer usuário lê toda a auditoria e pode forjar registros |
| **log_bancario** | Permitir insercao log_bancario autenticado | INSERT com `true` | Registros bancários podem ser forjados por qualquer usuário logado |
| **logs_taticos / status_faccoes / transacoes_log / frota_ativa** | ALL ou SELECT/INSERT com `true` | Acesso livre a `authenticated` | Pode ser intencional (mesa compartilhada), mas sem restrição por dono |
| **servicos_mcmt** | Permitir insercao / update / delete | UUIDs fixos no código do banco | Trocar um mestre exige nova migração |
| **Várias** | Políticas ISB | Algumas usam só `mestre` e `dev`, outras incluem `desenvolvedor` | Inconsistência de cargos. Padronizar com `holonet_is_mestre()` |
| **dev_itens** | dev_itens manutencao envia bug | Insert anônimo sem autenticação; só limita tipo, origem, status e `criado_por` | Qualquer pessoa com a anon key pode criar chamados falsos. Aceitável para o terminal público, mas monitorar volume |
| **dev_itens** / **logs_dev** | Exclusão e controles de dev | `holonet_is_mestre()` permite DELETE também para `mestre`. O botão de excluir só aparece para os devs, mas a regra é só de interface | Mestre consegue excluir reportes e logs pela API. Para bloquear no banco, a policy precisa filtrar por nome ou UID dos devs |
| **dev_itens** | Constraint `dev_itens_status_check` | Não valida a combinação `tipo` x `status` | Um post pode receber status de chamado pela API. A validação fica no JS |

Observação: a correção depende de decisão sobre quais tabelas são intencionalmente compartilhadas. Antes de alterar, confirme o default de `criado_por` em `dev_itens` no painel do Supabase, porque o dump não mostra defaults.