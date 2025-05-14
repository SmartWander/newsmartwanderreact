
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { format } from 'date-fns';
import { CalendarDays, MapPin, Compass, Download, LogOut } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  destination: z.string().min(1, { message: "Please select a destination" }),
  mood: z.string().min(1, { message: "Please select a mood" }),
  days: z.number().min(1).max(10),
  startDate: z.date(),
});

const destinations = [
  "Bengaluru", 
  "Mysuru", 
  "Hampi", 
  "Coorg", 
  "Chikmagalur", 
  "Udupi", 
  "Mangaluru",
  "Gokarna",
];

const moodOptions = [
  "Spiritual & Cultural",
  "Nature & Relaxation",
  "History & Heritage",
  "Fun & Entertainment",
  "Adventurous & Outdoors",
];

// For each destination, we have a list of popular attractions
const attractionsByDestination: Record<string, string[]> = {
  "Bengaluru": [
    "Lalbagh Botanical Garden",
    "Cubbon Park",
    "Bangalore Palace",
    "ISKCON Temple",
    "UB City",
    "Wonderla Amusement Park",
    "Bannerghatta National Park",
    "Tipu Sultan's Summer Palace"
  ],
  "Mysuru": [
    "Mysore Palace",
    "Brindavan Gardens",
    "Chamundi Hills",
    "St. Philomena's Church",
    "Mysore Zoo",
    "Karanji Lake",
    "Devaraja Market",
    "Railway Museum"
  ],
  "Hampi": [
    "Virupaksha Temple",
    "Vittala Temple",
    "Elephant Stables",
    "Lotus Mahal",
    "Hemakuta Hill",
    "Queen's Bath",
    "Matanga Hill",
    "Hippie Island (Virupapur Gadde)"
  ],
  "Coorg": [
    "Abbey Falls",
    "Dubare Elephant Camp",
    "Raja's Seat",
    "Nagarhole National Park",
    "Talacauvery",
    "Namdroling Monastery",
    "Iruppu Falls",
    "Mandalpatti View Point"
  ],
  "Chikmagalur": [
    "Mullayanagiri",
    "Baba Budangiri",
    "Hebbe Falls",
    "Kudremukh National Park",
    "Bhadra Wildlife Sanctuary",
    "Z Point",
    "Coffee Estates",
    "Kemmangundi"
  ],
  "Udupi": [
    "Krishna Temple",
    "Malpe Beach",
    "St. Mary's Island",
    "Kapu Beach",
    "Manipal End Point",
    "Delta Beach",
    "Kodi Beach",
    "Anantheshwara Temple"
  ],
  "Mangaluru": [
    "Mangaladevi Temple",
    "Tannirbhavi Beach",
    "Panambur Beach",
    "Kadri Manjunatha Temple",
    "St. Aloysius Chapel",
    "Kudroli Gokarnath Temple",
    "Pilikula Nisargadhama",
    "Surfing School"
  ],
  "Gokarna": [
    "Om Beach",
    "Mahabaleshwar Temple",
    "Kudle Beach",
    "Half Moon Beach",
    "Paradise Beach",
    "Gokarna Beach",
    "Mirjan Fort",
    "Yana Rocks"
  ]
};

