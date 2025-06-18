const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/protect');
const { registerChef, getChefProfile } = require('../controllers/chef.controller');


router.post('/register', protect, registerChef);
router.get('/:userId', getChefProfile);

module.exports = router;
