import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Languages, Volume2, Download, LogOut } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Translator = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some text to translate.",
        variant: "destructive"
      });
      return;
    }

    setIsTranslating(true);
    
    try {
      // For demonstration, we're simulating translation
      // In a real app, this would call a translation API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock translation - in reality you'd use a service like Google Translate API
      const mockTranslatedText = simulateKannadaTranslation(inputText);
      setTranslatedText(mockTranslatedText);
      
      // Generate mock audio (in a real app, this would use a Text-to-Speech API)
      generateMockAudio();
      
      toast({
        title: "Translation Complete",
        description: "Your text has been translated to Kannada.",
      });
    } catch (error) {
      toast({
        title: "Translation Failed",
        description: "Failed to translate your text. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTranslating(false);
    }
  };

  // Simulate Kannada translation (in a real app, you'd use an actual translation API)
  const simulateKannadaTranslation = (text: string) => {
    // This is just a simple mock translation
    // Replace vowels with Kannada-like characters for demonstration
    const kannada = text
      .replace(/a/g, 'ಅ')
      .replace(/e/g, 'ಎ')
      .replace(/i/g, 'ಇ')
      .replace(/o/g, 'ಓ')
      .replace(/u/g, 'ಉ');
    
    return kannada;
  };

  const generateMockAudio = () => {
    // In a real application, you would generate audio from the translated text
    // using a Text-to-Speech API or service
    // For the demo, we're just setting a dummy audio URL
    setAudioUrl("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onLoginClick={() => {}} 
        onSignupClick={() => {}}
      />
      
      <main className="flex-grow py-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="mr-4"
              >
                Back to Dashboard
              </Button>
              <h1 className="text-3xl font-bold text-travel-blue">Language Translator</h1>
            </div>
            <Button 
              variant="outline" 
              className="text-red-500 border-red-500 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Languages className="mr-2 text-travel-green" />
                English to Kannada Translator
              </h2>
              <p className="text-gray-700 mb-4">
                Enter text in English below to translate it to Kannada.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-1">
                    English Text
                  </label>
                  <Textarea 
                    id="input-text"
                    placeholder="Type your English text here..." 
                    className="w-full h-32"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={handleTranslate} 
                  className="w-full bg-travel-green hover:bg-travel-blue transition-colors"
                  disabled={isTranslating || !inputText.trim()}
                >
                  {isTranslating ? "Translating..." : "Translate to Kannada"}
                </Button>
              </div>
            </Card>
            
            <Card className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Translation Results</h2>
              
              {!translatedText ? (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <Languages size={48} className="text-gray-300 mb-4" />
                  <p className="text-gray-500">
                    Your translation will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-1">Kannada Translation</h3>
                    <CardContent className="bg-gray-50 p-4 rounded-md min-h-32 break-words font-kannada text-lg">
                      {translatedText}
                    </CardContent>
                  </div>
                  
                  {audioUrl && (
                    <div>
                      <h3 className="text-md font-medium text-gray-700 mb-2 flex items-center">
                        <Volume2 className="mr-2 text-travel-green h-4 w-4" />
                        Listen to Pronunciation
                      </h3>
                      <audio controls className="w-full">
                        <source src={audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Translator;