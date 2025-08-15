const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String },
  role: { type: String, enum: ["admin", "customer"], default: "customer", index: true },
  status: { type: String, enum: ["active", "blocked"], default: "active", index: true },
  totalOrders: { type: Number, default: 0 },
  googleId: {
    type: String,
    unique: true,
    sparse: true, 
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },
  picture: String,
}, { timestamps: true });


userSchema.index({ name: "text", email: "text" });

module.exports = mongoose.model("User", userSchema);
