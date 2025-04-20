import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  clients: [
    {
      name: {
        type: String,
        required: true,
      },
      value: {
        type: String,
      },
    },
  ],
});

const clientModel = mongoose.model("Settings", settingSchema);
export default clientModel;
