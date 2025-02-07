import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    twoFactorEnabled: { type: Boolean, default: false },
    resetToken: {
      token: { type: String },
      expires: { type: Date },
    },
  },
  { timestamps: true }
);

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Generate reset password token
userSchema.methods.generateResetPasswordToken = async function () {
  const resetToken = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  const expires = Date.now() + 10 * 60 * 1000; // 10 minutes
  this.resetToken = { token: resetToken, expires };
  await this.save();
  return resetToken;
};

// Verify reset token
userSchema.methods.verifyResetPasswordToken = function (resetToken) {
  if (!this.resetToken || this.resetToken.token !== resetToken) {
    throw new Error("Invalid reset token");
  }

  if (Date.now() > this.resetToken.expires) {
    throw new Error("Reset token has expired");
  }

  return true;
};

export default mongoose.model('User', userSchema);
