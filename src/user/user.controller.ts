import { Body, Controller, Get, Param, Post, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.interface';
import { Observable, from } from 'rxjs'
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/decorator/guards/jwt-guard';
import { RolesGuard } from 'src/auth/decorator/guards/roles.guard';
import { UserRole } from './model/UserEntity';
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Get()
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    async findAll(): Promise<User[]> {
        return await this.userService.findAll()
    }
    @Post()
    async create(@Body() body: User) {
        return await this.userService.create(body)
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.userService.findOne(id)
    }

    @Post('/login')
    login(@Body() user: User) {
        return this.userService.login(user)
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number): Observable<User> {
        return this.userService.deleteOne(id)
    }

    @Put(':id')
    updateOne(@Param('id') id: number, @Body() user: User): Observable<any> {
        return this.userService.updateOne(id, user)
    }
}