const Itinerary = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<null | Array<{day: number, activities: Array<{time: string, activity: string}>}>>(null);
  const [personalizeOpen, setPersonalizeOpen] = useState(false);
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>([]);
  const [availableAttractions, setAvailableAttractions] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      mood: "",
      days: 2,
      startDate: new Date(),
    },
  });

  const destination = form.watch('destination');
  
  // Update available attractions when destination changes
  React.useEffect(() => {
    if (destination && attractionsByDestination[destination]) {
      setAvailableAttractions(attractionsByDestination[destination]);
    } else {
      setAvailableAttractions([]);
    }
  }, [destination]);

  const generateItinerary = async (data: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    
    try {
      // Normally this would be an API call to a backend
      // For now we'll simulate the response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data for demonstration
      const mockItinerary = Array.from({length: data.days}, (_, i) => ({
        day: i + 1,
        activities: [
          { 
            time: "08:00 AM - 09:00 AM", 
            activity: `Breakfast at a popular local restaurant in ${data.destination}` 
          },
          { 
            time: "09:30 AM - 12:00 PM", 
            activity: `Visit ${data.mood === "History & Heritage" ? "historic monuments" : 
              data.mood === "Spiritual & Cultural" ? "temples and cultural sites" : 
              data.mood === "Nature & Relaxation" ? "gardens and parks" :
              data.mood === "Fun & Entertainment" ? "entertainment venues" :
              "adventure spots"} in ${data.destination}` 
          },
          { 
            time: "12:30 PM - 02:00 PM", 
            activity: "Lunch at a recommended restaurant with authentic Karnataka cuisine" 
          },
          { 
            time: "02:30 PM - 05:00 PM", 
            activity: `Explore more ${data.mood.toLowerCase()} attractions in ${data.destination}` 
          },
          { 
            time: "05:30 PM - 07:00 PM", 
            activity: "Evening relaxation or shopping for local handicrafts" 
          },
          { 
            time: "07:30 PM - 09:00 PM", 
            activity: "Dinner at a popular local restaurant" 
          }
        ]
      }));
      
      setGeneratedItinerary(mockItinerary);
      toast({
        title: "Itinerary Generated!",
        description: `Your ${data.days}-day itinerary for ${data.destination} is ready.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePersonalize = () => {
    // Reset selected attractions when opening the personalize dialog
    setSelectedAttractions([]);
    setPersonalizeOpen(true);
  };

  const handlePersonalizeSubmit = async () => {
    if (selectedAttractions.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one attraction to personalize your itinerary.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    setPersonalizeOpen(false);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a new itinerary based on selected attractions
      const days = form.getValues('days');
      const updatedItinerary = Array.from({length: days}, (_, i) => {
        // Distribute selected attractions across days
        const dailyAttractions = selectedAttractions.filter((_, index) => 
          index % days === i
        );
        
        return {
          day: i + 1,
          activities: [
            { 
              time: "08:00 AM - 09:00 AM", 
              activity: `Breakfast at a local café near ${dailyAttractions[0] || destination}` 
            },
            ...dailyAttractions.map((attraction, idx) => ({
              time: `${10 + idx * 2}:00 AM - ${12 + idx * 2}:00 PM`,
              activity: `Visit ${attraction} - Explore this amazing attraction`
            })),
            { 
              time: "12:30 PM - 02:00 PM", 
              activity: "Lunch at a recommended restaurant with authentic Karnataka cuisine" 
            },
            { 
              time: "02:30 PM - 05:00 PM", 
              activity: `Continue exploring the remaining attractions in ${destination}` 
            },
            { 
              time: "05:30 PM - 07:00 PM", 
              activity: "Evening relaxation or shopping for local handicrafts" 
            },
            { 
              time: "07:30 PM - 09:00 PM", 
              activity: "Dinner at a popular local restaurant" 
            }
          ]
        };
      });
      
      setGeneratedItinerary(updatedItinerary);
      toast({
        title: "Itinerary Updated!",
        description: `Your personalized itinerary with selected attractions is ready.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPdf = () => {
    // In a real application, this would generate a PDF using a library like jsPDF
    // For this demo, we'll just show a success message
    toast({
      title: "PDF Downloaded",
      description: "Your itinerary has been downloaded as a PDF.",
    });
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
              <h1 className="text-3xl font-bold text-travel-blue">Itinerary Generator</h1>
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
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-travel-blue">Create Your Travel Plan</h2>
              <p className="text-gray-700 mb-6">
                Select your preferences below to generate a personalized travel itinerary for exploring Karnataka.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(generateItinerary)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin size={16} />
                          Destination
                        </FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a destination" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {destinations.map((dest) => (
                              <SelectItem key={dest} value={dest}>
                                {dest}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Compass size={16} />
                          Travel Mood
                        </FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select travel mood" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {moodOptions.map((mood) => (
                              <SelectItem key={mood} value={mood}>
                                {mood}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="days"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Days</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              max={10}
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="flex items-center gap-2">
                            <CalendarDays size={16} />
                            Start Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className="w-full pl-3 text-left font-normal"
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-travel-green hover:bg-travel-blue transition-colors duration-300"
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Generating..." : "Generate Itinerary"}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              {!generatedItinerary ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-travel-blue mb-4">
                    <Compass size={64} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium text-travel-blue mb-2">Your Itinerary Will Appear Here</h3>
                  <p className="text-gray-600">
                    Fill out the form and click "Generate Itinerary" to create your custom travel plan.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-travel-blue">
                      Your {form.getValues().days}-Day Itinerary for {form.getValues().destination}
                    </h2>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center text-travel-blue border-travel-blue"
                        onClick={handlePersonalize}
                      >
                        <Compass className="mr-1 h-4 w-4" /> Personalize
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center text-travel-green border-travel-green"
                        onClick={handleDownloadPdf}
                      >
                        <Download className="mr-1 h-4 w-4" /> PDF
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Accordion type="single" collapsible className="w-full">
                      {generatedItinerary.map((day) => (
                        <AccordionItem key={day.day} value={`day-${day.day}`}>
                          <AccordionTrigger className="text-travel-blue font-medium">
                            Day {day.day} - {format(
                              new Date(form.getValues().startDate.getTime() + (day.day - 1) * 24 * 60 * 60 * 1000), 
                              "EEEE, MMMM d"
                            )}
                          </AccordionTrigger>
                          <AccordionContent className="space-y-3">
                            {day.activities.map((activity, index) => (
                              <div key={index} className="border-b border-gray-100 pb-2 mb-2 last:border-0">
                                <div className="font-medium text-sm text-travel-green">{activity.time}</div>
                                <div className="text-gray-700">{activity.activity}</div>
                              </div>
                            ))}
                            
                            <div className="mt-4 bg-amber-50 p-3 rounded-md">
                              <h4 className="font-medium text-amber-700">🚨 Travel Safety Tips</h4>
                              <p className="text-sm text-gray-700">
                                Always keep your belongings secure, stay hydrated, and be aware of your surroundings. 
                                For emergencies in Karnataka, dial 112.
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  {/* Personalization Dialog */}
                  <Dialog open={personalizeOpen} onOpenChange={setPersonalizeOpen}>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Personalize Your Itinerary</DialogTitle>
                        <DialogDescription>
                          Select the attractions you want to include in your personalized itinerary for {destination}.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="max-h-[300px] overflow-y-auto py-4">
                        {availableAttractions.length > 0 ? (
                          availableAttractions.map((attraction) => (
                            <div key={attraction} className="flex items-center space-x-2 mb-3">
                              <Checkbox 
                                id={attraction}
                                checked={selectedAttractions.includes(attraction)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedAttractions(prev => [...prev, attraction]);
                                  } else {
                                    setSelectedAttractions(prev => 
                                      prev.filter(item => item !== attraction)
                                    );
                                  }
                                }}
                              />
                              <label
                                htmlFor={attraction}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {attraction}
                              </label>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-gray-500">
                            No attractions available for this destination.
                          </p>
                        )}
                      </div>
                      
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          onClick={() => setPersonalizeOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handlePersonalizeSubmit}
                          className="bg-travel-green hover:bg-travel-blue transition-colors"
                        >
                          Update Itinerary
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Itinerary;
