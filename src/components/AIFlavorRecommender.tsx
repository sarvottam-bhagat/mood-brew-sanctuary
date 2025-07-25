import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, Coffee, Star, Heart, Zap, Target } from "lucide-react";

interface TasteProfile {
  sweetness: number;
  acidity: number;
  intensity: number;
  temperature_preference: 'hot' | 'iced' | 'both';
  milk_preference: string[];
  flavor_notes: string[];
  preferred_times: string[];
}

interface CoffeeRecommendation {
  id: string;
  name: string;
  match_percentage: number;
  reasons: string[];
  mood_enhancement: string;
  origin: string;
  price: number;
  taste_notes: string[];
}

const mockUserProfile: TasteProfile = {
  sweetness: 65,
  acidity: 40,
  intensity: 75,
  temperature_preference: 'both',
  milk_preference: ['Oat', 'Almond'],
  flavor_notes: ['Chocolate', 'Nutty', 'Caramel'],
  preferred_times: ['Morning', 'Afternoon']
};

const generateRecommendations = (mood: string | null, profile: TasteProfile): CoffeeRecommendation[] => {
  const baseRecommendations: CoffeeRecommendation[] = [
    {
      id: "ai-1",
      name: "Neural Blend Espresso",
      match_percentage: 94,
      reasons: ["Matches your high intensity preference", "Perfect chocolate notes for your taste"],
      mood_enhancement: "Enhances focus and mental clarity",
      origin: "Ethiopian Highlands",
      price: 7.50,
      taste_notes: ["Dark Chocolate", "Caramel", "Orange Zest"]
    },
    {
      id: "ai-2", 
      name: "Algorithmic Pour-Over",
      match_percentage: 87,
      reasons: ["Balanced acidity for your preference", "Nutty notes you love"],
      mood_enhancement: "Promotes creative thinking",
      origin: "Colombian Andes", 
      price: 6.75,
      taste_notes: ["Walnut", "Honey", "Vanilla"]
    },
    {
      id: "ai-3",
      name: "Predictive Cold Brew",
      match_percentage: 82,
      reasons: ["Low acidity profile", "Smooth intensity level"],
      mood_enhancement: "Sustained energy without jitters",
      origin: "Brazilian Cerrado",
      price: 5.50,
      taste_notes: ["Smooth Chocolate", "Toffee", "Clean Finish"]
    }
  ];

  // Adjust recommendations based on mood
  if (mood) {
    const moodAdjustments = {
      calm: { intensity: -10, acidity: -15, enhancement: "Promotes relaxation and mindfulness" },
      energized: { intensity: +15, acidity: +10, enhancement: "Boosts energy and motivation" },
      focused: { intensity: +10, acidity: 0, enhancement: "Enhances concentration and mental clarity" },
      creative: { intensity: +5, acidity: +5, enhancement: "Stimulates creative thinking and inspiration" },
      romantic: { intensity: -5, acidity: -10, enhancement: "Creates warm, intimate feelings" }
    };

    const adjustment = moodAdjustments[mood as keyof typeof moodAdjustments];
    if (adjustment) {
      baseRecommendations.forEach(rec => {
        rec.mood_enhancement = adjustment.enhancement;
        rec.match_percentage = Math.min(98, rec.match_percentage + 5);
      });
    }
  }

  return baseRecommendations.sort((a, b) => b.match_percentage - a.match_percentage);
};

interface AIFlavorRecommenderProps {
  selectedMood: string | null;
  onCoffeeSelect: (coffee: CoffeeRecommendation) => void;
}

