export interface IUser {
  idUser?: number;
  lastNameUser: string;
  firstNameUser: string;
  dniUser: string;
  cuilUser: string;
  birthDateUser: Date | null;
  genderUser: string;
  emailUser: string;
  phoneNumberUser: string;
  addressUser: string;
  addressNumberUser: string;
  localityUser: string;
  provinceUser: string;
  zipCodeUser: string;
  createdAtUser?: string;
  updatedAtUser?: string;
}
