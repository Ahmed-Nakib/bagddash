// components/HeroCarouselSection.tsx
"use client";

import ThreeDCarousel, { ThreeDCarouselItem } from "@/components/ThreeDCarousel";



interface HeroCarouselSectionProps {
  items: ThreeDCarouselItem[];
}

const HeroCarouselSection = ({ items }: HeroCarouselSectionProps) => {
  return (
    <section
      className="relative w-full   flex flex-col items-center 
      bg-gradient-to-b from-gray-50 via-white to-gray-100 px-4"
    >
      {/* ===== Background Overlay (Optional) ===== */}
      <div className="absolute inset-0 bg-black/0 pointer-events-none" />
      {/* ===== Carousel Section ===== */}
      <div className="relative z-10 w-full mt-16 mb-12">
        <ThreeDCarousel items={items} />
      </div>
    </section>
  );
};

export default HeroCarouselSection;
