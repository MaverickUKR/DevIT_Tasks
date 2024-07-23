export type TUserAddress = {
  country: string;
  city: string;
  address: string;
};

export type TDummyUser = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
  email: string;
  favorite: boolean;
  address: TUserAddress;
  password: string;
};

export type TDummyPost = {
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
