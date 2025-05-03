import LEAD from "../models/leadModel.js";
import USER from "../models/userModel.js";
import csv from "csvtojson";
import fs from "fs";
import { sendEmail } from "../utils/emailer.js";

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

    const emailSubject = "You have been invited to fill out a form";
    const formLink =
      process.env.CORS_ORIGIN +
      "/apply-form?fullname=" +
      fullname.split(" ").join("_") +
      "&email=" +
      email +
      "&employeecode=" +
      employeeCode +
      "&phone=" +
      phone;
    const emailBody = `Dear ${fullname},\n\nAs a mandate of documents and details requirement of an employee for employment and compliance, we have observed that your details are not filled completely. We request your immediate attention and action for your smooth employment continuation.\n\nKindly fill in the correct details as per documents and upload the same within 24 hrs. Failure may cause action under employment terms and conditions.\n\nWe hope you will ensure the compliances by 100%.\n\n${formLink}\n\nRegards,\nTeam TechSmart`;
    await sendEmail(email, emailSubject, emailBody);

    await newLead.save();

    return res.status(201).json({
      message: "Lead added successfully",
      result: newLead,
    });
  } catch (error) {
    console.error("Error adding lead:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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

    for (const lead of leadsToInsert) {
      const emailSubject = "You have been invited to fill out a form";
      const formLink =
        process.env.CORS_ORIGIN +
        "/apply-form?fullname=" +
        lead.fullname.split(" ").join("_") +
        "&email=" +
        lead.email +
        "&employeecode=" +
        lead.employeeCode;
      const emailBody = `Dear ${fullname},\n\nAs a mandate of documents and details requirement of an employee for employment and compliance, we have observed that your details are not filled completely. We request your immediate attention and action for your smooth employment continuation.\n\nKindly fill in the correct details as per documents and upload the same within 24 hrs. Failure may cause action under employment terms and conditions.\n\nWe hope you will ensure the compliances by 100%.\n\n${formLink}\n\nRegards,\nTeam TechSmart`;
      await sendEmail(lead.email, emailSubject, emailBody);
    }

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
