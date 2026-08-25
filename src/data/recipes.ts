import { ImageSourcePropType } from 'react-native';

// Local stand-in for what will eventually be a real backend/API response.
// Screens import from here rather than defining recipe content themselves.

export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';

export type Tag = 'High Protein' | 'Under 30 Min' | 'Gluten Free' | 'Meal Prep';

// The full set of tags Quick Picks can filter by — defined once here so the
// filter UI and each recipe's `tags` field always agree on valid values.
export const quickPickTags: Tag[] = ['High Protein', 'Under 30 Min', 'Gluten Free', 'Meal Prep'];

export type Ingredient = {
  name: string;
  quantity: string;
};

export type Recipe = {
  id: string;
  title: string;
  category: MealCategory;
  minutes: number;
  tags: Tag[];
  isNew?: boolean;
  // Hand-written card copy (e.g. "High in Protein • 30 min"). Falls back to
  // an auto-generated "{tag} • {minutes} min" line when omitted.
  subtitle?: string;
  // Bundled local photo. Optional: recipes without one fall back to
  // ImagePlaceholder, since not every recipe will have a photo yet.
  image?: ImageSourcePropType;
  // Recipe Detail screen fields — optional since not every recipe card
  // (e.g. future search results) needs the full detail content loaded.
  description?: string;
  rating?: number;
  servings?: number;
  ingredients?: Ingredient[];
  // Numbered cooking steps, shown below the ingredients on Recipe Detail.
  steps?: string[];
};

