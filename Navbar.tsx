import React from 'react';
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSignupClick }) => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
        <div className="flex items-center space-x-2">
          <span className="text-travel-blue text-2xl font-bold">Smart Wander</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-travel-blue hover:text-travel-green hover:bg-transparent"
            onClick={onLoginClick}
          >
            Login
          </Button>
          <Button 
            className="bg-travel-green hover:bg-travel-blue transition-colors duration-300"
            onClick={onSignupClick}
          >
            Sign up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;