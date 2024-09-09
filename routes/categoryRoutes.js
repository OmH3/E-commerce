const express = require("express");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require("../controller/categoryController");
const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController)

// get all category

router.get("/get-category", categoryController)

router.get("/single-category/:slug", singleCategoryController)

router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController)

module.exports = router;
