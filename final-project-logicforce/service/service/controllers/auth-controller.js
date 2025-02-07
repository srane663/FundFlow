import user from '../models/user.js';
import authService from '../services/auth-service.js';

console.log("inside auth-controller");

// Register a user
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await authService.register(firstName, lastName, email, password);
        res.status(201).json(user); // 201 Created
    } catch (error) {
        res.status(400).json({ message: error.message }); // 400 Bad Request
    }
};

// Log in a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);
        res.status(200).json(user); // 200 OK
    } catch (error) {
        res.status(401).json({ message: error.message }); // 401 Unauthorized
    }
};

// Forgot password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const token = await authService.forgotPassword(email);
        console.log(token);
        res.status(200).json({ message: "Reset token sent to email" }); // 200 OK
    } catch (error) {
        res.status(400).json({ message: error.message }); // 400 Bad Request
    }
};

// Reset password
const resetPassword = async (req, res) => {
    const { email, password, token } = req.body;

    try {
        const updatedUser = await authService.resetPassword(email, password, token);
        return res.status(200).json({ message: "Password reset successfully", user: updatedUser });
    } catch (error) {
        return res.status(400).json({ message: error.message }); // 400 Bad Request
    }
};
// Delete User
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("Deleting user with ID:", userId); // Log the userId

        if (!userId) throw new Error("User ID is required");

        await authService.deleteUser(userId);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error.message); // Log error message
        res.status(404).json({ message: error.message }); // 404 Not Found
    }
};

export default { register, login, forgotPassword, resetPassword, deleteUser };
