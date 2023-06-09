const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {
  return pool.query(`SELECT * FROM users
 WHERE users.email = $1`, [email])
    .then((res) => {
      console.log('email - res.rows: ', res.rows[0]);
      return res.rows[0];
    }).catch((error) => {
      console.log(error.message);
      return null;
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function(id) {
  return pool.query(`SELECT * FROM users
  WHERE users.id = $1`, [id])
    .then((res) => {
      console.log('id res.rows: ', res.rows);
      return res.rows[0];
    }).catch((error) => {
      console.log(error.message);
      return null;
    });
};
/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */


const addUser = function(user) {
  console.log('user: ', user);
  return pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [user.name, user.email, user.password])
    .then((res) => {
      console.log('user added to databse', res.rows[0]);
      return res.rows[0];
    }).catch((error) => {
      console.log(error);
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT *
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
    `, [guest_id, limit])
    .then((res) => {
      console.log('here is the reservations: ', res.rows);
      return res.rows;
    }).catch((error) => {
      console.log('there was an error: ', error);
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */


const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
  `;

  const city = options.city
  const owner = options.owner
  const minRating = options.rating
  const minPrice = options.minimum_price_per_night
  const maxPrice = options.maximum_price_per_night
  // 3
  if (city) {
    queryParams.push(`%${city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (owner) {
    queryParams.push(owner);
    queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'} owner_id = $${queryParams.length} `;
  }

  if (minRating) {
    queryParams.push(minRating);
    queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'} AVG(property_reviews.rating) >= $${queryParams.length} `;
  }

  //* by 100 as $ number in database is in cents
  if (minPrice && maxPrice) {
    queryParams.push(minPrice * 100);
    queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'} cost_per_night >= $${queryParams.length} `;
    queryParams.push(maxPrice * 100);
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }
  // 4
  queryParams.push(limit);
  queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

const addProperty = function(property) {
  console.log('property: ', property);
  //console.log('length = ', Object.keys(property).length)
  return pool.query(`INSERT INTO properties (
    title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`, [property.title, property.description, property.owner_id, property.cover_photo_url, property.thumbnail_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.province, property.city, property.country, property.street, property.post_code])
    .then((res) => {
      console.log('user added to databse', res.rows[0]);
      return res.rows[0];
    }).catch((error) => {
      console.log('There was an error: ', error);
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};

//testing purpose - think about using arrays to math (Object.keys - Object.values - destructure?)
// const addProperty = function(property) {
//   console.log('property: ', property);
//   console.log('length = ', Object.keys(property).length)
//   return pool.query(`INSERT INTO properties (
//     title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`, [property.title, property.descrtption, property.owner_id, property.cover_photo_url, property.thumbnail_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.active, property.province, property.city, property.country, property.street, property.post_code ])
//     .then((res) => {
//       console.log('user added to databse', res.rows[0]);
//       return res.rows[0];
//     }).catch((error) => {
//       console.log('There was an error: ', error);
//     });
// };