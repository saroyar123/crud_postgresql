const pool = require("./pgConnect");
const jwt = require("jsonwebtoken");


// controller for get all user

const getUsers = (request, response) => {
  try {
    pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
      if (error) {
        return response.status(400).json({
          success: false,
          message: error.message,
        });
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// controller for get rhe user by id

const getUserById = (request, response) => {
  try {
    const id = parseInt(request.params.id);

    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        return response.status(400).json({
          success: false,
          message: error.message,
        });
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// controller for create new user
const createUser = (request, response) => {
  try {
    const { name, email } = request.body;

    pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2)",
      [name, email],
      (error, results) => {
        if (error) {
          return response.status(400).json({
            success: false,
            message: error.message,
          });
        }

        const token = jwt.sign({ email: email }, process.env.key);

        console.log(token);
        response.cookie("token", token).status(201).send("user created");
      }
    );
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// controller for update user

const updateUser = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, id],
      (error, results) => {
        if (error) {
          return response.status(400).json({
            success: false,
            message: error.message,
          });
        }
        response.status(200).send(`User modified with ID: ${id}`);
      }
    );
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// controller for delete one user

const deleteUser = (request, response) => {
  try {
    const id = parseInt(request.params.id);

    pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        return response.status(400).json({
          success: false,
          message: error.message,
        });
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
