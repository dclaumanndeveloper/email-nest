# Projeto NestJS API

Este projeto é uma API construída com [NestJS](https://nestjs.com/), utilizando TypeScript, Drizzle ORM e integração com Docker.

## Sumário

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Rodando o Projeto](#rodando-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Migrations e Banco de Dados](#migrations-e-banco-de-dados)
- [Testes](#testes)
- [Deploy](#deploy)
- [Licença](#licença)

## Requisitos

- Node.js 18+
- pnpm
- Docker (opcional, para ambiente containerizado)

## Instalação

```sh
pnpm install
```

## Rodando o Projeto

### Ambiente de Desenvolvimento

```sh
pnpm start:dev
```

### Produção

```sh
pnpm build
pnpm start:prod
```

### Docker

```sh
docker-compose up --build
```

## Estrutura de Pastas

```
src/
  auth/         # Autenticação e autorização
  db/           # Configuração e acesso ao banco de dados
  entity/       # Entidades do domínio
  env/          # Gerenciamento de variáveis de ambiente
  pipes/        # Pipes customizados
  schemas/      # Schemas de validação
  task/         # Funcionalidades relacionadas a tarefas
  users/        # Funcionalidades relacionadas a usuários
  app.module.ts # Módulo principal do NestJS
  main.ts       # Bootstrap da aplicação
```

Outros arquivos importantes:
- `drizzle/` — Migrations SQL do banco de dados
- `docker-compose.yml` — Orquestração de containers
- `.env` — Variáveis de ambiente

## Scripts Disponíveis

Veja todos os scripts em [`package.json`](package.json):

- `pnpm start:dev` — Inicia em modo desenvolvimento
- `pnpm build` — Compila o projeto
- `pnpm start:prod` — Inicia o projeto compilado
- `pnpm test` — Executa os testes unitários
- `pnpm lint` — Executa o linter
- `pnpm format` — Formata o código

## Migrations e Banco de Dados

As migrations estão na pasta [`drizzle/`](drizzle/). Para rodar migrations, consulte a documentação do Drizzle ORM ou scripts customizados do projeto.

## Testes

Para rodar os testes:

```sh
pnpm test
```

## Deploy

O projeto inclui configuração para deploy na Vercel ([`vercel.json`](vercel.json)).

## Licença

Este projeto está sob a licença UNLICENSED.