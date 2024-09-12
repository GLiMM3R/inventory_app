export interface Auth {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface User {
  username: string;
  email: string;
}
