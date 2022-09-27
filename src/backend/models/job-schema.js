const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

const connection = mongoose.createConnection("mongodb://localhost/job", {
  useMongoClient: true,
});
autoIncrement.initialize(connection);

const JobSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    job_detail_1: {
      type: String,
      required: true,
    },
    job_detail_2: {
      type: String,
    },
    staff_req: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    department_req: {
      type: String,
      required: true,
    },
    attachment: {
      type: Buffer,
    },
    ref_loss_no: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    share_cost: {
      type: Number,
      required: true,
    },
    approved_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    control_by: {
      type: String,
    },
    customize_cost: {
      type: Number,
    },
    customize_cost: {
      type: String,
    },
    resposible_staff: {
      type: Number,
    },
    est_finish_date: {
      type: Date,
      default: new Date(),
    },
    act_finish_date: {
      type: Date,
      default: new Date(),
    },
    status: {
      type: String,
    },
    progress: {
      type: String,
    },
    delay_reason: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "job",
  }
);

JobSchema.plugin(autoIncrement.plugin, { model: "Job", field: "job_no", startAt: 1 });
// const Job = connection.model("Job", JobSchema)
module.exports = mongoose.model("Job", JobSchema);
