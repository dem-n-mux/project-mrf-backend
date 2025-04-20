import SETTINGS from "../models/settingModel.js";

export const getAllSettings = async (req, res) => {
  try {
    const settings = await SETTINGS.findOne({});

    if (!settings) {
      await SETTINGS.create({
        clients: [],
      });

      return res.status(400).json({
        success: false,
        message: "Settings not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateClientsListing = async (req, res) => {
  try {
    const { clients } = req.body;

    if (!Array.isArray(clients)) {
      return res.status(400).json({
        success: false,
        message: "Invalid clients data",
      });
    }

    await SETTINGS.findOneAndUpdate(
      {},
      {
        clients,
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Clients listing updated successfully",
    });
  } catch (error) {
    console.error("Error updating clients listing:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
