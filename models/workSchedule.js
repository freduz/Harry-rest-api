import mongoose from "mongoose";

const workScheduleSchema = new mongoose.Schema(
  {
    day: { type: String, required: [true, "Day must be provided"] },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    workTime: [],
    nonWorkTime: [
      {
        nonWorkTimeApp: { type: String, required: true },
        limit: [{ weekDays: String, weekEnds: String }],
      },
    ],
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("workSchedule", workScheduleSchema);
