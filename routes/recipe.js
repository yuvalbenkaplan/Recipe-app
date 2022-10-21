const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipesController = require("../controllers/recipe");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, recipesController.getRecipe);

router.get("/favorites", ensureAuth, recipesController.getFavorites);

router.get("/browse", ensureAuth, recipesController.getBrowse);

//Enables user to create post w/ cloudinary for media uploads
router.post("/createRecipe", upload.single("file"), recipesController.createRecipe);

//Enables user to delete post. In controller, uses POST model to delete post from MongoDB collection
router.delete("/deleteRecipe/:id", recipesController.deleteRecipe);

//allows user to add a recipe to a favourite list
router.post("/favoriteRecipe/:id", recipesController.favoriteRecipe);

module.exports = router;
