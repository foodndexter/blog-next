import mongoose from "mongoose"

export const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
  },
  items: {
    type: Array,
  },
})

export default mongoose.models.Menu || mongoose.model("Menu", MenuSchema)
