// models/user.js
import mongoose, { Schema } from "mongoose";
const searchTermsSchema = new Schema(
  {
    location: {
      type: String
    }
  },
  { timestamps: {} }
);

export default mongoose.model("SearchTerm", searchTermsSchema);
