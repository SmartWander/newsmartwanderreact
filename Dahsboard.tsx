
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Map, Languages } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onLoginClick={() => {}} 
        onSignupClick={() => {}}
      />
      
      <main className="flex-grow py-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-12 text-travel-blue">
            Welcome to Smart Wander
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
              onClick={() => navigate('/itinerary')}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FybmF0YWthfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
                  alt="Karnataka Landscapes" 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex items-center mb-2">
                  <Map size={24} className="text-travel-green mr-2" />
                  <h3 className="text-xl font-semibold text-travel-blue">Itinerary Generator</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Create personalized travel plans based on your preferences and discover the hidden gems of Karnataka.
                </p>
              </CardContent>
              <CardFooter className="bg-gray-50 text-travel-blue text-sm flex justify-between items-center">
                <span>Plan your journey</span>
                <span className="text-gray-500">Nov 2025</span>
              </CardFooter>
            </Card>
            
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
              onClick={() => navigate('/translator')}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1604075719843-3f057b1e3f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFuZ3VhZ2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
                  alt="Language Translation" 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex items-center mb-2">
                  <Languages size={24} className="text-travel-green mr-2" />
                  <h3 className="text-xl font-semibold text-travel-blue">Language Translator</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Instantly translate Kannada, Tulu, Konkani and more to enhance your communication during travel.
                </p>
              </CardContent>
              <CardFooter className="bg-gray-50 text-travel-blue text-sm flex justify-between items-center">
                <span>Translate now</span>
                <span className="text-gray-500">Nov 2025</span>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
