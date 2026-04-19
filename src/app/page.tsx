import Hero from "@/components/Hero";
import InteractiveSection from "@/components/InteractiveSection";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* Sticky Hero Wrapper */}
      <div className="sticky top-0 w-full h-screen">
        <Hero />
      </div>

      {/* Content that scrolls over the Hero */}
      <InteractiveSection />
    </main>
  );
}
