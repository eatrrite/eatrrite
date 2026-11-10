import { GOLD, HandIcon, RED, type IconProps } from "@/components/svg/HandIcon";

// Hand-drawn icons for the "Read" cards (Mukta's articles and interviews), one per topic.

/** All articles, or any article without its own icon: a newspaper with a pen. */
export function NewspaperIcon({ className }: IconProps) {
  return (
    <HandIcon className={className}>
      <path d="M14.2 8.6h20.6c1.2 0 2 .8 2 2v6.4" strokeOpacity={0.5} />
      <path d="M9.5 13.8c0-1.2.9-2 2.1-2h20.6c1.1 0 2 .9 2 2v24.6c0 1.2-.9 2-2 2H11.6c-1.2 0-2.1-.8-2.1-2z" fill="#fff" />
      <path d="M13.5 16.5h9.5v6.2h-9.5z" fill={GOLD} fillOpacity={0.5} stroke="none" />
      <path d="M26.5 17.1h4.3M26.5 21.5h4.3M13.5 27.2h17.2M13.5 31.6h17M13.5 36h10.5" />
      <path d="M42.8 23.4l-2.5-1.8-10.3 15.1.1 3 2.4-1.3z" fill={GOLD} fillOpacity={0.6} />
    </HandIcon>
  );
}

/** "Paint Your Plate Red": a plate with a tomato and red seeds. */
export function PlateIcon({ className }: IconProps) {
  return (
    <HandIcon className={className}>
      <path d="M40 26c0 8.3-7.2 14.6-16 14.5-8.8 0-15.9-6.4-15.8-14.6.1-8.1 7.2-14.4 16-14.4 8.6 0 15.8 6.3 15.8 14.5z" />
      <path d="M34.5 26c0 5.3-4.7 9.3-10.5 9.3S13.5 31.3 13.5 26s4.7-9.3 10.5-9.3 10.5 4 10.5 9.3z" strokeOpacity={0.45} />
      <path d="M29.6 27.4c0 3.2-2.5 5.4-5.6 5.4-3.2 0-5.7-2.2-5.6-5.5.1-3 2.6-5.3 5.7-5.3 3 0 5.5 2.3 5.5 5.4z" fill={RED} fillOpacity={0.85} />
      <path d="M21.6 22.4c1 .6 1.7.6 2.4-.2.6.8 1.4.9 2.4.2M24 22.2c0-1.3.3-2.1 1-2.7" strokeWidth={1.6} />
      <circle cx="16.8" cy="23.4" r="1.4" fill={RED} stroke="none" />
      <circle cx="31" cy="31.2" r="1.4" fill={RED} stroke="none" />
      <circle cx="30.6" cy="21.2" r="1.1" fill={RED} stroke="none" />
    </HandIcon>
  );
}

/** "'Spicy' Indians": a chilli with heat rising. */
export function ChilliIcon({ className }: IconProps) {
  return (
    <HandIcon className={className}>
      <path d="M14.5 15.5c-3.3 4.6-3.6 12.4 1.6 18.7 4.6 5.6 13.1 8.9 21.6 7.4 1.3-.2 1.2-1.6.1-1.8-6.4-1.3-11.5-5.2-14.3-10.3-2.3-4.3-2.6-9.3-1.4-13.2.8-2.6-5.3-4.4-7.6-.8z" fill={RED} fillOpacity={0.85} />
      <path d="M15.2 14.9c.6-2.3 2.4-3.6 4.6-3.6 1.5 0 2.7.8 3 2.2M19.4 11.3c-.4-2.5.6-4.6 3.2-5.6" />
      <path d="M15.9 21.4c-.4 2.6.3 5.3 1.7 7.5" stroke="#fff" strokeOpacity={0.85} strokeWidth={1.6} />
      <path d="M30.6 15.6c1.2-1.4 1.2-3 0-4.4M35.4 18.6c1.2-1.4 1.2-3 0-4.4M39.6 22.4c1.2-1.4 1.2-3 0-4.4" stroke={GOLD} strokeWidth={2.2} />
    </HandIcon>
  );
}

/** "Strong Women, Strong Health": the female sign with a heart inside. */
export function WomanHealthIcon({ className }: IconProps) {
  return (
    <HandIcon className={className}>
      <path d="M33.4 18.2c0 5.3-4.2 9.4-9.4 9.4-5.3 0-9.5-4.2-9.4-9.5.1-5.1 4.3-9.3 9.5-9.3 5.1 0 9.3 4.2 9.3 9.4z" />
      <path d="M24 22.6s-5.2-3.1-5.2-6.6c0-1.8 1.4-3.1 3.1-3.1 1 0 1.7.5 2.1 1.1.4-.6 1.1-1.1 2.1-1.1 1.7 0 3.1 1.3 3.1 3.1 0 3.5-5.2 6.6-5.2 6.6z" fill={GOLD} />
      <path d="M24 27.8c.2 4.3-.1 8.6.1 12.8M18.4 34.4c3.8-.3 7.5-.3 11.3 0" />
    </HandIcon>
  );
}

/** "The Science of Yoga": a meditating figure with an atom beside it. */
export function YogaScienceIcon({ className }: IconProps) {
  return (
    <HandIcon className={className}>
      <ellipse cx="37.6" cy="10.4" rx="6.6" ry="2.6" transform="rotate(-30 37.6 10.4)" strokeWidth={1.5} strokeOpacity={0.7} />
      <ellipse cx="37.6" cy="10.4" rx="6.6" ry="2.6" transform="rotate(30 37.6 10.4)" strokeWidth={1.5} strokeOpacity={0.7} />
      <circle cx="37.6" cy="10.4" r="1.6" fill={GOLD} stroke="none" />
      <circle cx="21" cy="15.4" r="3.4" fill={GOLD} />
      <path d="M20.8 19.6c-.4 4.4-.3 8.2.2 12" />
      <path d="M20.9 22.6c-3.6.6-6.6 3.4-8.2 7.4l2.6.6M20.9 22.6c3.6.6 6.6 3.4 8.2 7.4l-2.6.6" />
      <path d="M6.8 38.8c4.4-3.8 9-5.2 14.2-5.2s9.8 1.4 14.2 5.2c-4.6 1.8-9.3 2.6-14.2 2.6s-9.6-.8-14.2-2.6z" fill={GOLD} fillOpacity={0.35} />
    </HandIcon>
  );
}

/** "Listen. Hear. Understand & Live!": an ear with sound waves. */
export function EarIcon({ className }: IconProps) {
  return (
    <HandIcon className={className}>
      <path d="M15.6 20.5c0-6 4.6-10.5 10.2-10.5 5.4 0 9.6 4.2 9.6 9.7 0 4.2-2.4 6.4-4.6 8.2-2 1.6-2.6 2.9-2.9 5.1-.4 3.3-2.7 5.5-5.8 5.5-2.7 0-4.8-1.6-5.5-4" />
      <path d="M21 20.6c0-2.9 2.2-5.1 4.9-5.1 2.6 0 4.7 2 4.7 4.8 0 2-1.3 3-2.6 3.8M25.9 21.6c-1.3.3-2 1.4-1.8 2.8" />
      <path d="M39.6 16.6c1.8 2.6 1.8 6.4 0 9M43.6 13.4c3.1 4.6 3.1 10.6 0 15.2" stroke={GOLD} strokeWidth={2.4} />
    </HandIcon>
  );
}
