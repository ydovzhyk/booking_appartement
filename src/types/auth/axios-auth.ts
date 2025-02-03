export interface IToken {
    accessToken: string;
}

export interface IAuth {
    accessToken: string;
    refreshToken: string;
    sid: string;
}

export interface IRegistrationResponse {
    username: string,
    email: string,
    id: string,
    userAvatar: string,
}

export interface ILoginResponse {
    user: IUser,
    accessToken: string,
    refreshToken: string,
    sid: string,
}

export interface ILogoutResponse {
    message: string,
}

export interface IUser {
    id: string | null;
    username: string | null;
    email: string | null;
    userAvatar: string | null;
    passwordHash: string | null;
    dateCreate: Date | null;
}


