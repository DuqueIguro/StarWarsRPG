# Star Wars RPG - Plataforma de Suporte para Campanhas

## 🚀 Visão Geral do Projeto

O **Star Wars RPG** é uma aplicação web imersiva e completa, projetada para servir como uma ferramenta de suporte robusta para campanhas de RPG de mesa no universo de Star Wars. A plataforma oferece uma gama de funcionalidades interativas que visam aprimorar a experiência tanto dos jogadores quanto dos mestres, centralizando informações cruciais e automatizando processos complexos do jogo.

Desenvolvido inteiramente com tecnologias front-end (HTML, CSS e JavaScript), o projeto é uma demonstração de como interfaces dinâmicas e ricas em recursos podem ser criadas sem a necessidade de um back-end complexo, utilizando o armazenamento local do navegador e a manipulação de dados via JSON para gerenciar o estado da aplicação.

## ✨ Funcionalidades Principais

A plataforma é modularizada em várias seções, cada uma com um propósito específico dentro do ecossistema do RPG:

  * **Ficha de Personagem Interativa (`ficha.html`):** Um sistema completo para criação e gerenciamento de fichas de personagem. Ele automatiza cálculos de atributos, perícias e outras estatísticas com base em raça, classe e tamanho, utilizando os dados de `dadosRacas.js`, `dadosClasses.js`, e `dadosTamanhos.js`.
  * **Oficina de Droides e Equipamentos (`oficina.html`):** Uma interface para gerenciar ordens de serviço, reparos e modificações em droides e equipamentos. O sistema utiliza arquivos JSON para manifestos de carga (`manifesto.json`) e ordens de serviço, permitindo um controle detalhado das atividades de manutenção.
  * **Hangar de Naves Espaciais (`hangar.html`):** Um painel para visualização e gerenciamento do status de naves espaciais, incluindo controle de combustível (`fuel.js`), status dos sistemas (`status.js`) e fichas de naves (`fichas.js`).
  * **Mapa Galáctico Interativo (`mapa_galatico.html`):** Uma representação visual da galáxia de Star Wars, com dados de planetas carregados a partir de `planetas_database.json`. Permite a consulta de informações sobre diferentes sistemas e setores.
  * **Sistema de Inventário (`inventario.html`):** Uma ferramenta para que os jogadores gerenciem os itens de seus personagens, com uma base de dados de itens em `database.js` e uma interface de fácil utilização.
  * **Terminal de Comunicação (`comunicacao.html`):** Simula um terminal de comunicação no universo de Star Wars, adicionando um elemento de imersão para os jogadores.
  * **Escudo do Mestre (`Escudo/mestre.html`):** Uma área dedicada ao mestre do jogo, com ferramentas e informações para auxiliar na condução da campanha.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

  * **HTML5:** Para a estruturação semântica do conteúdo da aplicação.
  * **CSS3:** Para a estilização e criação de layouts responsivos, proporcionando uma experiência de usuário imersiva.
  * **JavaScript (ES6+):** A parte principal da aplicação, responsável por toda a lógica de negócio, interatividade, manipulação do DOM e gerenciamento de dados.
  * **JSON:** Utilizado extensivamente para armazenar e gerenciar dados de forma estruturada, como informações de planetas, ordens de serviço, e itens.

## 📂 Estrutura do Repositório

O repositório está organizado da seguinte forma para garantir a manutenibilidade e escalabilidade do projeto:

```
/
|-- 404.html                # Página de erro 404 customizada
|-- CNAME                   # Configuração de domínio customizado para o GitHub Pages
|-- Escudo/
|   |-- mestre.html           # Ferramentas para o mestre do jogo
|-- backups/                # Backups de scripts importantes
|-- comunicacao.html        # Página do terminal de comunicação
|-- ficha.html              # Página da ficha de personagem
|-- ficha/
|   |-- dadosClasses.js     # Dados das classes dos personagens
|   |-- dadosRacas.js       # Dados das raças dos personagens
|   |-- dadosTamanhos.js    # Dados dos tamanhos dos personagens
|   |-- script.js           # Lógica da ficha de personagem
|-- hangar.html             # Página do hangar de naves
|-- hangar/
|   |-- fichas.js           # Dados das fichas das naves
|   |-- fuel.js             # Lógica de controle de combustível
|   |-- hangar.js           # Lógica principal do hangar
|   |-- status.js           # Lógica de status dos sistemas da nave
|-- img/                    # Ícones e imagens da aplicação
|-- index.html              # Página inicial da aplicação
|-- inventario.html         # Página de inventário
|-- inventario/
|   |-- database.js         # Base de dados de itens do inventário
|   |-- script.js           # Lógica do sistema de inventário
|-- mapa_galatico.html      # Página do mapa galáctico
|-- mapa/
|   |-- mapa_galatico.js    # Lógica do mapa galáctico
|   |-- planetas_database.json # Base de dados dos planetas
|-- oficina.html            # Página da oficina
|-- oficina/
|   |-- database/           # Dados de suporte para a oficina
|   |-- manifesto.json      # Manifesto de carga pública
|   |-- manifestoSigiloso.json # Manifesto de carga sigilosa
|   |-- ordens_de_servico/  # Ordens de serviço públicas
|   |-- ordens_sigilosas/   # Ordens de serviço sigilosas
|   |-- oficina.js          # Lógica da oficina
|-- styles/                 # Folhas de estilo CSS
|   |-- style.css           # Estilo principal
|   |-- ...                 # Estilos específicos para cada página
```

## 🚀 Como Executar o Projeto

Como este é um projeto puramente front-end, não há necessidade de um processo de build complexo. Você pode executar a aplicação de duas maneiras:

1.  **Acessando a versão online:**

      * O projeto está hospedado no GitHub Pages e pode ser acessado através do link (se aplicável, com base no arquivo `CNAME`): `http://www.duqueiguro.xyz`

2.  **Executando localmente:**

      * Clone o repositório: `git clone https://github.com/duqueiguro/starwarsrpg.git`
      * Navegue até o diretório do projeto: `cd starwarsrpg`
      * Abra o arquivo `index.html` no seu navegador de preferência.

## 💡 Arquitetura de Dados

A aplicação faz uso intensivo de arquivos JSON para simular um banco de dados. Essa abordagem permite uma fácil manutenção e atualização das informações do jogo (como planetas, itens, etc.) sem a necessidade de alterar o código JavaScript principal.

Os scripts em JavaScript são responsáveis por carregar esses arquivos JSON dinamicamente e renderizar as informações na interface do usuário, criando uma experiência fluida e reativa.

## 🔮 Futuras Implementações

O projeto tem um grande potencial de expansão. Algumas das funcionalidades planejadas para o futuro incluem:

  * **Sistema de combate:** Um módulo para gerenciar iniciativas, turnos e ações durante o combate.
  * **Persistência de dados em nuvem:** Utilização de serviços como Firebase ou um back-end próprio para permitir que os dados das campanhas sejam salvos e acessados de qualquer lugar.
  * **Autenticação de usuários:** Para que cada jogador possa ter seu próprio perfil e personagens.

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas\! Se você tem alguma ideia para melhorar o projeto, siga os seguintes passos:

1.  Faça um *fork* deste repositório.
2.  Crie uma nova *branch* para a sua funcionalidade: `git checkout -b feature/sua-feature`
3.  Faça o *commit* das suas alterações: `git commit -m 'Adiciona nova feature'`
4.  Envie para a sua *branch*: `git push origin feature/sua-feature`
5.  Abra um *Pull Request*.

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

-----
