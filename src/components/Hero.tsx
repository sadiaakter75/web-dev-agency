"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "./Logo";

const IMAGES = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Create a continuous sweep effect timeline for the images
    const tl = gsap.timeline({ repeat: -1 });

    // Initial state: all images after the first one are clipped (hidden)
    imagesRef.current.forEach((img, i) => {
      if (!img) return;
      if (i > 0) {
        gsap.set(img, { clipPath: "inset(0 0 0 100%)" });
      } else {
        gsap.set(img, { clipPath: "inset(0 0 0 0%)" });
      }
    });

    // Reveal animation
    IMAGES.forEach((_, i) => {
      if (i === 0) return; // Skip first image as it's already visible
      tl.to(imagesRef.current[i], {
        clipPath: "inset(0 0 0 0%)",
        duration: 1.5,
        ease: "power2.inOut",
      }, "+=2"); // Wait 2 seconds before sweeping the next image
    });

    // At the end, reset all except the last one, and then reveal the first one again
    tl.to(imagesRef.current[0], {
      clipPath: "inset(0 0 0 100%)",
      duration: 0,
    });
    tl.to(imagesRef.current[0], {
      clipPath: "inset(0 0 0 0%)",
      duration: 1.5,
      ease: "power2.inOut",
    }, "+=2");

    // We need to reset the others back to 100% when the first image covers them
    tl.set(imagesRef.current.slice(1), {
      clipPath: "inset(0 0 0 100%)",
    });

    return () => {
      tl.kill();
    };
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
              className="absolute inset-0 w-full h-full object-cover brightness-50"
              style={{
                zIndex: i + 1, // Stack them properly
              }}
            />
          ))}
        </div>
      </div>

      {/* Header / Nav Area */}
      <header className="relative z-10 w-full p-6 md:p-10 flex justify-between items-start mix-blend-difference">
        <div className="flex items-center">
          <Logo className="w-24 md:w-32 h-auto" />
        </div>
        <div className="hidden md:flex gap-16 text-sm uppercase tracking-widest text-zinc-300 font-sans">
          <div className="max-w-[200px]">
            <p>Ecommerce and brand systems. Driven by visions. Built with design and technology.</p>
          </div>
          <div>
            <p>hello@evolve.com</p>
            <p>Modena, EST 2008©</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-sans uppercase font-medium mix-blend-difference text-white">
          <span>IT</span>
          <button className="bg-white text-black px-4 py-1">Menu</button>
        </div>
      </header>

      {/* Middle Grid Lines / Categories */}
      <div className="relative z-10 w-full px-6 md:px-10 flex justify-between text-xs uppercase tracking-widest text-zinc-400 font-sans mix-blend-difference">
        <span>Brand Direction</span>
        <span>Performance Marketing</span>
        <span>Advanced Tech</span>
      </div>

      {/* Big Text */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pb-20 md:pb-32 px-4 mix-blend-difference pointer-events-none">
        <h1 className="font-oswald text-[18vw] md:text-[12vw] leading-[0.85] tracking-tight text-white text-center flex flex-col items-center w-full uppercase">
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
