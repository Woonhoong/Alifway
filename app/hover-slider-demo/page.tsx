"use client"
import React from "react";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";

const SLIDES = [
  {
    id: "slide-1",
    title: "CELEBRITIES",
    imageUrl:
      "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=2486&auto=format&fit=crop",
  },
  {
    id: "slide-2",
    title: "RESTAURANT",
    imageUrl:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2487&auto=format&fit=crop",
  },
  {
    id: "slide-3",
    title: "SALON",
    imageUrl:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2487&auto=format&fit=crop",
  },
  {
    id: "slide-4",
    title: "INAUGURATION",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2487&auto=format&fit=crop",
  },
];

export default function HoverSliderDemoPage() {
  return (
    <main style={{ background: "transparent", padding: "6rem 4rem" }}>
      <HoverSlider className="min-h-[56vh] place-content-center p-6 md:px-12" style={{ fontFamily: "var(--display)", color: "var(--bone)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {SLIDES.map((slide, index) => (
              <TextStaggerHover
                key={slide.id}
                index={index}
                className="cursor-pointer text-4xl md:text-5xl font-bold uppercase tracking-tighter"
                text={slide.title}
              />
            ))}
          </div>

          <HoverSliderImageWrap style={{ width: "65%", maxWidth: "980px" }}>
            {SLIDES.map((slide, index) => (
              <div key={slide.id} style={{ display: "grid" }}>
                <HoverSliderImage
                  index={index}
                  imageUrl={slide.imageUrl}
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="size-full max-h-96 object-cover"
                  loading="eager"
                  decoding="async"
                  style={{ borderRadius: "22px", boxShadow: "0 30px 90px rgba(22,20,43,.12)" }}
                />
              </div>
            ))}
          </HoverSliderImageWrap>
        </div>
      </HoverSlider>
    </main>
  );
}