export const recipes: Recipe[] = [
  {
    id: 'lemon-chickpea-power-bowl',
    title: 'Lemon Chickpea Power Bowl',
    category: 'lunch',
    minutes: 30,
    tags: ['High Protein'],
    isNew: true,
    subtitle: 'High in Protein • 30 min',
    image: require('../../assets/images/lemon-chickpea-bowl.jpg'),
    description:
      'A fresh and filling bowl with roasted chickpeas, quinoa, roasted veggies, and tahini lemon dressing.',
    rating: 4.8,
    servings: 2,
    ingredients: [
      { name: '1 can chickpeas', quantity: '15 oz' },
      { name: '1 cup quinoa', quantity: '185 g' },
      { name: '1 avocado', quantity: '1 whole' },
      { name: '1 cup roasted sweet potato', quantity: '150 g' },
      { name: '2 cups kale', quantity: '60 g' },
    ],
    steps: [
      'Cook quinoa according to package instructions and let cool slightly.',
      'Roast sweet potato cubes at 425°F until tender, about 20 minutes.',
      'Whisk tahini, lemon juice, and water into a smooth dressing.',
      'Massage kale with a pinch of salt to soften it.',
      'Assemble the bowl with quinoa, chickpeas, sweet potato, kale, and avocado, then drizzle with dressing.',
    ],
  },
  {
    id: 'golden-turmeric-oatmeal',
    title: 'Golden Turmeric Oatmeal',
    category: 'breakfast',
    minutes: 15,
    tags: ['Gluten Free'],
    subtitle: 'Gluten Free • 15 min',
    description:
      'Creamy steel-cut oats simmered with turmeric, cinnamon, and coconut milk, finished with toasted almonds.',
    rating: 4.5,
    servings: 2,
    ingredients: [
      { name: 'Steel-cut oats', quantity: '1 cup' },
      { name: 'Coconut milk', quantity: '1 cup' },
      { name: 'Turmeric', quantity: '1 tsp' },
      { name: 'Cinnamon', quantity: '½ tsp' },
      { name: 'Toasted almonds', quantity: '¼ cup' },
    ],
    steps: [
      'Combine oats, coconut milk, turmeric, and cinnamon in a saucepan.',
      'Simmer over medium-low heat, stirring occasionally, for 10 minutes.',
      'Remove from heat once thick and creamy.',
      'Top with toasted almonds before serving.',
    ],
  },
  {
    id: 'avocado-toast-supreme',
    title: 'Avocado Toast Supreme',
    category: 'breakfast',
    minutes: 10,
    tags: ['Under 30 Min'],
    isNew: true,
    subtitle: 'Under 30 Min • 10 min',
    description:
      'Sourdough toast piled high with smashed avocado, chili flakes, pickled radish, and a squeeze of lime.',
    rating: 4.6,
    servings: 1,
    ingredients: [
      { name: 'Sourdough bread', quantity: '2 slices' },
      { name: 'Avocado', quantity: '1 whole' },
      { name: 'Radish', quantity: '2 whole' },
      { name: 'Chili flakes', quantity: '½ tsp' },
      { name: 'Lime', quantity: '1 whole' },
    ],
    steps: [
      'Toast the sourdough slices until golden and crisp.',
      'Mash the avocado with a pinch of salt and a squeeze of lime.',
      'Spread the mashed avocado over the toast.',
      'Top with sliced radish and chili flakes.',
    ],
  },
  {
    id: 'mediterranean-couscous-salad',
    title: 'Mediterranean Couscous Salad',
    category: 'lunch',
    minutes: 20,
    tags: ['Under 30 Min'],
    subtitle: 'Under 30 Min • 20 min',
    description:
      'Fluffy couscous tossed with cucumber, cherry tomatoes, olives, and feta in a bright lemon-oregano dressing.',
    rating: 4.4,
    servings: 3,
    ingredients: [
      { name: 'Couscous', quantity: '1 cup' },
      { name: 'Cucumber', quantity: '1 whole' },
      { name: 'Cherry tomatoes', quantity: '1 cup' },
      { name: 'Kalamata olives', quantity: '½ cup' },
      { name: 'Feta cheese', quantity: '½ cup' },
    ],
    steps: [
      'Prepare couscous according to package instructions and fluff with a fork.',
      'Dice the cucumber and halve the cherry tomatoes.',
      'Whisk together lemon juice, olive oil, and oregano.',
      'Toss couscous with vegetables, olives, and feta, then finish with the dressing.',
    ],
  },
  {
    id: 'stuffed-bell-peppers',
    title: 'Stuffed Bell Peppers',
    category: 'dinner',
    minutes: 45,
    tags: ['Gluten Free', 'Meal Prep'],
    subtitle: 'Meal Prep • 45 min',
    description:
      'Bell peppers stuffed with a savory mix of rice, black beans, corn, and spices, baked until tender.',
    rating: 4.7,
    servings: 4,
    ingredients: [
      { name: 'Bell peppers', quantity: '4 whole' },
      { name: 'Cooked rice', quantity: '2 cups' },
      { name: 'Black beans', quantity: '1 can' },
      { name: 'Corn kernels', quantity: '1 cup' },
      { name: 'Shredded cheese', quantity: '½ cup' },
    ],
    steps: [
      'Preheat oven to 375°F and slice the tops off the bell peppers.',
      'Mix cooked rice, black beans, corn, and spices in a bowl.',
      'Stuff each pepper with the rice mixture and place upright in a baking dish.',
      'Top with shredded cheese and bake for 30 minutes, until peppers are tender.',
    ],
  },
  {
    id: 'mushroom-risotto',
    title: 'Wild Mushroom Risotto',
    category: 'dinner',
    minutes: 40,
    tags: [],
    subtitle: 'Creamy & Rich • 40 min',
    description:
      'Slow-stirred arborio rice with wild mushrooms, white wine, and parmesan for a comforting, restaurant-style dinner.',
    rating: 4.8,
    servings: 3,
    ingredients: [
      { name: 'Arborio rice', quantity: '1½ cups' },
      { name: 'Mixed mushrooms', quantity: '10 oz' },
      { name: 'Vegetable broth', quantity: '4 cups' },
      { name: 'White wine', quantity: '½ cup' },
      { name: 'Parmesan cheese', quantity: '½ cup' },
    ],
    steps: [
      'Sauté mushrooms in butter until golden, then set aside.',
      'Toast arborio rice in the same pan for 1-2 minutes.',
      'Deglaze with white wine and let it absorb.',
      'Add warm broth one ladle at a time, stirring until each is absorbed.',
      'Stir in the mushrooms and parmesan once the rice is creamy and tender.',
    ],
  },
  {
    id: 'trail-mix-energy-bites',
    title: 'Trail Mix Energy Bites',
    category: 'snack',
    minutes: 15,
    tags: ['Under 30 Min', 'Gluten Free'],
    subtitle: 'Gluten Free • 15 min',
    description:
      'No-bake oat and date bites rolled with peanut butter, chia seeds, and dark chocolate chips.',
    rating: 4.5,
    servings: 6,
    ingredients: [
      { name: 'Rolled oats', quantity: '1 cup' },
      { name: 'Pitted dates', quantity: '10 whole' },
      { name: 'Peanut butter', quantity: '½ cup' },
      { name: 'Chia seeds', quantity: '2 tbsp' },
      { name: 'Dark chocolate chips', quantity: '¼ cup' },
    ],
    steps: [
      'Pulse oats and dates in a food processor until finely chopped.',
      'Add peanut butter and chia seeds, and pulse until a sticky dough forms.',
      'Fold in the chocolate chips by hand.',
      'Roll into bite-sized balls and chill for 30 minutes before serving.',
    ],
  },
  {
    id: 'baked-apple-crumble',
    title: 'Baked Apple Crumble',
    category: 'dessert',
    minutes: 35,
    tags: [],
    subtitle: 'Warm & Cozy • 35 min',
    description:
      'Cinnamon-spiced baked apples under a golden oat crumble topping, best served warm with a scoop of ice cream.',
    rating: 4.6,
    servings: 4,
    ingredients: [
      { name: 'Apples', quantity: '5 whole' },
      { name: 'Rolled oats', quantity: '1 cup' },
      { name: 'Brown sugar', quantity: '½ cup' },
      { name: 'Cinnamon', quantity: '1 tsp' },
      { name: 'Butter', quantity: '4 tbsp' },
    ],
    steps: [
      'Preheat oven to 350°F and slice the apples.',
      'Toss apples with cinnamon and half the brown sugar, then spread in a baking dish.',
      'Mix oats, remaining brown sugar, and butter into a crumble topping.',
      'Scatter the crumble over the apples and bake for 35 minutes, until golden.',
    ],
  },
  {
    id: 'savory-veggie-egg-muffins',
    title: 'Savory Veggie Egg Muffins',
    category: 'breakfast',
    minutes: 25,
    tags: ['High Protein', 'Meal Prep'],
    isNew: true,
    subtitle: 'High in Protein • 25 min',
    description:
      'Fluffy baked egg muffins loaded with bell pepper, spinach, and cheddar — a grab-and-go breakfast for the week.',
    rating: 4.6,
    servings: 4,
    ingredients: [
      { name: 'Eggs', quantity: '8 whole' },
      { name: 'Bell pepper', quantity: '1 whole' },
      { name: 'Baby spinach', quantity: '1 cup' },
      { name: 'Shredded cheddar', quantity: '½ cup' },
      { name: 'Milk', quantity: '¼ cup' },
    ],
    steps: [
      'Preheat oven to 375°F and grease a muffin tin.',
      'Whisk eggs with milk, salt, and pepper.',
      'Divide diced bell pepper, spinach, and cheddar evenly among the cups.',
      'Pour the egg mixture over the vegetables, filling each cup ¾ full.',
      'Bake for 18-20 minutes, until set and lightly golden.',
    ],
  },
  {
    id: 'greek-yogurt-berry-parfait',
    title: 'Greek Yogurt Berry Parfait',
    category: 'breakfast',
    minutes: 8,
    tags: ['High Protein', 'Under 30 Min'],
    subtitle: 'Under 30 Min • 8 min',
    description:
      'Layers of thick Greek yogurt, mixed berries, and honeyed granola for a fast, protein-packed morning.',
    rating: 4.5,
    servings: 1,
    ingredients: [
      { name: 'Greek yogurt', quantity: '1 cup' },
      { name: 'Mixed berries', quantity: '¾ cup' },
      { name: 'Granola', quantity: '¼ cup' },
      { name: 'Honey', quantity: '1 tbsp' },
    ],
    steps: [
      'Spoon a layer of yogurt into a glass.',
      'Add a layer of mixed berries, then a layer of granola.',
      'Repeat the layers until the glass is full.',
      'Drizzle with honey before serving.',
    ],
  },
  {
    id: 'banana-oat-pancakes',
    title: 'Banana Oat Pancakes',
    category: 'breakfast',
    minutes: 20,
    tags: ['Gluten Free', 'Under 30 Min'],
    subtitle: 'Gluten Free • 20 min',
    description:
      'Blender pancakes made from ripe banana and rolled oats, naturally sweet and gluten free.',
    rating: 4.4,
    servings: 2,
    ingredients: [
      { name: 'Ripe bananas', quantity: '2 whole' },
      { name: 'Gluten-free rolled oats', quantity: '1 cup' },
      { name: 'Eggs', quantity: '2 whole' },
      { name: 'Baking powder', quantity: '1 tsp' },
      { name: 'Cinnamon', quantity: '½ tsp' },
    ],
    steps: [
      'Blend bananas, oats, eggs, baking powder, and cinnamon until smooth.',
      'Let the batter rest for 5 minutes to thicken.',
      'Pour small rounds onto a lightly greased hot skillet.',
      'Cook until bubbles form on top, then flip and cook another minute.',
    ],
  },
  {
    id: 'crispy-tofu-buddha-bowl',
    title: 'Crispy Tofu Buddha Bowl',
    category: 'lunch',
    minutes: 35,
    tags: ['High Protein', 'Gluten Free'],
    isNew: true,
    subtitle: 'High in Protein • 35 min',
    description:
      'Pan-crisped tofu over brown rice with shredded carrot, edamame, and a creamy peanut-lime dressing.',
    rating: 4.7,
    servings: 2,
    ingredients: [
      { name: 'Firm tofu', quantity: '14 oz' },
      { name: 'Brown rice', quantity: '1 cup' },
      { name: 'Edamame', quantity: '1 cup' },
      { name: 'Shredded carrot', quantity: '1 cup' },
      { name: 'Peanut butter', quantity: '2 tbsp' },
      { name: 'Lime', quantity: '1 whole' },
    ],
    steps: [
      'Press tofu to remove excess water, then cube it.',
      'Pan-fry tofu cubes until golden and crisp on all sides.',
      'Cook brown rice according to package instructions.',
      'Whisk peanut butter, lime juice, and a splash of water into a dressing.',
      'Assemble bowls with rice, tofu, edamame, and carrot, then drizzle with dressing.',
    ],
  },
  {
    id: 'white-bean-tuscan-soup',
    title: 'White Bean Tuscan Soup',
    category: 'lunch',
    minutes: 30,
    tags: ['Meal Prep', 'Gluten Free'],
    subtitle: 'Meal Prep • 30 min',
    description:
      'A hearty vegetable soup with white beans, kale, and rosemary that tastes even better the next day.',
    rating: 4.6,
    servings: 4,
    ingredients: [
      { name: 'Cannellini beans', quantity: '2 cans' },
      { name: 'Kale', quantity: '3 cups' },
      { name: 'Carrots', quantity: '2 whole' },
      { name: 'Celery', quantity: '2 stalks' },
      { name: 'Vegetable broth', quantity: '4 cups' },
      { name: 'Rosemary', quantity: '1 sprig' },
    ],
    steps: [
      'Sauté diced carrots and celery in olive oil until softened.',
      'Add broth, beans, and rosemary, then bring to a simmer.',
      'Simmer for 15 minutes to let the flavors combine.',
      'Stir in kale and cook until wilted.',
      'Season with salt and pepper before serving.',
    ],
  },
  {
    id: 'caprese-quinoa-salad',
    title: 'Caprese Quinoa Salad',
    category: 'lunch',
    minutes: 20,
    tags: ['Under 30 Min', 'Gluten Free'],
    subtitle: 'Under 30 Min • 20 min',
    description:
      'Fluffy quinoa tossed with cherry tomatoes, fresh mozzarella, basil, and a balsamic drizzle.',
    rating: 4.5,
    servings: 3,
    ingredients: [
      { name: 'Quinoa', quantity: '1 cup' },
      { name: 'Cherry tomatoes', quantity: '1½ cups' },
      { name: 'Fresh mozzarella', quantity: '1 cup' },
      { name: 'Basil leaves', quantity: '¼ cup' },
      { name: 'Balsamic glaze', quantity: '2 tbsp' },
    ],
    steps: [
      'Cook quinoa according to package instructions and let cool.',
      'Halve the cherry tomatoes and tear the mozzarella into pieces.',
      'Toss quinoa with tomatoes, mozzarella, and torn basil.',
      'Drizzle with balsamic glaze and a pinch of salt before serving.',
    ],
  },
  {
    id: 'black-bean-sweet-potato-enchiladas',
    title: 'Black Bean Sweet Potato Enchiladas',
    category: 'dinner',
    minutes: 50,
    tags: ['Meal Prep'],
    subtitle: 'Meal Prep • 50 min',
    description:
      'Corn tortillas rolled with black beans, roasted sweet potato, and cheese, baked under red enchilada sauce.',
    rating: 4.7,
    servings: 4,
    ingredients: [
      { name: 'Corn tortillas', quantity: '10 whole' },
      { name: 'Black beans', quantity: '1 can' },
      { name: 'Sweet potato', quantity: '2 whole' },
      { name: 'Enchilada sauce', quantity: '2 cups' },
      { name: 'Shredded cheese', quantity: '1 cup' },
    ],
    steps: [
      'Preheat oven to 400°F and roast diced sweet potato until tender, about 20 minutes.',
      'Mix roasted sweet potato with black beans and a splash of enchilada sauce.',
      'Fill tortillas with the mixture, roll, and place seam-side down in a baking dish.',
      'Pour remaining sauce over the top and sprinkle with cheese.',
      'Bake for 20 minutes, until bubbling and golden.',
    ],
  },
  {
    id: 'lentil-shepherds-pie',
    title: "Lentil Shepherd's Pie",
    category: 'dinner',
    minutes: 55,
    tags: ['High Protein', 'Meal Prep'],
    subtitle: 'High in Protein • 55 min',
    description:
      'A comforting bake of savory lentils and vegetables under a layer of creamy mashed potatoes.',
    rating: 4.6,
    servings: 4,
    ingredients: [
      { name: 'Brown lentils', quantity: '1½ cups' },
      { name: 'Russet potatoes', quantity: '4 whole' },
      { name: 'Carrots', quantity: '2 whole' },
      { name: 'Frozen peas', quantity: '1 cup' },
      { name: 'Vegetable broth', quantity: '2 cups' },
      { name: 'Butter', quantity: '3 tbsp' },
    ],
    steps: [
      'Boil potatoes until tender, then mash with butter and a splash of milk.',
      'Simmer lentils, diced carrots, and broth until the lentils are tender.',
      'Stir peas into the lentil mixture and season well.',
      'Spread the lentil mixture in a baking dish and top with mashed potatoes.',
      'Bake at 400°F for 20 minutes, until the top is golden.',
    ],
  },
  {
    id: 'sesame-ginger-veggie-stir-fry',
    title: 'Sesame Ginger Veggie Stir-Fry',
    category: 'dinner',
    minutes: 25,
    tags: ['Under 30 Min', 'Gluten Free'],
    subtitle: 'Under 30 Min • 25 min',
    description:
      'A fast weeknight stir-fry of broccoli, snap peas, and mushrooms in a glossy sesame-ginger sauce.',
    rating: 4.5,
    servings: 3,
    ingredients: [
      { name: 'Broccoli florets', quantity: '2 cups' },
      { name: 'Snap peas', quantity: '1 cup' },
      { name: 'Mushrooms', quantity: '1 cup' },
      { name: 'Tamari', quantity: '3 tbsp' },
      { name: 'Fresh ginger', quantity: '1 tbsp' },
      { name: 'Sesame oil', quantity: '1 tbsp' },
    ],
    steps: [
      'Heat sesame oil in a wok or large skillet over high heat.',
      'Add broccoli and mushrooms, stir-frying for 3-4 minutes.',
      'Add snap peas and grated ginger, cooking for another 2 minutes.',
      'Pour in tamari and toss until everything is glossy and coated.',
      'Serve hot over rice or noodles.',
    ],
  },
  {
    id: 'crispy-baked-chickpeas',
    title: 'Crispy Baked Chickpeas',
    category: 'snack',
    minutes: 35,
    tags: ['High Protein', 'Gluten Free'],
    subtitle: 'High in Protein • 35 min',
    description:
      'Oven-roasted chickpeas tossed in smoked paprika and garlic powder until golden and crunchy.',
    rating: 4.4,
    servings: 4,
    ingredients: [
      { name: 'Chickpeas', quantity: '2 cans' },
      { name: 'Olive oil', quantity: '2 tbsp' },
      { name: 'Smoked paprika', quantity: '1 tsp' },
      { name: 'Garlic powder', quantity: '1 tsp' },
    ],
    steps: [
      'Preheat oven to 400°F and pat chickpeas dry.',
      'Toss chickpeas with olive oil, paprika, garlic powder, and salt.',
      'Spread in a single layer on a baking sheet.',
      'Roast for 25-30 minutes, shaking the pan halfway through, until crisp.',
    ],
  },
  {
    id: 'cucumber-hummus-bites',
    title: 'Cucumber Hummus Bites',
    category: 'snack',
    minutes: 10,
    tags: ['Under 30 Min', 'Gluten Free'],
    subtitle: 'Under 30 Min • 10 min',
    description:
      'Cool cucumber rounds topped with hummus, cherry tomato, and a sprinkle of za\'atar.',
    rating: 4.3,
    servings: 4,
    ingredients: [
      { name: 'Cucumber', quantity: '2 whole' },
      { name: 'Hummus', quantity: '½ cup' },
      { name: 'Cherry tomatoes', quantity: '8 whole' },
      { name: "Za'atar", quantity: '1 tsp' },
    ],
    steps: [
      'Slice cucumbers into ½-inch rounds.',
      'Top each round with a small dollop of hummus.',
      'Add a halved cherry tomato to each piece.',
      'Finish with a sprinkle of za\'atar before serving.',
    ],
  },
  {
    id: 'spiced-roasted-almonds',
    title: 'Spiced Roasted Almonds',
    category: 'snack',
    minutes: 20,
    tags: ['Gluten Free', 'Meal Prep'],
    subtitle: 'Meal Prep • 20 min',
    description:
      'Raw almonds roasted with cinnamon, cayenne, and a touch of maple syrup for a sweet-and-spicy snack.',
    rating: 4.5,
    servings: 6,
    ingredients: [
      { name: 'Raw almonds', quantity: '2 cups' },
      { name: 'Maple syrup', quantity: '2 tbsp' },
      { name: 'Cinnamon', quantity: '1 tsp' },
      { name: 'Cayenne pepper', quantity: '¼ tsp' },
    ],
    steps: [
      'Preheat oven to 325°F and line a baking sheet with parchment.',
      'Toss almonds with maple syrup, cinnamon, cayenne, and a pinch of salt.',
      'Spread almonds in a single layer on the baking sheet.',
      'Roast for 12-15 minutes, stirring once, until fragrant.',
      'Let cool completely before storing — they crisp up as they cool.',
    ],
  },
  {
    id: 'dark-chocolate-avocado-mousse',
    title: 'Dark Chocolate Avocado Mousse',
    category: 'dessert',
    minutes: 15,
    tags: ['Gluten Free', 'Under 30 Min'],
    isNew: true,
    subtitle: 'Under 30 Min • 15 min',
    description:
      'A silky, rich chocolate mousse made from ripe avocado and cocoa — no one will guess what\'s in it.',
    rating: 4.5,
    servings: 4,
    ingredients: [
      { name: 'Ripe avocados', quantity: '2 whole' },
      { name: 'Cocoa powder', quantity: '½ cup' },
      { name: 'Maple syrup', quantity: '⅓ cup' },
      { name: 'Almond milk', quantity: '¼ cup' },
      { name: 'Vanilla extract', quantity: '1 tsp' },
    ],
    steps: [
      'Scoop the avocado flesh into a food processor.',
      'Add cocoa powder, maple syrup, almond milk, and vanilla.',
      'Blend until completely smooth, scraping down the sides as needed.',
      'Chill for at least 30 minutes before serving.',
    ],
  },
  {
    id: 'peanut-butter-oat-bars',
    title: 'Peanut Butter Oat Bars',
    category: 'dessert',
    minutes: 25,
    tags: ['High Protein', 'Meal Prep'],
    subtitle: 'High in Protein • 25 min',
    description:
      'No-bake oat bars swirled with peanut butter and a dark chocolate drizzle, perfect for the week ahead.',
    rating: 4.6,
    servings: 8,
    ingredients: [
      { name: 'Rolled oats', quantity: '2 cups' },
      { name: 'Peanut butter', quantity: '¾ cup' },
      { name: 'Honey', quantity: '½ cup' },
      { name: 'Dark chocolate', quantity: '⅓ cup' },
    ],
    steps: [
      'Warm peanut butter and honey together until smooth.',
      'Stir in the oats until fully coated.',
      'Press the mixture firmly into a lined baking pan.',
      'Melt dark chocolate and drizzle over the top.',
      'Chill for at least an hour, then slice into bars.',
    ],
  },
  {
    id: 'lemon-ricotta-cake',
    title: 'Lemon Ricotta Cake',
    category: 'dessert',
    minutes: 60,
    tags: [],
    subtitle: 'Bright & Zesty • 60 min',
    description:
      'A tender, moist cake made with ricotta cheese and fresh lemon zest, finished with a light glaze.',
    rating: 4.7,
    servings: 8,
    ingredients: [
      { name: 'Ricotta cheese', quantity: '1 cup' },
      { name: 'Flour', quantity: '1½ cups' },
      { name: 'Sugar', quantity: '1 cup' },
      { name: 'Eggs', quantity: '3 whole' },
      { name: 'Lemon', quantity: '2 whole' },
    ],
    steps: [
      'Preheat oven to 350°F and grease a cake pan.',
      'Beat ricotta, sugar, eggs, and lemon zest until light and fluffy.',
      'Fold in the flour until just combined.',
      'Pour into the pan and bake for 45-50 minutes, until a toothpick comes out clean.',
      'Whisk lemon juice with a little powdered sugar and drizzle over the cooled cake.',
    ],
  },
];

// Today's Recommendation currently just points at one fixed recipe.
// This is the seam where real personalization logic will plug in later.
export const todaysRecommendation = recipes[0];
