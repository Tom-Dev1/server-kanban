import UserModel from "../models/UserModel";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const register = async (req: any, res: any) => {
  const body = req.body;
  const { email, name, password } = body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      throw new Error(`This account already exists`);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    body.password = hashedPassword;
    const newUser = new UserModel(body);
    await newUser.save();

    res.status(200).json({
      message: "Register",
      data: newUser,
    });
  } catch (err: any) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export default register;
