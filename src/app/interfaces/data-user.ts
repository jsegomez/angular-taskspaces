export interface DataUser {
  token: string;
  user:  User;
}

export interface User {
  name:     string;
  lastname: string;
  email:    string;
  id:       string;
}
