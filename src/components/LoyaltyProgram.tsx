import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Gift, Crown, Zap, Trophy, Coffee } from "lucide-react";

interface LoyaltyTier {
  name: string;
  icon: any;
  color: string;
  benefits: string[];
  pointsRequired: number;
}

const loyaltyTiers: LoyaltyTier[] = [
  {
    name: "Coffee Explorer",
    icon: Coffee,
    color: "text-muted-foreground",
    benefits: ["Basic mood recommendations", "5% discount", "Birthday surprise"],
    pointsRequired: 0
  },
  {
    name: "Aura Enthusiast", 
    icon: Star,
    color: "text-accent",
    benefits: ["Priority seating", "10% discount", "Exclusive blends", "Free size upgrades"],
    pointsRequired: 500
  },
  {
    name: "Mood Master",
    icon: Zap,
    color: "text-energized",
    benefits: ["Room reservations", "15% discount", "Masterclass access", "Custom blends"],
    pointsRequired: 1500
  },
  {
    name: "Aura Elite",
    icon: Crown,
    color: "text-primary-glow",
    benefits: ["Concierge service", "20% discount", "Private events", "NFT collectibles"],
    pointsRequired: 3000
  }
];

interface UserStats {
  name: string;
  currentPoints: number;
  currentTier: number;
  totalVisits: number;
  favoriteMood: string;
  lifetimeSpent: number;
}

const mockUser: UserStats = {
  name: "Sarah Chen",
  currentPoints: 1250,
  currentTier: 1,
  totalVisits: 47,
  favoriteMood: "Focused",
  lifetimeSpent: 340.50
};

export function LoyaltyProgram() {
  const currentTier = loyaltyTiers[mockUser.currentTier];
  const nextTier = loyaltyTiers[mockUser.currentTier + 1];
  const progressToNext = nextTier ? 
    ((mockUser.currentPoints - currentTier.pointsRequired) / (nextTier.pointsRequired - currentTier.pointsRequired)) * 100 
    : 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-display font-bold text-foreground">
          Your Aura Journey
        </h2>
        <p className="text-xl text-muted-foreground">
          Every sip earns rewards, every visit deepens your connection
        </p>
      </div>

      {/* Current Status */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-display">
                Welcome back, {mockUser.name}
              </CardTitle>
              <p className="text-primary-foreground/80">
                Your favorite mood: {mockUser.favoriteMood}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{mockUser.currentPoints}</div>
              <div className="text-primary-foreground/80">Aura Points</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <currentTier.icon className={`h-8 w-8 ${currentTier.color}`} />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{currentTier.name}</span>
                {nextTier && (
                  <span className="text-sm text-primary-foreground/80">
                    {nextTier.pointsRequired - mockUser.currentPoints} points to {nextTier.name}
                  </span>
                )}
              </div>
              {nextTier && (
                <Progress value={progressToNext} className="h-2" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center hover:shadow-mood transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">{mockUser.totalVisits}</div>
            <div className="text-muted-foreground">Total Visits</div>
          </CardContent>
        </Card>
        
        <Card className="text-center hover:shadow-mood transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-accent mb-2">${mockUser.lifetimeSpent}</div>
            <div className="text-muted-foreground">Lifetime Spent</div>
          </CardContent>
        </Card>
        
        <Card className="text-center hover:shadow-mood transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-energized mb-2">
              {Math.floor(mockUser.currentPoints / 100)}
            </div>
            <div className="text-muted-foreground">Free Drinks Earned</div>
          </CardContent>
        </Card>
      </div>

      {/* Tier Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loyaltyTiers.map((tier, index) => {
          const TierIcon = tier.icon;
          const isCurrentTier = index === mockUser.currentTier;
          const isUnlocked = index <= mockUser.currentTier;
          
          return (
            <Card 
              key={tier.name}
              className={`transition-all duration-300 hover:scale-105 ${
                isCurrentTier ? 'ring-2 ring-accent shadow-glow' : 
                isUnlocked ? 'shadow-mood' : 'opacity-60'
              }`}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <TierIcon className={`h-12 w-12 ${tier.color}`} />
                </div>
                <CardTitle className="text-lg font-display">
                  {tier.name}
                  {isCurrentTier && (
                    <Badge className="ml-2 bg-accent text-accent-foreground">
                      Current
                    </Badge>
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {tier.pointsRequired} points
                </p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {tier.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${isUnlocked ? 'bg-accent' : 'bg-muted-foreground'}`} />
                    <span className={isUnlocked ? 'text-foreground' : 'text-muted-foreground'}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Rewards Section */}
      <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/30">
        <CardHeader>
          <CardTitle className="text-2xl font-display flex items-center space-x-2">
            <Gift className="h-6 w-6 text-accent" />
            <span>Available Rewards</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="mood" className="h-20 flex-col">
              <Coffee className="h-6 w-6 mb-2" />
              <div className="text-center">
                <div className="font-semibold">Free Coffee</div>
                <div className="text-xs opacity-80">100 points</div>
              </div>
            </Button>
            
            <Button variant="mood" className="h-20 flex-col">
              <Trophy className="h-6 w-6 mb-2" />
              <div className="text-center">
                <div className="font-semibold">Masterclass</div>
                <div className="text-xs opacity-80">500 points</div>
              </div>
            </Button>
            
            <Button variant="mood" className="h-20 flex-col">
              <Star className="h-6 w-6 mb-2" />
              <div className="text-center">
                <div className="font-semibold">NFT Collectible</div>
                <div className="text-xs opacity-80">1000 points</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}