const uploadMiddelware = require("../middleware/uploderMiddleware");
const Files = require("../model/file");
const fs = require("fs");

const { Op } = require("sequelize");
const fileget = (req, res) => {
  Files.findAll()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
const filedelete = (req, res) => {
  Files.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      console.log(result);
      if (result === []) {
        res.json({ message: "no file fouund" });
      } else {
        console.log(result, "adadadsd");
        const filePath = "./uplods/" + result.orginalName;
        if (filePath === undefined) {
          console.log("not found");
        } else {
          fs.unlink(filePath, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("deleted");
            }
          });
          return Files.destroy({
            where: {
              id: req.params.id,
            },
          });
        }
      }
    })
    .then((result) => {
      console.log(result);
      console.log(result);
      if (result === 0) {
        res.json({ message: "file not found" });
      } else {
        res.json({ message: "file deleted!" });
      }
      //
    })
    .catch((err) => console.log(err));
};
const filepost = (req, res) => {
  Files.create({
    fileName: req.file.originalname,
    fileSize: req.file.size,
    orginalName: req.file.filename,
  })
    .then((result) => res.json({ message: "file created successfully" }))
    .catch((err) => console.log(err));
};

module.exports = { fileget, filedelete, filepost };
