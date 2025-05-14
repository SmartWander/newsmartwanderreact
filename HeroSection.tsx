
import React from 'react';
import ImageCarousel from './ImageCarousel';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onExploreClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section className="relative h-screen overflow-hidden">
      <ImageCarousel />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discover Karnataka's Hidden Treasures
          </h1>
          <h2 className="text-xl md:text-2xl text-white/90 mb-8">
            Your personal travel companion that makes exploring Karnataka seamless and memorable
          </h2>
          <Button 
            onClick={onExploreClick}
            size="lg" 
            className="bg-travel-green hover:bg-travel-yellow text-black font-bold px-8 py-6 text-lg"
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
