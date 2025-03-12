// type ingredientType = {
//     name: string;
//     quantity: string;
// }
type Recipe = {
    title: string;
    instructions: string;
    ingredients:Array <{name: string, quantity: string}>;
  };
  
  const processRecipe = (recipe: Recipe) => {
    // Do something with the recipe in here
  };
  
  processRecipe({
    title: "Chocolate Chip Cookies",
    ingredients: [
      { name: "Flour", quantity: "2 cups" },
      { name: "Sugar", quantity: "1 cup" },
    ],
    instructions: "...",
  });