const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");


module.exports = {
  getProfile: async (req, res) => {
    try {
      const recipes = await Recipe.find({ user: req.user.id });
      res.render("profile.ejs", { recipes: recipes, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getRecipe: async (req, res) => {
    try {
      const post = await Recipe.findById(req.params.id);
      res.render("recipe.ejs", { recipe: recipe, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createRecipe: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Recipe.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  
  deleteRecipe: async (req, res) => {
    try {
      // Find recipe by id
      let recipe = await Recipe.findById({ _id: req.params.id });
      console.log({recipe})
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(recipe.cloudinaryId);
      
      // Delete recipe from db
      await Recipe.remove({ _id: req.params.id });
      console.log("Deleted Recipe");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
