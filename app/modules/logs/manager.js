import LogModel from "../../models/log";
import { Types } from "mongoose";
import moment from "moment";
import { stringify } from "flatted";

export default class Manager {
  addUserLog = async (req) => {
    const logData = new LogModel({
      userId: req.params.userId,
      req: stringify(req),
      status: "SUCCESS",
    });
    const userLog = await logData.save();
    return await updateUserLogRes(userLog);
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
          logsList: { $push: "$$ROOT" }
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

const updateUserLogRes = async (userLog) => {
  return await LogModel.findOneAndUpdate(
    { _id: new Types.ObjectId(userLog._id) },
    {
      $set: {
        res: JSON.stringify(userLog),
      },
    },
    { new: true }
  );
};
