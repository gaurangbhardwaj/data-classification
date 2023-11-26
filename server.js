import APP from "express";
import DBConnection from "./config/dbConnection";
import Utils from "./app/utils";
import routes from "./routes";
import { httpConstants } from "./app/common/constants";

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
