const Utils = require("../../utils");
const {
  httpConstants,
  apiSuccessMessage,
  apiFailureMessage,
} = require("../../common/constants");
const LogManager = require("./manager");

class Controller {
  /**
   * Add User log
   * @param {*} req
   * @param {*} res
   * @returns {Promise<void>}
   */
  addUserLog = async (req, res) => {
    if (!req.body || !req.body.userId)
      return Utils.response(
        res,
        {},
        apiFailureMessage.INVALID_REQUEST,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.BAD_REQUEST
      );
    try {
      const response = await new LogManager().addUserLog(req.body);
      if (!response)
        return Utils.response(
          res,
          {},
          apiFailureMessage.LOG_ADDED,
          httpConstants.RESPONSE_STATUS.FAILURE,
          httpConstants.RESPONSE_CODES.SERVER_ERROR
        );
      return res.send("hello world");
    } catch (err) {
      Utils.response(
        res,
        {},
        err.message ? err.message : apiFailureMessage.LOG_ADDED,
        httpConstants.RESPONSE_STATUS.FAILURE,
        err.code ? err.code : httpConstants.RESPONSE_CODES.SERVER_ERROR
      );
    }
  };

  /**
   * Get User logs
   * @param {*} req
   * @param {*} res
   * @returns {Promise<void>}
   */
  getUserLogs = async (req, res) => {
    try {
      const response = await new LogManager().getUserLogs(
        req.query.startDate,
        req.query.endDate
      );
      if (!response)
        return Utils.response(
          res,
          {},
          apiFailureMessage.GET_LOGS,
          httpConstants.RESPONSE_STATUS.FAILURE,
          httpConstants.RESPONSE_CODES.SERVER_ERROR
        );
      Utils.response(
        res,
        response,
        apiSuccessMessage.GET_LOGS,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (err) {
      Utils.response(
        res,
        {},
        err.message ? err.message : apiFailureMessage.GET_LOGS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        err.code ? err.code : httpConstants.RESPONSE_CODES.SERVER_ERROR
      );
    }
  };
}

module.exports = Controller;
