const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  cookTime: {
  type: String,
  required: true,
  },
  prepTime: {
  type: String,
  required: true,
  },
  vegetarian: {
  type: String,
  require: true,
  },
  vegan: {
  type: String,
  require: true,
  },
  image: {
    type: String,
    require: false,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
