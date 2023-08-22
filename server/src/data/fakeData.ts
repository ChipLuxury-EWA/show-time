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
  return ["ADMIN", "SHOW_ORGANIZER", "BUYER"][getRandomInt(0, 2)];
}

function getRandomLocation() {
  return ["south", "north", "center"][getRandomInt(0, 2)];
}

// Generate random string
function getRandomString(length: number) {
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
    role: "ADMIN",
  },
  {
    name: `showOrganizer User`,
    email: `showOrganizer@example.com`,
    password: bcrypt.hashSync("123456", 10),
    role: "SHOW_ORGANIZER",
  },
  {
    name: `buyer User`,
    email: `buyer@example.com`,
    password: bcrypt.hashSync("123456", 10),
    role: "BUYER",
  },
];
for (let i = 1; i <= AMOUNT_OF_USERS; i++) {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync("123456", 10),
    role: getRandomRole(),
  };
  users.push(user);
}

// Generate dummy data for Shows
const shows = [];
for (let i = 1; i <= SHOWS_AMOUNT; i++) {
  const show = {
    categoryId: getRandomInt(1, AMOUNT_OF_CATEGORY), // Assuming 4 categories available
    ticketsData: [],
    sellerId: getRandomInt(1, 3),
    // TODO tompo: add id by user role (if user.role == role.id)
    name: faker.company.name(),
    price: getRandomInt(10, 100), // Random price (10 to 100)
    location: getRandomLocation(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    image: `/images/ticket_${i}.jpg`,
    date: new Date().toISOString().split("T")[0], // Today's date
    time: new Date(),
    minutesBeforePurchase: getRandomInt(1, 60), // Random minutes (1 to 60)
    description: `${faker.commerce.productDescription()}`,
    duration: getRandomInt(60, 180), // Random duration in minutes (60 to 180)
    cast: [`Amos Tamam`, ` Rebeka Michali`], // Assuming 2 actors for each show
    rate: getRandomInt(0, 5),
  };
  shows.push(show);
}

// Generate dummy data for Tickets
const tickets: any = [];
shows.forEach((show) => {
  for (let i = 1; i <= getRandomInt(3, MAX_TICKET_AMOUNT_PER_SHOW); i++) {
    const ticket = {
      showId: "", // Assuming 8 shows available
      // buyerId: getRandomInt(4, 8), // Assuming 8 buyers available
      // status: getRandomInt(1, 3), // Assuming 3 status options available
      discountPrice: getRandomInt(5, 50), // Random discount price (5 to 50)
    };
    tickets.push(ticket);
    show.ticketsData.push(ticket);
  }
});

// Export the dummy data as an object
const fakeData = {
  users,
  shows,
  tickets,
};

export default fakeData;
