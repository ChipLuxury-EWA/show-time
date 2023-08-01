class MongoDBError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MongoDBError";
  }
}

export class ShowNotFound extends MongoDBError {
  constructor(message: string = "Show not Found") {
    super(message);
    this.name = "ShowNotFound";
    this.statusCode = 404;
  }
}

export class UserNotFound extends MongoDBError {
  constructor(message: string = "User not Found") {
    super(message);
    this.name = "UserNotFound";
    this.statusCode = 404;
  }
}
