import { Body, Controller, Get, Param, Post ,Delete,Put} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.interface';
import { Observable ,from} from 'rxjs'
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Get()
    findAll(): Observable<User[]> {
        return this.userService.findAll()
    }
    @Post()
    create(@Body() body: User): Observable<User> {
        return this.userService.create(body)
    }

    @Get(':id')
    async findOne(@Param('id') id:number) {
        return await this.userService.findOne(id)
    }
     
    @Delete(':id')
    deleteOne(@Param('id') id:number):Observable<User> {
      return this.userService.deleteOne(id)
    }

    @Put(':id')
    updateOne(@Param('id') id:number,@Body() user:User):Observable<any> {
        return this.userService.updateOne(id,user)
    }
}
