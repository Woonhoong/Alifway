"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type Stop = { offset: number; color: string };

const VIEWBOX_WIDTH = 1271;
const VIEWBOX_HEIGHT = 599;

const ALIFWAY_STOPS: Stop[] = [
  { offset: 0, color: "#120D20" },
  { offset: 0.17, color: "#38204F" },
  { offset: 0.34, color: "#6A3C88" },
  { offset: 0.51, color: "#A56CC4" },
  { offset: 0.67, color: "#D7B7EB" },
  { offset: 0.82, color: "#F4E9FA" },
  { offset: 1, color: "#F4E9FA00" },
];

function bellHeights(n: number, peak: number, valley: number): number[] {
  const out: number[] = [];
  const mid = (n - 1) / 2;

  for (let i = 0; i < n; i += 1) {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid;
    const eased = 1 - Math.pow(t, 1.24);
    out.push(peak * VIEWBOX_HEIGHT * (valley + (1 - valley) * eased));
  }

  return out;
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export interface RuixenGradientFooterProps {
  children?: ReactNode;
  gradientHeight?: string;
  minReveal?: number;
  bars?: number;
  blur?: number;
  peak?: number;
  valley?: number;
  stops?: Stop[];
  className?: string;
  style?: CSSProperties;
}

export function RuixenGradientFooter({
  children,
  gradientHeight = "clamp(280px, 42vh, 460px)",
  minReveal = 0.022,
  bars = 11,
  blur = 18,
  peak = 0.98,
  valley = 0.5,
  stops = ALIFWAY_STOPS,
  className,
  style,
}: RuixenGradientFooterProps) {
  const uid = useId().replace(/:/g, "");
  const bandRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(minReveal);

  useEffect(() => {
    const element = bandRef.current;
    if (!element) return;

    const documentRoot = element.ownerDocument;
    const view = documentRoot.defaultView ?? window;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const height = element.offsetHeight || 1;
      const scrollLeft =
        documentRoot.documentElement.scrollHeight - view.innerHeight - view.scrollY;
      const reveal = clamp01((height - scrollLeft) / height);
      setProgress(minReveal + (1 - minReveal) * reveal);
    };

    const requestMeasure = () => {
      if (frame) return;
      frame = view.requestAnimationFrame(measure);
    };

    measure();
    view.addEventListener("scroll", requestMeasure, { passive: true });
    view.addEventListener("resize", requestMeasure, { passive: true });

    return () => {
      if (frame) view.cancelAnimationFrame(frame);
      view.removeEventListener("scroll", requestMeasure);
      view.removeEventListener("resize", requestMeasure);
    };
  }, [minReveal]);

  const columnWidth = VIEWBOX_WIDTH / bars;

  return (
    <footer
      className={className}
      style={{ paddingBottom: gradientHeight, ...style }}
    >
      <div className="ruixen-footer-content">{children}</div>

      <div
        ref={bandRef}
        className="ruixen-gradient-band"
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: gradientHeight,
          pointerEvents: "none",
          transformOrigin: "bottom",
          transform: `scaleY(${progress})`,
          willChange: "transform",
        }}
      >
        <svg
          className="ruixen-gradient-svg"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`footer-gradient-${uid}`} x1="0" y1="1" x2="0" y2="0">
              {stops.map((stop, index) => (
                <stop key={index} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>
            <filter
              id={`footer-blur-${uid}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation={blur} />
            </filter>
          </defs>

          {bellHeights(bars, peak, valley).map((barHeight, index) => (
            <g key={index} filter={`url(#footer-blur-${uid})`}>
              <rect
                x={index * columnWidth}
                y={VIEWBOX_HEIGHT - barHeight}
                width={columnWidth * 1.23}
                height={barHeight}
                fill={`url(#footer-gradient-${uid})`}
              />
            </g>
          ))}
        </svg>
      </div>
    </footer>
  );
}
