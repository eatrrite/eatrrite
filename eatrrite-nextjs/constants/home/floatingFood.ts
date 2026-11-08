// Faint food icons that drift behind each home section (desktop only), in the
// same spots and opacity as the floating tools on the reference design home page.
export type FoodIcon = "apple" | "carrot" | "salad" | "leaf" | "wheat" | "citrus" | "cherry" | "grape" | "banana" | "sprout";

export type FloatingFoodItem = {
  icon: FoodIcon;
  className: string;
  rotate: number;
  delay?: number;
};

const left = (icon: FoodIcon, top: string, rotate: number): FloatingFoodItem => ({
  icon,
  className: `left-[1.5%] ${top} w-16 xl:w-20`,
  rotate,
});

const right = (icon: FoodIcon, bottom: string, rotate: number): FloatingFoodItem => ({
  icon,
  className: `right-[1.5%] ${bottom} w-16 xl:w-20`,
  rotate,
  delay: 0.5,
});

export const FLOATING_FOOD = {
  programs: [left("salad", "top-[36%]", -18), right("carrot", "bottom-[12%]", 12)],
  about: [left("apple", "top-[28%]", 14), right("leaf", "bottom-[10%]", -18)],
  why: [left("wheat", "top-[30%]", -14), right("citrus", "bottom-[14%]", 16)],
  process: [left("sprout", "top-[34%]", -12), right("cherry", "bottom-[16%]", 14)],
  programGrid: [left("grape", "top-[36%]", -18), right("banana", "bottom-[12%]", 12)],
  faq: [left("leaf", "top-[40%]", -14), right("apple", "bottom-[18%]", 18)],
  blog: [left("citrus", "top-[30%]", 10), right("salad", "bottom-[14%]", -12)],
  testimonials: [left("carrot", "top-[34%]", -12), right("wheat", "bottom-[16%]", 14)],
  cta: [left("sprout", "top-[28%]", 10), right("grape", "bottom-[12%]", -12)],
} satisfies Record<string, FloatingFoodItem[]>;

const PAIRS = Object.values(FLOATING_FOOD);

// Floating icons for inner-page sections, cycling through the home sets.
export const pageFood = (index: number) => PAIRS[index % PAIRS.length];
