
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const CompletedAct = require('../models/CompletedAct');
const UserSubmittedAct = require('../models/userSubmittedAct');
const MainAct = require('../models/Act');

const submitAct = async (req, res) => {
 
    const completedTaskCount = await CompletedAct.countDocuments({ userId: req.user.userId, completed: true });

    if (completedTaskCount < 30) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: 'You must complete at least 30 tasks before submitting an act.' });
    }

    
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const submittedTaskCount = await UserSubmittedAct.countDocuments({
      userId: req.user.userId,
      status: 'approved',
      $expr: {
        $and: [
          { $eq: [{ $month: '$submittedAt' }, currentMonth] },
          { $eq: [{ $year: '$submittedAt' }, currentYear] },
        ],
      },
    });

    if (submittedTaskCount >= 2) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: 'You can only submit 2 tasks per month.' });
    }

    const { description, category, identifier } = req.body;

   
    const userSubmittedAct = await UserSubmittedAct.create({
      userId: req.user.userId,
      description,
      category,
      identifier,
    });

    res.status(StatusCodes.CREATED).json({ message: 'Act submitted successfully', userSubmittedAct });
  } 

const approveUserSubmittedAct = async (req, res) => {
 
    const { actId } = req.params;

    
    const userSubmittedAct = await UserSubmittedAct.findById(actId);

    if (!userSubmittedAct) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User-submitted act not found' });
    }

  
    if (userSubmittedAct.status !== 'pending') {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User-submitted act is already processed' });
    }


    userSubmittedAct.status = 'approved';
    await userSubmittedAct.save();

    const newMainAct = new MainAct({
      description: userSubmittedAct.description,
      category: userSubmittedAct.category,
      identifier: userSubmittedAct.identifier,
    });
    await newMainAct.save();

    res.status(StatusCodes.OK).json({ message: 'User-submitted act approved and added to main acts' });
  } 

const getAllUserSubmittedActs = async (req, res) => {
  
    const userSubmittedActs = await UserSubmittedAct.find();
    res.status(StatusCodes.OK).json({ userSubmittedActs });
  } 

module.exports = {
  submitAct,
  approveUserSubmittedAct,
  getAllUserSubmittedActs,
};
