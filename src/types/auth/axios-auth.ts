export interface IToken {
  accessToken: string;
}

export interface IAuth {
  accessToken: string;
  refreshToken: string;
  sid: string;
}

export interface IRegistrationResponse {
  username: string;
  email: string;
  id: string;
  userAvatar: string;
}

export interface ILoginResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
  sid: string;
}

export interface IUpdateUserResponse {
  user: IUser;
}

export interface ILogoutResponse {
  message: string;
}

export interface IVerifyResponse {
  user: IUser;
  message: string;
}

export interface IUser {
  _id: string | null;
  username: string | null;
  email: string | null;
  userAvatar: string | null;
  passwordHash: string | null;
  dateCreate: Date | null;
  surname: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  phone: string | null;
  verified: boolean | null;
  sex: string | null;
  aboutUser: string | null;
  likedApartments: string[] | null;
  chats: string[] | null;
}
