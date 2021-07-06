const defaultRecipes = [
  {
    id: "5e1c710909df4ee4",
    title: "Chorizo & mozzarella gnocchi bake",
    description:
      "Upgrade cheesy tomato pasta with gnocchi, chorizo and mozzarella for a comforting bake that makes an excellent midweek meal",
    ingredients: [
      "1 tbsp olive oil",
      "1 onion, finely chopped",
      "2 garlic cloves, crushed",
      "120g chorizo, diced",
      "2 x 400g cans chopped tomatoes",
      "1 tsp caster sugar",
      "600g fresh gnocchi",
      "125g mozzarella ball, cut into chunks",
      "small bunch of basil, torn",
      "green salad, to serve",
    ],
    instructions:
      "STEP 1\nHeat the oil in a medium pan over a medium heat. Fry the onion and garlic for 8-10 mins until soft. Add the chorizo and fry for 5 mins more. Tip in the tomatoes and sugar, and season. Bring to a simmer, then add the gnocchi and cook for 8 mins, stirring often, until soft. Heat the grill to high.\n\nSTEP 2\nStir ¾ of the mozzarella and most of the basil through the gnocchi. Divide the mixture between six ovenproof ramekins, or put in one baking dish. Top with the remaining mozzarella, then grill for 3 mins, or until the cheese is melted and golden. Season, scatter over the remaining basil and serve with green salad.",
    imageUrl:
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1167740.jpg&q=85",
    sourceUrl:
      "https://www.bbcgoodfood.com/recipes/chorizo-mozzarella-gnocchi-bake",
  },
  {
    id: "b118ef17c66fc8cf",
    title: "Bacon & Cheese pancakes",
    description:
      "Sweet/savory hybrids can be tricky sometimes but I think this worked beautifully. We are talking about bacon, cheese, and onions after all, so it wasn't that big of a shock. The way the chipotle-spiced maple syrup brought everything together was a risk well rewarded.",
    ingredients: [
      "8 ounces bacon, chopped",
      "½ cup thinly sliced green onions",
      "2 tablespoons and 1 teaspoons and ½ teaspoon all-purpose flour",
      "¾ cup cornmeal",
      "1 tablespoon baking powder",
      "¾ teaspoon salt",
      "1 pinch ground black pepper",
      "1 pinch cayenne pepper",
      "2 tablespoons and 2 teaspoons milk",
      "2 ounces sharp Cheddar cheese, grated",
      "2 large eggs, beaten",
      "2 tablespoons butter, melted",
      "1 tablespoon white sugar",
      "1 cups warm maple syrup, or to taste",
      "⅛ teaspoon chipotle chile powder, or to taste",
      "1 teaspoons vegetable oil",
      "1 teaspoons butter",
    ],
    instructions:
      "Place bacon in a large skillet and cook over medium-high heat, stirring occasionally, until evenly browned, about 10 minutes; remove from heat. Stir green onions into bacon and saute in hot fat until slightly softened, 1 to 2 minutes. Transfer bacon mixture to a strainer to drain, retaining drippings.\n\nStep 2\nWhisk flour, cornmeal, baking powder, salt, black pepper, and cayenne pepper together in a large bowl. Add drained bacon mixture, milk, Cheddar cheese, eggs, melted butter, and sugar to flour mixture; whisk until batter is smooth. Let batter rest for 10 minutes.\n\nStep 3\nCombine maple syrup and chipotle chile powder together in a small bowl; whisk until chile powder is completely dissolved.\n\nStep 4\nHeat 1 teaspoon bacon drippings, 1 teaspoon oil, and 1 teaspoon butter on a griddle over medium-high heat. Drop batter by 1/4-cupful onto the griddle and cook until bubbles form and the edges are dry, 3 to 4 minutes. Flip and cook until browned on the other side, 2 to 3 minutes. Repeat with remaining batter. Transfer pancakes to plate and top with maple syrup.",
    sourceUrl: "https://www.allrecipes.com/recipe/238130/mancakes/",
    imageUrl:
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1167740.jpg&q=85",
  },
  {
    id: "a118ef17c66fc8ce",
    title: "Simple Macaroni and Cheese",
    description:
      "A very quick and easy fix to a tasty side-dish. Fancy, designer mac and cheese often costs forty or fifty dollars to prepare when you have so many exotic and expensive cheeses, but they aren't always the best tasting. This recipe is cheap and tasty.",
    ingredients: [
      "1 (8 ounce) box elbow macaroni",
      "¼ cup butter",
      "¼ cup all-purpose flour",
      "½ teaspoon salt",
      "ground black pepper to taste",
      "2 cups milk",
      "2 cups shredded Cheddar cheese",
    ],
    instructions:
      "Step 1\nBring a large pot of lightly salted water to a boil. Cook elbow macaroni in the boiling water, stirring occasionally until cooked through but firm to the bite, 8 minutes. Drain.\n\nStep 2\nMelt butter in a saucepan over medium heat; stir in flour, salt, and pepper until smooth, about 5 minutes. Slowly pour milk into butter-flour mixture while continuously stirring until mixture is smooth and bubbling, about 5 minutes. Add Cheddar cheese to milk mixture and stir until cheese is melted, 2 to 4 minutes.\n\nStep 3\nFold macaroni into cheese sauce until coated.",
    sourceUrl:
      "https://www.allrecipes.com/recipe/238691/simple-macaroni-and-cheese/",
    imageUrl:
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3503821.jpg&w=596&h=792&c=sc&poi=face&q=85",
  },
];

// https://json-schema.org/understanding-json-schema/index.html
const recipeSchema = {
  type: "object",
  required: ["title", "ingredients", "description", "instructions"],
  properties: {
    title: {
      type: "string",
      minLength: 1,
    },
    description: {
      type: "string",
      minLength: 1,
    },
    instructions: {
      type: "string",
      minLength: 1,
    },
    ingredients: {
      type: "array",
      items: {
        type: ["string"],
      },
    },
    imageUrl: {
      type: "string",
    },
    sourceUrl: {
      type: "string",
    },
  },
};

module.exports = {
  defaultRecipes,
  recipeSchema,
};
