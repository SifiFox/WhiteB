import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Users,
  Heart,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
  Github,
} from 'lucide-react';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Создание постов',
      description: 'Делитесь своими мыслями, идеями и опытом с сообществом',
    },
    {
      icon: Users,
      title: 'Сообщество',
      description: 'Общайтесь с единомышленниками и находите новых друзей',
    },
    {
      icon: Heart,
      title: 'Система лайков',
      description: 'Оценивайте контент и выражайте свое мнение',
    },
    {
      icon: Sparkles,
      title: 'Избранное',
      description: 'Сохраняйте понравившиеся посты в избранном',
    },
    {
      icon: Shield,
      title: 'Модерация',
      description: 'Система администрирования для поддержания порядка',
    },
    {
      icon: Zap,
      title: 'Быстро и современно',
      description: 'Построено на React, TypeScript и современных технологиях',
    },
  ];

  const stats = [
    { label: 'Активных пользователей', value: '100+' },
    { label: 'Опубликованных постов', value: '500+' },
    { label: 'Комментариев', value: '1K+' },
    { label: 'Лайков', value: '2K+' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-6 pt-16 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Добро пожаловать в WhiteB forum
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
            Социальная платформа
            <br />
            нового поколения
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            WhiteB — это современная социальная платформа для обмена идеями,
            создания контента и общения с сообществом единомышленников.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/posts" className="gap-2">
                Начать общение
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/users" className="gap-2">
                <Users className="w-5 h-5" />
                Наше сообщество
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Возможности платформы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            WhiteB предоставляет все необходимые инструменты для комфортного
            общения и создания качественного контента
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="text-center py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Присоединяйтесь к нам уже сегодня
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Станьте частью активного сообщества, делитесь своими идеями
              и находите вдохновение в работах других участников
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/posts" className="gap-2">
                  Смотреть посты
                  <MessageSquare className="w-5 h-5" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
