import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Music, Leaf, Lightbulb, Users, Calendar } from "lucide-react";

interface Room {
  id: string;
  name: string;
  description: string;
  ambience: string;
  scent: string;
  lighting: string;
  sounds: string;
  capacity: number;
  icon: any;
  features: string[];
  moodMatch: string[];
  available: boolean;
}

const rooms: Room[] = [
  {
    id: "reading-sanctuary",
    name: "Reading Sanctuary",
    description: "A tranquil haven designed for deep contemplation and literary escape.",
    ambience: "Warm, cozy, and peaceful",
    scent: "Vanilla & Sandalwood",
    lighting: "Soft amber reading lamps",
    sounds: "Gentle rainfall",
    capacity: 12,
    icon: BookOpen,
    features: ["Individual reading nooks", "Book library", "Silence policy", "Comfortable armchairs"],
    moodMatch: ["calm"],
    available: true
  },
  {
    id: "rhythm-lounge", 
    name: "Rhythm Lounge",
    description: "An energizing space where music and movement fuel creativity and connection.",
    ambience: "Vibrant, dynamic, and inspiring",
    scent: "Citrus & Mint",
    lighting: "Color-changing LED strips",
    sounds: "Curated upbeat playlists",
    capacity: 20,
    icon: Music,
    features: ["High-quality sound system", "Standing desks", "Movement space", "Collaborative tables"],
    moodMatch: ["energized"],
    available: true
  },
  {
    id: "nature-nook",
    name: "Nature Nook", 
    description: "A biophilic retreat that brings the serenity of nature indoors.",
    ambience: "Fresh, grounding, and organic",
    scent: "Pine & Eucalyptus",
    lighting: "Natural light with plant accents",
    sounds: "Forest ambience",
    capacity: 16,
    icon: Leaf,
    features: ["Living plant walls", "Natural materials", "Water features", "Garden views"],
    moodMatch: ["calm", "focused"],
    available: false
  },
  {
    id: "innovation-lab",
    name: "Innovation Lab",
    description: "A high-focus environment designed to amplify productivity and deep work.",
    ambience: "Clean, minimal, and focused",
    scent: "Peppermint & Rosemary",
    lighting: "Bright task lighting",
    sounds: "White noise & focus tracks",
    capacity: 8,
    icon: Lightbulb,
    features: ["Whiteboards", "High-speed wifi", "Privacy pods", "Ergonomic workstations"],
    moodMatch: ["focused"],
    available: true
  },
  {
    id: "social-sphere",
    name: "Social Sphere",
    description: "A warm gathering space perfect for conversations and connections.",
    ambience: "Welcoming, social, and lively",
    scent: "Warm Spices & Coffee",
    lighting: "Warm pendant lights",
    sounds: "Soft jazz & conversation",
    capacity: 25,
    icon: Users,
    features: ["Community tables", "Conversation nooks", "Board games", "Event space"],
    moodMatch: ["romantic", "creative"],
    available: true
  }
];

interface MoodRoomsProps {
  selectedMood: string | null;
  onRoomSelect: (room: Room) => void;
}

export function MoodRooms({ selectedMood, onRoomSelect }: MoodRoomsProps) {
  const filteredRooms = selectedMood 
    ? rooms.filter(room => room.moodMatch.includes(selectedMood))
    : rooms;

  const getMoodVariant = (mood: string) => {
    const variants: { [key: string]: any } = {
      calm: "calm",
      energized: "energized", 
      focused: "focused",
      creative: "creative",
      romantic: "romantic"
    };
    return variants[mood] || "default";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-display font-semibold text-foreground mb-2">
          Curated Spaces for Your Mood
        </h2>
        <p className="text-muted-foreground text-lg">
          Each room is designed to enhance your emotional state
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => {
          const Icon = room.icon;
          const isRecommended = selectedMood && room.moodMatch.includes(selectedMood);
          
          return (
            <Card 
              key={room.id} 
              className={`group transition-all duration-300 hover:scale-105 ${
                isRecommended ? 'ring-2 ring-accent shadow-glow' : 'hover:shadow-mood'
              } ${!room.available ? 'opacity-60' : ''}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl font-display flex items-center space-x-2">
                      <Icon className="h-6 w-6 text-accent" />
                      <span>{room.name}</span>
                      {isRecommended && (
                        <Badge className="bg-accent text-accent-foreground animate-pulse">
                          Recommended
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {room.capacity} seats
                      </Badge>
                      <Badge 
                        variant={room.available ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {room.available ? "Available" : "Reserved"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {room.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-foreground">Scent:</span>
                    <p className="text-muted-foreground">{room.scent}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Lighting:</span>
                    <p className="text-muted-foreground">{room.lighting}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Sounds:</span>
                    <p className="text-muted-foreground">{room.sounds}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Ambience:</span>
                    <p className="text-muted-foreground">{room.ambience}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-medium text-foreground text-sm">Features:</span>
                  <div className="flex flex-wrap gap-1">
                    {room.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => onRoomSelect(room)}
                    variant={isRecommended ? getMoodVariant(selectedMood!) : "outline"}
                    className="flex-1"
                    disabled={!room.available}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {room.available ? "Reserve Space" : "Fully Booked"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}