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
