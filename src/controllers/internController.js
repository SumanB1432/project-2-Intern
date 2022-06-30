const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === Number && value.trim().length === 0) return false
    return true
}

const createInterns = async function (req, res) {
    try {
        let data = req.body;

        if (!Object.keys(data).length) {
            return res.status(400).send({ status: false, message: "You must enter data" })
        }
        if (!data.name) return res.status(400).send({ status: false, message: "You must enter name" })

        if (!isValid(data.name)) {
            return res.status(400).send({ status: false, msg: "Name should not be empty" })
        }

        if (typeof (data.name) != "string") {
            return res.status(400).send({ status: false, msg: "Name should be string" })
        }

        if (!data.name.trim().match(/^[a-zA-Z,\s]*$/)) {
            return res.status(400).send({ status: false, msg: "Enter a valid name." })
        }
        if (!data.email) return res.status(400).send({ status: false, message: "You must give emailId" })

        if (!isValid(data.email)) {
            return res.status(400).send({ status: false, msg: "email should not be empty" })
        }

        if (typeof (data.email) != "string") {
            return res.status(400).send({ status: false, msg: "email should be string" })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email.trim()))) {
            return res.status(400).send({ status: false, msg: "Enter a valid email address." })
        }
        let isRegisteredEmail = await internModel.find({ email: data.email });
        if (isRegisteredEmail.length) return res.status(400).send({ status: false, message: "email id already registered" });

        if (!data.mobile) return res.status(400).send({ status: false, message: "You must give mobile number" })

        if (!isValid(data.mobile)) {
            return res.status(400).send({ status: false, msg: "Mobile number should not be empty" })

        }

        if (typeof (data.mobile) != "string") {
            return res.status(400).send({ status: false, msg: "mobile should be string" })
        }

        if (!data.mobile.trim().match(/^[6-9]\d{9}$/)) {
            return res.status(400).send({ status: false, msg: "Enter a valid mobile number" })
        }
        let isRegisteredMobile = await internModel.find({ mobile: data.mobile });
        if (isRegisteredMobile.length) return res.status(400).send({ status: false, msg: "mobile number already registered" });

        if (!data.collegeName) return res.status(400).send({ status: false, message: "You must give college name" })

        if (!isValid(data.collegeName)) {
            return res.status(400).send({ status: false, msg: "college name should not be empty" })
        }

        if (typeof (data.collegeName) != "string") {
            return res.status(400).send({ status: false, msg: "CollegeNmae should be string" })
        }

        if (!data.collegeName.trim().match(/^[a-zA-Z]+$/)) {
            return res.status(400).send({ status: false, msg: "Enter a valid college name." })
        }
        let checkCollegeName = await collegeModel.findOne({ name: data.collegeName })
        if (!checkCollegeName) return res.status(400).send({ status: false, message: " college is not registered." })

        data.collegeId = checkCollegeName._id
        let created = await internModel.create(data)
        res.status(201).send({ status: true, data: created })

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }
}
module.exports.createInterns = createInterns