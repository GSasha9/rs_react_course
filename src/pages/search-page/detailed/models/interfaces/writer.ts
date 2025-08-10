export interface Writer {
  uid: string;
  name: string;
  gender?: string;
  dateOfBirth?: string | null;
  [key: string]: unknown;
}
