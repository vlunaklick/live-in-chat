<h1 align="center">Welcome to 'Live in Chat'</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> In this project I created a 'Realtime chat'. It was created using Next.js in the frontend and Express in the backend. Also, I had to create another server where I deployed the socket.io server, this was very important because it let me make the comunication client-server.

### ✨ [Live View](https://live-in-chat.vercel.app/login)

- Account for testing: fakeuser1@gmail.com:fakepass123
- Other account: fakeuser2@gmail.com:fakepass123

### Frontend

- React: Javascript library to create interfaces.
- Next.js: React framework that gives functionalities as SSR.
- 💅 styled-components: CSS-in-JS library for styling.
- react-icons: npm package with React-ready icon libraries.
- axios: HTTP client to request data from the backend.
- cookies-next: library to make cookies.
- socket.io-client: library to make the connection with the backend.
- react-toastify: library for notifications.

### Backend

- Node & Express: Javascript based stack for server applications.
- Prisma: ORM to interact with the database.
- PostgreSQL: A relational database was required by the challenge.
- socket.io: library for realtime web applications.

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

## Install and start

To install all the things required to execute the app, you just need to do it in the root folder:

```sh
npm run initialize
```

You can start the app with a single command also in the root folder:

```sh
npm run start
```
## Author

👤 **vlunaklick**

* Github: [@vlunaklick](https://github.com/vlunaklick)
* LinkedIn: [@vlunaklick](https://linkedin.com/in/vlunaklick)

## My Profile

> In my profile you can see route to convert into a fullstack web developer.

Give a ⭐️ if you liked this project.