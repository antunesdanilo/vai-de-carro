# **VaiDeCarro** 🚗

**VaiDeCarro** é uma aplicação full-stack para estimar e solicitar corridas com motoristas parceiros. O sistema é composto por:

- **Frontend**: Uma aplicação React para interação com o usuário.
- **Backend**: Uma API construída com NestJS, responsável por gerenciar dados de motoristas, clientes e corridas.

A arquitetura usa **Docker Compose** para facilitar a execução de ambas as partes do sistema.

---

## **Índice**

1. [Descrição do Projeto](#descrição-do-projeto)
2. [Funcionalidades Principais](#funcionalidades-principais)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Download e Instalação](#download-e-instalação)
5. [Execução com Docker Compose](#execução-com-docker-compose)
6. [Execução com Servidores de Desenvolvimento](#execução-com-servidores-de-desenvolvimento)
7. [Acesso](#acesso)
8. [Testes](#testes)
9. [Estrutura do Repositório](#estrutura-do-repositório)
10. [Melhorias Futuras](#melhorias-futuras)

---

## **Descrição do Projeto**

O VaiDeCarro é uma solução para conectar usuários e motoristas para corridas sob demanda. O sistema atualmente suporta:

1. Escolha de origem e destino via integração com o **Google Maps**.
2. Estimativa de preço com base no motorista e na rota.
3. Visualização de motoristas disponíveis.
4. Confirmação e gerenciamento de corridas.

O backend utiliza **NestJS** e **Prisma ORM** para manipulação de dados, e expõe APIs RESTful documentadas com **Swagger**.

---

## **Funcionalidades Principais**

### **Frontend**

- **Busca de locais e rotas:** Consome a API de predições do Google Maps via backend.
- **Seleção de motoristas:** Mostra informações como nome, veículo, avaliação e preço.
- **Histórico de viagens:** Exibe corridas realizadas com opções de filtro.

### **Backend**

- **Ride Controller:**

  - Estimar preço de uma corrida e listar motoristas disponíveis.
  - Confirmar uma corrida com motorista.
  - Listar corridas realizadas.

- **MapsApi Controller:**

  - Gateway para a API de predições do Google Maps.

- **Customer Controller:**

  - Cadastro de novos clientes.
  - Listagem e detalhes de clientes.

- **Driver Controller:**
  - Listagem de todos os motoristas cadastrados.

---

## **Tecnologias Utilizadas**

### **Frontend**

- React, Redux Toolkit, React Router DOM
- Google Maps API
- Bootstrap

### **Backend**

- NestJS, Prisma ORM
- Swagger para documentação da API
- Docker e Docker Compose

### **Geral**

- Testes automatizados com Jest
- ESLint e Prettier para padronização de código

## **Download e Instalação**

### **Pré-requisitos**

- GIT
- Yarn ou NPM

### **Clone o repositório:**

```bash
$ git clone https://github.com/antunesdanilo/vai-de-carro.git

$ cd vai-de-carro
```

### **Instale as dependências do backend**

```bash
$ cd backend

$ yarn install
# ou
$ npm install
```

### **Instale as dependências do frontend**

```bash
$ cd frontend

$ yarn install
# ou
$ npm install
```

### **Execute as migrações para criar a estrutura de dados com SQLite**

```bash
$ cd backend

$ yarn migrate:deploy
ou
$ npm run migrate:deploy
```

## Execução Com Docker Compose

### **Pré-requisitos**

- Docker
- Docker Compose

### **Execute o Docker Compose:**

```bash
$ docker-compose up --build
```

## Execução com Servidores de Desenvolvimento

### **Pré-requisitos**

- NodeJS<br/>
- Yarn ou NPM

### **Execute o backend**

```bash
$ cd backend

$ yarn start
# ou
$ npm start
```

### **Execute o frontend**

```bash
$ cd frontend

$ yarn dev
# ou
$ npm run dev
```

## **Acesso**

Após a execução com servidores de desenvolvimento ou com Docker Compose, a aplicação estará disponível em:

- Frontend: http://localhost
- Backend: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger (Documentação completa da API)

## **Estrutura do Repositório**

```plaintext
vaidecarro/
├── backend/         # API construída com NestJS
│   ├── src/         # Código-fonte
│   ├── test/        # Testes automatizados
│   ├── Dockerfile   # Dockerfile do backend
│   ├── package.json # Configuração de dependências e scripts do backend
├── frontend/        # Aplicação React
│   ├── src/         # Código-fonte
│   ├── tests/       # Testes automatizados
│   ├── Dockerfile   # Dockerfile do frontend
│   ├── package.json # Configuração de dependências e scripts do frontend
├── docker-compose.yml # Configuração do Docker Compose
└── README.md         # Documentação principal
```

## **Testes**

### **Pré-requisitos**

- NodeJS<br/>
- Yarn ou NPM

### **Backend**

```bash
$ cd backend

$ yarn test
# ou
$ npm run test
```

### **Frontend**

```bash
$ cd frontend

$ yarn test
# ou
$ npm run test
```

## **Melhorias Futuras**

- Autenticação JWT: Proteger rotas do backend.
- Pagamentos: Integração com gateways de pagamento para simular cobrança.
- Deploy: Configurar deploy em serviços como Vercel (frontend) e Render (backend).
- Testes E2E: Implementar testes de ponta a ponta para validar fluxos completos.
- Performance: Melhorar a eficiência das consultas no backend.

---

Desenvolvido por @DaniloAntunes - 2024
