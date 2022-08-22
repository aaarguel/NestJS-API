import { HttpException, HttpStatus } from "@nestjs/common";

export class NotOwnerException extends HttpException {
    constructor() {        
        super({
            statusCode: HttpStatus.FORBIDDEN,
            message: "Check your products ids and updated that", 
            error: 'Your not owner of the product',
        }, HttpStatus.FORBIDDEN);
    }
}