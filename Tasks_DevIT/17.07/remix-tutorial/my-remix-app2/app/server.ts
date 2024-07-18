// import express, { Request, Response } from "express";
// import axios from "axios";

// const app = express();
// const PORT = 3000;

// interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   age: number;
//   email: string;
//   image: string;
// }

// app.get("/", async (req: Request, res: Response) => {
//   try {
//     const response = await axios.get("https://dummyjson.com/users");
//     const users: User[] = response.data.users;

//     const usersHtml = users
//       .map(
//         (user) => `
//       <div>
//         <h2>${user.firstName} ${user.lastName}</h2>
//         <p>Age: ${user.age}</p>
//         <p>Email: ${user.email}</p>
//         <img src="${user.image}" alt="Avatar of ${user.firstName}">
//       </div>
//     `
//       )
//       .join("");

//     const html = `
//       <html>
//         <head>
//           <title>Users</title>
//         </head>
//         <body>
//           <h1>List of Users</h1>
//           ${usersHtml}
//         </body>
//       </html>
//     `;

//     res.send(html);
//   } catch (error) {
//     res.status(500).send("Error fetching users");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

import express from "express";
import { createRequestHandler } from "@remix-run/express";
import fetch from "node-fetch";
import * as serverBuild from "@remix-run/dev/server-build";
import { User } from "./data";
import { AppLoadContext } from "@remix-run/node";
const app = express();

app.all(
  "*",
  createRequestHandler({
    async getLoadContext(): Promise<AppLoadContext> {
      const response = await fetch("https://dummyjson.com/users");
      try {
        const data: { users: User[] } = await response.json();
        console.log(response);
        return { users: data.users || [] };
      } catch (error) {
        console.error("Failed to fetch users", error);
        return { users: [] };
      }
    },
    build: serverBuild,
  })
);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
