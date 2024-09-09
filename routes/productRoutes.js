const express = require("express");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  getSearchController,
  relatedProductController,
  productCategoryController,
  brainTreeTokenController,
  brainTreePaymentController,
} = require("../controller/productController");
const formidable = require("express-formidable");
const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.post(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.post("/product-filters", productFilterController);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get('/search/:keyword',getSearchController)

router.get('/related-product/:pid/:cid',relatedProductController)

router.get('/product-category/:slug', productCategoryController)

router.get('/braintree/token',brainTreeTokenController)

router.post('/braintree/payment', requireSignIn, brainTreePaymentController)

module.exports = router;
