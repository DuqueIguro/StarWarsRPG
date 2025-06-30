# ⭐ InventarioStarWars ⭐  
_A organização é o caminho para a vitória galáctica!_

## 🌌 Visão Geral

O **InventarioStarWars** é uma aplicação web inspirada no universo Star Wars para gerenciar inventários de personagens e oficinas em RPGs ou mesas temáticas. Seu objetivo é permitir que jogadores controlem recursos, créditos e itens (naves, droides, peças, etc) de forma visual, prática e imersiva — como se estivessem em um terminal de um cruzador imperial ou base rebelde.

---

## ⚙️ Principais Arquivos & Estrutura

- **SistemaDeInventário.html**  
  O holocron central! Interface visual que orquestra todas as funções.  
  - Exibe créditos pessoais e da oficina (editáveis).
  - Possui abas: Lojas (compra e filtros), Inventário Pessoal e Inventário da Oficina.
  - Modal para criação de itens customizados (nome, descrição, categoria, qualidade, valor e destino).
  - Carrinho lateral para simular compras, atribuindo itens a personagens ou oficinas.

- **script.js**  
  O droide protocolar da lógica, responsável por:
  - Gerenciar o estado da aplicação: inventários, carrinho, créditos, filtros, base de itens.
  - Salvar/carregar dados no LocalStorage (para persistência entre sessões).
  - Renderizar listas de itens e inventários com ordenação e filtros (busca, qualidade, categoria).
  - Adicionar/remover itens do carrinho e dos inventários.
  - Realizar checkout (compra), descontando créditos e transferindo itens.
  - Modal de item customizado: permite criar qualquer artefato do universo Star Wars.
  - Notificações visuais para feedback do usuário.

- **database.js**  
  Contém o acervo galáctico: base estática com exemplos de itens, categorias e atributos para as lojas.

- **style.css**  
  Visual inspirado em consoles imperiais, usando fontes sci-fi, cores neon e painéis translúcidos.  
  Utiliza TailwindCSS para responsividade e customização rápida.

---

## 🛠️ Funcionalidades Detalhadas

- **Inventário Pessoal/Oficina**:  
  - Gerencie separadamente o arsenal do personagem e os recursos da oficina, como um verdadeiro comandante.
  - Itens são classificados por nome, qualidade (Lendária, Imperial, Excelente, Boa, Normal, Baixa) e categoria (Naves, Droides, Peças...).

- **Lojas & Filtros**:  
  - Explore o catálogo galáctico, filtre por nome, qualidade ou categoria.
  - Adicione itens ao carrinho para comprar depois.

- **Carrinho de Compras**:  
  - Visualize os itens selecionados, atribua o destino (pessoal ou oficina) e finalize compras descontando créditos.
  - Checagem de créditos disponível e feedback de sucesso/erro.

- **Itens Customizados**:  
  - Crie qualquer item do universo Star Wars: sabres de luz únicos, droides personalizados, naves lendárias...
  - Escolha nome, descrição, valor, qualidade, categoria e destino.

- **Persistência Local**:  
  - Dados salvos no navegador, garantindo que o progresso não se perca nem em uma invasão imperial.

- **Reset Completo**:  
  - Botão para reiniciar toda a aventura, caso queira começar do zero.

---

## 🖥️ Como Usar

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/DuqueIguro/InventarioStarWars.git
   ```
2. **Acesse a pasta:**
   ```bash
   cd InventarioStarWars
   ```
3. **Abra `SistemaDeInventário.html` no navegador de sua preferência.**
   - Não é necessário backend, tudo é client-side!

---

## 👽 Temática Star Wars

- Fontes e visuais inspirados em painéis de naves e bases imperiais.
- Nomenclaturas, categorias e exemplos de itens retirados diretamente do cânone Star Wars.
- Mensagens, feedbacks e nomes alinhados à experiência galáctica.

---

## 🤝 Contribua com a Rebelião (ou Império!)

1. Faça um fork deste repositório.
2. Crie sua branch temática:  
   `git checkout -b feat/yoda-droid`
3. Commit suas melhorias:  
   `git commit -m "feat: adiciona sabre de luz de plasma preto"`
4. Push para o seu fork:  
   `git push origin feat/yoda-droid`
5. Abra um Pull Request

---

## 📜 Licença
  
Use a Força (do código), jovem Padawan!

---

> _"Faça. Ou não faça. Tentativa não há."_ — Mestre Yoda  
