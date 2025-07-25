import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Star, Clock, MapPin, Plus } from "lucide-react";

interface CoffeeItem {
  id: string;
  name: string;
  description: string;
  price: number;
  origin: string;
  strength: number;
  brewTime: string;
  moodMatch: string[];
  featured?: boolean;
  rating: number;
}

const coffeeItems: CoffeeItem[] = [
  {
    id: "serenity-blend",
    name: "Serenity Blend",
    description: "A smooth, gentle coffee with notes of vanilla and honey. Perfect for contemplation.",
    price: 6.50,
    origin: "Colombia",
    strength: 2,
    brewTime: "4 min",
    moodMatch: ["calm"],
    featured: true,
    rating: 4.8
  },
  {
    id: "lightning-roast",
    name: "Lightning Roast",
    description: "Bold and energizing with bright citrus notes and a robust finish.",
    price: 7.00,
    origin: "Ethiopia",
    strength: 5,
    brewTime: "3 min",
    moodMatch: ["energized"],
    rating: 4.9
  },
  {
    id: "focus-flow",
    name: "Focus Flow",
    description: "Balanced medium roast with clarity-enhancing properties and subtle chocolate notes.",
    price: 6.75,
    origin: "Guatemala",
    strength: 3,
    brewTime: "3.5 min",
    moodMatch: ["focused"],
    rating: 4.7
  },
  {
    id: "inspiration-blend",
    name: "Inspiration Blend",
    description: "Complex and artistic with floral undertones and a creative spark.",
    price: 7.25,
    origin: "Kenya",
    strength: 4,
    brewTime: "4.5 min", 
    moodMatch: ["creative"],
    rating: 4.6
  },
  {
    id: "passion-pour",
    name: "Passion Pour",
    description: "Rich and romantic with deep berry notes and a velvety finish.",
    price: 8.00,
    origin: "Costa Rica",
    strength: 3,
    brewTime: "5 min",
    moodMatch: ["romantic"],
    featured: true,
    rating: 4.9
  }
];

interface CoffeeMenuProps {
  selectedMood: string | null;
  onAddToCart: (item: CoffeeItem) => void;
}

export function CoffeeMenu({ selectedMood, onAddToCart }: CoffeeMenuProps) {
  const filteredItems = selectedMood 
    ? coffeeItems.filter(item => item.moodMatch.includes(selectedMood))
    : coffeeItems;

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
          {selectedMood ? `Perfect for your ${selectedMood} mood` : "Our Signature Blends"}
        </h2>
        <p className="text-muted-foreground text-lg">
          Expertly crafted to enhance your moment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-glow transition-all duration-300 hover:scale-105">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-display">
                    {item.name}
                    {item.featured && (
                      <Badge className="ml-2 bg-accent text-accent-foreground">
                        Featured
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span>{item.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{item.origin}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{item.brewTime}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-primary">
                    ${item.price}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Coffee 
                        key={i}
                        className={`h-3 w-3 ${
                          i < item.strength ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {item.moodMatch.map((mood) => (
                  <Badge 
                    key={mood}
                    variant="outline"
                    className="capitalize"
                  >
                    {mood}
                  </Badge>
                ))}
              </div>
              
              <Button
                onClick={() => onAddToCart(item)}
                variant={selectedMood && item.moodMatch.includes(selectedMood) ? getMoodVariant(selectedMood) : "premium"}
                className="w-full"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add to Order
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}