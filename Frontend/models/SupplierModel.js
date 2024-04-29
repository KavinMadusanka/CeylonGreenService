import mongoose from "mongoose";
import slugify from "slugify";

const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
});

SupplierSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

export default mongoose.model('Supplier', SupplierSchema);