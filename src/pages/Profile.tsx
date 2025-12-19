import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold">Профиль</h1>
            <p className="text-muted-foreground mt-2">
              Управляйте своей учётной записью и настройками
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Информация о профиле</CardTitle>
              <CardDescription>Обновите ваши личные данные</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    АН
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">Изменить фото</Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG. Максимум 5MB
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя</Label>
                    <Input id="firstName" defaultValue="Артём" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input id="lastName" defaultValue="Низоленко" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="artem@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" defaultValue="+7 (999) 123-45-67" />
                </div>
              </div>

              <Button className="w-full sm:w-auto">
                <Icon name="Save" size={18} className="mr-2" />
                Сохранить изменения
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Статистика</CardTitle>
              <CardDescription>Ваши достижения на платформе</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Music" size={18} />
                    <span className="text-sm">Загружено треков</span>
                  </div>
                  <p className="text-3xl font-bold">24</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="TrendingUp" size={18} />
                    <span className="text-sm">Продано треков</span>
                  </div>
                  <p className="text-3xl font-bold">18</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="DollarSign" size={18} />
                    <span className="text-sm">Всего заработано</span>
                  </div>
                  <p className="text-3xl font-bold">245K ₽</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Calendar" size={18} />
                    <span className="text-sm">На платформе</span>
                  </div>
                  <p className="text-3xl font-bold">3 мес</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>Настройте, какие уведомления вы хотите получать</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Icon name="Bell" size={18} className="text-primary" />
                    <span className="font-semibold">Push-уведомления о продажах</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Получайте уведомления когда ваш трек продан
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Включено
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Icon name="CreditCard" size={18} className="text-primary" />
                    <span className="font-semibold">Уведомления о переводах</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Получайте уведомления о выводе средств
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Включено
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={18} className="text-primary" />
                    <span className="font-semibold">Email-рассылка</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Еженедельная сводка по продажам
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Отключено
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Опасная зона</CardTitle>
              <CardDescription>Необратимые действия с вашей учётной записью</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full sm:w-auto text-destructive border-destructive/50 hover:bg-destructive/10">
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти из аккаунта
              </Button>
              <Button variant="outline" className="w-full sm:w-auto text-destructive border-destructive/50 hover:bg-destructive/10">
                <Icon name="Trash2" size={18} className="mr-2" />
                Удалить аккаунт
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
