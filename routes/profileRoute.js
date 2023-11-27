const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const{
    getProfile,
    getUserCompletedActs,
    getOverallStatistics,
    getUserSubmittedActsStatus
    

} = require('../controllers/ProfileController');

router.get('/', authenticateUser, getProfile);
router.get('/completed', authenticateUser, getUserCompletedActs);
router.get('/statistics', authenticateUser, getOverallStatistics);
router.get('/submitted', authenticateUser, getUserSubmittedActsStatus);

module.exports = router;

