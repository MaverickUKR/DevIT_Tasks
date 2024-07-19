export interface Contact {
  id: string;
  first: string;
  last: string;
  avatar: string;
  twitter?: string;
  username?: string;
  notes?: string;
  favorite: boolean;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}
