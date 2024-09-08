export interface Auth {
  user: {
    username: string;
    email: string;
  };
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
