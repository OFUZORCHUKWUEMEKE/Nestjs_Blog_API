import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum UserRole{
    ADMIN='admin',
    EDITOR='editor',
    CHIEFEDITOR='chiefeditor',
    USER='user'

}

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string
     
    @Column()
    email:string
     
    // @Exclude()
    @Column()
    password:string

    @Column({type:'enum',enum:UserRole,default:UserRole.USER})
    role:UserRole

    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase()
    }
}