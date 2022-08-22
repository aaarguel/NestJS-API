import { HttpException, HttpStatus } from "@nestjs/common";

export class UserExistsException extends HttpException {
    constructor() {        
        super({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Check registration information", 
            error: 'User already exists',
        }, HttpStatus.BAD_REQUEST);
    }
}

export class UserNotExistsException extends HttpException {
    constructor() {        
        super({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Verify email credentials", 
            error: 'User not exists',
        }, HttpStatus.BAD_REQUEST);
    }
}

export class PasswordInvalidException extends HttpException {
    constructor() {        
        super({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Verify password credentials", 
            error: 'Password Invalid',
        }, HttpStatus.BAD_REQUEST);
    }
}


export class TokenInvalidException  extends HttpException {
    constructor() {        
        super({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: "Token is not valid or expired", 
            error: 'Token Invalid',
        }, HttpStatus.UNAUTHORIZED);
    }
}