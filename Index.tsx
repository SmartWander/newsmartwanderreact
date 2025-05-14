
import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AuthSection from '@/components/AuthSection';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const authSectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToAuth = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    setTimeout(() => {
      authSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onLoginClick={() => scrollToAuth('login')} 
        onSignupClick={() => scrollToAuth('signup')} 
      />
      
      <HeroSection onExploreClick={() => scrollToAuth('signup')} />
      
      <div ref={authSectionRef}>
        <AuthSection 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
