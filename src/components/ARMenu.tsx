import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Calendar, Thermometer, Droplets, Mountain, Users, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CoffeeOrigin {
  id: string;
  name: string;
  farm: string;
  location: string;
  elevation: string;
  climate: string;
  processing: string;
  harvest_season: string;
  farmer: string;
  certifications: string[];
  story: string;
  sustainability_score: number;
  flavor_profile: string[];
  roast_date: string;
  journey_days: number;
}

const mockCoffeeOrigins: { [key: string]: CoffeeOrigin } = {
  "serenity-blend": {
    id: "serenity-blend",
    name: "Serenity Blend",
    farm: "Finca La Esperanza",
    location: "Huila, Colombia",
    elevation: "1,600-1,800m",
    climate: "Tropical with dry season",
    processing: "Washed & Sun-dried",
    harvest_season: "October - February",
    farmer: "Maria Elena Vasquez",
    certifications: ["Organic", "Fair Trade", "Bird Friendly"],
    story: "Grown by third-generation coffee farmer Maria Elena on her family's 12-hectare farm nestled in the Colombian Andes. Each bean is hand-picked at perfect ripeness and processed using traditional methods passed down through generations.",
    sustainability_score: 95,
    flavor_profile: ["Chocolate", "Caramel", "Orange", "Floral"],
    roast_date: "2024-01-15",
    journey_days: 14
  },
  "lightning-roast": {
    id: "lightning-roast", 
    name: "Lightning Roast",
    farm: "Konga Cooperative",
    location: "Yirgacheffe, Ethiopia",
    elevation: "1,900-2,200m",
    climate: "Highland tropical",
    processing: "Natural & Honey",
    harvest_season: "November - January",
    farmer: "Bekele Hunde",
    certifications: ["Organic", "Fair Trade"],
    story: "Sourced from a cooperative of 450 small-holder farmers in the birthplace of coffee. These high-altitude beans develop complex flavors through slow maturation in cool mountain air.",
    sustainability_score: 92,
    flavor_profile: ["Blueberry", "Wine", "Citrus", "Floral"],
    roast_date: "2024-01-12",
    journey_days: 21
  }
};

interface ARMenuProps {
  coffeeId?: string;
}

