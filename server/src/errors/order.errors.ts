class OrderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OrderError";
  }
}

export class MissingOrderItems extends OrderError {
  constructor(message: string = "there are no items in the order") {
    super(message);
    this.name = "MissingOrderItems";
    this.statusCode = 400;
  }
}
