import SETTINGS from "../models/settingModel.js";

export const getClientsSearch = async (req, res) => {
  try {
    const { q = "" } = req.query;

    const settings = await SETTINGS.findOne();
    const clients = settings.clients
      .filter((client) => client.name.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 5);

    return res.status(200).json({
      success: true,
      data: clients,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
