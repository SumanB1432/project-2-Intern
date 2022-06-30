const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === Number && value.trim().length === 0) return false
    return true
}

const createCollege = async function (req, res) {
    try {
        let data = req.body;

        if (!Object.keys(data).length) {
            return res.status(400).send({ status: false, message: "You must enter data" })
        }
        if (!data.name) return res.status(400).send({ status: false, message: "You must enter name" })

        if (!isValid(data.name)) {
            return res.status(400).send({ status: false, msg: "Please Enter college Name" })
        }

        if (!data.name.trim().match(/^[a-zA-Z]+$/)) {
            return res.status(400).send({ status: false, msg: "Enter a valid name." })
        }

        let checkName = await collegeModel.findOne({ name: data.name })
        if (checkName) { return res.status(400).send({ status: false, message: "This college is already registered" }) }

        if (!data.fullName) return res.status(400).send({ status: false, message: "You must enter full name" })

        if (!isValid(data.fullName)) {
            return res.status(400).send({ status: false, msg: "Please Enter college fullName " })
        }

        if (!data.fullName.trim().match(/^[a-zA-Z,\-.\s]*$/)) {
            return res.status(400).send({ status: false, msg: "Enter a valid full name." })
        }

        if (!data.logoLink) return res.status(400).send({ status: false, message: "You must enter logoLink" })

        if (!isValid(data.logoLink)) {
            return res.status(400).send({ status: false, msg: "Please Enter logo Link" })
        }

        if (!data.logoLink.trim().match(/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)$/))
            return res.status(400).send({ status: false, msg: "Enter a valid logo link" })

        let created = await collegeModel.create(data)
        res.status(201).send({ status: true, data: created })


    }
    catch (err) {
        return res.status(500).send({ status: false, mag: err.message })

    }
}


const getcollege = async function (req, res) {

    try {

        const collegeName = req.query.collegeName
        console.log(typeof (collegeName))

        if (!collegeName) { return res.status(400).send({ msg: "plzz provide collegeName" }) }

        if (!collegeName.trim().match(/^[a-zA-Z]+$/)) {
            return res.status(400).send({ status: false, msg: "Enter a valid college name." })
        }



        const details = await internModel.find().populate("collegeId")
        console.log("PRINT", details)

        const allinterns = details.map(x => { if (x.collegeId.name == collegeName.toLowerCase()) { return x } })
        if (!allinterns[0]) { return res.status(404).send({ status: true, msg: "no data found" }) }
        console.log("kuchbhi", allinterns)



        interns = []
        for (i = 0; i < allinterns.length; i++) {

            a = {
                _id: allinterns[i]._id,
                name: allinterns[i].name,
                email: allinterns[i].email,
                mobile: allinterns[i].mobile
            }

            interns.push(a)


            console.log(interns)

            let dataToFetch = {
                name: allinterns[0].collegeId.name,
                fullName: allinterns[0].collegeId.fullName,
                logoLink: allinterns[0].collegeId.logoLink,
                interns: interns

            }
            console.log(dataToFetch)


            return res.status(200).send({ status: true, msg: dataToFetch })


        }

    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }

}




module.exports.createCollege = createCollege;
module.exports.getcollege = getcollege;
