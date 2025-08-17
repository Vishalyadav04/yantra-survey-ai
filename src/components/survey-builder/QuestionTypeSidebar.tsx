import React from 'react';
import { useDrag } from 'react-dnd';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  CheckSquare, 
  Type, 
  Star, 
  CheckCircle, 
  ChevronDown,
  MousePointer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuestionTypeSidebarProps {
  onAddQuestion: (type: 'multiple-choice' | 'text-input' | 'rating-scale' | 'checkbox' | 'dropdown') => void;
}

const questionTypes = [
  {
    type: 'multiple-choice' as const,
    icon: CheckCircle,
    titleKey: 'Multiple Choice',
    descriptionKey: 'Single selection from options'
  },
  {
    type: 'text-input' as const,
    icon: Type,
    titleKey: 'Text Input',
    descriptionKey: 'Free text response'
  },
  {
    type: 'rating-scale' as const,
    icon: Star,
    titleKey: 'Rating Scale',
    descriptionKey: 'Star or number rating'
  },
  {
    type: 'checkbox' as const,
    icon: CheckSquare,
    titleKey: 'Checkbox',
    descriptionKey: 'Multiple selections allowed'
  },
  {
    type: 'dropdown' as const,
    icon: ChevronDown,
    titleKey: 'Dropdown',
    descriptionKey: 'Select from dropdown list'
  }
];

const DraggableQuestionType = ({ questionType, onAddQuestion }: {
  questionType: typeof questionTypes[0];
  onAddQuestion: QuestionTypeSidebarProps['onAddQuestion'];
}) => {
  const { t } = useLanguage();
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'question-type',
    item: { type: questionType.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const Icon = questionType.icon;

  return (
    <Card
      ref={drag}
      className={`p-4 cursor-move hover:shadow-md transition-all border-2 ${
        isDragging ? 'opacity-50 border-primary' : 'border-transparent hover:border-primary/20'
      }`}
      onClick={() => onAddQuestion(questionType.type)}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm mb-1">
            {t(questionType.titleKey)}
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t(questionType.descriptionKey)}
          </p>
        </div>
      </div>
    </Card>
  );
};

export const QuestionTypeSidebar = ({ onAddQuestion }: QuestionTypeSidebarProps) => {
  const { t } = useLanguage();

  return (
    <div className="w-80 bg-background border-r overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{t('Question Types')}</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <MousePointer className="h-4 w-4" />
            {t('Drag or click to add questions')}
          </p>
        </div>
        
        <div className="space-y-3">
          {questionTypes.map((questionType) => (
            <DraggableQuestionType
              key={questionType.type}
              questionType={questionType}
              onAddQuestion={onAddQuestion}
            />
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium text-sm mb-2">{t('Pro Tip')}</h3>
          <p className="text-xs text-muted-foreground">
            {t('You can reorder questions by dragging them in the canvas area')}
          </p>
        </div>
      </div>
    </div>
  );
};