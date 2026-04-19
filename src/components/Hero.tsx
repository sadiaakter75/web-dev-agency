"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "./Logo";

const IMAGES = [
  "./images/img1.jpg",
  "./images/img2.jpg",
  "./images/img3.jpg",
  "./images/img4.jpg",
  "./images/img5.jpg",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create a continuous sweep effect timeline for the images
      const tl = gsap.timeline({ repeat: -1 });

      // Initial state setup
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        gsap.set(img, {
          clipPath: i === 0 ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)",
          zIndex: i + 1
        });
      });

      let currentZ = IMAGES.length + 1;

      IMAGES.forEach((_, i) => {
        const nextIndex = (i + 1) % IMAGES.length;
        const nextImg = imagesRef.current[nextIndex];

        if (nextImg) {
          tl.set(nextImg, { zIndex: currentZ++, clipPath: "inset(0 0 0 100%)" }, "+=2");
          tl.to(nextImg, {
            clipPath: "inset(0 0 0 0%)",
            duration: 1.5,
            ease: "power2.inOut",
            force3D: true,
          });
        }
      });

      // Pause animation when not in view to save resources
      if (containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          onLeave: () => tl.pause(),
          onEnterBack: () => tl.resume(),
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      style={{ zIndex: 1 }}
    >
      {/* Background Images Layer */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-black">
          {IMAGES.map((src, i) => (
            <img
              key={i}
              ref={(el) => {
                imagesRef.current[i] = el;
              }}
              src={src}
              alt={`Background ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover brightness-75"
              style={{ willChange: 'clip-path' }}
              decoding="async"
            />
          ))}
        </div>
      </div>

      {/* Dark Overlay Layer (Separated to prevent z-index flickering) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Spacer for removed header */}
      <div className="relative z-10 w-full h-24 md:h-32 pointer-events-none shrink-0" />

      {/* Middle Grid Lines / Categories */}
      <div className="relative z-10 w-full p-6 md:p-10 flex justify-between text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 font-sans mix-blend-difference">
        <span>Web Applications</span>
        <span>Digital Experiences</span>
        <span>Frontend Architecture</span>
      </div>

      {/* Big Text */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pb-20 md:pb-32 px-4 pointer-events-none mix-blend-difference">
        <h1 
          className="font-oswald text-[14vw] md:text-[10.5vw] leading-[0.85] tracking-tight text-white text-center flex flex-col items-center w-full uppercase"
          style={{ willChange: 'transform' }}
        >
          <span>Website</span>
          <span>Development</span>
          <span>Agency</span>
        </h1>
      </div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px)`,
          backgroundSize: '10vw 100%'
        }}
      />
    </section>
  );
}
