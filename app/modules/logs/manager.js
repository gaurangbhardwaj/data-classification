const LogModel = require("../../models/log");
const { Types } = require("mongoose");
const moment = require("moment");
const { stringify } = require("flatted");

class Manager {
  addUserLog = async (userData) => {
    const logData = new LogModel(userData);
    return await logData.save();
  };

  getUserLogs = async (startDate, endDate) => {
    const aggregateQuery = [];
    if (startDate || endDate) {
      aggregateQuery.push({
        $match: {
          createdAt: {
            ...(startDate ? { $gte: moment(startDate).toDate() } : {}),
            ...(endDate ? { $lt: moment(endDate).toDate() } : {}),
          },
        },
      });
    }
    aggregateQuery.push(
      {
        $group: {
          _id: null,
          totalUsers: { $addToSet: "$userId" },
          totalData: { $sum: 1 },
          totalFailedData: {
            $sum: {
              $cond: { if: { $eq: ["$status", "FAILED"] }, then: 1, else: 0 },
            },
          },
          totalSuccessData: {
            $sum: {
              $cond: { if: { $eq: ["$status", "SUCCESS"] }, then: 1, else: 0 },
            },
          },
          logsList: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          totalUsers: { $size: "$totalUsers" },
          totalData: 1,
          totalFailedData: 1,
          totalSuccessData: 1,
          logsList: 1,
        },
      }
    );

    return await LogModel.aggregate(aggregateQuery);
  };
}

module.exports = Manager;
