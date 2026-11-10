"use client";

import { m } from "framer-motion";
import { Apple, Banana, Carrot, Cherry, Citrus, Grape, Leaf, Salad, Sprout, Wheat } from "lucide-react";
import { cn } from "cn";
import type { FloatingFoodItem, FoodIcon } from "@/constants/home/floatingFood";

const ICONS: Record<FoodIcon, typeof Apple> = {
  apple: Apple,
  banana: Banana,
  carrot: Carrot,
  cherry: Cherry,
  citrus: Citrus,
  grape: Grape,
  leaf: Leaf,
  salad: Salad,
  sprout: Sprout,
  wheat: Wheat,
};

// Copies FloatingTools from reference design: slow drift and tilt, desktop only.
export function FloatingFood({ items }: { items: FloatingFoodItem[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block">
      {items.map((item, index) => {
        const Icon = ICONS[item.icon];
        return (
          <m.div
            key={`${item.icon}-${index}`}
            className={cn("absolute text-primary opacity-[0.18]", item.className)}
            animate={{ y: [0, -14, 0], x: [0, 6, 0], rotate: [item.rotate - 2, item.rotate + 2.5, item.rotate - 2] }}
            transition={{ duration: 8.5 + index * 0.5, delay: item.delay ?? 0, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon strokeWidth={1.2} className="h-auto w-full" />
          </m.div>
        );
      })}
    </div>
  );
}
