export interface Roles {
  mitarbeiter?: boolean;
  schmester?: boolean;
  arzt?: boolean;
  admin?: boolean;
}

export interface User {
  email: string;
  uid: string;
  roles?: Roles;
}
