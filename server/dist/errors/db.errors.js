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
export class InvalidUserId extends MongoDBError {
    constructor(message = "Invalid user id - format not matching mongoDB format (cast error)") {
        super(message);
        this.name = "InvalidUserId";
        this.statusCode = 422;
    }
}
