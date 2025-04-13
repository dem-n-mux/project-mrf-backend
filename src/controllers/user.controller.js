import USER from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let searchParams;
    if (user.role === "HR") {
      searchParams = { role: { $in: ["HR"] } };
    }
    if (user.role === "MGR") {
      searchParams = { role: { $in: ["HR", "MGR"] } };
    }
    if (user.role === "ASM") {
      searchParams = { role: { $in: ["HR", "MGR", "ASM"] } };
    }
    if (user.role === "CEO") {
      searchParams = { role: { $in: ["HR", "MGR", "ASM"] } };
    }

    const users = await USER.find(searchParams).select("-password -__v");

    return res.status(200).json({
      message: "Users fetched successfully",
      result: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;

    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userToDelete = await USER.findOne({ username });

    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userToDelete.role === "CEO") {
      return res.status(403).json({ message: "Cannot delete CEO" });
    }

    await USER.deleteOne({ username });

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { fullname, role } = req.body;

    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userToUpdate = await USER.findOne({ username });

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userToUpdate.role === "CEO") {
      return res.status(403).json({ message: "Cannot update CEO" });
    }

    await USER.updateOne({ username }, { role, fullname });

    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
