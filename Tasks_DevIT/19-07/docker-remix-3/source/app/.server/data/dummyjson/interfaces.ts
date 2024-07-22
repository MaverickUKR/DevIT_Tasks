export type DummyUserAddress = {
  country: string;
  city: string;
  address: string;
};

export type DummyUser = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
  email: string;
  favorite: boolean;
  address: DummyUserAddress;
};

export type DummyPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
};

// export type DummyUserAddress = {
//   country: string;
//   city: string;
//   address: string;
// };

// export type DummyUser = {
//   id: number;
//   email: string;
//   firstName: string;
//   lastName: string;
//   age: number;
//   image: string;
//   password: string;
//   favorite: boolean;
//   address: DummyUserAddress;
//   profile?: {
//     id: number;
//     firstName: string;
//     lastName: string;
//     userId: number;
//   } | null;
//   posts?: {
//     id: number;
//     title: string;
//     body: string;
//     userId: number;
//   }[];
// };

// export type DummyPost = {
//   id: number;
//   title: string;
//   body: string;
//   userId: number;
//   tags: string[];
//   reactions: {
//     likes: number;
//     dislikes: number;
//   };
// };
