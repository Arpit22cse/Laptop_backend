const mongoose = require('mongoose')

const laptopSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  brand: { type: String, required: true, index: true },
  processor: { type: String, required: true, index: true },
  ram: { type: String, required: true, index: true },
  storage: { type: String, required: true },
  graphics: { type: String, required: true },
  display: { type: String, required: true },
  price: { type: Number, required: true, index: true },
  originalPrice: { type: Number },
  image: { type: String},
  images: [{ type: String }],
  rating: { type: Number, default: 0, index: true },
  reviews: { type: Number, default: 0 },
  description: { type: String },
  features: [{ type: String }]
}, { timestamps: true });


laptopSchema.index({ name: "text", brand: "text", processor: "text" });


laptopSchema.index({ brand: 1, ram: 1, processor: 1 });

module.exports = mongoose.model("Laptop", laptopSchema);
