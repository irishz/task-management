let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
let port = process.env.PORT;
const db = process.env.DATABASE
const userRoute = require("./route/user.routes");
const jobRoute = require("./route/job.route");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://127.0.0.1:27017/job?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected sucessfully !");
    },
    (error) => {
      console.log("Database could not be connected : " + error);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/users", userRoute);
app.use("/job", jobRoute);

app.listen(port, "0.0.0.0", () => {
  console.log("Connected to port " + port);
});

// Error Handling
app.use((req, res, next) => {
  next(console.error(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
