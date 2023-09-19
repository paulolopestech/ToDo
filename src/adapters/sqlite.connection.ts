import { Sequelize } from "sequelize";

const sqliteConnection: Sequelize = new Sequelize("database-name", "database-user", "database-password", {
    dialect: "sqlite",
    storage: "db.sqlite"
});

sqliteConnection.authenticate();

export default sqliteConnection;