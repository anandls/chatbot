import mongoose, { Schema } from "mongoose";

const ConversationSchema = new Schema(
  {
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    sessionId: { type: mongoose.Schema.Types.ObjectId, unique: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

//change clientid to client

export default mongoose.model("Conversation", ConversationSchema);