export function AIFlavorRecommender({ selectedMood, onCoffeeSelect }: AIFlavorRecommenderProps) {
  const [recommendations, setRecommendations] = useState<CoffeeRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const newRecommendations = generateRecommendations(selectedMood, mockUserProfile);
      setRecommendations(newRecommendations);
      setIsAnalyzing(false);
    }, 2000);
  }, [selectedMood]);

  const getMoodIcon = (mood: string) => {
    const icons = {
      calm: Heart,
      energized: Zap,
      focused: Target,
      creative: Brain,
      romantic: Heart
    };
    return icons[mood as keyof typeof icons] || Coffee;
  };

  const getMoodColor = (mood: string) => {
    const colors = {
      calm: "text-calm",
      energized: "text-energized", 
      focused: "text-focused",
      creative: "text-creative",
      romantic: "text-romantic"
    };
    return colors[mood as keyof typeof colors] || "text-primary";
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-display font-semibold text-foreground">
          AI Flavor Recommender
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our advanced AI analyzes your taste profile, mood, and preferences to craft 
          personalized coffee recommendations just for you.
        </p>
      </div>

      {/* Mood Analysis */}
      {selectedMood && (
        <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-accent/20 rounded-full p-3">
                {(() => {
                  const MoodIcon = getMoodIcon(selectedMood);
                  return <MoodIcon className={`h-6 w-6 ${getMoodColor(selectedMood)}`} />;
                })()}
              </div>
              <div>
                <h3 className="text-xl font-semibold capitalize">{selectedMood} Mode Active</h3>
                <p className="text-muted-foreground">
                  AI optimizing recommendations for your {selectedMood} state
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Taste Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-display flex items-center space-x-2">
              <Brain className="h-6 w-6 text-accent" />
              <span>Your Taste Profile</span>
            </CardTitle>
            <Button 
              variant="outline" 
              onClick={() => setShowProfile(!showProfile)}
            >
              {showProfile ? "Hide" : "View"} Profile
            </Button>
          </div>
        </CardHeader>
        
        {showProfile && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Sweetness</span>
                  <span className="text-sm text-muted-foreground">{mockUserProfile.sweetness}%</span>
                </div>
                <Progress value={mockUserProfile.sweetness} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Acidity</span>
                  <span className="text-sm text-muted-foreground">{mockUserProfile.acidity}%</span>
                </div>
                <Progress value={mockUserProfile.acidity} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Intensity</span>
                  <span className="text-sm text-muted-foreground">{mockUserProfile.intensity}%</span>
                </div>
                <Progress value={mockUserProfile.intensity} className="h-2" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium mb-2">Preferred Flavors</h4>
                <div className="flex flex-wrap gap-1">
                  {mockUserProfile.flavor_notes.map(note => (
                    <Badge key={note} variant="outline">{note}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Milk Preferences</h4>
                <div className="flex flex-wrap gap-1">
                  {mockUserProfile.milk_preference.map(milk => (
                    <Badge key={milk} variant="outline">{milk}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* AI Processing */}
      {isAnalyzing && (
        <Card className="border-dashed border-2 border-accent">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="animate-pulse">
                <Brain className="h-16 w-16 text-accent mx-auto" />
              </div>
              <h3 className="text-xl font-semibold">AI Processing Your Preferences...</h3>
              <p className="text-muted-foreground">
                Analyzing taste profile, mood state, and flavor compatibility
              </p>
              <Progress value={75} className="w-full max-w-xs mx-auto" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Recommendations */}
      {!isAnalyzing && recommendations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-display font-semibold text-foreground">
            Personalized Recommendations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((coffee, index) => (
              <Card 
                key={coffee.id} 
                className={`transition-all duration-300 hover:scale-105 hover:shadow-glow ${
                  index === 0 ? 'ring-2 ring-accent shadow-glow' : 'hover:shadow-mood'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg font-display">
                        {coffee.name}
                        {index === 0 && (
                          <Badge className="ml-2 bg-accent text-accent-foreground">
                            Best Match
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-lg font-semibold text-green-500">
                          {coffee.match_percentage}% Match
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold text-primary">
                        ${coffee.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {coffee.origin}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Why this matches you:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {coffee.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Star className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Mood Enhancement:</h4>
                    <p className="text-sm text-muted-foreground italic">
                      {coffee.mood_enhancement}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Taste Notes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {coffee.taste_notes.map(note => (
                        <Badge key={note} variant="outline" className="text-xs">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => onCoffeeSelect(coffee)}
                    variant={index === 0 ? "premium" : "outline"}
                    className="w-full"
                  >
                    <Coffee className="h-4 w-4 mr-2" />
                    Try This Blend
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}