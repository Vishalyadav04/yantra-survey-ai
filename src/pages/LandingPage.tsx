import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BarChart3, Smartphone, Phone, Globe, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SurveyModal } from "@/components/SurveyModal";
import { useState } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: t('smartSurveyBuilder'),
      description: t('smartSurveyDesc')
    },
    {
      icon: Smartphone,
      title: t('whatsappIntegration'),
      description: t('whatsappDesc')
    },
    {
      icon: Phone,
      title: t('ivrSupport'),
      description: t('ivrDesc')
    },
    {
      icon: BarChart3,
      title: t('realTimeAnalytics'),
      description: t('analyticsDesc')
    },
    {
      icon: Globe,
      title: t('multiLanguageSupport'),
      description: t('multiLanguageDesc')
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
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                {t('signIn')}
              </Button>
            </div>
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
                {t('landingTitle')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('landingSubtitle')}
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
              {t('getStarted')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('featuresTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('featuresSubtitle')}
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

      {/* Sample Survey Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Try Our Survey Platform
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience our platform with this sample survey
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-lg p-6 border border-border/40 hover:shadow-elegant transition-all duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{t('sampleSurveyTitle')}</h3>
                <p className="text-sm text-muted-foreground">{t('sampleSurveyDesc')}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => setIsSurveyModalOpen(true)}
                className="flex-1"
              >
                {t('takeSurvey')}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  const surveyUrl = `${window.location.origin}/survey/health-wellness`;
                  const message = `${t('sampleSurveyTitle')} - ${t('sampleSurveyDesc')} ${surveyUrl}`;
                  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="flex-1"
              >
                {t('shareWhatsApp')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Survey Modal */}
      <SurveyModal 
        isOpen={isSurveyModalOpen}
        onClose={() => setIsSurveyModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Yantra. {t('footerText')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;