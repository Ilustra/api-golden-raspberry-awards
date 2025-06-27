# API Server

Este projeto é um servidor de API para gerenciamento de filmes.

## Instalação

Para instalar as dependências do projeto, execute:

```bash
npm install
```

## Execução

Para iniciar o servidor em modo de desenvolvimento, utilize:

```bash
npm run dev
```
## Requisitos para Testes HTTP

Para executar os testes HTTP utilizando os arquivos `.http`, é necessário instalar a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) no VS Code.
## Testes HTTP
Os testes dos endpoints HTTP podem ser realizados utilizando o arquivo [`./src/test/restclient/movie.http`](./src/test/restclient/movie.http). Utilize uma extensão compatível (como o REST Client no VS Code) para enviar requisições e validar as respostas da API.


## Executando os Testes

Para executar os testes automatizados do projeto, utilize o comando:

```bash
npm test
```
