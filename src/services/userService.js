let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const getAllUsers = () => users;

const getUserById = (id) => {
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) throw new Error("User not found");
  return user;
};

const createUser = (data) => {
  const newUser = { id: users.length + 1, ...data };
  users.push(newUser);
  return newUser;
};

module.exports = { getAllUsers, getUserById, createUser };
