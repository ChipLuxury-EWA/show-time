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
