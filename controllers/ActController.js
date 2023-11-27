
const Act = require('../models/Act');
const CompletedAct = require('../models/CompletedAct');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, CustomAPIError } = require('../errors');

const getAct = async (req, res) => {

    const randomAct = await Act.aggregate([{ $sample: { size: 1 } }]);

    if (randomAct.length === 0) {
      throw new NotFoundError('No acts found');
    }

    res.status(StatusCodes.OK).json(randomAct[0]);
  } 


const doneTask = async (req, res) => {
 
    const { actId } = req.body;


    const actExists = await Act.exists({ identifier: actId });

    if (!actExists) {
      throw new NotFoundError('Act not found');
    }

    const completedAct = await CompletedAct.findOne({ userId: req.user.userId, actId });

    if (completedAct) {
      throw new CustomAPIError(StatusCodes.BAD_REQUEST, 'Act already completed');
    }


    await CompletedAct.create({ userId: req.user.userId, actId, completed: true });

    res.status(StatusCodes.OK).json({ message: 'Act marked as completed' });
  } 


const getCategory = async (req, res) => {
  
    const { category } = req.params;

    const actsInCategory = await Act.aggregate([
      { $match: { category: category.toLowerCase() } },
      { $sample: { size: 1 } },
    ]);

    if (actsInCategory.length === 0) {
      throw new NotFoundError('No acts found in the specified category');
    }

    res.status(StatusCodes.OK).json(actsInCategory[0]);
  } 
module.exports = {
    getAct,
    doneTask,
    getCategory
}
