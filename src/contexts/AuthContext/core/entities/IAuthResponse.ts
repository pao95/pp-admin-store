export interface IAuthResponse {
  token: string;
  refreshToken: string;
  idToken: string | null;
  accessToken: string;
  tokenType: string;
  expirationTime: number; // Timestamp en milisegundos
}

export interface IRefreshTokenResponse {
  token: string;
  refreshToken: string;
  idToken: string | null;
  accessToken: string;
  tokenType: string;
  expirationTime: number; // Timestamp en milisegundos
}
