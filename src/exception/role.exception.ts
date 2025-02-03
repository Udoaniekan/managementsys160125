import { ForbiddenException } from "@nestjs/common"

export class ForbiddenRoleException extends ForbiddenException {
    constructor(role: string) {
        super(`Forbidden ${role}` );
    }
}