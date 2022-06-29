const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")

const createInterns = async function (req, res) {
    try {
        let data = req.body;

        if (!Object.keys(data).length) {
            return res.status(400).send({ status: false, message: "You must enter data" })
        }
        if (!data.name) return res.status(400).send({ status: false, message: "You must enter name" })
        if (!data.name.trim().match(/^[a-zA-Z,\s]*$/)) {
            return res.status(400).send({ status: false, msg: "Enter a valid name." })
        }
        if (!data.email) return res.status(400).send({ status: false, message: "You must give emailId" })
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email.trim()))) {
            return res.status(400).send({ status: false, msg: "Enter a valid email address." })
        }
        let isRegisteredEmail = await intern.find({ email: data.email });
        if (isRegisteredEmail.length) return res.status(400).send({ status: false, message: "email id already registered" });
        if (!data.mobile) return res.status(400).send({ status: false, message: "You must give mobile number" })
        if (!data.mobile.trim().match()) {
            return res.status(400).send({ status: false, msg: "Enter a valid mobile number" })
        }
        let isRegisteredMobile = await intern.find({ mobile: data.mobile });
        if (isRegisteredMobile.length) return res.status(400).send({ status: false, msg: "mobile number already registered" });

        if (!data.collegeName) return res.status(400).send({ status: false, message: "You must give college name" })
        if (!data.collegeName.trim().match(/^[a-zA-Z]+$/)) {
            return res.status(400).send({ status: false, msg: "Enter a valid college name." })
        }
        let checkCollegeName = await college.findOne({ name: data.collegeName })
        if (!checkCollegeName) return res.status(400).send({ status: false, message: " college is not registered." })

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }
}
