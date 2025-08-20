import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { useAIValidation } from '@/hooks/useAIValidation';
import { useAutoCoding } from '@/hooks/useAutoCoding';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SurveyModal = ({ isOpen, onClose }: SurveyModalProps) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState({
    health_rating: '',
    health_concern: '',
    exercise_frequency: ''
  });

  const { issues, consistencyScore, loading: valLoading, validate } = useAIValidation();
  const { coded, loading: codeLoading, categorize } = useAutoCoding();

  const schema = {
    title: t('surveyTitle'),
    questions: [
      { id: 'health_rating', type: 'single-choice', title: t('question1'), required: true },
      { id: 'health_concern', type: 'text', title: t('question2') },
      { id: 'exercise_frequency', type: 'single-choice', title: t('question3'), required: true },
    ],
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      validate(schema, answers);
      const text = (answers.health_concern || '').trim();
      if (text.length >= 10) {
        categorize([text], undefined, 3);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [answers.health_rating, answers.health_concern, answers.exercise_frequency]);

  const handleSubmit = () => {
    toast({
      title: "Survey Submitted",
      description: "Thank you for your participation!",
    });
    onClose();
    setAnswers({
      health_rating: '',
      health_concern: '',
      exercise_frequency: ''
    });
  };

  const handleWhatsAppShare = () => {
    const surveyUrl = `${window.location.origin}/survey/health-wellness`;
    const message = `${t('sampleSurveyTitle')} - ${t('sampleSurveyDesc')} ${surveyUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Survey Link Shared",
      description: "Survey link copied to WhatsApp!",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-3">
            {t('surveyTitle')}
            <Badge variant="secondary">Consistency: {Math.round(consistencyScore)}%</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 py-4">
          {/* Question 1 */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">{t('question1')}</Label>
            <RadioGroup
              value={answers.health_rating}
              onValueChange={(value) => setAnswers({...answers, health_rating: value})}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excellent" id="excellent" />
                <Label htmlFor="excellent">{t('excellent')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="good" />
                <Label htmlFor="good">{t('good')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="average" id="average" />
                <Label htmlFor="average">{t('average')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="poor" id="poor" />
                <Label htmlFor="poor">{t('poor')}</Label>
              </div>
            </RadioGroup>
            {issues.filter(i => i.questionId === 'health_rating').map(i => (
              <p key={i.id} className="text-sm text-destructive">{i.message}</p>
            ))}
          </div>

          {/* Question 2 */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">{t('question2')}</Label>
            <Textarea
              placeholder="Please describe your primary health concern..."
              value={answers.health_concern}
              onChange={(e) => setAnswers({...answers, health_concern: e.target.value})}
              className="min-h-20"
            />
            {coded[0]?.categories?.length ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {coded[0].categories.map((c, idx) => (
                  <Badge key={idx} variant="outline">{c.label} • {(c.confidence * 100).toFixed(0)}%</Badge>
                ))}
              </div>
            ) : null}
            {issues.filter(i => i.questionId === 'health_concern').map(i => (
              <p key={i.id} className="text-sm text-destructive">{i.message}</p>
            ))}
          </div>

          {/* Question 3 */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">{t('question3')}</Label>
            <RadioGroup
              value={answers.exercise_frequency}
              onValueChange={(value) => setAnswers({...answers, exercise_frequency: value})}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily">Daily</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly">3-5 times per week</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sometimes" id="sometimes" />
                <Label htmlFor="sometimes">1-2 times per week</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rarely" id="rarely" />
                <Label htmlFor="rarely">Rarely or never</Label>
              </div>
            </RadioGroup>
            {issues.filter(i => i.questionId === 'exercise_frequency').map(i => (
              <p key={i.id} className="text-sm text-destructive">{i.message}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={handleWhatsAppShare}
            variant="outline"
            className="flex items-center gap-2 flex-1"
          >
            <Share2 className="h-4 w-4" />
            {t('shareWhatsApp')}
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            {t('cancel')}
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            {t('submit')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};