const Course = require('../models/Course');
const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');

const createCourse = async (req, res, next) => {
    try {
        const { title, description, recipeIds, coverImageUrl } = req.body;
        const userId = req.user._id;

        const chef = await Chef.findOne({ userId });
        if (!chef) {
            res.status(403);
            throw new Error('Not authorized: Only registered chefs can create courses.');
        }

        if (recipeIds && recipeIds.length > 0) {
            const ownedRecipes = await Recipe.find({ _id: { $in: recipeIds }, user: userId });
            if (ownedRecipes.length !== recipeIds.length) {
                res.status(400);
                throw new Error('One or more selected recipes do not exist or do not belong to you.');
            }
        }

        const course = await Course.create({
            chefId: chef._id,
            title,
            description,
            recipeIds,
            coverImageUrl,
        });

        res.status(201).json({
            message: 'Course created successfully!',
            course,
        });
    } catch (error) {
        next(error);
    }
};

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({})
            .populate({
                path: 'chefId',
                select: 'userId specialty profilePictureUrl',
                populate: {
                    path: 'userId',
                    select: 'username'
                }
            })
            .populate('recipeIds', 'title description imageUrl');

        res.json(courses);
    } catch (error) {
        next(error);
    }
};

const getCourseById = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate({
                path: 'chefId',
                select: 'userId bio specialty profilePictureUrl',
                populate: {
                    path: 'userId',
                    select: 'username email'
                }
            })
            .populate('recipeIds');

        if (course) {
            res.json(course);
        } else {
            res.status(404);
            throw new Error('Course not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
};
