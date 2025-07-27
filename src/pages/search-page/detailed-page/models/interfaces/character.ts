export interface Character {
  uid: string;
  name: string;
  gender?: string;
  yearOfBirth?: number;
  yearOfDeath?: number;
  [key: string]: unknown;
}
