class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthError";
    }
}
export class UnAuthorized extends AuthError {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = "UnAuthorized";
        this.statusCode = 401;
    }
}
export class MissingToken extends UnAuthorized {
    constructor(message = "Missing token") {
        super(message);
        this.name = "MissingToken";
        this.statusCode = 422;
    }
}
export class TokenFailed extends UnAuthorized {
    constructor(message = "Token failed") {
        super(message);
        this.name = "TokenFailed";
        this.statusCode = 422;
    }
}
export class ValidateAdminFailed extends AuthError {
    constructor(message = "Not authorized as admin") {
        super(message);
        this.name = "ValidateAdminFailed";
        this.statusCode = 403;
    }
}
export class UserExistError extends AuthError {
    constructor(message = "User already exist in the system") {
        super(message);
        this.name = "UserExistError";
        this.statusCode = 400;
    }
}
