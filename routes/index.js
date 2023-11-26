const stringConstants = require("../app/common/constants").stringConstants;
const Controller = require("../app/modules/logs/controller");

module.exports = (app) => {
  app.get("/", (_, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

  app.post("/add-log", new Controller().addUserLog);

  app.get("/get-logs", new Controller().getUserLogs);
};
