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
*   **Regra de Ouro:** O banco é blindado por RLS. Operações de `INSERT`, `UPDATE` ou `DELETE` frequentemente exigem que o payload contenha a assinatura do autor (`user_id` e/ou `personagem_id`). Falhas nisso geram **Erro 403** ou **42501**.
*   **Acesso ISB (Mestres/Devs):** A tabela `permissoes` dita quem é Mestre. Jogadores com o cargo `mestre` ou `dev` possuem políticas de RLS de exceção (bypass) que lhes dão acesso total (ALL) a tabelas como `inventario`, `personagens` e `logs_auditoria`.
*   **NUNCA** sugira o uso da `service_role key` no frontend. A segurança deve ser resolvida via modelagem de RLS ou ajuste no payload JS.

## 4. Estruturas JSONB Críticas (Atenção a estes nós)
O banco utiliza campos `jsonb` e `text` (com JSON parseado) para flexibilidade. Estruturas conhecidas:
*   `personagens.dados_ficha`: Contém o estado reativo da ficha do RPG (ex: `.biografia`, `.atributosBase`, `.pericias`, `.modificadoresManuais`).
*   `inventario.dados_customizados`: Contém metadados mutáveis ou itens criados por jogadores (ex: `.nome`, `.qualidade`, `.dadoDano`, `.bonusAtaque`). Na leitura, mescla-se com o ID base do item.
*   `transacoes_log.detalhes`: Armazena um stringified JSON com `{ remetente_nome, destinatario_nome, mensagem, itens }` para não poluir relacionamentos nativos.

---

## 5. Estrutura do Banco de Dados (Schema)

| Tabela | Coluna | Tipo de Dado | Aceita Nulo | Valor Padrão |
| :--- | :--- | :--- | :--- | :--- |
| **frota_ativa** | id | uuid | NO | gen_random_uuid() |
| frota_ativa | nome | text | NO | - |
| frota_ativa | imagem | text | YES | - |
| frota_ativa | escudo_atual | integer | YES | 0 |
| frota_ativa | escudo_maximo | integer | YES | 0 |
| frota_ativa | casco_atual | integer | YES | 0 |
| frota_ativa | casco_maximo | integer | YES | 0 |
| frota_ativa | faccao | text | NO | - |
| frota_ativa | custo | integer | YES | 0 |
| frota_ativa | visivel | boolean | YES | true |
| frota_ativa | created_at | timestamptz | YES | now() |
| **inventario** | id | uuid | NO | gen_random_uuid() |
| inventario | user_id | uuid | YES | - |
| inventario | personagem_id | uuid | YES | - |
| inventario | item_id | text | YES | - |
| inventario | quantidade | integer | YES | 1 |
| inventario | origem | text | YES | 'sistema' |
| inventario | dados_customizados | jsonb | YES | '{}' |
| inventario | created_at | timestamptz | YES | now() |
| **logs_auditoria** | id | uuid | NO | gen_random_uuid() |
| logs_auditoria | personagem_id | uuid | YES | - |
| logs_auditoria | tipo_evento | text | NO | - |
| logs_auditoria | descricao | text | NO | - |
| logs_auditoria | mudanca_creditos | bigint | YES | 0 |
| logs_auditoria | created_at | timestamptz | YES | now() |
| **logs_dados** | id | bigint | NO | - |
| logs_dados | personagem_id | uuid | YES | - |
| logs_dados | user_id | uuid | NO | - |
| logs_dados | nome_rolagem | text | NO | - |
| logs_dados | dado_puro | integer | NO | - |
| logs_dados | bonus_total | integer | NO | - |
| logs_dados | resultado_final | integer | NO | - |
| logs_dados | detalhamento | text | NO | - |
| logs_dados | created_at | timestamptz | YES | now() |
| **logs_taticos** | id | uuid | NO | gen_random_uuid() |
| logs_taticos | user_id | uuid | YES | - |
| logs_taticos | nome_jogador | text | YES | - |
| logs_taticos | nave_nome | text | YES | - |
| logs_taticos | faccao | text | YES | - |
| logs_taticos | acao | text | YES | - |
| logs_taticos | detalhes | text | YES | - |
| logs_taticos | created_at | timestamptz | YES | now() |
| **permissoes** | id | integer | NO | nextval |
| permissoes | user_id | uuid | NO | - |
| permissoes | cargo | text | NO | - |
| permissoes | nome | text | YES | - |
| permissoes | created_at | timestamptz | YES | now() |
| **personagens** | id | uuid | NO | gen_random_uuid() |
| personagens | user_id | uuid | NO | - |
| personagens | nome | text | YES | 'Desconhecido' |
| personagens | creditos | bigint | YES | 1000 |
| personagens | grupo_faccao | text | YES | 'Não Atribuído' |
| personagens | chave_transferencia | varchar | YES | - |
| personagens | dados_ficha | jsonb | NO | '{}' |
| personagens | created_at | timestamptz | NO | now() |
| personagens | updated_at | timestamptz | NO | now() |
| **servicos_mcmt** | id | bigint | NO | - |
| servicos_mcmt | oficina | varchar | YES | - |
| servicos_mcmt | nome_servico | text | YES | - |
| servicos_mcmt | categoria | varchar | YES | - |
| servicos_mcmt | mao_de_obra | smallint | YES | - |
| servicos_mcmt | peca | text | YES | - |
| servicos_mcmt | preco_componentes | integer | YES | 0 |
| servicos_mcmt | descricao | text | YES | - |
| servicos_mcmt | created_at | timestamptz | NO | now() |
| **status_faccoes** | faccao | text | NO | - |
| status_faccoes | em_combate | boolean | YES | false |
| **system_access** | id | bigint | NO | - |
| system_access | key_name | text | NO | - |
| system_access | display_name | text | NO | - |
| system_access | password | text | YES | - |
| system_access | redirect_url | text | YES | - |
| system_access | is_active | boolean | YES | false |
| **transacoes_log** | id | integer | NO | nextval |
| transacoes_log | tipo_transacao | varchar | NO | - |
| transacoes_log | remetente_id | uuid | NO | - |
| transacoes_log | destinatario_id | uuid | NO | - |
| transacoes_log | valor_ou_quantidade | integer | NO | - |
| transacoes_log | detalhes | text | YES | - |
| transacoes_log | data_transacao | timestamp | YES | CURRENT_TIMESTAMP |

