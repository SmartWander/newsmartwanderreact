
import React from 'react';
import { Map, Languages } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12 text-travel-blue">
          Smart Features for Smarter Travel
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="feature-card">
            <div className="flex items-center mb-4">
              <Map size={32} className="text-travel-green mr-4" />
              <h4 className="text-xl font-semibold text-travel-blue">Itinerary Generator</h4>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-travel-green mr-2">•</span>
                <span>Personalized travel plans based on your preferences</span>
              </li>
              <li className="flex items-start">
                <span className="text-travel-green mr-2">•</span>
                <span>Time-optimized routes between attractions</span>
              </li>
              <li className="flex items-start">
                <span className="text-travel-green mr-2">•</span>
                <span>Recommendations for hidden gems and local favorites</span>
              </li>
              <li className="flex items-start">
                <span className="text-travel-green mr-2">•</span>
                <span>Flexible schedules that adapt to your pace</span>
              </li>
            </ul>
          </div>
          
          <div className="feature-card">
            <div className="flex items-center mb-4">
              <Languages size={32} className="text-travel-green mr-4" />
              <h4 className="text-xl font-semibold text-travel-blue">Language Translator</h4>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-travel-green mr-2">•</span>
                <span>Instant translation of Kannada, Tulu, Konkani and more</span>
              </li>
              <li className="flex items-start">
                <span className="text-travel-green mr-2">•</span>
                <span>Offline mode for areas with limited connectivity</span>
              </li>
              <li className="flex items-start">
                <span className="text-travel-green mr-2">•</span>
                <span>Voice-to-text for convenient conversations</span>
              </li>
              <li className="flex items-start">
                <span className="text-travel-green mr-2">•</span>
                <span>Cultural context for better communication</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
