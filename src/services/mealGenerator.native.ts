import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { z } from 'zod';
import { Recipe, Tag } from '../data/recipes';

const GeneratedRecipeSchema = z.object({
  title: z.string(),
  category: z.enum(['breakfast', 'lunch', 'dinner', 'snack', 'dessert']),
  minutes: z.number().int().positive(),
  tags: z.array(z.enum(['High Protein', 'Under 30 Min', 'Gluten Free', 'Meal Prep'])),
  description: z.string(),
  servings: z.number().int().positive(),
  ingredients: z
    .array(z.object({ name: z.string(), quantity: z.string(), haveAtHome: z.boolean().optional() }))
    .min(1),
  steps: z.array(z.string()).min(1),
});

type GeneratedRecipe = z.infer<typeof GeneratedRecipeSchema>;

const SYSTEM_PROMPT =
  'You are the recipe generation engine behind Verdant, a healthy-eating app. Create one original, appealing, realistically cookable recipe that fits the request. Keep ingredients and steps concise and home-cook friendly.';

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function requireApiKey() {
  const apiKey = process.env.EXPO_PUBLIC_MAX_POWER_KEY;
  if (!apiKey) {
    throw new Error(
      'No Anthropic API key found. Add EXPO_PUBLIC_MAX_POWER_KEY to .env.local and restart the app.'
    );
  }
  return apiKey;
}

function toRecipe(parsed: GeneratedRecipe): Recipe {
  return {
    id: `${slugify(parsed.title)}-${Date.now()}`,
    title: parsed.title,
    category: parsed.category,
    minutes: parsed.minutes,
    tags: parsed.tags,
    isNew: true,
    description: parsed.description,
    servings: parsed.servings,
    ingredients: parsed.ingredients,
    steps: parsed.steps,
  };
}

// Native only — the API key lives in EXPO_PUBLIC_MAX_POWER_KEY (from a
// gitignored .env.local, never committed) and this file is never bundled
// into the public web build (see mealGenerator.web.ts), so the key never
// ships to a page anyone can inspect.
export async function generateMeal(
  promptText: string,
  tags: Tag[],
  _previousId?: string
): Promise<Recipe> {
  const client = new Anthropic({ apiKey: requireApiKey() });

  const requestParts: string[] = [];
  if (promptText.trim()) {
    requestParts.push(`Craving: ${promptText.trim()}`);
  }
  if (tags.length > 0) {
    requestParts.push(`Required tags (include all of these in the tags field): ${tags.join(', ')}`);
  }
  if (requestParts.length === 0) {
    requestParts.push('Surprise me with a healthy recipe idea.');
  }

  const response = await client.messages.parse({
    model: 'claude-opus-5',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: requestParts.join('\n') }],
    output_config: { format: zodOutputFormat(GeneratedRecipeSchema) },
  });

  const parsed = response.parsed_output;
  if (!parsed) {
    throw new Error('The AI response could not be parsed. Try again.');
  }

  return toRecipe(parsed);
}

// "Scan your fridge" — sends a photo to Claude's vision input alongside the
// same structured-output schema as the text-prompt generator, so it can spot
// what's actually on hand and build a recipe around it.
export async function generateMealFromPhoto(base64Image: string, tags: Tag[]): Promise<Recipe> {
  const client = new Anthropic({ apiKey: requireApiKey() });

  const requestParts: string[] = [
    'Identify the food ingredients visible in this photo of a fridge or pantry, then create one recipe that primarily uses them. Assume common staples like oil, salt, pepper, and basic spices are on hand even if not visible.',
    "For every ingredient in the recipe, set haveAtHome to true only if you actually saw it in the photo (including assumed pantry staples) — set it to false for anything the user would need to buy.",
  ];
  if (tags.length > 0) {
    requestParts.push(`Required tags (include all of these in the tags field): ${tags.join(', ')}`);
  }

  const response = await client.messages.parse({
    model: 'claude-opus-5',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64Image } },
          { type: 'text', text: requestParts.join('\n') },
        ],
      },
    ],
    output_config: { format: zodOutputFormat(GeneratedRecipeSchema) },
  });

  const parsed = response.parsed_output;
  if (!parsed) {
    throw new Error('The AI response could not be parsed. Try again.');
  }

  return toRecipe(parsed);
}
