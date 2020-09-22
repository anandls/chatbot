import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    text: { type: String, required: true },
    //author: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    //bot: { type: mongoose.Schema.Types.ObjectId, ref: "Bot" },
    author: { type: mongoose.Schema.Types.ObjectId },
    authortype: {
      type: String,
      enum: ["CLIENT", "BOT"],
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    posted: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

export default mongoose.model("Message", MessageSchema);
