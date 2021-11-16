import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@xyz.com",
    password: bcrypt.hashSync("user1234", 10),
    isAdmin: true,
  },
  {
    name: "Rakesh Bijarniya",
    email: "rakesh@xyz.com",
    password: bcrypt.hashSync("user1234", 10),
  },
  {
    name: "Vikas Tomar",
    email: "vikas@xyz.com",
    password: bcrypt.hashSync("user1234", 10),
  },
];

export default users;
