# Language Flashcards - Backend

**Author:** Kris Sakarias

**Version** 2.0.0

## Overview

This is a flaschard app that helps people learn useful vocabulary and terminology in various languages. Users can select a language to practice, along with their desired direction of translation, and are presented with a collection of words and useful vocabulary to practice. 

The backend server and API is built with **Node**. It utilizes a **PostgreSQL** relational database, which is managed by **Sequelize**. Unit tests are written using **Jest**. Load testing of the server will be conducted with **Artillery**.


## Getting Started

1. Clone the parent repo: `git clone https://github.com/kris71990/lang-flashcards.git`
2. Create a `.env` file in in the backend directory and include the environment variables listed below
3. `npm i` to install necessary node modules

**Environment variables**

- `NODE_ENV=development`
- `PORT=3000`
- `CLIENT_URL=http://localhost:8080`
- `DATABASE_URL=postgres://localhost:5432/flashcards`

**Create Local Database**

In the **PostgreSQL** shell (psql), create a local database for the application: `CREATE DATABASE flashcards;`.

**Start the Server**

From the root of the backend directory, start the server with `npm run start`.


## Documentation

**Database Models**

**Routing and Functionality**


## Testing

Unit testing with **Jest**
Load testing with **Artillery**
