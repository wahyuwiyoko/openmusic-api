# OpenMusic API

A simple CRUD API for music data. Built with [Node.js](https://nodejs.org/)
and [hapi](https://hapi.dev/) framework for learning RESTful API.

This project is not for production and is not
currently being actively maintained.

## Installation & Usage Instructions

Before using this project, you must have
[Node.js](https://nodejs.org/) and
[PostgreSQL](https://www.postgresql.org/) installed.

Clone the project:

```sh
git clone https://github.com/wahyuwiyoko/openmusic-api.git
```

Open the directory and install the dependencies:

```sh
cd openmusic-api
npm install
```

Create a database in PostgreSQL shell with name `openmusic`:

```sh
CREATE DATABASE openmusic;
```

Copy the [`.env.example`](.env.example) file into `.env` in the root directory:

```sh
cp .env.example .env
```

Inside `.env` file, add the following environment variables:

```
# Server configuration
HOST=localhost
PORT=5000

# node-postgres configuration
PGUSER=<your-postgres-username>
PGHOST=<your-postgres-host>
PGPASSWORD=<your-postgres-password>
PGDATABASE=openmusic
PGPORT=<your-postgres-port>
```

Replace the value of `<your-postgres-username>` and the others
with the **exact configuration on your PostgreSQL system**.

Here is an example of the `.env` configuration:

```
# Server configuration
HOST=localhost
PORT=5000

# node-postgres configuration
PGUSER=john
PGHOST=localhost
PGPASSWORD=helloworld
PGDATABASE=openmusic
PGPORT=5432
```

Create tables automatically in the project:

```sh
npm run migrate up
```

Run the server:

```sh
npm run server
```

To delete all tables, run `npm run migrate down 2`.

## Documentation

OpenAPI specification docs are available at
https://wahyuwiyoko.github.io/openmusic-api/
