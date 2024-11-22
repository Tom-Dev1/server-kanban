import mongoose, { Schema } from "mongoose";

const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: String,
  product: String,
  categorires: {
    type: [String],
  },
  email: String,
  active: Number,
  price: Number,
  contact: String,
  isTaking: {
    type: Boolean,
    default: 0,
    enum: [0, 1],
  },
  photoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const SupplierModel = mongoose.model("suppliers", supplierSchema);
export default SupplierModel;
