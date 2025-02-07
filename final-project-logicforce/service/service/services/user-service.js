import User from "../models/user.js";

const getUsers = async (query = {}) => {
  return User.find(query);
};

const getUser = async (query = {}) => {
  return User.findOne(query);
};

const getUserById = async (id) => {
  return User.findById(id);
};

const createUser = async (userData) => {
  return User.create(userData);
};

const updateUser = async (id, userData) => {
  return User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });
};

const deleteUser = async (id) => {
  console.log("Attempting to delete user with ID:", id); // Log deletion attempt

  const user = await User.findByIdAndDelete(id); // Delete user
  if (!user) {
      console.log("No user found with ID:", id);
  }
  return user;
};

const resetPassword = async (email, newPassword, resetToken) => {
  // Fetch the user by email
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // Validate the reset token
  const isValidToken = await user.verifyResetPasswordToken(resetToken);
  if (!isValidToken) throw new Error("Invalid or expired reset token");

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return user;
};

export default {
  getUsers,
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  resetPassword, 
};
