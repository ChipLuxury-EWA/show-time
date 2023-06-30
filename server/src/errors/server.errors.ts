class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
  }
}

export class UrlNotFound extends ServerError {
  constructor(message: string = "Url not Found") {
    super(message);
    this.name = "UrlNotFound";
    this.statusCode = 404;
  }
}
