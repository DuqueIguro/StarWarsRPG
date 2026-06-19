# Star Wars RPG - Plataforma de Suporte para Campanhas 🚀

Uma aplicação web imersiva e completa para suporte a campanhas de RPG de mesa no universo Star Wars. Desenvolvida inteiramente com tecnologias front-end (HTML5, CSS3 e JavaScript ES6+), oferecendo interfaces dinâmicas e ricas em recursos sem necessidade de backend.

**Acesse online:** [www.duqueiguro.xyz](http://www.duqueiguro.xyz)

---

## 📊 Composição do Projeto

![JavaScript](https://img.shields.io/badge/JavaScript-47.9%25-F7DF1E?style=flat-square&logo=javascript)
![HTML](https://img.shields.io/badge/HTML-35.4%25-E34C26?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-16.7%25-1572B6?style=flat-square&logo=css3)

---

## ✨ Funcionalidades Principais

A plataforma é modularizada em várias seções, cada uma otimizada para um propósito específico:

| Funcionalidade | Descrição | Arquivo |
|---|---|---|
| **🎭 Ficha de Personagem** | Sistema completo de criação e gerenciamento de fichas com cálculos automáticos de atributos e perícias | `ficha.html` |
| **🤖 Oficina de Droides** | Interface para gerenciar ordens de serviço, reparos e modificações em droides e equipamentos | `oficina.html` |
| **🚀 Hangar de Naves** | Painel de visualização e gerenciamento de naves espaciais com controle de combustível e status de sistemas | `hangar.html` |
| **🌌 Mapa Galáctico** | Representação interativa da galáxia de Star Wars com consulta de dados de planetas | `mapa_galatico.html` |
| **🎒 Sistema de Inventário** | Ferramenta para gerenciamento de itens dos personagens com interface intuitiva | `inventario.html` |
| **📡 Terminal de Comunicação** | Simulador de terminal de comunicação para imersão no universo Star Wars | `comunicacao.html` |
| **⚔️ Escudo do Mestre** | Área dedicada ao mestre do jogo com ferramentas para condução da campanha | `Escudo/mestre.html` |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estruturação semântica e responsiva
- **CSS3** - Estilização avançada e layouts responsivos
- **JavaScript (ES6+)** - Lógica de negócio, DOM manipulation e gerenciamento de dados
- **JSON** - Armazenamento estruturado de dados (planetas, itens, configurações)

---

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
