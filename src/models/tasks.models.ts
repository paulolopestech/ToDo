import { DataTypes } from "sequelize";
import databaseConnection from "../adapters/sqlite.connection";

const database = databaseConnection;

export const Tasks = database.define("tasks", {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT("long"),
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    targetDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})