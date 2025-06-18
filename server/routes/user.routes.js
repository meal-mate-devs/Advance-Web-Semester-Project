const express = require('express');
const { protect } = require('../middlewares/protect');
const { getUserProfile } = require('../controllers/user.controller');
const router = express.Router();


router.get("/", protect, getUserProfile);

module.exports = router;