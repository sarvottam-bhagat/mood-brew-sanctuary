import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { MoodSelector } from "@/components/MoodSelector";
import { CoffeeMenu } from "@/components/CoffeeMenu";
import { MoodRooms } from "@/components/MoodRooms";
import { LoyaltyProgram } from "@/components/LoyaltyProgram";
import { OrderSystem } from "@/components/OrderSystem";
import { SmartTableService } from "@/components/SmartTableService";
import { AIFlavorRecommender } from "@/components/AIFlavorRecommender";
import { ARMenu } from "@/components/ARMenu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Coffee, 
  MapPin, 
  Calendar, 
  Star, 
  Heart,
  Brain,
  Sparkles,
  ShoppingCart,
  Menu,
  User
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<'hero' | 'experience'>('hero');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetStarted = () => {
    setCurrentSection('experience');
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    toast({
      title: `${mood.charAt(0).toUpperCase() + mood.slice(1)} mood selected`,
      description: "We're curating the perfect experience for you.",
    });
  };

  const handleAddToCart = (item: any) => {
    setCartItems(prev => [...prev, item]);
    toast({
      title: "Added to your order",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleRoomSelect = (room: any) => {
    toast({
      title: "Space reserved",
      description: `Your spot in ${room.name} has been reserved.`,
    });
  };

  const handleGoHome = () => {
    setCurrentSection('hero');
    setSelectedMood(null);
    setCartItems([]);
    setSelectedTable(null);
    navigate('/');
  };

  if (currentSection === 'hero') {
    return (
      <div className="min-h-screen bg-background">
        <Hero onGetStarted={handleGetStarted} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 
                className="text-2xl font-display font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={handleGoHome}
              >
                Aura Coffee
              </h1>
              {selectedMood && (
                <Badge className="bg-accent text-accent-foreground capitalize">
                  {selectedMood} Mode
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <Tabs defaultValue="mood" className="space-y-12">
          <TabsList className="grid w-full grid-cols-7 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger value="mood" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Mood</span>
            </TabsTrigger>
            <TabsTrigger value="coffee" className="flex items-center space-x-2">
              <Coffee className="h-4 w-4" />
              <span>Coffee</span>
            </TabsTrigger>
            <TabsTrigger value="ai-flavor" className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>AI Flavor</span>
            </TabsTrigger>
            <TabsTrigger value="ar-menu" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>AR Menu</span>
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Smart Table</span>
            </TabsTrigger>
            <TabsTrigger value="order" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Order</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Rewards</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mood" className="space-y-12">
            <MoodSelector selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />
          </TabsContent>

          <TabsContent value="coffee" className="space-y-12">
            <CoffeeMenu selectedMood={selectedMood} onAddToCart={handleAddToCart} />
          </TabsContent>

          <TabsContent value="ai-flavor" className="space-y-12">
            <AIFlavorRecommender selectedMood={selectedMood} onCoffeeSelect={handleAddToCart} />
          </TabsContent>

          <TabsContent value="ar-menu" className="space-y-12">
            <ARMenu />
          </TabsContent>

          <TabsContent value="table" className="space-y-12">
            <SmartTableService selectedTable={selectedTable} onTableSelect={(table) => setSelectedTable(table.number)} />
          </TabsContent>

          <TabsContent value="order" className="space-y-12">
            <OrderSystem cartItems={cartItems} onUpdateCart={setCartItems} selectedTable={selectedTable} />
          </TabsContent>

          <TabsContent value="rewards" className="space-y-12">
            <LoyaltyProgram />
          </TabsContent>
        </Tabs>
      </main>

      {/* Brand Vision Footer */}
      <footer className="bg-gradient-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6 text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-display font-bold">
              Our Mission
            </h3>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              To transform the everyday coffee experience into personalized emotional journeys, 
              where technology amplifies human connection and every moment resonates with your authentic self.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <Heart className="h-8 w-8 mx-auto text-romantic" />
              <h4 className="text-xl font-semibold">Emotionally Intelligent</h4>
              <p className="text-primary-foreground/80">
                AI that understands your mood and crafts experiences that resonate
              </p>
            </div>
            <div className="space-y-2">
              <Sparkles className="h-8 w-8 mx-auto text-accent" />
              <h4 className="text-xl font-semibold">Sensory Rich</h4>
              <p className="text-primary-foreground/80">
                Multi-dimensional experiences engaging all your senses
              </p>
            </div>
            <div className="space-y-2">
              <Coffee className="h-8 w-8 mx-auto text-primary-glow" />
              <h4 className="text-xl font-semibold">Premium Craft</h4>
              <p className="text-primary-foreground/80">
                Exceptional quality coffee sourced and roasted with intention
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/60">
              © 2024 Aura Coffee Lounge. Crafting emotional connections, one cup at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
