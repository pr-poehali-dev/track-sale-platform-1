import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Transaction {
  id: string;
  type: 'sale' | 'withdrawal';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  method?: string;
  bank?: string;
  createdAt: Date;
  completedAt?: Date;
}

const History = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'sale',
      amount: 15000,
      status: 'completed',
      description: 'Продажа трека "Midnight Dreams"',
      createdAt: new Date(2024, 11, 18, 14, 30),
      completedAt: new Date(2024, 11, 18, 14, 30),
    },
    {
      id: '2',
      type: 'withdrawal',
      amount: 10000,
      status: 'completed',
      description: 'Вывод на карту Сбербанк',
      method: 'Номер карты',
      bank: 'Сбербанк',
      createdAt: new Date(2024, 11, 17, 10, 15),
      completedAt: new Date(2024, 11, 17, 10, 15, 30),
    },
    {
      id: '3',
      type: 'sale',
      amount: 12000,
      status: 'completed',
      description: 'Продажа трека "Summer Vibes"',
      createdAt: new Date(2024, 11, 16, 16, 45),
      completedAt: new Date(2024, 11, 16, 16, 45),
    },
    {
      id: '4',
      type: 'withdrawal',
      amount: 5000,
      status: 'pending',
      description: 'Вывод на карту Т-Банк',
      method: 'Номер карты',
      bank: 'Т-Банк',
      createdAt: new Date(2024, 11, 19, 12, 0),
    },
  ]);

  const statusConfig = {
    pending: {
      label: 'В обработке',
      className: 'bg-yellow-500/20 text-yellow-500',
      icon: 'Clock',
    },
    completed: {
      label: 'Завершено',
      className: 'bg-green-500/20 text-green-500',
      icon: 'CheckCircle2',
    },
    failed: {
      label: 'Ошибка',
      className: 'bg-red-500/20 text-red-500',
      icon: 'XCircle',
    },
  };

  const typeConfig = {
    sale: {
      label: 'Продажа',
      icon: 'TrendingUp',
      color: 'text-green-500',
    },
    withdrawal: {
      label: 'Вывод',
      icon: 'ArrowUpRight',
      color: 'text-blue-500',
    },
  };

  const sales = transactions.filter((t) => t.type === 'sale');
  const withdrawals = transactions.filter((t) => t.type === 'withdrawal');

  const renderTransaction = (transaction: Transaction) => (
    <Card key={transaction.id} className="hover-gold">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1">
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center ${
                typeConfig[transaction.type].color
              }`}
            >
              <Icon name={typeConfig[transaction.type].icon as any} size={24} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">{transaction.description}</h4>
                <Badge className={statusConfig[transaction.status].className}>
                  {statusConfig[transaction.status].label}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-2">
                {format(transaction.createdAt, 'd MMMM yyyy, HH:mm', { locale: ru })}
              </p>

              {transaction.method && transaction.bank && (
                <p className="text-sm text-muted-foreground">
                  {transaction.method} • {transaction.bank}
                </p>
              )}

              {transaction.completedAt && transaction.status === 'completed' && (
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                  <Icon name="CheckCircle2" size={14} />
                  Завершено{' '}
                  {format(transaction.completedAt, 'd MMMM в HH:mm', { locale: ru })}
                </p>
              )}
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <p
              className={`text-2xl font-bold ${
                transaction.type === 'sale' ? 'text-green-500' : 'text-primary'
              }`}
            >
              {transaction.type === 'sale' ? '+' : '-'}
              {transaction.amount.toLocaleString('ru-RU')} ₽
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold">История операций</h1>
            <p className="text-muted-foreground mt-2">
              Отслеживайте все продажи и выводы средств
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover-gold">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={18} className="text-green-500" />
                  Всего продаж
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{sales.length}</p>
              </CardContent>
            </Card>

            <Card className="hover-gold">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Icon name="ArrowUpRight" size={18} className="text-blue-500" />
                  Всего выводов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{withdrawals.length}</p>
              </CardContent>
            </Card>

            <Card className="hover-gold">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Icon name="DollarSign" size={18} className="text-primary" />
                  Общий оборот
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {transactions
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString('ru-RU')}{' '}
                  ₽
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">Все операции ({transactions.length})</TabsTrigger>
              <TabsTrigger value="sales">Продажи ({sales.length})</TabsTrigger>
              <TabsTrigger value="withdrawals">Выводы ({withdrawals.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {transactions.length > 0 ? (
                transactions.map(renderTransaction)
              ) : (
                <div className="text-center py-12">
                  <Icon name="History" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Пока нет операций</h3>
                  <p className="text-muted-foreground">
                    Здесь будет отображаться история ваших продаж и выводов
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              {sales.length > 0 ? (
                sales.map(renderTransaction)
              ) : (
                <div className="text-center py-12">
                  <Icon name="TrendingUp" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Пока нет продаж</h3>
                  <p className="text-muted-foreground">
                    Загрузите треки, чтобы начать зарабатывать
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="withdrawals" className="space-y-4">
              {withdrawals.length > 0 ? (
                withdrawals.map(renderTransaction)
              ) : (
                <div className="text-center py-12">
                  <Icon name="ArrowUpRight" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Пока нет выводов</h3>
                  <p className="text-muted-foreground">
                    Выводите средства на карту или телефон
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default History;
