export class CarNotFoundException implements Error {
    name: string;
    message: string;
    stack?: string;
    status:number;
    
    constructor(message: string) {
        this.message = message
        this.status = 404;
    }
}