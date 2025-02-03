import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { UserService } from "src/user/user.service";

import { ForbiddenRoleException} from "src/exception/role.exception";


Injectable()
export class RolesGuard implements CanActivate {
    constructor (private reflector:Reflector,private userService:UserService){}
    //a service that allows access to metadata attached to the route handler (such as the role allowed to access a route).

    async canActivate(context: ExecutionContext):Promise<boolean> {
        const roles=this.reflector.get<string[]>('roles', context.getHandler()) // the roles variable retrieves the roles meatadata attached to the route handler(the function that will handle the request).

        const request = context.switchToHttp().getRequest(); // the request object represents the incoming http request. it contains information like headers, the current user, and other request-related data.
        
        if(request?.user){
            const headers:Headers=request.headers;
            let user = this.userService.user(headers); // the code fetched the request headers and calls the userService.user(headers) method to retrieve the current users details such as their role.
            
            if (!roles.includes((await user).role)) {
                throw new ForbiddenRoleException(roles.join(' or '));
            }
        return true; // this line checks  if the users role (retrieved from the userService) is included in the list of roles allowed to access this route.
        }
        return false; // if the users role is not included in the list of roles allowed to access this route, it throws a forbiddenRoleException, effectively denying access to the route

    }
}
