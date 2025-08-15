const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  items: [{
    laptop: { type: mongoose.Schema.Types.ObjectId, ref: "Laptop", required: true },
    quantity: { type: Number, required: true }
  }],
  total: { type: Number, required: true, index: true },
  status: { 
    type: String, 
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"], 
    default: "pending", 
    index: true 
  },
  orderDate: { type: Date, default: Date.now, index: true },
  shippingAddress: { type: String, required: true }
}, { timestamps: true });


orderSchema.index({ status: 1, orderDate: -1 });


orderSchema.index({ userId: 1, orderDate: -1 });

module.exports = mongoose.model("Order", orderSchema);
