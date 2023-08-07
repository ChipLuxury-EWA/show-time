class UserDetailsError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserDetailsError";
    }
}
export class MissingNewUserDetails extends UserDetailsError {
    constructor(message = "there is no new details to update") {
        super(message);
        this.name = "MissingNewUserDetails";
        this.statusCode = 401;
    }
}
