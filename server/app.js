const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const routes = require("./routes");
const initDatabase = require("./startUp/initDatabase");

const app = express();

mongoose.set('strictQuery', false);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

const PORT = config.get("port") ?? 8080;

if (process.env.NODE_ENV === "production") {
    console.log(chalk.bgCyanBright("Production"));
} else {
    console.log(chalk.bgCyanBright("Development"));
}

async function start() {
    try {
        mongoose.connection.once("open", () => {
            initDatabase();
        });
        await mongoose.connect(config.get("mongoUri"));
        console.log(chalk.bgGreen("MongoDB connected."));
        app.listen(PORT, () => {
            console.log(
                chalk.bgGreen(`Server has been started on port ${PORT}...`)
            );
        });
    } catch (error) {
        console.log(chalk.bgRed(error.message));
        process.exit(1);
    }
}

start();
