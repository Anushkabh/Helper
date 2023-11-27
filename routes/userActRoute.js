const express = require('express');
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

const{
    
    submitAct,
    approveUserSubmittedAct,
    getAllUserSubmittedActs

} = require('../controllers/userActcontroller');

router.post('/', authenticateUser, submitAct);
router.get('/', authenticateUser, authorizePermissions('admin'), getAllUserSubmittedActs);
router.put('/:actId/approve', authenticateUser, authorizePermissions('admin'), approveUserSubmittedAct);


module.exports = router;
