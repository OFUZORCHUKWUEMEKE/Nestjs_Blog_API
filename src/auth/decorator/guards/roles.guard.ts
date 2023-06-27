import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "src/user/model/user.interface";
import { UserService } from "src/user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(@Inject(forwardRef(() => UserService)) private userService: UserService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const roles = this.reflector.get('roles', context.getHandler())
        if (!roles) {
            return true
        }
        const request = context.switchToHttp().getRequest()

        console.log(request)

        const user: User = request.user;

        const isUser: any = await this.userService.findOne(user.id);

        if (isUser) {
            const hasRoles = (): boolean => roles.indexOf(user.role) > -1
            if (hasRoles) {
                return true
            }
        } else {
            return false
        }
        return true
    }
}