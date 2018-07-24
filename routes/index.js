const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");

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
router.post("/login", authController.login);

module.exports = router;
