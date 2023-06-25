import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async generateJWT(payload: object): Promise<string> {
        return await this.jwtService.signAsync(payload)
    }

    async hashPassword(password:string):Promise<string>{
         return await bcrypt.hash(password,12)
    }
    
    comparePassword(newPassword:string,passwordHash:string){
        return bcrypt.compare(newPassword,passwordHash)
    }
}
