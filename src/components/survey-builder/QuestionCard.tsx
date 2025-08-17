import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useLanguage } from '@/contexts/LanguageContext';
import { Question } from '@/pages/SurveyBuilder';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GripVertical, 
  Copy, 
  Trash2, 
  CheckCircle, 
  Type, 
  Star, 
  CheckSquare, 
  ChevronDown 
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  index: number;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const questionTypeIcons = {
  'multiple-choice': CheckCircle,
  'text-input': Type,
  'rating-scale': Star,
  'checkbox': CheckSquare,
  'dropdown': ChevronDown,
};

const questionTypeLabels = {
  'multiple-choice': 'Multiple Choice',
  'text-input': 'Text Input',
  'rating-scale': 'Rating Scale',
  'checkbox': 'Checkbox',
  'dropdown': 'Dropdown',
};

export const QuestionCard = ({
  question,
  index,
  selected,
  onSelect,
  onDelete,
  onDuplicate,
}: QuestionCardProps) => {
  const { t } = useLanguage();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'question',
    item: { id: question.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'question',
    hover: (item: { id: string; index: number }) => {
      if (item.index !== index) {
        // Handle reordering logic here if needed
      }
    },
  }));

  const Icon = questionTypeIcons[question.type];

  const renderPreview = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-2">
            {question.options?.map((option, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-muted-foreground/30 rounded-full" />
                <span className="text-sm text-muted-foreground">{option}</span>
              </div>
            ))}
          </div>
        );
      
      case 'text-input':
        return (
          <div className="border border-muted-foreground/20 rounded-md p-3 bg-muted/20">
            <span className="text-sm text-muted-foreground">
              {question.placeholder || t('Enter your answer...')}
            </span>
          </div>
        );
      
      case 'rating-scale':
        return (
          <div className="flex gap-1">
            {Array.from({ length: question.maxRating || 5 }).map((_, idx) => (
              <Star 
                key={idx} 
                className="w-6 h-6 text-muted-foreground/30 hover:text-yellow-400 cursor-pointer" 
              />
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {question.options?.map((option, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-muted-foreground/30 rounded" />
                <span className="text-sm text-muted-foreground">{option}</span>
              </div>
            ))}
          </div>
        );
      
      case 'dropdown':
        return (
          <div className="border border-muted-foreground/20 rounded-md p-3 bg-muted/20 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t('Select an option...')}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card
      ref={(node) => drag(drop(node))}
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
        selected ? 'ring-2 ring-primary shadow-lg' : ''
      } ${isDragging ? 'opacity-50' : ''}`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-2 cursor-move">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="w-5 h-5 bg-muted rounded-full flex items-center justify-center font-medium">
              {index + 1}
            </span>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4 text-primary" />
            <Badge variant="secondary" className="text-xs">
              {t(questionTypeLabels[question.type])}
            </Badge>
            {question.required && (
              <Badge variant="destructive" className="text-xs">
                {t('Required')}
              </Badge>
            )}
          </div>
          
          <h3 className="font-medium mb-1">{question.title}</h3>
          {question.description && (
            <p className="text-sm text-muted-foreground mb-3">{question.description}</p>
          )}
          
          <div className="mb-3">
            {renderPreview()}
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="h-8 w-8"
          >
            <Copy className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};