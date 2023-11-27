const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const CompletedAct = require('../models/CompletedAct');
const UserSubmittedAct = require('../models/userSubmittedAct');
const Act = require('../models/Act');
const User = require('../models/User');

const getProfile = async (req, res) => {
  
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      throw new CustomError.NotFoundError('User not found');
    }

    res.status(StatusCodes.OK).json({ user });
  } 

const getUserCompletedActs = async (req, res) => {
 
    const userId = req.user.userId;

    const completedActs = await CompletedAct.find({ userId }).populate('actId');
    res.status(StatusCodes.OK).json({ completedActs });
  } 

const getOverallStatistics = async (req, res) => {
 
    const totalCompletedActs = await CompletedAct.countDocuments();

    const categoryStatistics = await CompletedAct.aggregate([
      {
        $group: {
          _id: '$actId',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'acts',
          localField: '_id',
          foreignField: '_id',
          as: 'actDetails',
        },
      },
      {
        $unwind: '$actDetails',
      },
      {
        $project: {
          category: '$actDetails.category',
          count: 1,
        },
      },
    ]);

    res.status(StatusCodes.OK).json({
      totalCompletedActs,
      categoryStatistics,
    });
  } 

const getUserSubmittedActsStatus = async (req, res) => {

    const userId = req.user.userId;

    const userSubmittedActsStatus = await UserSubmittedAct.find({ userId }).select('identifier status');

    if (!userSubmittedActsStatus) {
      throw new CustomError.NotFoundError('User-submitted acts not found');
    }

    res.status(StatusCodes.OK).json({ userSubmittedActsStatus });
  } 

module.exports = {
  getProfile,
  getUserCompletedActs,
  getOverallStatistics,
  getUserSubmittedActsStatus,
};
