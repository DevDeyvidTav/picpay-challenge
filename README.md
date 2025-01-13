# PicPay Simplificado

Este projeto implementa uma API RESTful para transferências financeiras simplificadas, seguindo boas práticas de desenvolvimento, como Clean Architecture, SOLID e Inversão de Dependências.

## Pré-requisitos

- Node.js (v16 ou superior)
- Docker e Docker Compose
- PostgreSQL
- Redis

## Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_NAME="picpay"
DATABASE_USER="root"
DATABASE_PASSWORD="docker"
DATABASE_HOST=localhost
DATABASE_SYNCRONIZE=true
DATABASE_PORT=5432

API_PORT=8000
```

## Como rodar o projeto

### 1. Instale as dependências

Execute o comando abaixo para instalar as dependências do projeto:

```bash
npm install
```

### 2. Suba os serviços com Docker Compose

Certifique-se de que o Docker está rodando em sua máquina e execute o seguinte comando:

```bash
docker-compose up -d
```

Esse comando inicializará os serviços necessários, como PostgreSQL e Redis, utilizando as configurações do arquivo `docker-compose.yml`.

### 3. Inicie a aplicação

Para rodar a aplicação em modo de desenvolvimento, execute:

```bash
npm run start:dev
```

A API estará disponível em [http://localhost:8000](http://localhost:8000).

## Rotas Implementadas

- **`POST /users`**: Criação de usuários.
- **`GET /users`**: Listagem de usuários.
- **`POST /transfers`**: Criação de transferências.
- **`GET /wallets/:userId`**: Retorna o saldo de um usuário.

## Rotas Pendentes

- **`POST /permissions`**: Criar permissões para usuários.
- **`GET /wallets/:userId`**: Exibir a carteira detalhada de um usuário.
- **Testes**: Implementação de testes unitários e de integração (E2E).

## Arquitetura do Projeto

O projeto foi desenvolvido utilizando **Clean Architecture**, que promove a separação de responsabilidades em diferentes camadas:

1. **Camada de Domínio**:
   - Contém as regras de negócio fundamentais.
2. **Camada de Aplicação**:
   - Orquestra casos de uso e lógica de aplicação.
3. **Camada de Infraestrutura**:
   - Contém as implementações específicas de banco de dados, filas e outros serviços externos.

### Inversão de Dependências

Foi aplicada a inversão de dependências para desacoplar as implementações específicas das interfaces. Isso facilita a testabilidade e a manutenção do código.

Exemplo:

- O `TransfersService` utiliza um repositório abstrato `UseAbstractTransfersRepository` para que a lógica de transferência fique desacoplada da implementação do repositório.

### SOLID

- **S**: Classes e métodos seguem o Princípio da Responsabilidade Única.
- **O**: O sistema é aberto para extensões, mas fechado para modificações.
- **L**: As substituições de classes seguem o princípio de substituição de Liskov.
- **I**: Interfaces segregadas foram criadas para respeitar este princípio.
- **D**: As dependências são injetadas em vez de instanciadas diretamente.

## Próximos Passos

- Implementar testes unitários e E2E.
- Completar as rotas pendentes.
- Melhorar a documentação.

## Contribuições

Sinta-se à vontade para abrir issues ou pull requests para melhorias e novas funcionalidades.

