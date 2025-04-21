import Candidate from "../models/candidateModel.js";
import { uploadToS3 } from "../utils/awsUtils.js";
import { v4 as uuidv4 } from "uuid";

export const addCandidate = async (req, res) => {
  try {
    const formData = req.body;
    const fileFields = {};
    const uuid = uuidv4();

    const uploadPromises = req.files.map((file) => {
      return uploadToS3(file, uuid).then((url) => {
        fileFields[file.fieldname] = url;
      });
    });

    await Promise.all(uploadPromises);

    if (formData.children && Array.isArray(formData.children)) {
      const childPhotos = req.files.filter((file) =>
        file.fieldname.startsWith("childPhoto_")
      );

      childPhotos.forEach((file) => {
        const indexMatch = file.fieldname.match(/childPhoto_(\d+)/);
        if (indexMatch) {
          const index = parseInt(indexMatch[1]);
          if (formData.children[index]) {
            formData.children[index].childPhoto = fileFields[file.fieldname];
          }
        }
      });
    }

    const candidateData = {
      ...formData,
      ...fileFields,
    };

    const candidate = new Candidate(candidateData);
    await candidate.save();

    res.status(201).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCandidatesList = async (req, res) => {
  try {
    const candidates = await Candidate.find({})
      .sort({ createdAt: -1 })
      .select(
        "_id fullname status createdAt photo email employeeCode updatedAt modifiedBy"
      )
      .populate("modifiedBy", "fullname email");
    res.status(200).json({
      success: true,
      data: candidates,
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchSingleCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }
    res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.error("Error fetching candidate:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCandidateStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = req.user;

    const candidate = await Candidate.findByIdAndUpdate(
      id,
      { status, modifiedBy: user.id },
      { new: true }
    );

    if (!candidate) {
      return res.status(400).json({
        success: false,
        message: "Candidate not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.error("Error updating candidate stage:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
