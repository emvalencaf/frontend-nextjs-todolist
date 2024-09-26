export interface IResponseError {
    message: string | string[];
    error: string;
    statusCode: number;
}

export class ErrorCustom extends Error {
    statusCode: number;
    errorType: string;
    constructor(statusCode: number, message: string, errorType: string) {
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType;
    }
}