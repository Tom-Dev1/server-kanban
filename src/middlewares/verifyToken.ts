import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const verifyToken = (req: any, res: any, next: any) => {
  const headers = req.headers.authorization;
  const accessToken = headers ? headers.split(" ")[1] : "";
  try {
    if (!accessToken) {
      throw new Error("Không có quyền");
    }
    const verfy: any = jwt.verify(
      accessToken,
      process.env.SECRET_KEY as string
    );

    if (!verfy) {
      throw new Error("Invalid token");
    }
    req._id = verfy._id;
    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
