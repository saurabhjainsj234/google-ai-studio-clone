export type User = {
  name: string;
  email: string;
  imageUrl: string;
};

export type AuthContextType = {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
};
