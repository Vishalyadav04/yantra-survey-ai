import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QuestionTypeSidebar } from '@/components/survey-builder/QuestionTypeSidebar';
import { SurveyCanvas } from '@/components/survey-builder/SurveyCanvas';
import { PropertiesPanel } from '@/components/survey-builder/PropertiesPanel';
import { toast } from 'sonner';

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
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={previewSurvey}>
                <Eye className="h-4 w-4 mr-2" />
                {t('Preview')}
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
      </div>
    </DndProvider>
  );
};

export default SurveyBuilder;