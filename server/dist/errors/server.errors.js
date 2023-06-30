class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "ServerError";
    }
}
export class UrlNotFound extends ServerError {
    constructor(message = "Url not Found") {
        super(message);
        this.name = "UrlNotFound";
        this.statusCode = 404;
    }
}
