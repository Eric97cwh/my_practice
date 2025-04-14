import { Model, DataTypes } from "sequelize";
import sequelize from "../../database.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role_type: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "u",
      validate: {
        isIn: [["u", "a"]],
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      get() {
        return this.getDataValue("created_at")
          ? this.getDataValue("created_at")
              .toISOString()
              .replace(/T/, " ")
              .replace(/\..+/, "")
          : null;
      },
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      get() {
        return this.getDataValue("updated_at")
          ? this.getDataValue("updated_at")
              .toISOString()
              .replace(/T/, " ")
              .replace(/\..+/, "")
          : null;
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default User;