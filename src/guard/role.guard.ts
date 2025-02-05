import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { UserService } from "src/user/user.service";
import { ForbiddenRoleException } from "src/exception/role.exception";

@Injectable() // Ensure this decorator is present
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Ensure reflector is properly injected
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) return true; // If no roles are defined, allow access

        const request = context.switchToHttp().getRequest();

        if (request?.user) {
            const headers = request.headers;
            const user = await this.userService.user(headers); // Await user details

            if (!user || !roles.includes(user.role)) {
                throw new ForbiddenRoleException(roles.join(' or '));
            }

            return true; // Allow access if user role is valid
        }
        return false; // Deny access if user is not authenticated
    }
}
