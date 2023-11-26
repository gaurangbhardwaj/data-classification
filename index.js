const express = require("express");
const DBConnection = require("./config/dbConnection");
const Utils = require("./app/utils");
const { httpConstants, stringConstants } = require("./app/common/constants");
const Controller = require("./app/modules/logs/controller")

const app = express();
require("./config/express")(app);
require("dotenv").config()

app.get("/", (_, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

app.post("/add-log", new Controller().addUserLog);

app.get("/get-logs", new Controller().getUserLogs);

class Server {
  static listen() {
    Promise.all([DBConnection.connect()])
      .then(() => {
        app.listen(process.env.PORT);
        Utils.logger(
          "listen",
          `Server Started on port ${process.env.PORT}`,
          {},
          "Gaurang",
          httpConstants.LOG_LEVEL_TYPE.INFO
        );
      })
      .catch((error) =>
        Utils.logger(
          "listen",
          "failed to connect",
          { err: error },
          "Gaurang",
          httpConstants.LOG_LEVEL_TYPE.ERROR
        )
      );
  }
}

Server.listen();
