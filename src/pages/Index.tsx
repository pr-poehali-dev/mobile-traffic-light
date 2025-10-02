import { useState } from 'react';
import LessonCard from '@/components/LessonCard';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Lesson {
  id: number;
  title: string;
  description: string;
  progress: number;
  icon: string;
  isLocked: boolean;
}

export default function Index() {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: 1,
      title: 'Переменные: Основы',
      description: 'Узнай, как хранить данные в программах. Создай свой первый светофор с переменными!',
      progress: 0,
      icon: '🚦',
      isLocked: false
    },
    {
      id: 2,
      title: 'Условия: If-Else',
      description: 'Научись управлять светофором с помощью условий. Красный, жёлтый или зелёный?',
      progress: 0,
      icon: '🚦',
      isLocked: true
    },
    {
      id: 3,
      title: 'Циклы: Повторения',
      description: 'Автоматизируй работу светофора! Создай бесконечный цикл переключения сигналов.',
      progress: 0,
      icon: '🚦',
      isLocked: true
    },
    {
      id: 4,
      title: 'Функции: Твой код',
      description: 'Создай свою функцию управления светофором. Сделай код чище и понятнее!',
      progress: 0,
      icon: '🚦',
      isLocked: true
    },
    {
      id: 5,
      title: 'Массивы: Множество сигналов',
      description: 'Управляй несколькими светофорами одновременно с помощью массивов!',
      progress: 0,
      icon: '🚦',
      isLocked: true
    },
    {
      id: 6,
      title: 'Итоговый проект',
      description: 'Построй свою систему управления городским движением с умными светофорами!',
      progress: 0,
      icon: '🏆',
      isLocked: true
    }
  ]);

  const handleStartLesson = (lessonId: number) => {
    setLessons(prev => 
      prev.map(lesson => {
        if (lesson.id === lessonId) {
          const newProgress = lesson.progress === 100 ? 100 : Math.min(lesson.progress + 34, 100);
          return { ...lesson, progress: newProgress };
        }
        if (lesson.id === lessonId + 1 && prev.find(l => l.id === lessonId)?.progress === 100) {
          return { ...lesson, isLocked: false };
        }
        return lesson;
      })
    );
  };

  const totalProgress = Math.round(
    lessons.reduce((sum, lesson) => sum + lesson.progress, 0) / lessons.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-6xl">🚦</div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-destructive via-secondary to-primary bg-clip-text text-transparent">
              CODING LIGHT
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            Интерактивное обучение программированию через управление светофором
          </p>
          
          <div className="max-w-md mx-auto space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>Общий прогресс</span>
              <span className="text-lg">{totalProgress}%</span>
            </div>
            <div className="relative h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full transition-all duration-500 rounded-full ${
                  totalProgress <= 33 ? 'bg-destructive' :
                  totalProgress <= 66 ? 'bg-secondary' :
                  'bg-primary'
                }`}
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
        </header>

        <nav className="flex justify-center gap-4 mb-8">
          <Button variant="default" className="bg-primary hover:bg-primary/90 text-black font-semibold">
            <Icon name="BookOpen" size={18} className="mr-2" />
            Уроки
          </Button>
          <Button variant="outline" className="font-semibold">
            <Icon name="Code" size={18} className="mr-2" />
            Практика
          </Button>
          <Button variant="outline" className="font-semibold">
            <Icon name="User" size={18} className="mr-2" />
            Профиль
          </Button>
        </nav>

        <div className="grid gap-6 md:grid-cols-2">
          {lessons.map((lesson, index) => (
            <div 
              key={lesson.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-scale-in"
            >
              <LessonCard
                title={lesson.title}
                description={lesson.description}
                progress={lesson.progress}
                icon={lesson.icon}
                isLocked={lesson.isLocked}
                onStart={() => handleStartLesson(lesson.id)}
              />
            </div>
          ))}
        </div>

        <footer className="mt-16 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Sparkles" size={16} />
            <span>Создано с помощью интерактивных технологий обучения</span>
            <Icon name="Sparkles" size={16} />
          </p>
        </footer>
      </div>
    </div>
  );
}
