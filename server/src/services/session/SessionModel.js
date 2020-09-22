import mongoose, { Schema } from "mongoose";

const SessionSchema = new Schema(
  {
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    sessionId: { type: mongoose.Schema.Types.ObjectId, unique: true },
    //users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }],
    users: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

export default mongoose.model("Session", SessionSchema);
