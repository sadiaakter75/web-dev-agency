"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface MagicTextProps {
  text: string;
}

export const MagicText: React.FC<MagicTextProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context((self) => {
      const words = self.selector?.('.word-reveal') as HTMLElement[];
      
      if (words && words.length > 0) {
        gsap.to(words, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "bottom 35%",
            scrub: 0.5,
            fastScrollEnd: true,
            preventOverlaps: true,
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(" ");

  return (
    <div 
      ref={containerRef} 
      className="relative flex flex-wrap justify-center text-center max-w-4xl mx-auto leading-[1.15] p-4 text-black"
    >
      {words.map((word, i) => (
        <span 
          key={i} 
          className="word-span relative mt-[6px] mr-2 text-2xl md:text-4xl font-bold tracking-tight"
          style={{ willChange: "opacity" }}
        >
          <span className="absolute opacity-10">{word}</span>
          <span className="word-reveal opacity-0">{word}</span>
        </span>
      ))}
    </div>
  );
};
