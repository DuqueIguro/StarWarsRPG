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
*   `log_bancario.dados_adicionais`: Contém metadados de transações financeiras e eventos bancários.
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
| **permissoes** | id, user_id, cargo, created_at, nome | int4, uuid, text, timestamptz, text | Primary Key (id) |
| **personagens** | id, user_id, nome, creditos, dados_ficha, created_at, updated_at, grupo_faccao, chave_transferencia, fichas, img_url, facecred, peggats | uuid, uuid, text, int8, jsonb, timestamptz, timestamptz, text, varchar, int4, text, int4, int4 | Primary Key (id), Unique (chave_transferencia) |
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
| **permissoes** | Permitir leitura da própria permissao | SELECT | public | `auth.uid() = user_id` |
| **personagens** | Jogadores podem ver/criar/atualizar/deletar | SELECT, INSERT, UPDATE, DELETE | public | `auth.uid() = user_id` |
| **personagens** | Acesso irrestrito de leitura aos personagens para o ISB | SELECT | public | Cargos: `mestre` ou `dev` |
| **personagens** | ISB acesso total a personagens | ALL | public | Cargos ISB (`mestre`, `dev`, `desenvolvedor`) |
| **personagens** | Permitir leitura geral personagens | SELECT | authenticated | Leitura aberta para autenticados |
| **personagens** | Permitir update personagens | UPDATE | authenticated | Atualização aberta para autenticados |
| **servicos_mcmt** | Permitir leitura publica dos servicos | SELECT | public | Leitura irrestrita (`true`) |
| **servicos_mcmt** | Permitir insercao/update/delete apenas autorizados | INSERT, UPDATE, DELETE | authenticated | Restrito a UUIDs específicos de mestres/oficinas |
| **status_faccoes** | Acesso total status_faccoes | ALL | authenticated | Acesso livre a usuários autenticados |
| **storage_access** | Enable read access for all users | SELECT | public | Leitura irrestrita (`true`) |
| **system_access** | Enable read access for all users / Permitir leitura publica | SELECT | public | Leitura irrestrita (`true`) |
| **transacoes_log** | Log_Select / Log_Insert | SELECT, INSERT | authenticated | Leitura e inserção liberadas para autenticados |