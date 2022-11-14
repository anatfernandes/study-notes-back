# :memo: Study notes backend

# Índice

- [Sobre](#Sobre)
- [Rotas](#Rotas)
  - [Rotas não autenticadas:](#Rotas-não-autenticadas)
    - [Cadastro](#Cadastrar-um-usuário)
    - [Login](#Login)
  - [*Rotas autenticadas*:](#Rotas-autenticadas)
    - [Criar tópico](#Criar-tópico)
    - [Listar tópicos](#Listar-tópicos)
    - [Editar tópico](#Editar-tópico)
    - [Apagar tópico](#Apagar-tópico)
    - [Criar anotação](#Criar-anotação)
    - [Listar anotações](#Listar-anotações)
    - [Listar anotações de um tópico](#Listar-anotações-de-um-tópico)
    - [Editar anotação](#Editar-anotação)
    - [Apagar anotação](#Apagar-anotação)
    - [Logout](#Logout)
- [Como rodar em desenvolvimento](#Como-rodar-em-desenvolvimento)

# Sobre
Study notes é uma api em que você consegue armazenar suas anotações de estudo classificando-as por tópicos.

# Rotas
URL base: https://study-notes-api.herokuapp.com

## Rotas não autenticadas

## Cadastrar um usuário
- Rota: `/sign-up`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "username": "Ana",
    "email": "ana@email.com",
    "password": "ana123"
  }
  ```

- Possíveis erros:
	- Campos vazios
	- Campos com tipos diferente de string
	- Campo *email* com email no formato inválido
	- Dados informados já correspondem a um usuário

## Login
- Rota: `/sign-in`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "email": "ana@email.com",
    "password": "ana123"
  }
  ```

- Exemplo de Resposta:

  ```json
  {
    "username": "Ana",
	"token": "pwoehfcnmçkshdflkjskbckjl"
  }
  ```

- Possíveis erros:
	- Campos vazios
	- Campos com tipos diferente de string
	- Campo *email* com email no formato inválido
	- Dados informados não correspondem a nenhum usuário

## Rotas autenticadas
- Enviar Header no formato: `Bearer {token}`
- Possíveis erros:
	- Header ausente
	- Token inválido

## Criar tópico
- Rota: `/subjects`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "name": "Typescript"
  }
  ```

- Possíveis erros:
	- Campo *name* vazio
	- Campo *name* com tipo diferente de string
	- Nome de tópico já existe

## Listar tópicos
- Rota: `/subjects`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
	  {
		"id": 1
		"name": "Typescript",
		"createdAt": "2022-11-11T03:00:00.000Z",
		"editedAt": "2022-11-11T03:00:00.000Z"
	  }
  ]
  ```

## Editar tópico
- Rota: `/subjects/{id}`
- Método: `PUT`
- Exemplo de Body:

  ```json
  {
    "name": "React"
  }
  ```

- Possíveis erros:
	- Campo *name* vazio
	- Campo *name* com tipo diferente de string
	- Nome de tópico já existe
	- Parâmetro *id* com tipo diferente de número ou correspondente a um tópico não existente

## Apagar tópico
- Rota: `/subjects/{id}`
- Método: `DELETE`
- Possíveis erros:
	- Parâmetro *id* com tipo diferente de número ou correspondente a um tópico não existente
	- Tópico não pertence ao solicitante da requisição

## Criar anotação
- Rota: `/notes`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "title": "Ambiente de utilização do TypeScript",
    "text": "Ambiente de desenvolvimento",
    "subjectId": 1
  }
  ```

- Possíveis erros:
	- Campos vazios
	- Campos *title* e *text* com tipos diferente de string
	- Campo *subjectId* com tipo diferente de number
	- *subjectId* não corresponde a um tópico existente

## Listar anotações
- Rota: `/notes`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "id": 1,
      "title": "Ambiente de utilização do TypeScript",
      "text": "Ambiente de desenvolvimento",
      "subjectId": 1,
      "subjectName": "Typescript",
      "createdAt": "2022-11-11T03:00:00.000Z",
      "editedAt": "2022-11-11T03:00:00.000Z"
    }
  ]
  ```
## Listar anotações de um tópico
- Rota: `/subjects/{id}/notes`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "id": 1,
      "title": "Ambiente de utilização do TypeScript",
      "text": "Ambiente de desenvolvimento",
      "subjectId": 1,
      "subjectName": "Typescript",
      "createdAt": "2022-11-11T03:00:00.000Z",
      "editedAt": "2022-11-11T03:00:00.000Z"
    }
  ]
  ```

- Possíveis erros:
	- Parâmetro *id* com tipo diferente de número ou correspondente a um tópico não existente

## Editar anotação
- Rota: `/notes/{id}`
- Método: `PUT`
- Exemplo de Body:

  ```json
  {
    "title": "Ambiente de utilização do TypeScript",
    "text": "Ambiente de desenvolvimento :)",
    "subjectId": 1
  }
  ```

- Possíveis erros:
	- Campos vazios
	- Campos *title* e *text* com tipos diferente de string
	- Campo *subjectId* com tipo diferente de number
	- *subjectId* não corresponde a um tópico existente
	- Parâmetro *id* com tipo diferente de número ou correspondente a um tópico não existente

## Apagar anotação
- Rota: `/notes/{id}`
- Método: `DELETE`
- Possíveis erros:
	- Parâmetro *id* com tipo diferente de número ou correspondente a um tópico não existente
	- Anotação não pertence ao solicitante da requisição

## Logout
- Rota: `/logout`
- Método: `POST`

# Como rodar em desenvolvimento
**Atenção:** para rodar o projeto é preciso ter o PostgreSQL em sua máquina.

1. Clone esse repositório:
>```bash
>$ git clone https://github.com/AnaLTFernandes/study-notes-back.git
>```

2. Instale as dependências:
>```bash
>$ npm install
>```

3. Crie um banco de dados PostgreSQL com o nome que desejar

4. Rode o comando na raiz do projeto para criar as tabelas:
>```bash
>#troque nome_do_banco pelo nome do banco de dados criado no passo anterior
>$ sudo su -c "psql -d nome_do_banco -f dump.sql" postgres
>```

5. Configure o arquivo `.env` usando como base o arquivo `.env.example`

6. Inicie o projeto:
>```bash
>$ npm run dev
>```

7. Divirta-se nas rotas trocando a URL base para: http://localhost:porta_definida_no_.env
