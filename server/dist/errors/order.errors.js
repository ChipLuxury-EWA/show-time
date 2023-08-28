class OrderError extends Error {
    constructor(message) {
        super(message);
        this.name = "OrderError";
    }
}
export class MissingOrderItems extends OrderError {
    constructor(message = "there are no items in the order") {
        super(message);
        this.name = "MissingOrderItems";
        this.statusCode = 400;
    }
}
