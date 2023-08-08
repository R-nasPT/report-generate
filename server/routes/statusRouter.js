const express = require("express");
const statusRouter = express.Router();

const PlugAtm = require("../models/configinfo/plugAtm");
const PlugRouter = require("../models/configinfo/plugRouter");
const PointRouter = require("../models/configinfo/pointRouter");
const UPS = require("../models/configinfo/upsBank");

statusRouter.get("/", async (req, res) => {
  try {
    const plugAtm = await PlugAtm.findAll();
    const plugRouter = await PlugRouter.findAll();
    const pointRouter = await PointRouter.findAll();
    const upsBank = await UPS.findAll();

    return res.json({ plugAtm, plugRouter, pointRouter, upsBank });
  } catch (error) {
    console.log(error);
  }
});

module.exports = statusRouter;
