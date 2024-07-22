import { db } from "./db";
import type { DummyUser, DummyUserAddress } from "./interfaces";
import type { Post, User, Profile, Prisma } from "@prisma/client";
import { transformPost } from "./posts";

function transformUser(
  user: User & { profile: Profile | null; posts: Post[] }
): DummyUser {
  return {
    id: user.id,
    email: user.email,
    firstName: user.profile?.firstName || "",
    lastName: user.profile?.lastName || "",
    age: user.age || 0,
    image: user.image || "",
    password: user.password,
    favorite: user.favorite || false,
    address: (user.address as DummyUserAddress) || {
      country: "",
      city: "",
      address: "",
    },
    posts: user.posts.map(transformPost),
  };
}

export async function getUsers(): Promise<DummyUser[]> {
  const users = await db.user.findMany({
    include: {
      profile: true,
      posts: true,
    },
  });

  return users.map(transformUser);
}

export async function getUserById(id: string): Promise<DummyUser | null> {
  const user = await db.user.findUnique({
    where: { id: parseInt(id) },
    include: {
      profile: true,
      posts: true,
    },
  });

  return user ? transformUser(user) : null;
}

export async function createEmptyUser(): Promise<DummyUser> {
  const user = await db.user.create({
    data: {
      email: "",
      password: "",
      profile: {
        create: {
          firstName: "",
          lastName: "",
        },
      },
      age: 0,
      image: "",
      favorite: false,
      address: {
        country: "",
        city: "",
        address: "",
      } as Prisma.JsonObject,
    },
    include: {
      profile: true,
    },
  });

  return transformUser(user);
}

export async function updateUser(
  id: string,
  data: Partial<DummyUser>
): Promise<DummyUser> {
  const user = await db.user.update({
    where: { id: parseInt(id) },
    data: {
      email: data.email,
      password: data.password,
      profile: {
        update: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      },
      age: data.age,
      image: data.image,
      favorite: data.favorite,
      address: data.address as unknown as Prisma.JsonObject,
    },
    include: {
      profile: true,
    },
  });

  return transformUser(user);
}

export async function deleteUser(id: string): Promise<DummyUser> {
  const user = await db.user.delete({
    where: { id: parseInt(id) },
    include: {
      profile: true,
    },
  });

  return transformUser(user);
}

export async function searchUsers(query: string): Promise<DummyUser[]> {
  const users = await db.user.findMany({
    where: {
      OR: [
        { profile: { firstName: { contains: query, mode: "insensitive" } } },
        { profile: { lastName: { contains: query, mode: "insensitive" } } },
      ],
    },
    include: {
      profile: true,
      posts: true,
    },
  });

  return users.map(transformUser);
}
