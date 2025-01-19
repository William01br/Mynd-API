# API-Mynd

API for backend that provides features such as creating posts, creating comments and likes on posts. The aim of the project was to gain experience.

---

#### [Introduction](#introduction) - [Installation](#installation) - [Usage](#usage) - [Features](#features) - [How was organized?](#how-the-project-was-organized)

## Introduction

I’m developed a RESTful API using Node.js, Express.js, and MongoDB to create a simple social media platform where users can interact with posts, comments, and likes.

The goal of this project is to showcase my growing experience in building web applications, particularly by designing a backend that can handle essential social media interactions.

Node.js provides a fast, event-driven environment that ensures scalability, while Express.js simplifies the creation of the API and routing, making the development process more efficient. MongoDB, a NoSQL database, is an ideal choice for storing dynamic user-generated content like posts and comments.

This API focused on core features—allowing users to create posts, comment on them, and like content—while laying the foundation for future enhancements.

## Installation

- Clone the repository:

`git clone https://github.com/williambr01/Mynd-API.git`

- Navigate to the project directory:

`cd /backend`

- Set up environment variables:

  - create a `.env` file based on `.env.example`

## Usage

#### docker

Docker Compose is the tool that enables the application to run. Both NodeJS and MongoDB are provided as Docker images.

So, you need Docker installed on your machine. If you don't have it installed, you can install it here:

`https://docs.docker.com/get-started/get-docker/`

---

To bring up the Docker Compose and run the server, you must run the following command:

`docker compose up -d`

Make sure you are in the same directory as the `docker-compose.yml` file.

---

To see the logs of the application, run:

`docker logs -f backend`

This command shows the logs of a Docker container named `backend` and the `-f` flag keeps the logs continuously displayed, meaning the logs will keep updating in real-time as the container outputs new log data.

#### User Interface:

Since it is an API and must be consumed by a front-end, while development, i used Postman as a graphical interface to make requests to the API.

But all endpoints are documented in the file "swagger.json" and you can interact with the API through the URL:

`localhost:3000/doc/` --> Swagger UI provides a graphical interface for the API.

## Features

- Architecture monolithic
- RESTfull API with CRUD operations
- JWT-based session management
- Use of the MongoDB ORM (moongose)
- encrypted password storage in the DataBase
- Use of the Docker for create the Development Enviroment
- Programmed only JS
- Principle of Unique Responsability in all project
- Relationship between collections

## How the project was organized?

A short explanation of the purposes of the project's directories.

- **Routes** → Defines the endpoints.
- **Controllers** → Perform basic validations, and the main purpose is to control HTTP responses.
- **Services** → Responsible for data encryption, complex logic, token creation, and interaction with the database.
- **Utils** → Contains files that solve specific problems.
- **Models** → Define the database collections.
