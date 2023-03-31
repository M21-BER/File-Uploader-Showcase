const express = require("express");
const router = express.Router();
const uploadMiddelware = require("../middleware/uploderMiddleware");
const errorHandlerMiddleware = require("../middleware/errorHandlerMiddleware");
const {
  fileget,
  filedelete,
  filepost,
} = require("../controller/filecontroller");

router.get("/", fileget);
router.post("/", uploadMiddelware, filepost, errorHandlerMiddleware);
router.delete("/:id", filedelete);

module.exports = router;
