import { UserData } from "./user.interface";

export interface Profile {
  name: UserData;
  cedula: string;
  primer_nombre: string;
  segundo_nombre: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  email: string;
  user_id?: string | null;
  profile?:string;
  id_user: string;
}

export interface ProfilesResponse {
  data: Profile[];
  message: string;
}
