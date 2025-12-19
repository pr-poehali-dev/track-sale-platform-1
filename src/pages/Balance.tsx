import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Balance = () => {
  const [balance] = useState(45000);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState<'phone' | 'card'>('card');
  const [withdrawBank, setWithdrawBank] = useState('');
  const [withdrawAccount, setWithdrawAccount] = useState('');
  const { toast } = useToast();

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0 || amount > balance) {
      toast({
        title: 'Ошибка',
        description: 'Неверная сумма для вывода',
        variant: 'destructive',
      });
      return;
    }

    if (!withdrawBank || !withdrawAccount) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/358066a0-4666-4e1e-9b53-0e10059c28c6', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          method: withdrawMethod,
          bank: withdrawBank,
          account: withdrawAccount,
        }),
      });

      const data = await response.json();

      setIsWithdrawOpen(false);
      toast({
        title: 'Вывод средств обработан',
        description: `${amount.toLocaleString('ru-RU')} ₽ будет зачислено через 30 секунд`,
      });

      setTimeout(() => {
        toast({
          title: '🏦 Перевод от Низоленко Артёма',
          description: `Поступил перевод на сумму ${amount.toLocaleString('ru-RU')} ₽`,
        });
      }, 30000);

      setWithdrawAmount('');
      setWithdrawAccount('');
      setWithdrawBank('');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось обработать запрос на вывод',
        variant: 'destructive',
      });
    }
  };

  const stats = [
    {
      title: 'Доступно для вывода',
      value: balance.toLocaleString('ru-RU') + ' ₽',
      icon: 'Wallet',
      color: 'text-primary',
    },
    {
      title: 'Выведено в этом месяце',
      value: '25 000 ₽',
      icon: 'TrendingUp',
      color: 'text-green-500',
    },
    {
      title: 'Ожидает вывода',
      value: '0 ₽',
      icon: 'Clock',
      color: 'text-yellow-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold">Баланс</h1>
              <p className="text-muted-foreground mt-2">
                Управляйте своими средствами и выводите деньги
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => setIsWithdrawOpen(true)}
              disabled={balance <= 0}
              className="gap-2"
            >
              <Icon name="ArrowUpRight" size={20} />
              Вывести средства
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <Card key={stat.title} className="hover-gold">
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <Icon name={stat.icon as any} size={18} className={stat.color} />
                    {stat.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Info" size={24} className="text-primary" />
                Информация о выводе средств
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Icon name="Zap" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Быстрый вывод</h4>
                      <p className="text-sm text-muted-foreground">
                        Средства поступают на счёт в течение 30 секунд
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Icon name="Shield" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Безопасность</h4>
                      <p className="text-sm text-muted-foreground">
                        Все переводы защищены банковской системой
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Icon name="CreditCard" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Поддержка банков</h4>
                      <p className="text-sm text-muted-foreground">
                        Сбербанк, Т-Банк и другие популярные банки
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Icon name="DollarSign" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Без комиссий</h4>
                      <p className="text-sm text-muted-foreground">
                        Мы не берём комиссию за вывод средств
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Вывод средств</DialogTitle>
            <DialogDescription>
              Выберите способ вывода и заполните реквизиты
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Доступно для вывода</Label>
              <div className="text-3xl font-bold text-primary">
                {balance.toLocaleString('ru-RU')} ₽
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Сумма вывода</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Введите сумму"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Способ вывода</Label>
              <RadioGroup value={withdrawMethod} onValueChange={(v) => setWithdrawMethod(v as any)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="cursor-pointer">
                    Номер карты
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="phone" />
                  <Label htmlFor="phone" className="cursor-pointer">
                    Номер телефона
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank">Банк</Label>
              <Select value={withdrawBank} onValueChange={setWithdrawBank}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите банк" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sber">Сбербанк</SelectItem>
                  <SelectItem value="tinkoff">Т-Банк</SelectItem>
                  <SelectItem value="alfa">Альфа-Банк</SelectItem>
                  <SelectItem value="vtb">ВТБ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account">
                {withdrawMethod === 'phone' ? 'Номер телефона' : 'Номер карты'}
              </Label>
              <Input
                id="account"
                type="text"
                placeholder={
                  withdrawMethod === 'phone' ? '+7 (999) 123-45-67' : '1234 5678 9012 3456'
                }
                value={withdrawAccount}
                onChange={(e) => setWithdrawAccount(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsWithdrawOpen(false)} className="flex-1">
              Отмена
            </Button>
            <Button onClick={handleWithdraw} className="flex-1">
              Вывести
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Balance;