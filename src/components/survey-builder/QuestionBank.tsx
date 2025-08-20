import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Question } from '@/pages/SurveyBuilder';
import { QuestionTemplate, NSSLIBRARY } from '@/data/nss-questions';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Plus, Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface QuestionBankProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  surveyTitle: string;
  surveyDescription: string;
  onAddQuestionTemplate: (template: QuestionTemplate) => void;
}

export const QuestionBank = ({ open, onOpenChange, surveyTitle, surveyDescription, onAddQuestionTemplate }: QuestionBankProps) => {
  const { t, currentLanguage } = useLanguage();
  const [title, setTitle] = useState(surveyTitle);
  const [desc, setDesc] = useState(surveyDescription);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<QuestionTemplate[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(surveyTitle);
  }, [surveyTitle]);
  useEffect(() => {
    setDesc(surveyDescription);
  }, [surveyDescription]);

  const filteredNSS = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return NSSLIBRARY;
    return NSSLIBRARY.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      item.tags?.some(tag => tag.toLowerCase().includes(q))
    );
  }, [search]);

  const generateSuggestions = async () => {
    try {
      setLoading(true);
      setSuggestions(null);
      const res = await fetch('/functions/v1/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description: desc, language: currentLanguage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate');
      const arr = Array.isArray(data.suggestions) ? data.suggestions : [];
      setSuggestions(arr);
    } catch (e: any) {
      console.error(e);
      toast.error(t('Failed to generate suggestions'));
    } finally {
      setLoading(false);
    }
  };

  const renderTemplate = (tpl: QuestionTemplate, idx: number) => (
    <Card key={`${tpl.title}-${idx}`} className="p-4 flex items-start gap-3">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {tpl.category && <Badge variant="outline">{tpl.category}</Badge>}
          {tpl.source && <Badge variant="secondary">{tpl.source}</Badge>}
          <Badge variant="default" className="capitalize">{tpl.type.replace('-', ' ')}</Badge>
        </div>
        <h4 className="font-medium mb-1">{tpl.title}</h4>
        {tpl.description && <p className="text-sm text-muted-foreground mb-2">{tpl.description}</p>}
        {Array.isArray(tpl.options) && tpl.options.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {tpl.options.map((opt, i) => (
              <Badge key={i} variant="outline">{opt}</Badge>
            ))}
          </div>
        )}
      </div>
      <div>
        <Button onClick={() => onAddQuestionTemplate(tpl)} size="sm" className="gap-1">
          <Plus className="w-4 h-4" /> {t('Add')}
        </Button>
      </div>
    </Card>
  );

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> {t('Question Bank')}
          </DrawerTitle>
          <DrawerDescription>
            {t('Use AI suggestions or search standardized NSS questions to quickly build your survey')}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-6 pb-6 space-y-6 overflow-y-auto">
          {/* Context inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('Survey Title')}</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('Enter survey title')} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('Survey Description')}</label>
              <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={2} placeholder={t('Briefly describe the survey')} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={generateSuggestions} disabled={loading} className="gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {t('Generate AI Suggestions')}
            </Button>
          </div>

          <Tabs defaultValue="suggested" className="w-full">
            <TabsList>
              <TabsTrigger value="suggested">{t('Suggested')}</TabsTrigger>
              <TabsTrigger value="nss">{t('NSS Library')}</TabsTrigger>
            </TabsList>

            <TabsContent value="suggested" className="space-y-3 mt-4">
              {!suggestions && !loading && (
                <Card className="p-6 text-sm text-muted-foreground">
                  {t('Click "Generate AI Suggestions" to get tailored questions for your survey')}
                </Card>
              )}
              {Array.isArray(suggestions) && suggestions.length > 0 && (
                <div className="space-y-3">
                  {suggestions.map((tpl, idx) => renderTemplate(tpl, idx))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="nss" className="space-y-3 mt-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('Search NSS questions by keyword, category, or tag')}
                  className="pl-9"
                />
              </div>
              <div className="grid gap-3">
                {filteredNSS.map((tpl, idx) => renderTemplate(tpl, idx))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
