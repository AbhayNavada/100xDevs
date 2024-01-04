const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router = Router();


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const admin = await Admin.findOne({username: req.body.username});
    
    if (admin) {
        return res.status(400).json({
            message: "Admin account already exists"
        });
    }
    
    Admin.create({
        username: req.body.username,
        password: req.body.password
    });

    res.json({
        message: "Admin created successfully"
    });
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const courseId = Math.floor(Math.random() * 10000); // Temporary hack only for practice, course Ids should be stored in the database and be unique.

    Course.create({
        id: courseId,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink
    });

    res.json({
        message: "Course created successfully",
        courseId: courseId
    });
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find().
        then(courses => res.json(courses));
});

module.exports = router;