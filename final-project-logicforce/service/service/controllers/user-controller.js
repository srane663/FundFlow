import userService from "../services/user-service.js";
import { setSuccess, setError } from './response-handler.js';


const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  return res.status(200).json({ users });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (user) {
    return res.status(200).json({ user });
  }
  throw new Error("User not found");
};

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);
    if (user) {
      return res.status(200).json({ user });
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.deleteUser(id);
    if (user) {
      return res.status(200).json({ user });
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { getUsers, getUserById, createUser, updateUser, deleteUser };
