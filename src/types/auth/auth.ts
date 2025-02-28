export interface IAuthUserData {
  username?: string;
  email?: string;
  password?: string;
  userAvatar?: string;
  surname?: string;
  country?: string;
  city?: string;
  address?: string;
  phone?: string;
  verified?: boolean;
  sex?: string;
  aboutUser?: string;
  likedApartments?: string[];
}

export interface IVerifyEmailData {
  email: string;
  location: string;
  message: object;
  logo: File | null | undefined;
}