*(Nota: Existem também as Views `view_inventario_personagem`, `view_jogador_email` e `view_logs_auditoria_detalhado` para consultas complexas no backend).*

---

## 6. Políticas de Segurança Ativas (RLS Policies)

| Tabela | Nome da Política | Comando | Regra RLS |
| :--- | :--- | :--- | :--- |
| **frota_ativa** | Acesso total frota | ALL | Leitura e Escrita Livres |
| **inventario** | ISB acesso total a inventario | ALL | Apenas para cargo `mestre` ou `dev` na tabela `permissoes` |
| inventario | Visualizar próprio inventário | SELECT | `auth.uid() = user_id` |
| inventario | Inserir no próprio inventário | INSERT | `auth.uid() = user_id` |
| inventario | Deletar do próprio inventário | DELETE | `auth.uid() = user_id` |
| inventario | Atualizar próprio inventário | UPDATE | `auth.uid() = user_id` |
| inventario | Inventario_Select / Update / Insert / Delete | ALL | Abertura customizada para logística frontend |
| **logs_auditoria** | ISB acesso total a logs_auditoria | ALL | Apenas para cargo `mestre` ou `dev` |
| logs_auditoria | Visualizar/Inserir próprios logs | SELECT / INSERT | Permite se cruzar `personagem_id` com a tabela `personagens` |
| logs_auditoria | LogsAuditoria_Select / Insert | SELECT / INSERT | Liberados publicamente |
| **logs_dados** | ISB acesso total a logs de dados | ALL | Apenas para cargo `mestre` ou `dev` |
| logs_dados | Jogador pode inserir/ler proprios dados | INSERT / SELECT | `auth.uid() = user_id` |
| **logs_taticos** | Acesso total logs | ALL | Leitura e Escrita Livres |
| **permissoes** | Permitir leitura da própria permissao | SELECT | `auth.uid() = user_id` |
| **personagens** | ISB acesso total a personagens | ALL | Apenas para cargo `mestre` ou `dev` |
| personagens | Jogadores ver/criar/atualizar/deletar | ALL | `auth.uid() = user_id` |
| personagens | Permitir leitura / update geral | SELECT / UPDATE | Liberados publicamente |
| **status_faccoes** | Acesso total status_faccoes | ALL | Leitura e Escrita Livres |
| **system_access** | Permitir leitura publica | SELECT | Leitura Livre |
| **transacoes_log** | Log_Select / Insert | SELECT / INSERT | Liberados publicamente |