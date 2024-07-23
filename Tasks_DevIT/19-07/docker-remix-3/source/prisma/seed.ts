// import { PrismaClient } from "@prisma/client";
// import { getUrl } from "../app/.server/data/dummyjson/utils";
// const prisma = new PrismaClient();

// async function main() {
//   // Fetch users from dummyjson
//   const usersResponse = await fetch(getUrl(`/users?limit=0`));
//   const usersData = await usersResponse.json();
//   const usersMap = new Map<number, any>();

//   // Insert users into the database
//   for (const user of usersData.users) {
//     await prisma.user.create({
//       data: {
//         id: user.id,
//         email: user.email,
//         name: `${user.firstName} ${user.lastName}`,
//         password: user.password,
//         profile: {
//           create: {
//             firstName: user.firstName,
//             lastName: user.lastName,
//           },
//         },
//       },
//     });
//     usersMap.set(user.id, user);
//   }

//   // Fetch posts from dummyjson
//   const postsResponse = await fetch(getUrl(`/posts`));
//   const postsData = await postsResponse.json();

//   // Insert posts into the database
//   for (const post of postsData.posts) {
//     // Ensure the userId exists in the usersMap before inserting the post
//     if (usersMap.has(post.userId)) {
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

// import { PrismaClient } from "@prisma/client";
// import fetch from "node-fetch";
// import { getUrl } from "../app/.server/data/dummyjson/utils";
// import { TDummyUser, TDummyPost } from "../app/.server/data/dummyjson";

// const prisma = new PrismaClient();

// export async function fetchDummyData(): Promise<TDummyUser> {
//   const response = await fetch(getUrl(`/users?limit=0`));
//   const data = (await response.json()) as { users: TDummyUser[] };
//   return data.users;
// }

// export async function getUserPosts(id: string): Promise<TDummyPost[]> {
//   const response = await fetch(getUrl(`/users/${id}/posts?limit=0`));
//   const data = (await response.json()) as { posts: TDummyPost[] };
//   return data.posts;
// }

// async function main() {
//   const users = await fetchDummyData();

//   for (const user of users) {
//     const userPosts = await getUserPosts(user.id.toString());

//     await prisma.user.create({
//       data: {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         age: user.age,
//         image: user.image,
//         email: user.email,
//         favorite: false,
//         password: user.password,
//         address: {
//           create: {
//             country: user.address.country,
//             city: user.address.city,
//             address: user.address.address,
//           },
//         },
//         posts: {
//           create: userPosts.map((post: TDummyPost) => ({
//             title: post.title,
//             body: post.body,
//             tags: post.tags,
//             reactions: {
//               create: {
//                 likes: post.reactions.likes,
//                 dislikes: post.reactions.dislikes,
//               },
//             },
//           })),
//         },
//       },
//     });
//   }
// }
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import { getUrl } from "../app/.server/data/dummyjson/utils";
import { TDummyUser, TDummyPost } from "../app/.server/data/dummyjson";

const prisma = new PrismaClient();

export async function fetchDummyData(): Promise<TDummyUser[]> {
  const response = await fetch(getUrl(`/users?limit=0`));
  const data = (await response.json()) as { users: TDummyUser[] };
  return data.users;
}

export async function getUserPosts(id: string): Promise<TDummyPost[]> {
  const response = await fetch(getUrl(`/users/${id}/posts?limit=0`));
  const data = (await response.json()) as { posts: TDummyPost[] };
  return data.posts;
}

async function main() {
  const users = await fetchDummyData();

  for (const user of users) {
    const userPosts = await getUserPosts(user.id.toString());

    await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        image: user.image,
        email: user.email,
        favorite: false,
        password: user.password,
        address: {
          create: {
            country: user.address.country,
            city: user.address.city,
            address: user.address.address,
          },
        },
        posts: {
          create: userPosts.map((post: TDummyPost) => ({
            title: post.title,
            body: post.body,
            tags: post.tags,
            reactions: {
              create: {
                likes: post.reactions.likes,
                dislikes: post.reactions.dislikes,
              },
            },
          })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
