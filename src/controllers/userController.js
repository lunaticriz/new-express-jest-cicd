const userService = require("../services/userService");

const getUsers = (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
};

const getUserById = (req, res, next) => {
  try {
    const user = userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const createUser = (req, res) => {
  const user = userService.createUser(req.body);
  res.status(201).json(user);
};

module.exports = { getUsers, getUserById, createUser };
