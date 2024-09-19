const { hashPassword, comparePassword } = require("./../helper/authHelper");
const userModel = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const orderModel = require("./../models/orderModel");
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) return res.send({ message: "Name is required" });
    if (!email) return res.send({ message: "email is required" });
    if (!password) return res.send({ message: "password is required" });
    if (!phone) return res.send({ message: "phone is required" });
    if (!address) return res.send({ message: "address is required" });
    if (!answer) return res.send({ message: "answer is required" });
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registration Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required!" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required!" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "new Password is required!" });
    }
    // check
    const user = await userModel.findOne({ email, answer });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const testController = (req, res) => {
  try {
    res.send("protected route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    if (password && password.length < 6)
      return res.json({ error: "Password is required snd 6 character long" });
    const hashedPassword = password
      ? await hashedPassword(password)
      : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        email: email || user.email,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};

const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({buyer: req.user._id})
      .populate("products", "-photo ")
      .populate("buyer", "name"); 
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders!",
      error,
    });
  }
};

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo ")
      .populate("buyer", "name")
      .sort({createdAt: -1});
    res.json(orders);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error while getting all orders!",
      e,
    });
  }
};

const orderStatusController = async(req,res)=>{
  try{
    const {orderId} = req.params;
    const {status} = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      {status},
      {new: true}
    );
  }catch(e){
    console.log(e);
    res.status(500).send({
      success:false,
      message:"Failed to process item",
      e,
    })
  }
}

module.exports = {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
};
