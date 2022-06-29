const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")



router.post("/functionup/colleges",collegeController.createCollege)

router.post("/functionup/interns",internController.createInterns)

router.get("/functionup/collegeDetails", collegeController.getcollege);




module.exports = router;