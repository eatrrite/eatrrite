import { GOLD, HandIcon, type IconProps } from "@/components/svg/HandIcon";

// Hand-drawn icons for the "Highlights" tiles on About (Credentials & Media).

/** "Since 2018": a calendar with a sprout growing from it, years of growth. */
export function SinceIcon({ className }: IconProps) {
  return (
    <HandIcon className={className}>
      <path d="M10.2 14.4c0-1.4 1.1-2.5 2.6-2.5h22.7c1.4 0 2.5 1.1 2.5 2.5V19H10.2z" fill={GOLD} fillOpacity={0.35} stroke="none" />
      <path d="M10 14.5c0-1.6 1.2-2.6 2.8-2.6h22.6c1.5 0 2.7 1.1 2.7 2.7v21.8c0 1.6-1.2 2.7-2.8 2.7H12.7c-1.6 0-2.8-1.1-2.7-2.7z" />
      <path d="M10.3 19.2c9.2-.3 18.4-.2 27.6 0" />
      <path d="M17 8.6v5.6M31 8.6v5.6" />
      <path d="M24 35.6c.2-3.6-.1-7 .1-10.2" />
      <path d="M24 29.4c-3.6.2-6-1.8-6.6-5 3.4-.4 6 1.6 6.6 5z" fill={GOLD} />
      <path d="M24.1 26.6c.4-3.3 2.8-5.2 6.3-5 .1 3.3-2.4 5.3-6.3 5z" fill={GOLD} />
    </HandIcon>
  );
}

/** "Clients in 10+ countries": a globe with map pins. */
export function GlobeIcon({ className }: IconProps) {
  return (
    <HandIcon className={className}>
      <path d="M37 25c0 7.3-5.8 13.2-13 13.1-7.3 0-13.1-5.9-13-13.2.1-7.1 5.9-12.9 13.1-12.9 7.2 0 12.9 5.8 12.9 13z" />
      <path d="M24 12.1c-3.8 3.6-5.6 8-5.5 12.9.1 5 2 9.4 5.5 13M24 12.1c3.6 3.6 5.4 8 5.4 12.9 0 5-1.9 9.4-5.4 13" strokeOpacity={0.6} />
      <path d="M11.4 25c8.4.6 17 .6 25.5 0M13.5 18.5c7 .7 14 .7 21 0M13.6 31.6c7 .6 14 .6 20.9 0" strokeOpacity={0.6} />
      <path d="M14.8 21.6s-4.4-4.7-4.4-7.7a4.4 4.4 0 0 1 8.8 0c0 3-4.4 7.7-4.4 7.7z" fill={GOLD} />
      <circle cx="14.8" cy="13.9" r="1.3" fill="currentColor" stroke="none" />
      <path d="M34 22.4s-3.5-3.7-3.5-6.1a3.5 3.5 0 0 1 7 0c0 2.4-3.5 6.1-3.5 6.1z" fill={GOLD} />
      <path d="M27.6 37s-2.8-2.9-2.8-4.8a2.8 2.8 0 0 1 5.6 0c0 1.9-2.8 4.8-2.8 4.8z" fill={GOLD} />
    </HandIcon>
  );
}

/** "Yoga Alliance RYT-200": a figure in tree pose on a mat. */
export function YogaTreeIcon({ className }: IconProps) {
  return (
    <HandIcon className={className}>
      <circle cx="24" cy="14.2" r="2.8" fill={GOLD} />
      <path d="M20.6 19.8c-3.4-1.6-6-4.2-7.4-7.6 3.2-2.8 7-5.8 10.8-8.8M27.4 19.8c3.4-1.6 6-4.2 7.4-7.6-3.2-2.8-7-5.8-10.8-8.8" />
      <path d="M20.4 19.8c2.4-1 4.8-1 7.2 0" />
      <path d="M24 16.8c-.2 5-.1 9.6-.1 14.2" />
      <path d="M23.9 31c.2 4.2.1 8.2.4 12" />
      <path d="M24 30.6c3.6.4 7.6 2 9.4 4.8.6 1-.1 2-1.3 2-2.9.1-5.8-.7-8-2.2" />
      <path d="M13.6 43.6c6.8-.7 13.9-.7 20.8 0" stroke={GOLD} strokeWidth={2.6} />
    </HandIcon>
  );
}

/** "Global Sustainability Award (SDG-3)": a trophy with a leaf, for health and the planet. */
export function AwardIcon({ className }: IconProps) {
  return (
    <HandIcon className={className}>
      <path d="M15.5 10.5h17c.2 7.7-1.6 13.6-8.5 15.8-6.9-2.2-8.7-8.1-8.5-15.8z" fill={GOLD} fillOpacity={0.35} />
      <path d="M15.6 13.2c-3.4-.4-5.4 1.3-5.2 3.9.2 3 2.9 4.6 6.3 4.6M32.4 13.2c3.4-.4 5.4 1.3 5.2 3.9-.2 3-2.9 4.6-6.3 4.6" />
      <path d="M24 26.4v6" />
      <path d="M17.5 38.5c.4-3.6 2.8-5.9 6.5-6 3.7.1 6.1 2.4 6.5 6z" fill={GOLD} />
      <path d="M14.8 38.7c6.1-.3 12.3-.3 18.4 0" />
      <path d="M24 21.6c-3.6-1.4-5-4.3-3.9-7.6 3.2.2 5.2 2.9 3.9 7.6zM24 21.6c.4-3.8 2.6-5.6 5.6-5.3.4 3-1.8 5-5.6 5.3z" strokeWidth={1.6} />
    </HandIcon>
  );
}