export function ARMenu({ coffeeId }: ARMenuProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCoffee, setScannedCoffee] = useState<CoffeeOrigin | null>(null);
  const [showAR, setShowAR] = useState(false);
  const { toast } = useToast();

  const simulateARScan = () => {
    setIsScanning(true);
    setShowAR(true);
    
    // Simulate camera scanning
    setTimeout(() => {
      const coffeeKey = coffeeId || "serenity-blend";
      const coffee = mockCoffeeOrigins[coffeeKey];
      
      setScannedCoffee(coffee);
      setIsScanning(false);
      
      toast({
        title: "AR Scan Complete! 📸",
        description: `Discovered the story behind ${coffee.name}`,
      });
    }, 3000);
  };

  if (showAR && scannedCoffee) {
    return (
      <div className="space-y-6">
        {/* AR Camera View Simulation */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-700 text-white">
          <div className="absolute inset-0 opacity-20"></div>
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-green-500 text-white animate-pulse">
                <Camera className="h-3 w-3 mr-1" />
                AR Active
              </Badge>
              <Button 
                variant="ghost" 
                onClick={() => setShowAR(false)}
                className="text-white hover:bg-white/20"
              >
                Exit AR
              </Button>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">AR Coffee Scanner</h3>
              <p className="text-white/80">Point your camera at the coffee card or menu</p>
              
              {/* Scanning Animation */}
              <div className="relative mx-auto w-64 h-64 border-2 border-white/30 rounded-lg flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-accent rounded-lg animate-pulse"></div>
                <div className="absolute inset-4 border-2 border-white/50 rounded border-dashed animate-pulse"></div>
                <Camera className="h-16 w-16 text-white/70" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AR Overlay Information */}
        <Card className="border-accent shadow-glow animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-display flex items-center space-x-2">
              <Mountain className="h-6 w-6 text-accent" />
              <span>{scannedCoffee.name}</span>
              <Badge className="bg-accent text-accent-foreground">
                Sustainability: {scannedCoffee.sustainability_score}%
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Origin Story */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">The Story</h3>
              <p className="text-muted-foreground leading-relaxed">
                {scannedCoffee.story}
              </p>
            </div>

            {/* Farm Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="font-medium">Location</span>
                </div>
                <p className="text-sm text-muted-foreground">{scannedCoffee.location}</p>
                <p className="text-sm text-muted-foreground">{scannedCoffee.farm}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mountain className="h-4 w-4 text-accent" />
                  <span className="font-medium">Elevation</span>
                </div>
                <p className="text-sm text-muted-foreground">{scannedCoffee.elevation}</p>
                <p className="text-sm text-muted-foreground">{scannedCoffee.climate}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-accent" />
                  <span className="font-medium">Farmer</span>
                </div>
                <p className="text-sm text-muted-foreground">{scannedCoffee.farmer}</p>
                <p className="text-sm text-muted-foreground">Generational expertise</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-accent" />
                  <span className="font-medium">Processing</span>
                </div>
                <p className="text-sm text-muted-foreground">{scannedCoffee.processing}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <span className="font-medium">Harvest</span>
                </div>
                <p className="text-sm text-muted-foreground">{scannedCoffee.harvest_season}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-accent" />
                  <span className="font-medium">Roasted</span>
                </div>
                <p className="text-sm text-muted-foreground">{scannedCoffee.roast_date}</p>
                <p className="text-sm text-muted-foreground">{scannedCoffee.journey_days} day journey</p>
              </div>
            </div>

            {/* Flavor Profile */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Flavor Profile</h3>
              <div className="flex flex-wrap gap-2">
                {scannedCoffee.flavor_profile.map(flavor => (
                  <Badge key={flavor} variant="outline" className="bg-accent/10 text-accent border-accent">
                    {flavor}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {scannedCoffee.certifications.map(cert => (
                  <Badge key={cert} className="bg-green-100 text-green-800 border-green-300">
                    <Award className="h-3 w-3 mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Interactive Elements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <Button variant="outline" className="h-12">
                <MapPin className="h-4 w-4 mr-2" />
                View Farm on Map
              </Button>
              <Button variant="outline" className="h-12">
                <Camera className="h-4 w-4 mr-2" />
                Virtual Farm Tour
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-display font-semibold text-foreground">
          AR Menu & Origin Stories
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Scan any coffee card or menu item with your camera to discover the fascinating 
          journey from farm to cup, including farmer stories, processing methods, and sustainability practices.
        </p>
      </div>

      {/* AR Scanner Interface */}
      <Card className="border-dashed border-2 border-accent">
        <CardContent className="p-8 text-center">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="bg-accent/20 rounded-full p-8">
                  <Camera className="h-16 w-16 text-accent" />
                </div>
                {isScanning && (
                  <div className="absolute inset-0 border-4 border-accent rounded-full animate-ping"></div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">
                {isScanning ? "Scanning..." : "Scan Coffee Menu"}
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {isScanning 
                  ? "Analyzing coffee card and fetching origin data..."
                  : "Point your camera at any coffee card or menu item to reveal its complete story"
                }
              </p>
            </div>

            <Button
              onClick={simulateARScan}
              disabled={isScanning}
              variant="premium"
              size="xl"
              className="min-w-48"
            >
              {isScanning ? "Scanning..." : "Start AR Scan"}
            </Button>

            {/* Sample QR Codes */}
            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                In a real café, scan these QR codes on coffee cards:
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                {Object.values(mockCoffeeOrigins).slice(0, 2).map(coffee => (
                  <Card 
                    key={coffee.id} 
                    className="cursor-pointer hover:shadow-mood transition-all duration-300"
                    onClick={() => {
                      setScannedCoffee(coffee);
                      simulateARScan();
                    }}
                  >
                    <CardContent className="p-3 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded mx-auto mb-2 flex items-center justify-center">
                        <div className="w-12 h-12 bg-black/80 rounded grid grid-cols-3 gap-0.5 p-1">
                          {Array.from({length: 9}).map((_, i) => (
                            <div key={i} className={`bg-white rounded-sm ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-30'}`}></div>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs font-medium">{coffee.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center hover:shadow-mood transition-all duration-300">
          <CardContent className="p-6 space-y-3">
            <div className="bg-accent/20 rounded-full p-3 w-fit mx-auto">
              <Mountain className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold">Farm Origins</h3>
            <p className="text-sm text-muted-foreground">
              Discover the exact farm, elevation, and growing conditions
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center hover:shadow-mood transition-all duration-300">
          <CardContent className="p-6 space-y-3">
            <div className="bg-accent/20 rounded-full p-3 w-fit mx-auto">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold">Farmer Stories</h3>
            <p className="text-sm text-muted-foreground">
              Meet the passionate farmers behind your coffee
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center hover:shadow-mood transition-all duration-300">
          <CardContent className="p-6 space-y-3">
            <div className="bg-accent/20 rounded-full p-3 w-fit mx-auto">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold">Sustainability</h3>
            <p className="text-sm text-muted-foreground">
              Learn about ethical sourcing and environmental impact
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}