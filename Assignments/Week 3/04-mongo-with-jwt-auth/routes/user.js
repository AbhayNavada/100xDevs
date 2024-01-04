const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");

const jwt = require('jsonwebtoken');
const jwtPassword = "123456";  

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

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({ username: req.body.username }, jwtPassword);
        res.status(200).json({
            token: token
        });
    } else {
        res.status(400).json({
            message: "Invalid username or password"
        });
    }
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find().
        then(courses => res.json(courses));
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const token = req.headers.authorization.split(' ')[1];
    const username = jwt.decode(token).username;
    
    const user = await User.findOne({
        username: username
    });

    if (user.purchasedCourseIds.includes(courseId)) {
        return res.status(400).json({
            message: "Redundant request. You have already purchased the course."
        });
    }

    await User.findOneAndUpdate(
        { username: username },
        { $push: { purchasedCourseIds: courseId } });

    // purchaseCourse(req);
    res.status(200).json({
        message: "Course purchased successfully"
    });
});
    

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const token = req.headers.authorization.split(' ')[1];
    const username = jwt.decode(token, jwtPassword).username;

    const user = await User.findOne({
        username: username
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