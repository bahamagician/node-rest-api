const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const blogController = require("../controllers/blogController");

router.get("/", homeController.index);

router.get("/blogs", blogController.index);
router.get("/blogs/page/:page", blogController.index);
router.get("/blogs/:id", blogController.show);
router.post(
  "/blogs",
  blogController.upload,
  blogController.resize,
  blogController.store
);

module.exports = router;
