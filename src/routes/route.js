const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")



router.post("/functionup/colleges",collegeController.createCollege)

router.get("/functionup/collegeDetails", collegeController.getCollege);




module.exports = router;