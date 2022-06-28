const collegeModel = require("../models/collegeModel")

const createCollege = async function (req, res) {
    try {
        let data = req.body;

        if (!Object.keys(data).length) {
            return res.status(400).send({ status: false, message: "You must enter data" })
        }
        if (!data.name) return res.status(400).send({ status: false, message: "You must enter name" })

        if (!data.name.trim().match(/^[a-zA-Z]+$/)) {
            return res.status(400).send({ status: false, msg: "Enter a valid name." })
        }

        let checkName = await collegeModel.findOne({ name: data.name })
        if (checkName) { return res.status(400).send({ status: false, message: "This college is already registered" }) }

        if (!data.fullName) return res.status(400).send({ status: false, message: "You must enter full name" })

        if (!data.fullName.trim().match(/^[a-zA-Z,\-.\s]*$/)) {
            return res.status(400).send({ status: false, msg: "Enter a valid full name." })
        }

        if (!data.logoLink) return res.status(400).send({ status: false, message: "You must enter logoLink" })
        if (!data.logoLink.trim().match(/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)$/))
            return res.status(400).send({ status: false, msg: "Enter a valid logo link" })

        let created = await collegeModel.create(data)
        res.status(201).send({ status: true, data: created })


    }
    catch(err){
        return res.status(500).send({status:false, mag:err.message})

    }
}

module.exports.createCollege = createCollege
