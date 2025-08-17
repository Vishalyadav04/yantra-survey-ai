import React from 'react';
import { useDrop } from 'react-dnd';
import { useLanguage } from '@/contexts/LanguageContext';
import { Question } from '@/pages/SurveyBuilder';
import { QuestionCard } from './QuestionCard';
import { Card } from '@/components/ui/card';
import { Plus, MousePointer2 } from 'lucide-react';

interface SurveyCanvasProps {
  questions: Question[];
  selectedQuestion: Question | null;
  onSelectQuestion: (question: Question) => void;
  onDeleteQuestion: (questionId: string) => void;
  onDuplicateQuestion: (question: Question) => void;
}

export const SurveyCanvas = ({
  questions,
  selectedQuestion,
  onSelectQuestion,
  onDeleteQuestion,
  onDuplicateQuestion,
}: SurveyCanvasProps) => {
  const { t } = useLanguage();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'question-type',
    drop: (item: { type: Question['type'] }) => {
      // This will be handled by the parent component through onAddQuestion
      console.log('Dropped question type:', item.type);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div 
      ref={drop}
      className={`flex-1 p-6 overflow-y-auto transition-colors ${
        isOver ? 'bg-primary/5' : 'bg-background'
      }`}
    >
      <div className="max-w-2xl mx-auto">
        {questions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <Card className="p-8 text-center border-2 border-dashed border-muted-foreground/20">
              <div className="mb-4">
                <MousePointer2 className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">{t('Start Building Your Survey')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('Drag question types from the sidebar or click them to add to your survey')}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Plus className="h-4 w-4" />
                {t('Add your first question to get started')}
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                selected={selectedQuestion?.id === question.id}
                onSelect={() => onSelectQuestion(question)}
                onDelete={() => onDeleteQuestion(question.id)}
                onDuplicate={() => onDuplicateQuestion(question)}
              />
            ))}
            
            {/* Add Question Prompt */}
            <Card className="p-6 border-2 border-dashed border-muted-foreground/20 text-center hover:border-primary/30 transition-colors">
              <Plus className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {t('Drag more question types here or click them in the sidebar')}
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};