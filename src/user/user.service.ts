import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/UserEntity';
import { Repository } from 'typeorm';
import { User } from './model/user.interface';
import { Observable, from } from 'rxjs'
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, private authService: AuthService) {}

    async create(user: User): Promise<any> {
        const alreadyExist = await this.userRepository.find({ where: { email: user.email } })

        if (alreadyExist) {
            throw new HttpException('Email already taken', 400)
        }

        const hashpassword = await this.authService.hashPassword(user.password)

        const newUser = new UserEntity()
        newUser.name = user.name
        newUser.email = user.email
        newUser.password = hashpassword
        newUser.username = user.username

        this.userRepository.save(newUser)

        const { password, ...payload } = newUser
        return payload
    }

    async findAll(): Promise<any>{
        const users = await this.userRepository.find()
        return users.forEach((v) => { delete v.password })
    }

    async findOne(id: number) {
        const user = await this.userRepository.findBy({ id })
    }

    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id))
    }

    updateOne(id: number, user: User): Observable<any> {
        delete user.email
        delete user.password
        return from(this.userRepository.update(id, user))
    }

    async login(user: User) {
        const validUser = await this.validateUser(user.email, user.password)
        if (!validUser) throw new HttpException('Wrong Credentials', 400)
        return this.authService.generateJWT(user)
    }

    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } })
        if (!user) {
            throw new HttpException('Email Not fOUND', 400)
        }
        const correctPassword = await this.authService.comparePassword(password, user.password)
        if (!correctPassword) throw new HttpException('Invalid Credentials', 400)
        delete user.password
        return user;
    }

    async findByMail(email: string) {
        return await this.userRepository.findOne({ where: { email } })
    }
}
