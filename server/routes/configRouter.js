const express = require("express");
const configRouter = express.Router();

const Configuration = require("../models/configinfo/configuration");
const File = require("../models/configinfo/file");
const Operation = require("../models/configinfo/operation");
const Customers = require("../models/configinfo/customer");

// ----------Operation----------
configRouter.get("/operation", async (req, res) => {
  try {
    const result = await Operation.findAll();
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
});

// ----------Customers----------
configRouter.get("/customers", async (req, res) => {
  try {
    const result = await Customers.findAll();
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
});

// ----------Config----------
configRouter.post("/", async (req, res) => {
  try {
    console.log(req.body.fileinfo);

    const newConfiguration = await Configuration.create({
      operation_id: req.body.operation_id,
      customer_id: req.body.customer_id,
      doc_name: req.body.doc_name,
      doc_name_eng: req.body.doc_name_eng,
      getdata_type: req.body.getdata_type,
      getdata_start_date: req.body.getdata_start_date,
      getdata_end_date: req.body.getdata_end_date,
      getdata_start_time: req.body.getdata_start_time,
      getdata_end_time: req.body.getdata_end_time,
      getdata_month: req.body.getdata_month,
      getdata_month_date: req.body.getdata_month_date,
      generate_type: req.body.generate_type,
      generate_date: req.body.generate_date,
      generate_next_date: req.body.generate_next_date,
      generate_month: req.body.generate_month,
      generate_month_date: req.body.generate_month_date,
      create_by: req.body.create_by,
      create_time: new Date(),
      visible: req.body.visible,
    });

    const fileinfo = req.body.fileinfo;
    for (let i = 0; i < fileinfo[0].length; i++) {
      await File.create({
        configuration_info_id: newConfiguration.configuration_info_id,
        name: fileinfo[0][i].name,
        name_en: fileinfo[1][i].name_en,
      });
    }

    res
      .status(201)
      .json({ newConfiguration: newConfiguration, file: fileinfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล" });
  }
});

// --- put ---
configRouter.put("/:id", async (req, res) => {
  try {
    const updateConfiguration = await Configuration.findOne({
      include: [File],
      where: {
        configuration_info_id: req.params.id,
      },
    });
    //   console.log(updateConfiguration);
    updateConfiguration.operation_id = req.body.operation_id;
    updateConfiguration.customer_id = req.body.customer_id;
    updateConfiguration.doc_name = req.body.doc_name;
    updateConfiguration.doc_name_eng = req.body.doc_name_eng;
    updateConfiguration.getdata_type = req.body.getdata_type;
    updateConfiguration.getdata_start_date = req.body.getdata_start_date;
    updateConfiguration.getdata_end_date = req.body.getdata_end_date;
    updateConfiguration.getdata_start_time = req.body.getdata_start_time;
    updateConfiguration.getdata_end_time = req.body.getdata_end_time;
    updateConfiguration.getdata_month = req.body.getdata_month;
    updateConfiguration.getdata_month_date = req.body.getdata_month_date;
    updateConfiguration.generate_type = req.body.generate_type;
    updateConfiguration.generate_date = req.body.generate_date;
    updateConfiguration.generate_next_date = req.body.generate_next_date;
    updateConfiguration.generate_month = req.body.generate_month;
    updateConfiguration.generate_month_date = req.body.generate_month_date;

    const fileinfo = req.body.pictures;
    let updateFile = undefined;
    console.log(fileinfo.length);
    for (let i = 0; i < fileinfo.length; i++) {
      console.log(fileinfo[i]);
        updateFile = await File.findOne({
          where: {
            file_info_id: fileinfo[i].file_info_id,
          },
        });
        if (updateFile) {    
          updateFile.name = fileinfo[i].name;
          updateFile.name_en = fileinfo[i].name_en;
          updateFile.save();
        }else {
          await File.create({
              configuration_info_id: req.params.id,
              name: fileinfo[i].name,
              name_en: fileinfo[i].name_en,
            });
        }
    }
    updateConfiguration.save();

    return res.json({
      message: "Configuration updated successfully",
      updateConfiguration,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล" });
  }
});

// --GET Config--
configRouter.get("/template", async (req, res) => {
  try {
    const result = await Configuration.findAll({
      include: [
        {
          model: File,
        },
        {
          model: Customers,
        },
        {
          model: Operation,
        },
      ],
      where: {
        visible: true,
      },
    });
    console.log(JSON.stringify(result, null, 2));
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
});

configRouter.get("/:id", async (req, res) => {
    try {
        const result = await Configuration.findOne({
          include: [
              {
                model: File,
              },
              {
                model: Customers,
              },
              {
                model: Operation,
              },
            ],
          where: {
            configuration_info_id: req.params.id,
          },
        });
        return res.json(result);
        
    } catch (error) {
        console.log(error);
    }
});
//--delete--
configRouter.patch("/:id", async (req, res) => {
  try {
    const result = await Configuration.findOne({
      where: {
        configuration_info_id: req.params.id,
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Configuration template not found" });
    }

    result.visible = false; // Set the visibility property to false
    await result.save();
    return res.json({ message: "Configuration template deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while deleting the template" });
  }
});


module.exports = configRouter;
