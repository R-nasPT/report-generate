const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 4000;

const memberRouter = require("./routes/memberRouter");
const configRouter = require("./routes/configRouter");
const ticketRouter = require("./routes/ticketRouter");
const statusRouter = require("./routes/statusRouter")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/member", memberRouter);
app.use("/config", configRouter);
app.use("/ticket", ticketRouter);
app.use("/status", statusRouter);

app.get("/", (req, res) => {
  res.json({ message: "Wellcome" });
});

app.listen(port, () => {
  console.log(`Node App is running on port ${port}`);
});
