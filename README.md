# Projeto Aplicado IV

## Descrição do Projeto

Projeto desenvolvido para a disciplina de Projeto Aplicado IV, do curso de Analise e Desenvolvimento de Sistemas do UniSENAI.
A aplicação consiste em um sistema de apontamento de relatórios d eprodução e gerenciamento do mesmo para uma fabrica de lactnicos.


## Integrantes

 - Evandro Alves
 - Gilson Langa
 - Vitória
 - Lucas Jose de Paula

## Tecnologias Utilizadas
- Javascript
- Vite

## Como rodar o projeto

### Pré-requisitos

- Ter node instalado na máquina, site ofificial para download do [Node](https://nodejs.org/en/download/package-manager)
- Ter npm instalado na máquina.

1- clonar o repositório na sua máquina e acessar a pasta do projeto no terminal: 

~~~javascript
cd "caminho da pasta onde salvou o projeto", exemplo: cd front_V2.
~~~~

2 - No terminal -  verificar as versões disponíveis:

    2.1- node-v

    2.2- npm-v

3 - Se estiver tudo ok:

    3.1 - Instalar as dependências - npm install 
( as dependências necessárias estão dentro do package.json)

### Rodar o projeto

~~~javascript
npm run dev
~~~

1 - deve abrir em http://localhost:5173, caso deseje altear a porta padrão vá até o caminho src/utils/config.jsx e altere a variavel **api**.