import LEAD from "../models/leadModel.js";
import USER from "../models/userModel.js";
import csv from "csvtojson";
import fs from "fs";

export const getLeads = async (req, res) => {
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

    const leads = await LEAD.find({ addedBy: userObj._id }).populate(
      "addedBy",
      "fullname role email"
    );

    return res.status(200).json({
      message: "Leads fetched Successfully",
      result: leads,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addLead = async (req, res) => { 
  try {
    const { fullname, employeeCode, email, phone } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = user.id;
    const userObj = await USER.findById(userId);

    if (!userObj) {
      return res.status(400).json({ message: "User not found" });
    }

    const newLead = new LEAD({
      fullname,
      employeeCode,
      email,
      phone,
      addedBy: userObj._id,
    });

    await newLead.save();

    return res.status(201).json({
      message: "Lead added successfully",
      result: newLead,
    });
  } catch (error) {
    console.error("Error adding lead:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const uploadLeadsFromCSV = async (req, res) => {
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

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    const leadsArray = await csv().fromFile(filePath);

    const leadsToInsert = leadsArray.map((lead) => ({
      fullname: lead.fullname,
      employeeCode: lead.employeeCode,
      email: lead.email,
      phone: lead.phone,
      addedBy: userObj._id,
    }));

    await LEAD.insertMany(leadsToInsert);

    fs.unlinkSync(filePath);

    return res.status(201).json({
      message: "Leads uploaded successfully",
      result: leadsToInsert.length,
    });
  } catch (error) {
    console.error("Error uploading leads:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

