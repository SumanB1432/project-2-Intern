const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    mobile: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    collegeId: {
        type: ObjectId,
        ref: "College",
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('intern', internSchema) 