import type { ReactNode } from "react";

export type MediaIconName = "camera" | "film" | "clapper" | "edit" | "mic" | "play";

type Props = {
  name: MediaIconName;
  className?: string;
};

export default function MediaIcon({ name, className = "" }: Props) {
  const paths: Record<MediaIconName, ReactNode> = {
    camera: <>
      <path d="M6 16.5h8l3.5-5h13l3.5 5h8v22H6z" />
      <circle cx="24" cy="27.5" r="8" />
      <path d="M35.5 21h2.5" />
    </>,
    film: <>
      <path d="M7 10h25v28H7z" />
      <path d="M32 19l9-5v20l-9-5z" />
      <path d="M12 16h15M12 32h15" />
    </>,
    clapper: <>
      <path d="M7 19h34v22H7z" />
      <path d="M7 19l3-11h34l-3 11z" />
      <path d="M15 8l-3 11M26 8l-3 11M37 8l-3 11" />
      <path d="M16 27h16M16 33h10" />
    </>,
    edit: <>
      <circle cx="12" cy="13" r="5" />
      <circle cx="12" cy="35" r="5" />
      <path d="M16 16l25 19M16 32l25-19" />
      <path d="M31 27l10 8M31 21l10-8" />
    </>,
    mic: <>
      <rect x="17" y="6" width="14" height="25" rx="7" />
      <path d="M11 25a13 13 0 0026 0M24 38v6M17 44h14" />
    </>,
    play: <>
      <path d="M12 7l29 17-29 17z" />
      <path d="M7 7v34" />
    </>,
  };

  return (
    <svg
      className={`media-icon ${className}`.trim()}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
