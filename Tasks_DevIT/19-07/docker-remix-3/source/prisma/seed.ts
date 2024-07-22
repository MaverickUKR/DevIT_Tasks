// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   // Очистка таблиц
//   await prisma.post.deleteMany();
//   await prisma.profile.deleteMany();
//   await prisma.user.deleteMany();

//   // Fetch users from dummyjson
//   const usersResponse = await fetch("https://dummyjson.com/users");
//   const usersData = await usersResponse.json();

//   // Insert users into the database
//   for (const user of usersData.users) {
//     await prisma.user.create({
//       data: {
//         id: user.id,
//         email: user.email,
//         name: `${user.firstName} ${user.lastName}`,
//         password: "dummy_password", // Use a dummy password or hash it
//         profile: {
//           create: {
//             firstName: user.firstName,
//             lastName: user.lastName,
//           },
//         },
//       },
//     });
//   }

//   // Fetch posts from dummyjson
//   const postsResponse = await fetch("https://dummyjson.com/posts");
//   const postsData = await postsResponse.json();

//   // Insert posts into the database
//   for (const post of postsData.posts) {
//     // Ensure the userId exists before inserting the post
//     const user = await prisma.user.findUnique({
//       where: { id: post.userId },
//     });

//     if (user) {
//       await prisma.post.create({
//         data: {
//           id: post.id,
//           title: post.title,
//           body: post.body,
//           userId: post.userId,
//         },
//       });
//     } else {
//       console.warn(
//         `User with id ${post.userId} does not exist. Skipping post ${post.id}.`
//       );
//     }
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   // Очистка таблиц
//   await prisma.post.deleteMany();
//   await prisma.profile.deleteMany();
//   await prisma.user.deleteMany();

//   // Fetch users from dummyjson
//   const usersResponse = await fetch("https://dummyjson.com/users");
//   const usersData = await usersResponse.json();

//   // Insert users into the database
//   for (const user of usersData.users) {
//     await prisma.user.create({
//       data: {
//         id: user.id,
//         email: user.email,
//         name: `${user.firstName} ${user.lastName}`,
//         password: "dummy_password", // Use a dummy password or hash it
//         profile: {
//           create: {
//             firstName: user.firstName,
//             lastName: user.lastName,
//           },
//         },
//       },
//     });
//   }

//   // Fetch posts from dummyjson
//   const postsResponse = await fetch("https://dummyjson.com/posts");
//   const postsData = await postsResponse.json();

//   // Insert posts into the database
//   for (const post of postsData.posts) {
//     // Ensure the userId exists before inserting the post
//     const user = await prisma.user.findUnique({
//       where: { id: post.userId },
//     });

//     if (user) {
//       await prisma.post.create({
//         data: {
//           id: post.id,
//           title: post.title,
//           body: post.body,
//           userId: post.userId,
//           reactions: post.reactions
//             ? post.reactions
//             : { likes: 0, dislikes: 0 }, // Add default value if reactions are missing
//           tags: post.tags ? post.tags : [], // Add default value if tags are missing
//         },
//       });
//     } else {
//       console.warn(
//         `User with id ${post.userId} does not exist. Skipping post ${post.id}.`
//       );
//     }
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Очистка таблиц
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // Fetch users from dummyjson
  const usersResponse = await fetch("https://dummyjson.com/users");
  const usersData = await usersResponse.json();
  const usersMap = new Map<number, any>();

  // Insert users into the database
  for (const user of usersData.users) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        password: user.password,
        profile: {
          create: {
            firstName: user.firstName,
            lastName: user.lastName,
          },
        },
      },
    });
    usersMap.set(user.id, user);
  }

  // Fetch posts from dummyjson
  const postsResponse = await fetch("https://dummyjson.com/posts");
  const postsData = await postsResponse.json();

  // Insert posts into the database
  for (const post of postsData.posts) {
    // Ensure the userId exists in the usersMap before inserting the post
    if (usersMap.has(post.userId)) {
      await prisma.post.create({
        data: {
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId,
          reactions: post.reactions
            ? post.reactions
            : { likes: 0, dislikes: 0 }, // Add default value if reactions are missing
          tags: post.tags ? post.tags : [], // Add default value if tags are missing
        },
      });
    } else {
      console.warn(
        `User with id ${post.userId} does not exist. Skipping post ${post.id}.`
      );
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
