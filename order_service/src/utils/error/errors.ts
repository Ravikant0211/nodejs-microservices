import { STATUS_CODES } from "./statusCode";


export class BaseError extends Error {
    public readonly name: string;
    public readonly statusCode: number;
    public readonly message: string;

    constructor(name: string, statusCode: number, message: string) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}

// 500 internal server error
export class ApiError extends BaseError {
    constructor(message = 'api error') {
        super(
            'api internal server error', 
            STATUS_CODES.INTERNAL_SERVER_ERROR, 
            message
        );
    }
}


// 400 validation error
export class ValidationError extends BaseError {
    constructor(message = 'bad request') {
        super(
            'bad request',
            STATUS_CODES.BAD_REQUEST,
            message
        );
    }
}

// 401 authorization error
export class AuthorizationError extends BaseError {
    constructor(message = 'unauthorized request') {
        super(
            'unauthorized request',
            STATUS_CODES.UNAUTHORIZED,
            message
        );
    }
}

// 403 authorization error
export class ForbiddenError extends BaseError {
    constructor(message = 'access denied') {
        super(
            'access denied',
            STATUS_CODES.FORBIDDEN,
            message
        );
    }
}

// 404 Not Found error
export class NotFoundError extends BaseError {
    constructor(message = 'not found') {
        super(
            'not found',
            STATUS_CODES.NOT_FOUND,
            message
        );
    }
}