import { Recipe } from './recipes';

// The pool the Add tab's meal generator draws from. Stands in for a real
// AI/recommendation backend — swap this out for an API call later without
// touching the screen that consumes it.
export const recipeSuggestions: Recipe[] = [
  {
    id: 'overnight-oats-berry',
    title: 'Overnight Berry Oats',
    category: 'breakfast',
    minutes: 10,
    tags: ['Under 30 Min', 'Gluten Free'],
    subtitle: 'Gluten Free • 10 min',
    description:
      'Creamy rolled oats soaked overnight with almond milk, chia seeds, and a mixed berry compote. No cooking required.',
    rating: 4.6,
    servings: 2,
    ingredients: [
      { name: 'Rolled oats', quantity: '1 cup' },
      { name: 'Almond milk', quantity: '1 cup' },
      { name: 'Chia seeds', quantity: '2 tbsp' },
      { name: 'Mixed berries', quantity: '1 cup' },
      { name: 'Maple syrup', quantity: '1 tbsp' },
    ],
    steps: [
      'Stir oats, almond milk, chia seeds, and maple syrup together in a jar.',
      'Cover and refrigerate overnight, or at least 4 hours.',
      'Top with mixed berries before serving.',
    ],
  },
  {
    id: 'peanut-tofu-noodles',
    title: 'Peanut Tofu Noodles',
    category: 'dinner',
    minutes: 25,
    tags: ['High Protein', 'Under 30 Min'],
    subtitle: 'High in Protein • 25 min',
    description:
      'Crispy pan-fried tofu tossed with rice noodles in a spicy peanut-ginger sauce, topped with scallions and crushed peanuts.',
    rating: 4.7,
    servings: 3,
    ingredients: [
      { name: 'Firm tofu', quantity: '14 oz' },
      { name: 'Rice noodles', quantity: '8 oz' },
      { name: 'Peanut butter', quantity: '3 tbsp' },
      { name: 'Soy sauce', quantity: '2 tbsp' },
      { name: 'Scallions', quantity: '2 stalks' },
    ],
    steps: [
      'Press the tofu, cube it, and pan-fry until crispy on all sides.',
      'Cook the rice noodles according to package instructions.',
      'Whisk peanut butter, soy sauce, and a splash of water into a sauce.',
      'Toss the noodles and tofu with the sauce, then top with scallions and peanuts.',
    ],
  },
  {
    id: 'roasted-veggie-quinoa-prep',
    title: 'Roasted Veggie Quinoa Prep',
    category: 'lunch',
    minutes: 40,
    tags: ['Meal Prep', 'Gluten Free'],
    subtitle: 'Meal Prep • 40 min',
    description:
      'A big batch of quinoa with roasted seasonal vegetables and a lemon-herb dressing — portions out into five lunches for the week.',
    rating: 4.5,
    servings: 5,
    ingredients: [
      { name: 'Quinoa', quantity: '2 cups' },
      { name: 'Zucchini', quantity: '2 whole' },
      { name: 'Bell peppers', quantity: '2 whole' },
      { name: 'Red onion', quantity: '1 whole' },
      { name: 'Olive oil', quantity: '3 tbsp' },
    ],
    steps: [
      'Cook quinoa according to package instructions.',
      'Chop zucchini, bell peppers, and red onion into bite-sized pieces.',
      'Toss vegetables with olive oil and roast at 425°F for 20 minutes.',
      'Combine quinoa and roasted vegetables, then portion into containers.',
    ],
  },
  {
    id: 'black-bean-tacos',
    title: 'Smoky Black Bean Tacos',
    category: 'dinner',
    minutes: 20,
    tags: ['Under 30 Min', 'High Protein'],
    subtitle: 'High in Protein • 20 min',
    description:
      'Smoky spiced black beans piled into warm corn tortillas with avocado, pickled onion, and lime crema.',
    rating: 4.8,
    servings: 3,
    ingredients: [
      { name: 'Black beans', quantity: '2 cans' },
      { name: 'Corn tortillas', quantity: '9 small' },
      { name: 'Avocado', quantity: '1 whole' },
      { name: 'Red onion', quantity: '½ whole' },
      { name: 'Lime', quantity: '2 whole' },
    ],
    steps: [
      'Simmer black beans with smoked paprika and cumin until warmed through.',
      'Warm the corn tortillas on a dry skillet.',
      'Pickle the red onion in lime juice while the beans cook.',
      'Assemble tacos with beans, avocado, pickled onion, and a squeeze of lime.',
    ],
  },
  {
    id: 'green-protein-smoothie',
    title: 'Green Protein Smoothie',
    category: 'snack',
    minutes: 5,
    tags: ['High Protein', 'Under 30 Min', 'Gluten Free'],
    subtitle: 'High in Protein • 5 min',
    description:
      'Spinach, banana, plant protein, and almond butter blended into a quick, filling smoothie.',
    rating: 4.4,
    servings: 1,
    ingredients: [
      { name: 'Spinach', quantity: '2 cups' },
      { name: 'Banana', quantity: '1 whole' },
      { name: 'Plant protein powder', quantity: '1 scoop' },
      { name: 'Almond butter', quantity: '1 tbsp' },
      { name: 'Almond milk', quantity: '1 cup' },
    ],
    steps: [
      'Add all ingredients to a blender.',
      'Blend on high until smooth and creamy.',
      'Pour into a glass and serve immediately.',
    ],
  },
  {
    id: 'chocolate-avocado-mousse',
    title: 'Chocolate Avocado Mousse',
    category: 'dessert',
    minutes: 15,
    tags: ['Gluten Free', 'Under 30 Min'],
    subtitle: 'Gluten Free • 15 min',
    description:
      'Ripe avocado blended with cocoa and dates into a rich, silky mousse — no dairy, no refined sugar.',
    rating: 4.3,
    servings: 4,
    ingredients: [
      { name: 'Ripe avocados', quantity: '2 whole' },
      { name: 'Cocoa powder', quantity: '¼ cup' },
      { name: 'Pitted dates', quantity: '4 whole' },
      { name: 'Almond milk', quantity: '¼ cup' },
      { name: 'Vanilla extract', quantity: '1 tsp' },
    ],
    steps: [
      'Add avocado, cocoa powder, dates, almond milk, and vanilla to a food processor.',
      'Blend until completely smooth, scraping down the sides as needed.',
      'Chill for at least 30 minutes before serving.',
    ],
  },
];
