import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import heroImage from "@/assets/hero-coffee-lounge.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Badge className="bg-accent text-accent-foreground shadow-glow">
          <Sparkles className="h-3 w-3 mr-1" />
          AI-Powered
        </Badge>
      </div>
      
      <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Badge className="bg-romantic text-white shadow-glow">
          <Heart className="h-3 w-3 mr-1" />
          Mood-Matched
        </Badge>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Brand Identity */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight">
              <span className="text-white">Aura</span>
              <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent ml-4">
                Coffee
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-medium text-white/90">
              Where emotion meets exceptional coffee
            </p>
          </div>

          {/* Tagline */}
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Experience more than caffeine. Discover personalized, mood-matched coffee moments 
              in our tech-enabled, sensory-rich luxury lounge.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-lg text-white/70">
              <span>🧠 Emotion-driven recommendations</span>
              <span>🌸 Multi-sensory spaces</span>
              <span>✨ Premium craftsmanship</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onGetStarted}
              variant="premium"
              size="xl"
              className="group"
            >
              Discover Your Aura
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Explore Spaces
            </Button>
          </div>

          {/* Brand Promise */}
          <div className="pt-8">
            <p className="text-lg text-white/60 italic">
              "Every sip tells your story, every space shapes your mood"
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}