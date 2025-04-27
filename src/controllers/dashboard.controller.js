import USER from "../models/userModel.js";
import LEAD from "../models/leadModel.js";
import CANDIDATE from "../models/candidateModel.js";

export const getDashboard = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = user.id;
    const userObj = await USER.findById(userId);

    if (!userObj) {
      return res.status(400).json({ message: "User not found" });
    }

    const openLeadsCount = await LEAD.countDocuments({
      addedBy: userObj._id,
      status: "new",
    });

    const closedLeadsCount = await LEAD.countDocuments({
      addedBy: userObj._id,
      status: "completed",
    });

    const openCandidatesCount = await CANDIDATE.countDocuments({
      status: "new",
    });

    const rejectedCandidatesCount = await CANDIDATE.countDocuments({
      status: "rejected",
    });

    return res.status(200).json({
      message: "Dashboard data fetched successfully",
      result: {
        openLeadsCount,
        closedLeadsCount,
        openCandidatesCount,
        rejectedCandidatesCount,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
