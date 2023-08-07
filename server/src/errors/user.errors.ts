class UserDetailsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserDetailsError";
  }
}

export class MissingNewUserDetails extends UserDetailsError {
  constructor(message: string = "there is no new details to update") {
    super(message);
    this.name = "MissingNewUserDetails";
    this.statusCode = 401;
  }
}
