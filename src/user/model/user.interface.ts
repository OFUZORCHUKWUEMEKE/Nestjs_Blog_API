import { UserRole } from "./UserEntity";

export interface User{
    id?:number;
    username?:string;
    name?:string;
    email:string;
    password:string
    role?:UserRole 
}
