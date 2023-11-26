const APP = require("express");
const DBConnection = require("./config/dbConnection");
const Utils = require("./app/utils");
const routes = require("./routes");
const { httpConstants } = require("./app/common/constants");

const app = new APP();
require("./config/express")(app);
require("dotenv").config()

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
        routes(app);
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
