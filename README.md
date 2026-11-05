<div align="center">

# Star Wars RPG

**Uma plataforma web de apoio a campanhas de RPG ambientadas no universo de Star Wars.**

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-f7df1e?style=flat-square&logo=javascript&logoColor=000)](https://developer.mozilla.org/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-sem%C3%A2ntico-e34f26?style=flat-square&logo=html5&logoColor=fff)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-responsivo-1572b6?style=flat-square&logo=css3&logoColor=fff)](https://developer.mozilla.org/docs/Web/CSS)
[![Supabase](https://img.shields.io/badge/Supabase-autentica%C3%A7%C3%A3o-3ecf8e?style=flat-square&logo=supabase&logoColor=fff)](https://supabase.com/)

[**Acessar a aplicação**](https://starwars.duqueiguro.xyz) · [Reportar um problema](https://github.com/DuqueIguro/StarWarsRPG/issues)

</div>

---

## Sobre o projeto

O **Star Wars RPG** reúne ferramentas digitais para apoiar a organização e a condução de campanhas de RPG. A aplicação combina uma interface temática com módulos para personagens, navegação galáctica, inventário, comunicações, gerenciamento de recursos e conteúdo narrativo.

O projeto é uma aplicação web estática, construída principalmente com HTML, CSS e JavaScript. Os dados de referência são mantidos em arquivos JSON; a autenticação é integrada ao Supabase.

## Funcionalidades

Os módulos estão organizados em diferentes áreas da aplicação:

- **Personagens e jogo:** fichas, seleção de personagens e rolagem de dados.
- **Exploração e navegação:** mapa galáctico, consulta de planetas e cálculo de distâncias.
- **Gestão de recursos:** inventário, armazém, banco, loja e posto de abastecimento.
- **Comunicação e ambientação:** Holonet, terminal de comunicação e conteúdos de facções.
- **Frota e operações:** painéis da frota rebelde, manutenção e ferramentas de apoio ao mestre.
- **Áreas especializadas:** ferramentas de oficina, droides, tripulantes, cassino e módulos de administração da campanha.

A disponibilidade e o acesso a determinados módulos podem variar conforme a configuração da aplicação e a autenticação.

## Tecnologias

- **HTML5** para a estrutura das páginas.
- **CSS3** para estilos e layouts.
- **JavaScript (ES6+)** para interações e lógica da aplicação.
- **JSON** para conjuntos de dados usados pelos módulos.
- **Supabase** para autenticação.
- **GitHub Pages e GitHub Actions** para publicação do site estático.

## Executar localmente

Não é necessário instalar dependências de Node.js nem executar um processo de build. Como a aplicação carrega recursos locais, execute-a por um servidor HTTP em vez de abrir os arquivos diretamente no navegador.

1. Clone o repositório e entre na pasta do projeto:

   ```bash
   git clone https://github.com/DuqueIguro/StarWarsRPG.git
   cd StarWarsRPG
   ```

2. Inicie um servidor local. Com Python instalado, por exemplo:

   ```bash
   python -m http.server 8000
   ```

   Se o comando `python` não estiver disponível, tente `python3 -m http.server 8000`.

3. Acesse [http://localhost:8000](http://localhost:8000) no navegador.

A página inicial é `index.html`; o menu principal está em `menu.html`. Recursos que dependem do Supabase requerem uma configuração válida do serviço.

## Publicação

O site é publicado pelo GitHub Pages usando o workflow em `.github/workflows/static.yml`. O workflow envia o conteúdo do repositório para o Pages quando há alterações na branch `main`, ou pode ser iniciado manualmente pela aba **Actions** do GitHub.

O domínio configurado para a aplicação é [starwars.duqueiguro.xyz](https://starwars.duqueiguro.xyz).

## Estrutura do repositório

| Caminho | Conteúdo |
|---|---|
| `index.html`, `menu.html` | Entrada e hub principal da aplicação |
| `pages/` | Páginas dos módulos principais |
| `js/` | Scripts JavaScript compartilhados e lógica dos módulos |
| `styles/` | Folhas de estilo |
| `data/` | Dados JSON e recursos utilizados pela aplicação |
| `durtoc/`, `mestre/`, `monopoly/`, `rebeldes/`, `terminal/` | Áreas e experiências especializadas |
| `img/` | Imagens, ícones e demais recursos visuais |
| `.github/workflows/` | Automação de publicação no GitHub Pages |

Para uma listagem mais detalhada, consulte [`Hieararquia.md`](Hieararquia.md).

## Contribuições

Contribuições são bem-vindas. Para propor uma mudança:

1. Abra uma issue para relatar um problema ou discutir uma melhoria relevante.
2. Faça um fork do repositório e crie uma branch descritiva para sua alteração.
3. Implemente e teste a mudança localmente.
4. Envie um pull request com uma descrição clara do que foi alterado e, quando aplicável, como testar.

## Licença

Nenhum arquivo de licença foi identificado neste repositório. Até que uma licença seja adicionada, os direitos de uso e redistribuição permanecem reservados ao titular dos direitos autorais.

## Créditos e propriedade intelectual

Este é um projeto de fã, sem afiliação ou endosso da Lucasfilm Ltd. ou da The Walt Disney Company. **Star Wars** e seus elementos relacionados pertencem aos respectivos titulares. O projeto destina-se a apoiar campanhas de RPG e não reivindica propriedade sobre esse material.
