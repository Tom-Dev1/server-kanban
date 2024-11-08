import UserModel from "../models/UserModel";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { getAccessToken } from "../utils/getAccesstoken";
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
    const newUser: any = new UserModel(body);
    await newUser.save();
    delete newUser._doc.password;

    res.status(200).json({
      message: "Register",
      data: {
        ...newUser._doc,
        token: await getAccessToken({
          _id: newUser._id,
          email: newUser.email,
          rule: 1,
        }),
      },
    });
  } catch (err: any) {
    res.status(404).json({
      message: err.message,
    });
  }
};
const login = async (req: any, res: any) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const user: any = await UserModel.findOne({ email });
    if (!user) {
      throw new Error(`Account does not exist`);
    }

    delete user._doc.password;

    res.status(200).json({
      message: "Login successfull!!!",
      data: {
        ...user._doc,
        token: await getAccessToken({
          _id: user._id,
          email: user.email,
          rule: user.rule,
        }),
      },
    });
  } catch (err: any) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export { register, login };
