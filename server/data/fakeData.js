// this code was generated with chatGPT
// my main goal was to generate json object....
import { faker } from '@faker-js/faker';

const AMOUNT_OF_USERS = 10;
const AMOUNT_OF_ROLES = 3;
const AMOUNT_OF_LOCATIONS = 5;
const AMOUNT_OF_CATEGORY = 4;

const SHOWS_AMOUNT = 9;
const MAX_TICKET_AMOUNT_PER_SHOW = 8;

///// ^^^ my code ^^^ ////

// Generate random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random string
function getRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Generate dummy data for Users
const users = [];
for (let i = 1; i <= AMOUNT_OF_USERS; i++) {
  const user = {
    _id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`,
    password: `password${i}`,
    role: getRandomInt(1, AMOUNT_OF_ROLES), // Assuming 8 roles available
  };
  users.push(user);
}

// Generate dummy data for Shows
const shows = [];
for (let i = 1; i <= SHOWS_AMOUNT; i++) {
  const show = {
    _id: i.toString(),
    categoryId: getRandomInt(1, AMOUNT_OF_CATEGORY), // Assuming 4 categories available
    ticketIds: [],
    sellerId: getRandomInt(1, 3), // Assuming 8 sellers available
    // TODO tompo: add id by user role (if user.role == role.id)
    name: faker.company.name(),
    price: getRandomInt(10, 100), // Random price (10 to 100)
    location: getRandomInt(1, AMOUNT_OF_LOCATIONS), // Assuming 5 locations available
    address: `Address ${i} ${getRandomString(10)}`,
    image: `/images/ticket_${i}.jpg`,
    date: new Date().toISOString().split("T")[0], // Today's date
    time: `${getRandomInt(0, 23)}:00`, // Random hour (00:00 to 23:00)
    minutesBeforePurchase: getRandomInt(1, 60), // Random minutes (1 to 60)
    description: `${faker.commerce.productDescription()}`,
    duration: getRandomInt(60, 180), // Random duration in minutes (60 to 180)
    cast: [`Amos Tamam`, ` Rebeka Michali`], // Assuming 2 actors for each show
    rate: getRandomInt(0, 5),
  };
  shows.push(show);
}

// Generate dummy data for Tickets
const tickets = [];
shows.forEach((show) => {
  for (let i = 1; i <= getRandomInt(3, MAX_TICKET_AMOUNT_PER_SHOW); i++) {
    const ticket = {
      _id: parseInt(show._id + i.toString()),
      showId: show._id, // Assuming 8 shows available
      buyerId: getRandomInt(4, 8), // Assuming 8 buyers available
      status: getRandomInt(1, 3), // Assuming 3 status options available
      discountPrice: getRandomInt(5, 50), // Random discount price (5 to 50)
    };
    tickets.push(ticket);
    show.ticketIds.push(ticket._id);
  }
});

// Generate dummy data for Categories
const categories = [];
for (let i = 1; i <= AMOUNT_OF_CATEGORY; i++) {
  const category = {
    _id: i,
    name: `Category ${i}`,
  };
  categories.push(category);
}

// Generate dummy data for Locations
const locations = [];
for (let i = 1; i <= AMOUNT_OF_LOCATIONS; i++) {
  const location = {
    _id: i,
    name: `Location ${i}`,
  };
  locations.push(location);
}

// Generate dummy data for Roles
const roles = [];
for (let i = 1; i <= AMOUNT_OF_ROLES; i++) {
  const role = {
    _id: i,
    name: `Role ${i}`,
  };
  roles.push(role);
}

// Export the dummy data as an object
const fakeData = {
  users,
  shows,
  tickets,
  categories,
  locations,
  roles,
};

export default fakeData;
