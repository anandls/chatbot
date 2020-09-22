import mongoose, { Schema } from "mongoose";

const ClientSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    conversationId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

ClientSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      accounts: this.accounts,
      conversationId: this.conversationId,
    };
  },
};

export default mongoose.model("Client", ClientSchema);
