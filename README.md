# Live in Chat

I developed a real-time chat application using Next.js and Express in the frontend and backend, respectively. In addition, I set up a separate server to host the socket.io server, which enables the client and server to communicate in real-time. The chat allows users to send and receive messages in real-time, providing a seamless and interactive communication experience.

## Deploy: [Live View](https://live-in-chat.vercel.app/login) ✨

You can see the live version of the project clicking on the link above.

## Frontend

- React: Javascript library to create interfaces.
- Next.js: React framework that gives functionalities as SSR.
- 💅 styled-components: CSS-in-JS library for styling.
- react-icons: npm package with React-ready icon libraries.
- axios: HTTP client to request data from the backend.
- cookies-next: library to make cookies.
- socket.io-client: library to make the connection with the backend.
- react-toastify: library for notifications.

## Backend

- Node & Express: Javascript based stack for server applications.
- Prisma: ORM to interact with the database.
- PostgreSQL: A relational database was required by the challenge.
- socket.io: library for realtime web applications.

## Install and start

To install all the things required to execute the app, you just need to do it in the root folder:

```sh
npm run initialize
```

You can start the app with a single command also in the root folder:

```sh
npm run start
```

## Requirements

The project was created with two folders, one for frontend and the other one for backend so you will need to change directory depending on what the heading says.

### Client

Create a file .env that contains the next text:

```sh
NEXT_PUBLIC_API_URL=http://localhost:3005
NEXT_PUBLIC_SOCKET_URL=http://localhost:3010
```

### Server

PostgresSQL running a database called "live_in_chat" [download here](https://www.postgresql.org/download/)

```sh
sudo -u postgres psql
CREATE DATABASE live_in_cha;
```

Create a file .env with the next text where you just need to change username (usually postgres) and password (also usually postgres) and create your own secrets.

```sh
DATABASE_URL=postgresql://username:mypassword@localhost:5432/live_in_chat
CLIENT_URL=http://localhost:3000
JWT_SECRET_KEY="Here you key"
JWT_SECRET="Here another key"
```

### Socket

Create a file .env with the next text:

```sh
CLIENT_URL=http://localhost:3000
```

## Author

👤 **vlunaklick**

- Github: [@vlunaklick](https://github.com/vlunaklick)
- LinkedIn: [@vlunaklick](https://linkedin.com/in/vlunaklick)
