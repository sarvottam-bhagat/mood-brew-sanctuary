import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Target, Palette, Heart } from "lucide-react";

interface Mood {
  id: string;
  name: string;
  description: string;
  icon: any;
  variant: any;
  color: string;
}

const moods: Mood[] = [
  {
    id: "calm",
    name: "Calm",
    description: "Peaceful, relaxed, mindful",
    icon: Brain,
    variant: "calm",
    color: "text-calm"
  },
  {
    id: "energized", 
    name: "Energized",
    description: "Vibrant, motivated, active",
    icon: Zap,
    variant: "energized",
    color: "text-energized"
  },
  {
    id: "focused",
    name: "Focused", 
    description: "Concentrated, productive, sharp",
    icon: Target,
    variant: "focused",
    color: "text-focused"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Inspired, imaginative, innovative",
    icon: Palette,
    variant: "creative", 
    color: "text-creative"
  },
  {
    id: "romantic",
    name: "Romantic",
    description: "Intimate, warm, connected",
    icon: Heart,
    variant: "romantic",
    color: "text-romantic"
  }
];

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-display font-semibold text-foreground mb-2">
          How are you feeling today?
        </h2>
        <p className="text-muted-foreground text-lg">
          Let us craft the perfect experience for your mood
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.id;
          
          return (
            <Card 
              key={mood.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                isSelected ? 'ring-2 ring-accent shadow-glow' : 'hover:shadow-mood'
              }`}
              onClick={() => onMoodSelect(mood.id)}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  <Button
                    variant={isSelected ? mood.variant : "ghost"}
                    size="icon"
                    className="h-16 w-16 rounded-full"
                  >
                    <Icon className="h-8 w-8" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h3 className={`font-semibold text-lg ${mood.color}`}>
                    {mood.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {mood.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}