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
];

// Today's Recommendation currently just points at one fixed recipe.
// This is the seam where real personalization logic will plug in later.
export const todaysRecommendation = recipes[0];
