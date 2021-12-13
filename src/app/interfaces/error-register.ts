export interface ErrorRegister {
  errors: Error[];
}

export interface Error {
  value:    string;
  msg:      string;
  param:    string;
  location: string;
}
