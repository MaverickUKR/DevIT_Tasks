// import { prisma } from "./db";
// import type { TDummyUser, TUserAddress } from "./interfaces";
// import type { Post, User, Profile, Prisma } from "@prisma/client";
// import { transformPost } from "./posts";

// function transformUser(
//   user: User & { profile: Profile | null; posts: Post[] }
// ): TDummyUser {
//   return {
//     id: user.id,
//     email: user.email,
//     firstName: user.profile?.firstName || "",
//     lastName: user.profile?.lastName || "",
//     age: user.age || 0,
//     image: user.image || "",
//     password: user.password,
//     favorite: user.favorite || false,
//     address: (user.address as TUserAddress) || {
//       country: "",
//       city: "",
//       address: "",
//     },
//     posts: user.posts.map(transformPost),
//   };
// }

// export async function getUsers(): Promise<TDummyUser[]> {
//   const users = await prisma.user.findMany({
//     include: {
//       profile: true,
//       posts: true,
//     },
//   });

//   return users.map(transformUser);
// }

// export async function getUserById(id: string): Promise<TDummyUser | null> {
//   const user = await prisma.user.findUnique({
//     where: { id: parseInt(id) },
//     include: {
//       profile: true,
//       posts: true,
//     },
//   });

//   return user ? transformUser(user) : null;
// }

// export async function createEmptyUser(): Promise<TDummyUser> {
//   const user = await prisma.user.create({
//     data: {
//       email: "",
//       password: "",
//       profile: {
//         create: {
//           firstName: "",
//           lastName: "",
//         },
//       },
//       age: 0,
//       image: "",
//       favorite: false,
//       address: {
//         country: "",
//         city: "",
//         address: "",
//       } as Prisma.JsonObject,
//     },
//     include: {
//       profile: true,
//     },
//   });

//   return transformUser(user);
// }

// export async function updateUser(
//   id: string,
//   data: Partial<TDummyUser>
// ): Promise<TDummyUser> {
//   const user = await prisma.user.update({
//     where: { id: parseInt(id) },
//     data: {
//       email: data.email,
//       password: data.password,
//       profile: {
//         update: {
//           firstName: data.firstName,
//           lastName: data.lastName,
//         },
//       },
//       age: data.age,
//       image: data.image,
//       favorite: data.favorite,
//       address: data.address as unknown as Prisma.JsonObject,
//     },
//     include: {
//       profile: true,
//     },
//   });

//   return transformUser(user);
// }

// export async function deleteUser(id: string): Promise<TDummyUser> {
//   const user = await prisma.user.delete({
//     where: { id: parseInt(id) },
//     include: {
//       profile: true,
//     },
//   });

//   return transformUser(user);
// }

// export async function searchUsers(query: string): Promise<TDummyUser[]> {
//   const users = await prisma.user.findMany({
//     where: {
//       OR: [
//         { profile: { firstName: { contains: query, mode: "insensitive" } } },
//         { profile: { lastName: { contains: query, mode: "insensitive" } } },
//       ],
//     },
//     include: {
//       profile: true,
//       posts: true,
//     },
//   });

//   return users.map(transformUser);
// }

import { getUrl } from "./utils";
import type { TDummyUser } from "./interfaces";

export async function getUsers(): Promise<TDummyUser[]> {
  const response = await fetch(getUrl(`/users`));
  const { users } = await response.json();
  return users;
}

export async function searchUsers(query: string): Promise<TDummyUser[]> {
  const url = getUrl(`/users/search?q=${query}`);
  url.searchParams.append("q", query);

  const response = await fetch(url);
  const { users } = await response.json();
  return users;
}

export async function getUserById(id: string): Promise<TDummyUser> {
  const res = await fetch(getUrl(`/users/${id}`));
  const user = await res.json();
  return user;
}

export async function createEmptyUser(): Promise<TDummyUser> {
  const res = await fetch(getUrl(`/users/add`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const createdUser = await res.json();
  return createdUser;
}

export async function updateUser(
  id: string,
  data: Partial<TDummyUser>
): Promise<TDummyUser> {
  const res = await fetch(getUrl(`/users/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
  const updatedUser = await res.json();
  return updatedUser;
}

export async function deleteUser(id: string): Promise<TDummyUser> {
  const res = await fetch(getUrl(`/users/${id}`), { method: "DELETE" });
  const deletedUser = await res.json();
  return deletedUser;
}
