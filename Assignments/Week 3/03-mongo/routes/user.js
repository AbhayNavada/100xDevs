const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const user = await User.findOne({ username: req.body.username });

    if (user) {
        return res.status(400).json({
            message: "User account already exists"
        });
    }

    User.create({
        username: req.body.username,
        password: req.body.password
    });

    res.status(200).json({
        message: "User created successfully"
    });
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find().
        then(courses => res.json(courses));
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;

    const user = await User.findOne({
        username: req.headers.username
    });

    if (user.purchasedCourseIds.includes(courseId)) {
        return res.status(400).json({
            message: "Redundant request. You have already purchased the course."
        });
    }

    await User.findOneAndUpdate(
        { username: req.headers.username },
        { $push: { purchasedCourseIds: courseId } });

    // purchaseCourse(req);
    res.status(200).json({
        message: "Course purchased successfully"
    });
});
    

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    let purchasedCourses = [];

    for (courseId of user.purchasedCourseIds) {
        const course = await Course.findOne({id: courseId});
        purchasedCourses.push(course);
    }

    res.json({
        purchasedCourses: purchasedCourses
    });
});

module.exports = router;