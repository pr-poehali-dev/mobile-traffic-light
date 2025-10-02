import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface LessonCardProps {
  title: string;
  description: string;
  progress: number;
  icon: string;
  isLocked?: boolean;
  onStart: () => void;
}

export default function LessonCard({ 
  title, 
  description, 
  progress, 
  icon, 
  isLocked = false,
  onStart 
}: LessonCardProps) {
  const getProgressColor = () => {
    if (progress <= 33) return 'bg-destructive';
    if (progress <= 66) return 'bg-secondary';
    return 'bg-primary';
  };

  const getStatusLight = () => {
    if (progress === 0) return 'bg-muted';
    if (progress <= 33) return 'bg-destructive animate-pulse';
    if (progress <= 66) return 'bg-secondary animate-pulse';
    return 'bg-primary animate-pulse-glow';
  };

  return (
    <Card className="p-6 hover:shadow-xl transition-all duration-300 animate-fade-in hover:scale-[1.02] border-2">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className={`w-12 h-12 rounded-full ${getStatusLight()} flex items-center justify-center text-2xl`}>
            {icon}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Прогресс</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <div className="relative">
              <Progress value={progress} className="h-2" />
              <div 
                className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressColor()}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Button 
            onClick={onStart} 
            disabled={isLocked}
            className={`w-full font-semibold ${
              progress === 100 
                ? 'bg-primary hover:bg-primary/90 text-black' 
                : progress > 0 
                ? 'bg-secondary hover:bg-secondary/90 text-black'
                : 'bg-muted hover:bg-muted/90'
            }`}
          >
            {isLocked ? (
              <>
                <Icon name="Lock" size={16} className="mr-2" />
                Заблокировано
              </>
            ) : progress === 100 ? (
              <>
                <Icon name="CheckCircle" size={16} className="mr-2" />
                Завершено
              </>
            ) : progress > 0 ? (
              <>
                <Icon name="Play" size={16} className="mr-2" />
                Продолжить
              </>
            ) : (
              <>
                <Icon name="Rocket" size={16} className="mr-2" />
                Начать урок
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
