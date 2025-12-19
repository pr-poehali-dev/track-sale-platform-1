import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface UploadTrackFormProps {
  onSuccess?: (trackData: any) => void;
}

const UploadTrackForm = ({ onSuccess }: UploadTrackFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('audio/')) {
        setFile(selectedFile);
        setEstimatedPrice(null);
      } else {
        toast({
          title: 'Ошибка',
          description: 'Пожалуйста, выберите аудио файл',
          variant: 'destructive',
        });
      }
    }
  };

  const analyzeTrack = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        
        const response = await fetch('https://functions.poehali.dev/c9ed06ff-5f82-4e7e-a54a-6ec1ed082c96', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            fileSize: file.size,
            audioData: base64Audio,
          }),
        });

        const data = await response.json();
        
        clearInterval(interval);
        setProgress(100);
        setEstimatedPrice(data.estimatedPrice);
        
        toast({
          title: 'Анализ завершён',
          description: `Рекомендуемая цена: ${data.estimatedPrice.toLocaleString('ru-RU')} ₽`,
        });
      };
    } catch (error) {
      clearInterval(interval);
      toast({
        title: 'Ошибка',
        description: 'Не удалось проанализировать трек',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSell = async () => {
    if (!file || !estimatedPrice) return;

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        
        const response = await fetch('https://functions.poehali.dev/fe33d77a-545e-4bb8-be55-490fac5b1de1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            price: estimatedPrice,
            audioData: base64Audio,
          }),
        });

        const data = await response.json();

        toast({
          title: 'Трек выставлен на продажу!',
          description: `${estimatedPrice.toLocaleString('ru-RU')} ₽ будет зачислено после продажи`,
        });

        setFile(null);
        setEstimatedPrice(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        onSuccess?.(data);
      };
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось выставить трек на продажу',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="hover-gold">
      <CardHeader>
        <CardTitle className="text-2xl">Загрузить трек</CardTitle>
        <CardDescription>
          Загрузите аудио файл, и ИИ оценит его стоимость
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="audio-file">Аудио файл</Label>
          <div
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              {file ? file.name : 'Нажмите для выбора файла или перетащите сюда'}
            </p>
            <p className="text-xs text-muted-foreground">MP3, WAV, FLAC до 100MB</p>
          </div>
          <Input
            ref={fileInputRef}
            id="audio-file"
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Анализ трека...</span>
              <span className="text-primary font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {estimatedPrice && (
          <Card className="bg-primary/10 border-primary/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Рекомендуемая цена</p>
                <p className="text-4xl font-bold text-primary">
                  {estimatedPrice.toLocaleString('ru-RU')} ₽
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-3">
          <Button
            onClick={analyzeTrack}
            disabled={!file || isAnalyzing}
            variant="outline"
            className="flex-1"
          >
            <Icon name="Sparkles" size={18} className="mr-2" />
            Оценить трек
          </Button>
          <Button
            onClick={handleSell}
            disabled={!estimatedPrice}
            className="flex-1"
          >
            <Icon name="DollarSign" size={18} className="mr-2" />
            Продать
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadTrackForm;