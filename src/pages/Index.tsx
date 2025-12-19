import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface Track {
  id: string;
  name: string;
  price: number;
  file: File;
  soldAt?: Date;
}

interface Transaction {
  id: string;
  amount: number;
  status: 'pending' | 'completed';
  method: string;
  bank: string;
  account: string;
  createdAt: Date;
  completedAt?: Date;
}

const Index = () => {
  const [balance, setBalance] = useState(0);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState<'phone' | 'card'>('card');
  const [withdrawBank, setWithdrawBank] = useState('');
  const [withdrawAccount, setWithdrawAccount] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const randomPrice = Math.floor(Math.random() * 4000) + 1000;
      setEstimatedPrice(randomPrice);
      toast.success('Трек загружен! ИИ оценил стоимость', {
        description: `Рекомендуемая цена: ${randomPrice} ₽`,
      });
    }
  };

  const handleSellTrack = () => {
    if (!uploadedFile || !estimatedPrice) return;

    const newTrack: Track = {
      id: Date.now().toString(),
      name: uploadedFile.name,
      price: estimatedPrice,
      file: uploadedFile,
      soldAt: new Date(),
    };

    setTracks([...tracks, newTrack]);
    setBalance(balance + estimatedPrice);
    
    toast.success('Трек продан!', {
      description: `+${estimatedPrice} ₽ на ваш баланс`,
    });

    setTimeout(() => {
      toast.info('💰 Новая продажа!', {
        description: `Ваш трек "${uploadedFile.name}" успешно продан за ${estimatedPrice} ₽`,
      });
    }, 1000);

    setUploadedFile(null);
    setEstimatedPrice(null);
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0 || amount > balance) {
      toast.error('Неверная сумма');
      return;
    }

    if (!withdrawBank || !withdrawAccount) {
      toast.error('Заполните все поля');
      return;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      amount,
      status: 'pending',
      method: withdrawMethod === 'phone' ? 'Номер телефона' : 'Номер карты',
      bank: withdrawBank,
      account: withdrawAccount,
      createdAt: new Date(),
    };

    setTransactions([transaction, ...transactions]);
    setBalance(balance - amount);
    setIsWithdrawOpen(false);

    toast.info('Вывод средств обрабатывается', {
      description: 'Ожидайте 30 секунд...',
    });

    setTimeout(() => {
      setTransactions(prev =>
        prev.map(t =>
          t.id === transaction.id
            ? { ...t, status: 'completed', completedAt: new Date() }
            : t
        )
      );
      toast.success('Средства выведены!', {
        description: `${amount} ₽ отправлено на ${withdrawBank}`,
      });

      setTimeout(() => {
        toast.info('🏦 Перевод от Низоленко Артёма', {
          description: `Поступил перевод на сумму ${amount} ₽`,
        });
      }, 500);
    }, 30000);

    setWithdrawAmount('');
    setWithdrawAccount('');
    setWithdrawBank('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#1e2635] to-[#1A1F2C]">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Music" size={48} className="text-[hsl(var(--gold))]" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] bg-clip-text text-transparent">
              TrackSell Pro
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">Премиальная платформа для продажи музыки</p>
        </header>

        <div className="grid gap-6 md:grid-cols-3 mb-8 animate-scale-in">
          <Card className="border-[hsl(var(--gold))]/20 bg-card/50 backdrop-blur hover-gold">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Wallet" className="text-[hsl(var(--gold))]" />
                Баланс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[hsl(var(--gold))]">{balance.toLocaleString()} ₽</p>
              <Button
                onClick={() => setIsWithdrawOpen(true)}
                className="w-full mt-4 gold-gradient hover:opacity-90 text-[hsl(var(--dark-bg))] font-semibold"
                disabled={balance <= 0}
              >
                <Icon name="ArrowUpRight" className="mr-2" size={18} />
                Вывести средства
              </Button>
            </CardContent>
          </Card>

          <Card className="border-[hsl(var(--gold))]/20 bg-card/50 backdrop-blur hover-gold">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Disc3" className="text-secondary" />
                Треки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-secondary">{tracks.length}</p>
              <p className="text-sm text-muted-foreground mt-2">Продано треков</p>
            </CardContent>
          </Card>

          <Card className="border-[hsl(var(--gold))]/20 bg-card/50 backdrop-blur hover-gold">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingUp" className="text-green-400" />
                Средний чек
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-400">
                {tracks.length > 0 ? Math.round(tracks.reduce((sum, t) => sum + t.price, 0) / tracks.length).toLocaleString() : 0} ₽
              </p>
              <p className="text-sm text-muted-foreground mt-2">За трек</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sell" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-card/50 backdrop-blur">
            <TabsTrigger value="sell" className="data-[state=active]:bg-[hsl(var(--gold))] data-[state=active]:text-[hsl(var(--dark-bg))]">
              <Icon name="Upload" className="mr-2" size={16} />
              Продажа
            </TabsTrigger>
            <TabsTrigger value="tracks" className="data-[state=active]:bg-[hsl(var(--gold))] data-[state=active]:text-[hsl(var(--dark-bg))]">
              <Icon name="Music" className="mr-2" size={16} />
              Мои треки
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-[hsl(var(--gold))] data-[state=active]:text-[hsl(var(--dark-bg))]">
              <Icon name="History" className="mr-2" size={16} />
              История
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sell" className="space-y-4 animate-fade-in">
            <Card className="border-[hsl(var(--gold))]/20 bg-card/50 backdrop-blur max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Продать трек</CardTitle>
                <CardDescription>Загрузите ваш трек, и ИИ автоматически оценит его стоимость</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="track-file">Аудио файл</Label>
                  <div className="relative">
                    <Input
                      id="track-file"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUpload}
                      className="cursor-pointer file:cursor-pointer file:border-0 file:bg-[hsl(var(--gold))] file:text-[hsl(var(--dark-bg))] file:font-semibold file:px-4 file:py-2 file:rounded-md file:mr-4"
                    />
                  </div>
                </div>

                {uploadedFile && estimatedPrice && (
                  <div className="p-6 rounded-lg border-2 border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/5 space-y-4 animate-scale-in">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-[hsl(var(--gold))]/20 animate-glow">
                        <Icon name="Sparkles" className="text-[hsl(var(--gold))]" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">ИИ оценка завершена</h3>
                        <p className="text-sm text-muted-foreground mb-3">Трек: {uploadedFile.name}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-[hsl(var(--gold))]">{estimatedPrice.toLocaleString()} ₽</span>
                          <span className="text-sm text-muted-foreground">Рекомендуемая цена</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleSellTrack}
                      className="w-full gold-gradient hover:opacity-90 text-[hsl(var(--dark-bg))] font-semibold py-6 text-lg"
                    >
                      <Icon name="Check" className="mr-2" size={20} />
                      Продать трек за {estimatedPrice.toLocaleString()} ₽
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracks" className="animate-fade-in">
            <Card className="border-[hsl(var(--gold))]/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Проданные треки</CardTitle>
                <CardDescription>История ваших продаж</CardDescription>
              </CardHeader>
              <CardContent>
                {tracks.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="Music" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Пока нет проданных треков</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tracks.map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-[hsl(var(--gold))]/20 bg-card/30 hover:bg-card/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-[hsl(var(--gold))]/20">
                            <Icon name="Music2" className="text-[hsl(var(--gold))]" />
                          </div>
                          <div>
                            <p className="font-medium">{track.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {track.soldAt?.toLocaleDateString('ru-RU')} в {track.soldAt?.toLocaleTimeString('ru-RU')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[hsl(var(--gold))]">+{track.price.toLocaleString()} ₽</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <Card className="border-[hsl(var(--gold))]/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>История выводов</CardTitle>
                <CardDescription>Все транзакции вывода средств</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="ArrowUpRight" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Пока нет выводов</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-[hsl(var(--gold))]/20 bg-card/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${tx.status === 'completed' ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                            <Icon
                              name={tx.status === 'completed' ? 'CheckCircle' : 'Clock'}
                              className={tx.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}
                            />
                          </div>
                          <div>
                            <p className="font-medium">{tx.bank}</p>
                            <p className="text-sm text-muted-foreground">
                              {tx.method}: {tx.account}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {tx.createdAt.toLocaleDateString('ru-RU')} {tx.createdAt.toLocaleTimeString('ru-RU')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">-{tx.amount.toLocaleString()} ₽</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {tx.status === 'completed' ? 'Завершено' : 'В обработке'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent className="bg-card border-[hsl(var(--gold))]/20">
          <DialogHeader>
            <DialogTitle>Вывод средств</DialogTitle>
            <DialogDescription>Доступно: {balance.toLocaleString()} ₽</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Сумма</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Введите сумму"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                max={balance}
              />
            </div>

            <div className="space-y-2">
              <Label>Способ вывода</Label>
              <Select value={withdrawMethod} onValueChange={(v) => setWithdrawMethod(v as 'phone' | 'card')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Номер карты</SelectItem>
                  <SelectItem value="phone">Номер телефона</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank">Банк</Label>
              <Select value={withdrawBank} onValueChange={setWithdrawBank}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите банк" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Сбербанк">Сбербанк</SelectItem>
                  <SelectItem value="Т-Банк">Т-Банк</SelectItem>
                  <SelectItem value="Альфа-Банк">Альфа-Банк</SelectItem>
                  <SelectItem value="ВТБ">ВТБ</SelectItem>
                  <SelectItem value="Райффайзен">Райффайзен</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account">{withdrawMethod === 'phone' ? 'Номер телефона' : 'Номер карты'}</Label>
              <Input
                id="account"
                placeholder={withdrawMethod === 'phone' ? '+7 (999) 123-45-67' : '1234 5678 9012 3456'}
                value={withdrawAccount}
                onChange={(e) => setWithdrawAccount(e.target.value)}
              />
            </div>

            <Button onClick={handleWithdraw} className="w-full gold-gradient hover:opacity-90 text-[hsl(var(--dark-bg))] font-semibold">
              <Icon name="Send" className="mr-2" size={18} />
              Вывести {withdrawAmount ? parseFloat(withdrawAmount).toLocaleString() : 0} ₽
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
