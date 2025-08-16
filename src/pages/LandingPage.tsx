import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BarChart3, Smartphone, Phone, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Smart Survey Builder",
      description: "AI-powered drag-and-drop survey creation with question suggestions"
    },
    {
      icon: Smartphone,
      title: "WhatsApp Integration",
      description: "Deploy surveys directly through WhatsApp for maximum reach"
    },
    {
      icon: Phone,
      title: "IVR Support",
      description: "Voice-based surveys through Interactive Voice Response"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Live dashboards with completion rates and response metrics"
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Auto-translate to Hindi, Tamil, Bengali and other Indian languages"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">Y</span>
              </div>
              <span className="text-xl font-bold text-foreground">Yantra</span>
            </div>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Main Slogan */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Sahi data, behtar disha
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Correct data leads to better direction. Yantra is an AI-powered smart survey platform 
              designed for accurate data collection and meaningful insights across India.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button 
              variant="gradient" 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="text-lg px-8 py-4 h-auto"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Powerful Features for Smart Data Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for India's diverse landscape with support for multiple languages, 
            channels, and verification methods including Aadhaar integration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg p-6 border border-border/40 hover:shadow-elegant transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Yantra. Empowering India with smart data collection.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;