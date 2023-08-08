const express = require("express");
const ticketRouter = express.Router();

const multer = require("multer"); //
const fs = require("fs"); //
const rp = require("request-promise");
const userImageDir = `C:/Users/Yotsatorn_p/Documents/reportgenerator/server/Files/Temp_User_Profiles/`; //

const TicketGenerate = require("../models/configinfo/ticketGenerate");
const File = require("../models/configinfo/file");
const TicketDetail = require("../models/configinfo/ticketDetail");
const Configuration = require("../models/configinfo/configuration");
const Customers = require("../models/configinfo/customer");

//---GET One---
ticketRouter.get("/:id", async (req, res) => {
  try {
    const result = await TicketGenerate.findOne({
      include: [
        {
          model: Configuration,
          include: File,
        },
        {
          model: Customers,
        },
        {
          model: File,
        },
      ],

      where: {
        ticket_generate_id: req.params.id,
      },
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
});

//--GET All--
ticketRouter.get("/", async (req, res) => {
  try {
    const result = await TicketGenerate.findAll({
      include: [
        {
          model: Configuration,
          include: File,
        },
        {
          model: Customers,
        },
        {
          model: File,
        },
      ],
      order: [["onsite_date", "DESC"]],
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
});

//--Update T --
ticketRouter.put("/:id", async (req, res) => {
  try {
    const updateTicket = await TicketGenerate.findByPk(req.params.id);
    updateTicket.ticket_bank = req.body.ticket_bank;
    updateTicket.plug_atm = req.body.plug_atm;
    updateTicket.plug_router = req.body.plug_router;
    updateTicket.ups_bank = req.body.ups_bank;
    updateTicket.point_router = req.body.point_router;
    updateTicket.remark = req.body.remark;
    updateTicket.save();

    return res.json({ message: "Ticket updated successfully", updateTicket });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//-------------Upload Picture------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.access(userImageDir, function (error) {
        if (error) {
          fs.mkdir(userImageDir, (err) => {
            console.log(err);
          });
        }
        cb(null, userImageDir);
      });
    } catch (exception) {}
  },

  filename: function (req, file, cb) {
    const originalName = file.originalname.split(".");
    try {
      cb(null, `${originalName.shift()}.${originalName.pop()}`);
    } catch (exception) {}
  },
});
const upload = multer({ storage: storage });

ticketRouter.post(
  "/updateimageticket",
  upload.single("userProfile"),
  async (req, res) => {
    // console.log(req.file);
    // console.log(req);
    // [{cid:0025},   {picture:[{id:1,file},{id:2:file}]},  {config:oaksod}]

    let data = req.body;
    let filePath = undefined;
    let fileName = undefined;
    let exist = undefined;

    const result = await TicketDetail.findOne({
      where: {
        file_info_id: data.file_info_id,
        ticket_generate_id: data.ticket_generate_id,
      },
    });
    console.log(result);
    if (result) {
      result.file_info_id = data.file_info_id;
      result.ticket_generate_id = data.ticket_generate_id;
      result.file_name = req.file.originalname;
      result.save();
    } else {
      await TicketDetail.create({
        file_info_id: data.file_info_id,
        ticket_generate_id: data.ticket_generate_id,
        file_name: req.file.originalname,
      });
    }

    filePath = `${userImageDir}/${req.file.originalname}`;
    fileName = `${req.file.originalname}`;
    exist = fs.existsSync(filePath);
    if (exist) {
      var formData = {
        fileName: fileName,
        userProfile: fs.createReadStream(filePath),
        customerShotName: data.customerShotName,
        ticketId: data.ticketId,
        name: data.nameEng,
      };
      console.log(formData);
      return rp.post({
        url: `http://172.17.6.18:3001/api/v1/ticket/${data.customerShotName}/${data.ticketId}/${data.nameEng}`,
        formData: formData,
      });
    } else {
      throw new Error("Temp File Not Found");
    }
  }
);

module.exports = ticketRouter;
