import { stringConstants } from "../app/common/constants";
import LogsController from "../app/modules/logs/controller";


const logsController = new LogsController();

module.exports = (app) => {
  app.get("/", (_, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

  app.post("/add-log/:userId", logsController.addUserLog);

  app.get("/get-logs", logsController.getUserLogs);
};
