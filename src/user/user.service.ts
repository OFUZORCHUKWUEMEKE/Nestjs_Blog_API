import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/UserEntity';
import { Repository } from 'typeorm';
import { User } from './model/user.interface';
import {Observable,from} from 'rxjs'

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>){}

    create(user:User):Observable<User>{
        return from(this.userRepository.save(user))
    }

    findAll():Observable<User[]>{
        return from(this.userRepository.find())
    }

    async findOne(id:number){
        return await this.userRepository.findBy({id})
    }

    deleteOne(id:number):Observable<any>{
        return from(this.userRepository.delete(id))
    }

    updateOne(id:number,user:User):Observable<any>{
        return from(this.userRepository.update(id,user))
    }
}
