const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const { Validator } = require("express-json-validator-middleware");
const { recipeSchema } = require("./recipes");
const { db, reset } = require("./db");

// https://github.com/simonplend/express-json-validator-middleware
const { validate } = new Validator();

/** GET Recipes
 * @openapi
 * /recipes:
 *  get:
 *    summary: Get recipes stored in the database.
 *    responses:
 *      200:
 *        description: Get stored recipes.
 */
router.get("/recipes", (req, res) => {
  res.send(db.getData("/recipes"));
});

/** GET Recipe
 * @openapi
 * /recipes/{id}:
 *  get:
 *    summary: Get a recipe from the database by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the recipe to delete
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Recipe successfully retrieved.
 *      400:
 *        description: Malformed request.
 *      404:
 *        description: Recipe with the specified ID was not found.
 */
router.get("/recipes/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400).json("id required");
  }

  const recipeIndex = db.getIndex("/recipes", id);

  if (recipeIndex === -1) {
    res.sendStatus(404);
  }
  const recipe = db.getData(`/recipes[${recipeIndex}]`);
  res.send(recipe);
});

/** POST Recipe
 * @openapi
 * /recipes:
 *  post:
 *    summary: Store a recipe in the database
 *    responses:
 *      200:
 *        description: The stored recipe, refer to recipeSchema for details.
 *      400:
 *        description: Validation errors, check response body
 */
router.post("/recipes", validate({ body: recipeSchema }), (req, res) => {
  const recipe = { id: uuid(), ...req.body };
  db.push("/recipes[]", recipe, true);
  res.send(recipe);
});

/** PUT Recipe
 * @openapi
 * /recipes:
 *  put:
 *    summary: Replace an existing recipe
 *    responses:
 *      200:
 *        description: The stored recipe, refer to recipeSchema for details.
 *      400:
 *        description: Validation errors, check response body
 *      404:
 *        description: Recipe with the specified ID was not found.
 */
router.put("/recipes/:id", validate({ body: recipeSchema }), (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400).json("id required");
  }

  const recipeIndex = db.getIndex("/recipes", id);

  if (recipeIndex === -1) {
    return res.sendStatus(404);
  }

  db.push(`/recipes[${recipeIndex}]`, { id, ...req.body }, true);

  const recipe = db.getData(`/recipes[${recipeIndex}]`);

  res.send(recipe);
});

/** DELETE Recipe
 * @openapi
 * /recipes/{id}:
 *  delete:
 *    summary: Delete a recipe from the database
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the recipe to delete
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Deletion was successful.
 *      400:
 *        description: Malformed request.
 *      404:
 *        description: Recipe with the specified ID was not found.
 */
router.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400).json("id required");
  }

  const recipeIndex = db.getIndex("/recipes", id);

  if (recipeIndex === -1) {
    return res.sendStatus(404);
  }

  db.delete(`/recipes[${recipeIndex}]`);
  res.sendStatus(200);
});

/** GET Reset
 * @openapi
 * /reset:
 *  get:
 *    summary: Reset the database to its original state
 *    responses:
 *      204:
 *        description: Database was successfully reset.
 */
router.get("/reset", (req, res) => {
  reset();
  res.sendStatus(204);
});

function uuid() {
  return crypto.randomBytes(8).toString("hex");
}

module.exports = router;
