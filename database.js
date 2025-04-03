import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root", // Replace with your MySQL username
  password: "root", // Replace with your MySQL password
  database: "my_practice",
});

export default sequelize;