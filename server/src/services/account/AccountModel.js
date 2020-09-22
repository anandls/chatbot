import mongoose, { Schema } from "mongoose";

const AccountSchema = new Schema(
  {
    //account: { type: String, unique: true, required: true },
    account: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
    pinNumber: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    lookups: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

AccountSchema.methods = {
  toJSON() {
    return {
      balance: this.balance,
      account: this.account,
    };
  },
};

const Account = mongoose.model("Account", AccountSchema);

export default Account;
