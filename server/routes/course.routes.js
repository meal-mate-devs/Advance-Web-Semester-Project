const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses, getCourseById } = require('../controllers/course.controller');
const { protect } = require('../middlewares/protect');


router.route('/').post(protect, createCourse).get(getAllCourses);
router.route('/:id').get(getCourseById);

module.exports = router;
