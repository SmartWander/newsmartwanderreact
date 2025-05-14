
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-travel-blue text-white py-6 px-4">
      <div className="container mx-auto text-center">
        <p className="text-white/60">
          © {new Date().getFullYear()} Smart Wander. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
