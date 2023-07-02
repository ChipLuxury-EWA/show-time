export const BASE_URL = process.env.NODE_ENV === "development" ? `http://localhost:3001` : "";
export const API_VERSION = "/api/v1";
export const SHOWS_URL = `${API_VERSION}/shows`;
export const USERS_URL = `${API_VERSION}/users`;
export const ORDERS_URL = `${API_VERSION}/orders`;
export const PAYPAL_URL = `${API_VERSION}/config/paypal`;
