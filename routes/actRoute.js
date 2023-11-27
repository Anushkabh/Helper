const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');
const{
    getAct, 
    doneTask,
    getCategory


}= require('../controllers/ActController');

router.get('/', authenticateUser, getAct);
router.post('/done', authenticateUser, doneTask);
router.get('/:category', authenticateUser, getCategory);



module.exports = router;