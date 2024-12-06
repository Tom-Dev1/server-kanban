import { Router } from "express";
import {
  addNew,
  getForm,
  getSuppliers,
  removeSupplier,
  updateSuplier,
} from "../controllers/supplier";

const router = Router();

router.get("/", getSuppliers);
router.post("/add-new", addNew);
router.put("/update", updateSuplier);
router.delete("/remove", removeSupplier);
router.get("/get-form", getForm);

export default router;
