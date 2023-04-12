import mongoose from "mongoose"

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
})

export default mongoose.models.User || mongoose.model("User", UserSchema)
