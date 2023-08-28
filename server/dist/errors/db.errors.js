class MongoDBError extends Error {
    constructor(message) {
        super(message);
        this.name = "MongoDBError";
    }
}
export class ShowNotFound extends MongoDBError {
    constructor(message = "Show not Found") {
        super(message);
        this.name = "ShowNotFound";
        this.statusCode = 404;
    }
}
export class UserNotFound extends MongoDBError {
    constructor(message = "User not Found") {
        super(message);
        this.name = "UserNotFound";
        this.statusCode = 404;
    }
}
export class InvalidEmailOrPassword extends MongoDBError {
    constructor(message = "Invalid email or password") {
        super(message);
        this.name = "InvalidEmailOrPassword";
        this.statusCode = 401;
    }
}
export class InvalidObjectId extends MongoDBError {
    constructor(message = "Invalid object id - format not matching mongoDB format (cast error)") {
        super(message);
        this.name = "InvalidObjectId";
        this.statusCode = 422;
    }
}
export class GetAllUsersError extends MongoDBError {
    constructor(message = "could not fetch all users") {
        super(message);
        this.name = "GetAllUsersError";
        this.statusCode = 500;
    }
}
