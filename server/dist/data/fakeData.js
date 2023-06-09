// this code was generated with chatGPT
// my main goal was to generate json object....
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
const AMOUNT_OF_USERS = 10;
const AMOUNT_OF_CATEGORY = 4;
const SHOWS_AMOUNT = 9;
const MAX_TICKET_AMOUNT_PER_SHOW = 8;
///// ^^^ my code ^^^ ////
// Generate random integer within a range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomRole() {
    return ["admin", "showOrganizer", "buyer"][getRandomInt(0, 2)];
}
function getRandomLocation() {
    return ["south", "north", "center"][getRandomInt(0, 2)];
}
// Generate random string
function getRandomString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
// Generate dummy data for Users
const users = [
    {
        name: `Admin User`,
        email: `admin@example.com`,
        password: bcrypt.hashSync("123456", 10),
        role: "admin",
    },
    {
        name: `showOrganizer User`,
        email: `showOrganizer@example.com`,
        password: bcrypt.hashSync("123456", 10),
        role: "showOrganizer",
    },
    {
        name: `buyer User`,
        email: `buyer@example.com`,
        password: bcrypt.hashSync("123456", 10),
        role: "buyer",
    },
];
for (let i = 1; i <= AMOUNT_OF_USERS; i++) {
    const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: `password${i}`,
        role: getRandomRole(),
    };
    users.push(user);
}
// Generate dummy data for Shows
const shows = [];
for (let i = 1; i <= SHOWS_AMOUNT; i++) {
    const show = {
        // _id: i.toString(),
        categoryId: getRandomInt(1, AMOUNT_OF_CATEGORY),
        ticketIds: [],
        sellerId: getRandomInt(1, 3),
        // TODO tompo: add id by user role (if user.role == role.id)
        name: faker.company.name(),
        price: getRandomInt(10, 100),
        location: getRandomLocation(),
        address: faker.location.streetAddress({ useFullAddress: true }),
        image: `/images/ticket_${i}.jpg`,
        date: new Date().toISOString().split("T")[0],
        time: new Date(),
        minutesBeforePurchase: getRandomInt(1, 60),
        description: `${faker.commerce.productDescription()}`,
        duration: getRandomInt(60, 180),
        cast: [`Amos Tamam`, ` Rebeka Michali`],
        rate: getRandomInt(0, 5),
    };
    shows.push(show);
}
// Generate dummy data for Tickets
const tickets = [];
shows.forEach((show) => {
    for (let i = 1; i <= getRandomInt(3, MAX_TICKET_AMOUNT_PER_SHOW); i++) {
        const ticket = {
            // _id: parseInt(show._id + i.toString()),
            showId: show._id,
            buyerId: getRandomInt(4, 8),
            status: getRandomInt(1, 3),
            discountPrice: getRandomInt(5, 50), // Random discount price (5 to 50)
        };
        tickets.push(ticket);
        show.ticketIds.push(ticket._id);
    }
});
// Export the dummy data as an object
const fakeData = {
    users,
    shows,
    tickets,
};
export default fakeData;
