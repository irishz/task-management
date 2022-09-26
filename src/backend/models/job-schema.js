const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JobSchema = new Schema(
    {
        job_no: {
            type: String,
            required: true,
            unique: true,
        },
        job: {
            type: String,
            required: true
        },
        job_detial_1: {
            type: String,
        },
        job_detial_2: {
            type: String,
        },
        staff_req: {
            type: String,
        },
        department_req: {
            type: String,
        },
        attachment: {
            type: FileList
        }
    },
    {
        timestamps: true,
        collection: 'job'
    }
)

module.exports = mongoose.model("Job", JobSchema);