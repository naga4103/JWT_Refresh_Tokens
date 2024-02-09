const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./.env" });
const userRouter = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.set("strictQuery", true);
mongoose.connect(DB).then((con) => {
  //   console.log(con.connections);
  console.log("DB Connection successful!!");
});
app.post("/getData", (req, res) => {
  console.log("Hii");
  res.status(200).json({
    status: "success",
    data: "HiiHello",
  });
});
app.use("/api/v1/users", userRouter);
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
