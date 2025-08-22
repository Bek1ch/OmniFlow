export type TUserRoles = "ADMIN" | "USER";

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IBaseTokenData {
  iss: string;
  exp: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
}

export interface IUserData extends IUser {
  id: string;
  role: TUserRoles;
}

export interface IAuthState {
  isAuthenticated: boolean;
  data: ITokenData | null;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegistrationData {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}

export interface ITokenData extends IBaseTokenData, IUserData {}
