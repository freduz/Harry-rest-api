import mongoose from "mongoose";

const appsSchema = new mongoose.Schema({
  workTime: [],
  nonWorkTime: [
    {
      nonWorkTimeApp: { type: String, required: true },
      limit: [{ weekDays: String, weekEnds: String }],
    },
  ],
});

export default mongoose.model("BlockApps", appsSchema);
