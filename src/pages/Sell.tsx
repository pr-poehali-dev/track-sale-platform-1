import Header from '@/components/Header';
import UploadTrackForm from '@/components/UploadTrackForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Sell = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Продать трек</h1>
            <p className="text-xl text-muted-foreground">
              Загрузите трек, получите оценку от ИИ и начните зарабатывать
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <UploadTrackForm />

            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Info" size={24} className="text-primary" />
                  Как это работает?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Загрузите трек</h4>
                    <p className="text-sm text-muted-foreground">
                      Выберите аудио файл в формате MP3, WAV или FLAC
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">ИИ анализирует</h4>
                    <p className="text-sm text-muted-foreground">
                      Нейросеть оценит качество, жанр, продолжительность и потенциал трека
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Получите деньги</h4>
                    <p className="text-sm text-muted-foreground">
                      После продажи деньги мгновенно поступят на ваш баланс
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle>Критерии оценки</CardTitle>
              <CardDescription>На что обращает внимание ИИ при анализе</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Icon name="Volume2" size={24} className="text-primary" />
                  <h4 className="font-semibold">Качество звука</h4>
                  <p className="text-sm text-muted-foreground">Битрейт, частота дискретизации</p>
                </div>

                <div className="space-y-2">
                  <Icon name="Music" size={24} className="text-primary" />
                  <h4 className="font-semibold">Жанр</h4>
                  <p className="text-sm text-muted-foreground">Популярность и востребованность</p>
                </div>

                <div className="space-y-2">
                  <Icon name="Clock" size={24} className="text-primary" />
                  <h4 className="font-semibold">Длительность</h4>
                  <p className="text-sm text-muted-foreground">Оптимальная продолжительность</p>
                </div>

                <div className="space-y-2">
                  <Icon name="Sparkles" size={24} className="text-primary" />
                  <h4 className="font-semibold">Уникальность</h4>
                  <p className="text-sm text-muted-foreground">Оригинальность композиции</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sell;
