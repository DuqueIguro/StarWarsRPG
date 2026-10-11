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
*   **Acesso ISB (Mestres/Devs):** A tabela `permissoes` dita quem é Mestre. Jogadores com o cargo `mestre`, `dev` ou `desenvolvedor` possuem políticas de RLS de exceção (bypass) que lhes dão acesso total (ALL) às tabelas.
*   **NUNCA** sugira o uso da `service_role key` no frontend. A segurança deve ser resolvida via modelagem de RLS ou ajuste no payload JS.

## 4. Estruturas JSONB Críticas (Atenção a estes nós)
O banco utiliza campos `jsonb` e `text` (com JSON parseado) para flexibilidade. Estruturas conhecidas:
*   `personagens.dados_ficha`: Contém o estado reativo da ficha do RPG (ex: `.biografia`, `.atributosBase`, `.pericias`, `.modificadoresManuais`).
*   `inventario.dados_customizados`: Contém metadados mutáveis ou itens criados por jogadores (ex: `.nome`, `.qualidade`, `.dadoDano`, `.bonusAtaque`). Na leitura, mescla-se com o ID base do item.
*   `log_bancario.dados_adicionais`: Contém metadados de transações financeiras e eventos bancários.

---

## 5. Estrutura do Banco de Dados (Schema)

| Tabela | Coluna | Tipo de Dado | Restrições / Notas |
| :--- | :--- | :--- | :--- |
| **cupons** | id, codigo, moeda, tipo_desconto, valor_desconto, limite_usos, vezes_usado, is_ativo, created_at, updated_at | uuid, text, text, text, numeric, int4, int4, bool, timestamptz, timestamptz | Primary Key (id), Unique (codigo) |
| **dividas_emprestimos** | id, categoria, titulo, alvo_descricao, personagem_id, valor_original, taxa_juros, valor_total, frequencia, status, observacoes, created_at, updated_at, ciclos_totais, ciclos_pagos | uuid, text, text, text, uuid, int8, numeric, int8, text, text, text, timestamptz, timestamptz, int4, int4 | Primary Key (id) |
| **frota_ativa** | id, nome, imagem, escudo_atual, escudo_maximo, casco_atual, casco_maximo, faccao, custo, created_at, visivel | uuid, text, text, int4, int4, int4, int4, text, int4, timestamptz, bool | Primary Key (id) |
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

| Tabela | Nome da Política | Comando | Regra RLS (Resumo) |
| :--- | :--- | :--- | :--- |
| **cupons** | Leitura de cupons ativos | SELECT | Permitido se `is_ativo = true` |
| **cupons** | ISB gerenciamento total de cupons | ALL | Apenas cargos: `mestre`, `dev`, `desenvolvedor` |
| **dividas_emprestimos** | Jogadores podem ver / deletar proprias dividas | SELECT / DELETE | Permite se cruzar `personagem_id` com a tabela `personagens` pertencente ao usuário |
| **dividas_emprestimos** | Jogadores podem criar dividas | INSERT | `auth.uid()` dono do `personagem_id` |
| **dividas_emprestimos** | ISB gerenciamento total | ALL | Apenas cargos: `mestre`, `dev`, `desenvolvedor` |
| **frota_ativa** | Acesso total frota | ALL | Autenticados têm acesso total |
| **inventario** | Visualizar / Inserir / Atualizar / Deletar próprio inventário | SELECT / INSERT / UPDATE / DELETE | `auth.uid() = user_id` |
| **inventario** | ISB acesso total a inventario | ALL | Apenas cargos: `mestre`, `dev`, `desenvolvedor` |
| **inventario** | Inventario Geral | SELECT / INSERT / UPDATE / DELETE | Autenticados (Aberto para logística frontend) |
| **log_bancario** | Leitura log_bancario proprio e ISB | SELECT | `auth.uid() = user_id` OU Cargos ISB |
| **log_bancario** | Insercao log_bancario autenticado | INSERT | Autenticados |
| **log_bancario** | ISB delete log_bancario | DELETE | Apenas cargos: `mestre`, `dev`, `desenvolvedor` |
| **logs_auditoria** | Visualizar / Inserir próprios logs | SELECT / INSERT | Permite se cruzar `personagem_id` com `personagens` do usuário |
| **logs_auditoria** | ISB acesso total e leitura irrestrita | ALL / SELECT | Apenas cargos: `mestre`, `dev`, `desenvolvedor` |
| **logs_auditoria** | LogsAuditoria Público | SELECT / INSERT | Autenticados |
| **logs_cassino** | Permitir select proprio e ISB | SELECT | `auth.uid() = user_id` OU Cargos ISB |
| **logs_cassino** | Permitir insert proprio | INSERT | `auth.uid() = user_id` |
| **logs_cassino** | Permitir delete ISB | DELETE | Apenas cargos: `mestre`, `dev`, `desenvolvedor` |
| **logs_dados** | Jogador pode ler / inserir proprios dados | SELECT / INSERT | `auth.uid() = user_id` |
| **logs_dados** | ISB acesso total a logs de dados | ALL | Apenas cargos: `mestre`, `dev`, `desenvolvedor` |
| **logs_taticos** | Acesso total logs | ALL | Autenticados têm acesso total |
| **permissoes** | Permitir leitura da própria permissao | SELECT | `auth.uid() = user_id` |
| **personagens** | Jogadores podem ver/criar/atualizar/deletar | ALL (Separados) | `auth.uid() = user_id` |
| **personagens** | ISB acesso total a personagens | ALL / SELECT | Apenas cargos: `mestre`, `dev`, `desenvolvedor` |
| **personagens** | Permitir leitura / update geral | SELECT / UPDATE | Autenticados |
| **servicos_mcmt** | Permitir leitura publica dos servicos | SELECT | Leitura Livre |
| **servicos_mcmt** | Modificação (Insert/Update/Delete) | INSERT / UPDATE / DELETE | Apenas UUIDs autorizados específicos no banco |
| **status_faccoes** | Acesso total status_faccoes | ALL | Autenticados têm acesso total |
| **storage_access** | Enable read access for all users | SELECT | Leitura Livre |
| **system_access** | Enable read access / Permitir leitura publica | SELECT | Leitura Livre |
| **transacoes_log** | Log_Select / Insert | SELECT / INSERT | Autenticados |