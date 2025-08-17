import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Question } from '@/pages/SurveyBuilder';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Settings } from 'lucide-react';

interface PropertiesPanelProps {
  question: Question | null;
  onUpdateQuestion: (question: Question) => void;
}

export const PropertiesPanel = ({
  question,
  onUpdateQuestion,
}: PropertiesPanelProps) => {
  const { t } = useLanguage();

  if (!question) {
    return (
      <div className="w-80 bg-background border-l">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5" />
            <h2 className="text-lg font-semibold">{t('Properties')}</h2>
          </div>
          <Card className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t('Select a question to edit its properties')}
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const updateField = (field: keyof Question, value: any) => {
    onUpdateQuestion({ ...question, [field]: value });
  };

  const addOption = () => {
    const options = question.options || [];
    updateField('options', [...options, `Option ${options.length + 1}`]);
  };

  const updateOption = (index: number, value: string) => {
    const options = [...(question.options || [])];
    options[index] = value;
    updateField('options', options);
  };

  const removeOption = (index: number) => {
    const options = [...(question.options || [])];
    options.splice(index, 1);
    updateField('options', options);
  };

  const hasOptions = ['multiple-choice', 'checkbox', 'dropdown'].includes(question.type);
  const hasRating = question.type === 'rating-scale';
  const hasPlaceholder = question.type === 'text-input';

  return (
    <div className="w-80 bg-background border-l overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5" />
          <h2 className="text-lg font-semibold">{t('Properties')}</h2>
        </div>

        <div className="space-y-6">
          {/* Question Type */}
          <div>
            <Label className="text-sm font-medium">{t('Question Type')}</Label>
            <Badge variant="outline" className="mt-1 capitalize">
              {question.type.replace('-', ' ')}
            </Badge>
          </div>

          <Separator />

          {/* Question Title */}
          <div className="space-y-2">
            <Label htmlFor="title">{t('Question Title')}</Label>
            <Textarea
              id="title"
              value={question.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder={t('Enter question title...')}
              rows={2}
            />
          </div>

          {/* Question Description */}
          <div className="space-y-2">
            <Label htmlFor="description">{t('Description')} <span className="text-muted-foreground">({t('Optional')})</span></Label>
            <Textarea
              id="description"
              value={question.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder={t('Add a description...')}
              rows={2}
            />
          </div>

          {/* Required Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="required">{t('Required Question')}</Label>
            <Switch
              id="required"
              checked={question.required}
              onCheckedChange={(checked) => updateField('required', checked)}
            />
          </div>

          <Separator />

          {/* Options for Multiple Choice, Checkbox, Dropdown */}
          {hasOptions && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>{t('Options')}</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {t('Add')}
                </Button>
              </div>
              
              <div className="space-y-2">
                {(question.options || []).map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`${t('Option')} ${index + 1}`}
                      className="flex-1"
                    />
                    {(question.options?.length || 0) > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rating Scale Settings */}
          {hasRating && (
            <div className="space-y-2">
              <Label htmlFor="maxRating">{t('Maximum Rating')}</Label>
              <Input
                id="maxRating"
                type="number"
                min="3"
                max="10"
                value={question.maxRating || 5}
                onChange={(e) => updateField('maxRating', parseInt(e.target.value))}
              />
            </div>
          )}

          {/* Placeholder for Text Input */}
          {hasPlaceholder && (
            <div className="space-y-2">
              <Label htmlFor="placeholder">{t('Placeholder Text')}</Label>
              <Input
                id="placeholder"
                value={question.placeholder || ''}
                onChange={(e) => updateField('placeholder', e.target.value)}
                placeholder={t('Enter placeholder text...')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};