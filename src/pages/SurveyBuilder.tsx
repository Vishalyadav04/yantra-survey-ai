import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye, Library } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QuestionTypeSidebar } from '@/components/survey-builder/QuestionTypeSidebar';
import { SurveyCanvas } from '@/components/survey-builder/SurveyCanvas';
import { PropertiesPanel } from '@/components/survey-builder/PropertiesPanel';
import { toast } from 'sonner';
import { QuestionBank } from '@/components/survey-builder/QuestionBank';

export interface Question {
  id: string;
  type: 'multiple-choice' | 'text-input' | 'rating-scale' | 'checkbox' | 'dropdown';
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  maxRating?: number;
  placeholder?: string;
}

const SurveyBuilder = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [surveyTitle, setSurveyTitle] = useState('Untitled Survey');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [bankOpen, setBankOpen] = useState(false);

  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      title: t(`New ${type.replace('-', ' ')} question`),
      required: false,
      ...(type === 'multiple-choice' && { options: ['Option 1', 'Option 2'] }),
      ...(type === 'rating-scale' && { maxRating: 5 }),
      ...(type === 'text-input' && { placeholder: 'Enter your answer...' }),
    };
    
    setQuestions(prev => [...prev, newQuestion]);
    setSelectedQuestion(newQuestion);
    toast.success(t('Question added successfully'));
  };

  const addQuestionFromTemplate = (tpl: Partial<Question>) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: (tpl.type as Question['type']) || 'text-input',
      title: tpl.title || t('New question'),
      description: tpl.description,
      required: Boolean(tpl.required),
      options: tpl.options,
      maxRating: tpl.maxRating,
      placeholder: tpl.placeholder,
    };
    setQuestions(prev => [...prev, newQuestion]);
    setSelectedQuestion(newQuestion);
    toast.success(t('Added from question bank'));
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions(prev => 
      prev.map(q => q.id === updatedQuestion.id ? updatedQuestion : q)
    );
    setSelectedQuestion(updatedQuestion);
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
    if (selectedQuestion?.id === questionId) {
      setSelectedQuestion(null);
    }
    toast.success(t('Question deleted'));
  };

  const duplicateQuestion = (question: Question) => {
    const duplicated: Question = {
      ...question,
      id: Date.now().toString(),
      title: `${question.title} (Copy)`,
    };
    setQuestions(prev => [...prev, duplicated]);
    toast.success(t('Question duplicated'));
  };

  const saveSurvey = () => {
    toast.success(t('Survey saved successfully'));
  };

  const previewSurvey = () => {
    toast.info(t('Survey preview will open in a new tab'));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
        {/* Header */}
        <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <input
                  type="text"
                  value={surveyTitle}
                  onChange={(e) => setSurveyTitle(e.target.value)}
                  className="text-xl font-semibold bg-transparent border-none outline-none focus:bg-muted/50 rounded px-2 py-1"
                />
                <p className="text-sm text-muted-foreground">{t('Survey Builder')}</p>
                <input
                  type="text"
                  value={surveyDescription}
                  onChange={(e) => setSurveyDescription(e.target.value)}
                  placeholder={t('Add a short description (optional)')}
                  className="text-sm bg-transparent border-none outline-none focus:bg-muted/40 rounded px-2 py-1 w-full text-muted-foreground"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={previewSurvey}>
                <Eye className="h-4 w-4 mr-2" />
                {t('Preview')}
              </Button>
              <Button variant="secondary" onClick={() => setBankOpen(true)}>
                <Library className="h-4 w-4 mr-2" />
                {t('Question Bank')}
              </Button>
              <Button onClick={saveSurvey}>
                <Save className="h-4 w-4 mr-2" />
                {t('Save')}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Question Types Sidebar */}
          <QuestionTypeSidebar onAddQuestion={addQuestion} />
          
          {/* Canvas */}
          <SurveyCanvas
            questions={questions}
            selectedQuestion={selectedQuestion}
            onSelectQuestion={setSelectedQuestion}
            onDeleteQuestion={deleteQuestion}
            onDuplicateQuestion={duplicateQuestion}
          />
          
          {/* Properties Panel */}
          <PropertiesPanel
            question={selectedQuestion}
            onUpdateQuestion={updateQuestion}
          />
        </div>

        {/* Question Bank Drawer */}
        <QuestionBank
          open={bankOpen}
          onOpenChange={setBankOpen}
          surveyTitle={surveyTitle}
          surveyDescription={surveyDescription}
          onAddQuestionTemplate={(tpl) => addQuestionFromTemplate(tpl)}
        />
      </div>
    </DndProvider>
  );
};

export default SurveyBuilder;