"use client";

import { useState } from "react";
import Logo from "../Logo";
import Menu from "./Menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-5 flex justify-between items-start z-999 pointer-events-none">
        {/* Left: Logo */}
        <div className="flex pointer-events-auto -mt-1 md:-mt-8">
          <Logo className="w-32 md:w-44 h-auto" />
        </div>

        {/* Center: Navigation Text (Hidden on mobile) */}
        <div className="hidden md:flex gap-10 lg:gap-32 pointer-events-auto text-left font-sans text-[11px] md:text-xs font-semibold leading-[1.3] text-white mix-blend-difference">
          <div className="w-[220px]">
            <p> &nbsp; &nbsp; &nbsp;Cutting-edge web development.</p>
            <p>Driven by performance. Built with</p>
            <p>modern technologies.</p>
          </div>
        </div>

        {/* Right: Menu Toggle */}
        <div className="flex items-center pr-6 md:pr-6 gap-6 text-sm font-sans uppercase font-medium pointer-events-auto">
          <div className="relative" style={{ willChange: 'transform' }}>
            <style>{`
              #menu-checkbox {
                display: none;
              }
              .menu-toggle {
                position: relative;
                width: 50px;
                height: 50px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition-duration: .5s;
              }
              .menu-bars {
                width: 100%;
                height: 3px;
                border-radius: 4px;
                transition: background-color .5s ease, transform .5s ease, width .5s ease, opacity .5s ease;
              }
              #menu-bar1, #menu-bar3 {
                width: 70%;
              }
              #menu-checkbox:checked + .menu-toggle .menu-bars {
                position: absolute;
              }
              #menu-checkbox:checked + .menu-toggle #menu-bar2 {
                transform: scaleX(0);
                opacity: 0;
              }
              #menu-checkbox:checked + .menu-toggle #menu-bar1 {
                width: 100%;
                transform: rotate(45deg);
              }
              #menu-checkbox:checked + .menu-toggle #menu-bar3 {
                width: 100%;
                transform: rotate(-45deg);
              }
              #menu-checkbox:checked + .menu-toggle {
                transform: rotate(180deg);
              }
            `}</style>
            <input 
              type="checkbox" 
              id="menu-checkbox" 
              checked={isMenuOpen}
              onChange={() => setIsMenuOpen(!isMenuOpen)}
            />
            <label htmlFor="menu-checkbox" className="menu-toggle">
              <div className={`menu-bars ${isMenuOpen ? 'bg-black' : 'bg-white'}`} id="menu-bar1" />
              <div className={`menu-bars ${isMenuOpen ? 'bg-black' : 'bg-white'}`} id="menu-bar2" />
              <div className={`menu-bars ${isMenuOpen ? 'bg-black' : 'bg-white'}`} id="menu-bar3" />
            </label>
          </div>
        </div>
      </header>
    </>
  );
}
