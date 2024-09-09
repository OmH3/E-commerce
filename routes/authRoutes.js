const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
} = require("./../controller/authController");
const { requireSignIn, isAdmin } = require("./../middleware/authMiddleware");
const router = express.Router();
// register route
router.post("/register", registerController);
// login route
router.post("/login", loginController);
// test route
router.get("/test", requireSignIn, isAdmin, testController);
// forgot password
router.post('/forgot-password', forgotPasswordController)
// user auth route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
// admin auth route
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put('/profile', requireSignIn, updateProfileController)

router.get('/orders', requireSignIn, getOrdersController)

module.exports = router;
